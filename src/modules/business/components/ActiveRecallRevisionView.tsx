"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GLOSSARY_TERMS,
  FORMULA_BANK,
  THEORISTS_DOSSIER,
  ALL_TOPICS,
  SYLLABUS_UNITS,
  GlossaryTerm,
  FormulaItem,
  TheoristProfile,
  TopicData,
  UnitId,
} from "@/modules/business/data";
import { useStudyStore, FlashcardDeckType } from "@/modules/business/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import {
  Brain,
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  BookOpen,
  Calculator,
  Users,
  Award,
  Filter,
  Eye,
  Layers,
  GraduationCap,
  Zap,
  ArrowRight,
  Wrench,
  AlertCircle,
  HelpCircle,
  Search,
  Building2,
} from "lucide-react";

interface ExamQuestionCard {
  id: string;
  unit: string;
  hlOnly: boolean;
  commandTerm: string;
  marks: number;
  question: string;
  guidance: string;
  modelAnswerStructure: string[];
  keyConcept: string;
}

const HIGH_YIELD_EXAM_QUESTIONS: ExamQuestionCard[] = [
  {
    id: "eq-1",
    unit: "Unit 1",
    hlOnly: false,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "Evaluate whether a rapidly growing private limited company (Ltd) should float on the stock exchange to become a public limited company (PLC).",
    guidance: "Use SLAP evaluation: Stakeholders (founders lose control vs investors gain liquidity), Long-term vs Short-term (immediate growth capital vs quarterly dividend pressure), Assumptions (market receptive to IPO), Priorities.",
    modelAnswerStructure: [
      "Define PLC and contrast with Ltd (separation of ownership and control, prospectus requirements).",
      "Arguments for PLC: Massive permanent equity injection; eliminates debt interest strain; establishes public brand stature; enables major M&A.",
      "Arguments against PLC: Underwriting and legal IPO fees (up to 10% of funds raised); quarterly reporting scrutiny; vulnerability to hostile takeovers; loss of founder vision.",
      "Justified Conclusion: Recommend PLC if capital expenditure needs exceed internal borrowing capacity and founders hold a controlling voting block."
    ],
    keyConcept: "Change & Ethics"
  },
  {
    id: "eq-2",
    unit: "Unit 2",
    hlOnly: false,
    commandTerm: "Discuss (10 marks)",
    marks: 10,
    question: "Discuss the effectiveness of financial versus non-financial rewards in motivating professional software engineers.",
    guidance: "Contrast Taylor's economic man assumptions against Daniel Pink's Drive (Autonomy, Mastery, Purpose) and Herzberg's Hygiene-Motivator framework.",
    modelAnswerStructure: [
      "Define financial (PRP, stock options) vs non-financial rewards (empowerment, flexible hours, hackathons).",
      "Analysis of Financial Rewards: Competitive salaries satisfy Herzberg hygiene needs and attract talent; stock options align with equity, but PRP can cause code quality gaming.",
      "Analysis of Non-Financial Rewards: Pink argues knowledge workers require autonomy over time and technology; mastery drives personal pride; purpose links to mission.",
      "Balanced Synthesis: Base salary must be fair (hygiene), but intrinsic non-financial autonomy drives peak creative productivity."
    ],
    keyConcept: "Creativity"
  },
  {
    id: "eq-3",
    unit: "Unit 3",
    hlOnly: true,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "A manufacturing firm has a Gearing Ratio of 68% and an Acid Test Ratio of 0.65 : 1. Evaluate strategic options available to restore financial solvency.",
    guidance: "High gearing (>50%) and low quick ratio (<1.0) signal severe dual liquidity and solvency crises. Quantitative analysis must drive the strategic recommendation.",
    modelAnswerStructure: [
      "Interpret both metrics: Gearing of 68% means debt heavily finances capital employed; Acid Test of 0.65 indicates severe cash flow deficit to settle supplier bills.",
      "Option 1: Rights Issue (Issue shares to existing owners) to retire debt. Advantage: no interest burden; Disadvantage: share dilution.",
      "Option 2: Sale-and-Leaseback of non-current factories. Advantage: immediate liquid cash infusion; Disadvantage: permanent ongoing lease operating expense.",
      "Option 3: Working capital cycle tightening (extend creditor days, enforce strict debtor credit terms).",
      "Final Justification: Urgent sale-and-leaseback to retire high-interest debt, combined with cash-only customer discounts."
    ],
    keyConcept: "Sustainability"
  },
  {
    id: "eq-4",
    unit: "Unit 4",
    hlOnly: false,
    commandTerm: "Discuss (10 marks)",
    marks: 10,
    question: "Discuss whether an innovative consumer tech startup should adopt Price Skimming or Penetration Pricing when launching a novel smart wearable.",
    guidance: "Evaluate the product's USP, patent defense, brand equity, and target consumer price elasticity of demand (PED).",
    modelAnswerStructure: [
      "Define Price Skimming (high initial price to maximize margin from early adopters) vs Penetration Pricing (low introductory price to capture volume).",
      "Arguments for Skimming: Rapidly recoups R&D expenditure; reinforces premium luxury positioning; early adopters have highly price-inelastic demand.",
      "Arguments for Penetration: Creates network effects; deters copycat competitors from entering; exploits mass production scale economies.",
      "Contextual Decision: If protected by patents and distinctive USP, adopt skimming; if easily imitated by incumbents, adopt penetration to lock in users."
    ],
    keyConcept: "Change"
  },
  {
    id: "eq-5",
    unit: "Unit 5",
    hlOnly: false,
    commandTerm: "Evaluate (10 marks)",
    marks: 10,
    question: "Evaluate whether an established automotive firm should transition from Just-in-Case (JIC) buffer inventories to a Just-in-Time (JIT) lean production system.",
    guidance: "Balance working capital savings and zero warehouse waste against vulnerability to global supply chain bottlenecks and strikes.",
    modelAnswerStructure: [
      "Define JIT (pull production, zero buffer stock) vs JIC (holding safety stock).",
      "Benefits of JIT: Eliminates massive warehouse holding and insurance costs; frees up liquidity; exposes hidden assembly bottlenecks; reduces defect scrap.",
      "Risks of JIT: Zero buffer for supplier delays, dock strikes, or natural disasters; requires multi-skilled flexible workforce and absolute trust in suppliers.",
      "Recommendation: JIT succeeds only with regional tier-1 suppliers and long-term partnership contracts; highly risky with distant international suppliers."
    ],
    keyConcept: "Sustainability & Change"
  },
  {
    id: "eq-6",
    unit: "BMT",
    hlOnly: true,
    commandTerm: "Explain & Evaluate (10 marks)",
    marks: 10,
    question: "Using Critical Path Analysis (CPA), evaluate the usefulness of float time calculations for a project manager overseeing a factory relocation.",
    guidance: "Demonstrate exact distinction between Total Float and Free Float, and explain how critical activities with zero float must be prioritized.",
    modelAnswerStructure: [
      "Define Critical Path (sequence of dependent activities with zero float that dictates minimum project duration).",
      "Explain Float calculations: Total Float = LFT - Duration - EST; Free Float = EST(next) - EST(this) - Duration.",
      "Strategic Value: Allows resource transfers (e.g. moving equipment or labor from non-critical activities with surplus float to bottleneck tasks on the critical path).",
      "Limitations of CPA: Assumes activity durations are deterministic rather than probabilistic; ignores qualitative workforce resistance and supply disruptions."
    ],
    keyConcept: "Change"
  }
];

