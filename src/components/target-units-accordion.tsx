"use client";

import { useState, useId } from "react";
import { ChevronDown, ChevronUp, Heart, BookOpen, Search, X } from "lucide-react";
import type { PlanUnit, PlanWeek } from "@/lib/data/curriculum-plans";

interface TargetUnitsAccordionProps {
  units: readonly PlanUnit[];
}

export const SCHOOL_MONTHS: readonly string[] = [
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
];

export function getUnitMonth(unitNumber: number): string {
  return SCHOOL_MONTHS[unitNumber - 1] ?? `${unitNumber}. Ay`;
}

export function formatUnitTitle(title: string): string {
  const smallWords = new Set(["ve", "veya", "ile", "de", "da", "mi", "mu", "mü", "mı"]);
  const cleaned = title.replace(/^\d+\.\s*ÜNİTE\s*[—–-]\s*/i, "").trim();
  return cleaned
    .split(" ")
    .map((word, index) => {
      const lower = word.toLocaleLowerCase("tr");
      if (index > 0 && smallWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toLocaleUpperCase("tr") + lower.slice(1);
    })
    .join(" ");
}

export function TargetUnitsAccordion({ units }: TargetUnitsAccordionProps) {
  // First unit open by default
  const [openUnits, setOpenUnits] = useState<Record<number, boolean>>({ 1: true });
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputId = useId();

  const toggleUnit = (unitNumber: number) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitNumber]: !prev[unitNumber],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {};
    units.forEach((u) => {
      allOpen[u.unitNumber] = true;
    });
    setOpenUnits(allOpen);
  };

  const collapseAll = () => {
    setOpenUnits({});
  };

  const handleMonthSelect = (monthIdx: number | null) => {
    setSelectedMonth(monthIdx);
    if (monthIdx !== null) {
      setOpenUnits({ [monthIdx]: true });
    }
  };

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("tr");

  const filteredUnits = units
    .filter((unit) => {
      if (selectedMonth !== null && unit.unitNumber !== selectedMonth) {
        return false;
      }
      return true;
    })
    .map((unit) => {
      if (!normalizedQuery) {
        return unit;
      }
      const matchingWeeks = unit.weeks.filter(
        (w) =>
          w.topic.toLocaleLowerCase("tr").includes(normalizedQuery) ||
          w.mainQuestion.toLocaleLowerCase("tr").includes(normalizedQuery) ||
          w.primarySource.toLocaleLowerCase("tr").includes(normalizedQuery)
      );
      return {
        ...unit,
        weeks: matchingWeeks,
      };
    })
    .filter((unit) => unit.weeks.length > 0);

  const areAllOpen = units.every((u) => openUnits[u.unitNumber]);

  return (
    <section className="target-units-section" aria-labelledby="target-units-heading">
      {/* Section Header */}
      <div className="target-units-section__header">
        <div className="target-units-section__title-group">
          <h3 id="target-units-heading" className="target-units-section__title">
            36 Haftalık Müfredat Planı (Eylül – Mayıs)
          </h3>
          <p className="target-units-section__subtitle">
            Haftalık konular, ana sorular ve kaynaklar.
          </p>
        </div>

        <button
          type="button"
          className="target-units-btn"
          onClick={areAllOpen ? collapseAll : expandAll}
        >
          {areAllOpen ? "Tümünü Kapat" : "Tümünü Aç"}
        </button>
      </div>

      {/* Filter Bar: Month Pills & Search Input */}
      <div className="target-units-filters">
        {/* Month Pills */}
        <div className="target-month-pills" role="group" aria-label="Ay seçimi">
          <button
            type="button"
            className={`target-month-pill ${selectedMonth === null ? "target-month-pill--active" : ""}`}
            onClick={() => handleMonthSelect(null)}
          >
            Tümü (36 Hafta)
          </button>
          {SCHOOL_MONTHS.map((monthName, idx) => {
            const unitNumber = idx + 1;
            const isSelected = selectedMonth === unitNumber;
            return (
              <button
                key={monthName}
                type="button"
                className={`target-month-pill ${isSelected ? "target-month-pill--active" : ""}`}
                onClick={() => handleMonthSelect(isSelected ? null : unitNumber)}
              >
                {monthName}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="target-units-search-wrap" role="search" suppressHydrationWarning>
          <Search className="target-units-search-icon" aria-hidden="true" />
          <input
            id={searchInputId}
            type="search"
            name="curriculum-search"
            className="target-units-search-input"
            placeholder="Konu, soru veya kaynak ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Müfredatta ara"
            autoComplete="off"
            data-protonpass-ignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            data-lpignore="true"
            suppressHydrationWarning
          />
          {searchQuery && (
            <button
              type="button"
              className="target-units-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredUnits.length === 0 && (
        <div className="target-units-empty">
          <p className="target-units-empty__text">
            &ldquo;{searchQuery}&rdquo; ile eşleşen bir hafta bulunamadı.
          </p>
          <button
            type="button"
            className="target-units-empty__btn"
            onClick={() => {
              setSearchQuery("");
              setSelectedMonth(null);
            }}
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* Units List */}
      <div className="target-units-list">
        {filteredUnits.map((unit) => {
          const isSearching = Boolean(normalizedQuery);
          const isOpen = isSearching || Boolean(openUnits[unit.unitNumber]);
          const hasFamilyHighlight = unit.weeks.some((w) => w.isFamilyRespectHighlight);
          const cleanTitle = formatUnitTitle(unit.title);
          const month = getUnitMonth(unit.unitNumber);

          return (
            <div
              key={unit.unitNumber}
              className={`target-unit-card ${isOpen ? "target-unit-card--open" : ""}`}
            >
              <button
                type="button"
                className="target-unit-card__trigger"
                onClick={() => toggleUnit(unit.unitNumber)}
                aria-expanded={isOpen}
                aria-controls={`unit-content-${unit.unitNumber}`}
                id={`unit-trigger-${unit.unitNumber}`}
              >
                <div className="target-unit-card__trigger-left">
                  <span className="target-unit-card__pill">{`${unit.unitNumber}. Ünite`}</span>
                  <span className="target-unit-card__month-label">{month}</span>
                  <span className="target-unit-card__dot" aria-hidden="true">
                    ·
                  </span>
                  <h4 className="target-unit-card__name">{cleanTitle}</h4>
                </div>

                <div className="target-unit-card__trigger-right">
                  {hasFamilyHighlight && (
                    <span
                      className="target-unit-card__family-tag"
                      title="Anne-Baba ve Büyüklere Hürmet"
                    >
                      <Heart className="h-3 w-3 text-rose-500" aria-hidden="true" />
                      <span>Hürmet</span>
                    </span>
                  )}
                  <span className="target-unit-card__chevron-wrap">
                    {isOpen ? (
                      <ChevronUp className="text-ink-soft h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="text-ink-soft h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div
                  id={`unit-content-${unit.unitNumber}`}
                  role="region"
                  aria-labelledby={`unit-trigger-${unit.unitNumber}`}
                  className="target-unit-card__body"
                >
                  <div className="target-unit-card__weeks-grid">
                    {unit.weeks.map((week) => (
                      <WeekCard key={week.weekNumber} week={week} month={month} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WeekCard({ week, month }: { week: PlanWeek; month: string }) {
  const weekInMonth = ((week.weekNumber - 1) % 4) + 1;

  return (
    <article
      className={`target-week-card ${
        week.isFamilyRespectHighlight ? "target-week-card--family" : ""
      }`}
    >
      {/* Top Meta: Week Number, Month & Optional Tag */}
      <div className="target-week-card__top">
        <div className="target-week-card__numbers">
          <span className="target-week-card__number">{`${week.weekNumber}. Hafta`}</span>
          <span className="target-week-card__month-sub">{`${month} ${weekInMonth}`}</span>
        </div>
        {week.isFamilyRespectHighlight && (
          <span className="target-week-card__family-badge" title="Anne-Baba ve Büyüklere Hürmet">
            <Heart className="h-3 w-3 text-rose-500" aria-hidden="true" />
            <span>Hürmet</span>
          </span>
        )}
      </div>

      {/* Week Topic (Konu) */}
      <h5 className="target-week-card__topic">{week.topic}</h5>

      {/* Guiding Question (Düşünce Sorusu) */}
      <p className="target-week-card__question">&ldquo;{week.mainQuestion}&rdquo;</p>

      {/* Source Reference (Kaynak) */}
      <div className="target-week-card__source-box">
        <BookOpen className="text-ink-faint h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="target-week-card__source">{week.primarySource}</span>
      </div>
    </article>
  );
}
