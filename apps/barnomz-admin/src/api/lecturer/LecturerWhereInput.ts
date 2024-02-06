import { CourseLecturerListRelationFilter } from "../courseLecturer/CourseLecturerListRelationFilter";
import { CourseListRelationFilter } from "../course/CourseListRelationFilter";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { ReviewListRelationFilter } from "../review/ReviewListRelationFilter";

export type LecturerWhereInput = {
  courseLecturers?: CourseLecturerListRelationFilter;
  courses?: CourseListRelationFilter;
  department?: DepartmentWhereUniqueInput;
  fullName?: StringFilter;
  id?: StringFilter;
  reviews?: ReviewListRelationFilter;
};
