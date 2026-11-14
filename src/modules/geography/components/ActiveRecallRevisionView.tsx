"use client";

import React, { useState } from "react";
import { RotateCw, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { GEO_FLASHCARDS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export function ActiveRecallRevisionView() {
  const { levelFilter } = useStudyStore();
  const cards = GEO_FLASHCARDS.filter((c) => {
    if (levelFilter === "SL") return c.level === "SL / HL";
    if (levelFilter === "HL") return c.level === "HL ONLY";
    return true;
  });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const safeIdx = cards.length > 0 ? index % cards.length : 0;
  const card = cards[safeIdx];

  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  };

  if (!card) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center text-white/60 text-sm">
        No flashcards match the current {levelFilter} filter.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Active Recall Deck</h1>
          <p className="text-xs text-white/55 mt-1">
            Card {safeIdx + 1} of {cards.length} · Click card to flip
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-xl bg-teal-500/15 border border-teal-400/25 font-mono text-xs font-bold text-teal-300">
          {card.topicCode} · {card.level}
        </span>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[260px] rounded-[28px] border border-teal-500/30 bg-gradient-to-br from-[#061818]/90 via-[#041010]/95 to-[#020808] p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-teal-400/50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-teal-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{flipped ? "Model Answer" : "Prompt"}</span>
        </div>

        <p className="text-lg sm:text-xl font-bold text-white leading-relaxed max-w-xl">
          {flipped ? card.back : card.front}
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs text-white/40 pt-2">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Tap to flip</span>
        </div>
      </button>

      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-white/75"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={next}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-xs font-semibold text-teal-100"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
