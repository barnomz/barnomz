import { examsTableHeaders } from "@/constants/const";
import moment from "moment-jalaali";
import BBtn from "@/components/dls/BBtn";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/dls/toast/ToastService";
import { useAtomValue } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useImmerAtom } from "jotai-immer";
import { useMemo } from "react";

export default function ExamsTable() {
  const toast = useToast();
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);

  const courses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    if (!schedule) return [];

    return [...schedule.courses].sort((a, b) => {
      const jalaliDateTimeStringA = `${a.finalExamDate} ${a.finalExamTime}`;
      const jalaliDateTimeStringB = `${b.finalExamDate} ${b.finalExamTime}`;

      const jDateTimeA = moment(jalaliDateTimeStringA, "jYYYY/jMM/jDD HH:mm");
      const jDateTimeB = moment(jalaliDateTimeStringB, "jYYYY/jMM/jDD HH:mm");

      return jDateTimeA.isBefore(jDateTimeB)
        ? -1
        : jDateTimeA.isAfter(jDateTimeB)
          ? 1
          : 0;
    });
  }, [schedules, currentScheduleId]);

  const renderProperty = (course, key) => {
    const property = course[key];
    if (key !== "finalExamDate") return property;
    if (!property) return "-";
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

  const removeCourse = async (courseId) => {
    setSchedules((draft) => {
      const schedule = draft.find(
        (schedule) => schedule.id === currentScheduleId,
      );
      if (!schedule) return;
      schedule.courses = schedule.courses.filter(
        (course) => course.id !== courseId,
      );
    });

    toast.open({
      message: "درس حذف شد.",
      type: "success",
    });
  };

  const totalCreditSum = courses
    .filter((c) => c.mode !== "hover")
    .reduce((sum, { unitCount }) => sum + Number(unitCount), 0);

  return (
    <div className="exams-table relative overflow-x-auto rounded-md shadow-md">
      <table className="w-full border-2 border-solid border-primary-light text-right text-sm">
        <thead className="bg-primary-light text-xs text-grey-100">
          <tr>
            {examsTableHeaders.map((header) => (
              <th key={header.key} scope="col" className="px-6 py-3">
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b border-primary-light">
              {examsTableHeaders.map(({ key, _ }, i) => (
                <td key={key} className="px-6 py-3">
                  {i !== examsTableHeaders.length - 1 ? (
                    renderProperty(course, key)
                  ) : (
                    <BBtn
                      icon={faTimes}
                      className="h-6 w-6 rounded-full bg-grey-200 !px-2 hover:bg-error-500"
                      onClick={() => removeCourse(course.id)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-medium text-white">
            <td></td>
            <td></td>
            <td className="px-6 py-3">جمع</td>
            <td className="px-6 py-3">{totalCreditSum}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
