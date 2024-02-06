import { CourseCreateNestedManyWithoutDepartmentsInput } from "./CourseCreateNestedManyWithoutDepartmentsInput";
import { LecturerCreateNestedManyWithoutDepartmentsInput } from "./LecturerCreateNestedManyWithoutDepartmentsInput";

export type DepartmentCreateInput = {
  code: string;
  courses?: CourseCreateNestedManyWithoutDepartmentsInput;
  lecturers?: LecturerCreateNestedManyWithoutDepartmentsInput;
  name: string;
};
