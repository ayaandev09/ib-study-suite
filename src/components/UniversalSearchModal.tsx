"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  Flame,
  Layers,
  Compass,
  Sigma,
  Plus,
  Mic,
  AudioWaveform,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  searchUniversalSuite,
  SearchResultItem,
} from "@/lib/universalSearchEngine";
import { AppId } from "@/types/workspace";
import { MODULE_CATALOG } from "@/data/modulesMeta";
import { soundEngine } from "@/lib/soundEngine";

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const QUICK_SUGGESTIONS = [
  { label: "Chemiosmosis", query: "Explain chemiosmosis", tag: "Bio" },
  { label: "Doublethink", query: "1984 Doublethink", tag: "1984" },
  { label: "Price Elasticity", query: "Price elasticity of demand", tag: "Econ" },
  { label: "Momentum", query: "Conservation of momentum formula", tag: "Phys" },
  { label: "Break-Even", query: "Break-Even formula", tag: "Business" },
  { label: "Konjunktiv II", query: "What is Konjunktiv II in german", tag: "German" },
  { label: "Megacities", query: "Megacities demographic transition", tag: "Geo" },
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
    return <span className={`font-mono text-[#F5F5F7] ${className}`}>{math}</span>;
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
              className="text-[#F5F5F7] font-semibold mx-0.5"
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
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      setIsFilterDropdownOpen(false);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    } else {
      setQuery("");
      setActiveFilter("all");
      setSelectedIndex(0);
      setIsFilterDropdownOpen(false);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (!isOpen) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const searchResults = useMemo(() => {
    return searchUniversalSuite(query);
  }, [query]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return searchResults.items;
    return searchResults.items.filter((item) => item.appId === activeFilter);
  }, [searchResults.items, activeFilter]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, 40);
  }, [filteredItems]);

  useEffect(() => {
    setSelectedIndex(0);
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [query, activeFilter]);

  const selectedItem = visibleItems[selectedIndex] || visibleItems[0] || null;

  const handleJumpToItem = useCallback(
    (item: { appId: AppId; targetId?: string; viewMode?: string; title: string }) => {
      try {
        soundEngine.playClick();
      } catch {}
      onClose();
      launchOrActivateModule(item.appId, item.title);
      setWorkspaceView();

      requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent("ib-suite-navigate", {
            detail: {
              appId: item.appId,
              targetId: item.targetId,
              viewMode: item.viewMode,
              title: item.title,
            },
          })
        );
      });
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

  const getSubjectIcon = (appId: AppId) => {
    switch (appId) {
      case "biology":
        return <Dna className="w-4 h-4 text-white/80" />;
      case "orwell":
        return <BookOpen className="w-4 h-4 text-white/80" />;
      case "business":
        return <Briefcase className="w-4 h-4 text-white/80" />;
      case "economics":
        return <TrendingUp className="w-4 h-4 text-white/80" />;
      case "physics":
        return <Atom className="w-4 h-4 text-white/80" />;
      case "german":
        return <Languages className="w-4 h-4 text-white/80" />;
      case "geography":
        return <Globe2 className="w-4 h-4 text-white/80" />;
    }
  };

  const getItemCategoryIcon = (category: string) => {
    switch (category) {
      case "formula":
        return <Calculator className="w-3.5 h-3.5 text-white/60" />;
      case "quote":
        return <Quote className="w-3.5 h-3.5 text-white/60" />;
      case "trap":
        return <Flame className="w-3.5 h-3.5 text-white/60" />;
      case "question":
        return <Lightbulb className="w-3.5 h-3.5 text-white/60" />;
      case "glossary":
        return <BookOpen className="w-3.5 h-3.5 text-white/60" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-white/60" />;
    }
  };

  if (!isOpen) return null;

  const hasActiveQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 select-none overflow-hidden">
        {/* ===================================================================
            1. Siri-Powered High-Diffusion Frosted Glass Liquid Haze Backdrop
               backdrop-blur-[52px] bg-black/50 with Siri Apple Intelligence halo
           =================================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 siri-liquid-haze"
          onClick={onClose}
        />



        {/* Subtle Specular Sheen (Mouse-reactive) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 60%)`,
          }}
        />

        {/* ===================================================================
            2. Centered Container for Clear Optical Liquid Glass Capsule + Close Orb
               Continuous single flow, perfectly scaled with native macOS Spotlight hierarchy
           =================================================================== */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: hasActiveQuery ? -20 : 0,
          }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 34,
            mass: 0.85,
          }}
          className="relative z-10 w-full max-w-3xl flex flex-col items-center mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Two-Piece Row: Clear Capsule + Detached Close Button */}
          <div className="flex items-center justify-center gap-3 w-full">
            {/* Main Clear Optical Liquid Glass Search Pill */}
            <div className="flex-1 h-16 rounded-full siri-clear-glass-pill px-5 flex items-center gap-3.5 relative transition-all">
              {/* Left Action: Siri Apple Intelligence Orb + Filter Trigger */}
              <div className="relative flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/[0.12] border border-white/25 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    activeFilter !== "all"
                      ? "bg-white text-black border-white font-bold"
                      : "bg-white/[0.10] hover:bg-white/[0.20] border-white/20 text-white/90 hover:text-white"
                  }`}
                  title={activeFilter === "all" ? "Filter by Subject" : `Filtered: ${activeFilter}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>

                {/* Filter Dropdown Menu */}
                {isFilterDropdownOpen && (
                  <div className="absolute top-12 left-0 w-52 rounded-2xl siri-clear-results p-2 space-y-1 z-30 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter("all");
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                        activeFilter === "all"
                          ? "bg-white/15 text-white font-medium"
                          : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <span>All {enabledSubjects.length} Subjects</span>
                      {activeFilter === "all" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                    {Object.values(MODULE_CATALOG)
                      .filter((mod) => enabledSubjects.includes(mod.id))
                      .map((mod) => (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            setActiveFilter(mod.id);
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                            activeFilter === mod.id
                              ? "bg-white/15 text-white font-medium"
                              : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                          }`}
                        >
                          <span className="truncate">{mod.shortTitle}</span>
                          {activeFilter === mod.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Clean Clear Input Field */}
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Ask AI or search ${enabledSubjects.length} subjects...`}
                  className="w-full bg-transparent text-[#F5F5F7] placeholder:text-white/45 text-base sm:text-lg font-normal tracking-tight focus:outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              {/* Clear Input Button (shows when query is not empty) */}
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  title="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Right Voice & Audio Controls (Monochrome White/Silver) */}
              <div className="flex items-center gap-2.5 shrink-0 text-white/75">
                <button
                  type="button"
                  onClick={() => {
                    inputRef.current?.focus();
                  }}
                  className="p-2 rounded-full hover:bg-white/[0.10] text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Voice Input"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-white/15" />
                <button
                  type="button"
                  onClick={() => {
                    inputRef.current?.focus();
                  }}
                  className="p-2 rounded-full hover:bg-white/[0.10] text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Audio Intelligence"
                >
                  <AudioWaveform className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Detached Circular Glass Close Button (Dead-center row, immediately right of pill) */}
            <button
              type="button"
              onClick={onClose}
              className="w-16 h-16 shrink-0 rounded-full siri-clear-close-orb flex items-center justify-center text-white/85 hover:text-white transition-all cursor-pointer active:scale-95 group"
              title="Close (ESC)"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform text-white/90" />
            </button>
          </div>

          {/* =================================================================
              3. Centered Idle State: Suggested Topics
             ================================================================= */}
          {!hasActiveQuery && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="w-full mt-3.5 rounded-3xl siri-clear-results p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white/70" />
                  Suggested Topics
                </span>
                <span className="text-[10px] font-mono text-[#8E8E93]">
                  Instant Jump
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(item.query);
                      inputRef.current?.focus();
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs text-[#F5F5F7] transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-[#8E8E93] border border-white/10">
                      {item.tag}
                    </span>
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>

              <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8E8E93] px-1">
                <span>↑ / ↓ Navigate</span>
                <span>↵ Open</span>
                <span>ESC Dismiss</span>
              </div>
            </motion.div>
          )}

          {/* =================================================================
              4. Continuous Single-Panel Search Results (No Double Panel)
             ================================================================= */}
          {hasActiveQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full mt-3.5 rounded-3xl siri-clear-results overflow-hidden flex flex-col max-h-[72vh] shadow-[0_32px_80px_rgba(0,0,0,0.85)]"
            >
              {/* Subject Scope Filter Chips */}
              <div className="px-5 py-3 border-b border-white/[0.08] bg-black/40 flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeFilter === "all"
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "text-[#8E8E93] hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    All Subjects
                    <span className="text-[10px] opacity-75 font-mono ml-1.5">
                      ({searchResults.items.length})
                    </span>
                  </button>

                  {Object.values(MODULE_CATALOG)
                    .filter((mod) => enabledSubjects.includes(mod.id))
                    .map((mod) => {
                      const count = searchResults.items.filter((i) => i.appId === mod.id).length;
                      const isActive = activeFilter === mod.id;

                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setActiveFilter(mod.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isActive
                              ? "bg-white/20 text-white font-semibold border border-white/30"
                              : "text-[#8E8E93] hover:text-white hover:bg-white/[0.06] border border-transparent"
                          }`}
                        >
                          <span>{mod.shortTitle}</span>
                          <span className="text-[10px] opacity-60 font-mono">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                </div>

                <div className="hidden sm:flex items-center text-[11px] text-[#8E8E93] font-mono">
                  {filteredItems.length} {filteredItems.length === 1 ? "match" : "matches"}
                </div>
              </div>

              {/* Continuous Single Flow List */}
              <div
                ref={listContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3"
              >
                {/* 1. Integrated AI Curriculum Synthesis Card at Top of Flow */}
                {searchResults.aiAnswer && (
                  <div
                    onClick={() => {
                      if (searchResults.aiAnswer) {
                        handleJumpToItem({
                          appId: searchResults.aiAnswer.subjectId,
                          targetId: searchResults.aiAnswer.targetId,
                          viewMode: searchResults.aiAnswer.viewMode,
                          title: searchResults.aiAnswer.title,
                        });
                      }
                    }}
                    className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.05] border border-white/25 transition-all cursor-pointer shadow-xl space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-white/[0.12] border border-white/25 flex items-center justify-center shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Curriculum Synthesis
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-white/80 border border-white/15">
                          {MODULE_CATALOG[searchResults.aiAnswer.subjectId]?.shortTitle || searchResults.aiAnswer.subjectId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#8E8E93] group-hover:text-white transition-colors">
                          Press ↵ to open
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white leading-snug">
                      {searchResults.aiAnswer.title}
                    </h3>

                    <div className="text-xs sm:text-sm text-white/85 leading-relaxed bg-black/40 rounded-xl p-3.5 border border-white/10">
                      <RichInlineText text={searchResults.aiAnswer.summary} />
                    </div>

                    {searchResults.aiAnswer.keyFormula && (
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <KatexFormula math={searchResults.aiAnswer.keyFormula} block />
                      </div>
                    )}

                    {searchResults.aiAnswer.examTip && (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white/90">
                        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-200">Exam Insight: </strong>
                          <RichInlineText text={searchResults.aiAnswer.examTip} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Empty Match Fallback */}
                {visibleItems.length === 0 && !searchResults.aiAnswer && (
                  <div className="py-16 text-center text-[#8E8E93] text-xs space-y-2 p-4">
                    <p className="font-semibold text-white/80 text-sm">
                      No matches found for &ldquo;{query}&rdquo;
                    </p>
                    <p>Try searching for a syllabus code, formula, or concept across the 7 subjects.</p>
                  </div>
                )}

                {/* Results Section Divider */}
                {visibleItems.length > 0 && (
                  <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-[#8E8E93]">
                    <span className="uppercase tracking-wider">Coursework Results</span>
                    <span>{visibleItems.length} of {filteredItems.length} shown</span>
                  </div>
                )}

                {/* 2. Unified Results Cards List */}
                {visibleItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleJumpToItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex flex-col gap-2.5 p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-white/[0.12] border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_20px_rgba(0,0,0,0.6)]"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 rounded-xl border border-white/12 bg-white/[0.05] shrink-0 text-white/90">
                            {getSubjectIcon(item.appId)}
                          </div>
                          <div className="flex items-center gap-2 truncate">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/[0.10] border border-white/15 text-white shrink-0">
                              {item.badge}
                            </span>
                            <span className="text-xs text-[#8E8E93] font-mono truncate">
                              {item.subjectTitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isSelected && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-white/80">
                              <span>Open</span>
                              <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px]">↵</kbd>
                            </span>
                          )}
                          <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-white/30"}`} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#F5F5F7] group-hover:text-white">
                          {item.title}
                        </div>
                        <p className="text-xs text-[#8E8E93] leading-relaxed line-clamp-2">
                          <RichInlineText text={item.snippet} />
                        </p>
                      </div>

                      {/* Formula preview inline if present */}
                      {item.formulaLatex && (
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center my-0.5">
                          <KatexFormula math={item.formulaLatex} block className="text-sm text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Keyboard Navigation Bar */}
              <div className="px-5 py-3 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-[11px] font-mono text-[#8E8E93] shrink-0">
                <div className="flex items-center gap-4">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">↓</kbd> Select</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">↵</kbd> Open in Module</span>
                </div>
                <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> Close</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default UniversalSearchModal;
