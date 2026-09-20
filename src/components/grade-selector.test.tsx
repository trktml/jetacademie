import { beforeEach, describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { GradeSelector } from "./grade-selector";
import { useCurriculumStore } from "@/store/use-curriculum-store";

describe("GradeSelector Component", () => {
  beforeEach(() => {
    useCurriculumStore.getState().setSelectedGrade(1);
  });

  it("should render compact trigger button with cap and default grade number", () => {
    const html = renderToString(<GradeSelector />);

    expect(html).toContain('class="grade-selector-trigger"');
    expect(html).toContain('class="grade-selector-trigger__num">1</span>');
    expect(html).toContain('aria-haspopup="listbox"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-label="Sınıf seçimi: 1. Sınıf"');
  });

  it("should render compact grade number when compact prop is true", () => {
    const html = renderToString(<GradeSelector compact value={3} />);

    expect(html).toContain('class="grade-selector-trigger__num">3</span>');
    expect(html).toContain('aria-label="Sınıf seçimi: 3. Sınıf"');
    expect(html).toContain('data-compact="true"');
  });

  it("should render specific grade number when value prop is supplied", () => {
    const html = renderToString(<GradeSelector value={5} />);

    expect(html).toContain('class="grade-selector-trigger__num">5</span>');
    expect(html).toContain('aria-label="Sınıf seçimi: 5. Sınıf"');
  });
});
