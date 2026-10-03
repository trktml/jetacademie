import { describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import { CurriculumTopBar } from "./curriculum-top-bar";
import type { CurriculumPeriod } from "@/lib/curriculum-view";

describe("CurriculumTopBar", () => {
  const samplePeriods: CurriculumPeriod[] = [
    { year: 2026, month: 9, week: 1 },
    { year: 2026, month: 9, week: 2 },
    { year: 2026, month: 9, week: 3 },
    { year: 2026, month: 9, week: 4 },
  ];

  it("renders the grade selector, period button, and view mode toggle", () => {
    const html = renderToString(
      <CurriculumTopBar
        selectedGrade={2}
        onGradeChange={() => {}}
        view="weekly"
        onViewChange={() => {}}
        period={{ year: 2026, month: 9, week: 1 }}
        onPeriodChange={() => {}}
        availablePeriods={samplePeriods}
      />
    );

    // Grade button
    expect(html).toContain("2. Sınıf");
    // Period button
    expect(html).toContain("Eylül 2026 · 1. Hafta");
    // View mode switch
    expect(html).toContain("Sıralı");
    expect(html).toContain("Haftalık");
    // Accessibility attributes
    expect(html).toContain('aria-haspopup="listbox"');
    expect(html).toContain('aria-haspopup="dialog"');
  });

  it("reflects sequential mode and grade 1 correctly", () => {
    const html = renderToString(
      <CurriculumTopBar
        selectedGrade={1}
        onGradeChange={() => {}}
        view="sequential"
        onViewChange={() => {}}
        period={null}
        onPeriodChange={() => {}}
        availablePeriods={samplePeriods}
      />
    );

    expect(html).toContain("1. Sınıf");
    expect(html).not.toContain("Dönem Seçin");
    expect(html).not.toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-pressed="true"');
  });

  it("handles extra periods correctly", () => {
    const html = renderToString(
      <CurriculumTopBar
        selectedGrade={1}
        onGradeChange={() => {}}
        view="weekly"
        onViewChange={() => {}}
        period={{ extra: 2 }}
        onPeriodChange={() => {}}
        availablePeriods={[{ extra: 1 }, { extra: 2 }]}
      />
    );

    expect(html).toContain("Ekstra 2");
  });
});
