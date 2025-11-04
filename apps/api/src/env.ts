import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Node
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(8787),

    // Database (inherited from @unstage/db)
    DATABASE_URL: z.string().url().min(1),

    // API
    ALLOWED_API_ORIGINS: z.string().optional(),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

    // Auth (Better Auth)
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    BETTER_AUTH_URL: z.string().url().optional(),

    // External Services
    OPENAI_API_KEY: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});
