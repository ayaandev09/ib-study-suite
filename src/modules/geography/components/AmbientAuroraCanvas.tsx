"use client";

import React from "react";

export function AmbientAuroraCanvas() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Lightweight GPU-composited static ambient vignettes (Geography SL / HL Turquoise / Teal) */}
      <div
        className="absolute -top-36 -left-32 w-[540px] h-[540px] rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute top-[32%] -right-36 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(94, 234, 212, 0.18) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute -bottom-36 left-[24%] w-[540px] h-[540px] rounded-full opacity-18 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)",
          filter: "blur(65px)",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
