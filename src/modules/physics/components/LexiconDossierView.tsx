"use client";

import React, { useState, useMemo } from "react";
import { GLOSSARY_TERMS, SYLLABUS_THEMES, ThemeId } from "@/modules/physics/data";
import { BookOpen, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { MathText, formatUnit } from "./MathText";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export const LexiconDossierView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<"all" | ThemeId>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      if (selectedTheme !== "all" && item.themeId !== selectedTheme) return false;
      if (selectedType !== "all" && item.type !== selectedType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTerm = item.term.toLowerCase().includes(q);
        const matchesDef = item.definition.toLowerCase().includes(q);
        const matchesSym = item.symbol?.toLowerCase().includes(q) || false;
        const matchesUnit = item.siUnit?.toLowerCase().includes(q) || false;
        return matchesTerm || matchesDef || matchesSym || matchesUnit;
      }
      return true;
    });
  }, [search, selectedTheme, selectedType]);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-950/60 border border-indigo-500/25">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
          <BookOpen className="w-4 h-4" />
          <span>Physics Terminology &amp; Scientific Definitions</span>
        </div>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-[-0.01em] mb-2">
          Lexicon &amp; Definitions Dossier
        </h1>
        <p className="font-sans text-[15px] text-white/80 max-w-2xl leading-[1.65]">
          Comprehensive lexicon of official IB Physics SL / HL definitions. Includes vector vs scalar classifications, fundamental SI derived units, mathematical formulas, and exact mark scheme requirements.
        </p>

        {/* Mini Section Search */}
        <div className="mt-5">
          <MiniSectionSearch
            query={search}
            onQueryChange={setSearch}
            placeholder="Search key terms (e.g. displacement, EMF, albedo, SHM, half-life)..."
            totalCount={GLOSSARY_TERMS.length}
            filteredCount={filteredTerms.length}
            accentColor="#6366f1"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={() => setSelectedTheme("all")}
            className={`px-3 py-1 rounded-full text-xs font-sans font-semibold cursor-pointer transition-all ${
              selectedTheme === "all"
                ? "bg-indigo-500 text-white font-bold"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            All Themes ({GLOSSARY_TERMS.length})
          </button>
          {SYLLABUS_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-semibold cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? "bg-indigo-500 text-white font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              Theme {theme.code.replace("THEME ", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="liquid-glass-card rounded-[24px] p-6 bg-slate-900/70 border border-white/10 space-y-4 hover:border-indigo-400/35 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono uppercase tracking-wider font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-400/25">
                  Topic {term.topicCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-slate-950 text-slate-400 border border-white/10">
                  {term.type}
                </span>
              </div>

              <div>
                <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                  {term.term}
                </h3>
                {(term.symbol || term.siUnit) && (
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300/90 mt-1.5">
                    {term.symbol && (
                      <span className="inline-flex items-center gap-1">
                        Symbol: <MathText text={term.symbol.startsWith("$") ? term.symbol : `$${term.symbol}$`} />
                      </span>
                    )}
                    {term.siUnit && (
                      <span className="text-indigo-200/80">• Unit: [{formatUnit(term.siUnit)}]</span>
                    )}
                  </div>
                )}
              </div>

              <p className="font-sans text-[15px] text-white/85 leading-[1.68]">
                <MathText text={term.definition} />
              </p>
            </div>

            <div className="pt-2 space-y-3">
              {term.formulaLink && (
                <div className="border-l-2 border-white/25 pl-4 py-2.5 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-indigo-200/95">
                  <span className="font-semibold text-white">Formula: </span>
                  <MathText text={term.formulaLink} />
                </div>
              )}
              <div className="border-l-2 border-indigo-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-indigo-300">Exam Note: </span>
                <MathText text={term.examNote} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LexiconDossierView;
