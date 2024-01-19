import Table from "@/components/Timetable/Table";
import jsPDF from "jspdf";
import "jspdf-autotable";
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


  // {
  //   "country": "Pakistan",
  //     "zone": "4",
  //       "selectedSubs": [
  //         {
  //           "code": "9709",
  //           "group": [
  //             {
  //               "type": "Cambridge International AS Level",
  //               "subject": "Mathematics (Pure Mathematics 1)",
  //               "code": "9709/12",
  //               "duration": "1h 50m",
  //               "date": "Thursday 02 May 2024",
  //               "session": "PM"
  //             },
  //             {
  //               "type": "Cambridge International AS Level",
  //               "subject": "Mathematics (Pure Mathematics 2)",
  //               "code": "9709/22",
  //               "duration": "1h 15m",
  //               "date": "Tuesday 07 May 2024",
  //               "session": "PM"
  //             },
  //             {
  //               "type": "Cambridge International A Level",
  //               "subject": "Mathematics (Pure Mathematics 3)",
  //               "code": "9709/32",
  //               "duration": "1h 50m",
  //               "date": "Wednesday 15 May 2024",
  //               "session": "PM"
  //             },
  //             {
  //               "type": "Cambridge International AS Level",
  //               "subject": "Mathematics (Mechanics)",
  //               "code": "9709/42",
  //               "duration": "1h 15m",
  //               "date": "Tuesday 07 May 2024",
  //               "session": "PM"
  //             },
  //             {
  //               "type": "Cambridge International AS Level",
  //               "subject": "Mathematics (Probability & Statistics 1)",
  //               "code": "9709/52",
  //               "duration": "1h 15m",
  //               "date": "Monday 13 May 2024",
  //               "session": "PM"
  //             },
  //             {
  //               "type": "Cambridge International A Level",
  //               "subject": "Mathematics (Probability & Statistics 2)",
  //               "code": "9709/62",
  //               "duration": "1h 15m",
  //               "date": "Tuesday 07 May 2024",
  //               "session": "PM"
  //             }
  //           ]
  //         }
  //       ]
  // }

  const exportPDF = () => {

    // console.log(timetableData)

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My TimeTable";
    const headers = [["Type", "Subject", "Code", "Duration", "Date", "Session"]];

    const data = timetableData.selectedSubs.map(x =>
      x.group
    )

    const newData = data.map(x => x.map(y => Object.values(y)))[0].map(x => x)

    let content = {
      startY: 50,
      head: headers,
      body: newData
    };

    doc.text(title, marginLeft, 30);
    doc.autoTable(content);
    doc.save("timetable.pdf")
  }


  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-white">My Timetable</h1>
        <div>
          <button
            className="relative rounded-full bg-primary px-6 py-1 font-semibold text-dark"
            onClick={() => exportPDF()}>Save Timetable</button>
        </div>
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
