import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

interface TooltipProps {
  tooltipText: string;
  children: React.ReactNode;
  position?: "left" | "right" | "middle";
  darkBackground?: boolean;
  wide?: boolean;
}

const isMobileDevice = () =>
  typeof window.orientation !== "undefined" ||
  navigator.userAgent.indexOf("IEMobile") !== -1;

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  children,
  position = "right",
  darkBackground = false,
  wide = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobile(isMobileDevice());

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showTooltip]);

  const animationProps = useSpring({
    opacity: showTooltip ? 1 : 0,
    transform: showTooltip ? "scale(1)" : "scale(0.9)",
  });

  const handleMouseEnter = () => {
    if (!isMobile) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setShowTooltip(false);
  };

  const handleClick = () => {
    if (isMobile) setShowTooltip(!showTooltip);
  };

  const tooltipClasses = `
    absolute z-10 pointer-events-none 
    ${wide ? "w-[80%] min-w-[300px]" : "w-max"}
    bg-${darkBackground ? "black" : "white"} 
    ${darkBackground ? "text-white" : "text-black"}
    ${
      darkBackground
        ? "border-[1px] border-gray-800"
        : "border-[3px] border-opacity-100"
    }
    rounded px-4 py-3 shadow-2xl shadow-[#000000aa]`;

  const tooltipPositionClasses = {
    left: "top-full right-0 -top-0 md:-top-16",
    right: "top-full left-0 -top-0 md:-top-16",
    middle:
      "top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div className="relative" ref={tooltipRef}>
      <animated.div
        style={animationProps}
        className={`${tooltipClasses} ${tooltipPositionClasses[position]}`}
      >
        {tooltipText}
      </animated.div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
