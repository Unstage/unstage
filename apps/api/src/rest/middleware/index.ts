import type { MiddlewareHandler } from "hono";
import { withAuth } from "./auth";
import { withDatabase } from "./db";
import { withLogger } from "./logger";
import { withRateLimits } from "./rate-limits";

/**
 * Public endpoint middleware - only attaches database with smart routing
 * No authentication required
 * Logger is applied first to capture all request details
 */
export const publicMiddleware: MiddlewareHandler[] = [withLogger, withDatabase];

/**
 * Protected endpoint middleware - requires authentication
 * Supports both API keys (complete) and OAuth tokens (in the future) in a single unified middleware
 * Order: Logger → Database → Auth → Rate Limits
 * Logger must be first to capture request context
 * Auth must come after database to query API keys/users
 */
export const protectedMiddleware: MiddlewareHandler[] = [
  withLogger,
  withDatabase,
  withAuth,
  withRateLimits,
];

export { withRequiredScope } from "./scope";
