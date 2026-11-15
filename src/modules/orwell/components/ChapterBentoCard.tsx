"use client";

import React, { useState, useMemo } from "react";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  MapPin,
  Radio,
  BookOpen,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Quote,
  Zap,
  ShieldAlert,
  ArrowRight,
  Eye,
  Layers,
  GraduationCap,
} from "lucide-react";
import {
  ChapterData,
  THEMES_TAXONOMY,
  BOOK_PARTS,
  ALL_CHAPTER_ENTRY_TICKETS,
  PRE_LESSON_CRAM_SHEETS,
} from "@/modules/orwell/data";
import { useStudyStore } from "@/modules/orwell/store/useStudyStore";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

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
    bookmarkedQuotes,
    setViewMode,
    setRevisionTab,
    toggleChapterComplete,
    toggleBookmarkQuote,
    goToPrevChapter,
    goToNextChapter,
  } = useStudyStore();

  const [studioMode, setStudioMode] = useState<"narrative" | "quotes" | "traps">("narrative");
  const [quoteSearch, setQuoteSearch] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const isChapterDone = !!completedChapters[chapter.id];
  const bookPart = BOOK_PARTS.find((p) => p.id === chapter.partId);

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

  const filteredQuotes = useMemo(() => {
    const q = quoteSearch.trim().toLowerCase();
    if (!q) return chapter.quotes;
    return chapter.quotes.filter(
      (quote) =>
        quote.quote.toLowerCase().includes(q) ||
        quote.speaker.toLowerCase().includes(q) ||
        quote.context.toLowerCase().includes(q) ||
        quote.analysis.toLowerCase().includes(q)
    );
  }, [chapter.quotes, quoteSearch]);

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const matchingCram = useMemo(() => {
    return PRE_LESSON_CRAM_SHEETS.find(
      (c) => c.chapterCode === chapter.displayCode || c.id === chapter.id
    );
  }, [chapter]);

  const discussionQuestions = matchingCram?.teacherDiscussionQuestions || [
    `How does Orwell use setting and surveillance in Chapter ${chapter.displayCode} to underscore Winston's psychological alienation?`,
    `What role does doublethink or Party orthodoxy play in the developments of this chapter?`,
  ];

  return (
    <article
      id={`chapter-card-${chapter.id}`}
      className={`space-y-6 max-w-5xl mx-auto pb-16 ${
        isDeferredBelowFold ? "deferred-chapter-card" : ""
      }`}
    >
      {/* =====================================================================
          1. ZEN HEADER: Chapter Title, Meta & Completion
          ===================================================================== */}
      <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-7 relative overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
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

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/[0.05] border border-white/10">
              <Clock className="w-3.5 h-3.5 text-rose-300" />
              {chapter.readingTimeMinutes} min speed-read
            </span>
          </div>

          {/* Prev/Next & Completion Button */}
          <div className="flex items-center gap-2">
            {showPrevNextControls && (
              <div className="flex items-center gap-1">
                <button
                  onClick={goToPrevChapter}
                  title="Previous Chapter"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-slate-300 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextChapter}
                  title="Next Chapter"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-slate-300 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => toggleChapterComplete(chapter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isChapterDone
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "bg-white/10 hover:bg-rose-500/25 text-white border border-white/20 hover:border-rose-400/40"
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  isChapterDone ? "text-emerald-400" : "text-white/40"
                }`}
              />
              <span>{isChapterDone ? "Chapter Mastered" : "Mark Chapter Read"}</span>
            </button>
          </div>
        </div>

        {/* Chapter Title */}
        <div className="space-y-1.5 mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug font-sans">
            {chapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/85 font-medium">
            {chapter.subtitle}
          </p>
        </div>

        {/* Setting & Telescreen Meta Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-slate-400 font-medium">Setting:</span>
            <span className="text-white truncate">{chapter.setting}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 truncate">
            <Radio className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-slate-400 font-medium">Telescreen:</span>
            <span className="text-rose-200 truncate">{chapter.telescreenStatus}</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. STUDIO MODE SWITCHER: 3 Clean Focused Tabs
          ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
        <button
          onClick={() => setStudioMode("narrative")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "narrative"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Narrative &amp; Analysis</span>
        </button>

        <button
          onClick={() => setStudioMode("quotes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            studioMode === "quotes"
              ? "bg-white text-black shadow-md font-bold"
              : "text-white/65 hover:text-white hover:bg-white/[0.06]"
          }`}
        >
          <Quote className="w-3.5 h-3.5 text-rose-500" />
          <span>60s Takeaways &amp; Quotes</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {chapter.quotes.length}
          </span>
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
          <span>Socratic Prompts &amp; Traps</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
            {discussionQuestions.length}
          </span>
        </button>

        <div className="ml-auto pr-2 hidden sm:block">
          <button
            onClick={() => {
              setViewMode("revision");
              setRevisionTab("cram");
            }}
            className="text-[11px] font-mono text-rose-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Revision Hub</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          3. ACTIVE STUDIO VIEW
          ===================================================================== */}
      {studioMode === "narrative" && (
        <section className="space-y-5">
          {/* Complete Narrative Reading Prose */}
          <div className="liquid-glass-bento rounded-[28px] p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Chapter Narrative Prose
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {chapter.summary.split("\n\n").length} paragraphs
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-[15.5px] text-slate-100/95 leading-[1.8] font-sans tracking-normal">
              {chapter.summary.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Deep Literary Analysis & Psychological Arc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="liquid-glass-card rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                <ShieldAlert className="w-4 h-4" />
                <span>Totalitarian Mechanism</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {chapter.analysis.sparkNotesSynthesis}
              </p>
            </div>

            <div className="liquid-glass-card rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                <GraduationCap className="w-4 h-4" />
                <span>Winston&apos;s Psychological Arc</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {chapter.analysis.psychologicalArc || "Internal struggle against Party orthodoxy."}
              </p>
            </div>
          </div>
        </section>
      )}

      {studioMode === "quotes" && (
        <section className="space-y-5">
          {/* Mini Search Inside Quotes Section */}
          <MiniSectionSearch
            query={quoteSearch}
            onQueryChange={setQuoteSearch}
            placeholder="Search verbatim quotes by phrase, speaker (Winston, Julia, O'Brien), or theme..."
            totalCount={chapter.quotes.length}
            filteredCount={filteredQuotes.length}
            accentColor="#f43f5e"
          />

          {/* Quotes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuotes.map((q) => {
              const isBookmarked = !!bookmarkedQuotes[q.id];
              return (
                <div
                  key={q.id}
                  className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/15 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
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

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/8">
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
      )}

      {studioMode === "traps" && (
        <section className="space-y-5">
          {/* Socratic Discussion Questions */}
          <div className="liquid-glass-bento rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
                <HelpCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Teacher Socratic Prompts &amp; Class Participation
                </h3>
                <p className="text-xs text-slate-400">
                  Anticipated classroom discussion questions with instant model answers
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {discussionQuestions.map((q, idx) => {
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
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-rose-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] transition-colors shrink-0 cursor-pointer"
                      >
                        {isOpen ? "Hide Model Answer" : "Reveal Answer"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-3 rounded-xl bg-black/40 border border-rose-400/20 text-xs text-slate-200 leading-relaxed font-sans">
                        <strong className="text-rose-300">Model Response: </strong>
                        Synthesize Winston&apos;s internal resistance against Party orthodoxy, noting how Orwell uses sensory imagery and spatial enclosure to heighten alienation.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Traps & Misconceptions */}
          <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Student Misconceptions &amp; Mark Scheme Pitfalls</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Students often treat Julia and Winston as heroic political revolutionaries rather than pragmatic, personal rebels. In IB Paper 2, emphasize that Orwell presents resistance as tragic, psychological, and fragile rather than militarily viable.
            </p>
          </div>
        </section>
      )}
    </article>
  );
});

ChapterBentoCard.displayName = "ChapterBentoCard";
