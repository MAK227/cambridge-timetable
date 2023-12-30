import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ZoneMap } from '../../../data/zone_map';


const ExaminationTypeSelectionScreen = ({ zone, clickHandler }) => {
  const router = useRouter();

  const data = ZoneMap[zone];

  const type_dict = { "Cambridge IGCSE": 0, "Cambridge O Level": 0, "Cambridge International A Level": 0, "Cambridge International AS Level": 0 }

  for (var i = 0; i < data.length; i++) {
    if (data[i].type in type_dict) {
      type_dict[data[i].type] += 1
    } else {
      type_dict[data[i].type] = 1
    }
  }


  const isIGSCEButtonDisabled = type_dict["Cambridge IGCSE"] === 0

  const isOLevelButtonDisabled = type_dict["Cambridge O Level"] === 0

  const isALevelButtonDisabled = type_dict["Cambridge International A Level"] === 0 && type_dict["Cambridge International AS Level"] === 0


  return (
    <div className="h-auto w-screen">
      <div className="flex w-full flex-row p-4">
        <button
          className="z-50 bg-dark text-6xl text-white transition-all duration-300 hover:text-primary"
          onClick={() => router.push("/")}
        >
          <IoMdArrowRoundBack />
        </button>
        <motion.div
          className="absolute right-4 z-30 flex justify-center"
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
            transition: {
              duration: 0.6,
              type: "spring",
            },
          }}
        >
          <button className="rounded-2xl bg-primary px-4 py-3 text-2xl font-[600] text-dark">
            Zone-{zone}
          </button>
        </motion.div>
      </div>

      {/** Absolute Positioned Main Div */}
      <div className="-mt-24 flex h-screen w-full flex-col items-center justify-center px-8 text-center">
        {/** Responsive Buttons Grid */}
        <motion.div className=" my-8 grid grid-cols-1 gap-y-6 text-xl sm:mx-16 sm:text-2xl lg:my-16 lg:mx-6 lg:gap-x-4 lg:text-3xl xl:grid-cols-3">
          {/** Main Heading */}
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
            className="col-span-1 text-2xl font-[600] text-white sm:text-3xl lg:text-5xl xl:col-span-3"
          >
            Select Your Examination Type
          </motion.h1>
          {/** IGCSE Button */}

          <motion.div
            initial={{
              rotate: -5,
            }}
            animate={{
              rotate: 0,
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="flex justify-center"
            layoutId="igcse"
          >

            <motion.button
              layoutId="igcse-button"
              className={`w-full rounded-2xl px-14 py-3 font-[600] text-dark transition-all duration-300 ${isIGSCEButtonDisabled ? 'bg-green-200 cursor-not-allowed opacity-50' : 'bg-primary hover:bg-white'}`}
              onClick={() => !isIGSCEButtonDisabled && clickHandler("igcse")}
              disabled={isIGSCEButtonDisabled}
            >
              {`Cambridge IGCSE${isIGSCEButtonDisabled ? ' (Not Offered)' : ''}`}
            </motion.button>
          </motion.div>

          {/** O-Level Button */}
          <motion.div
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
            className="flex justify-center"
            layoutId="olevel"
          >
            <motion.button
              layoutId="olevel-button"
              className={`w-full rounded-2xl px-12 py-3 font-[600] text-dark transition-all duration-300 ${isOLevelButtonDisabled ? 'bg-green-200 cursor-not-allowed opacity-50' : 'bg-primary hover:bg-white'}`}
              onClick={() => clickHandler("olevel")}
              disabled={isOLevelButtonDisabled}
            >
              {`Cambridge O-Level${isOLevelButtonDisabled ? ' (Not Offered)' : ''}`}
            </motion.button>
          </motion.div>

          {/** A-Level Button */}
          <motion.div
            className="flex justify-center"
            layoutId="alevel"
            initial={{
              rotate: 5,
            }}
            animate={{
              rotate: 0,
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
          >
            <motion.button
              layoutId="alevel-button"
              className={`w-full rounded-2xl px-12 py-3 font-[600] text-dark transition-all duration-300 ${isALevelButtonDisabled ? 'bg-green-200 cursor-not-allowed opacity-50' : 'bg-primary hover:bg-white'}`}
              onClick={() => !isALevelButtonDisabled && clickHandler("alevel")}
              disabled={isALevelButtonDisabled}
            >
              {`Cambridge A-Level${isALevelButtonDisabled ? ' (Not Offered)' : ''}`}
            </motion.button>
          </motion.div>
          <motion.div
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
            className="flex justify-center xl:col-span-3"
            layoutId="custom"
          >
            <motion.button
              layoutId="custom-button"
              layout="position"
              className="w-full rounded-2xl bg-primary px-12 py-3 font-[600] text-dark transition-all duration-300 hover:bg-white xl:w-auto"
              onClick={() => clickHandler("custom")}
            >
              Custom (Multiple Exam Types)
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExaminationTypeSelectionScreen;
