import { ScheduleCourseWhereInput } from "./ScheduleCourseWhereInput";
import { ScheduleCourseOrderByInput } from "./ScheduleCourseOrderByInput";

export type ScheduleCourseFindManyArgs = {
  where?: ScheduleCourseWhereInput;
  orderBy?: Array<ScheduleCourseOrderByInput>;
  skip?: number;
  take?: number;
};
