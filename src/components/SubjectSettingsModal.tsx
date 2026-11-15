"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  SlidersHorizontal,
  User,
  Globe2,
  Clock,
  Plus,
  Trash2,
  Search,
  RotateCcw,
  Sun,
  Moon,
  BookOpen,
} from "lucide-react";
import { MODULE_CATALOG, SUBJECT_CLUSTERS } from "@/data/modulesMeta";
import { AppId } from "@/types/workspace";
import { useWorkspaceStore, WorldClockItem } from "@/store/useWorkspaceStore";
import { POPULAR_WORLD_CITIES, searchCities, WorldCity } from "@/data/worldCities";

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
    worldClocks,
    addWorldClock,
    removeWorldClock,
    resetWorldClocks,
  } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<"curriculum" | "clocks">("curriculum");
  const [userName, setUserName] = useState("Ayaan");
  const [citySearch, setCitySearch] = useState("");
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const matchingCities = useMemo(() => {
    return searchCities(citySearch);
  }, [citySearch]);

  const getCityLiveTime = (timezone: string) => {
    try {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).formatToParts(now);

      const hour24Parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        hour: "2-digit",
        hour12: false,
      }).formatToParts(now);

      const hour12 = parts.find((p) => p.type === "hour")?.value || "12";
      const minute = parts.find((p) => p.type === "minute")?.value || "00";
      const second = parts.find((p) => p.type === "second")?.value || "00";
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "AM";
      const hour24 = Number(hour24Parts.find((p) => p.type === "hour")?.value || "12") % 24;
      const isDaytime = hour24 >= 6 && hour24 < 19;

      return { hour12, minute, second, dayPeriod, isDaytime };
    } catch {
      return { hour12: "--", minute: "--", second: "--", dayPeriod: "", isDaytime: true };
    }
  };

  const handleAddCity = (city: WorldCity) => {
    addWorldClock({
      id: city.id,
      city: city.city,
      country: city.country,
      timezone: city.timezone,
    });
    setCitySearch("");
  };

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
            className="w-full max-w-2xl rounded-[28px] border border-white/20 bg-zinc-950/95 backdrop-blur-3xl shadow-[0_32px_90px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.18)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-white/90">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Suite Settings &amp; Preferences
                  </h2>
                  <p className="text-[11px] text-white/50">
                    Customize your IB subjects, curriculum levels, and custom world clocks.
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

            {/* Sub-Header Tabs */}
            <div className="px-6 py-2.5 border-b border-white/10 bg-white/[0.02] flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("curriculum")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "curriculum"
                    ? "bg-white text-black shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Active Subjects &amp; Levels</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("clocks")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "clocks"
                    ? "bg-white text-black shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>World Clocks &amp; Country Times</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                  {worldClocks.length}
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {activeTab === "curriculum" ? (
                <>
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
                </>
              ) : (
                /* World Clocks & Custom Times View */
                <div className="space-y-6">
                  {/* Top explanation */}
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/20 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-white/80 leading-relaxed">
                      Configure your cockpit timezones and custom country times. Added clocks will automatically synchronize and display live across your desktop command center and top widgets.
                    </div>
                  </div>

                  {/* Active Clocks List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/55 font-mono">
                        Active World Clocks ({worldClocks.length})
                      </span>
                      <button
                        type="button"
                        onClick={resetWorldClocks}
                        className="flex items-center gap-1.5 text-[11px] text-cyan-300 hover:text-cyan-200 cursor-pointer font-mono"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset Defaults
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {worldClocks.map((clock) => {
                        const time = getCityLiveTime(clock.timezone);
                        return (
                          <div
                            key={clock.id}
                            className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/12 flex items-center justify-between gap-3 shadow-sm hover:border-white/25 transition-all"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
                                  {clock.city}
                                </span>
                                {time.isDaytime ? (
                                  <Sun className="w-3 h-3 text-amber-300 shrink-0" />
                                ) : (
                                  <Moon className="w-3 h-3 text-indigo-300 shrink-0" />
                                )}
                              </div>
                              <div className="text-[10px] text-white/50 font-mono truncate">
                                {clock.country} · {clock.timezone}
                              </div>
                              <div className="mt-1 flex items-baseline gap-1 text-base font-bold tabular-nums text-cyan-300 font-mono">
                                <span>{time.hour12}:{time.minute}</span>
                                <span className="text-xs text-cyan-400/70">:{time.second}</span>
                                <span className="text-[10px] text-white/60 ml-0.5">{time.dayPeriod}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeWorldClock(clock.id)}
                              disabled={worldClocks.length <= 1}
                              title={worldClocks.length <= 1 ? "At least 1 clock must stay active" : "Remove Clock"}
                              className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-white/40 hover:text-red-300 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add City / Country Search Input */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/55 font-mono">
                      Add City or Country Timezone
                    </span>

                    <div className="relative">
                      <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        placeholder="Search 250+ world cities (e.g. Tokyo, Dubai, London, New York, Karachi, Sydney)..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/15 focus:border-cyan-400/50 focus:outline-none text-xs sm:text-sm text-white placeholder:text-white/35"
                      />
                      {citySearch && (
                        <button
                          type="button"
                          onClick={() => setCitySearch("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Matching Cities Dropdown / List */}
                    <div className="max-h-52 overflow-y-auto space-y-1 rounded-2xl bg-black/40 border border-white/10 p-2">
                      {matchingCities.length === 0 ? (
                        <div className="p-4 text-center text-xs text-white/40">
                          No matching world cities found. Try another city or country.
                        </div>
                      ) : (
                        matchingCities.map((c) => {
                          const isAlreadyAdded = worldClocks.some(
                            (wc) => wc.id === c.id || (wc.city === c.city && wc.timezone === c.timezone)
                          );
                          const live = getCityLiveTime(c.timezone);
                          return (
                            <div
                              key={c.id}
                              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.07] transition-colors"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-white truncate">
                                    {c.city}
                                  </span>
                                  <span className="text-[10px] text-white/40">
                                    ({c.country})
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/60">
                                    {c.continent}
                                  </span>
                                </div>
                                <div className="text-[10px] text-white/45 font-mono">
                                  {c.timezone}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 ml-3">
                                <span className="text-xs font-mono font-medium text-white/70">
                                  {live.hour12}:{live.minute} {live.dayPeriod}
                                </span>
                                <button
                                  type="button"
                                  disabled={isAlreadyAdded}
                                  onClick={() => handleAddCity(c)}
                                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                    isAlreadyAdded
                                      ? "bg-white/10 text-white/35 cursor-not-allowed"
                                      : "bg-cyan-500/25 hover:bg-cyan-500/40 text-cyan-200 border border-cyan-400/40"
                                  }`}
                                >
                                  {isAlreadyAdded ? (
                                    <span>Added</span>
                                  ) : (
                                    <>
                                      <Plus className="w-3 h-3" />
                                      <span>Add Clock</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-black/30 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-white/40 font-mono">
                Changes apply immediately across Dashboard, Command Bar &amp; Live Cockpit
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
