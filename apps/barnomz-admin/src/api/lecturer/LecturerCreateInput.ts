import { CourseLecturerCreateNestedManyWithoutLecturersInput } from "./CourseLecturerCreateNestedManyWithoutLecturersInput";
import { CourseCreateNestedManyWithoutLecturersInput } from "./CourseCreateNestedManyWithoutLecturersInput";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { ReviewCreateNestedManyWithoutLecturersInput } from "./ReviewCreateNestedManyWithoutLecturersInput";

export type LecturerCreateInput = {
  courseLecturers?: CourseLecturerCreateNestedManyWithoutLecturersInput;
  courses?: CourseCreateNestedManyWithoutLecturersInput;
  department: DepartmentWhereUniqueInput;
  examDifficultyRating?: number | null;
  fullName: string;
  moralityRating?: number | null;
  numberOfReviews?: number | null;
  pressureRating?: number | null;
  rating?: number | null;
  reviews?: ReviewCreateNestedManyWithoutLecturersInput;
  teachingRating?: number | null;
};
