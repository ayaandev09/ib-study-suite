"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GLOSSARY_TERMS,
  FORMULA_BANK,
  KEY_CONCEPTS,
  DIAGRAMS_DOSSIER,
  HIGH_YIELD_EXAM_QUESTIONS,
  SYLLABUS_UNITS,
  GlossaryTerm,
  FormulaItem,
  DiagramDossier,
  UnitId,
  TopicData,
  ALL_TOPICS,
  ExamQuestionCard,
} from "@/modules/economics/data";
import { useStudyStore, FlashcardDeckType } from "@/modules/economics/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { InteractiveDiagram } from "./InteractiveDiagram";
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
  Layers,
  GraduationCap,
  Zap,
  Filter,
  Eye,
  FileText,
  Compass,
  ArrowRight,
  Search,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Target,
} from "lucide-react";

interface FlashcardItem {
  id: string;
  deck: FlashcardDeckType;
  title: string;
  badge: string;
  badgeColor: string;
  frontPrompt: string;
  frontSubtext?: string;
  backContent: React.ReactNode;
  unit: string;
  diagramRef?: string;
}

export const ActiveRecallRevisionView: React.FC = () => {
  const {
    activeFlashcardDeck,
    setActiveFlashcardDeck,
    masteredFlashcards,
    toggleFlashcardMastered,
    resetFlashcardProgress,
    setActiveTopic,
    setViewMode,
  } = useStudyStore();

  const [mainTab, setMainTab] = useState<"entry-tickets" | "flashcards">("entry-tickets");

  // Entry Ticket Summaries state
  const [selectedEntryUnit, setSelectedEntryUnit] = useState<string>("all");
  const [entrySearchQuery, setEntrySearchQuery] = useState("");

  const filteredEntryTopics = useMemo(() => {
    return ALL_TOPICS.filter((t) => {
      const matchesUnit = selectedEntryUnit === "all" || t.unitId === selectedEntryUnit;
      const matchesQuery =
        !entrySearchQuery ||
        t.title.toLowerCase().includes(entrySearchQuery.toLowerCase()) ||
        t.displayCode.toLowerCase().includes(entrySearchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(entrySearchQuery.toLowerCase());
      return matchesUnit && matchesQuery;
    });
  }, [selectedEntryUnit, entrySearchQuery]);

  // Flashcards state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [viewModeState, setViewModeState] = useState<"card" | "sheet">("card");

  // Compile deck items based on active deck
  const rawDeckItems: FlashcardItem[] = useMemo(() => {
    switch (activeFlashcardDeck) {
      case "diagrams":
        return DIAGRAMS_DOSSIER.map((d) => ({
          id: `fc-diag-${d.id}`,
          deck: "diagrams" as FlashcardDeckType,
          title: d.title,
          badge: d.code,
          badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/30",
          frontPrompt: `Draw and explain the ${d.title}. What are the axes labels, initial curves, and key welfare areas?`,
          frontSubtext: `Category: ${d.category} | Y-axis: ${d.yAxisLabel} | X-axis: ${d.xAxisLabel}`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-300 block mb-1">
                  Step-by-Step Drawing Guide:
                </span>
                <ol className="text-xs text-slate-200 space-y-1 list-decimal list-inside font-sans">
                  {d.drawingSteps.slice(0, 5).map((step, sIdx) => (
                    <li key={sIdx}>{step.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                <strong className="text-purple-300">Exam Analysis:</strong> {d.examAnalysis}
              </div>
              {d.id && (
                <div className="mt-2">
                  <InteractiveDiagram diagramId={d.id} compact />
                </div>
              )}
            </div>
          ),
          unit: d.unitId,
          diagramRef: d.id,
        }));

      case "formulas":
        return FORMULA_BANK.map((f) => ({
          id: `fc-form-${f.id}`,
          deck: "formulas" as FlashcardDeckType,
          title: f.name,
          badge: f.code,
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          frontPrompt: `State the mathematical formula and benchmark interpretation for: ${f.name}`,
          frontSubtext: `${f.unit} Calculation Toolkit`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-center">
                <MathFormula math={f.formula} block />
              </div>
              <div className="text-sm text-slate-200 leading-relaxed">
                <strong className="text-emerald-300 font-mono">Benchmarks:</strong> {f.benchmarkGuidance}
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-sm text-slate-200 leading-relaxed">
                <strong className="text-sky-300 font-mono">Worked Example:</strong> {f.workedExample}
              </div>
            </div>
          ),
          unit: f.unit,
        }));

      case "glossary":
        return GLOSSARY_TERMS.map((g) => ({
          id: `fc-term-${g.term.toLowerCase().replace(/\s+/g, "-")}`,
          deck: "glossary" as FlashcardDeckType,
          title: g.term,
          badge: g.unit,
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          frontPrompt: `Define the IB syllabus term: "${g.term}"`,
          frontSubtext: `Unit: ${g.unit}`,
          backContent: (
            <div className="space-y-3.5 text-left">
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 text-sm sm:text-base text-slate-100 leading-relaxed">
                <strong className="text-purple-300 font-mono block mb-1.5 text-xs sm:text-sm uppercase font-bold">
                  Authoritative Definition:
                </strong>
                {g.definition}
              </div>
              <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-sm text-sky-100 leading-relaxed">
                <strong className="text-sky-300 font-bold">Exam Tip:</strong> {g.examTip}
              </div>
            </div>
          ),
          unit: g.unit,
        }));

      case "concepts":
        return KEY_CONCEPTS.map((c) => ({
          id: `fc-concept-${c.id}`,
          deck: "concepts" as FlashcardDeckType,
          title: c.name,
          badge: c.shortName,
          badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
          frontPrompt: `Explain the IB Economics key concept: "${c.name}". How does it manifest across micro and macro?`,
          frontSubtext: `Key Concept Framework`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-sm text-slate-100 leading-relaxed">
                <strong className="text-indigo-300 font-mono block mb-1 text-xs uppercase">
                  Core Mechanism:
                </strong>
                {c.coreMechanism}
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-slate-300">
                <strong className="text-sky-300 font-bold">Paper 1 Essay Tip:</strong> {c.examTips}
              </div>
            </div>
          ),
          unit: "All Units",
        }));

      case "exam-questions":
      default:
        return HIGH_YIELD_EXAM_QUESTIONS.map((q) => ({
          id: `fc-exam-${q.id}`,
          deck: "exam-questions" as FlashcardDeckType,
          title: q.commandTerm,
          badge: `${q.marks} Marks`,
          badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
          frontPrompt: q.question,
          frontSubtext: `${q.commandTerm} • Concept: ${q.keyConcept}`,
          backContent: (
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
                <strong className="text-rose-300 font-bold block mb-1">
                  Mark Scheme &amp; Command Term Directive:
                </strong>
                {q.guidance}
              </div>
              <div className="space-y-1.5 text-xs text-slate-200">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                  Exemplar Answer Architecture:
                </span>
                {q.modelAnswerStructure.map((step, sIdx) => (
                  <div key={sIdx} className="p-2 rounded-xl bg-slate-900 border border-white/5 pl-2.5">
                    <strong className="text-sky-300">Step {sIdx + 1}:</strong> {step}
                  </div>
                ))}
              </div>
            </div>
          ),
          unit: q.unit,
        }));
    }
  }, [activeFlashcardDeck]);

  // Filter items by unit
  const filteredFlashcards = useMemo(() => {
    if (unitFilter === "all") return rawDeckItems;
    return rawDeckItems.filter(
      (item) =>
        item.unit.toLowerCase().includes(unitFilter.toLowerCase()) ||
        (unitFilter === "unit-1" && item.unit.includes("1")) ||
        (unitFilter === "unit-2" && item.unit.includes("2")) ||
        (unitFilter === "unit-3" && item.unit.includes("3")) ||
        (unitFilter === "unit-4" && item.unit.includes("4"))
    );
  }, [rawDeckItems, unitFilter]);

  const currentFlashcard = filteredFlashcards[currentIndex] || filteredFlashcards[0];
  const isMastered = currentFlashcard ? !!masteredFlashcards[currentFlashcard.id] : false;

  useEffect(() => {
    if (currentIndex >= filteredFlashcards.length && filteredFlashcards.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredFlashcards.length, currentIndex]);

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };

  const handleOpenTopic = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("stream");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sky-950/40 via-slate-900/80 to-blue-950/40 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
          <Sparkles className="w-4 h-4" />
          <span>IB Economics Revision &amp; Lesson Warmup Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Revise &amp; Master
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Quickly review high-yield lesson entry ticket summaries, diagrammatic models, teacher talking points, and market traps. Switch easily into active recall flashcards to drill definitions, formulas, and 15-mark essay blueprints.
        </p>

        {/* Top-Level Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={() => setMainTab("entry-tickets")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              mainTab === "entry-tickets"
                ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 font-bold"
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
                ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 font-bold"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Flashcards / Active Recall ({rawDeckItems.length})</span>
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
                onClick={() => setSelectedEntryUnit("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedEntryUnit === "all"
                    ? "bg-sky-500 text-slate-950 font-bold shadow-sm shadow-sky-500/30"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                All Units ({ALL_TOPICS.length})
              </button>
              {SYLLABUS_UNITS.map((unit) => {
                const count = unit.topics.length;
                const shortTitle = unit.title.replace("Unit ", "U");
                return (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedEntryUnit(unit.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      selectedEntryUnit === unit.id
                        ? "bg-sky-500 text-slate-950 font-bold shadow-sm shadow-sky-500/30"
                        : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {shortTitle.split(":")[0]}: {unit.subtitle.split(",")[0]} ({count})
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
                placeholder="Filter subunits or diagrams..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          {/* Subunit Bento Cards Grid */}
          <div className="space-y-6">
            {filteredEntryTopics.map((topic) => {
              const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
              const discussionPrompt =
                topic.examBlueprint.paper1EssayPrompt ||
                topic.checkUnderstanding[0]?.question ||
                `Evaluate the market and welfare consequences of government intervention in ${topic.title}.`;
              const traps =
                topic.analysis.commonMisconceptions.length > 0
                  ? topic.analysis.commonMisconceptions
                  : ["Confusing a shift of the demand/supply curve with a movement along the curve."];

              return (
                <div
                  key={topic.id}
                  className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6 hover:border-sky-500/30 transition-all duration-300"
                >
                  {/* Subunit Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                          {topic.displayCode}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10">
                          Unit {topic.unitNumber} • {unit?.title.split(":")[1]?.trim() || "Economics"}
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-sky-500 hover:text-slate-950 text-slate-300 text-xs font-semibold border border-white/10 hover:border-sky-400 cursor-pointer transition-all shrink-0 self-start sm:self-center"
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
                      {topic.subSections[0]?.analyticalTakeaway && (
                        <div className="pt-2 border-t border-white/5 text-xs text-slate-300 leading-relaxed">
                          <span className="text-amber-400 font-bold">Key Analytical Principle: </span>
                          {topic.subSections[0].analyticalTakeaway}
                        </div>
                      )}
                    </div>

                    {/* Panel 2: Key Formulas, Diagrams & Quantitative Models */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
                        <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>Key Diagrams &amp; Quantitative Models</span>
                      </div>
                      {topic.analysis.keyDiagrams.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                            Core Syllabus Diagrams:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.analysis.keyDiagrams.map((diag, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-xl text-xs font-mono bg-sky-500/15 text-sky-200 border border-sky-400/25"
                              >
                                {diag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {topic.subSections[0]?.keyFormulaOrFramework ? (
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-sky-500/20 text-xs font-mono text-sky-300">
                          <span className="font-bold text-slate-400 block text-[10px] uppercase mb-1">
                            Formula / Model Definition:
                          </span>
                          <MathFormula math={topic.subSections[0].keyFormulaOrFramework} block={false} />
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Equilibrium analysis and social surplus welfare calculations govern this topic.
                        </p>
                      )}
                    </div>

                    {/* Panel 3: Teacher Will Ask / Discussion Points */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>Teacher Will Ask / Discussion</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/25">
                          {topic.examBlueprint.commandTerm || "Evaluate"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        &ldquo;{discussionPrompt}&rdquo;
                      </p>
                      {topic.analysis.coreThesis && (
                        <div className="pt-2 border-t border-white/5 text-xs text-indigo-200/90 leading-relaxed">
                          <span className="font-bold text-indigo-300">Evaluation Stance: </span>
                          {topic.analysis.coreThesis}
                        </div>
                      )}
                    </div>

                    {/* Panel 4: Common Student Traps & Misconceptions */}
                    <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Common Student Traps &amp; Misconceptions</span>
                      </div>
                      <div className="space-y-2">
                        {traps.slice(0, 2).map((misc, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-rose-200/90 leading-relaxed">
                            <Target className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{misc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-rose-500/10 text-xs text-slate-400">
                        <strong className="text-rose-300">Exam Reminder: </strong>
                        Always explicitly define axes, label initial vs new equilibriums (e.g. P1, Q1 to P2, Q2), and state welfare loss areas.
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { id: "diagrams", label: "Diagrams", icon: Layers, count: DIAGRAMS_DOSSIER.length },
              { id: "formulas", label: "Formulas", icon: Calculator, count: FORMULA_BANK.length },
              { id: "glossary", label: "Glossary", icon: BookOpen, count: GLOSSARY_TERMS.length },
              { id: "concepts", label: "Concepts", icon: Compass, count: KEY_CONCEPTS.length },
              { id: "exam-questions", label: "Exam Questions", icon: FileText, count: HIGH_YIELD_EXAM_QUESTIONS.length },
            ].map((deck) => {
              const Icon = deck.icon;
              const isActive = activeFlashcardDeck === deck.id;
              return (
                <button
                  key={deck.id}
                  onClick={() => {
                    setActiveFlashcardDeck(deck.id as FlashcardDeckType);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    setUnitFilter("all");
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_-5px_rgba(14,165,233,0.4)]"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                    <span className="text-xs font-bold">{deck.label}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {deck.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unit Filters */}
          <div className="liquid-glass-bento rounded-3xl p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Unit:</span>
              </span>
              {[
                { id: "all", label: "All Units" },
                { id: "unit-1", label: "Unit 1" },
                { id: "unit-2", label: "Unit 2" },
                { id: "unit-3", label: "Unit 3" },
                { id: "unit-4", label: "Unit 4" },
              ].map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setUnitFilter(u.id);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    unitFilter === u.id
                      ? "bg-sky-500 text-slate-950 font-bold"
                      : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
              <button
                onClick={() => setViewModeState("card")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                  viewModeState === "card" ? "bg-sky-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setViewModeState("sheet")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                  viewModeState === "sheet" ? "bg-sky-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Sheet
              </button>
            </div>
          </div>

          {/* Flashcard Presentation Card */}
          {viewModeState === "card" && currentFlashcard && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[340px] rounded-3xl p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-sky-500/40 transition-all select-none relative overflow-hidden"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs border ${currentFlashcard.badgeColor}`}>
                      {currentFlashcard.badge}
                    </span>
                    <span className="text-slate-300 font-mono text-xs">{currentFlashcard.frontSubtext}</span>
                  </div>
                  <span className="font-mono text-sky-400">
                    {currentIndex + 1} of {filteredFlashcards.length}
                  </span>
                </div>

                <div className="my-auto py-6 text-center space-y-4">
                  {!isFlipped ? (
                    <>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        QUESTION / PROMPT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                        {currentFlashcard.frontPrompt}
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
                      <div className="py-2">{currentFlashcard.backContent}</div>
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
                      toggleFlashcardMastered(currentFlashcard.id);
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
                  onClick={handlePrevCard}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-xs font-bold cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNextCard}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold cursor-pointer transition-all shadow-lg shadow-sky-500/25"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Sheet View */}
          {viewModeState === "sheet" && (
            <div className="space-y-3">
              {filteredFlashcards.map((card, idx) => {
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
                          {card.frontPrompt}
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
                    <div className="text-xs sm:text-sm text-slate-300 pl-2 border-l-2 border-sky-500/30">
                      {card.backContent}
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
};

export default ActiveRecallRevisionView;
