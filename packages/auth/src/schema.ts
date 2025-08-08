import * as schema from "@unstage/db/schema";

export const betterAuthSchema = {
  users: schema.users,
  sessions: schema.sessions,
  accounts: schema.accounts,
  verifications: schema.verifications,
};
