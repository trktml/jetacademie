"use client";

import type { GradePlan } from "@/lib/data/curriculum-plans";

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

  return (
    <nav className="targets-ladder" aria-label="Sınıf ve Basamak Seçimi">
      {/* Sleek Segmented Switcher */}
      <div className="targets-ladder__track" role="tablist" aria-label="Sınıflar">
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
              className={`targets-ladder__step ${isSelected ? "targets-ladder__step--active" : ""}`}
              onClick={() => onSelectGrade(plan.grade)}
            >
              <span className="targets-ladder__code">{plan.code}</span>
              <span className="targets-ladder__dot" aria-hidden="true">
                ·
              </span>
              <span className="targets-ladder__grade-label">{`${plan.grade}. Sınıf`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Grade Stage Summary Line */}
      {activePlan && (
        <div className="targets-ladder__stage-summary">
          <span className="targets-ladder__stage-pill">{activePlan.code} Basamağı</span>
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
