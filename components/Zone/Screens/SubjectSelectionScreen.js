import { SubjectReverseMap, SubjectTextMap } from "@/data/zone_map";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocalStorage } from "usehooks-ts";
import AddNewSubjectModal from "../Modals/AddNewSubjectModal";
import EditSubjectModal from "../Modals/EditSubjectModal";
import SearchInputForm from "../SearchInputForm";
import SelectedSubsDiv from "../SelectedSubsDiv";

const SubjectSelectionScreen = ({
  isOpen,
  closeModal,
  filteredSubject,
  setFilteredSubject,
  isEditOpen,
  openEditModal,
  closeEditModal,
  allowChangingType,
  subjectType,
  addSubject,
  List,
  backClickHandler,
  selectedSubs,
  setSelectedSubs,
  selectedSubjects,
  searchInputRef,
  showModal,
  openModal,
  filteredData,
  setFilteredData,
  searchInput,
  setSearchInput,
  data,
}) => {
  const [timetableData, setTimetableData] = useLocalStorage("timetable", {});

  const router = useRouter();

  return (
    <Fragment>
      {/* modal shown before adding a new subject */}
      <AddNewSubjectModal
        {...{
          isOpen,
          closeModal,
          filteredSubject,
          setFilteredSubject,
          addSubject,
          List,
        }}
      />

      {/* modal shown when the edit button is clicked */}
      <EditSubjectModal
        {...{
          isEditOpen,
          closeEditModal,
          filteredSubject,
          selectedSubs,
          setSelectedSubs,
          List,
        }}
      />

      {/** Go Back Button on Top Left */}
      <div className="flex w-full flex-row items-center justify-between p-4">
        {allowChangingType && (
          <button
            className="z-50 bg-dark text-4xl text-white transition-all duration-300 hover:text-primary sm:text-6xl"
            onClick={() => backClickHandler()}
          >
            <IoMdArrowRoundBack />
          </button>
        )}

        <motion.div
          className="absolute right-4 top-2 z-30 flex justify-center"
          layoutId={SubjectReverseMap[subjectType]}
          // onClick={backClickHandler}
        >
          <motion.button
            layoutId={
              subjectType === "custom"
                ? "custom"
                : (SubjectReverseMap[subjectType] || "custom") + "-button"
            }
            className="rounded-2xl bg-primary px-2 py-1 text-sm font-[600] text-dark sm:px-4 sm:py-3 sm:text-xl"
          >
            {subjectType === "custom"
              ? "Custom"
              : SubjectTextMap[SubjectReverseMap[subjectType]] || "Custom"}
          </motion.button>
        </motion.div>
      </div>

      <div className="fixed bottom-0 z-50 flex w-full flex-col items-center justify-center gap-2 bg-dark py-2 md:py-8">
        {selectedSubs.length > 0 && (
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.6,
                type: "spring",
              },
            }}
            className="rounded-2xl bg-primary px-6 py-1 font-[600] text-dark hover:bg-white "
            onClick={() => {
              // save the selected subjects in the session storage
              setTimetableData({
                ...timetableData,
                selectedSubs: selectedSubs.map((sub) => {
                  return {
                    code: sub.code,
                    // remove the selected property from the sub group
                    group: sub.group
                      .filter((sub) => sub.selected)
                      .map((sub) => {
                        delete sub.selected;
                        return sub;
                      }),
                  };
                }),
              });

              router.push(`/timetable`);
            }}
          >
            Done
          </motion.button>
        )}
        <div className="text-center text-xs">
          You can add more subjects by searching and selecting in the search bar
          above
        </div>
      </div>

      {/** Div Containing list of selected subjects on Top Left */}

      <motion.div className="flex flex-col pb-28" layout="position">
        {/** Absolute Positioned Main Div containing Search Engine Front End*/}
        <SearchInputForm
          showModal={showModal}
          openModal={openModal}
          subjectType={subjectType}
          addSubject={addSubject}
          selectedSubject={selectedSubjects}
          setFilteredSubject={setFilteredSubject}
          filteredData={filteredData}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchInputRef={searchInputRef}
          setFilteredData={setFilteredData}
          selectedSubs={selectedSubs}
          setSelectedSubs={setSelectedSubs}
          data={data}
        />

        <SelectedSubsDiv
          selectedSubs={selectedSubs}
          setFilteredSubject={setFilteredSubject}
          setSelectedSubs={setSelectedSubs}
          openEditModal={openEditModal}
        />
      </motion.div>
    </Fragment>
  );
};

export default SubjectSelectionScreen;
