import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const neonQueryClient = neon(process.env.DATABASE_URL);
const db = drizzle({ client: neonQueryClient, casing: "snake_case" });

export type Database = typeof db;
export { sql } from "drizzle-orm";
export default db;
