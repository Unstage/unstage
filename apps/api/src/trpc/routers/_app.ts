import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { interviewRouter } from "./interview";
import { organizationRouter } from "./organization";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  organization: organizationRouter,
  interview: interviewRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
