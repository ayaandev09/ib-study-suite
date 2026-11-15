"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  Copy,
  Check,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";
import { REDEMITTEL_DATABASE } from "@/modules/german/data/redemittel";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export function RedemittelDossierView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTier, setActiveTier] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Alle Kategorien" },
    { id: "meinung", label: "Meinungsäußerung" },
    { id: "abwaegung", label: "Abwägung & Kontraste" },
    { id: "ursache_folge", label: "Ursache & Folge" },
    { id: "beispiel_vertiefung", label: "Beispiele & Vertiefung" },
    { id: "einleitung_schluss", label: "Einleitung & Schluss" },
    { id: "muendliche_pruefung", label: "Mündliche Prüfung (IO)" },
  ];

  const tiers = [
    { id: "all", label: "Alle Niveaus" },
    { id: "Standard (B1)", label: "B1 Basis" },
    { id: "High-Scoring (B2/C1)", label: "B2/C1 Gehoben" },
    { id: "Idiomatic Mastery", label: "Meisterklasse" },
  ];

  const filtered = REDEMITTEL_DATABASE.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesTier = activeTier === "all" || item.tier === activeTier;
    const matchesQuery =
      !searchQuery ||
      item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleSentence.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesTier && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  return (
    <div className="space-y-4 liquid-view-enter">
      {/* Mini Section Search & Filters */}
      <MiniSectionSearch
        query={searchQuery}
        onQueryChange={setSearchQuery}
        placeholder="Redemittel durchsuchen (z.B. Meiner Meinung nach, Einerseits, Im Gegensatz zu)..."
        totalCount={REDEMITTEL_DATABASE.length}
        filteredCount={filtered.length}
        accentColor="#d946ef"
      />

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === c.id
                ? "bg-fuchsia-500 text-slate-950 shadow-md shadow-fuchsia-500/20"
                : "liquid-glass-pill text-slate-400 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Redemittel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            className="liquid-glass-bento p-6 rounded-[24px] border border-white/10 hover:border-fuchsia-400/40 transition-all flex flex-col justify-between text-left space-y-4 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-fuchsia-300 px-2.5 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/25">
                  {item.categoryLabel}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      item.tier === "Idiomatic Mastery"
                        ? "bg-fuchsia-500/20 border-fuchsia-400/35 text-fuchsia-200"
                        : item.tier === "High-Scoring (B2/C1)"
                        ? "bg-fuchsia-500/10 border-fuchsia-400/25 text-fuchsia-300"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    {item.tier}
                  </span>

                  <button
                    onClick={() => handleCopy(item.id, item.phrase)}
                    title="Redewendung kopieren"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-fuchsia-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phrase Header */}
              <div>
                <h4 className="font-sans text-xl font-bold text-white tracking-[-0.01em] mb-1.5 group-hover:text-fuchsia-200 transition-colors">
                  „{item.phrase}“
                </h4>
                <p className="font-sans text-[15px] leading-[1.68] text-fuchsia-200/85 italic">
                  {item.englishMeaning}
                </p>
              </div>
            </div>

            {/* Example in Context */}
            <div className="border-l-2 border-fuchsia-400/60 pl-4 py-3 pr-4 rounded-r-2xl bg-white/[0.035] font-sans text-[14.5px] text-white/85 leading-[1.65]">
              <span className="font-semibold text-fuchsia-300">
                Anwendungsbeispiel:{" "}
              </span>
              {item.exampleSentence}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
