import type { Database } from "@unstage/db";
import { members, organizations, users } from "@unstage/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { eq, inArray, sql } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

export const getUserById = async (db: Database, id: string) => {
  const [result] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      emailVerified: users.emailVerified,
      image: users.image,
      locale: users.locale,
      isOnboarded: users.isOnboarded,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      timezone: users.timezone,
      timezoneAutoSync: users.timezoneAutoSync,
      organizationId: users.organizationId,
      organization: {
        id: organizations.id,
        name: organizations.name,
        logoUrl: organizations.logoUrl,
        plan: organizations.plan,
        createdAt: organizations.createdAt,
      },
    })
    .from(users)
    .leftJoin(organizations, eq(users.organizationId, organizations.id))
    .where(eq(users.id, id));

  return result ?? null;
};

export type UpdateUserParams = Partial<Omit<User, "id" | "createdAt" | "updatedAt">> & {
  id: string;
};

export const updateUser = async (db: Database, data: UpdateUserParams) => {
  const { id, ...updateData } = data;

  const [result] = await db.update(users).set(updateData).where(eq(users.id, id)).returning({
    id: users.id,
    name: users.name,
    email: users.email,
    emailVerified: users.emailVerified,
    image: users.image,
    locale: users.locale,
    isOnboarded: users.isOnboarded,
    role: users.role,
    timezone: users.timezone,
    timezoneAutoSync: users.timezoneAutoSync,
    organizationId: users.organizationId,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  });

  return result;
};

export const deleteUser = async (db: Database, id: string) => {
  // Find organizations where this user is a member
  const organizationsWithUser = await db
    .select({
      organizationId: users.organizationId,
      memberCount: sql<number>`count(${members.userId})`.as("member_count"),
    })
    .from(members)
    .where(eq(members.userId, id))
    .groupBy(members.organizationId);

  // Extract organization IDs with only one member (this user)
  const organizationIdsToDelete = organizationsWithUser
    .filter((organization) => organization.memberCount === 1)
    .map((organization) => organization.organizationId);

  // Delete the user and organizations with only this user as a member
  // Foreign key constraints with cascade delete will handle related records
  await Promise.all([
    db.delete(users).where(eq(users.id, id)),
    organizationIdsToDelete.length > 0
      ? db.delete(organizations).where(inArray(organizations.id, organizationIdsToDelete))
      : Promise.resolve(),
  ]);

  return { id };
};
