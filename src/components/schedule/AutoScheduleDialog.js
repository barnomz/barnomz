import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faSearch,
  faWandMagicSparkles,
  faChevronLeft,
  faChevronRight,
  faTrashCan,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import BBtn from "@/components/dls/BBtn";
import BInput from "@/components/dls/BInput";
import CollegeCombobox from "@/components/schedule/CollegeCombobox";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { courseMapper } from "@/utils/mappers";
import { normalizeQuery, convertEnglishNumberToPersian } from "@/utils/helpers";
import { weekDays } from "@/constants/const";
import { generateSchedules, groupCandidates } from "@/utils/scheduleGenerator";
import { useToast } from "@/components/dls/toast/ToastService";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useImmerAtom } from "jotai-immer";

export default function AutoScheduleDialog({ isOpen, onClose, colleges }) {
  const toast = useToast();
  const [, setSchedules] = useImmerAtom(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [checkExam, setCheckExam] = useState(true);
  const [results, setResults] = useState(null);
  const [resultIndex, setResultIndex] = useState(0);

  const { data: fetchedCourses, isLoading } =
    api.college.getCoursesOfDepartment.useQuery(
      { departmentCode: selectedCollege?.code },
      { enabled: isOpen && !!selectedCollege },
    );

  const availableCourses = useMemo(() => {
    if (!fetchedCourses) return [];
    const mapped = fetchedCourses.map(courseMapper);
    return mapped.sort((a, b) => {
      const gradeOrder = { bs: 0, ms: 1, phd: 2 };
      const gradeComparison = gradeOrder[a.grade] - gradeOrder[b.grade];
      if (gradeComparison !== 0) return gradeComparison;
      if (a.courseCode === b.courseCode) return a.group - b.group;
      return a.courseCode.localeCompare(b.courseCode);
    });
  }, [fetchedCourses]);

  const normalizedQuery = normalizeQuery(query);
  const filteredCourses =
    normalizedQuery === ""
      ? availableCourses
      : availableCourses.filter(
          (course) =>
            course.courseCode.toLowerCase().includes(normalizedQuery) ||
            course.normalizedCourseName.includes(normalizedQuery) ||
            course.presentedBy.toLowerCase().includes(normalizedQuery),
        );

  const candidateIds = useMemo(
    () => new Set(candidates.map((c) => c.id)),
    [candidates],
  );
  const requirements = useMemo(
    () => groupCandidates(candidates),
    [candidates],
  );

  const toggleCandidate = (course) => {
    setResults(null);
    setCandidates((prev) =>
      prev.some((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course],
    );
  };

  const removeRequirement = (courseCode) => {
    setResults(null);
    setCandidates((prev) => prev.filter((c) => c.courseCode !== courseCode));
  };

  const toggleCheckExam = () => {
    setResults(null);
    setCheckExam((prev) => !prev);
  };

  const handleGenerate = () => {
    if (requirements.length === 0) {
      toast.open({ message: "ابتدا چند درس انتخاب کنید.", type: "error" });
      return;
    }
    const combos = generateSchedules(requirements, {
      checkExam,
      maxResults: 200,
    });
    setResults(combos);
    setResultIndex(0);
    if (combos.length === 0) {
      toast.open({
        message: "هیچ ترکیب بدون تداخلی یافت نشد. گروه‌های بیشتری اضافه کنید.",
        type: "error",
      });
    } else {
      toast.open({
        message:
          convertEnglishNumberToPersian(combos.length.toString()) +
          " برنامه بدون تداخل ساخته شد.",
        type: "success",
      });
    }
  };

  const currentCombo = results && results[resultIndex];

  const comboUnitCount = currentCombo
    ? currentCombo.reduce((sum, c) => sum + Number(c.unitCount || 0), 0)
    : 0;

  const handleApply = () => {
    if (!currentCombo) return;
    setSchedules((draft) => {
      const schedule = draft.find((s) => s.id === currentScheduleId);
      if (!schedule) return;
      schedule.courses = currentCombo.map((course) => {
        const { mode, enabled, ...rest } = course;
        return rest;
      });
    });
    toast.open({ message: "برنامه روی جدول اعمال شد.", type: "success" });
    onClose();
  };

  const goPrev = () =>
    setResultIndex((i) => (i - 1 + results.length) % results.length);
  const goNext = () => setResultIndex((i) => (i + 1) % results.length);

  const formatSessions = (course) =>
    (course.sessions ?? [])
      .map(
        (s) => `${weekDays[s.dayOfWeek]} ${s.startTime}-${s.endTime}`,
      )
      .join("، ");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                dir="rtl"
                className="relative w-full max-w-4xl transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-start text-white shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium">
                    برنامه‌ساز خودکار
                  </Dialog.Title>
                  <button
                    aria-label="بستن"
                    onClick={onClose}
                    className="grid h-8 w-8 place-items-center rounded-md text-grey-200 transition-colors hover:bg-white/10"
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-grey-200">
                  درس‌های مورد نظر و گروه‌های قابل‌قبول را انتخاب کنید تا همه
                  ترکیب‌های بدون تداخل ساخته شوند.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* PLACEHOLDER_LEFT */}
                  <div className="flex flex-col gap-3 rounded-lg bg-primary/50 p-3">
                    <CollegeCombobox
                      colleges={colleges}
                      selectedCollege={selectedCollege}
                      onSelect={(college) => setSelectedCollege(college)}
                    />
                    <BInput
                      value={query}
                      icon={faSearch}
                      placeholder="جستجوی درس..."
                      dir="rtl"
                      wrapperClass="shadow-md"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="h-72 space-y-2 overflow-auto pe-1">
                      {isLoading ? (
                        <Loading />
                      ) : (
                        filteredCourses.map((course) => {
                          const selected = candidateIds.has(course.id);
                          return (
                            <button
                              key={course.id}
                              onClick={() => toggleCandidate(course)}
                              className={
                                "flex w-full items-center justify-between rounded px-2 py-1 text-start text-sm transition-all " +
                                (selected
                                  ? "bg-secondary text-primary-darker"
                                  : "bg-grey-300/75 text-primary-darker hover:bg-grey-300")
                              }
                            >
                              <span className="line-clamp-1">
                                {course.courseName}
                              </span>
                              <span className="ms-2 shrink-0 opacity-70">
                                {course.group}
                                {selected && (
                                  <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="ms-1"
                                  />
                                )}
                              </span>
                            </button>
                          );
                        })
                      )}
                      {!isLoading &&
                        selectedCollege &&
                        filteredCourses.length === 0 && (
                          <div className="text-center text-sm text-grey-200">
                            درسی یافت نشد...
                          </div>
                        )}
                      {!selectedCollege && (
                        <div className="pt-8 text-center text-sm text-grey-200">
                          برای شروع یک دانشکده انتخاب کنید.
                        </div>
                      )}
                    </div>
                  </div>
                  {/* PLACEHOLDER_RIGHT */}
                  <div className="flex flex-col gap-3 rounded-lg bg-primary/50 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">دروس انتخاب‌شده</span>
                      <span className="text-grey-200">
                        {convertEnglishNumberToPersian(
                          requirements.length.toString(),
                        )}{" "}
                        درس
                      </span>
                    </div>

                    <div className="h-40 space-y-2 overflow-auto pe-1">
                      {requirements.length === 0 ? (
                        <div className="pt-6 text-center text-sm text-grey-200">
                          هنوز درسی انتخاب نشده است.
                        </div>
                      ) : (
                        requirements.map((req) => (
                          <div
                            key={req.courseCode}
                            className="flex items-center justify-between rounded bg-primary-dark/60 px-2 py-1 text-sm"
                          >
                            <span className="line-clamp-1">
                              {req.courseName}
                            </span>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="text-xs text-grey-200">
                                {convertEnglishNumberToPersian(
                                  req.groups.length.toString(),
                                )}{" "}
                                گروه
                              </span>
                              <button
                                aria-label="حذف درس"
                                onClick={() => removeRequirement(req.courseCode)}
                                className="text-grey-200 transition-colors hover:text-error-500"
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-grey-200">
                      <input
                        type="checkbox"
                        checked={checkExam}
                        onChange={toggleCheckExam}
                        className="accent-secondary"
                      />
                      جلوگیری از تداخل تاریخ امتحان‌ها
                    </label>

                    <BBtn
                      color="secondary"
                      preIcon={faWandMagicSparkles}
                      className="h-10"
                      disabled={requirements.length === 0}
                      onClick={handleGenerate}
                    >
                      ساخت برنامه‌ها
                    </BBtn>

                    {/* PLACEHOLDER_RESULTS */}
                    {results && results.length > 0 && currentCombo && (
                      <div className="mt-1 rounded-lg border border-white/10 bg-primary-dark/60 p-2">
                        <div className="flex items-center justify-between">
                          <button
                            aria-label="قبلی"
                            onClick={goPrev}
                            className="grid h-7 w-7 place-items-center rounded hover:bg-white/10"
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                          <span className="text-xs text-grey-200">
                            برنامه{" "}
                            {convertEnglishNumberToPersian(
                              (resultIndex + 1).toString(),
                            )}{" "}
                            از{" "}
                            {convertEnglishNumberToPersian(
                              results.length.toString(),
                            )}
                            {results.length >= 200 && "+"}
                            {" — "}
                            {convertEnglishNumberToPersian(
                              comboUnitCount.toString(),
                            )}{" "}
                            واحد
                          </span>
                          <button
                            aria-label="بعدی"
                            onClick={goNext}
                            className="grid h-7 w-7 place-items-center rounded hover:bg-white/10"
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                        </div>

                        <div className="mt-2 max-h-40 space-y-1 overflow-auto">
                          {currentCombo.map((course) => (
                            <div
                              key={course.id}
                              className="rounded bg-primary/40 px-2 py-1 text-xs"
                            >
                              <div className="flex justify-between font-medium">
                                <span className="line-clamp-1">
                                  {course.courseName}
                                </span>
                                <span className="ms-2 shrink-0 opacity-70">
                                  {course.courseCode}-{course.group}
                                </span>
                              </div>
                              <div className="text-grey-200">
                                {formatSessions(course) || "بدون جلسه"}
                              </div>
                            </div>
                          ))}
                        </div>

                        <BBtn
                          color="success"
                          className="mt-2 h-9 w-full"
                          onClick={handleApply}
                        >
                          اعمال روی برنامه فعلی
                        </BBtn>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
