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
        <div className="relative opacity-70 fade-bottom">
          <WebGLBackground />
        </div>
      </div>

      <Layout>
        <div className="h-[100vh] flex justify-center top-0">
          {/* <div className="background-image">
            <Image
              src="/bg.jpeg"
              alt="Background"
              layout="fill"
              objectFit="cover"
            />
          </div> */}

          <div className="headings-image">
            <Image
              src="/text.svg"
              alt="Heading"
              layout="fill"
              objectFit="contain"
              className="xl:px-20 md:px-8 sm:px-2 px-4 py-6"
            />
          </div>

          {/* Uncomment and adjust your headings and other content as needed */}
          {/* <h1 className="mt-[98px] font-instrument text-[190px] font-black max-h-[190px]">CYPHERLIB</h1>
          <span className="tracking-ultra-wide text-gray-500 text-lg">THE CYPHERPUNK LIBRARY</span> */}
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
