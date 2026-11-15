"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, Layers } from "lucide-react";
import { IB_THEMES } from "@/modules/german/data/themes";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";

export function ExecutiveStreamView() {
  const {
    setActiveTopic,
    setActiveTheme,
    setViewMode,
    completedTopics,
    toggleTopicComplete,
  } = useGermanStudyStore();

  const totalTopics = IB_THEMES.reduce((acc, t) => acc + t.subtopics.length, 0);
  const doneTopics = IB_THEMES.reduce(
    (acc, t) =>
      acc + t.subtopics.filter((s) => completedTopics.includes(s.id)).length,
    0
  );
  const overallPct =
    totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Progress Bento Card */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fuchsia-300/80">
              <Layers className="w-3.5 h-3.5" />
              <span>IB Deutsch B · Lehrplan</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Syllabus Checklist
            </h2>
            <p className="text-xs text-white/60">
              Track your mastery across all {IB_THEMES.length} IB Themes and{" "}
              {totalTopics} Subunits.
            </p>
          </div>

          <div className="flex items-baseline gap-3 sm:text-right shrink-0">
            <div>
              <p className="text-3xl font-bold text-white font-mono">
                {overallPct}%
              </p>
              <p className="text-xs text-white/55 font-mono">
                {doneTopics} of {totalTopics} subunits finished
              </p>
            </div>
          </div>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-400"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* Units & Subunits Bento Sections */}
      <div className="space-y-5">
        {IB_THEMES.map((theme) => {
          if (theme.subtopics.length === 0) return null;
          const unitDone = theme.subtopics.filter((s) =>
            completedTopics.includes(s.id)
          ).length;
          const unitTotal = theme.subtopics.length;
          const unitPct = Math.round((unitDone / unitTotal) * 100);

          return (
            <section
              key={theme.id}
              className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4"
            >
              {/* Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.color }}
                    />
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {theme.themeNumber}. {theme.title}{" "}
                      <span className="text-white/55 font-normal">
                        ({theme.englishTitle})
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-white/55">{theme.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${unitPct}%`,
                        backgroundColor: theme.color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono font-semibold text-fuchsia-300">
                    {unitDone} / {unitTotal}
                  </span>
                </div>
              </div>

              {/* Structured Subunits Checklist */}
              <div className="divide-y divide-white/[0.06]">
                {theme.subtopics.map((sub) => {
                  const done = completedTopics.includes(sub.id);
                  return (
                    <div
                      key={sub.id}
                      className={`py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl px-2 -mx-2 transition-colors ${
                        done ? "bg-emerald-500/[0.04]" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleTopicComplete(sub.id)}
                          aria-label={
                            done
                              ? `Mark ${sub.title} incomplete`
                              : `Mark ${sub.title} complete`
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
                            <span className="px-2 py-0.5 rounded-lg bg-fuchsia-500/15 border border-fuchsia-400/30 text-[11px] font-mono text-fuchsia-300 font-semibold shrink-0">
                              {sub.displayCode}
                            </span>
                            <h4
                              className={`text-sm font-semibold truncate ${
                                done
                                  ? "text-white/60 line-through"
                                  : "text-white"
                              }`}
                            >
                              {sub.title}
                            </h4>
                            {sub.level === "HL Focus" && (
                              <span className="px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-400/35 text-[9px] font-mono text-violet-300 shrink-0">
                                HL
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/55 line-clamp-1">
                            {sub.englishTitle} — {sub.overview}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTheme(theme.id);
                          setActiveTopic(sub.id);
                          setViewMode("themen");
                        }}
                        className="self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-400/40 text-xs font-semibold text-fuchsia-200 hover:text-white transition-all cursor-pointer"
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
