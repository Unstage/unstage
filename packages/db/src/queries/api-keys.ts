import type { Database } from "@unstage/db";
import { apiKeys, users } from "@unstage/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { and, eq } from "drizzle-orm";

export type ApiKey = InferSelectModel<typeof apiKeys>;

export const getApiKeyByToken = async (db: Database, keyHash: string) => {
  const [result] = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      keyHash: apiKeys.keyHash,
      userId: apiKeys.userId,
      organizationId: apiKeys.organizationId,
      scopes: apiKeys.scopes,
      createdAt: apiKeys.createdAt,
      expiresAt: apiKeys.expiresAt,
      revokedAt: apiKeys.revokedAt,
      lastUsedAt: apiKeys.lastUsedAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.keyHash, keyHash))
    .limit(1);

  return result;
};

export const getApiKeysByOrganization = async (db: Database, organizationId: string) => {
  return db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      scopes: apiKeys.scopes,
      expiresAt: apiKeys.expiresAt,
      revokedAt: apiKeys.revokedAt,
      lastUsedAt: apiKeys.lastUsedAt,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      },
    })
    .from(apiKeys)
    .leftJoin(users, eq(apiKeys.userId, users.id))
    .where(eq(apiKeys.organizationId, organizationId))
    .orderBy(apiKeys.createdAt);
};

type DeleteApiKeyParams = {
  id: string;
  organizationId: string;
};

export const deleteApiKey = async (db: Database, params: DeleteApiKeyParams) => {
  const [result] = await db
    .delete(apiKeys)
    .where(and(eq(apiKeys.id, params.id), eq(apiKeys.organizationId, params.organizationId)))
    .returning({
      keyHash: apiKeys.keyHash,
    });

  return result;
};

export const updateApiKeyLastUsedAt = async (db: Database, id: string) => {
  return await db
    .update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, id))
    .returning({
      lastUsedAt: apiKeys.lastUsedAt,
    });
};
