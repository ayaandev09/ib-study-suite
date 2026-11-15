"use client";

import React, { useState } from "react";
import {
  TopicData,
  SYLLABUS_UNITS,
} from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Wrench,
  HelpCircle,
  Check,
  Building2,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

type StudioMode = "theory" | "digest" | "traps";

export const TopicBentoCard = React.memo(function TopicBentoCard({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}: TopicBentoCardProps) {
  const {
    completedTopics,
    completedSubSections,
    toggleTopicComplete,
    toggleSubSectionComplete,
    goToPrevTopic,
    goToNextTopic,
  } = useStudyStore();

  const [studioMode, setStudioMode] = useState<StudioMode>("theory");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isCompleted = !!completedTopics[topic.id];
  const unit = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);

  return (
    <article
      key={topic.id}
      id={`topic-card-${topic.id}`}
      className={`max-w-5xl mx-auto space-y-6 pb-20 topic-transition-enter ${
        isDeferred ? "deferred-chapter-card" : ""
      }`}
    >
      {/* =====================================================================
          1. ZEN HEADER: Title, Unit, Reading Time & Completion
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-400/40 text-xs font-mono font-bold text-blue-300">
              {topic.displayCode || `Unit ${topic.topicCode}`}
            </span>
            <span
              className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border ${
                topic.level === "HL ONLY"
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
              onClick={() => toggleTopicComplete(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.06] text-white/70 hover:text-white border-white/15 hover:bg-white/[0.12]"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-400" : "text-white/40"}`} />
              <span>{isCompleted ? "Topic Completed" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {topic.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-white/60 font-sans leading-relaxed">
          {topic.subtitle}
        </p>

        {/* Syllabus Arc */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-white/50">
          <span>{unit?.title || `Unit ${topic.unitNumber}`}</span>
          <span className="text-white/20">•</span>
          <span>{topic.syllabusRef}</span>
          <span className="text-white/20">•</span>
          <span className="text-blue-300/80">{topic.strategicImportance}</span>
        </div>
      </div>

      {/* =====================================================================
          2. STUDIO MODE SWITCHER
          ===================================================================== */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-fit">
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
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>60s Takeaways &amp; Strategic Cases</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {topic.speedReadBullets.length}
          </span>
        </button>

        <button
          onClick={() => setStudioMode("traps")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "traps"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Exam Traps &amp; Discussion</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {(topic.analysis?.commonMisconceptions?.length || 0) + (topic.cases?.length || 0)}
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
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              Operations &amp; Strategic Scope
            </h3>
            <p className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
              {topic.summary}
            </p>
          </div>

          {/* Sub-Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/60">
                Syllabus Subsections ({topic.subSections.length})
              </h3>
            </div>

            <div className="space-y-3">
              {topic.subSections.map((sub) => {
                const subDone = !!completedSubSections[sub.id];
                return (
                  <div
                    key={sub.id}
                    className={`liquid-glass-card rounded-[24px] p-6 space-y-4 border transition-all ${
                      subDone
                        ? "border-blue-500/35 bg-blue-950/[0.05]"
                        : "border-white/10 hover:border-blue-400/25"
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
                            ? "bg-blue-500 text-white border-blue-400"
                            : "bg-white/[0.04] text-white/35 hover:text-white border-white/10"
                        }`}
                        title={subDone ? "Mark Incomplete" : "Mark Complete"}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                    <p className="text-sm sm:text-[15px] text-white/85 leading-[1.8] font-sans whitespace-pre-line">
                      {sub.content}
                    </p>

                    {sub.analyticalTakeaway && (
                      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 text-xs text-blue-200 font-sans leading-relaxed">
                        <strong className="text-blue-300 font-mono text-[11px] uppercase mr-1">
                          Analytical Takeaway:
                        </strong>
                        {sub.analyticalTakeaway}
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
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300">
              <Sparkles className="w-4 h-4" />
              <span>High-Yield Strategic Takeaways</span>
            </div>
            <div className="space-y-2.5">
              {topic.speedReadBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-white/90 leading-relaxed font-sans">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 border border-blue-400/30">
                    {idx + 1}
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Real-World Cases */}
          {topic.cases && topic.cases.length > 0 && (
            <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
                <Building2 className="w-4 h-4" />
                <span>Real-World Business Case Applications</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {topic.cases.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white block">{c.company}</span>
                      <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-400/30">
                        {c.syllabusLink}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed font-sans">{c.application}</p>
                    <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-400/20 text-xs text-blue-200">
                      <strong>AO3/AO4 Evaluation: </strong>
                      {c.evaluationAO3AO4}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision-Making Toolkit */}
          {topic.analysis?.connectedBMTTools && topic.analysis.connectedBMTTools.length > 0 && (
            <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-4 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
                <Wrench className="w-4 h-4" />
                <span>Connected BMT Decision-Making Tools</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.analysis.connectedBMTTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {studioMode === "traps" && (
        <section className="space-y-5">
          {/* Exam Prompt Takeaway */}
          {topic.examPromptTakeaway && (
            <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-300">
                <HelpCircle className="w-4 h-4" />
                <span>Examiner Prompt &amp; Focus</span>
              </div>
              <p className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
                {topic.examPromptTakeaway}
              </p>
            </div>
          )}

          {/* Inquiry / Case Discussion */}
          {topic.cases && topic.cases.length > 0 && (
            <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Teacher Will Ask — Boardroom Discussion
                  </h3>
                  <p className="text-xs text-white/50">
                    Anticipated case prompts with strategic evaluation rubrics
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {topic.cases.map((c, idx) => {
                  const isOpen = !!revealedAnswers[idx];
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                          Case Study ({c.company}): How does this firm strategically balance risk and return in {topic.title}?
                        </p>
                        <button
                          onClick={() => toggleAnswer(idx)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-blue-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                        >
                          {isOpen ? "Hide Evaluation" : "Reveal Evaluation"}
                        </button>
                      </div>

                      {isOpen && (
                        <div className="p-3 rounded-xl bg-black/40 border border-blue-400/20 text-xs text-slate-200 leading-relaxed font-sans space-y-1">
                          <strong className="text-blue-300">Application Context: </strong>
                          {c.context}
                          <div className="mt-1 text-slate-300">
                            <strong>AO3/AO4 Criteria: </strong> {c.evaluationAO3AO4}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Common Exam Pitfalls */}
          <div className="p-6 rounded-[28px] bg-blue-950/20 border border-blue-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              <AlertCircle className="w-4 h-4" />
              <span>Common Student Misconceptions &amp; Mark Scheme Pitfalls</span>
            </div>
            <div className="space-y-2.5">
              {(topic.analysis?.commonMisconceptions || []).map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-xl p-3.5 bg-black/30 border border-blue-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed"
                >
                  <strong className="text-blue-300 font-mono text-[11px] uppercase mr-1.5">
                    Pitfall {pIdx + 1}:
                  </strong>
                  {p}
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
