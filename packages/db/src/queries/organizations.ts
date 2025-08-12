import type { Database } from "@unstage/db";
import { organizations } from "@unstage/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

export type Organization = InferSelectModel<typeof organizations>;

export const getOrganizationById = async (db: Database, id: string) => {
  const [result] = await db.select().from(organizations).where(eq(organizations.id, id));
  return result;
};

type UpdateOrganizationParams = {
  id: string;
  data: Partial<typeof organizations.$inferSelect>;
};

export const updateOrganizationById = async (db: Database, params: UpdateOrganizationParams) => {
  const { id, data } = params;
  const [result] = await db
    .update(organizations)
    .set(data)
    .where(eq(organizations.id, id))
    .returning();

  return result;
};
