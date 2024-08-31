import { useEffect, useMemo, useState } from "react";
import CollegeCombobox from "@/components/schedule/CollegeCombobox";
import BInput from "@/components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";
import { courseMapper } from "@/utils/mappers";
import { api } from "@/utils/api";
import Tooltip from "@/components/dls/Tooltip";
import { useAtomValue } from "jotai";
import { currentScheduleIdAtom, schedulesAtom } from "@/atoms";
import { useImmerAtom } from "jotai-immer";
import TooltipContent from "@/components/schedule/TooltipContent.js";

export default function CourseSelector({ colleges, mode = "search" }) {
  if (!["search", "filter"].includes(mode)) {
    throw new Error("The mode should be either search or filter.");
  }

  const [schedules, setSchedules] = useImmerAtom(schedulesAtom);
  const currentScheduleId = useAtomValue(currentScheduleIdAtom);
  const [query, setQuery] = useState("");
  const [coursesOfColleges, setCoursesOfColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(<></>);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  const courses = useMemo(() => {
    const schedule = schedules.find((s) => s.id === currentScheduleId);
    return schedule ? schedule.courses : [];
  }, [schedules, currentScheduleId]);

  const totalCreditSum = courses
    .filter((c) => !c.mode)
    .reduce((sum, { unitCount }) => sum + Number(unitCount), 0);

  const {
    data: fetchedCourses,
    isLoading,
    error,
  } = api.college.getCoursesOfDepartment.useQuery(
    { departmentCode: selectedCollege?.code },
    { enabled: !!selectedCollege },
  );

  useEffect(() => {
    if (fetchedCourses) {
      const mappedCourses = fetchedCourses.map(courseMapper);
      const sortedCourses = mappedCourses.sort((a, b) => {
        const gradeOrder = { bs: 0, ms: 1, phd: 2 };
        const gradeComparison = gradeOrder[a.grade] - gradeOrder[b.grade];
        if (gradeComparison !== 0) return gradeComparison;
        if (a.courseCode === b.courseCode) return a.group - b.group;
        return a.courseCode.localeCompare(b.courseCode);
      });
      setCoursesOfColleges(sortedCourses);
    }
  }, [fetchedCourses]);

  const filteredCourses =
    query === ""
      ? coursesOfColleges
      : coursesOfColleges.filter(
          (course) =>
            course.courseCode.match(query) ||
            course.courseName.match(query) ||
            course.presentedBy.match(query),
        );

  const handleFetchCollegeCourses = async (college) => {
    setSelectedCollege(college);
  };

  const handleAddCourseToSchedule = async (course) => {
    setSchedules((draft) => {
      const schedule = draft.find((s) => s.id === currentScheduleId);
      if (!schedule) return;

      const courseInSchedule = schedule.courses.find((c) => c.id === course.id);
      if (!courseInSchedule || !courseInSchedule.mode) return;

      delete courseInSchedule.mode;
    });
  };

  const addCourseAsHover = (course) => {
    setSchedules((draft) => {
      const schedule = draft.find((s) => s.id === currentScheduleId);
      if (!schedule || schedule.courses.some((c) => c.id === course.id)) return;

      schedule.courses.push({ ...course, mode: "hover" });
    });
  };

  const removeCourse = (course) => {
    setSchedules((draft) => {
      const schedule = draft.find((s) => s.id === currentScheduleId);
      if (!schedule) return;
      const courseInSchedule = schedule.courses.find((c) => c.id === course.id);
      if (courseInSchedule.mode !== "hover") return;

      schedule.courses = schedule.courses.filter((c) => c.id !== course.id);
    });
  };

  const handleMouseEnter = (course, event) => {
    addCourseAsHover(course);
    const { top, width } = event.currentTarget.getBoundingClientRect();
    setTooltipContent(<TooltipContent course={course} />);
    setTooltipPosition({
      top: top - 120,
      left: width + 40,
    });
  };

  const handleMouseLeave = (course) => {
    removeCourse(course);
    setTooltipContent(<></>);
    setTooltipPosition(null);
  };

  return (
    <div className="hidden min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur md:block">
      <div className="flex items-center justify-between px-1 text-sm">
        <span>تعداد واحدهای انتخاب شده</span>
        <span>{totalCreditSum}</span>
      </div>
      <CollegeCombobox
        colleges={colleges}
        selectedCollege={selectedCollege}
        onSelect={(college) => handleFetchCollegeCourses(college)}
      />
      <BInput
        value={query}
        icon={faSearch}
        placeholder="درس مورد نظر را جستجو کنید."
        dir="rtl"
        wrapperClass="shadow-md"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-[38.5rem] space-y-2 overflow-auto">
        {isLoading ? (
          <Loading />
        ) : (
          filteredCourses.map((course, i) => (
            <div
              key={i}
              className="relative flex cursor-pointer select-none items-center justify-between rounded bg-grey-300/60 px-2 py-1 text-primary-darker transition-all hover:bg-grey-300"
              onMouseEnter={(event) => handleMouseEnter(course, event)}
              onMouseLeave={() => handleMouseLeave(course)}
              onClick={() => handleAddCourseToSchedule(course)}
            >
              <span>{course.courseName}</span>
              <span>{course.group}</span>
            </div>
          ))
        )}
      </div>

      <Tooltip content={tooltipContent} position={tooltipPosition} />
    </div>
  );
}
