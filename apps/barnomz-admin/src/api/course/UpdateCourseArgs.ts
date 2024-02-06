import { CourseWhereUniqueInput } from "./CourseWhereUniqueInput";
import { CourseUpdateInput } from "./CourseUpdateInput";

export type UpdateCourseArgs = {
  where: CourseWhereUniqueInput;
  data: CourseUpdateInput;
};
