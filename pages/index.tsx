import Container from "../app/layout/Container";
import Section from "@/app/layout/Section";
import { GetStaticProps } from "next";
import Layout from "@/pages/layout";
import { motion } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import { getCypherpunks } from "@/app/lib/contentful";
import GlitchText from "@/app/components/GlitchText";
import DonationCard from "@/app/components/DonationCard";
import Image from "next/image";
import WebGLBackground from "@/app/components/WebGLBackground";

interface PageProps {
  cypherpunks: any[];
}

const IndexPage: React.FC<PageProps> = ({ cypherpunks }) => {
  return (
    <>
      <Head>
        <title>Cypherlib</title>
        <meta name="description" content="content." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="../favicon.svg" />
      </Head>
      <div className="absolute">
        <div className="relative opacity-40 fade-bottom">
          <WebGLBackground />
        </div>
      </div>

      <Layout>
        <div className="h-[100vh] flex justify-center">
          <div className="headings-image">
            <Image
              src="/text.svg"
              alt="Heading"
              layout="fill"
              objectFit="contain"
              className="xl:px-20 md:px-8 sm:px-2 px-4 py-6"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const cypherpunks = await getCypherpunks();
  return { props: { cypherpunks } };
};
