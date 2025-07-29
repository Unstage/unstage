import db, { sql } from "@unstage/db";

export async function checkHealth() {
  return await db.execute(sql`SELECT 1`);
}
