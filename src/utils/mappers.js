import { getDaysOfWeek } from "@/utils/helpers";

export const courseMapper = (cls) => ({
  ...cls,
  presentedBy: cls.presentedBy.fullName,
  daysOfWeek: getDaysOfWeek(cls.daysOfWeek),
});
