import { ReviewWhereInput } from "./ReviewWhereInput";
import { ReviewOrderByInput } from "./ReviewOrderByInput";

export type ReviewFindManyArgs = {
  where?: ReviewWhereInput;
  orderBy?: Array<ReviewOrderByInput>;
  skip?: number;
  take?: number;
};
