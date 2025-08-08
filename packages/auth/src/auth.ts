import db from "@unstage/db";
import EmailOtp from "@unstage/email/email-otp";
import { assertIsSignIn } from "@unstage/utils/assertions";
import { betterAuth, type Session } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";
import { betterAuthSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "unstage",
    database: {
      generateId: false,
    },
  },

  user: {
    fields: {
      name: "fullName",
      image: "avatarUrl",
    },
    additionalFields: {
      isOnboarded: {
        type: "boolean",
        default: false,
        input: false,
      },
      role: {
        type: "string",
        required: false,
        default: "candidate",
        input: false,
      },
      locale: {
        type: "string",
        required: false,
        default: "en",
        input: false,
      },
      timezone: {
        type: "string",
        required: false,
        default: "UTC",
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
});

export type { Session };
