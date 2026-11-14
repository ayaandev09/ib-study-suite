"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, useDeferredValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import katex from "katex";
import {
  Search,
  Sparkles,
  X,
  ArrowRight,
  BookOpen,
  Atom,
  TrendingUp,
  Briefcase,
  Languages,
  Dna,
  Globe2,
  Quote,
  Calculator,
  Lightbulb,
  CornerDownLeft,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  searchUniversalSuite,
  AIAnswerResult,
} from "@/lib/universalSearchEngine";
import { AppId } from "@/types/workspace";
import { MODULE_CATALOG } from "@/data/modulesMeta";

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const EXAMPLE_PROMPTS = [
  "Explain chemiosmosis",
  "Compare mitosis and meiosis",
  "Unit 5.1 Business Management",
  "Why does Winston buy the paperweight",
  "Price elasticity of demand formula",
  "Conservation of momentum formula",
  "What is Konjunktiv II in German",
];

function sanitizeLatexForSearch(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/[\x0c\u000c]rac/gi, "\\frac")
    .replace(/[\x09\u0009]ext/gi, "\\text")
    .replace(/[\x00-\x1f]/g, " ")
    .trim();
}

function KatexFormula({
  math,
  block = false,
  className = "",
}: {
  math: string;
  block?: boolean;
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(sanitizeLatexForSearch(math), {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return "";
    }
  }, [math, block]);

  if (!html) {
    return <span className={`font-mono text-cyan-200 ${className}`}>{math}</span>;
  }

  return (
    <span
      className={`katex-formula-wrapper inline-block max-w-full overflow-x-auto align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function RichInlineText({ text }: { text: string }) {
  if (!text) return null;
  // Split on $...$ inline math first, then **bold** and *italic*
  const mathParts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {mathParts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return (
            <KatexFormula
              key={i}
              math={part.slice(1, -1)}
              className="text-cyan-200 mx-0.5"
            />
          );
        }
        const mdParts = part.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
        return (
          <React.Fragment key={i}>
            {mdParts.map((sub, j) => {
              if (sub.startsWith("**") && sub.endsWith("**") && sub.length > 4) {
                return (
                  <strong key={j} className="font-semibold text-white">
                    {sub.slice(2, -2)}
                  </strong>
                );
              }
              if (sub.startsWith("*") && sub.endsWith("*") && sub.length > 2) {
                return (
                  <em key={j} className="italic text-white/95">
                    {sub.slice(1, -1)}
                  </em>
                );
              }
              return <React.Fragment key={j}>{sub}</React.Fragment>;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function UniversalSearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: UniversalSearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<"all" | AppId>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { launchOrActivateModule, setWorkspaceView, enabledSubjects } = useWorkspaceStore();

  useEffect(() => {
    if (activeFilter !== "all" && !enabledSubjects.includes(activeFilter)) {
      setActiveFilter("all");
    }
  }, [activeFilter, enabledSubjects]);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 40);
    }
  }, [isOpen, initialQuery]);

  // Defer expensive search & synthesis so input typing stays 100% synchronous at 120fps
  const deferredQuery = useDeferredValue(query);

  // Compute Search Results & AI Synthesis (restricted to enabled subjects)
  const searchResults = useMemo(() => {
    const raw = searchUniversalSuite(deferredQuery);
    const items = raw.items.filter((item) =>
      enabledSubjects.includes(item.appId)
    );
    const aiAnswer =
      raw.aiAnswer && enabledSubjects.includes(raw.aiAnswer.subjectId)
        ? raw.aiAnswer
        : null;
    return { ...raw, items, aiAnswer };
  }, [deferredQuery, enabledSubjects]);

  // Filter items by subject tab & cap rendered rows for instant WKWebView scrolling
  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return searchResults.items;
    return searchResults.items.filter((item) => item.appId === activeFilter);
  }, [searchResults.items, activeFilter]);

  const MAX_RENDERED_RESULTS = 40;
  const visibleItems = useMemo(
    () => filteredItems.slice(0, MAX_RENDERED_RESULTS),
    [filteredItems]
  );

  // Reset selection when query or filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [deferredQuery, activeFilter]);

  // Jump to specific item in subject module
  const handleJumpToItem = useCallback(
    (item: {
      appId: AppId;
      targetId: string;
      viewMode?: string;
      title?: string;
    }) => {
      launchOrActivateModule(item.appId, item.title);
      setWorkspaceView();

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("ib-suite-navigate", {
            detail: {
              appId: item.appId,
              targetId: item.targetId,
              viewMode: item.viewMode || "focus",
            },
          })
        );
      }

      onClose();
    },
    [launchOrActivateModule, setWorkspaceView, onClose]
  );

  // Global Keyboard Navigation (Esc, ArrowUp, ArrowDown, Enter)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.min(prev + 1, Math.max(0, visibleItems.length - 1));
          itemRefs.current[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          return next;
        });
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          itemRefs.current[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          return next;
        });
        return;
      }

      if (e.key === "Enter") {
        const target = visibleItems[selectedIndex];
        if (target) {
          e.preventDefault();
          handleJumpToItem(target);
        } else if (searchResults.aiAnswer) {
          e.preventDefault();
          handleJumpToItem({
            appId: searchResults.aiAnswer.subjectId,
            targetId: searchResults.aiAnswer.targetId,
            viewMode: searchResults.aiAnswer.viewMode,
            title: searchResults.aiAnswer.title,
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, visibleItems, selectedIndex, handleJumpToItem, searchResults.aiAnswer]);

  const getSubjectColor = (appId: AppId) => {
    switch (appId) {
      case "biology":
        return "#22c55e";
      case "orwell":
        return "#f43f5e";
      case "business":
        return "#2563eb";
      case "economics":
        return "#0ea5e9";
      case "physics":
        return "#6366f1";
      case "german":
        return "#d946ef";
      case "geography":
        return "#14b8a6";
      default:
        return "#ffffff";
    }
  };

  const getSubjectIcon = (appId: AppId) => {
    switch (appId) {
      case "biology":
        return <Dna className="w-4 h-4 text-green-400" />;
      case "orwell":
        return <BookOpen className="w-4 h-4 text-rose-400" />;
      case "business":
        return <Briefcase className="w-4 h-4 text-blue-400" />;
      case "economics":
        return <TrendingUp className="w-4 h-4 text-sky-400" />;
      case "physics":
        return <Atom className="w-4 h-4 text-indigo-400" />;
      case "german":
        return <Languages className="w-4 h-4 text-fuchsia-400" />;
      case "geography":
        return <Globe2 className="w-4 h-4 text-teal-400" />;
    }
  };

  if (!isOpen) return null;

  const aiAccent = searchResults.aiAnswer
    ? getSubjectColor(searchResults.aiAnswer.subjectId)
    : "#38bdf8";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-14 px-4 bg-black/75">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Spotlight Liquid Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -12 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[84vh] flex flex-col rounded-[28px] border border-white/[0.16] bg-[#0b0d12]/95 backdrop-blur-md shadow-[0_32px_100px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.16)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* =================================================================
              1. Spotlight Omnibar Input
              ================================================================= */}
          <div className="flex items-center gap-3.5 px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/[0.12] flex items-center justify-center shrink-0">
              <Search className="w-4 h-4 text-white/85" />
            </div>

            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask local IB AI anything — explain, compare, formulas, quotes, or units..."
                className="w-full bg-transparent text-base sm:text-[17px] text-white placeholder-white/35 focus:outline-none font-sans tracking-[-0.01em]"
              />
            </div>

            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/45 hover:text-white transition-colors"
                title="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-[11px] font-mono text-white/45">
              <kbd>Esc</kbd>
            </div>
          </div>

          {/* =================================================================
              2. Cleanly Wrapped Example Prompt Chips (Zero Clipping)
              ================================================================= */}
          {!query && (
            <div className="px-6 py-3 border-b border-white/[0.06] bg-white/[0.015] flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mr-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Try Asking
              </span>
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setQuery(prompt)}
                  className="px-3 py-1 rounded-full text-xs font-sans text-white/75 hover:text-white bg-white/[0.05] hover:bg-white/[0.11] border border-white/[0.09] hover:border-white/20 transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* =================================================================
              3. Subject Filter Pills (Accurate Counts, Clean Wrapping)
              ================================================================= */}
          <div className="px-6 py-2.5 border-b border-white/[0.08] bg-black/25 flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-white/15 text-white border border-white/25 shadow-[0_0_14px_rgba(255,255,255,0.12)]"
                  : "text-white/50 hover:text-white hover:bg-white/[0.06] border border-transparent"
              }`}
            >
              All Subjects{" "}
              <span className="text-[11px] opacity-65 font-mono ml-0.5">
                ({searchResults.items.length})
              </span>
            </button>

            {Object.values(MODULE_CATALOG)
              .filter((mod) => enabledSubjects.includes(mod.id))
              .map((mod) => {
              const count = searchResults.items.filter(
                (i) => i.appId === mod.id
              ).length;
              const isActive = activeFilter === mod.id;
              const color = getSubjectColor(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveFilter(mod.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/15 text-white border border-white/25"
                      : "text-white/55 hover:text-white hover:bg-white/[0.06] border border-transparent"
                  }`}
                  style={
                    isActive
                      ? {
                          borderColor: `${color}55`,
                          backgroundColor: `${color}1a`,
                          boxShadow: `0 0 14px ${color}22`,
                        }
                      : undefined
                  }
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span>{mod.shortTitle}</span>
                  <span className="text-[10px] opacity-55 font-mono">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* =================================================================
              4. Scrollable Content Area: AI Answer + Search Matches
              ================================================================= */}
          <div
            className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
            style={{ contain: "content" }}
          >
            {/* -------------------------------------------------------------
                A. LOCAL AI SYNTHESIZED ANSWER CARD
                ------------------------------------------------------------- */}
            {searchResults.aiAnswer && (
              <motion.div
                key={searchResults.aiAnswer.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-5 sm:p-6 border border-white/[0.14] relative overflow-hidden space-y-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                style={{
                  background: `radial-gradient(100% 100% at 0% 0%, ${aiAccent}14, transparent 60%), linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(12,13,18,0.85) 100%)`,
                }}
              >
                {/* AI Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-white/[0.08] pb-3.5">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        borderColor: `${aiAccent}45`,
                        backgroundColor: `${aiAccent}18`,
                        color: aiAccent,
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-white/70 font-mono tracking-wide uppercase">
                          {searchResults.aiAnswer.badge}
                        </span>
                        {searchResults.aiAnswer.confidenceLabel && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                            style={{
                              borderColor: `${aiAccent}40`,
                              backgroundColor: `${aiAccent}15`,
                              color: aiAccent,
                            }}
                          >
                            {searchResults.aiAnswer.confidenceLabel}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {searchResults.aiAnswer.title}
                      </h3>
                      <p className="text-xs text-white/50">
                        {searchResults.aiAnswer.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Synthesized Explanation */}
                <div className="text-[13.5px] sm:text-sm text-white/90 leading-relaxed font-sans bg-black/30 rounded-xl p-4 border border-white/[0.08]">
                  <p>
                    <RichInlineText text={searchResults.aiAnswer.summary} />
                  </p>
                </div>

                {/* KaTeX Formula Card */}
                {searchResults.aiAnswer.keyFormula && (
                  <div className="p-3.5 rounded-xl bg-white/[0.035] border border-white/[0.09] space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-white/45 font-semibold flex items-center gap-1.5 font-mono">
                      <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                      Key Formulation
                    </span>
                    <div className="text-cyan-200 py-1 overflow-x-auto">
                      <KatexFormula math={searchResults.aiAnswer.keyFormula} block={false} className="text-sm sm:text-base" />
                    </div>
                  </div>
                )}

                {/* Key Quotes (1984 / German Literature) */}
                {searchResults.aiAnswer.keyQuotes &&
                  searchResults.aiAnswer.keyQuotes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/45 font-semibold flex items-center gap-1.5 font-mono">
                        <Quote className="w-3.5 h-3.5 text-cyan-400" />
                        Textual Evidence & Quotes
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {searchResults.aiAnswer.keyQuotes.map((q, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white/[0.035] border border-white/[0.08] space-y-1.5"
                          >
                            <p className="text-xs italic text-white/90 leading-relaxed">
                              &ldquo;{q.quote}&rdquo;
                            </p>
                            <div className="text-[10px] text-white/45 font-mono flex items-center justify-between gap-2">
                              <span className="truncate">{q.speaker}</span>
                              <span className="truncate opacity-75">{q.context}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Key Takeaways */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/45 font-semibold font-mono">
                    Key Syllabus Takeaways
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.aiAnswer.highlights.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/80 leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: aiAccent }}
                        />
                        <span>
                          <RichInlineText text={bullet} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IB Exam / Mark Scheme Tip */}
                {searchResults.aiAnswer.examTip && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/[0.07] border border-amber-400/20 text-xs text-amber-100/90 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300 mr-1.5">
                        IB Exam Tip:
                      </span>
                      <span>
                        <RichInlineText text={searchResults.aiAnswer.examTip} />
                      </span>
                    </div>
                  </div>
                )}

                {/* Follow-up Questions + Jump-to-Source Actions */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/[0.08]">
                  {searchResults.aiAnswer.followUpQuestions &&
                    searchResults.aiAnswer.followUpQuestions.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/35 mr-1">
                          Follow-up:
                        </span>
                        {searchResults.aiAnswer.followUpQuestions.map((fq) => (
                          <button
                            key={fq}
                            onClick={() => setQuery(fq)}
                            className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.09] text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer"
                          >
                            {fq}
                          </button>
                        ))}
                      </div>
                    )}

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {searchResults.aiAnswer.relatedSources &&
                      searchResults.aiAnswer.relatedSources.length > 1 &&
                      searchResults.aiAnswer.relatedSources.slice(1, 2).map((src) => (
                        <button
                          key={src.targetId}
                          onClick={() =>
                            handleJumpToItem({
                              appId: src.appId,
                              targetId: src.targetId,
                              viewMode: src.viewMode,
                              title: src.label,
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.12] text-white/85 text-xs font-medium transition-all cursor-pointer max-w-[200px] truncate"
                        >
                          {src.label}
                        </button>
                      ))}

                    <button
                      onClick={() =>
                        handleJumpToItem({
                          appId: searchResults.aiAnswer!.subjectId,
                          targetId: searchResults.aiAnswer!.targetId,
                          viewMode: searchResults.aiAnswer!.viewMode,
                          title: searchResults.aiAnswer!.title,
                        })
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(255,255,255,0.18)] cursor-pointer"
                    >
                      <span>{searchResults.aiAnswer.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* -------------------------------------------------------------
                B. MATCHING SEARCH RESULTS LIST
                ------------------------------------------------------------- */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-white/40 font-mono px-1">
                <span>
                  {query
                    ? `Matching Notes & Concepts (${filteredItems.length})`
                    : "Curated Across All 6 IB Modules"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <span>↑↓ Navigate</span>
                  <span>·</span>
                  <span>↵ Open</span>
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-white/45 text-sm space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.015]">
                  <p>
                    No matching topics or notes found for &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-xs text-white/30">
                    Try asking a question (e.g. &ldquo;explain chemiosmosis&rdquo;), a unit
                    (&ldquo;unit 5.1&rdquo;), or a concept (&ldquo;Konjunktiv II&rdquo;).
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {visibleItems.map((item, idx) => {
                    const color = getSubjectColor(item.appId);
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => handleJumpToItem(item)}
                        className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? "bg-white/[0.09] border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                            : "bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.07] hover:border-white/[0.16]"
                        }`}
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div
                            className="p-2 rounded-xl border shrink-0 mt-0.5"
                            style={{
                              borderColor: `${color}30`,
                              backgroundColor: `${color}12`,
                            }}
                          >
                            {getSubjectIcon(item.appId)}
                          </div>

                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border"
                                style={{
                                  borderColor: `${color}40`,
                                  backgroundColor: `${color}14`,
                                  color: color,
                                }}
                              >
                                {item.badge}
                              </span>
                              <span className="text-[11px] text-white/40 font-mono truncate">
                                {item.subjectTitle}
                              </span>
                            </div>

                            <h4 className="text-sm font-semibold text-white group-hover:text-white transition-colors truncate">
                              {item.title}
                            </h4>

                            <p className="text-xs text-white/55 line-clamp-2 leading-relaxed">
                              {item.snippet}
                            </p>

                            {item.formulaLatex && (
                              <div className="text-xs text-cyan-300 pt-0.5 overflow-x-auto">
                                <KatexFormula math={item.formulaLatex} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`flex items-center gap-1.5 transition-colors self-end sm:self-center shrink-0 ${
                            isSelected
                              ? "text-white"
                              : "text-white/35 group-hover:text-white/80"
                          }`}
                        >
                          {isSelected ? (
                            <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
                          ) : (
                            <span className="text-xs font-mono hidden sm:inline">
                              Open
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
