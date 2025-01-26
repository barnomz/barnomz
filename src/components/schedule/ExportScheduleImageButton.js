import { useToast } from "@/components/dls/toast/ToastService";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faArrowUpFromBracket,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const ExportScheduleImageButton = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const shareImage = async () => {
    const element = document.querySelector(".fc");
    if (!element) return;

    setIsLoading(true);

    const screenshotCanvas = await html2canvas(element, {
      backgroundColor: "#102c4c",
      onclone: (clonedDocument) => {
        clonedDocument.querySelectorAll(".min-h-5").forEach((node) => {
          node.style.overflow = "visible";
          node.style.minHeight = "unset";
          node.style.whiteSpace = "normal";
        });
        clonedDocument
          .querySelectorAll(".overflow-hidden.text-ellipsis.whitespace-nowrap")
          .forEach((node) => {
            node.classList.remove(
              "overflow-hidden",
              "text-ellipsis",
              "whitespace-nowrap",
            );

            const text = node.innerText.trim();
            if (text.length > 26) {
              node.innerText = text.slice(0, 23) + "...";
            }
          });
      },
    });

    screenshotCanvas.toBlob(async (blob) => {
      if (!blob) return;
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      try {
        await navigator.clipboard.write([clipboardItem]);
        toast.open({
          message: "تصویر برنامه در کلیپ‌بورد کپی شد.",
          type: "success",
        });
      } catch (err) {
        console.error("Error copying image: ", err);
        toast.open({
          message: "خطا در کپی تصویر.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }, "image/png");
  };
  return (
    <div className="group relative">
      <button
        className="z-50 flex items-center justify-center rounded-full bg-secondary p-3 text-black shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={shareImage}
      >
        <FontAwesomeIcon
          icon={isLoading ? faSpinner : faArrowUpFromBracket}
          spin={isLoading}
        />
      </button>
      <span className="fixed bottom-14 left-[70px] z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        کپی کردن تصویر برنامه
      </span>
    </div>
  );
};

export default ExportScheduleImageButton;
