import { useState, useEffect } from "react";
import CollegeCombobox from "@/components/schedule/CollegeCombobox";
import BInput from "@/components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/Loading";
import messages from "@/constants/messages";
import { useToast } from "@/components/dls/toast/ToastService";
import { courseMapper } from "@/utils/mappers";
import { api } from "@/utils/api";

export default function CourseSelector({
  colleges,
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
  const [courses, setCourses] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

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
      setCourses(mappedCourses);
    }
  }, [fetchedCourses]);

  const addCourseMutation = api.schedule.addCourse.useMutation();

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter(
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

  return (
    <div className="hidden min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur md:block">
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
              className="flex cursor-pointer items-center justify-between rounded bg-grey-300/60 px-2 py-1 text-primary-darker transition-all hover:bg-grey-300"
              onMouseEnter={() => addCourseAsHover(course)}
              onMouseLeave={() => removeCourse(course)}
              onClick={() => handleAddCourseToSchedule(course)}
            >
              <span>{course.courseName}</span>
              <span>{course.group}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
