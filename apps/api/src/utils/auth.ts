import type { Session as BetterAuthSession } from "@unstage/auth";

export type Session = BetterAuthSession & {
  teamId: string;
};

export async function verifySessionToken(sessionToken?: string): Promise<Session | null> {
  if (!sessionToken) {
    return null;
  }
}
