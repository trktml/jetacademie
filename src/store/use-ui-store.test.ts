import { describe, expect, it, beforeEach } from "bun:test";
import { useUiStore } from "./use-ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ isAccountOpen: false });
  });

  it("should initialize with default state", () => {
    const state = useUiStore.getState();
    expect(state.isAccountOpen).toBe(false);
  });

  it("should open and close the account sheet", () => {
    useUiStore.getState().openAccount();
    expect(useUiStore.getState().isAccountOpen).toBe(true);

    useUiStore.getState().closeAccount();
    expect(useUiStore.getState().isAccountOpen).toBe(false);
  });
});
