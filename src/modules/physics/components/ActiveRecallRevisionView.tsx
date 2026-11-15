"use client";

import React, { useState, useMemo } from "react";
import {
  FLASHCARDS,
  QUIZ_QUESTIONS,
  SYLLABUS_THEMES,
  ALL_TOPICS,
  ThemeId,
  TopicData,
} from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { MathText } from "./MathText";
import {
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  Calculator,
  AlertTriangle,
  Layers,
  ArrowRight,
  Zap,
  Target,
  FileText,
  Search,
} from "lucide-react";

export const ActiveRecallRevisionView: React.FC = () => {
  const { setActiveTopic, setViewMode } = useStudyStore();
  const [activeTab, setActiveTab] = useState<"entry-tickets" | "flashcards" | "quiz">("entry-tickets");

  // Entry Ticket Summaries state
  const [selectedTheme, setSelectedTheme] = useState<"all" | ThemeId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    return ALL_TOPICS.filter((t) => {
      const matchesTheme = selectedTheme === "all" || t.themeId === selectedTheme;
      const matchesQuery =
        !searchQuery ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.displayCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTheme && matchesQuery;
    });
  }, [selectedTheme, searchQuery]);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardTheme, setCardTheme] = useState<"all" | ThemeId>("all");
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});

  const filteredCards = FLASHCARDS.filter((c) =>
    cardTheme === "all" ? true : c.themeId === cardTheme
  );
  const currentCard = filteredCards[cardIndex] || filteredCards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const toggleCardKnown = (id: string) => {
    setKnownCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuiz = QUIZ_QUESTIONS[quizIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuiz.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuizIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOpenTopic = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("stream");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-indigo-950/40 border border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-4 h-4" />
          <span>IB Physics Revision &amp; Lesson Warmup Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Revise &amp; Master
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Quickly review high-yield lesson entry ticket summaries, key quantitative formulas, teacher discussion prompts, and exam traps. Toggle into active recall mode for spaced-repetition flashcards and Paper 1 MCQ drills.
        </p>

        {/* Top-Level Mode Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("entry-tickets")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "entry-tickets"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Entry Ticket Summaries</span>
          </button>

          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "flashcards"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Interactive Flashcards ({FLASHCARDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "quiz"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Paper 1 MCQ Quiz ({QUIZ_QUESTIONS.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          MODE 1: ENTRY TICKET SUMMARIES (LESSON WARMUPS)
          =================================================================== */}
      {activeTab === "entry-tickets" && (
        <div className="space-y-6">
          {/* Theme Filters & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTheme("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedTheme === "all"
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                All Themes ({ALL_TOPICS.length})
              </button>
              {SYLLABUS_THEMES.map((theme) => {
                const count = ALL_TOPICS.filter((t) => t.themeId === theme.id).length;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id as ThemeId)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      selectedTheme === theme.id
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30"
                        : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    Theme {theme.number}: {theme.shortTitle} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter subunits or concepts..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Subunit Entry Ticket Cards Grid */}
          <div className="space-y-6">
            {filteredTopics.map((topic) => {
              const theme = SYLLABUS_THEMES.find((th) => th.id === topic.themeId);
              const discussionPrompt =
                topic.examBlueprint.paper2StructuredPrompt ||
                topic.checkUnderstanding[0]?.question ||
                `How do the governing equations of ${topic.title} reflect energy conservation?`;
              const trapPattern =
                topic.examBlueprint.paper1TrapPattern ||
                topic.analysis.commonMisconceptions[0] ||
                "Confusing scalar speed with vector velocity and forgetting sign conventions.";

              return (
                <div
                  key={topic.id}
                  className="liquid-glass-bento rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* Subunit Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                          {topic.displayCode}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/10">
                          Theme {theme?.number || topic.themeNumber} • {theme?.shortTitle || "Core"}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/25">
                          {topic.level}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30">
                          <Zap className="w-3 h-3 text-amber-400" />
                          60s Warmup
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {topic.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 italic">
                        {topic.subtitle}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenTopic(topic.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-semibold border border-white/10 hover:border-cyan-400 cursor-pointer transition-all shrink-0 self-start sm:self-center"
                    >
                      <span>Study Full Topic</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Bento Panels Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Panel 1: 60-Second Core Takeaway */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>60-Second Core Takeaway (Warmup)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        <MathText text={topic.summary} />
                      </p>
                      {topic.speedReadBullets.length > 0 && (
                        <div className="pt-2 border-t border-white/5 space-y-1.5">
                          {topic.speedReadBullets.slice(0, 2).map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span><MathText text={bullet} /></span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Panel 2: Key Formulas & Quantitative Tools */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                        <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Key Formulas &amp; Quantitative Laws</span>
                      </div>
                      {topic.primaryFormulas.length > 0 ? (
                        <div className="space-y-2">
                          {topic.primaryFormulas.slice(0, 3).map((f, idx) => (
                            <div
                              key={idx}
                              className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-cyan-200"
                            >
                              <MathFormula math={f} block={false} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          Qualitative conservation and field laws apply throughout this unit.
                        </p>
                      )}
                      {topic.subSections[0]?.keyFormulaOrFramework && (
                        <div className="pt-2 border-t border-white/5 text-xs text-slate-300 font-mono">
                          <span className="text-cyan-400 font-bold">Key Rule: </span>
                          <MathText text={topic.subSections[0].keyFormulaOrFramework} />
                        </div>
                      )}
                    </div>

                    {/* Panel 3: Teacher Will Ask / Discussion Points */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span>Teacher Will Ask / Discussion</span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-400/25">
                          {topic.examBlueprint.commandTerm || "Explain"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                        &ldquo;<MathText text={discussionPrompt} />&rdquo;
                      </p>
                      {topic.examPromptTakeaway && (
                        <div className="pt-2 border-t border-white/5 text-xs text-indigo-200/90 leading-relaxed">
                          <span className="font-bold text-indigo-300">Talking Point: </span>
                          <MathText text={topic.examPromptTakeaway} />
                        </div>
                      )}
                    </div>

                    {/* Panel 4: Common Student Traps & Misconceptions */}
                    <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Common Student Traps &amp; Misconceptions</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <MathText text={trapPattern} />
                      </p>
                      {topic.analysis.commonMisconceptions.length > 0 && (
                        <div className="pt-2 border-t border-rose-500/10 space-y-1.5">
                          {topic.analysis.commonMisconceptions.slice(0, 2).map((misc, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-rose-200/85 leading-relaxed">
                              <Target className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                              <span><MathText text={misc} /></span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          MODE 2: INTERACTIVE FLASHCARDS (ACTIVE RECALL)
          =================================================================== */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          {/* Theme selector */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setCardTheme("all");
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                cardTheme === "all"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              All Themes ({FLASHCARDS.length})
            </button>
            {SYLLABUS_THEMES.map((theme) => {
              const count = FLASHCARDS.filter((c) => c.themeId === theme.id).length;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setCardTheme(theme.id as ThemeId);
                    setCardIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    cardTheme === theme.id
                      ? "bg-cyan-500 text-slate-950 font-bold"
                      : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  Theme {theme.number}: {theme.shortTitle} ({count})
                </button>
              );
            })}
          </div>

          {/* Flashcard Box */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[340px] rounded-3xl p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-cyan-500/40 transition-all group select-none relative overflow-hidden"
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-white/10 text-cyan-300 border border-cyan-500/30">
                    Topic {currentCard.topicCode}
                  </span>
                  <span className="uppercase tracking-wider font-semibold text-slate-300">
                    {currentCard.category}
                  </span>
                </div>
                <span className="font-mono text-cyan-400">
                  Card {cardIndex + 1} of {filteredCards.length}
                </span>
              </div>

              {/* Card Face Content */}
              <div className="my-auto py-6 text-center space-y-4">
                {!isFlipped ? (
                  <>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      QUESTION / PROMPT
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                      {currentCard.front}
                    </h3>
                    <p className="text-xs text-slate-400 pt-2">
                      (Click anywhere on card to reveal answer)
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                      MODEL ANSWER / PRINCIPLE
                    </span>
                    <p className="text-base sm:text-lg text-emerald-100/95 leading-relaxed font-medium">
                      {currentCard.back}
                    </p>
                    {currentCard.formulaLatex && (
                      <div className="pt-2">
                        <MathFormula math={currentCard.formulaLatex} block />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
                <span className="text-[11px] text-slate-500">
                  {isFlipped ? "Answer revealed" : "Click to flip"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardKnown(currentCard.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                    knownCards[currentCard.id]
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/[0.05] text-slate-400 hover:text-white"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{knownCards[currentCard.id] ? "Mastered" : "Mark Mastered"}</span>
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevCard}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-500/30 text-slate-200 text-xs font-bold cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Card</span>
              </button>
              <button
                onClick={handleNextCard}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold cursor-pointer transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>Next Card</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODE 3: PAPER 1 MCQ PRACTICE QUIZ
          =================================================================== */}
      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!quizFinished ? (
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 shadow-2xl space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-white/10 text-cyan-300 border border-cyan-500/20">
                    Topic {currentQuiz.topicCode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-white/[0.05] text-slate-400">
                    {currentQuiz.difficulty}
                  </span>
                </div>
                <div className="font-mono text-slate-400">
                  Score: <strong className="text-cyan-400">{score}</strong> / {quizIndex + (isAnswered ? 1 : 0)}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentQuiz.question}
                </h3>
                {currentQuiz.formulaLatex && (
                  <div className="pt-1">
                    <MathFormula math={currentQuiz.formulaLatex} block />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQuiz.options.map((option, idx) => {
                  let btnStyle = "bg-white/[0.02] border-white/10 hover:border-cyan-500/30 text-slate-200";
                  if (isAnswered) {
                    if (idx === currentQuiz.correctIndex) {
                      btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                    } else {
                      btnStyle = "bg-slate-950/40 border-white/5 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl text-left border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/10 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswered && idx === currentQuiz.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQuiz.correctIndex && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/20 text-xs sm:text-sm text-slate-300 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Step-by-Step Mark Scheme Explanation</span>
                  </div>
                  <p className="leading-relaxed">{currentQuiz.explanation}</p>
                </div>
              )}

              {/* Next Question button */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <span>{quizIndex + 1 < QUIZ_QUESTIONS.length ? "Next Question" : "Finish Quiz"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            /* Quiz Completed Card */
            <div className="liquid-glass-card rounded-3xl p-8 bg-slate-900/80 border border-white/10 text-center space-y-5 shadow-2xl">
              <Award className="w-12 h-12 text-cyan-400 mx-auto" />
              <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
              <p className="text-sm text-slate-300">
                You scored <strong className="text-cyan-400">{score}</strong> out of{" "}
                <strong>{QUIZ_QUESTIONS.length}</strong> questions (
                {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%).
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-lg shadow-cyan-500/25 inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveRecallRevisionView;
