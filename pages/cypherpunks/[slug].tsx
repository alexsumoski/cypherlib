"use client";
import React from "react";
import Image from "next/image";
import Layout from "@/pages/layout";
import Container from "@/app/layout/Container";
import { fetchCypherpunkBySlug, fetchCypherpunks } from "@/app/lib/contentful";
import { GetStaticPaths, GetStaticProps } from "next";

interface CypherpunkDetailsProp {
  cypherpunk: {
    fields: {
      name: string;
      backgroundImage: any;
      profileImage: any;
      twitter: string;
      website: string;
      slug: string;
    };
  };
}

const CypherpunkProfile: React.FC<CypherpunkDetailsProp> = ({ cypherpunk }) => {
  if (!cypherpunk) {
    return <p>Profile not found</p>;
  }

  const { name, backgroundImage, profileImage, twitter, website, slug } =
    cypherpunk.fields;

  return (
    <Layout>
      <Container>
        <div className="w-full">
          {backgroundImage && (
            <Image
              src={`https:${backgroundImage.fields.file.url}`}
              alt="Background"
              layout="fill"
              objectFit="container"
            />
          )}
        </div>

        <div className="text-white p-4">
          {profileImage && (
            <div className="flex-shrink-0">
              <Image
                src={`https:${profileImage.fields.file.url}`}
                alt={name}
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          )}

          <h1>{name}</h1>
          <p>
            Twitter: <a href={twitter}>{twitter}</a>
          </p>
          <p>
            Website: <a href={website}>{website}</a>
          </p>
        </div>
      </Container>
    </Layout>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const profiles = await fetchCypherpunks();
  const paths = profiles.map((project: any) => ({
    params: { slug: project.fields.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const profileData = await fetchCypherpunkBySlug(slug);

  const cypherpunk = profileData.items[0];

  console.log(cypherpunk);

  return { props: { cypherpunk } };
};

export default CypherpunkProfile;
