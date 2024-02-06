import { ScheduleCourse } from "../scheduleCourse/ScheduleCourse";
import { User } from "../user/User";

export type Schedule = {
  createdAt: Date;
  id: string;
  name: string;
  scheduleCourses?: Array<ScheduleCourse>;
  updatedAt: Date;
  user?: User;
};
