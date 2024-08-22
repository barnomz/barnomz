import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import BBtn from "@/components/dls/BBtn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cn, convertEnglishNumberToPersian } from "@/utils/helpers";
import { useToast } from "@/components/dls/toast/ToastService";
import messages from "@/constants/messages.js";
import { api } from "@/utils/api";

export default function ScheduleTabs({
  currentScheduleId,
  schedules,
  setSchedules,
  onChange,
  showAddButton = true,
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const selectedIndex = schedules.findIndex((s) => s.id === currentScheduleId);
  const createScheduleMutation = api.schedule.add.useMutation();

  const createNewSchedule = async () => {
    setIsLoading(true);
    try {
      const res = await createScheduleMutation.mutateAsync({
        status: "private",
      });

      if (res) {
        toast.open({
          message: messages.SCHEDULE_CREATED,
          type: "success",
        });
        setSchedules((prev) => [...prev, res]);
      }
    } catch (error) {
      toast.open({
        message: messages.ERROR_OCCURRED,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={(i) => {
        onChange(schedules[i].id);
      }}
    >
      <Tab.List className="flex gap-2">
        {schedules.map((nav, index) => (
          <Tab key={nav.id} as={Fragment} className="h-full">
            {({ selected }) => (
              <button
                className={cn(
                  "ripple h-full text-sm font-bold",
                  "rounded-md px-4 py-2 focus-visible:outline-none",
                  selected
                    ? "bg-secondary/30 text-secondary ring-secondary ring-2"
                    : "text-grey-200 hover:bg-white/10 hover:text-white",
                )}
              >
                {"برنامه " +
                  convertEnglishNumberToPersian((index + 1).toString())}
              </button>
            )}
          </Tab>
        ))}
        {showAddButton && (
          <BBtn
            icon={faPlus}
            iconSize="lg"
            color="primary-light"
            className="h-[2.5rem] w-[2.5rem] rounded-lg"
            loading={isLoading}
            onClick={createNewSchedule}
          />
        )}
      </Tab.List>
    </Tab.Group>
  );
}
