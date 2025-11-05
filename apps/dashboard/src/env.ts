import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables (not available in browser)
   */
  server: {
    // Node
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    // Database (inherited from @unstage/db)
    DATABASE_URL: z.url().min(1),

    // Auth (Better Auth)
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    BETTER_AUTH_URL: z.url().optional(),

    // External Services
    RESEND_API_KEY: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables (exposed to browser)
   * Must be prefixed with NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_AUTH_URL: z.url().optional().default("http://localhost:3001"),
  },

  /**
   * Runtime environment variables
   * This is needed because Next.js doesn't expose process.env at runtime
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,

    // Client
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },

  /**
   * Treat empty strings as undefined
   */
  emptyStringAsUndefined: true,

  /**
   * Skip validation during build (useful for Docker builds)
   */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
