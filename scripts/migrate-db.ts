import { ensureDatabaseSchema } from "../src/lib/auth";
import { closeDatabase } from "../src/lib/db";
import { ensureEditorSchema } from "../src/lib/editor/schema";

try {
  await ensureDatabaseSchema();
  await ensureEditorSchema();
  console.log("Database schema is ready.");
} finally {
  await closeDatabase();
}
