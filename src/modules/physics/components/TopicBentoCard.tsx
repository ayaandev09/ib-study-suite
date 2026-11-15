"use client";

import React, { useState, useMemo } from "react";
import { TopicData, PHYSICS_CONCEPTS } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { RecallFlipCard } from "@/modules/physics/components/RecallFlipCard";
import { AcademicNotesSurface } from "@/modules/physics/components/AcademicNotesSurface";
import { InteractiveDiagram } from "@/modules/physics/components/InteractiveDiagram";
import { MathFormula } from "@/modules/physics/components/MathFormula";
import { MathText } from "@/modules/physics/components/MathText";
import {
  GraduationCap,
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
  AlertTriangle,
  Globe2,
  Calculator,
  Flame,
  ShieldAlert,
  StickyNote,
  Target,
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

/** Collapsible container for granular sub-sections, active retrieval, and notes. */
function DeepDive({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-6 py-4 text-left cursor-pointer transition-colors"
      >
        <span>
          <span className="block text-sm font-semibold text-white">
            {open ? "Hide Deep-Dive Subsections & Practice" : "Show Deep-Dive Subsections & Practice"}
          </span>
          <span className="block text-xs text-white/55 mt-0.5">
            Analytical beats, worked examples, guiding concepts, and active retrieval
          </span>
        </span>
        <span className="text-indigo-300 text-lg font-mono">{open ? "−" : "+"}</span>
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

  const primaryCase = topic.cases[0];

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`space-y-5 topic-transition-enter ${isDeferred ? "deferred-chapter-card" : ""}`}
    >
      {/* =====================================================================
          1. HERO BENTO HEADER (FULL-WIDTH VERTICAL STACK)
          ===================================================================== */}
      <header className="liquid-glass-bento rounded-3xl p-6 border border-white/10 relative overflow-hidden space-y-5">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-white/10 text-white border border-white/20">
              {topic.displayCode}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-200 border border-indigo-400/35">
              Theme {topic.displayCode.charAt(0)}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-violet-500/20 text-violet-200 border border-violet-400/35">
              {topic.level}
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
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.05] text-slate-200 border border-white/10 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {topic.readingTimeMinutes} min read
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display break-words">
              {topic.title}
            </h1>
            <p className="text-sm text-indigo-200/85 font-medium font-serif italic">
              {topic.subtitle}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              {showPrevNextControls && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={goToPrevTopic}
                    title="Previous Topic"
                    className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextTopic}
                    title="Next Topic"
                    className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleTopicBookmark(topic.id)}
                title="Bookmark Topic"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer border transition-colors ${
                  isBookmarked
                    ? "bg-indigo-500/25 text-indigo-300 border-indigo-400/40"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/10"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-indigo-300" : ""}`} />
              </button>

              <button
                type="button"
                onClick={() => setShowScratchpad((prev) => !prev)}
                className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <StickyNote className="w-4 h-4 text-indigo-300" />
                <span>Notes{noteText ? " •" : ""}</span>
                {showScratchpad ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/45 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                  : "bg-white/[0.05] hover:bg-white/[0.09] text-white border-white/15 hover:border-indigo-400/40"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Completed</span>
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

        {showScratchpad && (
          <div className="pt-4 border-t border-white/10">
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
      </header>

      {/* =====================================================================
          2. CORE PHYSICS SYNTHESIS & SPEED-READ BULLETS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Core Physics Synthesis
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300">
            {topic.syllabusRef}
          </span>
        </div>

        {!speedReadMode && (
          <p className="text-sm text-slate-200 leading-relaxed font-serif">
            <MathText text={topic.primer5Min} />
          </p>
        )}

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-indigo-300">
            Speed-Read Bullets ({topic.speedReadBullets.length})
          </h3>
          <ul className="space-y-2.5">
            {topic.speedReadBullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-slate-100 leading-relaxed"
              >
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <span>
                  <MathText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-500/[0.08] border border-indigo-400/25 space-y-1.5">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            Core Exam Takeaway
          </div>
          <p className="text-sm font-medium text-indigo-100 leading-relaxed font-serif">
            <MathText text={topic.examPromptTakeaway} />
          </p>
        </div>
      </section>

      {/* =====================================================================
          3. KEY EQUATIONS / DATA BOOKLET FORMULAS & EXAM WEIGHT
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-300 font-semibold flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            Data Booklet Formulas &amp; Exam Weight
          </span>
          <span className="font-mono text-xs text-white/50">
            {topic.primaryFormulas.length} equations • Cmd: {topic.examBlueprint.commandTerm}
          </span>
        </div>

        {/* Exam Weight Gauge */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-semibold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Exam Weight &amp; Priority
            </span>
            <span className="font-bold text-indigo-300">{difficultyScore}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${difficultyScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-white">{difficultyDescriptor}</span>
            <span className="font-mono text-emerald-300">Paper 1 &amp; Paper 2 Core</span>
          </div>
        </div>

        {/* Equations Stack */}
        <div className="space-y-2.5">
          {topic.primaryFormulas.map((form, idx) => (
            <div
              key={idx}
              className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-base text-indigo-100 flex items-center justify-center overflow-x-auto"
            >
              <MathFormula math={form} />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. REAL-WORLD AEROSPACE & ENGINEERING APPLICATION
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-sky-300 font-semibold flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" />
            Real-World Aerospace &amp; Engineering
          </span>
          {primaryCase && (
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-sky-500/15 text-sky-200 border border-sky-400/25">
              {primaryCase.syllabusLink}
            </span>
          )}
        </div>

        {primaryCase ? (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block">
                {primaryCase.domainOrContext}
              </span>
              <h3 className="text-base font-bold text-white">{primaryCase.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                <MathText text={primaryCase.physicalMechanism} />
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/[0.07] border border-sky-400/20 space-y-1">
              <span className="font-mono text-xs uppercase tracking-wider text-sky-300 font-semibold block">
                Quantitative Insight
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                <MathText text={primaryCase.quantitativeInsight} />
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">
            <MathText text={topic.analysis.realWorldConnections} />
          </p>
        )}
      </section>

      {/* =====================================================================
          5. EXAMINER TRAPS & PAPER 1/2 DERIVATION TIPS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-300 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Examiner Traps &amp; Paper 1/2 Derivation Tips
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-rose-500/15 text-rose-200 border border-rose-400/25">
            Command: {topic.examBlueprint.commandTerm}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/[0.07] border border-rose-400/20 space-y-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-rose-300 font-semibold block">
            Paper 1 MCQ Trap Pattern
          </span>
          <p className="text-sm text-slate-200 leading-relaxed">
            <MathText text={topic.examBlueprint.paper1TrapPattern} />
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-indigo-300 block">
              1. State Governing Principles
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.statePrinciples} />
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
              2. Explicit Derivation &amp; Working
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.showWorking} />
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
              3. Units &amp; Significant Figures
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.unitsAndSigFigs} />
            </p>
          </div>
        </div>

        {topic.analysis.commonMisconceptions.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <Target className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-amber-200">Common Pitfall: </strong>
              <MathText text={topic.analysis.commonMisconceptions[0]} />
            </p>
          </div>
        )}
      </section>

      {/* =====================================================================
          6. ACTIVE RECALL FLIP CARD & EXPERIMENTAL DIAGRAM CONTEXT
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

      {topic.diagramIds.length > 0 && (
        <InteractiveDiagram diagramId={topic.diagramIds[0]} />
      )}

      {/* =====================================================================
          7. DEEP DIVE: SUB-SECTIONS, CONCEPTS RADAR, ACTIVE RETRIEVAL & NOTES
          ===================================================================== */}
      <DeepDive>
        {/* Analytical Sub-Sections Breakdown */}
        <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <span>Analytical Sub-Sections</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {completedSubsCount}/{topic.subSections.length} Checked
                </span>
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click card to toggle beat completion
            </span>
          </div>

          <div className="space-y-4">
            {topic.subSections.map((sec, idx) => {
              const isSubDone = !!completedSubSections?.[sec.id];
              return (
                <div
                  key={sec.id}
                  onClick={() => toggleSubSectionComplete(topic.id, sec.id)}
                  className={`rounded-2xl border p-5 space-y-3 transition-all cursor-pointer group ${
                    isSubDone
                      ? "bg-emerald-950/25 border-emerald-400/45"
                      : "bg-white/[0.03] border-white/10 hover:border-indigo-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-400/30">
                      0{idx + 1} • {sec.marker}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubSectionComplete(topic.id, sec.id);
                      }}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                        isSubDone
                          ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-300"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {isSubDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h4
                    className={`text-base font-bold ${
                      isSubDone
                        ? "text-emerald-200 line-through decoration-emerald-400/60"
                        : "text-white"
                    }`}
                  >
                    {sec.title}
                  </h4>

                  <p className="text-sm text-slate-300 leading-relaxed font-serif">
                    <MathText text={sec.content} />
                  </p>

                  {sec.keyFormulaOrFramework && (
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 flex justify-center overflow-x-auto">
                      <MathFormula math={sec.keyFormulaOrFramework} block />
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/[0.07] space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-indigo-300 block">
                      Examiner Takeaway
                    </span>
                    <p className="text-sm text-slate-200/90 leading-relaxed">
                      <MathText text={sec.analyticalTakeaway} />
                    </p>

                    {sec.workedExample && (
                      <details
                        className="mt-2 pt-2 border-t border-white/[0.08] group text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <summary className="flex items-center justify-between text-xs font-mono text-indigo-300 hover:text-indigo-200 cursor-pointer list-none select-none py-1">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                            Worked Calculation
                          </span>
                          <span className="text-xs font-mono text-slate-400 group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm font-semibold text-slate-200">
                            <MathText text={sec.workedExample.problem} />
                          </p>
                          <div className="space-y-1 pl-3 border-l-2 border-indigo-400/40 text-xs text-slate-300 font-mono">
                            {sec.workedExample.stepByStep.map((st, sIdx) => (
                              <div key={sIdx}>
                                <MathText text={st} />
                              </div>
                            ))}
                          </div>
                          <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-400/30 text-xs font-bold text-indigo-300">
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

        {/* 7 Guiding Concepts Radar */}
        {topic.conceptTracking.length > 0 && (
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-300 font-semibold">
                7 Guiding Concepts Radar
              </span>
              <span className="font-mono text-xs text-slate-400">
                Click concept to open matrix
              </span>
            </div>

            <div className="space-y-3">
              {topic.conceptTracking.map((t) => {
                const conceptMeta = PHYSICS_CONCEPTS.find((c) => c.id === t.conceptId);
                if (!conceptMeta) return null;

                return (
                  <div
                    key={t.conceptId}
                    onClick={() => setViewMode("matrix")}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors cursor-pointer"
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
                      <span className="font-mono text-xs text-slate-400">
                        {t.intensity}/5
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <MathText text={t.manifestation} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Check Your Understanding (Active Retrieval Accordion) */}
        {topic.checkUnderstanding.length > 0 && (
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Check Your Understanding</span>
            </div>

            <div className="space-y-3">
              {topic.checkUnderstanding.map((q) => {
                const isOpen = activeCheckId === q.id;
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCheckId(isOpen ? null : q.id)}
                      className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.04]"
                    >
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-indigo-950/40 text-indigo-300 border border-indigo-500/30">
                          {q.promptType}
                        </span>
                        <p className="text-sm font-semibold text-slate-200">
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
                      <div className="p-4 pt-3 border-t border-white/10 bg-black/20 space-y-3 text-sm">
                        {q.hints.length > 0 && (
                          <div className="p-3.5 rounded-xl bg-indigo-950/25 border border-indigo-500/20 text-indigo-200/90">
                            <strong className="block text-indigo-300 font-bold mb-1">
                              Hints:
                            </strong>
                            <ul className="list-disc pl-4 space-y-0.5">
                              {q.hints.map((h, hIdx) => (
                                <li key={hIdx}>
                                  <MathText text={h} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/20 text-emerald-200/90">
                          <strong className="block text-emerald-300 font-bold mb-1">
                            Model Answer &amp; Mark Scheme:
                          </strong>
                          <p className="leading-relaxed">
                            <MathText text={q.modelAnswer} />
                          </p>
                          {q.keyTermsToInclude.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {q.keyTermsToInclude.map((term, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-900/40 text-emerald-300 border border-emerald-500/30"
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

        {/* Bottom Academic Handwritten Notes Surface */}
        <section className="pt-1">
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
