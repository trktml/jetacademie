import { db } from "@/lib/auth";

interface ProgressRow {
  entryId: string;
}

export function getCompletedEntryIds(userId: string) {
  const rows = db
    .query<ProgressRow, [string]>(
      `SELECT "entryId" FROM "curriculum_progress" WHERE "userId" = ? ORDER BY "completedAt"`
    )
    .all(userId);

  return rows.map((row) => row.entryId);
}

export function saveCompletedEntry(userId: string, entryId: string) {
  db.query(
    `INSERT INTO "curriculum_progress" ("userId", "entryId", "completedAt")
     VALUES (?, ?, ?)
     ON CONFLICT ("userId", "entryId") DO NOTHING`
  ).run(userId, entryId, new Date().toISOString());
}
