"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Search,
  Headphones,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Play,
  X,
  Sparkles,
  Music,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { useSoundStore } from "@/store/useSoundStore";
import { MODULE_CATALOG, SUBJECT_CLUSTERS } from "@/data/modulesMeta";

export const IPhoneBottomDock: React.FC = () => {
  const {
    activeView,
    setDashboardView,
    setWorkspaceView,
    openInstances,
    primaryInstanceId,
    activateInstance,
    openModule,
    enabledSubjects,
    setSettingsOpen,
  } = useWorkspaceStore();

  const {
    isMuted,
    toggleMute,
    isAmbiencePlaying,
    toggleAmbience,
    ambienceVolume,
    setAmbienceVolume,
    volume,
    setVolume,
    playClick,
    playPop,
    playChime,
  } = useSoundStore();

  const [isSubjectsSheetOpen, setIsSubjectsSheetOpen] = useState(false);
  const [isAudioSheetOpen, setIsAudioSheetOpen] = useState(false);

  const enabledModules = Object.values(MODULE_CATALOG).filter((m) =>
    enabledSubjects.includes(m.id)
  );

  return (
    <>
      {/* ====================================================================
          1. iPhone Floating Frosted Liquid Glass Bottom Dock (Mobile Only)
         ==================================================================== */}
      <nav
        aria-label="iPhone Navigation Bar"
        className="md:hidden fixed bottom-[max(env(safe-area-inset-bottom),12px)] inset-x-3 z-[90] max-w-[390px] mx-auto select-none pointer-events-auto"
      >
        <div className="relative rounded-full p-1.5 bg-[#090d16]/85 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-around">
          {/* Top-Edge Specular Glass Light Crescent */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* 1. Home / Dashboard */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setDashboardView();
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-11 rounded-full transition-all ${
              activeView === "dashboard"
                ? "text-white bg-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[9.5px] font-medium tracking-tight mt-0.5">Home</span>
            {activeView === "dashboard" && (
              <motion.div
                layoutId="activeDockPill"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]"
              />
            )}
          </button>

          {/* 2. Subjects Launcher Sheet */}
          <button
            type="button"
            onClick={() => {
              playPop();
              setIsSubjectsSheetOpen(true);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-11 rounded-full transition-all ${
              activeView === "workspace"
                ? "text-white bg-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[9.5px] font-medium tracking-tight mt-0.5">Subjects</span>
            {openInstances.length > 0 && (
              <span className="absolute 1 top-1 right-2.5 w-3.5 h-3.5 rounded-full bg-cyan-400 text-black text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                {openInstances.length}
              </span>
            )}
            {activeView === "workspace" && (
              <motion.div
                layoutId="activeDockPill"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]"
              />
            )}
          </button>

          {/* 3. Universal Search Spotlight */}
          <button
            type="button"
            onClick={() => {
              playClick();
              window.dispatchEvent(new CustomEvent("ib-suite-open-search"));
            }}
            className="flex flex-col items-center justify-center w-14 h-11 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-[9.5px] font-medium tracking-tight mt-0.5">Search</span>
          </button>

          {/* 4. Audio & Ambience Soundboard */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsAudioSheetOpen((prev) => !prev);
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-11 rounded-full transition-all ${
              isAmbiencePlaying
                ? "text-cyan-300 bg-cyan-400/20 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                : isMuted
                ? "text-rose-400/80"
                : "text-white/60 hover:text-white"
            }`}
          >
            {isAmbiencePlaying ? (
              <Headphones className="w-4 h-4 animate-pulse" />
            ) : isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <span className="text-[9.5px] font-medium tracking-tight mt-0.5">Sounds</span>
            {isAmbiencePlaying && (
              <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          {/* 5. Suite Settings */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setSettingsOpen(true);
            }}
            className="flex flex-col items-center justify-center w-14 h-11 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-[9.5px] font-medium tracking-tight mt-0.5">Settings</span>
          </button>
        </div>
      </nav>

      {/* ====================================================================
          2. Slide-up iOS Bottom Sheet: Quick Subject Switcher
         ==================================================================== */}
      <AnimatePresence>
        {isSubjectsSheetOpen && (
          <div className="md:hidden fixed inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubjectsSheetOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative w-full max-h-[85vh] rounded-t-[32px] bg-[#0c101a] border-t border-white/20 p-5 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] overflow-y-auto pb-[max(env(safe-area-inset-bottom),2rem)]"
            >
              {/* Sheet Drag Handle */}
              <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-4" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    IB Study Courses
                  </h3>
                  <p className="text-xs text-white/50">
                    Switch active subject workspace or resume study
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubjectsSheetOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Active Open Sessions Section */}
              {openInstances.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10.5px] font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open Workspaces ({openInstances.length})</span>
                  </div>
                  <div className="space-y-2">
                    {openInstances.map((inst) => {
                      const isPrimary = inst.instanceId === primaryInstanceId;
                      return (
                        <div
                          key={inst.instanceId}
                          onClick={() => {
                            activateInstance(inst.instanceId);
                            setWorkspaceView();
                            setIsSubjectsSheetOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                            isPrimary
                              ? "bg-white/[0.12] border-cyan-400/40 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                              : "bg-white/[0.05] border-white/10 hover:bg-white/[0.09]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-white truncate">
                                {inst.title}
                              </p>
                              <p className="text-[10px] text-white/50 font-mono">
                                {inst.customLabel || "Live Study Session"}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                            {isPrimary ? "Active" : "Switch"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* All IB Modules Grid */}
              <div className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider mb-2 font-mono">
                All Available Subjects
              </div>
              <div className="space-y-2.5">
                {enabledModules.map((mod) => {
                  const cluster = SUBJECT_CLUSTERS[mod.cluster];
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => {
                        openModule(mod.id);
                        setWorkspaceView();
                        setIsSubjectsSheetOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${cluster.color}22`,
                            borderColor: `${cluster.color}45`,
                          }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: cluster.color,
                              boxShadow: `0 0 8px ${cluster.color}`,
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors truncate">
                            {mod.title}
                          </p>
                          <p className="text-[10.5px] text-white/50 truncate">
                            {mod.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                          {mod.level}
                        </span>
                        <Play className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          3. Slide-up iOS Bottom Sheet: Sounds & Focus Ambience Studio
         ==================================================================== */}
      <AnimatePresence>
        {isAudioSheetOpen && (
          <div className="md:hidden fixed inset-0 z-[100] flex flex-col justify-end pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAudioSheetOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Slide-Up Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative w-full rounded-t-[32px] bg-[#0c101a] border-t border-white/20 p-5 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] pb-[max(env(safe-area-inset-bottom),2rem)] space-y-4"
            >
              {/* Sheet Drag Handle */}
              <div className="w-10 h-1 rounded-full bg-white/25 mx-auto mb-2" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-cyan-300" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Audio &amp; Study Ambience
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAudioSheetOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Master Mute & UI Haptics Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                <div>
                  <p className="text-xs font-semibold text-white">Tactile UI Sound Effects</p>
                  <p className="text-[10.5px] text-white/50">
                    Clicks, pops, completion chimes &amp; haptic pulses
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    !isMuted
                      ? "bg-cyan-400/20 text-cyan-200 border-cyan-300/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-400/30"
                  }`}
                >
                  {!isMuted ? "Sound On" : "Muted"}
                </button>
              </div>

              {/* 432Hz Binaural Study Ambience Generator */}
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-cyan-300" />
                    <div>
                      <p className="text-xs font-semibold text-white">
                        432Hz Deep Focus Ambience
                      </p>
                      <p className="text-[10.5px] text-white/50">
                        Synthesized harmonic alpha waves for distraction-free study
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleAmbience}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isAmbiencePlaying
                        ? "bg-emerald-400/25 text-emerald-200 border-emerald-300/50 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                        : "bg-white/10 text-white/80 border-white/15 hover:bg-white/15"
                    }`}
                  >
                    {isAmbiencePlaying ? "Playing" : "Start"}
                  </button>
                </div>

                {/* Volume Slider */}
                {isAmbiencePlaying && (
                  <div className="space-y-1 pt-1 border-t border-white/10">
                    <div className="flex justify-between text-[10.5px] text-white/60 font-mono">
                      <span>Ambience Volume</span>
                      <span>{Math.round(ambienceVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={ambienceVolume}
                      onChange={(e) => setAmbienceVolume(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Test Soundboard Buttons */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10.5px] font-mono uppercase text-white/45 tracking-wider">
                  Test Synthesized Audio
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={playClick}
                    className="py-2 px-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-medium text-white transition-colors"
                  >
                    Glass Click
                  </button>
                  <button
                    type="button"
                    onClick={playPop}
                    className="py-2 px-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-medium text-white transition-colors"
                  >
                    Tab Pop
                  </button>
                  <button
                    type="button"
                    onClick={playChime}
                    className="py-2 px-1 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-medium text-white transition-colors"
                  >
                    Spatial Chime
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
