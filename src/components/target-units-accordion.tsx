"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Heart, BookOpen } from "lucide-react";
import type { PlanUnit, PlanWeek } from "@/lib/data/curriculum-plans";

interface TargetUnitsAccordionProps {
  units: readonly PlanUnit[];
  gradeCode: string;
}

const SCHOOL_MONTHS: readonly string[] = [
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

function formatUnitTitle(title: string): string {
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

  const areAllOpen = units.every((u) => openUnits[u.unitNumber]);

  return (
    <section className="target-units-section" aria-labelledby="target-units-heading">
      <div className="target-units-section__header">
        <h3 id="target-units-heading" className="target-units-section__title">
          36 Haftalık Müfredat Planı (Eylül – Mayıs)
        </h3>

        <button
          type="button"
          className="target-units-btn"
          onClick={areAllOpen ? collapseAll : expandAll}
        >
          {areAllOpen ? "Tümünü Kapat" : "Tümünü Genişlet"}
        </button>
      </div>

      <div className="target-units-list">
        {units.map((unit) => {
          const isOpen = Boolean(openUnits[unit.unitNumber]);
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
                  <span className="target-unit-card__month-pill">{month}</span>
                  <span className="target-unit-card__pill">{`${unit.unitNumber}. Ünite`}</span>
                  <span className="target-unit-card__period">{unit.period}</span>
                  <span className="target-unit-card__dot" aria-hidden="true">
                    ·
                  </span>
                  <h4 className="target-unit-card__name">{cleanTitle}</h4>
                </div>

                <div className="target-unit-card__trigger-right">
                  {hasFamilyHighlight && (
                    <span className="target-unit-card__family-tag">
                      <Heart className="h-3 w-3 text-rose-500" aria-hidden="true" />
                      <span>Hürmet Hattı</span>
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
      <div className="target-week-card__top">
        <div className="target-week-card__numbers">
          <span className="target-week-card__number">{`${week.weekNumber}. Hafta`}</span>
          <span className="target-week-card__month-sub">{`(${month} ${weekInMonth})`}</span>
        </div>
        {week.isFamilyRespectHighlight && (
          <span className="target-week-card__family-badge">
            <Heart className="h-3 w-3 text-rose-500" aria-hidden="true" />
            <span>Hürmet</span>
          </span>
        )}
      </div>

      <h5 className="target-week-card__topic">{week.topic}</h5>
      <p className="target-week-card__question">&ldquo;{week.mainQuestion}&rdquo;</p>

      <div className="target-week-card__source-box">
        <BookOpen className="text-ink-faint h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="target-week-card__source">{week.primarySource}</span>
      </div>
    </article>
  );
}
