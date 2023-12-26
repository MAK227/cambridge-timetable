import { Dialog, Menu, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import { CgInfo } from "react-icons/cg";
import { HiChevronDown, HiTrash } from "react-icons/hi2";

const Table = ({
  subjects,
  setSubjects,
  editable = true,
  removedSubjects,
  setRemovedSubjects = () => {},
}) => {
  const [subject, setSubject] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const SortByMenu = () => {
    return (
      <div>
        <Menu as="div" className="relative text-left">
          <div>
            <Menu.Button>
              {({ open }) => (
                <div className="inline-flex w-full justify-center rounded-md bg-primary bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <div className="mr-2">Sort By</div>
                  <motion.div
                    animate={{
                      rotate: open ? -180 : 0,
                    }}
                  >
                    <HiChevronDown
                      className="h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-1/2 z-50 mt-2 w-60 -translate-x-1/2 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort by subject code
                        const sortedSubjects = subjects.sort((a, b) => {
                          return a.code.localeCompare(b.code);
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Subject Code
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by duration
                        // duration is a string, so we need to convert it to number'
                        // parse duration from 1h 30m to 90 or 30m to 30
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDuration = a.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          const bDuration = b.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          return aDuration - bDuration;
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Duration (smallest to largest)
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by duration
                        // duration is a string, so we need to convert it to number'
                        // parse duration from 1h 30m to 90 or 30m to 30
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDuration = a.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          const bDuration = b.duration
                            .split(" ")
                            .map((x) => {
                              if (x.includes("h")) {
                                return parseInt(x) * 60;
                              } else {
                                return parseInt(x);
                              }
                            })
                            .reduce((a, b) => a + b);
                          return aDuration - bDuration;
                        });
                        setSubjects([...sortedSubjects.slice().reverse()]);
                      }}
                    >
                      Duration (largest to smallest)
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900`}
                      onClick={() => {
                        // sort subject by date
                        // parse date from Tuesday 25 April 2023 AM to 2023-04-25
                        const sortedSubjects = subjects.sort((a, b) => {
                          const aDate = a.date.split(" ").slice(1, 4).join("-");
                          const bDate = b.date.split(" ").slice(1, 4).join("-");
                          return new Date(aDate) - new Date(bDate);
                        });
                        setSubjects([...sortedSubjects]);
                      }}
                    >
                      Date
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-dark py-6 px-1 text-left align-middle text-white shadow-xl transition-all md:px-4">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col items-center text-lg font-medium leading-6"
                  >
                    <span className="px-4 text-center font-bold">
                      {subject?.subject} - {subject?.code}
                    </span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full px-4 py-8 sm:px-16">
                      <div className="mb-2 text-2xl">Details</div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Subject</div>
                          <div>{subject?.subject}</div>
                        </div>
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Type</div>
                          <div>{subject?.type}</div>
                        </div>
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Code</div>
                          <div>{subject?.code}</div>
                        </div>
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Duration</div>
                          <div>{subject?.duration}</div>
                        </div>
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Date</div>
                          <div>{subject?.date}</div>
                        </div>
                        <div className="flex flex-col space-x-2 md:flex-row">
                          <div className="font-bold">Session</div>
                          <div>{subject?.session}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full items-center justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary/80 px-4 py-2 text-sm font-semibold text-dark hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="relative mx-32 my-12 rounded-2xl shadow-md md:w-auto md:max-w-[95vw]">
        <div className="flex h-auto w-full flex-col items-center justify-between gap-4 p-2 lg:flex-row lg:items-end">
          <div className="max-h-40 flex-1">
            {/* Uncomment later */}
            {/*
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-3525004719017767"
              data-ad-slot="3750156675"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            */}
          </div>
          <SortByMenu />
        </div>

        <div className="max-h-[70vh] overflow-auto rounded-xl md:overflow-x-auto">
          <motion.table
            className="w-[95vw] select-none  text-left text-sm text-gray-400 md:w-full "
            layout
          >
            <motion.thead
              layout
              className="sticky top-0 z-20 bg-gray-700 text-xs uppercase text-gray-400"
            >
              <tr>
                <th scope="col" className="py-3 px-6">
                  Subject Name
                </th>
                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                  Type
                </th>
                <th scope="col" className="px-2 py-3 md:px-6">
                  Code
                </th>
                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                  Duration
                </th>
                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                  Date
                </th>
                <th scope="col" className="hidden px-6 py-3 lg:table-cell">
                  Session
                </th>
                {editable && (
                  <th
                    scope="col"
                    className="bg-gray-700 px-1 py-3 md:sticky md:right-0"
                  >
                    Remove
                  </th>
                )}
              </tr>
            </motion.thead>
            <tbody>
              {subjects.map((subject) => (
                <motion.tr
                  key={subject.code}
                  className="relative border-b border-gray-700 bg-gray-800"
                  layout
                >
                  <th
                    scope="row"
                    className="flex items-center gap-4 px-2 py-4 text-xs font-medium text-white md:whitespace-nowrap md:px-6 md:text-base"
                    onClick={() => {
                      setSubject(subject);
                      setIsOpen(true);
                    }}
                  >
                    <div className="text-lg md:text-2xl lg:hidden">
                      <CgInfo />
                    </div>
                    {subject.subject}
                  </th>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    {subject.type}
                  </td>
                  <td className="px-2 py-4 text-xs md:px-6 md:text-base">
                    {subject.code}
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    {subject.duration}
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    {subject.date}
                  </td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    {subject.session}
                  </td>
                  {editable && (
                    <td className="bg-gray-800 px-1 py-4 md:sticky md:right-0">
                      <button
                        className="mx-4 rounded-full bg-red-500 p-2 font-bold text-white transition-all duration-300 hover:bg-red-400"
                        onClick={() => {
                          // add the removed subject to the removedSubjects array
                          setRemovedSubjects([
                            ...removedSubjects,
                            ...subjects.filter(
                              (arrItem) => arrItem === subject
                            ),
                          ]);
                          setSubjects(
                            subjects.filter((arrItem) => arrItem !== subject)
                          );
                        }}
                      >
                        <HiTrash />
                      </button>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </>
  );
};

export default Table;
