export type GeographyConceptId =
  | "place"
  | "power"
  | "possibility"
  | "process"
  | "scale"
  | "spatial-interaction";

export type UnitId = "unit-1" | "unit-2" | "unit-3" | "unit-4";

export interface ConceptDefinition {
  id: GeographyConceptId;
  name: string;
  shortName: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  description: string;
  coreMechanism: string;
  examTips: string;
}

export interface CheckYourUnderstanding {
  id: string;
  question: string;
  promptType: "explain" | "data-analysis" | "calculation" | "evaluation";
  hints: string[];
  modelAnswer: string;
  keyTermsToInclude: string[];
  formulaUsed?: string;
}

export interface SubSection {
  id: string;
  title: string;
  marker: string;
  isHLOnly?: boolean;
  content: string;
  analyticalTakeaway: string;
  keyFormulaOrFramework?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  regionOrContext: string;
  geographicMechanism: string;
  concepts: GeographyConceptId[];
  syllabusLink: string;
  quantitativeInsight: string;
}

export interface ConceptTrackItem {
  conceptId: GeographyConceptId;
  intensity: 1 | 2 | 3 | 4 | 5;
  manifestation: string;
}

export interface TopicAnalysis {
  coreThesis: string;
  theoreticalFoundations: string;
  strategicEvaluation: string;
  commonMisconceptions: string[];
  realWorldConnections: string;
}

export interface ExamBlueprint {
  paper1TrapPattern: string;
  paper2StructuredPrompt: string;
  commandTerm: "Explain" | "Discuss" | "Evaluate" | "To what extent" | "Examine" | "Contrast";
  idealSolutionBreakdown: {
    statePrinciples: string;
    showWorking: string;
    caseAndScale: string;
  };
  pitfallsToAvoid: string[];
}

export interface TopicData {
  id: string;
  unitId: UnitId;
  unitNumber: 1 | 2 | 3 | 4;
  topicCode: string;
  displayCode: string;
  syllabusRef: string;
  title: string;
  subtitle: string;
  level: "SL / HL" | "HL ONLY";
  strategicImportance: string;
  readingTimeMinutes: number;
  summary: string;
  speedReadBullets: string[];
  primer5Min: string;
  subSections: SubSection[];
  checkUnderstanding: CheckYourUnderstanding[];
  analysis: TopicAnalysis;
  cases: CaseStudyItem[];
  conceptTracking: ConceptTrackItem[];
  examPromptTakeaway: string;
  examBlueprint: ExamBlueprint;
}

export interface UnitPart {
  id: UnitId;
  number: 1 | 2 | 3 | 4;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  topics: TopicData[];
}

export interface GeoFormulaItem {
  id: string;
  name: string;
  formula: string;
  variables: string;
  units: string;
  topicCode: string;
  category: string;
  examTrap: string;
}

export interface GeoGlossaryTerm {
  id: string;
  term: string;
  definition: string;
  topicRef: string;
  isHLOnly?: boolean;
}

export interface GeoFlashcard {
  id: string;
  topicCode: string;
  front: string;
  back: string;
  level: "SL / HL" | "HL ONLY";
}
