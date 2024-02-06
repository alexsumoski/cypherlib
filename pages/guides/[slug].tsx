"use client";
import React from "react";
import Image from "next/image";
import Layout from "@/pages/layout";
import Container from "@/app/layout/Container";
import { fetchGuideBySlug, fetchGuides } from "@/app/lib/contentful";
import { GetStaticPaths, GetStaticProps } from "next";

interface GuideDetailsProp {
  guide: {
    fields: {
      title: string;
      heroImage: any;
      content: any;
      slug: string;
    };
  };
}

const GuidePage: React.FC<GuideDetailsProp> = ({ guide }) => {
  if (!guide) {
    return <p>Profile not found</p>;
  }

  const { title, heroImage, content, slug } = guide.fields;

  return (
    <Layout>
      <Container>
        <div className="relative w-full mt-[10%]">
          <Image
            src={`https:${heroImage.fields.file.url}`}
            alt="Background"
            layout="fill"
            objectFit="contain"
            className="w-full absolute top-[20%]"
          />
          <div className="relative h-full w-full">
            <div className=" inset-0 flex justify-center items-center">
              <h1 className="text-7xl text-white font-black uppercase tracking-widest z-10">
                {title}
              </h1>
            </div>
          </div>
        </div>

        <div className="text-white p-4 flex items-center">
          <div className="flex flex-col">
            <h2 className="mt-4 uppercase text-2xl">{title}</h2>

            <div className="flex mt-2"></div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default GuidePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await fetchGuides();
  const paths = profiles.map((project: any) => ({
    params: { slug: project.fields.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const guideData = await fetchGuideBySlug(slug);

  const guide = guideData.items[0];

  return { props: { guide } };
};
