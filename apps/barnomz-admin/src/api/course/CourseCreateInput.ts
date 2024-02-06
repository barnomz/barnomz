import { CourseLecturerCreateNestedManyWithoutCoursesInput } from "./CourseLecturerCreateNestedManyWithoutCoursesInput";
import { CourseSessionCreateNestedManyWithoutCoursesInput } from "./CourseSessionCreateNestedManyWithoutCoursesInput";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { LecturerCreateNestedManyWithoutCoursesInput } from "./LecturerCreateNestedManyWithoutCoursesInput";
import { ScheduleCourseCreateNestedManyWithoutCoursesInput } from "./ScheduleCourseCreateNestedManyWithoutCoursesInput";

export type CourseCreateInput = {
  capacity: number;
  code: string;
  courseLecturers?: CourseLecturerCreateNestedManyWithoutCoursesInput;
  courseSessions?: CourseSessionCreateNestedManyWithoutCoursesInput;
  credit: number;
  department: DepartmentWhereUniqueInput;
  examDate: Date;
  grade?: "BSC" | "MSC" | "PhD" | null;
  group: number;
  info?: string | null;
  lecturer?: LecturerCreateNestedManyWithoutCoursesInput;
  name: string;
  numberOfEnrolled?: number | null;
  numberOfPetitioners?: number | null;
  scheduleCourses?: ScheduleCourseCreateNestedManyWithoutCoursesInput;
};
