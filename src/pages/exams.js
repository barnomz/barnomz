import ScheduleTabs from "@/components/schedule/ScheduleTabs";
import Head from "next/head";
import ExamsTable from "@/components/exams/ExamsTable";
import { useEffect, useState } from "react";
import { courseMapper } from "@/utils/mappers";
import { getServerAuthSession } from "@/server/auth";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export default function ExamsPage({ schedules }) {
  const [courses, setCourses] = useState(schedules[0]?.courses || []);
  const [currentScheduleId, setCurrentScheduleId] = useState(schedules[0]?.id);

  useEffect(() => {
    setCourses(schedules.find((s) => s.id === currentScheduleId)?.courses);
  }, [currentScheduleId]);

  return (
    <>
      <Head>
        <title>برنومز | برنامه امتحانات</title>
      </Head>
      <div className="aboslute flex h-full w-full justify-center p-6 text-white">
        <div className="flex max-w-[98.875rem] grow flex-col justify-between gap-4 rounded-xl bg-primary/50 p-4 backdrop-blur">
          <h1 className="text-2xl font-bold">برنامه امتحانات</h1>
          <ScheduleTabs
            showAddButton={false}
            currentScheduleId={currentScheduleId}
            schedules={schedules.map((s) => ({
              id: s.id,
            }))}
            onChange={setCurrentScheduleId}
          />
          <ExamsTable courses={courses} />
        </div>
      </div>
      <div className="grow"></div>
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

  const schedules = await trpc.schedule.list();
  schedules.forEach((schedule) => {
    schedule.courses = schedule.courses.map(courseMapper);
  });
  return {
    props: {
      schedules,
    },
  };
}
