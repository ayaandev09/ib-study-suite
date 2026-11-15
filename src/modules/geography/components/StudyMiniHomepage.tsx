"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Layers } from "lucide-react";
import { SYLLABUS_UNITS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";

export function StudyMiniHomepage() {
  const {
    setActiveTopic,
    setViewMode,
    completedTopics,
    toggleTopicCompletion,
    completedSubSections,
    levelFilter,
  } = useStudyStore();

  const visibleUnits = SYLLABUS_UNITS.map((unit) => {
    const topics = unit.topics.filter((t) => {
      if (levelFilter === "SL") return t.level === "SL / HL";
      if (levelFilter === "HL") return t.level === "HL ONLY";
      return true;
    });
    return { ...unit, topics };
  }).filter((u) => u.topics.length > 0);

  const totalSubunits = visibleUnits.reduce(
    (acc, u) => acc + u.topics.length,
    0
  );
  const doneSubunits = visibleUnits.reduce(
    (acc, u) => acc + u.topics.filter((t) => completedTopics[t.id]).length,
    0
  );
  const overallPct =
    totalSubunits > 0 ? Math.round((doneSubunits / totalSubunits) * 100) : 0;

  const openTopic = (topicId: string) => {
    React.startTransition(() => {
      setActiveTopic(topicId);
      setViewMode("focus");
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-16">
      {/* Top Progress Bento Card */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-teal-300/80">
              <Layers className="w-3.5 h-3.5" />
              <span>IB Geography SL &amp; HL Syllabus</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Syllabus Checklist
            </h1>
            <p className="text-xs text-white/60">
              Track every unit and subunit across Core, Options, and HL Global
              Interactions. Click a checkmark to update progress or open any
              subunit in focused study.
            </p>
          </div>

          <div className="flex items-baseline gap-2 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5">
            <span className="text-2xl font-bold font-mono text-teal-300">
              {overallPct}%
            </span>
            <span className="text-xs font-mono text-white/55">
              {doneSubunits} of {totalSubunits} subunits finished
            </span>
          </div>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-300 transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Units & Subunits Bento Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {visibleUnits.map((unit, uIdx) => {
          const unitDone = unit.topics.filter(
            (t) => completedTopics[t.id]
          ).length;
          const unitTotal = unit.topics.length;
          const unitPct =
            unitTotal > 0 ? Math.round((unitDone / unitTotal) * 100) : 0;

          return (
            <motion.section
              key={unit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: uIdx * 0.04, duration: 0.25 }}
              className="md:col-span-12 liquid-glass-card rounded-3xl p-5 sm:p-6 space-y-4"
            >
              {/* Unit Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/30 text-[11px] font-mono font-semibold text-teal-300">
                      {unit.code}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {unit.title}
                    </h2>
                  </div>
                  <p className="text-xs text-white/55 leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-teal-300">
                      {unitDone} / {unitTotal} done
                    </div>
                    <div className="text-[10px] font-mono text-white/45">
                      {unitPct}% complete
                    </div>
                  </div>
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 transition-all duration-300"
                      style={{ width: `${unitPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Subunit Checklist Rows */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {unit.topics.map((t) => {
                  const done = !!completedTopics[t.id];
                  const visibleSubs = t.subSections.filter((s) =>
                    levelFilter === "SL" ? !s.isHLOnly : true
                  );
                  const subsDone = visibleSubs.filter(
                    (s) => completedSubSections[`${t.id}:${s.id}`]
                  ).length;

                  return (
                    <div
                      key={t.id}
                      className={`group flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-3 transition-colors ${
                        done
                          ? "bg-teal-500/[0.08] border-teal-400/30"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleTopicCompletion(t.id)}
                          aria-label={`Toggle ${t.topicCode} completion`}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                            done
                              ? "bg-teal-400 border-teal-300 text-black shadow-[0_0_12px_rgba(20,184,166,0.35)]"
                              : "bg-white/[0.04] border-white/20 text-transparent hover:border-teal-400/50"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openTopic(t.id)}
                          className="min-w-0 text-left cursor-pointer space-y-0.5"
                        >
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded-md bg-teal-500/15 border border-teal-400/25 text-[10px] font-mono font-semibold text-teal-300">
                              {t.topicCode}
                            </span>
                            {t.level === "HL ONLY" && (
                              <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/35 text-[9px] font-mono font-semibold text-cyan-200">
                                HL
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-white/45">
                              ~{t.readingTimeMinutes}m
                            </span>
                            {visibleSubs.length > 0 && (
                              <span className="text-[10px] font-mono text-white/40">
                                · {subsDone}/{visibleSubs.length} pts
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                              done
                                ? "text-white/75 line-through decoration-teal-400/50"
                                : "text-white group-hover:text-teal-200"
                            }`}
                          >
                            {t.title}
                          </p>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => openTopic(t.id)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/35 text-[11px] font-semibold text-white/75 hover:text-teal-200 cursor-pointer transition-colors"
                      >
                        {done && (
                          <CheckCircle2 className="w-3 h-3 text-teal-400 hidden sm:inline" />
                        )}
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
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
