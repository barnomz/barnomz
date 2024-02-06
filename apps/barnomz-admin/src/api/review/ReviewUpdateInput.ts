import { LecturerWhereUniqueInput } from "../lecturer/LecturerWhereUniqueInput";
import { ReviewLikeUpdateManyWithoutReviewsInput } from "./ReviewLikeUpdateManyWithoutReviewsInput";

export type ReviewUpdateInput = {
  examDifficultyRating?: number | null;
  lecturer?: LecturerWhereUniqueInput;
  moralityRating?: number | null;
  pressureRating?: number | null;
  rating?: number | null;
  reviewLikes?: ReviewLikeUpdateManyWithoutReviewsInput;
  teachingRating?: number | null;
  text?: string | null;
};
