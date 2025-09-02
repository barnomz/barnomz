import { useRef, useState } from "react";
import { useImmerAtom } from "jotai-immer";
import { useAtom } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useToast } from "@/components/dls/toast/ToastService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { MAX_SCHEDULES } from "@/constants/const";
import { Dialog, Transition } from "@headlessui/react";
import BBtn from "@/components/dls/BBtn";
import { Fragment } from "react";
import { z } from "zod";

const courseSchema = z
  .object({ id: z.number().int() })
  .catchall(z.any());

const scheduleSchema = z.object({
  id: z.number().int(),
  courses: z.array(courseSchema),
});

const importPayloadSchema = z.union([
  z.object({
    app: z.string().optional(),
    version: z.number().optional(),
    exportedAt: z.string().optional(),
    currentScheduleId: z.number().int().optional(),
    schedules: z.array(scheduleSchema),
  }),
  z.array(scheduleSchema),
  scheduleSchema,
]);

export default function ImportSchedulesButton() {
  const toast = useToast();
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const [currentScheduleId, setCurrentScheduleId] = useAtom(
    currentScheduleIdAtom,
  );
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const normalizeImported = (parsed) => {
    if (Array.isArray(parsed)) {
      return { schedules: parsed, suggestedCurrentId: parsed[0]?.id };
    }
    if (parsed && parsed.schedules) {
      return {
        schedules: parsed.schedules,
        suggestedCurrentId: parsed.currentScheduleId ?? parsed.schedules[0]?.id,
      };
    }
    return { schedules: [parsed], suggestedCurrentId: parsed.id };
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const parsed = importPayloadSchema.parse(json);
      const normalized = normalizeImported(parsed);
      if (!normalized.schedules?.length) {
        toast.open({ message: "فایلی برای وارد کردن یافت نشد.", type: "error" });
        return;
      }
      setPreview(normalized);
      setIsDialogOpen(true);
    } catch (err) {
      console.error(err);
      toast.open({ message: "ساختار فایل نامعتبر است.", type: "error" });
    }
  };

  const applyImport = (mode) => {
    if (!preview) return;
    const incoming = preview.schedules;

    if (mode === "append") {
      if (schedules.length + incoming.length > MAX_SCHEDULES) {
        toast.open({
          message: `تعداد برنامه‌های واردشده بیش از حد مجاز است (حداکثر ${MAX_SCHEDULES}).`,
          type: "error",
        });
        setIsDialogOpen(false);
        return;
      }
      setSchedules((draft) => {
        const used = new Set(draft.map((s) => s.id));
        incoming.forEach((sch) => {
          let newId = sch.id;
          while (used.has(newId)) newId += 1; // ensure unique id
          used.add(newId);
          const uniqueCourses = Array.from(
            new Map(sch.courses.map((c) => [c.id, c])).values(),
          );
          draft.push({ id: newId, courses: uniqueCourses });
        });
      });
      const firstId = (() => {
        const existingIds = schedules.map((s) => s.id);
        let id = incoming[0].id;
        while (existingIds.includes(id)) id += 1;
        return id;
      })();
      setCurrentScheduleId(firstId);
      toast.open({ message: "برنامه‌ها با موفقیت اضافه شدند.", type: "success" });
    } else if (mode === "replace") {
      if (incoming.length > MAX_SCHEDULES) {
        toast.open({
          message: `تعداد برنامه‌های واردشده بیش از حد مجاز است (حداکثر ${MAX_SCHEDULES}).`,
          type: "error",
        });
        setIsDialogOpen(false);
        return;
      }
      const sanitized = incoming.map((sch) => ({
        id: sch.id,
        courses: Array.from(new Map(sch.courses.map((c) => [c.id, c])).values()),
      }));
      setSchedules((draft) => {
        draft.splice(0, draft.length, ...sanitized);
      });
      const nextId = preview.suggestedCurrentId ?? sanitized[0]?.id ?? 0;
      setCurrentScheduleId(nextId);
      toast.open({ message: "برنامه‌ها با موفقیت جایگزین شدند.", type: "success" });
    }
    setIsDialogOpen(false);
    setPreview(null);
  };

  return (
    <div className="group relative">
      <input
        type="file"
        ref={inputRef}
        accept="application/json,.json"
        className="hidden"
        onChange={onFileChange}
      />
      <button
        className="z-50 flex items-center justify-center rounded-full bg-[#0ea5a4] p-3 text-white shadow-lg transition-all duration-300 hover:opacity-85"
        onClick={handleClick}
        aria-label="import-schedules"
      >
        <FontAwesomeIcon icon={faFileImport} />
      </button>
      <span className="pointer-events-none absolute bottom-full -right-12 z-50 mb-2 w-max rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        وارد کردن برنامه‌ها (JSON)
      </span>

      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[70]" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-start text-sm text-grey-200 shadow-xl transition-all">
                  <Dialog.Title as="h3" className="w-full text-lg font-medium text-white">
                    وارد کردن برنامه‌ها
                  </Dialog.Title>
                  <div className="mt-3">
                    <p>
                      {`تعداد برنامه‌های موجود در فایل: ${preview?.schedules?.length ?? 0}`}
                    </p>
                    <p className="mt-2 text-xs text-grey-200/80">
                      می‌توانید برنامه‌های واردشده را به برنامه‌های فعلی اضافه کنید یا کل
                      برنامه‌ها را جایگزین نمایید. حداکثر {MAX_SCHEDULES} برنامه مجاز است.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <BBtn color='ghost' onClick={() => setIsDialogOpen(false)}>
                      انصراف
                    </BBtn>
                    <BBtn color='error' onClick={() => applyImport("replace")}>
                      جایگزینی همه
                    </BBtn>
                    <BBtn color='success' onClick={() => applyImport("append")}>
                      افزودن به برنامه‌ها
                    </BBtn>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
