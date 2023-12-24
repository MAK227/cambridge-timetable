import React from "react";

const SubjectListContainer = ({
  visible,
  filteredData,
  selectedSubs,
  showModal,
  setFilteredSubject,
  addSubject,
  subjectType,
  openModal,
  isRecommended,
}) => {
  return (
    <div
      className={`z-50 ${
        isRecommended ? "max-h-[25vh]" : "max-h-[40vh]"
      } overflow-y-auto py-2 ${visible ? "visible" : "hidden"}`}
    >
      {filteredData?.map((currVal) => {
        if (selectedSubs.some((arrItem) => arrItem.code == currVal.code))
          return null;
        return (
          <button
            key={currVal.code}
            className={
              "min-h-96 duration-300ms flex w-full flex-row justify-between bg-white py-2 text-sm font-[500] transition-colors ease-in-out hover:bg-gray-100 active:bg-primary lg:text-lg"
            }
            onClick={() => {
              let selectedSubject = currVal;
              if (showModal) {
                selectedSubject.group = selectedSubject.group.map((group) => {
                  return {
                    ...group,
                    selected: group.type.includes("AS") ? true : false,
                  };
                });
                setFilteredSubject(selectedSubject);
                openModal();
              } else {
                selectedSubject.group = selectedSubject.group.map((group) => {
                  return {
                    ...group,
                    selected: true,
                  };
                });
                addSubject(selectedSubject, isRecommended);
              }
            }}
          >
            <h1 className="flex max-w-[50%] flex-col pl-[5%] text-left">
              <span>{currVal.commonSubstring}</span>
              {subjectType === "custom" && (
                <span className="text-sm text-gray-500">
                  {currVal.group[0].type.replace("AS Level", "A Level")}
                </span>
              )}
            </h1>
            <h1 className="pr-[5%]">{currVal.code}</h1>
          </button>
        );
      })}
    </div>
  );
};

export default SubjectListContainer;
