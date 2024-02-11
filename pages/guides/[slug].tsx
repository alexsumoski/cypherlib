"use client";
import React from "react";
import Image from "next/image";
import Layout from "@/pages/layout";
import Container from "@/app/layout/Container";
import { fetchGuideBySlug, fetchGuides } from "@/app/lib/contentful";
import { GetStaticPaths, GetStaticProps } from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

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

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 style={{ color: "blue", fontSize: "7em" }}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2
          style={{
            color: "white",
            fontSize: "1.5em",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
        >
          {children}
        </h2>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p style={{ color: "white", fontSize: "1em" }}>{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const {
          file: { url, contentType },
        } = node.data.target.fields;
        if (contentType.includes("video")) {
          return <video src={url} controls style={{ maxWidth: "100%" }} />;
        }
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} style={{ color: "lightgreen" }}>
          {children}
        </a>
      ),
    },
  };

  const richTextContent = guide.fields.content
    ? documentToReactComponents(guide.fields.content, options)
    : null;

  return (
    <Layout>
      <Container>
        <div className="flex w-full z-0 mt-[10%]">
          <div className="flex z-10 py-20 w-1/2">
            <h1 className="text-7xl text-white font-black uppercase tracking-widest z-10">
              {title}
            </h1>
          </div>
          <div className="w-1/2 flex">
            <Image
              src={`https:${heroImage.fields.file.url}`}
              alt={title}
              width={heroImage.fields.file.details.image.width}
              height={heroImage.fields.file.details.image.height}
              objectFit="contain"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        <div>
          {" "}
          <div>{richTextContent}</div>
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
