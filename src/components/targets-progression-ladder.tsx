"use client";

import type { GradePlan } from "@/lib/data/curriculum-plans";
import { GRADE_LABELS, type BelgiumGrade } from "@/lib/curriculum";

interface TargetsProgressionLadderProps {
  plans: readonly GradePlan[];
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
}

export function TargetsProgressionLadder({
  plans,
  selectedGrade,
  onSelectGrade,
}: TargetsProgressionLadderProps) {
  const activePlan = plans.find((p) => p.grade === selectedGrade) ?? plans[0];

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = plans.findIndex((p) => p.grade === selectedGrade);
    if (currentIndex === -1) return;
    const nextIndex =
      event.key === "ArrowRight"
        ? (currentIndex + 1) % plans.length
        : (currentIndex - 1 + plans.length) % plans.length;
    onSelectGrade(plans[nextIndex].grade);
  }

  return (
    <nav className="targets-ladder" aria-label="Sınıf ve Basamak Seçimi">
      {/* Segmented Switcher matching Curriculum page */}
      <div
        className="curriculum-grade-nav__track"
        role="tablist"
        aria-label="Belçika müfredat sınıfları"
        onKeyDown={handleKeyDown}
      >
        {plans.map((plan) => {
          const isSelected = plan.grade === selectedGrade;

          return (
            <button
              key={plan.grade}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`target-panel-${plan.grade}`}
              id={`target-tab-${plan.grade}`}
              tabIndex={isSelected ? 0 : -1}
              className={`curriculum-grade-nav__item ${isSelected ? "curriculum-grade-nav__item--active" : ""}`}
              onClick={() => onSelectGrade(plan.grade)}
            >
              <span>{GRADE_LABELS[plan.grade as BelgiumGrade] ?? `${plan.grade}. Sınıf`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Grade Stage Summary Line */}
      {activePlan && (
        <div className="targets-ladder__stage-summary">
          <span className="targets-ladder__stage-pill">{`${activePlan.code} Basamağı`}</span>
          <span className="targets-ladder__stage-text">
            <strong>{activePlan.stage}</strong>
            <span className="targets-ladder__stage-sep"> — </span>
            <span className="targets-ladder__stage-motto">&ldquo;{activePlan.motto}&rdquo;</span>
          </span>
        </div>
      )}
    </nav>
  );
}
