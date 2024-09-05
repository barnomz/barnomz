import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "@/components/dls/toast/ToastService";
import { useAtom } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { useImmerAtom } from "jotai-immer";

export default function DuplicateScheduleButton() {
  const toast = useToast();
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const [currentScheduleId] = useAtom(currentScheduleIdAtom);

  const duplicateSchedule = async () => {
    if (schedules.length >= 5) {
      toast.open({
        message: "حداکثر ۵ برنامه می‌توانید داشته باشید.",
        type: "error",
      });
      return;
    }

    const scheduleToDuplicate = schedules.find(
      (s) => s.id === currentScheduleId,
    );
    if (!scheduleToDuplicate) return;

    setSchedules((draft) => {
      const newId =
        draft.length > 0 ? Math.max(...draft.map((s) => s.id)) + 1 : 0;
      const duplicatedSchedule = {
        ...scheduleToDuplicate,
        id: newId,
      };
      draft.push(duplicatedSchedule);
    });

    toast.open({
      message: "برنامه با موفقیت کپی شد.",
      type: "success",
    });
  };

  return (
    <div className="group relative">
      <button
        className="z-50 flex items-center justify-center rounded-full bg-[#14599A] p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={duplicateSchedule}
      >
        <FontAwesomeIcon icon={faClone} />
      </button>
      <span className="fixed bottom-14 left-9 z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        کلون کردن برنامه
      </span>
    </div>
  );
}
