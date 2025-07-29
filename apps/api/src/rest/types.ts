import type { Session } from "@unstage/auth";
import type db from "@unstage/db";

export type Context = {
  Variables: {
    db: typeof db;
    session: Session;
  };
};
