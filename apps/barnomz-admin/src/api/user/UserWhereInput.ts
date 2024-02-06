import { StringFilter } from "../../util/StringFilter";
import { ReviewLikeListRelationFilter } from "../reviewLike/ReviewLikeListRelationFilter";
import { ScheduleListRelationFilter } from "../schedule/ScheduleListRelationFilter";

export type UserWhereInput = {
  id?: StringFilter;
  reviewLikes?: ReviewLikeListRelationFilter;
  schedules?: ScheduleListRelationFilter;
  username?: StringFilter;
};
