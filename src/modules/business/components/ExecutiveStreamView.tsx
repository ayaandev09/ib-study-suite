"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Circle, ListChecks } from "lucide-react";
import { SYLLABUS_UNITS } from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";

export function ExecutiveStreamView() {
  const { setActiveTopic, setViewMode, completedTopics, toggleTopicComplete } =
    useStudyStore();

  const allTopics = SYLLABUS_UNITS.flatMap((u) => u.topics);
  const totalTopics = allTopics.length;
  const doneTopics = allTopics.filter((t) => completedTopics[t.id]).length;
  const overallPct = totalTopics
    ? Math.round((doneTopics / totalTopics) * 100)
    : 0;

  return (
    <div className="space-y-5 pb-16">
      {/* Top Progress Bento Card */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-300/80">
              <ListChecks className="w-4 h-4" />
              <span>IB Business Management Syllabus</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Syllabus Checklist
            </h2>
            <p className="text-xs text-white/60">
              Track every unit and subunit across the SL/HL curriculum and jump
              directly into focused study.
            </p>
          </div>

          <div className="shrink-0 flex items-baseline gap-2 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3">
            <span className="text-2xl font-bold font-mono text-white">
              {overallPct}%
            </span>
            <span className="text-xs font-mono text-white/55">
              {doneTopics} of {totalTopics} subunits finished
            </span>
          </div>
        </div>

        <div className="mt-4 h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden border border-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          />
        </div>
      </section>

      {/* Units & Subunits Bento Sections */}
      <div className="space-y-4">
        {SYLLABUS_UNITS.map((unit) => {
          if (unit.topics.length === 0) return null;
          const unitDone = unit.topics.filter(
            (t) => completedTopics[t.id]
          ).length;
          const unitTotal = unit.topics.length;
          const unitPct = Math.round((unitDone / unitTotal) * 100);

          return (
            <section
              key={unit.id}
              className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4"
            >
              {/* Unit Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-white/55 leading-relaxed">
                    {unit.overview}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-400 transition-all duration-300"
                      style={{ width: `${unitPct}%` }}
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-blue-500/15 border border-blue-400/25 text-xs font-mono text-blue-200">
                    {unitDone} / {unitTotal}
                  </span>
                </div>
              </div>

              {/* Subunits Checklist */}
              <div className="space-y-2">
                {unit.topics.map((t) => {
                  const done = !!completedTopics[t.id];
                  const cleanTitle = t.title.replace(`${t.displayCode} `, "");

                  return (
                    <div
                      key={t.id}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-3.5 border transition-all ${
                        done
                          ? "bg-blue-500/[0.06] border-blue-400/25"
                          : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleTopicComplete(t.id)}
                          aria-label={
                            done
                              ? `Mark ${cleanTitle} incomplete`
                              : `Mark ${cleanTitle} complete`
                          }
                          aria-pressed={done}
                          className={`mt-0.5 sm:mt-0 shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                            done
                              ? "bg-blue-500/25 border-blue-400/60 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.25)]"
                              : "bg-white/[0.03] border-white/15 text-white/35 hover:text-white/75 hover:border-white/30"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>

                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-lg bg-blue-500/15 border border-blue-400/30 text-[11px] font-mono text-blue-300 font-semibold">
                              {t.displayCode}
                            </span>
                            {t.level === "HL ONLY" && (
                              <span className="px-1.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/35 text-[10px] font-mono text-sky-300 font-semibold">
                                HL
                              </span>
                            )}
                            <h4
                              className={`text-sm font-semibold transition-colors ${
                                done
                                  ? "text-white/60 line-through decoration-blue-400/50"
                                  : "text-white"
                              }`}
                            >
                              {cleanTitle}
                            </h4>
                          </div>
                          <p className="text-xs text-white/55 line-clamp-1">
                            {t.summary}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTopic(t.id);
                          setViewMode("focus");
                        }}
                        className="self-end sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/40 text-xs font-semibold text-blue-300 hover:text-blue-200 transition-all cursor-pointer"
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
