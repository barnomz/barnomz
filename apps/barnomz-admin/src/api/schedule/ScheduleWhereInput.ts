import { StringFilter } from "../../util/StringFilter";
import { ScheduleCourseListRelationFilter } from "../scheduleCourse/ScheduleCourseListRelationFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ScheduleWhereInput = {
  id?: StringFilter;
  name?: StringFilter;
  scheduleCourses?: ScheduleCourseListRelationFilter;
  user?: UserWhereUniqueInput;
};
