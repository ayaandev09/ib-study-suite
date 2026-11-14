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
} from "lucide-react";
import type { TopicData } from "@/modules/geography/data/types";
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

  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const isDone = !!completedTopics[topic.id];
  const isSaved = !!bookmarkedTopics[topic.id];

  const visibleSubSections = topic.subSections.filter((sub) => {
    if (levelFilter === "SL") return !sub.isHLOnly;
    if (levelFilter === "HL") return true;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Card */}
      <div className="rounded-[28px] border border-teal-500/25 bg-gradient-to-br from-[#061818]/90 via-[#041010]/95 to-[#020808] p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-xl bg-teal-500/20 border border-teal-400/35 font-mono text-xs font-bold text-teal-200">
              {topic.topicCode}
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-teal-300/80">
              {topic.syllabusRef}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-white/45">
              <Clock className="w-3.5 h-3.5" />
              {topic.readingTimeMinutes} min
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleTopicBookmark(topic.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all",
                isSaved
                  ? "bg-amber-500/15 border-amber-400/35 text-amber-200"
                  : "bg-white/[0.04] border-white/10 text-white/65 hover:text-white"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", isSaved && "fill-current")} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={() => toggleTopicCompletion(topic.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all",
                isDone
                  ? "bg-teal-500/25 border-teal-400/45 text-teal-100"
                  : "bg-white/[0.04] border-white/10 text-white/65 hover:text-white"
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDone ? "Mastered" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm text-white/65 mt-1.5">{topic.subtitle}</p>
        </div>

        <div className="rounded-2xl border border-teal-500/15 bg-white/[0.03] p-4 text-sm text-white/85 leading-relaxed">
          <MathText text={studyLensMode === "primer" ? topic.primer5Min : topic.summary} />
        </div>
      </div>

      {/* Speed-Read Bullets */}
      <div className="rounded-[24px] border border-teal-500/15 bg-[#041010]/85 p-5 space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
          High-Yield Synthesis Bullets
        </h2>
        <ul className="space-y-2">
          {topic.speedReadBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
              <MathText text={b} />
            </li>
          ))}
        </ul>
      </div>

      {/* Deep Subsections */}
      {studyLensMode !== "primer" && (
        <div className="space-y-4">
          {visibleSubSections.map((sub) => {
            const subKey = `${topic.id}:${sub.id}`;
            const subDone = !!completedSubSections[subKey];
            return (
              <div
                key={sub.id}
                className="rounded-[24px] border border-teal-500/15 bg-[#041111]/85 p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono text-xs font-bold text-teal-300">
                      {sub.marker}
                    </span>
                    <h3 className="text-base font-bold text-white">{sub.title}</h3>
                    {sub.isHLOnly && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30">
                        HL ONLY
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors",
                      subDone
                        ? "bg-teal-500/20 border-teal-400/35 text-teal-200"
                        : "bg-white/[0.03] border-white/10 text-white/50 hover:text-white"
                    )}
                  >
                    {subDone ? "Done" : "Check"}
                  </button>
                </div>

                <p className="text-sm text-white/80 leading-relaxed">
                  <MathText text={sub.content} />
                </p>

                {sub.keyFormulaOrFramework && (
                  <div className="rounded-xl border border-teal-400/20 bg-teal-950/30 px-3.5 py-2 text-xs text-teal-200">
                    <MathText text={sub.keyFormulaOrFramework} />
                  </div>
                )}

                <div className="flex items-start gap-2 rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-xs text-white/75">
                  <Lightbulb className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <MathText text={sub.analyticalTakeaway} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Case Studies */}
      {topic.cases.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300 px-1">
            Named Case Studies &amp; Quantitative Evidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topic.cases.map((c) => (
              <div
                key={c.id}
                className="rounded-[22px] border border-teal-500/20 bg-[#041111]/85 p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-teal-300">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.regionOrContext}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{c.title}</h3>
                <p className="text-xs text-white/75 leading-relaxed">
                  <MathText text={c.geographicMechanism} />
                </p>
                <div className="rounded-xl bg-teal-500/10 border border-teal-400/20 px-3 py-1.5 text-[11px] font-mono text-teal-200">
                  <MathText text={c.quantitativeInsight} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check Your Understanding */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300 px-1">
            Check Your Understanding
          </h2>
          {topic.checkUnderstanding.map((item) => {
            const showAns = !!revealedAnswers[item.id];
            const showHints = !!revealedHints[item.id];
            return (
              <div
                key={item.id}
                className="rounded-[22px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-3"
              >
                <div className="text-sm font-semibold text-white">
                  <MathText text={item.question} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setRevealedHints((p) => ({ ...p, [item.id]: !p[item.id] }))
                    }
                    className="px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs text-white/75"
                  >
                    {showHints ? "Hide Hints" : "Show Hints"}
                  </button>
                  <button
                    onClick={() =>
                      setRevealedAnswers((p) => ({ ...p, [item.id]: !p[item.id] }))
                    }
                    className="px-3 py-1 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-xs font-medium text-teal-200"
                  >
                    {showAns ? "Hide Model Answer" : "Reveal Model Answer"}
                  </button>
                </div>

                {showHints && (
                  <ul className="space-y-1 text-xs text-white/65 pl-4 list-disc">
                    {item.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                {showAns && (
                  <div className="rounded-xl border border-teal-400/25 bg-teal-950/30 p-3.5 text-xs text-white/85 leading-relaxed space-y-2">
                    <MathText text={item.modelAnswer} />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.keyTermsToInclude.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md bg-teal-500/15 text-[10px] font-mono text-teal-200"
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
      )}

      {/* Exam Blueprint */}
      <div className="rounded-[24px] border border-amber-500/20 bg-amber-950/10 p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-amber-300">
          <AlertTriangle className="w-4 h-4" />
          <span>IB Exam Blueprint · {topic.examBlueprint.commandTerm}</span>
        </div>
        <div className="text-sm font-semibold text-white">
          {topic.examBlueprint.paper2StructuredPrompt}
        </div>
        <div className="text-xs text-white/70">
          <span className="font-semibold text-amber-200">Common Trap: </span>
          {topic.examBlueprint.paper1TrapPattern}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/75 pt-1">
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
            <div className="font-mono text-[10px] text-teal-300 mb-1">1. PRINCIPLES</div>
            {topic.examBlueprint.idealSolutionBreakdown.statePrinciples}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
            <div className="font-mono text-[10px] text-teal-300 mb-1">2. ANALYSIS</div>
            {topic.examBlueprint.idealSolutionBreakdown.showWorking}
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
            <div className="font-mono text-[10px] text-teal-300 mb-1">3. CASE &amp; SCALE</div>
            {topic.examBlueprint.idealSolutionBreakdown.caseAndScale}
          </div>
        </div>
      </div>

      {/* Prev / Next Topic Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => React.startTransition(() => goToPrevTopic())}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white/75"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Topic</span>
        </button>
        <button
          onClick={() => React.startTransition(() => goToNextTopic())}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-xs font-medium text-teal-100"
        >
          <span>Next Topic</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
