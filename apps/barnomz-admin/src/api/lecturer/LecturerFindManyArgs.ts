import { LecturerWhereInput } from "./LecturerWhereInput";
import { LecturerOrderByInput } from "./LecturerOrderByInput";

export type LecturerFindManyArgs = {
  where?: LecturerWhereInput;
  orderBy?: Array<LecturerOrderByInput>;
  skip?: number;
  take?: number;
};
