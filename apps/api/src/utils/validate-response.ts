import type { z } from "zod/v3";
import { logger } from "./logger";

export function validateResponse(data: unknown, schema: z.ZodType) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const details = parsed.error.flatten();
    logger.error(details);
    return {
      success: false,
      error: "Response validation failed",
      details,
      data: null,
    };
  }
  return parsed.data;
}
