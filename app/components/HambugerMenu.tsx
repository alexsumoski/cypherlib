import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const lineVariants = {
    open: { rotate: 45, translateY: 8 },
    closed: { rotate: 0, translateY: 0 },
  };

  const midLineVariants = {
    open: { opacity: 1, rotate: -45, translateY: -0 },
    closed: { opacity: 1 },
  };

  const bottomLineVariants = {
    open: { opacity: 0 },
    closed: { rotate: 0, translateY: 0 },
  };

  return (
    <button
      className="flex flex-col space-y-1 justify-center items-end w-10 h-10"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Menu"
    >
      <motion.div
        className="w-7 h-1 bg-white rounded-lg "
        variants={lineVariants}
        animate={isOpen ? "open" : "closed"}
      />
      <motion.div
        className="w-9 h-1 bg-white rounded-lg"
        variants={midLineVariants}
        animate={isOpen ? "open" : "closed"}
      />
      <motion.div
        className="w-5 h-1 bg-white rounded-lg"
        variants={bottomLineVariants}
        animate={isOpen ? "open" : "closed"}
      />
    </button>
  );
};

export default HamburgerMenu;
