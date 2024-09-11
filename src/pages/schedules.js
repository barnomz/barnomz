import Schedule from "@/components/schedule/Schedule";
import ScheduleTabs from "@/components/schedule/ScheduleTabs";
import Head from "next/head";
import CourseSelector from "@/components/schedule/CourseSelector";
import { createTRPCContext } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";
import { schedulesAtom } from "@/atoms";
import { useEffect, useState } from "react";
import { useImmerAtom } from "jotai-immer";
import { api } from "@/utils/api";
import { courseMapper } from "@/utils/mappers";

export default function SchedulesPage({ colleges }) {
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const [coursesFetched, setCoursesFetched] = useState(false);

  const courseIds = schedules.flatMap((schedule) =>
    schedule.courses.map((course) => course.id),
  );

  const { data: fetchedCourses, isSuccess } =
    api.course.getCoursesByIds.useQuery(
      { courseIds },
      { enabled: courseIds.length > 0 && !coursesFetched },
    );

  useEffect(() => {
    if (isSuccess && fetchedCourses) {
      setSchedules((draft) => {
        draft.forEach((schedule, sI) => {
          schedule.courses.forEach((course, cI) => {
            const updatedCourse = fetchedCourses.find(
              (fc) => fc.id === course.id,
            );
            if (updatedCourse) {
              draft[sI].courses[cI] = courseMapper(updatedCourse) ?? course;
            }
          });
        });
      });
      setCoursesFetched(true);
    }
  }, [fetchedCourses]);

  return (
    <>
      <Head>
        <title>برنومز | برنامه هفتگی</title>
      </Head>
      <div className="flex h-full min-h-[55rem] w-full justify-center p-6 text-white">
        <div className="flex max-w-[98.875rem] grow gap-4">
          <div className="flex grow flex-col justify-between rounded-xl bg-primary/50 p-4 backdrop-blur">
            <h1 className="text-2xl font-bold">برنامه هفتگی کلاس‌ها</h1>
            <ScheduleTabs />
            <Schedule />
          </div>
          <CourseSelector colleges={colleges} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const trpc = createCaller(await createTRPCContext(context));
  const colleges = await trpc.college.getAllDepartments();

  return {
    props: {
      colleges,
    },
  };
}
