import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "./env";
import * as schema from "./schema";

const sql = neon(env.DATABASE_URL);

const db: NeonHttpDatabase<typeof schema> = drizzle(sql, {
  schema,
  casing: "snake_case",
});

export type Database = typeof db;
export default db;
