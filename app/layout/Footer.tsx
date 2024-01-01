import React from "react";
import { motion } from "framer-motion";
import DonationCard from "../components/DonationCard";

const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="flex flex-row justify-between items-center pt-52 pb-12 w-full">
        <DonationCard />
        <p className="text-gray-500">Cypherlib © {currentDate}</p>
    </footer>
  );
};

export default Footer;
