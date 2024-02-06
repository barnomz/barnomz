import { CourseLecturer } from "../courseLecturer/CourseLecturer";
import { CourseSession } from "../courseSession/CourseSession";
import { Department } from "../department/Department";
import { Lecturer } from "../lecturer/Lecturer";
import { ScheduleCourse } from "../scheduleCourse/ScheduleCourse";

export type Course = {
  capacity: number;
  code: string;
  courseLecturers?: Array<CourseLecturer>;
  courseSessions?: Array<CourseSession>;
  createdAt: Date;
  credit: number;
  department?: Department;
  examDate: Date;
  grade?: "BSC" | "MSC" | "PhD" | null;
  group: number;
  id: string;
  info: string | null;
  lecturer?: Array<Lecturer>;
  name: string;
  numberOfEnrolled: number | null;
  numberOfPetitioners: number | null;
  scheduleCourses?: Array<ScheduleCourse>;
  updatedAt: Date;
};
