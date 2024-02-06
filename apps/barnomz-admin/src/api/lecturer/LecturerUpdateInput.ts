import { CourseLecturerUpdateManyWithoutLecturersInput } from "./CourseLecturerUpdateManyWithoutLecturersInput";
import { CourseUpdateManyWithoutLecturersInput } from "./CourseUpdateManyWithoutLecturersInput";
import { DepartmentWhereUniqueInput } from "../department/DepartmentWhereUniqueInput";
import { ReviewUpdateManyWithoutLecturersInput } from "./ReviewUpdateManyWithoutLecturersInput";

export type LecturerUpdateInput = {
  courseLecturers?: CourseLecturerUpdateManyWithoutLecturersInput;
  courses?: CourseUpdateManyWithoutLecturersInput;
  department?: DepartmentWhereUniqueInput;
  examDifficultyRating?: number | null;
  fullName?: string;
  moralityRating?: number | null;
  numberOfReviews?: number | null;
  pressureRating?: number | null;
  rating?: number | null;
  reviews?: ReviewUpdateManyWithoutLecturersInput;
  teachingRating?: number | null;
};
