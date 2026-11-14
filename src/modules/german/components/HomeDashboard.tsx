"use client";

import React from "react";
import { motion } from "framer-motion";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { JellyBentoItem } from "@/components/JellyBentoItem";
import {
  ArrowUpRight,
  Play,
  BookOpenCheck,
  FileText,
  GraduationCap,
  LayoutGrid,
  MessageSquareQuote,
  Mic,
  Sparkles,
} from "lucide-react";
import { ALL_SUBTOPICS } from "@/modules/german/data/themes";
import { useGermanStudyStore, GermanNavMode } from "@/modules/german/store/useGermanStudyStore";

type Tile = {
  id: GermanNavMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "themen", title: "Themen", blurb: "Die 5 IB-Themen Schritt für Schritt", tint: "tint-amber", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "grammatik", title: "Grammatik", blurb: "Regeln mit Beispielen", tint: "tint-violet", icon: <Sparkles className="w-6 h-6" />, span: "" },
  { id: "textsorten", title: "Textsorten", blurb: "Paper 1 Vorlagen", tint: "tint-sky", icon: <FileText className="w-6 h-6" />, span: "" },
  { id: "redemittel", title: "Redemittel", blurb: "Phrasen für Sprechen und Schreiben", tint: "tint-rose", icon: <MessageSquareQuote className="w-6 h-6" />, span: "" },
  { id: "pruefung", title: "Prüfung", blurb: "Kriterien und Übungen", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "literatur", title: "Literatur", blurb: "Mündliche Prüfung HL", tint: "tint-orange", icon: <BookOpenCheck className="w-6 h-6" />, span: "" },
  { id: "testdaf", title: "TestDaF", blurb: "C1 Vorbereitung mit Sprechübung", tint: "tint-cyan", icon: <Mic className="w-6 h-6" />, span: "sm:col-span-2" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveTopic, activeTopicId, completedTopics } = useGermanStudyStore();
  const total = ALL_SUBTOPICS.length;
  const done = ALL_SUBTOPICS.filter((t) => completedTopics.includes(t.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = ALL_SUBTOPICS.find((t) => t.id === activeTopicId) ?? ALL_SUBTOPICS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <JellyBentoItem index={0} className="sm:col-span-2">
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Willkommen zurück</p>
            <h1 className="mt-1 leading-none">
              <RefractedText
                text="IB Deutsch B"
                theme="dark"
                fontSize="32px"
                fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
                fontWeight={800}
                fontHeight={100}
                letterSpacing="0.025em"
                extraBold={0.7}
                cornerRounding={0.4}
                beamColor="#d946ef"
                spectrumWarmColor="#f0abfc"
                spectrumMiddleColor="#d946ef"
                spectrumCoolColor="#a855f7"
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
              setViewMode("themen");
            }}
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black text-sm font-semibold cursor-pointer transition-all shadow-[0_4px_16px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-black" />
            Weiter {current.displayCode}
          </button>
          </div>
        </JellyBentoItem>
        <JellyBentoItem index={1}>
          <div className="liquid-glass-bento rounded-3xl p-6 h-full flex flex-col justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Fortschritt</p>
          <div>
            <p className="text-4xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-white/50 mt-1">{done} of {total} Themen</p>
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

      {/* May 2027 SL vs HL Assessment Structure */}
      <JellyBentoItem index={2 + TILES.length}>
      <div className="liquid-glass-bento rounded-3xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-widest text-fuchsia-300/85 font-mono">
            IB Deutsch B SL / HL · May 2027 Prüfung
          </p>
          <span className="text-[11px] font-mono text-white/50">
            Paper 1 (25%) · Paper 2 (50%) · Individual Oral (25%)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 space-y-1">
            <div className="font-semibold text-white">Standard Level (SL)</div>
            <p className="text-white/65">
              <strong>Paper 1</strong> (1h 15m, 25%): 250–400 Wörter (Textsorte) ·{" "}
              <strong>Paper 2</strong> (50%): Listening (25m) + Reading (40m) ·{" "}
              <strong>Individual Oral</strong> (25%): 15m prep on visual stimulus.
            </p>
          </div>
          <div className="rounded-2xl bg-fuchsia-500/[0.06] border border-fuchsia-400/25 p-3.5 space-y-1">
            <div className="font-semibold text-fuchsia-200">Higher Level (HL)</div>
            <p className="text-white/70">
              <strong>Paper 1</strong> (1h 15m, 25%): 450–600 Wörter (Textsorte) ·{" "}
              <strong>Paper 2</strong> (50%): Listening (25m) + Reading (40m) ·{" "}
              <strong>Individual Oral</strong> (25%): 20m prep on ~300-word literary extract from 2 German literary works (e.g. Dürrenmatt).
            </p>
          </div>
        </div>
      </div>
      </JellyBentoItem>
    </div>
  );
}
