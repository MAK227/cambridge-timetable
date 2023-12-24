import ExaminationTypeSelectionScreen from "@/components/Zone/Screens/ExaminationTypeSelectionScreen";
import SubjectSelectionScreen from "@/components/Zone/Screens/SubjectSelectionScreen";
import { SubjectMap, ZoneMap } from "@/data/zone_map";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const ZonePage = ({
  selectedSubjects = [],
  type = "",
  allowChangingType = true,
}) => {
  const router = useRouter();
  const { zone } = router.query;

  const data = ZoneMap[zone];

  //subjectType handles if its a IGCSE, O-level or A-level subject
  const [subjectType, setSubjectType] = useState(type);

  useEffect(() => {
    if (type !== "") setTypeSelected(true);
    setSubjectType(type);
  }, [type]);

  //typeSelected boolean for conditional rendering (see below)
  const [typeSelected, setTypeSelected] = useState(false);

  //contains the search input
  const [searchInput, setSearchInput] = useState("");

  //contains the filtered data from data.js
  const [filteredData, setFilteredData] = useState([]);

  //the final array containing the objects of selected subjects only
  const [selectedSubs, setSelectedSubs] = useState(selectedSubjects);

  //only show modal when the selected exam type is A-Level (derived state is always better than an effect)
  const showModal = subjectType === SubjectMap.alevel;

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [filteredSubject, setFilteredSubject] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);
  }

  //storing the whole data.js array of objects in filteredData.
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // input field for searches reference
  const searchInputRef = useRef(null);

  const addSubject = (currVal, isRecommended = false) => {
    // check by currValue.code if the subject is already selected
    if (!selectedSubs.some((el) => el.code == currVal.code)) {
      setSelectedSubs([...selectedSubs, currVal]);
    }
    // clear the search bar
    setSearchInput("");
    // focus on the search bar again
    if (!isRecommended) searchInputRef.current.focus();
  };

  //real-time search results after user types something inside the search input
  useEffect(() => {
    if (searchInput != "") {
      setFilteredData(
        data
          .filter((currVal) => {
            if (subjectType === "Cambridge International A Level") {
              return (
                currVal.group[0].type === "Cambridge International AS Level" ||
                currVal.group[0].type === "Cambridge International A Level"
              );
            } else if (subjectType == "custom") {
              return true;
            }

            return currVal.group[0].type === subjectType;
          })
          .filter((currElem) =>
            currElem.commonSubstring
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
          .filter((currElem) => {
            // check if the subject is already selected
            if (selectedSubs.some((el) => el.code == currElem.code)) {
              return false;
            }
            return true;
          })
      );
    } else {
      setFilteredData([]);
    }
  }, [searchInput, selectedSubs]);

  //this function is called when a user selects a choice between O-Level, IGCSE or A-Level
  const clickHandler = (subject) => {
    //resets the search input if a user goes back and selects another exam type
    setSearchInput("");

    //on button click, the respective states are updated
    if (subject === "") {
      setSubjectType("");
      setTypeSelected(false);
    } else {
      setSubjectType(SubjectMap[subject]);
      setTypeSelected(true);
    }
  };

  //this function handles what should happen to selectedSubject array when the back-button is clicked
  const backClickHandler = () => {
    setSelectedSubs([]);
    clickHandler("");
  };

  const List = () => {
    return (
      <>
        <div className="lg:text-md grid w-full cursor-pointer select-none grid-cols-6 items-center justify-between rounded-xl bg-black/20 py-4 px-4 text-sm">
          <div className="col-span-4">Subject</div>
          <div>Type</div>
          <div>Code</div>
        </div>
        {filteredSubject.group?.map((subject, idx) => (
          <div
            className="grid w-full cursor-pointer select-none grid-cols-6 items-center justify-between rounded-xl py-4 px-4 text-xs hover:bg-black/10 lg:text-sm"
            key={idx}
            onClick={() => {
              setFilteredSubject({
                ...filteredSubject,
                group: filteredSubject.group?.map((sub) => {
                  if (sub.code === subject.code) {
                    return {
                      ...sub,
                      selected: !subject.selected,
                    };
                  }
                  return sub;
                }),
              });
            }}
          >
            <div className="col-span-4 flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-primary"
                checked={subject.selected}
                onChange={() =>
                  // select the subject
                  setFilteredSubject({
                    ...filteredSubject,
                    group: filteredSubject.group?.map((sub) => {
                      if (sub.code === subject.code) {
                        return {
                          ...sub,
                          selected: !sub.selected,
                        };
                      }
                      return sub;
                    }),
                  })
                }
              />
              <span className="ml-2 ">{subject.subject}</span>
            </div>
            <div>
              <span>{subject.type.slice(24)}</span>
            </div>
            <div className="col-span-1">
              <span>{subject.code}</span>
            </div>
          </div>
        ))}
      </>
    );
  };

  return !typeSelected ? (
    //conditional rendering : the first screen. Selection between IGCSE, O-Level or A-Level
    <ExaminationTypeSelectionScreen zone={zone} clickHandler={clickHandler} />
  ) : (
    //conditional rendering : the second screen containing the search engine. When a exam type button is Clicked
    <SubjectSelectionScreen
      {...{
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
      }}
    />
  );
};

export default ZonePage;
