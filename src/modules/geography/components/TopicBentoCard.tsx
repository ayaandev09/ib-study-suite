"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import type { TopicData } from "@/modules/geography/data/types";
import { GEO_CONCEPTS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { MathText } from "./MathText";
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

  const [revealedAnswers, setRevealedAnswers] = useState<
    Record<string, boolean>
  >({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>(
    {}
  );

  const isDone = !!completedTopics[topic.id];
  const isSaved = !!bookmarkedTopics[topic.id];

  const visibleSubSections = topic.subSections.filter((sub) => {
    if (levelFilter === "SL") return !sub.isHLOnly;
    if (levelFilter === "HL") return true;
    return true;
  });

  const subFrameworks = visibleSubSections
    .map((s) => s.keyFormulaOrFramework)
    .filter((f): f is string => Boolean(f));

  return (
    <article className="space-y-5 pb-12">
      {/* Hero Bento Header */}
      <div className="liquid-glass-bento rounded-3xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-teal-500/20 border border-teal-400/35 font-mono text-xs font-bold text-teal-200">
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
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-teal-300/75">
              {topic.syllabusRef}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/45">
              <Clock className="w-3.5 h-3.5" />
              {topic.readingTimeMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-1.5">
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
                "px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all",
                isSaved
                  ? "bg-amber-500/15 border-amber-400/35 text-amber-200"
                  : "bg-white/[0.05] border-white/10 text-white/65 hover:text-white"
              )}
            >
              <Bookmark
                className={cn("w-3.5 h-3.5", isSaved && "fill-current")}
              />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all",
                isDone
                  ? "bg-teal-500/25 border-teal-400/45 text-teal-100 shadow-[0_0_16px_rgba(20,184,166,0.2)]"
                  : "bg-white/[0.06] border-white/15 text-white/80 hover:text-white hover:bg-white/[0.12]"
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDone ? "Mastered" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm text-white/65">{topic.subtitle}</p>
        </div>

        <div className="rounded-2xl border border-teal-500/15 bg-white/[0.03] p-4 text-sm text-white/85 leading-relaxed">
          <MathText
            text={studyLensMode === "primer" ? topic.primer5Min : topic.summary}
          />
        </div>
      </div>

      {/* Core Concept & High-Yield Synthesis */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-teal-300">
          <Sparkles className="w-4 h-4" />
          <span>Core Concept &amp; High-Yield Synthesis</span>
        </div>

        <ul className="space-y-2.5">
          {topic.speedReadBullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-white/85 leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
              <span>
                <MathText text={b} />
              </span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Core Thesis &amp; 5-Minute Primer</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            <MathText text={topic.analysis.coreThesis || topic.primer5Min} />
          </p>
        </div>
      </div>

      {/* Key Models, Metrics & Geographic Concepts */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-cyan-300">
          <Compass className="w-4 h-4" />
          <span>Key Models, Metrics &amp; Geographic Lenses</span>
        </div>

        {subFrameworks.length > 0 ? (
          <div className="space-y-2.5">
            {subFrameworks.map((fw, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-teal-400/20 bg-teal-950/30 px-4 py-3 text-xs sm:text-sm text-teal-100 leading-relaxed"
              >
                <MathText text={fw} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-sm text-white/75 leading-relaxed">
            {topic.strategicImportance}
          </div>
        )}

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-xs sm:text-sm text-white/75 leading-relaxed">
          <span className="font-mono text-[10px] uppercase tracking-wider text-teal-300 block mb-1">
            Exam Prompt Takeaway
          </span>
          <MathText text={topic.examPromptTakeaway} />
        </div>

        {topic.conceptTracking.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {topic.conceptTracking.map((ct) => {
              const c = GEO_CONCEPTS.find(
                (concept) => concept.id === ct.conceptId
              );
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
                    · {ct.manifestation}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Structured Sub-Sections / Syllabus Points */}
      {studyLensMode !== "primer" && visibleSubSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
              Syllabus Points &amp; Spatial Processes
            </h2>
            <span className="text-[11px] font-mono text-white/45">
              {
                visibleSubSections.filter(
                  (s) => completedSubSections[`${topic.id}:${s.id}`]
                ).length
              }{" "}
              / {visibleSubSections.length} checked
            </span>
          </div>

          {visibleSubSections.map((sub) => {
            const subKey = `${topic.id}:${sub.id}`;
            const subDone = !!completedSubSections[subKey];
            return (
              <div
                key={sub.id}
                className={cn(
                  "liquid-glass-card rounded-3xl p-6 space-y-3.5 transition-colors",
                  subDone && "border-teal-400/35"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono text-xs font-bold text-teal-300">
                        {sub.marker}
                      </span>
                      {sub.isHLOnly && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30">
                          HL ONLY
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {sub.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-mono border cursor-pointer transition-colors shrink-0",
                      subDone
                        ? "bg-teal-500/20 border-teal-400/35 text-teal-200"
                        : "bg-white/[0.03] border-white/10 text-white/50 hover:text-white"
                    )}
                  >
                    {subDone ? "Done" : "Check"}
                  </button>
                </div>

                <p className="text-sm text-white/85 leading-relaxed">
                  <MathText text={sub.content} />
                </p>

                {sub.keyFormulaOrFramework && (
                  <div className="rounded-xl border border-teal-400/20 bg-teal-950/30 px-4 py-2.5 text-xs sm:text-sm text-teal-200">
                    <MathText text={sub.keyFormulaOrFramework} />
                  </div>
                )}

                <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-xs sm:text-sm text-white/80 leading-relaxed">
                  <Lightbulb className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <MathText text={sub.analyticalTakeaway} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Named Case Studies & Quantitative Evidence */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-teal-300">
          <MapPin className="w-4 h-4" />
          <span>Named Case Studies &amp; Quantitative Evidence</span>
        </div>

        {topic.cases.length > 0 ? (
          <div className="space-y-3">
            {topic.cases.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-teal-500/20 bg-white/[0.03] p-5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-teal-300">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.regionOrContext}
                  </span>
                  <span className="text-white/45">{c.syllabusLink}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  <MathText text={c.geographicMechanism} />
                </p>
                <div className="rounded-xl bg-teal-500/10 border border-teal-400/20 px-3.5 py-2 text-xs font-mono text-teal-200">
                  <MathText text={c.quantitativeInsight} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/75 leading-relaxed">
            {topic.analysis.realWorldConnections}
          </p>
        )}
      </div>

      {/* Examiner Traps & IB Exam Blueprint */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-amber-300">
          <AlertTriangle className="w-4 h-4" />
          <span>IB Exam Blueprint · {topic.examBlueprint.commandTerm}</span>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2.5">
          <div className="text-sm font-semibold text-white">
            {topic.examBlueprint.paper2StructuredPrompt}
          </div>
          <div className="text-xs sm:text-sm text-amber-200/90 bg-amber-500/10 border border-amber-400/20 rounded-xl p-3">
            <span className="font-semibold text-amber-300">Common Trap: </span>
            {topic.examBlueprint.paper1TrapPattern}
          </div>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-white/80">
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="font-mono text-[10px] text-teal-300 mb-1">
              1. PRINCIPLES
            </div>
            {topic.examBlueprint.idealSolutionBreakdown.statePrinciples}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="font-mono text-[10px] text-teal-300 mb-1">
              2. ANALYSIS
            </div>
            {topic.examBlueprint.idealSolutionBreakdown.showWorking}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5">
            <div className="font-mono text-[10px] text-teal-300 mb-1">
              3. CASE &amp; SCALE
            </div>
            {topic.examBlueprint.idealSolutionBreakdown.caseAndScale}
          </div>
        </div>
      </div>

      {/* Active Recall / Check Your Understanding */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
            <HelpCircle className="w-4 h-4" />
            <span>Active Recall &amp; Check Your Understanding</span>
          </div>

          <div className="space-y-4">
            {topic.checkUnderstanding.map((item) => {
              const showAns = !!revealedAnswers[item.id];
              const showHints = !!revealedHints[item.id];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-teal-500/20 bg-white/[0.03] p-5 space-y-3"
                >
                  <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    <MathText text={item.question} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedHints((p) => ({
                          ...p,
                          [item.id]: !p[item.id],
                        }))
                      }
                      className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-white/75 cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-xs font-medium text-teal-200 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>
                        {showAns ? "Hide Model Answer" : "Reveal Model Answer"}
                      </span>
                    </button>
                  </div>

                  {showHints && (
                    <ul className="space-y-1 text-xs sm:text-sm text-white/70 pl-4 list-disc">
                      {item.hints.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}

                  {showAns && (
                    <div className="rounded-xl border border-teal-400/25 bg-teal-950/30 p-4 text-xs sm:text-sm text-white/85 leading-relaxed space-y-2.5">
                      <MathText text={item.modelAnswer} />
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.keyTermsToInclude.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-md bg-teal-500/15 text-[11px] font-mono text-teal-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next Topic Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => React.startTransition(() => goToPrevTopic())}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs text-white/80 cursor-pointer transition-colors"
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/35 text-xs font-semibold text-teal-100 cursor-pointer transition-colors"
        >
          <span>Complete {topic.topicCode} &amp; Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
