import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@unstage/auth";
import type { Session } from "@unstage/auth/client";
import db, { type Database } from "@unstage/db";
import type { Context } from "hono";
import superjson from "superjson";
import { getGeoContext } from "../utils/geo";

type TRPCContext = {
  user: Session["user"] | null;
  session: Session["session"] | null;
  db: Database;
  geo: ReturnType<typeof getGeoContext>;
};

export const createTRPCContext = async (_: unknown, c: Context): Promise<TRPCContext> => {
  const headers = c.req.header();
  const data = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  const geo = getGeoContext(c.req);
  const source = headers["x-trpc-source"] ?? "unknown";

  console.log(`>>> tRPC Request by: ${data?.user.id ?? "unknown"} from source: ${source}`);

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    db,
    geo,
  };
};

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async (opts) => {
  const { session, user } = opts.ctx;

  if (!session || !user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session,
      user,
    },
  });
});
