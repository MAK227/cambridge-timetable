import { Dialog, Tab, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const AddNewSubjectModal = ({
  isOpen,
  closeModal,
  filteredSubject,
  setFilteredSubject,
  addSubject,
  List,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  <span>Select your components for</span>
                  <span className="font-bold">
                    {filteredSubject.commonSubstring} - {filteredSubject.code}
                  </span>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="w-full px-2 py-8 sm:px-0">
                    <Tab.Group>
                      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-xs font-medium leading-5 text-dark focus-visible:outline-none md:text-sm",
                              selected
                                ? "bg-primary text-white shadow"
                                : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                          onClick={() => {
                            setFilteredSubject({
                              ...filteredSubject,
                              // set selected to true for subjects with "AS" level only
                              group: filteredSubject.group.map((subject) =>
                                subject.type.includes("AS")
                                  ? { ...subject, selected: true }
                                  : { ...subject, selected: false }
                              ),
                            });
                          }}
                        >
                          AS-Level Only
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-xs font-medium leading-5 text-dark focus-visible:outline-none md:text-sm",
                              selected
                                ? "bg-primary text-white shadow"
                                : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                          onClick={() => {
                            setFilteredSubject({
                              ...filteredSubject,
                              // set selected to true for subjects with "AS" level only
                              group: filteredSubject.group.map((subject) =>
                                subject.type.includes("A Level")
                                  ? { ...subject, selected: true }
                                  : { ...subject, selected: false }
                              ),
                            });
                          }}
                        >
                          A2-Level Only
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-xs font-medium leading-5 text-dark focus-visible:outline-none md:text-sm",
                              selected
                                ? "bg-primary text-white shadow"
                                : "text-green-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                          onClick={() => {
                            setFilteredSubject({
                              ...filteredSubject,
                              // set selected to true for subjects with "AS" level only
                              group: filteredSubject.group.map((subject) => {
                                return { ...subject, selected: true };
                              }),
                            });
                          }}
                        >
                          Customize
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel className={"rounded-xl md:p-3"}>
                          <List />
                        </Tab.Panel>
                        <Tab.Panel className={"rounded-xl md:p-3"}>
                          <List />
                        </Tab.Panel>
                        <Tab.Panel className={"rounded-xl md:p-3"}>
                          <List />
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary/80 px-4 py-2 text-sm font-semibold text-dark hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      // check the count of selected subjects
                      const selectedCount = filteredSubject.group.filter(
                        (subject) => subject.selected
                      ).length;

                      // if the count is 0, then remove the subject from the selected subjects array

                      if (selectedCount === 0) {
                        closeModal();
                        return;
                      }
                      addSubject(filteredSubject);
                      closeModal();
                    }}
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddNewSubjectModal;
