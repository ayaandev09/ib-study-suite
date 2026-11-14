import { ConceptDefinition, ThemePart } from "./types";

export const PHYSICS_CONCEPTS: ConceptDefinition[] = [
  {
    id: "conservation",
    name: "Conservation Laws",
    shortName: "Conservation",
    color: "#38bdf8", // Sky blue
    badgeBg: "rgba(56, 189, 248, 0.15)",
    badgeBorder: "rgba(56, 189, 248, 0.4)",
    badgeText: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.3)",
    description: "Fundamental quantities (energy, linear momentum, electric charge, nucleon number) remain invariant in isolated systems, providing powerful scalar and vector constraints on physical interactions.",
    coreMechanism: "Initial total state equals final total state $(\\Sigma E_i = \\Sigma E_f,\\ \\Sigma p_i = \\Sigma p_f)$ independent of the internal reaction pathway or forces involved.",
    examTips: "Always identify isolated system boundaries first. For collisions, momentum is always conserved; kinetic energy is conserved only in elastic collisions.",
  },
  {
    id: "fields",
    name: "Fields & Action-at-a-Distance",
    shortName: "Fields",
    color: "#a855f7", // Purple/violet
    badgeBg: "rgba(168, 85, 247, 0.15)",
    badgeBorder: "rgba(168, 85, 247, 0.4)",
    badgeText: "#c084fc",
    glowColor: "rgba(168, 85, 247, 0.3)",
    description: "Non-contact interactions mediated by physical fields (gravitational, electric, and magnetic) mapped by field lines, potential gradients, and force vectors acting on mass and charge.",
    coreMechanism: "Field strength is force per unit test entity: $g = F/m$ for gravity, $E = F/q$ for electrostatics. Magnetic fields exert cross-product velocity-dependent forces $F = qvB\\sin\\theta$.",
    examTips: "Compare Newton's gravitational law and Coulomb's law: both follow inverse-square dependencies, but gravity is strictly attractive while electrostatic forces can attract or repel.",
  },
  {
    id: "duality",
    name: "Wave-Particle Duality",
    shortName: "Duality",
    color: "#10b981", // Emerald
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
    badgeText: "#34d399",
    glowColor: "rgba(16, 185, 129, 0.3)",
    description: "Light and matter exhibit both continuous wave phenomena (interference, diffraction) and discrete localized particle interactions (photoelectric effect, photon emission, Compton scattering).",
    coreMechanism: "Photons carry discrete quantized energy $E = hf$ and momentum $p = h/\\lambda$, bridging wave kinematics ($\\lambda, f$) with particle dynamics ($E, p$).",
    examTips: "In exams, cite interference and diffraction as conclusive evidence for wave nature; cite the existence of a threshold frequency in the photoelectric effect as proof of particulate photons.",
  },
  {
    id: "micro-macro",
    name: "Microscopic to Macroscopic",
    shortName: "Micro-Macro",
    color: "#f59e0b", // Amber
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeBorder: "rgba(245, 158, 11, 0.4)",
    badgeText: "#fbbf24",
    glowColor: "rgba(245, 158, 11, 0.3)",
    description: "Macroscopic observables (temperature, pressure, electrical resistance, thermal expansion) emerge as statistical averages of microscopic collisions, atomic lattice vibrations, and electron drift velocities.",
    coreMechanism: "Temperature is a direct measure of average molecular translational kinetic energy: $\\bar{E}_k = \\frac{3}{2} k_B T$. Electric current is charge drift: $I = nAvq$.",
    examTips: "When explaining gas pressure changes, always argue from microscopic momentum transfers: frequency of particle-wall collisions and impulse $\\Delta p$ per collision.",
  },
  {
    id: "equilibrium",
    name: "Equilibrium & Stability",
    shortName: "Equilibrium",
    color: "#06b6d4", // Cyan
    badgeBg: "rgba(6, 182, 212, 0.15)",
    badgeBorder: "rgba(6, 182, 212, 0.4)",
    badgeText: "#22d3ee",
    glowColor: "rgba(6, 182, 212, 0.3)",
    description: "Dynamic and static balance where opposing forces, torques, or energy flux rates cancel out, maintaining steady-state motion, thermal equilibrium, or stellar hydrostatic stability.",
    coreMechanism: "Translational equilibrium requires $\\Sigma \\vec{F} = 0$. Radiative equilibrium requires absorbed solar power to equal emitted blackbody power ($P_{\\text{in}} = P_{\\text{out}}$).",
    examTips: "Distinguish between static equilibrium (zero velocity) and dynamic equilibrium (constant terminal velocity). In both cases net force and acceleration are strictly zero.",
  },
  {
    id: "invariance",
    name: "Invariance & Fundamental Constants",
    shortName: "Invariance",
    color: "#ec4899", // Pink
    badgeBg: "rgba(236, 72, 153, 0.15)",
    badgeBorder: "rgba(236, 72, 153, 0.4)",
    badgeText: "#f472b6",
    glowColor: "rgba(236, 72, 153, 0.3)",
    description: "Physical laws maintain consistent mathematical form across reference frames, constrained by universal constants: c, G, h, k_B, and the elementary charge e.",
    coreMechanism: "Fundamental constants govern the absolute scales of the universe: Planck's constant sets the quantum limit, c defines causality and spacetime curvature.",
    examTips: "Use dimensional analysis and SI base units to verify derived equations and check consistency across different physical formulations.",
  },
  {
    id: "uncertainty",
    name: "Uncertainty & Experimental Methodology",
    shortName: "Uncertainty",
    color: "#f43f5e", // Rose
    badgeBg: "rgba(244, 63, 94, 0.15)",
    badgeBorder: "rgba(244, 63, 94, 0.4)",
    badgeText: "#fb7185",
    glowColor: "rgba(244, 63, 94, 0.3)",
    description: "Every physical measurement carries inherent random fluctuations and systematic offsets that propagate through mathematical operations, defining experimental precision and validity.",
    coreMechanism: "Absolute uncertainties add under sums/differences ($\\Delta z = \\Delta x + \\Delta y$); fractional uncertainties add under products/quotients ($\\frac{\\Delta z}{z} = \\frac{\\Delta x}{x} + \\frac{\\Delta y}{y}$).",
    examTips: "Paper 1B and Paper 2 will deduct marks if final calculated answers do not match the significant figures dictated by raw experimental data.",
  },
];

