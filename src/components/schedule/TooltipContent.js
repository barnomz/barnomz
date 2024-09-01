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
    if (!course.finalExamTime || !course.finalExamDate) return null;
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

  const courseDetails = [
    {
      label: "استاد",
      value: course.presentedBy,
      enabled: true,
      className: "",
    },
    {
      label: "ظرفیت",
      value: course.numberOfCapacity,
      enabled: true,
      className: "",
    },
    {
      label: "تعداد ثبت‌نامی",
      value: course.numberOfEnrolled,
      enabled: true,
      className: "",
    },
    {
      label: "تاریخ امتحان",
      value: getCourseFinalExamDateAndTime(course) || "-",
      enabled: true,
      className: "",
    },
    {
      label: "توضیحات",
      value: course.info || "-",
      enabled: !!course.info,
      className: "",
    },
    {
      label: null,
      value: "تلاقی امتحان با دروس انتخابی دارد.",
      enabled: !inSchedule && examConflict && !isInSchedule,
      className: "pt-2 text-warning",
    },
    {
      label: null,
      value: "این درس به برنامه اضافه شده است.",
      enabled: isInSchedule,
      className: "pt-2 text-success",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-bold">
        <span className="whitespace-nowrap text-white/60">درس:</span>
        <span className="line-clamp-1 flex-1">{`${course.courseName} (${course.group}-${course.courseCode})`}</span>
      </div>
      {courseDetails
        .filter((detail) => detail.enabled)
        .map((detail, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${detail.className}`}
          >
            {detail.label && (
              <span className="whitespace-nowrap text-white/60">{`${detail.label}:`}</span>
            )}
            <span className="flex-1">{detail.value}</span>
          </div>
        ))}
    </div>
  );
};

export default TooltipContent;
