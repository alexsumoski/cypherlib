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
  { id: "cypherpunks", label: "Cypherpunk Museum" },
];

const Header: React.FC = () => {
  const { activeTab, setActiveTab } = useTab();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-10 bg-transparent backdrop-blur-md p-1">
      <div className="flex justify-between items-center xl:px-20 md:px-8 sm:px-2 px-4 py-6 w-full">
        <Link href="/" passHref legacyBehavior>
          <a className="flex-shrink-0">
            <Image src="/cl-logo.svg" alt="CL Logo" width={50} height={50} />
          </a>
        </Link>
        <div className="flex-grow"></div>
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "hover:text-white/60"
              } relative rounded-full px-5 py-3 text-regular font-lg text-white transition focus-visible:outline-2`}
              style={{ WebkitTapHighlightColor: "transparent" }}
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
            </button>
          ))}
        </div>
        <div className="flex-grow"></div>
      </div>
    </header>
  );
};

export default Header;
