import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { ScheduleWhereUniqueInput } from "../schedule/ScheduleWhereUniqueInput";

export type ScheduleCourseUpdateInput = {
  course?: CourseWhereUniqueInput;
  schedule?: ScheduleWhereUniqueInput;
};
