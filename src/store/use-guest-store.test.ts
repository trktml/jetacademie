import { describe, expect, it, beforeEach } from "bun:test";
import { useGuestStore } from "./use-guest-store";

describe("use-guest-store", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useGuestStore.setState({
      isGuest: false,
      completedEntryIds: [],
    });
  });

  it("starts with guest mode disabled and empty progress", () => {
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(false);
    expect(state.completedEntryIds).toEqual([]);
  });

  it("enableGuest sets isGuest to true", () => {
    useGuestStore.getState().enableGuest();
    expect(useGuestStore.getState().isGuest).toBe(true);
  });

  it("disableGuest resets isGuest and clears progress", () => {
    useGuestStore.setState({
      isGuest: true,
      completedEntryIds: ["entry-1", "entry-2"],
    });
    useGuestStore.getState().disableGuest();
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(false);
    expect(state.completedEntryIds).toEqual([]);
  });

  it("completeEntry adds an entry ID", () => {
    useGuestStore.getState().completeEntry("entry-1");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["entry-1"]);
  });

  it("completeEntry does not add duplicates", () => {
    useGuestStore.getState().completeEntry("entry-1");
    useGuestStore.getState().completeEntry("entry-1");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["entry-1"]);
  });

  it("completeEntry preserves order", () => {
    useGuestStore.getState().completeEntry("entry-1");
    useGuestStore.getState().completeEntry("entry-2");
    useGuestStore.getState().completeEntry("entry-3");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["entry-1", "entry-2", "entry-3"]);
  });

  it("uncompleteEntry removes an entry ID", () => {
    useGuestStore.setState({ completedEntryIds: ["entry-1", "entry-2", "entry-3"] });
    useGuestStore.getState().uncompleteEntry("entry-2");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["entry-1", "entry-3"]);
  });

  it("uncompleteEntry does nothing for non-existent ID", () => {
    useGuestStore.setState({ completedEntryIds: ["entry-1"] });
    useGuestStore.getState().uncompleteEntry("entry-99");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["entry-1"]);
  });

  it("clearProgress empties completedEntryIds without changing isGuest", () => {
    useGuestStore.setState({
      isGuest: true,
      completedEntryIds: ["entry-1", "entry-2"],
    });
    useGuestStore.getState().clearProgress();
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(true);
    expect(state.completedEntryIds).toEqual([]);
  });
});
