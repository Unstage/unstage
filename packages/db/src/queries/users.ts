import type { Database } from "@unstage/db";
import { teams, users, usersOnTeam } from "@unstage/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { eq, inArray, sql } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

export const getUserById = async (db: Database, id: string) => {
  const [result] = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      emailVerified: users.emailVerified,
      avatarUrl: users.avatarUrl,
      locale: users.locale,
      isOnboarded: users.isOnboarded,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      timezone: users.timezone,
      timezoneAutoSync: users.timezoneAutoSync,
      teamId: users.teamId,
      team: {
        id: teams.id,
        name: teams.name,
        logoUrl: teams.logoUrl,
        plan: teams.plan,
        createdAt: teams.createdAt,
      },
    })
    .from(users)
    .leftJoin(teams, eq(users.teamId, teams.id))
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
    fullName: users.fullName,
    email: users.email,
    emailVerified: users.emailVerified,
    avatarUrl: users.avatarUrl,
    locale: users.locale,
    isOnboarded: users.isOnboarded,
    role: users.role,
    timezone: users.timezone,
    timezoneAutoSync: users.timezoneAutoSync,
    teamId: users.teamId,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  });

  return result;
};

export const deleteUser = async (db: Database, id: string) => {
  // Find teams where this user is a member
  const teamsWithUser = await db
    .select({
      teamId: usersOnTeam.teamId,
      memberCount: sql<number>`count(${usersOnTeam.userId})`.as("member_count"),
    })
    .from(usersOnTeam)
    .where(eq(usersOnTeam.userId, id))
    .groupBy(usersOnTeam.teamId);

  // Extract team IDs with only one member (this user)
  const teamIdsToDelete = teamsWithUser
    .filter((team) => team.memberCount === 1)
    .map((team) => team.teamId);

  // Delete the user and teams with only this user as a member
  // Foreign key constraints with cascade delete will handle related records
  await Promise.all([
    db.delete(users).where(eq(users.id, id)),
    teamIdsToDelete.length > 0
      ? db.delete(teams).where(inArray(teams.id, teamIdsToDelete))
      : Promise.resolve(),
  ]);

  return { id };
};
