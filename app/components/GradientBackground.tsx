// components/GradientBackground.tsx
import React from "react";

const GradientBackground: React.FC = () => {
  return (
    <div className="relative min-h-screen translate-x-[-30%]">
      <div className="gradient purple"></div>
      <div className="gradient orange"></div>
      <div className="gradient yellow"></div>

      <style jsx>{`
        body {
          background-color: #000;
        }
        .gradient {
          position: absolute;
          z-index: -1;
          overflow: hidden;
          border-radius: 50%;
          animation: morph 20s infinite alternate;
        }
        .gradient.purple {
          top: -164px;
          left: calc(50% - 516px);
          width: 526px;
          height: 526px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #dcc1e4 0,
            rgba(220, 193, 228, 0) 100%
          );
        }
        .gradient.orange {
          top: -360px;
          left: calc(50% - 258px);
          width: 800px;
          height: 800px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #e69b6c 0,
            rgba(230, 155, 108, 0) 100%
          );
        }
        .gradient.yellow {
          top: 30px;
          left: calc(50% - 432px);
          width: 588px;
          height: 588px;
          background: radial-gradient(
            50% 50% at 50% 50%,
            #f4ce94 0,
            rgba(244, 206, 148, 0) 100%
          );
        }
        .headline {
          font-family: arial;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10em;
        }
        .headline h3 {
          max-width: 500px;
          text-align: center;
        }
        .headline button {
          background-color: black;
          padding: 15px 20px;
          color: white;
          border: none;
        }
        .headline button:hover {
          opacity: 0.5;
          cursor: pointer;
        }
        @keyframes morph {
          0%,
          100% {
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
          }
          25% {
            border-radius: 58% 42% 51% 49% / 48% 55% 45% 52%;
          }
          50% {
            border-radius: 67% 33% 55% 45% / 51% 50% 50% 49%;
          }
          75% {
            border-radius: 59% 41% 60% 40% / 49% 60% 40% 51%;
          }
        }
        @media only screen and (max-width: 600px) {
          .headline h3 {
            font-size: 16px;
            padding: 0px 30px;
          }
          .headline h1 {
            font-size: 35px;
            padding: 0px 30px;
          }
          .headline button {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default GradientBackground;
