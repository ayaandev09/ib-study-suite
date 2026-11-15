"use client";

import React, { useState } from "react";
import { AcademicNotesSurface } from "@/modules/orwell/components/AcademicNotesSurface";
import {
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Radio,
  Zap,
  Quote,
  Bookmark,
  Sparkles,
  Layers,
  ShieldAlert,
  GraduationCap,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
  Users,
} from "lucide-react";
import {
  ChapterData,
  THEMES_TAXONOMY,
  BOOK_PARTS,
  PRE_LESSON_CRAM_SHEETS,
  ALL_CHAPTER_ENTRY_TICKETS,
} from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";
import { RecallFlipCard } from "@/modules/orwell/components/RecallFlipCard";
import { ChapterAnnotationsBento } from "@/modules/orwell/components/ChapterAnnotationsBento";

interface ChapterBentoCardProps {
  chapter: ChapterData;
  isDeferredBelowFold?: boolean;
  showPrevNextControls?: boolean;
}

export const ChapterBentoCard: React.FC<ChapterBentoCardProps> = React.memo(({
  chapter,
  isDeferredBelowFold = false,
  showPrevNextControls = true,
}) => {
  const {
    completedChapters,
    completedSubSections,
    bookmarkedQuotes,
    chapterNotes,
    speedReadMode,
    studyGoal,
    spoilerMaskActive,
    toggleSpoilerMask,
    setViewMode,
    setRevisionTab,
    toggleChapterComplete,
    toggleSubSectionComplete,
    toggleBookmarkQuote,
    setChapterNote,
    goToPrevChapter,
    goToNextChapter,
  } = useStudyStore();

  const [localSpoilerRevealed, setLocalSpoilerRevealed] = useState(false);

  // Match full entry ticket catalog or cram sheet
  const matchingTicket =
    ALL_CHAPTER_ENTRY_TICKETS.find(
      (t) => t.chapterCode === chapter.displayCode || t.id === chapter.id
    ) ||
    PRE_LESSON_CRAM_SHEETS.find(
      (c) => c.chapterCode === chapter.displayCode
    );

  const isSpoilerSensitive =
    chapter.partNumber === 3 ||
    chapter.displayCode === "II.10" ||
    chapter.displayCode === "II.8";

  const isChapterDone = !!completedChapters[chapter.id];
  const bookPart = BOOK_PARTS.find((p) => p.id === chapter.partId);
  const completedSubsCount = chapter.subSections.filter(
    (s) => !!completedSubSections[s.id]
  ).length;

  const surveillanceColors: Record<
    ChapterData["surveillanceLevel"],
    { bg: string; border: string; text: string; dot: string }
  > = {
    LOW: {
      bg: "rgba(16, 185, 129, 0.14)",
      border: "rgba(16, 185, 129, 0.45)",
      text: "#a7f3d0",
      dot: "#10b981",
    },
    MODERATE: {
      bg: "rgba(225, 29, 72, 0.14)",
      border: "rgba(225, 29, 72, 0.45)",
      text: "#fde68a",
      dot: "#d97706",
    },
    HIGH: {
      bg: "rgba(244, 63, 94, 0.16)",
      border: "rgba(244, 63, 94, 0.45)",
      text: "#fde68a",
      dot: "#f59e0b",
    },
    "COVERT TRAP": {
      bg: "rgba(168, 85, 247, 0.18)",
      border: "rgba(168, 85, 247, 0.5)",
      text: "#e9d5ff",
      dot: "#a855f7",
    },
    "ABSOLUTE PANOPTICON": {
      bg: "rgba(244, 63, 94, 0.2)",
      border: "rgba(244, 63, 94, 0.55)",
      text: "#fecdd3",
      dot: "#f43f5e",
    },
  };

  const survBadge = surveillanceColors[chapter.surveillanceLevel];

  return (
    <article
      id={`chapter-card-${chapter.id}`}
      className={`space-y-6 topic-transition-enter ${
        isDeferredBelowFold ? "deferred-chapter-card" : ""
      }`}
    >
      {/* =====================================================================
          TIER 1: HERO (Chapter title, setting, reading time, mark complete)
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 relative overflow-hidden border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Breadcrumb Hierarchy */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-200 border border-rose-400/35">
              Part {bookPart?.romanNumeral} • Chapter {chapter.displayCode}
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: survBadge.bg,
                borderColor: survBadge.border,
                color: survBadge.text,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: survBadge.dot }}
              />
              SURVEILLANCE: {chapter.surveillanceLevel}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 liquid-glass-pill">
              <Clock className="w-3.5 h-3.5 text-rose-300" />
              {chapter.readingTimeMinutes} min speed-read
            </span>
          </div>

          {/* Prev/Next Controls + Interactive Check-off */}
          <div className="flex items-center gap-2">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={goToPrevChapter}
                  title="Previous Chapter"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextChapter}
                  title="Next Chapter"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                toggleChapterComplete(chapter.id);
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isChapterDone
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "bg-white/10 hover:bg-rose-500/25 text-white border border-white/25 hover:border-rose-400/40"
              }`}
            >
              <div className={isChapterDone ? "animate-tick-pop" : ""}>
                {isChapterDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-rose-300" />
                )}
              </div>
              <span>{isChapterDone ? "Chapter Completed" : "Mark Chapter Read"}</span>
            </button>
          </div>
        </div>

        {/* Chapter Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-1 font-sans">
          {chapter.title}
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/85 font-medium mb-4">
          {chapter.subtitle}
        </p>

        {/* Setting & Telescreen Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-slate-400 font-medium">Setting:</span>
            <span className="text-white truncate">{chapter.setting}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Radio className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-slate-400 font-medium">Telescreen:</span>
            <span className="text-rose-200 truncate">
              {chapter.telescreenStatus}
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          TIER 2: CORE DIGEST (3 clean rounded bullet cards) + SUMMARY
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Core Chapter Digest &amp; Synthesis
              </h2>
              <p className="text-xs text-slate-400">
                Key beats, totalitarian mechanism, and psychological trajectory
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setViewMode("revision");
              setRevisionTab("cram");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill text-xs font-bold text-rose-300 hover:text-white transition-all cursor-pointer"
          >
            <span>Revision Hub Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Clean Rounded Bullet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Key Narrative Beats */}
          <div className="liquid-glass-bento rounded-3xl p-5 border border-white/10 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  1. Narrative Beats
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {chapter.speedReadBullets[0] || chapter.summary.slice(0, 180) + "..."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 italic">
              {chapter.speedReadBullets[1] || "Plot progression anchor"}
            </div>
          </div>

          {/* Card 2: Totalitarian Mechanism */}
          <div className="liquid-glass-bento rounded-3xl p-5 border border-white/10 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                  2. Ideological Weapon
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {chapter.themeTracking[0]?.manifestation || chapter.analysis.sparkNotesSynthesis.slice(0, 180) + "..."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] text-rose-300/80 font-mono">
              Mechanism: {chapter.themeTracking[0]?.themeId.toUpperCase() || "TOTALITARIANISM"}
            </div>
          </div>

          {/* Card 3: Winston's Psychological Arc */}
          <div className="liquid-glass-bento rounded-3xl p-5 border border-white/10 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  3. Psychological Arc
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {chapter.analysis.psychologicalArc || "Winston's internal consciousness under pressure."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] text-purple-300/80 font-mono">
              Resistance &amp; Fear State
            </div>
          </div>
        </div>

        {/* Narrative Summary Card (Open & Inviting without Collapsed Wall) */}
        <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Complete Narrative Reading Prose
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {chapter.summary.split("\n\n").length} paragraphs
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-200/95 leading-relaxed font-sans tracking-normal">
            {chapter.summary.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          TIER 3: KEY QUOTES / VOCABULARY & TEXTUAL EVIDENCE
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
              <Quote className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Key Verbatim Quotes &amp; Textual Evidence
              </h2>
              <p className="text-xs text-slate-400">
                High-yield passages with speaker, context, and close literary analysis
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-300/90 font-bold px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-400/20">
            {chapter.quotes.length} Quotes
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {chapter.quotes.map((q) => {
            const isBookmarked = !!bookmarkedQuotes[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/15 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <blockquote className="text-xs sm:text-sm font-semibold text-white italic leading-relaxed border-l-2 border-rose-400 pl-3 font-serif">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <button
                      onClick={() => toggleBookmarkQuote(q.id)}
                      title="Bookmark quote"
                      className="p-1.5 rounded-xl liquid-glass-pill text-slate-400 hover:text-rose-300 shrink-0 cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? "text-rose-300 fill-rose-300" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="text-xs font-mono text-rose-300/90 pl-3">
                    — {q.speaker} ({q.context})
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed pt-1">
                    <span className="text-sky-300 font-semibold">Close Reading:</span> {q.analysis}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {q.themes.map((tId) => {
                    const t = THEMES_TAXONOMY[tId];
                    if (!t) return null;
                    return (
                      <span
                        key={tId}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-semibold border"
                        style={{
                          backgroundColor: t.badgeBg,
                          borderColor: t.badgeBorder,
                          color: t.badgeText,
                        }}
                      >
                        {t.shortName}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          TIER 4: DISCUSSION & EXAM TRAPS
          ===================================================================== */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Teacher Will Ask / Seminar Talking Points */}
          <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Teacher Will Ask (Seminar Talking Points)
                </h3>
                <p className="text-xs text-slate-400">
                  Discussion-ready questions for active class participation
                </p>
              </div>
            </div>

            <ul className="space-y-2 pt-1">
              {(matchingTicket?.teacherDiscussionQuestions || [
                `How does Orwell develop the setting of ${chapter.setting} to reflect totalitarian power?`,
                `What psychological shifts in Winston are highlighted by this chapter's central conflict?`,
                `How does the thematic tension of ${chapter.themeTracking[0]?.themeId || "surveillance"} operate here?`,
              ]).map((q, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-slate-200 pl-3 border-l-2 border-rose-400/60 leading-relaxed font-sans"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Avoid Common Exam Traps & Misconceptions */}
          <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-rose-500/25 bg-gradient-to-br from-rose-500/10 to-transparent space-y-3">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-rose-500/25 text-rose-300 border border-rose-400/40">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-rose-200 tracking-tight">
                  Avoid Common Exam Traps &amp; Pitfalls
                </h3>
                <p className="text-xs text-rose-300/70">
                  Critical nuance required for top-tier essay analysis
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans pt-1">
              {matchingTicket?.commonMisconceptions ||
                "Students often treat this chapter as plot exposition rather than an ideological demonstration. Analyze how Orwell uses sensory decay and language to illustrate state control over private thought."}
            </p>
          </div>
        </div>

        {/* Full-Width Core Analytical Thesis Takeaway Banner */}
        <div className="liquid-glass-bento rounded-3xl p-5 border border-purple-500/30 bg-gradient-to-r from-purple-500/15 via-rose-500/15 to-transparent">
          <div className="flex items-center gap-2 mb-1.5">
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
              Core Analytical Exam Thesis Takeaway
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white font-medium leading-relaxed font-sans">
            {chapter.examPromptTakeaway}
          </p>
        </div>
      </section>

      {/* =====================================================================
          TIER 5: SCENE BREAKDOWN, THEMES & ANNOTATIONS
          ===================================================================== */}
      {/* Sub-Sections Hierarchy */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Scene &amp; Sub-Section Breakdown
              </h3>
              <p className="text-xs text-slate-400">
                {chapter.subSections.length} scenes in {chapter.displayCode} • Check off as you read
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
            {completedSubsCount}/{chapter.subSections.length} Scenes Checked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {chapter.subSections.map((sub, index) => {
            const isSubDone = !!completedSubSections[sub.id];
            return (
              <div
                key={sub.id}
                onClick={() => toggleSubSectionComplete(chapter.id, sub.id)}
                className={`rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSubDone
                    ? "bg-emerald-950/20 border-emerald-400/40"
                    : "bg-white/[0.04] hover:bg-white/[0.07] border-white/12 hover:border-rose-400/40"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                      {chapter.displayCode}.{index + 1} • {sub.sceneMarker}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubSectionComplete(chapter.id, sub.id);
                        if (typeof navigator !== "undefined" && navigator.vibrate) {
                          navigator.vibrate(20);
                        }
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-150 active:scale-80 select-none ${
                        isSubDone
                          ? "text-emerald-400 bg-emerald-500/20"
                          : "text-slate-400 hover:text-emerald-300 hover:bg-white/10"
                      }`}
                    >
                      <div className={isSubDone ? "animate-tick-pop" : ""}>
                        {isSubDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>

                  <h4
                    className={`text-sm font-bold mb-1.5 font-sans ${
                      isSubDone ? "text-emerald-200 line-through" : "text-white"
                    }`}
                  >
                    {sub.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {sub.content}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300 mb-0.5">
                    Analytical Takeaway
                  </div>
                  <p className="text-xs text-rose-100/90 leading-relaxed font-sans">
                    {sub.analyticalTakeaway}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme Tracking & Active Motifs */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Theme Tracking &amp; Active Ideological Mechanisms
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {chapter.themeTracking.map((track) => {
            const themeDef = THEMES_TAXONOMY[track.themeId];
            if (!themeDef) return null;

            return (
              <div
                key={track.themeId}
                className="rounded-2xl p-4 bg-black/30 border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-lg text-xs font-bold border"
                    style={{
                      backgroundColor: themeDef.badgeBg,
                      borderColor: themeDef.badgeBorder,
                      color: themeDef.badgeText,
                    }}
                  >
                    {themeDef.shortName}
                  </span>

                  {/* 5-Bar Intensity Meter */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className="w-2.5 h-3 rounded-sm transition-all"
                        style={{
                          backgroundColor:
                            lvl <= track.intensity
                              ? themeDef.color
                              : "rgba(255,255,255,0.1)",
                          boxShadow:
                            lvl <= track.intensity
                              ? `0 0 8px ${themeDef.glowColor}`
                              : "none",
                        }}
                      />
                    ))}
                    <span className="ml-1 text-[11px] font-mono font-bold text-slate-300">
                      {track.intensity}/5
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {track.manifestation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Motifs & Symbols Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Motifs in Chapter:
          </span>
          {chapter.analysis.motifsAndSymbols.map((sym, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-xl text-xs bg-white/[0.06] border border-white/15 text-rose-200"
            >
              {sym}
            </span>
          ))}
        </div>
      </div>

      {/* Color-Coded Physical Book Annotations & Marginalia */}
      <ChapterAnnotationsBento
        chapterId={chapter.id}
        chapterCode={chapter.displayCode}
      />

      {/* Personal Study Marginalia Scratchpad */}
      <AcademicNotesSurface
        note={chapterNotes[chapter.id] || ""}
        onChange={(text) => setChapterNote(chapter.id, text)}
        title="Personal Study Marginalia & Reflections"
        itemCode={chapter.displayCode}
        minRows={5}
        accentColor="#f43f5e"
      />

      {/* Active Recall / Self-Check Bento */}
      <RecallFlipCard
        moduleCode={chapter.displayCode}
        title={`${chapter.displayCode} · ${chapter.title}`}
        prompt={
          matchingTicket?.teacherDiscussionQuestions?.[0] ||
          chapter.examPromptTakeaway ||
          chapter.summary
        }
        answer={matchingTicket?.sixtySecondSummary || chapter.summary}
        accent="#f43f5e"
        secondary="#e11d48"
        meta="ACTIVE RECALL"
      />
    </article>
  );
});

ChapterBentoCard.displayName = "ChapterBentoCard";
