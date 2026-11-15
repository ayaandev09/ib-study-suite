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
  StickyNote,
  Target,
  ArrowRight,
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
    setViewMode,
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
      className={`space-y-6 topic-transition-enter ${
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
          TIER 1: HERO BENTO HEADER
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden space-y-5">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 relative z-10">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/40">
                Unit {unitNum} • Topic {topic.displayCode}
              </span>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border ${
                  topic.level === "HL"
                    ? "bg-rose-500/20 text-rose-300 border-rose-400/40"
                    : "bg-white/[0.06] text-slate-300 border-white/10"
                }`}
              >
                {topic.level}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-sky-500/15 border-sky-500/35 text-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                {topic.strategicImportance}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 bg-white/[0.05] border border-white/10">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                {topic.readingTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {topic.title}
            </h1>
            <p className="text-sm sm:text-base text-sky-200/85 font-medium leading-relaxed">
              {topic.subtitle}
            </p>
            <div className="text-xs text-slate-400 font-mono pt-0.5">
              SYLLABUS REF: {topic.syllabusRef}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {showPrevNextControls && (
              <div className="flex items-center gap-1.5 mr-1">
                <button
                  type="button"
                  onClick={goToPrevTopic}
                  title="Previous Topic"
                  className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextTopic}
                  title="Next Topic"
                  className="w-10 h-10 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleTopicBookmarked(topic.id)}
              title="Bookmark Topic"
              className={`w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer border transition-colors ${
                isBookmarked
                  ? "bg-sky-500/25 text-sky-300 border-sky-400/40"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/10"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-sky-300" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => setShowNoteEditor((prev) => !prev)}
              className="px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <StickyNote className="w-4 h-4 text-sky-300" />
              <span>Notes{currentNote ? " •" : ""}</span>
              {showNoteEditor ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleTopicCompleted(topic.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isCompleted
                  ? "bg-sky-500/30 border border-sky-400/50 text-sky-200 shadow-[0_0_20px_-4px_rgba(14,165,233,0.5)]"
                  : "bg-white/10 hover:bg-sky-500/20 text-white border border-white/20 hover:border-sky-400/40"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300" />
              )}
              <span>{isCompleted ? "Topic Completed" : "Mark Complete"}</span>
            </button>
          </div>
        </div>

        {/* Postural Switcher & Concept Lenses */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
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
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: def?.badgeBg || "rgba(255,255,255,0.08)",
                    color: def?.color || "#ffffff",
                    border: `1px solid ${def?.badgeBorder || "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {def?.shortName || ct.conceptId}
                </span>
              );
            })}
          </div>
        </div>

        {/* Note Scratchpad Drawer */}
        {showNoteEditor && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-xs font-mono uppercase text-sky-300 font-bold block">
              Quick Economic Marginalia
            </span>
            <textarea
              value={currentNote}
              onChange={(e) => saveTopicNote(topic.id, e.target.value)}
              placeholder="Record diagram shifting steps, policy evaluation trade-offs, or personal seminar insights..."
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400/50 resize-y"
            />
          </div>
        )}
      </section>

      {/* =====================================================================
          TIER 2: CORE DIGEST & EXECUTIVE SUMMARY
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
              Core Concept Synthesis
            </h2>
          </div>
          {learningPosture === "pre-lesson-cram" && (
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-200 border border-sky-400/30">
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
            <p className="text-sm text-slate-100 leading-relaxed font-sans">
              {topic.primer5Min}
            </p>
          </div>
        )}

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
          {topic.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {topic.speedReadBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-3 leading-relaxed font-medium"
            >
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-sky-400/30">
                {idx + 1}
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Core Analytical Thesis
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {topic.analysis.coreThesis}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Theoretical Foundations
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {topic.analysis.theoreticalFoundations}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TIER 3: KEY MODELS & FORMULAS (DIAGRAMS & SUB-SECTIONS)
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <h2 className="font-mono text-sm sm:text-base uppercase tracking-wider text-white font-bold flex items-center gap-2">
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
                {useHandwrittenNotes ? "Typography: Expanded" : "Typography: Compact"}
              </span>
            </button>
          )}
        </div>

        {/* Embedded Diagram Model */}
        {topic.diagramIds.length > 0 && currentDiagramId && (
          <div className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-sky-300 flex items-center gap-1.5 font-bold">
                <Layers className="w-4 h-4 text-sky-400" />
                Diagram Model Reference
              </span>
            </div>

            {topic.diagramIds.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/60 border border-white/10">
                {topic.diagramIds.map((dId) => {
                  const dItem = DIAGRAMS_DOSSIER.find((d) => d.id === dId);
                  const isSelected = currentDiagramId === dId;
                  return (
                    <button
                      type="button"
                      key={dId}
                      onClick={() => setActiveLocalDiagramId(dId)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
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
        <div className="space-y-4">
          {topic.subSections.map((sub, sIdx) => (
            <div
              key={sub.id}
              className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3.5"
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
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      Mathematical Formula / Quantitative Rule
                    </span>
                  </div>
                  <MathFormula math={sub.keyFormulaOrFramework} block />
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/25 flex items-start gap-3">
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
      </section>

      {/* =====================================================================
          TIER 4: REAL-WORLD CASE & EXAMINER TRAPS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
            Real-World Empirical Cases &amp; Examiner Traps
          </h2>
        </div>

        {/* Real-World Case Studies */}
        {topic.cases.length > 0 && (
          <div className="space-y-3">
            {topic.cases.map((cs) => (
              <div
                key={cs.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/20 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-300 font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                    {cs.countryOrContext}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cs.concepts.map((cId) => (
                      <span
                        key={cId}
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-white/10 text-slate-300"
                      >
                        {cId}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white">{cs.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {cs.realWorldMechanism}
                </p>
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs sm:text-sm text-emerald-200">
                  <strong className="text-emerald-300 font-bold block mb-1">
                    AO3 / AO4 Evaluation &amp; Policy Tradeoff:
                  </strong>
                  {cs.evaluationAO3AO4}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Common Traps Alert Box */}
        <div className="p-5 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Common Exam Traps &amp; Examiner Pitfalls</span>
          </div>
          <div className="space-y-2">
            {topic.analysis.commonMisconceptions.map((misc, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                <Target className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{misc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 15-Mark Essay Exam Blueprint */}
        <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/25 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase font-bold text-sky-300 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-400" />
              15-Mark Essay Exam Blueprint (DEEED &amp; SLAP)
            </span>
            <span className="text-xs font-mono text-sky-300 px-3 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30">
              Command: {topic.examBlueprint.commandTerm}
            </span>
          </div>

          <p className="text-sm font-semibold text-white italic leading-relaxed">
            &ldquo;{topic.examBlueprint.paper1EssayPrompt}&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-mono text-xs uppercase font-bold text-sky-300 block">
                D — Define
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.deeedStructure.define}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-mono text-xs uppercase font-bold text-emerald-300 block">
                E — Explain
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.deeedStructure.explain}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-mono text-xs uppercase font-bold text-sky-400 block">
                E — Exemplify
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.deeedStructure.exemplify}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="font-mono text-xs uppercase font-bold text-rose-300 block">
                D — Diagram
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {topic.examBlueprint.deeedStructure.diagram}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20 text-xs sm:text-sm space-y-2">
            <span className="font-mono text-xs font-bold text-sky-300 uppercase block">
              SLAP Evaluation Framework
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
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
          TIER 5: SELF-CHECK & ACADEMIC NOTES
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
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
                  className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCheckId(isOpen ? null : chk.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold shrink-0">
                        Q{cIdx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
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
                    <div className="p-5 pt-2 border-t border-white/5 bg-sky-950/15 space-y-3.5 text-xs sm:text-sm">
                      {chk.hints.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                            Hints:
                          </span>
                          {chk.hints.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="px-2.5 py-1 rounded-xl bg-white/5 text-xs text-slate-300 border border-white/10"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/25 text-emerald-100 leading-relaxed font-sans">
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
                            className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 font-mono text-xs font-bold border border-sky-400/30"
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

        {/* Academic Notes Surface */}
        <section className="pt-2">
          <AcademicNotesSurface
            note={currentNote}
            onChange={(text) => saveTopicNote(topic.id, text)}
            title="Personal Study &amp; Policy Marginalia"
            subtitle="Saved automatically to your offline codex"
            itemCode={topic.displayCode || topic.topicCode}
            accentColor="#0ea5e9"
            minRows={5}
          />
        </section>
      </section>
    </article>
  );
};

export const TopicBentoCard = React.memo(TopicBentoCardComponent);
export default TopicBentoCard;
