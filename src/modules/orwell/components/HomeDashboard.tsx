"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { JellyBentoItem } from "@/components/JellyBentoItem";
import {
  LayoutGrid,
  Gem,
  Layers,
  GraduationCap,
  Network,
  Library,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_CHAPTERS } from "@/modules/orwell/data";
import { useStudyStore, ViewMode } from "@/modules/orwell/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "focus", title: "Chapters", blurb: "Study one chapter at a time with close analysis", tint: "tint-amber", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "matrix", title: "Theme Matrix", blurb: "Doublethink, telescreens, Newspeak & power", tint: "tint-rose", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Revision Hub", blurb: "Flashcards, quizzes, and cram outlines", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Symbols & Motifs", blurb: "Paperweight, telescreens, St. Clement's & diary", tint: "tint-sky", icon: <Gem className="w-6 h-6" />, span: "" },
  { id: "stream", title: "Syllabus Checklist", blurb: "Track all 3 Parts & 24 Chapters with completion toggles", tint: "tint-orange", icon: <Layers className="w-6 h-6" />, span: "sm:col-span-2" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveChapter, activeChapterId, completedChapters } = useStudyStore();
  const total = ALL_CHAPTERS.length;
  const done = ALL_CHAPTERS.filter((c) => completedChapters[c.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = ALL_CHAPTERS.find((c) => c.id === activeChapterId) ?? ALL_CHAPTERS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <JellyBentoItem index={0} className="sm:col-span-2">
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Welcome back</p>
            <h1 className="mt-1 leading-none">
              <RefractedText
                text="1984 — George Orwell"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#f43f5e"
                spectrumWarmColor="#fda4af"
                spectrumMiddleColor="#f43f5e"
                spectrumCoolColor="#e11d48"
                colorIntensity={1.15}
                liftDuration={1.1}
                stagger={0.3}
                intensity={1.25}
                className="max-w-full"
              />
            </h1>
          </div>
          <button
            onClick={() => {
              setActiveChapter(current.id);
              setViewMode("focus");
            }}
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black text-sm font-semibold cursor-pointer transition-all shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-black" />
            Continue {current.displayCode}
          </button>
          </div>
        </JellyBentoItem>
        <JellyBentoItem index={1}>
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Progress</p>
          <div>
            <p className="text-4xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-white/50 mt-1">{done} of {total} chapters done</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-white/90"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
          </div>
        </JellyBentoItem>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {TILES.map((t, i) => (
          <JellyBentoItem key={t.id} index={2 + i} className={t.span}>
            <motion.button
              onClick={() => setViewMode(t.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="liquid-glass-bento rounded-3xl p-5 min-h-[130px] w-full h-full flex flex-col justify-between cursor-pointer transition-transform duration-200 text-left"
            >
              <div className="flex items-start justify-between text-white/90">
                {t.icon}
                <ArrowUpRight className="w-4 h-4 text-white/40" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">{t.title}</h2>
                <p className="text-sm text-white/60 mt-0.5">{t.blurb}</p>
              </div>
            </motion.button>
          </JellyBentoItem>
        ))}
      </div>

      {/* May 2027 English A Lit SL vs HL Assessment Structure */}
      <JellyBentoItem index={2 + TILES.length}>
      <div className="liquid-glass-bento rounded-3xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-rose-300/85 font-mono">
            English A: Literature SL / HL · May 2027 Assessment
          </p>
          <span className="text-[11px] font-mono text-white/50">
            Paper 1 · Paper 2 · Individual Oral · HL Essay
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 space-y-1">
            <div className="font-semibold text-white">Standard Level (SL)</div>
            <p className="text-white/65">
              <strong>Paper 1</strong> (1h 15m, 35%): 1 guided literary analysis ·{" "}
              <strong>Paper 2</strong> (1h 45m, 35%): Comparative essay on 2 works ·{" "}
              <strong>Individual Oral</strong> (30%): 15m oral on global issue.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-500/[0.06] border border-rose-400/25 p-3.5 space-y-1">
            <div className="font-semibold text-rose-200">Higher Level (HL)</div>
            <p className="text-white/70">
              <strong>Paper 1</strong> (2h 15m, 35%): 2 guided literary analyses ·{" "}
              <strong>Paper 2</strong> (1h 45m, 25%) ·{" "}
              <strong>HL Essay (HL Only)</strong> (20%): 1,200–1,500 words ·{" "}
              <strong>Individual Oral</strong> (20%).
            </p>
          </div>
        </div>
      </div>
      </JellyBentoItem>
    </div>
  );
}
