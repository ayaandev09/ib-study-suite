import { AppId } from "@/types/workspace";
import {
  ALL_TOPICS as BIOLOGY_TOPICS,
  BIO_FORMULAS as BIOLOGY_FORMULAS,
  BIO_GLOSSARY_TERMS as BIOLOGY_GLOSSARY,
} from "@/modules/biology/data";
import { ALL_CHAPTERS as ORWELL_CHAPTERS } from "@/modules/orwell/data";
import { ALL_TOPICS as BUSINESS_TOPICS } from "@/modules/business/data";
import { GLOSSARY_TERMS as BUSINESS_GLOSSARY } from "@/modules/business/data/glossaryTerms";
import { BMT_TOPICS } from "@/modules/business/data/bmtTopics";
import {
  ALL_TOPICS as ECON_TOPICS,
  FORMULA_BANK as ECON_FORMULAS,
  GLOSSARY_TERMS as ECON_GLOSSARY,
  CASE_STUDIES_BANK as ECON_CASES,
} from "@/modules/economics/data";
import {
  ALL_TOPICS as PHYSICS_TOPICS,
  FORMULA_BANK as PHYSICS_FORMULAS,
  GLOSSARY_TERMS as PHYSICS_GLOSSARY,
} from "@/modules/physics/data";
import {
  ALL_TEXTSORTEN,
  REDEMITTEL_DATABASE,
  GRAMMAR_POINTS,
  LITERARY_WORKS,
  ALL_SUBTOPICS as GERMAN_SUBTOPICS,
} from "@/modules/german/data";
import {
  ALL_TOPICS as GEO_TOPICS,
  GEO_FORMULAS,
  GEO_GLOSSARY,
} from "@/modules/geography/data";

export type QueryIntent =
  | "explain"
  | "compare"
  | "formula"
  | "quote"
  | "exam"
  | "definition"
  | "unit";

export interface SearchResultItem {
  id: string;
  appId: AppId;
  subjectTitle: string;
  category:
    | "topic"
    | "quote"
    | "formula"
    | "glossary"
    | "concept"
    | "textsorten"
    | "diagram";
  badge: string;
  title: string;
  subtitle?: string;
  targetId: string;
  viewMode: string;
  snippet: string;
  matchScore: number;
  tags?: string[];
  formulaLatex?: string;
}

export interface AIQuote {
  quote: string;
  speaker?: string;
  context?: string;
}

export interface AIRelatedSource {
  appId: AppId;
  targetId: string;
  viewMode: string;
  label: string;
}

export interface AIAnswerResult {
  badge: string;
  intent?: QueryIntent;
  confidenceLabel?: string;
  subjectId: AppId;
  subjectName: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  targetId: string;
  viewMode: string;
  actionText: string;
  tags: string[];
  keyFormula?: string;
  keyQuotes?: AIQuote[];
  examTip?: string;
  followUpQuestions?: string[];
  relatedSources?: AIRelatedSource[];
}

export interface UniversalSearchResult {
  query: string;
  aiAnswer: AIAnswerResult | null;
  items: SearchResultItem[];
  totalMatches: number;
}

// ---------------------------------------------------------------------------
// Internal Rich Document Representation for BM25 + Synthesis
// ---------------------------------------------------------------------------

interface SubSectionRecord {
  title: string;
  content: string;
  takeaway: string;
  formula?: string;
}

interface IndexedDocument {
  item: SearchResultItem;
  exactCodes: string[];
  subSectionText: string;
  fullText: string;
  // Structured fields for AI synthesis
  coreThesis: string;
  bullets: string[];
  formulas: string[];
  quotes: AIQuote[];
  examTip: string;
  misconceptions: string[];
  subSections: SubSectionRecord[];
  // Pre-tokenized inverted index fields
  titleTokens: string[];
  subtitleTokens: string[];
  codeTokens: string[];
  tagTokens: string[];
  subSectionTokens: string[];
  snippetTokens: string[];
  bodyTokens: string[];
  allTokenSet: Set<string>;
}

// ---------------------------------------------------------------------------
// Text Normalization, Stopwords, Stemming & IB Synonym Expansion
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of",
  "with", "by", "from", "as", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could", "should",
  "can", "may", "might", "must", "shall", "what", "which", "who", "whom", "whose",
  "where", "when", "why", "how", "me", "my", "you", "your", "we", "our", "it",
  "its", "this", "that", "these", "those", "find", "show", "give", "tell", "get",
  "explain", "describe", "outline", "summarize", "summary", "notes", "note",
  "about", "into", "between", "versus", "vs", "compare", "contrast", "difference",
  "differences", "similarities", "mean", "meaning", "define", "definition",
  "formula", "formulas", "equation", "equations", "quote", "quotes", "exam",
  "tip", "tips", "please", "help", "need",
]);

const SYNONYM_MAP: Record<string, string[]> = {
  ped: ["price", "elasticity", "demand"],
  yed: ["income", "elasticity", "demand"],
  pes: ["price", "elasticity", "supply"],
  ppc: ["production", "possibilities", "curve"],
  atp: ["adenosine", "triphosphate", "respiration", "chemiosmosis"],
  dna: ["deoxyribonucleic", "replication", "helicase", "polymerase"],
  rna: ["ribonucleic", "transcription", "mrna", "trna"],
  crispr: ["cas9", "gene", "editing"],
  bmt: ["toolkit", "decision", "matrix", "swot", "ansoff", "bcg"],
  breakeven: ["break", "even", "margin", "safety", "contribution"],
  "break-even": ["break", "even", "margin", "safety", "contribution"],
  konjunktiv: ["subjunctive", "hypothetical", "wuerde", "würde", "konjunktiv"],
  subjunctive: ["konjunktiv", "hypothetical"],
  paperweight: ["coral", "charrington", "sanctuary", "glass"],
  winston: ["1984", "orwell", "smith"],
  julia: ["1984", "orwell", "rebellion"],
  obrien: ["o'brien", "1984", "orwell", "torture", "ministry"],
  "o'brien": ["obrien", "1984", "orwell"],
  duerrenmatt: ["dürrenmatt", "alte", "dame", "güllen", "zachanassian"],
  dürrenmatt: ["duerrenmatt", "alte", "dame", "güllen", "zachanassian"],
  claire: ["zachanassian", "alte", "dame", "dürrenmatt"],
  bio: ["biology"],
  econ: ["economics"],
  phys: ["physics"],
  bm: ["business", "management"],
  deutsch: ["german"],
  geo: ["geography", "geographical"],
  lit: ["literature", "1984", "dürrenmatt"],
  ke: ["kinetic", "energy"],
  gpe: ["gravitational", "potential", "energy"],
  shm: ["simple", "harmonic", "motion"],
  emf: ["electromotive", "force"],
  gdp: ["gross", "domestic", "product"],
  cpi: ["consumer", "price", "index", "inflation"],
  csr: ["corporate", "social", "responsibility"],
  hrm: ["human", "resource", "management"],
  npv: ["net", "present", "value"],
  arr: ["average", "rate", "return"],
  pbp: ["payback", "period"],
  swot: ["strengths", "weaknesses", "opportunities", "threats"],
  ansoff: ["market", "penetration", "diversification", "product", "development"],
  cpa: ["critical", "path", "analysis"],
  leserbrief: ["formeller", "brief", "artikel", "zeitung", "opinion"],
  rede: ["vortrag", "speech", "rede-vortrag"],
  erörterung: ["essay", "eroerterung", "argumentative"],
  eroerterung: ["essay", "argumentative"],
  tagebuch: ["tagebucheintrag", "diary"],
  kritik: ["rezension", "review"],
  flyer: ["broschuere", "broschüre"],
  format: ["textsorten", "structure", "blueprint"],
};

