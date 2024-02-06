import { SortOrder } from "../../util/SortOrder";

export type CourseSessionOrderByInput = {
  courseId?: SortOrder;
  createdAt?: SortOrder;
  dayOfWeek?: SortOrder;
  endTime?: SortOrder;
  id?: SortOrder;
  startTime?: SortOrder;
  updatedAt?: SortOrder;
};
