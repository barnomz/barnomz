// import { useToast } from "@/components/dls/toast/ToastService";
// import html2canvas from "html2canvas";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
// import { useState } from "react";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
//
// const shareScheduleImageButton = () => {
//   const toast = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//
//   const copyImageToClipboard = (blob) => {
//     const clipboardItem = new ClipboardItem({ "image/png": blob });
//     navigator.clipboard
//       .write([clipboardItem])
//       .then(() => {
//         toast.open({
//           message: "تصویر برنامه در کلیپ‌بورد کپی شد.",
//           type: "success",
//         });
//       })
//       .catch((err) => {
//         console.error("Error copying image: ", err);
//         toast.open({
//           message: "خطا در کپی تصویر.",
//           type: "error",
//         });
//       })
//       .finally(() => setIsLoading(false));
//   };
//
//   const shareImage = async () => {
//     const element = document.querySelector(".fc");
//     if (!element) return;
//
//     setIsLoading(true);
//
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//
//     canvas.width = element.offsetWidth;
//     canvas.height = element.offsetHeight;
//
//     const elementImage = await html2canvas(element);
//     const texts = elementImage.querySelectorAll(
//       ".overflow-hidden.text-ellipsis.whitespace-nowrap",
//     );
//
//     elementImage.style.background = "#102c4c";
//     context.drawImage(elementImage, 0, 0);
//
//     canvas.toBlob((blob) => {
//       if (blob) {
//         const files = [new File([blob], "image.png", { type: blob.type })];
//         if (!("share" in navigator) || !navigator.canShare({ files })) {
//           copyImageToClipboard(blob);
//           return;
//         }
//         navigator
//           .share({ files })
//           .catch((err) => {
//             console.error("Error copying image: ", err);
//             toast.open({
//               message: "خطا در اشتراک‌گذاری تصویر برنامه.",
//               type: "error",
//             });
//           })
//           .finally(() => setIsLoading(false));
//       }
//     }, "image/png");
//   };
//
//   return (
//     <div className="group relative">
//       <button
//         className="z-50 flex items-center justify-center rounded-full bg-secondary p-3 text-black shadow-lg transition-all duration-300 hover:opacity-85"
//         onClick={shareImage}
//       >
//         <FontAwesomeIcon
//           icon={isLoading ? faSpinner : faShareFromSquare}
//           spin={isLoading}
//         />
//       </button>
//       <span className="fixed bottom-14 left-14 z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//         به اشتراک‌گذاری تصویر برنامه
//       </span>
//     </div>
//   );
// };
//
// export default shareScheduleImageButton;
