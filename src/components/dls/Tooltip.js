import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const Tooltip = forwardRef(({ content, position, show = true }, ref) => {
  const tooltipRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getBoundingClientRect: () => {
      return tooltipRef.current
        ? tooltipRef.current.getBoundingClientRect()
        : null;
    },
  }));

  useEffect(() => {
    if (tooltipRef.current && position) {
      const { top, left } = position;
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.display = "block";
    } else if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  }, [position]);

  return (
    <div
      ref={tooltipRef}
      className="absolute z-10 hidden w-[240px] rounded bg-black/75 px-4 py-2 text-xs text-white backdrop-blur"
      style={{ pointerEvents: "none", visibility: show ? "visible" : "hidden" }}
    >
      {content}
    </div>
  );
});

export default Tooltip;
