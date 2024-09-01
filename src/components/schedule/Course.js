const Course = ({ course }) => {
  return (
    <div className="flex h-full w-full !cursor-pointer items-center justify-center rounded-lg border-[1px] border-primary-lighter bg-tertiary-dark text-primary-darker">
      <div className="my-auto w-full p-1 text-center">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          {course.courseCode}-{course.group}
        </div>
        <div className="my-0.5 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
          {course.courseName}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          {course.presentedBy}
        </div>
      </div>
    </div>
  );
};

export default Course;
