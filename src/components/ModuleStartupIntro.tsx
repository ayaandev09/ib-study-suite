"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { AppId } from "@/types/workspace";
import { LiquidGlassLogo } from "@/components/reactdrops/liquid-glass-logo";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { soundEngine } from "@/lib/soundEngine";

interface SubjectIntroTheme {
  title: string;
  badge: string;
  subtitle: string;
  logoPath: string;
  rgb: string;
  secondaryRgb: string;
  hex: string;
  secondaryHex: string;
  topColor: string;
  bottomColor: string;
  beamColor: string;
  spectrumWarmColor: string;
  spectrumMiddleColor: string;
  spectrumCoolColor: string;
  fontClass?: string;
}

export const SUBJECT_INTRO_THEMES: Record<AppId, SubjectIntroTheme> = {
  biology: {
    title: "IB BIOLOGY",
    badge: "MAY 2027 OFFICIAL SYLLABUS · SL / HL",
    subtitle: "Themes A–D · Unity, Form, Interaction & Continuity",
    logoPath: "/logos/biology.svg",
    rgb: "34, 197, 94",
    secondaryRgb: "74, 222, 128",
    hex: "#22c55e",
    secondaryHex: "#4ade80",
    topColor: "#ecfdf5",
    bottomColor: "#4ade80",
    beamColor: "#22c55e",
    spectrumWarmColor: "#86efac",
    spectrumMiddleColor: "#22c55e",
    spectrumCoolColor: "#14b8a6",
  },
  orwell: {
    title: "1984",
    badge: "MAY 2027 · SL / HL · ENGLISH A LITERATURE",
    subtitle: "George Orwell · Thoughtcrime, Newspeak & Memory Control",
    logoPath: "/logos/orwell.svg",
    rgb: "244, 63, 94",
    secondaryRgb: "251, 113, 133",
    hex: "#f43f5e",
    secondaryHex: "#fb7185",
    topColor: "#fff1f2",
    bottomColor: "#fb7185",
    beamColor: "#f43f5e",
    spectrumWarmColor: "#fda4af",
    spectrumMiddleColor: "#f43f5e",
    spectrumCoolColor: "#e11d48",
  },
  business: {
    title: "IB BUSINESS",
    badge: "MAY 2027 · SL / HL · CCES STRATEGY",
    subtitle: "Corporate Decision Tools, Finance & Case Studies",
    logoPath: "/logos/business.svg",
    rgb: "37, 99, 235",
    secondaryRgb: "96, 165, 250",
    hex: "#2563eb",
    secondaryHex: "#60a5fa",
    topColor: "#eff6ff",
    bottomColor: "#60a5fa",
    beamColor: "#2563eb",
    spectrumWarmColor: "#60a5fa",
    spectrumMiddleColor: "#2563eb",
    spectrumCoolColor: "#1d4ed8",
  },
  economics: {
    title: "IB ECONOMICS",
    badge: "MAY 2027 · SL / HL · LIVING DIAGRAM ENGINE",
    subtitle: "Microeconomics, Macroeconomics, Global Trade & Paper 3 HL",
    logoPath: "/logos/economics.svg",
    rgb: "14, 165, 233",
    secondaryRgb: "56, 189, 248",
    hex: "#0ea5e9",
    secondaryHex: "#38bdf8",
    topColor: "#f0f9ff",
    bottomColor: "#38bdf8",
    beamColor: "#0ea5e9",
    spectrumWarmColor: "#7dd3fc",
    spectrumMiddleColor: "#0ea5e9",
    spectrumCoolColor: "#3b82f6",
  },
  physics: {
    title: "IB PHYSICS",
    badge: "MAY 2027 · SL / HL · THEMES A–E ENGINE",
    subtitle: "Mechanics, Relativity, Thermodynamics, Induction & Quantum",
    logoPath: "/logos/physics.svg",
    rgb: "99, 102, 241",
    secondaryRgb: "129, 140, 248",
    hex: "#6366f1",
    secondaryHex: "#818cf8",
    topColor: "#eef2ff",
    bottomColor: "#818cf8",
    beamColor: "#6366f1",
    spectrumWarmColor: "#a5b4fc",
    spectrumMiddleColor: "#6366f1",
    spectrumCoolColor: "#38bdf8",
  },
  german: {
    title: "IB GERMAN B",
    badge: "MAY 2027 · SL / HL · TEXTSORTEN & GRAMMATIK",
    subtitle: "Dürrenmatt Oral Studio, Paper 1/2 & Grammar Matrix",
    logoPath: "/logos/german.svg",
    rgb: "217, 70, 239",
    secondaryRgb: "232, 121, 249",
    hex: "#d946ef",
    secondaryHex: "#e879f9",
    topColor: "#fdf4ff",
    bottomColor: "#e879f9",
    beamColor: "#d946ef",
    spectrumWarmColor: "#f0abfc",
    spectrumMiddleColor: "#d946ef",
    spectrumCoolColor: "#a855f7",
  },
  geography: {
    title: "IB GEOGRAPHY",
    badge: "MAY 2027 · SL / HL · SPATIAL SYSTEMS & GLOBAL CHANGE",
    subtitle: "4 Units · Options, HL Interactions, GIS & IA Fieldwork",
    logoPath: "/logos/geography.svg",
    rgb: "20, 184, 166",
    secondaryRgb: "94, 234, 212",
    hex: "#14b8a6",
    secondaryHex: "#5eead4",
    topColor: "#f0fdfa",
    bottomColor: "#5eead4",
    beamColor: "#14b8a6",
    spectrumWarmColor: "#99f6e4",
    spectrumMiddleColor: "#14b8a6",
    spectrumCoolColor: "#06b6d4",
  },
};

