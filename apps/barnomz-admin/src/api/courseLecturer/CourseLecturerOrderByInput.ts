import { SortOrder } from "../../util/SortOrder";

export type CourseLecturerOrderByInput = {
  courseId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  lecturerId?: SortOrder;
  updatedAt?: SortOrder;
};
