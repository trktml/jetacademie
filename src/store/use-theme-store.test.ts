import { beforeEach, describe, expect, it } from "bun:test";
import { useThemeStore } from "./use-theme-store";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ preference: "system" });
  });

  it("defaults to the system preference", () => {
    expect(useThemeStore.getState().preference).toBe("system");
  });

  it("updates the theme preference", () => {
    useThemeStore.getState().setPreference("dark");
    expect(useThemeStore.getState().preference).toBe("dark");
  });
});
