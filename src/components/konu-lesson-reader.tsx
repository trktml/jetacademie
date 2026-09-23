"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  BookA,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import {
  getKonuItem,
  type KonuCurriculumItem,
  type KonuVocabItem,
} from "@/lib/data/konu-curriculum";
import type { CurriculumEntry } from "@/lib/curriculum";

export interface KonuLessonReaderProps {
  entry: CurriculumEntry;
  onClose?: () => void;
}

interface ActiveInlineTooltip {
  readonly instanceKey: string;
  readonly word: string;
  readonly definition: string;
  readonly left: number;
  readonly width: number;
  readonly caretX: number;
  readonly placement: "top" | "bottom";
  readonly top?: number;
  readonly bottom?: number;
}

/**
 * Parses markdown-like body into fallback structured item if not in memory map
 */
function getOrParseKonuItem(entry: CurriculumEntry): KonuCurriculumItem | null {
  const existing = getKonuItem(entry.id);
  if (existing) return existing;

  if (!entry.body) return null;

  return {
    id: entry.id,
    grade: entry.grade ?? 1,
    weekNumber: entry.week,
    month: entry.month,
    week: entry.week,
    year: entry.year,
    title: entry.title,
    subtitle: "",
    readingMinutes: 5,
    sections: [{ heading: null, paragraphs: [entry.body] }],
    discussionQuestions: [],
    takeaway: [],
    sources: [],
    vocab: [],
    body: entry.body,
  };
}

