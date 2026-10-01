import { describe, expect, it } from "bun:test";
import { curriculumPlans, getAllGradePlans, getGradePlan } from "./curriculum-plans";

describe("curriculum-plans (M1–M6)", () => {
  it("contains exactly 6 grade plans for grades 1 through 6", () => {
    expect(curriculumPlans).toHaveLength(6);
    expect(getAllGradePlans()).toHaveLength(6);

    const grades = curriculumPlans.map((p) => p.grade);
    expect(grades).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("each plan has 9 units and exactly 36 weeks", () => {
    for (const plan of curriculumPlans) {
      expect(plan.units).toHaveLength(9);
      const totalWeeks = plan.units.reduce((sum, u) => sum + u.weeks.length, 0);
      expect(totalWeeks).toBe(36);

      // Weeks must be numbered sequentially from 1 to 36
      const weekNumbers = plan.units.flatMap((u) => u.weeks.map((w) => w.weekNumber));
      for (let i = 1; i <= 36; i++) {
        expect(weekNumbers[i - 1]).toBe(i);
      }
    }
  });

  it("contains valid stages, mottos, and outcomes for all grades", () => {
    const expectedStages = [
      "Merak ve Muhabbet",
      "Okuma ve Anlama",
      "Hayata Taşıma",
      "İhtiyaç Hissetme",
      "Tahkik ve Mukayese",
      "Bütünlük, Şahsî Duruş ve Temsil",
    ];

    for (let grade = 1; grade <= 6; grade++) {
      const plan = getGradePlan(grade);
      expect(plan).toBeDefined();
      expect(plan?.code).toBe(`M${grade}`);
      expect(plan?.stage).toBe(expectedStages[grade - 1]);
      expect(plan?.motto.length).toBeGreaterThan(15);
      expect(plan?.yearEndOutcome.length).toBeGreaterThan(20);
      expect(plan?.outcomeStatement.length).toBeGreaterThan(20);
      expect(plan?.coreGoals.length).toBeGreaterThanOrEqual(4);
      expect(plan?.methodSteps.length).toBeGreaterThanOrEqual(4);
      expect(plan?.familyRespectFocus.length).toBeGreaterThan(10);

      // Annual plans leave source selection open for the first four weeks.
      for (const unit of plan?.units ?? []) {
        for (const week of unit.weeks) {
          expect(week.topic.length).toBeGreaterThan(3);
          expect(week.mainQuestion.length).toBeGreaterThan(10);
          if (week.weekNumber <= 4) {
            expect(week.primarySource).toBeUndefined();
          } else {
            expect(week.primarySource!.length).toBeGreaterThan(3);
          }
          expect("purpose" in week).toBe(false);
        }
      }
    }
  });

  it("uses the updated Word plans for selected weekly topics and year-end outcomes", () => {
    const expected = [
      { grade: 1, week: 1, topic: "Bu eser neden hâlâ okunuyor?", outcome: "gönüllü" },
      {
        grade: 2,
        week: 1,
        topic: "Küçük Bir Terzi Dükkânında Başlayan Yolculuk",
        outcome: "ana fikrini",
      },
      {
        grade: 3,
        week: 36,
        topic: "Bir Hakikati Hayatıma Taşıyorum",
        outcome: "hayatına nasıl taşıyacağını",
      },
      { grade: 4, week: 1, topic: "Bir Kitap Ne Zaman 'Kaynak' Olur?", outcome: "iki kaynağın" },
      {
        grade: 5,
        week: 4,
        topic: "İddia, Delil ve Yorum: Üçünü Nasıl Ayırırım?",
        outcome: "tahkik dosyası",
      },
      {
        grade: 6,
        week: 36,
        topic: "Müfredat Bitince Okuma Nasıl Devam Eder?",
        outcome: "okuma planı",
      },
    ];

    for (const sample of expected) {
      const plan = getGradePlan(sample.grade)!;
      expect(plan.units.flatMap((unit) => unit.weeks)[sample.week - 1].topic).toBe(sample.topic);
      expect(plan.yearEndOutcome).toContain(sample.outcome);
    }
  });

  it("highlights Anne-Baba ve Büyüklere Hürmet in the new plan weeks", () => {
    const expectedWeeks = [[25], [25], [17], [28], [25, 26], [17, 19, 20]];
    for (let grade = 1; grade <= 6; grade++) {
      const plan = getGradePlan(grade)!;
      const highlightedWeeks = plan.units.flatMap((u) =>
        u.weeks.filter((w) => w.isFamilyRespectHighlight)
      );
      expect(highlightedWeeks.map((week) => week.weekNumber)).toEqual(expectedWeeks[grade - 1]);
    }
  });

  it("returns undefined for non-existent grades", () => {
    expect(getGradePlan(0)).toBeUndefined();
    expect(getGradePlan(7)).toBeUndefined();
  });
});
