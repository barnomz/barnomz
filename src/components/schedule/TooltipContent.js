import moment from "moment-jalaali";
import { useMemo } from "react";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useAtomValue } from "jotai";

const TooltipContent = ({ course }) => {
  const schedules = useAtomValue(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const courses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    return schedule ? schedule.courses : [];
  }, [schedules, currentScheduleId]);

  const examConflict = courses.some(
    (c) =>
      c.finalExamDate &&
      course.finalExamDate &&
      c.finalExamTime &&
      course.finalExamTime &&
      c.finalExamDate === course.finalExamDate &&
      c.finalExamTime === course.finalExamTime,
  );

  const getCourseFinalExamDateAndTime = (course) => {
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
    <>
      <span className="line-clamp-1 text-sm font-bold">{`${course.courseName} (${course.group}-${course.courseCode})`}</span>
      <br />
      <span>{`استاد: ${course.presentedBy}`}</span>
      <br />
      <span>{`ظرفیت: ${course.numberOfCapacity}`}</span>
      <br />
      <span>{`تعداد ثبت‌نامی: ${course.numberOfEnrolled}`}</span>
      {course.finalExamTime && course.finalExamDate && (
        <>
          <br />
          <span>{`تاریخ امتحان: ${getCourseFinalExamDateAndTime(course)}`}</span>
        </>
      )}
      {examConflict && (
        <>
          <br />
          <div className="pt-2 text-warning">
            تلاقی امتحان با دروس انتخابی دارد.
          </div>
        </>
      )}
    </>
  );
};

export default TooltipContent;
