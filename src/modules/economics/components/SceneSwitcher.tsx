"use client";

import React, { useState } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS } from "@/modules/economics/data";
import { useStudyStore } from "@/modules/economics/store/useStudyStore";

export function SceneSwitcher() {
  const { activeTopicId, setActiveTopic, completedTopics, levelFilter } = useStudyStore();
  const active = ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];
  const [unitId, setUnitId] = useState<string>(
    SYLLABUS_UNITS.find((u) => u.topics.some((t) => t.id === active.id))?.id ?? SYLLABUS_UNITS[0].id,
  );
  const currentUnit = SYLLABUS_UNITS.find((u) => u.id === unitId) ?? SYLLABUS_UNITS[0];
  const visibleTopics = currentUnit.topics.filter((t) =>
    levelFilter === "SL" ? t.level !== "HL" && !t.level.includes("HL Only") : true
  );

  return (
    <div className="rounded-3xl p-4 mb-4 space-y-3 bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
      <div className="flex flex-wrap gap-1.5">
        {SYLLABUS_UNITS.map((u) => (
          <button
            key={u.id}
            onClick={() => setUnitId(u.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              u.id === unitId ? "bg-white text-black shadow-sm" : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            {u.badge || `Unit ${u.unitNumber}`}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visibleTopics.map((t) => {
          const isActive = t.id === active.id;
          const done = !!completedTopics[t.id];
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