function normalizeGermanChars(str: string): string {
  return str
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

function lightStem(token: string): string {
  if (token.length <= 4) return token;
  if (token.endsWith("ies") && token.length > 5) return token.slice(0, -3) + "y";
  if (token.endsWith("ing") && token.length > 6) return token.slice(0, -3);
  if (token.endsWith("tion") && token.length > 6) return token.slice(0, -4);
  if (token.endsWith("ment") && token.length > 6) return token.slice(0, -4);
  if (token.endsWith("ness") && token.length > 6) return token.slice(0, -4);
  if (token.endsWith("ed") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("es") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
  return token;
}

function tokenize(text: string, removeStopwords = false): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const raw = lower.match(/[a-z0-9äöüß]+(?:[.\-'][a-z0-9äöüß]+)*/g) || [];
  const out: string[] = [];
  for (const t of raw) {
    if (removeStopwords && STOP_WORDS.has(t)) continue;
    out.push(t);
    const norm = normalizeGermanChars(t);
    if (norm !== t) out.push(norm);
    const stemmed = lightStem(t);
    if (stemmed !== t && stemmed.length >= 3) out.push(stemmed);
  }
  return out;
}

function levenshtein(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const m = a.length;
  const n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (a[i - 1] === b[j - 1]) {
        dp[j] = prev;
      } else {
        dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
      }
      prev = temp;
    }
  }
  return dp[n];
}

// ---------------------------------------------------------------------------
// 1. Unified Global Corpus Builder + BM25 Index
// ---------------------------------------------------------------------------

interface CorpusIndex {
  docs: IndexedDocument[];
  idf: Map<string, number>;
  avgDocLen: number;
}

let cachedIndex: CorpusIndex | null = null;

function createIndexedDoc(params: {
  item: SearchResultItem;
  exactCodes: string[];
  subSections?: SubSectionRecord[];
  coreThesis?: string;
  bullets?: string[];
  formulas?: string[];
  quotes?: AIQuote[];
  examTip?: string;
  misconceptions?: string[];
  extraBody?: string;
}): IndexedDocument {
  const subs = params.subSections || [];
  const subSectionText = subs
    .map((s) => `${s.title} ${s.content} ${s.takeaway} ${s.formula || ""}`)
    .join(" ");
  const bulletsText = (params.bullets || []).join(" ");
  const misconceptionsText = (params.misconceptions || []).join(" ");
  const fullText = [
    params.coreThesis || "",
    bulletsText,
    subSectionText,
    params.examTip || "",
    misconceptionsText,
    params.extraBody || "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleTokens = tokenize(params.item.title);
  const subtitleTokens = tokenize(params.item.subtitle || "");
  const codeTokens = tokenize(params.exactCodes.join(" "));
  const tagTokens = tokenize((params.item.tags || []).join(" "));
  const subSectionTokens = tokenize(subs.map((s) => s.title).join(" "));
  const snippetTokens = tokenize(params.item.snippet);
  const bodyTokens = tokenize(fullText);

  const allTokenSet = new Set<string>([
    ...titleTokens,
    ...subtitleTokens,
    ...codeTokens,
    ...tagTokens,
    ...subSectionTokens,
    ...snippetTokens,
    ...bodyTokens,
  ]);

  return {
    item: params.item,
    exactCodes: params.exactCodes.map((c) => c.toLowerCase()),
    subSectionText,
    fullText,
    coreThesis: params.coreThesis || params.item.snippet,
    bullets: params.bullets || [],
    formulas: params.formulas || (params.item.formulaLatex ? [params.item.formulaLatex] : []),
    quotes: params.quotes || [],
    examTip: params.examTip || "",
    misconceptions: params.misconceptions || [],
    subSections: subs,
    titleTokens,
    subtitleTokens,
    codeTokens,
    tagTokens,
    subSectionTokens,
    snippetTokens,
    bodyTokens,
    allTokenSet,
  };
}

function getCorpusIndex(): CorpusIndex {
  if (cachedIndex) return cachedIndex;

  const docs: IndexedDocument[] = [];

  // 1. IB Biology SL/HL (40 May 2027 Topics + Equations + Glossary)
  BIOLOGY_TOPICS.forEach((tp) => {
    const subs: SubSectionRecord[] = tp.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
      formula: s.keyFormulaOrFramework,
    }));
    const extraCases = tp.cases
      .map((c) => `${c.title} ${c.biologicalMechanism} ${c.quantitativeInsight}`)
      .join(" ");
    const extraChecks = tp.checkUnderstanding
      .map((q) => `${q.question} ${q.modelAnswer} ${q.keyTermsToInclude.join(" ")}`)
      .join(" ");

    docs.push(
      createIndexedDoc({
        item: {
          id: `biology-${tp.id}`,
          appId: "biology",
          subjectTitle: "IB Biology SL / HL",
          category: "topic",
          badge: `Bio ${tp.displayCode} · ${tp.level}`,
          title: tp.title.startsWith(tp.displayCode) ? tp.title : `${tp.displayCode} ${tp.title}`,
          subtitle: `${tp.orgLevel} • ${tp.subtitle}`,
          targetId: tp.id,
          viewMode: "focus",
          snippet: tp.summary,
          matchScore: 0,
          formulaLatex: tp.primaryFormulas?.[0],
          tags: [
            "biology",
            "bio",
            tp.displayCode.toLowerCase(),
            tp.orgLevel.toLowerCase(),
            tp.level.toLowerCase(),
            ...tp.checkUnderstanding.flatMap((c) => c.keyTermsToInclude),
          ],
        },
        exactCodes: [tp.displayCode, tp.topicCode, `bio ${tp.displayCode}`],
        subSections: subs,
        coreThesis: tp.analysis?.coreThesis || tp.primer5Min || tp.summary,
        bullets: tp.speedReadBullets,
        formulas: tp.primaryFormulas || [],
        examTip: tp.examPromptTakeaway || tp.examBlueprint?.paper1TrapPattern || "",
        misconceptions: tp.analysis?.commonMisconceptions || tp.examBlueprint?.pitfallsToAvoid || [],
        extraBody: `${tp.primer5Min || ""} ${tp.analysis?.theoreticalFoundations || ""} ${extraCases} ${extraChecks}`,
      })
    );
  });

  BIOLOGY_FORMULAS.forEach((bf) => {
    const matchedTopic = BIOLOGY_TOPICS.find((t) =>
      bf.topicCode.toLowerCase().includes(t.displayCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `biology-formula-${bf.id}`,
          appId: "biology",
          subjectTitle: "IB Biology SL / HL",
          category: "formula",
          badge: `Bio Equation (${bf.topicCode})`,
          title: bf.name,
          subtitle: bf.variables,
          targetId: matchedTopic?.id || "bio-d2-3",
          viewMode: "lexicon",
          snippet: bf.examTip,
          matchScore: 0,
          formulaLatex: bf.latex,
          tags: ["biology", "formula", "equation", bf.name, bf.topicCode, bf.category],
        },
        exactCodes: [bf.topicCode],
        coreThesis: `${bf.name}: ${bf.variables}`,
        bullets: [bf.variables, bf.examTip],
        formulas: [bf.latex],
        examTip: bf.examTip,
      })
    );
  });

  BIOLOGY_GLOSSARY.forEach((bg) => {
    const matchedTopic = BIOLOGY_TOPICS.find((t) =>
      bg.topicRef.toLowerCase().includes(t.displayCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `biology-glossary-${bg.id}`,
          appId: "biology",
          subjectTitle: "IB Biology SL / HL",
          category: "glossary",
          badge: bg.category,
          title: bg.term,
          subtitle: bg.topicRef,
          targetId: matchedTopic?.id || "bio-a1-1",
          viewMode: "lexicon",
          snippet: bg.definition,
          matchScore: 0,
          tags: ["biology", "glossary", bg.term, bg.topicRef],
        },
        exactCodes: [bg.topicRef],
        coreThesis: bg.definition,
        bullets: [bg.definition, bg.examNuance],
        examTip: bg.examNuance,
      })
    );
  });

  // 2. Orwell 1984 (Chapters + Appendix + Quotes)
  ORWELL_CHAPTERS.forEach((ch) => {
    const subs: SubSectionRecord[] = ch.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
    }));
    const quotes: AIQuote[] = ch.quotes.map((qt) => ({
      quote: qt.quote,
      speaker: qt.speaker,
      context: `${ch.displayCode} · ${qt.context}`,
    }));

    docs.push(
      createIndexedDoc({
        item: {
          id: `orwell-${ch.id}`,
          appId: "orwell",
          subjectTitle: "Orwell 1984 Codex",
          category: "topic",
          badge: `1984 · ${ch.displayCode}`,
          title: `${ch.displayCode} — ${ch.title}`,
          subtitle: ch.subtitle,
          targetId: ch.id,
          viewMode: "focus",
          snippet: ch.summary,
          matchScore: 0,
          tags: [
            "1984",
            "orwell",
            "literature",
            "winston",
            ch.displayCode,
            ...(ch.analysis?.motifsAndSymbols || []),
          ],
        },
        exactCodes: [ch.displayCode, ch.id],
        subSections: subs,
        coreThesis: ch.analysis?.thesis || ch.summary,
        bullets: ch.speedReadBullets,
        quotes,
        examTip: ch.examPromptTakeaway,
        extraBody: `${ch.analysis?.sparkNotesSynthesis || ""} ${ch.analysis?.psychologicalArc || ""} ${(ch.analysis?.motifsAndSymbols || []).join(" ")}`,
      })
    );

    ch.quotes.forEach((qt, qIdx) => {
      docs.push(
        createIndexedDoc({
          item: {
            id: `orwell-quote-${ch.id}-${qIdx}`,
            appId: "orwell",
            subjectTitle: "Orwell 1984 Codex",
            category: "quote",
            badge: `Quote · ${ch.displayCode}`,
            title: `"${qt.quote}"`,
            subtitle: `${qt.speaker || "1984"} • ${ch.displayCode}`,
            targetId: ch.id,
            viewMode: "focus",
            snippet: qt.analysis,
            matchScore: 0,
            tags: ["1984", "orwell", "quote", qt.speaker || "", ...qt.themes],
          },
          exactCodes: [ch.displayCode],
          coreThesis: qt.analysis,
          bullets: [qt.analysis, `Context: ${qt.context}`],
          quotes: [{ quote: qt.quote, speaker: qt.speaker, context: qt.context }],
          examTip: ch.examPromptTakeaway,
        })
      );
    });
  });

  // 3. IB Business Management SL / HL (Units 1-5 + BMT + Glossary)
  BUSINESS_TOPICS.forEach((top) => {
    const isBmt = top.unitId === "bmt";
    const subs: SubSectionRecord[] = top.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
      formula: s.keyFormulaOrFramework,
    }));
    const extraCases = top.cases
      .map((c) => `${c.company} ${c.context} ${c.application} ${c.evaluationAO3AO4}`)
      .join(" ");

    docs.push(
      createIndexedDoc({
        item: {
          id: `business-${top.id}`,
          appId: "business",
          subjectTitle: "IB Business Management SL / HL",
          category: isBmt ? "concept" : "topic",
          badge: isBmt ? `BMT · ${top.displayCode}` : `Unit ${top.topicCode}`,
          title: isBmt ? top.title : `Unit ${top.topicCode}: ${top.title}`,
          subtitle: top.subtitle,
          targetId: top.id,
          viewMode: isBmt ? "matrix" : "focus",
          snippet: top.summary,
          matchScore: 0,
          formulaLatex: top.subSections.find((s) => s.keyFormulaOrFramework)?.keyFormulaOrFramework,
          tags: [
            "business",
            "management",
            `unit ${top.topicCode}`,
            top.topicCode,
            top.displayCode,
            ...(top.analysis?.connectedBMTTools || []),
          ],
        },
        exactCodes: [top.topicCode, `unit ${top.topicCode}`, `u${top.topicCode}`, top.displayCode],
        subSections: subs,
        coreThesis: top.analysis?.coreThesis || top.summary,
        bullets: top.speedReadBullets,
        formulas: top.subSections
          .map((s) => s.keyFormulaOrFramework)
          .filter((f): f is string => Boolean(f)),
        examTip: top.examPromptTakeaway || top.analysis?.strategicEvaluationAO3AO4 || "",
        misconceptions: top.analysis?.commonMisconceptions || [],
        extraBody: `${top.analysis?.theoreticalFoundations || ""} ${top.analysis?.strategicEvaluationAO3AO4 || ""} ${extraCases}`,
      })
    );
  });

  // Keep explicit BMT entries for matrix view if not already covered, or skip duplicates
  void BMT_TOPICS;

  BUSINESS_GLOSSARY.forEach((glo, idx) => {
    const matchedTopic = BUSINESS_TOPICS.find((t) =>
      glo.unit.toLowerCase().includes(t.topicCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `business-glo-${idx}`,
          appId: "business",
          subjectTitle: "IB Business Management SL / HL",
          category: "glossary",
          badge: `BM Glossary · ${glo.unit}`,
          title: glo.term,
          subtitle: glo.unit,
          targetId: matchedTopic?.id || "u1-1",
          viewMode: "lexicon",
          snippet: glo.definition,
          matchScore: 0,
          tags: ["business", "glossary", glo.term, glo.unit],
        },
        exactCodes: [glo.unit],
        coreThesis: glo.definition,
        bullets: [glo.definition],
      })
    );
  });

  // 4. IB Economics SL / HL
  ECON_TOPICS.forEach((top) => {
    const subs: SubSectionRecord[] = top.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
      formula: s.keyFormulaOrFramework,
    }));
    const extraCases = top.cases
      .map((c) => `${c.title} ${c.countryOrContext} ${c.realWorldMechanism} ${c.evaluationAO3AO4}`)
      .join(" ");

    docs.push(
      createIndexedDoc({
        item: {
          id: `econ-${top.id}`,
          appId: "economics",
          subjectTitle: "IB Economics SL / HL",
          category: "topic",
          badge: `Econ Unit ${top.topicCode}`,
          title: `Unit ${top.topicCode}: ${top.title}`,
          subtitle: top.subtitle,
          targetId: top.id,
          viewMode: "focus",
          snippet: top.summary,
          matchScore: 0,
          formulaLatex: top.subSections.find((s) => s.keyFormulaOrFramework)?.keyFormulaOrFramework,
          tags: ["economics", "econ", `unit ${top.topicCode}`, top.topicCode, top.displayCode],
        },
        exactCodes: [top.topicCode, `unit ${top.topicCode}`, `u${top.topicCode}`, top.displayCode],
        subSections: subs,
        coreThesis: top.analysis?.coreThesis || top.primer5Min || top.summary,
        bullets: top.speedReadBullets,
        formulas: top.subSections
          .map((s) => s.keyFormulaOrFramework)
          .filter((f): f is string => Boolean(f)),
        examTip: top.examPromptTakeaway || top.analysis?.strategicEvaluationAO3AO4 || "",
        misconceptions: top.analysis?.commonMisconceptions || [],
        extraBody: `${top.primer5Min || ""} ${top.analysis?.theoreticalFoundations || ""} ${top.analysis?.strategicEvaluationAO3AO4 || ""} ${extraCases}`,
      })
    );
  });

  ECON_FORMULAS.forEach((f) => {
    const matchedTopic = ECON_TOPICS.find((t) =>
      f.unit.toLowerCase().includes(t.topicCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `econ-formula-${f.id}`,
          appId: "economics",
          subjectTitle: "IB Economics SL / HL",
          category: "formula",
          badge: `Econ Formula (${f.code})`,
          title: f.name,
          subtitle: f.unit,
          targetId: matchedTopic?.id || "u1-1",
          viewMode: "revision",
          snippet: f.evaluationInterpretation,
          matchScore: 0,
          formulaLatex: f.formula,
          tags: ["economics", "formula", "equation", f.name, f.code, f.unit],
        },
        exactCodes: [f.code, f.unit],
        coreThesis: f.evaluationInterpretation,
        bullets: [f.evaluationInterpretation],
        formulas: [f.formula],
        examTip: f.evaluationInterpretation,
      })
    );
  });

  ECON_CASES.forEach((c) => {
    docs.push(
      createIndexedDoc({
        item: {
          id: `econ-case-${c.id}`,
          appId: "economics",
          subjectTitle: "IB Economics SL / HL",
          category: "concept",
          badge: "Econ Case Study",
          title: c.title,
          subtitle: `${c.countryOrContext} • ${c.yearOrPeriod}`,
          targetId: "u1-1",
          viewMode: "matrix",
          snippet: c.economicMechanism,
          matchScore: 0,
          tags: ["economics", "case study", c.countryOrContext],
        },
        exactCodes: [],
        coreThesis: c.economicMechanism,
        bullets: [c.economicMechanism],
      })
    );
  });

  ECON_GLOSSARY.forEach((glo, idx) => {
    const matchedTopic = ECON_TOPICS.find((t) =>
      glo.unit.toLowerCase().includes(t.topicCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `econ-glo-${idx}`,
          appId: "economics",
          subjectTitle: "IB Economics SL / HL",
          category: "glossary",
          badge: `Econ Glossary · ${glo.unit}`,
          title: glo.term,
          subtitle: glo.unit,
          targetId: matchedTopic?.id || "u1-1",
          viewMode: "lexicon",
          snippet: glo.definition,
          matchScore: 0,
          tags: ["economics", "glossary", glo.term, glo.unit],
        },
        exactCodes: [glo.unit],
        coreThesis: glo.definition,
        bullets: [glo.definition],
      })
    );
  });

  // 5. IB Physics SL / HL
  PHYSICS_TOPICS.forEach((top) => {
    const subs: SubSectionRecord[] = top.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
      formula: s.keyFormulaOrFramework,
    }));
    const extraCases = top.cases
      .map((c) => `${c.title} ${c.physicalMechanism} ${c.quantitativeInsight}`)
      .join(" ");

    docs.push(
      createIndexedDoc({
        item: {
          id: `physics-${top.id}`,
          appId: "physics",
          subjectTitle: "IB Physics SL / HL",
          category: "topic",
          badge: `Physics ${top.displayCode}`,
          title: `${top.displayCode}: ${top.title}`,
          subtitle: top.subtitle,
          targetId: top.id,
          viewMode: "focus",
          snippet: top.summary,
          matchScore: 0,
          formulaLatex: top.primaryFormulas?.[0],
          tags: ["physics", "phys", `theme ${top.topicCode}`, top.topicCode, top.displayCode],
        },
        exactCodes: [top.topicCode, top.displayCode, `theme ${top.topicCode}`],
        subSections: subs,
        coreThesis: top.analysis?.coreThesis || top.primer5Min || top.summary,
        bullets: top.speedReadBullets,
        formulas: top.primaryFormulas || [],
        examTip: top.examPromptTakeaway || top.examBlueprint?.paper1TrapPattern || "",
        misconceptions: top.analysis?.commonMisconceptions || top.examBlueprint?.pitfallsToAvoid || [],
        extraBody: `${top.primer5Min || ""} ${top.analysis?.theoreticalFoundations || ""} ${extraCases}`,
      })
    );
  });

  PHYSICS_FORMULAS.forEach((f) => {
    const matchedTopic = PHYSICS_TOPICS.find((t) =>
      f.topicCode.toLowerCase().includes(t.displayCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `physics-formula-${f.id}`,
          appId: "physics",
          subjectTitle: "IB Physics SL / HL",
          category: "formula",
          badge: `Physics Formula (${f.topicCode})`,
          title: f.name,
          subtitle: f.topicCode,
          targetId: matchedTopic?.id || "u1-2",
          viewMode: "revision",
          snippet: f.examTips,
          matchScore: 0,
          formulaLatex: f.latex,
          tags: ["physics", "formula", "equation", f.name, f.topicCode],
        },
        exactCodes: [f.topicCode],
        coreThesis: `${f.name}: ${f.examTips}`,
        bullets: [f.examTips],
        formulas: [f.latex],
        examTip: f.examTips,
      })
    );
  });

  PHYSICS_GLOSSARY.forEach((glo) => {
    docs.push(
      createIndexedDoc({
        item: {
          id: `physics-glo-${glo.id}`,
          appId: "physics",
          subjectTitle: "IB Physics SL / HL",
          category: "glossary",
          badge: `Physics Glossary · Theme ${glo.themeId}`,
          title: glo.term,
          subtitle: `Theme ${glo.themeId}`,
          targetId: "u1-1",
          viewMode: "lexicon",
          snippet: glo.definition,
          matchScore: 0,
          tags: ["physics", "glossary", glo.term, glo.themeId],
        },
        exactCodes: [glo.themeId],
        coreThesis: glo.definition,
        bullets: [glo.definition],
      })
    );
  });

  // 6. IB German B SL / HL
  ALL_TEXTSORTEN.forEach((ts) => {
    const structureBullets = ts.structureBlueprint.map(
      (b) => `${b.section}: ${b.description}`
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `german-ts-${ts.id}`,
          appId: "german",
          subjectTitle: "IB German B SL / HL",
          category: "textsorten",
          badge: "Textsorten Blueprint",
          title: ts.title,
          subtitle: `${ts.englishTitle} • ${ts.register}`,
          targetId: "sub-1-1",
          viewMode: "textsorten",
          snippet: ts.purpose,
          matchScore: 0,
          tags: ["german", "deutsch", "textsorten", ts.title, ts.englishTitle, ts.register],
        },
        exactCodes: [ts.id],
        coreThesis: `${ts.title} (${ts.englishTitle}) — Register: ${ts.register}. ${ts.purpose}`,
        bullets: [...ts.mandatoryConventions.slice(0, 3), ...structureBullets.slice(0, 2)],
        examTip: ts.criterionCChecklist?.[0] || "Prüfe Register, Anrede und Textsortenkonventionen (Kriterium C).",
        extraBody: `${ts.targetAudience} ${ts.sampleTemplate} ${ts.criterionCChecklist.join(" ")}`,
      })
    );
  });

  REDEMITTEL_DATABASE.forEach((rm) => {
    docs.push(
      createIndexedDoc({
        item: {
          id: `german-rm-${rm.id}`,
          appId: "german",
          subjectTitle: "IB German B SL / HL",
          category: "concept",
          badge: `Redemittel · ${rm.tier}`,
          title: rm.phrase,
          subtitle: `${rm.categoryLabel} • ${rm.englishMeaning}`,
          targetId: "sub-1-1",
          viewMode: "redemittel",
          snippet: rm.exampleSentence,
          matchScore: 0,
          tags: ["german", "deutsch", "redemittel", "idiom", rm.phrase, rm.englishMeaning],
        },
        exactCodes: [],
        coreThesis: `"${rm.phrase}" (${rm.englishMeaning})`,
        bullets: [`Beispiel: ${rm.exampleSentence}`, `Kategorie: ${rm.categoryLabel} (${rm.tier})`],
      })
    );
  });

  GRAMMAR_POINTS.forEach((gr) => {
    const exBullets = gr.examples.map((ex) => `${ex.german} (${ex.english})`);
    docs.push(
      createIndexedDoc({
        item: {
          id: `german-gr-${gr.id}`,
          appId: "german",
          subjectTitle: "IB German B SL / HL",
          category: "concept",
          badge: `Grammatik ${gr.code} · ${gr.cefrLevel}`,
          title: gr.title,
          subtitle: `${gr.englishTitle} • ${gr.categoryTitle}`,
          targetId: "sub-1-1",
          viewMode: "grammatik",
          snippet: `${gr.englishExplanation} — ${gr.ruleExplanation}`,
          matchScore: 0,
          formulaLatex: gr.latexFormula,
          tags: ["german", "deutsch", "grammar", "grammatik", gr.code, gr.title, gr.englishTitle],
        },
        exactCodes: [gr.code],
        coreThesis: `${gr.englishExplanation.replace(/\.+$/, "")}. ${gr.ruleExplanation}`,
        bullets: [gr.whenToUseEnglish, ...exBullets.slice(0, 3)],
        formulas: gr.latexFormula ? [gr.latexFormula] : [],
        examTip: gr.criterionATip,
        misconceptions: gr.commonMistakes,
        extraBody: `${gr.whenToUseEnglish} ${gr.formula} ${gr.commonMistakes.join(" ")}`,
      })
    );
  });

  LITERARY_WORKS.forEach((lit) => {
    const quotes: AIQuote[] = lit.pivotalQuotes.map((q) => ({
      quote: q.quote.replace(/^[„"]|[“"]$/g, ""),
      speaker: q.speakerOrContext,
      context: lit.title,
    }));
    docs.push(
      createIndexedDoc({
        item: {
          id: `german-lit-${lit.id}`,
          appId: "german",
          subjectTitle: "IB German B SL / HL",
          category: "concept",
          badge: `Literatur · ${lit.author}`,
          title: lit.title,
          subtitle: `${lit.author} (${lit.year}) • ${lit.genre}`,
          targetId: "sub-1-1",
          viewMode: "literatur",
          snippet: lit.plotSummary,
          matchScore: 0,
          tags: [
            "german",
            "deutsch",
            "literature",
            "literatur",
            lit.author,
            lit.title,
            ...lit.centralThemes,
          ],
        },
        exactCodes: [],
        coreThesis: lit.plotSummary,
        bullets: [
          ...lit.centralThemes.map((t) => `Thema: ${t}`),
          ...lit.keyCharacters.slice(0, 2).map((c) => `${c.name}: ${c.symbolism}`),
        ],
        quotes,
        examTip: lit.historicalContext,
        extraBody: `${lit.historicalContext} ${lit.keyCharacters.map((c) => `${c.name} ${c.role} ${c.symbolism}`).join(" ")}`,
      })
    );
  });

  GERMAN_SUBTOPICS.forEach((th) => {
    docs.push(
      createIndexedDoc({
        item: {
          id: `german-theme-${th.id}`,
          appId: "german",
          subjectTitle: "IB German B SL / HL",
          category: "topic",
          badge: `IB Theme ${th.displayCode}`,
          title: `${th.displayCode}: ${th.title}`,
          subtitle: th.englishTitle,
          targetId: th.id,
          viewMode: "themen",
          snippet: th.overview,
          matchScore: 0,
          tags: ["german", "deutsch", "theme", th.displayCode, th.title, th.englishTitle],
        },
        exactCodes: [th.displayCode, th.code],
        coreThesis: th.overview,
        bullets: [
          ...th.keyDebates.slice(0, 3),
          ...th.vocabBullets.slice(0, 2).map((v) => `${v.german} (${v.english}): ${v.context}`),
        ],
        examTip: th.culturalSpotlight ? `${th.culturalSpotlight.title} (${th.culturalSpotlight.region}): ${th.culturalSpotlight.description}` : "",
      })
    );
  });

  // 7. IB Geography SL/HL
  GEO_TOPICS.forEach((tp) => {
    const subs: SubSectionRecord[] = tp.subSections.map((s) => ({
      title: s.title,
      content: s.content,
      takeaway: s.analyticalTakeaway,
      formula: s.keyFormulaOrFramework,
    }));
    const extraCases = tp.cases
      .map((c) => `${c.title} ${c.geographicMechanism} ${c.quantitativeInsight}`)
      .join(" ");
    const extraChecks = tp.checkUnderstanding
      .map((q) => `${q.question} ${q.modelAnswer} ${q.keyTermsToInclude.join(" ")}`)
      .join(" ");

    docs.push(
      createIndexedDoc({
        item: {
          id: `geography-${tp.id}`,
          appId: "geography",
          subjectTitle: "IB Geography SL / HL",
          category: "topic",
          badge: `Geo ${tp.displayCode} · ${tp.level}`,
          title: `${tp.displayCode} ${tp.title}`,
          subtitle: `${tp.syllabusRef} • ${tp.subtitle}`,
          targetId: tp.id,
          viewMode: "focus",
          snippet: tp.summary,
          matchScore: 0,
          tags: [
            "geography",
            "geo",
            tp.displayCode.toLowerCase(),
            tp.level.toLowerCase(),
            ...tp.checkUnderstanding.flatMap((c) => c.keyTermsToInclude),
          ],
        },
        exactCodes: [tp.displayCode, tp.topicCode, `geo ${tp.displayCode}`],
        subSections: subs,
        coreThesis: tp.analysis?.coreThesis || tp.primer5Min || tp.summary,
        bullets: tp.speedReadBullets,
        examTip: tp.examPromptTakeaway || tp.examBlueprint?.paper1TrapPattern || "",
        misconceptions: tp.analysis?.commonMisconceptions || tp.examBlueprint?.pitfallsToAvoid || [],
        extraBody: `${tp.primer5Min || ""} ${tp.analysis?.theoreticalFoundations || ""} ${extraCases} ${extraChecks}`,
      })
    );
  });

  GEO_FORMULAS.forEach((gf) => {
    const matchedTopic = GEO_TOPICS.find((t) =>
      gf.topicCode.toLowerCase().includes(t.displayCode.toLowerCase())
    );
    docs.push(
      createIndexedDoc({
        item: {
          id: `geo-formula-${gf.id}`,
          appId: "geography",
          subjectTitle: "IB Geography SL / HL",
          category: "formula",
          badge: `Geo Equation · ${gf.topicCode}`,
          title: gf.name,
          subtitle: gf.category,
          targetId: matchedTopic?.id || "geo-1-1",
          viewMode: "lexicon",
          snippet: `${gf.variables}. Exam Trap: ${gf.examTrap}`,
          matchScore: 0,
          formulaLatex: gf.formula,
          tags: ["geography", "geo", "formula", gf.category.toLowerCase()],
        },
        coreThesis: `${gf.name}: ${gf.variables}`,
        exactCodes: [gf.topicCode, gf.name],
        formulas: [gf.formula],
        examTip: gf.examTrap,
      })
    );
  });

  GEO_GLOSSARY.forEach((gg) => {
    docs.push(
      createIndexedDoc({
        item: {
          id: `geo-glossary-${gg.id}`,
          appId: "geography",
          subjectTitle: "IB Geography SL / HL",
          category: "glossary",
          badge: `Geo Lexicon · ${gg.topicRef}`,
          title: gg.term,
          subtitle: gg.isHLOnly ? "HL Only Term" : "SL / HL Core Term",
          targetId: "geo-1-1",
          viewMode: "lexicon",
          snippet: gg.definition,
          matchScore: 0,
          tags: ["geography", "geo", "glossary", gg.term.toLowerCase()],
        },
        exactCodes: [gg.topicRef, gg.term],
        coreThesis: gg.definition,
      })
    );
  });

  // Compute IDF across all documents
  const df = new Map<string, number>();
  let totalTokens = 0;
  for (const doc of docs) {
    totalTokens += doc.allTokenSet.size;
    doc.allTokenSet.forEach((tok) => {
      df.set(tok, (df.get(tok) || 0) + 1);
    });
  }

  const N = docs.length;
  const idf = new Map<string, number>();
  df.forEach((count, tok) => {
    idf.set(tok, Math.log((N - count + 0.5) / (count + 0.5) + 1));
  });

  cachedIndex = {
    docs,
    idf,
    avgDocLen: totalTokens / Math.max(1, N),
  };

  return cachedIndex;
}

