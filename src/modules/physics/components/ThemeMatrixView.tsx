"use client";

import React, { useMemo, useState } from "react";
import {
  ALL_TOPICS,
  PHYSICS_CONCEPTS,
  SYLLABUS_THEMES,
} from "@/modules/physics/data";
import { CASE_STUDIES_BANK } from "@/modules/physics/data/caseStudiesBank";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { MathText } from "./MathText";
import { ArrowRight, FlaskConical, Grid3X3, Network } from "lucide-react";

type MatrixTab = "matrix" | "concepts" | "cases";

const LEVEL_ROWS = [
  {
    id: "sl" as const,
    label: "Standard & Shared Core",
    subtitle: "Core mechanics, thermal transfers, wave behaviour, fields & nuclear fundamentals",
  },
  {
    id: "hl" as const,
    label: "Higher Level Extension",
    subtitle: "Rigid body mechanics, thermodynamics, induction, quantum & advanced relativity",
  },
];

export const ThemeMatrixView: React.FC = () => {
  const { setActiveTopic, setViewMode } = useStudyStore();
  const [tab, setTab] = useState<MatrixTab>("matrix");

  const allCases = useMemo(() => {
    const topicCases = ALL_TOPICS.flatMap((t) =>
      (t.cases || []).map((c) => ({
        ...c,
        topicId: t.id,
        topicCode: t.displayCode,
        isHL: t.level === "HL",
      }))
    );

    if (topicCases.length > 0) return topicCases;

    return CASE_STUDIES_BANK.map((c) => {
      const codeMatch = c.syllabusLink.match(/[A-E]\.\d+/);
      const matchedTopic = codeMatch
        ? ALL_TOPICS.find((t) => t.displayCode === codeMatch[0] || t.topicCode === codeMatch[0])
        : undefined;
      return {
        ...c,
        topicId: matchedTopic?.id || ALL_TOPICS[0]?.id || "a1",
        topicCode: matchedTopic?.displayCode || codeMatch?.[0] || "A.1",
        isHL: matchedTopic?.level === "HL",
      };
    });
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
            Official IB Physics 5-Theme (A–E) × Core/HL syllabus architecture.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10">
          {[
            { id: "matrix" as const, label: "5×2 Matrix", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
            { id: "concepts" as const, label: "Unifying Concepts", icon: <Network className="w-3.5 h-3.5" /> },
            { id: "cases" as const, label: "Lab & Case Vault", icon: <FlaskConical className="w-3.5 h-3.5" /> },
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
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-xs font-mono text-slate-400 uppercase w-48">
                  Course Tier
                </th>
                {SYLLABUS_THEMES.map((th) => (
                  <th key={th.id} className="text-left p-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block">
                      {th.code}
                    </span>
                    <span className="text-sm font-semibold text-white">{th.shortTitle}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEVEL_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-white/[0.06] last:border-b-0 align-top">
                  <td className="p-3">
                    <p className="text-sm font-semibold text-white">{row.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{row.subtitle}</p>
                  </td>
                  {SYLLABUS_THEMES.map((th) => {
                    const cellTopics = ALL_TOPICS.filter((t) => {
                      if (t.themeId !== th.id) return false;
                      return row.id === "hl" ? t.level === "HL" : t.level !== "HL";
                    });
                    return (
                      <td key={th.id} className="p-2.5">
                        <div className="space-y-1.5">
                          {cellTopics.length > 0 ? (
                            cellTopics.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => openTopic(t.id)}
                                className="w-full text-left p-2.5 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/[0.12] border border-white/[0.07] hover:border-cyan-400/35 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-mono font-semibold text-cyan-300">
                                    {t.displayCode}
                                  </span>
                                  {t.level === "HL" && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                                      HL
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHYSICS_CONCEPTS.map((c) => (
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
              <p className="text-sm text-slate-300 leading-relaxed">
                <MathText text={c.description} />
              </p>
              <div className="p-3 rounded-2xl bg-black/35 border border-white/[0.07] text-xs text-slate-200 leading-relaxed">
                <span className="font-mono text-cyan-300 block mb-1">Core Mechanism:</span>
                <MathText text={c.coreMechanism} />
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <span className="font-mono text-cyan-300">Exam Tip: </span>
                <MathText text={c.examTips} />
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
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-400/25">
                    {c.syllabusLink}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{c.domainOrContext}</span>
                </div>
                <h3 className="text-base font-bold text-white">{c.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <MathText text={c.physicalMechanism} />
                </p>
                <p className="text-xs font-mono text-sky-300/90 leading-relaxed">
                  <MathText text={c.quantitativeInsight} />
                </p>
              </div>
              <button
                onClick={() => openTopic(c.topicId)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 cursor-pointer self-start"
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
