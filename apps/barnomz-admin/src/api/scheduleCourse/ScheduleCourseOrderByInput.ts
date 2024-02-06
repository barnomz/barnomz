import { SortOrder } from "../../util/SortOrder";

export type ScheduleCourseOrderByInput = {
  courseId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  scheduleId?: SortOrder;
  updatedAt?: SortOrder;
};
