"use client";

import React, { useState } from "react";
import { TopicData } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { RecallFlipCard } from "@/modules/physics/components/RecallFlipCard";
import { AcademicNotesSurface } from "@/modules/physics/components/AcademicNotesSurface";
import { MathFormula } from "@/modules/physics/components/MathFormula";
import { MathText } from "@/modules/physics/components/MathText";
import {
  Sparkles,
  Calculator,
  Crown,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  PanelRightClose,
  X,
  Edit3,
  Flame,
  AlertCircle,
  Copy,
  Check,
  Timer,
  Atom,
} from "lucide-react";

interface PhysicsRightInspectorProps {
  topic: TopicData;
  isOpen: boolean;
  onToggle: () => void;
}

type InspectorTab = "recall" | "formulas" | "strategy" | "notes";

export function PhysicsRightInspector({
  topic,
  isOpen,
  onToggle,
}: PhysicsRightInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("recall");
  const [copiedFormula, setCopiedFormula] = useState(false);

  const {
    bookmarkedTopics,
    toggleTopicBookmark,
    topicNotes,
    saveTopicNote,
    completedTopics,
    toggleTopicCompletion,
    openExamSprint,
  } = useStudyStore();

  const userNote = topicNotes[topic.id] || "";
  const isCompleted = !!completedTopics[topic.id];
  const isBookmarked = !!bookmarkedTopics?.[topic.id];

  const handleCopyFormula = (latex: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  return (
    <aside
      data-tour="inspector"
      className={`hidden xl:block shrink-0 sticky top-[56px] rounded-3xl select-none overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
        !isOpen
          ? "w-0 max-w-0 p-0 ml-0 border-0 opacity-0 pointer-events-none"
          : "w-[320px] xl:w-[344px] ml-5 p-0 opacity-100"
      }`}
    >
      <div
        className={`w-[320px] xl:w-[344px] shrink-0 transition-opacity duration-200 ${
          !isOpen ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
      >
        <div className="liquid-glass-bento rounded-3xl p-4 border border-cyan-400/30 bg-[#060402]/90 backdrop-blur-2xl shadow-2xl flex flex-col h-[calc(100vh-4.5rem)] overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 shrink-0 min-h-[44px]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/35 text-cyan-300 shrink-0 shadow-inner">
                  <Atom className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase block truncate">
                    Inspector // {topic.displayCode}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {topic.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleTopicBookmark(topic.id)}
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark Topic"}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    isBookmarked
                      ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/40"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-3.5 h-3.5" />
                  ) : (
                    <Bookmark className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={onToggle}
                  title="Close Inspector (⌘I)"
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  <PanelRightClose className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-3 shrink-0">
              <button
                onClick={() => setActiveTab("recall")}
                className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "recall"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/35 shadow-sm"
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cram</span>
              </button>

              <button
                onClick={() => setActiveTab("formulas")}
                className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "formulas"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/35 shadow-sm"
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Formulas</span>
              </button>

              <button
                onClick={() => setActiveTab("strategy")}
                className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "strategy"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/35 shadow-sm"
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Criteria</span>
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className={`py-2 px-1 rounded-xl text-[11px] font-medium transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  activeTab === "notes"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/35 shadow-sm"
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Notes</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
              {/* TAB 1: RECALL / CRAM FLIPCARDS */}
              {activeTab === "recall" && (
                <div className="space-y-3">
                  <div className="px-1 space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                      Paper 1 &amp; 2 Active Recall
                    </span>
                    <p className="text-xs text-slate-300/90 leading-relaxed">
                      Test retention of key mechanisms and derivations before tackling past papers.
                    </p>
                  </div>
                  <RecallFlipCard
                      moduleCode={topic.displayCode}
                      title={`${topic.displayCode} · ${topic.title}`}
                      prompt={
                        topic.checkUnderstanding?.[0]?.question ||
                        topic.examPromptTakeaway ||
                        topic.summary
                      }
                      answer={
                        topic.checkUnderstanding?.[0]?.modelAnswer ||
                        topic.analysis?.coreThesis ||
                        topic.summary
                      }
                      accent="#06b6d4"
                      secondary="#0891b2"
                      meta="PHYSICS CRAM"
                    />

                  {/* Fast Action to start Sprint */}
                  <button
                    onClick={openExamSprint}
                    className="w-full py-2.5 px-3 rounded-2xl text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>Launch Timed Exam Sprint (⌘E)</span>
                  </button>
                </div>
              )}

              {/* TAB 2: KEY FORMULAS & DERIVATIONS */}
              {activeTab === "formulas" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-2">
                      Primary Topic Equations
                    </span>
                    <div className="space-y-2">
                      {topic.primaryFormulas?.map((formula, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-between gap-2"
                        >
                          <div className="text-xs text-white overflow-x-auto py-1">
                            <MathFormula math={formula} />
                          </div>
                          <button
                            onClick={() => handleCopyFormula(formula)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                            title="Copy Formula LaTeX"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Reference */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      Official Syllabus Link
                    </span>
                    <p className="text-xs font-mono text-cyan-300">
                      {topic.syllabusRef}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: EXAMINER CRITERIA & MISCONCEPTIONS */}
              {activeTab === "strategy" && (
                <div className="space-y-3">
                  {/* Paper 1 Trap */}
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                    <div className="flex items-center gap-1.5 text-rose-300 font-mono text-xs font-bold uppercase mb-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Paper 1 Trap Pattern</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      <MathText text={topic.examBlueprint?.paper1TrapPattern || "Check SI base units before substituting values."} />
                    </p>
                  </div>

                  {/* Common Misconceptions */}
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-xs font-bold uppercase mb-1">
                      <Flame className="w-3.5 h-3.5 shrink-0" />
                      <span>Common Misconceptions</span>
                    </div>
                    <ul className="text-xs text-slate-200 space-y-1.5 list-disc list-inside">
                      {topic.analysis?.commonMisconceptions?.map((mis, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <MathText text={mis} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal Solution Breakdown */}
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-xs font-bold uppercase mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Band 7 Marking Protocol</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed mb-1">
                      <strong>Principles:</strong> <MathText text={topic.examBlueprint?.idealSolutionBreakdown?.statePrinciples || ""} />
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Units &amp; SigFigs:</strong> <MathText text={topic.examBlueprint?.idealSolutionBreakdown?.unitsAndSigFigs || ""} />
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: ACADEMIC HANDWRITTEN NOTES STUDIO */}
              {activeTab === "notes" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold mb-2">
                      <span className="flex items-center gap-1">
                        <Edit3 className="w-3 h-3" />
                        ACADEMIC SCRATCHPAD
                      </span>
                      <span>Topic {topic.displayCode}</span>
                    </div>
                    <AcademicNotesSurface
                      note={userNote}
                      onChange={(val) => saveTopicNote(topic.id, val)}
                      title={`Marginalia · ${topic.displayCode}`}
                      itemCode={topic.displayCode}
                      placeholder={`Jot down derivation steps, vector angles, or questions for ${topic.title}...`}
                      accentColor="#06b6d4"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Complete & Progress Toggle */}
            <div className="pt-3 mt-3 border-t border-white/10 shrink-0">
              <button
                onClick={() => toggleTopicCompletion(topic.id)}
                className={`w-full py-2 px-3 rounded-2xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "liquid-glass-pill text-slate-200 hover:text-white"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Topic Mastered</span>
                  </>
                ) : (
                  <>
                    <Atom className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Mark Topic Complete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
  );
}
