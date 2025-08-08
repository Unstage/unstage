import type { MiddlewareHandler } from "hono";
import { withAuth } from "./auth";
import { withDatabase } from "./db";
import { withRateLimits } from "./rate-limits";

/**
 * Public endpoint middleware - only attaches database with smart routing
 * No authentication required
 */
export const publicMiddleware: MiddlewareHandler[] = [withDatabase];

/**
 * Protected endpoint middleware - requires authentication
 * Supports both API keys (complete) and OAuth tokens (in the future) in a single unified middleware
 * Note: withAuth must be first to set session in context
 */
export const protectedMiddleware: MiddlewareHandler[] = [withDatabase, withAuth, withRateLimits];

export { withRequiredScope } from "./scope";
