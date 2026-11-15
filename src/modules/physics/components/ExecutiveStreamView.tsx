"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, ListChecks } from "lucide-react";
import { SYLLABUS_UNITS } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";

export function ExecutiveStreamView() {
  const {
    setActiveTopic,
    setViewMode,
    completedTopics,
    toggleTopicCompletion,
    levelFilter,
  } = useStudyStore();

  const filteredUnits = SYLLABUS_UNITS.map((unit) => {
    const topics = unit.topics.filter((t) =>
      levelFilter === "SL" ? t.level !== "HL" : true
    );
    return { unit, topics };
  }).filter((entry) => entry.topics.length > 0);

  const totalTopics = filteredUnits.reduce(
    (acc, entry) => acc + entry.topics.length,
    0
  );
  const completedCount = filteredUnits.reduce(
    (acc, entry) =>
      acc + entry.topics.filter((t) => !!completedTopics[t.id]).length,
    0
  );
  const overallPct =
    totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Progress Bento Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12 liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-300">
                <ListChecks className="w-4 h-4 text-indigo-400" />
                <span>May 2027 IB Physics Syllabus</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Syllabus Checklist
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                Track completion across all {filteredUnits.length} Themes and{" "}
                {totalTopics} Subunits.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {overallPct}%
                </div>
                <div className="text-xs font-mono text-white/55">
                  {completedCount} of {totalTopics} subunits finished
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/[0.06] border border-white/10 overflow-hidden p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
            />
          </div>
        </div>
      </div>

      {/* Units & Subunits Bento Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {filteredUnits.map(({ unit, topics }, unitIdx) => {
          const unitDone = topics.filter((t) => !!completedTopics[t.id]).length;
          const unitPct =
            topics.length > 0 ? Math.round((unitDone / topics.length) * 100) : 0;

          return (
            <motion.section
              key={unit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: unitIdx * 0.04,
                type: "spring",
                mass: 1.05,
                stiffness: 220,
                damping: 26,
              }}
              className="md:col-span-12 liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4"
            >
              {/* Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-400/30 text-[11px] font-mono font-semibold text-indigo-300">
                      Theme {unit.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {unit.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/55">
                    {unit.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden hidden sm:block">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                      style={{ width: `${unitPct}%` }}
                    />
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-indigo-200 font-semibold">
                    {unitDone} / {topics.length}
                  </span>
                </div>
              </div>

              {/* Structured Subunits List */}
              <div className="space-y-2">
                {topics.map((t) => {
                  const done = !!completedTopics[t.id];
                  const cleanTitle = t.title.replace(`${t.displayCode} `, "");

                  return (
                    <div
                      key={t.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3.5 sm:px-4 sm:py-3 border transition-colors ${
                        done
                          ? "bg-emerald-500/[0.06] border-emerald-400/25"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleTopicCompletion(t.id)}
                          aria-label={
                            done
                              ? `Mark ${t.displayCode} incomplete`
                              : `Mark ${t.displayCode} complete`
                          }
                          aria-pressed={done}
                          className={`mt-0.5 sm:mt-0 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                            done
                              ? "bg-emerald-500/20 border-emerald-400/45 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                              : "bg-white/[0.04] border-white/15 text-white/45 hover:text-white hover:border-indigo-400/40"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-indigo-500/15 border border-indigo-400/30 text-[11px] font-mono text-indigo-300 font-semibold shrink-0">
                              {t.displayCode}
                            </span>
                            {t.level === "HL" && (
                              <span className="px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-400/35 text-[10px] font-mono text-violet-300 font-semibold">
                                HL
                              </span>
                            )}
                            <span
                              className={`text-sm font-semibold truncate ${
                                done
                                  ? "text-emerald-100/90 line-through decoration-emerald-400/50"
                                  : "text-white"
                              }`}
                            >
                              {cleanTitle}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 truncate">
                            {t.syllabusRef} • {t.readingTimeMinutes} min read
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTopic(t.id);
                          setViewMode("focus");
                        }}
                        className="self-end sm:self-center shrink-0 px-3.5 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-xs font-semibold text-indigo-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
