"use client";

import React, { useState } from "react";
import { IB_THEMES, ALL_SUBTOPICS } from "@/modules/german/data/themes";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";

export function SceneSwitcher() {
  const { activeTopicId, setActiveTopic, completedTopics, levelFilter } = useGermanStudyStore();
  const active = ALL_SUBTOPICS.find((t) => t.id === activeTopicId) ?? ALL_SUBTOPICS[0];
  const [themeId, setThemeId] = useState<string>(active.themeId);
  const theme = IB_THEMES.find((t) => t.id === themeId) ?? IB_THEMES[0];
  const visibleSubtopics = theme.subtopics.filter((t) =>
    levelFilter === "SL" ? t.level !== "HL Focus" : true
  );

  return (
    <div className="rounded-3xl p-4 space-y-3 bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
      <div className="flex flex-wrap gap-1.5">
        {IB_THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setThemeId(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              t.id === themeId ? "bg-white text-black shadow-sm" : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visibleSubtopics.map((t) => {
          const isActive = t.id === active.id;
          const done = completedTopics.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              title={t.title}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                isActive
                  ? "bg-white/20 border-white/40 text-white font-semibold shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  : done
                    ? "bg-white/10 border-white/20 text-white/90"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/12"
              }`}
            >
              {t.displayCode}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-white/50 truncate">{active.title}</p>
    </div>
  );
}
