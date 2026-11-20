"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  LayoutGrid,
  Layers,
  GraduationCap,
  Network,
  Library,
  Briefcase,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/economics/data";
import { useStudyStore, ViewMode } from "@/modules/economics/store/useStudyStore";
import { IBEconomicsAppLogo } from "./IBEconomicsAppLogo";

const ITEMS: { id: ViewMode; label: string; tint: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", tint: "245,158,11", icon: <Compass className="w-4 h-4" /> },
  { id: "focus", label: "Topics", tint: "245,158,11", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "diagrams", label: "Diagram Simulator", tint: "56,189,248", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "cases", label: "Case Studies", tint: "244,63,94", icon: <Briefcase className="w-4 h-4" /> },
  { id: "exam-guide", label: "Exam Guide", tint: "139,92,246", icon: <ClipboardList className="w-4 h-4" /> },
  { id: "revision", label: "Revise", tint: "16,185,129", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "matrix", label: "Concept Matrix", tint: "99,102,241", icon: <Network className="w-4 h-4" /> },
  { id: "lexicon", label: "Glossary", tint: "6,182,212", icon: <Library className="w-4 h-4" /> },
  { id: "stream", label: "Syllabus Checklist", tint: "249,115,22", icon: <Layers className="w-4 h-4" /> },
];

export function SideNav() {
  const { viewMode, setViewMode, sidebarCollapsed, completedTopics } = useStudyStore();
  const done = ALL_TOPICS.filter((t) => completedTopics[t.id]).length;
  const pct = Math.round((done / ALL_TOPICS.length) * 100);

  return (
    <aside
      data-tour="sidebar"
      className={`hidden md:flex shrink-0 rounded-3xl flex-col h-[calc(100vh-4.5rem)] sticky top-[56px] select-none overflow-hidden transition-[width,opacity,padding,margin] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 bg-sky-950/[0.16] backdrop-blur-xl border border-sky-400/[0.18] shadow-2xl ${
        sidebarCollapsed
          ? "w-0 max-w-0 p-0 mr-0 border-0 opacity-0 pointer-events-none"
          : "w-[228px] mr-5 p-3.5 opacity-100"
      }`}
    >
      <div className="w-[200px] flex flex-col h-full min-h-0 gap-3">
        <div className="flex items-center gap-2.5 mac-drag-region px-1.5 pt-0.5 pb-1">
          <div className="w-9 h-9 rounded-2xl bg-sky-500/15 border border-sky-400/25 p-1 shrink-0 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <IBEconomicsAppLogo className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono tracking-widest text-sky-300/75 uppercase">IB ECON SL/HL</p>
            <h1 className="text-sm font-bold text-white tracking-tight truncate">IB Economics</h1>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar pr-0.5" aria-label="Sections">
          {ITEMS.map((it) => {
            const active = viewMode === it.id;
            return (
              <motion.button
                key={it.id}
                onClick={() => setViewMode(it.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.14 }}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border text-[13px] cursor-pointer transition-colors ${
                  active
                    ? "bg-sky-500/[0.18] border-sky-400/35 text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_rgba(56,189,248,0.14)]"
                    : "border-transparent text-slate-300/90 hover:bg-white/[0.06] hover:border-white/10 hover:text-white"
                }`}
              >
                <span className={active ? "text-sky-300" : "text-white/55"}>{it.icon}</span>
                <span className="truncate">{it.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto pt-3 border-t border-white/[0.08]">
          <div className="rounded-2xl bg-black/40 border border-sky-400/15 p-3">
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Progress</span>
              <span className="text-sky-300 font-semibold font-mono">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-sky-400/85 transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">{done} of {ALL_TOPICS.length} topics done</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
