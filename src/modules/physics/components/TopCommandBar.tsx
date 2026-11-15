"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Rows3,
  Calculator,
  Layers,
  Compass,
  GraduationCap,
  Library,
  Brain,
  Search,
  Timer,
  PanelLeft,
  Sparkles,
  HelpCircle,
  Keyboard,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { useStudyStore, ViewMode, StudyGoal } from "@/modules/physics/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/physics/data";
import { PhysicsAppLogo } from "./PhysicsAppLogo";

interface ViewModeItem {
  id: ViewMode;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

const NAV_MODES: ViewModeItem[] = [
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
    icon: <Rows3 className="w-3.5 h-3.5" />,
  },
  {
    id: "formulas",
    label: "Formula Bank",
    shortLabel: "Formulas",
    icon: <Calculator className="w-3.5 h-3.5" />,
  },
  {
    id: "diagrams",
    label: "Diagram Lab",
    shortLabel: "Diagrams",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: "matrix",
    label: "Concepts Matrix",
    shortLabel: "Matrix",
    icon: <Compass className="w-3.5 h-3.5" />,
  },
  {
    id: "revision",
    label: "Revision & Cram Hub",
    shortLabel: "Revision Hub",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
  },
  {
    id: "lexicon",
    label: "Symbols & Glossary",
    shortLabel: "Lexicon",
    icon: <Library className="w-3.5 h-3.5" />,
  },
];

interface TopCommandBarProps {
  onOpenWalkthrough?: () => void;
  onOpenDiagnostics?: () => void;
}

export function TopCommandBar({
  onOpenWalkthrough,
  onOpenDiagnostics,
}: TopCommandBarProps = {}) {
  const {
    activeTopicId,
    viewMode,
    setViewMode,
    sidebarCollapsed,
    toggleSidebar,
    isInspectorOpen,
    toggleInspector,
    openExamSprint,
    openSpotlight,
    toggleSpotlight,
    isSpotlightOpen,
    setIsShortcutsOpen,
    triggerStartupIntro,
    studyGoal,
    setStudyGoal,
    setDiagnosticsModalOpen,
    levelFilter,
    setLevelFilter,
  } = useStudyStore();

  const currentTopic =
    ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0];

  // Native MacBook Keyboard Accelerators (⌘K, ⌘B, ⌘I, ⌘E, 1-7 View Switching)
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

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        openExamSprint();
        return;
      }

      if (e.key === "/" && !isInput && !isSpotlightOpen) {
        e.preventDefault();
        openSpotlight();
        return;
      }

      if (
        (e.key === "?" || (e.shiftKey && e.key === "/")) &&
        !isInput &&
        !isSpotlightOpen
      ) {
        e.preventDefault();
        setIsShortcutsOpen(true);
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey && !isSpotlightOpen) {
        if (e.key === "1") {
          e.preventDefault();
          setViewMode("focus");
        } else if (e.key === "2") {
          e.preventDefault();
          setViewMode("stream");
        } else if (e.key === "3") {
          e.preventDefault();
          setViewMode("formulas");
        } else if (e.key === "4") {
          e.preventDefault();
          setViewMode("diagrams");
        } else if (e.key === "5") {
          e.preventDefault();
          setViewMode("matrix");
        } else if (e.key === "6") {
          e.preventDefault();
          setViewMode("revision");
        } else if (e.key === "7") {
          e.preventDefault();
          setViewMode("lexicon");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    setViewMode,
    toggleSpotlight,
    openSpotlight,
    toggleSidebar,
    toggleInspector,
    openExamSprint,
    setIsShortcutsOpen,
    isSpotlightOpen,
  ]);

  const btn =
    "flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 shrink-0";

  return (
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
          <p className="text-sm font-semibold text-white truncate leading-tight">
            {viewMode === "home" ? "Home" : NAV_MODES.find((m) => m.id === viewMode)?.label ?? "IB Physics"}
          </p>
          {(viewMode === "focus" || viewMode === "stream") && (
            <p className="text-[11px] text-white/70 truncate leading-tight">{currentTopic.displayCode}</p>
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
                  ? "bg-indigo-500/30 text-indigo-200 font-semibold"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {lvl === "all" ? "SL+HL" : lvl}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("ib-suite-open-search"));
            }
          }}
          title="Universal Suite Search (⌘K)"
          className={btn}
        >
          <Search className="w-3.5 h-3.5 text-white/80" />
          <span className="hidden md:inline">Search Suite</span>
          <kbd className="hidden md:inline text-[10px] font-mono text-slate-400">⌘K</kbd>
        </button>
        <button onClick={openExamSprint} title="Timed sprint (⌘E)" className={btn}>
          <Timer className="w-3.5 h-3.5 text-white/80" />
          <span className="hidden lg:inline">Sprint</span>
        </button>
        {!isInspectorOpen && (
          <button onClick={toggleInspector} title="Analysis panel (⌘I)" className={btn}>
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            <span className="hidden lg:inline">Analysis</span>
          </button>
        )}
        <button
          onClick={() => setIsShortcutsOpen(true)}
          title="Keyboard shortcuts (?)"
          aria-label="Keyboard shortcuts"
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300 text-xs font-mono shrink-0"
        >
          ?
        </button>
      </div>
    </header>
  );
}
