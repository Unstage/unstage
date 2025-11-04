import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import { env } from "./env";
import * as schema from "./schema";

const db: NeonDatabase<typeof schema> = drizzle(env.DATABASE_URL, {
  schema,
  casing: "snake_case",
});

export type Database = typeof db;
export default db;
