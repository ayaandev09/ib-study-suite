"use client";

import React from "react";
import { Compass } from "lucide-react";

export function GeographyAppLogo({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/25 via-teal-500/15 to-cyan-500/20 border border-teal-400/35 shadow-[0_0_16px_rgba(20,184,166,0.22)]"
    >
      <Compass className="text-teal-300" style={{ width: size * 0.56, height: size * 0.56 }} />
    </div>
  );
}
