import zone1 from "@/data/zone1.json";
import zone2 from "@/data/zone2.json";
import zone3 from "@/data/zone3.json";
import zone4 from "@/data/zone4.json";
import zone5 from "@/data/zone5.json";
import zone6 from "@/data/zone6.json";

export const ZoneMap = {
  0: [],
  null: [],
  undefined: [],
  1: zone1,
  2: zone2,
  3: zone3,
  4: zone4,
  5: zone5,
  6: zone6,
};

export const SubjectMap = {
  igcse: "Cambridge IGCSE",
  olevel: "Cambridge O Level",
  alevel: "Cambridge International A Level",
  custom: "custom",
};

export const SubjectTextMap = {
  igcse: "Cambridge IGCSE",
  olevel: "Cambridge O-Level",
  alevel: "Cambridge A-Level",
  custom: "custom",
};

export const SubjectReverseMap = {
  "Cambridge IGCSE": "igcse",
  "Cambridge O Level": "olevel",
  "Cambridge International A Level": "alevel",
};
