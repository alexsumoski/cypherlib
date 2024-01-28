"use client";
import "../app/globals.css";
import React from "react";
import Header from "../app/layout/Header";
import Footer from "../app/layout/Footer";
import Head from "next/head";
import BG from "@/app/components/Spline";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div>
      <Head>
        <title>{title || "Cypherlib"}</title>
        <meta
          name="description"
          content={
            description ||
            "The Cypherpunk Library, privacy tools & a dedication to those who fought for internet privacy through the ages."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <div className="absolute w-[120%] h-full scale-115 -left-48 top-[30%]">
        <div className="relative fade-bottom -z-10 w-full">
          {/* <WebGLBackground /> */}
          {/* <BG /> */}
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
