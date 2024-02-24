"use client";
import Container from "../app/layout/Container";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/pages/layout";
import Image from "next/image";
import Card from "@/app/components/Card";
import { useEffect, useRef, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  fetchCypherpunks,
  fetchGuides,
  fetchTools,
} from "@/app/lib/contentful";
import { motion, AnimatePresence } from "framer-motion";
import { useTab } from "@/app/lib/TabContext";
import PrivacyToolsSection from "@/app/sections/PrivacyToolsSection";
import Hero from "@/app/components/Hero";
import Carousel from "@/app/components/DraggableCarousel";
import ThreeCanvas from "@/app/components/Plane";
import ParagraphsNavigator from "@/app/components/ParagraphNavigator";
import { script } from "@/app/data/script";
import LocationDisplay from "@/app/components/Location";

interface PageProps {
  cypherpunks: any[];
  tools: any[];
  guides: any[];
}

const IndexPage: React.FC<PageProps> = ({ cypherpunks, tools, guides }) => {
  const { activeTab } = useTab();

  const HomeSection = () => (
    <Container>
      <div className="flex flex-col w-full mt-[8%]">
        {/* <p className="text-white font-thin text-lg opacity-15">{script}</p> */}
        <div className="h-[400px] opacity-0">
          <ThreeCanvas />
        </div>
        <div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-8xl font-thin"
          >
            CYPHERLIB
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-2xl md:text-4xl ps-2 pt-3 font-thin"
          >
            The Cypherpunk Library
          </motion.p>
        </div>
        <div className="flex flex-col min-h-full mt-[110px]"></div>
        <div className="text-left my-60">
          <motion.h2
            initial={{ x: -25, y: 15, opacity: 0.2 }}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl mb-16 md:text-8xl"
          >
            THE <br /> CYPHERPUNK <br /> MANIFESTO
          </motion.h2>
          <div className="flex flex-col ms-auto w-full md:w-3/4 ">
            <div className="relative overflow-visible transition-all duration-500 ease-in-out">
              <motion.h3
                initial={{ x: 50, opacity: 0.2 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3 }}
                className="text-right leading-tall absolute tracking-ultra-wide text-sm md:text-md md:tracking-mega-wide"
              >
                PRIVACY IS NECESSARY
              </motion.h3>
              <ParagraphsNavigator />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );

  const CypherpunkSection = () => (
    <Container>
      <div className="flex relative h-[100vh]">
        <p className="absolute top-[40%] w-full text-center text-2xl uppercase">
          coming soon
        </p>
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
              <HomeSection />
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
              <PrivacyToolsSection tools={tools} guides={guides} />
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
  // const profiles = await fetchCypherpunks();
  const tools = await fetchTools();
  const guides = await fetchGuides();

  return { props: { tools: tools, guides: guides } };
};
