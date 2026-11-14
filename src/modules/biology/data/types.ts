export type BiologyConceptId =
  | "molecular-specificity"
  | "compartmentalization"
  | "energy-transduction"
  | "information-flow"
  | "homeostatic-feedback"
  | "evolutionary-adaptation"
  | "ecological-interdependence";

export type ThemeId = "theme-a" | "theme-b" | "theme-c" | "theme-d";

export type OrgLevel = "Molecules" | "Cells" | "Organisms" | "Ecosystems";

export interface ConceptDefinition {
  id: BiologyConceptId;
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
  promptType: "explain" | "data-analysis" | "calculation" | "mechanism";
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
  domainOrContext: string;
  biologicalMechanism: string;
  concepts: BiologyConceptId[];
  syllabusLink: string;
  quantitativeInsight: string;
}

export interface ConceptTrackItem {
  conceptId: BiologyConceptId;
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
  commandTerm:
    | "State"
    | "Describe"
    | "Explain"
    | "Outline"
    | "Compare and contrast"
    | "Calculate"
    | "Deduce";
  idealSolutionBreakdown: {
    statePrinciples: string;
    keyMarkSchemePoints: string;
    dataOrUnitsTip: string;
  };
  pitfallsToAvoid: string[];
}

export interface TopicData {
  id: string;
  themeId: ThemeId;
  themeNumber: 1 | 2 | 3 | 4;
  orgLevel: OrgLevel;
  topicCode: string; // e.g. "A1.1", "D2.3"
  displayCode: string; // e.g. "A1.1"
  syllabusRef: string; // e.g. "IB Biology May 2027 · A1.1"
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
  primaryFormulas: string[];
}

export interface ThemePart {
  id: ThemeId;
  number: number;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  accentHex: string;
  topics: TopicData[];
}

export interface BioFormulaItem {
  id: string;
  category: "Biochemistry & Cells" | "Genetics & Evolution" | "Ecology & Statistics";
  topicCode: string;
  name: string;
  latex: string;
  variables: string;
  examTip: string;
}

export interface BioGlossaryTerm {
  id: string;
  term: string;
  category: "Core Biology" | "HL Extension" | "NOS & Practical" | "Command Term";
  topicRef: string;
  definition: string;
  examNuance: string;
}

export interface BioFlashcard {
  id: string;
  topicId: string;
  topicCode: string;
  themeId: ThemeId;
  isHLOnly: boolean;
  front: string;
  back: string;
  markSchemeKey: string;
}
