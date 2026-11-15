"use client";

import React, { useState } from "react";
import {
  TopicData,
  SYLLABUS_UNITS,
  CONCEPTS_TAXONOMY,
} from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";
import { RecallFlipCard } from "@/modules/business/components/RecallFlipCard";
import { AcademicNotesSurface } from "@/modules/business/components/AcademicNotesSurface";
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Layers,
  Brain,
  BookOpenCheck,
  StickyNote,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  GraduationCap,
  Building2,
  AlertCircle,
  Wrench,
  TrendingUp,
  Zap,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff,
  ArrowRight,
  Target,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

const IMPORTANCE_BADGE_STYLES: Record<
  TopicData["strategicImportance"],
  string
> = {
  "CORE FOUNDATION": "bg-blue-500/15 text-blue-300 border-blue-400/35",
  "HIGH-YIELD HL":
    "bg-rose-500/20 text-rose-300 border-rose-400/40 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]",
  "QUANTITATIVE TOOLKIT":
    "bg-blue-500/15 text-blue-300 border-blue-400/35",
  "STRATEGIC EVALUATION":
    "bg-blue-600/15 text-blue-200 border-blue-500/35",
  "PAPER 1 / 2 ESSENTIAL":
    "bg-blue-500/20 text-blue-200 border-blue-400/40",
};