interface Flashcard {
  id: string;
  deckType: FlashcardDeckType;
  unit: string;
  hlOnly: boolean;
  front: string;
  frontSub: string;
  back: React.ReactNode;
  backTip?: string;
  categoryBadge: string;
}

export const ActiveRecallRevisionView = React.memo(function ActiveRecallRevisionView() {
  const {
    activeFlashcardDeck,
    setActiveFlashcardDeck,
    masteredFlashcards,
    toggleFlashcardMastered,
    resetFlashcardProgress,
    activeTopicId,
    setActiveTopic,
    setViewMode,
  } = useStudyStore();

  const [mainTab, setMainTab] = useState<"entry-tickets" | "flashcards">("entry-tickets");

  // Entry Ticket Summaries state
  const [selectedEntryUnit, setSelectedEntryUnit] = useState<string>("ALL");
  const [entrySearchQuery, setEntrySearchQuery] = useState("");

  const filteredEntryTopics = useMemo(() => {
    return ALL_TOPICS.filter((t) => {
      const matchesUnit =
        selectedEntryUnit === "ALL" ||
        (selectedEntryUnit === "bmt"
          ? t.unitId === "bmt"
          : t.unitId === selectedEntryUnit || t.displayCode.startsWith(selectedEntryUnit));
      const matchesQuery =
        !entrySearchQuery ||
        t.title.toLowerCase().includes(entrySearchQuery.toLowerCase()) ||
        t.displayCode.toLowerCase().includes(entrySearchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(entrySearchQuery.toLowerCase());
      return matchesUnit && matchesQuery;
    });
  }, [selectedEntryUnit, entrySearchQuery]);

  // Flashcards state
  const [selectedFlashcardUnit, setSelectedFlashcardUnit] = useState<string>("ALL");
  const [onlyUnmastered, setOnlyUnmastered] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewFormat, setViewFormat] = useState<"card" | "sheet">("card");

  // Build flashcards dynamically based on active deck
  const allCards = useMemo<Flashcard[]>(() => {
    if (activeFlashcardDeck === "glossary") {
      return GLOSSARY_TERMS.map((g, idx) => ({
        id: `g-${idx}-${g.term.toLowerCase().replace(/\s+/g, "-")}`,
        deckType: "glossary",
        unit: g.unit,
        hlOnly: g.hlOnly,
        front: g.term,
        frontSub: `${g.unit} ${g.hlOnly ? "• HL Only" : "• SL / HL"}`,
        back: (
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
              {g.definition}
            </p>
          </div>
        ),
        backTip: g.examTip,
        categoryBadge: "Glossary Term",
      }));
    }

    if (activeFlashcardDeck === "formulas") {
      return FORMULA_BANK.map((f) => ({
        id: `f-${f.id}`,
        deckType: "formulas",
        unit: f.unit,
        hlOnly: f.hlOnly,
        front: f.name,
        frontSub: `Code: ${f.code} • ${f.unit}`,
        back: (
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm text-sky-300 flex items-center justify-center overflow-x-auto">
              <MathFormula formula={f.formula} displayMode={true} />
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-blue-300">Target Standard: </strong>
              {f.benchmarkGuidance}
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-sky-300">Analytical Meaning: </strong>
              {f.evaluationInterpretation}
            </div>
          </div>
        ),
        backTip: `Worked Example: ${f.workedExample}`,
        categoryBadge: "Quantitative Formula",
      }));
    }

    if (activeFlashcardDeck === "theorists") {
      return THEORISTS_DOSSIER.map((t) => ({
        id: `t-${t.id}`,
        deckType: "theorists",
        unit: t.unit,
        hlOnly: false,
        front: t.name,
        frontSub: `${t.schoolOrTheory} • ${t.unit}`,
        back: (
          <div className="space-y-2.5">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-400/25 text-xs text-purple-200 font-mono">
              <span className="font-bold">Core Paradigm: </span>
              {t.coreModel}
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <span className="text-[11px] font-mono text-slate-400 block">
                KEY ASSUMPTIONS:
              </span>
              {t.keyAssumptions.map((a, aIdx) => (
                <div key={aIdx} className="pl-2 border-l border-white/10">
                  • {a}
                </div>
              ))}
            </div>
          </div>
        ),
        backTip: `AO3 Evaluation: ${t.evaluationAO3}`,
        categoryBadge: "Theorist & Model",
      }));
    }

    // Exam Questions Deck
    return HIGH_YIELD_EXAM_QUESTIONS.map((q) => ({
      id: q.id,
      deckType: "exam-questions",
      unit: q.unit,
      hlOnly: q.hlOnly,
      front: q.question,
      frontSub: `${q.commandTerm} • Concept: ${q.keyConcept}`,
      back: (
        <div className="space-y-2.5">
          <div className="text-xs font-mono text-blue-300 font-bold mb-1">
            MODEL ANSWER STRUCTURE:
          </div>
          <div className="space-y-1.5 text-xs text-slate-200">
            {q.modelAnswerStructure.map((step, sIdx) => (
              <div key={sIdx} className="p-2 rounded-xl bg-white/[0.04] border border-white/5 pl-3">
                <span className="font-mono text-sky-400 font-bold mr-1.5">
                  Step {sIdx + 1}:
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      ),
      backTip: `Mark Scheme Pointer: ${q.guidance}`,
      categoryBadge: "Exam Question Drill",
    }));
  }, [activeFlashcardDeck]);

  // Filter cards by unit and unmastered toggle
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      if (selectedFlashcardUnit !== "ALL") {
        if (!card.unit.startsWith(selectedFlashcardUnit)) return false;
      }
      if (onlyUnmastered && masteredFlashcards[card.id]) {
        return false;
      }
      return true;
    });
  }, [allCards, selectedFlashcardUnit, onlyUnmastered, masteredFlashcards]);

  // Reset index when deck or filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [activeFlashcardDeck, selectedFlashcardUnit, onlyUnmastered]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];
  const isMastered = currentCard ? !!masteredFlashcards[currentCard.id] : false;

  const totalMasteredInDeck = useMemo(() => {
    return allCards.filter((c) => !!masteredFlashcards[c.id]).length;
  }, [allCards, masteredFlashcards]);

  const progressPercent = Math.round(
    (totalMasteredInDeck / (allCards.length || 1)) * 100
  );

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  }, [currentIndex, filteredCards.length]);

  const handleToggleMastered = () => {
    if (currentCard) {
      toggleFlashcardMastered(currentCard.id);
      handleNext();
    }
  };

  const handleOpenTopic = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("stream");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-indigo-950/40 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>IB Business Management Revision &amp; Lesson Warmup Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Revise &amp; Master
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Review high-yield lesson entry ticket summaries, quantitative decision tools, teacher discussion prompts, and corporate traps. Switch seamlessly into active recall flashcards to drill definitions, ratios, and theorists.
        </p>

        {/* Top-Level Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={() => setMainTab("entry-tickets")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              mainTab === "entry-tickets"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Entry Ticket Summaries</span>
          </button>

          <button
            onClick={() => setMainTab("flashcards")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              mainTab === "flashcards"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Flashcards / Active Recall ({allCards.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          MODE 1: ENTRY TICKET SUMMARIES (LESSON WARMUPS)
          =================================================================== */}
      {mainTab === "entry-tickets" && (
        <div className="space-y-6">
          {/* Unit selector tabs across the top & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedEntryUnit("ALL")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedEntryUnit === "ALL"
                    ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/30"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                All Units ({ALL_TOPICS.length})
              </button>
              {SYLLABUS_UNITS.map((unit) => {
                const count = unit.topics.length;
                const shortLabel = unit.title.split(":")[0];
                return (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedEntryUnit(unit.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      selectedEntryUnit === unit.id
                        ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/30"
                        : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {shortLabel} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={entrySearchQuery}
                onChange={(e) => setEntrySearchQuery(e.target.value)}
                placeholder="Filter subunits or tools..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Subunit Bento Cards Grid */}
          <div className="space-y-6">
            {filteredEntryTopics.map((topic) => {
              const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
              const discussionPrompt =
                topic.examPromptTakeaway ||
                `How do decisions in ${topic.title} create strategic friction between shareholders and internal stakeholders?`;
              const traps =
                topic.analysis.commonMisconceptions.length > 0
                  ? topic.analysis.commonMisconceptions
                  : ["Confusing short-term cash flow with long-term accounting profitability."];

              return (
                <div
                  key={topic.id}
                  className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6 hover:border-blue-500/30 transition-all duration-300"
                >
                  {/* Subunit Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          {topic.displayCode}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10">
                          {unit?.title.split(":")[0] || `Unit ${topic.unitNumber}`}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/25">
                          {topic.level}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30">
                          <Zap className="w-3 h-3 text-amber-400" />
                          60s Warmup
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {topic.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 italic">
                        {topic.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenTopic(topic.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-blue-600 hover:text-white text-slate-300 text-xs font-semibold border border-white/10 hover:border-blue-400 cursor-pointer transition-all shrink-0 self-start sm:self-center"
                    >
                      <span>Study Full Topic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Bento Panels Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Panel 1: 60-Second Core Takeaway */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>60-Second Core Takeaway (Warmup)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {topic.summary}
                      </p>
                      {topic.speedReadBullets.length > 0 && (
                        <div className="pt-2 border-t border-white/5 space-y-1.5">
                          {topic.speedReadBullets.slice(0, 2).map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Panel 2: Key Formulas & Decision Tools */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
                        <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Key Formulas &amp; Decision Tools</span>
                      </div>
                      {topic.analysis.connectedBMTTools.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                            Connected BMT Frameworks:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.analysis.connectedBMTTools.map((tool, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-xl text-xs font-mono bg-blue-500/15 text-blue-200 border border-blue-400/25"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {topic.subSections[0]?.keyFormulaOrFramework ? (
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-blue-500/20 text-xs font-mono text-blue-300 space-y-1">
                          <span className="font-bold text-slate-400 block text-[10px] uppercase">
                            Primary Quantitative Formula / Framework:
                          </span>
                          <span>{topic.subSections[0].keyFormulaOrFramework}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Qualitative strategic evaluation models and stakeholder matrices drive this topic.
                        </p>
                      )}
                    </div>

                    {/* Panel 3: Teacher Will Ask / Discussion Points */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                          <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>Teacher Will Ask / Discussion</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/25">
                          AO3 Evaluation
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        &ldquo;{discussionPrompt}&rdquo;
                      </p>
                      {topic.analysis.coreThesis && (
                        <div className="pt-2 border-t border-white/5 text-xs text-purple-200/90 leading-relaxed">
                          <span className="font-bold text-purple-300">Strategic Angle: </span>
                          {topic.analysis.coreThesis}
                        </div>
                      )}
                    </div>

                    {/* Panel 4: Common Student Traps & Misconceptions */}
                    <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Common Student Traps &amp; Misconceptions</span>
                      </div>
                      <div className="space-y-2">
                        {traps.slice(0, 2).map((misc, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-rose-200/90 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                            <span>{misc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-rose-500/10 text-xs text-slate-400">
                        <strong className="text-rose-300">Exam Reminder: </strong>
                        Always ground theoretical claims in context and provide explicit short vs long-term tradeoffs.
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          MODE 2: FLASHCARDS / ACTIVE RECALL
          =================================================================== */}
      {mainTab === "flashcards" && (
        <div className="space-y-6">
          {/* Deck Switcher Subtabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                id: "glossary",
                label: "Key Terms Dossier",
                icon: BookOpen,
                count: GLOSSARY_TERMS.length,
              },
              {
                id: "formulas",
                label: "Quantitative Bank",
                icon: Calculator,
                count: FORMULA_BANK.length,
              },
              {
                id: "theorists",
                label: "Theorists Matrix",
                icon: Users,
                count: THEORISTS_DOSSIER.length,
              },
              {
                id: "exam-questions",
                label: "High-Yield Questions",
                icon: Award,
                count: HIGH_YIELD_EXAM_QUESTIONS.length,
              },
            ].map((deck) => {
              const Icon = deck.icon;
              const isActive = activeFlashcardDeck === deck.id;
              return (
                <button
                  key={deck.id}
                  onClick={() => setActiveFlashcardDeck(deck.id as FlashcardDeckType)}
                  className={`flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-blue-600/20 border-blue-400 text-white shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                    <span className="text-xs font-bold">{deck.label}</span>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 mt-1 sm:mt-0">
                    {deck.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unit Filters & Progress Bar */}
          <div className="liquid-glass-bento rounded-3xl p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Unit:</span>
              </span>
              {["ALL", "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "BMT"].map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedFlashcardUnit(u)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedFlashcardUnit === u
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyUnmastered}
                  onChange={(e) => setOnlyUnmastered(e.target.checked)}
                  className="rounded border-white/20 bg-black/40 text-blue-600 focus:ring-blue-500"
                />
                <span>Only Unmastered</span>
              </label>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
                <button
                  onClick={() => setViewFormat("card")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                    viewFormat === "card" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setViewFormat("sheet")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                    viewFormat === "sheet" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Card Presentation View */}
          {viewFormat === "card" && currentCard && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[340px] rounded-3xl p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-blue-500/40 transition-all select-none relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-white/10 text-blue-300 border border-blue-500/30">
                      {currentCard.categoryBadge}
                    </span>
                    <span className="text-slate-300 font-mono">{currentCard.frontSub}</span>
                  </div>
                  <span className="font-mono text-blue-400">
                    {currentIndex + 1} of {filteredCards.length}
                  </span>
                </div>

                <div className="my-auto py-6 text-center space-y-4">
                  {!isFlipped ? (
                    <>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        QUESTION / PROMPT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {currentCard.front}
                      </h3>
                      <p className="text-xs text-slate-400 pt-2">
                        (Click card to reveal model definition &amp; guidance)
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                        MODEL ANSWER &amp; GUIDANCE
                      </span>
                      <div className="text-left py-2">{currentCard.back}</div>
                      {currentCard.backTip && (
                        <p className="text-xs text-slate-400 italic pt-2">
                          Tip: {currentCard.backTip}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
                  <span className="text-[11px] text-slate-500">
                    {isFlipped ? "Answer revealed" : "Click to flip"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMastered();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                      isMastered
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-white/[0.05] text-slate-400 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? "Mastered" : "Mark Mastered"}</span>
                  </button>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-bold cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-lg shadow-blue-600/25"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Sheet View */}
          {viewFormat === "sheet" && (
            <div className="space-y-3">
              {filteredCards.map((card, idx) => {
                const mastered = !!masteredFlashcards[card.id];
                return (
                  <div
                    key={card.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      mastered
                        ? "bg-emerald-950/15 border-emerald-500/30"
                        : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 mr-2">
                          #{idx + 1} • {card.unit}
                        </span>
                        <h4 className="text-base font-bold text-white inline-block mt-1">
                          {card.front}
                        </h4>
                      </div>
                      <button
                        onClick={() => toggleFlashcardMastered(card.id)}
                        className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                          mastered
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-white/[0.04] text-slate-400 hover:text-white border-white/10"
                        }`}
                      >
                        {mastered ? "Mastered" : "Unmastered"}
                      </button>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 pl-2 border-l-2 border-blue-500/30">
                      {card.back}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default ActiveRecallRevisionView;
