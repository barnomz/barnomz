import { CourseLecturer } from "../courseLecturer/CourseLecturer";
import { Course } from "../course/Course";
import { Department } from "../department/Department";
import { Review } from "../review/Review";

export type Lecturer = {
  courseLecturers?: Array<CourseLecturer>;
  courses?: Array<Course>;
  createdAt: Date;
  department?: Department;
  examDifficultyRating: number | null;
  fullName: string;
  id: string;
  moralityRating: number | null;
  numberOfReviews: number | null;
  pressureRating: number | null;
  rating: number | null;
  reviews?: Array<Review>;
  teachingRating: number | null;
  updatedAt: Date;
};
