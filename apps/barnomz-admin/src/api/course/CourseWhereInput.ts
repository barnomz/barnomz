import { StringFilter } from "../../util/StringFilter";
import { CourseLecturerListRelationFilter } from "../courseLecturer/CourseLecturerListRelationFilter";
import { CourseSessionListRelationFilter } from "../courseSession/CourseSessionListRelationFilter";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { DateTimeFilter } from "../../util/DateTimeFilter";
import { IntFilter } from "../../util/IntFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { LecturerListRelationFilter } from "../lecturer/LecturerListRelationFilter";
import { ScheduleCourseListRelationFilter } from "../scheduleCourse/ScheduleCourseListRelationFilter";

export type CourseWhereInput = {
  code?: StringFilter;
  courseLecturers?: CourseLecturerListRelationFilter;
  courseSessions?: CourseSessionListRelationFilter;
  department?: DepartmentWhereUniqueInput;
  examDate?: DateTimeFilter;
  grade?: "BSC" | "MSC" | "PhD";
  group?: IntFilter;
  id?: StringFilter;
  info?: StringNullableFilter;
  lecturer?: LecturerListRelationFilter;
  name?: StringFilter;
  scheduleCourses?: ScheduleCourseListRelationFilter;
};
