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
  FlaskConical,
  Clock,
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
      className="space-y-5 pb-16"
    >
      {/* Hero Bento Header */}
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
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/45">
              <Clock className="w-3.5 h-3.5" />~{topic.readingTimeMinutes} min
            </span>
          </div>

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
              aria-label="Bookmark Topic"
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
              <span>{isCompleted ? "Topic Mastered" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {topic.title}
          </h1>
          <p className="text-sm text-white/60">{topic.subtitle}</p>
        </div>

        <p className="text-sm text-white/85 leading-relaxed">
          <MathText text={topic.summary} />
        </p>
      </div>

      {/* Core Concept & High-Yield Synthesis */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-green-300">
          <Sparkles className="w-4 h-4" />
          <span>Core Concept &amp; High-Yield Synthesis</span>
        </div>

        <ul className="space-y-2.5">
          {topic.speedReadBullets.map((b, i) => (
            <li
              key={i}
              className="text-sm text-white/85 flex items-start gap-2.5 leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
              <span>
                <MathText text={b} />
              </span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-teal-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>5-Minute Conceptual Primer</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            <MathText text={topic.primer5Min} />
          </p>
        </div>
      </div>

      {/* Key Equations & Unifying Concepts */}
      {(topic.primaryFormulas.length > 0 || topic.conceptTracking.length > 0) && (
        <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
            <FlaskConical className="w-4 h-4" />
            <span>Key Equations, Frameworks &amp; Unifying Concepts</span>
          </div>

          {topic.primaryFormulas.length > 0 ? (
            <div className="space-y-2.5">
              {topic.primaryFormulas.map((formula, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-black/50 border border-green-400/20 px-4 py-3 overflow-x-auto"
                >
                  <MathFormula
                    formula={formula}
                    displayMode={false}
                    className="text-sm text-green-200"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-sm text-white/75 leading-relaxed">
              {topic.strategicImportance}
            </div>
          )}

          {topic.conceptTracking.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
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
                      · {ct.manifestation}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Structured Sub-Sections / Syllabus Points */}
      {studyLensMode !== "primer" && filteredSubSections.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-green-300/85">
              Syllabus Points &amp; Mechanisms
            </h2>
            <span className="text-[11px] font-mono text-white/45">
              {
                filteredSubSections.filter(
                  (s) => completedSubSections[`${topic.id}:${s.id}`]
                ).length
              }{" "}
              / {filteredSubSections.length} reviewed
            </span>
          </div>

          {filteredSubSections.map((sub) => {
            const subDone = !!completedSubSections[`${topic.id}:${sub.id}`];
            return (
              <div
                key={sub.id}
                className={`liquid-glass-card rounded-3xl p-6 space-y-3.5 transition-colors ${
                  subDone ? "border-green-400/35" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/75">
                        {sub.marker}
                      </span>
                      {sub.isHLOnly && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-lime-500/20 border border-lime-400/35 text-lime-300 font-semibold">
                          HL ONLY
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {sub.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSubSectionComplete(topic.id, sub.id)}
                    className={`p-2 rounded-xl border cursor-pointer transition-colors shrink-0 ${
                      subDone
                        ? "bg-green-500/20 border-green-400/40 text-green-300"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                    }`}
                    title="Mark section reviewed"
                    aria-label={`Mark ${sub.marker} reviewed`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-white/85 leading-relaxed">
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

                <div className="rounded-xl bg-green-500/[0.08] border border-green-400/20 px-4 py-3 text-xs sm:text-sm text-green-100/90 leading-relaxed">
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

      {/* Real-World Applications & Case Studies */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-300">
          <Microscope className="w-4 h-4" />
          <span>Real-World Applications &amp; Case Studies</span>
        </div>

        <p className="text-sm text-white/80 leading-relaxed">
          {topic.analysis.realWorldConnections}
        </p>

        {topic.cases.length > 0 && (
          <div className="space-y-3 pt-1">
            {topic.cases.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <span className="text-[11px] font-mono text-teal-300/80">
                    {c.domainOrContext}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  <MathText text={c.biologicalMechanism} />
                </p>
                <div className="text-xs font-mono text-green-300/90 bg-green-500/10 border border-green-400/20 rounded-xl px-3 py-2">
                  <MathText text={c.quantitativeInsight} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Examiner Traps & Blueprint */}
      <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-300">
          <AlertTriangle className="w-4 h-4" />
          <span>
            Examiner Traps &amp; Blueprint ({topic.examBlueprint.commandTerm})
          </span>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2">
          <p className="text-sm font-semibold text-white">
            {topic.examBlueprint.paper2StructuredPrompt}
          </p>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            {topic.examBlueprint.idealSolutionBreakdown.keyMarkSchemePoints}
          </p>
        </div>

        <div className="text-xs sm:text-sm text-amber-200/90 bg-amber-500/10 border border-amber-400/25 rounded-2xl p-4 leading-relaxed">
          <span className="font-mono uppercase text-[11px] mr-1.5 text-amber-300">
            Paper 1 Trap:
          </span>
          {topic.examBlueprint.paper1TrapPattern}
        </div>

        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">
            Common Misconceptions
          </div>
          <ul className="space-y-2">
            {topic.analysis.commonMisconceptions.map((m, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-white/80 flex gap-2.5 leading-relaxed"
              >
                <span className="text-rose-400 shrink-0 font-bold">×</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Active Recall / Self-Check */}
      {topic.checkUnderstanding.length > 0 && (
        <div className="liquid-glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
            <HelpCircle className="w-4 h-4" />
            <span>Active Recall &amp; Self-Check</span>
          </div>

          <div className="space-y-4">
            {topic.checkUnderstanding.map((cu) => {
              const showHint = !!revealedHints[cu.id];
              const showAns = !!revealedAnswers[cu.id];
              return (
                <div
                  key={cu.id}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 space-y-3"
                >
                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
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
                        setRevealedAnswers((p) => ({
                          ...p,
                          [cu.id]: !p[cu.id],
                        }))
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-400/35 text-xs text-green-200 font-medium cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {showAns ? "Hide Mark Scheme" : "Reveal Model Answer"}
                    </button>
                  </div>

                  {showHint && (
                    <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5 text-xs sm:text-sm text-white/75">
                      {cu.hints.join(" · ")}
                    </div>
                  )}

                  {showAns && (
                    <div className="rounded-2xl bg-green-500/10 border border-green-400/30 p-4 space-y-2.5">
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                        <MathText text={cu.modelAnswer} />
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cu.keyTermsToInclude.map((kt) => (
                          <span
                            key={kt}
                            className="px-2 py-0.5 rounded-md bg-black/40 border border-green-400/25 text-[11px] font-mono text-green-300"
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
          </div>
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
          <span>Complete {topic.displayCode} &amp; Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
}
