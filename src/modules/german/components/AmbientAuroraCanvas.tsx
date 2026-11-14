"use client";

import React from "react";

export function AmbientAuroraCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Lightweight GPU-composited static ambient vignettes (German B SL / HL Fuchsia & Magenta) */}
      <div
        className="absolute -top-36 -left-32 w-[520px] h-[520px] rounded-full opacity-26 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(217, 70, 239, 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute top-[32%] -right-36 w-[480px] h-[480px] rounded-full opacity-22 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232, 121, 249, 0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute -bottom-36 left-[22%] w-[520px] h-[520px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(192, 38, 211, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
