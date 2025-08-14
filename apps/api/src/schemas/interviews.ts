import { z } from "@hono/zod-openapi";

export const createInterviewSchema = z.object({
  title: z.string().openapi({
    description: "The title of the interview",
    example: "React Developer - State & a11y",
  }),

  description: z.string().optional().openapi({
    description: "The description of the interview",
    example: "This is a test interview",
  }),
  mode: z.enum(["async", "live"]).default("async").openapi({
    description: "The mode of the interview",
    example: "async",
  }),
  timeLimitMinutes: z.number().optional().openapi({
    description: "The time limit of the interview in minutes",
    example: 30,
  }),
  candidateEmail: z.string().optional().openapi({
    description: "The email of the candidate",
    example: "candidate@example.com",
  }),
  candidateName: z.string().optional().openapi({
    description: "The name of the candidate",
    example: "John Doe",
  }),
  candidateUserId: z.string().optional().openapi({
    description: "The user ID of the candidate",
    example: "user-abc123",
  }),
  asyncInterviewDeadlineAt: z.date().optional().openapi({
    description: "The deadline date of the interview",
    example: "2025-01-01",
  }),
  liveInterviewStartsAt: z.date().optional().openapi({
    description: "The start date of the interview",
    example: "2025-01-01",
  }),
});
