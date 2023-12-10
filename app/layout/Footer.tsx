import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="flex flex-col justify-between items-center pt-52 pb-12 w-full">
      <div className="w-full mb-8">
        <motion.div className="font-light text-neutral-300 md:w-3/4 sm:w-full mb-4 md:mb-0">
          Site designed in{" "}
          <a
            className="text-blue-500"
            href="https://www.figma.com"
            target="_blank"
          >
            Figma
          </a>
          . Built with{" "}
          <a
            className="text-blue-500"
            href="https://nextjs.org/"
            target="_blank"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500"
            href="https://tailwindcss.com/"
            target="_blank"
          >
            Tailwind CSS.{" "}
          </a>
          Deployed with{" "}
          <a
            className="text-blue-500"
            href="https://vercel.com/"
            target="_blank"
          >
            Vercel.{" "}
          </a>
          Content from{" "}
          <a
            className="text-blue-500"
            href="https://www.contentful.com/"
            target="_blank"
          >
            Contentful
          </a>
          .
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full text-neutral-400">
        <div className="flex gap-6 underline mb-4 md:mb-0">
          <a
            href=""
            target="_blank"
            className="hover:text-white transition ease-in-out"
          >
            Link
          </a>
          <a
            href=""
            target="_blank"
            className="hover:text-white transition ease-in-out"
          >
            Link
          </a>
          <a
            href=""
            target="_blank"
            className="whitespace-nowrap hover:text-white transition ease-in-out"
          >
            Link
          </a>
        </div>
        <p>© {currentDate}</p>
      </div>
    </footer>
  );
};

export default Footer;
