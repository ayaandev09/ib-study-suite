"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, SlidersHorizontal, User } from "lucide-react";
import { MODULE_CATALOG, SUBJECT_CLUSTERS } from "@/data/modulesMeta";
import { AppId } from "@/types/workspace";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const USER_NAME_KEY = "ib_suite_user_name_v1";

export function SubjectSettingsModal() {
  const {
    isSettingsOpen,
    setSettingsOpen,
    enabledSubjects,
    toggleSubjectEnabled,
    setEnabledSubjects,
    subjectLevels,
    setSubjectLevel,
  } = useWorkspaceStore();

  const [userName, setUserName] = useState("Ayaan");

  useEffect(() => {
    if (!isSettingsOpen || typeof window === "undefined") return;
    const saved = localStorage.getItem(USER_NAME_KEY);
    if (saved) setUserName(saved);
  }, [isSettingsOpen]);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSettingsOpen, setSettingsOpen]);

  const handleNameChange = (value: string) => {
    setUserName(value);
    if (typeof window !== "undefined" && value.trim()) {
      localStorage.setItem(USER_NAME_KEY, value.trim());
      window.dispatchEvent(
        new CustomEvent("ib-suite-user-updated", {
          detail: { name: value.trim() },
        })
      );
    }
  };

  const allSubjectIds = Object.keys(MODULE_CATALOG) as AppId[];

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={() => setSettingsOpen(false)}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[28px] border border-white/20 bg-zinc-950/90 backdrop-blur-3xl shadow-[0_32px_90px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.18)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white/85">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Subjects &amp; Preferences
                  </h2>
                  <p className="text-[11px] text-white/50">
                    Choose which IB modules appear in your suite and set SL/HL levels.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Close Settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/55 font-mono">
                  <User className="w-3.5 h-3.5" />
                  <span>Display Name</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-white/35 focus:outline-none text-sm text-white placeholder:text-white/30"
                />
              </div>

              {/* Subject Toggles + Levels */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/55 font-mono">
                    Active IB Subjects ({enabledSubjects.length}/{allSubjectIds.length})
                  </span>
                  {enabledSubjects.length < allSubjectIds.length && (
                    <button
                      type="button"
                      onClick={() => setEnabledSubjects(allSubjectIds)}
                      className="text-[11px] text-teal-300 hover:text-teal-200 font-medium cursor-pointer"
                    >
                      Enable All
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {Object.values(MODULE_CATALOG).map((mod) => {
                    const isEnabled = enabledSubjects.includes(mod.id);
                    const level = subjectLevels[mod.id] || "HL";
                    const color = SUBJECT_CLUSTERS[mod.cluster].color;
                    const isLastEnabled = isEnabled && enabledSubjects.length === 1;

                    return (
                      <div
                        key={mod.id}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl border transition-all ${
                          isEnabled
                            ? "bg-white/[0.06] border-white/15"
                            : "bg-white/[0.02] border-white/[0.06] opacity-60"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleSubjectEnabled(mod.id)}
                          disabled={isLastEnabled}
                          title={
                            isLastEnabled
                              ? "At least 1 subject must stay active"
                              : isEnabled
                              ? `Hide ${mod.shortTitle}`
                              : `Add ${mod.shortTitle}`
                          }
                          className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer disabled:cursor-not-allowed"
                        >
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                              isEnabled
                                ? "bg-white text-black border-white"
                                : "bg-white/[0.04] text-transparent border-white/25"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: color,
                              boxShadow: isEnabled ? `0 0 10px ${color}` : undefined,
                            }}
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-white truncate">
                              {mod.title}
                            </div>
                            <div className="text-[10px] text-white/45 font-mono truncate">
                              {mod.subjectCode} · {mod.tagline}
                            </div>
                          </div>
                        </button>

                        {isEnabled && (
                          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-black/40 border border-white/10 shrink-0">
                            {(["SL", "HL"] as const).map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setSubjectLevel(mod.id, lvl)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer ${
                                  level === lvl
                                    ? "bg-white text-black shadow-sm"
                                    : "text-white/50 hover:text-white"
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-black/30 flex items-center justify-between">
              <span className="text-[11px] text-white/40 font-mono">
                Changes apply immediately across Dashboard, Tabs &amp; AI Search
              </span>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-white hover:bg-white/90 text-black text-xs font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
