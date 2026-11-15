"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Tag, CheckCircle2, ShieldCheck, ArrowRight, Layers, LayoutGrid } from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

interface ReleaseItem {
  version: string;
  tag: string;
  date: string;
  isLatest?: boolean;
  highlight: string;
  features: {
    category: string;
    title: string;
    description: string;
    badge?: string;
  }[];
}

const RELEASE_HISTORY: ReleaseItem[] = [
  {
    version: "v1.1.0",
    tag: "May 2027 Syllabus & Polish",
    date: "November 15, 2026",
    isLatest: true,
    highlight: "Comprehensive Redesign of Revise Entry Tickets, Topics Bento Flows & Crisp Native Visuals",
    features: [
      {
        category: "Study & Revision",
        title: "Lesson Entry Ticket & Master Summaries",
        description: "Organized unit and subunit digest cards across all subjects. 60-second takeaways, key formulas, character/motif analysis, and hand-raising discussion points ready for class.",
        badge: "New Hub"
      },
      {
        category: "Topics Workspace",
        title: "Clean Liquid Glass Bento Layout",
        description: "Re-engineered Topics & Chapters into spacious, comfortable single-column Bento stacks. Zero information overload, rounded comfortable fonts, and instant clarity.",
        badge: "UX Redesign"
      },
      {
        category: "Visuals & Rendering",
        title: "Geometric Precision Vectors & 1024px App Icons",
        description: "Eliminated SVG filter downsampling blur. All 7 subject badges and native macOS/Windows icons now render razor-sharp across Retina and 4K displays.",
        badge: "Retina 4K"
      },
      {
        category: "Coursework Flow",
        title: "Syllabus Checklist Navigation",
        description: "Replaced Executive Streams with dedicated checkable syllabus trackers for all May 2027 units and subunits.",
        badge: "Curriculum"
      }
    ]
  },
  {
    version: "v1.0.0",
    tag: "Initial Launch",
    date: "November 14, 2026",
    highlight: "The Unified IB Diploma Study Suite for macOS and Windows",
    features: [
      {
        category: "Spatial Suite",
        title: "7 Integrated IB Subjects",
        description: "Biology SL/HL, Physics SL/HL, Economics SL/HL, Business Management SL/HL, Geography SL/HL, German B SL/HL, and Orwell 1984 Literature Codex.",
        badge: "7 Apps in 1"
      },
      {
        category: "Intelligence",
        title: "Universal Cross-Subject Search",
        description: "Offline instant search across all 7 syllabi with instant AI formula synthesis, exam guidance, and deep topic linking.",
        badge: "⌘K AI"
      },
      {
        category: "Architecture",
        title: "Spatial Split View & Cockpit",
        description: "Dual-pane side-by-side study workspace, dual timezone cockpit clocks, and Apple Calendar integration.",
        badge: "Liquid Glass"
      }
    ]
  }
];

export function ReleaseNotesModal() {
  const { isReleaseNotesOpen, setReleaseNotesOpen } = useWorkspaceStore();

  useEffect(() => {
    if (!isReleaseNotesOpen || typeof window === "undefined") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReleaseNotesOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReleaseNotesOpen, setReleaseNotesOpen]);

  return (
    <AnimatePresence>
      {isReleaseNotesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setReleaseNotesOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] flex flex-col rounded-[32px] bg-[#0c1017]/95 border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Release Notes &amp; Updates
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/35">
                      Latest: v1.1.0
                    </span>
                  </div>
                  <p className="text-xs text-white/55">
                    What's new across the IB Diploma Study Suite
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReleaseNotesOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] transition-colors cursor-pointer"
                title="Close Release Notes"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
              {RELEASE_HISTORY.map((rel) => (
                <div key={rel.version} className="space-y-4">
                  {/* Version Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
                        {rel.version}
                      </span>
                      <span className="text-sm font-semibold text-white/90">
                        {rel.tag}
                      </span>
                      {rel.isLatest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/35 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Current Active Build
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-white/45">
                      {rel.date}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 font-medium italic">
                    {rel.highlight}
                  </p>

                  {/* Feature Bento Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {rel.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 transition-colors flex flex-col justify-between space-y-2.5"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400/80">
                              {feat.category}
                            </span>
                            {feat.badge && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.07] text-white/75 border border-white/10">
                                {feat.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {feat.title}
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed font-sans">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-white/50">
              <span className="font-mono">IB Study Suite · Offline Native Build</span>
              <button
                type="button"
                onClick={() => setReleaseNotesOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
