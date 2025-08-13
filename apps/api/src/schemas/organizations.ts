import { z } from "@hono/zod-openapi";

export const createOrganizationSchema = z.object({
  name: z.string().openapi({
    description: "The name of the organization",
    example: "My Company",
  }),
});
