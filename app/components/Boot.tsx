import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const maxCharacters = 24;
const unloadedCharacter = ".";
const loadedCharacter = "#";
const spinnerFrames = ["/", "-", "\\", "|"];

const TerminalAnimation: React.FC = () => {
  const [processAmount, setProcessAmount] = useState(0);
  const [loadingValues, setLoadingValues] = useState<string[]>(
    new Array(maxCharacters).fill(unloadedCharacter)
  );
  const [showRebooting, setShowRebooting] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const drawLoadingBar = () => {
      let interval = setInterval(() => {
        setLoadingValues((prevValues) => {
          const index = prevValues.lastIndexOf(unloadedCharacter);
          if (index === -1) {
            clearInterval(interval);
            setShowRebooting(false);
            setTimeout(() => setGlitchEffect(true), 1000); // Trigger glitch effect after loading
            return prevValues;
          }
          const newValues = [...prevValues];
          newValues[index] = loadedCharacter;
          const loaded = newValues.filter(
            (val) => val === loadedCharacter
          ).length;
          setProcessAmount(Math.floor((loaded / maxCharacters) * 100));
          return newValues;
        });
      }, 100);
    };

    drawLoadingBar();
  }, []);

  // Simulate the glitch effect
  useEffect(() => {
    if (!glitchEffect) return;
    const timeoutId = setTimeout(() => {
      setGlitchEffect(false); // Turn off glitch effect
    }, 2000); // Keep glitch effect for 2 seconds

    return () => clearTimeout(timeoutId);
  }, [glitchEffect]);

  return (
    <div className="terminal-container">
      <AnimatePresence>
        {showRebooting && (
          <motion.div
            className={`terminal terminal-style glitch ${
              glitchEffect ? "glitch-effect" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="scanline"></div>
            <div className="hydra">
              <div className="hydra_rebooting">
                <p>&lt; SYSTEM START &gt;</p>
                <p className="text--sm">CYPHERLIB VER 1.1 SYS BOOTING</p>
                <p className="text--sm">
                  PROCESS: <span>{processAmount}</span>%
                </p>
                <p className="loading-bar">({loadingValues.join("")})</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showRebooting && (
          <motion.div
            className="hydra_reboot_success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-6xl md:text-8xl font-thin"
            >
              CYPHERLIB
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="text-2xl md:text-4xl ps-2 pt-3 font-thin"
            >
              The Cypherpunk Library
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminalAnimation;
