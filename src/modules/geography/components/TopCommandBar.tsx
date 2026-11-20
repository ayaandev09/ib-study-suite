"use client";

import React from "react";
import {
  Search,
  Timer,
  PanelRight,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/geography/data";
import { cn } from "@/modules/geography/lib/cn";

export function TopCommandBar() {
  const {
    activeTopicId,
    viewMode,
    studyLensMode,
    setStudyLensMode,
    levelFilter,
    setLevelFilter,
    sidebarCollapsed,
    toggleSidebar,
    isInspectorOpen,
    toggleInspector,
    openSpotlight,
    openExamSprint,
  } = useStudyStore();

  const currentTopic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];

  const handleLensChange = (mode: "primer" | "deep" | "revision") => {
    React.startTransition(() => setStudyLensMode(mode));
  };

  const handleLevelChange = (lvl: "all" | "SL" | "HL") => {
    React.startTransition(() => setLevelFilter(lvl));
  };

  return (
    <header className="sticky top-0 z-20 mb-4 rounded-2xl liquid-glass-elevated px-3.5 py-2 flex items-center justify-between gap-3 border border-teal-400/20">
      {/* Left: Sidebar Toggle + Active Topic Pill */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={toggleSidebar}
          className="h-8 w-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 hover:bg-teal-500/20 transition-colors shrink-0"
          title={sidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 text-[11px] font-mono font-bold text-teal-300 shrink-0">
            {viewMode === "home"
              ? "GEO"
              : viewMode === "matrix"
              ? "MATRIX"
              : viewMode === "lexicon"
              ? "LEXICON"
              : viewMode === "revision"
              ? "CARDS"
              : currentTopic.topicCode}
          </span>
          <span className="text-xs font-medium text-white/80 truncate">
            {viewMode === "home"
              ? "IB Geography SL / HL Hub"
              : viewMode === "matrix"
              ? "4-Unit × 2-Scale Matrix"
              : viewMode === "lexicon"
              ? "Models, Formulas & Lexicon"
              : viewMode === "revision"
              ? "Active Recall Deck"
              : currentTopic.title}
          </span>
        </div>
      </div>

      {/* Right: SL/HL Level Toggle + Study Lens + Search + Sprint + Inspector */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="hidden sm:flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-0.5"
          role="group"
          aria-label="Syllabus level filter"
        >
          {(
            [
              { id: "all", label: "SL+HL" },
              { id: "SL", label: "SL" },
              { id: "HL", label: "HL" },
            ] as const
          ).map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => handleLevelChange(lvl.id)}
              className={cn(
                "px-2 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all",
                levelFilter === lvl.id
                  ? "bg-teal-500/25 text-teal-200 border border-teal-400/35 shadow-[0_0_12px_rgba(20,184,166,0.2)]"
                  : "text-white/45 hover:text-white/75"
              )}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-0.5">
          {(
            [
              { id: "primer", label: "Primer" },
              { id: "deep", label: "Deep" },
              { id: "revision", label: "Revision" },
            ] as const
          ).map((lens) => (
            <button
              key={lens.id}
              onClick={() => handleLensChange(lens.id)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                studyLensMode === lens.id
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/45 hover:text-white/75"
              )}
            >
              {lens.label}
            </button>
          ))}
        </div>

        <button
          onClick={openExamSprint}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/25 text-xs font-medium text-teal-200 transition-all cursor-pointer"
          title="Timed Paper 1/2/3 Sprint"
        >
          <Timer className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Sprint</span>
        </button>

        <button
          onClick={toggleInspector}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-medium cursor-pointer",
            isInspectorOpen
              ? "bg-teal-500/25 border-teal-400/40 text-teal-200 shadow-inner"
              : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white"
          )}
          title="Toggle Notes & Geographic Inspector (⌘I)"
        >
          <PanelRight className="w-3.5 h-3.5 text-teal-300" />
          <span className="hidden lg:inline">Companion</span>
        </button>
      </div>
    </header>
  );
}
