import { describe, expect, it, beforeEach } from "bun:test";
import { useCounterStore } from "./use-counter-store";

describe("useCounterStore", () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it("should initialize with count 0", () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it("should increment count", () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(2);
  });

  it("should decrement count", () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it("should reset count", () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
