"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  ExternalLink,
  MapPin,
  Moon,
  RefreshCw,
  Sun,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export interface AppleCalendarEvent {
  id: string;
  title: string;
  startIso: string;
  endIso: string;
  isAllDay: boolean;
  calendarTitle: string;
  calendarColor: string;
  location?: string;
}

export interface AppleCalendarPayload {
  status: "authorized" | "denied" | "notDetermined" | "restricted" | "writeOnly" | "unknown";
  events: AppleCalendarEvent[];
  syncedAt?: string;
}

declare global {
  interface Window {
    __updateAppleCalendar?: (payload: AppleCalendarPayload) => void;
    __latestAppleCalendarPayload?: AppleCalendarPayload;
    webkit?: {
      messageHandlers?: {
        appleCalendar?: {
          postMessage: (msg: { action: string } | string) => void;
        };
      };
    };
  }
}

interface ZoneSnapshot {
  hour12: string;
  minute: string;
  second: string;
  dayPeriod: string;
  dateLabel: string;
  tzShort: string;
  hour24: number;
  minuteNum: number;
  secondNum: number;
  isDaytime: boolean;
}

function getZoneSnapshot(now: Date, timeZone: string): ZoneSnapshot {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(now);

  const parts24 = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const tzParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(now);

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  })
    .format(now)
    .toUpperCase();

  const pick = (arr: Intl.DateTimeFormatPart[], type: string) =>
    arr.find((p) => p.type === type)?.value ?? "";

  const hour24 = Number(pick(parts24, "hour")) % 24;
  const minuteNum = Number(pick(parts24, "minute"));
  const secondNum = Number(pick(parts24, "second"));

  return {
    hour12: pick(parts, "hour") || "12",
    minute: pick(parts, "minute") || "00",
    second: pick(parts, "second") || "00",
    dayPeriod: (pick(parts, "dayPeriod") || "AM").toUpperCase(),
    dateLabel,
    tzShort: pick(tzParts, "timeZoneName") || "",
    hour24,
    minuteNum,
    secondNum,
    isDaytime: hour24 >= 6 && hour24 < 19,
  };
}

function getHourOffsetLabel(now: Date, tzFrom: string, tzTo: string): string {
  const fmt = (tz: string) => {
    const s = now.toLocaleString("en-US", { timeZone: tz });
    return new Date(s).getTime();
  };
  const diffHours = Math.round((fmt(tzTo) - fmt(tzFrom)) / 3600000);
  if (diffHours === 0) return "Same";
  return diffHours > 0 ? `+${diffHours}h` : `${diffHours}h`;
}

