import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/dls/toast/ToastService";
import { useAtom } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";

export default function DeleteScheduleButton() {
  const toast = useToast();
  const [schedules, setSchedules] = useAtom(schedulesAtom);
  const [currentScheduleId, setCurrentScheduleId] = useAtom(
    currentScheduleIdAtom,
  );

  const removeSchedule = async () => {
    if (schedules.length === 1) {
      toast.open({
        message: "حداقل باید یک برنامه داشته باشید.",
        type: "error",
      });
      return;
    }
    const scheduleIdToBeDeleted = currentScheduleId;
    const currentScheduleIndex = schedules.findIndex(
      (s) => s.id === scheduleIdToBeDeleted,
    );
    const nextScheduleId =
      schedules[currentScheduleIndex + 1]?.id ||
      schedules[currentScheduleIndex - 1]?.id;
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleIdToBeDeleted));
    setCurrentScheduleId(nextScheduleId);

    toast.open({
      message: "برنامه حذف شد.",
      type: "success",
    });
  };

  return (
    <div className="group relative">
      <button
        className="z-50 flex items-center justify-center rounded-full bg-error-500 p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={removeSchedule}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <span className="fixed bottom-14 left-0 z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        حذف برنامه
      </span>
    </div>
  );
}
