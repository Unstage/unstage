import { updateUser } from "@unstage/db/queries/users";
import { updateUserSchema } from "@/schemas/users";
import { createTRPCRouter, protectedProcedure } from "../init";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { user } }) => {
    return user;
  }),

  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      return updateUser(db, {
        id: user.id,
        ...input,
      });
    }),
});
