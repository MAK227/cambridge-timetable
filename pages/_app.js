import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <NextNProgress color="#00ff85" />
      <div className="min-h-screen w-screen overflow-x-hidden bg-dark font-poppins text-white">
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
}

export default MyApp;
