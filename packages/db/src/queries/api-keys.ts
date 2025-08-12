import type { Database } from "@unstage/db";
import { apikeys, users } from "@unstage/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { and, eq } from "drizzle-orm";

export type ApiKey = InferSelectModel<typeof apikeys>;

export const getApiKeyByToken = async (db: Database, keyHash: string) => {
  const [result] = await db
    .select({
      id: apikeys.id,
      name: apikeys.name,
      keyHash: apikeys.keyHash,
      userId: apikeys.userId,
      organizationId: apikeys.organizationId,
      scopes: apikeys.scopes,
      createdAt: apikeys.createdAt,
      expiresAt: apikeys.expiresAt,
      revokedAt: apikeys.revokedAt,
      lastUsedAt: apikeys.lastUsedAt,
    })
    .from(apikeys)
    .where(eq(apikeys.keyHash, keyHash))
    .limit(1);

  return result;
};

export const getApiKeysByOrganization = async (db: Database, organizationId: string) => {
  return db
    .select({
      id: apikeys.id,
      name: apikeys.name,
      scopes: apikeys.scopes,
      expiresAt: apikeys.expiresAt,
      revokedAt: apikeys.revokedAt,
      lastUsedAt: apikeys.lastUsedAt,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      },
    })
    .from(apikeys)
    .leftJoin(users, eq(apikeys.userId, users.id))
    .where(eq(apikeys.organizationId, organizationId))
    .orderBy(apikeys.createdAt);
};

type DeleteApiKeyParams = {
  id: string;
  organizationId: string;
};

export const deleteApiKey = async (db: Database, params: DeleteApiKeyParams) => {
  const [result] = await db
    .delete(apikeys)
    .where(and(eq(apikeys.id, params.id), eq(apikeys.organizationId, params.organizationId)))
    .returning({
      keyHash: apikeys.keyHash,
    });

  return result;
};

export const updateApiKeyLastUsedAt = async (db: Database, id: string) => {
  return await db
    .update(apikeys)
    .set({ lastUsedAt: new Date().toISOString() })
    .where(eq(apikeys.id, id));
};
