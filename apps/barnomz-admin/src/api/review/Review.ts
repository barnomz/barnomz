import { Lecturer } from "../lecturer/Lecturer";
import { ReviewLike } from "../reviewLike/ReviewLike";

export type Review = {
  createdAt: Date;
  examDifficultyRating: number | null;
  id: string;
  lecturer?: Lecturer;
  moralityRating: number | null;
  pressureRating: number | null;
  rating: number | null;
  reviewLikes?: Array<ReviewLike>;
  teachingRating: number | null;
  text: string | null;
  updatedAt: Date;
};
