import CountrySelector from "@/components/Home/CountrySelector";
import logo from "@/public/logo_light.png";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SearchPage = () => {
  const [selectedCountry, setSelectedCountry] = useState({});

  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <Head>
        <title>Timetable</title>
        <meta name="description" content="Knowfly Timetable" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_light.png" />
      </Head>
      <div className="flex w-screen flex-col items-center justify-center py-8 text-center md:min-h-screen lg:text-5xl">
        <div className="flex w-full flex-row items-center justify-between px-4 md:absolute md:top-8 md:px-24">
          <Link href={"/"}>
            <Image src={logo} className="h-12 w-12" />
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
