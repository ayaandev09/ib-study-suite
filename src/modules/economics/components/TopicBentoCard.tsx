"use client";

import React, { useState } from "react";
import {
  TopicData,
  KEY_CONCEPTS,
  DIAGRAMS_DOSSIER,
} from "@/modules/economics/data";
import { useStudyStore } from "@/modules/economics/store/useStudyStore";
import { RecallFlipCard } from "@/modules/economics/components/RecallFlipCard";
import { InteractiveDiagram } from "./InteractiveDiagram";
import { MathFormula } from "./MathFormula";
import { AcademicNotesRenderer } from "./AcademicNotesRenderer";
import { AcademicNotesSurface } from "./AcademicNotesSurface";
import {
  GraduationCap,
  Zap,
  CheckCircle2,
  Circle,
  Bookmark,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Layers,
  HelpCircle,
  FileText,
  AlertTriangle,
  Lightbulb,
  Globe2,
  BookOpen,
  Calculator,
} from "lucide-react";

interface TopicBentoCardProps {
  topic: TopicData;
  isDeferred?: boolean;
  showPrevNextControls?: boolean;
}

const TopicBentoCardComponent: React.FC<TopicBentoCardProps> = ({
  topic,
  isDeferred = false,
  showPrevNextControls = true,
}) => {
  const {
    learningPosture,
    setLearningPosture,
    completedTopics,
    toggleTopicCompleted,
    bookmarkedTopics,
    toggleTopicBookmarked,
    topicNotes,
    saveTopicNote,
    goToNextTopic,
    goToPrevTopic,
  } = useStudyStore();

  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics[topic.id];
  const currentNote = topicNotes[topic.id] || "";

  const [activeCheckId, setActiveCheckId] = useState<string | null>(null);
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [useHandwrittenNotes, setUseHandwrittenNotes] = useState<boolean>(true);
  const [activeLocalDiagramId, setActiveLocalDiagramId] = useState<string>(
    topic.diagramIds[0] || ""
  );

  const currentDiagramId = topic.diagramIds.includes(activeLocalDiagramId)
    ? activeLocalDiagramId
    : topic.diagramIds[0] || "";

  const unitNum = topic.unitId.replace("unit-", "");

  return (
    <article
      id={`topic-card-${topic.id}`}
      className={`space-y-5 topic-transition-enter ${
        isDeferred ? "deferred-chapter-card" : ""
      }`}
    >
      <RecallFlipCard
        moduleCode={topic.displayCode}
        title={`${topic.displayCode} · ${topic.title}`}
        prompt={topic.examPromptTakeaway || topic.summary}
        answer={topic.analysis.coreThesis || topic.summary}
        accent="#0ea5e9"
        secondary="#0284c7"
        meta="ACTIVE RECALL"
      />

      {/* =====================================================================
          1. HERO BENTO HEADER
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/40">
                Unit {unitNum} • Topic {topic.displayCode}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${
                  topic.level === "HL"
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                    : "bg-white/[0.06] text-slate-300 border-white/10"
                }`}
              >
                {topic.level}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-sky-500/15 border-sky-500/35 text-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                {topic.strategicImportance}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 liquid-glass-pill">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                {topic.readingTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug font-display">
              {topic.title}
            </h1>
            <p className="text-sm text-sky-200/85 font-medium leading-relaxed">
              {topic.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-1">
              <span>SYLLABUS REF: {topic.syllabusRef}</span>
              <span>•</span>
              <span className="text-sky-200/80">
                Paper 1 (10M / 15M) &amp; Paper 2 Data Response
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleTopicBookmarked(topic.id)}
              className={`p-2 rounded-2xl transition-all cursor-pointer ${
                isBookmarked
                  ? "bg-sky-500/25 text-sky-300 border border-sky-400/40"
                  : "liquid-glass-pill text-slate-400 hover:text-white"
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => toggleTopicCompleted(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isCompleted
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/15"
                  : "bg-white/10 hover:bg-sky-500/25 text-white border border-white/25 hover:border-sky-300/50"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Topic Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-sky-300" />
                  <span>Mark Topic Read</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Postural Switcher */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              type="button"
              onClick={() => setLearningPosture("learn-new")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "learn-new"
                  ? "bg-sky-500/25 border border-sky-400/40 text-sky-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Study as New</span>
            </button>

            <button
              type="button"
              onClick={() => setLearningPosture("pre-lesson-cram")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                learningPosture === "pre-lesson-cram"
                  ? "bg-sky-500/25 border border-sky-400/40 text-sky-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Pre-Lesson / Exam Cram</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {topic.conceptTracking.map((ct) => {
              const def = KEY_CONCEPTS.find((k) => k.id === ct.conceptId);
              return (
                <span
                  key={ct.conceptId}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-mono font-semibold"
                  style={{
                    backgroundColor:
                      def?.badgeBg || "rgba(255,255,255,0.08)",
                    color: def?.color || "#ffffff",
                    border: `1px solid ${
                      def?.badgeBorder || "rgba(255,255,255,0.15)"
                    }`,
                  }}
                >
                  {def?.shortName || ct.conceptId}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CORE SYNTHESIS & SPEED-READ BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Core Concept Synthesis
            </h2>
          </div>
          {learningPosture === "pre-lesson-cram" && (
            <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-200 border border-sky-400/30">
              5-Min Cram Mode
            </span>
          )}
        </div>

        {learningPosture === "pre-lesson-cram" && (
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-1.5">
            <span className="font-mono text-xs font-bold text-sky-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              5-Minute Classroom Primer
            </span>
            <p className="text-sm text-slate-100 leading-relaxed">
              {topic.primer5Min}
            </p>
          </div>
        )}

        <p className="text-sm text-slate-200 leading-relaxed">{topic.summary}</p>

        <div className="space-y-2.5">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3 leading-relaxed"
            >
              <span className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. SYLLABUS SUB-SECTIONS, FORMULAS & EMBEDDED DIAGRAMS BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <h2 className="font-mono text-sm uppercase tracking-wider text-slate-200 font-bold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            First-Principles Syllabus &amp; Quantitative Models
          </h2>
          {learningPosture === "learn-new" && (
            <button
              type="button"
              onClick={() => setUseHandwrittenNotes(!useHandwrittenNotes)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer border ${
                useHandwrittenNotes
                  ? "bg-sky-500/20 text-sky-200 border-sky-400/40 font-bold"
                  : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>
                {useHandwrittenNotes
                  ? "Typography: Expanded"
                  : "Typography: Compact"}
              </span>
            </button>
          )}
        </div>

        {/* Embedded Diagram Model (no Diagram Lab jump button) */}
        {topic.diagramIds.length > 0 && currentDiagramId && (
          <div className="space-y-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-sky-300 flex items-center gap-1.5 font-bold">
                <Layers className="w-4 h-4 text-sky-400" />
                Diagram Model Reference
              </span>
            </div>

            {topic.diagramIds.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/40 border border-white/5">
                {topic.diagramIds.map((dId) => {
                  const dItem = DIAGRAMS_DOSSIER.find((d) => d.id === dId);
                  const isSelected = currentDiagramId === dId;
                  return (
                    <button
                      type="button"
                      key={dId}
                      onClick={() => setActiveLocalDiagramId(dId)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-sky-500/30 text-sky-200 border border-sky-400/50 font-bold"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="font-bold">{dItem?.code || dId}</span>
                      <span className="text-xs opacity-80">
                        {dItem
                          ? dItem.title
                              .split(":")[0]
                              .split("&")[0]
                              .split("(")[0]
                              .trim()
                          : dId}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <InteractiveDiagram
              diagramId={currentDiagramId}
              compact={learningPosture === "pre-lesson-cram"}
            />
          </div>
        )}

        {/* Subsections */}
        {learningPosture === "learn-new" && (
          <div className="space-y-4">
            {topic.subSections.map((sub, sIdx) => (
              <div
                key={sub.id}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 uppercase font-bold tracking-wider">
                    {sub.marker}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Section {sIdx + 1} of {topic.subSections.length}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {sub.title}
                </h3>

                <AcademicNotesRenderer
                  content={sub.content}
                  isHandwritten={useHandwrittenNotes}
                />

                {sub.keyFormulaOrFramework && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-emerald-400" />
                        Mathematical Formula / Model
                      </span>
                      <span className="text-xs font-mono text-emerald-500/80">
                        KaTeX
                      </span>
                    </div>
                    <MathFormula math={sub.keyFormulaOrFramework} block />
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/25 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 min-w-0">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold block">
                      Exam Takeaway
                    </span>
                    <p className="leading-relaxed text-sky-100 text-xs sm:text-sm">
                      {sub.analyticalTakeaway}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =====================================================================
          4. REAL-WORLD CASE STUDIES BENTO
          ===================================================================== */}
      {topic.cases.length > 0 && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Real-World Case Studies &amp; Empirical Context (
              {topic.cases.length})
            </h2>
          </div>

          <div className="space-y-3">
            {topic.cases.map((cs) => (
              <div
                key={cs.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/20 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-300 font-mono">
                    {cs.countryOrContext}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cs.concepts.map((cId) => (
                      <span
                        key={cId}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-white/10 text-slate-300"
                      >
                        {cId}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white">{cs.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cs.realWorldMechanism}
                </p>
                <div className="pt-2 border-t border-white/5 text-xs text-slate-300">
                  <strong className="text-emerald-300">Evaluation: </strong>
                  {cs.evaluationAO3AO4}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          5. IB EXAMINER TRAPS & EVALUATION STRATEGY BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            IB Examiner Traps &amp; 15-Mark Evaluation Strategy
          </h2>
        </div>

        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/25 space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-rose-300 font-bold">
            Common Exam Traps &amp; Examiner Pitfalls
          </h3>
          <ul className="space-y-2">
            {topic.analysis.commonMisconceptions.map((misc, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-rose-400 font-bold shrink-0">•</span>
                <span>{misc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase font-bold text-sky-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-400" />
              15-Mark Essay Exam Blueprint (DEED &amp; SLAP)
            </span>
            <span className="text-xs font-mono text-sky-300 px-2.5 py-0.5 rounded bg-sky-500/15 border border-sky-500/20">
              Command: {topic.examBlueprint.commandTerm}
            </span>
          </div>

          <p className="text-sm font-semibold text-white italic leading-relaxed">
            &quot;{topic.examBlueprint.paper1EssayPrompt}&quot;
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
                D — Define
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {topic.examBlueprint.deeedStructure.define}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
                E — Explain
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {topic.examBlueprint.deeedStructure.explain}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-xs uppercase font-bold text-sky-400 block">
                E — Exemplify
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {topic.examBlueprint.deeedStructure.exemplify}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-xs uppercase font-bold text-rose-300 block">
                D — Diagram
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {topic.examBlueprint.deeedStructure.diagram}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-sky-500/20 text-xs sm:text-sm space-y-1.5">
            <span className="font-mono text-xs font-bold text-sky-300 uppercase block">
              SLAP Evaluation Framework
            </span>
            <div className="space-y-1 text-slate-300">
              <div>
                <strong className="text-white">Stakeholders:</strong>{" "}
                {topic.examBlueprint.slapEvaluation.stakeholders}
              </div>
              <div>
                <strong className="text-white">Long vs Short Term:</strong>{" "}
                {topic.examBlueprint.slapEvaluation.longShortTerm}
              </div>
              <div>
                <strong className="text-white">Assumptions:</strong>{" "}
                {topic.examBlueprint.slapEvaluation.assumptions}
              </div>
              <div>
                <strong className="text-white">Priorities:</strong>{" "}
                {topic.examBlueprint.slapEvaluation.priorities}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. KEY TAKEAWAYS, SELF-CHECK & PERSONAL NOTES BENTO
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Key Takeaways &amp; Interactive Self-Check
          </h2>
        </div>

        {topic.checkUnderstanding.length > 0 && (
          <div className="space-y-3">
            {topic.checkUnderstanding.map((chk, cIdx) => {
              const isOpen = activeCheckId === chk.id;
              return (
                <div
                  key={chk.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCheckId(isOpen ? null : chk.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold shrink-0">
                        Q{cIdx + 1}
                      </span>
                      <span className="text-sm font-bold text-white leading-snug">
                        {chk.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-sky-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-2 border-t border-white/5 bg-sky-950/15 space-y-3 text-xs sm:text-sm">
                      {chk.hints.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                            Hints:
                          </span>
                          {chk.hints.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-slate-300"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-emerald-100 leading-relaxed">
                        <span className="font-mono text-xs uppercase font-bold text-emerald-400 block mb-1">
                          Examiner Model Answer:
                        </span>
                        {chk.modelAnswer}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                          Markscheme Terms:
                        </span>
                        {chk.keyTermsToInclude.map((kt, kIdx) => (
                          <span
                            key={kIdx}
                            className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 font-mono text-xs font-bold"
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
        )}

        {/* Personal Study Note Accordion */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowNoteEditor(!showNoteEditor)}
              className="text-xs font-mono text-sky-300 hover:text-sky-200 transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10"
            >
              <FileText className="w-3.5 h-3.5" />
              {currentNote ? "Edit Personal Study Note" : "+ Add Study Note"}
            </button>
            {currentNote && !showNoteEditor && (
              <span className="text-xs text-sky-300/80 font-mono italic line-clamp-1 max-w-md">
                Note: {currentNote}
              </span>
            )}
          </div>

          {showNoteEditor && (
            <AcademicNotesSurface
              note={topicNotes[topic.id] || ""}
              onChange={(text) => saveTopicNote(topic.id, text)}
              title="Personal Study & Policy Marginalia"
              itemCode={topic.displayCode || topic.topicCode}
              accentColor="#0ea5e9"
              minRows={4}
            />
          )}
        </div>
      </section>
    </article>
  );
};

export const TopicBentoCard = React.memo(TopicBentoCardComponent);