export const SYLLABUS_THEMES: {
  id: "theme-a" | "theme-b" | "theme-c" | "theme-d" | "theme-e";
  number: 1 | 2 | 3 | 4 | 5;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  hours: number;
  color: string;
  accentHex: string;
}[] = [
  {
    id: "theme-a",
    number: 1,
    code: "THEME A",
    title: "Space, Time and Motion",
    shortTitle: "Mechanics",
    description: "Kinematics, Newton's laws, translational equilibrium, linear momentum, impulse, energy conservation, work, and power.",
    hours: 27,
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-300",
    accentHex: "#6366f1",
  },
  {
    id: "theme-b",
    number: 2,
    code: "THEME B",
    title: "The Particulate Nature of Matter",
    shortTitle: "Thermal & Matter",
    description: "Thermal transfers, specific heat, phase changes, greenhouse radiation balance, ideal gas laws, kinetic theory, and electric circuits.",
    hours: 24,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
    accentHex: "#f59e0b",
  },
  {
    id: "theme-c",
    number: 3,
    code: "THEME C",
    title: "Wave Behaviour",
    shortTitle: "Waves & Optics",
    description: "Simple harmonic motion, wave mechanics, reflection, refraction, single & double slit interference, standing wave harmonics, and Doppler effect.",
    hours: 17,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
    accentHex: "#10b981",
  },
  {
    id: "theme-d",
    number: 4,
    code: "THEME D",
    title: "Fields",
    shortTitle: "Fields & Forces",
    description: "Newtonian gravitational fields, Coulomb electric fields, dipole patterns, magnetic Lorentz forces, and particle trajectories.",
    hours: 19,
    color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300",
    accentHex: "#a855f7",
  },
  {
    id: "theme-e",
    number: 5,
    code: "THEME E",
    title: "Nuclear and Quantum Physics",
    shortTitle: "Nuclear & Stars",
    description: "Rutherford atomic model, isotopes, radioactive decay laws, mass defect, binding energy curves, nuclear fission, and stellar fusion.",
    hours: 23,
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-300",
    accentHex: "#f43f5e",
  },
];
