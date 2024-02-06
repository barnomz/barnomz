import { Lecturer as TLecturer } from "../api/lecturer/Lecturer";

export const LECTURER_TITLE_FIELD = "fullName";

export const LecturerTitle = (record: TLecturer): string => {
  return record.fullName?.toString() || String(record.id);
};
