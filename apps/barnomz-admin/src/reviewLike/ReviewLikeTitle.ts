import { ReviewLike as TReviewLike } from "../api/reviewLike/ReviewLike";

export const REVIEWLIKE_TITLE_FIELD = "id";

export const ReviewLikeTitle = (record: TReviewLike): string => {
  return record.id?.toString() || String(record.id);
};
