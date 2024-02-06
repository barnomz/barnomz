import { SortOrder } from "../../util/SortOrder";

export type CourseOrderByInput = {
  capacity?: SortOrder;
  code?: SortOrder;
  createdAt?: SortOrder;
  credit?: SortOrder;
  departmentId?: SortOrder;
  examDate?: SortOrder;
  grade?: SortOrder;
  group?: SortOrder;
  id?: SortOrder;
  info?: SortOrder;
  name?: SortOrder;
  numberOfEnrolled?: SortOrder;
  numberOfPetitioners?: SortOrder;
  updatedAt?: SortOrder;
};
