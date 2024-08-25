import { useEffect, useState } from "react";
import CollegeCombobox from "@/components/schedule/CollegeCombobox";
import BInput from "@/components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";
import messages from "@/constants/messages";
import { useToast } from "@/components/dls/toast/ToastService";
import { courseMapper } from "@/utils/mappers";
import { api } from "@/utils/api";
import Tooltip from "@/components/dls/Tooltip";

export default function CourseSelector({
  colleges,
  courses,
  mode = "search",
  setCoursesOfSchedule,
  currentScheduleId,
  setSchedules,
}) {
  if (!["search", "filter"].includes(mode)) {
    throw new Error("The mode should be either search or filter.");
  }

  const toast = useToast();
  const [query, setQuery] = useState("");
  const [coursesOfColleges, setCoursesOfColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(<></>);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  const totalCreditSum = courses.reduce(
    (sum, { unitCount }) => sum + Number(unitCount),
    0,
  );

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
      setCoursesOfColleges(mappedCourses);
    }
  }, [fetchedCourses]);

  const addCourseMutation = api.schedule.addCourse.useMutation();

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
    try {
      await addCourseMutation.mutateAsync({
        scheduleId: currentScheduleId,
        courseId: course.id,
      });
      addCourse(course);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        messages.ERROR_OCCURRED;
      toast.open({ message, type: "error" });
      console.error("Error adding course:", error);
    }
  };

  const addCourse = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id);
      if (!courseInSchedule) return prev;
      delete courseInSchedule.mode;
      return [...prev, { ...courseInSchedule }];
    });
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          return {
            ...schedule,
            courses: [...schedule.courses, course],
          };
        }
        return schedule;
      }),
    );
  };

  const addCourseAsHover = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id);
      if (courseInSchedule) return prev;
      return [...prev, { ...course, mode: "hover" }];
    });
  };

  const removeCourse = (course) => {
    setCoursesOfSchedule((prev) => {
      const courseInSchedule = prev.find((c) => c.id === course.id);
      if (courseInSchedule.mode !== "hover") return prev;
      return prev.filter((c) => c.id !== course.id);
    });
  };

  const handleMouseEnter = (course, event) => {
    addCourseAsHover(course);
    const { top, left, width, height } =
      event.currentTarget.getBoundingClientRect();
    setTooltipContent(
      <>
        <span className="text-sm font-bold">{`${course.courseName} (${course.group}-${course.courseCode})`}</span>
        <br />
        <span>{`استاد: ${course.presentedBy}`}</span>
        <br />
        <span>{`ظرفیت: ${course.numberOfCapacity}`}</span>
        <br />
        <span>{`تعداد ثبت‌نامی: ${course.numberOfEnrolled}`}</span>
      </>,
    );
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
              className="relative flex cursor-pointer items-center justify-between rounded bg-grey-300/60 px-2 py-1 text-primary-darker transition-all hover:bg-grey-300"
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
