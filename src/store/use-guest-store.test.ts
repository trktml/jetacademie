import { describe, expect, it, beforeEach } from "bun:test";
import { useGuestStore } from "./use-guest-store";

describe("use-guest-store", () => {
  it("keeps progress and a changed preference added during an account transfer", () => {
    useGuestStore.setState({ isGuest: true, completedEntryIds: ["old", "new"], gender: "bayan" });
    useGuestStore.getState().acknowledgeTransfer(["old"], "erkek");
    expect(useGuestStore.getState().completedEntryIds).toEqual(["new"]);
    expect(useGuestStore.getState().gender).toBe("bayan");
    expect(useGuestStore.getState().isGuest).toBe(false);
  });
  beforeEach(() => {
    // Reset store to initial state before each test
    useGuestStore.setState({
      isGuest: false,
      completedEntryIds: [],
      gender: null,
    });
  });

  it("starts with guest mode disabled and empty progress", () => {
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(false);
    expect(state.completedEntryIds).toEqual([]);
    expect(state.gender).toBe(null);
  });

  it("preserves progress for retry when account migration fails", () => {
    useGuestStore.getState().enableGuest();
    useGuestStore.getState().completeEntry("g1-konu-eylul-1");
    useGuestStore.getState().setGender("bayan");
    useGuestStore.getState().suspendGuest();
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(false);
    expect(state.completedEntryIds).toEqual(["g1-konu-eylul-1"]);
    expect(state.gender).toBe("bayan");
  });

  it("enableGuest sets isGuest to true", () => {
    useGuestStore.getState().enableGuest();
    expect(useGuestStore.getState().isGuest).toBe(true);
  });

  it("setGender sets gender and enables guest mode", () => {
    useGuestStore.getState().setGender("bayan");
    const state = useGuestStore.getState();
    expect(state.gender).toBe("bayan");
    expect(state.isGuest).toBe(true);
  });

  it("disableGuest resets isGuest and clears progress and gender", () => {
    useGuestStore.setState({
      isGuest: true,
      completedEntryIds: ["entry-1", "entry-2"],
      gender: "erkek",
    });
    useGuestStore.getState().disableGuest();
    const state = useGuestStore.getState();
    expect(state.isGuest).toBe(false);
    expect(state.completedEntryIds).toEqual([]);
    expect(state.gender).toBe(null);
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
