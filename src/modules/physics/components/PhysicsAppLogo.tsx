"use client";

import React from "react";

export const PhysicsAppLogo: React.FC<{ className?: string }> = ({
  className = "w-full h-full",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="none"
  >
    <defs>
      <radialGradient id="physLogoGlow" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
        <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="physOrbitCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="physOrbitPurple" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="physOrbitEmerald" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>

    {/* Ambient Shield */}
    <circle cx="256" cy="256" r="236" fill="url(#physLogoGlow)" />
    <circle
      cx="256"
      cy="256"
      r="220"
      fill="#020617"
      stroke="url(#physOrbitCyan)"
      strokeWidth="4"
      strokeOpacity="0.95"
    />
    <circle
      cx="256"
      cy="256"
      r="206"
      fill="none"
      stroke="#6366f1"
      strokeWidth="1.5"
      strokeDasharray="6 6"
      strokeOpacity="0.45"
    />

    {/* Wave Harmonics */}
    <path
      d="M 80,256 Q 124,210 168,256 T 256,256 T 344,256 T 432,256"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="2.5"
      strokeOpacity="0.35"
      strokeDasharray="4 3"
    />

    {/* 3 Quantum Orbital Rings */}
    <ellipse
      cx="256"
      cy="256"
      rx="140"
      ry="50"
      fill="none"
      stroke="url(#physOrbitCyan)"
      strokeWidth="5"
      transform="rotate(-35 256 256)"
    />
    <ellipse
      cx="256"
      cy="256"
      rx="140"
      ry="50"
      fill="none"
      stroke="url(#physOrbitPurple)"
      strokeWidth="5"
      transform="rotate(35 256 256)"
    />
    <ellipse
      cx="256"
      cy="256"
      rx="140"
      ry="50"
      fill="none"
      stroke="url(#physOrbitEmerald)"
      strokeWidth="5"
      transform="rotate(90 256 256)"
    />

    {/* Orbiting Quantum Electrons */}
    <circle cx="370" cy="176" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
    <circle cx="142" cy="176" r="8" fill="#c084fc" stroke="#ffffff" strokeWidth="2" />
    <circle cx="256" cy="116" r="8" fill="#34d399" stroke="#ffffff" strokeWidth="2" />

    {/* Core Nucleus */}
    <circle cx="256" cy="256" r="28" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
    <circle cx="250" cy="250" r="7" fill="#f43f5e" />
    <circle cx="262" cy="250" r="7" fill="#38bdf8" />
    <circle cx="250" cy="262" r="7" fill="#38bdf8" />
    <circle cx="262" cy="262" r="7" fill="#f43f5e" />
    <circle cx="256" cy="256" r="4" fill="#ffffff" />
  </svg>
);
