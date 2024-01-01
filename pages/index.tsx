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
import Image from 'next/image';

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
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@200;300;400&display=swap" rel="stylesheet" />
        <link rel="icon" href="../favicon.svg" />
      </Head>
      <Layout>
        <div className="relative h-[100vh] top-0">
          <div className="background-image">
            <Image src="/bg.jpeg" alt="Background" layout="fill" objectFit="cover" />
          </div>

          <div className="headings-image">
            <Image src="/text.svg" alt="Heading" layout="fill" objectFit="contain" />
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
