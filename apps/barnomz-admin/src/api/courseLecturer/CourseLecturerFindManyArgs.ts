import { CourseLecturerWhereInput } from "./CourseLecturerWhereInput";
import { CourseLecturerOrderByInput } from "./CourseLecturerOrderByInput";

export type CourseLecturerFindManyArgs = {
  where?: CourseLecturerWhereInput;
  orderBy?: Array<CourseLecturerOrderByInput>;
  skip?: number;
  take?: number;
};
