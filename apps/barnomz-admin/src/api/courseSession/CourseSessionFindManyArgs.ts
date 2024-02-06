import { CourseSessionWhereInput } from "./CourseSessionWhereInput";
import { CourseSessionOrderByInput } from "./CourseSessionOrderByInput";

export type CourseSessionFindManyArgs = {
  where?: CourseSessionWhereInput;
  orderBy?: Array<CourseSessionOrderByInput>;
  skip?: number;
  take?: number;
};
