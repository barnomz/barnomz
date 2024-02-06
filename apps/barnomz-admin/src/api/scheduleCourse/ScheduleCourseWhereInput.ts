import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { ScheduleWhereUniqueInput } from "../schedule/ScheduleWhereUniqueInput";

export type ScheduleCourseWhereInput = {
  course?: CourseWhereUniqueInput;
  id?: StringFilter;
  schedule?: ScheduleWhereUniqueInput;
};
