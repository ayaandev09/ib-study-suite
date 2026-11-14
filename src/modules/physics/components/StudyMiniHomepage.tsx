"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_TOPICS, SYLLABUS_UNITS } from "@/modules/physics/data";
import { useStudyStore, WidgetTemplateSize } from "@/modules/physics/store/useStudyStore";
import { PhysicsAppLogo } from "./PhysicsAppLogo";
import { syncWidgetSnapshot } from "@/modules/physics/lib/widgetBridge";
import {
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Minimize2,
  Maximize2,
  Columns3,
  Atom,
  Flame,
  Zap,
} from "lucide-react";

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StudyMiniHomepage() {
  const {
    activeTopicId,
    setActiveTopic,
    completedTopics,
    toggleTopicCompletion,
    widgetTemplate = "medium",
    setWidgetTemplate,
    openExamSprint,
  } = useStudyStore();

  const activeTopic = useMemo(
    () => ALL_TOPICS.find((t) => t.id === activeTopicId) || ALL_TOPICS[0],
    [activeTopicId]
  );

  const activeTheme = useMemo(
    () =>
      SYLLABUS_UNITS.find((u) => u.id === activeTopic.themeId) ||
      SYLLABUS_UNITS[0],
    [activeTopic.themeId]
  );

  const currentIndex = useMemo(
    () => ALL_TOPICS.findIndex((t) => t.id === activeTopic.id),
    [activeTopic.id]
  );

  const nextTopic = useMemo(
    () =>
      currentIndex >= 0 && currentIndex < ALL_TOPICS.length - 1
        ? ALL_TOPICS[currentIndex + 1]
        : null,
    [currentIndex]
  );

  const completedCount = useMemo(
    () => Object.values(completedTopics || {}).filter(Boolean).length,
    [completedTopics]
  );

  const totalTopics = ALL_TOPICS.length || 22;
  const percentage = Math.round((completedCount / totalTopics) * 100);
  const isCurrentDone = !!completedTopics?.[activeTopic.id];

  const remainingMinutes = useMemo(
    () =>
      ALL_TOPICS.reduce(
        (sum, t) => (completedTopics?.[t.id] ? sum : sum + t.readingTimeMinutes),
        0
      ),
    [completedTopics]
  );

  const dashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const handleToggleComplete = () => {
    toggleTopicCompletion(activeTopic.id);
    setTimeout(() => syncWidgetSnapshot("topic-complete"), 10);
  };

  const handleNextTopic = (id: string) => {
    setActiveTopic(id);
    setTimeout(() => syncWidgetSnapshot("navigation"), 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full liquid-glass-bento rounded-3xl p-4 sm:p-5 mb-4 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-all duration-300 select-none">
      {/* Background ambient glow aura */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar: Identity & Template Size Segmented Controller */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-purple-500/20 border border-cyan-400/35 flex items-center justify-center p-1 shadow-inner shrink-0">
            <PhysicsAppLogo className="w-full h-full object-contain" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 truncate">
                QUANTUM &amp; COSMOS // 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-[9px] font-mono text-emerald-300 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Widget Synced
              </span>
            </div>
          </div>
        </div>

        {/* Template Size Switcher (Small / Medium / Large) */}
        <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/60 border border-white/12 text-xs shrink-0 relative">
          {(["small", "medium", "large"] as WidgetTemplateSize[]).map((size) => {
            const isActive = widgetTemplate === size;
            return (
              <button
                key={size}
                onClick={() => setWidgetTemplate(size)}
                title={
                  size === "small"
                    ? "Compact Glanceable Strip"
                    : size === "medium"
                    ? "Standard Balanced Widget"
                    : "Expanded Studio Dossier"
                }
                className={`relative flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  isActive ? "text-cyan-200" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="physicsWidgetTemplateSizeIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-cyan-500/25 border border-cyan-400/40 shadow-sm pointer-events-none"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {size === "small" && <Minimize2 className="w-3 h-3" />}
                  {size === "medium" && <Maximize2 className="w-3 h-3" />}
                  {size === "large" && <Columns3 className="w-3 h-3" />}
                  <span className="hidden sm:inline capitalize">{size}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={widgetTemplate}
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.985 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {/* ========================================================================= */}
          {/* TEMPLATE 1: SMALL / COMPACT GLANCEABLE STRIP */}
          {/* ========================================================================= */}
          {widgetTemplate === "small" && (
            <div className="relative z-10 pt-3 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="px-2 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold shrink-0">
                  {activeTopic.displayCode}
                </span>
                <div className="min-w-0 truncate">
                  <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                    {activeTopic.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                    <span>{activeTheme.title}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-cyan-300">
                      <Clock className="w-2.5 h-2.5" /> {activeTopic.readingTimeMinutes}m
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 bg-black/45 px-2.5 py-1 rounded-xl border border-white/10 font-mono text-xs">
                  <span className="text-cyan-300 font-bold">{percentage}%</span>
                  <span className="text-slate-400 text-[10px]">({completedCount}/{totalTopics})</span>
                </div>

                <button
                  onClick={handleToggleComplete}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isCurrentDone
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
                  }`}
                >
                  {isCurrentDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Mastered</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mark Mastered</span>
                    </>
                  )}
                </button>

                {nextTopic && (
                  <button
                    onClick={() => handleNextTopic(nextTopic.id)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                    title={`Next: ${nextTopic.displayCode}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEMPLATE 2: MEDIUM / STANDARD BALANCED WIDGET */}
          {/* ========================================================================= */}
          {widgetTemplate === "medium" && (
            <div className="relative z-10 pt-3.5 flex flex-col gap-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-wider block truncate">
                    Active Study Topic • {activeTheme.title}
                  </span>
                  <h2
                    className="text-sm sm:text-base font-bold text-white tracking-tight truncate mt-0.5"
                    title={`${activeTopic.displayCode} · ${activeTopic.title}`}
                  >
                    {activeTopic.displayCode} · {activeTopic.title}
                  </h2>
                  <p className="text-xs text-slate-300/80 truncate mt-1">
                    {activeTopic.subtitle || activeTopic.summary}
                  </p>
                </div>

                {/* Circular Mastery Dial */}
                <div className="flex items-center gap-3 shrink-0 pl-3 border-l border-white/10">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r={RADIUS}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="6"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={RADIUS}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={dashoffset}
                        className="transition-all duration-500 ease-out"
                        style={{ filter: "drop-shadow(0 0 6px #06b6d4)" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white leading-none">
                        {percentage}%
                      </span>
                      <span className="font-mono text-[7px] uppercase tracking-wider text-cyan-300 mt-0.5">
                        Mastery
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono hidden sm:block">
                    <span className="text-xs font-bold text-slate-100 block">
                      {completedCount} / {totalTopics}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Topics Mastered
                    </span>
                  </div>
                </div>
              </div>

              {/* Tier 2: Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    <Clock className="w-3 h-3 text-cyan-300" />
                    <span>{remainingMinutes}m total remaining</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-300">
                    <span>{totalTopics} Topics · 5 Themes</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleToggleComplete}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isCurrentDone
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
                        : "bg-white/[0.06] text-slate-200 border border-white/10 hover:bg-white/[0.12] hover:text-white"
                    }`}
                  >
                    {isCurrentDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Topic Mastered</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mark Mastered</span>
                      </>
                    )}
                  </button>

                  {nextTopic && (
                    <button
                      onClick={() => handleNextTopic(nextTopic.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 transition-all cursor-pointer"
                    >
                      <span>Next: {nextTopic.displayCode}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TEMPLATE 3: LARGE / EXPANDED STUDIO DOSSIER */}
          {/* ========================================================================= */}
          {widgetTemplate === "large" && (
            <div className="relative z-10 pt-3.5 flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-bold">
                    Target Syllabus Vector
                  </span>
                  <div className="my-1.5">
                    <span className="text-sm font-bold text-white block">
                      {activeTopic.displayCode} · {activeTopic.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {activeTheme.title} · {activeTopic.readingTimeMinutes}m speed-read
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono">
                    ● Nominal Real-Time Telemetry
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider font-bold">
                    Primary Exam Principle
                  </span>
                  <p className="text-xs text-slate-200 line-clamp-2 italic font-serif my-1">
                    &ldquo;{activeTopic.examPromptTakeaway || activeTopic.subtitle}&rdquo;
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Paper 1 &amp; 2 High-Yield
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="uppercase font-bold text-cyan-300">Folio Mastery</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden my-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300">
                    {completedCount} of {totalTopics} Topics Completed
                  </span>
                </div>
              </div>

              {/* Bottom Quick Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                <button
                  onClick={openExamSprint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-400/35 hover:bg-purple-500/30 font-semibold cursor-pointer transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-purple-300" />
                  <span>Launch Sprint Simulation (⌘E)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleComplete}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                      isCurrentDone
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-white/[0.06] text-slate-200 border border-white/10 hover:bg-white/[0.12]"
                    }`}
                  >
                    {isCurrentDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Topic Mastered</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mark Mastered</span>
                      </>
                    )}
                  </button>

                  {nextTopic && (
                    <button
                      onClick={() => handleNextTopic(nextTopic.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10 cursor-pointer"
                    >
                      <span>Next: {nextTopic.displayCode}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
