"use client";

import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { ALL_TOPICS } from "@/modules/biology/data";

export function JellySpotlightModal() {
  const { isSpotlightOpen, closeSpotlight, setActiveTopic, setViewMode } =
    useStudyStore();
  const [q, setQ] = useState("");

  if (!isSpotlightOpen) return null;

  const matches = ALL_TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(q.toLowerCase()) ||
      t.summary.toLowerCase().includes(q.toLowerCase()) ||
      t.topicCode.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 10);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-start justify-center pt-20 p-4"
      onClick={closeSpotlight}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="liquid-glass-elevated rounded-3xl p-5 max-w-xl w-full space-y-3"
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Search className="w-4 h-4 text-green-300" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to Biology topic (e.g. A1.1, Water potential, CRISPR, Krebs)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
          <button
            onClick={closeSpotlight}
            className="p-1 rounded-lg text-white/50 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1.5">
          {matches.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTopic(t.id);
                setViewMode("focus");
                closeSpotlight();
              }}
              className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-green-500/15 border border-white/5 hover:border-green-400/30 flex items-center justify-between gap-3 cursor-pointer transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-green-300 font-bold">
                    {t.displayCode}
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {t.title.replace(`${t.displayCode} `, "")}
                  </span>
                  {t.level === "HL ONLY" && (
                    <span className="text-[9px] font-mono px-1.5 rounded bg-lime-500/20 text-lime-300">
                      HL
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/50 truncate mt-0.5">
                  {t.subtitle}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
