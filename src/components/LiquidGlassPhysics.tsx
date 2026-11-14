"use client";

import { useEffect } from "react";

const GLASS_TILE_SELECTOR = [
  ".liquid-glass-bento",
  ".liquid-glass-card",
  ".glass-tint",
  ".glass-bento",
  ".glass-card",
  ".liquid-card-flagship",
  ".liquid-glass-sheet",
  ".ultraThinMaterial",
  ".liquid-glass",
  ".liquid-glass-elevated",
].join(", ");

/**
 * Global 120fps Pointer-Reactive Liquid Glass Physics Controller
 * Updates CSS custom properties (--card-mouse-x, --card-mouse-y) on the hovered
 * Liquid Glass tile with zero React re-renders so radial specular glare and
 * chromatic edge refraction track the cursor across all 6 subject workspaces.
 */
export function LiquidGlassPhysics() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    let lastEvent: PointerEvent | null = null;

    const updateGlassCoordinates = () => {
      rafId = null;
      if (!lastEvent) return;

      const target = lastEvent.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const tile = target.closest(GLASS_TILE_SELECTOR) as HTMLElement | null;
      if (!tile) return;

      const rect = tile.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = lastEvent.clientX - rect.left;
      const y = lastEvent.clientY - rect.top;

      tile.style.setProperty("--card-mouse-x", `${x.toFixed(1)}px`);
      tile.style.setProperty("--card-mouse-y", `${y.toFixed(1)}px`);
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastEvent = e;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateGlassCoordinates);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}

export default LiquidGlassPhysics;
