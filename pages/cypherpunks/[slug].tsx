"use client";
import React from "react";
import Image from "next/image";
import Layout from "@/pages/layout";
import Container from "@/app/layout/Container";
import { fetchCypherpunkBySlug, fetchCypherpunks } from "@/app/lib/contentful";
import { GetStaticPaths, GetStaticProps } from "next";
import { FaTwitter, FaLink } from "react-icons/fa";

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

  const getLastName = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : name;
  };

  const lastName = getLastName(name);

  return (
    <Layout>
      <Container>
        {/* Full-width background image with name over it */}
        <div className="relative h-[60vh]">
          <div className="absolute top-0 left-0 h-full w-full">
            {backgroundImage && (
              <Image
                src={`https:${backgroundImage.fields.file.url}`}
                alt="Background"
                layout="fill"
                objectFit="contain"
                className="w-full"
              />
            )}
            <div className="absolute inset-0 flex justify-center items-center">
              <h1 className="text-9xl text-white font-black uppercase tracking-widest">
                {lastName}
              </h1>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="text-white p-4 flex items-center">
          {profileImage && (
            <Image
              src={`https:${profileImage.fields.file.url}`}
              alt={name}
              width={160}
              height={160}
              className="rounded-full border-[1px]"
            />
          )}

          <div className="flex flex-col">
            <h2 className="mt-4 uppercase text-2xl">{name}</h2>

            {/* Social Media Links */}
            <div className="flex mt-2">
              {twitter && (
                <a href={twitter} target="_blank" className="mr-4">
                  <FaTwitter className="w-6 h-6" /> {/* Adjust size here */}
                </a>
              )}
              {website && (
                <a href={website} target="_blank">
                  <FaLink className="w-6 h-6" /> {/* Adjust size here */}
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CypherpunkProfile;

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

  return { props: { cypherpunk } };
};
