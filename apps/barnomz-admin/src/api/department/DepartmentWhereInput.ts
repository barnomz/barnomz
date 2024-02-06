import { StringFilter } from "../../util/StringFilter";
import { CourseListRelationFilter } from "../course/CourseListRelationFilter";
import { LecturerListRelationFilter } from "../lecturer/LecturerListRelationFilter";

export type DepartmentWhereInput = {
  code?: StringFilter;
  courses?: CourseListRelationFilter;
  id?: StringFilter;
  lecturers?: LecturerListRelationFilter;
  name?: StringFilter;
};
