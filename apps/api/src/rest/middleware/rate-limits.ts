import type { MiddlewareHandler } from "hono";

export const withRateLimits: MiddlewareHandler = async (c, next) => {
  const { success } = await c.env.UNSTAGE_RATE_LIMITER.limit({
    key: c.get("session")?.user?.id ?? "unknown",
  });

  if (!success) {
    return c.json({ error: "Rate limit exceeded" }, 429);
  }

  await next();
};
