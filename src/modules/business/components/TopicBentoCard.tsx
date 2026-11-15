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
    setActiveConceptFilter,
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
      className={`space-y-5 topic-transition-enter ${
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
          1. HERO BENTO HEADER
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-white/10 text-white border border-white/15">
                {topic.displayCode}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-400/25">
                {unit?.title.split(":")[0] || `UNIT ${topic.unitNumber}`}
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-xl border ${
                  topic.level === "HL ONLY"
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                    : "bg-white/[0.06] text-slate-300 border-white/10"
                }`}
              >
                {topic.level}
              </span>
              <span
                className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-xl border ${
                  IMPORTANCE_BADGE_STYLES[topic.strategicImportance]
                }`}
              >
                {topic.strategicImportance}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/[0.05] text-slate-300 border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {topic.readingTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {topic.title}
            </h1>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              {topic.subtitle}
            </p>
            <div className="text-xs text-slate-400 font-mono">
              SYLLABUS REF: {topic.syllabusRef}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

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
                  ? "bg-blue-500/25 border border-blue-400/50 text-blue-200 shadow-[0_0_20px_-4px_rgba(37,99,235,0.5)]"
                  : "bg-white/10 hover:bg-blue-500/20 text-white border border-white/20 hover:border-blue-400/40"
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

        {/* Postural Switcher */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              type="button"
              onClick={() => setLearningPosture("learn-new")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "learn-new"
                  ? "bg-blue-500/25 border border-blue-400/40 text-blue-200"
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
                  ? "bg-blue-500/25 border border-blue-400/40 text-blue-200"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30 transition-all cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Practice Active Recall</span>
          </button>
        </div>
      </section>

      {/* =====================================================================
          2. CORE SYNTHESIS & EXECUTIVE SUMMARY BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Core Executive Synthesis
            </h2>
          </div>
          {learningPosture === "pre-lesson-cram" && (
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-200 border border-blue-400/30">
              Rapid Cram Mode
            </span>
          )}
        </div>

        <p className="text-sm text-slate-200 leading-relaxed">{topic.summary}</p>

        <div className="space-y-2.5">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              <div className="w-5 h-5 rounded-full bg-blue-400/15 text-blue-300 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/25">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {!speedReadMode && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Strategic Thesis
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {topic.analysis.coreThesis}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <span className="font-mono text-xs font-semibold text-blue-300 flex items-center gap-1.5">
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
          3. SUB-SECTIONS, FORMULAS & CUEGIS CONCEPTS BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Sub-Sections &amp; Quantitative / BMT Frameworks ({completedSubsCount}/
              {topic.subSections.length})
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400">
            {Math.round(
              (completedSubsCount / (topic.subSections.length || 1)) * 100
            )}
            %
          </span>
        </div>

        <div className="space-y-3">
          {topic.subSections.map((sub) => {
            const isSubDone = !!completedSubSections[sub.id];
            return (
              <div
                key={sub.id}
                className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                  isSubDone
                    ? "bg-blue-500/[0.05] border-blue-500/30"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer mt-0.5 shrink-0"
                  >
                    {isSubDone ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-lg bg-white/10 text-slate-300">
                      {sub.marker}
                    </span>
                    <h3
                      className={`text-sm font-bold text-white ${
                        isSubDone ? "line-through text-slate-500" : ""
                      }`}
                    >
                      {sub.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                  {sub.content}
                </p>

                <div className="ml-6 p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-xs text-blue-200">
                  <span className="font-bold text-blue-300">
                    Exam Takeaway:{" "}
                  </span>
                  {sub.analyticalTakeaway}
                </div>

                {sub.keyFormulaOrFramework && (
                  <div className="ml-6 p-3 rounded-xl bg-white/[0.04] border border-blue-400/25 font-mono text-xs text-blue-300">
                    <span className="font-bold">Formula / Core Rule: </span>
                    {sub.keyFormulaOrFramework}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connected BMT Tools */}
        {topic.analysis.connectedBMTTools.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
            <span className="font-mono text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Connected BMT Decision Tools
            </span>
            <div className="flex flex-wrap gap-1.5">
              {topic.analysis.connectedBMTTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-xs font-mono bg-white/[0.06] text-slate-200 border border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {topic.analysis.realWorldConnections}
            </p>
          </div>
        )}

        {/* CCES Concept Alignment */}
        {topic.conceptTracking.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                IB BM Key Concepts Alignment (CCES)
              </h3>
            </div>
            <div className="space-y-2.5">
              {topic.conceptTracking.map((track) => {
                const def = CONCEPTS_TAXONOMY[track.conceptId];
                return (
                  <div
                    key={track.conceptId}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg ${def.badgeBg} ${def.badgeText} border ${def.badgeBorder}`}
                      >
                        {def.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        Intensity {track.intensity}/5
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(track.intensity / 5) * 100}%`,
                          backgroundColor: def.color,
                          boxShadow: `0 0 8px ${def.glowColor}`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
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
          4. REAL-WORLD CASE STUDIES BENTO
          ===================================================================== */}
      {topic.cases.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Real-World Corporate Case Studies ({topic.cases.length})
            </h2>
          </div>

          <div className="space-y-3">
            {topic.cases.map((cs) => {
              const isBookmarked = !!bookmarkedCases[cs.id];
              return (
                <div
                  key={cs.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {cs.company}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        {cs.context}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleBookmarkCase(cs.id)}
                      className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                        isBookmarked
                          ? "bg-blue-400/20 text-blue-300"
                          : "text-slate-500 hover:text-blue-300 hover:bg-white/5"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Case"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {cs.application}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
                    <span className="font-mono text-purple-300 font-bold">
                      Evaluation:{" "}
                    </span>
                    {cs.evaluationAO3AO4}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cs.concepts.map((cid) => {
                      const def = CONCEPTS_TAXONOMY[cid];
                      return (
                        <button
                          type="button"
                          key={cid}
                          onClick={() => {
                            setActiveConceptFilter(cid);
                            setViewMode("matrix");
                          }}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-mono border cursor-pointer ${def.badgeBg} ${def.badgeText} ${def.badgeBorder}`}
                        >
                          {def.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================================
          5. IB EXAMINER TRAPS & EVALUATION STRATEGY BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            IB Examiner Traps &amp; Evaluation Strategy
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-400/25 space-y-2">
          <span className="font-mono text-xs font-semibold text-rose-300 block">
            Common Exam Pitfalls &amp; Misconceptions
          </span>
          <ul className="space-y-1.5">
            {topic.analysis.commonMisconceptions.map((misc, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-200 flex items-start gap-2"
              >
                <span className="text-rose-400 font-bold shrink-0">⚠</span>
                <span>{misc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-blue-950/25 border border-blue-400/25 space-y-1.5">
          <span className="font-mono text-xs font-semibold text-blue-300 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            Evaluation Grid (AO3 Analysis &amp; AO4 Evaluation)
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {topic.analysis.strategicEvaluationAO3AO4}
          </p>
        </div>

        {/* Practice Exam Prompts */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-blue-300 uppercase">
              Practice Exam Prompts &amp; Mark Scheme
            </span>
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/5 border border-white/10">
              {(["2m", "4m", "10m"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActivePracticeTab(tab)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePracticeTab === tab
                      ? "bg-white/20 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "2m"
                    ? "2M (AO1)"
                    : tab === "4m"
                    ? "4M (AO2)"
                    : "10M (AO3)"}
                </button>
              ))}
            </div>
          </div>

          {activePracticeTab === "2m" && (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="font-semibold text-white">
                Define the term &lsquo;
                {topic.subSections[0]?.title.split(":")[0] || topic.title}
                &rsquo;. [2 marks]
              </div>
              <div className="text-slate-300 pl-3 border-l border-blue-400/40">
                <strong className="text-blue-300">Mark Scheme Key: </strong>
                Award [1] for basic outline and [2] for an authoritative,
                syllabus-accurate definition with key criteria.
              </div>
            </div>
          )}

          {activePracticeTab === "4m" && (
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="font-semibold text-white">
                Explain one advantage and one disadvantage of{" "}
                {topic.subSections[0]?.title} for a commercial business. [4
                marks]
              </div>
              <div className="text-slate-300 pl-3 border-l border-blue-400/40 space-y-1">
                <div>
                  <strong className="text-blue-300">Advantage: </strong>
                  {topic.subSections[0]?.analyticalTakeaway}
                </div>
                <div>
                  <strong className="text-blue-300">Disadvantage: </strong>
                  {topic.analysis.commonMisconceptions[0] ||
                    "High capital setup cost and operational transition friction."}
                </div>
              </div>
            </div>
          )}

          {activePracticeTab === "10m" && (
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="font-semibold text-white">
                With reference to an organization of your choice, evaluate{" "}
                {topic.examPromptTakeaway.slice(0, 140)}... [10 marks]
              </div>
              <div className="p-3 rounded-xl bg-blue-950/35 border border-blue-400/20 text-xs text-blue-200 font-mono space-y-1">
                <div className="font-bold text-blue-300">
                  SLAP Evaluation Formula:
                </div>
                <div>
                  • <strong>S</strong>takeholders: Conflicting impacts
                  (shareholders vs staff vs customers).
                </div>
                <div>
                  • <strong>L</strong>ong-term vs Short-term: Upfront costs vs
                  long-run strategic viability.
                </div>
                <div>
                  • <strong>A</strong>ssumptions: External STEEPLE conditions.
                </div>
                <div>
                  • <strong>P</strong>riorities: Decisive, justified final
                  recommendation.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          6. KEY TAKEAWAYS, SELF-CHECK & SCRATCHPAD BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpenCheck className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Key Takeaways &amp; Interactive Self-Check
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="text-xs font-mono font-bold text-white/70 uppercase flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>Core Application Challenge</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            Based on <strong>{topic.title}</strong>: How does{" "}
            {topic.subSections[0]?.title || "this business principle"} directly
            impact strategic decision-making and operational risk for a
            commercial organization?
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowCheckpointHint((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {showCheckpointHint ? "Hide Strategy Clue" : "Need a Clue?"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowCheckpointAnswer((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30 transition-all cursor-pointer"
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
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/25 text-xs text-blue-100 leading-relaxed">
              <span className="font-bold text-blue-300 font-mono">
                Analytical Clue:{" "}
              </span>
              {topic.analysis.coreThesis.slice(0, 180)}... Focus on conflicting
              stakeholder interests and short-term vs long-term trade-offs.
            </div>
          )}

          {showCheckpointAnswer && (
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-400/30 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-blue-300 font-mono font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Exemplar Syllabus Answer &amp; Examiner Criteria:</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {topic.analysis.strategicEvaluationAO3AO4}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-white/80 uppercase">
              10-Mark &amp; 20-Mark Evaluation Advice:
            </span>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              {topic.examPromptTakeaway}
            </p>
          </div>
        </div>

        {/* Revision Scratchpad */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowScratchpad((prev) => !prev)}
              className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wide cursor-pointer hover:text-blue-200"
            >
              <StickyNote className="w-4 h-4" />
              <span>
                {showScratchpad
                  ? "Hide Revision Scratchpad"
                  : "Open Revision Scratchpad"}
                {noteText ? " (Notes Saved)" : ""}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowScratchpad((prev) => !prev)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              {showScratchpad ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {showScratchpad && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <AcademicNotesSurface
                note={noteText}
                onChange={(text) => setTopicNote(topic.id, text)}
                title="Personal Seminar & Case Marginalia"
                itemCode={topic.displayCode}
                minRows={5}
                accentColor="#2563eb"
              />
            </div>
          )}
        </div>
      </section>
    </article>
  );
});
