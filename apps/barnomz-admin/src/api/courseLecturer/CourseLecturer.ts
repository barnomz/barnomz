import { Course } from "../course/Course";
import { Lecturer } from "../lecturer/Lecturer";

export type CourseLecturer = {
  course?: Course;
  createdAt: Date;
  id: string;
  lecturer?: Lecturer;
  updatedAt: Date;
};
