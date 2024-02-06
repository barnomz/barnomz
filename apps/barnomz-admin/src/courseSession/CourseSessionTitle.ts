import { CourseSession as TCourseSession } from "../api/courseSession/CourseSession";

export const COURSESESSION_TITLE_FIELD = "endTime";

export const CourseSessionTitle = (record: TCourseSession): string => {
  return record.endTime?.toString() || String(record.id);
};
