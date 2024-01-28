import Container from "../app/layout/Container";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/pages/layout";
import Image from "next/image";
import Card from "@/app/components/Card";
import { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fetchCypherpunks, fetchTools } from "@/app/lib/contentful";
import Carousel from "@/app/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useTab } from "@/app/lib/TabContext";
import PrivacyToolsSection from "@/app/sections/PrivacyToolsSection";
import Quote from "@/app/components/Quote";

interface PageProps {
  cypherpunks: any[];
  tools: any[];
}

const slides = [
  <Card
    title="Title"
    imageUrl="/public/img.webp"
    subtitle="Subtitle"
    category="Category"
    linkHref="link"
    text="text"
    linkText="link"
  ></Card>,
  <Card
    title="Title"
    imageUrl="/public/img.webp"
    subtitle="Subtitle"
    category="Category"
    linkHref="link"
    text="text"
    linkText="link"
  ></Card>,
];

const IndexPage: React.FC<PageProps> = ({ cypherpunks, tools }) => {
  const { activeTab } = useTab();

  // const handleTabChange = (newTab: string) => {
  //   setActiveTab(newTab);
  //   console.log("Active tab is now:", newTab);
  // };

  const HeroSection = () => (
    <Container>
      <div className="flex flex-col w-full">
        <div className="flex flex-col min-h-full mt-[110px]">
          <h1 className="text-9xl font-black uppercase">
            Home Section <br />
            <span className="font-thin text-6xl">the Cypherpunk Library</span>
          </h1>
        </div>
        {/* <div className="flex">
          <div className="flex flex-[0.5] sm:scale-50 lg:scale-75 xl:scale-100">
            <Quote />
          </div>
          <div className="flex flex-[0.5]">Other Content</div>
        </div> */}

        <div className="text-center my-60">
          <h1 className="font-instrument text-7xl font-black mb-24">
            CYPHERPUNK <br /> MANIFESTO
          </h1>
          <h4 className="tracking-mega-wide leading-tall">
            PRIVACY <br /> IS <br /> NECESSARY
          </h4>
        </div>
      </div>
    </Container>
  );

  const CypherpunkSection = () => (
    <Container>
      <div className="flex flex-col min-h-full mt-[110px]">
        <h1 className="text-9xl font-black uppercase">Cypherpunk Museum</h1>
      </div>
    </Container>
  );

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
            </motion.div>
          )}

          {activeTab === "privacy-tools" && (
            <motion.div
              key="privacy-tools"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PrivacyToolsSection tools={tools} />
            </motion.div>
          )}

          {activeTab === "cypherpunks" && (
            <motion.div
              key="cypherpunks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CypherpunkSection />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const profiles = await fetchCypherpunks();
  const tools = await fetchTools();

  return { props: { cypherpunks: profiles, tools: tools } };
};
