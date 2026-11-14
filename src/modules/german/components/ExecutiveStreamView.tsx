"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IB_THEMES } from "@/modules/german/data/themes";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";

export function ExecutiveStreamView() {
  const { setActiveTopic, setActiveTheme, setViewMode, completedTopics } =
    useGermanStudyStore();

  const totalTopics = IB_THEMES.reduce((acc, t) => acc + t.subtopics.length, 0);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Executive Stream — IB Deutsch B Lehrplan
        </h2>
        <p className="text-xs text-white/55 mt-1">
          Concise digest across all {IB_THEMES.length} IB Themes and{" "}
          {totalTopics} Subtopics. Click any card to jump directly into focused
          study.
        </p>
      </div>

      {IB_THEMES.map((theme) => {
        if (theme.subtopics.length === 0) return null;
        return (
          <section key={theme.id} className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {theme.themeNumber}. {theme.title} ({theme.englishTitle})
                </h3>
                <p className="text-xs text-white/50">{theme.description}</p>
              </div>
              <span className="text-xs font-mono text-fuchsia-300/80 shrink-0 ml-2">
                {theme.subtopics.length} Themen
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {theme.subtopics.map((sub, idx) => {
                const done = completedTopics.includes(sub.id);
                return (
                  <motion.div
                    key={sub.id}
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
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="px-2 py-0.5 rounded-lg bg-fuchsia-500/15 border border-fuchsia-400/30 text-[11px] font-mono text-fuchsia-300 font-semibold shrink-0">
                            {sub.displayCode}
                          </span>
                          <span className="text-[10px] font-mono text-white/45 truncate">
                            {theme.englishTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {sub.level === "HL Focus" && (
                            <span className="px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-400/35 text-[9px] font-mono text-violet-300">
                              HL
                            </span>
                          )}
                          {done && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400" />
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-white/65 line-clamp-2">
                        {sub.overview}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTheme(theme.id);
                        setActiveTopic(sub.id);
                        setViewMode("themen");
                      }}
                      className="self-start flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300 hover:text-fuchsia-200 cursor-pointer"
                    >
                      <span>Study Thema</span>
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
