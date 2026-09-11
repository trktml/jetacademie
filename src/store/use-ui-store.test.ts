import { describe, expect, it, beforeEach } from "bun:test";
import { useUiStore } from "./use-ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ isDrawerOpen: false, activeSection: "overview" });
  });

  it("should initialize with default state", () => {
    const state = useUiStore.getState();
    expect(state.isDrawerOpen).toBe(false);
    expect(state.activeSection).toBe("overview");
  });

  it("should open and close drawer correctly", () => {
    useUiStore.getState().openDrawer();
    expect(useUiStore.getState().isDrawerOpen).toBe(true);

    useUiStore.getState().closeDrawer();
    expect(useUiStore.getState().isDrawerOpen).toBe(false);
  });

  it("should toggle drawer state", () => {
    useUiStore.getState().toggleDrawer();
    expect(useUiStore.getState().isDrawerOpen).toBe(true);

    useUiStore.getState().toggleDrawer();
    expect(useUiStore.getState().isDrawerOpen).toBe(false);
  });

  it("should update active section", () => {
    useUiStore.getState().setActiveSection("zustand");
    expect(useUiStore.getState().activeSection).toBe("zustand");
  });
});
