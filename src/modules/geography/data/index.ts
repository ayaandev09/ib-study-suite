import { UNIT_1_TOPICS } from "./unit1Topics";
import { UNIT_2_TOPICS } from "./unit2Topics";
import { UNIT_3_TOPICS } from "./unit3Topics";
import { UNIT_4_TOPICS } from "./unit4Topics";
import {
  GEO_CONCEPTS,
  GEO_UNITS as BASE_UNITS,
  GEO_FORMULAS,
  GEO_GLOSSARY,
  GEO_FLASHCARDS,
} from "./metadata";
import type { TopicData, UnitPart } from "./types";

export * from "./types";
export {
  GEO_CONCEPTS,
  GEO_FORMULAS,
  GEO_GLOSSARY,
  GEO_FLASHCARDS,
};

export const ALL_TOPICS: TopicData[] = [
  ...UNIT_1_TOPICS,
  ...UNIT_2_TOPICS,
  ...UNIT_3_TOPICS,
  ...UNIT_4_TOPICS,
];

export const GEO_UNITS: UnitPart[] = BASE_UNITS.map((unit) => {
  const topics =
    unit.id === "unit-1"
      ? UNIT_1_TOPICS
      : unit.id === "unit-2"
      ? UNIT_2_TOPICS
      : unit.id === "unit-3"
      ? UNIT_3_TOPICS
      : UNIT_4_TOPICS;
  return { ...unit, topics };
});

export const SYLLABUS_UNITS = GEO_UNITS;
