import { getDayOfWeek } from "@/utils/helpers";

export const courseMapper = (cls) => ({
  ...cls,
  // course ids are BigInt in the DB; 
  // normalize to plain numbers so plan state stays JSON-safe (localStorage) and comparisons working
  id: Number(cls.id),
  normalizedCourseName: cls.courseName.toLowerCase(),
  presentedBy: cls.presentedBy.fullName,
  sessions: cls.courseSessions.map((s) => ({
    ...s,
    courseId: Number(s.courseId),
    dayOfWeek: getDayOfWeek(s.dayOfWeek),
  })),
});
