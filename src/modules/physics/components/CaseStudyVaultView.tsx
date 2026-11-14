"use client";

import React, { useState, useMemo } from "react";
import { CASE_STUDIES_BANK, PHYSICS_CONCEPTS, PhysicsConceptId } from "@/modules/physics/data";
import { Globe2, Search, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { MathText } from "./MathText";

export const CaseStudyVaultView: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedConcept, setSelectedConcept] = useState<"all" | PhysicsConceptId>("all");

  const filteredCases = useMemo(() => {
    return CASE_STUDIES_BANK.filter((cs) => {
      if (selectedConcept !== "all" && !cs.concepts.includes(selectedConcept)) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = cs.title.toLowerCase().includes(q);
        const matchesContext = cs.domainOrContext.toLowerCase().includes(q);
        const matchesMech = cs.physicalMechanism.toLowerCase().includes(q);
        const matchesLink = cs.syllabusLink.toLowerCase().includes(q);
        return matchesTitle || matchesContext || matchesMech || matchesLink;
      }
      return true;
    });
  }, [search, selectedConcept]);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Globe2 className="w-4 h-4" />
          <span>Real-World Physical Systems & Engineering Dossier</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          Case Study & Engineering Vault
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Explore authentic engineering feats and astrophysical phenomena demonstrating theoretical physics principles in practice, complete with quantitative numerical proofs.
        </p>

        {/* Search */}
        <div className="relative mt-5 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search case studies (e.g. SpaceX, JWST, Maglev, ITER, Crumple, Venus)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/70 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Concept Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            onClick={() => setSelectedConcept("all")}
            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              selectedConcept === "all"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            All Case Studies ({CASE_STUDIES_BANK.length})
          </button>
          {PHYSICS_CONCEPTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedConcept(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedConcept === c.id
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            className="liquid-glass-card rounded-3xl p-6 bg-slate-900/70 border border-white/10 space-y-3.5 hover:border-cyan-500/30 transition-all shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                {cs.syllabusLink}
              </span>
              <div className="flex items-center gap-1">
                {cs.concepts.map((cid) => (
                  <span
                    key={cid}
                    className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-cyan-950/60 text-cyan-400 border border-cyan-500/20"
                  >
                    {cid}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100">{cs.title}</h3>
              <p className="text-xs font-mono text-cyan-300/80">{cs.domainOrContext}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <MathText text={cs.physicalMechanism} />
            </p>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-cyan-500/20 text-xs text-cyan-200 font-mono">
              <strong className="text-cyan-300 block mb-0.5">Quantitative Calculation:</strong>
              <MathText text={cs.quantitativeInsight} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyVaultView;
