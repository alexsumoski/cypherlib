import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { paragraphs } from "../data/paragraphs";

const ParagraphsNavigator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // 1 for next, -1 for back

  const nextParagraph = (): void => {
    if (currentIndex < paragraphs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDirection(1);
    }
  };

  const prevParagraph = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDirection(-1);
    }
  };

  const isLastParagraph = currentIndex === paragraphs.length - 1;

  return (
    <div className="w-full flex flex-col mx-auto overflow-visible">
      <div className="relative">
        <div className="flex gap-6 absolute right-0 -top-28 z-20">
          <motion.button
            initial={false}
            animate={{
              opacity: currentIndex > 0 ? 1 : 0,
              pointerEvents: currentIndex > 0 ? "auto" : "none",
            }}
            transition={{ duration: 0.5 }}
            onClick={prevParagraph}
            className="px-4 py-2 bg-transparent border-[1px] border-white text-white hover:bg-white hover:text-black transition ease-in-out duration-300"
            disabled={currentIndex <= 0}
          >
            Back
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              opacity: !isLastParagraph ? 1 : 0,
              pointerEvents: !isLastParagraph ? "auto" : "none",
            }}
            transition={{ duration: 0.5 }}
            onClick={nextParagraph}
            className="px-4 py-2 bg-transparent border-[1px] border-white text-white hover:bg-white hover:text-black transition ease-in-out duration-300"
            disabled={isLastParagraph}
          >
            Continue
          </motion.button>
        </div>
        <AnimatePresence custom={direction} mode="wait">
          <motion.p
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction === -1 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -50 : 50 }}
            transition={{ duration: 0.5 }}
            className="mt-20 md:mt-10 leading-loose"
          >
            {paragraphs[currentIndex]}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence>
          {isLastParagraph && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="font-thin text-2xl mt-8"
            >
              Eric Hughes &lt;hughes@soda.berkeley.edu&gt; 9 March 1993
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ParagraphsNavigator;
