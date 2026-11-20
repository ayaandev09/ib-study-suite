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
  Briefcase,
  ClipboardList,
  LineChart,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/economics/data";
import { useStudyStore, ViewMode } from "@/modules/economics/store/useStudyStore";

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
  { id: "diagrams", title: "Diagram Simulator", blurb: "Living market welfare & taxes", tint: "tint-sky", icon: <LineChart className="w-6 h-6 text-sky-400" />, span: "sm:col-span-2" },
  { id: "cases", title: "Case Studies", blurb: "Real-world examples to cite", tint: "tint-rose", icon: <Briefcase className="w-6 h-6" />, span: "" },
  { id: "exam-guide", title: "Exam Guide", blurb: "Paper structure and mark schemes", tint: "tint-violet", icon: <ClipboardList className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Revise", blurb: "Flashcards and active recall", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "matrix", title: "Concept Matrix", blurb: "How the key concepts connect", tint: "tint-indigo", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Glossary & Formulas", blurb: "Formulas & 80+ command terms", tint: "tint-cyan", icon: <Library className="w-6 h-6 text-cyan-400" />, span: "sm:col-span-2" },
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
                text="IB Economics"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#0ea5e9"
                spectrumWarmColor="#7dd3fc"
                spectrumMiddleColor="#0ea5e9"
                spectrumCoolColor="#3b82f6"
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

      {/* May 2027 Economics SL vs HL Assessment Structure */}
      <JellyBentoItem index={2 + TILES.length}>
        <div className="liquid-glass-bento rounded-3xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-widest text-sky-300/85 font-mono">
              Economics SL / HL · May 2027 Assessment Structure
            </p>
            <span className="text-[11px] font-mono text-white/50">
              Paper 1 · Paper 2 · Paper 3 (HL) · Internal Assessment (IA)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 space-y-1">
              <div className="font-semibold text-white">Standard Level (SL)</div>
              <p className="text-white/65">
                <strong>Paper 1</strong> (1h 15m, 30%): Extended-response essay question (25 marks) ·{" "}
                <strong>Paper 2</strong> (1h 45m, 40%): Data-response paper (40 marks) ·{" "}
                <strong>Internal Assessment (IA)</strong> (30%): 3 economic commentaries on real-world news articles.
              </p>
            </div>
            <div className="rounded-2xl bg-sky-500/[0.06] border border-sky-400/25 p-3.5 space-y-1">
              <div className="font-semibold text-sky-200">Higher Level (HL)</div>
              <p className="text-white/70">
                <strong>Paper 1</strong> (1h 15m, 20%): Extended-response essay ·{" "}
                <strong>Paper 2</strong> (1h 45m, 30%): Data-response questions ·{" "}
                <strong>Paper 3 (HL Only)</strong> (1h 45m, 30%): Policy-calculation &amp; recommendation paper ·{" "}
                <strong>Internal Assessment (IA)</strong> (20%): 3 commentaries.
              </p>
            </div>
          </div>
        </div>
      </JellyBentoItem>
    </div>
  );
}
