import React from "react";
import { FiInfo } from "react-icons/fi";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  tooltipText: string;
  gradientFrom?: string;
  gradientTo?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tooltipText,
  gradientFrom,
  gradientTo,
  children,
}) => {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`h-[24rem] relative overflow-hidden border-[1px] border-neutral-500 bg-opacity-60 rounded-3xl transition ease-in-out duration-500 hover:border-neutral-400 hover:brightness-110 group`}
        style={{ backdropFilter: 'blur(3px)' }}
      >
        <div className="p-8">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          <p className="text-neutral-200 my-2">{description}</p>
        </div>
        <FiInfo
          size={24}
          className="absolute top-[1rem] right-[1rem] mt-4 mr-4 text-4xl text-white opacity-50 group-hover:opacity-100 transition-all ease-in-out duration-300 transform group-hover:-translate-y-2"
        />
        {children}
      </motion.div>
  );
};

export default Card;