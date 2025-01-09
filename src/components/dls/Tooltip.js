import { useEffect, useRef } from "react";

export default function Tooltip({ content, position }) {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltipRef.current && position) {
      const { top, left } = position;
      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
      tooltipRef.current.style.display = "block";
    } else {
      tooltipRef.current.style.display = "none";
    }
  }, [position]);

  return (
    <div
      ref={tooltipRef}
      className="absolute z-10 hidden w-[240px] rounded bg-black/75 px-4 py-2 text-xs text-white backdrop-blur"
      style={{ pointerEvents: "none" }}
    >
      {content}
    </div>
  );
}