export function KonuLessonReader({ entry, onClose }: KonuLessonReaderProps) {
  const item = useMemo(() => getOrParseKonuItem(entry), [entry]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTooltip, setActiveTooltip] = useState<ActiveInlineTooltip | null>(null);
  const readerId = useId();

  // Dismiss tooltip on Escape, window resize, or scroll
  useEffect(() => {
    if (!activeTooltip) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTooltip(null);
      }
    };

    const onDismiss = () => setActiveTooltip(null);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onDismiss);
    window.addEventListener("scroll", onDismiss, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onDismiss);
      window.removeEventListener("scroll", onDismiss, true);
    };
  }, [activeTooltip]);

  const handleVocabClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    instanceKey: string,
    vocabMatch: KonuVocabItem
  ) => {
    e.stopPropagation();

    if (activeTooltip?.instanceKey === instanceKey) {
      setActiveTooltip(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const btnRect = e.currentTarget.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    const targetX = btnRect.left - cRect.left + btnRect.width / 2;
    // Bounded tooltip width between 240px and 300px, but never wider than container - 24px
    const tipWidth = Math.min(300, Math.max(220, cRect.width - 24));
    const idealLeft = targetX - tipWidth / 2;
    // Strictly clamped so it never overflows left or right of container (12px padding)
    const clampedLeft = Math.max(12, Math.min(idealLeft, cRect.width - tipWidth - 12));
    const caretX = Math.max(16, Math.min(targetX - clampedLeft, tipWidth - 16));

    // Determine placement: if button is near top of container (< 130px), place below; otherwise above
    const btnTopInContainer = btnRect.top - cRect.top;
    const placeBottom = btnTopInContainer < 130;

    if (placeBottom) {
      setActiveTooltip({
        instanceKey,
        word: vocabMatch.word,
        definition: vocabMatch.definition,
        left: clampedLeft,
        width: tipWidth,
        caretX,
        placement: "bottom",
        top: btnRect.bottom - cRect.top + 8,
      });
    } else {
      setActiveTooltip({
        instanceKey,
        word: vocabMatch.word,
        definition: vocabMatch.definition,
        left: clampedLeft,
        width: tipWidth,
        caretX,
        placement: "top",
        bottom: cRect.height - btnTopInContainer + 8,
      });
    }
  };

  const vocabMap = useMemo(() => {
    const map = new Map<string, KonuVocabItem>();
    if (!item) return map;
    for (const v of item.vocab) {
      map.set(v.word.toLocaleLowerCase("tr-TR"), v);
    }
    return map;
  }, [item]);

  const vocabRegex = useMemo(() => {
    if (!item || item.vocab.length === 0) return null;
    // Sort words by descending length so phrases match first (e.g. 'Benliğe mâl etmek' before 'Benlik')
    const sortedWords = [...item.vocab]
      .map((v) => v.word.trim())
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);

    if (sortedWords.length === 0) return null;
    const escaped = sortedWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(${escaped.join("|")})`, "gi");
  }, [item]);

  if (!item) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
        Ders içeriği henüz hazır değil.
      </div>
    );
  }

  const renderParagraphWithVocab = (text: string, pIdx: number) => {
    if (!vocabRegex || item.vocab.length === 0) {
      return (
        <p
          key={pIdx}
          className="text-sm leading-relaxed text-slate-800 sm:text-[15px] sm:leading-loose dark:text-slate-200"
        >
          {text}
        </p>
      );
    }

    const parts = text.split(vocabRegex);
    return (
      <p
        key={pIdx}
        className="text-sm leading-relaxed text-slate-800 sm:text-[15px] sm:leading-loose dark:text-slate-200"
      >
        {parts.map((part, idx) => {
          const vocabMatch = vocabMap.get(part.toLocaleLowerCase("tr-TR"));
          if (!vocabMatch) return part;

          const instanceKey = `vocab-${pIdx}-${idx}-${vocabMatch.word}`;
          const isSelected = activeTooltip?.instanceKey === instanceKey;

          return (
            <button
              key={idx}
              type="button"
              className={`inline-flex cursor-pointer items-center rounded-md px-1 py-0.5 font-semibold text-inherit underline decoration-teal-500/70 decoration-dotted decoration-2 underline-offset-4 transition-colors ${
                isSelected
                  ? "bg-teal-200/90 text-teal-950 dark:bg-teal-800/90 dark:text-teal-50"
                  : "bg-teal-50/70 text-teal-900 hover:bg-teal-100 hover:text-teal-950 dark:bg-teal-950/50 dark:text-teal-200 dark:hover:bg-teal-900/60"
              }`}
              onClick={(e) => handleVocabClick(e, instanceKey, vocabMatch)}
              aria-label={`${vocabMatch.word} kelimesinin anlamı`}
              title={`${vocabMatch.word}: ${vocabMatch.definition}`}
            >
              {part}
            </button>
          );
        })}
      </p>
    );
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`${readerId}-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="konu-lesson-reader relative flex flex-col gap-5 rounded-2xl border border-teal-200/80 bg-white/95 p-4 shadow-sm sm:p-6 dark:border-teal-900/40 dark:bg-[#121c24]"
      onClick={() => setActiveTooltip(null)}
    >
      {/* Top Meta Bar & Navigation Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100/80 pb-3 dark:border-teal-900/40">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full border border-teal-300/80 bg-teal-50 px-2.5 py-1 font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/80 dark:text-teal-300">
            <BookOpen className="h-3.5 w-3.5" />
            {`${item.grade}. Sınıf · ${item.week}. Hafta`}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {`⏱️ ${item.readingMinutes} dk okuma`}
          </span>
          {item.vocab.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-200/70 bg-teal-50/50 px-2 py-0.5 font-medium text-teal-700 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-300">
              {`${item.vocab.length} Kavram`}
            </span>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/80"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Okuyucuyu Kapat"
          >
            <X className="h-3.5 w-3.5" />
            <span>Kapat</span>
          </button>
        )}
      </div>

      {/* Quick Jump Navigation Bar */}
      <nav
        aria-label="Ders içi hızlı atlama"
        className="flex flex-wrap items-center gap-1.5 text-xs"
      >
        <span className="mr-1 font-semibold text-slate-500 dark:text-slate-400">Bölümler:</span>
        <button
          type="button"
          onClick={() => scrollToSection("metin")}
          className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 rounded-lg border border-teal-200/70 bg-teal-50/60 px-2.5 py-1 text-teal-800 hover:bg-teal-100 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-300"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Ders Metni</span>
        </button>
        {item.discussionQuestions.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToSection("sorular")}
            className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 rounded-lg border border-indigo-200/70 bg-indigo-50/60 px-2.5 py-1 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Sorular ({item.discussionQuestions.length})</span>
          </button>
        )}
        {item.application && (
          <button
            type="button"
            onClick={() => scrollToSection("uygulama")}
            className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 rounded-lg border border-emerald-200/70 bg-emerald-50/60 px-2.5 py-1 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Uygulama</span>
          </button>
        )}
        {item.takeaway.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToSection("aklimizda-kalsin")}
            className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 rounded-lg border border-amber-200/70 bg-amber-50/60 px-2.5 py-1 text-amber-800 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300"
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Aklımızda Kalsın</span>
          </button>
        )}
        {item.vocab.length > 0 && (
          <button
            type="button"
            onClick={() => scrollToSection("kelimeler")}
            className="inline-flex min-h-[32px] cursor-pointer items-center gap-1 rounded-lg border border-teal-200/70 bg-teal-50/60 px-2.5 py-1 text-teal-800 hover:bg-teal-100 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-300"
          >
            <BookA className="h-3.5 w-3.5" />
            <span>Kelimeler ({item.vocab.length})</span>
          </button>
        )}
      </nav>

      {/* Lesson Title Header */}
      <h3 className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-slate-100">
        {item.title}
      </h3>

      {/* Subtitle / Hook Question Box */}
      {item.subtitle && (
        <div className="rounded-xl border-l-4 border-teal-500 bg-teal-50/70 p-3.5 text-sm leading-relaxed font-medium text-teal-950 italic sm:p-4 dark:bg-teal-950/30 dark:text-teal-100">
          “{item.subtitle}”
        </div>
      )}

      {/* Section 1: Main Lesson Text Flow */}
      <section id={`${readerId}-metin`} className="flex flex-col gap-6 pt-1">
        {item.sections.map((sec, sIdx) => (
          <article key={sIdx} className="flex flex-col gap-2.5">
            {sec.heading && (
              <h4 className="flex items-center gap-2 border-b border-slate-100 pb-1 text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:border-slate-800 dark:text-slate-100">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                {sec.heading}
              </h4>
            )}
            <div className="flex flex-col gap-2.5">
              {sec.paragraphs.map((p, pIdx) => renderParagraphWithVocab(p, pIdx))}
            </div>
          </article>
        ))}
      </section>

      {/* Section 2: Discussion Questions (Düşünelim ve Konuşalım) */}
      {item.discussionQuestions.length > 0 && (
        <section
          id={`${readerId}-sorular`}
          className="mt-2 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-4 sm:p-5 dark:border-indigo-900/40 dark:bg-indigo-950/20"
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-300">
            <HelpCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>Düşünelim ve Konuşalım</span>
          </div>
          <div className="grid gap-2.5">
            {item.discussionQuestions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-white/90 p-3 text-xs leading-relaxed text-slate-800 shadow-xs sm:text-sm dark:border-indigo-900/30 dark:bg-[#151c28] dark:text-slate-200"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-800 dark:bg-indigo-900/80 dark:text-indigo-200">
                  {qIdx + 1}
                </span>
                <p className="flex-1">{q}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Practical Weekly Application */}
      {item.application && (
        <section
          id={`${readerId}-uygulama`}
          className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 sm:p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20"
        >
          <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>{item.application.title}</span>
          </div>
          <ul className="flex flex-col gap-2">
            {item.application.items.map((it, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-emerald-950 sm:text-sm dark:text-emerald-100"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Section 4: Key Takeaway (Bu Hafta Aklımızda Kalsın) */}
      {item.takeaway.length > 0 && (
        <section
          id={`${readerId}-aklimizda-kalsin`}
          className="rounded-2xl border border-amber-300/80 bg-amber-50/60 p-4 sm:p-5 dark:border-amber-800/60 dark:bg-amber-950/20"
        >
          <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-300">
            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Bu Hafta Aklımızda Kalsın</span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs leading-relaxed text-amber-950 sm:text-sm dark:text-amber-100">
            {item.takeaway.map((t, idx) => (
              <p key={idx}>{t}</p>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Sources if present */}
      {item.sources.length > 0 && (
        <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-500 dark:border-slate-800/60 dark:text-slate-400">
          <span className="font-semibold text-slate-600 dark:text-slate-300">Kaynaklar: </span>
          {item.sources.map((s, idx) => (
            <span key={idx} className="mr-2">
              [{idx + 1}] {s}
            </span>
          ))}
        </div>
      )}

      {/* Section 6: Vocabulary Cards Deck (Bu Hafta Tanıştığımız Kelimeler) */}
      {item.vocab.length > 0 && (
        <section
          id={`${readerId}-kelimeler`}
          className="rounded-2xl border border-teal-200/80 bg-teal-50/40 p-4 sm:p-5 dark:border-teal-900/40 dark:bg-teal-950/20"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-teal-900 dark:text-teal-300">
              <BookA className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <span>Bu Hafta Tanıştığımız Kelimeler</span>
            </div>
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">
              {item.vocab.length} Kavram
            </span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {item.vocab.map((v, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1.5 rounded-xl border border-teal-200/70 bg-white p-3 shadow-xs transition-shadow hover:shadow-md dark:border-teal-900/40 dark:bg-[#15232d]"
              >
                <div className="flex items-center justify-between gap-2 border-b border-teal-100/60 pb-1.5 dark:border-teal-900/40">
                  <h5 className="text-xs font-bold text-teal-950 sm:text-sm dark:text-teal-100">
                    {v.word}
                  </h5>
                  <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-semibold text-teal-800 dark:bg-teal-900/80 dark:text-teal-200">
                    Kavram #{idx + 1}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {v.definition}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reader Footer with Close and Top Scroll */}
      <div className="flex items-center justify-between border-t border-teal-100/80 pt-3 text-xs text-slate-500 dark:border-teal-900/40 dark:text-slate-400">
        <button
          type="button"
          onClick={() => scrollToSection("metin")}
          className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronUp className="h-3.5 w-3.5" />
          <span>Başa Dön</span>
        </button>

        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="h-3.5 w-3.5" />
            <span>Okumayı Kapat</span>
          </button>
        )}
      </div>

      {/* Viewport-Clamped Single Inline Tooltip */}
      {activeTooltip && (
        <div
          role="tooltip"
          aria-live="polite"
          className="animate-in fade-in zoom-in-95 absolute z-40 rounded-xl border border-teal-300/90 bg-white p-3.5 text-left shadow-xl duration-150 sm:p-4 dark:border-teal-700/80 dark:bg-[#15232d]"
          style={
            activeTooltip.placement === "top"
              ? {
                  left: activeTooltip.left,
                  bottom: activeTooltip.bottom,
                  width: activeTooltip.width,
                }
              : {
                  left: activeTooltip.left,
                  top: activeTooltip.top,
                  width: activeTooltip.width,
                }
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/* Arrow Caret pointing directly to clicked word */}
          {activeTooltip.placement === "top" ? (
            <div
              className="absolute -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-teal-300/90 bg-white dark:border-teal-700/80 dark:bg-[#15232d]"
              style={{ left: activeTooltip.caretX }}
            />
          ) : (
            <div
              className="absolute -top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-teal-300/90 bg-white dark:border-teal-700/80 dark:bg-[#15232d]"
              style={{ left: activeTooltip.caretX }}
            />
          )}

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 border-b border-teal-100 pb-1.5 dark:border-teal-900/60">
              <span className="flex items-center gap-1.5 text-xs font-bold text-teal-900 sm:text-sm dark:text-teal-200">
                <BookA className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <span>{activeTooltip.word}</span>
              </span>
              <button
                type="button"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                onClick={() => setActiveTooltip(null)}
                aria-label="Kapat"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed font-normal text-slate-700 sm:text-[13px] dark:text-slate-300">
              {activeTooltip.definition}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