// ---------------------------------------------------------------------------
// 2. Query Understanding: Subject Hint + Intent Classification
// ---------------------------------------------------------------------------

interface ParsedQuery {
  raw: string;
  lower: string;
  subjectHint: AppId | null;
  intent: QueryIntent;
  tokens: string[];
  expandedTokens: string[];
  compareParts: [string, string] | null;
  unitCode: string | null;
}

function detectSubjectHint(q: string): AppId | null {
  if (/\b(bio|biology|osmosis|chemiosmosis|mitosis|meiosis|crispr|enzyme|photosynthesis|respiration|dna|rna|hardy|weinberg|alveoli|nephron)\b/i.test(q)) {
    return "biology";
  }
  if (/\b(1984|orwell|winston|julia|o'brien|obrien|paperweight|doublethink|newspeak|telescreen|room 101|big brother|prole|ministry of truth|ministry of love)\b/i.test(q)) {
    return "orwell";
  }
  if (/\b(business|bm|bmt|swot|ansoff|bcg|stakeholder|operations management|hr|human resource|break-even|breakeven|margin of safety|cash flow|balance sheet|profit and loss|kaizen|lean|maslow|herzberg|taylor)\b/i.test(q)) {
    return "business";
  }
  if (/\b(econ|economics|elasticity|ped|yed|pes|ppc|opportunity cost|gdp|inflation|monetary policy|fiscal policy|macroeconomics|microeconomics|market failure|externality|gini|lorenz|comparative advantage|tariff)\b/i.test(q)) {
    return "economics";
  }
  if (/\b(phys|physics|momentum|impulse|kinematics|newton|projectile|thermodynamics|entropy|ideal gas|carnot|shm|simple harmonic|snell|diffraction|doppler|coulomb|kirchhoff|faraday|half-life|binding energy|photoelectric)\b/i.test(q)) {
    return "physics";
  }
  if (/\b(geo|geography|drainage basin|hydrograph|glocal|glocalization|kof|permafrost|albedo|enso|el nino|unclos|eez|spearman|urban heat island|uhi|wef nexus|salinization|icm|iczm|demographic dividend|dependency ratio)\b/i.test(q)) {
    return "geography";
  }
  if (/\b(german|deutsch|textsorten|textsorte|redemittel|konjunktiv|passiv|kasus|dativ|akkusativ|genitiv|relativsatz|dürrenmatt|duerrenmatt|alte dame|güllen|zachanassian|blog|leserbrief|tagebuch|tagebucheintrag|artikel|rede|vortrag|bericht|rezension|erörterung|eroerterung|broschüre|broschuere)\b/i.test(q)) {
    return "german";
  }
  return null;
}

function parseQuery(rawQuery: string): ParsedQuery {
  const lower = rawQuery.trim().toLowerCase();
  const subjectHint = detectSubjectHint(lower);

  // Extract unit/topic code if present (e.g. "unit 5.1", "D2.3", "A1.1", "G1.1")
  const codeMatch =
    lower.match(/\b(?:unit|u)\s*(\d+\.\d+)\b/i) ||
    lower.match(/\b([a-e]\d+(?:\.\d+)?)\b/i) ||
    lower.match(/\b(\d+\.\d+)\b/);
  const unitCode = codeMatch ? codeMatch[1].toLowerCase() : null;

  // Detect comparison queries
  let compareParts: [string, string] | null = null;
  const vsMatch = lower.match(/(?:compare|contrast|difference between|differences between|distinguish between)?\s*(.+?)\s+(?:vs\.?|versus|and|with|from)\s+(.+)/i);
  const isCompareKeyword = /\b(compare|contrast|difference|differences|distinguish|vs\.?|versus)\b/i.test(lower);
  if (isCompareKeyword && vsMatch) {
    const cleanPart = (p: string) =>
      p
        .replace(/\b(in biology|in physics|in economics|in business|in german|in 1984|the|a|an)\b/gi, "")
        .trim();
    const p1 = cleanPart(vsMatch[1]);
    const p2 = cleanPart(vsMatch[2]);
    if (p1.length >= 2 && p2.length >= 2) {
      compareParts = [p1, p2];
    }
  }

  let intent: QueryIntent = "explain";
  if (compareParts || isCompareKeyword) {
    intent = "compare";
  } else if (/\b(formula|formulas|equation|equations|calculate|calculation|derive|derivation|units)\b/i.test(lower)) {
    intent = "formula";
  } else if (/\b(quote|quotes|soliloquy|dictum|said|evidence)\b/i.test(lower)) {
    intent = "quote";
  } else if (/\b(exam|tip|tips|mark scheme|trap|traps|mistake|mistakes|misconceptions?|pitfalls?|ao3|ao4|evaluate|paper 1|paper 2)\b/i.test(lower)) {
    intent = "exam";
  } else if (/\b(what is|define|definition|meaning of)\b/i.test(lower)) {
    intent = "definition";
  } else if (unitCode && lower.length < 45) {
    intent = "unit";
  }

  const baseTokens = tokenize(lower, true);
  // Fallback if all tokens were stop-words
  const tokens = baseTokens.length > 0 ? baseTokens : tokenize(lower, false);

  const expandedSet = new Set<string>(tokens);
  tokens.forEach((t) => {
    const syns = SYNONYM_MAP[t];
    if (syns) syns.forEach((s) => expandedSet.add(s));
  });

  return {
    raw: rawQuery,
    lower,
    subjectHint,
    intent,
    tokens,
    expandedTokens: Array.from(expandedSet),
    compareParts,
    unitCode,
  };
}

// ---------------------------------------------------------------------------
// 3. BM25 + Field-Weighted Scoring Engine
// ---------------------------------------------------------------------------

function scoreDocument(
  doc: IndexedDocument,
  pq: ParsedQuery,
  index: CorpusIndex,
  overrideTokens?: string[]
): number {
  const queryTokens = overrideTokens || pq.expandedTokens;
  if (queryTokens.length === 0) return 0;

  let score = 0;
  const titleLower = doc.item.title.toLowerCase();
  const subLower = (doc.item.subtitle || "").toLowerCase();
  const snipLower = doc.item.snippet.toLowerCase();

  // Exact phrase / code boosts (only for >= 3 char queries to avoid 1-letter noise like "a")
  if (!overrideTokens && pq.lower.length >= 3) {
    if (titleLower.includes(pq.lower)) score += 120;
    else if (subLower.includes(pq.lower)) score += 70;
    else if (snipLower.includes(pq.lower)) score += 40;
  }

  // Boost German Textsorten when format/textsorte/leserbrief/blog/letter is queried
  if (
    doc.item.category === "textsorten" &&
    /\b(textsorten|textsorte|format|structure|blueprint|leserbrief|brief|blog|artikel|tagebuch|rede|essay|rezension|flyer|interview)\b/i.test(pq.lower)
  ) {
    score += 35;
  }

  if (pq.unitCode) {
    if (doc.exactCodes.some((c) => c === pq.unitCode || c === `unit ${pq.unitCode}` || c === `u${pq.unitCode}`)) {
      score += 180;
    } else if (doc.exactCodes.some((c) => c.includes(pq.unitCode!))) {
      score += 90;
    }
  }

  // Intent-category alignment boost
  if (pq.intent === "formula" && (doc.item.category === "formula" || doc.formulas.length > 0)) {
    score += 22;
  } else if (pq.intent === "quote" && (doc.item.category === "quote" || doc.quotes.length > 0)) {
    score += 25;
  } else if (pq.intent === "definition" && doc.item.category === "glossary") {
    score += 18;
  } else if (pq.intent === "explain" && doc.item.category === "topic") {
    score += 12;
  }

  // BM25-weighted token scoring across fields
  let matchedCoreTokens = 0;
  const coreTokens = overrideTokens || pq.tokens;

  for (const tok of queryTokens) {
    const idf = index.idf.get(tok) ?? 3.5;
    let fieldScore = 0;

    if (doc.codeTokens.includes(tok)) fieldScore += 5.5;
    if (doc.titleTokens.includes(tok)) fieldScore += 4.2;
    if (doc.subSectionTokens.includes(tok)) fieldScore += 3.0;
    if (doc.subtitleTokens.includes(tok)) fieldScore += 2.6;
    if (doc.tagTokens.includes(tok)) fieldScore += 2.2;
    if (doc.snippetTokens.includes(tok)) fieldScore += 1.6;
    if (doc.bodyTokens.includes(tok)) fieldScore += 1.1;

    // Prefix / substring match for partial words (e.g. "chemiosm" -> "chemiosmosis")
    if (fieldScore === 0 && tok.length >= 4) {
      if (doc.titleTokens.some((dt) => dt.startsWith(tok))) fieldScore += 2.8;
      else if (doc.subSectionTokens.some((dt) => dt.startsWith(tok))) fieldScore += 2.0;
      else if (doc.allTokenSet.has(tok) || Array.from(doc.allTokenSet).some((dt) => dt.startsWith(tok))) {
        fieldScore += 1.2;
      }
    }

    // Fuzzy typo fallback for longer tokens
    if (fieldScore === 0 && tok.length >= 5) {
      for (const dt of doc.titleTokens) {
        if (Math.abs(dt.length - tok.length) <= 2 && levenshtein(tok, dt) <= 1) {
          fieldScore += 2.4;
          break;
        }
      }
      if (fieldScore === 0) {
        for (const dt of doc.subSectionTokens) {
          if (Math.abs(dt.length - tok.length) <= 2 && levenshtein(tok, dt) <= 1) {
            fieldScore += 1.6;
            break;
          }
        }
      }
    }

    if (fieldScore > 0) {
      score += fieldScore * idf * 4.5;
      if (coreTokens.includes(tok)) matchedCoreTokens++;
    }
  }

  // Coverage bonus: reward documents that match ALL core query tokens
  if (coreTokens.length > 1 && matchedCoreTokens > 0) {
    const coverage = matchedCoreTokens / coreTokens.length;
    score *= 0.65 + 0.65 * coverage;
  }

  // Title precision bonus: shorter titles where query tokens cover a larger share win over verbose/qualified titles
  if (doc.titleTokens.length > 0 && coreTokens.length > 0) {
    const titleMatches = coreTokens.filter((t) => doc.titleTokens.includes(t)).length;
    if (titleMatches > 0) {
      const titlePrecision = titleMatches / doc.titleTokens.length;
      score += titlePrecision * 28;
    }
  }

  // Filter out weak incidental single-stopword/noise hits
  if (matchedCoreTokens === 0 && score < 25) {
    return 0;
  }

  // Subject hint boost / cross-subject disambiguation (applied after BM25 scoring)
  if (pq.subjectHint) {
    if (doc.item.appId === pq.subjectHint) {
      score += 65;
    } else {
      score *= 0.35;
    }
  }

  return Math.round(score * 10) / 10;
}

// ---------------------------------------------------------------------------
// 4. Dynamic Local AI Synthesis Engine
// ---------------------------------------------------------------------------

function findBestSubSection(doc: IndexedDocument, tokens: string[]): SubSectionRecord | null {
  if (doc.subSections.length === 0 || tokens.length === 0) return null;
  let best: SubSectionRecord | null = null;
  let bestScore = 0;
  for (const sub of doc.subSections) {
    const subLower = `${sub.title} ${sub.content} ${sub.takeaway}`.toLowerCase();
    let s = 0;
    for (const tok of tokens) {
      if (sub.title.toLowerCase().includes(tok)) s += 4;
      if (subLower.includes(tok)) s += 1;
    }
    if (s > bestScore) {
      bestScore = s;
      best = sub;
    }
  }
  return bestScore > 0 ? best : null;
}

function getActionText(doc: IndexedDocument): string {
  switch (doc.item.appId) {
    case "biology":
      return `Open ${doc.item.title} in IB Biology`;
    case "orwell":
      return `Open ${doc.item.badge} in 1984 Codex`;
    case "business":
      return `Jump to ${doc.item.badge} in Business Codex`;
    case "economics":
      return `Open ${doc.item.badge} in Economics Codex`;
    case "physics":
      return `Open ${doc.item.badge} in Physics Codex`;
    case "german":
      return `Open in German B SL / HL Studio`;
    case "geography":
      return `Open ${doc.item.badge} in IB Geography`;
    default:
      return `Open ${doc.item.title}`;
  }
}

function buildFollowUps(doc: IndexedDocument, intent: QueryIntent): string[] {
  const shortTitle = doc.item.title.replace(/^(Unit \d+\.\d+:\s*|[A-E]\d+(?:\.\d+)?\s+)/i, "").split("—")[0].trim();
  const list: string[] = [];
  if (intent !== "exam") {
    list.push(`Exam traps & tips for ${shortTitle}`);
  }
  if (doc.formulas.length > 0 && intent !== "formula") {
    list.push(`Formula for ${shortTitle}`);
  }
  if (doc.quotes.length > 0 && intent !== "quote") {
    list.push(`Key quotes for ${shortTitle}`);
  }
  if (doc.item.appId === "biology") {
    list.push("Compare mitosis and meiosis");
  } else if (doc.item.appId === "physics") {
    list.push("Conservation of momentum formula");
  } else if (doc.item.appId === "economics") {
    list.push("Price elasticity of demand formula");
  } else if (doc.item.appId === "business") {
    list.push("Explain break-even analysis");
  } else if (doc.item.appId === "geography") {
    list.push("Explain WEF nexus trade-offs");
  } else if (doc.item.appId === "orwell") {
    list.push("What does the coral paperweight symbolize in 1984");
  } else if (doc.item.appId === "german") {
    list.push("What is Konjunktiv II in German");
  }
  return list.slice(0, 3);
}

function synthesizeFromRanked(pq: ParsedQuery, ranked: { doc: IndexedDocument; score: number }[]): AIAnswerResult | null {
  if (ranked.length === 0) return null;

  // Minimum relevance threshold to avoid hallucinating on gibberish
  const top = ranked[0];
  if (top.score < 14) return null;

  // Special Case: Comparison Synthesis ("compare X and Y")
  if (pq.intent === "compare" && pq.compareParts) {
    const index = getCorpusIndex();
    const [partA, partB] = pq.compareParts;
    const tokA = tokenize(partA, true);
    const tokB = tokenize(partB, true);

    const scoreFor = (toks: string[]) =>
      index.docs
        .map((d) => ({ doc: d, score: scoreDocument(d, pq, index, toks) }))
        .filter((x) => x.score > 10)
        .sort((a, b) => b.score - a.score);

    const rankedA = scoreFor(tokA);
    const rankedB = scoreFor(tokB);

    const docA = rankedA[0]?.doc;
    const docB = rankedB[0]?.doc;

    if (docA && docB) {
      const capitalizePhrase = (s: string) =>
        s.replace(/\b\w/g, (c) => c.toUpperCase());

      const sameDoc = docA.item.id === docB.item.id;
      let subA = sameDoc ? findBestSubSection(docA, tokA) : null;
      let subB = sameDoc ? findBestSubSection(docB, tokB) : null;

      let labelA = subA ? subA.title : docA.item.title;
      let labelB = subB ? subB.title : docB.item.title;

      let summaryA = subA ? subA.takeaway || subA.content.slice(0, 200) : docA.coreThesis;
      let summaryB = subB ? subB.takeaway || subB.content.slice(0, 200) : docB.coreThesis;

      // If both sides resolved to the exact same doc & subsection (e.g. Mitosis & Meiosis in D2.1),
      // extract term-specific sentences/bullets so we never produce "X vs. X".
      if (sameDoc && labelA === labelB) {
        const capA = capitalizePhrase(partA);
        const capB = capitalizePhrase(partB);
        const pool = [
          ...docA.bullets,
          ...docA.subSections.flatMap((s) => [s.takeaway, ...s.content.split(/(?<=[.!?])\s+/)]),
          docA.coreThesis,
        ].filter((line) => Boolean(line && line.trim().length > 15));

        const pickDistinctLine = (primaryToks: string[], secondaryToks: string[]) => {
          const exclusive = pool.find((line) => {
            const l = line.toLowerCase();
            return primaryToks.some((t) => l.includes(t)) && !secondaryToks.some((t) => l.includes(t));
          });
          if (exclusive) return exclusive.trim();
          const anyMatch = pool.find((line) => primaryToks.some((t) => line.toLowerCase().includes(t)));
          return anyMatch ? anyMatch.trim() : null;
        };

        labelA = capA;
        labelB = capB;
        summaryA = pickDistinctLine(tokA, tokB) || docA.coreThesis;
        summaryB = pickDistinctLine(tokB, tokA) || docA.bullets[0] || docA.examTip || docA.coreThesis;
      }

      const highlights: string[] = [
        `${labelA}: ${summaryA}`,
        `${labelB}: ${summaryB}`,
      ];
      if (docA.bullets[0] && !highlights[0].includes(docA.bullets[0])) {
        highlights.push(`Key Point (${labelA}): ${docA.bullets[0]}`);
      }
      if (docB.bullets[0] && !sameDoc) {
        highlights.push(`Key Point (${labelB}): ${docB.bullets[0]}`);
      } else if (sameDoc && docA.bullets[1]) {
        highlights.push(`Syllabus Detail: ${docA.bullets[1]}`);
      }

      const relatedSources: AIRelatedSource[] = [
        {
          appId: docA.item.appId,
          targetId: docA.item.targetId,
          viewMode: docA.item.viewMode,
          label: `Open ${docA.item.title}`,
        },
      ];
      if (docB.item.targetId !== docA.item.targetId) {
        relatedSources.push({
          appId: docB.item.appId,
          targetId: docB.item.targetId,
          viewMode: docB.item.viewMode,
          label: `Open ${docB.item.title}`,
        });
      }

      return {
        badge: `Local IB Tutor AI · Comparative Analysis`,
        intent: "compare",
        confidenceLabel: "Side-by-Side Syllabus Comparison",
        subjectId: docA.item.appId,
        subjectName: docA.item.subjectTitle,
        title: sameDoc ? `${labelA} vs. ${labelB} (${docA.item.title})` : `${labelA} vs. ${labelB}`,
        subtitle: `${docA.item.subjectTitle} · Comparative Synthesis`,
        summary: `Comparing ${labelA} and ${labelB}: ${summaryA} In contrast, ${summaryB}`,
        highlights: highlights.slice(0, 4),
        keyFormula: docA.formulas[0] || docB.formulas[0],
        examTip: docA.examTip || docB.examTip || undefined,
        followUpQuestions: buildFollowUps(docA, "compare"),
        relatedSources,
        targetId: docA.item.targetId,
        viewMode: docA.item.viewMode,
        actionText: getActionText(docA),
        tags: [docA.item.subjectTitle, "Comparison", docA.item.badge],
      };
    }
  }

  // Standard Single / Multi-Doc Synthesis
  const primary = top.doc;
  const bestSub = findBestSubSection(primary, pq.tokens);

  const intentLabelMap: Record<QueryIntent, string> = {
    explain: "Concept Explanation",
    compare: "Comparative Analysis",
    formula: "Formula & Derivation",
    quote: "Literary Evidence & Quotes",
    exam: "Exam Strategy & Mark Scheme",
    definition: "Syllabus Definition",
    unit: "Direct Unit Notes",
  };

  // Build synthesized summary
  let summary = primary.coreThesis;
  if (pq.intent === "formula" && primary.formulas.length > 0) {
    summary = `${primary.coreThesis} ${bestSub?.takeaway || ""}`.trim();
  } else if (pq.intent === "exam") {
    summary = primary.examTip
      ? `${primary.examTip} ${primary.coreThesis}`
      : primary.coreThesis;
  } else if (bestSub && bestSub.content) {
    const cleanSub = bestSub.content.length > 260 ? bestSub.content.slice(0, 257).trim() + "..." : bestSub.content;
    summary = `${bestSub.title}: ${cleanSub}`;
  }

  // Build highlights
  const highlights: string[] = [];
  if (bestSub?.takeaway) {
    highlights.push(`Key Takeaway (${bestSub.title}): ${bestSub.takeaway}`);
  }
  for (const b of primary.bullets) {
    if (highlights.length >= 4) break;
    if (!highlights.includes(b)) highlights.push(b);
  }
  if (pq.intent === "exam" && primary.misconceptions.length > 0) {
    primary.misconceptions.slice(0, 2).forEach((m) => {
      if (highlights.length < 5) highlights.push(`Common Trap to Avoid: ${m}`);
    });
  }
  if (highlights.length === 0 && primary.item.snippet) {
    highlights.push(primary.item.snippet);
  }

  // Gather quotes if relevant
  let keyQuotes: AIQuote[] | undefined;
  if (primary.quotes.length > 0 && (pq.intent === "quote" || primary.item.appId === "orwell" || primary.item.appId === "german")) {
    keyQuotes = primary.quotes.slice(0, 2);
  }

  // Gather formula if available
  const keyFormula =
    bestSub?.formula ||
    primary.formulas[0] ||
    ranked.slice(1, 3).find((r) => r.doc.item.appId === primary.item.appId && r.doc.formulas.length > 0)?.doc.formulas[0];

  // Gather secondary related source if another high-scoring doc exists
  const relatedSources: AIRelatedSource[] = [
    {
      appId: primary.item.appId,
      targetId: primary.item.targetId,
      viewMode: primary.item.viewMode,
      label: getActionText(primary),
    },
  ];
  const secondary = ranked.find(
    (r) => r.doc.item.targetId !== primary.item.targetId && r.score > top.score * 0.55
  );
  if (secondary) {
    relatedSources.push({
      appId: secondary.doc.item.appId,
      targetId: secondary.doc.item.targetId,
      viewMode: secondary.doc.item.viewMode,
      label: `Related: ${secondary.doc.item.title}`,
    });
  }

  return {
    badge: `Local IB Tutor AI · ${intentLabelMap[pq.intent]}`,
    intent: pq.intent,
    confidenceLabel: top.score > 80 ? "Exact Syllabus Match" : "Semantic Synthesis",
    subjectId: primary.item.appId,
    subjectName: primary.item.subjectTitle,
    title: bestSub && pq.intent !== "unit" ? `${primary.item.title} — ${bestSub.title}` : primary.item.title,
    subtitle: primary.item.subtitle || primary.item.badge,
    summary,
    highlights: highlights.slice(0, 4),
    keyFormula,
    keyQuotes,
    examTip: primary.examTip || primary.misconceptions[0] || undefined,
    followUpQuestions: buildFollowUps(primary, pq.intent),
    relatedSources,
    targetId: primary.item.targetId,
    viewMode: primary.item.viewMode,
    actionText: getActionText(primary),
    tags: [primary.item.subjectTitle, primary.item.badge, intentLabelMap[pq.intent]],
  };
}

export function synthesizeLocalAIAnswer(rawQuery: string): AIAnswerResult | null {
  const q = rawQuery.trim();
  if (!q || q.length < 2) return null;

  const index = getCorpusIndex();
  const pq = parseQuery(q);
  const ranked = index.docs
    .map((doc) => ({ doc, score: scoreDocument(doc, pq, index) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return synthesizeFromRanked(pq, ranked);
}

// ---------------------------------------------------------------------------
// 5. Balanced Multi-Subject Default Preview (Empty Query)
// ---------------------------------------------------------------------------

function getBalancedPreviewItems(docs: IndexedDocument[]): SearchResultItem[] {
  const subjects: AppId[] = ["biology", "orwell", "business", "economics", "physics", "german", "geography"];
  const picked: SearchResultItem[] = [];
  const perSubject = 3;

  // Interleave 3 high-yield items per subject (topics/core items first)
  for (let round = 0; round < perSubject; round++) {
    for (const appId of subjects) {
      const candidates = docs.filter(
        (d) => d.item.appId === appId && (d.item.category === "topic" || d.item.category === "textsorten" || d.item.category === "concept")
      );
      if (candidates[round]) {
        picked.push(candidates[round].item);
      }
    }
  }
  return picked;
}

// ---------------------------------------------------------------------------
// 6. Universal Search Entrypoint
// ---------------------------------------------------------------------------

export function searchUniversalSuite(query: string): UniversalSearchResult {
  const index = getCorpusIndex();
  const q = query.trim();

  if (!q) {
    const preview = getBalancedPreviewItems(index.docs);
    return {
      query,
      aiAnswer: null,
      items: preview,
      totalMatches: index.docs.length,
    };
  }

  const pq = parseQuery(q);
  const ranked = index.docs
    .map((doc) => ({ doc, score: scoreDocument(doc, pq, index) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const aiAnswer = q.length >= 2 ? synthesizeFromRanked(pq, ranked) : null;

  return {
    query,
    aiAnswer,
    items: ranked.slice(0, 30).map((r) => ({
      ...r.doc.item,
      matchScore: r.score,
    })),
    totalMatches: ranked.length,
  };
}
