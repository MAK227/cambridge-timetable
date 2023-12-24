import { AnimatePresence, motion } from "framer-motion";
import SubjectListContainer from "./SubjectListContainer";

export default function SearchInputForm({
  showModal,
  openModal,
  subjectType,
  addSubject,
  setFilteredSubject,
  filteredData,
  searchInput,
  searchInputRef,
  setSearchInput,
  selectedSubs,
  setSelectedSubs,
  data,
}) {
  return (
    <>
      <motion.div
        className={`flex flex-col text-center ${
          selectedSubs.length === 0 && searchInput === ""
            ? "md:absolute md:top-1/2 md:-mt-24 md:w-full"
            : "md:mt-0"
        }`}
        layout="position"
      >
        {/** Heading above Search Bar */}
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
          className="mt-4 text-2xl font-[600] text-white sm:text-3xl md:mt-0 lg:text-5xl"
        >
          Search Your Subjects
        </motion.h1>

        {/** Search Bar */}
        <motion.div
          className={`mt-10 flex flex-col items-center justify-center md:relative ${
            searchInput !== ""
              ? "fixed top-0 z-50 mt-0 bg-dark md:mt-10"
              : "mt-10"
          }`}
          id="search-bar"
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={{
            width: "100%",
            opacity: 1,
            transition: {
              duration: 0.5,
              type: "spring",
            },
          }}
        >
          <div className="relative flex h-12 w-11/12 items-center overflow-hidden rounded-2xl bg-white focus-within:shadow-lg lg:w-[48%]">
            <div className="grid h-full w-12 place-items-center text-gray-300">
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
            </div>

            {/** Search Your Subjects Search Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput !== "" && filteredData.length) {
                  let selectedSubject = filteredData[0];
                  if (showModal) {
                    selectedSubject.group = selectedSubject.group.map(
                      (group) => {
                        return {
                          ...group,
                          // set the selected group to true if the group type includes AS
                          selected: group.type.includes("AS") ? true : false,
                        };
                      }
                    );
                    setFilteredSubject(selectedSubject);
                    openModal();
                  } else {
                    selectedSubject.group = selectedSubject.group.map(
                      (group) => {
                        return {
                          ...group,
                          // set the selected group to true if the group type includes AS
                          selected: true,
                        };
                      }
                    );
                    addSubject(selectedSubject);
                  }
                }
              }}
              className="w-full"
            >
              <motion.input
                className="peer h-full w-full pr-2 text-lg font-[400] text-dark outline-none"
                type="text"
                id="search"
                placeholder="Search a subject..."
                autoComplete="off"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                ref={searchInputRef}
                autoFocus
              />
              {/* submit hidden button */}
              <input type="submit" hidden />
            </form>
          </div>

          {/** Results Div Below Search Bar, Made Hidden when the search input is none*/}
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 && searchInput !== "" && (
              <motion.div
                className={`mt-1 w-[95%] items-start rounded-2xl bg-white py-4 text-lg text-dark lg:w-[50%] `}
                initial={{
                  y: 100,
                }}
                animate={{
                  y: 0,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.2,
                  },
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {/**Header inside the div containing two headings */}
                <div className="flex flex-row justify-between text-sm text-gray-500 md:text-lg md:font-[500]">
                  <h1 className="pl-[5%]">Name</h1>
                  <h1 className="pr-[5%]">Code</h1>
                </div>
                {/**divs containing subject name and codes. Shown below the Header. Being Filtered with SearchInput */}
                <SubjectListContainer
                  {...{
                    visible: filteredData.length > 0 && searchInput !== "",
                    filteredData,
                    selectedSubs,
                    showModal,
                    setFilteredSubject,
                    addSubject,
                    subjectType,
                    openModal,
                    isRecommended: false,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
