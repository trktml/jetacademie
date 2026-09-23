import { execute, query } from "@/lib/db";

interface ProgressRow {
  entryId: string;
}

export async function getCompletedEntryIds(userId: string): Promise<string[]> {
  const rows = await query<ProgressRow>(
    `SELECT "entryId" FROM "curriculum_progress" WHERE "userId" = $1 ORDER BY "completedAt"`,
    [userId]
  );

  return rows.map((row) => row.entryId);
}

export async function saveCompletedEntry(userId: string, entryId: string): Promise<void> {
  await execute(
    `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
     VALUES ($1, $2, $3)
     ON CONFLICT ("userId", "entryId") DO NOTHING`,
    [userId, entryId, new Date().toISOString()]
  );
}

export async function removeCompletedEntry(userId: string, entryId: string): Promise<void> {
  await execute(`DELETE FROM "curriculum_progress" WHERE "userId" = $1 AND "entryId" = $2`, [
    userId,
    entryId,
  ]);
}
