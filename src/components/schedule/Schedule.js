import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "@/components/schedule/Course";
import { convertPersianNumberToEnglish } from "@/utils/helpers";
import { weekDays } from "@/constants/const";
import DeleteCourseDialogConfirmation from "@/components/schedule/DeleteCourseDialogConfirmation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/dls/toast/ToastService";
import messages from "@/constants/messages.js";
import { api } from "@/utils/api";
import Tooltip from "@/components/dls/Tooltip.js";

export default function Schedule({
  courses,
  schedules,
  setSchedules,
  currentScheduleId,
  setCurrentScheduleId,
}) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(<></>);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  const removeCourseMutation = api.schedule.removeCourse.useMutation();
  const removeScheduleMutation = api.schedule.remove.useMutation();

  useEffect(() => {
    setCurrentScheduleId(schedules[0]?.id);
  }, [schedules]);

  const handleEventClick = (clickInfo) => {
    setCourseIdToBeDeleted(Number(clickInfo.event.id));
    setIsOpen(true);
  };

  const handleEventMouseEnter = (clickInfo) => {
    const event = clickInfo.jsEvent;
    console.log({ clickInfo });
    const course = clickInfo.event.extendedProps;
    const { top, left } = event.target.getBoundingClientRect();
    setTooltipContent(
      <>
        <span className="text-sm font-bold">{`${course.courseName} (${course.group}-${course.courseCode})`}</span>
        <br />
        <span>{`استاد: ${course.presentedBy}`}</span>
        <br />
        <span>{`ظرفیت: ${course.numberOfCapacity}`}</span>
        <br />
        <span>{`تعداد ثبت‌نامی: ${course.numberOfEnrolled}`}</span>
      </>,
    );
    setTooltipPosition({
      top: top - 170,
      left: left - 400,
    });
  };

  const handleEventMouseLeave = (_) => {
    setTooltipContent(<></>);
    setTooltipPosition(null);
  };

  const removeSchedule = async () => {
    try {
      await removeScheduleMutation.mutateAsync({
        scheduleId: currentScheduleId,
      });

      setSchedules((prev) => prev.filter((s) => s.id !== currentScheduleId));

      toast.open({
        message: "برنامه حذف شد.",
        type: "success",
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        messages.ERROR_OCCURRED;
      toast.open({ message, type: "error" });
    }
  };

  const removeCourse = async () => {
    try {
      await removeCourseMutation.mutateAsync({
        scheduleId: currentScheduleId,
        courseId: courseIdToBeDeleted,
      });

      setSchedules((prev) =>
        prev.map((schedule) => {
          if (schedule.id === currentScheduleId) {
            return {
              ...schedule,
              courses: schedule.courses.filter(
                (course) => course.id !== courseIdToBeDeleted,
              ),
            };
          }
          return schedule;
        }),
      );

      toast.open({
        message: "درس حذف شد.",
        type: "success",
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        messages.ERROR_OCCURRED;
      toast.open({ message, type: "error" });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative h-[700px]">
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
        events={courses}
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

      <button
        className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-full bg-error-500 p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={removeSchedule}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </div>
  );
}
