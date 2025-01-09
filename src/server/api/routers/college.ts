import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const collegeRouter = createTRPCRouter({
  getAllDepartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany();
  }),

  getCoursesOfDepartment: publicProcedure
    .input(z.object({ departmentCode: z.string() }))
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
          departmentId: input.departmentCode,
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
