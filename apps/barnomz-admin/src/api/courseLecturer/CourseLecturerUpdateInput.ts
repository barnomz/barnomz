import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";

export type CourseLecturerUpdateInput = {
  course?: CourseWhereUniqueInput;
  lecturer?: LecturerWhereUniqueInput;
};
