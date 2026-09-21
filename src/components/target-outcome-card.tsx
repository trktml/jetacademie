import {
  Compass,
  BookOpen,
  HeartHandshake,
  Flame,
  Scale,
  Award,
  CheckCircle2,
  ArrowRight,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { GradePlan } from "@/lib/data/curriculum-plans";

interface TargetOutcomeCardProps {
  plan: GradePlan;
}

export const STAGE_ICONS: Record<number, LucideIcon> = {
  1: Compass,
  2: BookOpen,
  3: HeartHandshake,
  4: Flame,
  5: Scale,
  6: Award,
};

export function TargetOutcomeCard({ plan }: TargetOutcomeCardProps) {
  const isOrtaokul = plan.grade <= 3;
  const StageIcon = STAGE_ICONS[plan.grade] ?? Flame;

  return (
    <section className="target-outcome-card" aria-labelledby={`outcome-heading-${plan.grade}`}>
      {/* Header: Grade & Motto */}
      <div className="target-outcome-card__header">
        <div className="target-outcome-card__meta">
          <span
            className={`target-outcome-card__badge ${
              isOrtaokul ? "target-outcome-card__badge--orta" : "target-outcome-card__badge--lise"
            }`}
          >
            {plan.code} · {plan.schoolLevel} ({plan.grade}. Sınıf)
          </span>
          <span className="target-outcome-card__stage-pill">
            <StageIcon className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            <span>{plan.stage}</span>
          </span>
        </div>

        <blockquote className="target-outcome-card__motto">&ldquo;{plan.motto}&rdquo;</blockquote>
      </div>

      {/* Sene Sonu Nihai Kazanımı Showcase */}
      <div className="target-outcome-card__showcase">
        <div className="target-outcome-card__showcase-badge">
          <Target className="h-4 w-4 text-amber-500" aria-hidden="true" />
          <span>Sene Sonu Kazanımı</span>
        </div>
        <p id={`outcome-heading-${plan.grade}`} className="target-outcome-card__showcase-text">
          {plan.yearEndOutcome}
        </p>
      </div>

      {/* Temel Yetkinlikler */}
      <div className="target-outcome-card__goals-box">
        <h4 className="target-outcome-card__goals-title">Kazanılacak Yetkinlikler</h4>
        <ul className="target-outcome-card__goals-list">
          {plan.coreGoals.map((goal, index) => (
            <li key={index} className="target-outcome-card__goal-item">
              <CheckCircle2 className="target-outcome-card__goal-icon" aria-hidden="true" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Okuma ve Çalışma Usulü */}
      {plan.methodSteps && plan.methodSteps.length > 0 && (
        <div className="target-outcome-card__method-box">
          <span className="target-outcome-card__method-label">Çalışma Usulü:</span>
          <div className="target-outcome-card__method-steps">
            {plan.methodSteps.map((step, idx) => (
              <div key={idx} className="target-outcome-card__method-step-wrap">
                <span className="target-outcome-card__method-step">{step}</span>
                {idx < plan.methodSteps.length - 1 && (
                  <ArrowRight className="target-outcome-card__method-arrow" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
