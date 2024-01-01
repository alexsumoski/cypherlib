import React from "react";
import Image from "next/image";
import HamburgerMenu from "../components/HambugerMenu";

const Header: React.FC = () => {
  const leftFade = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const rigthFade = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-10 bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-30">
      <div className="flex justify-between items-center xl:px-20 md:px-8 sm:px-2 px-4 py-6 w-full">
        <Image src="/images/cl-logo.svg" alt="CL Logo" width={50} height={50} />
        <span className="tracking-ultra-wide text-gray-500 text-sm">
          THE CYPHERPUNK LIBRARY
        </span>
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
