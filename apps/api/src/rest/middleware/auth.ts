import { apiKeyCache } from "@unstage/cache/api-key-cache";
import { userCache } from "@unstage/cache/user-cache";
import { getApiKeyByToken, updateApiKeyLastUsedAt } from "@unstage/db/queries/api-keys";
import { getUserById } from "@unstage/db/queries/users";
import { hash } from "@unstage/encryption";
import { isValidApiKeyFormat } from "@utils/api-keys";
import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { expandScopes } from "../../utils/scopes";

export const withAuth: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    throw new HTTPException(401, { message: "Authorization header required" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer") {
    throw new HTTPException(401, { message: "Invalid authorization scheme" });
  }

  if (!token) {
    throw new HTTPException(401, { message: "Token required" });
  }

  const db = c.get("db");

  // Handle API keys (start with unstage_)
  if (!token.startsWith("unstage_") || !isValidApiKeyFormat(token)) {
    throw new HTTPException(401, { message: "Invalid token format" });
  }

  const keyHash = hash(token);

  // Check cache first for API key
  let apiKey = apiKeyCache.get(keyHash);

  if (!apiKey) {
    apiKey = await getApiKeyByToken(db, keyHash);
    if (apiKey) {
      apiKeyCache.set(keyHash, apiKey);
    }
  }

  if (!apiKey) {
    throw new HTTPException(401, { message: "Invalid API key" });
  }

  // Check cache first for user
  let user = userCache.get(apiKey.userId);

  if (!user) {
    // If not in cache, query database
    user = await getUserById(db, apiKey.userId);
    if (user) {
      // Store in cache for future requests
      userCache.set(apiKey.userId, user);
    }
  }

  if (!user) {
    throw new HTTPException(401, { message: "User not found" });
  }

  const session = {
    teamId: apiKey.teamId,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.fullName,
    },
  };

  c.set("session", session);
  c.set("teamId", session.teamId);
  c.set("scopes", expandScopes(apiKey.scopes ?? []));

  // Update last used at
  updateApiKeyLastUsedAt(db, apiKey.id);

  await next();
};
