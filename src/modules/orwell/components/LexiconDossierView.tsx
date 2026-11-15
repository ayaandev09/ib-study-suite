"use client";

import React, { useState, useMemo } from "react";
import { Gem, Users, Sparkles, BookOpen } from "lucide-react";
import {
  SYMBOLS_LEXICON,
  CHARACTERS_DOSSIER,
} from "@/modules/orwell/data";
import { NewspeakTranslatorSimulator } from "./NewspeakTranslatorSimulator";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export const LexiconDossierView: React.FC = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState<"lab" | "characters" | "symbols">("lab");
  const [charQuery, setCharQuery] = useState("");
  const [symbolQuery, setSymbolQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    const q = charQuery.trim().toLowerCase();
    if (!q) return CHARACTERS_DOSSIER;
    return CHARACTERS_DOSSIER.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.psychologicalProfile.toLowerCase().includes(q) ||
        c.partyStatus.toLowerCase().includes(q) ||
        c.symbolicFunction.toLowerCase().includes(q)
    );
  }, [charQuery]);

  const filteredSymbols = useMemo(() => {
    const q = symbolQuery.trim().toLowerCase();
    if (!q) return SYMBOLS_LEXICON;
    return SYMBOLS_LEXICON.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.evolution.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [symbolQuery]);

  return (
    <div className="space-y-6">
      {/* Category Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider px-2">
            Codex Dossier Module:
          </span>
          <button
            onClick={() => setActiveCategory("lab")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "lab"
                ? "bg-rose-500/25 text-white border border-rose-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Interactive Newspeak &amp; Minitrue Lab
          </button>
          <button
            onClick={() => setActiveCategory("characters")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "characters"
                ? "bg-rose-500/25 text-white border border-rose-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-rose-400" />
            Character Psychological Dossiers ({CHARACTERS_DOSSIER.length})
          </button>
          <button
            onClick={() => setActiveCategory("symbols")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "symbols"
                ? "bg-rose-500/25 text-white border border-rose-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gem className="w-3.5 h-3.5 text-rose-400" />
            Symbols &amp; Motifs ({SYMBOLS_LEXICON.length})
          </button>
        </div>
      </div>

      {/* ==================== 1. INTERACTIVE NEWSPEAK & MINITRUE LAB ==================== */}
      {activeCategory === "lab" && <NewspeakTranslatorSimulator />}

      {/* ==================== 2. CHARACTER DOSSIERS ==================== */}
      {activeCategory === "characters" && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-300">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">
                  Miniluv Psychological &amp; Character Dossiers
                </h2>
                <p className="font-sans text-[15px] text-white/70">
                  Class caste, psychological profiles, and ideological functions
                </p>
              </div>
            </div>
          </div>

          <MiniSectionSearch
            query={charQuery}
            onQueryChange={setCharQuery}
            placeholder="Search characters by name, party status, psychological profile, or role..."
            totalCount={CHARACTERS_DOSSIER.length}
            filteredCount={filteredCharacters.length}
            accentColor="#f43f5e"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredCharacters.map((char) => (
              <div
                key={char.id}
                className="liquid-glass-bento rounded-[24px] p-6 bg-black/35 border border-white/10 flex flex-col justify-between space-y-4 hover:border-rose-400/35 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                      {char.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-rose-500/15 text-rose-300 border border-rose-400/30 shrink-0">
                      {char.partyStatus}
                    </span>
                  </div>

                  <div className="font-sans text-[14.5px] font-medium text-rose-200/90">
                    {char.role}
                  </div>

                  <p className="font-sans text-[15px] text-white/85 leading-[1.68]">
                    {char.psychologicalProfile}
                  </p>
                </div>

                <div className="space-y-3 pt-2 font-sans text-[14.5px] leading-[1.65]">
                  <div className="border-l-2 border-rose-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035]">
                    <span className="font-semibold text-rose-300">Ultimate Fate: </span>
                    <span className="text-white/85">{char.fate}</span>
                  </div>
                  <div className="border-l-2 border-white/25 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035]">
                    <span className="font-semibold text-white">
                      Literary Function:{" "}
                    </span>
                    <span className="text-white/85">{char.symbolicFunction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 3. SYMBOLS & MOTIFS LEXICON ==================== */}
      {activeCategory === "symbols" && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-300">
              <Gem className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-[-0.01em]">
                Master Symbol &amp; Motif Lexicon
              </h2>
              <p className="font-sans text-[15px] text-white/70">
                Symbolic objects, places, and structural inversions across Parts I, II &amp; III
              </p>
            </div>
          </div>

          <MiniSectionSearch
            query={symbolQuery}
            onQueryChange={setSymbolQuery}
            placeholder="Search symbols by name (paperweight, thrush, nursery rhyme, golden country), meaning, or category..."
            totalCount={SYMBOLS_LEXICON.length}
            filteredCount={filteredSymbols.length}
            accentColor="#f43f5e"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSymbols.map((sym) => (
              <div
                key={sym.id}
                className="liquid-glass-bento rounded-[24px] p-6 bg-black/35 border border-white/10 flex flex-col justify-between space-y-4 hover:border-rose-400/35 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-sans text-xl font-bold text-white tracking-[-0.01em]">
                      {sym.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-400/30 shrink-0">
                      {sym.category}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-wider text-rose-300/80">
                    First Appearance: {sym.firstAppearance}
                  </div>

                  <p className="font-sans text-[15px] text-white/85 leading-[1.68]">
                    <span className="font-semibold text-white">Symbolic Meaning: </span>
                    {sym.meaning}
                  </p>
                </div>

                <div className="border-l-2 border-rose-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] text-white/85 leading-[1.65]">
                  <span className="font-semibold text-rose-300">
                    Narrative Evolution:{" "}
                  </span>
                  {sym.evolution}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

LexiconDossierView.displayName = "LexiconDossierView";
