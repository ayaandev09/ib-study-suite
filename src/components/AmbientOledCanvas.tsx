"use client";

import React, { memo } from "react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const SUBJECT_TINTS: Record<string, { primary: string; secondary: string }> = {
  biology: {
    primary: "rgba(34, 197, 94, 0.11)",
    secondary: "rgba(74, 222, 128, 0.065)",
  },
  orwell: {
    primary: "rgba(244, 63, 94, 0.105)",
    secondary: "rgba(251, 113, 133, 0.06)",
  },
  business: {
    primary: "rgba(37, 99, 235, 0.115)",
    secondary: "rgba(96, 165, 250, 0.065)",
  },
  economics: {
    primary: "rgba(14, 165, 233, 0.105)",
    secondary: "rgba(56, 189, 248, 0.06)",
  },
  physics: {
    primary: "rgba(99, 102, 241, 0.105)",
    secondary: "rgba(129, 140, 248, 0.06)",
  },
  german: {
    primary: "rgba(217, 70, 239, 0.105)",
    secondary: "rgba(232, 121, 249, 0.06)",
  },
  geography: {
    primary: "rgba(20, 184, 166, 0.115)",
    secondary: "rgba(94, 234, 212, 0.065)",
  },
};

export const AmbientOledCanvas = memo(function AmbientOledCanvas() {
  const activeView = useWorkspaceStore((s) => s.activeView);
  const primaryInstanceId = useWorkspaceStore((s) => s.primaryInstanceId);
  const openInstances = useWorkspaceStore((s) => s.openInstances);

  const activeInstance =
    activeView === "workspace"
      ? openInstances.find((i) => i.instanceId === primaryInstanceId)
      : undefined;

  const tint = activeInstance ? SUBJECT_TINTS[activeInstance.appId] : null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000]"
      aria-hidden="true"
    >
      {/* 4K OLED Pure Black Base */}
      <div className="absolute inset-0 bg-[#000000]" />

      {tint ? (
        <>
          {/* Subject Workspace Tinted Ambient Orbs */}
          <div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[920px] h-[560px] rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${tint.primary} 0%, transparent 72%)`,
              transform: "translateZ(0)",
            }}
          />
          <div
            className="absolute bottom-[-15%] right-[5%] w-[720px] h-[460px] rounded-full pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${tint.secondary} 0%, transparent 72%)`,
              transform: "translateZ(0)",
            }}
          />
        </>
      ) : (
        <>
          {/* Living Multi-Chromatic Ambient Mesh for Main Bento Dashboard */}
          <div
            className="oled-ambient-orb-1 absolute top-[-14%] left-[12%] w-[760px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(34, 197, 94, 0.115) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 75%)",
              transform: "translateZ(0)",
            }}
          />
          <div
            className="oled-ambient-orb-2 absolute top-[6%] right-[6%] w-[720px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(14, 165, 233, 0.115) 0%, rgba(6, 182, 212, 0.055) 45%, transparent 75%)",
              transform: "translateZ(0)",
            }}
          />
          <div
            className="oled-ambient-orb-3 absolute bottom-[-16%] left-[22%] w-[680px] h-[480px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.10) 0%, rgba(147, 51, 234, 0.04) 48%, transparent 75%)",
              transform: "translateZ(0)",
            }}
          />
          <div
            className="oled-ambient-orb-4 absolute bottom-[-10%] right-[14%] w-[620px] h-[440px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(244, 63, 94, 0.095) 0%, rgba(225, 29, 72, 0.035) 48%, transparent 75%)",
              transform: "translateZ(0)",
            }}
          />
        </>
      )}

      {/* Ultra-subtle hairline grid for spatial perspective */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
});
