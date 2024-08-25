import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "@/components/schedule/Course";
import { convertPersianNumberToEnglish } from "@/utils/helpers";
import { weekDays } from "@/constants/const";
import DeleteCourseDialogConfirmation from "@/components/schedule/DeleteCourseDialogConfirmation";
import { useState } from "react";
import { useToast } from "@/components/dls/toast/ToastService";
import messages from "@/constants/messages.js";
import { api } from "@/utils/api";

export default function Schedule({ courses, currentScheduleId, setSchedules }) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);

  const removeCourseMutation = api.schedule.removeCourse.useMutation();

  const handleEventClick = (clickInfo) => {
    setCourseIdToBeDeleted(Number(clickInfo.event.id));
    setIsOpen(true);
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
    <div className="h-[700px]">
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
    </div>
  );
}
