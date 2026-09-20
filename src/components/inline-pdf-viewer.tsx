"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, FileText, X } from "lucide-react";
import { useReadingProgressStore } from "@/store/use-reading-progress-store";

export interface InlinePdfViewerProps {
  pdfUrl: string;
  title: string;
  entryId: string;
  onClose?: () => void;
  initialPage?: number;
}

import type { PDFDocumentProxy } from "pdfjs-dist";

interface RenderTask {
  cancel: () => void;
  promise: Promise<void>;
}

export function InlinePdfViewer({
  pdfUrl,
  title,
  entryId,
  onClose,
  initialPage,
}: InlinePdfViewerProps) {
  const { getReadingPage, setReadingPage } = useReadingProgressStore();

  const initialResolvedPage =
    initialPage ?? (typeof window !== "undefined" && entryId ? getReadingPage(entryId) : 1);
  const startPage = initialResolvedPage > 1 ? initialResolvedPage : 1;

  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [resumedNotice, setResumedNotice] = useState<string | null>(
    startPage > 1 ? `${startPage}. sayfadan devam ediliyor` : null
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textLayerRef = useRef<HTMLDivElement | null>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-dismiss resumed notice
  useEffect(() => {
    if (!resumedNotice) return;
    const timer = setTimeout(() => setResumedNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [resumedNotice]);

  // Load PDF Document
  useEffect(() => {
    if (!pdfUrl) return;

    let isMounted = true;

    async function loadPdf() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const pdfjs = await import("pdfjs-dist");
        if (typeof window !== "undefined" && pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        }

        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          cMapUrl: "https://unpkg.com/pdfjs-dist@5.4.394/cmaps/",
          cMapPacked: true,
        });

        const doc = (await loadingTask.promise) as unknown as PDFDocumentProxy;
        if (!isMounted) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setCurrentPage((prev) => Math.min(Math.max(1, prev), doc.numPages));
        setIsLoading(false);
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error("PDF load error:", err);
        setErrorMessage("Ders belgesi yüklenirken bir sorun oluştu.");
        setIsLoading(false);
      }
    }

    void loadPdf();

    return () => {
      isMounted = false;
      if (pdfDocRef.current) {
        pdfDocRef.current.cleanup?.();
        pdfDocRef.current = null;
      }
    };
  }, [pdfUrl]);

  // Render Page Canvas + Selectable Text Layer
  const renderPage = useCallback(async (pageNumber: number) => {
    if (!pdfDocRef.current || !canvasRef.current || !textLayerRef.current) return;

    try {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDocRef.current.getPage(pageNumber);
      const canvas = canvasRef.current;
      const textLayerDiv = textLayerRef.current;
      if (!canvas || !textLayerDiv) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // Determine optimal scale based on container width
      const containerWidth = containerRef.current?.clientWidth || 560;
      const unscaledViewport = page.getViewport({ scale: 1 });
      const targetWidth = Math.max(260, Math.min(containerWidth, 680));
      const scale = Math.max(0.7, +(targetWidth / unscaledViewport.width).toFixed(2));

      const viewport = page.getViewport({ scale });
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const renderContext = {
        canvasContext: context,
        viewport,
        canvas,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise;

      // Render Selectable Text Layer
      textLayerDiv.replaceChildren();
      textLayerDiv.style.width = `${Math.floor(viewport.width)}px`;
      textLayerDiv.style.height = `${Math.floor(viewport.height)}px`;

      const pdfjs = await import("pdfjs-dist");
      if (pdfjs.TextLayer) {
        const textLayer = new pdfjs.TextLayer({
          textContentSource: page.streamTextContent(),
          container: textLayerDiv,
          viewport,
        });
        await textLayer.render();
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name: string }).name === "RenderingCancelledException"
      ) {
        return;
      }
      console.error("Page render error:", err);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && pdfDocRef.current) {
      void renderPage(currentPage);
      if (entryId) {
        setReadingPage(entryId, currentPage);
      }
    }
  }, [currentPage, isLoading, renderPage, entryId, setReadingPage]);

  // Window resize observer to adapt scale responsively
  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        void renderPage(currentPage);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [currentPage, isLoading, renderPage]);

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev < totalPages) {
        const next = prev + 1;
        setReadingPage(entryId, next);
        return next;
      }
      return prev;
    });
  }, [totalPages, entryId, setReadingPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        const next = prev - 1;
        setReadingPage(entryId, next);
        return next;
      }
      return prev;
    });
  }, [entryId, setReadingPage]);

  // Copy page text action
  const handleCopyPageText = async () => {
    if (!pdfDocRef.current) return;
    try {
      const page = await pdfDocRef.current.getPage(currentPage);
      const textContent = await page.getTextContent();
      const strings = textContent.items
        .map((item: unknown) =>
          typeof item === "object" && item !== null && "str" in item
            ? String((item as { str: unknown }).str)
            : ""
        )
        .filter((s: string) => s.trim().length > 0);
      const cleanText = strings.join(" ").replace(/\s+/g, " ").trim();

      if (cleanText) {
        await navigator.clipboard.writeText(cleanText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy page text:", err);
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (diffX < -50) {
      goToNextPage();
    } else if (diffX > 50) {
      goToPrevPage();
    }
  };

  return (
    <div
      ref={containerRef}
      className="animate-in fade-in mt-3 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/90 shadow-md backdrop-blur-sm transition-all duration-200 dark:border-stone-800 dark:bg-stone-900/90"
      aria-label={`${title} Ders İçeriği`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 bg-stone-50/90 px-3 py-2.5 sm:px-4 dark:border-stone-800 dark:bg-stone-900/95">
        {/* Left: Title & Page count */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <FileText className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">{title}</h4>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                Sayfa {currentPage} / {totalPages}
              </span>
              {resumedNotice && (
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                  {resumedNotice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Copy Page Text Button */}
          <button
            type="button"
            onClick={handleCopyPageText}
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white"
            title="Bu sayfanın metnini panoya kopyala (soru sormak veya not almak için)"
            aria-label="Sayfa metnini kopyala"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Kopyalandı!
                </span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Metni Kopyala</span>
              </>
            )}
          </button>

          {/* Close Inline Viewer */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-stone-200 bg-stone-200/60 px-2.5 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-300 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-800/80 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-white"
              aria-label="Görüntülemeyi Kapat"
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kapat</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Page Render Area */}
      <div
        className="relative flex min-h-[320px] items-center justify-center overflow-x-auto bg-stone-100 p-3 select-text sm:p-4 dark:bg-stone-950/60"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center gap-2 py-16 text-stone-500 dark:text-stone-400">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <span className="text-xs">Ders sayfası hazırlanıyor...</span>
          </div>
        )}

        {/* Error State */}
        {errorMessage && !isLoading && (
          <div className="my-8 max-w-sm rounded-xl border border-rose-500/20 bg-rose-500/10 p-5 text-center text-rose-600 dark:text-rose-400">
            <p className="mb-3 text-xs">{errorMessage}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center justify-center rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-600"
            >
              {"PDF'i Doğrudan Aç"}
            </a>
          </div>
        )}

        {/* The PDF Page Container with Canvas & Transparent Selectable Text Layer */}
        <div
          className={`pdf-page-container overflow-hidden rounded-lg shadow-sm transition-opacity duration-200 ${
            isLoading || errorMessage ? "pointer-events-none hidden opacity-0" : "opacity-100"
          }`}
        >
          <canvas ref={canvasRef} className="mx-auto block bg-white" />
          <div ref={textLayerRef} className="textLayer" />
        </div>
      </div>

      {/* Bottom Bar: Page Navigation Controls */}
      <div className="flex items-center justify-between border-t border-stone-200 bg-stone-50/90 px-3 py-2.5 sm:px-4 dark:border-stone-800 dark:bg-stone-900/95">
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage <= 1 || isLoading}
          className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100 disabled:pointer-events-none disabled:opacity-40 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
          aria-label="Önceki Sayfa"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Önceki</span>
        </button>

        <span className="font-mono text-xs font-semibold text-stone-800 dark:text-stone-200">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage >= totalPages || isLoading}
          className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-emerald-600/30 bg-emerald-600/15 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-600/25 disabled:pointer-events-none disabled:opacity-40 dark:bg-emerald-600/25 dark:text-emerald-300 dark:hover:bg-emerald-600/35"
          aria-label="Sonraki Sayfa"
        >
          <span>Sonraki</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
