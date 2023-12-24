import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const EditSubjectModal = ({
  isEditOpen,
  closeEditModal,
  filteredSubject,
  selectedSubs,
  setSelectedSubs,
  List,
}) => {
  return (
    <Transition appear show={isEditOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeEditModal}>
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
                  <span>Edit your components for</span>
                  <span className="font-bold">
                    {filteredSubject.commonSubstring} - {filteredSubject.code}
                  </span>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="w-full px-2 py-8 sm:px-0">
                    <List />
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary/80 px-4 py-2 text-sm font-semibold text-dark hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      // updated the current subject in the selected subjects array
                      const selectedSubjects = selectedSubs;

                      // check the count of selected subjects
                      const selectedCount = filteredSubject.group.filter(
                        (subject) => subject.selected
                      ).length;

                      // if the count is 0, then remove the subject from the selected subjects array

                      if (selectedCount === 0) {
                        setSelectedSubs(
                          selectedSubjects.filter(
                            (subject) => subject.code !== filteredSubject.code
                          )
                        );
                        closeEditModal();
                        return;
                      }

                      const index = selectedSubjects.findIndex(
                        (subject) => subject.code === filteredSubject.code
                      );
                      selectedSubjects[index] = filteredSubject;
                      setSelectedSubs(selectedSubjects);
                      closeEditModal();
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

export default EditSubjectModal;
