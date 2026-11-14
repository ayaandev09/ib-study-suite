"use client";

import React, { useState } from "react";
import { Grid, GitBranch, Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import { GEO_UNITS, GEO_CONCEPTS, ALL_TOPICS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { MathText } from "./MathText";
import { cn } from "@/modules/geography/lib/cn";

type MatrixTab = "matrix" | "concepts" | "cases";

export function ThemeMatrixView() {
  const { setActiveTopic, setViewMode, completedTopics, levelFilter } =
    useStudyStore();
  const [tab, setTab] = useState<MatrixTab>("matrix");

  const openTopic = (id: string) => {
    React.startTransition(() => {
      setActiveTopic(id);
      setViewMode("focus");
    });
  };

  const allCases = ALL_TOPICS.flatMap((t) =>
    t.cases.map((c) => ({ ...c, topicId: t.id, topicCode: t.topicCode }))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header + 3-Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Concept &amp; Unit Matrix
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Official IB Geography SL &amp; HL 4-Unit architecture, 6 Concepts, and Named Case Vault.
          </p>
        </div>

        <div className="inline-flex items-center rounded-2xl bg-[#041111]/90 border border-teal-500/20 p-1 gap-1 self-start">
          {(
            [
              { id: "matrix", label: "4×2 Matrix", icon: <Grid className="w-3.5 h-3.5" /> },
              { id: "concepts", label: "6 Concepts", icon: <GitBranch className="w-3.5 h-3.5" /> },
              { id: "cases", label: "Fieldwork & Case Vault", icon: <Compass className="w-3.5 h-3.5" /> },
            ] as const
          ).map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all",
                  active
                    ? "bg-white text-black shadow-[0_0_20px_rgba(20,184,166,0.28)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: 4x2 Unit Matrix */}
      {tab === "matrix" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GEO_UNITS.map((unit) => {
            const topics = unit.topics.filter((t) => {
              if (levelFilter === "SL") return t.level === "SL / HL";
              if (levelFilter === "HL") return t.level === "HL ONLY";
              return true;
            });

            return (
              <div
                key={unit.id}
                className="rounded-[24px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-teal-400 font-bold">
                    {unit.code} · {unit.shortTitle}
                  </span>
                  <span className="text-[11px] text-white/40">
                    {topics.length} topics
                  </span>
                </div>
                <h2 className="text-base font-bold text-white">{unit.title}</h2>
                <div className="space-y-2 pt-1">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openTopic(t.id)}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-teal-500/15 border border-white/10 hover:border-teal-400/35 text-left transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-xs font-bold text-teal-300">
                          {t.topicCode}
                        </span>
                        <span className="text-xs font-medium text-white truncate">
                          {t.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {t.level === "HL ONLY" && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30">
                            HL
                          </span>
                        )}
                        {completedTopics[t.id] && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        )}
                      </div>
                    </button>
                  ))}
                  {topics.length === 0 && (
                    <div className="text-xs text-white/40 italic py-2">
                      No topics match the current {levelFilter} filter.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: 6 Geographic Concepts */}
      {tab === "concepts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GEO_CONCEPTS.map((c) => (
            <div
              key={c.id}
              className="rounded-[22px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-2.5"
            >
              <span
                className={cn(
                  "inline-block px-2.5 py-0.5 rounded-lg border text-xs font-mono font-bold",
                  c.badgeBg,
                  c.badgeBorder,
                  c.badgeText
                )}
              >
                {c.name}
              </span>
              <p className="text-xs text-white/80 leading-relaxed">{c.description}</p>
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-xs text-white/65">
                <span className="font-semibold text-teal-300">Mechanism: </span>
                {c.coreMechanism}
              </div>
              <div className="text-[11px] text-teal-200/80">
                <span className="font-semibold">Exam Tip: </span>
                {c.examTips}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Fieldwork & Case Vault */}
      {tab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allCases.map((c) => (
            <div
              key={c.id}
              className="rounded-[22px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono font-bold text-teal-300">
                  {c.topicCode}
                </span>
                <span className="text-white/45 font-mono text-[11px]">
                  {c.regionOrContext}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                <MathText text={c.geographicMechanism} />
              </p>
              <div className="text-xs font-mono text-teal-300">
                <MathText text={c.quantitativeInsight} />
              </div>
              <button
                onClick={() => openTopic(c.topicId)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 hover:text-teal-200 pt-1"
              >
                <span>Open {c.topicCode}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
