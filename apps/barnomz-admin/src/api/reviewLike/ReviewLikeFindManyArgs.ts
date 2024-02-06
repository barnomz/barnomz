import { ReviewLikeWhereInput } from "./ReviewLikeWhereInput";
import { ReviewLikeOrderByInput } from "./ReviewLikeOrderByInput";

export type ReviewLikeFindManyArgs = {
  where?: ReviewLikeWhereInput;
  orderBy?: Array<ReviewLikeOrderByInput>;
  skip?: number;
  take?: number;
};
