import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";

export type CourseSessionCreateInput = {
  course: CourseWhereUniqueInput;
  dayOfWeek: number;
  endTime?: string | null;
  startTime?: string | null;
};
