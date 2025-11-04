import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables (not available in browser)
   */
  server: {
    // Node
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Client-side environment variables (exposed to browser)
   * Must be prefixed with NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
  },

  /**
   * Runtime environment variables
   */
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
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
