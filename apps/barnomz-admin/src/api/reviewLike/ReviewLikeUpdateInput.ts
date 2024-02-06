import { ReviewWhereUniqueInput } from "../review/ReviewWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewLikeUpdateInput = {
  like?: boolean | null;
  review?: ReviewWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};
