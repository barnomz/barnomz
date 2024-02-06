import { Course as TCourse } from "../api/course/Course";

export const COURSE_TITLE_FIELD = "name";

export const CourseTitle = (record: TCourse): string => {
  return record.name?.toString() || String(record.id);
};
