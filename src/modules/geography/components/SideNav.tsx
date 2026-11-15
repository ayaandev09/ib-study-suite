"use client";

import React from "react";
import {
  Compass,
  BookOpen,
  Layers,
  Grid,
  BookMarked,
  GraduationCap,
} from "lucide-react";
import { useStudyStore, ViewMode } from "@/modules/geography/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/geography/data";
import { GeographyAppLogo } from "./GeographyAppLogo";
import { cn } from "@/modules/geography/lib/cn";

const NAV_ITEMS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Compass className="w-4 h-4" /> },
  { id: "focus", label: "Topics", icon: <BookOpen className="w-4 h-4" /> },
  { id: "stream", label: "Syllabus Checklist", icon: <Layers className="w-4 h-4" /> },
  { id: "matrix", label: "Concept Matrix", icon: <Grid className="w-4 h-4" /> },
  { id: "lexicon", label: "Models & Lexicon", icon: <BookMarked className="w-4 h-4" /> },
  { id: "revision", label: "Flashcards", icon: <GraduationCap className="w-4 h-4" /> },
];

export function SideNav() {
  const { viewMode, setViewMode, sidebarCollapsed, completedTopics } =
    useStudyStore();

  const completedCount = ALL_TOPICS.filter((t) => completedTopics[t.id]).length;
  const pct = Math.round((completedCount / ALL_TOPICS.length) * 100);

  if (sidebarCollapsed) return null;

  return (
    <aside
      data-tour="sidebar"
      className="hidden md:flex shrink-0 rounded-3xl flex-col h-[calc(100vh-4.5rem)] sticky top-[56px] w-[228px] mr-5 p-3.5 select-none overflow-hidden z-10 bg-teal-950/[0.16] backdrop-blur-xl border border-teal-400/[0.18] shadow-2xl"
    >
      <div className="w-[200px] flex flex-col h-full min-h-0 gap-3">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-1.5 pt-0.5 pb-1">
          <GeographyAppLogo size={36} />
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-teal-300/75">
              IB GEO SL/HL
            </div>
            <div className="text-sm font-bold text-white truncate">
              IB Geography
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar pr-0.5">
          {NAV_ITEMS.map((item) => {
            const active = viewMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => React.startTransition(() => setViewMode(item.id))}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-[13px] cursor-pointer transition-colors duration-150",
                  active
                    ? "bg-teal-500/[0.18] text-white font-semibold border-teal-400/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_rgba(20,184,166,0.16)]"
                    : "text-slate-300/90 hover:text-white hover:bg-white/[0.06] hover:border-white/10 border-transparent"
                )}
              >
                <span className={active ? "text-teal-300" : "text-white/55"}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Progress Card */}
        <div className="mt-auto pt-3 border-t border-white/[0.08]">
          <div className="rounded-2xl border border-teal-400/18 bg-black/40 p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Progress</span>
              <span className="font-mono font-semibold text-teal-300">{pct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              {completedCount} of {ALL_TOPICS.length} topics done
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
