import { atomWithStorage } from "jotai/utils";

export const schedulesAtom = atomWithStorage("schedules", [
  { id: 0, courses: [] },
]);

export const currentScheduleIdAtom = atomWithStorage("currentScheduleId", 0);
