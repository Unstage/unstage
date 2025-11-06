import db from "@unstage/db";
import { getUserById } from "@unstage/db/queries/users";
import EmailOtp from "@unstage/email/email-otp";
import { assertIsSignIn } from "@unstage/utils/assertions";
import { getApiUrl, getAppUrl, getCookieDomain, getWebsiteUrl } from "@unstage/utils/envs";
import { type BetterAuthOptions, betterAuth, type Session } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, organization } from "better-auth/plugins";
import { Resend } from "resend";
import { betterAuthSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const authConfig = {
  trustedOrigins: [getAppUrl(), getWebsiteUrl(), getApiUrl()],
  databaseHooks: {
    session: {
      create: {
        before: async (session: Session) => {
          const user = await getUserById(db, session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: user?.organizationId,
            },
          };
        },
      },
    },
  },
  advanced: {
    cookiePrefix: "unstage",
    crossSubDomainCookies: {
      enabled: true,
      domain: getCookieDomain(),
    },
    database: {
      generateId: false,
    },
  },

  user: {
    additionalFields: {
      isOnboarded: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
      organizationId: {
        type: "string",
        required: false,
        defaultValue: null,
        input: false,
      },
      role: {
        type: "string",
        required: false,
        input: false,
      },
      locale: {
        type: "string",
        required: false,
        defaultValue: "en",
        input: false,
      },
      timezone: {
        type: "string",
        required: false,
        defaultValue: "UTC",
        input: false,
      },
    },
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: betterAuthSchema,
    usePlural: true,
  }),
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  // },

  plugins: [
    organization(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // We only support email OTP for sign-in, email-verification and password-reset are not supported.
        assertIsSignIn(type);
        const { error } = await resend.emails.send({
          from: "Unstage <noreply@unstage.dev>",
          to: [email],
          subject: "Sign in to Unstage",
          react: EmailOtp({ otp }),
        });

        if (error) {
          console.error(error);
        }
      },
    }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(authConfig) as ReturnType<typeof betterAuth<typeof authConfig>>;
