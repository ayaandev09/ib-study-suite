"use client";

import React, { useState } from "react";
import { BookMarked, Calculator, Activity, CloudRain, Users, Sparkles } from "lucide-react";
import { GEO_FORMULAS, GEO_GLOSSARY } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { MathText } from "./MathText";
import { MathFormula } from "./MathFormula";
import { MiniSectionSearch } from "@/components/MiniSectionSearch";

export function LexiconDossierView() {
  const { levelFilter } = useStudyStore();
  const [activeTab, setActiveTab] = useState<"dossier" | "lab">("dossier");
  const [query, setQuery] = useState("");

  // DTM State
  const [dtmStage, setDtmStage] = useState<1 | 2 | 3 | 4 | 5>(2);

  // Hydrograph State
  const [landUse, setLandUse] = useState<"urban" | "forested">("urban");
  const [basinRelief, setBasinRelief] = useState<"steep" | "gentle">("steep");
  const [soilType, setSoilType] = useState<"impermeable" | "permeable">("impermeable");
  const [rainIntensity, setRainIntensity] = useState<"storm" | "gentle">("storm");

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
    <div className="w-full px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Models, Equations &amp; Lexicon
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Quantitative formulas, spatial indices, and IB Geography command definitions.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("dossier")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === "dossier"
                ? "bg-teal-500/25 border border-teal-400/40 text-teal-200 font-bold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Equations &amp; Glossary</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("lab")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer transition-all ${
              activeTab === "lab"
                ? "bg-teal-500/25 border border-teal-400/40 text-teal-200 font-bold shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Spatial Lab</span>
          </button>
        </div>
      </div>

      {activeTab === "dossier" && (
        <>
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
            </>
      )}

      {activeTab === "lab" && (
        <div className="space-y-6">
          {/* 1. Interactive Demographic Transition Model (DTM) */}
          <div className="liquid-glass-card rounded-[28px] p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/30 text-[10px] font-mono uppercase tracking-wider text-teal-300">
                Unit 1.1 · Population &amp; Demographics
              </span>
              <span className="text-xs font-mono text-white/50">Demographic Transition Model (DTM)</span>
            </div>
            <h3 className="text-xl font-bold text-white">Demographic Transition Model (DTM) Simulator</h3>
            <p className="text-sm text-white/70">
              Select a stage to explore birth rates, death rates, natural increase, and population pyramid geometry across the 5 DTM stages.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { stage: 1 as const, label: "Stage 1", title: "High Stationary", ex: "Tribal groups" },
                { stage: 2 as const, label: "Stage 2", title: "Early Expanding", ex: "Niger, Mali" },
                { stage: 3 as const, label: "Stage 3", title: "Late Expanding", ex: "Brazil, India" },
                { stage: 4 as const, label: "Stage 4", title: "Low Stationary", ex: "USA, France" },
                { stage: 5 as const, label: "Stage 5", title: "Declining", ex: "Japan, Italy" },
              ].map((s) => (
                <button
                  key={s.stage}
                  onClick={() => setDtmStage(s.stage)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    dtmStage === s.stage
                      ? "bg-teal-500/25 border-teal-400/50 text-white shadow-md"
                      : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <p className="text-[10px] font-mono uppercase text-teal-300 font-bold">{s.label}</p>
                  <p className="text-xs font-bold mt-0.5 text-white">{s.title}</p>
                  <p className="text-[10px] text-white/50 mt-0.5 truncate">{s.ex}</p>
                </button>
              ))}
            </div>

            {(() => {
              const dtmData = {
                1: { cbr: 40, cdr: 38, pir: "Expansive (wide base, concave sides)", div: "High infant mortality; zero demographic dividend" },
                2: { cbr: 38, cdr: 14, pir: "Expansive (very wide base, rapid growth)", div: "High youth dependency ratio (0–14 years)" },
                3: { cbr: 20, cdr: 8, pir: "Stationary emerging (narrowing base)", div: "Prime window for Demographic Dividend" },
                4: { cbr: 11, cdr: 9, pir: "Contracting base, box-like profile", div: "Low dependency, stable labor force" },
                5: { cbr: 7, cdr: 11, pir: "Inverted pyramid (narrow base, heavy apex)", div: "Severe elderly dependency crisis (>65 years)" },
              }[dtmStage];

              const nir = ((dtmData.cbr - dtmData.cdr) / 10).toFixed(1);
              const doubling = Number(nir) > 0 ? (70 / Number(nir)).toFixed(0) : "N/A (Shrinking)";

              return (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div className="text-center p-3 rounded-xl bg-white/[0.04]">
                    <p className="text-[10px] font-mono uppercase text-white/50">Birth Rate (CBR)</p>
                    <p className="text-xl font-bold text-teal-300 font-mono mt-0.5">{dtmData.cbr} / 1000</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.04]">
                    <p className="text-[10px] font-mono uppercase text-white/50">Death Rate (CDR)</p>
                    <p className="text-xl font-bold text-rose-300 font-mono mt-0.5">{dtmData.cdr} / 1000</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-teal-500/[0.08] border border-teal-400/25">
                    <p className="text-[10px] font-mono uppercase text-teal-300">Natural Increase (NIR)</p>
                    <p className="text-xl font-bold text-white font-mono mt-0.5">{Number(nir) > 0 ? `+${nir}%` : `${nir}%`}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">Doubling: {doubling} yrs</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/[0.04]">
                    <p className="text-[10px] font-mono uppercase text-white/50">Pyramid Profile</p>
                    <p className="text-xs font-semibold text-white mt-1 leading-snug">{dtmData.pir}</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 2. Interactive Storm Hydrograph & River Basin Dynamics */}
          <div className="liquid-glass-card rounded-[28px] p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/15 border border-teal-400/30 text-[10px] font-mono uppercase tracking-wider text-teal-300">
                Unit 2.1 · Freshwater Drainage Basins
              </span>
              <span className="text-xs font-mono text-white/50">Flood Hydrograph Lab</span>
            </div>
            <h3 className="text-xl font-bold text-white">Storm Hydrograph &amp; Basin Response Simulator</h3>
            <p className="text-sm text-white/70">
              Toggle basin variables to see their impact on lag time, peak discharge, and flood risk (flashy vs subdued response).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs">
              <div className="space-y-1">
                <span className="text-white/60">Land Use:</span>
                <div className="flex rounded-xl bg-white/[0.06] p-0.5">
                  <button
                    onClick={() => setLandUse("urban")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      landUse === "urban" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Urban
                  </button>
                  <button
                    onClick={() => setLandUse("forested")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      landUse === "forested" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Forested
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-white/60">Basin Relief:</span>
                <div className="flex rounded-xl bg-white/[0.06] p-0.5">
                  <button
                    onClick={() => setBasinRelief("steep")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      basinRelief === "steep" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Steep
                  </button>
                  <button
                    onClick={() => setBasinRelief("gentle")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      basinRelief === "gentle" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Gentle
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-white/60">Soil Geology:</span>
                <div className="flex rounded-xl bg-white/[0.06] p-0.5">
                  <button
                    onClick={() => setSoilType("impermeable")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      soilType === "impermeable" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Granite
                  </button>
                  <button
                    onClick={() => setSoilType("permeable")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      soilType === "permeable" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Chalk
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-white/60">Precipitation:</span>
                <div className="flex rounded-xl bg-white/[0.06] p-0.5">
                  <button
                    onClick={() => setRainIntensity("storm")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      rainIntensity === "storm" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Storm
                  </button>
                  <button
                    onClick={() => setRainIntensity("gentle")}
                    className={`w-1/2 py-1 rounded-lg text-center font-semibold cursor-pointer ${
                      rainIntensity === "gentle" ? "bg-teal-500/30 text-teal-200" : "text-white/50"
                    }`}
                  >
                    Drizzle
                  </button>
                </div>
              </div>
            </div>

            {(() => {
              let lag = 12;
              let peak = 40;
              if (landUse === "urban") { lag -= 4; peak += 35; }
              if (basinRelief === "steep") { lag -= 3; peak += 25; }
              if (soilType === "impermeable") { lag -= 2; peak += 20; }
              if (rainIntensity === "storm") { lag -= 1; peak += 30; }

              const isFlashy = lag <= 5;

              return (
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isFlashy ? "bg-rose-500/[0.08] border-rose-400/25" : "bg-teal-500/[0.08] border-teal-400/25"
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        isFlashy ? "bg-rose-500/20 text-rose-300" : "bg-teal-500/20 text-teal-300"
                      }`}>
                        {isFlashy ? "FLASHY HYDROGRAPH (High Flood Risk)" : "SUBDUED HYDROGRAPH (Low Flood Risk)"}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed">
                      {isFlashy
                        ? "Rapid surface runoff over impermeable surfaces and steep slopes causes rapid catchment delivery."
                        : "High vegetation interception and permeable infiltration delay overland flow, elongating lag time."}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 text-center font-mono">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase">Lag Time</p>
                      <p className={`text-lg font-bold ${isFlashy ? "text-rose-300" : "text-teal-300"}`}>{lag} Hours</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase">Peak Discharge</p>
                      <p className={`text-lg font-bold ${isFlashy ? "text-rose-300" : "text-teal-300"}`}>{peak} m³/s</p>
                    </div>
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
