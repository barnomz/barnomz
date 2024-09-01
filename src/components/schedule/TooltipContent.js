import moment from "moment-jalaali";
import { useMemo } from "react";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useAtomValue } from "jotai";

const TooltipContent = ({ course, inSchedule = false }) => {
  const schedules = useAtomValue(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const courses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    return schedule ? schedule.courses : [];
  }, [schedules, currentScheduleId]);

  const isInSchedule = courses
    .filter((c) => !c.mode)
    .find((c) => c.id === course.id);

  const examConflict = courses
    .filter((c) => !c.mode)
    .some(
      (c) =>
        !!c.finalExamDate &&
        !!course.finalExamDate &&
        !!c.finalExamTime &&
        !!course.finalExamTime &&
        c.finalExamDate === course.finalExamDate &&
        c.finalExamTime === course.finalExamTime,
    );

  const getCourseFinalExamDateAndTime = (course) => {
    if (!course.finalExamTime || course.finalExamDate) return null;
    const jalaliDateTimeString = `${course.finalExamDate} ${course.finalExamTime}`;
    const jDateTime = moment(jalaliDateTimeString, "jYYYY/jMM/jDD HH:mm");
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Tehran",
    });
    return formatter.format(new Date(jDateTime)).toString();
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <span className="line-clamp-1 text-sm font-bold">{`${course.courseName} (${course.group}-${course.courseCode})`}</span>
      <span>{`استاد: ${course.presentedBy}`}</span>
      <span>{`ظرفیت: ${course.numberOfCapacity}`}</span>
      <span>{`تعداد ثبت‌نامی: ${course.numberOfEnrolled}`}</span>
      <span>{`تاریخ امتحان: ${getCourseFinalExamDateAndTime(course) || "-"}`}</span>
      {course.info && <span>{`توضیحات: ${course.info || "-"}`}</span>}
      {!inSchedule && examConflict && !isInSchedule && (
        <div className="pt-2 text-warning">
          تلاقی امتحان با دروس انتخابی دارد.
        </div>
      )}
      {isInSchedule && (
        <div className="pt-2 text-success">
          این درس به برنامه اضافه شده است.
        </div>
      )}
    </div>
  );
};

export default TooltipContent;
