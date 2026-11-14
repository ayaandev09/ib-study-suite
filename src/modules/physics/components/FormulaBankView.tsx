"use client";

import React, { useState, useMemo } from "react";
import { FORMULA_BANK, SYLLABUS_THEMES, ThemeId } from "@/modules/physics/data";
import { useStudyStore } from "@/modules/physics/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { MathText, formatUnit } from "./MathText";
import {
  Calculator,
  Search,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";

export const FormulaBankView: React.FC = () => {
  const { bookmarkedFormulas, toggleFormulaBookmark } = useStudyStore();
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<"all" | ThemeId>("all");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const filteredFormulas = useMemo(() => {
    return FORMULA_BANK.filter((f) => {
      if (selectedTheme !== "all" && f.themeId !== selectedTheme) return false;
      if (onlyBookmarked && !bookmarkedFormulas[f.id]) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesLatex = f.latex.toLowerCase().includes(q);
        const matchesTopic = f.topicCode.toLowerCase().includes(q);
        const matchesVar = f.variables.some(
          (v) =>
            v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q)
        );
        return matchesName || matchesLatex || matchesTopic || matchesVar;
      }
      return true;
    });
  }, [search, selectedTheme, onlyBookmarked, bookmarkedFormulas]);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Calculator className="w-4 h-4" />
          <span>Official IB Physics Data Booklet Suite</span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2 tracking-[-0.01em]">
          Formula Bank & Mathematical Foundations
        </h1>
        <p className="font-sans text-[15px] text-slate-300 max-w-2xl leading-[1.65]">
          Exhaustive equation bank featuring KaTeX-typeset formulas from the official IB Physics Data Booklet. Each formula includes exact variable definitions, SI units, physical boundary conditions, and high-yield calculation tips.
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search formulas by name, symbol (e.g. SUVAT, drift, pV, Doppler, Lorentz)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/70 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold cursor-pointer transition-all ${
              onlyBookmarked
                ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25"
                : "bg-slate-900/80 text-slate-300 border border-white/10 hover:bg-slate-800"
            }`}
          >
            {onlyBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4 text-cyan-400" />
            )}
            <span>Bookmarked Only</span>
          </button>
        </div>

        {/* Theme Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={() => setSelectedTheme("all")}
            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              selectedTheme === "all"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            All Themes ({FORMULA_BANK.length})
          </button>
          {SYLLABUS_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              Theme {theme.code.replace("THEME ", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFormulas.map((f) => {
          const isBookmarked = !!bookmarkedFormulas[f.id];
          return (
            <div
              key={f.id}
              className="liquid-glass-card rounded-[24px] p-6 bg-slate-900/70 border border-white/10 space-y-5 hover:border-indigo-400/35 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-3.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-400/25">
                      Topic {f.topicCode}
                    </span>
                    <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                      {f.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFormulaBookmark(f.id)}
                    title={isBookmarked ? "Remove bookmark" : "Bookmark formula"}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-indigo-300 cursor-pointer transition-colors shrink-0"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* KaTeX Display Stage */}
                <div className="py-5 px-4 rounded-2xl bg-black/45 border border-white/[0.09] text-lg sm:text-xl flex items-center justify-center overflow-x-auto shadow-inner">
                  <MathFormula math={f.latex} block />
                </div>

                {/* Variables Breakdown Pills */}
                <div className="space-y-2">
                  <strong className="text-indigo-300 block font-sans font-semibold uppercase tracking-wider text-[11px]">
                    Variables &amp; SI Units
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {f.variables.map((v, vIdx) => (
                      <div
                        key={vIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-sans text-[14.5px] text-white/85"
                      >
                        <span className="font-mono font-bold text-indigo-300 shrink-0 inline-flex items-center">
                          <MathText text={`$${v.symbol}$`} />:
                        </span>
                        <span>{v.name}</span>
                        <span className="text-[11px] font-mono text-indigo-200/75">
                          [{formatUnit(v.unit)}]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Conditions & Tips */}
              <div className="space-y-3 pt-1">
                <div className="border-l-2 border-white/25 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                  <span className="font-semibold text-white">Conditions: </span>
                  <MathText text={f.conditions} />
                </div>
                <div className="border-l-2 border-indigo-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                  <span className="font-semibold text-indigo-300">Calculation Tip: </span>
                  <MathText text={f.examTips} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormulaBankView;
