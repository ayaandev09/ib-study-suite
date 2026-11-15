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
  FlaskConical,
  Clock,
  Layers,
  Check,
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
    levelFilter,
  } = useStudyStore();

  const [studioMode, setStudioMode] = useState<"theory" | "digest" | "traps">("theory");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics[topic.id];

  const filteredSubSections = topic.subSections.filter((s) => {
    if (levelFilter === "SL" && s.isHLOnly) return false;
    return true;
  });

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <article
      key={topic.id}
      className="w-full space-y-6 pb-20"
    >
      {/* =====================================================================
          1. ZEN HEADER: Topic Title, Metadata & Completion
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
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
                isBookmarked
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
          <span>Core Syllabus &amp; Theory</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {filteredSubSections.length}
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
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>60s High-Yield Digest &amp; Formulas</span>
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
          {/* Summary Narrative */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              Topic Conceptual Overview
            </h3>
            <div className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
              <MathText text={topic.summary} />
            </div>
          </div>

          {/* Structured Sub-Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-300/85">
                Syllabus Mechanisms &amp; Experimental Evidence
              </h2>
              <span className="text-[11px] font-mono text-white/45">
                {filteredSubSections.filter((s) => completedSubSections[`${topic.id}:${s.id}`]).length} /{" "}
                {filteredSubSections.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {filteredSubSections.map((sub) => {
                const subDone = !!completedSubSections[`${topic.id}:${sub.id}`];
                return (
                  <div
                    key={sub.id}
                    className={`liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border transition-all duration-300 ${
                      subDone
                        ? "border-emerald-500/35 bg-emerald-950/[0.05]"
                        : "border-white/10 hover:border-emerald-400/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3">
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
                        className={`p-2 rounded-xl border cursor-pointer transition-all ${
                          subDone
                            ? "bg-emerald-500 text-black border-emerald-400"
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
          {/* Speed-read Takeaways */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Core Takeaways</span>
            </div>

            <div className="space-y-3">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 flex items-start gap-3 text-xs sm:text-sm text-white/85 leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <div className="flex-1">
                    <MathText text={bullet} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Min Primer */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-3 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
              <BookOpen className="w-4 h-4" />
              <span>5-Minute Conceptual Primer</span>
            </div>
            <div className="text-sm sm:text-[15px] text-white/85 leading-[1.8] font-sans">
              <MathText text={topic.primer5Min} />
            </div>
          </div>

          {/* Formulas & Unifying Principles */}
          {(topic.primaryFormulas.length > 0 || topic.conceptTracking.length > 0) && (
            <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
                <FlaskConical className="w-4 h-4" />
                <span>Essential Formulas &amp; Unifying Principles</span>
              </div>

              {topic.primaryFormulas.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                    Equations &amp; Mathematical Formulations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topic.primaryFormulas.map((formula, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-black/55 border border-emerald-400/25 px-4 py-3.5 text-center shadow-inner"
                      >
                        <MathFormula formula={formula} displayMode={false} className="text-sm text-emerald-200" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topic.conceptTracking.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                    Cross-Theme Concepts
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
          )}
        </section>
      )}

      {studioMode === "traps" && (
        <section className="space-y-5">
          {/* Active Inquiry Questions */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Teacher Will Ask — Discussion &amp; Retrieval
                </h3>
                <p className="text-xs text-white/50">
                  Anticipated classroom discussion questions with model evaluation criteria
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
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-emerald-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                      >
                        {isOpen ? "Hide Evaluation" : "Reveal Evaluation"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 rounded-xl bg-black/40 border border-emerald-400/20 text-xs text-slate-200 leading-relaxed font-sans space-y-1">
                        <div>
                          <strong className="text-emerald-300">Model Answer: </strong>
                          {iq.modelAnswer}
                        </div>
                        {iq.hints && iq.hints.length > 0 && (
                          <div className="text-white/60 text-[11px]">
                            <strong className="text-white/80">Key Hints: </strong>
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

          {/* Common Exam Pitfalls & Traps */}
          <div className="p-6 rounded-[28px] bg-emerald-950/20 border border-emerald-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Student Misconceptions &amp; Mark Scheme Pitfalls</span>
            </div>
            <div className="space-y-2.5">
              {(topic.analysis?.commonMisconceptions || topic.examBlueprint?.pitfallsToAvoid || []).map((p: string, pIdx: number) => (
                <div
                  key={pIdx}
                  className="rounded-xl p-3.5 bg-black/30 border border-emerald-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed"
                >
                  <strong className="text-emerald-300 font-mono text-[11px] uppercase mr-1.5">
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
