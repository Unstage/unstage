import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const db: NeonDatabase<typeof schema> = drizzle(process.env.DATABASE_URL, {
  schema,
  casing: "snake_case",
});

export type Database = typeof db;
export default db;
