import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.to(textRef.current, {
      duration: 0.1,
      skewX: 20,
      ease: "rough({ template: none.out, strength: 1, points: 50, taper: 'none', randomize: true, clamp: false})",
      y: "+=20",
      x: "-=20",
      textShadow: "10px 0px 10px rgba(255,255,255,0.5)",
    }).to(textRef.current, {
      duration: 0.04,
      skewX: 0,
      y: 0,
      x: 0,
      textShadow: "0px 0px 0px rgba(255,255,255,0)"
    });
  }, []);

  return (
    <h1 ref={textRef} className="text-white text-4xl">
      {text}
    </h1>
  );
};

export default GlitchText;
