"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FlaskConical,
  Clock,
  Check,
  ChevronDown,
  Layers,
  Lightbulb,
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

  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

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
      transition={{ type: "spring", mass: 1, stiffness: 220, damping: 26 }}
      className="max-w-5xl mx-auto space-y-6 pb-20"
    >
      {/* 1. Hero Bento Header */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 space-y-5 relative overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300">
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
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/45 ml-1">
              <Clock className="w-3.5 h-3.5" />
              ~{topic.readingTimeMinutes} min
            </span>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Previous Topic"
              aria-label="Previous Topic"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNextTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
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
                  : "bg-white/[0.06] border-white/15 text-white/60 hover:text-white"
              }`}
              title="Bookmark Topic"
              aria-label="Bookmark Topic"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isCompleted
                  ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? "Topic Mastered" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 text-sm text-white/90 leading-relaxed">
          <MathText text={topic.summary} />
        </div>
      </div>

      {/* 2. Core Digest / Primer (Scannable Bento Split) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Bento: High-Yield Key Takeaways */}
        <div className="md:col-span-7 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Core Takeaways</span>
            </div>

            <div className="space-y-2.5">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-3.5 flex items-start gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <div className="flex-1">
                    <MathText text={bullet} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-emerald-300/70 flex items-center justify-between border-t border-white/8">
            <span>Essential IB Syllabus Mechanisms</span>
            <span>Paper 1 &amp; 2 Core</span>
          </div>
        </div>

        {/* Right Bento: 5-Minute Conceptual Primer */}
        <div className="md:col-span-5 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4" />
              <span>5-Minute Conceptual Primer</span>
            </div>

            <div className="text-xs sm:text-sm text-white/80 leading-relaxed space-y-2.5">
              <MathText text={topic.primer5Min} />
            </div>
          </div>

          <div className="pt-2 border-t border-white/8 text-[11px] font-mono text-cyan-300/70">
            Strategic Scope: {topic.strategicImportance}
          </div>
        </div>
      </div>

      {/* 3. Essential Formulas & Principles */}
      {(topic.primaryFormulas.length > 0 || topic.conceptTracking.length > 0) && (
        <div className="liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
            <FlaskConical className="w-4 h-4" />
            <span>Essential Formulas &amp; Unifying Principles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Formulas Column */}
            {topic.primaryFormulas.length > 0 && (
              <div className={`${topic.conceptTracking.length > 0 ? "md:col-span-6" : "md:col-span-12"} space-y-2.5`}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  Primary Formulas &amp; Equations
                </span>
                {topic.primaryFormulas.map((formula, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-black/55 border border-emerald-400/25 px-4 py-3 overflow-x-auto text-center"
                  >
                    <MathFormula formula={formula} displayMode={false} className="text-sm text-emerald-200" />
                  </div>
                ))}
              </div>
            )}

            {/* Unifying Themes Column */}
            {topic.conceptTracking.length > 0 && (
              <div className={`${topic.primaryFormulas.length > 0 ? "md:col-span-6" : "md:col-span-12"} space-y-2.5`}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  Cross-Theme Unifying Concepts
                </span>
                <div className="flex flex-wrap gap-2">
                  {topic.conceptTracking.map((ct) => {
                    const c = BIOLOGY_CONCEPTS[ct.conceptId];
                    if (!c) return null;
                    return (
                      <div
                        key={ct.conceptId}
                        className="px-3 py-2 rounded-xl text-xs border flex items-center gap-2"
                        style={{
                          backgroundColor: c.badgeBg,
                          borderColor: c.badgeBorder,
                          color: c.badgeText,
                        }}
                      >
                        <span className="font-semibold">{c.shortName}</span>
                        <span className="text-white/70 text-[11px]">· {ct.manifestation}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Structured Sub-Sections / Syllabus Points */}
      {studyLensMode !== "primer" && filteredSubSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-300/85">
              Syllabus Points &amp; Subunit Mechanisms
            </h2>
            <span className="text-[11px] font-mono text-white/45">
              {filteredSubSections.filter((s) => completedSubSections[`${topic.id}:${s.id}`]).length} /{" "}
              {filteredSubSections.length} completed
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredSubSections.map((sub) => {
              const subDone = !!completedSubSections[`${topic.id}:${sub.id}`];
              return (
                <div
                  key={sub.id}
                  className={`liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-3.5 border transition-all duration-300 ${
                    subDone
                      ? "border-emerald-500/35 bg-emerald-950/[0.04]"
                      : "border-white/10 hover:border-emerald-400/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/10 text-white/80 font-semibold">
                          {sub.marker}
                        </span>
                        {sub.isHLOnly && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-lime-500/20 border border-lime-400/35 text-lime-300 font-semibold">
                            HL ONLY
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {sub.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                      className={`p-2 rounded-xl border cursor-pointer transition-colors shrink-0 ${
                        subDone
                          ? "bg-emerald-500/25 border-emerald-400/40 text-emerald-300"
                          : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                      }`}
                      title="Mark subunit complete"
                      aria-label={`Mark ${sub.marker} complete`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    <MathText text={sub.content} />
                  </p>

                  {sub.keyFormulaOrFramework && (
                    <div className="rounded-2xl bg-black/60 border border-emerald-400/25 px-4 py-3 overflow-x-auto text-center">
                      <MathFormula formula={sub.keyFormulaOrFramework} displayMode className="text-emerald-200" />
                    </div>
                  )}

                  <div className="rounded-2xl bg-emerald-500/[0.07] border border-emerald-400/20 p-3.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300 font-bold block mb-1">
                      Analytical Exam Takeaway:
                    </span>
                    <MathText text={sub.analyticalTakeaway} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Real-World Case Connections & Examiner Traps (Split Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Real-World Case Studies */}
        <div className="md:col-span-6 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
            <Microscope className="w-4 h-4" />
            <span>Real-World Biological Applications</span>
          </div>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {topic.analysis.realWorldConnections}
          </p>

          {topic.cases.length > 0 && (
            <div className="space-y-3 pt-1">
              {topic.cases.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{c.title}</h4>
                    <span className="text-[11px] font-mono text-cyan-300/80">
                      {c.domainOrContext}
                    </span>
                  </div>
                  <p className="text-xs text-white/75 leading-relaxed">
                    <MathText text={c.biologicalMechanism} />
                  </p>
                  <div className="text-xs font-mono text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-3 py-2">
                    <MathText text={c.quantitativeInsight} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Examiner Traps & Blueprint */}
        <div className="md:col-span-6 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-300">
            <AlertTriangle className="w-4 h-4" />
            <span>Examiner Traps ({topic.examBlueprint.commandTerm})</span>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 space-y-2">
            <span className="text-[10px] font-mono uppercase text-white/45 block">
              Paper 2 Structured Prompt:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white">
              {topic.examBlueprint.paper2StructuredPrompt}
            </p>
            <p className="text-xs text-white/75 leading-relaxed">
              {topic.examBlueprint.idealSolutionBreakdown.keyMarkSchemePoints}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-amber-100/90 bg-amber-500/10 border border-amber-400/25 rounded-2xl p-4 leading-relaxed">
            <span className="font-mono uppercase text-[10px] font-bold text-amber-300 block mb-1">
              Paper 1 Distractor Trap:
            </span>
            {topic.examBlueprint.paper1TrapPattern}
          </div>

          {topic.analysis.commonMisconceptions.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/45 block">
                Common Student Errors to Avoid:
              </span>
              <ul className="space-y-1.5">
                {topic.analysis.commonMisconceptions.map((m, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/80 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-rose-400 font-bold shrink-0">×</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 6. Quick Self-Check / Active Retrieval */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
            <HelpCircle className="w-4 h-4" />
            <span>Active Retrieval &amp; Mark Scheme Self-Check</span>
          </div>

          <div className="space-y-3.5">
            {topic.checkUnderstanding.map((cu) => {
              const showHint = !!revealedHints[cu.id];
              const showAns = !!revealedAnswers[cu.id];
              return (
                <div
                  key={cu.id}
                  className="rounded-2xl bg-white/[0.02] border border-white/8 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/70 uppercase">
                      {cu.promptType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    <MathText text={cu.question} />
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedHints((p) => ({ ...p, [cu.id]: !p[cu.id] }))
                      }
                      className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/80 cursor-pointer transition-colors"
                    >
                      {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedAnswers((p) => ({
                          ...p,
                          [cu.id]: !p[cu.id],
                        }))
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/35 text-xs text-emerald-200 font-medium cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showAns ? "Hide Mark Scheme" : "Reveal Model Answer"}</span>
                    </button>
                  </div>

                  {showHint && (
                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5 text-xs text-white/75 leading-relaxed">
                      💡 {cu.hints.join(" · ")}
                    </div>
                  )}

                  {showAns && (
                    <div className="rounded-2xl bg-emerald-950/30 border border-emerald-400/30 p-4 space-y-2.5">
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                        <MathText text={cu.modelAnswer} />
                      </p>
                      {cu.keyTermsToInclude.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cu.keyTermsToInclude.map((kt) => (
                            <span
                              key={kt}
                              className="px-2 py-0.5 rounded-md bg-black/50 border border-emerald-400/30 text-[10px] font-mono text-emerald-300"
                            >
                              ✓ {kt}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Bottom Complete & Next Action */}
      <div className="pt-2 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          onClick={goToPrevTopic}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-xs font-medium text-white/80 hover:text-white cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Topic</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isCompleted) toggleTopicCompletion(topic.id);
            goToNextTopic();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold cursor-pointer transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Complete {topic.displayCode} &amp; Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
