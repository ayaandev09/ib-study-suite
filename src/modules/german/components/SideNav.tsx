"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Compass,
  FileText,
  GraduationCap,
  Layers,
  LayoutGrid,
  MessageSquareQuote,
  Mic,
  Network,
  Sparkles,
  Zap,
} from "lucide-react";
import { ALL_SUBTOPICS } from "@/modules/german/data/themes";
import { useGermanStudyStore, GermanNavMode } from "@/modules/german/store/useGermanStudyStore";
import { IBGermanAppLogo } from "./IBGermanAppLogo";

const ITEMS: { id: GermanNavMode; label: string; tint: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", tint: "245,158,11", icon: <Compass className="w-4 h-4" /> },
  { id: "themen", label: "Themen", tint: "245,158,11", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "revision", label: "Revise & Tickets", tint: "244,63,94", icon: <Zap className="w-4 h-4" /> },
  { id: "stream", label: "Syllabus Checklist", tint: "249,115,22", icon: <Layers className="w-4 h-4" /> },
  { id: "matrix", label: "Concept Matrix", tint: "217,70,239", icon: <Network className="w-4 h-4" /> },
  { id: "grammatik", label: "Grammatik", tint: "139,92,246", icon: <Sparkles className="w-4 h-4" /> },
  { id: "textsorten", label: "Textsorten", tint: "14,165,233", icon: <FileText className="w-4 h-4" /> },
  { id: "redemittel", label: "Redemittel", tint: "244,63,94", icon: <MessageSquareQuote className="w-4 h-4" /> },
  { id: "pruefung", label: "Prüfung", tint: "16,185,129", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "literatur", label: "Literatur", tint: "249,115,22", icon: <BookOpenCheck className="w-4 h-4" /> },
  { id: "testdaf", label: "TestDaF", tint: "6,182,212", icon: <Mic className="w-4 h-4" /> },
];

export function SideNav() {
  const { viewMode, setViewMode, sidebarCollapsed, completedTopics } = useGermanStudyStore();
  const done = ALL_SUBTOPICS.filter((t) => completedTopics.includes(t.id)).length;
  const pct = Math.round((done / ALL_SUBTOPICS.length) * 100);

  return (
    <aside
      data-tour="sidebar"
      className={`hidden md:flex shrink-0 rounded-3xl flex-col h-[calc(100vh-4.5rem)] sticky top-[56px] select-none overflow-hidden transition-[width,opacity,padding,margin] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 bg-fuchsia-950/[0.16] backdrop-blur-xl border border-fuchsia-400/[0.18] shadow-2xl ${
        sidebarCollapsed
          ? "w-0 max-w-0 p-0 mr-0 border-0 opacity-0 pointer-events-none"
          : "w-[228px] mr-5 p-3.5 opacity-100"
      }`}
    >
      <div className="w-[200px] flex flex-col h-full min-h-0 gap-3">
        <div className="flex items-center gap-2.5 mac-drag-region px-1.5 pt-0.5 pb-1">
          <div className="w-9 h-9 rounded-2xl bg-fuchsia-500/15 border border-fuchsia-400/25 p-1 shrink-0 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <IBGermanAppLogo className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-mono tracking-widest text-fuchsia-300/75 uppercase">DEUTSCH B SL/HL</p>
            <h1 className="text-sm font-bold text-white tracking-tight truncate">IB German B</h1>
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
                    ? "bg-fuchsia-500/[0.18] border-fuchsia-400/35 text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_rgba(217,70,239,0.16)]"
                    : "border-transparent text-slate-300/90 hover:bg-white/[0.06] hover:border-white/10 hover:text-white"
                }`}
              >
                <span className={active ? "text-fuchsia-300" : "text-white/55"}>{it.icon}</span>
                <span className="truncate">{it.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="mt-auto pt-3 border-t border-white/[0.08]">
          <div className="rounded-2xl bg-black/40 border border-fuchsia-400/15 p-3">
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span>Progress</span>
              <span className="text-fuchsia-300 font-semibold font-mono">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-fuchsia-400/85 transition-all duration-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">{done} of {ALL_SUBTOPICS.length} Themen done</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
