"use client";

import React from "react";
import { X, StickyNote, Target } from "lucide-react";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export function GeographyRightInspector() {
  const {
    isInspectorOpen,
    toggleInspector,
    activeTopicId,
    topicNotes,
    setTopicNote,
  } = useStudyStore();

  if (!isInspectorOpen) return null;

  const topic = ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];
  const note = topicNotes[topic.id] || "";

  return (
    <aside className="hidden xl:flex w-[320px] 2xl:w-[344px] ml-5 shrink-0 rounded-3xl border border-teal-500/20 bg-teal-950/[0.16] backdrop-blur-2xl p-4 flex-col justify-between gap-4 sticky top-[56px] h-[calc(100vh-4.5rem)] overflow-y-auto no-scrollbar z-10 shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-teal-400">
              GEO INSPECTOR
            </div>
            <div className="text-sm font-bold text-white">
              {topic.topicCode} · {topic.title}
            </div>
          </div>
          <button
            onClick={toggleInspector}
            className="h-7 w-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-2xl border border-teal-500/20 bg-teal-950/20 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-teal-300">
            <Target className="w-3.5 h-3.5" />
            <span>Exam Takeaway</span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            {topic.examPromptTakeaway}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-teal-300">
            <StickyNote className="w-3.5 h-3.5" />
            <span>Personal Case &amp; Fieldwork Notes</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setTopicNote(topic.id, e.target.value)}
            placeholder="Jot down regional statistics, sketch ideas, or essay arguments for this topic..."
            rows={10}
            className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-3 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-teal-400/50 resize-none"
          />
        </div>
      </div>

      <div className="text-[10px] text-white/40 font-mono">
        Notes persist automatically in local workspace storage.
      </div>
    </aside>
  );
}
