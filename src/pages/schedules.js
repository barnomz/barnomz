import Schedule from "@/components/schedule/Schedule";
import ScheduleTabs from "@/components/schedule/ScheduleTabs";
import Head from "next/head";
import CourseSelector from "@/components/schedule/CourseSelector";
import { createTRPCContext } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";
import { schedulesAtom } from "@/atoms";
import { useEffect } from "react";
import { useSetImmerAtom } from "jotai-immer";

export default function SchedulesPage({ colleges }) {
  const setSchedules = useSetImmerAtom(schedulesAtom);

  useEffect(() => {
    setSchedules((draft) => {
      draft.forEach((s) => {
        s.courses.forEach((c) => {
          c.sessions = c.daysOfWeek
            ? c.daysOfWeek.map((day) => ({
                dayOfWeek: day,
                startTime: c.startTime,
                endTime: c.endTime,
              }))
            : c.sessions;
        });
      });
    });
  }, []);

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
      colleges: colleges,
    },
  };
}
