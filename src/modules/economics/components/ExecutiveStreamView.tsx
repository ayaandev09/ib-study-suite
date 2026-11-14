"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SYLLABUS_UNITS } from "@/modules/economics/data";
import { useStudyStore } from "@/modules/economics/store/useStudyStore";

export function ExecutiveStreamView() {
  const { setActiveTopic, setViewMode, completedTopics } = useStudyStore();

  const totalTopics = SYLLABUS_UNITS.reduce(
    (acc, u) => acc + u.topics.length,
    0
  );

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Executive Stream — IB Economics Syllabus
        </h2>
        <p className="text-xs text-white/55 mt-1">
          Concise digest across all {SYLLABUS_UNITS.length} Units and{" "}
          {totalTopics} Topics. Click any card to jump directly into focused
          study.
        </p>
      </div>

      {SYLLABUS_UNITS.map((unit) => {
        if (unit.topics.length === 0) return null;
        return (
          <section key={unit.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {unit.title}
                </h3>
                <p className="text-xs text-white/50">{unit.overview}</p>
              </div>
              <span className="text-xs font-mono text-sky-300/80 shrink-0 ml-2">
                {unit.topics.length} topics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {unit.topics.map((t, idx) => {
                const done = !!completedTopics[t.id];
                return (
                  <motion.div
                    key={t.id}
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
                          <span className="px-2 py-0.5 rounded-lg bg-sky-500/15 border border-sky-400/30 text-[11px] font-mono text-sky-300 font-semibold shrink-0">
                            {t.displayCode}
                          </span>
                          <span className="text-[10px] font-mono text-white/45 truncate">
                            {t.syllabusRef}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {t.level === "HL" && (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/35 text-[9px] font-mono text-cyan-300">
                              HL
                            </span>
                          )}
                          {done && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {t.title.replace(`${t.displayCode} `, "")}
                      </h4>
                      <p className="text-xs text-white/65 line-clamp-2">
                        {t.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTopic(t.id);
                        setViewMode("focus");
                      }}
                      className="self-start flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 cursor-pointer"
                    >
                      <span>Study Topic</span>
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
