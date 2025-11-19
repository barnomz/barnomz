import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useToast } from "@/components/dls/toast/ToastService";
import {
  buildRecurringEventsFromSchedule,
  generateICS,
  triggerICSDownload,
} from "@/utils/ics";

const ExportScheduleCalendarButton = () => {
  const toast = useToast();
  const schedules = useAtomValue(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const [isExporting, setIsExporting] = useState(false);

  const currentCourses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    if (!schedule) return [];
    return schedule.courses.filter(
      (course) => typeof course.enabled === "undefined" || course.enabled !== false,
    );
  }, [currentScheduleId, schedules]);

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
      const events = buildRecurringEventsFromSchedule(currentCourses);
      if (!events.length) {
        toast.open({ message: "رویدادی برای خروجی موجود نیست.", type: "warning" });
        return;
      }
      const ics = generateICS(events, timezone);
      triggerICSDownload(`barnomz-schedule-${buildFileToken()}.ics`, ics);
      toast.open({ message: "فایل تقویم ساخته شد.", type: "success" });
    } catch (error) {
      console.error(error);
      toast.open({ message: "خطا در ساخت فایل تقویم.", type: "error" });
    } finally {
      setIsExporting(false);
    }
  }, [currentCourses, toast]);

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
