"use client";

import React, { useState } from "react";
import { DIAGRAMS_DOSSIER, DiagramDossier } from "@/modules/physics/data";
import { Sparkles, Layers, Sliders, Info, CheckCircle2 } from "lucide-react";
import { MathText } from "./MathText";

interface InteractiveDiagramProps {
  diagramId: string;
  className?: string;
  compact?: boolean;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({
  diagramId,
  className = "",
  compact = false,
}) => {
  const dossier: DiagramDossier | undefined = DIAGRAMS_DOSSIER.find(
    (d) => d.id === diagramId
  );

  // General interactive states
  const [sliderVal, setSliderVal] = useState<number>(45);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [choiceState, setChoiceState] = useState<string>("default");

  if (!dossier) {
    return (
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
        Diagram preview for &apos;{diagramId}&apos; not found in dossier.
      </div>
    );
  }

  // Specialized SVG rendering based on diagramId
  const renderSvgContent = () => {
    switch (diagramId) {
      // -------------------------------------------------------------
      // 1. PROJECTILE MOTION TRAJECTORY
      // -------------------------------------------------------------
      case "diag-projectile-trajectory": {
        const thetaRad = (sliderVal * Math.PI) / 180;
        const u = 30;
        const g = 9.81;
        const range = (u * u * Math.sin(2 * thetaRad)) / g;
        const maxH = (u * u * Math.sin(thetaRad) * Math.sin(thetaRad)) / (2 * g);
        const tFlight = (2 * u * Math.sin(thetaRad)) / g;

        // Scale factors for 600x320 SVG viewport
        const scaleX = 460 / Math.max(range, 50);
        const scaleY = 220 / Math.max(maxH, 15);

        // Compute parabolic path points
        const points: string[] = [];
        const numSteps = 50;
        for (let i = 0; i <= numSteps; i++) {
          const t = (i / numSteps) * tFlight;
          const x = (u * Math.cos(thetaRad) * t) * scaleX + 60;
          const y = 280 - ((u * Math.sin(thetaRad) * t - 0.5 * g * t * t) * scaleY);
          points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        const pathData = `M ${points.join(" L ")}`;

        return (
          <g>
            {/* Grid background */}
            <defs>
              <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="50" y="30" width="500" height="250" fill="url(#gridPattern)" />

            {/* Ground line */}
            <line x1="40" y1="280" x2="560" y2="280" stroke="#475569" strokeWidth="2" />
            <line x1="60" y1="20" x2="60" y2="290" stroke="#475569" strokeWidth="2" />
            <text x="565" y="284" fill="#94a3b8" fontSize="11" fontWeight="600">x (m)</text>
            <text x="50" y="25" fill="#94a3b8" fontSize="11" fontWeight="600">y (m)</text>

            {/* Parabolic Trajectory */}
            <path d={pathData} fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />

            {/* Fill under trajectory */}
            <path d={`${pathData} L ${60 + range * scaleX},280 Z`} fill="rgba(6,182,212,0.12)" />

            {/* Launch velocity vector */}
            {toggleState && (
              <g>
                <line
                  x1="60"
                  y1="280"
                  x2={60 + 65 * Math.cos(thetaRad)}
                  y2={280 - 65 * Math.sin(thetaRad)}
                  stroke="#38bdf8"
                  strokeWidth="3"
                  markerEnd="url(#arrow-cyan)"
                />
                <line x1="60" y1="280" x2={60 + 65 * Math.cos(thetaRad)} y2="280" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1={60 + 65 * Math.cos(thetaRad)} y1="280" x2={60 + 65 * Math.cos(thetaRad)} y2={280 - 65 * Math.sin(thetaRad)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="135" y="272" fill="#38bdf8" fontSize="10" fontWeight="600">v_x = u cos(θ)</text>
                <text x={70 + 65 * Math.cos(thetaRad)} y={280 - 35 * Math.sin(thetaRad)} fill="#38bdf8" fontSize="10" fontWeight="600">v_y</text>
              </g>
            )}

            {/* Peak altitude marker */}
            <circle cx={60 + (range * scaleX) / 2} cy={280 - maxH * scaleY} r="5" fill="#f59e0b" />
            <text
              x={60 + (range * scaleX) / 2}
              y={280 - maxH * scaleY < 75 ? 298 - maxH * scaleY : 266 - maxH * scaleY}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="11"
              fontWeight="700"
            >
              Peak: v_y = 0, h = {maxH.toFixed(1)} m
            </text>

            {/* Range readout */}
            <rect x="395" y="15" width="190" height="66" rx="10" fill="rgba(15,23,42,0.85)" stroke="rgba(6,182,212,0.3)" />
            <text x="410" y="35" fill="#38bdf8" fontSize="11" fontWeight="700">Launch: θ = {sliderVal}°</text>
            <text x="410" y="52" fill="#cbd5e1" fontSize="10">Max Height = {maxH.toFixed(1)} m</text>
            <text x="410" y="69" fill="#cbd5e1" fontSize="10">Total Range = {range.toFixed(1)} m (t = {tFlight.toFixed(1)} s)</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 2. INCLINED PLANE & FRICTION FREE-BODY DIAGRAM
      // -------------------------------------------------------------
      case "diag-free-body-incline": {
        const theta = (sliderVal * Math.PI) / 180;
        const rampLength = 400;
        const x0 = 80;
        const y0 = 260;
        const x1 = x0 + rampLength * Math.cos(theta);
        const y1 = y0 - rampLength * Math.sin(theta);

        // Block position along ramp
        const bPos = 0.55;
        const bx = x0 + rampLength * bPos * Math.cos(theta);
        const by = y0 - rampLength * bPos * Math.sin(theta);

        // Vector lengths
        const W = 70;
        const W_perp = W * Math.cos(theta);
        const W_par = W * Math.sin(theta);

        return (
          <g>
            {/* Ground & Ramp */}
            <polygon points={`${x0},${y0} ${x1},${y1} ${x1},${y0}`} fill="rgba(30,41,59,0.5)" stroke="#64748b" strokeWidth="2" />
            <path d={`M ${x0 + 40},${y0} A 40 40 0 0 0 ${x0 + 40 * Math.cos(theta)},${y0 - 40 * Math.sin(theta)}`} fill="none" stroke="#38bdf8" strokeWidth="2" />
            <text x={x0 + 48} y={y0 - 8} fill="#38bdf8" fontSize="11" fontWeight="700">θ = {sliderVal}°</text>

            {/* Inclined Block */}
            <g transform={`translate(${bx}, ${by}) rotate(${-sliderVal})`}>
              <rect x="-30" y="-35" width="60" height="35" rx="4" fill="rgba(14,165,233,0.3)" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="-14" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">Mass m</text>
            </g>

            {/* Force Vectors from Block Center */}
            <g transform={`translate(${bx}, ${by - 17})`}>
              {/* Weight W = mg */}
              <line x1="0" y1="0" x2="0" y2={W} stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
              <text x="8" y={W - 10} fill="#f87171" fontSize="11" fontWeight="700">W = mg</text>

              {/* Normal Reaction R */}
              <line
                x1="0"
                y1="0"
                x2={-W_perp * Math.sin(theta)}
                y2={-W_perp * Math.cos(theta)}
                stroke="#10b981"
                strokeWidth="3"
                markerEnd="url(#arrow-green)"
              />
              <text x={-W_perp * Math.sin(theta) - 25} y={-W_perp * Math.cos(theta) - 6} fill="#34d399" fontSize="11" fontWeight="700">R = mg cos(θ)</text>

              {/* Friction Force F_f up the slope */}
              <line
                x1="0"
                y1="0"
                x2={-W_par * Math.cos(theta) * 1.2}
                y2={W_par * Math.sin(theta) * 1.2}
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow-amber)"
              />
              <text x={-W_par * Math.cos(theta) * 1.2 - 20} y={W_par * Math.sin(theta) * 1.2 - 8} fill="#fbbf24" fontSize="11" fontWeight="700">F_f</text>

              {/* Downslope component mg sin theta */}
              <line
                x1="0"
                y1="0"
                x2={W_par * Math.cos(theta) * 1.2}
                y2={-W_par * Math.sin(theta) * 1.2}
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <text x={W_par * Math.cos(theta) * 1.2 + 8} y={-W_par * Math.sin(theta) * 1.2 + 14} fill="#fda4af" fontSize="10">mg sin(θ)</text>
            </g>

            {/* Readout card */}
            <rect x="360" y="35" width="190" height="70" rx="8" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.3)" />
            <text x="375" y="55" fill="#38bdf8" fontSize="11" fontWeight="700">Inclined Plane Mechanics</text>
            <text x="375" y="72" fill="#cbd5e1" fontSize="10">Downslope: F = mg sin({sliderVal}°)</text>
            <text x="375" y="89" fill="#cbd5e1" fontSize="10">Normal: R = mg cos({sliderVal}°)</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 3. MECHANICAL ENERGY CONSERVATION BAR CHART
      // -------------------------------------------------------------
      case "diag-energy-conservation-bars": {
        const hRatio = sliderVal / 100; // 0 to 1
        const Ep = hRatio * 100;
        const Ek = (1 - hRatio) * 100;
        const total = 100;

        return (
          <g>
            {/* Background tracks */}
            <rect x="70" y="40" width="460" height="230" rx="12" fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.06)" />

            {/* Roller coaster curve visual */}
            <path
              d="M 90,60 Q 220,240 350,140 T 490,240"
              fill="none"
              stroke="rgba(148,163,184,0.4)"
              strokeWidth="3"
              strokeDasharray="6,4"
            />
            {/* Cart position */}
            <circle cx={90 + 400 * (1 - hRatio)} cy={240 - 180 * hRatio} r="9" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x={90 + 400 * (1 - hRatio)} y={225 - 180 * hRatio} fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">
              Cart (m)
            </text>

            {/* Bar charts at bottom */}
            <g transform="translate(110, 160)">
              {/* Kinetic Energy Bar */}
              <text x="25" y="70" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">E_k (Kinetic)</text>
              <rect x="10" y={50 - Ek * 0.9} width="30" height={Ek * 0.9} rx="4" fill="#38bdf8" />
              <text x="25" y={45 - Ek * 0.9} fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">{Ek.toFixed(0)}%</text>

              {/* Potential Energy Bar */}
              <text x="95" y="70" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">E_p (Potential)</text>
              <rect x="80" y={50 - Ep * 0.9} width="30" height={Ep * 0.9} rx="4" fill="#f59e0b" />
              <text x="95" y={45 - Ep * 0.9} fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle">{Ep.toFixed(0)}%</text>

              {/* Total Mechanical Energy Bar */}
              <text x="165" y="70" fill="#10b981" fontSize="11" fontWeight="700" textAnchor="middle">E_Total (Constant)</text>
              <rect x="150" y={50 - total * 0.9} width="30" height={total * 0.9} rx="4" fill="#10b981" />
              <text x="165" y={45 - total * 0.9} fill="#10b981" fontSize="10" fontWeight="700" textAnchor="middle">100%</text>
            </g>

            {/* Info callout */}
            <rect x="330" y="55" width="180" height="60" rx="8" fill="rgba(15,23,42,0.9)" stroke="rgba(16,185,129,0.3)" />
            <text x="345" y="75" fill="#34d399" fontSize="11" fontWeight="700">Energy Conservation</text>
            <text x="345" y="92" fill="#cbd5e1" fontSize="10">Ek + Ep = Constant (Total Energy)</text>
            <text x="345" y="106" fill="#94a3b8" fontSize="9">Height = {(hRatio * 50).toFixed(1)} m | Speed = {(Math.sqrt(2 * 9.81 * 50 * (1 - hRatio))).toFixed(1)} m/s</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 4. POTENTIAL DIVIDER & DC CIRCUIT
      // -------------------------------------------------------------
      case "diag-dc-circuit-potential-divider": {
        const R1 = 50;
        const R2 = sliderVal; // sensor R2
        const rInternal = 2;
        const Emf = 12;
        const totalR = R1 + R2 + rInternal;
        const current = Emf / totalR;
        const Vout = current * R2;
        const Vterm = Emf - current * rInternal;

        return (
          <g>
            {/* Circuit wiring loop */}
            <rect x="80" y="40" width="440" height="230" rx="14" fill="rgba(15,23,42,0.5)" stroke="rgba(255,255,255,0.08)" />

            {/* Wire lines */}
            <path d="M 140,80 L 460,80 L 460,230 L 140,230 Z" fill="none" stroke="#64748b" strokeWidth="3" />

            {/* Battery with internal resistance */}
            <rect x="110" y="130" width="60" height="50" rx="6" fill="rgba(30,41,59,0.9)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
            <line x1="130" y1="145" x2="130" y2="165" stroke="#ef4444" strokeWidth="3" />
            <line x1="145" y1="135" x2="145" y2="175" stroke="#10b981" strokeWidth="4" />
            <text x="140" y="122" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">EMF = 12V, r = 2Ω</text>

            {/* Resistor R1 */}
            <rect x="250" y="65" width="60" height="30" rx="4" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth="2" />
            <text x="280" y="84" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">R1 = 50Ω</text>

            {/* Resistor R2 (Sensor) */}
            <rect x="370" y="65" width="60" height="30" rx="4" fill="rgba(6,182,212,0.25)" stroke="#f59e0b" strokeWidth="2" />
            <text x="400" y="84" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">R2 = {R2}Ω</text>
            <line x1="365" y1="100" x2="435" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

            {/* Voltmeter tapping across R2 */}
            <path d="M 370,80 L 370,140 L 430,140 L 430,80" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx="400" cy="140" r="16" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2" />
            <text x="400" y="145" fill="#34d399" fontSize="12" fontWeight="800" textAnchor="middle">V</text>

            {/* Real-time multimeter readouts */}
            <rect x="180" y="180" width="230" height="70" rx="8" fill="rgba(15,23,42,0.95)" stroke="rgba(56,189,248,0.3)" />
            <text x="195" y="200" fill="#38bdf8" fontSize="11" fontWeight="700">Sensor Output V_out = {Vout.toFixed(2)} V</text>
            <text x="195" y="218" fill="#cbd5e1" fontSize="10">Circuit Current I = {(current * 1000).toFixed(1)} mA</text>
            <text x="195" y="235" fill="#94a3b8" fontSize="10">Terminal PD V_term = {Vterm.toFixed(2)} V (Lost: {(current * rInternal).toFixed(2)} V)</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 5. SHM SINUSOIDAL WAVEFORMS
      // -------------------------------------------------------------
      case "diag-shm-phase-relationships": {
        const A = 1.0;
        const omega = 1.0;
        const pointsX: string[] = [];
        const pointsV: string[] = [];
        const pointsA: string[] = [];

        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * 4 * Math.PI;
          const xPos = 80 + (i / 100) * 430;
          const yX = 150 - (Math.cos(t) * 55);
          const yV = 150 - (-Math.sin(t) * 55);
          const yA = 150 - (-Math.cos(t) * 55);
          pointsX.push(`${xPos.toFixed(1)},${yX.toFixed(1)}`);
          pointsV.push(`${xPos.toFixed(1)},${yV.toFixed(1)}`);
          pointsA.push(`${xPos.toFixed(1)},${yA.toFixed(1)}`);
        }

        return (
          <g>
            {/* Axes */}
            <line x1="70" y1="150" x2="520" y2="150" stroke="#475569" strokeWidth="2" />
            <line x1="80" y1="50" x2="80" y2="250" stroke="#475569" strokeWidth="2" />
            <text x="525" y="154" fill="#94a3b8" fontSize="11">Time t</text>
            <text x="75" y="45" fill="#94a3b8" fontSize="11">Value</text>

            {/* Displacement Curve x(t) */}
            <path d={`M ${pointsX.join(" L ")}`} fill="none" stroke="#38bdf8" strokeWidth="3" />

            {/* Velocity Curve v(t) - Leads by 90° */}
            <path d={`M ${pointsV.join(" L ")}`} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,3" />

            {/* Acceleration Curve a(t) - 180° Antiphase */}
            <path d={`M ${pointsA.join(" L ")}`} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />

            {/* Legend */}
            <g transform="translate(180, 50)">
              <rect x="0" y="0" width="290" height="35" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.1)" />
              <circle cx="20" cy="18" r="5" fill="#38bdf8" />
              <text x="32" y="22" fill="#38bdf8" fontSize="10" fontWeight="600">Displacement x</text>
              <circle cx="115" cy="18" r="5" fill="#10b981" />
              <text x="127" y="22" fill="#10b981" fontSize="10" fontWeight="600">Velocity v (+90°)</text>
              <circle cx="215" cy="18" r="5" fill="#f43f5e" />
              <text x="227" y="22" fill="#f43f5e" fontSize="10" fontWeight="600">Accel a (180°)</text>
            </g>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 6. YOUNG'S DOUBLE SLIT INTERFERENCE
      // -------------------------------------------------------------
      case "diag-young-double-slit-interference": {
        const fringeSpacing = (650 * 5) / sliderVal; // proportional
        const fringes = [-3, -2, -1, 0, 1, 2, 3];

        return (
          <g>
            {/* Barrier with two slits */}
            <line x1="120" y1="40" x2="120" y2="135" stroke="#94a3b8" strokeWidth="5" />
            <line x1="120" y1="145" x2="120" y2="175" stroke="#94a3b8" strokeWidth="5" />
            <line x1="120" y1="185" x2="120" y2="280" stroke="#94a3b8" strokeWidth="5" />

            <text x="105" y="142" fill="#38bdf8" fontSize="9" textAnchor="end">Slit 1</text>
            <text x="105" y="182" fill="#38bdf8" fontSize="9" textAnchor="end">Slit 2</text>
            <text x="105" y="163" fill="#cbd5e1" fontSize="10" fontWeight="700" textAnchor="end">d = {sliderVal} μm</text>

            {/* Circular wavefront ripples */}
            <circle cx="120" cy="140" r="40" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
            <circle cx="120" cy="140" r="80" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
            <circle cx="120" cy="140" r="120" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />

            <circle cx="120" cy="180" r="40" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
            <circle cx="120" cy="180" r="80" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />
            <circle cx="120" cy="180" r="120" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" />

            {/* Viewing Screen */}
            <line x1="480" y1="40" x2="480" y2="280" stroke="#e2e8f0" strokeWidth="4" />
            <text x="490" y="55" fill="#cbd5e1" fontSize="11" fontWeight="700">Screen (D = 1.8 m)</text>

            {/* Bright Fringes on Screen */}
            {fringes.map((n) => {
              const y = 160 + n * fringeSpacing;
              if (y < 45 || y > 275) return null;
              return (
                <g key={n}>
                  <rect x="475" y={y - 8} width="10" height="16" rx="2" fill="#06b6d4" />
                  <text x="495" y={y + 4} fill="#22d3ee" fontSize="10" fontWeight="600">
                    {n === 0 ? "n = 0 (Central Max)" : `n = ${n}`}
                  </text>
                </g>
              );
            })}

            {/* Formula callout */}
            <rect x="220" y="225" width="200" height="45" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(6,182,212,0.3)" />
            <text x="235" y="243" fill="#38bdf8" fontSize="11" fontWeight="700">Fringe Width s = λD / d</text>
            <text x="235" y="258" fill="#cbd5e1" fontSize="9">Spacing s = {fringeSpacing.toFixed(1)} mm</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 7. STANDING WAVE HARMONICS ON A STRING
      // -------------------------------------------------------------
      case "diag-standing-wave-harmonics-string": {
        const n = Math.max(1, Math.min(4, Math.round(sliderVal / 25) || 1));
        const L = 420;
        const xStart = 80;
        const pointsUpper: string[] = [];
        const pointsLower: string[] = [];

        for (let i = 0; i <= 100; i++) {
          const frac = i / 100;
          const x = xStart + frac * L;
          const yOffset = Math.sin(n * Math.PI * frac) * 50;
          pointsUpper.push(`${x.toFixed(1)},${(160 - yOffset).toFixed(1)}`);
          pointsLower.push(`${x.toFixed(1)},${(160 + yOffset).toFixed(1)}`);
        }

        return (
          <g>
            {/* Clamped supports */}
            <rect x="65" y="120" width="15" height="80" rx="3" fill="#64748b" />
            <rect x="500" y="120" width="15" height="80" rx="3" fill="#64748b" />
            <text x="72" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Node</text>
            <text x="507" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Node</text>

            {/* Standing wave envelope */}
            <path d={`M ${pointsUpper.join(" L ")}`} fill="none" stroke="#38bdf8" strokeWidth="3" />
            <path d={`M ${pointsLower.join(" L ")}`} fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" strokeDasharray="4,4" />

            {/* Nodes and Antinodes labels */}
            {Array.from({ length: n + 1 }).map((_, idx) => {
              const nx = xStart + (idx / n) * L;
              return (
                <g key={`node-${idx}`}>
                  <circle cx={nx} cy="160" r="5" fill="#f43f5e" />
                  <text x={nx} y="180" fill="#fb7185" fontSize="10" fontWeight="700" textAnchor="middle">N</text>
                </g>
              );
            })}
            {Array.from({ length: n }).map((_, idx) => {
              const ax = xStart + ((idx + 0.5) / n) * L;
              return (
                <text key={`anti-${idx}`} x={ax} y="100" fill="#34d399" fontSize="11" fontWeight="800" textAnchor="middle">
                  A
                </text>
              );
            })}

            {/* Readout */}
            <rect x="180" y="45" width="220" height="45" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.3)" />
            <text x="290" y="63" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
              Harmonic Mode n = {n} (f = {n} f_1)
            </text>
            <text x="290" y="78" fill="#cbd5e1" fontSize="10" textAnchor="middle">
              Wavelength λ = 2L / {n} = {(2 / n).toFixed(2)} L
            </text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 8. DOPPLER EFFECT SOUND WAVEFRONTS
      // -------------------------------------------------------------
      case "diag-doppler-sound-wavefronts": {
        const vs = sliderVal; // 0 to 100
        const shiftFactor = (vs / 100) * 25;

        return (
          <g>
            {/* Background grid */}
            <rect x="70" y="40" width="460" height="240" rx="12" fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.06)" />

            {/* Eccentric nested wavefront circles moving to the right */}
            <circle cx={300 + shiftFactor * 0} cy="160" r="100" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="2" />
            <circle cx={300 + shiftFactor * 1} cy="160" r="75" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
            <circle cx={300 + shiftFactor * 2} cy="160" r="50" fill="none" stroke="rgba(56,189,248,0.6)" strokeWidth="2" />
            <circle cx={300 + shiftFactor * 3} cy="160" r="25" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Moving Source */}
            <circle cx={300 + shiftFactor * 3.5} cy="160" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <line
              x1={300 + shiftFactor * 3.5}
              y1="160"
              x2={300 + shiftFactor * 3.5 + 30}
              y2="160"
              stroke="#f59e0b"
              strokeWidth="3"
              markerEnd="url(#arrow-amber)"
            />
            <text x={300 + shiftFactor * 3.5} y="145" fill="#fbbf24" fontSize="10" fontWeight="700" textAnchor="middle">Source v_s</text>

            {/* Observer Ahead (Compressed Wavelength, Higher f') */}
            <g transform="translate(480, 160)">
              <circle cx="0" cy="0" r="14" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2" />
              <text x="0" y="4" fill="#34d399" fontSize="11" fontWeight="800" textAnchor="middle">Obs</text>
              <text x="0" y="26" fill="#34d399" fontSize="9" fontWeight="700" textAnchor="middle">f&apos; &gt; f (Higher)</text>
            </g>

            {/* Observer Behind (Stretched Wavelength, Lower f'') */}
            <g transform="translate(100, 160)">
              <circle cx="0" cy="0" r="14" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" strokeWidth="2" />
              <text x="0" y="4" fill="#fb7185" fontSize="11" fontWeight="800" textAnchor="middle">Obs</text>
              <text x="0" y="26" fill="#fb7185" fontSize="9" fontWeight="700" textAnchor="middle">f&apos;&apos; &lt; f (Lower)</text>
            </g>

            {/* Formula banner */}
            <rect x="180" y="55" width="240" height="42" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.3)" />
            <text x="300" y="72" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
              Doppler Shift: f&apos; = f · [v / (v - u_s)]
            </text>
            <text x="300" y="87" fill="#cbd5e1" fontSize="9" textAnchor="middle">
              Source Speed u_s = {(vs * 1.5).toFixed(0)} m/s (Sound v = 340 m/s)
            </text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 9. CHARGED PARTICLE CIRCULAR MOTION IN B-FIELD
      // -------------------------------------------------------------
      case "diag-charged-particle-b-field-circle": {
        const radius = Math.max(40, Math.min(100, sliderVal * 1.2));
        const cx = 300;
        const cy = 160;

        return (
          <g>
            {/* Magnetic field grid (into page: crosses) */}
            <g opacity="0.35">
              {[120, 180, 240, 300, 360, 420, 480].map((x) =>
                [60, 110, 160, 210, 260].map((y) => (
                  <text key={`${x}-${y}`} x={x} y={y} fill="#38bdf8" fontSize="14" fontWeight="600" textAnchor="middle">
                    ×
                  </text>
                ))
              )}
            </g>
            <text x="510" y="60" fill="#38bdf8" fontSize="11" fontWeight="700">B-Field (Into Page)</text>

            {/* Circular Orbit */}
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6,4" />

            {/* Particle on circle */}
            <circle cx={cx + radius} cy={cy} r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <text x={cx + radius + 14} y={cy + 4} fill="#38bdf8" fontSize="11" fontWeight="700">+q</text>

            {/* Tangential velocity vector */}
            <line x1={cx + radius} y1={cy} x2={cx + radius} y2={cy - 50} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
            <text x={cx + radius + 8} y={cy - 45} fill="#38bdf8" fontSize="11" fontWeight="700">v (Velocity)</text>

            {/* Centripetal Magnetic Force vector */}
            <line x1={cx + radius} y1={cy} x2={cx + radius - 45} y2={cy} stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <text x={cx + radius - 35} y={cy - 8} fill="#fb7185" fontSize="11" fontWeight="700">F_B = qvB</text>

            {/* Radius line */}
            <line x1={cx} y1={cy} x2={cx + radius} y2={cy} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
            <text x={cx + radius / 2} y={cy + 16} fill="#cbd5e1" fontSize="10" textAnchor="middle">r = mv/(qB)</text>

            {/* Readout */}
            <rect x="90" y="55" width="180" height="55" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(16,185,129,0.3)" />
            <text x="105" y="74" fill="#34d399" fontSize="11" fontWeight="700">Magnetic Orbit Radius</text>
            <text x="105" y="90" fill="#cbd5e1" fontSize="10">r = {(radius / 2).toFixed(1)} cm</text>
            <text x="105" y="102" fill="#94a3b8" fontSize="9">Work W = 0 (E_k invariant)</text>
          </g>
        );
      }

      // -------------------------------------------------------------
      // 10. BINDING ENERGY PER NUCLEON CURVE
      // -------------------------------------------------------------
      case "diag-binding-energy-per-nucleon-curve": {
        return (
          <g>
            {/* Axes */}
            <line x1="80" y1="260" x2="520" y2="260" stroke="#475569" strokeWidth="2" />
            <line x1="80" y1="40" x2="80" y2="260" stroke="#475569" strokeWidth="2" />
            <text x="525" y="264" fill="#94a3b8" fontSize="11" fontWeight="600">Mass Number A</text>
            <text x="80" y="32" fill="#94a3b8" fontSize="11" fontWeight="600">BE / A (MeV/nucleon)</text>

            {/* Y-axis tick marks */}
            {[2, 4, 6, 8, 10].map((val) => {
              const y = 260 - (val / 10) * 200;
              return (
                <g key={val}>
                  <line x1="75" y1={y} x2="80" y2={y} stroke="#64748b" strokeWidth="1.5" />
                  <text x="70" y={y + 4} fill="#64748b" fontSize="9" textAnchor="end">{val}</text>
                </g>
              );
            })}

            {/* The Curve */}
            {/* Starts at H-2 (1.1), jumps to He-4 (7.1), drops to Li-6 (5.3), rises to C-12, O-16, peaks at Fe-56 (8.8), declines to U-238 (7.6) */}
            <path
              d="M 85,240 
                 L 92,230 
                 L 98,118 
                 L 105,150 
                 L 125,108 
                 L 145,95 
                 Q 210,84 220,84 
                 Q 340,94 500,108"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Iron-56 Peak Marker */}
            <circle cx="220" cy="84" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="220" y="70" fill="#fbbf24" fontSize="11" fontWeight="800" textAnchor="middle">
              ^{56}Fe (8.79 MeV)
            </text>

            {/* Helium-4 Spike */}
            <circle cx="98" cy="118" r="4" fill="#38bdf8" />
            <text x="106" y="118" fill="#38bdf8" fontSize="9" fontWeight="700">^4He</text>

            {/* Uranium-238 Point */}
            <circle cx="500" cy="108" r="5" fill="#f43f5e" />
            <text x="500" y="125" fill="#fb7185" fontSize="10" fontWeight="700" textAnchor="middle">U-238 (7.6 MeV)</text>

            {/* Fusion Region Shading (A < 56) */}
            <rect x="90" y="170" width="120" height="60" rx="6" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" />
            <text x="150" y="195" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle">FUSION DOMAIN</text>
            <text x="150" y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">Light nuclei fuse → higher BE/A</text>

            {/* Fission Region Shading (A > 56) */}
            <rect x="250" y="170" width="240" height="60" rx="6" fill="rgba(244,63,94,0.15)" stroke="rgba(244,63,94,0.4)" />
            <text x="370" y="195" fill="#fb7185" fontSize="11" fontWeight="700" textAnchor="middle">FISSION DOMAIN</text>
            <text x="370" y="215" fill="#cbd5e1" fontSize="9" textAnchor="middle">Heavy nuclei split → higher BE/A</text>
          </g>
        );
      }

      // Default fallback generic physics schematic
      default:
        return (
          <g>
            <rect x="80" y="40" width="440" height="230" rx="12" fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.06)" />
            <circle cx="300" cy="155" r="50" fill="none" stroke="#06b6d4" strokeWidth="3" />
            <line x1="220" y1="155" x2="380" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
            <text x="300" y="160" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle">
              {dossier.title}
            </text>
          </g>
        );
    }
  };

  return (
    <div className={`diagram-lab-wrapper rounded-3xl bg-slate-950/80 border border-white/10 p-5 backdrop-blur-xl shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
              {dossier.topicRef}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Interactive Physics Vector
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">{dossier.title}</h3>
        </div>

        {/* Primary Slider Controller */}
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-2xl">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-slate-300 font-mono">Modulate: {sliderVal}</span>
          <input
            type="range"
            min="15"
            max="85"
            value={sliderVal}
            onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
            className="w-24 sm:w-32 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[380px] bg-slate-950/90 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-2">
        <svg
          viewBox="0 0 600 320"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
            </marker>
          </defs>
          {renderSvgContent()}
        </svg>
      </div>

      {/* Theory & Exam Notes */}
      {!compact && (
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold mb-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Physical Mechanism</span>
            </div>
            <p className="text-slate-300 leading-relaxed"><MathText text={dossier.description} /></p>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IB Exam Pitfall</span>
            </div>
            <p className="text-cyan-200/90 leading-relaxed"><MathText text={dossier.examPitfalls} /></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDiagram;
