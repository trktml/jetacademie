import { describe, expect, it, beforeEach } from "bun:test";
import { useReadingProgressStore } from "./use-reading-progress-store";

describe("useReadingProgressStore", () => {
  beforeEach(() => {
    useReadingProgressStore.setState({ progressMap: {} });
  });

  it("should default to page 1 for unvisited entries", () => {
    const store = useReadingProgressStore.getState();
    expect(store.getReadingPage("entry-123")).toBe(1);
  });

  it("should record and retrieve reading page progress", () => {
    const { setReadingPage, getReadingPage } = useReadingProgressStore.getState();

    setReadingPage("entry-1", 4);
    expect(getReadingPage("entry-1")).toBe(4);

    setReadingPage("entry-2", 2);
    expect(getReadingPage("entry-2")).toBe(2);
    expect(getReadingPage("entry-1")).toBe(4);
  });

  it("should clamp invalid page numbers to at least 1", () => {
    const { setReadingPage, getReadingPage } = useReadingProgressStore.getState();

    setReadingPage("entry-neg", -5);
    expect(getReadingPage("entry-neg")).toBe(1);

    setReadingPage("entry-zero", 0);
    expect(getReadingPage("entry-zero")).toBe(1);
  });

  it("should reset reading progress for a specific entry", () => {
    const { setReadingPage, getReadingPage, resetReadingPage } = useReadingProgressStore.getState();

    setReadingPage("entry-reset", 7);
    expect(getReadingPage("entry-reset")).toBe(7);

    resetReadingPage("entry-reset");
    expect(getReadingPage("entry-reset")).toBe(1);
  });

  it("should not update state reference if the page is already the same", () => {
    const { setReadingPage } = useReadingProgressStore.getState();
    setReadingPage("entry-same", 3);
    const stateBefore = useReadingProgressStore.getState().progressMap;
    setReadingPage("entry-same", 3);
    const stateAfter = useReadingProgressStore.getState().progressMap;
    expect(stateBefore).toBe(stateAfter);
  });
});
