import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { getAllGradePlans, getGradePlan } from "@/lib/data/curriculum-plans";
import { TargetsProgressionLadder } from "./targets-progression-ladder";
import { TargetOutcomeCard } from "./target-outcome-card";
import { TargetUnitsAccordion } from "./target-units-accordion";
import { TargetsView } from "./targets-view";

describe("Targets UI Components (SSR & Rendering)", () => {
  const planM1 = getGradePlan(1)!;
  const planM4 = getGradePlan(4)!;
  const allPlans = getAllGradePlans();

  describe("TargetsProgressionLadder", () => {
    it("renders all 6 grades and active indicator", () => {
      const html = renderToString(
        <TargetsProgressionLadder plans={allPlans} selectedGrade={1} onSelectGrade={() => {}} />
      );

      expect(html).toContain("1. Sınıf");
      expect(html).toContain("M1");
      expect(html).toContain("6. Sınıf");
      expect(html).toContain("M6");
      expect(html).toContain("targets-ladder__step--active");
    });
  });

  describe("TargetOutcomeCard", () => {
    it("renders outcome showcase, motto, core goals, and method steps", () => {
      const html = renderToString(<TargetOutcomeCard plan={planM1} />);

      expect(html).toContain("Sene Sonu Kazanımı");
      expect(html).toContain(planM1.yearEndOutcome);
      expect(html).toContain(planM1.motto);
      expect(html).toContain("Kazanılacak Yetkinlikler");

      // Core goals rendered
      for (const goal of planM1.coreGoals) {
        expect(html).toContain(goal);
      }

      // Method steps rendered
      for (const step of planM1.methodSteps) {
        expect(html).toContain(step);
      }
    });
  });

  describe("TargetUnitsAccordion", () => {
    it("renders all 9 units, months (Eylül to Mayıs), and first unit open by default", () => {
      const html = renderToString(<TargetUnitsAccordion units={planM1.units} gradeCode="M1" />);

      expect(html).toContain("36 Haftalık Müfredat Planı");
      expect(html).toContain("Eylül");
      expect(html).toContain("Ekim");
      expect(html).toContain("Mayıs");
      expect(html).toContain("1. Ünite");
      expect(html).toContain("Tanışma ve Merak");
      expect(html).toContain("2. Ünite");
      expect(html).toContain("Besmele, İman ve Kulluk");
      expect(html).toContain("9. Ünite");

      // First unit is expanded by default in SSR, with topic and month/week indicator
      expect(html).toContain("Bu eser neden hâlâ okunuyor?");
      expect(html).toContain("Eylül 1");
    });
  });

  describe("TargetsView", () => {
    it("renders clean hero, ladder, outcome card, and units", () => {
      const html = renderToString(<TargetsView initialGrade={1} />);

      expect(html).toContain("Hedefler ve Yıllık Planlar");
      expect(html).toContain(planM1.yearEndOutcome);
      expect(html).toContain("/mufredat?sinif=1");
    });

    it("renders with initialGrade=4 (Lise 1)", () => {
      const html = renderToString(<TargetsView initialGrade={4} />);

      expect(html).toContain(planM4.yearEndOutcome);
      expect(html).toContain("/mufredat?sinif=4");
    });
  });
});
