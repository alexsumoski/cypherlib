import { fetchToolBySlug, fetchTools } from "@/app/lib/contentful";
import { motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100%", // Start from the right
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: "-100%", // Exit to the left
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const ToolDetailPage: React.FC<any> = ({ tool }) => {
  if (!tool) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>{tool.fields.name}</h1>
      {/* Render more details of the tool */}
    </motion.div>
  );
};

export default ToolDetailPage;

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const tools = await fetchTools();

  const paths = tools
    .filter((tool) => typeof tool.fields.slug === "string")
    .map((tool) => ({
      params: { slug: tool.fields.slug },
    }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const toolData = await fetchToolBySlug(slug);

  // Check if the tool data exists
  if (!toolData || toolData.items.length === 0) {
    return { notFound: true };
  }

  const tool = toolData.items[0];

  return { props: { tool } };
};
