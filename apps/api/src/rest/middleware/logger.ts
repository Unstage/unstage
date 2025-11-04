import { randomUUID } from "node:crypto";
import type { MiddlewareHandler } from "hono";
import type { HonoContext } from "../../types/context";
import { createChildLogger } from "../../utils/logger";

/**
 * Logging middleware
 *
 * Features:
 * - Generates unique request ID for tracing
 * - Creates request-scoped child logger
 * - Logs incoming requests with metadata
 * - Logs completed requests with timing and status
 * - Captures and logs errors with stack traces
 * - Enriches logs with auth context (userId, organizationId)
 */
export const withLogger: MiddlewareHandler<HonoContext> = async (c, next) => {
  const start = Date.now();

  // Generate or extract request ID for distributed tracing
  const requestId = c.req.header("x-request-id") || randomUUID();

  // Create child logger with request context
  const logger = createChildLogger({
    requestId,
    method: c.req.method,
    path: c.req.path,
  });

  // Add to context for use in handlers
  c.set("logger", logger);
  c.set("requestId", requestId);

  // Log incoming request
  logger.info({
    msg: "Incoming request",
    headers: {
      userAgent: c.req.header("user-agent"),
      contentType: c.req.header("content-type"),
      origin: c.req.header("origin"),
      referer: c.req.header("referer"),
    },
  });

  try {
    // Process request
    await next();

    const duration = Date.now() - start;

    // Get auth context (set by auth middleware)
    const userId = c.get("userId");
    const organizationId = c.get("organizationId");

    // Log successful completion
    logger.info({
      msg: "Request completed",
      status: c.res.status,
      duration,
      userId,
      organizationId,
    });
  } catch (error) {
    const duration = Date.now() - start;

    // Log error with full context
    logger.error({
      msg: "Request failed",
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      duration,
      status: c.res?.status || 500,
    });

    // Re-throw for error handler
    throw error;
  }
};
