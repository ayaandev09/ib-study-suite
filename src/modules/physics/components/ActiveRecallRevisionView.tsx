"use client";

import React, { useState } from "react";
import { FLASHCARDS, QUIZ_QUESTIONS, SYLLABUS_THEMES, ThemeId } from "@/modules/physics/data";
import { MathFormula } from "./MathFormula";
import {
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Layers,
  BookOpen,
} from "lucide-react";

export const ActiveRecallRevisionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flashcards" | "quiz">("flashcards");

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

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Sparkles className="w-4 h-4" />
          <span>Active Retrieval & Spaced Repetition Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          Active Recall & Practice Quiz Engine
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master challenging concepts and quantitative problem solving. Flip interactive physics flashcards to test formula recall and definitions, or tackle exam-standard multiple choice questions with immediate step-by-step mathematical feedback.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === "flashcards"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Interactive Flashcards ({filteredCards.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === "quiz"
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Paper 1 MCQ Quiz ({QUIZ_QUESTIONS.length})</span>
          </button>
        </div>
      </div>

      {/* FLASHCARDS TAB */}
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
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                cardTheme === "all"
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              All Themes
            </button>
            {SYLLABUS_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setCardTheme(theme.id);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  cardTheme === theme.id
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
                }`}
              >
                Theme {theme.code.replace("THEME ", "")}
              </button>
            ))}
          </div>

          {/* Flashcard Box */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[320px] rounded-3xl p-8 bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-white/10 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-cyan-500/40 transition-all group select-none relative overflow-hidden"
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                    Topic {currentCard.topicCode}
                  </span>
                  <span className="uppercase tracking-wider font-semibold">
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
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
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
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
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
                      : "bg-slate-800 text-slate-400 hover:text-slate-200"
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
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 text-slate-200 text-xs font-bold cursor-pointer transition-all"
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

      {/* QUIZ TAB */}
      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!quizFinished ? (
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-white/10 shadow-2xl space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                    Topic {currentQuiz.topicCode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-slate-800 text-slate-400">
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
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
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
                  let btnStyle = "bg-slate-950/60 border-white/10 hover:border-cyan-500/30 text-slate-200";
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
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
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
              <h2 className="text-2xl font-extrabold text-slate-100">Quiz Completed!</h2>
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
