import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTab } from "../lib/TabContext";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home" },
  { id: "privacy-tools", label: "Privacy Tools" },
  // { id: "cypherpunks", label: "Cypherpunk Museum" },
];

const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent backdrop-blur-sm p-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center xl:px-20 md:px-8 sm:px-2 px-4 py-6 w-full">
        <Link href="/" passHref legacyBehavior>
          <a className="contents" onClick={() => setActiveTab("home")}>
            <motion.div variants={itemVariants}>
              <Image src="/cl-logo.svg" alt="CL Logo" width={50} height={50} />
            </motion.div>
          </a>
        </Link>
        <div className="flex-grow"></div>
        <motion.div className="flex space-x-1" variants={containerVariants}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "hover:text-white/60"
              } relative rounded-full px-5 py-3 text-regular font-lg text-white transition focus-visible:outline-2`}
              style={{ WebkitTapHighlightColor: "transparent" }}
              variants={itemVariants}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
        <div className="flex-grow"></div>
      </div>
    </motion.header>
  );
};

export default Header;
