import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";

import "../app/globals.css";
import { TabProvider } from "@/app/lib/TabContext";
import SmoothScrollContainer from "@/app/components/SmoothScrollContainer";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // return <Loading />;
  }

  return (
    <TabProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid white",
            padding: "16px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
      {/* <SmoothScrollContainer> */}
      <Component {...pageProps} />
      {/* </SmoothScrollContainer> */}
    </TabProvider>
  );
}

export default MyApp;
