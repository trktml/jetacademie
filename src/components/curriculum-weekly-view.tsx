"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, Play, X } from "lucide-react";
import { curriculumCategories, type CurriculumEntry } from "@/lib/curriculum";
import { curriculumMonthNames, weeklyGroups, type CurriculumPeriod } from "@/lib/curriculum-view";
import { EntryContentRenderer, EsmaCardHeader } from "./curriculum-entry-content";
import { InlinePdfViewer } from "./inline-pdf-viewer";

function WeeklyEntry({ entry }: { entry: CurriculumEntry }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const pdfUrl =
    entry.pdfUrl ??
    (entry.resourceUrl?.split("?")[0].endsWith(".pdf") ? entry.resourceUrl : undefined);
  return (
    <article className="weekly-entry">
      {entry.categoryId === "konu" &&
      entry.contentFormat !== "markdown" ? null : entry.categoryId === "esma" ? (
        <EsmaCardHeader entry={entry} />
      ) : (
        <h3 className="archive-entry-title">{entry.title}</h3>
      )}
      <EntryContentRenderer entry={entry} isExpanded renderVideo={mediaOpen && !pdfUrl} />
      {(pdfUrl || entry.resourceUrl) && (
        <div className="weekly-media">
          <button
            type="button"
            className="weekly-media-button"
            aria-expanded={mediaOpen}
            onClick={() => setMediaOpen(!mediaOpen)}
          >
            {mediaOpen ? (
              <X size={18} aria-hidden="true" />
            ) : pdfUrl ? (
              <BookOpen size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}
            {mediaOpen ? "Kapat" : pdfUrl ? "PDF’yi oku" : "Videoyu aç"}
          </button>
          {mediaOpen && pdfUrl && (
            <InlinePdfViewer
              pdfUrl={pdfUrl}
              title={entry.title}
              entryId={entry.id}
              onClose={() => setMediaOpen(false)}
            />
          )}
        </div>
      )}
    </article>
  );
}

export function CurriculumWeeklyView({
  entries,
  period,
  genderSelector,
}: {
  entries: readonly CurriculumEntry[];
  period: CurriculumPeriod | null;
  onPeriodChange?: (period: CurriculumPeriod) => void;
  genderSelector: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const capsule = document.querySelector(".archive-fixed-capsule");
    if (!capsule || !rootRef.current) return;
    const update = () =>
      rootRef.current?.style.setProperty(
        "--weekly-capsule-height",
        `${capsule.getBoundingClientRect().height}px`
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(capsule);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="archive-main-column weekly-view" ref={rootRef}>
      {period ? (
        <>
          <header className="weekly-heading" aria-live="polite" aria-atomic="true">
            <h2>
              {period.extra !== undefined
                ? `Ekstra ${period.extra}`
                : `${curriculumMonthNames[period.month - 1]} ${period.year} · ${period.week}. Hafta`}
            </h2>
            <p>Bu görünümde ilerlemeniz değişmez.</p>
          </header>
          {weeklyGroups(entries, period).map((group) => {
            const category = curriculumCategories.find((c) => c.id === group.categoryId)!;
            const Icon = category.icon;
            return (
              <section
                key={category.id}
                id={category.id}
                className="weekly-section archive-category-block"
                data-accent={category.accent}
                aria-labelledby={`weekly-title-${category.id}`}
              >
                <header className="weekly-section-heading">
                  <Icon size={20} aria-hidden="true" />
                  <h2 id={`weekly-title-${category.id}`}>{category.label}</h2>
                </header>
                {category.id === "ilmihal" && genderSelector}
                {group.entries.length ? (
                  group.entries.map((entry) => <WeeklyEntry key={entry.id} entry={entry} />)
                ) : (
                  <p className="weekly-empty">Bu hafta için yayımlanmış içerik bulunmuyor.</p>
                )}
              </section>
            );
          })}
        </>
      ) : (
        <p className="weekly-empty" role="status">
          Bu sınıf için yayımlanmış içerik bulunmuyor.
        </p>
      )}
    </div>
  );
}
