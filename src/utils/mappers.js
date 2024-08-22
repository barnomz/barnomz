import { getDaysOfWeek } from "@/utils/helpers.js";

export const courseMapper = (cls) => ({
  ...cls,
  presentedBy: cls.presentedBy.fullName,
  daysOfWeek: getDaysOfWeek(cls.daysOfWeek),
  credit: cls.unitCount || 3,
});
