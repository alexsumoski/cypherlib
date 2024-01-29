import React, { CSSProperties, useEffect, useState } from "react";
import "./style.css"; // Make sure the path to your stylesheet is correct

interface ExtendedCSSProperties extends CSSProperties {
  "--posX": string;
  "--posY": string;
}

const SVGFilter: React.FC = () => {
  const texts = ["Why", "is", "this", "so", "satisfying", "to", "watch?"];
  const morphTime = 1; // Duration of the morph
  const cooldownTime = 0.25; // Duration of the cooldown

  const [textIndex, setTextIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [morph, setMorph] = useState(0);
  const [cooldown, setCooldown] = useState(cooldownTime);
  const [style, setStyle] = useState<ExtendedCSSProperties>({
    "--posX": "0px",
    "--posY": "0px",
  });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const {
        top: t,
        left: l,
        width: w,
        height: h,
      } = document.documentElement.getBoundingClientRect();
      setStyle({
        "--posX": `${x - l - w / 2}px`,
        "--posY": `${y - t - h / 2}px`,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    const animate = () => {
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      setTime(newTime);

      if (cooldown > 0) {
        setCooldown((prevCooldown) => Math.max(prevCooldown - dt, 0));
      } else if (morph < 1) {
        setMorph((prevMorph) => Math.min(prevMorph + dt / morphTime, 1));
      } else {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setMorph(0);
        setCooldown(cooldownTime);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [time, cooldown, morph]);

  return (
    <div id="container" style={style}>
      {/* Your SVG filter and other content */}
      <svg id="filters" style={{ display: "none" }}>
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        #container {
          filter: url(#threshold);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        h1 {
          font-size: 5em;
          position: absolute;
          transition: filter 1s, opacity 1s;
          filter: blur(0px);
        }
      `}</style>
    </div>
  );
};

export default SVGFilter;
