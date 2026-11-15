"use client";

import React, { useState, useMemo } from "react";
import {
  Zap,
  BookOpen,
  GraduationCap,
  Layers,
  HelpCircle,
  CheckCircle2,
  Circle,
  Sparkles,
  AlertTriangle,
  FileText,
  Flame,
  MapPin,
  ArrowRight,
  Clock,
  Search,
  MessageSquareQuote,
  Check,
} from "lucide-react";
import { useGermanStudyStore } from "@/modules/german/store/useGermanStudyStore";
import { IB_THEMES } from "@/modules/german/data/themes";
import { GERMAN_ENTRY_TICKETS, GermanEntryTicketItem } from "@/modules/german/data/revisionData";
import { ThemeId } from "@/modules/german/data/types";

export const RevisionHubView: React.FC = React.memo(() => {
  const {
    activeThemeId,
    setActiveTheme,
    setActiveTopic,
    setViewMode,
    completedTopics,
    toggleTopicComplete,
    studyGoal,
    setStudyGoal,
  } = useGermanStudyStore();

  const [activeTabTheme, setActiveTabTheme] = useState<ThemeId | "all">("identitaeten");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = useMemo(() => {
    return GERMAN_ENTRY_TICKETS.filter((item) => {
      if (activeTabTheme !== "all" && item.themeId !== activeTabTheme) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.englishTitle.toLowerCase().includes(q) ||
          item.displayCode.toLowerCase().includes(q) ||
          item.sixtySecondSummary.toLowerCase().includes(q) ||
          item.keyVocab.some(
            (v) =>
              v.german.toLowerCase().includes(q) ||
              v.english.toLowerCase().includes(q)
          ) ||
          item.redemittel.some(
            (r) =>
              r.phrase.toLowerCase().includes(q) ||
              r.meaning.toLowerCase().includes(q)
          )
        );
      }
      return true;
    });
  }, [activeTabTheme, searchQuery]);

  const activeThemeMeta = IB_THEMES.find((t) => t.id === activeTabTheme) || IB_THEMES[0];

  return (
    <div className="space-y-6 liquid-view-enter pb-16">
      {/* =====================================================================
          HERO REVISION BANNER
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-fuchsia-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-fuchsia-400" />
                IB GERMAN B · SUMMARY &amp; ENTRY TICKET HUB
              </span>
              <span className="liquid-glass-pill px-3 py-1 rounded-full text-xs text-sky-200">
                25 Lehrplanthemen
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Zusammenfassungs- &amp; Entry-Ticket Hub
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed font-sans">
              Prägnante 60-Sekunden-Zusammenfassungen, idiomatische Redemittel, Schlüsselwortschatz, Prüfungsdebatten und typische Grammatikfallen für alle 25 Subthemen.
            </p>
          </div>

          {/* Study Mode Posture */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/12 self-start md:self-center shrink-0">
            <button
              onClick={() => setStudyGoal("revise")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studyGoal === "revise"
                  ? "bg-gradient-to-r from-amber-500/35 to-fuchsia-500/35 text-white border border-fuchsia-400/50 shadow-lg shadow-fuchsia-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Zap className="w-4 h-4 text-fuchsia-300" />
              <span>Exam Sprint</span>
            </button>
            <button
              onClick={() => setStudyGoal("learn")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studyGoal === "learn"
                  ? "bg-gradient-to-r from-emerald-500/35 to-teal-500/35 text-white border border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Deep Study</span>
            </button>
          </div>
        </div>

        {/* Thema Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/10">
          <button
            onClick={() => setActiveTabTheme("all")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTabTheme === "all"
                ? "bg-white/20 text-white border border-white/35 shadow-md backdrop-blur-md"
                : "liquid-glass-pill text-slate-300 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alle 25 Themen</span>
          </button>

          {IB_THEMES.map((theme) => {
            const isActive = activeTabTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setActiveTabTheme(theme.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/20 text-white border border-white/35 shadow-md backdrop-blur-md"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: theme.color }}
                />
                <span>Thema {theme.themeNumber}: {theme.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          CONTROLS & SEARCH BAR
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-3xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="font-mono font-bold text-fuchsia-300">
            {filteredTickets.length} Subthemen
          </span>
          <span className="text-slate-500">•</span>
          <span>
            {activeTabTheme === "all"
              ? "Vollständiger IB Lehrplan (Themen 1–5)"
              : `Thema ${activeThemeMeta.themeNumber}: ${activeThemeMeta.title} (${activeThemeMeta.englishTitle})`}
          </span>
        </div>

        <div className="relative min-w-[260px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Subthema, Wortschatz, Redemittel suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-400/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Löschen
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          BENTO GRID: 25 SUBTOPIC ENTRY TICKETS
          ===================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredTickets.map((item) => {
          const isDone = completedTopics.includes(item.topicId);
          const themeMeta = IB_THEMES.find((t) => t.id === item.themeId) || IB_THEMES[0];

          return (
            <div
              key={item.id}
              className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-fuchsia-400/35 transition-all flex flex-col justify-between space-y-4"
              style={{
                borderColor: isDone ? "rgba(16, 185, 129, 0.35)" : undefined,
              }}
            >
              <div className="space-y-3.5">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border shadow-sm"
                      style={{
                        backgroundColor: `${themeMeta.color}25`,
                        color: themeMeta.color,
                        borderColor: `${themeMeta.color}50`,
                      }}
                    >
                      {item.displayCode} • THEMA {themeMeta.themeNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-slate-300 bg-white/[0.05] border border-white/10">
                      {item.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toggleTopicComplete(item.topicId);
                        if (typeof navigator !== "undefined" && navigator.vibrate) {
                          navigator.vibrate(15);
                        }
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                          : "bg-white/5 text-slate-300 border-white/10 hover:text-white"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{isDone ? "Gemeistert" : "Markieren"}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTopic(item.topicId);
                        setActiveTheme(item.themeId);
                        setViewMode("themen");
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold text-fuchsia-300 hover:text-white bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-400/30 transition-all cursor-pointer"
                    >
                      <span>Im Dashboard</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Subtopic Title & Subtitle */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug font-sans">
                    {item.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-medium mt-0.5"
                    style={{ color: `${themeMeta.color}cc` }}
                  >
                    {item.englishTitle}
                  </p>
                </div>

                {/* Cultural Spotlight Badge */}
                <div className="flex items-center gap-2 text-xs bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-2xl">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-fuchsia-400" />
                  <span className="text-slate-400 font-medium">DACH-Fokus:</span>
                  <span className="text-white font-semibold truncate">
                    {item.culturalSpotlight.title} ({item.culturalSpotlight.region})
                  </span>
                </div>

                {/* 60-Second Lesson Summary */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-fuchsia-400" />
                    60-Sekunden Zusammenfassung (Entry Ticket)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {item.sixtySecondSummary}
                  </p>
                </div>

                {/* Redemittel, Key Grammar & Themes Row */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  {/* Redemittel */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-sky-400" />
                      Idiomatische Redemittel (Debatten-Sprachmittel):
                    </div>
                    <div className="space-y-1.5">
                      {item.redemittel.map((r, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs">
                          <span className="font-bold text-sky-200 block">{r.phrase}</span>
                          <span className="text-[11px] text-slate-400 italic block mb-1">{r.meaning}</span>
                          <p className="text-slate-300 text-[11px]">„{r.example}“</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Grammar Box */}
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-400/25 space-y-1">
                    <div className="text-[11px] font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                      Grammatik-Formel: {item.keyGrammar.title}
                    </div>
                    <code className="text-xs font-mono text-violet-100 block bg-black/30 px-2 py-1 rounded-md">
                      {item.keyGrammar.formula}
                    </code>
                    <p className="text-[11px] text-slate-300 pt-0.5 leading-snug">
                      <strong className="text-violet-300">Criterion A Tipp:</strong> {item.keyGrammar.tip}
                    </p>
                  </div>
                </div>

                {/* Two-Column Bento: Key Vocabulary + Discussion & Misconceptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {/* Left: Schlüsselwortschatz */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-amber-400" />
                      Schlüsselwortschatz (Must-Cite Vocabulary):
                    </h4>
                    <div className="space-y-2">
                      {item.keyVocab.map((v, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="font-bold text-amber-200">{v.german}</span>
                            <span className="text-[11px] text-slate-400 italic">{v.english}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 italic leading-snug">
                            „{v.context}“
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Teacher Will Ask & Pitfalls */}
                  <div className="space-y-3">
                    {/* Teacher Will Ask */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                      <h4 className="text-[11px] font-bold text-fuchsia-300 uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-fuchsia-400" />
                        Fragen des Lehrers (Mündliche Prüfungsdebatten):
                      </h4>
                      <ul className="space-y-1.5">
                        {item.teacherDiscussionQuestions.map((q, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-200 pl-2.5 border-l-2 border-fuchsia-400/60 leading-snug font-sans"
                          >
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Common Misconceptions / Pitfalls */}
                    <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
                      <span className="font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Häufige Grammatik- &amp; Prüfungsfallen:
                      </span>
                      <p className="text-xs text-rose-100/90 leading-relaxed font-sans">
                        {item.commonMisconceptions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

RevisionHubView.displayName = "RevisionHubView";
