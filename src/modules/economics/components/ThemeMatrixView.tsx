"use client";

import React, { useMemo, useState } from "react";
import {
  ALL_TOPICS,
  KEY_CONCEPTS,
  SYLLABUS_UNITS,
} from "@/modules/economics/data";
import { CASE_STUDIES_BANK } from "@/modules/economics/data/caseStudiesBank";
import { useStudyStore } from "@/modules/economics/store/useStudyStore";
import { ArrowRight, FlaskConical, Grid3X3, Network } from "lucide-react";

type MatrixTab = "matrix" | "concepts" | "cases";

const TIER_ROWS = [
  {
    id: "sl" as const,
    label: "Core SL & Shared Foundation",
    subtitle: "Foundational theory, diagrams, policies & market mechanisms",
  },
  {
    id: "hl" as const,
    label: "HL Quantitative & Theory Extensions",
    subtitle: "Paper 3 math, market power, multipliers & advanced macro/trade evaluation",
  },
];

export const ThemeMatrixView: React.FC = () => {
  const { setActiveTopic, setViewMode } = useStudyStore();
  const [tab, setTab] = useState<MatrixTab>("matrix");

  const allCases = useMemo(() => {
    const bankCases = CASE_STUDIES_BANK.map((cs) => {
      const primaryCode = cs.topicCode.split("/")[0].trim();
      const matched =
        ALL_TOPICS.find((t) => t.displayCode === cs.topicCode || t.topicCode === cs.topicCode) ||
        ALL_TOPICS.find((t) => t.displayCode === primaryCode || t.topicCode === primaryCode || t.displayCode === `U${primaryCode}`) ||
        ALL_TOPICS.find((t) => t.unitId === cs.unitId) ||
        ALL_TOPICS[0];
      return {
        id: cs.id,
        title: cs.title,
        context: `${cs.countryOrContext} · ${cs.yearOrPeriod}`,
        syllabusLabel: `${cs.topicCode} · ${cs.diagramToDraw.split("(")[0].trim()}`,
        mechanism: cs.economicMechanism,
        insight: cs.memorizationHook,
        topicId: matched?.id || "u1-1",
        topicCode: matched?.displayCode || cs.topicCode,
      };
    });

    if (bankCases.length > 0) return bankCases;

    return ALL_TOPICS.flatMap((t) =>
      t.cases.map((c) => ({
        id: c.id,
        title: c.title,
        context: c.countryOrContext,
        syllabusLabel: `${t.displayCode} · ${c.syllabusLink}`,
        mechanism: c.realWorldMechanism,
        insight: c.evaluationAO3AO4,
        topicId: t.id,
        topicCode: t.displayCode,
      }))
    );
  }, []);

  const openTopic = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("focus");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Concept &amp; Theme Matrix
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Official IB Economics 4-Unit × 9 Key Concepts syllabus architecture.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10">
          {[
            { id: "matrix" as const, label: "4×2 Matrix", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
            { id: "concepts" as const, label: "9 Key Concepts", icon: <Network className="w-3.5 h-3.5" /> },
            { id: "cases" as const, label: "Real-World Vault", icon: <FlaskConical className="w-3.5 h-3.5" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                tab === t.id
                  ? "bg-white text-slate-950 font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "matrix" && (
        <div className="liquid-glass-card rounded-3xl p-4 sm:p-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-xs font-mono text-slate-400 uppercase w-48">
                  Syllabus Tier
                </th>
                {SYLLABUS_UNITS.map((unit) => (
                  <th key={unit.id} className="text-left p-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 block">
                      {unit.badge}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {unit.title.replace(/^Unit \d+:\s*/i, "")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIER_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.06] last:border-b-0 align-top">
                  <td className="p-3">
                    <p className="text-sm font-semibold text-white">{row.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{row.subtitle}</p>
                  </td>
                  {SYLLABUS_UNITS.map((unit) => {
                    const cellTopics = unit.topics.filter((t) =>
                      row.id === "hl"
                        ? t.level === "HL" || t.level.includes("HL Only")
                        : t.level !== "HL" && !t.level.includes("HL Only")
                    );
                    return (
                      <td key={unit.id} className="p-2.5">
                        <div className="space-y-1.5">
                          {cellTopics.length > 0 ? (
                            cellTopics.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => openTopic(t.id)}
                                className="w-full text-left p-2.5 rounded-2xl bg-white/[0.03] hover:bg-sky-500/[0.12] border border-white/[0.07] hover:border-sky-400/35 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-mono font-semibold text-sky-300">
                                    {t.displayCode}
                                  </span>
                                  {t.level.includes("HL") && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                                      {t.level === "HL" ? "HL" : "SL/HL"}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-200 group-hover:text-white mt-0.5 line-clamp-1 font-medium">
                                  {t.title}
                                </p>
                              </button>
                            ))
                          ) : (
                            <div className="p-2.5 rounded-2xl border border-dashed border-white/[0.06] text-[11px] font-mono text-slate-500">
                              Integrated in Core
                            </div>
                          )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KEY_CONCEPTS.map((c) => (
            <div key={c.id} className="liquid-glass-card rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: c.badgeBg,
                    color: c.badgeText,
                    border: `1px solid ${c.badgeBorder}`,
                  }}
                >
                  {c.shortName}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{c.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{c.description}</p>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <span className="font-mono text-sky-300">Exam Tip: </span>
                {c.examTips}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allCases.map((c) => (
            <div key={c.id} className="liquid-glass-card rounded-3xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/15 text-sky-300 border border-sky-400/25">
                    {c.syllabusLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{c.context}</span>
                </div>
                <h3 className="text-base font-bold text-white">{c.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{c.mechanism}</p>
                <p className="text-xs font-mono text-cyan-300/90 leading-relaxed">{c.insight}</p>
              </div>
              <button
                onClick={() => openTopic(c.topicId)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 cursor-pointer self-start"
              >
                Open {c.topicCode}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
