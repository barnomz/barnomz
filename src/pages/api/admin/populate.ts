import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import axios from "axios";
import { env } from "@/env";

type Session = {
  DayOfWeek: number;
  StartTime: string;
  EndTime: string;
};

type Course = {
  Code: string;
  Group: number;
  Name: string;
  Lecturer: string;
  Capacity: number;
  Registered: number;
  Units: number;
  ExamDate: string | null;
  ExamTime: string | null;
  Sessions: Session[];
  Info: string | null;
  Department: string;
  DepartmentCode: number;
  Grade: string;
  Year: number;
  Semester: number;
};

type CoursesResponse = Record<string, Course>;

// {year:4}{semester:1}{courseCode:7}{group:2}{unitCount:1}
// year 1403, semester 1, code 40424, group 1, units 3 => 140310040424013
const buildCourseId = (
  courseCode: string,
  group: number,
  unitCount: number,
  year: number,
  semester: number,
): bigint => {
  const code = Number(courseCode);
  if (!Number.isSafeInteger(code) || code < 0 || code >= 1e7) {
    throw new Error(`Unsupported course code: ${courseCode}`);
  }
  if (group < 0 || group > 99) throw new Error(`Unsupported group: ${group}`);
  if (unitCount < 0 || unitCount > 9) throw new Error(`Unsupported units: ${unitCount}`);
  if (year < 0 || year > 9999) throw new Error(`Unsupported year: ${year}`);
  if (semester < 0 || semester > 9) throw new Error(`Unsupported semester: ${semester}`);
  return BigInt((((year * 10 + semester) * 10000000 + code) * 100 + group) * 10 + unitCount);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const result = await populate();
  if (result)
    res.status(200).json({ message: "Database populated successfully" });
  else res.status(500).json({ error: "Failed to populate database" });
};

export const populate = async (): Promise<boolean> => {
  try {
    // Step 1: Fetch data from the API
    const response = await axios.get<CoursesResponse>(env.SCRAPER_URL);
    const courses = response.data;

    // Step 2: Iterate over each course
    for (const courseCodeGroup in courses) {
      const courseData = courses[courseCodeGroup];
      const courseCode = courseCodeGroup.split("-")[0];

      if (!courseData || !courseCode) continue;

      // Step 3: Check and create Department if it doesn't exist
      let department = await db.department.findUnique({
        where: { code: String(courseData.DepartmentCode) },
      });

      if (!department) {
        department = await db.department.create({
          data: {
            code: String(courseData.DepartmentCode),
            name: courseData.Department || "Unknown Department", // Modify this as per your requirements
          },
        });
      }

      // Step 4: Check and create Professor if they don't exist
      let professor = await db.professor.findFirst({
        where: { fullName: courseData.Lecturer },
      });

      if (!professor) {
        professor = await db.professor.create({
          data: {
            fullName: courseData.Lecturer,
            departmentId: department.code,
          },
        });
      }

      // Step 5: Create or update the Course
      const courseId = buildCourseId(
        courseCode,
        courseData.Group,
        courseData.Units,
        courseData.Year,
        courseData.Semester,
      );

      // Find and drop stale row if exists
      const existingCourse = await db.course.findUnique({
        where: {
          courseCode_group_year_semester: {
            courseCode: courseCode,
            group: courseData.Group,
            year: courseData.Year,
            semester: courseData.Semester,
          },
        },
      });
      if (existingCourse && existingCourse.id !== courseId) {
        await db.course.delete({ where: { id: existingCourse.id } });
      }

      const course = await db.course.upsert({
        where: { id: courseId },
        update: {
          courseName: courseData.Name,
          unitCount: courseData.Units,
          group: courseData.Group,
          finalExamDate: courseData.ExamDate ? courseData.ExamDate : null,
          finalExamTime: courseData.ExamTime ? courseData.ExamTime : null,
          numberOfCapacity: courseData.Capacity,
          numberOfEnrolled: courseData.Registered,
          info: courseData.Info,
          departmentId: department.code,
          presentedById: professor.id,
          grade: courseData.Grade,
        },
        create: {
          id: courseId,
          courseCode: courseCode,
          courseName: courseData.Name,
          unitCount: courseData.Units,
          group: courseData.Group,
          finalExamDate: courseData.ExamDate ? courseData.ExamDate : null,
          finalExamTime: courseData.ExamTime ? courseData.ExamTime : null,
          numberOfCapacity: courseData.Capacity,
          numberOfEnrolled: courseData.Registered,
          numberOfPetitioners: 0,
          info: courseData.Info,
          department: {
            connect: {
              code: department.code,
            },
          },
          presentedBy: {
            connect: {
              id: professor.id,
            },
          },
          grade: courseData.Grade,
          warning: "",
          year: courseData.Year,
          semester: courseData.Semester,
        },
      });

      // Step 6: Create or update the CourseSessions
      // Delete existing course sessions for the course (if necessary)
      await db.courseSession.deleteMany({
        where: { courseId: course.id },
      });

      // Insert the new course sessions
      for (const sessionData of courseData.Sessions) {
        await db.courseSession.create({
          data: {
            courseId: course.id,
            dayOfWeek: sessionData.DayOfWeek,
            startTime: sessionData.StartTime,
            endTime: sessionData.EndTime,
          },
        });
      }
    }

    console.log("Database populated successfully");
    return true;
  } catch (error) {
    console.error("Error populating database:", error);
    return false;
  }
};

export default handler;
