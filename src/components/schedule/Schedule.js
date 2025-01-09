import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "@/components/schedule/Course";
import { convertPersianNumberToEnglish } from "@/utils/helpers";
import { weekDays } from "@/constants/const";
import DeleteCourseDialogConfirmation from "@/components/schedule/DeleteCourseDialogConfirmation";
import { useMemo, useRef, useState } from "react";
import { useToast } from "@/components/dls/toast/ToastService";
import Tooltip from "@/components/dls/Tooltip";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useImmerAtom } from "jotai-immer";
import TooltipContent from "@/components/schedule/TooltipContent";
// import ShareScheduleImageButton from "@/components/schedule/ShareScheduleImageButton";
import DuplicateScheduleButton from "@/components/schedule/DuplicateScheduleButton";
import DeleteScheduleButton from "@/components/schedule/DeleteScheduleButton";

export default function Schedule() {
  const toast = useToast();
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(<></>);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const scheduleRef = useRef(null);

  const courses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    return schedule
      ? schedule.courses.filter(
          (c) => typeof c.enabled === "undefined" || c.enabled !== false,
        )
      : [];
  }, [schedules, currentScheduleId]);

  const eventCourses = useMemo(() => {
    return courses.reduce((acc, course) => {
      const sessions = course.sessions.map((session) => ({
        id: `${course.id}-${session.dayOfWeek}-${session.startTime}`,
        courseName: course.courseName,
        courseCode: course.courseCode,
        unitCount: course.unitCount,
        presentedById: course.presentedById,
        group: course.group,
        locationId: course.locationId,
        finalExamDate: course.finalExamDate,
        finalExamTime: course.finalExamTime,
        numberOfPetitioners: course.numberOfPetitioners,
        numberOfCapacity: course.numberOfCapacity,
        numberOfEnrolled: course.numberOfEnrolled,
        departmentId: course.departmentId,
        info: course.info,
        warning: course.warning,
        grade: course.grade,
        presentedBy: course.presentedBy,
        daysOfWeek: [session.dayOfWeek],
        startTime: session.startTime,
        endTime: session.endTime,
        mode: course.mode,
      }));

      return acc.concat(sessions);
    }, []);
  }, [courses]);

  const handleEventClick = (clickInfo) => {
    setCourseIdToBeDeleted(Number(clickInfo.event.id.split("-")[0]));
    setIsOpen(true);
  };

  const handleEventMouseEnter = (clickInfo) => {
    const course = clickInfo.event.extendedProps;
    const eventRect = clickInfo.el.getBoundingClientRect();
    const parentRect = scheduleRef.current.getBoundingClientRect();
    const tooltipWidth = 240;
    const margin = 5;
    const tooltipX = eventRect.left - parentRect.left - tooltipWidth - margin;
    const tooltipY = eventRect.top - parentRect.top;
    setTooltipContent(<TooltipContent course={course} inSchedule />);
    setTooltipPosition({
      left: tooltipX,
      top: tooltipY,
    });
  };

  const handleEventMouseLeave = (_) => {
    setTooltipContent(<></>);
    setTooltipPosition(null);
  };

  const removeCourse = async () => {
    setSchedules((draft) => {
      const schedule = draft.find((s) => s.id === currentScheduleId);
      if (!schedule) return;
      schedule.courses = schedule.courses.filter(
        (c) => c.id !== courseIdToBeDeleted,
      );
    });
    toast.open({
      message: "درس حذف شد.",
      type: "success",
    });
    setIsOpen(false);
  };

  return (
    <div ref={scheduleRef} className="relative h-[700px]">
      <DeleteCourseDialogConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={removeCourse}
      />
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        editable={false}
        selectable={false}
        selectMirror={false}
        expandRows
        dayMaxEvents
        eventOverlap={false}
        slotEventOverlap={true}
        weekends
        events={eventCourses}
        eventClick={handleEventClick}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        slotMinTime={"07:00"}
        slotMaxTime={"20:00"}
        direction="rtl"
        initialDate={"2023-12-30"}
        locale={faLocale}
        firstDay={0}
        height={"700px"}
        views={{
          timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: false,
            slotDuration: "01:00:00",
            duration: { days: 6 },
            slotLabelContent: ({ date }) => (
              <div className="me-1 ms-2 mt-1 text-sm font-medium">
                {convertPersianNumberToEnglish(date.getHours().toString())}
              </div>
            ),
            dayHeaderContent: ({ date }) => (
              <div className="pb-2 text-sm font-medium">
                {
                  weekDays[
                    ((date.getDay() % weekDays.length) + weekDays.length) %
                      weekDays.length
                  ]
                }
              </div>
            ),
            eventContent: (event) => (
              <Course
                course={{
                  id: event.event.id,
                  ...event.event.extendedProps,
                }}
              ></Course>
            ),
          },
        }}
      />

      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
        {/*<ShareScheduleImageButton />*/}
        <DuplicateScheduleButton />
        <DeleteScheduleButton />
      </div>
      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </div>
  );
}
