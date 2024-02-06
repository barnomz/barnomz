import { SortOrder } from "../../util/SortOrder";

export type ReviewLikeOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  like?: SortOrder;
  reviewId?: SortOrder;
  updatedAt?: SortOrder;
  userId?: SortOrder;
};
