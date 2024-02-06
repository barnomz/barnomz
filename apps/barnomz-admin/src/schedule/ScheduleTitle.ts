import { Schedule as TSchedule } from "../api/schedule/Schedule";

export const SCHEDULE_TITLE_FIELD = "name";

export const ScheduleTitle = (record: TSchedule): string => {
  return record.name?.toString() || String(record.id);
};
