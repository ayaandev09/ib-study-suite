"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { MODULE_CATALOG, SUBJECT_CLUSTERS } from "@/data/modulesMeta";
import { AppId, ModuleAppMetadata } from "@/types/workspace";
import {
  BookOpen,
  ArrowRight,
  Atom,
  TrendingUp,
  Briefcase,
  Languages,
  Dna,
  Play,
  Globe2,
  SlidersHorizontal,
} from "lucide-react";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { CockpitClockAndCalendar } from "@/components/CockpitClockAndCalendar";

const SUBJECT_LOGOS: Record<AppId, string> = {
  biology: "/logos/biology.svg",
  orwell: "/logos/orwell.svg",
  business: "/logos/business.svg",
  economics: "/logos/economics.svg",
  physics: "/logos/physics.svg",
  german: "/logos/german.svg",
  geography: "/logos/geography.svg",
};

const SUBJECT_ACCENTS: Record<
  AppId,
  {
    rgb: string;
    hex: string;
    iconClass: string;
    tagText: string;
  }
> = {
  biology: {
    rgb: "34, 197, 94",
    hex: "#4ade80",
    iconClass: "text-green-300",
    tagText: "#86efac",
  },
  orwell: {
    rgb: "244, 63, 94",
    hex: "#fb7185",
    iconClass: "text-rose-300",
    tagText: "#fda4af",
  },
  business: {
    rgb: "37, 99, 235",
    hex: "#60a5fa",
    iconClass: "text-blue-400",
    tagText: "#93c5fd",
  },
  economics: {
    rgb: "14, 165, 233",
    hex: "#38bdf8",
    iconClass: "text-sky-300",
    tagText: "#7dd3fc",
  },
  physics: {
    rgb: "99, 102, 241",
    hex: "#818cf8",
    iconClass: "text-indigo-300",
    tagText: "#a5b4fc",
  },
  german: {
    rgb: "217, 70, 239",
    hex: "#e879f9",
    iconClass: "text-fuchsia-300",
    tagText: "#f0abfc",
  },
  geography: {
    rgb: "20, 184, 166",
    hex: "#5eead4",
    iconClass: "text-teal-300",
    tagText: "#99f6e4",
  },
};

function getSubjectIcon(appId: AppId) {
  const cls = `w-5 h-5 ${SUBJECT_ACCENTS[appId]?.iconClass || "text-white/90"}`;
  switch (appId) {
    case "biology":
      return <Dna className={cls} />;
    case "orwell":
      return <BookOpen className={cls} />;
    case "business":
      return <Briefcase className={cls} />;
    case "economics":
      return <TrendingUp className={cls} />;
    case "physics":
      return <Atom className={cls} />;
    case "german":
      return <Languages className={cls} />;
    case "geography":
      return <Globe2 className={cls} />;
  }
}

const ENTRANCE_OFFSETS: Array<{ x: number; y: number }> = [
  { x: -85, y: 0 },
  { x: 0, y: -70 },
  { x: 85, y: 0 },
  { x: -85, y: 35 },
  { x: 0, y: 70 },
  { x: 85, y: 35 },
];

const ENTRANCE_DELAYS = [0.06, 0.13, 0.2, 0.27, 0.34, 0.42];

/**
 * 3D Interactive Hover Bento Subject Card
 * Apple-grade perspective tilt, living subject aura, spring physics & tactile press
 */
