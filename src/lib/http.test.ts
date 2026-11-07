import { describe, expect, it } from "bun:test";
import { readBoundedJson, RequestBodyTimeoutError, RequestBodyTooLargeError } from "./http";
import { validateMutationRequest } from "./mutation-security";
import { configuredAppOrigin, authConfiguration } from "./auth-configuration";

describe("request trust boundaries", () => {
  it("does not trust matching forged Origin and forwarded headers", () => {
    const request = new Request("http://localhost:3000/api/account/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://evil.example",
        "X-Forwarded-Host": "evil.example",
        "X-Forwarded-Proto": "https",
      },
      body: "{}",
    });
    expect(validateMutationRequest(request)?.status).toBe(403);
  });

  it("accepts an explicitly configured alias through the proxy without trusting other hosts", () => {
    const previous = process.env.AUTH_TRUSTED_ORIGINS;
    const alias = "https://jetacademie.be";
    const request = (origin: string, site = "same-origin") =>
      new Request("http://web:3000/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: origin,
          "Sec-Fetch-Site": site,
          "X-Forwarded-Host": new URL(origin).host,
          "X-Forwarded-Proto": "https",
        },
        body: "{}",
      });
    try {
      process.env.AUTH_TRUSTED_ORIGINS = "";
      expect(validateMutationRequest(request(alias))?.status).toBe(403);
      process.env.AUTH_TRUSTED_ORIGINS = alias;
      expect(validateMutationRequest(request(alias))).toBeNull();
      expect(validateMutationRequest(request(alias, "cross-site"))?.status).toBe(403);
      expect(validateMutationRequest(request(`${alias}.evil.example`))?.status).toBe(403);
    } finally {
      if (previous === undefined) delete process.env.AUTH_TRUSTED_ORIGINS;
      else process.env.AUTH_TRUSTED_ORIGINS = previous;
    }
  });

  it("rejects missing origins, cross-site requests and non-JSON bodies", () => {
    const make = (headers: Record<string, string>) =>
      new Request("http://localhost:3000", { method: "POST", headers, body: "{}" });
    expect(validateMutationRequest(make({ "Content-Type": "application/json" }))?.status).toBe(403);
    expect(
      validateMutationRequest(
        make({
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          "Sec-Fetch-Site": "cross-site",
        })
      )?.status
    ).toBe(403);
    expect(
      validateMutationRequest(
        make({ "Content-Type": "text/plain", Origin: "http://localhost:3000" })
      )?.status
    ).toBe(415);
  });

  it("limits streamed bytes even without Content-Length and counts multibyte text", async () => {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('"şşş"'));
        controller.close();
      },
    });
    const request = new Request("http://localhost", { method: "POST", body: stream });
    await expect(readBoundedJson(request, 7)).rejects.toBeInstanceOf(RequestBodyTooLargeError);
    expect(
      await readBoundedJson(
        new Request("http://localhost", { method: "POST", body: "{broken" }),
        100
      )
    ).toBeNull();
  });

  it("times out and cancels an incomplete streamed body", async () => {
    let canceled = false;
    const request = new Request("http://localhost", {
      method: "POST",
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode("{"));
        },
        cancel() {
          canceled = true;
        },
      }),
    });
    await expect(readBoundedJson(request, 100, 10)).rejects.toBeInstanceOf(RequestBodyTimeoutError);
    expect(canceled).toBe(true);
  });

  it("requires a canonical HTTPS deployment origin and unique runtime secret", () => {
    const env = {
      NODE_ENV: "production",
      BETTER_AUTH_URL: "https://jetacademie.be",
      BETTER_AUTH_SECRET: "random-test-secret-with-more-than-32-characters",
    };
    expect(authConfiguration(env).trustedOrigins).toEqual(["https://jetacademie.be"]);
    expect(
      authConfiguration({
        ...env,
        AUTH_TRUSTED_ORIGINS: "https://jet.hizmetod.com/, https://jetacademie.be",
      })
    ).toMatchObject({
      baseURL: "https://jetacademie.be",
      trustedOrigins: ["https://jetacademie.be", "https://jet.hizmetod.com"],
    });
    for (const url of [
      "http://jetacademie.be",
      "https://jetacademie.be/path",
      "https://user:pass@jetacademie.be",
      "https://jetacademie.be?x=1",
      "https://*.jetacademie.be",
    ]) {
      expect(() => configuredAppOrigin({ ...env, BETTER_AUTH_URL: url })).toThrow();
      expect(() => authConfiguration({ ...env, AUTH_TRUSTED_ORIGINS: url })).toThrow();
    }
    expect(() =>
      authConfiguration({
        ...env,
        BETTER_AUTH_SECRET: "build-only-placeholder-never-use-for-sessions",
      })
    ).toThrow();
    expect(() =>
      configuredAppOrigin({ ...env, NEXT_PUBLIC_APP_URL: "https://evil.example" })
    ).toThrow();
  });
});
