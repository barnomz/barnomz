import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useToast } from "@/components/dls/toast/ToastService";
import {
  buildExamEventsFromSchedule,
  buildRecurringEventsFromSchedule,
  generateICS,
  getCourseKey,
  triggerICSDownload,
} from "@/utils/ics";

const ExportScheduleCalendarButton = () => {
  const toast = useToast();
  const schedules = useAtomValue(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const [isExporting, setIsExporting] = useState(false);

  const hasExamDateTime = useCallback((course) => {
    const examDate = course?.finalExamDate?.trim?.();
    const examTime = course?.finalExamTime?.trim?.();
    return Boolean(examDate && examTime);
  }, []);

  const currentCourses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    if (!schedule) return [];
    const filteredCourses = schedule.courses.filter(
      (course) =>
        (typeof course.enabled === "undefined" || course.enabled !== false) &&
        course.mode !== "hover",
    );

    const seenCourses = new Set();
    return filteredCourses.filter((course, index) => {
      const key = getCourseKey(course, index);
      if (seenCourses.has(key)) return false;
      seenCourses.add(key);
      return true;
    });
  }, [currentScheduleId, getCourseKey, schedules]);

  const buildFileToken = () => {
    const now = new Date();
    const pad = (value) => value.toString().padStart(2, "0");
    return (
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      "-" +
      pad(now.getHours()) +
      pad(now.getMinutes())
    );
  };

  const onExportCalendar = useCallback(() => {
    if (!currentCourses.length) {
      toast.open({ message: "درسی برای خروجی وجود ندارد.", type: "warning" });
      return;
    }

    try {
      setIsExporting(true);
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      const recurringEvents = buildRecurringEventsFromSchedule(currentCourses);
      const recurringCourseKeys = new Set(
        recurringEvents.map((event) => event.courseKey).filter(Boolean),
      );
      const coursesWithExamDateTime = currentCourses.filter((course) => {
        if (!hasExamDateTime(course)) return false;
        if (!recurringCourseKeys.size) return true;
        return recurringCourseKeys.has(getCourseKey(course));
      });
      const incompleteExamInfoCourses = currentCourses.filter(
        (course) =>
          !hasExamDateTime(course) &&
          (course.finalExamDate || course.finalExamTime),
      );
      const examEvents = buildExamEventsFromSchedule(coursesWithExamDateTime);
      const events = [...recurringEvents, ...examEvents];

      if (!events.length) {
        toast.open({ message: "رویدادی برای خروجی موجود نیست.", type: "warning" });
        return;
      }
      const ics = generateICS(events, timezone);
      triggerICSDownload(`barnomz-schedule-${buildFileToken()}.ics`, ics);
      if (incompleteExamInfoCourses.length) {
        toast.open({
          message:
            "برخی دروس به دلیل نداشتن تاریخ یا زمان امتحان در خروجی قرار نگرفتند.",
          type: "warning",
        });
      }
      toast.open({ message: "فایل تقویم ساخته شد.", type: "success" });
    } catch (error) {
      console.error(error);
      toast.open({ message: "خطا در ساخت فایل تقویم.", type: "error" });
    } finally {
      setIsExporting(false);
    }
  }, [currentCourses, hasExamDateTime, toast]);

  return (
    <div className="group relative">
      <button
        className="z-50 flex items-center justify-center rounded-full bg-[#0f9d58] p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={onExportCalendar}
        aria-label="export-google-calendar"
      >
        <FontAwesomeIcon icon={isExporting ? faSpinner : faCalendarPlus} spin={isExporting} />
      </button>
      <span className="fixed bottom-14 left-[130px] z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        افزودن به Google Calendar
      </span>
    </div>
  );
};

export default ExportScheduleCalendarButton;
