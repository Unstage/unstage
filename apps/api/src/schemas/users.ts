import { z } from "@hono/zod-openapi";

export const updateUserSchema = z.object({
  name: z.string().min(2).max(32).optional().openapi({
    description: "Full name of the user. Must be between 2 and 32 characters",
    example: "Jane Doe",
  }),
  email: z.email().optional().openapi({
    description: "Email of the user. Must be a valid email address",
    example: "jane.doe@example.com",
  }),
  image: z.string().optional().openapi({
    description: "URL of the user's avatar",
    example: "https://example.com/avatar.png",
  }),
  organizationId: z.string().optional().openapi({
    description: "Unique identifier of the organization the user belongs to",
    example: "organization-abc123",
  }),
  locale: z.string().optional().openapi({
    description: "Locale of the user",
    example: "en",
  }),
  timezone: z.string().optional().openapi({
    description: "Timezone of the user",
    example: "America/New_York",
  }),
  timezoneAutoSync: z.boolean().optional().openapi({
    description: "Whether the user's timezone is automatically synced",
    example: true,
  }),
  role: z.enum(["candidate", "recruiter"]).optional().openapi({
    description: "Role of the user",
    example: "candidate",
  }),
});

export const userSchema = z.object({
  id: z.string().openapi({
    description: "Unique identifier of the user",
    example: "user-abc123",
  }),
  name: z.string().nullable().openapi({
    description: "Full name of the user",
    example: "Jane Doe",
  }),
  email: z.email().nullable().openapi({
    description: "Email of the user",
    example: "jane.doe@example.com",
  }),
  emailVerified: z.boolean().nullable().openapi({
    description: "Whether the user's email is verified",
    example: true,
  }),
  image: z.string().nullable().openapi({
    description: "URL of the user's avatar",
    example: "https://example.com/avatar.png",
  }),
  organizationId: z.string().nullable().openapi({
    description: "Unique identifier of the organization the user belongs to",
    example: "organization-abc123",
  }),
  isOnboarded: z.boolean().nullable().openapi({
    description: "Whether the user has completed onboarding",
    example: true,
  }),
  locale: z.string().nullable().openapi({
    description: "Locale of the user",
    example: "en",
  }),
  timezone: z.string().nullable().openapi({
    description: "Timezone of the user",
    example: "America/New_York",
  }),
  timezoneAutoSync: z.boolean().nullable().openapi({
    description: "Whether the user's timezone is automatically synced",
    example: true,
  }),
  role: z.enum(["candidate", "recruiter"]).nullable().openapi({
    description: "Role of the user",
    example: "candidate",
  }),
  createdAt: z.string().openapi({
    description: "Date and time the user was created",
    example: "2021-01-01T00:00:00.000Z",
  }),
  updatedAt: z.string().nullable().openapi({
    description: "Date and time the user was last updated",
    example: "2021-01-01T00:00:00.000Z",
  }),
});
