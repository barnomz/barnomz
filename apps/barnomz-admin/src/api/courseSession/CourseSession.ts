import { Course } from "../course/Course";

export type CourseSession = {
  course?: Course;
  createdAt: Date;
  dayOfWeek: number;
  endTime: string | null;
  id: string;
  startTime: string | null;
  updatedAt: Date;
};
