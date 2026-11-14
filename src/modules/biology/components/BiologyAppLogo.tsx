"use client";

import React from "react";

export function BiologyAppLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      aria-label="IB Biology SL/HL Logo"
    >
      <defs>
        <linearGradient id="bioLogoLime" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="bioLogoMint" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
      </defs>
      <circle
        cx="256"
        cy="256"
        r="224"
        fill="#030d08"
        stroke="url(#bioLogoLime)"
        strokeWidth="10"
      />
      <g strokeLinecap="round" strokeWidth="10">
        <line x1="204" y1="126" x2="308" y2="126" stroke="#86efac" strokeOpacity="0.8" />
        <line x1="226" y1="168" x2="286" y2="168" stroke="#5eead4" strokeOpacity="0.85" />
        <line x1="226" y1="256" x2="286" y2="256" stroke="#bef264" strokeOpacity="0.9" />
        <line x1="204" y1="300" x2="308" y2="300" stroke="#86efac" strokeOpacity="0.8" />
        <line x1="226" y1="344" x2="286" y2="344" stroke="#5eead4" strokeOpacity="0.85" />
        <line x1="204" y1="386" x2="308" y2="386" stroke="#86efac" strokeOpacity="0.8" />
      </g>
      <g fill="none" strokeWidth="16" strokeLinecap="round">
        <path
          d="M 190,104 C 190,165 322,190 322,256 C 322,322 190,347 190,408"
          stroke="url(#bioLogoLime)"
        />
        <path
          d="M 322,104 C 322,165 190,190 190,256 C 190,322 322,347 322,408"
          stroke="url(#bioLogoMint)"
        />
      </g>
    </svg>
  );
}
