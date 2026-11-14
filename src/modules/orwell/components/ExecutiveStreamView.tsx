"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BOOK_PARTS } from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";

export function ExecutiveStreamView() {
  const { setActiveChapter, setViewMode, completedChapters } = useStudyStore();

  const totalChapters = BOOK_PARTS.reduce(
    (acc, p) => acc + p.chapters.length,
    0
  );

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Executive Stream — Nineteen Eighty-Four Study Guide
        </h2>
        <p className="text-xs text-white/55 mt-1">
          Concise digest across all {BOOK_PARTS.length} Parts and {totalChapters}{" "}
          Chapters. Click any card to jump directly into focused study.
        </p>
      </div>

      {BOOK_PARTS.map((part) => {
        if (part.chapters.length === 0) return null;
        return (
          <section key={part.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {part.title}
                </h3>
                <p className="text-xs text-white/50">{part.overview}</p>
              </div>
              <span className="text-xs font-mono text-rose-300/80 shrink-0 ml-2">
                {part.chapters.length} chapters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {part.chapters.map((ch, idx) => {
                const done = !!completedChapters[ch.id];
                return (
                  <motion.div
                    key={ch.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.015,
                      type: "spring",
                      mass: 1.1,
                      stiffness: 220,
                      damping: 26,
                    }}
                    className="liquid-glass-card rounded-2xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="px-2 py-0.5 rounded-lg bg-rose-500/15 border border-rose-400/30 text-[11px] font-mono text-rose-300 font-semibold shrink-0">
                            {ch.displayCode}
                          </span>
                          <span className="text-[10px] font-mono text-white/45 truncate">
                            {ch.setting}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {done && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-white/65 line-clamp-2">
                        {ch.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveChapter(ch.id);
                        setViewMode("focus");
                      }}
                      className="self-start flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-rose-200 cursor-pointer"
                    >
                      <span>Study Chapter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
