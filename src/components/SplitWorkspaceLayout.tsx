"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { BiologyModule } from "@/modules/biology";
import { OrwellModule } from "@/modules/orwell";
import { BusinessModule } from "@/modules/business";
import { EconomicsModule } from "@/modules/economics";
import { PhysicsModule } from "@/modules/physics";
import { GermanModule } from "@/modules/german";
import { GeographyModule } from "@/modules/geography";
import { MODULE_CATALOG } from "@/data/modulesMeta";
import {
  Sparkles,
} from "lucide-react";

const SUBJECT_COLORS: Record<string, { base: string; border: string; bg: string; text: string }> = {
  orwell: { base: "#f43f5e", border: "rgba(244, 63, 94, 0.4)", bg: "rgba(244, 63, 94, 0.15)", text: "#fb7185" },
  biology: { base: "#22c55e", border: "rgba(34, 197, 94, 0.45)", bg: "rgba(34, 197, 94, 0.16)", text: "#4ade80" },
  business: { base: "#2563eb", border: "rgba(37, 99, 235, 0.42)", bg: "rgba(37, 99, 235, 0.18)", text: "#60a5fa" },
  economics: { base: "#0ea5e9", border: "rgba(14, 165, 233, 0.4)", bg: "rgba(14, 165, 233, 0.15)", text: "#38bdf8" },
  physics: { base: "#6366f1", border: "rgba(99, 102, 241, 0.4)", bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8" },
  german: { base: "#d946ef", border: "rgba(217, 70, 239, 0.4)", bg: "rgba(217, 70, 239, 0.15)", text: "#e879f9" },
  geography: { base: "#14b8a6", border: "rgba(20, 184, 166, 0.45)", bg: "rgba(20, 184, 166, 0.16)", text: "#5eead4" },
};

function renderModuleComponent(appId: string, instanceId: string) {
  switch (appId) {
    case "biology":
      return <BiologyModule instanceId={instanceId} />;
    case "orwell":
      return <OrwellModule instanceId={instanceId} />;
    case "business":
      return <BusinessModule instanceId={instanceId} />;
    case "economics":
      return <EconomicsModule instanceId={instanceId} />;
    case "physics":
      return <PhysicsModule instanceId={instanceId} />;
    case "german":
      return <GermanModule instanceId={instanceId} />;
    case "geography":
      return <GeographyModule instanceId={instanceId} />;
    default:
      return null;
  }
}

export const SplitWorkspaceLayout = memo(function SplitWorkspaceLayout() {
  const {
    openInstances,
    primaryInstanceId,
    openModule,
    enabledSubjects,
  } = useWorkspaceStore();

  if (openInstances.length === 0) {
    return (
      <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center pt-20 px-4">
        <div className="liquid-glass-elevated rounded-3xl p-8 max-w-lg w-full text-center border border-white/10 shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/20 mx-auto flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6 text-white/80" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            No Study Sessions Open
          </h2>
          <p className="text-xs text-white/50 leading-relaxed">
            Select an IB study module to launch your spatial workspace.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {Object.values(MODULE_CATALOG)
              .filter((mod) => enabledSubjects.includes(mod.id))
              .map((mod) => (
              <button
                key={mod.id}
                onClick={() => openModule(mod.id)}
                className="px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-medium text-white transition-colors text-left flex items-center justify-between"
              >
                <span className="truncate">{mod.shortTitle}</span>
                <span className="text-[10px] text-white/40 font-mono">
                  {mod.level}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-black">
      {/* 
        TRUE Zero-Reload DOM Persistence:
        Every instance in openInstances is rendered in this single flex container.
        The active primaryInstanceId is displayed full-width (w-full).
        Inactive instances have display: 'none', remaining 100% alive in the React tree.
      */}
      <div className="relative flex w-full min-h-screen pt-[52px]">
        {openInstances.map((inst) => {
          const isPrimary = inst.instanceId === primaryInstanceId;
          const isVisible = isPrimary;

          return (
            <motion.div
              key={inst.instanceId}
              initial={false}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.992 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              data-instance-id={inst.instanceId}
              data-subject={inst.appId}
              data-state={isVisible ? "primary" : "dormant"}
              aria-hidden={!isVisible || undefined}
              className={
                isVisible
                  ? `relative w-full h-full min-h-screen subject-workspace subject-workspace-${inst.appId}`
                  : undefined
              }
              style={{
                display: isVisible ? undefined : "none",
              }}
            >
              {/* Pane Content */}
              <div className="w-full h-full">
                {renderModuleComponent(inst.appId, inst.instanceId)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});
