import { Course } from "../course/Course";
import { Lecturer } from "../lecturer/Lecturer";

export type Department = {
  code: string;
  courses?: Array<Course>;
  createdAt: Date;
  id: string;
  lecturers?: Array<Lecturer>;
  name: string;
  updatedAt: Date;
};
