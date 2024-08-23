import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        studentNumber: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the username already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { username: input.username },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      // Create new user
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const createdUser = await ctx.db.user.create({
        data: {
          username: input.username,
          studentNumber: input.studentNumber,
          password: hashedPassword,
        },
      });
      await ctx.db.schedule.create({
        data: {
          userId: createdUser.id,
          status: "public",
        },
      });
      return createdUser;
    }),
});
