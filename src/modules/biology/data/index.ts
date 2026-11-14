import { ThemePart, TopicData } from "./types";
import { THEME_A_TOPICS } from "./themeATopics";
import { THEME_B_TOPICS } from "./themeBTopics";
import { THEME_C_TOPICS } from "./themeCTopics";
import { THEME_D_TOPICS } from "./themeDTopics";

export * from "./types";
export * from "./metadata";

export const SYLLABUS_UNITS: ThemePart[] = [
  {
    id: "theme-a",
    number: 1,
    code: "Theme A",
    title: "Theme A: Unity and Diversity",
    shortTitle: "Unity & Diversity",
    description:
      "Water, nucleic acids, origins of cells (HL), cell structure, viruses (HL), diversity of organisms, classification & cladistics (HL), evolution, and conservation.",
    color: "from-emerald-500/20 to-green-500/20",
    accentHex: "#22c55e",
    topics: THEME_A_TOPICS,
  },
  {
    id: "theme-b",
    number: 2,
    code: "Theme B",
    title: "Theme B: Form and Function",
    shortTitle: "Form & Function",
    description:
      "Carbohydrates & lipids, proteins, membranes & transport, organelles, cell specialization, gas exchange, transport, muscle & motility (HL), adaptation, and ecological niches.",
    color: "from-teal-500/20 to-emerald-500/20",
    accentHex: "#14b8a6",
    topics: THEME_B_TOPICS,
  },
  {
    id: "theme-c",
    number: 3,
    code: "Theme C",
    title: "Theme C: Interaction and Interdependence",
    shortTitle: "Interaction & Interdependence",
    description:
      "Enzymes & metabolism, cell respiration, photosynthesis, chemical signalling (HL), neural signalling, body system integration, disease defence, populations, and energy/matter transfers.",
    color: "from-lime-500/20 to-green-500/20",
    accentHex: "#84cc16",
    topics: THEME_C_TOPICS,
  },
  {
    id: "theme-d",
    number: 4,
    code: "Theme D",
    title: "Theme D: Continuity and Change",
    shortTitle: "Continuity & Change",
    description:
      "DNA replication, protein synthesis, mutation & gene editing, cell division, gene expression (HL), water potential, reproduction, inheritance, homeostasis, natural selection, stability & change, and climate change.",
    color: "from-green-500/20 to-cyan-500/20",
    accentHex: "#4ade80",
    topics: THEME_D_TOPICS,
  },
];

export const ALL_TOPICS: TopicData[] = [
  ...THEME_A_TOPICS,
  ...THEME_B_TOPICS,
  ...THEME_C_TOPICS,
  ...THEME_D_TOPICS,
];
