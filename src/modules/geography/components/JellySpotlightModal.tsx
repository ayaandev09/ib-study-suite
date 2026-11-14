"use client";

import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export function JellySpotlightModal() {
  const { isSpotlightOpen, closeSpotlight, setActiveTopic, setViewMode } =
    useStudyStore();
  const [query, setQuery] = useState("");

  if (!isSpotlightOpen) return null;

  const q = query.trim().toLowerCase();
  const matches = ALL_TOPICS.filter(
    (t) =>
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.topicCode.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.cases.some((c) => c.title.toLowerCase().includes(q))
  );

  const selectTopic = (id: string) => {
    React.startTransition(() => {
      setActiveTopic(id);
      setViewMode("focus");
      closeSpotlight();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-xl rounded-[26px] border border-teal-500/30 bg-[#041010] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-teal-500/20">
          <Search className="w-4 h-4 text-teal-300 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to IB Geography topic or case study..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            onClick={closeSpotlight}
            className="h-7 w-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {matches.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTopic(t.id)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-500/15 text-left transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-300">
                    {t.topicCode}
                  </span>
                  <span className="text-sm font-semibold text-white truncate">
                    {t.title}
                  </span>
                </div>
                <div className="text-xs text-white/50 truncate">{t.subtitle}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-300 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
