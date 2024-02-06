import { ReviewLike } from "../reviewLike/ReviewLike";
import { JsonValue } from "type-fest";
import { Schedule } from "../schedule/Schedule";

export type User = {
  createdAt: Date;
  id: string;
  reviewLikes?: Array<ReviewLike>;
  roles: JsonValue;
  schedules?: Array<Schedule>;
  updatedAt: Date;
  username: string;
};
