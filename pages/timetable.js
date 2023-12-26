import Table from "@/components/Timetable/Table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { CgUndo } from "react-icons/cg";
import { HiSave } from "react-icons/hi";
import { useLocalStorage } from "usehooks-ts";

const TimetablePage = () => {
  const router = useRouter();
  const [timetableData, setTimetableData] = useLocalStorage("timetable", {});
  const [selectedSubjects, setSelectedSubjects] = React.useState(null);
  const [removedSubjects, setRemovedSubjects] = React.useState([]);

  useEffect(() => {
    if (timetableData.selectedSubs !== undefined) {
      setSelectedSubjects(
        timetableData.selectedSubs.map((x) => x.group).flat()
      );
    }
  }, [timetableData]);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">My Timetable</h1>
        <div className="flex-1">
          {selectedSubjects !== null && (
            <Table
              subjects={selectedSubjects}
              setSubjects={setSelectedSubjects}
              removedSubjects={removedSubjects}
              setRemovedSubjects={setRemovedSubjects}
            />
          )}
          {removedSubjects.length > 0 && (
            <div className="fixed bottom-4 right-4 flex gap-4">
              <div
                className="flex cursor-pointer items-center gap-1 rounded-full bg-primary p-2 text-xl text-dark"
                onClick={() => {
                  setTimetableData({
                    ...timetableData,
                    selectedSubs: [
                      {
                        group: selectedSubjects,
                        removed: removedSubjects,
                      },
                    ],
                  });
                  setRemovedSubjects([]);
                }}
              >
                <HiSave />
                <div className="text-sm md:text-base">Save</div>
              </div>
              <div
                className="flex cursor-pointer items-center gap-1 rounded-full bg-primary p-2 text-xl text-dark"
                onClick={() => {
                  //? pop the last element from the removedSubjects array
                  const lastRemovedSubject = removedSubjects.pop();
                  //? add the last removed subject to the selectedSubjects array
                  setSelectedSubjects([
                    lastRemovedSubject,
                    ...selectedSubjects,
                  ]);
                  //? update the removedSubjects array
                  setRemovedSubjects(removedSubjects);
                }}
              >
                <CgUndo />
                <div className="text-sm md:text-base">Undo</div>
              </div>
            </div>
          )}
        </div>
        <button
          className="relative rounded-full bg-primary px-6 py-1 font-semibold text-dark"
          onClick={() => {
            router.push("/");
            setTimetableData({});
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default TimetablePage;
