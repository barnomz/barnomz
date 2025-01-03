import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCoursesByIds: publicProcedure
    .input(z.object({ courseIds: z.array(z.number()) }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.course.findFirst({
        select: {
          year: true,
          semester: true,
        },
        orderBy: [{ year: "desc" }, { semester: "desc" }],
      });

      if (!result) {
        return [];
      }

      const { year, semester } = result;

      return ctx.db.course.findMany({
        where: {
          id: {
            in: input.courseIds,
          },
          year,
          semester,
        },
        include: {
          presentedBy: true,
          courseSessions: true,
        },
      });
    }),
});
