"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SYLLABUS_UNITS,
  ALL_TOPICS,
  BIO_FLASHCARDS,
  BIOLOGY_CONCEPTS,
  ThemeId,
  TopicData,
} from "@/modules/biology/data";
import { useStudyStore } from "@/modules/biology/store/useStudyStore";
import { MathText } from "./MathText";
import { MathFormula } from "./MathFormula";
import {
  Sparkles,
  Ticket,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  ArrowRight,
  Clock,
  HelpCircle,
  AlertTriangle,
  FlaskConical,
  BookOpen,
  Search,
  Filter,
  Check,
  Flame,
  ChevronDown,
  Layers,
} from "lucide-react";

export function ActiveRecallRevisionView() {
  const {
    completedTopics,
    toggleTopicCompletion,
    setActiveTopic,
    setViewMode,
  } = useStudyStore();

  // Mode: Entry Ticket Summaries vs Active Recall Flashcards
  const [activeMode, setActiveMode] = useState<"tickets" | "flashcards">("tickets");

  // Selected Theme filter for Entry Tickets & Flashcards
  const [selectedTheme, setSelectedTheme] = useState<"all" | ThemeId>("all");
  const [levelFilter, setLevelFilter] = useState<"all" | "SL" | "HL">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Flashcards state
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // Expanded discussion answers per topic
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (topicId: string) => {
    setExpandedAnswers((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  // Filtered topics for Entry Tickets
  const filteredTopics = useMemo(() => {
    return ALL_TOPICS.filter((t) => {
      if (selectedTheme !== "all" && t.themeId !== selectedTheme) return false;
      if (levelFilter === "SL" && t.level === "HL ONLY") return false;
      if (levelFilter === "HL" && t.level !== "HL ONLY") return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCode = t.displayCode.toLowerCase().includes(q);
        const matchesTitle = t.title.toLowerCase().includes(q);
        const matchesSubtitle = t.subtitle.toLowerCase().includes(q);
        const matchesSummary = t.summary.toLowerCase().includes(q);
        return matchesCode || matchesTitle || matchesSubtitle || matchesSummary;
      }
      return true;
    });
  }, [selectedTheme, levelFilter, searchQuery]);

  // Filtered flashcards
  const filteredCards = useMemo(() => {
    return BIO_FLASHCARDS.filter((c) => {
      if (selectedTheme !== "all" && c.themeId !== selectedTheme) return false;
      if (levelFilter === "SL" && c.isHLOnly) return false;
      if (levelFilter === "HL" && !c.isHLOnly) return false;
      return true;
    });
  }, [selectedTheme, levelFilter]);

  const safeCardIdx = cardIdx % Math.max(filteredCards.length, 1);
  const currentCard = filteredCards[safeCardIdx] ?? filteredCards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % Math.max(filteredCards.length, 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + filteredCards.length) % Math.max(filteredCards.length, 1));
  };

  const toggleMastered = (id: string) => {
    setMasteredCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Progress metrics
  const totalReviewed = useMemo(() => {
    return filteredTopics.filter((t) => completedTopics[t.id]).length;
  }, [filteredTopics, completedTopics]);

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-20">
      {/* Hero Header & Mode Switcher */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IB BIOLOGY (2025+) · REVISION &amp; ENTRY TICKET HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unit &amp; Subunit Entry Ticket Summaries
            </h1>
            <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
              Review high-yield 60-second mechanisms before class, master the exact discussion questions your teacher will ask, and test key mark-scheme phrasing.
            </p>
          </div>

          {/* Toggle between Entry Ticket Summaries and Active Recall Flashcards */}
          <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/12 backdrop-blur-xl shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveMode("tickets")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMode === "tickets"
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Entry Tickets ({filteredTopics.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("flashcards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMode === "flashcards"
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Flashcard Recall ({filteredCards.length})</span>
            </button>
          </div>
        </div>

        {/* Theme Tabs & Search Bar */}
        <div className="pt-2 border-t border-white/8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedTheme("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedTheme === "all"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.1]"
              }`}
            >
              All Themes (A–D)
            </button>
            {SYLLABUS_UNITS.map((unit) => (
              <button
                key={unit.id}
                type="button"
                onClick={() => setSelectedTheme(unit.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  selectedTheme === unit.id
                    ? "bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                {unit.code}: {unit.shortTitle}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subunit, concept, or formula..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400/40"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/[0.05] border border-white/10 rounded-xl p-1 text-xs">
                {(["all", "SL", "HL"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                      levelFilter === lvl
                        ? "bg-white text-black font-semibold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {lvl === "all" ? "All Levels" : lvl === "HL" ? "HL Only" : "SL Core"}
                  </button>
                ))}
              </div>

              <div className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/65 font-mono">
                {totalReviewed}/{filteredTopics.length} Prepped
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODE 1: ENTRY TICKET SUMMARIES */}
      {activeMode === "tickets" && (
        <div className="space-y-6">
          {filteredTopics.length === 0 ? (
            <div className="liquid-glass-card rounded-3xl p-12 text-center text-white/50 text-sm">
              No subunits found matching &quot;{searchQuery}&quot;. Try resetting your filters.
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const isMastered = !!completedTopics[topic.id];
              const isAnsOpen = !!expandedAnswers[topic.id];
              const firstQuestion = topic.checkUnderstanding[0];
              const primaryTrap = topic.examBlueprint?.paper1TrapPattern || topic.analysis?.commonMisconceptions?.[0];

              return (
                <div
                  key={topic.id}
                  className={`liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-5 border transition-all duration-300 ${
                    isMastered
                      ? "border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)]"
                      : "border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  {/* Subunit Hero Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300">
                        {topic.displayCode}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold border ${
                          topic.level === "HL ONLY"
                            ? "bg-lime-500/15 border-lime-400/35 text-lime-300"
                            : "bg-white/10 border-white/15 text-white/80"
                        }`}
                      >
                        {topic.level}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-[11px] font-mono text-white/60">
                        {topic.orgLevel}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white/45 ml-1">
                        <Clock className="w-3.5 h-3.5" />
                        ~{topic.readingTimeMinutes} min read
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleTopicCompletion(topic.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                          isMastered
                            ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.2)]"
                            : "bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-white/70 hover:text-white"
                        }`}
                        title="Mark entry ticket as prepped"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isMastered ? "Prepped for Class" : "Mark as Prepped"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTopic(topic.id);
                          setViewMode("focus");
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 text-xs font-semibold text-white cursor-pointer transition-colors"
                      >
                        <span>Focus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {topic.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/60 mt-0.5">
                      {topic.subtitle}
                    </p>
                  </div>

                  {/* Bento Grid: 4 Core Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Bento Cell 1: 60-Second Core Mechanism & Subunit Scope */}
                    <div className="md:col-span-7 rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300">
                          <Flame className="w-3.5 h-3.5" />
                          <span>60-Second Core Mechanism</span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                          <MathText text={topic.summary} />
                        </p>
                      </div>

                      {/* Subunit Markers Pill Row */}
                      {topic.subSections.length > 0 && (
                        <div className="pt-2 border-t border-white/8 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                            Subunit Topics Covered:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.subSections.map((sub) => (
                              <span
                                key={sub.id}
                                className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-white/75"
                                title={sub.title}
                              >
                                {sub.marker}: {sub.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bento Cell 2: Key Formulas & Unifying Themes */}
                    <div className="md:col-span-5 rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lime-300">
                          <FlaskConical className="w-3.5 h-3.5" />
                          <span>Key Formulas &amp; Principles</span>
                        </div>

                        {topic.primaryFormulas.length > 0 ? (
                          <div className="space-y-2">
                            {topic.primaryFormulas.slice(0, 2).map((formula, fIdx) => (
                              <div
                                key={fIdx}
                                className="rounded-xl bg-black/60 border border-emerald-400/20 px-3 py-2 overflow-x-auto text-center"
                              >
                                <MathFormula
                                  formula={formula}
                                  displayMode={false}
                                  className="text-xs sm:text-sm text-emerald-200"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-xl bg-black/40 border border-white/10 p-3 text-xs text-white/70 italic">
                            {topic.strategicImportance}
                          </div>
                        )}
                      </div>

                      {/* Concept Tags */}
                      {topic.conceptTracking.length > 0 && (
                        <div className="pt-2 border-t border-white/8 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                            Unifying Themes:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.conceptTracking.map((ct) => {
                              const c = BIOLOGY_CONCEPTS[ct.conceptId];
                              if (!c) return null;
                              return (
                                <span
                                  key={ct.conceptId}
                                  className="px-2 py-0.5 rounded-md text-[11px] border font-medium"
                                  style={{
                                    backgroundColor: c.badgeBg,
                                    borderColor: c.badgeBorder,
                                    color: c.badgeText,
                                  }}
                                >
                                  {c.shortName}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bento Cell 3: "Teacher Will Ask" / Hand-Raising Discussion Questions */}
                    <div className="md:col-span-7 rounded-2xl bg-white/[0.02] border border-white/8 p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Teacher Will Ask · Discussion Ticket</span>
                        </div>
                        {firstQuestion && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-400/25">
                            {firstQuestion.promptType}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed">
                        {firstQuestion ? (
                          <MathText text={firstQuestion.question} />
                        ) : (
                          `How does ${topic.title} illustrate molecular complementarity and homeostatic adaptation?`
                        )}
                      </p>

                      {/* Expandable Model Hand-Raise Answer */}
                      {firstQuestion && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => toggleAnswer(topic.id)}
                            className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer transition-colors"
                          >
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isAnsOpen ? "rotate-180" : ""
                              }`}
                            />
                            <span>{isAnsOpen ? "Hide Mark Scheme Response" : "Reveal Model Hand-Raise Answer"}</span>
                          </button>

                          <AnimatePresence>
                            {isAnsOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden pt-2.5"
                              >
                                <div className="rounded-xl bg-cyan-950/30 border border-cyan-400/25 p-3.5 space-y-2">
                                  <p className="text-xs text-white/85 leading-relaxed">
                                    <MathText text={firstQuestion.modelAnswer} />
                                  </p>
                                  {firstQuestion.keyTermsToInclude.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                      {firstQuestion.keyTermsToInclude.map((kt) => (
                                        <span
                                          key={kt}
                                          className="px-2 py-0.5 rounded-md bg-black/50 border border-cyan-400/30 text-[10px] font-mono text-cyan-200"
                                        >
                                          ✓ {kt}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Bento Cell 4: Common Misconceptions & Exam Traps */}
                    <div className="md:col-span-5 rounded-2xl bg-amber-500/[0.04] border border-amber-400/20 p-4 sm:p-5 space-y-2.5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Student Pitfall &amp; Exam Trap</span>
                        </div>

                        {primaryTrap ? (
                          <div className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                            <span className="font-mono text-[10px] uppercase text-amber-400 font-bold block mb-1">
                              Exam Pitfall:
                            </span>
                            {primaryTrap}
                          </div>
                        ) : null}

                        {topic.analysis?.commonMisconceptions?.[0] && (
                          <div className="pt-2 border-t border-amber-400/15 text-xs text-white/75 flex items-start gap-2">
                            <span className="text-rose-400 font-bold shrink-0">×</span>
                            <span>{topic.analysis.commonMisconceptions[0]}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 text-[10px] font-mono text-amber-300/75 flex items-center justify-between border-t border-amber-400/10">
                        <span>Command: {topic.examBlueprint?.commandTerm ?? "Explain"}</span>
                        <span>Paper 1 &amp; 2 Nuance</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MODE 2: ACTIVE RECALL FLASHCARDS */}
      {activeMode === "flashcards" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {filteredCards.length === 0 ? (
            <div className="liquid-glass-card rounded-3xl p-12 text-center text-white/50 text-sm">
              No flashcards match the selected theme / level filter.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/35 text-xs font-mono font-bold text-emerald-300">
                    {currentCard.topicCode}
                  </span>
                  {currentCard.isHLOnly && (
                    <span className="px-2 py-0.5 rounded-lg bg-lime-500/20 border border-lime-400/35 text-[10px] font-mono text-lime-300">
                      HL ONLY
                    </span>
                  )}
                  {masteredCards[currentCard.id] && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-500/30 border border-emerald-400/50 text-[10px] font-mono text-emerald-200">
                      Mastered
                    </span>
                  )}
                </div>

                <span className="text-xs font-mono text-white/55">
                  Card {safeCardIdx + 1} of {filteredCards.length}
                </span>
              </div>

              {/* Flip Card */}
              <motion.div
                key={currentCard.id + (isFlipped ? "-back" : "-front")}
                initial={{ opacity: 0, rotateX: 6, scale: 0.98 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                transition={{ type: "spring", mass: 1, stiffness: 240, damping: 25 }}
                onClick={() => setIsFlipped((f) => !f)}
                className="liquid-glass-bento rounded-3xl p-7 sm:p-9 min-h-[300px] flex flex-col justify-between cursor-pointer select-none border border-white/12 hover:border-emerald-400/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span className="uppercase tracking-wider text-emerald-300/80">
                    {isFlipped ? "IB Model Answer & Mark Scheme" : "Recall Prompt / Concept"}
                  </span>
                  <span className="flex items-center gap-1 text-white/40">
                    <RotateCw className="w-3.5 h-3.5" />
                    Click to flip
                  </span>
                </div>

                <div className="py-6">
                  <p className="text-base sm:text-xl font-medium text-white leading-relaxed">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <span className="text-emerald-300/80 font-mono text-[11px]">
                    {isFlipped ? `Key Terminology: ${currentCard.markSchemeKey}` : "Tap anywhere to reveal marking points"}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTopic(currentCard.topicId);
                      setViewMode("focus");
                    }}
                    className="flex items-center gap-1 text-white/70 hover:text-white font-semibold cursor-pointer"
                  >
                    <span>Open {currentCard.topicCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Navigation & Mastered Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 text-xs font-medium text-white cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleMastered(currentCard.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                    masteredCards[currentCard.id]
                      ? "bg-emerald-500/25 border-emerald-400/50 text-emerald-200"
                      : "bg-white/[0.06] border-white/12 text-white/70 hover:text-white"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{masteredCards[currentCard.id] ? "Saved in Mastered" : "Mark as Mastered"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextCard}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs cursor-pointer transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
