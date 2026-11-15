"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, Layers } from "lucide-react";
import { BOOK_PARTS } from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";

export function ExecutiveStreamView() {
  const {
    setActiveChapter,
    setViewMode,
    completedChapters,
    toggleChapterComplete,
  } = useStudyStore();

  const totalChapters = BOOK_PARTS.reduce(
    (acc, p) => acc + p.chapters.length,
    0
  );
  const doneChapters = BOOK_PARTS.reduce(
    (acc, p) => acc + p.chapters.filter((ch) => completedChapters[ch.id]).length,
    0
  );
  const overallPct =
    totalChapters > 0 ? Math.round((doneChapters / totalChapters) * 100) : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Progress Bento Card */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rose-300/80">
              <Layers className="w-3.5 h-3.5" />
              <span>Nineteen Eighty-Four · Study Guide</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Syllabus Checklist
            </h2>
            <p className="text-xs text-white/60">
              Track your progress across all {BOOK_PARTS.length} Parts and{" "}
              {totalChapters} Chapters.
            </p>
          </div>

          <div className="flex items-baseline gap-3 sm:text-right shrink-0">
            <div>
              <p className="text-3xl font-bold text-white font-mono">
                {overallPct}%
              </p>
              <p className="text-xs text-white/55 font-mono">
                {doneChapters} of {totalChapters} subunits finished
              </p>
            </div>
          </div>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* Parts & Chapters Bento Sections */}
      <div className="space-y-5">
        {BOOK_PARTS.map((part) => {
          if (part.chapters.length === 0) return null;
          const unitDone = part.chapters.filter(
            (ch) => completedChapters[ch.id]
          ).length;
          const unitTotal = part.chapters.length;
          const unitPct = Math.round((unitDone / unitTotal) * 100);

          return (
            <section
              key={part.id}
              className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4"
            >
              {/* Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {part.title}
                  </h3>
                  <p className="text-xs text-white/55">{part.overview}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-400 transition-all duration-500"
                      style={{ width: `${unitPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-rose-300">
                    {unitDone} / {unitTotal}
                  </span>
                </div>
              </div>

              {/* Structured Chapters Checklist */}
              <div className="divide-y divide-white/[0.06]">
                {part.chapters.map((ch) => {
                  const done = !!completedChapters[ch.id];
                  return (
                    <div
                      key={ch.id}
                      className={`py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-2 -mx-2 transition-colors ${
                        done ? "bg-emerald-500/[0.04]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleChapterComplete(ch.id)}
                          aria-label={
                            done
                              ? `Mark ${ch.title} incomplete`
                              : `Mark ${ch.title} complete`
                          }
                          className="mt-0.5 sm:mt-0 shrink-0 text-white/50 hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-white/35" />
                          )}
                        </button>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-rose-500/15 border border-rose-400/30 text-[11px] font-mono text-rose-300 font-semibold shrink-0">
                              {ch.displayCode}
                            </span>
                            <h4
                              className={`text-sm font-semibold truncate ${
                                done
                                  ? "text-white/60 line-through"
                                  : "text-white"
                              }`}
                            >
                              {ch.title}
                            </h4>
                            <span className="text-[10px] font-mono text-white/40 truncate">
                              {ch.setting}
                            </span>
                          </div>
                          <p className="text-xs text-white/55 line-clamp-1">
                            {ch.summary}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveChapter(ch.id);
                          setViewMode("focus");
                        }}
                        className="self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-xs font-semibold text-rose-200 hover:text-white transition-all cursor-pointer"
                      >
                        <span>Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
