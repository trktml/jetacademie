"use client";
import { useMemo } from "react";
import { BookA, BookOpen } from "lucide-react";
import type { CurriculumEntry } from "@/lib/curriculum";
import { KonuLessonReader } from "@/components/konu-lesson-reader";
import { MarkdownContent } from "@/components/markdown-content";
import { getKonuItem, parseKonuItemFromBody } from "@/lib/data/konu-curriculum";
import { getEsmaArabic } from "@/lib/data/esma-curriculum";
export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
  } catch {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  }
  return null;
}

export interface ParsedVocabItem {
  word: string;
  tr: string;
  fr?: string;
  nl?: string;
}

export function parseEntryContent(body?: string | null): {
  summary: string;
  vocabList: ParsedVocabItem[];
} {
  if (!body) return { summary: "", vocabList: [] };

  const vocabMarker = "📚 **Kelimeler ve Anlamları**:";
  if (!body.includes(vocabMarker)) {
    return { summary: body, vocabList: [] };
  }

  const [summaryPart, vocabPart] = body.split(vocabMarker);
  const summary = summaryPart.trim();
  const vocabList: ParsedVocabItem[] = [];

  const lines = vocabPart.split("\n").filter((l) => l.trim().startsWith("•"));
  for (const line of lines) {
    const nlFrMatch = line.match(
      /•\s*\*\*(.*?)\*\*:\s*(.*?)(?:\s*\(NL:\s*(.*?)\s*\/\s*FR:\s*(.*?)\))?$/
    );
    const frNlMatch = line.match(
      /•\s*\*\*(.*?)\*\*:\s*(.*?)(?:\s*\(FR:\s*(.*?)\s*\/\s*NL:\s*(.*?)\))?$/
    );

    if (nlFrMatch && (nlFrMatch[3] || nlFrMatch[4])) {
      vocabList.push({
        word: nlFrMatch[1].trim(),
        tr: nlFrMatch[2].trim(),
        nl: nlFrMatch[3]?.trim(),
        fr: nlFrMatch[4]?.trim(),
      });
    } else if (frNlMatch && (frNlMatch[3] || frNlMatch[4])) {
      vocabList.push({
        word: frNlMatch[1].trim(),
        tr: frNlMatch[2].trim(),
        fr: frNlMatch[3]?.trim(),
        nl: frNlMatch[4]?.trim(),
      });
    } else {
      const basicMatch = line.match(/•\s*\*\*(.*?)\*\*:\s*(.*?)$/);
      if (basicMatch) {
        vocabList.push({
          word: basicMatch[1].trim(),
          tr: basicMatch[2].trim(),
        });
      } else {
        const rawMatch = line.replace(/^•\s*/, "").split(":");
        if (rawMatch.length >= 2) {
          vocabList.push({
            word: rawMatch[0].trim(),
            tr: rawMatch.slice(1).join(":").trim(),
          });
        }
      }
    }
  }

  return { summary, vocabList };
}

