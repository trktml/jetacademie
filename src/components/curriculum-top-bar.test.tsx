import { describe, expect, it } from "bun:test";
import { renderToString } from "react-dom/server";
import { CurriculumTopBar } from "./curriculum-top-bar";

describe("CurriculumTopBar", () => {
  it("renders the grade selector, period button, and view mode toggle", () => {
    const html = renderToString(
      <CurriculumTopBar
        selectedGrade={2}
        onGradeChange={() => {}}
        view="weekly"
        onViewChange={() => {}}
        period={{ month: 9, week: 1 }}
        onPeriodChange={() => {}}
      />
    );

    // Grade button
    expect(html).toContain("2. Sınıf");
    // Period button
    expect(html).toContain("Eylül · 1. Hafta");
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
      />
    );

    expect(html).toContain("1. Sınıf");
    expect(html).not.toContain("Dönem Seçin");
    expect(html).not.toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-pressed="true"');
  });

  it("does not render extra contents selection in weekly view mode", () => {
    const html = renderToString(
      <CurriculumTopBar
        selectedGrade={1}
        onGradeChange={() => {}}
        view="weekly"
        onViewChange={() => {}}
        period={{ month: 9, week: 1 }}
        onPeriodChange={() => {}}
      />
    );

    expect(html).not.toContain("Ekstra İçerikler");
    expect(html).not.toContain("Ekstra 1");
  });
});
