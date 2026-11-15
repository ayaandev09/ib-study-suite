"use client";

import React, { useState } from "react";
import { TopicData, PHYSICS_CONCEPTS } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { MathFormula } from "@/modules/physics/components/MathFormula";
import { MathText } from "@/modules/physics/components/MathText";
import {
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertTriangle,
  Calculator,
  BookOpen,
  ArrowRight,
  Check,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

export const TopicBentoCard: React.FC<TopicBentoCardProps> = React.memo(({
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
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  const [studioMode, setStudioMode] = useState<"theory" | "digest" | "traps">("theory");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics?.[topic.id];

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`max-w-5xl mx-auto space-y-6 pb-20 ${
        isDeferred ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* =====================================================================
          1. ZEN HEADER: Title, Unit, Reading Time & Completion
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-xs font-mono font-bold text-indigo-300">
              {topic.displayCode || topic.topicCode}
            </span>
            <span
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border ${
                topic.level === "HL"
                  ? "bg-rose-500/15 border-rose-400/35 text-rose-300"
                  : "bg-white/10 border-white/15 text-white/80"
              }`}
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
            {showPrevNextControls && (
              <div className="flex items-center gap-1">
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
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isCompleted
                  ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? "text-emerald-400" : "text-white/40"}`} />
              <span>{isCompleted ? "Topic Mastered" : "Mark Complete"}</span>
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
            {topic.subSections.length}
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
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>60s Takeaways &amp; Equations</span>
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
          {/* Executive Summary */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
              Physical Foundations &amp; Conceptual Scope
            </h3>
            <div className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
              <MathText text={topic.summary} />
            </div>
          </div>

          {/* Sub-Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-indigo-300/85">
                Structured Syllabus Points &amp; Mathematical Derivations
              </h2>
              <span className="text-[11px] font-mono text-white/45">
                {topic.subSections.filter((s) => completedSubSections?.[s.id]).length} /{" "}
                {topic.subSections.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {topic.subSections.map((sub) => {
                const subDone = !!completedSubSections?.[sub.id];
                return (
                  <div
                    key={sub.id}
                    className={`liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border transition-all duration-300 ${
                      subDone
                        ? "border-indigo-500/35 bg-indigo-950/[0.05]"
                        : "border-white/10 hover:border-indigo-400/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/10 text-white/80 font-semibold">
                            {sub.marker}
                          </span>
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
                            ? "bg-indigo-500 text-white border-indigo-400"
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
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {studioMode === "digest" && (
        <section className="space-y-5">
          {/* High-Yield Speed Read Bullets */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Core Takeaways</span>
            </div>

            <div className="space-y-3">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 flex items-start gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                  <div className="flex-1 font-sans">
                    <MathText text={bullet} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Min Physics Primer */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-3 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4" />
              <span>5-Minute Conceptual Primer</span>
            </div>
            <div className="text-sm sm:text-[15px] text-white/85 leading-[1.8] font-sans">
              <MathText text={topic.primer5Min} />
            </div>
          </div>

          {/* Official Equations */}
          {topic.primaryFormulas && topic.primaryFormulas.length > 0 && (
            <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
                <Calculator className="w-4 h-4" />
                <span>Official Data Booklet Equations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topic.primaryFormulas.map((formula, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/50 border border-indigo-400/25 text-center shadow-inner"
                  >
                    <MathFormula math={formula} block className="text-indigo-200 text-sm" />
                  </div>
                ))}
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
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Teacher Will Ask — Physics Inquiry
                </h3>
                <p className="text-xs text-white/50">
                  Anticipated class discussion prompts with model physical evaluations
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
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-indigo-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                      >
                        {isOpen ? "Hide Model Response" : "Reveal Model Response"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 rounded-xl bg-black/40 border border-indigo-400/20 text-xs text-slate-200 leading-relaxed font-sans space-y-1">
                        <div>
                          <strong className="text-indigo-300">Model Evaluation: </strong>
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
          <div className="p-6 rounded-[28px] bg-indigo-950/20 border border-indigo-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Student Misconceptions &amp; Mark Scheme Pitfalls</span>
            </div>
            <div className="space-y-2.5">
              {(topic.analysis?.commonMisconceptions || topic.examBlueprint?.pitfallsToAvoid || []).map((p: string, pIdx: number) => (
                <div
                  key={pIdx}
                  className="rounded-xl p-3.5 bg-black/30 border border-indigo-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed"
                >
                  <strong className="text-indigo-300 font-mono text-[11px] uppercase mr-1.5">
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
});

TopicBentoCard.displayName = "TopicBentoCard";
