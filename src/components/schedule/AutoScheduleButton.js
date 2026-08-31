import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import AutoScheduleDialog from "@/components/schedule/AutoScheduleDialog";

export default function AutoScheduleButton({ colleges }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative">
        <button
          aria-label="برنامه‌ساز خودکار"
          className="z-50 flex items-center justify-center rounded-full bg-[#7C3AED] p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faWandMagicSparkles} />
        </button>
        <span className="fixed bottom-14 left-[7.5rem] z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          برنامه‌ساز خودکار
        </span>
      </div>
      <AutoScheduleDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        colleges={colleges}
      />
    </>
  );
}
