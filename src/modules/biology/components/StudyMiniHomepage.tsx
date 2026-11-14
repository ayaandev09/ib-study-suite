"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SYLLABUS_UNITS } from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";

export function StudyMiniHomepage() {
  const { setActiveTopic, setViewMode, completedTopics, levelFilter } =
    useStudyStore();

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Executive Stream — May 2027 Biology Syllabus
        </h2>
        <p className="text-xs text-white/55 mt-1">
          Concise digest across all 4 Themes and 40 Topics. Click any card to
          jump directly into focused study.
        </p>
      </div>

      {SYLLABUS_UNITS.map((unit) => {
        const topics = unit.topics.filter((t) =>
          levelFilter === "SL" ? t.level !== "HL ONLY" : true
        );
        return (
          <section key={unit.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {unit.title}
                </h3>
                <p className="text-xs text-white/50">{unit.description}</p>
              </div>
              <span className="text-xs font-mono text-green-300/80 shrink-0 ml-2">
                {topics.length} topics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {topics.map((t, idx) => {
                const done = !!completedTopics[t.id];
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: idx * 0.02,
                      type: "spring",
                      mass: 1.1,
                      stiffness: 220,
                      damping: 26,
                    }}
                    className="liquid-glass-card rounded-2xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[11px] font-mono text-green-300 font-semibold">
                            {t.displayCode}
                          </span>
                          <span className="text-[10px] font-mono text-white/45">
                            {t.orgLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {t.level === "HL ONLY" && (
                            <span className="px-1.5 py-0.5 rounded bg-lime-500/20 border border-lime-400/35 text-[9px] font-mono text-lime-300">
                              HL
                            </span>
                          )}
                          {done && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
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
                      className="self-start flex items-center gap-1.5 text-xs font-semibold text-green-300 hover:text-green-200 cursor-pointer"
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