interface ModuleStartupIntroProps {
  appId: AppId;
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
}

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

/**
 * Per-App Full-Screen Frosted Translucent White Liquid Glass Startup (~2.65s)
 * - Full-screen frosted translucent white glass (bg-white/78 backdrop-blur-xl)
 *   with subtle subject-tinted radial highlights
 * - Slow, luxurious ReactDrops LiquidGlassLogo (theme="light", speed=0.75)
 * - RefractedText subject title on light theme
 * - 450ms minimum-display guard on click / Escape / Enter / Space
 * - Smooth GPU-composited exit fade (opacity: 0, scale: 1.03, 0.55s)
 */
export const ModuleStartupIntro: React.FC<ModuleStartupIntroProps> = ({
  appId,
  isOpen = true,
  onClose,
  onComplete,
}) => {
  const isDismissingRef = useRef(false);
  const mountedAtRef = useRef(0);
  const autoCompletedRef = useRef(false);
  const theme = SUBJECT_INTRO_THEMES[appId] || SUBJECT_INTRO_THEMES.biology;

  const handleDismiss = useCallback(
    (_isAuto = false) => {
      if (isDismissingRef.current) return;
      isDismissingRef.current = true;
      soundEngine.stopSubjectIntro();
      onClose?.();
      onComplete?.();
    },
    [onClose, onComplete]
  );

  useEffect(() => {
    if (!isOpen) {
      isDismissingRef.current = false;
      mountedAtRef.current = 0;
      autoCompletedRef.current = false;
      return;
    }
    isDismissingRef.current = false;
    mountedAtRef.current = 0;
    autoCompletedRef.current = false;

    let timer: ReturnType<typeof setTimeout> | undefined;

    // Instant zero-latency audio-visual synchronization: trigger soundEngine immediately
    mountedAtRef.current = performance.now();
    soundEngine.playSubjectIntro(appId);

    timer = setTimeout(() => {
      autoCompletedRef.current = true;
      handleDismiss(true);
    }, 480);

    return () => {
      if (timer) clearTimeout(timer);
      soundEngine.stopSubjectIntro();
    };
  }, [isOpen, appId, handleDismiss]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.3, ease: EASE_APPLE },
      }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      onClick={() => handleDismiss(false)}
      style={{ willChange: "transform, opacity, filter" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 select-none overflow-hidden cursor-pointer bg-[#000000]"
      aria-label={`${theme.title} Startup`}
    >
      {/* Pure OLED Dark Subject-Tinted Depth Glow — Light Turning On & Breathing in the Dark */}
      <motion.div
        initial={{ opacity: 0.04, scale: 0.82 }}
        animate={{
          opacity: [0.04, 0.9, 0.4, 0.72, 0.35],
          scale: [0.82, 1.1, 0.97, 1.05, 1.0],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.3, 0.54, 0.78, 1],
          ease: EASE_APPLE,
        }}
        style={{
          willChange: "transform, opacity",
          background: `radial-gradient(46% 42% at 50% 42%, rgba(${theme.rgb}, 0.34) 0%, rgba(${theme.secondaryRgb}, 0.16) 36%, transparent 76%), radial-gradient(34% 34% at 32% 34%, rgba(${theme.rgb}, 0.16) 0%, transparent 68%), radial-gradient(34% 34% at 68% 58%, rgba(${theme.secondaryRgb}, 0.14) 0%, transparent 68%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* Core White-Hot Specular Halo Behind Subject Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: [0, 0.72, 0.24, 0.5, 0.2],
          scale: [0.7, 1.06, 0.94, 1.02, 0.98],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.32, 0.56, 0.8, 1],
          ease: EASE_APPLE,
        }}
        style={{
          willChange: "transform, opacity",
          background: `radial-gradient(circle at 50% 44%, rgba(255,255,255,0.14) 0%, rgba(${theme.rgb}, 0.14) 30%, transparent 64%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Centered LiquidGlassLogo + RefractedText Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-2xl">
        <div className="w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] relative flex items-center justify-center">
          <LiquidGlassLogo
            logo={theme.logoPath}
            logoColor="original"
            ending="logo"
            theme="dark"
            tile={true}
            tileColor="#0b0d14"
            logoSize={256}
            logoScale={0.72}
            finalLogoScale={1}
            depth={1.3}
            dispersion={1.15}
            relief={1.05}
            caustics={1.15}
            highlights={1.15}
            bloom={0.55}
            speed={0.75}
            loop={false}
            style={{ background: "transparent" }}
            aria-label={theme.title}
          />
        </div>

        {/* RefractedText Subject Title on OLED Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_APPLE, delay: 0.16 }}
          className="-mt-2 flex flex-col items-center"
        >
          <RefractedText
            text={theme.title}
            theme="dark"
            fontSize="34px"
            fontFamily="ui-rounded, 'SF Pro Rounded', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight={800}
            fontHeight={100}
            letterSpacing="0.025em"
            extraBold={0.7}
            cornerRounding={0.5}
            beamColor={theme.beamColor}
            spectrumWarmColor={theme.spectrumWarmColor}
            spectrumMiddleColor={theme.spectrumMiddleColor}
            spectrumCoolColor={theme.spectrumCoolColor}
            colorIntensity={1.15}
            liftDuration={1.2}
            stagger={0.32}
            openingDuration={2.5}
            intensity={1.25}
            className="max-w-[90vw]"
          />

          <div
            className="w-44 sm:w-56 h-[1.5px] my-3 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${theme.hex} 35%, rgba(255,255,255,0.65) 50%, ${theme.secondaryHex} 65%, transparent 100%)`,
            }}
          />

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: theme.hex,
                  boxShadow: `0 0 10px rgba(${theme.rgb}, 0.85)`,
                }}
              />
              <span
                className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: `rgba(${theme.rgb}, 0.95)` }}
              >
                {theme.badge}
              </span>
            </div>
            <p className="text-xs text-white/65 max-w-sm font-medium">
              {theme.subtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModuleStartupIntro;
