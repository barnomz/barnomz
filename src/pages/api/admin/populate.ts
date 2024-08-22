import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import axios from "axios";
import { env } from "@/env";

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
  DaysOfWeek: number[];
  StartTime: string | null;
  EndTime: string | null;
  Info: string | null;
  Department: string;
  DepartmentCode: number;
};

type CoursesResponse = Record<string, Course>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    // Step 1: Fetch data from the API
    const response = await axios.get<CoursesResponse>(env.SCRAPER_URL);
    const courses = response.data;

    // Step 2: Iterate over each course
    for (const courseCodeGroup in courses) {
      const courseData = courses[courseCodeGroup];
      const courseCode = courseCodeGroup.split("-")[0];

      if (!courseData || !courseCode) return;

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
      await db.course.upsert({
        where: {
          courseCode_group: {
            courseCode: courseCode,
            group: courseData.Group,
          },
        },
        update: {
          courseName: courseData.Name,
          unitCount: courseData.Units,
          group: courseData.Group,
          finalExamDate: courseData.ExamDate ? courseData.ExamDate : null,
          finalExamTime: courseData.ExamTime
            ? new Date(courseData.ExamTime)
            : null,
          numberOfCapacity: courseData.Capacity,
          numberOfEnrolled: courseData.Registered,
          info: courseData.Info,
          departmentId: department.code,
          presentedById: professor.id,
        },
        create: {
          courseCode: courseCode,
          courseName: courseData.Name,
          unitCount: courseData.Units,
          group: courseData.Group,
          finalExamDate: courseData.ExamDate ? courseData.ExamDate : null,
          finalExamTime: courseData.ExamTime
            ? new Date(courseData.ExamTime)
            : null,
          daysOfWeek: courseData.DaysOfWeek,
          startTime: courseData.StartTime ? courseData.StartTime : null,
          endTime: courseData.EndTime ? courseData.EndTime : null,
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
          grade: "",
          warning: "",
        },
      });

      // // Step 6: Optionally, you can also handle the sessions (DaysOfWeek, StartTime, EndTime)
      // for (const dayOfWeek of courseData.DaysOfWeek) {
      //   await db.classSession.create({
      //     data: {
      //       courseId: course.id,
      //       dayOfWeek: String(dayOfWeek),
      //       startTime: courseData.StartTime
      //         ? convertTimeStringToDate(courseData.StartTime)
      //         : null, // Ensure the proper format
      //       endTime: courseData.EndTime
      //         ? convertTimeStringToDate(courseData.EndTime)
      //         : null, // Ensure the proper format
      //       locationId: course.locationId, // Modify as necessary if handling classrooms
      //     },
      //   });
      // }
    }

    console.log("Database populated successfully");
    res.status(200).json({ message: "Database populated successfully" });
  } catch (error) {
    console.error("Error populating database:", error);
    res.status(500).json({ error: "Failed to populate database" });
  }
};

export default handler;
