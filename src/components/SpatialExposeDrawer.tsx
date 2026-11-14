"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { MODULE_CATALOG, SUBJECT_CLUSTERS, PRESET_SNAPSHOTS } from "@/data/modulesMeta";
import {
  X,
  Maximize2,
  Bookmark,
  Edit2,
  Check,
  Layers,
} from "lucide-react";

const SUBJECT_DOT_COLORS: Record<string, string> = {
  biology: "#22c55e",
  business: "#2563eb",
  economics: "#0ea5e9",
  physics: "#6366f1",
  german: "#d946ef",
  orwell: "#f43f5e",
  geography: "#14b8a6",
};

export function SpatialExposeDrawer() {
  const {
    isExposeOpen,
    setExposeOpen,
    openInstances,
    primaryInstanceId,
    activateInstance,
    closeInstance,
    openModule,
    loadSnapshot,
    enabledSubjects,
    saveCurrentAsSnapshot,
    updateInstanceLabel,
  } = useWorkspaceStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [newSnapshotName, setNewSnapshotName] = useState("");

  const handleStartRename = (id: string, currentLabel: string) => {
    setEditingId(id);
    setEditingText(currentLabel);
  };

  const handleSaveRename = (id: string) => {
    if (editingText.trim()) {
      updateInstanceLabel(id, editingText.trim());
    }
    setEditingId(null);
  };

  return (
    <AnimatePresence>
      {isExposeOpen && (
      <motion.div
        key="spatial-expose-overlay"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col bg-black/88 backdrop-blur-md p-6 sm:p-10 overflow-y-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between max-w-6xl w-full mx-auto pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Layers className="w-5 h-5 text-white/90" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                Spatial Exposé
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-mono">
                  {openInstances.length} active{" "}
                  {openInstances.length === 1 ? "session" : "sessions"}
                </span>
              </h2>
              <p className="text-xs text-white/50">
                Click any open module to activate it, or press{" "}
                <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white/70">
                  Esc
                </kbd>{" "}
                or{" "}
                <kbd className="px-1 py-0.5 rounded bg-white/10 font-mono text-[11px] text-white/70">
                  ⌘E
                </kbd>{" "}
                to return.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save snapshot button */}
            <button
              onClick={() => {
                setNewSnapshotName("");
                setSaveModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/80 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-white/80" />
              <span>Save Session Pair</span>
            </button>

            {/* Close Exposé */}
            <button
              onClick={() => setExposeOpen(false)}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
              title="Close Exposé (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Spatial Cards Grid */}
        <div className="max-w-6xl w-full mx-auto py-6 flex-1">
          {openInstances.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-sm mb-4">
                No modules are currently open.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {Object.values(MODULE_CATALOG)
                  .filter((mod) => enabledSubjects.includes(mod.id))
                  .map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => openModule(mod.id)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-medium text-white transition-colors"
                  >
                    Open {mod.title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openInstances.map((inst, idx) => {
                const meta = MODULE_CATALOG[inst.appId];
                const cluster = SUBJECT_CLUSTERS[inst.subjectCluster];
                const isPrimary = inst.instanceId === primaryInstanceId;

                return (
                  <motion.div
                    key={inst.instanceId}
                    layoutId={`expose-card-${inst.instanceId}`}
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.94, y: 12 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                      mass: 0.85,
                      delay: idx * 0.03,
                    }}
                    onClick={() => activateInstance(inst.instanceId)}
                    className={`group relative liquid-glass-primary rounded-3xl p-5 border cursor-pointer transition-all duration-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                      isPrimary
                        ? "border-emerald-400/40 bg-white/[0.06] shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: SUBJECT_DOT_COLORS[inst.appId] || cluster?.color }}
                        />
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                          {cluster?.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium">
                            Active Focus
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            closeInstance(inst.instanceId);
                          }}
                          className="p-1 rounded-full text-white/40 hover:text-rose-400 hover:bg-rose-500/20 transition-colors ml-1"
                          title="Close Session"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-base font-semibold text-white tracking-tight mb-1">
                      {inst.title}
                    </h3>

                    {/* Custom Label / Editable */}
                    <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                      {editingId === inst.instanceId ? (
                        <div className="flex items-center gap-1.5 mt-1">
                          <input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleSaveRename(inst.instanceId);
                              if (e.key === "Escape") setEditingId(null);
                            }}
                            autoFocus
                            className="bg-black/80 border border-white/30 rounded-lg px-2 py-0.5 text-xs text-white focus:outline-none focus:border-white/60 w-full font-mono"
                          />
                          <button
                            onClick={() => handleSaveRename(inst.instanceId)}
                            className="p-1 rounded bg-white/20 text-white hover:bg-white/30"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            handleStartRename(
                              inst.instanceId,
                              inst.customLabel || meta?.tagline || ""
                            )
                          }
                          className="group/lbl flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 cursor-pointer transition-colors"
                        >
                          <span className="truncate">
                            {inst.customLabel || meta?.tagline}
                          </span>
                          <Edit2 className="w-3 h-3 opacity-0 group-hover/lbl:opacity-100 text-white/40 transition-opacity" />
                        </div>
                      )}
                    </div>

                    {/* Quick Specs Slate */}
                    <div className="rounded-2xl bg-black/40 border border-white/5 p-3 mb-4 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-white/40 text-[11px]">
                        <span>Subject Code:</span>
                        <span className="font-mono text-white/70">
                          {meta?.subjectCode}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-white/40 text-[11px]">
                        <span>Level:</span>
                        <span className="font-mono text-white/70">
                          {meta?.level}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          activateInstance(inst.instanceId);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.18] text-white text-xs font-medium transition-colors border border-white/10 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Open Module</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Launch Study Presets Row at bottom */}
        <div className="max-w-6xl w-full mx-auto pt-6 border-t border-white/10">
          <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
            Quick-Launch Study Pairs & Comparative Studio Presets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRESET_SNAPSHOTS.map((snap) => (
              <button
                key={snap.id}
                onClick={() => loadSnapshot(snap)}
                className="flex flex-col text-left p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-white/80 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
                    {snap.clusterBadge}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {snap.splitRatio}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white/90 group-hover:text-white mb-0.5">
                  {snap.name}
                </div>
                <div className="text-[11px] text-white/40 line-clamp-1">
                  {snap.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Save Snapshot Modal */}
        <AnimatePresence>
          {saveModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div className="liquid-glass-elevated rounded-3xl p-6 max-w-md w-full border border-white/20 shadow-2xl">
                <h3 className="text-base font-semibold text-white mb-2">
                  Save Study Combination
                </h3>
                <p className="text-xs text-white/50 mb-4">
                  Save the currently open single or split-screen modules as a
                  reusable study snapshot.
                </p>
                <input
                  type="text"
                  placeholder="e.g., Paper 2 Revision: Biology + Physics"
                  value={newSnapshotName}
                  onChange={(e) => setNewSnapshotName(e.target.value)}
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 mb-4 font-mono text-xs"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSaveModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      saveCurrentAsSnapshot(
                        newSnapshotName.trim() || "Custom Study Snapshot",
                        "User saved study session combination"
                      );
                      setSaveModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors"
                  >
                    Save Snapshot
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