function formatRelativeEventTime(event: AppleCalendarEvent, now: Date): string {
  const start = new Date(event.startIso);
  const end = new Date(event.endIso);
  if (Number.isNaN(start.getTime())) return "";

  if (event.isAllDay) {
    const sameDay = start.toDateString() === now.toDateString();
    if (sameDay) return "Today · All day";
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    if (start.toDateString() === tomorrow.toDateString()) return "Tomorrow · All day";
    return `${start.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · All day`;
  }

  const timeStr = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (now >= start && now < end) {
    const endStr = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `Now · ends ${endStr}`;
  }

  const diffMin = Math.round((start.getTime() - now.getTime()) / 60000);
  if (diffMin >= 0 && diffMin < 60) {
    return `In ${Math.max(1, diffMin)}m · ${timeStr}`;
  }
  if (diffMin >= 60 && diffMin < 360) {
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return `In ${h}h${m > 0 ? ` ${m}m` : ""} · ${timeStr}`;
  }

  if (start.toDateString() === now.toDateString()) {
    return `Today · ${timeStr}`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (start.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow · ${timeStr}`;
  }

  const dayStr = start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return `${dayStr} · ${timeStr}`;
}

function formatEventRange(event: AppleCalendarEvent): string {
  const start = new Date(event.startIso);
  const end = new Date(event.endIso);
  if (Number.isNaN(start.getTime())) return "";

  const datePart = start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (event.isAllDay) {
    return `${datePart} · All Day`;
  }

  const startStr = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endStr = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} · ${startStr} – ${endStr}`;
}

interface MiniAnalogDialProps {
  hour24: number;
  minute: number;
  second: number;
  accentColor: string;
}

const MiniAnalogDial: React.FC<MiniAnalogDialProps> = ({
  hour24,
  minute,
  second,
  accentColor,
}) => {
  const hourDeg = ((hour24 % 12) + minute / 60) * 30;
  const minDeg = (minute + second / 60) * 6;
  const secDeg = second * 6;

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      className="shrink-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.12)]"
      aria-hidden="true"
    >
      <circle
        cx="18"
        cy="18"
        r="15.5"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.3"
      />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="18"
          y1="4.2"
          x2="18"
          y2="6.8"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 18 18)`}
        />
      ))}
      <line
        x1="18"
        y1="18"
        x2="18"
        y2="10.2"
        stroke="#ffffff"
        strokeWidth="2.1"
        strokeLinecap="round"
        transform={`rotate(${hourDeg} 18 18)`}
      />
      <line
        x1="18"
        y1="18"
        x2="18"
        y2="7.2"
        stroke="rgba(255,255,255,0.88)"
        strokeWidth="1.6"
        strokeLinecap="round"
        transform={`rotate(${minDeg} 18 18)`}
      />
      <line
        x1="18"
        y1="20.5"
        x2="18"
        y2="5.8"
        stroke={accentColor}
        strokeWidth="1.25"
        strokeLinecap="round"
        transform={`rotate(${secDeg} 18 18)`}
      />
      <circle cx="18" cy="18" r="2" fill={accentColor} />
    </svg>
  );
};

interface CityClockCardProps {
  city: string;
  badge: string;
  snapshot: ZoneSnapshot;
  accentHex: string;
  glowRgba: string;
  borderClass: string;
}

const CityClockCard: React.FC<CityClockCardProps> = ({
  city,
  badge,
  snapshot,
  accentHex,
  glowRgba,
  borderClass,
}) => {
  return (
    <div
      className={`relative overflow-hidden flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl bg-white/[0.08] border ${borderClass} backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_30px_rgba(0,0,0,0.5)]`}
      style={{
        backgroundImage: `radial-gradient(circle at 18% 22%, ${glowRgba}, transparent 70%)`,
      }}
    >
      <MiniAnalogDial
        hour24={snapshot.hour24}
        minute={snapshot.minuteNum}
        second={snapshot.secondNum}
        accentColor={accentHex}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 leading-none mb-1.5 whitespace-nowrap">
          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/90">
            {city}
          </span>
          <span
            className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-full border border-white/15 bg-white/[0.09] text-white/80"
          >
            {badge}
          </span>
          {snapshot.isDaytime ? (
            <Sun className="w-3 h-3 text-amber-300 shrink-0" />
          ) : (
            <Moon className="w-3 h-3 text-indigo-300 shrink-0" />
          )}
        </div>
        <div className="flex items-baseline gap-1 leading-none whitespace-nowrap">
          <span className="text-[19px] font-bold tabular-nums tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]">
            {snapshot.hour12}:{snapshot.minute}
          </span>
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: accentHex }}
          >
            :{snapshot.second}
          </span>
          <span className="text-[11px] font-semibold text-white/80 ml-0.5">
            {snapshot.dayPeriod}
          </span>
        </div>
        <div className="text-[10.5px] font-medium text-white/65 tracking-wide mt-1 whitespace-nowrap">
          {snapshot.dateLabel}
        </div>
      </div>
    </div>
  );
};

export const CockpitClockAndCalendar: React.FC = () => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [calendarData, setCalendarData] = useState<AppleCalendarPayload | null>(
    () => (typeof window !== "undefined" ? window.__latestAppleCalendarPayload ?? null : null)
  );
  const [isNativeHost, setIsNativeHost] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const sendNativeCalendarAction = useCallback((action: string) => {
    if (typeof window === "undefined") return false;
    const handler = window.webkit?.messageHandlers?.appleCalendar;
    if (!handler) return false;
    handler.postMessage({ action });
    return true;
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nativeAvailable = Boolean(window.webkit?.messageHandlers?.appleCalendar);
    setIsNativeHost(nativeAvailable);

    const handlePayload = (payload: AppleCalendarPayload) => {
      window.__latestAppleCalendarPayload = payload;
      setCalendarData(payload);
      setIsRefreshing(false);
    };

    window.__updateAppleCalendar = handlePayload;

    if (window.__latestAppleCalendarPayload) {
      setCalendarData(window.__latestAppleCalendarPayload);
    }

    if (nativeAvailable) {
      sendNativeCalendarAction("refresh");
    }

    const syncTimer = setInterval(() => {
      if (window.webkit?.messageHandlers?.appleCalendar) {
        sendNativeCalendarAction("refresh");
      }
    }, 60000);

    return () => {
      clearInterval(syncTimer);
      if (window.__updateAppleCalendar === handlePayload) {
        delete window.__updateAppleCalendar;
      }
    };
  }, [sendNativeCalendarAction]);

  useEffect(() => {
    if (!isCalendarOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCalendarOpen(false);
    };
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCalendarOpen]);

  const { worldClocks } = useWorkspaceStore();

  const clockSnapshots = (worldClocks && worldClocks.length > 0 ? worldClocks : [
    { id: "munich", city: "Munich", country: "Germany", timezone: "Europe/Berlin" },
    { id: "islamabad", city: "Islamabad", country: "Pakistan", timezone: "Asia/Karachi" },
  ]).map((clock, index) => {
    const snap = getZoneSnapshot(now, clock.timezone);
    const baseTz = worldClocks?.[0]?.timezone || "Europe/Berlin";
    const offset = index === 0 ? snap.tzShort || "" : getHourOffsetLabel(now, baseTz, clock.timezone);
    const colorPalette = [
      { hex: "#38bdf8", glow: "rgba(56, 189, 248, 0.25)", border: "border-cyan-300/30" },
      { hex: "#34d399", glow: "rgba(52, 211, 153, 0.24)", border: "border-emerald-300/30" },
      { hex: "#fbbf24", glow: "rgba(251, 191, 36, 0.24)", border: "border-amber-300/30" },
      { hex: "#e879f9", glow: "rgba(232, 121, 249, 0.24)", border: "border-fuchsia-300/30" },
      { hex: "#fb7185", glow: "rgba(251, 113, 133, 0.24)", border: "border-rose-300/30" },
    ];
    const palette = colorPalette[index % colorPalette.length];
    return {
      clock,
      snap,
      badge: offset ? `${snap.tzShort || ""} ${offset}`.trim() : snap.tzShort || "",
      palette,
    };
  });

  const nextEvent = calendarData?.events?.[0] ?? null;
  const remainingCount = Math.max(0, (calendarData?.events?.length ?? 0) - 1);

  const handlePillClick = () => {
    if (isNativeHost && (!calendarData || calendarData.status === "notDetermined")) {
      sendNativeCalendarAction("requestAccess");
      return;
    }
    setIsCalendarOpen((prev) => !prev);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isNativeHost) return;
    setIsRefreshing(true);
    sendNativeCalendarAction("refresh");
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const [pillTilt, setPillTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handlePillMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setPillTilt({
      rotateX: -normY * 8,
      rotateY: normX * 8,
      glareX: Math.round((x / rect.width) * 100),
      glareY: Math.round((y / rect.height) * 100),
      isHovered: true,
    });
  };

  const handlePillMouseLeave = () => {
    setPillTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
      {/* Dynamic World Clocks (Liquid Glass Cockpit Clocks) */}
      <div className={`grid ${clockSnapshots.length === 1 ? "grid-cols-1 min-w-[220px]" : clockSnapshots.length === 2 ? "grid-cols-2 sm:min-w-[430px]" : "grid-cols-2 lg:grid-cols-3 max-w-[660px]"} gap-2.5 w-full sm:w-auto`}>
        {clockSnapshots.map(({ clock, snap, badge, palette }) => (
          <CityClockCard
            key={clock.id}
            city={clock.city}
            badge={badge}
            snapshot={snap}
            accentHex={palette.hex}
            glowRgba={palette.glow}
            borderClass={palette.border}
          />
        ))}
      </div>

      {/* Synced Apple Calendar Upcoming Events Pill (3D Interactive Tilt & Specular Glare) */}
      <div className="relative" ref={popoverRef} style={{ perspective: 1000 }}>
        {/* Soft Ambient Glow Aura behind pill */}
        <div
          className="pointer-events-none absolute -inset-1 rounded-full blur-xl transition-opacity duration-300"
          style={{
            opacity: pillTilt.isHovered ? 0.8 : 0.4,
            background: nextEvent?.calendarColor
              ? `radial-gradient(circle, ${nextEvent.calendarColor}40 0%, transparent 75%)`
              : "radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 75%)",
          }}
        />

        <motion.button
          type="button"
          data-motion="true"
          animate={{
            rotateX: pillTilt.rotateX,
            rotateY: pillTilt.rotateY,
            scale: pillTilt.isHovered ? 1.03 : 1,
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 420, damping: 22, mass: 0.5 }}
          onMouseMove={handlePillMouseMove}
          onMouseLeave={handlePillMouseLeave}
          onClick={handlePillClick}
          className="relative group flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs transition-all cursor-pointer max-w-[390px] overflow-hidden select-none"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            borderColor: pillTilt.isHovered
              ? (nextEvent?.calendarColor ? `${nextEvent.calendarColor}60` : "rgba(56, 189, 248, 0.55)")
              : "rgba(255, 255, 255, 0.16)",
            background: nextEvent
              ? `radial-gradient(130% 100% at ${pillTilt.glareX}% 0%, ${nextEvent.calendarColor}2b 0%, rgba(12, 17, 29, 0.88) 100%)`
              : `radial-gradient(130% 100% at ${pillTilt.glareX}% 0%, rgba(56, 189, 248, 0.18) 0%, rgba(10, 14, 24, 0.9) 100%)`,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: pillTilt.isHovered
              ? `0 16px 36px -8px rgba(0,0,0,0.7), 0 0 24px -2px ${nextEvent?.calendarColor ? `${nextEvent.calendarColor}45` : "rgba(56,189,248,0.35)"}, inset 0 1.5px 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.4)`
              : "0 10px 24px -6px rgba(0,0,0,0.5), inset 0 1px 0.5px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)",
          }}
        >
          {/* Specular Holographic Glare Sweep across the pill */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: pillTilt.isHovered ? 1 : 0,
              background: `radial-gradient(200px circle at ${pillTilt.glareX}% ${pillTilt.glareY}%, rgba(255,255,255,0.26), rgba(56,189,248,0.15) 35%, transparent 75%)`,
            }}
          />

          {/* Top-Edge Specular Glass Light Crescent */}
          <div className="pointer-events-none absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent" />

          {/* Glowing Status Orb Raised in 3D */}
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-125"
            style={{
              transform: "translateZ(14px)",
              backgroundColor: nextEvent?.calendarColor ?? "#38bdf8",
              boxShadow: `0 0 12px ${nextEvent?.calendarColor ?? "#38bdf8"}, 0 0 4px #ffffff`,
            }}
          />

          <div
            className="flex items-center gap-2 min-w-0"
            style={{ transform: "translateZ(12px)" }}
          >
            <CalendarDays className="w-3.5 h-3.5 text-cyan-300/90 shrink-0 transition-transform duration-200 group-hover:scale-110" />

            {!isNativeHost && !calendarData ? (
              <span className="text-white/70 font-medium truncate">
                Apple Calendar · Open in macOS App
              </span>
            ) : calendarData?.status === "notDetermined" ? (
              <span className="text-cyan-200 font-semibold truncate flex items-center gap-1.5">
                <span>Sync Apple Calendar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
            ) : calendarData?.status === "denied" || calendarData?.status === "restricted" ? (
              <span className="text-amber-200 font-semibold truncate">
                Enable Apple Calendar Access
              </span>
            ) : nextEvent ? (
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-white font-semibold truncate tracking-tight">
                  {nextEvent.title}
                </span>
                <span className="text-white/30">•</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-300/35 text-cyan-200 text-[10.5px] font-mono font-semibold whitespace-nowrap shrink-0 shadow-sm">
                  {formatRelativeEventTime(nextEvent, now)}
                </span>
                {remainingCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/12 text-[10px] font-mono font-bold text-white/85 shrink-0 border border-white/10">
                    +{remainingCount}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-white/75 font-medium truncate">
                Apple Calendar Synced · Free (7d)
              </span>
            )}
          </div>

          <ChevronDown
            style={{ transform: "translateZ(10px)" }}
            className={`w-3.5 h-3.5 text-white/60 shrink-0 transition-transform duration-300 group-hover:text-white ${
              isCalendarOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        {/* Upcoming Events Popover */}
        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="absolute right-0 mt-2 w-[340px] sm:w-[370px] rounded-3xl bg-[#090d16]/95 border border-white/15 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] p-4 z-50"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-cyan-300" />
                  <span className="text-xs font-semibold tracking-wide uppercase text-white/85">
                    Upcoming Apple Calendar
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isNativeHost && (
                    <button
                      type="button"
                      onClick={handleRefresh}
                      title="Refresh Apple Calendar"
                      className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
                      />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => sendNativeCalendarAction("openCalendar")}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/12 text-[11px] font-medium text-white/85 transition-colors cursor-pointer"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {!isNativeHost && !calendarData ? (
                <div className="py-5 text-center space-y-1.5">
                  <p className="text-xs font-medium text-white/75">
                    Live Apple Calendar sync is powered by the native macOS wrapper.
                  </p>
                  <p className="text-[11px] text-white/45">
                    Launch IB Study Suite on macOS to view upcoming events automatically.
                  </p>
                </div>
              ) : calendarData?.status === "denied" || calendarData?.status === "restricted" ? (
                <div className="py-4 text-center space-y-3">
                  <p className="text-xs text-white/75">
                    Calendar permission is currently disabled for IB Study Suite.
                  </p>
                  <button
                    type="button"
                    onClick={() => sendNativeCalendarAction("openSettings")}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-300/35 text-xs font-semibold text-cyan-200 transition-colors cursor-pointer"
                  >
                    Open Privacy Settings
                  </button>
                </div>
              ) : calendarData?.events && calendarData.events.length > 0 ? (
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-0.5">
                  {calendarData.events.slice(0, 6).map((ev) => (
                    <div
                      key={ev.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] transition-colors"
                    >
                      <span
                        className="w-1 self-stretch rounded-full shrink-0 mt-0.5"
                        style={{ backgroundColor: ev.calendarColor || "#38bdf8" }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-white/95 truncate">
                            {ev.title}
                          </p>
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/[0.07] text-white/60 shrink-0">
                            {ev.calendarTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-cyan-200/85 font-medium mt-0.5">
                          {formatEventRange(ev)}
                        </p>
                        {ev.location ? (
                          <p className="text-[10.5px] text-white/45 flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{ev.location}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-5 text-center">
                  <p className="text-xs text-white/65">
                    No upcoming Apple Calendar events in the next 7 days.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
