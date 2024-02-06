import { CourseLecturerUpdateManyWithoutCoursesInput } from "./CourseLecturerUpdateManyWithoutCoursesInput";
import { CourseSessionUpdateManyWithoutCoursesInput } from "./CourseSessionUpdateManyWithoutCoursesInput";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { LecturerUpdateManyWithoutCoursesInput } from "./LecturerUpdateManyWithoutCoursesInput";
import { ScheduleCourseUpdateManyWithoutCoursesInput } from "./ScheduleCourseUpdateManyWithoutCoursesInput";

export type CourseUpdateInput = {
  capacity?: number;
  code?: string;
  courseLecturers?: CourseLecturerUpdateManyWithoutCoursesInput;
  courseSessions?: CourseSessionUpdateManyWithoutCoursesInput;
  credit?: number;
  department?: DepartmentWhereUniqueInput;
  examDate?: Date;
  grade?: "BSC" | "MSC" | "PhD" | null;
  group?: number;
  info?: string | null;
  lecturer?: LecturerUpdateManyWithoutCoursesInput;
  name?: string;
  numberOfEnrolled?: number | null;
  numberOfPetitioners?: number | null;
  scheduleCourses?: ScheduleCourseUpdateManyWithoutCoursesInput;
};
