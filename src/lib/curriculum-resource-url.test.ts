import { describe, expect, it } from "bun:test";
import { curriculumPdfUrl, curriculumResourceUrl } from "./curriculum-resource-url";
import { readEditorRecord } from "./editor/content";

describe("curriculum resource trust boundary", () => {
  it("rejects executable links and paths that decode outside the public curriculum tree", () => {
    for (const url of [
      "javascript:alert(1)",
      "java\tscript:alert(1)",
      "data:text/html,example",
      "//external.example/file.pdf",
      "https://user:password@external.example/file.pdf",
      "/curriculum/%2e%2e/private.pdf",
      "/curriculum/../private.pdf",
      "/curriculum/%2fprivate.pdf",
      "/api/file.pdf",
    ]) {
      expect(curriculumResourceUrl(url)).toBeUndefined();
      expect(curriculumPdfUrl(url)).toBeUndefined();
    }
  });

  it("serves valid PDFs and strips unsafe links from saved editor records", () => {
    const pdf = "/curriculum/adab/ortaokul/hafta-01.pdf";
    expect(curriculumPdfUrl(pdf)).toBe(pdf);
    expect(curriculumPdfUrl("https://example.org/file.PDF?download=1")).toBe(
      "https://example.org/file.PDF?download=1"
    );
    expect(curriculumPdfUrl("https://example.org/redirect?filename=book.pdf")).toBeUndefined();

    const { entry } = readEditorRecord({
      entry: JSON.stringify({ resourceUrl: "javascript:alert(1)", pdfUrl: "/api/private.pdf" }),
      revision: 1,
      updatedAt: "2026-11-06",
    });
    expect(entry.resourceUrl).toBeUndefined();
    expect(entry.pdfUrl).toBeUndefined();
  });
});
