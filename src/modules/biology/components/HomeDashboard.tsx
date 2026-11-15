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
  FlaskConical,
  ArrowUpRight,
  Play,
  Dna,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/biology/data";
import { useStudyStore, ViewMode } from "@/modules/biology/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  {
    id: "focus",
    title: "Topics (A1.1–D4.3)",
    blurb: "All 40 May 2027 SL & HL syllabus topics",
    icon: <LayoutGrid className="w-6 h-6 text-green-300" />,
    span: "sm:col-span-2",
  },
  {
    id: "matrix",
    title: "Concept & Theme Matrix",
    blurb: "4 Themes × 4 Organization Levels & Cases",
    icon: <Network className="w-6 h-6 text-teal-300" />,
    span: "",
  },
  {
    id: "lexicon",
    title: "Glossary & Lab Skills",
    blurb: "Stats (χ², t-test), Ψ, Hardy–Weinberg & NOS",
    icon: <FlaskConical className="w-6 h-6 text-lime-300" />,
    span: "",
  },
  {
    id: "revision",
    title: "Active Recall",
    blurb: "SL/HL flashcards & mark-scheme keys",
    icon: <GraduationCap className="w-6 h-6 text-emerald-300" />,
    span: "sm:col-span-2",
  },
  {
    id: "stream",
    title: "Syllabus Checklist",
    blurb: "Track every theme & subunit with 1-click jump",
    icon: <Layers className="w-6 h-6 text-green-200" />,
    span: "sm:col-span-2",
  },
];

export function HomeDashboard() {
  const { setViewMode, setActiveTopic, activeTopicId, completedTopics } =
    useStudyStore();
  const total = ALL_TOPICS.length;
  const done = ALL_TOPICS.filter((t) => completedTopics[t.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <JellyBentoItem index={0} className="sm:col-span-2">
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-green-400" />
              <p className="text-xs uppercase tracking-widest text-green-300/70 font-mono">
                May 2027 Official Syllabus · SL & HL
              </p>
            </div>
            <h1 className="mt-1.5 leading-none">
              <RefractedText
                text="IB Biology SL / HL"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#22c55e"
                spectrumWarmColor="#86efac"
                spectrumMiddleColor="#22c55e"
                spectrumCoolColor="#14b8a6"
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
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black text-sm font-semibold cursor-pointer transition-all shadow-[0_4px_20px_rgba(34,197,94,0.28)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-black" />
            Continue {current.displayCode}
          </button>
          </div>
        </JellyBentoItem>

        <JellyBentoItem index={1}>
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-white/50 font-mono">
            Syllabus Mastery
          </p>
          <div>
            <p className="text-4xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-white/50 mt-1">
              {done} of {total} topics mastered
            </p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-lime-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", mass: 1.1, stiffness: 200, damping: 26 }}
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
              className="liquid-glass-bento rounded-3xl p-5 min-h-[130px] w-full h-full flex flex-col justify-between cursor-pointer transition-all text-left"
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
    </div>
  );
}
