import CountrySelector from "@/components/Home/CountrySelector";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const SearchPage = () => {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [timetableData, _] = useLocalStorage("timetable", {});

  const router = useRouter();

  useEffect(() => {
    // redirect to the timetable page if the user already has a timetable
    if (timetableData.selectedSubs !== undefined) {
      router.push("/timetable");
    }
  }, [timetableData]);

  return (
    <>
      <Head>
        <title>CAIE Timetable</title>
        <meta name="description" content="CAIE Timetable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon-16x16.png" />
      </Head>
      <div className="flex w-screen flex-col items-center justify-center py-8 text-center md:min-h-screen lg:text-5xl">
        <div className="flex w-full flex-row items-center justify-between px-4 md:absolute md:top-8 md:px-24">
          <Link href={"/"} className="text-6xl">
            🗓️ <span className="hidden text-xl md:block">CAIE Timetable</span>
          </Link>
        </div>
        <div className="mt-28 flex w-full flex-col gap-8 md:-mt-28">
          <motion.h1
            initial={{
              y: 100,
            }}
            animate={{
              y: 0,
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="z-50 text-2xl font-[600] text-white sm:text-3xl lg:text-5xl"
          >
            Select Your Country
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: 1,
              width: "100%",
              transition: {
                duration: 0.5,
                type: "spring",
              },
            }}
          >
            <CountrySelector
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
