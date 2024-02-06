import { ReviewLikeCreateNestedManyWithoutUsersInput } from "./ReviewLikeCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";
import { ScheduleCreateNestedManyWithoutUsersInput } from "./ScheduleCreateNestedManyWithoutUsersInput";

export type UserCreateInput = {
  password?: string | null;
  reviewLikes?: ReviewLikeCreateNestedManyWithoutUsersInput;
  roles: InputJsonValue;
  schedules?: ScheduleCreateNestedManyWithoutUsersInput;
  username: string;
};
