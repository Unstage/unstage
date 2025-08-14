import { TRPCError } from "@trpc/server";
import { createInterview } from "@unstage/db/queries/interviews";
import { getOrganizationRoleByUserId } from "@unstage/db/queries/members";
import { createInterviewSchema } from "../../schemas/interviews";
import { protectedProcedure } from "../init";

export const interviewRouter = {
  create: protectedProcedure
    .input(createInterviewSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      // TODO: centralize this check and role check
      if (!user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of an organization",
        });
      }

      const role = await getOrganizationRoleByUserId(db, user.id, user.organizationId);

      if (role !== "admin" && role !== "owner") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not an admin or owner of the organization",
        });
      }

      const [interview] = await createInterview(db, {
        organizationId: user.organizationId,
        ownerId: user.id,
        ...input,
      });

      return interview;
    }),
};
