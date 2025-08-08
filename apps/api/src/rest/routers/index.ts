import { OpenAPIHono } from "@hono/zod-openapi";
import { protectedMiddleware } from "../middleware";
import { usersRouter } from "./users";

const routers = new OpenAPIHono();

routers.use(...protectedMiddleware);

routers.route("/users", usersRouter);

export { routers };
