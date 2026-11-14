"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export interface MasteryRingProps {
  appId: string;
  appTitle: string;
  subjectBadge: string;
  subjectName?: string;
  iconSystemName: string;
  activeUnit: string;
  activeTopicTitle: string;
  nextTopicTitle: string;
  completed: number;
  total: number;
  remainingMinutes?: number;
  highlightQuoteOrFormula?: string;
  examTip?: string;
  accent: string;
  secondary: string;
  telemetryTag?: string;
}

interface StudySyncBridge {
  postMessage: (payload: Record<string, unknown>) => void;
}

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function MasteryRing({
  appId,
  appTitle,
  subjectBadge,
  subjectName,
  iconSystemName,
  activeUnit,
  activeTopicTitle,
  nextTopicTitle,
  completed,
  total,
  remainingMinutes = 0,
  highlightQuoteOrFormula = "",
  examTip = "",
  accent,
  secondary,
  telemetryTag = "120 FPS NOMINAL",
}: MasteryRingProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const dashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const payload = useMemo(
    () => ({
      appId,
      appTitle,
      subjectBadge,
      subjectName: subjectName ?? subjectBadge,
      iconSystemName,
      activeUnit,
      activeTopicTitle,
      nextTopicTitle,
      completed,
      total,
      percentage,
      remainingMinutes,
      highlightQuoteOrFormula,
      examTip,
      telemetryTag,
      accentHex: accent,
      secondaryHex: secondary,
      timestamp: Date.now(),
    }),
    [
      appId,
      appTitle,
      subjectBadge,
      subjectName,
      iconSystemName,
      activeUnit,
      activeTopicTitle,
      nextTopicTitle,
      completed,
      total,
      percentage,
      remainingMinutes,
      highlightQuoteOrFormula,
      examTip,
      telemetryTag,
      accent,
      secondary,
    ]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(`mastery_snapshot_${appId}`, JSON.stringify(payload));
    } catch {}

    const bridge = (
      window as unknown as {
        webkit?: { messageHandlers?: { studySync?: StudySyncBridge } };
      }
    ).webkit?.messageHandlers?.studySync;

    if (bridge && typeof bridge.postMessage === "function") {
      try {
        bridge.postMessage(payload);
      } catch {}
    }
  }, [payload, appId]);

  return (
    <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
      <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 76 76">
        <circle
          cx="38"
          cy="38"
          r={RADIUS}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="5"
          fill="none"
        />
        <motion.circle
          cx="38"
          cy="38"
          r={RADIUS}
          stroke={`url(#gradient-${appId})`}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: dashoffset }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id={`gradient-${appId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={secondary} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-mono font-bold text-white tracking-tight">
          {percentage}%
        </span>
        <span className="text-[9px] font-mono text-slate-400">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}
