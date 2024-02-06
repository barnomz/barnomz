import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";

export type CourseLecturerWhereInput = {
  course?: CourseWhereUniqueInput;
  id?: StringFilter;
  lecturer?: LecturerWhereUniqueInput;
};
