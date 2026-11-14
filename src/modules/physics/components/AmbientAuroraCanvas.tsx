"use client";

import React from "react";

export function AmbientAuroraCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Lightweight GPU-composited static ambient vignettes (Physics SL / HL Electric Indigo) */}
      <div
        className="absolute -top-36 -left-32 w-[540px] h-[540px] rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute top-[32%] -right-36 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129, 140, 248, 0.18) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute -bottom-36 left-[24%] w-[540px] h-[540px] rounded-full opacity-18 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
