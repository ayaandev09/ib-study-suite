"use client";

import React, { useState } from "react";
import { BIO_FORMULAS, BIO_GLOSSARY_TERMS } from "@/modules/biology/data";
import { MathFormula } from "./MathFormula";
import { Calculator, BookOpen, Search } from "lucide-react";

export function LexiconDossierView() {
  const [tab, setTab] = useState<"formulas" | "glossary">("formulas");
  const [query, setQuery] = useState("");

  const filteredFormulas = BIO_FORMULAS.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.topicCode.toLowerCase().includes(query.toLowerCase()) ||
      f.variables.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTerms = BIO_GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(query.toLowerCase()) ||
      g.definition.toLowerCase().includes(query.toLowerCase()) ||
      g.topicRef.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">
            Glossary &amp; Practical Lab Skills
          </h2>
          <p className="font-sans text-[15px] text-white/75 leading-[1.65] mt-0.5">
            Quantitative equations (Ψ, Hardy–Weinberg, χ², Simpson&apos;s D) &amp;
            NOS / Command Terms.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-2xl p-1 text-xs font-sans">
          <button
            onClick={() => setTab("formulas")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "formulas"
                ? "bg-green-500/20 border border-green-400/40 text-green-200 font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Equations &amp; Stats
          </button>
          <button
            onClick={() => setTab("glossary")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "glossary"
                ? "bg-green-500/20 border border-green-400/40 text-green-200 font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Bio &amp; NOS Lexicon
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter equations, statistical tests, or NOS terms..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/50 border border-white/15 font-sans text-[13.5px] text-white placeholder-white/40 focus:outline-none focus:border-green-400/50"
        />
      </div>

      {tab === "formulas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="liquid-glass-card rounded-[24px] p-6 space-y-4 border border-white/10 hover:border-green-400/35 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[10px] font-mono uppercase tracking-wider text-green-300">
                    {f.topicCode}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/55">
                    {f.category}
                  </span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                  {f.name}
                </h3>
                <div className="py-5 px-4 rounded-2xl bg-black/45 border border-white/[0.09] text-lg sm:text-xl flex items-center justify-center overflow-x-auto shadow-inner">
                  <MathFormula
                    formula={f.latex}
                    displayMode
                    className="text-green-200"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {f.variables.split(";").map((part, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-sans text-[14.5px] leading-[1.6] text-white/85"
                    >
                      {part.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-green-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-green-300">
                  Exam Tip:{" "}
                </span>
                {f.examTip}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "glossary" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTerms.map((g) => (
            <div
              key={g.id}
              className="liquid-glass-card rounded-[24px] p-6 space-y-4 border border-white/10 hover:border-green-400/35 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-[10px] font-mono uppercase tracking-wider text-white/75">
                    {g.category}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-green-300">
                    {g.topicRef}
                  </span>
                </div>
                <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                  {g.term}
                </h3>
                <p className="font-sans text-[15px] leading-[1.68] text-white/85">
                  {g.definition}
                </p>
              </div>
              <div className="border-l-2 border-green-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] leading-[1.65] text-white/85">
                <span className="font-semibold text-green-300">Exam Nuance: </span>
                {g.examNuance}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
