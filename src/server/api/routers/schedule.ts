import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.schedule.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        courses: {
          include: {
            presentedBy: true,
          },
        },
      },
    });
  }),

  add: protectedProcedure
    .input(
      z.object({
        status: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.schedule.create({
        data: {
          userId: ctx.session.user.id,
          status: input.status,
        },
      });
    }),

  remove: protectedProcedure
    .input(z.object({ scheduleId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.schedule.delete({
        where: { id: input.scheduleId },
      });
      return { success: true };
    }),

  addCourse: protectedProcedure
    .input(
      z.object({
        scheduleId: z.number(),
        courseId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.schedule.update({
        where: { id: input.scheduleId },
        data: {
          courses: {
            connect: { id: input.courseId },
          },
        },
        include: {
          courses: {
            include: {
              presentedBy: true,
            },
          },
        },
      });
    }),

  removeCourse: protectedProcedure
    .input(
      z.object({
        scheduleId: z.number(),
        courseId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.schedule.update({
        where: { id: input.scheduleId },
        data: {
          courses: {
            disconnect: { id: input.courseId },
          },
        },
        include: {
          courses: {
            include: {
              presentedBy: true,
            },
          },
        },
      });
    }),

  makePublic: protectedProcedure
    .input(z.object({ scheduleId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.schedule.update({
        where: { id: input.scheduleId },
        data: { status: "public" },
        include: {
          courses: {
            include: {
              presentedBy: true,
            },
          },
        },
      });
    }),

  // duplicate: protectedProcedure
  //   .input(z.object({ scheduleId: z.number() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const originalSchedule = await ctx.db.schedule.findUnique({
  //       where: { id: input.scheduleId },
  //       include: { courses: true },
  //     });
  //
  //     if (!originalSchedule) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Schedule not found",
  //       });
  //     }
  //
  //     return ctx.db.schedule.create({
  //       data: {
  //         userId: ctx.session.user.id,
  //         status: "private",
  //         courses: {
  //           connect: originalSchedule.courses.map((cls) => ({
  //             id: cls.id,
  //           })),
  //         },
  //       },
  //     });
  //   }),
});
