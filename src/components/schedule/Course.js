import { cn } from "@/utils/helpers";

const Course = ({ course, ...props }) => {
  const mode = course.mode || "default";
  if (!["default", "hover", "both"].includes(mode)) {
    throw new Error("The mode should be default, hover or both.");
  }

  const wrapperClasses = cn(
    "flex h-full rounded-lg w-full flex-col items-center justify-center !cursor-pointer border-primary-lighter border-[1px] text-primary-darker",
    "gap-1  py-2",
    mode === "hover" && "bg-grey-300",
    mode === "both" && "bg-secondary-dark",
    mode === "default" && "bg-tertiary-dark",
    props.className,
  );

  return (
    <div className={wrapperClasses}>
      <div className="my-auto w-full p-1 text-center">
        <div className="min-h-5 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          {course.courseCode}-{course.group}
        </div>
        <div className="my-0.5 min-h-5 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {course.courseName}
        </div>
        <div className="min-h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {course.presentedBy}
        </div>
      </div>
    </div>
  );
};

export default Course;
