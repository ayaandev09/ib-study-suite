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
  Flame,
  CheckCircle2,
  ExternalLink,
  Layers,
  Compass,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  searchUniversalSuite,
  AIAnswerResult,
  SearchResultItem,
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
  "Price elasticity of demand formula",
  "Conservation of momentum formula",
  "Why does Winston buy the paperweight",
  "What is Konjunktiv II in German",
  "Unit 5.1 Business Management",
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
  const listContainerRef = useRef<HTMLDivElement>(null);

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

  const deferredQuery = useDeferredValue(query);

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

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return searchResults.items;
    return searchResults.items.filter((item) => item.appId === activeFilter);
  }, [searchResults.items, activeFilter]);

  const MAX_RENDERED_RESULTS = 50;
  const visibleItems = useMemo(
    () => filteredItems.slice(0, MAX_RENDERED_RESULTS),
    [filteredItems]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [deferredQuery, activeFilter]);

  const selectedItem: SearchResultItem | undefined = visibleItems[selectedIndex];

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
          return next;
        });
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
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
        return <Dna className="w-4 h-4 text-emerald-400" />;
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

  const getItemCategoryIcon = (category: string) => {
    switch (category) {
      case "formula":
        return <Calculator className="w-3.5 h-3.5 text-cyan-400" />;
      case "quote":
        return <Quote className="w-3.5 h-3.5 text-rose-400" />;
      case "trap":
        return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case "question":
        return <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />;
      case "glossary":
        return <BookOpen className="w-3.5 h-3.5 text-teal-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-white/60" />;
    }
  };

  if (!isOpen) return null;

  const activeColor = selectedItem ? getSubjectColor(selectedItem.appId) : "#38bdf8";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-12 px-4 bg-black/80 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Spotlight Liquid Glass Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl h-[86vh] flex flex-col rounded-[32px] border border-white/20 bg-[#090b10]/95 backdrop-blur-3xl shadow-[0_32px_120px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* =================================================================
              1. Spotlight Omnibar Header
              ================================================================= */}
          <div className="flex items-center gap-3.5 px-6 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <Search className="w-4 h-4 text-cyan-300" />
            </div>

            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask local IB AI anything — explain, compare, formulas, quotes, or syllabus units..."
                className="w-full bg-transparent text-base sm:text-lg font-medium text-white placeholder-white/35 focus:outline-none font-sans tracking-tight"
              />
            </div>

            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/45 hover:text-white transition-colors cursor-pointer"
                title="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-[11px] font-mono text-white/45">
              <kbd>Esc</kbd>
            </div>
          </div>

          {/* =================================================================
              2. Filter Strip & Subject Pills
              ================================================================= */}
          <div className="px-6 py-2.5 border-b border-white/8 bg-black/30 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-white text-black shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/[0.07]"
                }`}
              >
                All Subjects
                <span className="text-[10px] opacity-75 font-mono ml-1">
                  ({searchResults.items.length})
                </span>
              </button>

              {Object.values(MODULE_CATALOG)
                .filter((mod) => enabledSubjects.includes(mod.id))
                .map((mod) => {
                  const count = searchResults.items.filter((i) => i.appId === mod.id).length;
                  const isActive = activeFilter === mod.id;
                  const color = getSubjectColor(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveFilter(mod.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? "bg-white/15 text-white border border-white/30"
                          : "text-white/55 hover:text-white hover:bg-white/[0.06] border border-transparent"
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: `${color}60`,
                              backgroundColor: `${color}20`,
                              boxShadow: `0 0 16px ${color}25`,
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

            <div className="hidden lg:flex items-center gap-3 text-[11px] text-white/40 font-mono">
              <span>↑↓ Navigate</span>
              <span>·</span>
              <span>↵ Open</span>
            </div>
          </div>

          {/* =================================================================
              3. Main Search Canvas: Two-Pane Split View
              ================================================================= */}
          <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
            {/* Left Pane: Result List */}
            <div
              ref={listContainerRef}
              className="w-full md:w-[45%] border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto p-3 space-y-1.5 shrink-0"
            >
              {!query && (
                <div className="p-3 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Popular High-Yield Prompts</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {EXAMPLE_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => setQuery(prompt)}
                        className="text-left px-3.5 py-2 rounded-xl text-xs text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/8 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && visibleItems.length === 0 && (
                <div className="py-16 text-center text-white/40 text-xs space-y-2 p-4">
                  <p className="font-semibold text-white/60">No matches found for &ldquo;{query}&rdquo;</p>
                  <p>Try searching by topic code, syllabus keyword, or formula symbol.</p>
                </div>
              )}

              {visibleItems.map((item, idx) => {
                const color = getSubjectColor(item.appId);
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => handleJumpToItem(item)}
                    className={`flex items-center justify-between gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-white/[0.12] border-white/25 shadow-lg text-white"
                        : "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] text-white/80"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className="p-1.5 rounded-lg border shrink-0 mt-0.5"
                        style={{
                          borderColor: `${color}35`,
                          backgroundColor: `${color}15`,
                        }}
                      >
                        {getSubjectIcon(item.appId)}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-1.5 py-0.2 rounded text-[9.5px] font-mono font-semibold"
                            style={{
                              backgroundColor: `${color}20`,
                              color: color,
                            }}
                          >
                            {item.badge}
                          </span>
                          <span className="text-[10px] text-white/45 font-mono truncate">
                            {item.subjectTitle}
                          </span>
                        </div>

                        <div className="text-xs font-semibold truncate text-white">
                          {item.title}
                        </div>

                        <p className="text-[11px] text-white/50 line-clamp-1 leading-snug">
                          {item.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isSelected && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Pane: Live Intelligence Inspector Preview */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between bg-black/20">
              {/* If Local AI Synthesis is Available */}
              {searchResults.aiAnswer ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-transparent space-y-3.5 shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Local AI Curriculum Synthesis</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {searchResults.aiAnswer.title}
                    </h3>

                    <div className="text-xs sm:text-sm text-white/85 leading-relaxed bg-black/40 rounded-xl p-3.5 border border-white/8">
                      <RichInlineText text={searchResults.aiAnswer.summary} />
                    </div>

                    {searchResults.aiAnswer.keyFormula && (
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <KatexFormula math={searchResults.aiAnswer.keyFormula} block />
                      </div>
                    )}

                    {searchResults.aiAnswer.examTip && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200">
                        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300">Exam Trap: </strong>
                          <RichInlineText text={searchResults.aiAnswer.examTip} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : selectedItem ? (
                /* Selected Item Detailed Inspector */
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold"
                        style={{
                          backgroundColor: `${activeColor}25`,
                          color: activeColor,
                          border: `1px solid ${activeColor}40`,
                        }}
                      >
                        {selectedItem.badge}
                      </span>
                      <span className="text-xs font-mono text-white/50">
                        {selectedItem.subjectTitle}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Formula Display if Available */}
                  {selectedItem.formulaLatex && (
                    <div className="p-5 rounded-2xl bg-black/60 border border-white/15 text-center shadow-inner">
                      <KatexFormula math={selectedItem.formulaLatex} block className="text-lg text-cyan-200" />
                    </div>
                  )}

                  {/* Text Snippet / Definition / Explanation */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white/85 leading-relaxed">
                    <RichInlineText text={selectedItem.snippet} />
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-white/35 space-y-2">
                  <Compass className="w-8 h-8 mx-auto text-white/20" />
                  <p className="text-xs font-mono">Select any search result to inspect details</p>
                </div>
              )}

              {/* Bottom Jump Button */}
              {selectedItem && (
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-white/40">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70">↵</kbd> to open directly
                  </div>
                  <button
                    onClick={() => handleJumpToItem(selectedItem)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-white/90 text-black font-bold text-xs transition-all shadow-[0_0_24px_rgba(255,255,255,0.25)] cursor-pointer active:scale-95"
                  >
                    <span>Open in {selectedItem.subjectTitle}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
