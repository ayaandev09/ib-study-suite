"use client";

import React, { useState } from "react";
import { BOOK_PARTS, ALL_CHAPTERS } from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";

export function SceneSwitcher() {
  const { activeChapterId, setActiveChapter, completedChapters } = useStudyStore();
  const active = ALL_CHAPTERS.find((c) => c.id === activeChapterId) ?? ALL_CHAPTERS[0];
  const [partId, setPartId] = useState<string>(
    BOOK_PARTS.find((p) => p.chapters.some((c) => c.id === active.id))?.id ?? BOOK_PARTS[0].id,
  );
  const part = BOOK_PARTS.find((p) => p.id === partId) ?? BOOK_PARTS[0];

  return (
    <div className="rounded-3xl p-4 mb-4 space-y-3 bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
      <div className="flex flex-wrap gap-1.5">
        {BOOK_PARTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPartId(p.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              p.id === partId ? "bg-white text-black shadow-sm" : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            Part {p.romanNumeral}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {part.chapters.map((c) => {
          const isActive = c.id === active.id;
          const done = !!completedChapters[c.id];
          return (
            <button
              key={c.id}
              onClick={() => setActiveChapter(c.id)}
              title={c.title}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                isActive
                  ? "bg-white/20 border-white/40 text-white font-semibold shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                  : done
                    ? "bg-white/10 border-white/20 text-white/90"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/12"
              }`}
            >
              {c.displayCode}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-white/50 truncate">{active.title}</p>
    </div>
  );
}
