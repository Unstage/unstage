import db from "@unstage/db";
import * as schema from "@unstage/db/schema";
import EmailOtp from "@unstage/email/email-otp";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
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
        const { data, error } = await resend.emails.send({
          from: "Unstage <noreply@unstage.dev>",
          to: [email],
          subject: type === "sign-in" ? "Sign in to Unstage" : "Verify your email",
          react: EmailOtp({ otp }),
        });

        if (error) {
          console.error(error);
        }

        console.log(data);
      },
    }),
    nextCookies(),
  ],
});
