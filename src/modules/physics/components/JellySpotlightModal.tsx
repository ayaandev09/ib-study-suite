"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Calculator,
  Crown,
  Sparkles,
  Flame,
  CornerDownLeft,
  Filter,
  Atom,
} from "lucide-react";
import { searchPhysicsCodex, SearchFilterTab, SearchResultItem } from "@/modules/physics/lib/searchEngine";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";

interface JellySpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURED_QUICK_JUMPS = [
  { id: "top-a1", code: "A.1", title: "Kinematics & SUVAT", tag: "Mechanics" },
  { id: "top-a2", code: "A.2", title: "Forces & Newton's Laws", tag: "Dynamics" },
  { id: "top-b1", code: "B.1", title: "Thermal Energy Transfers", tag: "Thermal" },
  { id: "top-c1", code: "C.1", title: "Simple Harmonic Motion", tag: "Waves" },
  { id: "top-c3", code: "C.3", title: "Wave Interference & Slits", tag: "Optics" },
  { id: "top-d1", code: "D.1", title: "Gravitational Fields", tag: "Fields" },
  { id: "top-d2", code: "D.2", title: "Electric Fields & Circuits", tag: "Electricity" },
  { id: "top-e1", code: "E.1", title: "Nuclear Models & Decay", tag: "Quantum" },
];

export const JellySpotlightModal: React.FC<JellySpotlightModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchFilterTab>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const { setActiveTopic, setViewMode } = useStudyStore();

  const results = useMemo(() => {
    return searchPhysicsCodex(query, activeTab);
  }, [query, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setActiveTab("all");
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const handleSelect = (topicId: string) => {
    setActiveTopic(topicId);
    setViewMode("focus");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev + 1) % results.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex].id);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl p-5 border border-cyan-400/40 bg-[#060402]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(8,145,178,0.25)] text-white overflow-hidden relative jelly-spotlight-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Search Input Bar */}
        <div className="relative flex items-center gap-3 pb-4 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search formulas, SUVAT, Kepler, Doppler, photoelectric, or Topic code (e.g. A.1)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline px-2 py-0.5 rounded text-xs font-mono bg-white/10 text-slate-400">
              ESC
            </span>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 py-3 border-b border-white/5 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab("formulas")}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "formulas"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Formulas
          </button>
          <button
            onClick={() => setActiveTab("concepts")}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "concepts"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Concepts
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "cases"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Case Studies
          </button>
          <button
            onClick={() => setActiveTab("topics")}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activeTab === "topics"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Topics
          </button>
        </div>

        {/* Results Container */}
        <div
          ref={resultsContainerRef}
          className="max-h-80 overflow-y-auto py-2 space-y-1.5 subtle-scrollbar"
        >
          {query.trim() === "" ? (
            <div className="py-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Featured Core Topics
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FEATURED_QUICK_JUMPS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 text-left transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold mr-1.5">
                        {item.code}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => handleSelect(item.id)}
                className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  idx === selectedIndex
                    ? "bg-cyan-500/20 border border-cyan-400/50 shadow-md"
                    : "bg-white/[0.02] hover:bg-white/[0.06] border border-white/5"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {item.displayCode}
                    </span>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      {item.matchCategory}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      {item.themeTitle}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-1 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400">
              <p className="text-xs mb-1">
                No physics concepts or formulas found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs text-slate-400">
                Try searching for &ldquo;SUVAT&rdquo;, &ldquo;Kepler&rdquo;, &ldquo;Doppler&rdquo;, or &ldquo;E=mc2&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">↑</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">↓</span> Navigate
            </span>
            <span className="flex items-center gap-1 font-mono">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">↵</span> Open
            </span>
          </div>
          <span className="font-mono text-cyan-400 font-bold">
            IB Physics SL / HL Codex
          </span>
        </div>
      </div>
    </div>
  );
};
