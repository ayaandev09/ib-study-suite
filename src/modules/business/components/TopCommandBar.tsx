"use client";

import React, { useState, useEffect } from "react";
import { useStudyStore, ViewMode } from "@/modules/business/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/business/data";
import {
  LayoutGrid,
  Layers,
  Search,
  Sparkles,
  Timer,
  PanelLeft,
  Compass,
  Radar,
  Library,
  GraduationCap,
} from "lucide-react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";

const VIEW_MODES: {
  id: ViewMode;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    icon: <Compass className="w-3.5 h-3.5" />,
  },
  {
    id: "focus",
    label: "Topic Bento",
    shortLabel: "Bento",
    icon: <LayoutGrid className="w-3.5 h-3.5" />,
  },
  {
    id: "stream",
    label: "Syllabus Checklist",
    shortLabel: "Checklist",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: "matrix",
    label: "CCES Matrix",
    shortLabel: "CCES",
    icon: <Radar className="w-3.5 h-3.5" />,
  },
  {
    id: "lexicon",
    label: "Glossary & Theories",
    shortLabel: "Glossary",
    icon: <Library className="w-3.5 h-3.5" />,
  },
  {
    id: "revision",
    label: "Active Recall Hub",
    shortLabel: "Revision",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
  },
];

interface TopCommandBarProps {
  onOpenDiagnostics?: () => void;
  onOpenWalkthrough?: () => void;
}

export function TopCommandBar({ onOpenWalkthrough }: TopCommandBarProps = {}) {
  const {
    activeTopicId,
    viewMode,
    setViewMode,
    studyGoal,
    setStudyGoal,
    isInspectorOpen,
    toggleInspector,
    openExamSprint,
    sidebarCollapsed,
    toggleSidebar,
    levelFilter,
    setLevelFilter,
  } = useStudyStore();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const currentTopic = ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];

  // Keyboard Accelerators (⌘B, ?, 1-5 View Switching)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if ((e.key === "?" || (e.shiftKey && e.key === "/")) && !isInput) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          setViewMode("focus");
        } else if (e.key === "2") {
          e.preventDefault();
          setViewMode("stream");
        } else if (e.key === "3") {
          e.preventDefault();
          setViewMode("matrix");
        } else if (e.key === "4") {
          e.preventDefault();
          setViewMode("lexicon");
        } else if (e.key === "5") {
          e.preventDefault();
          setViewMode("revision");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setViewMode, toggleSidebar]);

  const sectionLabel = VIEW_MODES.find((m) => m.id === viewMode)?.label ?? "Home";

  const glassBtn =
    "flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 hover:text-white shrink-0";

  return (
    <>
      <header
        data-tour="command-bar"
        className="liquid-glass-bar relative z-20 w-full max-w-full rounded-full px-2.5 py-1.5 mb-3 flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={toggleSidebar}
            title="Toggle sidebar (⌘B)"
            aria-label="Toggle sidebar"
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-colors shrink-0 ${
              sidebarCollapsed
                ? "bg-white/20 border-white/40 text-white"
                : "bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300"
            }`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0 pl-1">
            <p className="text-sm font-semibold text-white truncate leading-tight">{sectionLabel}</p>
            {(viewMode === "focus" || viewMode === "stream") && currentTopic && (
              <p className="text-[11px] text-white/70 truncate leading-tight">
                {currentTopic.displayCode}: {currentTopic.title}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden md:flex items-center bg-black/40 border border-white/10 rounded-xl p-0.5 text-[10px] font-mono">
            {(["all", "SL", "HL"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2 py-1 rounded-lg cursor-pointer transition-colors ${
                  levelFilter === lvl
                    ? "bg-blue-500/30 text-blue-200 font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {lvl === "all" ? "SL+HL" : lvl}
              </button>
            ))}
          </div>
          <button onClick={openExamSprint} title="Timed exam sprint (⌘E)" className={glassBtn}>
            <Timer className="w-3.5 h-3.5 text-white/80" />
            <span className="hidden lg:inline">Sprint</span>
          </button>

          <button
            onClick={toggleInspector}
            title="Business Companion (⌘I)"
            className={`${glassBtn} ${isInspectorOpen ? "bg-white/20 text-white border-white/40 shadow-inner" : ""}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span className="hidden lg:inline">Companion</span>
          </button>

          <button
            onClick={() => setIsShortcutsOpen((prev) => !prev)}
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300 text-xs font-mono shrink-0"
          >
            ?
          </button>
        </div>
      </header>

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        appName="IB Business Management Codex"
        accentColor="#2563eb"
        onOpenTour={onOpenWalkthrough}
      />
    </>
  );
}

export default TopCommandBar;
