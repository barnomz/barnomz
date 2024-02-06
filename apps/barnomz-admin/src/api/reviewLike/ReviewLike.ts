import { Review } from "../review/Review";
import { User } from "../user/User";

export type ReviewLike = {
  createdAt: Date;
  id: string;
  like: boolean | null;
  review?: Review | null;
  updatedAt: Date;
  user?: User | null;
};
