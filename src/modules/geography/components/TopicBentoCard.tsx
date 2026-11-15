"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Check,
  Calculator,
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
    levelFilter,
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  const [studioMode, setStudioMode] = useState<"theory" | "digest" | "traps">("theory");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const isDone = !!completedTopics[topic.id];
  const isSaved = !!bookmarkedTopics[topic.id];

  const visibleSubSections = topic.subSections.filter((sub) => {
    if (levelFilter === "SL") return !sub.isHLOnly;
    return true;
  });

  const matchedFormula = GEO_FORMULAS.find((f) => f.topicCode === topic.topicCode);

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <article
      key={topic.id}
      className="max-w-5xl mx-auto space-y-6 pb-20"
    >
      {/* =====================================================================
          1. ZEN HEADER: Title, Unit, Reading Time & Completion
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-teal-500/20 border border-teal-400/40 text-xs font-mono font-bold text-teal-200">
              {topic.topicCode}
            </span>
            <span
              className={cn(
                "px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border",
                topic.level === "HL ONLY"
                  ? "bg-rose-500/20 border-rose-400/35 text-rose-300"
                  : "bg-white/10 border-white/15 text-white/80"
              )}
            >
              {topic.level}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/45 ml-1">
              <Clock className="w-3.5 h-3.5" />
              ~{topic.readingTimeMinutes} min
            </span>
          </div>

          {/* Prev/Next & Completion Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Previous Topic"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNextTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Next Topic"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicBookmark(topic.id)}
              className={`p-2 rounded-xl border cursor-pointer transition-colors ${
                isSaved
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                  : "bg-white/[0.06] border-white/15 text-white/60 hover:text-white"
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isDone
                  ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDone ? "Topic Mastered" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-sans">
            {topic.title}
          </h1>
          <p className="text-sm text-white/65 leading-relaxed font-sans">
            {topic.subtitle}
          </p>
        </div>
      </div>

      {/* =====================================================================
          2. STUDIO MODE SWITCHER: 3 Clean Focused Tabs
          ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
        <button
          onClick={() => setStudioMode("theory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "theory"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Core Syllabus &amp; Subsections</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {visibleSubSections.length}
          </span>
        </button>

        <button
          onClick={() => setStudioMode("digest")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "digest"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>60s Takeaways &amp; Models</span>
        </button>

        <button
          onClick={() => setStudioMode("traps")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "traps"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Exam Traps &amp; Inquiry</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {topic.checkUnderstanding?.length || 0}
          </span>
        </button>
      </div>

      {/* =====================================================================
          3. ACTIVE STUDIO VIEW
          ===================================================================== */}
      {studioMode === "theory" && (
        <section className="space-y-5">
          {/* Spatial Scope Summary */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
              Spatial Scope &amp; Geographic Analysis
            </h3>
            <div className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
              <MathText text={topic.summary} />
            </div>
          </div>

          {/* Sub-Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-teal-300/85">
                Structured Syllabus Points &amp; Geographic Mechanisms
              </h2>
              <span className="text-[11px] font-mono text-white/45">
                {visibleSubSections.filter((s) => completedSubSections[`${topic.id}:${s.id}`]).length} /{" "}
                {visibleSubSections.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {visibleSubSections.map((sub) => {
                const subDone = !!completedSubSections[`${topic.id}:${sub.id}`];
                return (
                  <div
                    key={sub.id}
                    className={`liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border transition-all duration-300 ${
                      subDone
                        ? "border-teal-500/35 bg-teal-950/[0.05]"
                        : "border-white/10 hover:border-teal-400/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/10 text-white/80 font-semibold">
                            {sub.marker}
                          </span>
                          {sub.isHLOnly && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-400/35 text-rose-300 font-semibold">
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
                        className={`p-2 rounded-xl border cursor-pointer transition-all ${
                          subDone
                            ? "bg-teal-500 text-black border-teal-400"
                            : "bg-white/[0.04] text-white/35 hover:text-white border-white/10"
                        }`}
                        title={subDone ? "Mark Incomplete" : "Mark Complete"}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                    <div className="text-sm sm:text-[15px] text-white/85 leading-[1.8] font-sans">
                      <MathText text={sub.content} />
                    </div>

                    {sub.analyticalTakeaway && (
                      <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-400/20 text-xs text-teal-200 font-sans leading-relaxed">
                        <strong className="text-teal-300 font-mono text-[11px] uppercase mr-1">
                          Analytical Takeaway:
                        </strong>
                        <MathText text={sub.analyticalTakeaway} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {studioMode === "digest" && (
        <section className="space-y-5">
          {/* Speed-read Takeaways */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Core Takeaways</span>
            </div>

            <div className="space-y-3">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 flex items-start gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-teal-400 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                  <div className="flex-1 font-sans">
                    <MathText text={bullet} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Min Geographic Primer */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-3 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4" />
              <span>5-Minute Geographic Primer</span>
            </div>
            <div className="text-sm sm:text-[15px] text-white/85 leading-[1.8] font-sans">
              <MathText text={topic.primer5Min} />
            </div>
          </div>

          {/* Matched Quantitative Formula */}
          {matchedFormula && (
            <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-3 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
                <Calculator className="w-4 h-4" />
                <span>Quantitative Spatial Formula: {matchedFormula.name}</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-teal-400/20 text-center shadow-inner">
                <MathFormula latex={matchedFormula.formula} className="text-teal-200 text-sm" />
              </div>
              <div className="text-xs text-white/70 font-mono">
                Variables: {matchedFormula.variables}
              </div>
            </div>
          )}
        </section>
      )}

      {studioMode === "traps" && (
        <section className="space-y-5">
          {/* Inquiry Questions */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Teacher Will Ask — Geographic Evaluation
                </h3>
                <p className="text-xs text-white/50">
                  Anticipated class discussion prompts with model geographic responses
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {(topic.checkUnderstanding || []).map((iq) => {
                const isOpen = !!revealedAnswers[iq.id];
                return (
                  <div
                    key={iq.id}
                    className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {iq.question}
                      </p>
                      <button
                        onClick={() => toggleAnswer(iq.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-teal-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                      >
                        {isOpen ? "Hide Model Response" : "Reveal Model Response"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 rounded-xl bg-black/40 border border-teal-400/20 text-xs text-slate-200 leading-relaxed font-sans space-y-1">
                        <div>
                          <strong className="text-teal-300">Model Evaluation: </strong>
                          {iq.modelAnswer}
                        </div>
                        {iq.hints && iq.hints.length > 0 && (
                          <div className="text-white/60 text-[11px]">
                            <strong>Key Hints: </strong>
                            {iq.hints.join(" • ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Exam Pitfalls */}
          <div className="p-6 rounded-[28px] bg-teal-950/20 border border-teal-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Student Misconceptions &amp; Mark Scheme Pitfalls</span>
            </div>
            <div className="space-y-2.5">
              {(topic.analysis?.commonMisconceptions || topic.examBlueprint?.pitfallsToAvoid || []).map((p: string, pIdx: number) => (
                <div
                  key={pIdx}
                  className="rounded-xl p-3.5 bg-black/30 border border-teal-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed"
                >
                  <strong className="text-teal-300 font-mono text-[11px] uppercase mr-1.5">
                    Pitfall {pIdx + 1}:
                  </strong>
                  <MathText text={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
