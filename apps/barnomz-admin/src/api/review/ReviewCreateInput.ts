import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";
import { ReviewLikeCreateNestedManyWithoutReviewsInput } from "./ReviewLikeCreateNestedManyWithoutReviewsInput";

export type ReviewCreateInput = {
  examDifficultyRating?: number | null;
  lecturer: LecturerWhereUniqueInput;
  moralityRating?: number | null;
  pressureRating?: number | null;
  rating?: number | null;
  reviewLikes?: ReviewLikeCreateNestedManyWithoutReviewsInput;
  teachingRating?: number | null;
  text?: string | null;
};
