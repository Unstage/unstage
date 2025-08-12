import { TRPCError } from "@trpc/server";
import { getOrganizationsByUserId } from "@unstage/db/queries/members";
import { getOrganizationById } from "@unstage/db/queries/organizations";
import { createTRPCRouter, protectedProcedure } from "../init";

export const organizationRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    if (!user.organizationId) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Organization not found" });
    }

    return getOrganizationById(db, user.organizationId);
  }),

  list: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    return getOrganizationsByUserId(db, user.id);
  }),
});
