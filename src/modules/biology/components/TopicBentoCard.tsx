"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Eye,
  BookOpen,
  Microscope,
} from "lucide-react";
import { TopicData, BIOLOGY_CONCEPTS } from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { MathText } from "./MathText";
import { MathFormula } from "./MathFormula";

export function TopicBentoCard({ topic }: { topic: TopicData }) {
  const {
    completedTopics,
    toggleTopicCompletion,
    completedSubSections,
    toggleSubSectionComplete,
    bookmarkedTopics,
    toggleTopicBookmark,
    goToNextTopic,
    goToPrevTopic,
    studyLensMode,
    levelFilter,
  } = useStudyStore();

  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>(
    {}
  );
  const [revealedAnswers, setRevealedAnswers] = useState<
    Record<string, boolean>
  >({});

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics[topic.id];

  const filteredSubSections = topic.subSections.filter((s) => {
    if (levelFilter === "SL" && s.isHLOnly) return false;
    return true;
  });

  return (
    <motion.article
      key={topic.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", mass: 1.1, stiffness: 220, damping: 26 }}
      className="space-y-4 pb-16"
    >
      {/* Header Bento Card */}
      <div className="liquid-glass-bento rounded-3xl p-6 space-y-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-green-500/20 border border-green-400/35 text-xs font-mono font-bold text-green-300">
              {topic.displayCode}
            </span>
            <span
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border ${
                topic.level === "HL ONLY"
                  ? "bg-lime-500/15 border-lime-400/35 text-lime-300"
                  : "bg-white/10 border-white/15 text-white/80"
              }`}
            >
              {topic.level}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-[11px] font-mono text-white/60">
              {topic.orgLevel}
            </span>
            <span className="text-[11px] font-mono text-white/40">
              ~{topic.readingTimeMinutes} min
            </span>
          </div>

          {/* Prev / Next / Mastered / Bookmark Controls */}
          <div className="flex items-center gap-1.5 relative z-20">
            <button
              type="button"
              onClick={goToPrevTopic}
              className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.16] border border-white/15 text-white/80 hover:text-white cursor-pointer transition-colors"
              title="Previous Topic"
              aria-label="Previous Topic"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNextTopic}
              className="p-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.16] border border-white/15 text-white/80 hover:text-white cursor-pointer transition-colors"
              title="Next Topic"
              aria-label="Next Topic"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicBookmark(topic.id)}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                isBookmarked
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                  : "bg-white/[0.07] border-white/15 text-white/60 hover:text-white"
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isCompleted
                  ? "bg-green-500/25 border-green-400/50 text-green-200 shadow-[0_0_16px_rgba(34,197,94,0.2)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? "Topic Mastered" : "Mark Mastered"}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm text-white/60 mt-1">{topic.subtitle}</p>
        </div>

        <p className="text-sm text-white/85 leading-relaxed">
          <MathText text={topic.summary} />
        </p>

        {/* Speed-Read Bullets */}
        <div className="rounded-2xl bg-black/45 border border-white/10 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-green-300/80">
            <Sparkles className="w-3.5 h-3.5" />
            High-Yield Syllabus Synthesis
          </div>
          <ul className="space-y-1.5">
            {topic.speedReadBullets.map((b, i) => (
              <li
                key={i}
                className="text-xs sm:text-[13px] text-white/80 flex items-start gap-2 leading-relaxed"
              >
                <span className="text-green-400 mt-1 shrink-0">•</span>
                <span>
                  <MathText text={b} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5-Minute Primer */}
      <div className="liquid-glass-card rounded-3xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
          <BookOpen className="w-4 h-4" />
          5-Minute Conceptual Primer
        </div>
        <p className="text-sm text-white/80 leading-relaxed">
          <MathText text={topic.primer5Min} />
        </p>
      </div>

      {/* Sub-sections (hidden in primer-only mode) */}
      {studyLensMode !== "primer" && (
        <div className="space-y-3">
          {filteredSubSections.map((sub) => {
            const subDone = !!completedSubSections[`${topic.id}:${sub.id}`];
            return (
              <div
                key={sub.id}
                className="liquid-glass-card rounded-3xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                        {sub.marker}
                      </span>
                      {sub.isHLOnly && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-lime-500/20 border border-lime-400/35 text-lime-300 font-semibold">
                          HL ONLY
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-white">
                      {sub.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className={`p-1.5 rounded-xl border cursor-pointer transition-colors shrink-0 ${
                      subDone
                        ? "bg-green-500/20 border-green-400/40 text-green-300"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                    }`}
                    title="Mark section reviewed"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-white/80 leading-relaxed">
                  <MathText text={sub.content} />
                </p>

                {sub.keyFormulaOrFramework && (
                  <div className="rounded-2xl bg-black/55 border border-green-400/25 px-4 py-3 overflow-x-auto">
                    <MathFormula
                      formula={sub.keyFormulaOrFramework}
                      displayMode
                      className="text-green-200"
                    />
                  </div>
                )}

                <div className="rounded-xl bg-green-500/[0.08] border border-green-400/20 px-3.5 py-2.5 text-xs text-green-100/90">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-green-300 mr-2">
                    Exam Takeaway:
                  </span>
                  <MathText text={sub.analyticalTakeaway} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Exam Blueprint & Misconceptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="liquid-glass-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300">
            <Microscope className="w-4 h-4" />
            IB Exam Blueprint ({topic.examBlueprint.commandTerm})
          </div>
          <p className="text-xs font-semibold text-white">
            {topic.examBlueprint.paper2StructuredPrompt}
          </p>
          <p className="text-xs text-white/75 leading-relaxed">
            {topic.examBlueprint.idealSolutionBreakdown.keyMarkSchemePoints}
          </p>
          <div className="text-[11px] text-amber-200/85 bg-amber-500/10 border border-amber-400/25 rounded-xl p-2.5">
            <span className="font-mono uppercase text-[10px] mr-1.5">
              Paper 1 Trap:
            </span>
            {topic.examBlueprint.paper1TrapPattern}
          </div>
        </div>

        <div className="liquid-glass-card rounded-3xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-300">
            <AlertTriangle className="w-4 h-4" />
            Common Misconceptions & Real World
          </div>
          <ul className="space-y-1.5">
            {topic.analysis.commonMisconceptions.map((m, i) => (
              <li key={i} className="text-xs text-white/75 flex gap-2">
                <span className="text-rose-400">×</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/60 border-t border-white/10 pt-2.5">
            <span className="font-mono text-[10px] uppercase text-teal-300 mr-1.5">
              Context:
            </span>
            {topic.analysis.realWorldConnections}
          </p>
        </div>
      </div>

      {/* Check Your Understanding */}
      {topic.checkUnderstanding.map((cu) => {
        const showHint = !!revealedHints[cu.id];
        const showAns = !!revealedAnswers[cu.id];
        return (
          <div
            key={cu.id}
            className="liquid-glass-card rounded-3xl p-5 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
              <HelpCircle className="w-4 h-4" />
              Check Your Understanding
            </div>
            <p className="text-sm font-medium text-white">
              <MathText text={cu.question} />
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setRevealedHints((p) => ({ ...p, [cu.id]: !p[cu.id] }))
                }
                className="px-3 py-1.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 text-xs text-white/80 cursor-pointer"
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setRevealedAnswers((p) => ({ ...p, [cu.id]: !p[cu.id] }))
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/35 text-xs text-green-200 font-medium cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                {showAns ? "Hide Mark Scheme" : "Reveal Model Answer"}
              </button>
            </div>

            {showHint && (
              <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3 text-xs text-white/70">
                {cu.hints.join(" · ")}
              </div>
            )}

            {showAns && (
              <div className="rounded-2xl bg-green-500/10 border border-green-400/30 p-3.5 space-y-2">
                <p className="text-xs text-white/90 leading-relaxed">
                  <MathText text={cu.modelAnswer} />
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cu.keyTermsToInclude.map((kt) => (
                    <span
                      key={kt}
                      className="px-2 py-0.5 rounded-md bg-black/40 border border-green-400/25 text-[10px] font-mono text-green-300"
                    >
                      {kt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Concept Tracking Badges */}
      {topic.conceptTracking.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topic.conceptTracking.map((ct) => {
            const c = BIOLOGY_CONCEPTS[ct.conceptId];
            if (!c) return null;
            return (
              <div
                key={ct.conceptId}
                className="px-3 py-1.5 rounded-xl text-xs border flex items-center gap-2"
                style={{
                  backgroundColor: c.badgeBg,
                  borderColor: c.badgeBorder,
                  color: c.badgeText,
                }}
              >
                <span className="font-semibold">{c.shortName}</span>
                <span className="text-white/70 text-[11px]">
                  {ct.manifestation}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Complete & Continue Button */}
      <div className="pt-2 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          onClick={goToPrevTopic}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-xs font-medium text-white/80 hover:text-white cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isCompleted) toggleTopicCompletion(topic.id);
            goToNextTopic();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-white/90 text-black text-xs font-semibold cursor-pointer transition-all shadow-[0_4px_20px_rgba(34,197,94,0.28)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>
            Complete {topic.displayCode} &amp; Continue
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
