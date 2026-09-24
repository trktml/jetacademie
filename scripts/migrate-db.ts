import { ensureDatabaseSchema } from "../src/lib/auth";
import { closeDatabase } from "../src/lib/db";

try {
  await ensureDatabaseSchema();
  console.log("Database schema is ready.");
} finally {
  await closeDatabase();
}
