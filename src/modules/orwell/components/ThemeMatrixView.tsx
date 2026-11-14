"use client";

import React, { useMemo, useState } from "react";
import {
  ALL_CHAPTERS,
  BOOK_PARTS,
  THEMES_TAXONOMY,
} from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";
import { ArrowRight, BookOpenText, Grid3X3, Network } from "lucide-react";

type MatrixTab = "matrix" | "concepts" | "quotes";

export const ThemeMatrixView: React.FC = () => {
  const { setActiveChapter, setViewMode } = useStudyStore();
  const [tab, setTab] = useState<MatrixTab>("matrix");

  const themesList = useMemo(() => Object.values(THEMES_TAXONOMY), []);
  const matrixThemes = useMemo(() => themesList.slice(0, 5), [themesList]);

  const allQuotes = useMemo(
    () =>
      ALL_CHAPTERS.flatMap((ch) =>
        ch.quotes.map((q) => ({
          ...q,
          chapterId: ch.id,
          chapterCode: ch.displayCode,
          chapterTitle: ch.title,
        }))
      ),
    []
  );

  const openChapter = (chapterId: string) => {
    setActiveChapter(chapterId);
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
            George Orwell&apos;s 1984 3-Part Narrative × Core Ideological Themes architecture.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10">
          {[
            { id: "matrix" as const, label: "3×5 Matrix", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
            { id: "concepts" as const, label: "Core Themes", icon: <Network className="w-3.5 h-3.5" /> },
            { id: "quotes" as const, label: "Quote & Motif Vault", icon: <BookOpenText className="w-3.5 h-3.5" /> },
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
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-xs font-mono text-slate-400 uppercase w-48">
                  Thematic Axis
                </th>
                {BOOK_PARTS.map((part) => (
                  <th key={part.id} className="text-left p-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block">
                      Part {part.partNumber}
                    </span>
                    <span className="text-sm font-semibold text-white">{part.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixThemes.map((th) => (
                <tr key={th.id} className="border-b border-white/[0.06] last:border-b-0 align-top">
                  <td className="p-3">
                    <p className="text-sm font-semibold text-white">{th.shortName}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2">
                      {th.newspeakTerm}
                    </p>
                  </td>
                  {BOOK_PARTS.map((part) => {
                    const cellChapters = ALL_CHAPTERS.filter(
                      (ch) =>
                        ch.partId === part.id &&
                        ch.themeTracking.some((tt) => tt.themeId === th.id && tt.intensity >= 3)
                    );
                    return (
                      <td key={part.id} className="p-2.5">
                        <div className="space-y-1.5">
                          {cellChapters.length > 0 ? (
                            cellChapters.map((ch) => (
                              <button
                                key={ch.id}
                                onClick={() => openChapter(ch.id)}
                                className="w-full text-left p-2.5 rounded-2xl bg-white/[0.03] hover:bg-rose-500/[0.12] border border-white/[0.07] hover:border-rose-400/35 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-mono font-semibold text-rose-300">
                                    {ch.displayCode}
                                  </span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                                    {ch.surveillanceLevel === "ABSOLUTE PANOPTICON" ? "MINILUV" : `CH ${ch.chapterNumber}`}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-200 group-hover:text-white mt-0.5 line-clamp-1 font-medium">
                                  {ch.title}
                                </p>
                              </button>
                            ))
                          ) : (
                            <div className="p-2.5 rounded-2xl border border-dashed border-white/[0.06] text-[11px] font-mono text-slate-500">
                              Subtle undercurrent
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
          {themesList.map((th) => (
            <div key={th.id} className="liquid-glass-card rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: th.badgeBg,
                    color: th.badgeText,
                    border: `1px solid ${th.badgeBorder}`,
                  }}
                >
                  {th.shortName}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{th.newspeakTerm}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{th.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{th.description}</p>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <span className="font-mono text-rose-300">Literary Mechanism: </span>
                {th.coreMechanism}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "quotes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allQuotes.map((q) => (
            <div key={q.id} className="liquid-glass-card rounded-3xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-rose-500/15 text-rose-300 border border-rose-400/25">
                    {q.chapterCode}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{q.speaker}</span>
                </div>
                <blockquote className="text-base font-semibold text-white italic leading-relaxed">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <p className="text-sm text-slate-300 leading-relaxed">{q.analysis}</p>
              </div>
              <button
                onClick={() => openChapter(q.chapterId)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-rose-200 cursor-pointer self-start"
              >
                Open {q.chapterCode}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
