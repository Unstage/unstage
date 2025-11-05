import { trpcServer } from "@hono/trpc-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { checkHealth } from "@unstage/db/utils/health";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { env } from "./env";
import { withLogger } from "./rest/middleware/logger";
import { routers } from "./rest/routers";
import { createTRPCContext } from "./trpc/init";
import { appRouter } from "./trpc/routers/_app";
import type { HonoContext } from "./types/context";
import { logger } from "./utils/logger";

const app = new OpenAPIHono<HonoContext>();

app.use(secureHeaders());

app.use(
  "*",
  cors({
    origin: env.ALLOWED_API_ORIGINS?.split(",") ?? [],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "accept-language",
      "x-trpc-source",
      "x-user-locale",
      "x-user-timezone",
      "x-user-country",
      "x-request-id",
    ],
    credentials: true,
    exposeHeaders: ["Content-Length", "x-request-id"],
    maxAge: 86400,
  })
);

app.use(
  "/trpc/*",
  withLogger,
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
  })
);

app.get("/health", async (c) => {
  try {
    await checkHealth();
    return c.json({ status: "ok" }, 200);
  } catch (error) {
    logger.error(
      {
        err: error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      "Health check failed"
    );
    return c.json({ status: "error" }, 500);
  }
});

app.doc("/openapi", {
  openapi: "3.1.0",
  info: {
    version: "0.0.1",
    title: "Unstage API",
    description:
      "Hire engineers based on real skills, not algorithm memorization. AI-powered technical assessments with realistic scenarios, collaborative coding, and predictive job performance insights.",
    contact: {
      name: "Unstage Support",
      email: "engineering@unstage.dev",
      url: "https://unstage.dev",
    },
  },
  servers: [
    {
      url: env.NODE_ENV === "production" ? "https://api.unstage.dev" : "http://localhost:8787",
      description: "Production API",
    },
  ],
  security: [
    {
      oauth2: [],
    },
    { token: [] },
  ],
});

app.openAPIRegistry.registerComponent("securitySchemes", "token", {
  type: "http",
  scheme: "bearer",
  description: "Default authentication mechanism",
  "x-speakeasy-example": "UNSTAGE_API_KEY",
});

app.get("/", Scalar({ url: "/openapi", pageTitle: "Unstage API", theme: "saturn" }));

app.route("/", routers);

export default app;
