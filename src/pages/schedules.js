import Schedule from "@/components/schedule/Schedule";
import ScheduleTabs from "@/components/schedule/ScheduleTabs";
import Head from "next/head";
import CourseSelector from "@/components/schedule/CourseSelector";
import { useEffect, useState } from "react";
import { createTRPCContext } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { courseMapper } from "@/utils/mappers.js";

export default function SchedulesPage({ initialSchedules, colleges }) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [currentScheduleId, setCurrentScheduleId] = useState(schedules[0]?.id);
  const [courses, setCourses] = useState(schedules[0]?.courses || []);

  useEffect(() => {
    setCourses(
      schedules.find((s) => s.id === currentScheduleId)?.courses || [],
    );
  }, [currentScheduleId, schedules]);

  return (
    <>
      <Head>
        <title>برنومز | برنامه هفتگی</title>
      </Head>
      <div className="flex h-full min-h-[55rem] w-full justify-center p-6 text-white">
        <div className="flex max-w-[98.875rem] grow gap-4">
          <div className="flex grow flex-col justify-between rounded-xl bg-primary/50 p-4 backdrop-blur">
            <h1 className="text-2xl font-bold">برنامه هفتگی کلاس‌ها</h1>
            <ScheduleTabs
              currentScheduleId={currentScheduleId}
              schedules={schedules.map((s) => ({
                id: s.id,
              }))}
              onChange={setCurrentScheduleId}
              setSchedules={setSchedules}
            />
            <Schedule
              courses={courses}
              currentScheduleId={currentScheduleId}
              setSchedules={setSchedules}
            />
          </div>

          <CourseSelector
            colleges={colleges}
            currentScheduleId={currentScheduleId}
            setCoursesOfSchedule={setCourses}
            setSchedules={setSchedules}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const trpc = createCaller(await createTRPCContext(context));

  const schedulesPromise = trpc.schedule.list();
  const collegesPromise = trpc.college.getAllDepartments();

  const [schedules, colleges] = await Promise.all([
    schedulesPromise,
    collegesPromise,
  ]);

  schedules.forEach((schedule) => {
    schedule.courses = schedule.courses.map(courseMapper);
  });

  return {
    props: {
      initialSchedules: schedules,
      colleges: colleges,
    },
  };
}
