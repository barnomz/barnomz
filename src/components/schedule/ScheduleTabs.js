import { Tab } from "@headlessui/react";
import BBtn from "@/components/dls/BBtn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cn, convertEnglishNumberToPersian } from "@/utils/helpers";
import { useToast } from "@/components/dls/toast/ToastService";
import messages from "@/constants/messages";
import { useAtom } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useImmerAtom } from "jotai-immer";
import { MAX_SCHEDULES } from "@/constants/const.js";

export default function ScheduleTabs({ showAddButton = true }) {
  const toast = useToast();
  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const [currentScheduleId, setCurrentScheduleId] = useAtom(
    currentScheduleIdAtom,
  );

  const createNewSchedule = () => {
    if (schedules.length >= MAX_SCHEDULES) {
      toast.open({
        message:
          "حداکثر " +
          convertEnglishNumberToPersian(MAX_SCHEDULES.toString()) +
          " برنامه می‌توانید داشته باشید.",
        type: "error",
      });
      return;
    }

    setSchedules((draft) => {
      const existingIds = draft.map((s) => s.id);
      const newId = Array.from({ length: MAX_SCHEDULES }, (_, i) => i).find(
        (id) => !existingIds.includes(id),
      );

      draft.push({ id: newId, courses: [] });
      draft.sort((a, b) => a.id - b.id);
    });

    toast.open({
      message: messages.SCHEDULE_CREATED,
      type: "success",
    });
  };

  return (
    <Tab.Group
      selectedIndex={schedules.findIndex((s) => s.id === currentScheduleId)}
      onChange={(i) => setCurrentScheduleId(schedules[i].id)}
    >
      <Tab.List className="flex gap-2">
        {schedules.map((nav, index) => (
          <Tab key={nav.id} as="div" className="h-full">
            {({ selected }) => (
              <button
                className={cn(
                  "ripple h-full text-sm font-bold",
                  "rounded-md px-4 py-2 focus-visible:outline-none",
                  selected
                    ? "bg-secondary/30 text-secondary ring-2 ring-secondary"
                    : "text-grey-200 hover:bg-white/10 hover:text-white",
                )}
              >
                {"برنامه " +
                  convertEnglishNumberToPersian((nav.id + 1).toString())}
              </button>
            )}
          </Tab>
        ))}
        {showAddButton && (
          <BBtn
            icon={faPlus}
            iconSize="lg"
            color="primary-light"
            className="size-[36px] rounded-lg"
            onClick={createNewSchedule}
          />
        )}
      </Tab.List>
    </Tab.Group>
  );
}
