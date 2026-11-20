"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { JellyBentoItem } from "@/components/JellyBentoItem";
import {
  LayoutGrid,
  Layers,
  GraduationCap,
  Network,
  Library,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/business/data";
import { useStudyStore, ViewMode } from "@/modules/business/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "focus", title: "Syllabus Topics", blurb: "Units 1 to 5 + Business Management Toolkit", tint: "tint-blue", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "matrix", title: "CCES & Concept Matrix", blurb: "Creativity, Change, Ethics, Sustainability", tint: "tint-rose", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Active Recall Hub", blurb: "Flashcard decks, formulas & Paper 1/2 models", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Terms & Theorists", blurb: "Maslow, Taylor, Ansoff, Porter, Lewin & BMT glossary", tint: "tint-sky", icon: <Library className="w-6 h-6" />, span: "" },
  { id: "stream", title: "Syllabus Checklist", blurb: "Track every unit and subunit", tint: "tint-orange", icon: <Layers className="w-6 h-6" />, span: "sm:col-span-2" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveTopic, activeTopicId, completedTopics } = useStudyStore();
  const total = ALL_TOPICS.length;
  const done = ALL_TOPICS.filter((t) => completedTopics[t.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <JellyBentoItem index={0} className="sm:col-span-2">
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Welcome back</p>
            <h1 className="mt-1 leading-none">
              <RefractedText
                text="Business Management"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#2563eb"
                spectrumWarmColor="#60a5fa"
                spectrumMiddleColor="#2563eb"
                spectrumCoolColor="#1d4ed8"
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
              setActiveTopic(current.id);
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
            <p className="text-xs text-white/50 mt-1">{done} of {total} topics done</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

      {/* May 2027 SL vs HL Assessment Structure */}
      <JellyBentoItem index={2 + TILES.length}>
      <div className="liquid-glass-bento rounded-3xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-blue-300/80 font-mono">
            IB Business Management SL / HL · May 2027 Assessment
          </p>
          <span className="text-[11px] font-mono text-white/50">
            SL Core + HL Extension (1.7, 2.5, 3.6, 3.7, 4.3, 4.6, 4.7, 5.3, 5.5–5.7)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 space-y-1">
            <div className="font-semibold text-white">Standard Level (SL)</div>
            <p className="text-white/65">
              <strong>Paper 1</strong> (1h 30m, 35%): Pre-released case study ·{" "}
              <strong>Paper 2</strong> (1h 30m, 35%): Quantitative &amp; structured ·{" "}
              <strong>IA</strong> (30%): Business research project (1,800 words).
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/[0.08] border border-blue-400/25 p-3.5 space-y-1">
            <div className="font-semibold text-blue-200">Higher Level (HL)</div>
            <p className="text-white/70">
              <strong>Paper 1</strong> (1h 30m, 25%) ·{" "}
              <strong>Paper 2</strong> (1h 45m, 30%) ·{" "}
              <strong>Paper 3 (HL Only)</strong> (1h 15m, 25%): Social Enterprise unseen case — Q1 (2m), Q2 (6m), Q3 (17m) ·{" "}
              <strong>IA</strong> (20%).
            </p>
          </div>
        </div>
      </div>
      </JellyBentoItem>
    </div>
  );
}
