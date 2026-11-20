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
  LineChart,
  Calculator,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/physics/data";
import { useStudyStore, ViewMode } from "@/modules/physics/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "focus", title: "Topics", blurb: "Study one topic at a time", tint: "tint-amber", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "formulas", title: "Formula Bank", blurb: "Every formula with units", tint: "tint-violet", icon: <Calculator className="w-6 h-6" />, span: "" },
  { id: "diagrams", title: "Diagram Lab", blurb: "Graphs, circuits and fields", tint: "tint-sky", icon: <LineChart className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Revise", blurb: "Flashcards and practice", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "matrix", title: "Concept Matrix", blurb: "How ideas connect", tint: "tint-indigo", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Glossary", blurb: "Terms and symbols", tint: "tint-cyan", icon: <Library className="w-6 h-6" />, span: "" },
  { id: "stream", title: "Syllabus Checklist", blurb: "Track units & subunits", tint: "tint-orange", icon: <Layers className="w-6 h-6" />, span: "" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveTopic, activeTopicId, completedTopics, levelFilter } = useStudyStore();
  const activeTopics = React.useMemo(() => {
    return ALL_TOPICS.filter((t) => {
      const isHlOnly = t.level === "HL" || ["A.4", "A.5", "B.4", "D.4", "E.2"].includes(t.topicCode);
      if (levelFilter === "SL") return !isHlOnly;
      if (levelFilter === "HL") return isHlOnly;
      return true;
    });
  }, [levelFilter]);
  const total = activeTopics.length;
  const done = activeTopics.filter((t) => completedTopics[t.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = activeTopics.find((t) => t.id === activeTopicId) ?? activeTopics[0] ?? ALL_TOPICS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <JellyBentoItem index={0} className="sm:col-span-2">
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Welcome back</p>
            <h1 className="mt-1 leading-none">
              <RefractedText
                text="IB Physics"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#6366f1"
                spectrumWarmColor="#a5b4fc"
                spectrumMiddleColor="#6366f1"
                spectrumCoolColor="#38bdf8"
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

      {/* May 2027 Physics SL vs HL Assessment Structure */}
      <JellyBentoItem index={2 + TILES.length}>
        <div className="liquid-glass-bento rounded-3xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-widest text-indigo-300/85 font-mono">
              Physics SL / HL · May 2027 Assessment Structure
            </p>
            <span className="text-[11px] font-mono text-white/50">
              Paper 1A/B · Paper 2 · Scientific Investigation (IA)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 space-y-1">
              <div className="font-semibold text-white">Standard Level (SL)</div>
              <p className="text-white/65">
                <strong>Paper 1</strong> (1h 30m, 36%): Paper 1A (25 MCQs, no calculator) + Paper 1B (Data-based & experimental questions) ·{" "}
                <strong>Paper 2</strong> (1h 30m, 44%): Short-answer and extended-response structured questions ·{" "}
                <strong>Internal Assessment (IA)</strong> (20%): 24 marks scientific investigation.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-500/[0.06] border border-indigo-400/25 p-3.5 space-y-1">
              <div className="font-semibold text-indigo-200">Higher Level (HL)</div>
              <p className="text-white/70">
                <strong>Paper 1</strong> (2h, 36%): Paper 1A (40 MCQs, no calculator) + Paper 1B (Data-based & experimental questions) ·{" "}
                <strong>Paper 2</strong> (2h 30m, 44%): Advanced extended-response questions across Core & HL subunits ·{" "}
                <strong>Internal Assessment (IA)</strong> (20%): 24 marks scientific investigation.
              </p>
            </div>
          </div>
        </div>
      </JellyBentoItem>
    </div>
  );
}
