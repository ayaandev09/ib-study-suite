"use client";

import React, { useMemo, useState } from "react";
import {
  BIOLOGY_CONCEPTS,
  SYLLABUS_UNITS,
  ALL_TOPICS,
  LEVELS_OF_ORGANIZATION,
} from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { Network, Grid3X3, Microscope, ArrowRight } from "lucide-react";
import { MathText } from "./MathText";

export function ThemeMatrixView() {
  const [tab, setTab] = useState<"concepts" | "heatmap" | "cases">("heatmap");
  const { setActiveTopic, setViewMode, completedTopics } = useStudyStore();

  const allCases = useMemo(
    () =>
      ALL_TOPICS.flatMap((t) =>
        t.cases.map((c) => ({ ...c, topicId: t.id, topicCode: t.displayCode }))
      ),
    []
  );

  return (
    <div className="space-y-5 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Concept &amp; Theme Matrix
          </h2>
          <p className="text-xs text-white/55 mt-0.5">
            Official May 2027 4-Theme × 4-Level-of-Organization syllabus
            architecture.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-2xl p-1 text-xs">
          <button
            onClick={() => setTab("heatmap")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "heatmap"
                ? "bg-white text-black font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            4×4 Matrix
          </button>
          <button
            onClick={() => setTab("concepts")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "concepts"
                ? "bg-white text-black font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Unifying Concepts
          </button>
          <button
            onClick={() => setTab("cases")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "cases"
                ? "bg-white text-black font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            Lab &amp; Case Vault
          </button>
        </div>
      </div>

      {tab === "heatmap" && (
        <div className="liquid-glass-card rounded-3xl p-4 sm:p-5 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono text-white/50 uppercase">
                <th className="py-2.5 pr-3">Level of Organization</th>
                {SYLLABUS_UNITS.map((u) => (
                  <th key={u.id} className="py-2.5 px-2">
                    <div className="text-green-300">{u.code}</div>
                    <div className="text-[10px] text-white/60 normal-case font-sans">
                      {u.shortTitle}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {LEVELS_OF_ORGANIZATION.map((lvl) => (
                <tr key={lvl.id}>
                  <td className="py-3 pr-3 align-top w-44">
                    <div className="text-xs font-semibold text-white">
                      {lvl.title}
                    </div>
                    <div className="text-[11px] text-white/45 mt-0.5">
                      {lvl.subtitle}
                    </div>
                  </td>
                  {SYLLABUS_UNITS.map((u) => {
                    const cellTopics = u.topics.filter(
                      (t) => t.orgLevel === lvl.id
                    );
                    return (
                      <td key={u.id} className="py-3 px-2 align-top">
                        <div className="flex flex-col gap-1.5">
                          {cellTopics.map((t) => {
                            const done = !!completedTopics[t.id];
                            return (
                              <button
                                key={t.id}
                                onClick={() => {
                                  setActiveTopic(t.id);
                                  setViewMode("focus");
                                }}
                                className={`text-left px-2.5 py-2 rounded-xl border text-xs cursor-pointer transition-all ${
                                  done
                                    ? "bg-green-500/20 border-green-400/40 text-white"
                                    : "bg-white/[0.05] hover:bg-white/[0.12] border-white/10 text-white/85"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-mono font-bold text-[11px] text-green-300">
                                    {t.displayCode}
                                  </span>
                                  {t.level === "HL ONLY" && (
                                    <span className="text-[9px] font-mono px-1 rounded bg-lime-500/20 text-lime-300">
                                      HL
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                                  {t.title.replace(`${t.displayCode} `, "")}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "concepts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {Object.values(BIOLOGY_CONCEPTS).map((c) => (
            <div
              key={c.id}
              className="liquid-glass-card rounded-3xl p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
                  style={{
                    backgroundColor: c.badgeBg,
                    borderColor: c.badgeBorder,
                    color: c.badgeText,
                  }}
                >
                  {c.shortName}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white">{c.name}</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                <MathText text={c.description} />
              </p>
              <div className="text-xs text-white/60 bg-black/40 border border-white/10 rounded-xl p-3">
                <span className="font-mono text-[10px] uppercase text-green-300 mr-1.5">
                  Exam Tip:
                </span>
                <MathText text={c.examTips} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {allCases.map((c) => (
            <div
              key={c.id}
              className="liquid-glass-card rounded-3xl p-5 flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-green-500/15 border border-green-400/30 text-green-300">
                    {c.syllabusLink}
                  </span>
                  <span className="text-[10px] font-mono text-white/45">
                    {c.domainOrContext}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">{c.title}</h3>
                <p className="text-xs text-white/75">
                  <MathText text={c.biologicalMechanism} />
                </p>
                <p className="text-[11px] font-mono text-lime-300/85">
                  <MathText text={c.quantitativeInsight} />
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTopic(c.topicId);
                  setViewMode("focus");
                }}
                className="self-start flex items-center gap-1 text-xs font-semibold text-green-300 hover:text-green-200 cursor-pointer"
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
