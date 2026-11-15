"use client";

import React, { useState } from "react";
import { BookMarked, Calculator } from "lucide-react";
import { GEO_FORMULAS, GEO_GLOSSARY } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { MathText } from "./MathText";
import { MathFormula } from "./MathFormula";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export function LexiconDossierView() {
  const { levelFilter } = useStudyStore();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const formulas = GEO_FORMULAS.filter(
    (f) =>
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.topicCode.toLowerCase().includes(q)
  );

  const terms = GEO_GLOSSARY.filter((g) => {
    if (levelFilter === "SL" && g.isHLOnly) return false;
    if (levelFilter === "HL" && !g.isHLOnly) return false;
    if (!q) return true;
    return (
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.topicRef.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Models, Equations &amp; Lexicon
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Quantitative formulas, spatial indices, and IB Geography command definitions.
          </p>
        </div>
      </div>

      <MiniSectionSearch
        query={query}
        onQueryChange={setQuery}
        placeholder="Search geography models (Alonso, Butler, WEF nexus), equations, or demographic terms..."
        totalCount={GEO_FORMULAS.length + GEO_GLOSSARY.length}
        filteredCount={formulas.length + terms.length}
        accentColor="#14b8a6"
      />

      {/* Formulas Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
          <Calculator className="w-4 h-4" />
          <span>Quantitative Geography Formulas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formulas.map((f) => (
            <div
              key={f.id}
              className="rounded-[22px] border border-teal-500/20 bg-[#041010]/85 p-5 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/25 font-mono font-bold text-teal-300">
                  {f.topicCode}
                </span>
                <span className="text-white/45 font-mono text-[11px]">{f.category}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{f.name}</h3>
              <div className="rounded-xl bg-teal-950/30 border border-teal-500/20 px-3.5 py-2.5 text-sm text-teal-200">
                <MathFormula latex={f.formula} />
              </div>
              <div className="text-xs text-white/70">
                <MathText text={f.variables} />
              </div>
              <div className="text-[11px] text-amber-200/85">
                <span className="font-semibold">Exam Trap: </span>
                <MathText text={f.examTrap} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glossary Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-teal-300">
          <BookMarked className="w-4 h-4" />
          <span>Core Geographic Lexicon ({terms.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {terms.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl border border-teal-500/15 bg-[#041010]/80 p-4 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white">{g.term}</span>
                <span className="text-[10px] font-mono text-teal-300">
                  {g.topicRef}
                  {g.isHLOnly ? " · HL" : ""}
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{g.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
