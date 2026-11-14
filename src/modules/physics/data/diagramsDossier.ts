import { DiagramDossier } from "./types";

export const DIAGRAMS_DOSSIER: DiagramDossier[] = [
  {
    id: "diag-projectile-trajectory",
    title: "2D Projectile Motion Trajectory & Velocity Decomposition",
    topicRef: "A.1",
    themeId: "theme-a",
    description: "Interactive ballistic trajectory mapping independent horizontal constant velocity (v_x = u\\cos\\theta) and vertical gravitational free fall (v_y = u\\sin\\theta - gt). Adjust launch angle and initial velocity to observe changes in flight time, apogee, and landing range.",
    whyItMatters: "Directly visualizes the independence of orthogonal kinematic vectors, demonstrating that horizontal motion has zero acceleration while vertical motion undergoes constant gravitational acceleration.",
    examPitfalls: "Remember that at the apex of flight, velocity is NOT zero (v_x = u\\cos\\theta is non-zero); only vertical velocity v_y is momentarily zero. Acceleration remains 9.81 m/s^2 downwards throughout.",
    interactiveControls: [
      { id: "angle", label: "Launch Angle (\\theta)", type: "slider", defaultValue: 45, min: 15, max: 75, step: 5 },
      { id: "velocity", label: "Initial Speed (u)", type: "slider", defaultValue: 30, min: 10, max: 50, step: 5 },
      { id: "showVectors", label: "Show Velocity Vectors", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["x = (u\\cos\\theta)t", "y = (u\\sin\\theta)t - 0.5gt^2", "R = \\frac{u^2\\sin(2\\theta)}{g}"]
  },
  {
    id: "diag-free-body-incline",
    title: "Newton's Laws: Inclined Plane & Friction Equilibrium",
    topicRef: "A.2",
    themeId: "theme-a",
    description: "Free-body force diagram of a mass resting on an inclined ramp. Decomposes gravitational weight into downslope parallel component (mg\\sin\\theta) and perpendicular contact component (mg\\cos\\theta balanced by normal reaction R). Shows static vs dynamic friction transitions.",
    whyItMatters: "Core mechanical template for resolving vector forces along tilted coordinate frames in Paper 1 and Paper 2 exam problems.",
    examPitfalls: "Normal reaction R is mg\\cos\\theta, NOT mg! Friction opposes the direction of impending or actual relative motion, acting up the slope.",
    interactiveControls: [
      { id: "rampAngle", label: "Incline Angle (\\theta)", type: "slider", defaultValue: 30, min: 0, max: 60, step: 5 },
      { id: "frictionCoeff", label: "Friction Coeff (\\mu)", type: "slider", defaultValue: 0.5, min: 0.1, max: 0.9, step: 0.1 },
      { id: "showComponents", label: "Decompose Weight", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["W_{\\parallel} = mg\\sin\\theta", "R = mg\\cos\\theta", "F_f \\le \\mu R"]
  },
  {
    id: "diag-energy-conservation-bars",
    title: "Mechanical Energy Conservation Bar Chart (E_k vs E_p)",
    topicRef: "A.3",
    themeId: "theme-a",
    description: "Dynamic bar chart simulation of a mass sliding on a frictionless roller coaster or pendulum, illustrating continuous lossless energy exchange between kinetic store E_k = 0.5mv^2 and gravitational store E_p = mgh.",
    whyItMatters: "Reinforces that total mechanical energy E_T = E_k + E_p is invariant in conservative systems, converting complex kinematic problems into scalar additions.",
    examPitfalls: "If non-conservative friction or drag is present, total mechanical energy decreases as work done against friction dissipates into thermal energy: E_{initial} = E_{final} + W_{f}.",
    interactiveControls: [
      { id: "heightFraction", label: "Vertical Position (h/h_max)", type: "slider", defaultValue: 0.5, min: 0, max: 1.0, step: 0.1 },
      { id: "addFriction", label: "Include Friction Losses", type: "toggle", defaultValue: false }
    ],
    keyFormulas: ["E_T = E_k + E_p", "E_k = \\frac{1}{2}mv^2", "E_p = mgh"]
  },
  {
    id: "diag-pv-isotherms",
    title: "Ideal Gas P-V Diagram & Thermodynamic Isotherms",
    topicRef: "B.3",
    themeId: "theme-b",
    description: "Pressure-Volume (p-V) state diagram showing hyperbolic Boyle's Law isotherms (pV = constant) at different temperatures, along with isobaric (horizontal) and isochoric (vertical) thermodynamic paths.",
    whyItMatters: "Enables visual analysis of gas transformations and connects macroscopic pressure-volume coordinates with internal energy U = 1.5 nRT.",
    examPitfalls: "Higher isotherms correspond to higher absolute temperatures. On an isothermal expansion, temperature is constant so internal energy change \\Delta U = 0.",
    interactiveControls: [
      { id: "gasTemp", label: "Isotherm Temperature (T)", type: "slider", defaultValue: 300, min: 200, max: 600, step: 50 },
      { id: "processType", label: "Thermodynamic Path", type: "choice", defaultValue: "isothermal", options: [{ label: "Isothermal (T = const)", value: "isothermal" }, { label: "Isobaric (p = const)", value: "isobaric" }, { label: "Isochoric (V = const)", value: "isochoric" }] }
    ],
    keyFormulas: ["pV = nRT", "W = p\\Delta V", "\\bar{E}_k = \\frac{3}{2}k_B T"]
  },
  {
    id: "diag-dc-circuit-potential-divider",
    title: "DC Circuit & Variable Potential Divider Simulator",
    topicRef: "B.5",
    themeId: "theme-b",
    description: "Interactive potential divider circuit with internal resistance cell (\\mathcal{E}, r) connected to fixed resistor R_1 and variable sensor resistor R_2 (e.g. thermistor or LDR), calculating current, terminal PD, and output voltage V_out.",
    whyItMatters: "Potential dividers appear in almost every IB Physics exam session as sensor control elements for automated cooling, heating, or lighting systems.",
    examPitfalls: "The resistor with the LARGER resistance drops the LARGER share of voltage. Watch for cell internal resistance r: terminal voltage drops below \\mathcal{E} under heavy current load.",
    interactiveControls: [
      { id: "r2Value", label: "Sensor Resistance R_2 (\\Omega)", type: "slider", defaultValue: 50, min: 10, max: 200, step: 10 },
      { id: "internalR", label: "Internal Resistance r (\\Omega)", type: "slider", defaultValue: 2, min: 0, max: 10, step: 1 },
      { id: "supplyEMF", label: "Supply EMF \\mathcal{E} (V)", type: "slider", defaultValue: 12, min: 6, max: 24, step: 2 }
    ],
    keyFormulas: ["V_{out} = V_{in}\\frac{R_2}{R_1 + R_2}", "V = \\mathcal{E} - Ir", "I = \\frac{\\mathcal{E}}{R_1 + R_2 + r}"]
  },
  {
    id: "diag-shm-phase-relationships",
    title: "Simple Harmonic Motion: Sinusoidal Kinematic Waveforms",
    topicRef: "C.1",
    themeId: "theme-c",
    description: "Side-by-side sinusoidal waveforms displaying displacement x(t), velocity v(t), and acceleration a(t) in SHM. Highlights the 90° (\\pi/2) phase lead of velocity and 180° (\\pi) antiphase relationship of acceleration.",
    whyItMatters: "Visualizes the mathematical derivatives of harmonic motion and explains why acceleration is always oriented toward equilibrium opposite to displacement.",
    examPitfalls: "When displacement is at its positive maximum, velocity is zero and acceleration is at its negative maximum. Do not confuse phase leads with time delays.",
    interactiveControls: [
      { id: "amplitude", label: "Amplitude (x_0)", type: "slider", defaultValue: 1.0, min: 0.5, max: 2.0, step: 0.1 },
      { id: "frequency", label: "Frequency (f)", type: "slider", defaultValue: 1.0, min: 0.5, max: 3.0, step: 0.5 },
      { id: "viewMode", label: "Display Waveform", type: "choice", defaultValue: "all", options: [{ label: "All 3 Curves", value: "all" }, { label: "Displacement Only", value: "x" }, { label: "Velocity Only", value: "v" }, { label: "Acceleration Only", value: "a" }] }
    ],
    keyFormulas: ["a = -\\omega^2 x", "v = \\pm\\omega\\sqrt{x_0^2 - x^2}", "x = x_0\\cos(\\omega t)"]
  },
  {
    id: "diag-young-double-slit-interference",
    title: "Young's Double-Slit Wave Interference & Fringe Geometry",
    topicRef: "C.3",
    themeId: "theme-c",
    description: "Interactive wave interference pattern behind two coherent slits showing overlapping circular wavelets, path difference rays, and resulting screen intensity fringes of spacing s = \\lambda D / d.",
    whyItMatters: "Provides direct empirical evidence for the wave model of light and demonstrates quantitative measurement of sub-micron optical wavelengths.",
    examPitfalls: "Doubling slit separation d HALVES fringe width s. Red light produces wider fringes than blue light because \\lambda_{red} > \\lambda_{blue}.",
    interactiveControls: [
      { id: "wavelength", label: "Wavelength (\\lambda in nm)", type: "slider", defaultValue: 650, min: 400, max: 700, step: 50 },
      { id: "slitSeparation", label: "Slit Spacing d (mm)", type: "slider", defaultValue: 0.25, min: 0.10, max: 0.50, step: 0.05 },
      { id: "showPathDiff", label: "Show Path Difference", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["s = \\frac{\\lambda D}{d}", "\\text{Constructive: } \\Delta r = n\\lambda", "\\text{Destructive: } \\Delta r = (n+0.5)\\lambda"]
  },
  {
    id: "diag-standing-wave-harmonics-string",
    title: "Standing Wave Harmonics on Strings & Air Columns",
    topicRef: "C.4",
    themeId: "theme-c",
    description: "Visual simulation of standing wave harmonic modes (fundamental n=1, 2nd harmonic n=2, 3rd harmonic n=3) on a clamped string, clearly labeling displacement nodes (N) and antinodes (A).",
    whyItMatters: "Essential for understanding musical acoustics and boundary value quantization where wave frequency is constrained by physical dimensions L.",
    examPitfalls: "Distance between adjacent nodes is \\lambda / 2; distance between node and adjacent antinode is \\lambda / 4. Clamped ends MUST be displacement nodes.",
    interactiveControls: [
      { id: "harmonicNumber", label: "Harmonic Mode (n)", type: "slider", defaultValue: 1, min: 1, max: 4, step: 1 },
      { id: "showNodes", label: "Highlight Nodes & Antinodes", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["\\lambda_n = \\frac{2L}{n}", "f_n = n f_1", "d_{N-N} = \\frac{\\lambda}{2}"]
  },
  {
    id: "diag-doppler-sound-wavefronts",
    title: "Acoustic Doppler Wavefront Compression & Expansion",
    topicRef: "C.5",
    themeId: "theme-c",
    description: "Circular sound wavefronts emitted by a moving source, illustrating spatial compression of wavefronts ahead (higher frequency f') and expansion behind (lower frequency f'').",
    whyItMatters: "Directly illustrates why pitch sounds higher when a vehicle approaches and drops suddenly as it passes by.",
    examPitfalls: "The speed of sound in air is unaffected by source speed; only the spatial wavelength between successive emitted wavefronts is compressed.",
    interactiveControls: [
      { id: "sourceSpeed", label: "Source Speed (u_s in m/s)", type: "slider", defaultValue: 60, min: 0, max: 200, step: 20 },
      { id: "soundSpeed", label: "Speed of Sound (v)", type: "slider", defaultValue: 340, min: 300, max: 360, step: 10 }
    ],
    keyFormulas: ["f' = f\\left(\\frac{v}{v - u_s}\\right)", "\\lambda' = \\frac{v - u_s}{f}", "\\frac{\\Delta f}{f} \\approx \\frac{v}{c}"]
  },
  {
    id: "diag-electric-field-dipole-plates",
    title: "Electric Field Topologies: Point Charges, Dipoles & Parallel Plates",
    topicRef: "D.2",
    themeId: "theme-d",
    description: "Vector field line map showing electric field lines exiting positive charges, entering negative charges, forming dipole patterns, and creating uniform parallel field lines between charged condenser plates.",
    whyItMatters: "Establishes field line geometry rules: lines never cross, line density represents field magnitude E, and tangential direction indicates force on a positive test charge.",
    examPitfalls: "Field lines must meet conductive metallic surfaces at right angles (90°). In a uniform field, E = V/d is constant everywhere between the plates.",
    interactiveControls: [
      { id: "config", label: "Field Configuration", type: "choice", defaultValue: "dipole", options: [{ label: "Electric Dipole (+ -)", value: "dipole" }, { label: "Like Charges (+ +)", value: "like" }, { label: "Parallel Plates", value: "plates" }] },
      { id: "showEquipotentials", label: "Show Equipotential Lines", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["E = \\frac{kQ}{r^2}", "E = \\frac{V}{d}", "F = qE"]
  },
  {
    id: "diag-charged-particle-b-field-circle",
    title: "Charged Particle Circular Deflection in Magnetic Field",
    topicRef: "D.3",
    themeId: "theme-d",
    description: "Planar circular orbit of a charged particle moving perpendicular to a uniform magnetic field (B into page). Demonstrates centripetal Lorentz force F = qvB constraining motion to radius r = mv / (qB).",
    whyItMatters: "Foundational operating principle of mass spectrometers, cyclotrons, and bubble chamber particle tracking.",
    examPitfalls: "Magnetic force is always perpendicular to velocity, doing ZERO work and leaving particle kinetic energy and speed unchanged.",
    interactiveControls: [
      { id: "bField", label: "Magnetic Field B (T)", type: "slider", defaultValue: 0.5, min: 0.1, max: 1.5, step: 0.1 },
      { id: "particleSpeed", label: "Speed v (10^6 m/s)", type: "slider", defaultValue: 2.0, min: 0.5, max: 5.0, step: 0.5 },
      { id: "chargeSign", label: "Charge Sign", type: "choice", defaultValue: "positive", options: [{ label: "Positive (+q)", value: "positive" }, { label: "Negative (-q)", value: "negative" }] }
    ],
    keyFormulas: ["r = \\frac{mv}{qB}", "F_B = qvB", "T = \\frac{2\\pi m}{qB}"]
  },
  {
    id: "diag-rutherford-scattering-hyperbolas",
    title: "Rutherford Alpha Scattering: Hyperbolic Coulomb Trajectories",
    topicRef: "E.1",
    themeId: "theme-e",
    description: "Simulation of alpha particle scattering by a massive gold nucleus, demonstrating large-angle hyperbolic deflections governed by Coulomb repulsion and defining the distance of closest approach d.",
    whyItMatters: "The seminal experiment that proved the existence of the atomic nucleus and overthrew the Thomson plum-pudding model.",
    examPitfalls: "At distance of closest approach for a head-on collision, initial alpha kinetic energy is 100% converted to electrostatic potential energy: E_k = k(2e)(Ze) / d.",
    interactiveControls: [
      { id: "impactParam", label: "Impact Parameter b (fm)", type: "slider", defaultValue: 10, min: 0, max: 40, step: 5 },
      { id: "alphaEnergy", label: "Alpha Energy (MeV)", type: "slider", defaultValue: 5.5, min: 3.0, max: 8.0, step: 0.5 }
    ],
    keyFormulas: ["E_k = \\frac{k(2e)(Ze)}{d}", "R = R_0 A^{1/3}", "F = k\\frac{q_1 q_2}{r^2}"]
  },
  {
    id: "diag-radioactive-decay-exponential-curve",
    title: "Radioactive Decay Exponential Curve & Half-Life Halving",
    topicRef: "E.3",
    themeId: "theme-e",
    description: "Exponential decay curve displaying N(t) / N_0 and Activity A(t) vs time in units of half-life (1 T_{1/2} \\to 50%, 2 T_{1/2} \\to 25%, 3 T_{1/2} \\to 12.5%, 4 T_{1/2} \\to 6.25%).",
    whyItMatters: "Direct visual guide to exponential kinetics, half-life halving, and natural logarithm linearization (ln A = -\\lambda t + ln A_0).",
    examPitfalls: "Remember to subtract background radiation count rate before applying half-life calculations.",
    interactiveControls: [
      { id: "halfLifeVal", label: "Half-Life T_{1/2} (hours)", type: "slider", defaultValue: 4, min: 1, max: 12, step: 1 },
      { id: "logScale", label: "Logarithmic y-axis [ln(A)]", type: "toggle", defaultValue: false }
    ],
    keyFormulas: ["N(t) = N_0 e^{-\\lambda t}", "A = \\lambda N", "T_{1/2} = \\frac{\\ln 2}{\\lambda}"]
  },
  {
    id: "diag-binding-energy-per-nucleon-curve",
    title: "Curve of Binding Energy per Nucleon vs Mass Number A",
    topicRef: "E.4",
    themeId: "theme-e",
    description: "The definitive curve of nuclear physics, charting BE/A from Deuterium through Helium-4, peaking at Iron-56 (8.8 MeV/nucleon), and declining to Uranium-238, demarcating the fusion and fission domains.",
    whyItMatters: "Explains why fusion of light elements and fission of heavy elements both release energy by moving products toward the Iron-56 maximum stability peak.",
    examPitfalls: "Vertical axis is Binding Energy PER NUCLEON (BE/A), not total binding energy. Do not forget the sharp peak at Helium-4.",
    interactiveControls: [
      { id: "highlightRegion", label: "Highlight Nuclear Process", type: "choice", defaultValue: "both", options: [{ label: "Both Fission & Fusion", value: "both" }, { label: "Nuclear Fusion (A < 56)", value: "fusion" }, { label: "Nuclear Fission (A > 56)", value: "fission" }] },
      { id: "showIronPeak", label: "Highlight Iron-56 Peak", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["\\Delta E = \\Delta m c^2", "BE = \\Delta m (931.5 \\text{ MeV})", "\\text{Peak: }^{56}\\text{Fe} \\approx 8.8 \\text{ MeV/nucleon}"]
  },
  {
    id: "diag-blackbody-curves",
    title: "Blackbody Radiation Spectral Curves & Wien's Displacement",
    topicRef: "B.2",
    themeId: "theme-b",
    description: "Spectral radiance curves at different blackbody temperatures (3000 K, 4500 K, 6000 K Sun), showing total power scaling as T^4 and peak wavelength shifting to shorter wavelengths via \\lambda_max T = constant.",
    whyItMatters: "Connects stellar astrophysics with climate greenhouse radiation balance and quantum Planck radiation theory.",
    examPitfalls: "Area under the curve represents total emitted power per unit area (\\sigma T^4). Hotter stars emit vastly more radiation at ALL wavelengths, not just at peak.",
    interactiveControls: [
      { id: "tempKelvin", label: "Surface Temperature (K)", type: "slider", defaultValue: 5800, min: 2500, max: 7500, step: 500 },
      { id: "showVisibleBand", label: "Highlight Visible Spectrum", type: "toggle", defaultValue: true }
    ],
    keyFormulas: ["P = e\\sigma A T^4", "\\lambda_{max} T = 2.90 \\times 10^{-3} \\text{ m K}", "I = \\frac{P}{4\\pi r^2}"]
  }
];
