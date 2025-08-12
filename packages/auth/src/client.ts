import {
  emailOTPClient,
  inferAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  plugins: [emailOTPClient(), organizationClient(), inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
