import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";

const testUrl = process.env.TEST_DATABASE_URL;
if (!testUrl) throw new Error("Set TEST_DATABASE_URL to a disposable PostgreSQL test database.");
const schema = `jet_review_${randomBytes(8).toString("hex")}`;
const admin = new Pool({ connectionString: testUrl, max: 1 });
await admin.query(`CREATE SCHEMA "${schema}"`);
const isolatedUrl = new URL(testUrl);
isolatedUrl.searchParams.set("options", `-csearch_path=${schema}`);
isolatedUrl.searchParams.set("application_name", schema);
process.env.DATABASE_URL = isolatedUrl.href;
Object.assign(process.env, { NODE_ENV: "development", BUN_ENV: "development" });

const db = await import("../src/lib/db");
try {
  const { ensureDatabaseSchema } = await import("../src/lib/database-schema");
  await ensureDatabaseSchema();
  assert.ok(db.getPool());
  await db.execute('INSERT INTO "user" ("id", "name", "email") VALUES ($1, $2, $3)', [
    "review-user",
    "Review",
    "review@example.test",
  ]);

  await assert.rejects(
    db.transaction(async () => {
      await db.execute('INSERT INTO "curriculum_progress" ("userId", "entryId") VALUES ($1, $2)', [
        "review-user",
        "rollback",
      ]);
      throw new Error("intentional rollback");
    }),
    /intentional rollback/
  );
  assert.equal(
    await db.queryOne('SELECT * FROM "curriculum_progress" WHERE "entryId" = $1', ["rollback"]),
    null
  );

  const { reserveAuthAttempt } = await import("../src/lib/auth-rate-limit");
  const attempts = await Promise.all(
    Array.from({ length: 20 }, () => reserveAuthAttempt("concurrency", "test", 5))
  );
  assert.equal(attempts.filter(Boolean).length, 5);

  const { configuredAppOrigin } = await import("../src/lib/auth-configuration");
  const origin = configuredAppOrigin();
  const { POST: registerUser } = await import("../src/app/api/auth/register-anonymous/route");
  const authRequest = (path: string, body: unknown, cookie?: string) =>
    new Request(`${origin}/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: JSON.stringify(body),
    });
  const registrations = await Promise.all(
    Array.from({ length: 3 }, () =>
      registerUser(
        authRequest("auth/register-anonymous", { password: "postgres-test-password-123" })
      )
    )
  );
  assert.ok(registrations.every((response) => response.ok));
  const assigned = await Promise.all(
    registrations.map((response) => response.json() as Promise<{ username: string }>)
  );
  assert.equal(new Set(assigned.map((record) => record.username)).size, 3);
  const { POST: signIn } = await import("../src/app/api/auth/sign-in-anonymous/route");
  const otherSession = await signIn(
    authRequest("auth/sign-in-anonymous", {
      username: assigned[0].username,
      password: "postgres-test-password-123",
    })
  );
  assert.equal(otherSession.status, 200);
  const { POST: changePassword } = await import("../src/app/api/account/change-password/route");
  const changed = await changePassword(
    authRequest(
      "account/change-password",
      { currentPassword: "postgres-test-password-123", newPassword: "postgres-new-password-456" },
      registrations[0].headers.get("set-cookie")!
    )
  );
  assert.equal(changed.status, 200);
  const { getAuth } = await import("../src/lib/auth");
  assert.equal(
    await getAuth().api.getSession({
      headers: new Headers({ Cookie: otherSession.headers.get("set-cookie")! }),
    }),
    null
  );

  const curriculum = await import("../src/lib/curriculum-db");
  const service = await import("../src/lib/curriculum-progress-service");
  const progress = await import("../src/lib/curriculum-progress");
  await curriculum.getCurriculumEntriesFromDb(1);
  await service.updateEntryProgress("review-user", "g1-esma-eylul-1", true);
  // Completing week 2 while undoing week 1 must never leave an orphan week 2 completion.
  await Promise.allSettled([
    service.updateEntryProgress("review-user", "g1-esma-eylul-2", true),
    service.updateEntryProgress("review-user", "g1-esma-eylul-1", false),
  ]);
  const ids = await progress.getCompletedEntryIds("review-user");
  assert.ok(!ids.includes("g1-esma-eylul-2") || ids.includes("g1-esma-eylul-1"));
  const imported = await service.importGuestProgress(
    "review-user",
    ["g1-esma-eylul-3", "g1-esma-eylul-3", "invented-entry"],
    "bayan"
  );
  assert.equal(imported.migratedCount, 1);
  assert.equal(
    (await service.importGuestProgress("review-user", ["g1-esma-eylul-3"])).migratedCount,
    0
  );
  await assert.rejects(service.importGuestProgress("missing-user", ["g1-esma-eylul-4"], "erkek"));
  assert.equal(
    await db.queryOne('SELECT * FROM "user_preferences" WHERE "userId" = $1', ["missing-user"]),
    null
  );

  const now = new Date().toISOString();
  await curriculum.bulkUpsertCurriculumEntries([
    {
      id: "g6-konu-review-draft",
      grade: 6,
      categoryId: "konu",
      gender: null,
      month: 5,
      week: 4,
      year: 2027,
      isExtra: 0,
      extraOrder: null,
      isDraft: 1,
      title: "Draft fixture",
      body: "Draft fixture body",
      resourceUrl: null,
      pdfUrl: null,
      pageCount: null,
      createdAt: now,
      updatedAt: now,
    },
  ]);
  assert.equal(await curriculum.getCurriculumEntryByIdFromDb("g6-konu-review-draft"), null);
  assert.ok(
    !(await curriculum.getCurriculumEntriesFromDb(6)).some(
      (entry) => entry.id === "g6-konu-review-draft"
    )
  );
  assert.ok(
    (await curriculum.getCurriculumEntriesFromDb(6, undefined, true)).some(
      (entry) => entry.id === "g6-konu-review-draft"
    )
  );
  await curriculum.updateCurriculumEditorEntry({
    grade: 6,
    categoryId: "konu",
    month: 5,
    week: 4,
    title: "Edited draft fixture",
    body: "Edited fixture body",
    resourceUrl: "",
    revision: 0,
  });
  assert.equal(await curriculum.getCurriculumEntryByIdFromDb("g6-konu-review-draft"), null);
  assert.ok(
    !(await curriculum.getCurriculumEntriesFromDb(6)).some(
      (entry) => entry.id === "g6-konu-review-draft"
    )
  );
  await assert.rejects(curriculum.publishCurriculumWeek(5, 4), /M1 \/ konu: eksik/);
  assert.equal(await curriculum.getCurriculumEntryByIdFromDb("g6-konu-review-draft"), null);
  await curriculum.bulkUpsertCurriculumEntries(
    Array.from({ length: 5 }, (_, index) => ({
      id: `g${index + 1}-konu-mayis-4`,
      grade: index + 1,
      categoryId: "konu",
      month: 5,
      week: 4,
      year: 2027,
      title: "Already published fixture",
      body: "Published fixture body",
    }))
  );
  assert.equal((await curriculum.publishCurriculumWeek(5, 4)).publishedCount, 1);
  assert.equal(
    (await curriculum.getCurriculumEntryByIdFromDb("g6-konu-review-draft"))?.title,
    "Edited draft fixture"
  );
  assert.ok(
    (await curriculum.getCurriculumEntriesFromDb(6)).some(
      (entry) => entry.id === "g6-konu-review-draft"
    )
  );
  const pkg = {
    weekNumber: 33,
    entries: Array.from({ length: 6 }, (_, index) => ({
      id: `g${index + 1}-konu-mayis-1`,
      grade: index + 1,
      categoryId: "konu" as const,
      month: 5,
      week: 1,
      year: 2027,
      title: "Package fixture",
      body: "# Başlık\n\nBir tutarlılık testi.\n\n# Bana Ne Söylüyor?\n\n# Bu Hafta Tanıştığımız Kelimeler",
    })),
  };
  await curriculum.saveWeeklyCurriculumPackage(pkg, { category: "konu" });
  const snapshot = (await curriculum.getCurriculumEditorRecords(1)).find(
    (record) => record.entry.id === pkg.entries[0].id
  )!;
  const { getEditorOverrides } = await import("../src/lib/editor/content");
  const staleEdit = {
    ...pkg.entries[0],
    title: "Old tab",
    resourceUrl: "",
    revision: snapshot.revision,
  };
  await Promise.all([
    curriculum.updateCurriculumEditorEntry(staleEdit),
    curriculum.saveWeeklyCurriculumPackage(
      { ...pkg, entries: pkg.entries.map((entry) => ({ ...entry, title: "Latest package" })) },
      { category: "konu" }
    ),
  ]);
  const latest = (await curriculum.getCurriculumEditorRecords(1)).find(
    (record) => record.entry.id === pkg.entries[0].id
  )!;
  assert.equal(latest.entry.title, "Latest package");
  assert.ok(latest.revision > snapshot.revision);
  assert.equal(await curriculum.updateCurriculumEditorEntry(staleEdit), null);
  assert.equal(
    (await getEditorOverrides(1)).find((record) => record.entry.id === latest.entry.id)?.revision,
    latest.revision
  );

  // A targeted restore must keep protected overrides and reject an editor's earlier revision.
  const protectedSlot = "1:esma:all:5-1";
  const protectedRecord = await curriculum.updateCurriculumEditorEntry({
    grade: 1,
    categoryId: "esma",
    month: 5,
    week: 1,
    title: "Protected fixture",
    body: "Protected fixture body",
    resourceUrl: "",
    revision: 0,
  });
  assert.ok(protectedRecord);
  const backupDir = await mkdtemp(join(tmpdir(), "jet-postgres-backup-"));
  try {
    const { createCurriculumBackup, restoreCurriculumBackup } = await import("./curriculum-backup");
    await createCurriculumBackup({ outDir: backupDir });
    await curriculum.publishCurriculumWeek(33);
    const restored = await restoreCurriculumBackup({ backupDir, weekNumber: 33 });
    assert.ok(restored.entriesCount >= 6);
    assert.equal(await curriculum.getCurriculumEntryByIdFromDb(pkg.entries[0].id), null);
    assert.equal(
      await curriculum.updateCurriculumEditorEntry({ ...staleEdit, revision: latest.revision }),
      null
    );
    assert.deepEqual(
      await db.queryOne('SELECT "revision" FROM "curriculum_editor_content" WHERE "slot" = $1', [
        protectedSlot,
      ]),
      { revision: protectedRecord.revision }
    );
    // The exported SQL is an upsert-only alternative, scoped to weekly entries.
    await db.execute(await Bun.file(join(backupDir, "database/restore.sql")).text());
    assert.deepEqual(
      await db.queryOne('SELECT "revision" FROM "curriculum_editor_content" WHERE "slot" = $1', [
        protectedSlot,
      ]),
      { revision: protectedRecord.revision }
    );
  } finally {
    await rm(backupDir, { recursive: true, force: true });
  }

  const concurrentPackages = [2, 3].map((week) => ({
    weekNumber: 32 + week,
    entries: pkg.entries.map((entry) => ({
      ...entry,
      id: `g${entry.grade}-konu-mayis-${week}`,
      week,
      title: `Concurrent draft ${week}`,
    })),
  }));
  await curriculum.bulkUpsertCurriculumEntries(
    concurrentPackages.flatMap((batch) =>
      batch.entries.map((entry) => ({ ...entry, title: "Previously published", isDraft: 0 }))
    )
  );
  await db.execute(
    'INSERT INTO "curriculum_seed_exclusions" ("categoryId") VALUES ($1) ON CONFLICT DO NOTHING',
    ["konu"]
  );
  const exclusionBefore = await db.queryOne(
    'SELECT * FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1',
    ["konu"]
  );
  const blocker = await db.getPool()!.connect();
  let saves: Promise<PromiseSettledResult<void>[]> | undefined;
  let saveResults: PromiseSettledResult<void>[] = [];
  try {
    await blocker.query("BEGIN");
    await blocker.query(
      'SELECT * FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1 FOR UPDATE',
      ["konu"]
    );
    saves = Promise.allSettled(
      concurrentPackages.map((batch) =>
        curriculum.saveWeeklyCurriculumPackage(batch, { category: "konu" })
      )
    );
    // Hold the exclusion row until both imports are waiting inside their transactions.
    const deadline = Date.now() + 5000;
    let waiting = 0;
    while (Date.now() < deadline) {
      const state = await admin.query<{ waiting: number }>(
        `SELECT count(*)::int AS waiting FROM pg_stat_activity
         WHERE application_name = $1 AND wait_event_type = 'Lock'`,
        [schema]
      );
      waiting = state.rows[0].waiting;
      if (waiting === 2) break;
      await Bun.sleep(10);
    }
    assert.equal(waiting, 2, "Both package imports must overlap before releasing the guard");
  } finally {
    await blocker.query("ROLLBACK");
    blocker.release();
    if (saves) saveResults = await saves;
  }
  assert.ok(saveResults.every((result) => result.status === "fulfilled"));
  const concurrentIds = concurrentPackages.flatMap((batch) =>
    batch.entries.map((entry) => entry.id)
  );
  const draftRows = await db.query<{ id: string; title: string; isDraft: number }>(
    'SELECT "id", "title", "isDraft" FROM "curriculum_entries" WHERE "id" = ANY($1::text[])',
    [concurrentIds]
  );
  assert.equal(draftRows.length, concurrentIds.length);
  assert.ok(
    draftRows.every((row) => row.isDraft === 1),
    "Every imported base row must be a draft"
  );
  const expectedTitles = new Map(
    concurrentPackages.flatMap((batch) =>
      batch.entries.map((entry) => [entry.id, entry.title] as const)
    )
  );
  assert.ok(draftRows.every((row) => row.title === expectedTitles.get(row.id)));
  for (let grade = 1; grade <= 6; grade++) {
    assert.ok(
      !(await curriculum.getCurriculumEntriesFromDb(grade)).some((entry) =>
        concurrentIds.includes(entry.id)
      ),
      `Concurrent imports must not expose drafts in grade ${grade}`
    );
  }
  for (const id of concurrentIds) {
    assert.equal(await curriculum.getCurriculumEntryByIdFromDb(id), null);
  }
  assert.deepEqual(
    await db.queryOne('SELECT * FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1', [
      "konu",
    ]),
    exclusionBefore
  );
  await db.execute('DELETE FROM "curriculum_seed_exclusions" WHERE "categoryId" = $1', ["konu"]);

  const atomics = Array.from({ length: 51 }, (_, i) => ({
    id: `g6-konu-atomic-${i}`,
    grade: 6,
    categoryId: "konu",
    title: "Atomic fixture",
  }));
  Object.assign(atomics[50], { title: null });
  await assert.rejects(curriculum.bulkUpsertCurriculumEntries(atomics));
  assert.equal(
    await db.queryOne('SELECT "id" FROM "curriculum_entries" WHERE "id" LIKE $1', [
      "g6-konu-atomic-%",
    ]),
    null
  );
  console.log(
    "PostgreSQL checks passed: rollback, concurrent limits/registration, password session revocation, progress locking, deduplicated import, draft visibility/publication, atomic batches, package/editor concurrency, snapshot revisions, scoped backup restoration and concurrent excluded-category imports."
  );
} finally {
  await db.closeDatabase();
  await admin.query(`DROP SCHEMA "${schema}" CASCADE`);
  await admin.end();
}
