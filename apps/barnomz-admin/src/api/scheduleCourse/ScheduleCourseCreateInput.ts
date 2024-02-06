import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { ScheduleWhereUniqueInput } from "../schedule/ScheduleWhereUniqueInput";

export type ScheduleCourseCreateInput = {
  course: CourseWhereUniqueInput;
  schedule: ScheduleWhereUniqueInput;
};
