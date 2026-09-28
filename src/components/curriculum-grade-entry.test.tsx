import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { CurriculumGradeChoices } from "./curriculum-grade-entry";

describe("CurriculumGradeChoices", () => {
  it("offers every grade as a clearly labeled button", () => {
    const html = renderToString(<CurriculumGradeChoices onSelectGrade={() => {}} />);

    expect(html).toContain("Önce sınıfını seç");
    for (let grade = 1; grade <= 6; grade++) {
      expect(html).toContain(`${grade}. Sınıf</strong>`);
    }
    expect((html.match(/curriculum-grade-entry__card/g) ?? []).length).toBe(6);
    expect(html).toContain("Seçimin bu tarayıcıda hatırlanır.");
  });
});
