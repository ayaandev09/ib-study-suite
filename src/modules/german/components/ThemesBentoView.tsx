"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  BookOpen,
  Sparkles,
  HelpCircle,
  MapPin,
  FileText,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  ArrowRight,
  Check,
  Languages,
} from "lucide-react";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";
import { IB_THEMES, ALL_SUBTOPICS } from "@/modules/german/data/themes";
import { GERMAN_ENTRY_TICKETS } from "@/modules/german/data/revisionData";

export function ThemesBentoView() {
  const {
    activeTopicId,
    completedTopics,
    toggleTopicComplete,
    goToPrevTopic,
    goToNextTopic,
    setViewMode,
  } = useGermanStudyStore();

  const [studioMode, setStudioMode] = useState<"theory" | "digest" | "traps">("theory");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const activeTopic = ALL_SUBTOPICS.find((s) => s.id === activeTopicId) || ALL_SUBTOPICS[0];
  const activeTheme = IB_THEMES.find((t) => t.id === activeTopic.themeId) || IB_THEMES[0];
  const isActiveCompleted = completedTopics.includes(activeTopic.id);
  const matchingTicket =
    GERMAN_ENTRY_TICKETS.find(
      (t) => t.id === activeTopic.id || t.topicId === activeTopic.id
    ) || GERMAN_ENTRY_TICKETS[0];

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <article
      id={`german-topic-${activeTopic.id}`}
      className="max-w-5xl mx-auto space-y-6 pb-20 liquid-view-enter"
    >
      {/* =====================================================================
          1. ZEN HEADER: Title, Unit, Reading Time & Completion
          ===================================================================== */}
      <div
        className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ borderColor: `${activeTheme.color}45` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 rounded-xl text-xs font-mono font-bold"
              style={{
                backgroundColor: `${activeTheme.color}25`,
                color: activeTheme.color,
                border: `1px solid ${activeTheme.color}50`,
              }}
            >
              {activeTopic.displayCode}
            </span>
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold bg-white/10 border border-white/15 text-white/80">
              Thema {activeTheme.themeNumber}: {activeTheme.title}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-xl bg-violet-500/15 text-violet-300 border border-violet-400/30 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet-400" />
              {activeTopic.culturalSpotlight.region}
            </span>
          </div>

          {/* Prev/Next & Completion Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPrevTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Vorheriges Thema"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goToNextTopic}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white/75 hover:text-white cursor-pointer transition-colors"
              title="Nächstes Thema"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleTopicComplete(activeTopic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                isActiveCompleted
                  ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                  : "bg-white/[0.08] hover:bg-white/[0.16] border-white/15 text-white/85"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isActiveCompleted ? "text-emerald-400" : "text-white/40"}`} />
              <span>{isActiveCompleted ? "Thema gemeistert" : "Als gemeistert markieren"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-sans">
            {activeTopic.title}
          </h1>
          <p className="text-sm font-medium font-sans" style={{ color: `${activeTheme.color}dd` }}>
            {activeTopic.englishTitle}
          </p>
        </div>
      </div>

      {/* =====================================================================
          2. STUDIO MODE SWITCHER: 3 Clean Focused Tabs
          ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
        <button
          onClick={() => setStudioMode("theory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "theory"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Thema &amp; Textkompetenz</span>
        </button>

        <button
          onClick={() => setStudioMode("digest")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "digest"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>60s Takeaways &amp; Redemittel</span>
        </button>

        <button
          onClick={() => setStudioMode("traps")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "traps"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Mündliche Prüfung &amp; Fallen</span>
        </button>

        <div className="ml-auto pr-2 hidden sm:block">
          <button
            onClick={() => setViewMode("revision")}
            className="text-[11px] font-mono text-fuchsia-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Revision Hub</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          3. ACTIVE STUDIO VIEW
          ===================================================================== */}
      {studioMode === "theory" && (
        <section className="space-y-5">
          {/* Main Reading Overview */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300">
              Thematische Übersicht &amp; Leitfragen
            </h3>
            <p className="text-sm sm:text-[15.5px] text-white/90 leading-[1.8] font-sans">
              {activeTopic.overview}
            </p>
          </div>

          {/* Cultural Spotlight DACH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="liquid-glass-card rounded-[28px] p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
                <MapPin className="w-4 h-4" />
                <span>DACH-Kulturanker ({activeTopic.culturalSpotlight.region})</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                {activeTopic.culturalSpotlight.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeTopic.culturalSpotlight.description}
              </p>
            </div>

            {/* Paper 1 Text Type Strategy */}
            <div className="liquid-glass-card rounded-[28px] p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
                <FileText className="w-4 h-4" />
                <span>Paper 1 Textsorten-Strategie</span>
              </div>
              <div className="text-xs font-bold text-white">
                Empfohlene Textsorte: {activeTopic.sampleEssayPrompts[0]?.textTypeSuggestion}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeTopic.sampleEssayPrompts[0]?.prompt}
              </p>
            </div>
          </div>
        </section>
      )}

      {studioMode === "digest" && (
        <section className="space-y-5">
          {/* 60s Takeaway */}
          <div className="liquid-glass-card rounded-[28px] p-6 sm:p-7 space-y-3 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-fuchsia-300 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>60-Sekunden Zusammenfassung</span>
            </div>
            <p className="text-sm sm:text-[15px] text-white/90 leading-[1.8] font-sans">
              {matchingTicket.sixtySecondSummary}
            </p>
          </div>

          {/* Grammar & Redemittel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="liquid-glass-card rounded-[28px] p-6 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-violet-300 font-bold block">
                Kriterium A: {matchingTicket.keyGrammar?.title || "Grammatik-Formel"}
              </span>
              <div className="p-3.5 rounded-2xl bg-black/50 border border-violet-400/20 font-mono text-xs text-violet-200">
                {matchingTicket.keyGrammar?.formula}
              </div>
              {matchingTicket.keyGrammar?.tip && (
                <p className="text-xs text-white/60 font-sans">
                  {matchingTicket.keyGrammar.tip}
                </p>
              )}
            </div>

            <div className="liquid-glass-card rounded-[28px] p-6 border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-300 font-bold block">
                Wichtige Redemittel ({matchingTicket.redemittel?.length || 0})
              </span>
              <div className="space-y-2">
                {(matchingTicket.redemittel || []).map((r, rIdx) => (
                  <div key={rIdx} className="text-xs text-slate-200 font-sans">
                    <strong className="text-fuchsia-300">{r.phrase}</strong>: {r.meaning}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {studioMode === "traps" && (
        <section className="space-y-5">
          {/* Discussion & Oral Exam Questions */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Mündliche Prüfung (Individual Oral) — Debattenfragen
                </h3>
                <p className="text-xs text-white/50">
                  Lehrerfragen zur Vorbereitung auf das mündliche Prüfungsgespräch
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {(matchingTicket.teacherDiscussionQuestions || []).map((q, idx) => {
                const isOpen = !!revealedAnswers[idx];
                return (
                  <div
                    key={idx}
                    className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        Q{idx + 1}: {q}
                      </p>
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-fuchsia-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                      >
                        {isOpen ? "Antwort ausblenden" : "Musterantwort"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 rounded-xl bg-black/40 border border-violet-400/20 text-xs text-slate-200 leading-relaxed font-sans">
                        <strong className="text-violet-300">Antwort-Perspektive: </strong>
                        Verbinde persönliche Meinungsäußerung mit authentischen DACH-Beispielen unter Verwendung von Konnektoren und Konjunktiv II.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="p-6 rounded-[28px] bg-rose-950/20 border border-rose-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Häufige Schülerfehler &amp; Kriterium-Fallen</span>
            </div>
            <div className="rounded-xl p-3.5 bg-black/30 border border-rose-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              <strong className="text-rose-300 font-mono text-[11px] uppercase mr-1.5">
                Achtung:
              </strong>
              {matchingTicket.commonMisconceptions}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
