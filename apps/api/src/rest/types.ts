import type db from "@unstage/db";

export type Context = {
  Variables: {
    db: typeof db;
    session: {
      user: {
        id: string;
        email: string;
        full_name: string;
      };
      teamId: string;
    };
  };
};
