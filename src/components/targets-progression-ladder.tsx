"use client";

import {
  Compass,
  BookOpen,
  HeartHandshake,
  KeyRound,
  Scale,
  Award,
  type LucideIcon,
} from "lucide-react";
import type { GradePlan } from "@/lib/data/curriculum-plans";

interface TargetsProgressionLadderProps {
  plans: readonly GradePlan[];
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
}

const STAGE_ICONS: Record<number, LucideIcon> = {
  1: Compass,
  2: BookOpen,
  3: HeartHandshake,
  4: KeyRound,
  5: Scale,
  6: Award,
};

export function TargetsProgressionLadder({
  plans,
  selectedGrade,
  onSelectGrade,
}: TargetsProgressionLadderProps) {
  return (
    <nav className="targets-ladder" aria-label="Sınıf ve Basamak Seçimi">
      {/* 6 Milestone Step Cards */}
      <div className="targets-ladder__track" role="tablist" aria-label="Sınıflar">
        {plans.map((plan) => {
          const isSelected = plan.grade === selectedGrade;
          const Icon = STAGE_ICONS[plan.grade] ?? Compass;
          const isOrtaokul = plan.grade <= 3;

          return (
            <button
              key={plan.grade}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`target-panel-${plan.grade}`}
              id={`target-tab-${plan.grade}`}
              className={`targets-ladder__step ${
                isSelected ? "targets-ladder__step--active" : ""
              } ${isOrtaokul ? "targets-ladder__step--orta" : "targets-ladder__step--lise"}`}
              onClick={() => onSelectGrade(plan.grade)}
            >
              <div className="targets-ladder__step-header">
                <div className="targets-ladder__step-badge">
                  <span className="targets-ladder__code">{plan.code}</span>
                  <span className="targets-ladder__grade-label">{`${plan.grade}. Sınıf`}</span>
                </div>
                <div className="targets-ladder__icon-wrap" aria-hidden="true">
                  <Icon className="targets-ladder__icon" />
                </div>
              </div>

              <div className="targets-ladder__step-content">
                <span className="targets-ladder__step-stage">{plan.stage}</span>
              </div>

              <div className="targets-ladder__active-bar" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
