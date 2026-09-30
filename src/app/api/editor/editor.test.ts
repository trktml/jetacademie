import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { createHash } from "node:crypto";
import { GET as getSession, POST as login, DELETE as logout } from "./session/route";
import { GET as listEntries, PUT as saveEntry } from "./entries/route";
import {
  createEditorSession,
  editorCookieName,
  editorCsrf,
  hashEditorPassword,
  hasEditorSession,
} from "@/lib/editor/auth";
import { execute, queryOne } from "@/lib/db";
import { ensureEditorSchema } from "@/lib/editor/schema";
import { getCurriculumEntriesFromDb, getCurriculumEntryByIdFromDb } from "@/lib/curriculum-db";
import { editorEntrySchema } from "@/lib/editor/validation";

const origin = "http://localhost:3000";
const password = "Test-editor-password!123456789";
const keys = [
  "CURRICULUM_ADMIN_USERNAME",
  "CURRICULUM_ADMIN_PASSWORD_HASH",
  "CURRICULUM_ADMIN_SECRET",
  "CURRICULUM_ADMIN_ORIGIN",
] as const;
const savedEnv = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
let token: string;
function request(
  path: string,
  method = "GET",
  body?: unknown,
  options: { token?: string; csrf?: string; origin?: string; contentType?: string } = {}
) {
  const headers = new Headers();
  if (options.token) headers.set("Cookie", `${editorCookieName()}=${options.token}`);
  if (options.csrf) headers.set("X-Editor-CSRF", options.csrf);
  if (method !== "GET") {
    headers.set("Content-Type", options.contentType ?? "application/json");
    headers.set("Origin", options.origin ?? origin);
  }
  return new Request(`${origin}/api/editor/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const input = {
  grade: 6,
  categoryId: "konu",
  month: 9,
  week: 3,
  title: "Editör güvenlik testi",
  body: "## Test\n\n**Markdown içerik**",
  resourceUrl: "",
  revision: 0,
};

beforeAll(async () => {
  process.env.CURRICULUM_ADMIN_USERNAME = "test-editor";
  process.env.CURRICULUM_ADMIN_PASSWORD_HASH = await hashEditorPassword(password);
  process.env.CURRICULUM_ADMIN_SECRET = "editor-test-secret-with-more-than-thirty-two-characters";
  process.env.CURRICULUM_ADMIN_ORIGIN = origin;
  await ensureEditorSchema();
  await execute(`DELETE FROM "curriculum_editor_attempts"`);
  token = await createEditorSession();
});
afterAll(async () => {
  await execute(
    `DELETE FROM "curriculum_editor_content" WHERE "slot" IN ('6:konu:all:9-3', '6:konu:all:9-4', '6:ilmihal:erkek:9-4', '6:ilmihal:bayan:9-4')`
  );
  await execute(`DELETE FROM "curriculum_editor_attempts"`);
  await execute(`DELETE FROM "curriculum_editor_sessions"`);
  for (const key of keys) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
});

describe("Independent curriculum editor security", () => {
  it("rejects unauthenticated reads and writes, including normal-user cookies", async () => {
    expect((await listEntries(request("entries?sinif=1"))).status).toBe(401);
    expect((await saveEntry(request("entries", "PUT", input))).status).toBe(401);
    const normalUser = request("entries?sinif=1");
    normalUser.headers.set("Cookie", "better-auth.session_token=normal-user");
    expect((await listEntries(normalUser)).status).toBe(401);
  });
  it("checks origin and CSRF for every mutation", async () => {
    expect(
      (
        await saveEntry(
          request("entries", "PUT", input, {
            token,
            origin: "https://attacker.example",
            csrf: editorCsrf(token),
          })
        )
      ).status
    ).toBe(403);
    expect((await saveEntry(request("entries", "PUT", input, { token }))).status).toBe(403);
    const anotherToken = await createEditorSession();
    expect(
      (await saveEntry(request("entries", "PUT", input, { token, csrf: editorCsrf(anotherToken) })))
        .status
    ).toBe(403);
    expect(
      (
        await login(
          request(
            "session",
            "POST",
            { username: "test-editor", password },
            { contentType: "text/plain" }
          )
        )
      ).status
    ).toBe(415);
  });
  it("stores only a token hash; rejects forged, expired and rotated sessions", async () => {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const row = await queryOne<{ tokenHash: string }>(
      `SELECT "tokenHash" FROM "curriculum_editor_sessions" WHERE "tokenHash" = $1`,
      [tokenHash]
    );
    expect(row?.tokenHash).toBe(tokenHash);
    expect(row?.tokenHash).not.toBe(token);
    expect(await hasEditorSession("a".repeat(64))).toBe(false);
    const expiring = await createEditorSession();
    await execute(
      `UPDATE "curriculum_editor_sessions" SET "expiresAt" = 0 WHERE "tokenHash" = $1`,
      [createHash("sha256").update(expiring).digest("hex")]
    );
    expect(await hasEditorSession(expiring)).toBe(false);
    const secret = process.env.CURRICULUM_ADMIN_SECRET;
    process.env.CURRICULUM_ADMIN_SECRET = "new-editor-secret-with-at-least-thirty-two-characters";
    expect(await hasEditorSession(token)).toBe(false);
    process.env.CURRICULUM_ADMIN_SECRET = secret;
    expect(await hasEditorSession(token)).toBe(true);
  });
  it("issues a separate HttpOnly, SameSite=Strict cookie and revokes it on logout", async () => {
    const response = await login(request("session", "POST", { username: "test-editor", password }));
    expect(response.status).toBe(200);
    const cookie = response.headers.get("set-cookie")!;
    expect(cookie).toContain("HttpOnly");
    expect(cookie.toLowerCase()).toContain("samesite=strict");
    expect(cookie).not.toContain("better-auth");
    const newToken = cookie.split(";", 1)[0].split("=")[1];
    const csrf = (await response.json()).csrf;
    expect(
      (await getSession(request("session", "GET", undefined, { token: newToken }))).headers.get(
        "Cache-Control"
      )
    ).toBe("no-store");
    expect((await logout(request("session", "DELETE", {}, { token: newToken, csrf }))).status).toBe(
      200
    );
    expect(await hasEditorSession(newToken)).toBe(false);
  });
  it("rejects invalid content, unsafe URLs, oversized JSON and early extra weeks", async () => {
    const auth = { token, csrf: editorCsrf(token) };
    expect((await saveEntry(request("entries", "PUT", { ...input, grade: 7 }, auth))).status).toBe(
      400
    );
    expect(
      (
        await saveEntry(
          request("entries", "PUT", { ...input, resourceUrl: "javascript:alert(1)" }, auth)
        )
      ).status
    ).toBe(400);
    expect(
      (await saveEntry(request("entries", "PUT", { ...input, body: "x".repeat(460000) }, auth)))
        .status
    ).toBe(413);
    // No completed editor curriculum exists for this grade/category in the intentional first-week mode.
    const premature = await saveEntry(request("entries", "PUT", { ...input, extraOrder: 1 }, auth));
    const standard = (await getCurriculumEntriesFromDb(6)).filter(
      (entry) => entry.categoryId === "konu" && !entry.isExtra
    );
    expect(premature.status).toBe(standard.length < 48 ? 400 : 200);
    expect(editorEntrySchema.safeParse({ ...input, categoryId: "ilmihal" }).success).toBe(false);
    expect(editorEntrySchema.safeParse({ ...input, gender: "erkek" }).success).toBe(false);
  });
  it("rejects Arabic-only vocabulary before saving editor content", async () => {
    const auth = { token, csrf: editorCsrf(token) };
    const body =
      "**تَعَلَّمَ**\n\nTürkçesi: Öğrendi.\n\n## Kelime Açıklaması\n\n**taallame** — Öğrendi.";
    expect((await saveEntry(request("entries", "PUT", { ...input, body }, auth))).status).toBe(400);
    expect(
      editorEntrySchema.safeParse({ ...input, categoryId: "adab-i-muaseret", body }).success
    ).toBe(true);
  });
  it("saves Markdown into public curriculum, keeps IDs and rejects stale writes", async () => {
    const auth = { token, csrf: editorCsrf(token) };
    const before = (await getCurriculumEntriesFromDb(6)).find(
      (entry) =>
        entry.categoryId === "konu" && entry.month === 9 && entry.week === 3 && !entry.isExtra
    );
    const response = await saveEntry(request("entries", "PUT", input, auth));
    expect(response.status).toBe(200);
    const saved = await response.json();
    expect(saved.revision).toBe(1);
    if (before) expect(saved.entry.id).toBe(before.id);
    expect((await getCurriculumEntryByIdFromDb(saved.entry.id))?.body).toBe(input.body);
    expect(
      (await getCurriculumEntriesFromDb(6)).find((entry) => entry.id === saved.entry.id)
        ?.contentFormat
    ).toBe("markdown");
    expect((await saveEntry(request("entries", "PUT", input, auth))).status).toBe(409);
    expect(
      (
        await saveEntry(
          request("entries", "PUT", { ...input, revision: 1, title: "Güncel başlık" }, auth)
        )
      ).status
    ).toBe(200);
    expect(
      (
        await saveEntry(
          request("entries", "PUT", { ...input, revision: 1, title: "Eski sekme" }, auth)
        )
      ).status
    ).toBe(409);
  });
  it("adds missing weeks and keeps gender tracks separate", async () => {
    const auth = { token, csrf: editorCsrf(token) };
    for (const gender of ["erkek", "bayan"]) {
      const response = await saveEntry(
        request(
          "entries",
          "PUT",
          { ...input, week: 4, categoryId: "ilmihal", gender, title: `İçerik ${gender}` },
          auth
        )
      );
      expect(response.status).toBe(200);
    }
    const entries = await getCurriculumEntriesFromDb(6);
    expect(
      entries.filter(
        (entry) =>
          entry.categoryId === "ilmihal" &&
          entry.month === 9 &&
          entry.week === 4 &&
          entry.contentFormat === "markdown"
      ).length
    ).toBe(2);
    const maleEntries = await getCurriculumEntriesFromDb(6, "erkek");
    expect(maleEntries.every((entry) => !entry.gender || entry.gender === "erkek")).toBe(true);
  });
  it("limits login attempts across all usernames and fails closed on missing configuration", async () => {
    await execute(`DELETE FROM "curriculum_editor_attempts"`);
    for (let i = 0; i < 10; i++)
      expect(
        (await login(request("session", "POST", { username: `invented-${i}`, password: "wrong" })))
          .status
      ).toBe(401);
    const response = await login(request("session", "POST", { username: "test-editor", password }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("900");
    const secret = process.env.CURRICULUM_ADMIN_SECRET;
    delete process.env.CURRICULUM_ADMIN_SECRET;
    expect(
      (await listEntries(request("entries?sinif=1", "GET", undefined, { token }))).status
    ).toBe(503);
    process.env.CURRICULUM_ADMIN_SECRET = secret;
  });
});
