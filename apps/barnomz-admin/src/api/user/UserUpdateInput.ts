import { ReviewLikeUpdateManyWithoutUsersInput } from "./ReviewLikeUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";
import { ScheduleUpdateManyWithoutUsersInput } from "./ScheduleUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  password?: string | null;
  reviewLikes?: ReviewLikeUpdateManyWithoutUsersInput;
  roles?: InputJsonValue;
  schedules?: ScheduleUpdateManyWithoutUsersInput;
  username?: string;
};