export const TopicBentoCard = React.memo(function TopicBentoCard({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}: TopicBentoCardProps) {
  const {
    completedTopics,
    completedSubSections,
    bookmarkedCases,
    toggleTopicComplete,
    toggleSubSectionComplete,
    toggleBookmarkCase,
    speedReadMode,
    setViewMode,
    topicNotes,
    setTopicNote,
    learningPosture,
    setLearningPosture,
    goToPrevTopic,
    goToNextTopic,
    setActiveFlashcardDeck,
  } = useStudyStore();

  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showCheckpointHint, setShowCheckpointHint] = useState(false);
  const [showCheckpointAnswer, setShowCheckpointAnswer] = useState(false);
  const [activePracticeTab, setActivePracticeTab] = useState<
    "2m" | "4m" | "10m"
  >("10m");

  const isCompleted = !!completedTopics[topic.id];
  const noteText = topicNotes[topic.id] || "";
  const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
  const completedSubsCount = topic.subSections.filter(
    (s) => !!completedSubSections[s.id]
  ).length;

  return (
    <article
      key={topic.id}
      id={`topic-card-${topic.id}`}
      className={`space-y-6 topic-transition-enter ${
        isDeferred ? "deferred-chapter-card" : ""
      }`}
    >
      <RecallFlipCard
        moduleCode={topic.displayCode}
        title={`${topic.displayCode} · ${topic.title}`}
        prompt={topic.examPromptTakeaway || topic.summary}
        answer={topic.analysis.coreThesis || topic.summary}
        accent="#2563eb"
        secondary="#1d4ed8"
        meta="ACTIVE RECALL"
      />

      {/* =====================================================================
          TIER 1: HERO BENTO HEADER
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden space-y-5">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 relative z-10">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/15">
                {topic.displayCode}
              </span>
              <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30">
                {unit?.title.split(":")[0] || `Unit ${topic.unitNumber}`}
              </span>
              <span
                className={`font-mono text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  topic.level === "HL ONLY"
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                    : "bg-white/[0.06] text-slate-300 border-white/10"
                }`}
              >
                {topic.level}
              </span>
              <span
                className={`font-mono text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  IMPORTANCE_BADGE_STYLES[topic.strategicImportance]
                }`}
              >
                {topic.strategicImportance}
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {topic.readingTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {topic.subtitle}
            </p>
            <div className="text-xs text-slate-400 font-mono pt-0.5">
              SYLLABUS REF: {topic.syllabusRef}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {showPrevNextControls && (
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  type="button"
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowScratchpad((prev) => !prev)}
              className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <StickyNote className="w-4 h-4 text-blue-400" />
              <span>Notes{noteText ? " •" : ""}</span>
              {showScratchpad ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                toggleTopicComplete(topic.id);
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isCompleted
                  ? "bg-blue-600/30 border border-blue-400/50 text-blue-200 shadow-[0_0_20px_-4px_rgba(37,99,235,0.5)]"
                  : "bg-white/10 hover:bg-blue-600/20 text-white border border-white/20 hover:border-blue-400/40"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300" />
              )}
              <span>{isCompleted ? "Topic Mastered" : "Mark as Mastered"}</span>
            </button>
          </div>
        </div>

        {/* Postural Switcher & Revision Pill */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              type="button"
              onClick={() => setLearningPosture("learn-new")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "learn-new"
                  ? "bg-blue-600/25 border border-blue-400/40 text-blue-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Study as New</span>
            </button>

            <button
              type="button"
              onClick={() => setLearningPosture("pre-lesson-cram")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "pre-lesson-cram"
                  ? "bg-blue-600/25 border border-blue-400/40 text-blue-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Pre-Lesson / Exam Cram</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveFlashcardDeck("glossary");
              setViewMode("revision");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-400/30 hover:bg-purple-500/25 transition-all cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>Practice Active Recall &amp; Entry Tickets</span>
          </button>
        </div>

        {/* Quick Scratchpad */}
        {showScratchpad && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-blue-300 font-bold block">
              Quick Business Marginalia
            </span>
            <textarea
              value={noteText}
              onChange={(e) => setTopicNote(topic.id, e.target.value)}
              placeholder="Record strategic frameworks, case precedents, financial formulas, or personal seminar notes..."
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400/50 resize-y"
            />
          </div>
        )}
      </section>

      {/* =====================================================================
          TIER 2: CORE DIGEST & EXECUTIVE SUMMARY
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
              Core Executive Synthesis
            </h2>
          </div>
          {learningPosture === "pre-lesson-cram" && (
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-400/30">
              Rapid Cram Mode
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          {topic.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/30">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {!speedReadMode && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Strategic Thesis
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {topic.analysis.coreThesis}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <BookOpenCheck className="w-3.5 h-3.5" />
                Theoretical Foundations
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {topic.analysis.theoreticalFoundations}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          TIER 3: KEY MODELS & FORMULAS (SUB-SECTIONS & BMT DECISION TOOLS)
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
              Key Models, Formulas &amp; Sub-Sections
            </h2>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30">
            {completedSubsCount}/{topic.subSections.length} Beats Completed
          </span>
        </div>

        <div className="space-y-4">
          {topic.subSections.map((sub) => {
            const isSubDone = !!completedSubSections[sub.id];
            return (
              <div
                key={sub.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3 ${
                  isSubDone
                    ? "bg-blue-500/[0.05] border-blue-500/30"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-400/25">
                      {sub.marker}
                    </span>
                    <h3
                      className={`text-base font-bold ${
                        isSubDone ? "line-through text-slate-500" : "text-white"
                      }`}
                    >
                      {sub.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer shrink-0 p-1"
                  >
                    {isSubDone ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {sub.content}
                </p>

                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs sm:text-sm text-blue-200">
                  <span className="font-bold text-blue-300">
                    Exam Takeaway:{" "}
                  </span>
                  {sub.analyticalTakeaway}
                </div>

                {sub.keyFormulaOrFramework && (
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-400/25 font-mono text-xs text-blue-300">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase mb-1">
                      Formula / Core Rule:
                    </span>
                    {sub.keyFormulaOrFramework}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connected BMT Decision Tools */}
        {topic.analysis.connectedBMTTools.length > 0 && (
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 pt-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-400" />
              Connected BMT Decision Tools
            </span>
            <div className="flex flex-wrap gap-2">
              {topic.analysis.connectedBMTTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-blue-500/15 text-blue-200 border border-blue-400/25"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans pt-1">
              {topic.analysis.realWorldConnections}
            </p>
          </div>
        )}

        {/* CCES Concept Alignment */}
        {topic.conceptTracking.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                IB BM Key Concepts Alignment (CCES)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topic.conceptTracking.map((track) => {
                const def = CONCEPTS_TAXONOMY[track.conceptId];
                return (
                  <div
                    key={track.conceptId}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg ${def.badgeBg} ${def.badgeText} border ${def.badgeBorder}`}
                      >
                        {def.name}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        Intensity {track.intensity}/5
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(track.intensity / 5) * 100}%`,
                          backgroundColor: def.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {track.manifestation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          TIER 4: REAL-WORLD CASE & EXAMINER TRAPS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
            Real-World Corporate Cases &amp; Examiner Traps
          </h2>
        </div>

        {/* Corporate Cases */}
        {topic.cases.length > 0 && (
          <div className="space-y-3">
            {topic.cases.map((cs) => {
              const isBookmarked = !!bookmarkedCases[cs.id];
              return (
                <div
                  key={cs.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {cs.company}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        {cs.context}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmarkCase(cs.id)}
                      className={`p-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        isBookmarked
                          ? "bg-blue-600/25 text-blue-200 border-blue-400/40"
                          : "bg-white/[0.04] text-slate-400 hover:text-white border-white/10"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-blue-400" : ""}`} />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {cs.application}
                  </p>

                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs sm:text-sm text-blue-200 space-y-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300 block">
                      AO3 / AO4 Strategic Evaluation:
                    </span>
                    <p className="leading-relaxed">{cs.evaluationAO3AO4}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Examiner Traps & Misconceptions Alert Box */}
        <div className="p-5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Examiner Traps &amp; Common Student Misconceptions</span>
          </div>
          <div className="space-y-2">
            {(topic.analysis.commonMisconceptions.length > 0
              ? topic.analysis.commonMisconceptions
              : ["Confusing cash flow liquidity with accounting profitability; failing to ground theoretical recommendations in case context."]
            ).map((misc, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                <Target className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{misc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          TIER 5: SELF-CHECK & ACADEMIC NOTES
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
              Exam Sprint Practice &amp; Self-Check
            </h2>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            {(["2m", "4m", "10m"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActivePracticeTab(m)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  activePracticeTab === m
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Practice Question Content */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          {activePracticeTab === "2m" && (
            <div className="space-y-2 text-xs sm:text-sm">
              <span className="font-mono text-xs text-blue-300 font-bold block uppercase">
                Paper 2 Section A / B [2 marks]
              </span>
              <p className="font-semibold text-white">
                Define the term <em>&lsquo;{topic.title}&rsquo;</em>.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300 text-xs font-mono">
                Mark Scheme: Clear, unambiguous 2-point definition stating primary business purpose and distinguishing operational characteristics.
              </div>
            </div>
          )}

          {activePracticeTab === "4m" && (
            <div className="space-y-2 text-xs sm:text-sm">
              <span className="font-mono text-xs text-blue-300 font-bold block uppercase">
                Paper 2 Section A / B [4 marks]
              </span>
              <p className="font-semibold text-white">
                Explain one advantage and one disadvantage of {topic.title} for a commercial business.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300 text-xs font-mono">
                Mark Scheme: 2 marks for balanced advantage with business context + 2 marks for realistic disadvantage or operational risk.
              </div>
            </div>
          )}

          {activePracticeTab === "10m" && (
            <div className="space-y-3 text-xs sm:text-sm">
              <span className="font-mono text-xs text-blue-300 font-bold block uppercase">
                Paper 1 / Paper 2 Section C Essay [10 marks]
              </span>
              <p className="font-semibold text-white leading-relaxed">
                With reference to an organization of your choice, evaluate {topic.examPromptTakeaway.slice(0, 140)}...
              </p>
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-400/20 text-xs text-blue-200 font-mono space-y-1.5">
                <span className="font-bold text-blue-300 block">
                  SLAP Evaluation Rubric:
                </span>
                <div>• <strong>S</strong>takeholders: Conflicting impacts (shareholders vs staff vs customers).</div>
                <div>• <strong>L</strong>ong vs Short Term: Upfront capital costs vs long-run viability.</div>
                <div>• <strong>A</strong>ssumptions: Underlying market &amp; STEEPLE assumptions.</div>
                <div>• <strong>P</strong>riorities: Decisive, fully justified strategic recommendation.</div>
              </div>
            </div>
          )}
        </div>

        {/* Core Application Challenge */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5">
          <div className="text-xs font-mono font-bold text-white/80 uppercase flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Interactive Checkpoint Challenge</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            Based on <strong>{topic.title}</strong>: How does {topic.subSections[0]?.title || "this principle"} directly impact strategic decision-making and operational risk for an organization?
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowCheckpointHint((prev) => !prev)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
              <span>{showCheckpointHint ? "Hide Strategy Clue" : "Need a Clue?"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCheckpointAnswer((prev) => !prev)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border border-blue-400/30 transition-all cursor-pointer"
            >
              {showCheckpointAnswer ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hide Model Answer</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Model Answer</span>
                </>
              )}
            </button>
          </div>

          {showCheckpointHint && (
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/25 text-xs text-blue-100 leading-relaxed font-sans">
              <span className="font-bold text-blue-300 font-mono">
                Analytical Clue:{" "}
              </span>
              {topic.analysis.coreThesis.slice(0, 180)}... Focus on conflicting stakeholder interests and short-term vs long-term trade-offs.
            </div>
          )}

          {showCheckpointAnswer && (
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-400/30 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-blue-300 font-mono font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Exemplar Syllabus Answer &amp; Examiner Criteria:</span>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans">
                {topic.analysis.strategicEvaluationAO3AO4}
              </p>
            </div>
          )}
        </div>

        {/* Academic Handwritten Notes Surface */}
        <section className="pt-2">
          <AcademicNotesSurface
            note={noteText}
            onChange={(text) => setTopicNote(topic.id, text)}
            title="Personal Seminar &amp; Case Marginalia"
            subtitle="Saved automatically to your offline codex"
            itemCode={topic.displayCode}
            minRows={5}
            accentColor="#2563eb"
          />
        </section>
      </section>
    </article>
  );
});

export default TopicBentoCard;
