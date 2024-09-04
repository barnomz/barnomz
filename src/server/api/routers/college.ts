import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const collegeRouter = createTRPCRouter({
  getAllDepartments: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany();
  }),

  getCoursesOfDepartment: publicProcedure
    .input(z.object({ departmentCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.course.findMany({
        where: { departmentId: input.departmentCode },
        include: {
          presentedBy: true,
          courseSessions: true,
        },
      });
    }),
});
