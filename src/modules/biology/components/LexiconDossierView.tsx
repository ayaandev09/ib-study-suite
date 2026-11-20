"use client";

import React, { useState } from "react";
import { BIO_FORMULAS, BIO_GLOSSARY_TERMS } from "@/modules/biology/data";
import { MathFormula } from "./MathFormula";
import { Calculator, BookOpen, FlaskConical, Sparkles, Activity } from "lucide-react";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export function LexiconDossierView() {
  const [tab, setTab] = useState<"formulas" | "glossary" | "lab">("formulas");
  const [query, setQuery] = useState("");

  // Lab Simulators State
  const [psiS, setPsiS] = useState(-0.6);
  const [psiP, setPsiP] = useState(0.2);
  const [extPsi, setExtPsi] = useState(-0.3);

  const [qVal, setQVal] = useState(0.3);

  const [subConc, setSubConc] = useState(12);
  const [inhibitor, setInhibitor] = useState<"none" | "competitive" | "non-competitive">("none");

  const filteredFormulas = BIO_FORMULAS.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.topicCode.toLowerCase().includes(query.toLowerCase()) ||
      f.variables.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTerms = BIO_GLOSSARY_TERMS.filter(
    (g) =>
      g.term.toLowerCase().includes(query.toLowerCase()) ||
      g.definition.toLowerCase().includes(query.toLowerCase()) ||
      g.topicRef.toLowerCase().includes(query.toLowerCase()) ||
      g.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">
            Glossary &amp; Practical Lab Skills
          </h2>
          <p className="font-sans text-[15px] text-white/75 leading-[1.65] mt-0.5">
            Quantitative equations (Ψ, Hardy–Weinberg, χ², Simpson&apos;s D) &amp; NOS / Command Terms.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-2xl p-1 text-xs font-sans">
          <button
            onClick={() => {
              setTab("formulas");
              setQuery("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "formulas"
                ? "bg-green-500/20 border border-green-400/40 text-green-200 font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Equations &amp; Stats ({BIO_FORMULAS.length})
          </button>
          <button
            onClick={() => {
              setTab("glossary");
              setQuery("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "glossary"
                ? "bg-green-500/20 border border-green-400/40 text-green-200 font-semibold"
                : "text-white/65 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Bio &amp; NOS Lexicon ({BIO_GLOSSARY_TERMS.length})
          </button>
          <button
            onClick={() => {
              setTab("lab");
              setQuery("");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
              tab === "lab"
                ? "bg-green-500/20 border border-green-400/40 text-green-200 font-semibold shadow-sm"
                : "text-white/65 hover:text-white"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Bio Practical Lab
          </button>
        </div>
      </div>

      {tab !== "lab" && (
        <MiniSectionSearch
          query={query}
          onQueryChange={setQuery}
          placeholder={
            tab === "formulas"
              ? "Search equations by name, symbol (Ψ, Hardy-Weinberg, χ²), topic code, or variable..."
              : "Search glossary terms by keyword, definition, or syllabus reference..."
          }
          totalCount={tab === "formulas" ? BIO_FORMULAS.length : BIO_GLOSSARY_TERMS.length}
          filteredCount={tab === "formulas" ? filteredFormulas.length : filteredTerms.length}
          accentColor="#22c55e"
        />
      )}

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
                <span className="font-semibold text-green-300">Exam Tip: </span>
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

      {tab === "lab" && (
        <div className="space-y-6">
          {/* Lab 1: Water Potential Simulator */}
          <div className="liquid-glass-card rounded-[24px] p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[10px] font-mono uppercase tracking-wider text-green-300">
                Syllabus B1.2 · Membrane Transport &amp; Osmosis
              </span>
              <span className="text-xs font-mono text-white/50">Water Potential Lab</span>
            </div>
            <h3 className="text-xl font-bold text-white">Water Potential Simulator: $\Psi = \Psi_s + \Psi_p$</h3>
            <p className="text-sm text-white/70">
              Calculate total water potential ($\Psi$) from solute potential ($\Psi_s \le 0$) and pressure potential ($\Psi_p \ge 0$). Water always moves from higher (less negative) to lower (more negative) $\Psi$.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">Solute Potential ($\Psi_s$):</span>
                  <span className="font-mono text-green-300 font-bold">{psiS.toFixed(2)} MPa</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="0"
                  step="0.05"
                  value={psiS}
                  onChange={(e) => setPsiS(parseFloat(e.target.value))}
                  className="w-full accent-green-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">Pressure / Turgor ($\Psi_p$):</span>
                  <span className="font-mono text-emerald-300 font-bold">{psiP.toFixed(2)} MPa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={psiP}
                  onChange={(e) => setPsiP(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">{"External Medium ($\\Psi_\\text{ext}$):"}</span>
                  <span className="font-mono text-cyan-300 font-bold">{extPsi.toFixed(2)} MPa</span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="0"
                  step="0.05"
                  value={extPsi}
                  onChange={(e) => setExtPsi(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            {/* Results Display */}
            {(() => {
              const cellPsi = Number((psiS + psiP).toFixed(2));
              const diff = Number((extPsi - cellPsi).toFixed(2));
              const direction =
                diff > 0.01
                  ? "Water flows INTO cell (Cell becomes Turgid)"
                  : diff < -0.01
                  ? "Water flows OUT of cell (Plasmolysis / Flaccidity)"
                  : "Dynamic Osmotic Equilibrium (No net movement)";
              return (
                <div className="p-4 rounded-2xl bg-green-500/[0.08] border border-green-400/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-green-300 font-bold">
                      {"Cell $\\Psi_\\text{cell} = " + (cellPsi >= 0 ? `+${cellPsi}` : cellPsi) + " MPa · External $\\Psi = " + extPsi + " MPa"}
                    </p>
                    <p className="text-sm font-semibold text-white mt-0.5">{direction}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-white/10 font-mono text-xs text-white shrink-0 border border-white/10">
                    $\Delta\Psi = {diff >= 0 ? `+${diff}` : diff}$ MPa
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Lab 2: Hardy-Weinberg Population Genetics */}
          <div className="liquid-glass-card rounded-[24px] p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[10px] font-mono uppercase tracking-wider text-green-300">
                Syllabus D4.1 · Population Genetics
              </span>
              <span className="text-xs font-mono text-white/50">Hardy-Weinberg Lab</span>
            </div>
            <h3 className="text-xl font-bold text-white">Hardy-Weinberg Frequency Calculator: $p^2 + 2pq + q^2 = 1$</h3>
            <p className="text-sm text-white/70">
              Adjust the recessive allele frequency ($q$). Observe the mathematical distribution of homozygous dominant ($p^2$), heterozygous carriers ($2pq$), and affected homozygous recessive ($q^2$).
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Recessive Allele Frequency ($q$):</span>
                <span className="font-mono text-green-300 font-bold">{qVal.toFixed(2)} (Dominant $p = {(1 - qVal).toFixed(2)}$)</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.01"
                value={qVal}
                onChange={(e) => setQVal(parseFloat(e.target.value))}
                className="w-full accent-green-400"
              />
            </div>

            {(() => {
              const p = Number((1 - qVal).toFixed(2));
              const p2 = Number((p * p).toFixed(3));
              const twoPq = Number((2 * p * qVal).toFixed(3));
              const q2 = Number((qVal * qVal).toFixed(3));
              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                    <p className="text-[11px] font-mono text-white/50 uppercase">Homozygous Dominant ($p^2$)</p>
                    <p className="text-xl font-bold text-white font-mono mt-1">{(p2 * 100).toFixed(1)}%</p>
                    <p className="text-[11px] font-mono text-green-300/80 mt-0.5">Frequency = {p2}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-400/25 text-center">
                    <p className="text-[11px] font-mono text-emerald-300 uppercase">Heterozygous Carrier ($2pq$)</p>
                    <p className="text-xl font-bold text-emerald-200 font-mono mt-1">{(twoPq * 100).toFixed(1)}%</p>
                    <p className="text-[11px] font-mono text-emerald-300/80 mt-0.5">Frequency = {twoPq}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-500/[0.08] border border-rose-400/25 text-center">
                    <p className="text-[11px] font-mono text-rose-300 uppercase">Recessive Affected ($q^2$)</p>
                    <p className="text-xl font-bold text-rose-200 font-mono mt-1">{(q2 * 100).toFixed(1)}%</p>
                    <p className="text-[11px] font-mono text-rose-300/80 mt-0.5">Frequency = {q2}</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Lab 3: Enzyme Kinetics & Inhibitors */}
          <div className="liquid-glass-card rounded-[24px] p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-green-500/15 border border-green-400/30 text-[10px] font-mono uppercase tracking-wider text-green-300">
                Syllabus C1.1 · Enzymes &amp; Metabolism
              </span>
              <span className="text-xs font-mono text-white/50">Enzyme Kinetics Lab</span>
            </div>
            <h3 className="text-xl font-bold text-white">Michaelis–Menten Enzyme Kinetics &amp; Inhibition</h3>
            <p className="text-sm text-white/70">
              Investigate the effect of substrate concentration $[S]$ and inhibitor mechanisms on reaction velocity $V$.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">Substrate Concentration $[S]$:</span>
                  <span className="font-mono text-green-300 font-bold">{subConc} mM</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={subConc}
                  onChange={(e) => setSubConc(parseInt(e.target.value, 10))}
                  className="w-full accent-green-400"
                />
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <p className="text-xs text-white/70">Inhibitor Type:</p>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(["none", "competitive", "non-competitive"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setInhibitor(mode)}
                      className={`px-2 py-1.5 rounded-xl capitalize font-medium transition-colors cursor-pointer text-center text-[11px] ${
                        inhibitor === mode
                          ? "bg-green-500/25 text-green-200 border border-green-400/40 font-bold"
                          : "bg-white/[0.04] text-white/60 hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(() => {
              const baseVmax = 100;
              const baseKm = 8;
              const effVmax = inhibitor === "non-competitive" ? 50 : baseVmax;
              const effKm = inhibitor === "competitive" ? 20 : baseKm;
              const rate = Number(((effVmax * subConc) / (effKm + subConc)).toFixed(1));
              return (
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase text-green-300 font-bold">
                      {"Reaction Rate $V = " + rate + " \\mu\\text{mol/min} (Apparent $V_\\max = " + effVmax + ", $K_m = " + effKm + " mM)"}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      {inhibitor === "competitive"
                        ? "Competitive inhibitor binds to active site: increases Km without changing Vmax at infinite [S]."
                        : inhibitor === "non-competitive"
                        ? "Non-competitive inhibitor binds to allosteric site: lowers Vmax without changing enzyme affinity Km."
                        : "Normal enzyme catalysis without inhibition."}
                    </p>
                  </div>
                  <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden shrink-0">
                    <div
                      className="h-full bg-green-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, (rate / baseVmax) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
