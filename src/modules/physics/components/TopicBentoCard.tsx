"use client";

import React, { useState, useMemo } from "react";
import {
  TopicData,
  PHYSICS_CONCEPTS,
  SYLLABUS_UNITS,
  PhysicsConceptId,
} from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { RecallFlipCard } from "@/modules/physics/components/RecallFlipCard";
import { AcademicNotesSurface } from "@/modules/physics/components/AcademicNotesSurface";
import { InteractiveDiagram } from "@/modules/physics/components/InteractiveDiagram";
import { MathFormula } from "@/modules/physics/components/MathFormula";
import { MathText } from "@/modules/physics/components/MathText";
import {
  GraduationCap,
  Zap,
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  Globe2,
  BookOpen,
  Calculator,
  Flame,
  ArrowRight,
  Atom,
  ShieldAlert,
  StickyNote,
  Compass,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

const STRATEGIC_BADGE_STYLES: Record<string, string> = {
  "CORE MECHANICS FOUNDATION": "bg-sky-500/15 text-sky-300 border-sky-400/35",
  "HIGH-YIELD THERMODYNAMICS": "bg-indigo-500/15 text-indigo-300 border-indigo-400/35",
  "HIGH-YIELD CLIMATE PHYSICS": "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
  "HIGH-YIELD CIRCUIT DYNAMICS": "bg-indigo-500/15 text-indigo-300 border-indigo-400/35",
  "WAVE PHENOMENA ESSENTIAL": "bg-indigo-500/15 text-indigo-300 border-indigo-400/35",
  "FIELDS & FORCES CORNERSTONE": "bg-purple-500/15 text-purple-300 border-purple-400/35",
  "NUCLEAR & QUANTUM CORE": "bg-rose-500/20 text-rose-300 border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.25)]",
  "PAPER 1 CALCULATION HOTSPOT": "bg-blue-500/20 text-blue-300 border-blue-400/40",
  "PAPER 2 DATA RESPONSE": "bg-teal-500/20 text-teal-300 border-teal-400/40",
};

/** Hides the long analysis blocks until the student asks for them. */
function DeepDive({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-5 py-3.5 text-left cursor-pointer transition-colors"
      >
        <span>
          <span className="block text-sm font-semibold text-white">
            {open ? "Hide deeper analysis" : "Show deeper analysis"}
          </span>
          <span className="block text-xs text-slate-400">
            Summary, themes, close reading and critics
          </span>
        </span>
        <span className="text-indigo-300 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="space-y-5">{children}</div>}
    </div>
  );
}


export const TopicBentoCard: React.FC<TopicBentoCardProps> = ({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}) => {
  const {
    completedTopics,
    toggleTopicCompletion,
    completedSubSections,
    toggleSubSectionComplete,
    bookmarkedTopics,
    toggleTopicBookmark,
    topicNotes,
    saveTopicNote,
    studyLensMode,
    setStudyLensMode,
    speedReadMode,
    goToNextTopic,
    goToPrevTopic,
    setViewMode,
  } = useStudyStore();

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics?.[topic.id];
  const noteText = topicNotes?.[topic.id] || "";
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [activeCheckId, setActiveCheckId] = useState<string | null>(null);
  const [quizRevealed, setQuizRevealed] = useState(false);

  const completedSubsCount = useMemo(() => {
    return topic.subSections.filter((s) => !!completedSubSections?.[s.id]).length;
  }, [topic.subSections, completedSubSections]);

  const difficultyScore = useMemo(() => {
    if (topic.strategicImportance.includes("NUCLEAR") || topic.strategicImportance.includes("FIELDS")) return 96;
    if (topic.strategicImportance.includes("HIGH-YIELD")) return 90;
    if (topic.strategicImportance.includes("WAVE")) return 86;
    return 80;
  }, [topic.strategicImportance]);

  const difficultyDescriptor = useMemo(() => {
    if (difficultyScore >= 94) return "Band 7 Distinguisher";
    if (difficultyScore >= 88) return "High-Yield Core";
    return "Foundation Crucial";
  }, [difficultyScore]);

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`space-y-5 topic-transition-enter ${isDeferred ? "deferred-chapter-card" : ""}`}
    >
      {/* =====================================================================
          FLAGSHIP RECALL FLIP CARD (ACTIVE RETRIEVAL PROMPT)
          ===================================================================== */}
      <RecallFlipCard
        moduleCode={topic.displayCode}
        title={`${topic.displayCode} · ${topic.title}`}
        prompt={
          topic.checkUnderstanding[0]?.question ||
          topic.examBlueprint.paper2StructuredPrompt ||
          topic.primer5Min
        }
        answer={
          topic.checkUnderstanding[0]?.modelAnswer ||
          topic.examBlueprint.idealSolutionBreakdown.statePrinciples
        }
        accent="#6366f1"
        secondary="#0891b2"
        meta="PHYSICS ACTIVE RECALL"
      />

      {/* =====================================================================
          FLAGSHIP HERO TOPIC BANNER (LIQUID GLASS 2.0 & RADIAL SPECULAR GLOW)
          ===================================================================== */}
      <div className="liquid-card-flagship rounded-3xl p-6 lg:p-7 relative overflow-hidden shadow-2xl">
        {/* Specular Radial Glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-white/12 text-white border border-white/20 shadow-sm">
                {topic.displayCode}
              </span>
              <span className="font-mono text-xs px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-200 border border-indigo-400/35">
                THEME {topic.displayCode.charAt(0)} • TOPIC {topic.displayCode}
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${
                  STRATEGIC_BADGE_STYLES[topic.strategicImportance] ||
                  "bg-indigo-500/15 text-indigo-300 border-indigo-400/30"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {topic.strategicImportance}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.06] text-slate-200 border border-white/12 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {topic.readingTimeMinutes} min speed-read
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-1.5 font-display break-words">
              {topic.title}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/85 font-medium font-serif italic">
              {topic.subtitle}
            </p>
          </div>

          {/* Action Buttons: Prev/Next, Notes, Bookmark and Soft Master Topic Button */}
          <div className="flex items-center gap-2.5 self-start xl:self-center shrink-0 flex-wrap sm:flex-nowrap">
            {/* Prev/Next Topic Arrows */}
            {showPrevNextControls && (
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="w-10 h-10 rounded-2xl liquid-card-flagship text-slate-300 hover:text-white flex items-center justify-center cursor-pointer soft-button"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="w-10 h-10 rounded-2xl liquid-card-flagship text-slate-300 hover:text-white flex items-center justify-center cursor-pointer soft-button"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bookmark button */}
            <button
              onClick={() => toggleTopicBookmark(topic.id)}
              title="Bookmark Topic"
              className={`w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer soft-button border ${
                isBookmarked
                  ? "bg-indigo-500/25 text-indigo-300 border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                  : "liquid-card-flagship text-slate-400 hover:text-white border-white/10"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-300" : ""}`} />
            </button>

            {/* Notes Toggle Button */}
            <button
              onClick={() => setShowScratchpad((prev) => !prev)}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/12 flex items-center gap-2 cursor-pointer soft-button"
            >
              <StickyNote className="w-4 h-4 text-indigo-300" />
              <span>Notes {noteText ? "• Active" : ""}</span>
              {showScratchpad ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* Mastered Button */}
            <button
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer soft-button shadow-xl ${
                isCompleted
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-[0_0_24px_rgba(52,211,153,0.35)]"
                  : "liquid-card-flagship text-white hover:border-indigo-400/40"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-tick-pop" />
                  <span>Topic Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Setting & Physical Climate Footer */}
        {/* Setting & Physical Climate Footer */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-300">
            <Globe2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-xs font-mono uppercase tracking-wider">
                Domain &amp; Real-World Application
              </span>
              <span className="font-medium text-slate-100">
                {topic.cases[0]?.domainOrContext || "Classical Mechanics & Celestial Dynamics"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-300">
            <Atom className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-xs font-mono uppercase tracking-wider">
                Conservation &amp; Physical Law Weather
              </span>
              <span className="font-medium text-slate-100">
                {topic.cases[0]?.title || "Energy Conservation & Symmetry Invariance"}
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Personal Study Scratchpad */}
        {showScratchpad && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <AcademicNotesSurface
              note={noteText}
              onChange={(text) => saveTopicNote(topic.id, text)}
              title="Personal Derivations & Seminar Notes"
              itemCode={topic.displayCode}
              minRows={5}
              accentColor="#6366f1"
            />
          </div>
        )}
      </div>

      {/* =====================================================================
          FLAGSHIP ANALYTICS DECK (HELIOS SOLAR & SALES ANALYTICS BENTO 2.0)
          ===================================================================== */}
      <div className="bento-adaptive-4 gap-3.5">
        {/* KPI 1: Difficulty & Exam Weight Gauge */}
        <div className="liquid-card-flagship rounded-3xl p-4 flex flex-col justify-between min-h-[112px]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              Exam Weight
            </span>
            <span className="font-bold text-indigo-300">{difficultyScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900/90 overflow-hidden p-0.5 border border-white/10 mb-2.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${difficultyScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-1.5 text-xs">
            <span className="font-bold text-white leading-tight">
              {difficultyDescriptor}
            </span>
            <span className="text-xs font-mono text-slate-400 shrink-0">
              Paper 2 Core
            </span>
          </div>
        </div>

        {/* KPI 2: Strategic Vector */}
        <div className="liquid-card-flagship rounded-3xl p-4 flex flex-col justify-between min-h-[112px]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Syllabus Vector
            </span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping shrink-0" />
          </div>
          <div>
            <div className="text-sm font-bold text-indigo-300 font-mono mb-0.5">
              {topic.displayCode} • {topic.level}
            </div>
            <div className="text-xs text-slate-300 leading-tight">
              {topic.syllabusRef}
            </div>
          </div>
        </div>

        {/* KPI 3: Reading Pace & Structure */}
        <div className="liquid-card-flagship rounded-3xl p-4 flex flex-col justify-between min-h-[112px]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Pace &amp; Equations
            </span>
            <span className="font-mono text-indigo-300 font-bold">{topic.readingTimeMinutes}m</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white mb-0.5">
              {topic.primaryFormulas.length} Booklet Formulas
            </div>
            <div className="text-xs text-slate-300 leading-tight">
              {topic.subSections.length} Analytical Beats
            </div>
          </div>
        </div>

        {/* KPI 4: Exam Command Term */}
        <div className="liquid-card-flagship rounded-3xl p-4 flex flex-col justify-between min-h-[112px]">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Command Term
            </span>
            <span className="font-mono text-emerald-300 font-bold shrink-0">
              Paper 1 &amp; 2
            </span>
          </div>
          <div>
            <div className="text-sm font-bold text-white mb-0.5">
              {topic.examBlueprint.commandTerm}
            </div>
            <div className="text-xs text-emerald-300/80 leading-tight">
              Structured Solution Model
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          STUDY LENS SELECTOR: NEW LEARNER vs PRE-EXAM CRAM vs DEEP BLUEPRINT
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            onClick={() => setStudyLensMode("primer")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              studyLensMode === "primer"
                ? "bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Study as New (Primer)</span>
          </button>
          <button
            onClick={() => setStudyLensMode("revision")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              studyLensMode === "revision"
                ? "bg-indigo-500/25 text-indigo-200 border border-indigo-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>5-Min Pre-Exam Cram</span>
          </button>
          <button
            onClick={() => setStudyLensMode("deep")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              studyLensMode === "deep"
                ? "bg-purple-500/25 text-purple-200 border border-purple-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deep Exam Blueprint</span>
          </button>
        </div>

        <span className="font-mono text-xs text-slate-400 pr-2 hidden md:inline">
          {studyLensMode === "primer"
            ? "✦ Physical principles • Plain modern English • Engineering case studies"
            : studyLensMode === "revision"
            ? "✦ 30-sec takeaway • Primary formula • Pop-quiz model answer reveal"
            : "✦ Solution steps • MCQ trap pattern • Worked calculations & derivations"}
        </span>
      </div>

      {/* =====================================================================
          LENS A: "STUDY AS NEW" — EXAM PRIMER & CONCEPTUAL INTRO
          ===================================================================== */}
      {studyLensMode === "primer" && (
        <section className="liquid-glass-bento rounded-3xl p-6 lg:p-7 space-y-5 border-indigo-400/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                FIRST-TIME LEARNER'S GUIDE
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
                Plain English Primer ({topic.displayCode})
              </h3>
            </div>
            <span className="text-xs font-mono text-indigo-300/80">
              Read this to establish physical intuition before solving derivations
            </span>
          </div>

          <div className="bento-adaptive-12">
            {/* Overview & Real-World Domain (5 cols) */}
            <div className="bento-span-5 space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                  Conceptual Foundation:
                </span>
                <p className="text-xs lg:text-sm text-slate-200 leading-relaxed font-serif">
                  {topic.primer5Min}
                </p>
              </div>

              {topic.cases.length > 0 && (
                <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-400/25">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold block mb-2">
                    Real-World Connection:
                  </span>
                  <h4 className="text-xs font-bold text-white mb-1">
                    {topic.cases[0].title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {topic.cases[0].physicalMechanism}
                  </p>
                </div>
              )}
            </div>

            {/* Plain English Synopsis (7 cols) */}
            <div className="bento-span-7 p-5 rounded-2xl bg-indigo-950/20 border border-indigo-400/25 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Physical Phenomena &amp; Governing Mechanics:
                </span>
                <div className="space-y-3">
                  {topic.speedReadBullets.slice(0, 3).map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <p className="text-xs lg:text-sm text-slate-100 leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-indigo-400/20 flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-200/80">
                  Ready for quantitative analysis? Check the data booklet formulas below.
                </span>
                <button
                  onClick={() => setStudyLensMode("deep")}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 text-xs font-mono border border-indigo-400/30 hover:bg-indigo-500/30 cursor-pointer shrink-0 ml-2"
                >
                  View Blueprint ➔
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          LENS B: "5-MINUTE PRE-EXAM CRAM" — HIGH-YIELD REVISION BRIEFING
          ===================================================================== */}
      {studyLensMode === "revision" && (
        <section className="liquid-glass-bento rounded-3xl p-6 lg:p-7 space-y-4 border-indigo-400/35">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-indigo-500/25 text-indigo-300 border border-indigo-400/40 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                5-MINUTE PRE-EXAM CRAM
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
                Quick Test Takeaways ({topic.displayCode})
              </h3>
            </div>
            <button
              onClick={() => setViewMode("revision")}
              className="text-xs font-mono text-indigo-300 hover:text-indigo-100 underline decoration-indigo-400/40 cursor-pointer"
            >
              Open Full Flashcard Deck ➔
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 30-Second Concept Recap */}
            <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-400/25">
              <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5" />
                30-Second Concept Takeaway
              </span>
              <p className="text-xs lg:text-sm text-slate-100 leading-relaxed font-serif">
                {topic.examPromptTakeaway}
              </p>
            </div>

            {/* Must-Know Primary Formula */}
            <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-400/25">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Primary Data Booklet Formula
                </span>
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                  Data Booklet
                </span>
              </div>
              <div className="py-2 flex justify-center">
                <MathFormula
                  math={topic.primaryFormulas[0] || "F = ma"}
                  block
                  className="text-base text-white"
                />
              </div>
              <p className="text-xs text-slate-300 border-t border-white/[0.08] pt-2">
                <strong className="text-slate-200">Syllabus Context:</strong> {topic.syllabusRef}
              </p>
            </div>

            {/* Teacher Pop-Quiz */}
            {topic.checkUnderstanding.length > 0 && (
              <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-400/25">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1.5 mb-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Examiner Question (Paper 2):
                </span>
                <p className="text-xs lg:text-sm font-semibold text-white mb-2.5">
                  {topic.checkUnderstanding[0].question}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => setQuizRevealed(!quizRevealed)}
                    className="text-xs font-mono text-indigo-300 hover:text-indigo-100 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{quizRevealed ? "Hide Model Answer ▲" : "Reveal Model Answer ▼"}</span>
                  </button>
                  {quizRevealed && (
                    <div className="mt-2 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-400/20 text-slate-200 text-xs leading-relaxed">
                      <span className="font-bold text-indigo-300 mr-1">Mark Scheme:</span>
                      {topic.checkUnderstanding[0].modelAnswer}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Common Trap Alert */}
            <div className="p-4 rounded-2xl bg-rose-500/[0.08] border border-rose-400/25">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Examiner Report Pitfall Alert:
              </span>
              <p className="text-xs lg:text-sm text-slate-200 leading-relaxed">
                {topic.analysis.commonMisconceptions[0] ||
                  topic.examBlueprint.paper1TrapPattern}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          LENS C: "DEEP EXAM BLUEPRINT" — SOLUTION WORKINGS & TRAP PATTERNS
          ===================================================================== */}
      {studyLensMode === "deep" && (
        <section className="liquid-glass-bento rounded-3xl p-6 lg:p-7 space-y-4 border-indigo-400/35">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-indigo-500/25 text-indigo-300 border border-indigo-400/40 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                EXAM BLUEPRINT &amp; 3-STEP SOLUTION FRAMEWORK
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
                Command: {topic.examBlueprint.commandTerm}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paper 1 MCQ Trap */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/25">
              <span className="font-mono text-xs uppercase tracking-wider text-rose-400 font-bold block mb-1">
                Paper 1 MCQ Trap Pattern:
              </span>
              <p className="text-xs lg:text-sm text-slate-200 leading-relaxed">
                {topic.examBlueprint.paper1TrapPattern}
              </p>
            </div>

            {/* Paper 2 Structured Prompt */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/25">
              <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-bold block mb-1">
                Paper 2 Exemplar Question:
              </span>
              <p className="text-xs lg:text-sm text-slate-200 font-serif italic leading-relaxed">
                &ldquo;{topic.examBlueprint.paper2StructuredPrompt}&rdquo;
              </p>
            </div>
          </div>

          {/* 3-Step Solution Framework */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="font-mono text-xs uppercase font-bold text-indigo-300 block mb-1">
                1. State Principles
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.idealSolutionBreakdown.statePrinciples}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="font-mono text-xs uppercase font-bold text-emerald-300 block mb-1">
                2. Explicit Working
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.idealSolutionBreakdown.showWorking}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10">
              <span className="font-mono text-xs uppercase font-bold text-indigo-300 block mb-1">
                3. Units &amp; Sig Figs
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.idealSolutionBreakdown.unitsAndSigFigs}
              </p>
            </div>
          </div>
        </section>
      )}

      <DeepDive>
      {/* =====================================================================
          BENTO ROW 1: EXECUTIVE SYNOPSIS + HIGH-YIELD BULLETS + CONCEPT RADAR
          ===================================================================== */}
      <div className="bento-adaptive-12">
        {/* Executive Summary & High-Velocity Speed-Read Bullets (7 Cols) */}
        <div className="bento-span-7 liquid-glass-bento rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Topic Synopsis &amp; Rapid Synthesis
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300">
                IB Guide • Tsokos • Cambridge • Paper 1/2
              </span>
            </div>

            {/* High-Velocity Speed-Read Bullets */}
            <div className="p-4 rounded-2xl bg-slate-950/55 border border-white/10 mb-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-indigo-300 mb-2.5">
                High-Yield Physical Takeaways ({topic.speedReadBullets.length})
              </h3>
              <ul className="space-y-2">
                {topic.speedReadBullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs lg:text-sm text-slate-100 leading-relaxed"
                  >
                    <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span><MathText text={bullet} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Narrative Synopsis (Hidden if Speed-Read Mode is active) */}
            {!speedReadMode && (
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed mb-4 font-serif">
                {topic.summary.split("\n\n").map((para, i) => (
                  <p key={i}>
                    <MathText text={para} />
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Exam Prompt Takeaway */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-indigo-400/25">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Core Exam &amp; Paper 2 Takeaway
            </div>
            <p className="text-xs lg:text-sm font-medium text-indigo-100 leading-relaxed font-serif">
              <MathText text={topic.examPromptTakeaway} />
            </p>
          </div>
        </div>

        {/* 7 Guiding Concepts Radar & Intensity (5 Cols) */}
        <div className="bento-span-5 liquid-glass-bento rounded-3xl p-6 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-300 font-semibold">
                7 Guiding Concepts Radar
              </span>
              <span className="font-mono text-xs text-slate-400">
                Click concept to filter matrix
              </span>
            </div>

            <div className="space-y-3">
              {topic.conceptTracking.map((t) => {
                const conceptMeta = PHYSICS_CONCEPTS.find(
                  (c) => c.id === t.conceptId
                );
                if (!conceptMeta) return null;

                return (
                  <div
                    key={t.conceptId}
                    onClick={() => {
                      setViewMode("matrix");
                    }}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-lg border"
                        style={{
                          backgroundColor: conceptMeta.badgeBg,
                          borderColor: conceptMeta.badgeBorder,
                          color: conceptMeta.badgeText,
                        }}
                      >
                        {conceptMeta.shortName}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className="w-2 h-2 rounded-full transition-all"
                            style={{
                              backgroundColor:
                                dot <= t.intensity
                                  ? conceptMeta.color
                                  : "rgba(255,255,255,0.12)",
                            }}
                          />
                        ))}
                        <span className="font-mono text-xs text-slate-400 ml-1">
                          {t.intensity}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <MathText text={t.manifestation} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Data Booklet Formulas */}
          <div className="pt-4 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-2">
              Governing Data Booklet Formulas
            </span>
            <div className="flex flex-wrap gap-2">
              {topic.primaryFormulas.map((form, idx) => (
                <div
                  key={idx}
                  className="liquid-glass-pill px-3 py-1.5 rounded-xl text-xs text-indigo-200"
                >
                  <MathFormula math={form} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BENTO ROW 2: GRANULAR SUB-SECTIONS & WORKED EXAMPLES
          ===================================================================== */}
      <div className="liquid-card-flagship rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4.5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <span>Analytical Sub-Sections Breakdown</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {completedSubsCount}/{topic.subSections.length} Beats Checked
                </span>
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click tick button or card to toggle
          </span>
        </div>

        <div className="bento-adaptive-3 gap-4">
          {topic.subSections.map((sec, idx) => {
            const isSubDone = !!completedSubSections?.[sec.id];
            return (
              <div
                key={sec.id}
                onClick={() => toggleSubSectionComplete(topic.id, sec.id)}
                className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all cursor-pointer group soft-button ${
                  isSubDone
                    ? "bg-emerald-950/25 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                    : "bg-slate-950/60 border-white/12 hover:border-indigo-400/40 hover:bg-slate-950/80 shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-400/30">
                      Beat 0{idx + 1} • {sec.marker}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubSectionComplete(topic.id, sec.id);
                      }}
                      title={isSubDone ? "Mark beat incomplete" : "Mark beat completed"}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer soft-tick-btn ${
                        isSubDone
                          ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)] animate-tick-pop"
                          : "bg-white/5 border-white/12 text-slate-400 hover:text-white hover:border-indigo-400/40 hover:bg-white/10"
                      }`}
                    >
                      {isSubDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 group-hover:text-indigo-300" />
                      )}
                    </button>
                  </div>

                  <h4
                    className={`text-sm font-bold mb-2 transition-colors ${
                      isSubDone
                        ? "text-emerald-200 line-through decoration-emerald-400/60"
                        : "text-white group-hover:text-indigo-200"
                    }`}
                  >
                    {sec.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3 font-serif">
                    <MathText text={sec.content} />
                  </p>

                  {sec.keyFormulaOrFramework && (
                    <div className="my-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/10 flex justify-center">
                      <MathFormula math={sec.keyFormulaOrFramework} block />
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/[0.07]">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 block mb-1">
                    Examiner Analytical Takeaway
                  </span>
                  <p className="text-xs text-slate-200/90 leading-relaxed mb-2.5">
                    <MathText text={sec.analyticalTakeaway} />
                  </p>

                  {/* Worked Example Dropdown */}
                  {sec.workedExample && (
                    <details
                      className="mt-2 pt-2 border-t border-white/[0.08] group text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <summary className="flex items-center justify-between text-xs font-mono text-indigo-300/90 hover:text-indigo-200 cursor-pointer list-none select-none py-1">
                        <span className="flex items-center gap-1.5 font-semibold">
                          <Calculator className="w-3 h-3 text-indigo-400" />
                          Worked Calculation
                        </span>
                        <span className="text-xs font-mono text-slate-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>

                      <div className="mt-2.5 space-y-2 pl-0.5">
                        <p className="text-xs font-semibold text-slate-200">
                          <MathText text={sec.workedExample.problem} />
                        </p>
                        <div className="space-y-1 pl-2 border-l-2 border-indigo-400/40 text-xs text-slate-300 font-mono">
                          {sec.workedExample.stepByStep.map((st, sIdx) => (
                            <div key={sIdx}><MathText text={st} /></div>
                          ))}
                        </div>
                        <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-400/30 text-xs font-bold text-indigo-300">
                          Answer: <MathText text={sec.workedExample.finalAnswer} />
                        </div>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          EMBEDDED INTERACTIVE DIAGRAM (IF AVAILABLE)
          ===================================================================== */}
      {topic.diagramIds.length > 0 && (
        <div className="space-y-3">
          <InteractiveDiagram diagramId={topic.diagramIds[0]} />
        </div>
      )}

      {/* =====================================================================
          CHECK YOUR UNDERSTANDING (ACTIVE RETRIEVAL ACCORDION)
          ===================================================================== */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="liquid-glass-bento rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Check Your Understanding (Active Retrieval)</span>
          </div>

          <div className="space-y-3">
            {topic.checkUnderstanding.map((q) => {
              const isOpen = activeCheckId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-slate-950/60 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveCheckId(isOpen ? null : q.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-900/40"
                  >
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-indigo-950/40 text-indigo-300 border border-indigo-500/30">
                        {q.promptType}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-200">
                        <MathText text={q.question} />
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-white/10 bg-slate-900/30 space-y-3 text-xs">
                      {q.hints.length > 0 && (
                        <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-200/90">
                          <strong className="block text-indigo-300 font-bold mb-1">Hints:</strong>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {q.hints.map((h, hIdx) => (
                              <li key={hIdx}><MathText text={h} /></li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200/90">
                        <strong className="block text-emerald-300 font-bold mb-1">
                          Model Answer &amp; Mark Scheme Keys:
                        </strong>
                        <p className="leading-relaxed"><MathText text={q.modelAnswer} /></p>
                        {q.keyTermsToInclude.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {q.keyTermsToInclude.map((term, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-900/40 text-emerald-300 border border-emerald-500/30"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          BOTTOM ACADEMIC HANDWRITTEN NOTES SURFACE
          ===================================================================== */}
      <section className="pt-2">
        <AcademicNotesSurface
          note={noteText}
          onChange={(newNote) => saveTopicNote(topic.id, newNote)}
          title="Physical Derivations & Unit Marginalia"
          subtitle="Saved automatically to your offline codex"
          placeholder="Jot down formula derivations, lab observations, calculation shortcuts, or personal physics notes..."
          accentColor="#6366f1"
          itemCode={topic.displayCode}
          minRows={5}
        />
      </section>
      </DeepDive>
    </article>
  );
};

export default TopicBentoCard;
