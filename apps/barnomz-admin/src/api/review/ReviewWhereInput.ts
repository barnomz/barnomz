import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { ReviewLikeListRelationFilter } from "../reviewLike/ReviewLikeListRelationFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type ReviewWhereInput = {
  examDifficultyRating?: IntNullableFilter;
  id?: StringFilter;
  lecturer?: LecturerWhereUniqueInput;
  moralityRating?: IntNullableFilter;
  pressureRating?: IntNullableFilter;
  rating?: FloatNullableFilter;
  reviewLikes?: ReviewLikeListRelationFilter;
  teachingRating?: IntNullableFilter;
  text?: StringNullableFilter;
};
