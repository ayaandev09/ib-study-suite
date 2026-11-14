"use client";

import React, { useState, useEffect } from "react";
import { SYLLABUS_UNITS, ALL_TOPICS } from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";

export function SceneSwitcher() {
  const { activeTopicId, setActiveTopic, completedTopics, levelFilter } =
    useStudyStore();
  const active =
    ALL_TOPICS.find((t) => t.id === activeTopicId) ?? ALL_TOPICS[0];

  const [unitId, setUnitId] = useState<string>(
    SYLLABUS_UNITS.find((u) => u.topics.some((t) => t.id === active.id))?.id ??
      SYLLABUS_UNITS[0].id
  );

  useEffect(() => {
    const owner = SYLLABUS_UNITS.find((u) =>
      u.topics.some((t) => t.id === active.id)
    );
    if (owner && owner.id !== unitId) {
      setUnitId(owner.id);
    }
  }, [active.id]);

  const currentUnit =
    SYLLABUS_UNITS.find((u) => u.id === unitId) ?? SYLLABUS_UNITS[0];

  const visibleTopics = currentUnit.topics.filter((t) => {
    if (levelFilter === "SL") return t.level !== "HL ONLY";
    return true;
  });

  return (
    <div className="liquid-glass-card rounded-3xl p-4 mb-4 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SYLLABUS_UNITS.map((u) => (
          <button
            key={u.id}
            onClick={() => setUnitId(u.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              u.id === unitId
                ? "bg-white text-black shadow-sm"
                : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            {u.code} · {u.shortTitle}
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
              title={`${t.title} (${t.level})`}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer border transition-colors flex items-center gap-1.5 ${
                isActive
                  ? "bg-green-500/25 border-green-400/50 text-white font-semibold shadow-[0_0_14px_rgba(34,197,94,0.22)]"
                  : done
                  ? "bg-white/10 border-white/20 text-white/90"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/12"
              }`}
            >
              <span>{t.displayCode}</span>
              {t.level === "HL ONLY" && (
                <span className="text-[9px] font-mono px-1 rounded bg-lime-400/20 text-lime-300">
                  HL
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-white/55">
        <span className="truncate font-medium">{active.title}</span>
        <span className="font-mono text-[10px] text-green-300/75 shrink-0 ml-2">
          {active.orgLevel} · {active.level}
        </span>
      </div>
    </div>
  );
}
