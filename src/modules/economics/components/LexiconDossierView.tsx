"use client";

import React, { useState, useMemo } from "react";
import { GLOSSARY_TERMS, FORMULA_BANK, GlossaryTerm, FormulaItem } from "@/modules/economics/data";
import { MathFormula } from "./MathFormula";
import { LivingEconomicsDiagramSimulator } from "./LivingEconomicsDiagramSimulator";

import {
  BookOpen,
  Search,
  Calculator,
  Sparkles,
  Filter,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const LexiconDossierView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [showFormulaBank, setShowFormulaBank] = useState<boolean>(true);
  const [activeDossierTab, setActiveDossierTab] = useState<"simulator" | "glossary" | "formulas">("simulator");

  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const ALPHABET = [
    "ALL",
    "#",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  ];

  // Filter glossary terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((g) => {
      // Unit filter
      const matchesUnit =
        selectedUnit === "all" ||
        g.unit.toLowerCase().includes(selectedUnit.toLowerCase());
      if (!matchesUnit) return false;

      // Letter filter
      const firstChar = g.term.charAt(0).toUpperCase();
      let matchesLetter = true;
      if (selectedLetter !== "ALL") {
        if (selectedLetter === "#") {
          matchesLetter = !/[A-Z]/.test(firstChar);
        } else {
          matchesLetter = firstChar === selectedLetter;
        }
      }
      if (!matchesLetter) return false;

      // Search query
      if (!q) return true;
      return (
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q) ||
        g.examTip.toLowerCase().includes(q) ||
        g.unit.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedUnit, selectedLetter]);

  const handleCopyDefinition = (term: GlossaryTerm) => {
    navigator.clipboard.writeText(`${term.term}: ${term.definition}`);
    setCopiedTerm(term.term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider px-2">
            Economics Codex Module:
          </span>
          <button
            onClick={() => setActiveDossierTab("simulator")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeDossierTab === "simulator"
                ? "bg-sky-500/25 text-white border border-sky-400/50 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Living Market Simulator &amp; Welfare Engine
          </button>
          <button
            onClick={() => setActiveDossierTab("glossary")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeDossierTab === "glossary"
                ? "bg-sky-500/25 text-white border border-sky-400/50 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            Syllabus Glossary ({filteredTerms.length})
          </button>
          <button
            onClick={() => setActiveDossierTab("formulas")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeDossierTab === "formulas"
                ? "bg-sky-500/25 text-white border border-sky-400/50 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            Quantitative Formulas ({FORMULA_BANK.length})
          </button>
        </div>
      </div>

      {activeDossierTab === "simulator" && <LivingEconomicsDiagramSimulator />}

      {activeDossierTab !== "simulator" && (
      <>
      {/* Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-400/30 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Authoritative Lexicon &amp; Formulas
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
              180+ Definitional Keys &amp; Quant Toolkit
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-[-0.01em] mb-2">
            IB Economics SL / HL Syllabus Glossary
          </h1>
          <p className="font-sans text-[15px] text-white/80 leading-[1.65]">
            Precise economic terminology is mandatory for achieving Level 7 in IB
            examinations. Browse the complete glossary with alphabetical jump
            navigation, unit filters, and the KaTeX mathematical formula bank.
          </p>
        </div>
      </div>

      {/* Formula Bank Accordion */}
      <div className="liquid-glass-bento rounded-[24px] border border-white/10 overflow-hidden">
        <button
          onClick={() => setShowFormulaBank(!showFormulaBank)}
          className="w-full p-6 flex items-center justify-between gap-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                IB Economics Mathematical Formula Bank (10 Quantitative Tools)
              </h3>
              <p className="font-sans text-[14.5px] text-white/70 mt-0.5">
                PED, PES, YED, XED, GDP, CPI, Inflation, Unemployment, Gini, and Tariffs
              </p>
            </div>
          </div>
          {showFormulaBank ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFormulaBank && (
          <div className="p-6 pt-2 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-150">
            {FORMULA_BANK.map((f) => (
              <div
                key={f.id}
                className="liquid-glass-bento p-6 rounded-[24px] border border-white/10 hover:border-sky-400/35 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                      {f.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-400/25 shrink-0">
                      {f.unit}
                    </span>
                  </div>
                  <div className="py-5 px-4 rounded-2xl bg-black/45 border border-white/[0.09] text-lg sm:text-xl text-sky-200 flex items-center justify-center overflow-x-auto shadow-inner">
                    <MathFormula math={f.formula} block />
                  </div>
                  <div className="border-l-2 border-sky-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] text-white/85 leading-[1.65]">
                    <span className="font-semibold text-sky-300">Benchmarks: </span>
                    {f.benchmarkGuidance}
                  </div>
                </div>
                <div className="border-l-2 border-white/25 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                  <span className="font-semibold text-white">Worked Example: </span>
                  {f.workedExample}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alphabet Jump Ribbon & Search Controls */}
      <div className="space-y-3">
        {/* Alphabet Jump Ribbon */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar p-1.5 rounded-2xl bg-slate-950/60 border border-white/10">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`min-w-[28px] h-7 px-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedLetter === letter
                  ? "bg-sky-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Unit Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {(
              [
                { id: "all", label: "All Units (180+)" },
                { id: "Unit 1", label: "Unit 1: Introduction to economics" },
                { id: "Unit 2", label: "Unit 2: Micro" },
                { id: "Unit 3", label: "Unit 3: Macro" },
                { id: "Unit 4", label: "Unit 4: Global" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedUnit(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedUnit === tab.id
                    ? "liquid-glass-pill-active text-white"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search definitions, terms..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 font-sans text-[13.5px] text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60"
            />
          </div>
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTerms.map((t, idx) => (
          <div
            key={idx}
            className="liquid-glass-bento p-6 rounded-[24px] border border-white/10 space-y-4 relative flex flex-col justify-between hover:border-sky-400/35 transition-all shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 border border-sky-400/25 font-semibold">
                  {t.unit}
                </span>
                <button
                  onClick={() => handleCopyDefinition(t)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                  title="Copy definition"
                >
                  {copiedTerm === t.term ? (
                    <Check className="w-4 h-4 text-sky-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <h4 className="font-sans text-xl font-bold text-white tracking-[-0.01em] mb-2.5">
                {t.term}
              </h4>
              <p className="font-sans text-[15px] text-white/85 leading-[1.68]">
                {t.definition}
              </p>
            </div>
            <div className="border-l-2 border-sky-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] text-white/85 leading-[1.65]">
              <span className="font-semibold text-sky-300">Exam Tip: </span>
              {t.examTip}
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};
