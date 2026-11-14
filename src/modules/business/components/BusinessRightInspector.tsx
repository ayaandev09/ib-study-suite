"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TopicData } from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";
import {
  CheckCircle2,
  X,
  Edit3,
  Copy,
  Check,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Timer,
  Sparkles,
} from "lucide-react";

interface BusinessRightInspectorProps {
  topic: TopicData;
  isOpen: boolean;
  onToggle: () => void;
}

type InspectorTab = "checklist" | "terms" | "recall" | "notes";

const MARK_SCHEME_ITEMS = [
  { id: "ao1", code: "AO1", label: "Define key BM terminology accurately" },
  { id: "ao2", code: "AO2", label: "Apply directly to the stimulus case study" },
  { id: "ao3", code: "AO3", label: "Analyse cause, effect & stakeholder impact" },
  { id: "ao4", code: "AO4", label: "Evaluate with balanced pros/cons & judgement" },
  { id: "cuegis", code: "CUEGIS", label: "Link to Change, Culture, Ethics, Globalisation, Innovation, Strategy" },
];

const COMMAND_TERMS = [
  { term: "Evaluate", ao: "AO3/AO4", guide: "Weigh strengths vs. limitations and reach a justified conclusion." },
  { term: "Discuss", ao: "AO3/AO4", guide: "Offer a considered, balanced review of multiple arguments." },
  { term: "Recommend", ao: "AO3/AO4", guide: "Present an advisable course of action supported by evidence." },
  { term: "Analyse", ao: "AO2/AO3", guide: "Break down into components to show relationships & impact." },
  { term: "Examine", ao: "AO3", guide: "Consider an argument or concept in a way that uncovers assumptions." },
];

export function BusinessRightInspector({
  topic,
  isOpen,
  onToggle,
}: BusinessRightInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("checklist");
  const [copiedNote, setCopiedNote] = useState(false);
  const [checkedAO, setCheckedAO] = useState<Record<string, boolean>>({});

  const {
    completedTopics,
    toggleTopicComplete,
    topicNotes,
    setTopicNote,
    openExamSprint,
  } = useStudyStore();

  const userNote = topicNotes[topic.id] || "";
  const isCompleted = !!completedTopics[topic.id];

  const handleCopyNote = () => {
    if (userNote.trim()) {
      navigator.clipboard.writeText(userNote);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  const toggleAO = (id: string) => {
    setCheckedAO((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs: { id: InspectorTab; label: string; icon: React.ReactNode }[] = [
    { id: "checklist", label: "Scheme", icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
    { id: "terms", label: "Terms", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "recall", label: "Recall", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "notes", label: "Notes", icon: <Edit3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside
      data-tour="inspector"
      className={`shrink-0 sticky top-[56px] rounded-3xl select-none overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
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
        <div className="liquid-glass-bento rounded-3xl p-4 border border-blue-400/25 bg-blue-950/[0.16] backdrop-blur-2xl shadow-2xl flex flex-col h-[calc(100vh-4.5rem)] overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10 shrink-0 min-h-[42px]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-bold tracking-wider text-blue-300 uppercase block truncate">
                  IB EXAM COMPANION
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                  {topic.displayCode} · {topic.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  toggleTopicComplete(topic.id);
                  if (typeof navigator !== "undefined" && navigator.vibrate) {
                    navigator.vibrate(20);
                  }
                }}
                title={isCompleted ? "Mark Incomplete" : "Mark Topic Mastered"}
                className={`p-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer select-none ${
                  isCompleted
                    ? "bg-blue-500/25 text-blue-300 border border-blue-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-blue-400" : "text-slate-400"}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={onToggle}
                title="Tuck Inspector away (⌘I)"
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Tactile Pill Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10 mb-3 shrink-0">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl text-[11px] font-medium cursor-pointer transition-colors min-w-0 ${
                    active
                      ? "bg-blue-500/25 text-white border border-blue-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                      : "text-slate-400 hover:text-white border border-transparent"
                  }`}
                >
                  {tab.icon}
                  <span className="truncate w-full text-center">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pr-0.5 space-y-3 min-h-0">
            {activeTab === "checklist" && (
              <div className="space-y-3">
                <div className="rounded-2xl bg-black/35 border border-white/10 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300">
                      IB Mark-Scheme Checklist
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {Object.values(checkedAO).filter(Boolean).length}/{MARK_SCHEME_ITEMS.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {MARK_SCHEME_ITEMS.map((item) => {
                      const checked = !!checkedAO[item.id];
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => toggleAO(item.id)}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-start gap-2 p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                            checked
                              ? "bg-blue-500/15 border-blue-400/30 text-white"
                              : "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span
                            className={`mt-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 ${
                              checked
                                ? "bg-blue-400/25 text-blue-200"
                                : "bg-white/10 text-slate-300"
                            }`}
                          >
                            {item.code}
                          </span>
                          <span className="text-xs leading-snug">{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openExamSprint()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/35 text-blue-200 text-xs font-semibold cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors"
                >
                  <Timer className="w-4 h-4" />
                  Launch Timed Exam Sprint
                </motion.button>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="space-y-2.5">
                <div className="rounded-2xl bg-black/35 border border-white/10 p-3 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 block">
                    IB Command Terms
                  </span>
                  <div className="space-y-1.5">
                    {COMMAND_TERMS.map((ct) => (
                      <div
                        key={ct.term}
                        className="p-2 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white">{ct.term}</span>
                          <span className="text-[10px] font-mono text-blue-300/80 bg-blue-500/10 px-1.5 py-0.5 rounded-full border border-blue-400/20">
                            {ct.ao}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{ct.guide}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "recall" && (
              <div className="space-y-2.5">
                <div className="rounded-2xl bg-black/35 border border-white/10 p-3 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 block">
                    Quick Active Recall
                  </span>
                  <p className="text-xs font-semibold text-white">
                    {topic.displayCode}: {topic.title}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explain the core concept, 1 real-world example, and 2 evaluative limitations without looking at your notes.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300">
                    Personal Topic Notes
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={handleCopyNote}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 cursor-pointer"
                  >
                    {copiedNote ? <Check className="w-3 h-3 text-blue-400" /> : <Copy className="w-3 h-3" />}
                    {copiedNote ? "Copied" : "Copy"}
                  </motion.button>
                </div>
                <textarea
                  value={userNote}
                  onChange={(e) => setTopicNote(topic.id, e.target.value)}
                  placeholder={`Write IB Business notes for ${topic.displayCode}...`}
                  rows={8}
                  className="w-full rounded-2xl bg-black/40 border border-white/10 focus:border-blue-400/40 focus:outline-none p-3 text-xs text-slate-200 placeholder:text-slate-500 resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default BusinessRightInspector;
