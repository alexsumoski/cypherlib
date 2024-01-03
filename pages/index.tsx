import Container from "../app/layout/Container";
import { GetStaticProps } from "next";
import Layout from "@/pages/layout";
import { motion } from "framer-motion";
import Head from "next/head";
import { getCypherpunks } from "@/app/lib/contentful";
import DonationCard from "@/app/components/DonationCard";
import Image from "next/image";
import WebGLBackground from "@/app/components/WebGLBackground";
import Card from "@/app/components/Card";

interface PageProps {
  cypherpunks: any[];
}

const IndexPage: React.FC<PageProps> = ({ cypherpunks }) => {
  return (
    <>
      <div className="absolute">
        <div className="relative opacity-40 fade-bottom">
          <WebGLBackground />
        </div>
      </div>

      <Layout>
        {/* HERO SECTION */}
        <div className="headings-image">
          <Image
            src="/text.svg"
            alt="Heading"
            layout="fill"
            objectFit="contain"
            className="xl:px-20 md:px-8 sm:px-2 px-4 py-6"
          />
        </div>

        {/* CARDS SECTION */}
        <Container>
          <motion.div
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 my-80"
          >
            <div className="md:col-span-1">
              {/* <Card
                title="Privacy Tools"
                tooltipText="Privacy Tools"
                description="Description"
              >
                Children content
              </Card> */}
            </div>

            <div className="md:col-span-1">
              {/* <Card
                title="Cypherpunk Museum"
                tooltipText="Privacy Tools"
                description="Description"
              >
                Children content
              </Card> */}
            </div>
          </motion.div>
        </Container>

        <Container>
          <div className="text-center">
            <h1 className="font-instrument text-7xl font-black mb-24">
              CYPHERPUNK <br /> MANIFESTO
            </h1>
            <h4 className="tracking-mega-wide leading-tall">
              PRIVACY <br /> IS <br /> NECESSARY
            </h4>
          </div>
        </Container>

        <Container>
          <div className="relative h-[1000px] flex justify-center items-center">
            <Image
              src="/crt.png"
              alt="Heading"
              layout="fill"
              objectFit="contain"
              className="z-0"
            />
            {/* <div className="z-10">
              <h5 style={{ fontFamily: "Times New Roman, Times, serif" }}>
                Enter password:
              </h5>
              <input type="password" className="w-full" />
            </div> */}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const cypherpunks = await getCypherpunks();
  return { props: { cypherpunks } };
};
