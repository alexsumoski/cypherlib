import Container from "../app/layout/Container";
import Section from "@/app/layout/Section";
import { GetStaticProps } from "next";
import Layout from "@/pages/layout";
import { motion } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import { getCypherpunks } from "@/app/lib/contentful";

interface PageProps {
  projects: any[];
  courses: any[];
}

const IndexPage: React.FC<PageProps> = ({ projects, courses }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Cypherlib</title>
        <meta name="description" content="content." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../favicon.svg" />
      </Head>
      <Container>
        <Layout>
          <div className="mt-[98px] grid gap-8">Layout</div>
        </Layout>
      </Container>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const cypherpunks = await getCypherpunks();
  return { props: { cypherpunks } };
};
