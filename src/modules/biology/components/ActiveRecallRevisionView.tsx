"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BIO_FLASHCARDS } from "@/modules/biology/data";
import { ChevronLeft, ChevronRight, RotateCw, ArrowRight } from "lucide-react";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";

export function ActiveRecallRevisionView() {
  const [filter, setFilter] = useState<"all" | "SL" | "HL">("all");
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { setActiveTopic, setViewMode } = useStudyStore();

  const cards = BIO_FLASHCARDS.filter((c) => {
    if (filter === "SL") return !c.isHLOnly;
    if (filter === "HL") return c.isHLOnly;
    return true;
  });

  const safeIdx = idx % Math.max(cards.length, 1);
  const card = cards[safeIdx] ?? BIO_FLASHCARDS[0];

  const next = () => {
    setFlipped(false);
    setIdx((p) => (p + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setIdx((p) => (p - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Active Recall Flashcards
          </h2>
          <p className="text-xs text-white/55 mt-0.5">
            Click card to reveal IB mark-scheme phrasing.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-2xl p-1 text-xs font-mono">
          {(["all", "SL", "HL"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setIdx(0);
                setFlipped(false);
              }}
              className={`px-3 py-1 rounded-xl cursor-pointer transition-colors ${
                filter === f
                  ? "bg-white text-black font-semibold"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {f === "all" ? "All Cards" : f === "HL" ? "HL Only" : "SL Core"}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={card.id + (flipped ? "-back" : "-front")}
        initial={{ opacity: 0, rotateX: 8, scale: 0.98 }}
        animate={{ opacity: 1, rotateX: 0, scale: 1 }}
        transition={{ type: "spring", mass: 1.1, stiffness: 220, damping: 26 }}
        onClick={() => setFlipped((f) => !f)}
        className="liquid-glass-bento rounded-3xl p-7 min-h-[280px] flex flex-col justify-between cursor-pointer select-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg bg-green-500/20 border border-green-400/35 text-xs font-mono text-green-300">
              {card.topicCode}
            </span>
            {card.isHLOnly && (
              <span className="px-2 py-0.5 rounded-lg bg-lime-500/20 border border-lime-400/35 text-[10px] font-mono text-lime-300">
                HL ONLY
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-white/45 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            {flipped ? "Mark Scheme Answer" : "Question"} · {safeIdx + 1}/
            {cards.length}
          </span>
        </div>

        <div className="py-6">
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
            {flipped ? card.back : card.front}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <span className="text-green-300/80 font-mono text-[11px]">
            {flipped ? `Key: ${card.markSchemeKey}` : "Tap to flip"}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTopic(card.topicId);
              setViewMode("focus");
            }}
            className="flex items-center gap-1 text-white/70 hover:text-white font-semibold cursor-pointer"
          >
            <span>Open {card.topicCode}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.07] hover:bg-white/[0.15] border border-white/15 text-xs text-white cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={next}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white text-black font-semibold text-xs hover:bg-white/90 cursor-pointer"
        >
          Next Card
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
