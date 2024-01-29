import React from "react";
import "../styles/Glitch.scss";
const GlitchEffect: React.FC = () => {
  return (
    <div className="container">
      <div className="glitch" data-text="CYPHERLIB">
        CYPHERLIB
      </div>
      <div className="glow">CYPHERLIB</div>
      <p className="subtitle">THE CYPHERPUNK LIBRARY</p>
      <div className="scanlines"></div>
    </div>
  );
};

export default GlitchEffect;
