import { describe, expect, it } from "bun:test";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";
import { contentSecurityPolicy } from "./lib/content-security-policy";

describe("script execution policy", () => {
  it("uses fresh nonces and overwrites attacker-supplied nonce headers", () => {
    const request = new NextRequest("http://localhost:3000/mufredat", {
      headers: { "x-nonce": "attacker", "Content-Security-Policy": "script-src * 'unsafe-inline'" },
    });
    const first = proxy(request);
    const second = proxy(request);
    const policy = first.headers.get("Content-Security-Policy")!;
    expect(policy).toContain("'strict-dynamic'");
    expect(policy).not.toContain("attacker");
    expect(first.headers.get("x-middleware-request-x-nonce")).not.toBe("attacker");
    expect(policy).not.toBe(second.headers.get("Content-Security-Policy"));
  });
  it("does not permit inline script injection or eval in production", () => {
    const policy = contentSecurityPolicy("test-nonce", false);
    const scripts = policy
      .split(";")
      .find((directive) => directive.trim().startsWith("script-src"))!;
    expect(scripts).not.toContain("unsafe-inline");
    expect(scripts).not.toContain("'unsafe-eval'");
    expect(policy).toContain("frame-src https://www.youtube-nocookie.com");
  });
  it("rejects page POSTs with absent or forged origins before Next.js handles them", () => {
    const url = "http://localhost:3000/mufredat";
    for (const headers of [
      new Headers(),
      new Headers({ Origin: "https://attacker.example", "X-Forwarded-Host": "attacker.example" }),
      new Headers({ Origin: "http://localhost:3000", "Sec-Fetch-Site": "cross-site" }),
    ]) {
      expect(proxy(new NextRequest(url, { method: "POST", headers })).status).toBe(403);
    }
    expect(
      proxy(new NextRequest(url, { method: "POST", headers: { Origin: "http://localhost:3000" } }))
        .status
    ).toBe(200);
  });
});
