import React, { ReactNode } from "react";
import { useSmoothScrollbar } from "../hooks/useSmoothScrollbar";

interface SmoothScrollContainerProps {
  children: ReactNode;
  damping?: number;
}

const SmoothScrollContainer: React.FC<SmoothScrollContainerProps> = ({
  children,
  damping = 0.07,
}) => {
  const scrollContainerRef = useSmoothScrollbar({
    // @ts-ignore
    options: {
      damping,
    },
  });

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: "100vh", overflow: "hidden" }}
      className="smooth-scroll-container"
    >
      {children}
    </div>
  );
};

export default SmoothScrollContainer;
