"use client";

import React from "react";
import {
  Search,
  PanelLeft,
  PanelRight,
  Timer,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/biology/data";

export function TopCommandBar() {
  const {
    activeTopicId,
    levelFilter,
    setLevelFilter,
    toggleSidebar,
    toggleInspector,
    isInspectorOpen,
    openSpotlight,
    openExamSprint,
    studyLensMode,
    setStudyLensMode,
  } = useStudyStore();

  const activeTopic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  return (
    <header className="sticky top-0 z-20 mb-4 rounded-2xl liquid-glass-elevated px-3.5 py-2 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-white/75 hover:text-white cursor-pointer transition-colors"
          title="Toggle Sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[11px] font-mono text-green-300 shrink-0">
            {activeTopic.displayCode}
          </span>
          <span className="text-xs font-medium text-white/90 truncate">
            {activeTopic.title}
          </span>
          {activeTopic.level === "HL ONLY" && (
            <span className="px-1.5 py-0.5 rounded-md bg-lime-500/15 border border-lime-400/35 text-[9px] font-mono font-semibold text-lime-300 shrink-0">
              HL ONLY
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {/* SL / HL Filter */}
        <div className="hidden md:flex items-center bg-black/40 border border-white/10 rounded-xl p-0.5 text-[10px] font-mono">
          {(["all", "SL", "HL"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                levelFilter === lvl
                  ? "bg-green-500/25 text-green-200 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {lvl === "all" ? "SL+HL" : lvl}
            </button>
          ))}
        </div>

        {/* Lens Mode */}
        <div className="hidden lg:flex items-center bg-black/40 border border-white/10 rounded-xl p-0.5 text-[10px] font-mono">
          {(["primer", "deep", "revision"] as const).map((lens) => (
            <button
              key={lens}
              onClick={() => setStudyLensMode(lens)}
              className={`px-2 py-1 rounded-lg cursor-pointer capitalize transition-colors ${
                studyLensMode === lens
                  ? "bg-white/15 text-white font-semibold"
                  : "text-white/45 hover:text-white"
              }`}
            >
              {lens}
            </button>
          ))}
        </div>

        <button
          onClick={openExamSprint}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-green-500/15 hover:bg-green-500/25 border border-green-400/30 text-xs text-green-200 cursor-pointer transition-colors"
          title="Timed IB Bio Exam Sprint"
        >
          <Timer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sprint</span>
        </button>

        <button
          onClick={toggleInspector}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
            isInspectorOpen
              ? "bg-green-500/20 border-green-400/35 text-green-200 shadow-inner"
              : "bg-white/[0.06] border-white/10 text-white/70 hover:text-white"
          }`}
          title="Toggle IB Exam Companion (⌘I)"
        >
          <PanelRight className="w-3.5 h-3.5 text-green-300" />
          <span className="hidden sm:inline">Companion</span>
        </button>
      </div>
    </header>
  );
}
