import { sql } from "@unstage/db";

export async function checkHealth() {
  return await sql`SELECT 1`;
}
