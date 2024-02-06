import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";

export type CourseLecturerCreateInput = {
  course: CourseWhereUniqueInput;
  lecturer: LecturerWhereUniqueInput;
};
