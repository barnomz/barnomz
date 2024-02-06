import { StringFilter } from "../../util/StringFilter";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { ReviewWhereUniqueInput } from "../review/ReviewWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ReviewLikeWhereInput = {
  id?: StringFilter;
  like?: BooleanNullableFilter;
  review?: ReviewWhereUniqueInput;
  user?: UserWhereUniqueInput;
};
