import type { Database } from "@unstage/db";
import { members, organizations } from "@unstage/db/schema";
import { and, eq } from "drizzle-orm";

export async function getOrganizationsByUserId(db: Database, userId: string) {
  const result = await db
    .select({
      id: members.id,
      userId: members.userId,
      organizationId: members.organizationId,
      role: members.role,
      createdAt: members.createdAt,
      organization: {
        id: organizations.id,
        name: organizations.name,
        logoUrl: organizations.logoUrl,
        plan: organizations.plan,
        createdAt: organizations.createdAt,
        updatedAt: organizations.updatedAt,
      },
    })
    .from(members)
    .leftJoin(organizations, eq(members.organizationId, organizations.id))
    .where(eq(members.userId, userId))
    .orderBy(members.createdAt);

  if (!result) {
    return [];
  }

  return result.map((row) => ({
    id: row.organization?.id,
    name: row.organization?.name,
    logoUrl: row.organization?.logoUrl,
    role: row.role,
    plan: row.organization?.plan,
    createdAt: row.organization?.createdAt,
    updatedAt: row.organization?.updatedAt,
  }));
}

export async function getOrganizationRoleByUserId(
  db: Database,
  userId: string,
  organizationId: string
) {
  const [result] = await db
    .select({
      role: members.role,
    })
    .from(members)
    .where(and(eq(members.userId, userId), eq(members.organizationId, organizationId)));

  return result?.role;
}
