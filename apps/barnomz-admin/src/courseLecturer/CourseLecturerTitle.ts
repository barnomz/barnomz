import { CourseLecturer as TCourseLecturer } from "../api/courseLecturer/CourseLecturer";

export const COURSELECTURER_TITLE_FIELD = "id";

export const CourseLecturerTitle = (record: TCourseLecturer): string => {
  return record.id?.toString() || String(record.id);
};
