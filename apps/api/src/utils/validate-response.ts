import { z } from "zod";
import { logger } from "./logger";

export function validateResponse(data: unknown, schema: z.ZodType) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const details = z.flattenError(parsed.error);
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
