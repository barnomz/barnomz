import type { Course, CourseSession, Professor } from "@prisma/client";

type CourseWithRelations = Course & {
  presentedBy: Professor;
  courseSessions: CourseSession[];
};

// Course ids are BigInt in the database (deterministic ids, always < 2^53).
// Convert them to plain numbers before anything leaves the server or enters client state.
export const serializeCourses = <T extends CourseWithRelations[]>(
  courses: T,
): unknown[] =>
  courses.map((course) => ({
    ...course,
    id: Number(course.id),
    courseSessions: course.courseSessions.map((session) => ({
      ...session,
      courseId: Number(session.courseId),
    })),
  }));
