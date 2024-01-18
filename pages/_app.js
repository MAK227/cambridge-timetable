import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextNProgress from "nextjs-progressbar";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Fragment>
        <NextNProgress color="#00ff85" />
        <div className="min-h-screen w-screen overflow-x-hidden bg-dark font-poppins text-white">
          <Component {...pageProps} />
        </div>
        <SpeedInsights />
      </Fragment>
      <Analytics />
    </Fragment>
  );
}

export default MyApp;
