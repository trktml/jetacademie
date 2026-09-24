import type { Database } from "bun:sqlite";
import { query } from "@/lib/db";

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
export async function getNextAvailableUsername(database?: Database): Promise<string> {
  let rows: { name: string }[];
  if (database && typeof database.query === "function") {
    rows = database
      .query<{ name: string }, []>(`SELECT "name" FROM "user" WHERE "name" LIKE 'user%'`)
      .all();
  } else {
    rows = await query<{ name: string }>(`SELECT "name" FROM "user" WHERE "name" LIKE 'user%'`);
  }

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
