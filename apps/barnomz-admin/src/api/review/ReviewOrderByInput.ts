import { SortOrder } from "../../util/SortOrder";

export type ReviewOrderByInput = {
  createdAt?: SortOrder;
  examDifficultyRating?: SortOrder;
  id?: SortOrder;
  lecturerId?: SortOrder;
  moralityRating?: SortOrder;
  pressureRating?: SortOrder;
  rating?: SortOrder;
  teachingRating?: SortOrder;
  text?: SortOrder;
  updatedAt?: SortOrder;
};
