import type db from "@unstage/db";
import type { Logger } from "../utils/logger";

/**
 * Hono context environment type defining variables available in request context.
 * Access these via `c.get('variableName')` in middleware and handlers.
 */
export type HonoContext = {
  Variables: {
    db: typeof db;
    logger: Logger;
    requestId: string;
    userId?: string;
    organizationId?: string;
    session?: {
      user: {
        id: string;
        email: string;
        full_name: string;
      };
      organizationId: string;
    };
    scopes?: string[];
  };
};
