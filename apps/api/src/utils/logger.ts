import type { Logger as PinoLogger } from "pino";
import pino from "pino";
import { env } from "../env";

const isDevelopment = env.NODE_ENV !== "production";
const logLevel = env.LOG_LEVEL;

export const logger = pino({
  level: logLevel,

  // Base metadata included in all logs
  base: {
    service: "unstage-api",
    environment: env.NODE_ENV,
  },

  // Redact sensitive information
  redact: {
    paths: [
      // Authentication & Authorization
      "password",
      "token",
      "authorization",
      "*.password",
      "*.token",
      "*.authorization",
      "req.headers.authorization",
      "req.headers.cookie",
      "req.headers['x-api-key']",
      "api_key",
      "apiKey",
      "secret",
      "*.secret",

      // Better Auth specific
      "BETTER_AUTH_SECRET",
      "*.sessionToken",
      "*.accessToken",
      "*.refreshToken",

      // User PII (GDPR compliance)
      "email",
      "*.email",
      "phoneNumber",
      "*.phoneNumber",

      // API Keys & Secrets
      "OPENAI_API_KEY",
      "RESEND_API_KEY",
      "STRIPE_SECRET_KEY",
      "DATABASE_URL",
    ],
    remove: true,
  },

  // ISO timestamps for consistency
  timestamp: pino.stdTimeFunctions.isoTime,

  // Pretty printing in development
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
          singleLine: false,
          messageFormat: "{levelLabel} - {msg}",
        },
      }
    : undefined,
});

/**
 * Create a child logger with additional context
 * Useful for request-scoped logging
 */
export function createChildLogger(context: Record<string, unknown>): PinoLogger {
  return logger.child(context);
}

export type Logger = typeof logger;
