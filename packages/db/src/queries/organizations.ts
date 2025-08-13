import type { Database } from "@unstage/db";
import { members, organizations, users } from "@unstage/db/schema";
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

type CreateOrganizationParams = {
  name: string;
  userId: string;
};

export const createOrganization = async (db: Database, params: CreateOrganizationParams) => {
  const { name, userId } = params;

  return db.transaction(async (tx) => {
    const [newOrganization] = await tx
      .insert(organizations)
      .values({ name })
      .returning({ id: organizations.id });

    if (!newOrganization) {
      throw new Error("Failed to create organization");
    }
    await tx.insert(members).values({
      userId,
      organizationId: newOrganization.id,
      role: "owner",
    });

    await tx
      .update(users)
      .set({
        organizationId: newOrganization.id,
      })
      .where(eq(users.id, userId));

    return newOrganization.id;
  });
};
