import { ScheduleCourseCreateNestedManyWithoutSchedulesInput } from "./ScheduleCourseCreateNestedManyWithoutSchedulesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ScheduleCreateInput = {
  name: string;
  scheduleCourses?: ScheduleCourseCreateNestedManyWithoutSchedulesInput;
  user: UserWhereUniqueInput;
};
