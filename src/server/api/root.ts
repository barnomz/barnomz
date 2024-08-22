import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { scheduleRouter } from "@/server/api/routers/schedule";
import { authRouter } from "@/server/api/routers/auth";
import { collegeRouter } from "@/server/api/routers/college";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  schedule: scheduleRouter,
  college: collegeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
