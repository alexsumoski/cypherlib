import React from "react";
import { motion } from "framer-motion";
import DonationCard from "../components/DonationCard";
import Container from "./Container";
const Footer: React.FC = () => {
  const currentDate = new Date().getFullYear();
  return (
    <Container>
      <DonationCard />
      <p className="text-gray-500">Cypherlib © {currentDate}</p>
    </Container>
  );
};

export default Footer;