function BentoSubjectCard({
  mod,
  index,
  isRevealed,
  onLaunch,
  onOpenQuickRoute,
}: {
  mod: ModuleAppMetadata;
  index: number;
  isRevealed: boolean;
  onLaunch: () => void;
  onOpenQuickRoute: (label: string, viewMode: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const offset = ENTRANCE_OFFSETS[index % ENTRANCE_OFFSETS.length];
  const delay = ENTRANCE_DELAYS[index % ENTRANCE_DELAYS.length];
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 7;
    setTilt({
      rotateX,
      rotateY,
      glareX: pctX,
      glareY: pctY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  const cluster = SUBJECT_CLUSTERS[mod.cluster];
  const accent = SUBJECT_ACCENTS[mod.id];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.94 }}
      animate={
        isRevealed
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: offset.x, y: offset.y, scale: 0.94 }
      }
      transition={{
        type: "spring",
        stiffness: 165,
        damping: 19,
        mass: 0.85,
        delay: isRevealed ? Math.min(0.22, delay * 0.5) : 0,
      }}
      className="relative select-none group"
      style={{ perspective: "1200px", willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        data-subject={mod.id}
        data-motion="true"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.isHovered ? 1.018 : 1,
        }}
        whileTap={{ scale: 0.976 }}
        transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.55 }}
        style={{
          backfaceVisibility: "hidden",
          borderColor: tilt.isHovered
            ? `rgba(${accent.rgb}, 0.48)`
            : `rgba(${accent.rgb}, 0.24)`,
          background: `radial-gradient(125% 95% at 18% 0%, rgba(${accent.rgb}, 0.22) 0%, rgba(${accent.rgb}, 0.08) 46%, rgba(8,10,16,0.92) 100%)`,
          boxShadow: tilt.isHovered
            ? `0 22px 44px -10px rgba(0, 0, 0, 0.9), 0 0 32px -4px rgba(${accent.rgb}, 0.26), inset 0 1px 1px 0 rgba(255, 255, 255, 0.34), inset 0 -1px 0 rgba(${accent.rgb}, 0.3)`
            : `0 14px 32px -10px rgba(0, 0, 0, 0.85), inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(${accent.rgb}, 0.16)`,
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(190%) brightness(1.05)",
        } as React.CSSProperties}
        className="bento-subject-card relative rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[300px] border transition-colors"
        onClick={onLaunch}
      >
        {/* Soft Internal Glowing Orb */}
        <div
          className="pointer-events-none absolute -bottom-16 -left-12 w-56 h-56 rounded-full blur-3xl opacity-55 group-hover:opacity-85 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, rgba(${accent.rgb}, 0.28) 0%, transparent 70%)`,
          }}
        />
        {/* Living Corner Signature Aura */}
        <div
          className="pointer-events-none absolute -top-14 -right-14 w-44 h-44 rounded-full blur-3xl opacity-45 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, rgba(${accent.rgb}, 0.38) 0%, transparent 70%)`,
          }}
        />

        {/* Dynamic Specular Holographic Glare */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(340px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.14), rgba(${accent.rgb}, 0.11) 38%, transparent 68%)`,
          }}
        />

        {/* Card Body Raised in 3D Space */}
        <div style={{ transform: "translateZ(20px)" }}>
          {/* Header: Cluster Badge & Level */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: accent.hex,
                  boxShadow: `0 0 12px rgba(${accent.rgb}, 0.85)`,
                }}
              />
              <span className="text-[10px] font-mono text-white/65 uppercase tracking-wider">
                {cluster.label}
              </span>
            </div>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border"
              style={{
                backgroundColor: `rgba(${accent.rgb}, 0.12)`,
                borderColor: `rgba(${accent.rgb}, 0.28)`,
                color: accent.tagText,
              }}
            >
              {mod.level}
            </span>
          </div>

          {/* Apple Liquid Glass Subject Logo Badge + Title */}
          <div className="flex items-center gap-3.5 mb-3">
            <div
              className="relative w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={
                {
                  transform: "translateZ(28px)",
                  "--card-mouse-x": `${tilt.glareX}%`,
                  "--card-mouse-y": `${tilt.glareY}%`,
                  background: `radial-gradient(120% 120% at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.26) 0%, rgba(${accent.rgb}, 0.22) 48%, rgba(${accent.rgb}, 0.08) 100%)`,
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  boxShadow: `0 10px 24px -6px rgba(0, 0, 0, 0.65), 0 4px 14px -2px rgba(${accent.rgb}, 0.34), inset 0 1.5px 1px rgba(255, 255, 255, 0.55), inset 0 -2px 6px rgba(0, 0, 0, 0.35)`,
                } as React.CSSProperties
              }
            >
              {/* Top-Edge Specular Crescent */}
              <div
                className="pointer-events-none absolute inset-x-0.5 top-0 h-1/2 rounded-t-[14px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 65%, transparent 100%)",
                }}
              />
              {/* Subtle Chromatic Rim Dispersion */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[16px] p-[1px]"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(${accent.rgb},0.48) 45%, rgba(56,189,248,0.35) 75%, rgba(255,255,255,0.42) 100%)`,
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                }}
              />
              {/* Pointer-Reactive Specular Reflection */}
              <div
                className="pointer-events-none absolute inset-0 opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background:
                    "radial-gradient(44px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(255,255,255,0.42), transparent 72%)",
                }}
              />
              <img
                src={SUBJECT_LOGOS[mod.id]}
                alt={mod.title}
                className="relative z-10 w-7 h-7 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-white transition-colors">
                {mod.title}
              </h3>
              <div
                className="text-[11px] font-mono opacity-85"
                style={{ color: accent.tagText }}
              >
                {mod.subjectCode}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-white/65 leading-relaxed mb-4">
            {mod.description}
          </p>
        </div>

        {/* Footer Action Bar Raised in 3D Space */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2 flex-nowrap overflow-hidden"
        >
          <motion.button
            data-motion="true"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 26 }}
            onClick={(e) => {
              e.stopPropagation();
              onLaunch();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-medium transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(${accent.rgb}, 0.22), rgba(255, 255, 255, 0.09))`,
              border: `1px solid rgba(${accent.rgb}, 0.34)`,
              boxShadow: `0 4px 14px -4px rgba(${accent.rgb}, 0.25)`,
            }}
          >
            <span>Open Workspace</span>
            <ArrowRight
              className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
              style={{ color: accent.tagText }}
            />
          </motion.button>

          <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
            {mod.quickRoutes.slice(0, 2).map((r) => (
              <motion.button
                key={r.label}
                data-motion="true"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 450, damping: 26 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQuickRoute(r.label, r.viewMode);
                }}
                className="px-2 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.13] text-[10px] font-mono text-white/60 hover:text-white transition-colors border border-white/10 cursor-pointer whitespace-nowrap shrink-0"
              >
                {r.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BentoDashboard({ isRevealed = true }: { isRevealed?: boolean }) {
  const {
    openInstances,
    primaryInstanceId,
    secondarySplitInstanceId,
    activateInstance,
    openModule,
    launchOrActivateModule,
    setWorkspaceView,
    enabledSubjects,
    setSettingsOpen,
  } = useWorkspaceStore();

  const enabledModules = Object.values(MODULE_CATALOG).filter((mod) =>
    enabledSubjects.includes(mod.id)
  );

  const [userName, setUserName] = useState("Ayaan");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("ib_suite_user_name_v1");
    if (saved) setUserName(saved);
    const onUpdate = (e: Event) => {
      const next = (e as CustomEvent).detail?.name;
      if (next) setUserName(next);
    };
    window.addEventListener("ib-suite-user-updated", onUpdate);
    return () => window.removeEventListener("ib-suite-user-updated", onUpdate);
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen pt-20 pb-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* ====================================================================
            1. Clean Bento Header Bar with Living Chromatic Accent
           ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4 border-b border-white/[0.08] pb-8">
          <div className="flex items-start gap-4">
            <motion.button
              type="button"
              data-motion="true"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
              onClick={() =>
                window.dispatchEvent(new CustomEvent("ib-suite-replay-startup"))
              }
              title="Replay Suite Startup Animation"
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-black/70 border border-white/20 p-1.5 shadow-[0_0_34px_rgba(56,189,248,0.18)] shrink-0 overflow-hidden hover:border-white/45 transition-colors cursor-pointer"
            >
              <img
                src="/logos/suite.svg"
                alt="IB Diploma Study Suite"
                className="w-full h-full object-contain"
              />
            </motion.button>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-white/85 tracking-wide uppercase border border-white/15"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(34,197,94,0.14), rgba(37,99,235,0.14), rgba(14,165,233,0.14), rgba(99,102,241,0.14), rgba(217,70,239,0.14))",
                  }}
                >
                  IB Diploma Programme · May 2027
                </span>
                <span className="text-white/30 text-xs font-mono">•</span>
                <span className="text-white/50 text-xs font-mono">
                  Spatial Study Suite
                </span>
              </div>
              <h1 className="leading-none">
                <RefractedText
                  text={`Good Morning, ${userName}`}
                  theme="dark"
                  fontSize="36px"
                  fontFamily="ui-rounded, 'SF Pro Rounded', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
                  fontWeight={800}
                  fontHeight={100}
                  letterSpacing="0.025em"
                  extraBold={0.7}
                  cornerRounding={0.4}
                  beamColor="#38bdf8"
                  spectrumWarmColor="#22c55e"
                  spectrumMiddleColor="#38bdf8"
                  spectrumCoolColor="#d946ef"
                  colorIntensity={1.15}
                  liftDuration={1.3}
                  stagger={0.35}
                  intensity={1.25}
                  className="max-w-full"
                />
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2.5">
            <div data-tour="cockpit" className="rounded-2xl">
              <CockpitClockAndCalendar />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Quick Resume Workspace Button if instances exist */}
              {openInstances.length > 0 && (
                <motion.button
                  data-motion="true"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  onClick={setWorkspaceView}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-black text-xs font-medium hover:bg-white/95 shadow-[0_4px_20px_rgba(255,255,255,0.24)] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Resume Workspace</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. Active Sessions Row (Frosted Liquid Glass on OLED Black)
           ==================================================================== */}
        {openInstances.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-white/55 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.85)]" />
                Live Open Study Sessions ({openInstances.length})
              </h2>
              <span className="text-[11px] text-white/40 font-mono">
                Zero-reload DOM persistence active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {openInstances.map((inst) => {
                const meta = MODULE_CATALOG[inst.appId];
                const accent = SUBJECT_ACCENTS[inst.appId];
                const isPrimary = inst.instanceId === primaryInstanceId;
                const isSecondary =
                  inst.instanceId === secondarySplitInstanceId;

                return (
                  <motion.div
                    key={inst.instanceId}
                    data-subject={inst.appId}
                    whileHover={{ y: -2, scale: 1.012 }}
                    whileTap={{ scale: 0.976 }}
                    transition={{ type: "spring", stiffness: 360, damping: 24 }}
                    onClick={() => activateInstance(inst.instanceId)}
                    className={`liquid-glass-card group cursor-pointer rounded-2xl p-4 transition-colors duration-200 ${
                      isPrimary
                        ? "border-white/40 shadow-[0_0_26px_rgba(var(--subject-rgb,255,255,255),0.26)]"
                        : isSecondary
                        ? "border-white/30 shadow-[0_0_18px_rgba(var(--subject-rgb,255,255,255),0.16)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `rgba(${accent.rgb}, 0.16)`,
                            border: `1px solid rgba(${accent.rgb}, 0.30)`,
                          }}
                        >
                          {getSubjectIcon(inst.appId)}
                        </div>
                        <span className="text-xs font-medium text-white/90 group-hover:text-white">
                          {inst.title}
                        </span>
                      </div>
                      {isPrimary && (
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: `rgba(${accent.rgb}, 0.16)`,
                            borderColor: `rgba(${accent.rgb}, 0.35)`,
                            color: accent.tagText,
                          }}
                        >
                          Active
                        </span>
                      )}
                      {isSecondary && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/20">
                          Split Pane
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-white/55 line-clamp-1 mb-2 font-mono">
                      {inst.customLabel || meta?.tagline}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/35 font-mono pt-2 border-t border-white/5">
                      <span style={{ color: accent.tagText }}>{meta?.subjectCode}</span>
                      <span className="group-hover:text-white/80 transition-colors flex items-center gap-1">
                        Resume <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* ====================================================================
            3. Clean 3×2 Subject Module Bento Grid with 3D Interactive Hover
           ==================================================================== */}
        <section data-tour="subjects-grid" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-semibold text-white/55 uppercase tracking-wider">
              IB Coursework Modules ({enabledModules.length} {enabledModules.length === 1 ? "Subject" : "Subjects"})
            </h2>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.11] border border-white/12 text-[11px] font-medium text-white/75 hover:text-white transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Manage Subjects</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enabledModules.map((mod, index) => (
              <BentoSubjectCard
                key={mod.id}
                mod={mod}
                index={index}
                isRevealed={isRevealed}
                onLaunch={() => launchOrActivateModule(mod.id)}
                onOpenQuickRoute={(label, viewMode) =>
                  openModule(mod.id, label, viewMode)
                }
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BentoDashboard;
