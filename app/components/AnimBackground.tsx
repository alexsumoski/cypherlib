import React, { useEffect } from "react";
import useMouseMovement from "../hooks/useMouseMovement";

const AnimatedBackground: React.FC = () => {
  const { lastX, lastY } = useMouseMovement();

  return <div className="container animatedBackground"></div>;
};

export default AnimatedBackground;
