import { describe, expect, it } from "bun:test";
import { auth } from "./auth";

describe("Better Auth Server Setup", () => {
  it("should have auth instance initialized with handler and api", () => {
    expect(auth).toBeDefined();
    expect(typeof auth.handler).toBe("function");
    expect(auth.api).toBeDefined();
    expect(auth.options).toBeDefined();
    expect(auth.options.emailAndPassword?.enabled).toBe(true);
  });
});
