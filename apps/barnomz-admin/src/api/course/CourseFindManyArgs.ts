import { CourseWhereInput } from "./CourseWhereInput";
import { CourseOrderByInput } from "./CourseOrderByInput";

export type CourseFindManyArgs = {
  where?: CourseWhereInput;
  orderBy?: Array<CourseOrderByInput>;
  skip?: number;
  take?: number;
};
