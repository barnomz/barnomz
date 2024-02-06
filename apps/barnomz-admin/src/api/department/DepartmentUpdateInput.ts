import { CourseUpdateManyWithoutDepartmentsInput } from "./CourseUpdateManyWithoutDepartmentsInput";
import { LecturerUpdateManyWithoutDepartmentsInput } from "./LecturerUpdateManyWithoutDepartmentsInput";

export type DepartmentUpdateInput = {
  code?: string;
  courses?: CourseUpdateManyWithoutDepartmentsInput;
  lecturers?: LecturerUpdateManyWithoutDepartmentsInput;
  name?: string;
};
