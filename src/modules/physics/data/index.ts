import { THEME_A_TOPICS } from "./unit1Topics";
import { THEME_B_TOPICS } from "./unit2Topics";
import { THEME_C_TOPICS } from "./unit3Topics";
import { THEME_D_TOPICS } from "./unit4Topics";
import { THEME_E_TOPICS } from "./unit5Topics";
import { TopicData, ThemePart, ThemeId } from "./types";
import { SYLLABUS_THEMES } from "./metadata";

export * from "./types";
export * from "./metadata";
export * from "./formulaBank";
export * from "./diagramsDossier";
export * from "./caseStudiesBank";
export * from "./examStructuresData";
export * from "./glossaryTerms";
export * from "./examQuestions";

export const ALL_TOPICS: TopicData[] = [
  ...THEME_A_TOPICS,
  ...THEME_B_TOPICS,
  ...THEME_C_TOPICS,
  ...THEME_D_TOPICS,
  ...THEME_E_TOPICS,
];

export const SYLLABUS_UNITS: ThemePart[] = SYLLABUS_THEMES.map((theme) => ({
  id: theme.id as ThemeId,
  number: theme.number,
  code: theme.code,
  title: theme.title,
  shortTitle: theme.shortTitle,
  description: theme.description,
  color: theme.color,
  accentHex: theme.accentHex,
  topics: ALL_TOPICS.filter((t) => t.themeId === theme.id),
}));
