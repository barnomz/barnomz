import ScheduleTabs from "@/components/schedule/ScheduleTabs";
import Head from "next/head";
import ExamsTable from "@/components/exams/ExamsTable";

export default function ExamsPage() {
  return (
    <>
      <Head>
        <title>برنومز | برنامه امتحانات</title>
      </Head>
      <div className="aboslute flex h-full w-full justify-center p-6 text-white">
        <div className="flex max-w-[98.875rem] grow flex-col justify-between gap-4 rounded-xl bg-primary/50 p-4 backdrop-blur">
          <h1 className="text-2xl font-bold">برنامه امتحانات</h1>
          <ScheduleTabs showAddButton={false} />
          <ExamsTable />
        </div>
      </div>
      <div className="grow"></div>
    </>
  );
}
