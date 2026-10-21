import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { getAllGradePlans, getGradePlan } from "@/lib/data/curriculum-plans";
import { TargetsProgressionLadder } from "./targets-progression-ladder";
import { TargetOutcomeCard } from "./target-outcome-card";
import { TargetUnitsAccordion, weekCurriculumPeriod } from "./target-units-accordion";
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
      expect(html).toContain("6. Sınıf");
      expect(html).toContain("M1 Basamağı");
      expect(html).toContain("curriculum-grade-nav__track");
      expect(html).toContain("curriculum-grade-nav__item--active");
    });
  });

  describe("TargetOutcomeCard", () => {
    it("renders outcome, student success statement, goals, and method", () => {
      const html = renderToString(<TargetOutcomeCard plan={planM1} />);

      expect(html).toContain("Sene Sonu Kazanımı");
      expect(html).toContain(planM1.yearEndOutcome);
      expect(html).toContain(planM1.motto);
      expect(html).toContain("Kazanılacak Yetkinlikler");
      expect(html).toContain(planM1.outcomeStatement);
      expect(html).toContain(planM1.methodSteps.join(" → "));

      // Core goals rendered
      for (const goal of planM1.coreGoals) {
        expect(html).toContain(goal);
      }

      expect(html).not.toContain("M1 ön koşul değildir");
    });
  });

  describe("TargetUnitsAccordion", () => {
    it("renders all 9 units, months (Eylül to Mayıs), and first unit open by default", () => {
      const html = renderToString(
        <TargetUnitsAccordion units={planM1.units} grade={planM1.grade} />
      );

      expect(html).toContain("36 Haftalık Müfredat Planı");
      expect(html).toContain("Eylül");
      expect(html).toContain("Ekim");
      expect(html).toContain("Mayıs");
      expect(html).toContain("1. Ünite");
      expect(html).toContain("Tanışma ve Merak");
      expect(html).toContain("2. Ünite");
      expect(html).toContain("Besmele, İman ve Kulluk");
      expect(html).toContain("9. Ünite");

      // First unit is expanded by default with the annual plan's topic and question.
      expect(html).toContain("Bu eser neden hâlâ okunuyor?");
      expect(html).toContain(planM1.units[0].weeks[0].mainQuestion);
      expect(html).not.toContain("target-week-card__source-box");
      expect(html).not.toContain("Maksat");
      expect(html).toContain("Eylül 1");

      // Search input should have attributes to prevent extension hydration mismatches
      expect(html).toContain('data-protonpass-ignore="true"');
      expect(html).toContain('data-1p-ignore="true"');
      expect(html).toContain('data-bwignore="true"');
      expect(html).toContain('autoComplete="off"');
    });

    it("links each week card to its weekly curriculum period", () => {
      const html = renderToString(
        <TargetUnitsAccordion units={planM4.units} grade={planM4.grade} />
      ).replaceAll("&amp;", "&");

      // Unit 1 is open by default: weeks 1-4 map to Eylül 1-4.
      expect(html).toContain('href="/mufredat?sinif=4&gorunum=haftalik&ay=9&hafta=1"');
      expect(html).toContain('href="/mufredat?sinif=4&gorunum=haftalik&ay=9&hafta=4"');
      expect(html).toContain("Müfredatta aç");
    });

    it("maps plan weeks to curriculum months (Eylül – Mayıs)", () => {
      expect(weekCurriculumPeriod(1, 1)).toEqual({ month: 9, week: 1 });
      expect(weekCurriculumPeriod(1, 4)).toEqual({ month: 9, week: 4 });
      expect(weekCurriculumPeriod(2, 5)).toEqual({ month: 10, week: 1 });
      expect(weekCurriculumPeriod(5, 17)).toEqual({ month: 1, week: 1 });
      expect(weekCurriculumPeriod(9, 36)).toEqual({ month: 5, week: 4 });
    });
  });

  describe("TargetsView", () => {
    it("renders clean hero, ladder, outcome card, and units", () => {
      const html = renderToString(<TargetsView initialGrade={1} />);

      expect(html).toContain("Hedefler ve Yıllık Planlar");
      expect(html).toContain("page-header");
      expect(html).toContain("text-center");
      expect(html).not.toContain("M1–M6 yıllık planlarından hedefler ve haftalık yol haritası.");
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
