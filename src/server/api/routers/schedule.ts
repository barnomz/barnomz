import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import type { ISODateString } from "next-auth";

type ContextType = {
  db: PrismaClient<{ log: ("error" | "query" | "warn")[] }, never, DefaultArgs>;
  session: {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & { id: string };
    expires: ISODateString;
  };
};

const validateSchedule = async (ctx: ContextType, scheduleId: number) => {
  const schedule = await ctx.db.schedule.findUnique({
    where: { id: scheduleId },
  });
  if (!schedule) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Schedule not found",
    });
  }
  return schedule;
};

const validateCourse = async (ctx: ContextType, courseId: number) => {
  const course = await ctx.db.course.findUnique({
    where: { id: courseId },
  });
  if (!course) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Course not found",
    });
  }
  return course;
};

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
        include: {
          courses: true,
        },
      });
    }),

  remove: protectedProcedure
    .input(z.object({ scheduleId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await validateSchedule(ctx, input.scheduleId);
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
      await validateSchedule(ctx, input.scheduleId);
      await validateCourse(ctx, input.courseId);

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
      await validateSchedule(ctx, input.scheduleId);
      await validateCourse(ctx, input.courseId);

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
      await validateSchedule(ctx, input.scheduleId);

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
});
