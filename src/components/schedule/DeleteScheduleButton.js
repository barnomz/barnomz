import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import messages from "@/constants/messages";
import { useToast } from "@/components/dls/toast/ToastService";
import { api } from "@/utils/api";

export default function DeleteScheduleButton({
  currentScheduleId,
  setSchedules,
}) {
  const toast = useToast();

  const removeScheduleMutation = api.schedule.remove.useMutation();

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

  return (
    <div className="group relative">
      <button
        className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-full bg-error-500 p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
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
