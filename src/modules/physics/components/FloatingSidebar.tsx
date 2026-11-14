"use client";

import React, { useState, useMemo } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { PhysicsAppLogo } from "./PhysicsAppLogo";
import {
  Award,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Clock,
  Sparkles,
  RotateCcw,
  Layers,
  Atom,
  Flame,
  Bookmark,
  X,
} from "lucide-react";

interface FloatingSidebarProps {
  isMobileSheet?: boolean;
}

export function FloatingSidebar({ isMobileSheet = false }: FloatingSidebarProps) {
  const {
    activeTopicId,
    setActiveTopic,
    viewMode,
    setViewMode,
    completedTopics,
    bookmarkedTopics,
    sidebarCollapsed,
    chapterSheetOpen,
    setChapterSheetOpen,
    resetAllProgress,
  } = useStudyStore();

  const [expandedThemes, setExpandedThemes] = useState<Record<string, boolean>>({
    "theme-a": true,
    "theme-b": true,
    "theme-c": true,
    "theme-d": true,
    "theme-e": true,
  });

  const toggleThemeExpand = (themeId: string) => {
    setExpandedThemes((prev) => ({
      ...prev,
      [themeId]: !prev[themeId],
    }));
  };

  const toggleAllThemes = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    SYLLABUS_UNITS.forEach((u) => {
      next[u.id] = expand;
    });
    setExpandedThemes(next);
  };

  const completedCount = useMemo(
    () => ALL_TOPICS.filter((t) => !!completedTopics[t.id]).length,
    [completedTopics]
  );

  const totalTopics = ALL_TOPICS.length || 22;
  const progressPercent = Math.round((completedCount / totalTopics) * 100);

  const totalReadingMinutes = ALL_TOPICS.reduce(
    (acc, t) => acc + t.readingTimeMinutes,
    0
  );
  const completedMinutes = ALL_TOPICS.reduce(
    (acc, t) => (completedTopics[t.id] ? acc + t.readingTimeMinutes : acc),
    0
  );
  const remainingMinutes = Math.max(0, totalReadingMinutes - completedMinutes);

  const handleSelectTopic = (topicId: string) => {
    setActiveTopic(topicId);
    if (isMobileSheet) {
      setChapterSheetOpen(false);
    }
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      const el = document.getElementById(`topic-card-${topicId}`);
      if (el) {
        el.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isMobileSheet && !chapterSheetOpen) return null;

  const sidebarBody = (
    <>
      {/* Syllabus Reading Telemetry & Progress Gauge */}
      <div className="my-2.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 shrink-0">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-medium flex items-center gap-1.5 font-mono">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            Syllabus Mastery
          </span>
          <span className="font-mono text-cyan-300 font-bold">
            {completedCount}/{totalTopics} ({progressPercent}%)
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-white/10 mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500 shadow-[0_0_12px_rgba(8,145,178,0.3)]"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-300" />
            {remainingMinutes}m left
          </span>
          <span className="text-cyan-300 font-bold">
            Themes A–E (2026)
          </span>
        </div>
      </div>

      {/* Collapse/Expand Controls */}
      <div className="flex items-center justify-between px-1 mb-2 text-[11px] font-mono text-slate-400 shrink-0">
        <span>Themes &amp; Topics</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAllThemes(true)}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Expand
          </button>
          <span>·</span>
          <button
            onClick={() => toggleAllThemes(false)}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* Themes Accordion List */}
      <div className="space-y-2.5 overflow-y-auto flex-1 pr-1 subtle-scrollbar">
        {SYLLABUS_UNITS.map((theme) => {
          const isExpanded = expandedThemes[theme.id] ?? true;
          const themeDone = theme.topics.filter(
            (t) => !!completedTopics[t.id]
          ).length;
          const themeTotal = theme.topics.length;
          const themePercent = Math.round((themeDone / Math.max(1, themeTotal)) * 100);

          return (
            <div
              key={theme.id}
              className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all shadow-sm"
            >
              {/* Theme Header Toggle Button */}
              <button
                onClick={() => toggleThemeExpand(theme.id)}
                className="w-full p-3 flex items-center justify-between text-left hover:bg-white/[0.04] cursor-pointer transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {theme.code.startsWith("THEME") ? theme.code : `Theme ${theme.code}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({themeDone}/{themeTotal})
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">
                    {theme.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">
                    {themePercent}%
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Topics List within Theme */}
              {isExpanded && (
                <div className="p-1.5 pt-0 space-y-1 border-t border-white/5">
                  {theme.topics.map((topic) => {
                    const isActive = topic.id === activeTopicId;
                    const isDone = !!completedTopics[topic.id];
                    const isBookmarked = !!bookmarkedTopics?.[topic.id];

                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic.id)}
                        className={`w-full p-2 rounded-xl text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-amber-500/35 to-amber-600/25 border border-cyan-400/50 shadow-md text-white"
                            : "hover:bg-white/[0.04] text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span className="font-mono text-[11px] font-bold text-cyan-300 shrink-0">
                            {topic.displayCode}
                          </span>
                          <span className="text-xs truncate">
                            {topic.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isBookmarked && (
                            <Bookmark className="w-3 h-3 text-cyan-400 fill-amber-400" />
                          )}
                          <span className="text-[10px] font-mono text-slate-400">
                            {topic.readingTimeMinutes}m
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Reset Progress Option */}
      <div className="pt-2.5 mt-2 border-t border-white/10 shrink-0 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <button
          onClick={() => {
            if (window.confirm("Reset all syllabus mastery progress?")) {
              resetAllProgress();
            }
          }}
          className="flex items-center gap-1 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Progress</span>
        </button>
        <span className="text-cyan-400/80 font-bold">22 Topics Total</span>
      </div>
    </>
  );

  // If Mobile Sheet Modal
  if (isMobileSheet) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 select-none"
        onClick={() => setChapterSheetOpen(false)}
      >
        <div
          className="w-full max-h-[85vh] rounded-t-3xl border-t border-cyan-500/35 bg-slate-950/95 p-5 text-white flex flex-col sheet-enter-smooth"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Syllabus Drawer</h3>
            </div>
            <button
              onClick={() => setChapterSheetOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {sidebarBody}
        </div>
      </div>
    );
  }

  // Desktop Floating Sticky Sidebar
  return (
    <aside
      data-tour="sidebar"
      className={`hidden lg:flex shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-5rem)] flex-col liquid-glass-sidebar rounded-3xl overflow-hidden select-none z-20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        sidebarCollapsed
          ? "w-0 max-w-0 p-0 -mr-4 xl:-mr-5 border-0 opacity-0 pointer-events-none"
          : "w-72 xl:w-80 p-0 opacity-100"
      }`}
    >
      <div
        className={`w-72 xl:w-80 p-4 flex flex-col h-full min-h-0 shrink-0 transition-opacity duration-200 ${
          sidebarCollapsed ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
        }`}
      >
        {/* Top Codex Identity Header */}
        <div className="flex items-center justify-between pb-3 mb-1 border-b border-white/10 shrink-0 min-h-[44px] w-full mac-drag-region">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/25 via-red-950/20 to-emerald-500/25 border border-cyan-400/30 flex items-center justify-center overflow-hidden p-1 mac-no-drag shrink-0 shadow-inner">
              <PhysicsAppLogo className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cyan-400 font-semibold block truncate">
                QUANTUM &amp; COSMOS // 2026
              </span>
              <h1 className="text-sm font-bold text-white tracking-tight truncate">
                IB Physics Codex
              </h1>
            </div>
          </div>

          {completedCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Reset all syllabus mastery progress?")) {
                  resetAllProgress();
                }
              }}
              title="Reset progress"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {sidebarBody}
      </div>
    </aside>
  );
}
