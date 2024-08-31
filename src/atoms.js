import { atomWithStorage } from "jotai/utils";

export const currentScheduleIdAtom = atomWithStorage("currentScheduleId", 0);

export const schedulesAtom = atomWithStorage("schedules", [
  { id: 0, courses: [] },
]);
