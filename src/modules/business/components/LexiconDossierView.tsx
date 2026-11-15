"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  FORMULA_BANK,
  THEORISTS_DOSSIER,
  GLOSSARY_TERMS,
  FormulaItem,
  TheoristProfile,
  GlossaryTerm,
} from "@/modules/business/data";
import { useStudyStore } from "@/modules/business/store/useStudyStore";
import { MathFormula } from "./MathFormula";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";
import {
  Calculator,
  Users,
  BookOpen,
  Search,
  Sparkles,
  HelpCircle,
  GraduationCap,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";

type DossierTab = "formulas" | "theorists" | "glossary";

const ALPHABET = [
  "ALL",
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "Y",
  "Z",
];

const UNIT_FILTERS = [
  { id: "ALL", label: "All Syllabus Units" },
  { id: "Unit 1", label: "Unit 1: Business Org" },
  { id: "Unit 2", label: "Unit 2: HRM" },
  { id: "Unit 3", label: "Unit 3: Finance" },
  { id: "Unit 4", label: "Unit 4: Marketing" },
  { id: "Unit 5", label: "Unit 5: Operations" },
  { id: "BMT", label: "BMT Toolkit" },
  { id: "Command Terms", label: "IB Command Terms" },
];

export const LexiconDossierView = React.memo(function LexiconDossierView() {
  const searchQuery = useStudyStore((state) => state.searchQuery);
  const setSearchQuery = useStudyStore((state) => state.setSearchQuery);
  const [activeTab, setActiveTab] = useState<DossierTab>("formulas");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");
  const [hlOnlyFilter, setHlOnlyFilter] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(40);

  const q = searchQuery.trim().toLowerCase();

  // Reset pagination when any filter changes
  useEffect(() => {
    setDisplayCount(40);
  }, [q, selectedLetter, selectedUnit, hlOnlyFilter]);

  const filteredFormulas = useMemo(() => {
    return FORMULA_BANK.filter(
      (f) =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.code.toLowerCase().includes(q) ||
        f.unit.toLowerCase().includes(q) ||
        f.evaluationInterpretation.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredTheorists = useMemo(() => {
    return THEORISTS_DOSSIER.filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.schoolOrTheory.toLowerCase().includes(q) ||
        t.coreModel.toLowerCase().includes(q) ||
        t.evaluationAO3.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((g) => {
      // 1. Text search
      if (q) {
        const matchesQ =
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q) ||
          g.examTip.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      // 2. Alphabet Filter
      if (selectedLetter !== "ALL") {
        const firstChar = g.term.charAt(0).toUpperCase();
        if (selectedLetter === "#") {
          if (!/[0-9]/.test(firstChar)) return false;
        } else {
          if (firstChar !== selectedLetter) return false;
        }
      }

      // 3. Unit Filter
      if (selectedUnit !== "ALL") {
        if (selectedUnit === "Command Terms") {
          if (g.unit !== "Command Terms") return false;
        } else if (selectedUnit === "BMT") {
          if (!g.unit.startsWith("BMT")) return false;
        } else {
          if (!g.unit.startsWith(selectedUnit)) return false;
        }
      }

      // 4. HL Only
      if (hlOnlyFilter && !g.hlOnly) {
        return false;
      }

      return true;
    });
  }, [q, selectedLetter, selectedUnit, hlOnlyFilter]);

  const visibleGlossary = useMemo(() => {
    return filteredGlossary.slice(0, displayCount);
  }, [filteredGlossary, displayCount]);

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. DOSSIER HEADER & NAVIGATION TABS
          ===================================================================== */}
      <section className="liquid-glass-bento rounded-3xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-blue-400" />
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">
                Formulas, Theorists &amp; Glossary Dossier
              </h2>
            </div>
            <p className="font-sans text-[15px] text-white/75 leading-[1.65]">
              Quantitative models, organizational theorists, and comprehensive {GLOSSARY_TERMS.length}-term IB syllabus glossary.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-white/10">
            <button
              onClick={() => setActiveTab("formulas")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                activeTab === "formulas"
                  ? "bg-blue-500/25 border border-blue-400/50 text-blue-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Formulas ({filteredFormulas.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("theorists")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                activeTab === "theorists"
                  ? "bg-blue-500/25 border border-blue-400/50 text-blue-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Theorists ({filteredTheorists.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("glossary")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                activeTab === "glossary"
                  ? "bg-blue-500/25 border border-blue-400/50 text-blue-200"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossary ({filteredGlossary.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Universal Mini Search Across Formulas, Theorists & Glossary */}
      <MiniSectionSearch
        query={searchQuery}
        onQueryChange={setSearchQuery}
        placeholder={
          activeTab === "formulas"
            ? "Search quantitative formulas by name (ARR, NPV, Break-Even, Acid Test), code, or variables..."
            : activeTab === "theorists"
            ? "Search theorists by name (Taylor, Maslow, Herzberg, Pink, Handy, Ansoff, Porter), core model, or evaluation..."
            : "Search 412 glossary terms by keyword, definition, or exam tip..."
        }
        totalCount={
          activeTab === "formulas"
            ? FORMULA_BANK.length
            : activeTab === "theorists"
            ? THEORISTS_DOSSIER.length
            : GLOSSARY_TERMS.length
        }
        filteredCount={
          activeTab === "formulas"
            ? filteredFormulas.length
            : activeTab === "theorists"
            ? filteredTheorists.length
            : filteredGlossary.length
        }
        accentColor="#2563eb"
      />

      {/* =====================================================================
          TAB 1: FORMULAS BANK
          ===================================================================== */}
      {activeTab === "formulas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="liquid-glass-bento rounded-[24px] p-6 space-y-5 border border-white/10 hover:border-blue-400/35 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-400/30">
                      {f.code}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/55">
                      {f.unit}
                    </span>
                    {f.hlOnly && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-400/30">
                        HL ONLY
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                    {f.name}
                  </h3>
                </div>
              </div>

              {/* KaTeX Math Formatted Formula Box */}
              <div className="py-5 px-4 rounded-2xl bg-black/45 border border-white/[0.09] text-lg sm:text-xl text-blue-200 min-h-[76px] flex items-center justify-center shadow-inner overflow-x-auto">
                <MathFormula formula={f.formula} displayMode={true} />
              </div>

              {/* Variables breakdown */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-white/55 block">
                  Variables &amp; Definitions
                </span>
                <div className="flex flex-wrap gap-2">
                  {f.variables.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-sans text-[14.5px] leading-[1.6] text-white/85"
                    >
                      <span className="font-semibold text-blue-200">{v.name}:</span>{" "}
                      {v.definition}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark guidance */}
              <div className="border-l-2 border-blue-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-blue-300">Standard Target: </span>
                {f.benchmarkGuidance}
              </div>

              {/* Interpretation and worked example */}
              <div className="border-l-2 border-white/25 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[15px] leading-[1.68] text-white/85">
                <span className="font-semibold text-white">Analytical Value: </span>
                {f.evaluationInterpretation}
              </div>

              <div className="border-l-2 border-sky-400/45 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-sky-200">Worked Calculation: </span>
                {f.workedExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 2: THEORISTS DOSSIER
          ===================================================================== */}
      {activeTab === "theorists" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTheorists.map((t) => (
            <div
              key={t.id}
              className="liquid-glass-bento rounded-[24px] p-6 space-y-5 border border-white/10 hover:border-blue-400/35 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-400/30">
                      {t.schoolOrTheory}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/55">
                      {t.unit}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                    {t.name}
                  </h3>
                </div>
              </div>

              <div className="border-l-2 border-blue-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[15px] leading-[1.68] text-white/85">
                <span className="font-semibold text-white">Core Paradigm: </span>
                {t.coreModel}
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-white/55 block">
                  Key Assumptions
                </span>
                {t.keyAssumptions.map((a, aIdx) => (
                  <div
                    key={aIdx}
                    className="font-sans text-[15px] leading-[1.68] text-white/85 pl-4 border-l-2 border-white/15"
                  >
                    • {a}
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-blue-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-blue-300">AO3 Evaluation: </span>
                {t.evaluationAO3}
              </div>

              <div className="border-l-2 border-sky-400/45 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-sky-200">Case Example: </span>
                {t.realWorldExample}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 3: COMPLETE 412-TERM GLOSSARY & SYLLABUS LEXICON
          ===================================================================== */}
      {activeTab === "glossary" && (
        <div className="space-y-4">
          {/* Unit Filter Bar & Controls */}
          <div className="liquid-glass-bento rounded-3xl p-4 sm:p-5 border border-white/10 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  Syllabus Unit:
                </span>
              </div>

              {/* HL Only Toggle Pill */}
              <button
                onClick={() => setHlOnlyFilter(!hlOnlyFilter)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  hlOnlyFilter
                    ? "bg-rose-500/25 border border-rose-400/50 text-rose-200 shadow-[0_0_15px_-3px_rgba(244,63,94,0.4)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    hlOnlyFilter ? "bg-rose-400 animate-pulse" : "bg-slate-500"
                  }`}
                />
                <span>HL Only Terms</span>
              </button>
            </div>

            {/* Unit Chips */}
            <div className="flex flex-wrap gap-1.5">
              {UNIT_FILTERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    selectedUnit === u.id
                      ? "bg-blue-500/25 border border-blue-400/45 text-blue-200 shadow-sm"
                      : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>

            {/* Alphabet Navigator Ribbon */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Alphabetical Jump:
                </span>
                <span className="text-[11px] font-mono text-blue-400 font-bold">
                  {selectedLetter === "ALL" ? "All Letters" : `Letter '${selectedLetter}'`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedLetter === letter
                        ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.5)] scale-105"
                        : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter / Source Attribution */}
            <div className="flex items-center justify-between text-[11px] font-sans text-slate-400 pt-1">
              <span>
                Showing <strong className="text-blue-300">{visibleGlossary.length}</strong> of{" "}
                <strong className="text-white">{filteredGlossary.length}</strong> matching terms ({GLOSSARY_TERMS.length} total)
              </span>
              <span className="text-slate-500">
                Paul Hoang 5th Edition (2022 Syllabus)
              </span>
            </div>
          </div>

          {/* Terms Grid */}
          {filteredGlossary.length === 0 ? (
            <div className="liquid-glass-bento rounded-3xl p-12 text-center space-y-3">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="font-sans text-lg font-semibold text-white">
                No matching terms found
              </h4>
              <p className="font-sans text-[13.5px] text-white/65 max-w-md mx-auto">
                Try clearing your search query or selecting &quot;All Letters&quot; in the alphabet ribbon above.
              </p>
              <button
                onClick={() => {
                  setSelectedLetter("ALL");
                  setSelectedUnit("ALL");
                  setHlOnlyFilter(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-sans font-medium cursor-pointer hover:bg-blue-500/30"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visibleGlossary.map((g, idx) => (
                  <div
                    key={`${g.term}-${idx}`}
                    className="liquid-glass-bento rounded-[24px] p-6 space-y-4 border border-white/10 hover:border-blue-400/35 transition-all group glossary-term-card flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em] group-hover:text-blue-200 transition-colors">
                          {g.term}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-400/25">
                            {g.unit}
                          </span>
                          {g.hlOnly && (
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-400/30 font-semibold">
                              HL
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="font-sans text-[15px] leading-[1.68] text-white/85">
                        {g.definition}
                      </p>
                    </div>

                    <div className="border-l-2 border-blue-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                      <span className="font-semibold text-blue-300">IB Exam Guidance: </span>
                      {g.examTip}
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Pagination Bar */}
              {filteredGlossary.length > visibleGlossary.length && (
                <div className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 40)}
                    className="px-6 py-2.5 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/35 text-xs font-sans font-semibold transition-all cursor-pointer shadow-md"
                  >
                    Load Next 40 Terms (Showing {visibleGlossary.length} of {filteredGlossary.length})
                  </button>
                  <button
                    onClick={() => setDisplayCount(filteredGlossary.length)}
                    className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-sans transition-all cursor-pointer"
                  >
                    Show All ({filteredGlossary.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
