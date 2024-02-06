import { ScheduleCourse as TScheduleCourse } from "../api/scheduleCourse/ScheduleCourse";

export const SCHEDULECOURSE_TITLE_FIELD = "id";

export const ScheduleCourseTitle = (record: TScheduleCourse): string => {
  return record.id?.toString() || String(record.id);
};
