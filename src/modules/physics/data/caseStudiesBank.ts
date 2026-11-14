import { CaseStudyItem } from "./types";

export const CASE_STUDIES_BANK: CaseStudyItem[] = [
  {
    id: "cs-01",
    title: "SpaceX Falcon 9 Propulsive Deceleration & Suicide Burn",
    domainOrContext: "Aerospace Trajectory Optimization",
    physicalMechanism: "Stage 1 conducts a high-thrust retrograde burn terminating at exactly zero altitude with zero velocity, balancing gravitational acceleration and engine thrust under variable vehicle mass.",
    concepts: ["conservation", "equilibrium"],
    syllabusLink: "A.1 Kinematics & A.2 Newton's 2nd Law",
    quantitativeInsight: "Engine throttling decelerates a 25-tonne booster from 250 m/s to 0 m/s over 800 m, sustaining a mean deceleration of 39 m/s^2 (~4 g) with sub-second timing margins."
  },
  {
    id: "cs-02",
    title: "Automotive Crumple Zones & Passive Impact Deceleration",
    domainOrContext: "Vehicle Safety Crashworthiness",
    physicalMechanism: "Engineered longitudinal rails undergo controlled progressive plastic deformation, increasing deceleration duration \\Delta t to reduce average impact force F = \\Delta p / \\Delta t on passengers.",
    concepts: ["conservation", "equilibrium"],
    syllabusLink: "A.2 Linear Momentum & Impulse J = F\\Delta t",
    quantitativeInsight: "Extending collision duration from 15 ms to 95 ms reduces chest impact force from 450 kN down to 71 kN, well below fatal human threshold limits."
  },
  {
    id: "cs-03",
    title: "Dinorwig Hydroelectric Pumped Storage Station",
    domainOrContext: "Grid-Scale Gravitational Energy Storage",
    physicalMechanism: "Pumps water through 500 m elevation head to store gravitational potential energy during low demand, releasing through high-head turbines to generate 1.7 GW of electric power in 16 seconds during peak grid load.",
    concepts: ["conservation", "equilibrium"],
    syllabusLink: "A.3 Gravitational Potential Energy \\Delta E_p = mgh",
    quantitativeInsight: "Stores 3.4 \\times 10^{13} Joules (9.5 GWh) of gravitational potential energy with a 75% round-trip conversion efficiency."
  },
  {
    id: "cs-04",
    title: "Orion Spacecraft Pyrolytic Ablative Heat Shield",
    domainOrContext: "Planetary Reentry Aerothermodynamics",
    physicalMechanism: "Sublimating Avcoat composite resin absorbs intense shock-wave thermal energy through high specific latent heat of vaporization, carrying heat away in boundary gas flow.",
    concepts: ["micro-macro", "conservation"],
    syllabusLink: "B.1 Specific Latent Heat Q = mL",
    quantitativeInsight: "Dissipates up to 15 MJ/kg of thermal energy during 11 km/s atmospheric entry, keeping the astronaut cabin interior below 25 °C while exterior shock gas exceeds 2800 °C."
  },
  {
    id: "cs-05",
    title: "Venusian Runaway Greenhouse Planetary Climate",
    domainOrContext: "Comparative Planetary Atmospheres",
    physicalMechanism: "Extreme atmospheric opacity in the infrared from a 93-bar CO2 atmosphere traps nearly 99% of surface thermal radiation, shifting surface temperature from 230 K bare-rock baseline up to 737 K.",
    concepts: ["equilibrium", "micro-macro"],
    syllabusLink: "B.2 Stefan-Boltzmann Law & Greenhouse Effect",
    quantitativeInsight: "Generates an unprecedented +500 K atmospheric greenhouse warming anomaly, demonstrating the extreme sensitivity of planetary surface temperature to infrared optical depth."
  },
  {
    id: "cs-06",
    title: "Jeans Planetary Atmospheric Escape Mechanism",
    domainOrContext: "Planetary Astrophysics & Gas Kinetics",
    physicalMechanism: "Thermal root-mean-square speed c_rms of lightweight hydrogen and helium exceeds 1/6 of Earth's gravitational escape velocity, allowing the high-energy Maxwell-Boltzmann tail to bleed continuously into space.",
    concepts: ["micro-macro", "invariance"],
    syllabusLink: "B.3 Kinetic Theory of Gases & c_rms",
    quantitativeInsight: "Thermal hydrogen speed at exospheric temperatures (~1000 K) is ~3.5 km/s, explaining Earth's complete loss of primordial free hydrogen over geological epochs."
  },
  {
    id: "cs-07",
    title: "400 kV High-Voltage National Electricity Grid",
    domainOrContext: "Electrical Power Transmission Engineering",
    physicalMechanism: "Stepping transmission voltage up from 11 kV to 400 kV reduces current by a factor of ~36 for equal power delivered (P = VI), slashing resistive Joule heating losses (P = I^2 R) by a factor of 1300.",
    concepts: ["conservation", "equilibrium"],
    syllabusLink: "B.5 Electrical Power P = I^2 R",
    quantitativeInsight: "Transmitting 500 MW across 250 km dissipates less than 1.5% as heat at 400 kV, compared to over 85% total loss if attempted at 11 kV."
  },
  {
    id: "cs-08",
    title: "Taipei 101 Tuned Mass Damper Structural Oscillation",
    domainOrContext: "Civil Engineering Structural Dynamics",
    physicalMechanism: "A 660-tonne suspended pendulum executes tuned Simple Harmonic Motion out of phase with wind-induced building sway, dissipating vibrational kinetic energy through hydraulic pistons.",
    concepts: ["equilibrium", "conservation"],
    syllabusLink: "C.1 Simple Harmonic Motion a = -\\omega^2 x",
    quantitativeInsight: "Oscillating at natural resonant frequency f = 0.15 Hz, the damper reduces skyscraper sway acceleration by up to 45% during Category 5 typhoons."
  },
  {
    id: "cs-09",
    title: "Seismic S-Wave Shadow Zone & Earth's Liquid Core",
    domainOrContext: "Geophysical Planetary Seismology",
    physicalMechanism: "Transverse shear waves (S-waves) cannot propagate through fluids because liquids possess zero shear modulus, producing a complete global shadow zone from 104° to 180° confirming Earth's outer core is liquid.",
    concepts: ["micro-macro", "invariance"],
    syllabusLink: "C.2 Transverse Waves & Elastic Media",
    quantitativeInsight: "The definitive 8000-km shadow swath proved conclusively in 1906 that Earth possesses a 3400-km-radius molten iron-nickel liquid outer core."
  },
  {
    id: "cs-10",
    title: "Transatlantic Fiber-Optic Total Internal Reflection",
    domainOrContext: "Global Photonic Telecommunications",
    physicalMechanism: "Infrared laser pulses traverse high-purity silica glass cores (n = 1.450) bounded by fluorosilicate cladding (n = 1.435) via 100% efficient total internal reflection at incident angles above \\theta_c = 81.8°.",
    concepts: ["invariance", "equilibrium"],
    syllabusLink: "C.3 Total Internal Reflection & Snell's Law",
    quantitativeInsight: "Transmits over 250 Terabits/s across 6,600 km subsea cables with ultra-low attenuation of only 0.16 dB per kilometer."
  },
  {
    id: "cs-11",
    title: "Exoplanet Radial Velocity Doppler Wobble Spectroscopy",
    domainOrContext: "Observational Exoplanetary Astrophysics",
    physicalMechanism: "An orbiting exoplanet causes its host star to execute a small reflex orbit around their barycenter, shifting stellar absorption lines via the Doppler effect (\\Delta \\lambda / \\lambda = v / c).",
    concepts: ["invariance", "equilibrium"],
    syllabusLink: "C.5 Doppler Effect \\Delta f / f \\approx v / c",
    quantitativeInsight: "Spectrographs measure Doppler velocity wobbles down to \\pm 10 cm/s (walking pace), detecting Earth-mass exoplanets orbiting nearby stars."
  },
  {
    id: "cs-12",
    title: "James Webb Space Telescope Sun-Earth L2 Halo Orbit",
    domainOrContext: "Deep Space Orbital Mechanics",
    physicalMechanism: "Operates in a halo orbit around the Sun-Earth L2 Lagrange point 1.5 million km from Earth, where combined solar and terrestrial gravitational pull provides centripetal acceleration for a 1-year orbit.",
    concepts: ["fields", "equilibrium"],
    syllabusLink: "D.1 Gravitational Fields & Orbital Motion",
    quantitativeInsight: "Maintains uninterrupted cold space viewing, allowing a 5-layer Kapton sunshield to passively chill scientific instruments down to 35 Kelvin (-238 °C)."
  },
  {
    id: "cs-13",
    title: "Japanese SCMaglev Electrodynamic Levitation (EDS)",
    domainOrContext: "High-Speed Superconducting Transportation",
    physicalMechanism: "Superconducting bogie magnets generate 4.5 Tesla fields that induce eddy currents in guideway coils during high-speed travel, creating repulsive magnetic Lorentz forces (F = BIL) that levitate the train.",
    concepts: ["fields", "equilibrium"],
    syllabusLink: "D.2 Magnetic Fields & Lorentz Force F = BIL",
    quantitativeInsight: "Suspends a 30-tonne passenger train 10 cm above the track with zero mechanical friction, achieving world-record rail speeds of 603 km/h."
  },
  {
    id: "cs-14",
    title: "CERN LHC 8.33 Tesla Superconducting Beam Steering",
    domainOrContext: "High-Energy Particle Accelerator Physics",
    physicalMechanism: "1232 superconducting dipole magnets operating at 1.9 K provide centripetal Lorentz force F = qvB to bend 7 TeV relativistic protons around the 27-km circular accelerator ring.",
    concepts: ["fields", "conservation"],
    syllabusLink: "D.3 Magnetic Circular Motion r = mv / qB",
    quantitativeInsight: "Bends protons traveling at 0.999999991 c around a 2.8 km curvature radius, steering beams with millimeter precision for head-on 14 TeV collisions."
  },
  {
    id: "cs-15",
    title: "Radiocarbon-14 Archaeological Dating of Historical Artifacts",
    domainOrContext: "Nuclear Archaeological Geochronology",
    physicalMechanism: "Cosmic rays generate radioactive carbon-14 in the upper atmosphere. Upon organism death, metabolic intake ceases and ^14C decays via \\beta^- emission (half-life 5,730 years) with zero replenishment.",
    concepts: ["micro-macro", "invariance"],
    syllabusLink: "E.3 Radioactive Decay N = N_0 e^{-\\lambda t}",
    quantitativeInsight: "Accelerator mass spectrometry measures remaining ^14C/^12C ratios down to parts per quadrillion, dating organic artifacts back 50,000 years with \\pm 40-year precision."
  },
  {
    id: "cs-16",
    title: "ITER Tokamak 150-Million-Degree Fusion Confinement",
    domainOrContext: "Experimental Controlled Thermonuclear Energy",
    physicalMechanism: "18 superconducting toroidal field coils generating 11.8 Tesla fields magnetically confine deuterium-tritium plasma at 150 million °C to overcome electrostatic Coulomb repulsion.",
    concepts: ["fields", "equilibrium"],
    syllabusLink: "E.5 Nuclear Fusion & Coulomb Barrier",
    quantitativeInsight: "Engineered to produce 500 MW of fusion output power from 50 MW input heating (Q = 10 gain), unlocking virtually limitless clean baseload energy."
  }
];
