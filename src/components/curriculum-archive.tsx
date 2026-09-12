"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  FileClock,
  FolderOpen,
  LockKeyhole,
} from "lucide-react";
import {
  curriculumCategories,
  getCategoryEntries,
  getUnlockedEntryIndex,
  type CurriculumCategoryId,
} from "@/lib/curriculum";
import { markEntryAsRead } from "@/app/mufredat/actions";
import { useUiStore } from "@/store/use-ui-store";

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
}

export function CurriculumArchive({
  initialCompletedEntryIds,
  isSignedIn,
}: CurriculumArchiveProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<CurriculumCategoryId>("ayet");
  const [completedEntryIds, setCompletedEntryIds] = useState(initialCompletedEntryIds);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const openAccount = useUiStore((state) => state.openAccount);

  const entries = useMemo(() => getCategoryEntries(activeCategoryId), [activeCategoryId]);
  const completedSet = useMemo(() => new Set(completedEntryIds), [completedEntryIds]);
  const unlockedIndex = getUnlockedEntryIndex(entries, completedSet);
  const activeEntry = entries[visibleIndex];
  const category = curriculumCategories.find((item) => item.id === activeCategoryId)!;
  const isCurrentUnread = Boolean(activeEntry && !completedSet.has(activeEntry.id));
  const canGoForward = Boolean(activeEntry && visibleIndex < unlockedIndex);
  const completedCount = entries.filter((entry) => completedSet.has(entry.id)).length;

  function selectCategory(categoryId: CurriculumCategoryId) {
    const nextEntries = getCategoryEntries(categoryId);
    setActiveCategoryId(categoryId);
    setVisibleIndex(Math.max(0, getUnlockedEntryIndex(nextEntries, completedSet)));
    setMessage(null);
  }

  function completeCurrentEntry() {
    if (!activeEntry) return;
    if (!isSignedIn) {
      openAccount();
      return;
    }

    startTransition(async () => {
      try {
        await markEntryAsRead(activeEntry.id);
        setCompletedEntryIds((ids) => [...new Set([...ids, activeEntry.id])]);
        setMessage("Dosya okundu olarak kaydedildi.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "İlerleme kaydedilemedi.");
      }
    });
  }

  return (
    <section className="archive-workspace" aria-label="Müfredat arşivi">
      <aside className="archive-cabinet" aria-label="Müfredat çekmeceleri">
        <div className="cabinet-heading">
          <span>Arşiv 01</span>
          <strong>Konu çekmeceleri</strong>
        </div>
        <div className="drawer-list">
          {curriculumCategories.map((item, index) => {
            const Icon = item.icon;
            const itemEntries = getCategoryEntries(item.id);
            const itemCompleted = itemEntries.filter((entry) => completedSet.has(entry.id)).length;
            const isActive = item.id === activeCategoryId;

            return (
              <button
                key={item.id}
                type="button"
                className="archive-drawer"
                data-active={isActive}
                data-accent={item.accent}
                aria-pressed={isActive}
                onClick={() => selectCategory(item.id)}
              >
                <span className="archive-drawer__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="archive-drawer__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="archive-drawer__label">{item.label}</span>
                <span className="archive-drawer__count">
                  {itemEntries.length ? `${itemCompleted}/${itemEntries.length}` : "—"}
                </span>
                <ChevronRight aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </aside>

      <div className="file-workspace">
        <div className="file-toolbar">
          <div>
            <span className="file-toolbar__label">Açık çekmece</span>
            <strong>{category.label}</strong>
          </div>
          <div className="file-toolbar__progress">
            <span>
              {entries.length
                ? `${completedCount} / ${entries.length} tamamlandı`
                : "Program bekleniyor"}
            </span>
            <div className="progress-track" aria-hidden="true">
              <span
                style={{
                  width: entries.length ? `${(completedCount / entries.length) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </div>

        <div className="file-stage">
          <div className="file-shadow file-shadow--three" aria-hidden="true" />
          <div className="file-shadow file-shadow--two" aria-hidden="true" />
          <div className="file-shadow file-shadow--one" aria-hidden="true" />

          <article className="curriculum-file" aria-live="polite">
            <div className="curriculum-file__tab">
              {activeEntry
                ? `${monthNames[activeEntry.month - 1]} · ${activeEntry.week}. Hafta`
                : "Dosya bekleniyor"}
            </div>

            {activeEntry ? (
              <>
                <header className="curriculum-file__header">
                  <div>
                    <p className="eyebrow">{activeEntry.year} çalışma dosyası</p>
                    <h2>{activeEntry.title}</h2>
                  </div>
                  {completedSet.has(activeEntry.id) ? (
                    <span className="read-status read-status--complete">
                      <Check aria-hidden="true" /> Okundu
                    </span>
                  ) : visibleIndex > unlockedIndex ? (
                    <span className="read-status">
                      <LockKeyhole aria-hidden="true" /> Kilitli
                    </span>
                  ) : (
                    <span className="read-status">
                      <FileClock aria-hidden="true" /> Sıradaki
                    </span>
                  )}
                </header>
                <div className="curriculum-file__body">
                  {activeEntry.body ? (
                    <p>{activeEntry.body}</p>
                  ) : (
                    <p>Bu dosyanın içeriği henüz eklenmedi.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-file">
                <span>
                  <FolderOpen aria-hidden="true" />
                </span>
                <p className="eyebrow">{category.label}</p>
                <h2>Henüz haftalık içerik yayımlanmadı.</h2>
                <p>İlk dosya eklendiğinde burada ay ve hafta sırasıyla görünecek.</p>
              </div>
            )}
          </article>
        </div>

        <div className="file-navigation">
          <button
            type="button"
            className="secondary-button"
            disabled={!activeEntry || visibleIndex === 0}
            onClick={() => setVisibleIndex((index) => Math.max(0, index - 1))}
          >
            <ArrowLeft aria-hidden="true" /> Öncekiler
          </button>

          {activeEntry && isCurrentUnread && visibleIndex === unlockedIndex && (
            <button
              type="button"
              className="primary-button"
              onClick={completeCurrentEntry}
              disabled={isPending}
            >
              <Check aria-hidden="true" /> {isPending ? "Kaydediliyor…" : "Okundu işaretle"}
            </button>
          )}

          <button
            type="button"
            className="secondary-button"
            disabled={!canGoForward}
            onClick={() => setVisibleIndex((index) => index + 1)}
          >
            Sonraki <ArrowRight aria-hidden="true" />
          </button>
        </div>
        {message && (
          <p className="archive-message" role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
