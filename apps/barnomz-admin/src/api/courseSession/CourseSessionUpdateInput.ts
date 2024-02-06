import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";

export type CourseSessionUpdateInput = {
  course?: CourseWhereUniqueInput;
  dayOfWeek?: number;
  endTime?: string | null;
  startTime?: string | null;
};
