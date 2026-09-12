import { describe, expect, it } from "bun:test";
import { SECTION_IDS } from "./use-active-section";
import { useUiStore } from "@/store/use-ui-store";

describe("useActiveSectionObserver", () => {
  it("should define all expected sections for page navigation", () => {
    expect(SECTION_IDS).toContain("overview");
    expect(SECTION_IDS).toContain("mufredat-grid");
  });

  it("should correctly update active section in UI store", () => {
    useUiStore.getState().setActiveSection("mufredat-grid");
    expect(useUiStore.getState().activeSection).toBe("mufredat-grid");

    useUiStore.getState().setActiveSection("overview");
    expect(useUiStore.getState().activeSection).toBe("overview");
  });
});
