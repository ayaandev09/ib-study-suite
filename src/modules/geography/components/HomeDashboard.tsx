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
  BookMarked,
  ArrowUpRight,
  Play,
  Globe2,
} from "lucide-react";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore, ViewMode } from "@/modules/geography/store/useStudyStore";

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
    title: "Topics (1.1–4.2)",
    blurb: "All 13 SL & HL Geography units & options",
    icon: <LayoutGrid className="w-6 h-6 text-teal-300" />,
    span: "sm:col-span-2",
  },
  {
    id: "matrix",
    title: "Concept & Unit Matrix",
    blurb: "4 Units × 6 Concepts & Case Vault",
    icon: <Network className="w-6 h-6 text-cyan-300" />,
    span: "",
  },
  {
    id: "lexicon",
    title: "Models & Lexicon",
    blurb: "Spearman's rₛ, Q = A×v, Gini & terms",
    icon: <BookMarked className="w-6 h-6 text-emerald-300" />,
    span: "",
  },
  {
    id: "revision",
    title: "Active Recall",
    blurb: "SL/HL flashcards & Paper 1/2/3 keys",
    icon: <GraduationCap className="w-6 h-6 text-teal-300" />,
    span: "sm:col-span-2",
  },
  {
    id: "stream",
    title: "Executive Stream",
    blurb: "Skim all 4 units with 1-click jump",
    icon: <Layers className="w-6 h-6 text-cyan-200" />,
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
                <Globe2 className="w-4 h-4 text-teal-400" />
                <p className="text-xs uppercase tracking-widest text-teal-300/70 font-mono">
                  Official IB Syllabus · SL &amp; HL
                </p>
              </div>
              <h1 className="mt-1.5 leading-none">
                <RefractedText
                  text="IB Geography SL / HL"
                  theme="dark"
                  fontSize="32px"
                  fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                  fontWeight={800}
                  fontHeight={100}
                  letterSpacing="0.025em"
                  extraBold={0.7}
                  cornerRounding={0.4}
                  beamColor="#14b8a6"
                  spectrumWarmColor="#99f6e4"
                  spectrumMiddleColor="#14b8a6"
                  spectrumCoolColor="#06b6d4"
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
                React.startTransition(() => {
                  setActiveTopic(current.id);
                  setViewMode("focus");
                });
              }}
              className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black text-sm font-semibold cursor-pointer transition-all shadow-[0_4px_20px_rgba(20,184,166,0.28)] hover:scale-[1.03] active:scale-[0.98]"
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
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 rounded-full"
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
              onClick={() => React.startTransition(() => setViewMode(t.id))}
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
