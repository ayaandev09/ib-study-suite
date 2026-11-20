"use client";

import React, { useMemo, useState } from "react";
import { ALL_SUBTOPICS, IB_THEMES } from "@/modules/german/data/themes";
import { ALL_TEXTSORTEN } from "@/modules/german/data/textsorten";
import { LITERARY_WORKS } from "@/modules/german/data/literature";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";
import { ArrowRight, BookOpenText, Grid3X3, Network } from "lucide-react";

type MatrixTab = "matrix" | "themes" | "vault";

const LEVEL_ROWS = [
  {
    id: "core" as const,
    label: "SL / HL Kernbereich",
    subtitle: "Alltagsrelevante Themen, Debatten, Wortschatz & DACH-Kultur",
  },
  {
    id: "hl" as const,
    label: "HL Vertiefung",
    subtitle: "Komplexe gesellschaftliche, ethische & globale Diskurse (C1)",
  },
];

const HL_THEME_LITERATURE: Record<string, { code: string; title: string; subtitle: string; targetMode: "literatur" | "themen" }> = {
  identitaeten: {
    code: "HL Literatur",
    title: "Der Besuch der alten Dame",
    subtitle: "Dürrenmatt: Moralische Integrität & Käuflichkeit",
    targetMode: "literatur",
  },
  erfahrungen: {
    code: "HL Literatur",
    title: "Der Vorleser",
    subtitle: "Schlink: Schuld, Scham & Vergangenheitsbewältigung",
    targetMode: "literatur",
  },
  menschliche_erfindungskraft: {
    code: "HL Literatur",
    title: "Die Verwandlung",
    subtitle: "Kafka: Entfremdung, Moderne & Identitätsverlust",
    targetMode: "literatur",
  },
  soziale_organisation: {
    code: "HL Literatur",
    title: "Andorra",
    subtitle: "Max Frisch: Vorurteile, Antisemitismus & Kollektivschuld",
    targetMode: "literatur",
  },
  teilung_des_planeten: {
    code: "HL Diskurs",
    title: "Klimagerechtigkeit & Ethik",
    subtitle: "Globale Umweltverantwortung & Ressourcenkriege",
    targetMode: "literatur",
  },
};

export const ThemeMatrixView: React.FC = () => {
  const { setActiveTopic, setActiveTheme, setViewMode } = useGermanStudyStore();
  const [tab, setTab] = useState<MatrixTab>("matrix");

  const vaultItems = useMemo(() => {
    const textsortenCards = ALL_TEXTSORTEN.map((ts) => ({
      id: ts.id,
      badge: ts.category.toUpperCase(),
      context: ts.recommendedLength,
      title: ts.title,
      body: ts.purpose,
      highlight: `Register: ${ts.register} · Zielgruppe: ${ts.targetAudience}`,
      actionLabel: "Textsorten öffnen",
      onOpen: () => {
        setViewMode("textsorten");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }));

    const litCards = LITERARY_WORKS.map((w) => ({
      id: w.id,
      badge: `LITERATUR · ${w.year}`,
      context: w.author,
      title: w.title,
      body: w.plotSummary,
      highlight: `Fokus (IO): ${w.oralExamGuidance.presentationFocus}`,
      actionLabel: "Literatur öffnen",
      onOpen: () => {
        setViewMode("literatur");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    }));

    return [...litCards, ...textsortenCards];
  }, [setViewMode]);

  const openSubtopic = (topicId: string, themeId: (typeof IB_THEMES)[number]["id"]) => {
    setActiveTheme(themeId);
    setActiveTopic(topicId);
    setViewMode("themen");
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
            Official IB German B 5-Theme × SL/HL syllabus architecture.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/10">
          {[
            { id: "matrix" as const, label: "5×2 Matrix", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
            { id: "themes" as const, label: "5 IB Themes", icon: <Network className="w-3.5 h-3.5" /> },
            { id: "vault" as const, label: "Textsorten & Literatur", icon: <BookOpenText className="w-3.5 h-3.5" /> },
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
                  Anforderungsniveau
                </th>
                {IB_THEMES.map((th) => (
                  <th key={th.id} className="text-left p-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-fuchsia-400 block">
                      Thema {th.themeNumber}
                    </span>
                    <span className="text-sm font-semibold text-white">{th.title}</span>
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
                  {IB_THEMES.map((th) => {
                    const cellTopics = ALL_SUBTOPICS.filter((s) => {
                      if (s.themeId !== th.id) return false;
                      return row.id === "hl" ? s.level === "HL Focus" : s.level !== "HL Focus";
                    });
                    return (
                      <td key={th.id} className="p-2.5">
                        <div className="space-y-1.5">
                          {cellTopics.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => openSubtopic(s.id, th.id)}
                              className="w-full text-left p-2.5 rounded-2xl bg-white/[0.03] hover:bg-fuchsia-500/[0.12] border border-white/[0.07] hover:border-fuchsia-400/35 transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-mono font-semibold text-fuchsia-300">
                                  {s.displayCode}
                                </span>
                                {s.level === "HL Focus" && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                                    HL
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-200 group-hover:text-white mt-0.5 line-clamp-1 font-medium">
                                {s.title}
                              </p>
                            </button>
                          ))}

                          {row.id === "hl" && HL_THEME_LITERATURE[th.id] && (
                            <button
                              onClick={() => {
                                setViewMode("literatur");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="w-full text-left p-2.5 rounded-2xl bg-violet-500/[0.08] hover:bg-violet-500/[0.18] border border-violet-400/25 hover:border-violet-400/50 transition-all cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-mono font-bold text-violet-300 uppercase tracking-wider">
                                  {HL_THEME_LITERATURE[th.id].code}
                                </span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-fuchsia-500/20 text-fuchsia-300">
                                  IO / Paper 1
                                </span>
                              </div>
                              <p className="text-xs text-white group-hover:text-violet-200 mt-1 font-semibold line-clamp-1">
                                {HL_THEME_LITERATURE[th.id].title}
                              </p>
                              <p className="text-[10px] text-slate-300/80 mt-0.5 line-clamp-1 leading-snug">
                                {HL_THEME_LITERATURE[th.id].subtitle}
                              </p>
                            </button>
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

      {tab === "themes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {IB_THEMES.map((th) => (
            <div key={th.id} className="liquid-glass-card rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: `${th.color}22`,
                    color: th.color,
                    border: `1px solid ${th.color}55`,
                  }}
                >
                  Thema {th.themeNumber} · {th.englishTitle}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {th.subtopics.length} Unterthemen
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{th.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{th.description}</p>
              <button
                onClick={() => {
                  const first = th.subtopics[0];
                  if (first) openSubtopic(first.id, th.id);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300 hover:text-fuchsia-200 cursor-pointer"
              >
                Thema öffnen
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "vault" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vaultItems.map((item) => (
            <div key={item.id} className="liquid-glass-card rounded-3xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/25">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{item.context}</span>
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{item.body}</p>
                <p className="text-xs font-mono text-fuchsia-300/90 leading-relaxed">{item.highlight}</p>
              </div>
              <button
                onClick={item.onOpen}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-300 hover:text-fuchsia-200 cursor-pointer self-start"
              >
                {item.actionLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
