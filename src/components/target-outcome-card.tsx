import { CheckCircle2, Target } from "lucide-react";
import type { GradePlan } from "@/lib/data/curriculum-plans";

interface TargetOutcomeCardProps {
  plan: GradePlan;
}

export function TargetOutcomeCard({ plan }: TargetOutcomeCardProps) {
  const isOrtaokul = plan.grade <= 3;

  return (
    <section className="target-outcome-card" aria-labelledby={`outcome-heading-${plan.grade}`}>
      {/* Top Meta Line: Badge & Motto */}
      <div className="target-outcome-card__top">
        <span
          className={`target-outcome-card__badge ${
            isOrtaokul ? "target-outcome-card__badge--orta" : "target-outcome-card__badge--lise"
          }`}
        >
          {plan.code} · {plan.schoolLevel} ({plan.grade}. Sınıf)
        </span>
        <blockquote className="target-outcome-card__motto">&ldquo;{plan.motto}&rdquo;</blockquote>
      </div>

      {/* Sene Sonu Nihai Kazanımı */}
      <div className="target-outcome-card__outcome-section">
        <div className="target-outcome-card__label-wrap">
          <Target className="target-outcome-card__target-icon" aria-hidden="true" />
          <h3 className="target-outcome-card__section-label">Sene Sonu Kazanımı</h3>
        </div>
        <p id={`outcome-heading-${plan.grade}`} className="target-outcome-card__outcome-text">
          {plan.yearEndOutcome}
        </p>
        <p className="target-outcome-card__student-voice">
          <strong>Yıl sonu öğrenci cümlesi:</strong> “{plan.outcomeStatement}”
        </p>
      </div>

      {/* Temel Yetkinlikler */}
      <div className="target-outcome-card__goals-section">
        <h4 className="target-outcome-card__goals-title">Kazanılacak Yetkinlikler</h4>
        <ul className="target-outcome-card__goals-grid">
          {plan.coreGoals.map((goal, index) => (
            <li key={index} className="target-outcome-card__goal-item">
              <CheckCircle2 className="target-outcome-card__goal-icon" aria-hidden="true" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
        {plan.entryNote && <p className="target-outcome-card__entry-note">{plan.entryNote}</p>}
      </div>

      <div className="target-outcome-card__method-section">
        <h4 className="target-outcome-card__goals-title">Bu yılın çalışma yöntemi</h4>
        <p className="target-outcome-card__method-steps">{plan.methodSteps.join(" → ")}</p>
      </div>
    </section>
  );
}
