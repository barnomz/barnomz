import { Course } from "../course/Course";
import { Schedule } from "../schedule/Schedule";

export type ScheduleCourse = {
  course?: Course;
  createdAt: Date;
  id: string;
  schedule?: Schedule;
  updatedAt: Date;
};
