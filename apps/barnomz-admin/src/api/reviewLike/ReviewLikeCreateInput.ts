import { ReviewWhereUniqueInput } from "../review/ReviewWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewLikeCreateInput = {
  like?: boolean | null;
  review?: ReviewWhereUniqueInput | null;
  user?: UserWhereUniqueInput | null;
};
