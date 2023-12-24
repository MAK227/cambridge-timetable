import CountriesToZoneMap from "@/data/countries_to_zone_map.json";
import { Combobox, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";
import { useSessionStorage } from "usehooks-ts";

const CountrySelector = ({ selectedCountry, setSelectedCountry }) => {
  const [query, setQuery] = useState("");
  const [timetableDate, setTimetableData] = useSessionStorage("timetable", {});

  const filteredCountries =
    query === ""
      ? CountriesToZoneMap
      : CountriesToZoneMap.filter((country) => {
          return country.country.toLowerCase().includes(query.toLowerCase());
        }).sort((a, b) => {
          return a.country.length - b.country.length;
        });

  const router = useRouter();

  return (
    <div className="w-full px-4 lg:px-[15%]">
      <Combobox
        value={selectedCountry}
        onChange={(value) => {
          setTimetableData({
            ...timetableDate,
            country: value.country,
            zone: value.zone.slice(-1),
          });
          router.push(`/zone/${value.zone.slice(-1)}`);
        }}
      >
        <div className="relative mt-1 w-full">
          <div className="relative mx-auto flex h-12 w-full items-center overflow-hidden rounded-2xl bg-white focus-within:shadow-lg lg:w-2/3">
            <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pr-2">
              <motion.div
                className="grid h-full w-12 place-items-center text-gray-300"
                layoutId="zone"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </motion.div>
            </Combobox.Button>
            <Combobox.Input
              className="w-full border-none py-2 pl-12 pr-10 text-lg leading-5 text-gray-900 focus:outline-none focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(country) => country.country}
              placeholder="Start typing to search..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <div>
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <div className="mt-4 flex w-full justify-center">
              <Combobox.Options className="text-md absolute mt-1 max-h-96 w-[95%] overflow-auto rounded-2xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:w-[60%] lg:text-lg">
                {filteredCountries.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <Combobox.Option
                      key={country.country}
                      className={({ active }) =>
                        `relative cursor-default select-none py-4 pl-10 pr-4 ${
                          active ? "bg-primary text-dark" : "text-gray-900"
                        }`
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={` block truncate text-left ${
                              selected ? "font-semibold" : "font-medium"
                            }`}
                          >
                            {country.country}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-dark"
                              }`}
                            >
                              <AiOutlineCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </div>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CountrySelector;
