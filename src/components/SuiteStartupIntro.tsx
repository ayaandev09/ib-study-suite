"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LiquidGlassLogo } from "@/components/reactdrops/liquid-glass-logo";
import { RefractedText } from "@/components/reactdrops/refracted-text";
import { soundEngine } from "@/lib/soundEngine";

interface SuiteStartupIntroProps {
  isOpen?: boolean;
  onComplete?: () => void;
}

const EASE_APPLE = [0.22, 1, 0.36, 1] as const;

/**
 * Unified IB Study Suite — Full-Screen Frosted Translucent White Liquid Glass Startup (~3.45s)
 * - Full-screen frosted translucent white glass (bg-white/78 backdrop-blur-xl)
 *   so the dashboard is faintly visible through the frosted surface
 * - Slow, luxurious ReactDrops LiquidGlassLogo (theme="light", speed=0.56)
 * - RefractedText suite title on light theme
 * - 450ms minimum-display guard on click / Escape / Enter / Space
 * - Smooth GPU-composited exit fade (opacity: 0, scale: 1.03, 0.55s)
 */
export const SuiteStartupIntro: React.FC<SuiteStartupIntroProps> = ({
  isOpen = true,
  onComplete,
}) => {
  const isDismissingRef = useRef(false);
  const mountedAtRef = useRef(0);
  const autoCompletedRef = useRef(false);

  const handleDismiss = useCallback(
    (isAuto = false) => {
      if (isDismissingRef.current) return;
      if (!isAuto) {
        if (!mountedAtRef.current || performance.now() - mountedAtRef.current < 450) {
          return;
        }
      }
      isDismissingRef.current = true;
      onComplete?.();
    },
    [onComplete]
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

    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const rafId = requestAnimationFrame(() => {
      if (disposed) return;
      mountedAtRef.current = performance.now();
      // Play legendary cinematic grand opening overture cleanly via Web Audio API
      // strictly bypassing macOS/iOS MediaSession and headphone play/pause interception
      soundEngine.playGrandOpeningSuite();
      timer = setTimeout(() => {
        autoCompletedRef.current = true;
        handleDismiss(true);
      }, 3450);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, handleDismiss]);

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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.55, ease: EASE_APPLE },
      }}
      onClick={() => handleDismiss(false)}
      style={{ willChange: "transform, opacity" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 select-none overflow-hidden cursor-pointer bg-[#000000]"
      aria-label="Unified IB Study Suite Startup"
    >
      {/* Pure OLED Dark Depth Glow — Light Turning On & Breathing in the Dark */}
      <motion.div
        initial={{ opacity: 0.04, scale: 0.82 }}
        animate={{
          opacity: [0.04, 0.88, 0.42, 0.72, 0.34],
          scale: [0.82, 1.08, 0.98, 1.05, 1.0],
        }}
        transition={{
          duration: 3.4,
          times: [0, 0.28, 0.52, 0.78, 1],
          ease: EASE_APPLE,
        }}
        style={{
          willChange: "transform, opacity",
          background:
            "radial-gradient(46% 42% at 50% 42%, rgba(56,189,248,0.28) 0%, rgba(99,102,241,0.16) 34%, rgba(217,70,239,0.08) 58%, transparent 78%), radial-gradient(35% 32% at 38% 36%, rgba(34,197,94,0.14) 0%, transparent 70%), radial-gradient(36% 32% at 64% 48%, rgba(37,99,235,0.14) 0%, transparent 70%)",
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* Subtle Core Halo Pulse Behind Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: [0, 0.75, 0.25, 0.55, 0.22],
          scale: [0.7, 1.05, 0.94, 1.02, 0.98],
        }}
        transition={{
          duration: 3.4,
          times: [0, 0.3, 0.55, 0.8, 1],
          ease: EASE_APPLE,
        }}
        style={{
          willChange: "transform, opacity",
          background:
            "radial-gradient(circle at 50% 44%, rgba(255,255,255,0.14) 0%, rgba(56,189,248,0.10) 28%, transparent 62%)",
        }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Centered LiquidGlassLogo + RefractedText Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-2xl">
        <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] relative flex items-center justify-center">
          <LiquidGlassLogo
            logo="/logos/suite.svg"
            logoColor="original"
            ending="logo"
            theme="dark"
            tile={true}
            tileColor="#0b0d14"
            logoSize={256}
            logoScale={0.72}
            finalLogoScale={1}
            depth={1.35}
            dispersion={1.15}
            relief={1.05}
            caustics={1.15}
            highlights={1.15}
            bloom={0.55}
            speed={0.56}
            loop={false}
            style={{ background: "transparent" }}
            aria-label="IB Study Suite"
          />
        </div>

        {/* RefractedText Title on OLED Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_APPLE, delay: 0.2 }}
          className="-mt-3 flex flex-col items-center"
        >
          <RefractedText
            text="IB STUDY SUITE"
            theme="dark"
            fontSize="36px"
            fontFamily="ui-rounded, 'SF Pro Rounded', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight={800}
            fontHeight={100}
            letterSpacing="0.03em"
            extraBold={0.7}
            cornerRounding={0.5}
            beamColor="#38bdf8"
            spectrumWarmColor="#22c55e"
            spectrumMiddleColor="#38bdf8"
            spectrumCoolColor="#d946ef"
            colorIntensity={1.15}
            liftDuration={1.5}
            stagger={0.35}
            openingDuration={3.2}
            intensity={1.25}
            className="max-w-[90vw]"
          />

          <div
            className="w-48 sm:w-64 h-[1.5px] my-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.65) 20%, rgba(56,189,248,0.8) 50%, rgba(217,70,239,0.65) 80%, transparent 100%)",
            }}
          />

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.85)]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.26em] text-white/75 uppercase font-medium">
              IB Diploma Programme · May 2027 · Spatial Workspace
            </span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Skip Hint (appears after 450ms) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="absolute bottom-8 inset-x-0 text-center pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
          Click or press Space to skip
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SuiteStartupIntro;
