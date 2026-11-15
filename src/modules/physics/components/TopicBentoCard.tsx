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
  ShieldAlert,
  StickyNote,
  Target,
  BookOpen,
  ArrowRight,
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

  const primaryCase = topic.cases[0];

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`space-y-6 topic-transition-enter ${isDeferred ? "deferred-chapter-card" : ""}`}
    >
      {/* =====================================================================
          1. HERO BENTO HEADER
          ===================================================================== */}
      <header className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden space-y-5">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20">
              {topic.displayCode}
            </span>
            <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/35">
              Theme {topic.displayCode.charAt(0)}
            </span>
            <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-400/35">
              {topic.level}
            </span>
            <span
              className={`font-mono text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                STRATEGIC_BADGE_STYLES[topic.strategicImportance] ||
                "bg-indigo-500/15 text-indigo-300 border-indigo-400/30"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {topic.strategicImportance}
            </span>
            <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-slate-200 border border-white/10 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {topic.readingTimeMinutes} min read
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight break-words">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-indigo-200/90 font-medium italic">
              {topic.subtitle}
            </p>
            <div className="text-xs text-slate-400 font-mono pt-1">
              SYLLABUS REF: {topic.syllabusRef}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
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

              <button
                type="button"
                onClick={() => setViewMode("revision")}
                className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Entry Ticket &amp; Recall</span>
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
                  <span>Topic Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark as Mastered</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notes Scratchpad Drawer */}
        {showScratchpad && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block">
              Quick Physics Scratchpad
            </span>
            <textarea
              value={noteText}
              onChange={(e) => saveTopicNote(topic.id, e.target.value)}
              placeholder="Record formula derivations, sign conventions, lab insights, or teacher notes..."
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400/50 resize-y"
            />
          </div>
        )}
      </header>

      {/* =====================================================================
          2. CORE DIGEST & 5-MINUTE PRIMER
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Core Digest &amp; 5-Minute Executive Primer</span>
          </div>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
            {topic.speedReadBullets.length} Key Takeaways
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          <MathText text={topic.primer5Min || topic.summary} />
        </p>

        {/* Speed-read bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-indigo-400/30 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                <MathText text={bullet} />
              </p>
            </div>
          ))}
        </div>

        {!speedReadMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Physical Core Thesis
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <MathText text={topic.analysis.coreThesis} />
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Theoretical Foundations
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <MathText text={topic.analysis.theoreticalFoundations} />
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          3. KEY MATHEMATICAL RELATIONSHIPS & FORMULAS
          ===================================================================== */}
      {topic.primaryFormulas.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Governing Mathematical Relationships &amp; Primary Formulas</span>
            </div>
            <span className="font-mono text-xs text-slate-400">
              IB Data Booklet Section {topic.displayCode}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topic.primaryFormulas.map((formula, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/25 flex flex-col justify-center items-center text-center space-y-2 hover:border-cyan-400/50 transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  Equation 0{idx + 1}
                </span>
                <div className="w-full overflow-x-auto py-1">
                  <MathFormula math={formula} block />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          4. ANALYTICAL SUB-SECTIONS (OPEN RHYTHMIC FLOW - NO DEEP DIVE WALL)
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                Analytical Sub-Sections Breakdown
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Granular mechanisms, worked mathematical derivations, and examiner takeaways
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            {completedSubsCount}/{topic.subSections.length} Beats Mastered
          </span>
        </div>

        <div className="space-y-4">
          {topic.subSections.map((sec, idx) => {
            const isSubDone = !!completedSubSections?.[sec.id];
            return (
              <div
                key={sec.id}
                onClick={() => toggleSubSectionComplete(topic.id, sec.id)}
                className={`rounded-2xl border p-5 sm:p-6 space-y-3.5 transition-all cursor-pointer group ${
                  isSubDone
                    ? "bg-emerald-950/20 border-emerald-400/40"
                    : "bg-white/[0.02] border-white/10 hover:border-indigo-400/40"
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

                <h3
                  className={`text-base sm:text-lg font-bold ${
                    isSubDone
                      ? "text-emerald-200 line-through decoration-emerald-400/60"
                      : "text-white"
                  }`}
                >
                  {sec.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  <MathText text={sec.content} />
                </p>

                {sec.keyFormulaOrFramework && (
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 flex justify-center overflow-x-auto">
                    <MathFormula math={sec.keyFormulaOrFramework} block />
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                    Examiner Takeaway
                  </span>
                  <p className="leading-relaxed">
                    <MathText text={sec.analyticalTakeaway} />
                  </p>
                </div>

                {sec.workedExample && (
                  <details
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 group text-xs space-y-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <summary className="flex items-center justify-between font-mono text-xs text-indigo-300 hover:text-indigo-200 cursor-pointer list-none select-none">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                        Step-by-Step Worked Calculation
                      </span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-2.5 space-y-2 pt-2 border-t border-white/5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200">
                        <MathText text={sec.workedExample.problem} />
                      </p>
                      <div className="space-y-1 pl-3 border-l-2 border-indigo-400/40 font-mono text-slate-300">
                        {sec.workedExample.stepByStep.map((st, sIdx) => (
                          <div key={sIdx}>
                            <MathText text={st} />
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-400/30 font-bold text-indigo-200 text-xs">
                        Final Answer: <MathText text={sec.workedExample.finalAnswer} />
                      </div>
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. CONCEPTUAL LENSES & REAL-WORLD MECHANISM
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
            <Globe2 className="w-4 h-4 text-violet-400" />
            <span>Real-World Physical Application &amp; Guiding Concepts</span>
          </div>
        </div>

        {primaryCase && (
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-white">{primaryCase.title}</h3>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-200 border border-violet-400/25">
                {primaryCase.domainOrContext}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <MathText text={primaryCase.physicalMechanism} />
            </p>
            <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs text-violet-200">
              <span className="font-bold text-violet-300">Quantitative Insight: </span>
              <MathText text={primaryCase.quantitativeInsight} />
            </div>
          </div>
        )}

        {/* 7 Guiding Concepts Intensity Grid */}
        {topic.conceptTracking.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">
              7 Guiding Concepts Alignment
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.conceptTracking.map((t) => {
                const conceptMeta = PHYSICS_CONCEPTS.find((c) => c.id === t.conceptId);
                if (!conceptMeta) return null;

                return (
                  <div
                    key={t.conceptId}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-xs font-semibold px-2.5 py-0.5 rounded-lg border font-mono"
                        style={{
                          backgroundColor: conceptMeta.badgeBg,
                          borderColor: conceptMeta.badgeBorder,
                          color: conceptMeta.badgeText,
                        }}
                      >
                        {conceptMeta.shortName}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        Intensity {t.intensity}/5
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(t.intensity / 5) * 100}%`,
                          backgroundColor: conceptMeta.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <MathText text={t.manifestation} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          6. EXAMINER TRAPS & PAPER 1/2 DERIVATION TIPS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-300 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Examiner Traps &amp; Paper 1/2 Derivation Tips</span>
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-200 border border-rose-400/25">
            Command Term: {topic.examBlueprint.commandTerm}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/[0.06] border border-rose-400/20 space-y-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-rose-300 font-bold block">
            Paper 1 MCQ Trap Pattern
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            <MathText text={topic.examBlueprint.paper1TrapPattern} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-indigo-300 block">
              1. State Principles
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.statePrinciples} />
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
              2. Derivation &amp; Working
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.showWorking} />
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
            <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
              3. Units &amp; Sig Figs
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text={topic.examBlueprint.idealSolutionBreakdown.unitsAndSigFigs} />
            </p>
          </div>
        </div>

        {topic.analysis.commonMisconceptions.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-400/20 flex items-start gap-3">
            <Target className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-300">Common Pitfall: </strong>
              <MathText text={topic.analysis.commonMisconceptions[0]} />
            </p>
          </div>
        )}
      </section>

      {/* =====================================================================
          7. ACTIVE RECALL FLIP CARD & EXPERIMENTAL DIAGRAM
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
          8. CHECK YOUR UNDERSTANDING (SELF-CHECK CHALLENGES)
          ===================================================================== */}
      {topic.checkUnderstanding.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Check Your Understanding &amp; Mark Scheme</span>
          </div>

          <div className="space-y-3">
            {topic.checkUnderstanding.map((q) => {
              const isOpen = activeCheckId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCheckId(isOpen ? null : q.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase bg-indigo-950/50 text-indigo-300 border border-indigo-500/30">
                        {q.promptType}
                      </span>
                      <p className="text-sm sm:text-base font-semibold text-slate-100">
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
                    <div className="p-5 pt-3 border-t border-white/10 bg-black/30 space-y-3 text-xs sm:text-sm">
                      {q.hints.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200">
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

                      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200">
                        <strong className="block text-emerald-300 font-bold mb-1">
                          Model Answer &amp; Mark Scheme:
                        </strong>
                        <p className="leading-relaxed">
                          <MathText text={q.modelAnswer} />
                        </p>
                        {q.keyTermsToInclude.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
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
        </section>
      )}

      {/* =====================================================================
          9. ACADEMIC HANDWRITTEN NOTES SURFACE
          ===================================================================== */}
      <section className="pt-2">
        <AcademicNotesSurface
          note={noteText}
          onChange={(newNote) => saveTopicNote(topic.id, newNote)}
          title="Physical Derivations &amp; Unit Marginalia"
          subtitle="Saved automatically to your offline codex"
          placeholder="Jot down formula derivations, lab observations, calculation shortcuts, or personal physics notes..."
          accentColor="#6366f1"
          itemCode={topic.displayCode}
          minRows={5}
        />
      </section>
    </article>
  );
};

export default TopicBentoCard;
