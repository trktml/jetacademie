"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, FileClock, FolderOpen, LockKeyhole } from "lucide-react";
import {
  curriculumCategories,
  getCategoryEntries,
  getCategoryShortLabel,
  getUnlockedEntryIndex,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { markEntryAsRead } from "@/app/mufredat/actions";
import { useUiStore } from "@/store/use-ui-store";
import { useActiveSection } from "@/hooks/use-active-section";

const monthNames = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

interface CurriculumArchiveProps {
  initialCompletedEntryIds: string[];
  isSignedIn: boolean;
  customEntries?: readonly CurriculumEntry[];
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
  customEntries,
}: CurriculumArchiveProps) {
  const categoryIds = useMemo(() => curriculumCategories.map((c) => c.id), []);
  const [activeCategoryId, setActiveCategoryId] = useActiveSection(categoryIds, "ayet");
  const [completedEntryIds, setCompletedEntryIds] = useState(initialCompletedEntryIds);
  const [pendingEntryId, setPendingEntryId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  const completedSet = useMemo(() => new Set(completedEntryIds), [completedEntryIds]);

  function scrollToCategory(categoryId: CurriculumCategoryId) {
    setActiveCategoryId(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function completeEntry(entryId: string) {
    if (!isSignedIn) {
      openAccount();
      return;
    }

    setPendingEntryId(entryId);
    startTransition(async () => {
      try {
        await markEntryAsRead(entryId);
        setCompletedEntryIds((ids) => [...new Set([...ids, entryId])]);
        setMessage("Dosya okundu olarak kaydedildi.");
        setTimeout(() => setMessage(null), 3500);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "İlerleme kaydedilemedi.");
        setTimeout(() => setMessage(null), 4000);
      } finally {
        setPendingEntryId(null);
      }
    });
  }

  return (
    <div className="archive-layout" aria-label="Müfredat arşivi">
      {/* Sol Sabit Kapsül Navigasyon (Fixed Capsule Rail) */}
      <aside className="archive-fixed-capsule" aria-label="Müfredat Hızlı Menü">
        <nav className="archive-capsule-list" aria-label="Kategori Listesi">
          {curriculumCategories.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeCategoryId;
            const shortLabel = getCategoryShortLabel(item.id);

            return (
              <button
                key={item.id}
                type="button"
                className="archive-capsule-item"
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.label}
                title={item.label}
                onClick={() => scrollToCategory(item.id)}
              >
                <span className="archive-capsule-icon-wrap" aria-hidden="true">
                  <Icon />
                </span>
                <span className="archive-capsule-label">{shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Dikey Alt Alta Arşiv Akışı (All Categories Stacked Vertically) */}
      <div className="archive-feed">
        {curriculumCategories.map((category, index) => {
          const Icon = category.icon;
          const entries = customEntries
            ? customEntries.filter((e) => e.categoryId === category.id)
            : getCategoryEntries(category.id);
          const unlockedIndex = getUnlockedEntryIndex(entries, completedSet);
          const completedCount = entries.filter((e) => completedSet.has(e.id)).length;

          return (
            <section
              key={category.id}
              id={category.id}
              className="archive-category-block scroll-mt-20 sm:scroll-mt-24"
              data-category={category.id}
              aria-labelledby={`heading-${category.id}`}
            >
              {/* Kategori Başlığı */}
              <header className="archive-category-header">
                <div className="archive-category-header__info">
                  <div
                    className="archive-category-icon-box"
                    data-accent={category.accent}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>
                  <div>
                    <div className="archive-category-eyebrow">
                      <span>{String(index + 1).padStart(2, "0")} · ARŞİV DOSYASI</span>
                      {category.resourceType && (
                        <span className="archive-resource-badge">
                          {category.resourceType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h2 id={`heading-${category.id}`} className="archive-category-title">
                      {category.label}
                    </h2>
                  </div>
                </div>

                <div className="archive-category-progress">
                  <span className="archive-category-progress__count">
                    {entries.length > 0
                      ? `${completedCount} / ${entries.length} tamamlandı`
                      : "Henüz içerik yayımlanmadı"}
                  </span>
                  {entries.length > 0 && (
                    <div className="archive-progress-track" aria-hidden="true">
                      <div
                        className="archive-progress-fill"
                        style={{
                          width: `${(completedCount / entries.length) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </header>

              {/* Kategori Dosyaları - Alt Alta Sıralı */}
              <div className="archive-category-body">
                {entries.length > 0 ? (
                  entries.map((entry, entryIdx) => {
                    const isCompleted = completedSet.has(entry.id);
                    const isCurrent = !isCompleted && entryIdx === unlockedIndex;
                    const isEntryPending = isPending && pendingEntryId === entry.id;

                    return (
                      <article
                        key={entry.id}
                        className="archive-entry-card"
                        data-status={isCompleted ? "completed" : isCurrent ? "current" : "locked"}
                      >
                        <div className="archive-entry-card__top">
                          <span className="archive-entry-timing">
                            {`${monthNames[entry.month - 1]}-${entry.week}`}
                          </span>
                          <span
                            className={`read-status ${isCompleted ? "read-status--complete" : ""}`}
                          >
                            {isCompleted ? (
                              <>
                                <Check aria-hidden="true" /> Okundu
                              </>
                            ) : isCurrent ? (
                              <>
                                <FileClock aria-hidden="true" /> Sıradaki
                              </>
                            ) : (
                              <>
                                <LockKeyhole aria-hidden="true" /> Kilitli
                              </>
                            )}
                          </span>
                        </div>

                        <h3 className="archive-entry-title">{entry.title}</h3>

                        {entry.body && <p className="archive-entry-desc">{entry.body}</p>}

                        {isCurrent && (
                          <div className="archive-entry-actions">
                            <button
                              type="button"
                              className="primary-button"
                              onClick={() => completeEntry(entry.id)}
                              disabled={isEntryPending}
                            >
                              <Check aria-hidden="true" />
                              {isEntryPending ? "Kaydediliyor…" : "Okundu işaretle"}
                            </button>
                          </div>
                        )}
                      </article>
                    );
                  })
                ) : (
                  <div className="archive-empty-card">
                    <div className="archive-empty-card__icon" aria-hidden="true">
                      <FolderOpen />
                    </div>
                    <div className="archive-empty-card__text">
                      <h4>{category.label} haftalık dosyaları hazırlanıyor</h4>
                      <p>
                        Yeni dosyalar eklendiğinde burada hafta hafta sıralı ve kilitli olarak
                        listelenecektir.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {message && (
        <aside className="archive-toast" role="status" aria-live="polite">
          <Check aria-hidden="true" className="h-4 w-4 text-emerald-400" />
          <span>{message}</span>
        </aside>
      )}
    </div>
  );
}
