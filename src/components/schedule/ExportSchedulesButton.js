import { useAtomValue } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/dls/toast/ToastService";

const ExportSchedulesButton = () => {
  const toast = useToast();
  const schedules = useAtomValue(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  

  const downloadJSON = (data, fileName) => {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.open({ message: "خروجی با موفقیت ذخیره شد.", type: "success" });
    } catch (e) {
      console.error(e);
      toast.open({ message: "خطا در ساخت فایل خروجی.", type: "error" });
    }
  };

  const nowToken = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return (
      d.getFullYear() +
      "" +
      pad(d.getMonth() + 1) +
      "" +
      pad(d.getDate()) +
      "-" +
      pad(d.getHours()) +
      pad(d.getMinutes())
    );
  };

  const onExportAll = useCallback(() => {
    const payload = {
      app: "barnomz",
      version: 1,
      exportedAt: new Date().toISOString(),
      currentScheduleId,
      schedules,
    };
    downloadJSON(payload, `barnomz-schedules-${nowToken()}.json`);
  }, [currentScheduleId, schedules]);

  return (
    <div className="group relative">
      <button
        className="z-50 flex items-center justify-center rounded-full bg-[#1d7abf] p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={onExportAll}
        aria-label="export-schedules"
      >
        <FontAwesomeIcon icon={faFileExport} />
      </button>
      <span className="pointer-events-none absolute bottom-full -right-16 z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        خروجی  گرفتن همه برنامه‌ها (JSON)
      </span>

    </div>
  );
};

export default ExportSchedulesButton;
