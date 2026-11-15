"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lightbulb,
  MapPin,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Compass,
  HelpCircle,
  Eye,
  ArrowRight,
  Check,
  Flame,
} from "lucide-react";
import type { TopicData } from "@/modules/geography/data/types";
import { GEO_CONCEPTS, GEO_FORMULAS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { MathText } from "./MathText";
import { MathFormula } from "./MathFormula";
import { cn } from "@/modules/geography/lib/cn";

export function TopicBentoCard({ topic }: { topic: TopicData }) {
  const {
    completedTopics,
    toggleTopicCompletion,
    completedSubSections,
    toggleSubSectionComplete,
    bookmarkedTopics,
    toggleTopicBookmark,
    studyLensMode,
    levelFilter,
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const isDone = !!completedTopics[topic.id];
  const isSaved = !!bookmarkedTopics[topic.id];

  const visibleSubSections = topic.subSections.filter((sub) => {
    if (levelFilter === "SL") return !sub.isHLOnly;
    return true;
  });

  const subFrameworks = visibleSubSections
    .map((s) => s.keyFormulaOrFramework)
    .filter((f): f is string => Boolean(f));

  // Matched formula from GEO_FORMULAS
  const matchedFormula = GEO_FORMULAS.find((f) => f.topicCode === topic.topicCode);

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
            <span className="px-3 py-1 rounded-xl bg-teal-500/20 border border-teal-400/40 text-xs font-mono font-bold text-teal-200">
              {topic.topicCode}
            </span>
            <span
              className={cn(
                "px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border",
                topic.level === "HL ONLY"
                  ? "bg-cyan-500/15 border-cyan-400/35 text-cyan-200"
                  : "bg-white/10 border-white/15 text-white/80"
              )}
            >
              {topic.level}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-teal-300/80">
              {topic.syllabusRef}
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
              onClick={() => React.startTransition(() => goToPrevTopic())}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Previous Topic"
              aria-label="Previous Topic"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => React.startTransition(() => goToNextTopic())}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Next Topic"
              aria-label="Next Topic"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicBookmark(topic.id)}
              className={cn(
                "p-2 rounded-xl border cursor-pointer transition-colors",
                isSaved
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                  : "bg-white/[0.06] border-white/15 text-white/60 hover:text-white"
              )}
              title="Bookmark Topic"
              aria-label="Bookmark Topic"
            >
              <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all",
                isDone
                  ? "bg-teal-500/25 border-teal-400/50 text-teal-100 shadow-[0_0_16px_rgba(20,184,166,0.25)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDone ? "Topic Mastered" : "Mark Complete"}</span>
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

        <div className="rounded-2xl bg-white/[0.03] border border-teal-500/15 p-4 sm:p-5 text-sm text-white/90 leading-relaxed">
          <MathText text={studyLensMode === "primer" ? topic.primer5Min : topic.summary} />
        </div>
      </div>

      {/* 2. Core Digest / Primer (Scannable Bento Split) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Bento: High-Yield Key Takeaways */}
        <div className="md:col-span-7 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Spatial Takeaways</span>
            </div>

            <div className="space-y-2.5">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-3.5 flex items-start gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal-400 shrink-0 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                  <div className="flex-1">
                    <MathText text={bullet} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-teal-300/70 flex items-center justify-between border-t border-white/8">
            <span>Core Syllabus Synthesis</span>
            <span>Paper 1 &amp; Paper 2 Focus</span>
          </div>
        </div>

        {/* Right Bento: 5-Minute Conceptual Primer & Core Thesis */}
        <div className="md:col-span-5 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4" />
              <span>5-Minute Conceptual Primer</span>
            </div>

            <div className="text-xs sm:text-sm text-white/80 leading-relaxed space-y-2.5">
              <MathText text={topic.analysis.coreThesis || topic.primer5Min} />
            </div>
          </div>

          <div className="pt-2 border-t border-white/8 text-[11px] font-mono text-cyan-300/70">
            Strategic Scope: {topic.strategicImportance}
          </div>
        </div>
      </div>

      {/* 3. Essential Formulas & Spatial Models */}
      {(subFrameworks.length > 0 || matchedFormula || topic.conceptTracking.length > 0) && (
        <div className="liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
            <Compass className="w-4 h-4" />
            <span>Key Formulas, Spatial Frameworks &amp; Geographic Lenses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Formulas Column */}
            {(matchedFormula || subFrameworks.length > 0) && (
              <div className={`${topic.conceptTracking.length > 0 ? "md:col-span-6" : "md:col-span-12"} space-y-2.5`}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  Spatial Models &amp; Quantitative Formulas
                </span>

                {matchedFormula && (
                  <div className="rounded-2xl bg-black/60 border border-teal-400/25 p-4 space-y-1.5 text-center">
                    <div className="text-xs font-semibold text-teal-300">{matchedFormula.name}</div>
                    <MathFormula latex={matchedFormula.formula} className="text-sm text-teal-200" />
                    <div className="text-[10px] font-mono text-white/50">Units: {matchedFormula.units}</div>
                  </div>
                )}

                {subFrameworks.map((fw, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-teal-950/30 border border-teal-400/20 px-4 py-3 text-xs sm:text-sm text-teal-100 leading-relaxed"
                  >
                    <MathText text={fw} />
                  </div>
                ))}
              </div>
            )}

            {/* Geographic Lenses Column */}
            {topic.conceptTracking.length > 0 && (
              <div className={`${(matchedFormula || subFrameworks.length > 0) ? "md:col-span-6" : "md:col-span-12"} space-y-2.5`}>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                  Unifying Geographic Concepts
                </span>
                <div className="flex flex-wrap gap-2">
                  {topic.conceptTracking.map((ct) => {
                    const c = GEO_CONCEPTS.find((concept) => concept.id === ct.conceptId);
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
      {studyLensMode !== "primer" && visibleSubSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
              Syllabus Points &amp; Spatial Processes
            </h2>
            <span className="text-[11px] font-mono text-white/45">
              {visibleSubSections.filter((s) => completedSubSections[`${topic.id}:${s.id}`]).length} /{" "}
              {visibleSubSections.length} completed
            </span>
          </div>

          <div className="space-y-3.5">
            {visibleSubSections.map((sub) => {
              const subKey = `${topic.id}:${sub.id}`;
              const subDone = !!completedSubSections[subKey];
              return (
                <div
                  key={sub.id}
                  className={cn(
                    "liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-3.5 border transition-all duration-300",
                    subDone
                      ? "border-teal-400/35 bg-teal-950/[0.04]"
                      : "border-white/10 hover:border-teal-400/25"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono text-xs font-bold text-teal-300">
                          {sub.marker}
                        </span>
                        {sub.isHLOnly && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
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
                      className={cn(
                        "p-2 rounded-xl border cursor-pointer transition-colors shrink-0",
                        subDone
                          ? "bg-teal-500/25 border-teal-400/40 text-teal-300"
                          : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                      )}
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
                    <div className="rounded-2xl bg-teal-950/30 border border-teal-400/20 px-4 py-3 text-xs sm:text-sm text-teal-200">
                      <MathText text={sub.keyFormulaOrFramework} />
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 rounded-2xl bg-white/[0.03] border border-white/10 p-3.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
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
        {/* Named Case Studies & Quantitative Evidence */}
        <div className="md:col-span-6 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
            <MapPin className="w-4 h-4" />
            <span>Named Case Studies &amp; Evidence</span>
          </div>

          {topic.cases.length > 0 ? (
            <div className="space-y-3">
              {topic.cases.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-teal-500/20 bg-white/[0.03] p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-teal-300">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      {c.regionOrContext}
                    </span>
                    <span className="text-white/45">{c.syllabusLink}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {c.title}
                  </h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    <MathText text={c.geographicMechanism} />
                  </p>
                  <div className="rounded-xl bg-teal-500/10 border border-teal-400/20 px-3 py-1.5 text-xs font-mono text-teal-200">
                    <MathText text={c.quantitativeInsight} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              {topic.analysis.realWorldConnections}
            </p>
          )}
        </div>

        {/* Examiner Traps & IB Exam Blueprint */}
        <div className="md:col-span-6 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
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
            <div className="text-xs sm:text-sm text-amber-100/90 bg-amber-500/10 border border-amber-400/25 rounded-xl p-3">
              <span className="font-bold text-amber-300">Common Paper 1 Trap: </span>
              {topic.examBlueprint.paper1TrapPattern}
            </div>
          </div>

          <div className="space-y-2 text-xs text-white/80">
            <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3">
              <div className="font-mono text-[10px] uppercase text-teal-300 mb-0.5">
                1. Principles &amp; Models
              </div>
              {topic.examBlueprint.idealSolutionBreakdown.statePrinciples}
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3">
              <div className="font-mono text-[10px] uppercase text-teal-300 mb-0.5">
                2. Data &amp; Analysis
              </div>
              {topic.examBlueprint.idealSolutionBreakdown.showWorking}
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/8 p-3">
              <div className="font-mono text-[10px] uppercase text-teal-300 mb-0.5">
                3. Case &amp; Multi-Scale Evaluation
              </div>
              {topic.examBlueprint.idealSolutionBreakdown.caseAndScale}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Quick Self-Check / Active Retrieval */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
            <HelpCircle className="w-4 h-4" />
            <span>Active Retrieval &amp; Mark Scheme Self-Check</span>
          </div>

          <div className="space-y-3.5">
            {topic.checkUnderstanding.map((item) => {
              const showAns = !!revealedAnswers[item.id];
              const showHints = !!revealedHints[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono text-white/70 uppercase">
                      {item.promptType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                    <MathText text={item.question} />
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedHints((p) => ({
                          ...p,
                          [item.id]: !p[item.id],
                        }))
                      }
                      className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/80 cursor-pointer transition-colors"
                    >
                      {showHints ? "Hide Hints" : "Show Hints"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedAnswers((p) => ({
                          ...p,
                          [item.id]: !p[item.id],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/35 text-xs font-medium text-teal-200 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showAns ? "Hide Model Answer" : "Reveal Model Answer"}</span>
                    </button>
                  </div>

                  {showHints && (
                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5 text-xs text-white/75 leading-relaxed">
                      💡 {item.hints.join(" · ")}
                    </div>
                  )}

                  {showAns && (
                    <div className="rounded-2xl border border-teal-400/30 bg-teal-950/30 p-4 text-xs sm:text-sm text-white/90 leading-relaxed space-y-2.5">
                      <MathText text={item.modelAnswer} />
                      {item.keyTermsToInclude.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.keyTermsToInclude.map((kw) => (
                            <span
                              key={kw}
                              className="px-2 py-0.5 rounded-md bg-black/50 border border-teal-400/30 text-[10px] font-mono text-teal-200"
                            >
                              ✓ {kw}
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

      {/* 7. Bottom Navigation Footer */}
      <div className="pt-2 flex items-center justify-between gap-3 relative z-20">
        <button
          type="button"
          onClick={() => React.startTransition(() => goToPrevTopic())}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-xs font-medium text-white/80 hover:text-white cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Topic</span>
        </button>
        <button
          type="button"
          onClick={() =>
            React.startTransition(() => {
              if (!isDone) toggleTopicCompletion(topic.id);
              goToNextTopic();
            })
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-bold cursor-pointer transition-all shadow-[0_4px_20px_rgba(20,184,166,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Complete {topic.topicCode} &amp; Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
