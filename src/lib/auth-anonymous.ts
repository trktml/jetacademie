import type { Database } from "bun:sqlite";
import { db } from "@/lib/auth";
import { hashPassword } from "better-auth/crypto";

export const ANONYMOUS_EMAIL_DOMAIN = "anon.jetacademie.local";

/**
 * Normalizes username input to lowercase and trimmed string.
 * Example: " User2 " -> "user2"
 */
export function normalizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Converts a username to a synthetic internal email address.
 * No personal data is stored, ensuring 100% GDPR compliance.
 */
export function usernameToSyntheticEmail(username: string): string {
  const normalized = normalizeUsername(username);
  return `${normalized}@${ANONYMOUS_EMAIL_DOMAIN}`;
}

/**
 * Extracts username from synthetic email.
 */
export function syntheticEmailToUsername(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return email;
  return email.slice(0, atIndex).toLowerCase();
}

/**
 * Finds the lowest missing positive integer k >= 1 such that `user${k}` is not taken.
 * If user2 was deleted while user1 and user3 exist, this returns "user2" (gap filling).
 */
export function getNextAvailableUsername(database: Database = db): string {
  const rows = database
    .query<{ name: string }, []>(`SELECT "name" FROM "user" WHERE "name" LIKE 'user%'`)
    .all();

  const takenNumbers = new Set<number>();
  for (const row of rows) {
    const match = row.name.toLowerCase().match(/^user(\d+)$/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!Number.isNaN(num) && num > 0) {
        takenNumbers.add(num);
      }
    }
  }

  let candidate = 1;
  while (takenNumbers.has(candidate)) {
    candidate++;
  }

  return `user${candidate}`;
}

/**
 * Updates a user's password directly without requiring their old password.
 */
export async function updateUserPassword(
  userId: string,
  newPassword: string,
  database: Database = db
): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  database
    .query(
      `UPDATE "account"
       SET "password" = ?, "updatedAt" = ?
       WHERE "userId" = ?`
    )
    .run(hashedPassword, new Date().toISOString(), userId);
}

/**
 * Permanently deletes a user account, sessions, and learning progress.
 * Cascades cleanly so the username slot is freed for future users.
 */
export function deleteUserAccount(userId: string, database: Database = db): void {
  database.transaction(() => {
    database.query(`DELETE FROM "curriculum_progress" WHERE "userId" = ?`).run(userId);
    database.query(`DELETE FROM "session" WHERE "userId" = ?`).run(userId);
    database.query(`DELETE FROM "account" WHERE "userId" = ?`).run(userId);
    database.query(`DELETE FROM "user" WHERE "id" = ?`).run(userId);
  })();
}
