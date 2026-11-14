"use client";

import React, { useState } from "react";
import { DIAGRAMS_DOSSIER, SYLLABUS_THEMES, ThemeId } from "@/modules/physics/data";
import { InteractiveDiagram } from "./InteractiveDiagram";
import { Layers, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export const DiagramLabView: React.FC = () => {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(
    DIAGRAMS_DOSSIER[0].id
  );
  const [selectedTheme, setSelectedTheme] = useState<"all" | ThemeId>("all");

  const filteredDiagrams = DIAGRAMS_DOSSIER.filter((d) =>
    selectedTheme === "all" ? true : d.themeId === selectedTheme
  );

  const activeDiagram =
    DIAGRAMS_DOSSIER.find((d) => d.id === selectedDiagramId) ||
    DIAGRAMS_DOSSIER[0];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          <Layers className="w-4 h-4" />
          <span>Interactive Visual Laboratory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          Physics Vector & Simulation Lab
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Interactive SVG vector diagrams mapping physical phenomena across all 5 themes. Modulate kinematic launch angles, inclined plane friction limits, potential divider sensor circuits, standing wave harmonics, and binding energy curves in real time.
        </p>

        {/* Theme Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button
            onClick={() => setSelectedTheme("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              selectedTheme === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
            }`}
          >
            All Diagrams ({DIAGRAMS_DOSSIER.length})
          </button>
          {SYLLABUS_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              Theme {theme.code.replace("THEME ", "")}: {theme.shortTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Selector sidebar + Active Diagram Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Diagram selector list */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          {filteredDiagrams.map((d) => {
            const isSelected = d.id === selectedDiagramId;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDiagramId(d.id)}
                className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-950/60 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "bg-slate-900/60 border-white/5 hover:border-white/15 hover:bg-slate-900/90 text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-500/20">
                    Topic {d.topicRef}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                    {d.themeId.replace("theme-", "Theme ")}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100 line-clamp-1">
                  {d.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {d.whyItMatters}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Diagram Canvas */}
        <div className="lg:col-span-8">
          <InteractiveDiagram diagramId={activeDiagram.id} />
        </div>
      </div>
    </div>
  );
};

export default DiagramLabView;
