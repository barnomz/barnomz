import { ScheduleCourseUpdateManyWithoutSchedulesInput } from "./ScheduleCourseUpdateManyWithoutSchedulesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ScheduleUpdateInput = {
  name?: string;
  scheduleCourses?: ScheduleCourseUpdateManyWithoutSchedulesInput;
  user?: UserWhereUniqueInput;
};
