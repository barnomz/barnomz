import { getDayOfWeek } from "@/utils/helpers";

export const courseMapper = (cls) => ({
  ...cls,
  normalizedCourseName: cls.courseName.toLowerCase(),
  presentedBy: cls.presentedBy.fullName,
  sessions: cls.courseSessions.map((s) => ({
    ...s,
    dayOfWeek: getDayOfWeek(s.dayOfWeek),
  })),
});
