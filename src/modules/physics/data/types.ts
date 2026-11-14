export type PhysicsConceptId =
  | "conservation"
  | "fields"
  | "duality"
  | "micro-macro"
  | "invariance"
  | "equilibrium"
  | "uncertainty";

export type ThemeId = "theme-a" | "theme-b" | "theme-c" | "theme-d" | "theme-e";

export interface ConceptDefinition {
  id: PhysicsConceptId;
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
  promptType: "explain" | "diagram-check" | "calculation" | "derivation";
  hints: string[];
  modelAnswer: string;
  keyTermsToInclude: string[];
  formulaUsed?: string;
}

export interface SubSection {
  id: string;
  title: string;
  marker: string;
  content: string;
  analyticalTakeaway: string;
  keyFormulaOrFramework?: string;
  diagramRef?: string;
  workedExample?: {
    problem: string;
    stepByStep: string[];
    finalAnswer: string;
  };
}

export interface CaseStudyItem {
  id: string;
  title: string;
  domainOrContext: string;
  physicalMechanism: string;
  concepts: PhysicsConceptId[];
  syllabusLink: string;
  quantitativeInsight: string;
}

export interface ConceptTrackItem {
  conceptId: PhysicsConceptId;
  intensity: 1 | 2 | 3 | 4 | 5;
  manifestation: string;
}

export interface TopicAnalysis {
  coreThesis: string;
  theoreticalFoundations: string;
  strategicEvaluation: string;
  commonMisconceptions: string[];
  realWorldConnections: string;
  keyDiagrams: string[];
}

export interface ExamBlueprint {
  paper1TrapPattern: string;
  paper2StructuredPrompt: string;
  commandTerm: "State" | "Describe" | "Explain" | "Calculate" | "Determine" | "Deduce" | "Derive";
  idealSolutionBreakdown: {
    statePrinciples: string;
    showWorking: string;
    unitsAndSigFigs: string;
  };
  pitfallsToAvoid: string[];
}

export interface TopicData {
  id: string;
  themeId: ThemeId;
  themeNumber: 1 | 2 | 3 | 4 | 5;
  topicCode: string; // e.g. "A.1", "B.3", "C.2", "D.2", "E.3"
  displayCode: string; // e.g. "A.1", "B.3", "C.2", "D.2", "E.3"
  syllabusRef: string; // e.g. "IB Guide A.1 / Tsokos Ch. 2"
  title: string;
  subtitle: string;
  level: "SL" | "HL" | "SL / HL";
  strategicImportance:
    | "CORE MECHANICS FOUNDATION"
    | "HIGH-YIELD THERMODYNAMICS"
    | "HIGH-YIELD CLIMATE PHYSICS"
    | "HIGH-YIELD CIRCUIT DYNAMICS"
    | "WAVE PHENOMENA ESSENTIAL"
    | "FIELDS & FORCES CORNERSTONE"
    | "NUCLEAR & QUANTUM CORE"
    | "PAPER 1 CALCULATION HOTSPOT"
    | "PAPER 2 DATA RESPONSE";
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
  diagramIds: string[];
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

export interface DiagramDossier {
  id: string;
  title: string;
  topicRef: string;
  themeId: ThemeId;
  description: string;
  whyItMatters: string;
  examPitfalls: string;
  interactiveControls: {
    id: string;
    label: string;
    type: "toggle" | "slider" | "choice";
    defaultValue?: any;
    options?: { label: string; value: string }[];
    min?: number;
    max?: number;
    step?: number;
  }[];
  keyFormulas: string[];
}

export interface FormulaBankItem {
  id: string;
  themeId: ThemeId;
  topicCode: string;
  name: string;
  latex: string;
  variables: { symbol: string; name: string; unit: string }[];
  conditions: string;
  examTips: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  themeId: ThemeId;
  topicCode: string;
  definition: string;
  symbol?: string;
  siUnit?: string;
  type: "scalar" | "vector" | "dimensionless" | "constant" | "principle";
  formulaLink?: string;
  examNote: string;
}

export interface FlashcardItem {
  id: string;
  themeId: ThemeId;
  topicCode: string;
  front: string;
  back: string;
  category: "definition" | "formula-recall" | "concept" | "derivation";
  formulaLatex?: string;
}

export interface QuizQuestion {
  id: string;
  themeId: ThemeId;
  topicCode: string;
  question: string;
  formulaLatex?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "standard" | "exam-level" | "distinction";
}
