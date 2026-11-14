"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export function StudyMiniHomepage() {
  const { setActiveTopic, setViewMode, levelFilter } = useStudyStore();

  const filtered = ALL_TOPICS.filter((t) => {
    if (levelFilter === "SL") return t.level === "SL / HL";
    if (levelFilter === "HL") return t.level === "HL ONLY";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-black text-white">Executive Stream</h1>
        <p className="text-xs text-white/55 mt-1">
          Rapid synthesis briefs across all IB Geography SL &amp; HL topics.
        </p>
      </div>

      <div className="space-y-3">
        {filtered.map((topic) => (
          <div
            key={topic.id}
            className="rounded-[22px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono text-xs font-bold text-teal-300">
                  {topic.topicCode}
                </span>
                <h2 className="text-base font-bold text-white">{topic.title}</h2>
                {topic.level === "HL ONLY" && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30">
                    HL
                  </span>
                )}
              </div>
              <button
                onClick={() =>
                  React.startTransition(() => {
                    setActiveTopic(topic.id);
                    setViewMode("focus");
                  })
                }
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 hover:text-teal-200"
              >
                <span>Deep View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">{topic.primer5Min}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
