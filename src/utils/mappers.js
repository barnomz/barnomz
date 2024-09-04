import { getDayOfWeek } from "@/utils/helpers";

export const courseMapper = (cls) => ({
  ...cls,
  presentedBy: cls.presentedBy.fullName,
  sessions: cls.courseSessions.map((s) => ({
    ...s,
    dayOfWeek: getDayOfWeek(s.dayOfWeek),
  })),
});
