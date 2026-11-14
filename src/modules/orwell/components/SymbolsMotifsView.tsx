"use client";

import React, { useState } from "react";
import { Gem, Sparkles, Search, Bookmark, Tag } from "lucide-react";
import { SYMBOLS_LEXICON, SymbolItem } from "@/modules/orwell/data";
import { NewspeakTranslatorSimulator } from "./NewspeakTranslatorSimulator";

export const SymbolsMotifsView: React.FC = React.memo(() => {
  const [activeTab, setActiveTab] = useState<"symbols" | "lab">("symbols");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSymbolId, setActiveSymbolId] = useState<string>(SYMBOLS_LEXICON[0]?.id || "");

  const categories = ["all", "Object", "Figure", "Place", "Text"];

  const filteredSymbols = SYMBOLS_LEXICON.filter((s) => {
    const matchesCat = selectedCategory === "all" || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.meaning.toLowerCase().includes(query) ||
      s.evolution.toLowerCase().includes(query) ||
      s.firstAppearance.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const activeSymbol = SYMBOLS_LEXICON.find((s) => s.id === activeSymbolId) || filteredSymbols[0] || SYMBOLS_LEXICON[0];

  return (
    <div className="space-y-5">
      {/* Top Segmented Header Bar */}
      <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/30">
            <Gem className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Symbols, Motifs &amp; Linguistic Apparatus
            </h2>
            <p className="text-xs text-slate-400">
              Curated core iconography, recurring leitmotifs &amp; Newspeak translation
            </p>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-2xl bg-black/60 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab("symbols")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "symbols"
                ? "bg-rose-500/25 text-rose-200 border border-rose-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gem className="w-3.5 h-3.5 text-rose-300" />
            <span>Symbols &amp; Motifs ({SYMBOLS_LEXICON.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("lab")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "lab"
                ? "bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Newspeak Translation Lab</span>
          </button>
        </div>
      </div>

      {activeTab === "lab" ? (
        <NewspeakTranslatorSimulator />
      ) : (
        <div className="space-y-4">
          {/* Filter Bar & Search */}
          <div className="liquid-glass-bento rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3 text-rose-400" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors capitalize ${
                    selectedCategory === cat
                      ? "bg-rose-500 text-slate-950 font-bold"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search motifs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400/50"
              />
            </div>
          </div>

          {/* Master-Detail Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Symbol Cards Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {filteredSymbols.map((item) => {
                const isSelected = item.id === activeSymbol.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSymbolId(item.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer block ${
                      isSelected
                        ? "bg-white/[0.12] border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-[1.01]"
                        : "bg-black/40 hover:bg-white/[0.05] border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.meaning}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: In-Depth Analytical Dossier (7 cols) */}
            <div className="lg:col-span-7">
              {activeSymbol && (
                <div className="rounded-3xl p-6 sm:p-7 space-y-5 bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white/90 border border-white/20 uppercase">
                          {activeSymbol.category}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {activeSymbol.firstAppearance}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeSymbol.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                        Core Thematic Meaning &amp; Function
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {activeSymbol.meaning}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                      <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                        Narrative Evolution &amp; Dramatic Climax
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {activeSymbol.evolution}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

SymbolsMotifsView.displayName = "SymbolsMotifsView";
