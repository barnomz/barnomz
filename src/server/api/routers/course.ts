import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCoursesByIds: publicProcedure
    .input(z.object({ courseIds: z.array(z.number().int()) }))
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

      const courses = await ctx.db.course.findMany({
        where: {
          id: {
            in: input.courseIds.map((id) => BigInt(id)),
          },
          year,
          semester,
        },
        include: {
          presentedBy: true,
          courseSessions: true,
        },
      });

      return courses.map((course) => ({
        ...course,
        id: Number(course.id),
        courseSessions: course.courseSessions.map((session) => ({
          ...session,
          courseId: Number(session.courseId),
        })),
      }));
    }),
});