export function EsmaCardHeader({
  entry,
  isLocked = false,
}: {
  entry: CurriculumEntry;
  isLocked?: boolean;
}) {
  const arabic = entry.arabic || getEsmaArabic(entry.title) || getEsmaArabic(entry.id);
  const parts = entry.title.split(/—|–/);
  const name = parts[0]?.trim() || entry.title;
  const meaning = parts.length > 1 ? parts.slice(1).join("—").trim() : "";

  return (
    <div className="esma-card-header mb-4 w-full">
      <div
        className={`relative overflow-hidden rounded-2xl border px-4 py-4 text-center shadow-xs transition-colors sm:px-6 sm:py-5 ${
          isLocked
            ? "border-slate-300/60 bg-slate-100/50 dark:border-slate-800 dark:bg-slate-900/40"
            : "border-emerald-500/25 bg-gradient-to-b from-emerald-500/12 via-emerald-500/5 to-transparent dark:border-emerald-500/30 dark:from-emerald-950/40 dark:via-emerald-950/20"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.035] dark:opacity-[0.06]"
          aria-hidden="true"
        />

        {arabic && (
          <div
            dir="rtl"
            lang="ar"
            className={`relative font-serif text-3xl font-bold tracking-wide select-text sm:text-4xl md:text-5xl ${
              isLocked
                ? "text-slate-600 dark:text-slate-400"
                : "text-emerald-950 dark:text-emerald-100"
            }`}
            style={{
              fontFamily:
                "'Traditional Arabic', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif",
              lineHeight: 1.35,
            }}
          >
            <span className="inline-block transition-transform duration-300 hover:scale-105">
              {arabic}
            </span>
          </div>
        )}

        <div
          className="my-2.5 flex items-center justify-center gap-2 opacity-60 dark:opacity-40"
          aria-hidden="true"
        >
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-emerald-500/50 sm:w-16" />
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300">✦</span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-emerald-500/50 sm:w-16" />
        </div>

        <h3 className="archive-entry-title !mb-1 !text-base font-bold tracking-wider text-slate-900 uppercase sm:!text-lg dark:text-slate-100">
          {name}
          {meaning && <span className="sr-only"> — {meaning}</span>}
        </h3>
        {meaning && (
          <p className="text-xs font-medium text-emerald-800/90 italic sm:text-sm dark:text-emerald-300/90">
            “{meaning}”
          </p>
        )}
      </div>
    </div>
  );
}

export function EntryContentRenderer({
  entry,
  renderMedia = true,
  renderVideo = true,
  isExpanded = false,
  onToggleExpand,
}: {
  entry: CurriculumEntry;
  renderMedia?: boolean;
  renderVideo?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}) {
  const isKonu = entry.categoryId === "konu" && entry.contentFormat !== "markdown";
  const konuItem = useMemo(
    () => (isKonu ? (getKonuItem(entry.id) ?? parseKonuItemFromBody(entry)) : null),
    [isKonu, entry]
  );

  const { summary, vocabList } = useMemo(
    () =>
      isKonu
        ? { summary: "", vocabList: [] }
        : entry.contentFormat === "markdown"
          ? { summary: entry.body ?? "", vocabList: [] }
          : parseEntryContent(entry.body),
    [isKonu, entry.body, entry.contentFormat]
  );
  const videoId = useMemo(
    () => (renderMedia && renderVideo && !isKonu ? getYouTubeVideoId(entry.resourceUrl) : null),
    [entry.resourceUrl, renderMedia, renderVideo, isKonu]
  );

  if (isKonu) {
    if (isExpanded) {
      return (
        <div className="archive-entry-rendered-content flex flex-col gap-3">
          <KonuLessonReader entry={entry} onClose={onToggleExpand} />
        </div>
      );
    }

    const previewSubtitle =
      konuItem?.subtitle || entry.body?.split("\n").find((l) => l.trim().length > 0) || "";

    return (
      <div className="archive-entry-rendered-content flex flex-col gap-3">
        {previewSubtitle && (
          <div className="rounded-xl border-l-4 border-teal-500 bg-teal-50/70 p-3 text-xs leading-relaxed font-medium text-teal-950 italic sm:p-3.5 sm:text-sm dark:bg-teal-950/30 dark:text-teal-100">
            “{previewSubtitle}”
          </div>
        )}

        {konuItem && konuItem.vocab.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300">
              <BookA className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
              <span>Bu Haftanın Kavramları:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {konuItem.vocab.map((v, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md border border-teal-200/80 bg-teal-50/70 px-2 py-0.5 text-[11px] font-semibold text-teal-900 dark:border-teal-800/60 dark:bg-teal-950/60 dark:text-teal-200"
                  title={`${v.word}: ${v.definition}`}
                >
                  {v.word}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-teal-700 active:scale-[0.98] sm:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand?.();
            }}
            aria-expanded={isExpanded}
            aria-label={`${entry.title} dersini oku`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Dersi Oku</span>
            <span className="rounded-md bg-teal-700/80 px-1.5 py-0.5 text-[10px] font-medium text-teal-100">
              ⏱️ {konuItem?.readingMinutes ?? 5} dk
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="archive-entry-rendered-content flex flex-col gap-3">
      {summary && (
        <MarkdownContent stripTitle={entry.title}>
          {entry.contentFormat === "markdown" ? (entry.body ?? "") : summary}
        </MarkdownContent>
      )}

      {videoId && (
        <div className="archive-video-wrapper my-1 overflow-hidden rounded-2xl border border-rose-500/20 bg-black/5 shadow-xs transition-shadow hover:shadow-md">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={entry.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-2xl border-0"
            />
          </div>
        </div>
      )}

      {renderMedia && vocabList.length > 0 && (
        <div className="archive-vocab-card mt-1 rounded-2xl border border-rose-200/80 bg-rose-50/40 p-3 sm:p-3.5 dark:border-rose-900/40 dark:bg-rose-950/20">
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
            <BookA
              className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400"
              aria-hidden="true"
            />
            <span>Kelimeler</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {vocabList.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1.5 rounded-xl border border-rose-200/70 bg-white p-2.5 shadow-xs dark:border-rose-900/40 dark:bg-[#16202c]"
              >
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {item.word}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-medium">
                    {item.nl && (
                      <span
                        className="rounded border border-amber-300/70 bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/80 dark:text-amber-200"
                        title="Felemenkçe Karşılığı"
                      >
                        NL: {item.nl}
                      </span>
                    )}
                    {item.fr && (
                      <span
                        className="rounded border border-blue-300/70 bg-blue-100 px-1.5 py-0.5 font-semibold text-blue-900 dark:border-blue-700/60 dark:bg-blue-950/80 dark:text-blue-200"
                        title="Fransızca Karşılığı"
                      >
                        FR: {item.fr}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.tr}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
