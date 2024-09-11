import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCoursesByIds: publicProcedure
    .input(z.object({ courseIds: z.array(z.number()) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.course.findMany({
        where: {
          id: {
            in: input.courseIds,
          },
        },
        include: {
          presentedBy: true,
          courseSessions: true,
        },
      });
    }),
});
