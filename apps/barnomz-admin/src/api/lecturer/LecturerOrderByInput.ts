import { SortOrder } from "../../util/SortOrder";

export type LecturerOrderByInput = {
  createdAt?: SortOrder;
  departmentId?: SortOrder;
  examDifficultyRating?: SortOrder;
  fullName?: SortOrder;
  id?: SortOrder;
  moralityRating?: SortOrder;
  numberOfReviews?: SortOrder;
  pressureRating?: SortOrder;
  rating?: SortOrder;
  teachingRating?: SortOrder;
  updatedAt?: SortOrder;
};
