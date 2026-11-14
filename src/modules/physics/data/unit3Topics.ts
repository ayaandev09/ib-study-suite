import { TopicData } from "./types";

export const THEME_C_TOPICS: TopicData[] = [
  {
    id: "top-c1",
    themeId: "theme-c",
    themeNumber: 3,
    topicCode: "C.1",
    displayCode: "C.1",
    syllabusRef: "IB Physics Guide C.1 / Tsokos Ch. 4 / Giancoli Ch. 11",
    title: "Simple Harmonic Motion (SHM)",
    subtitle: "Restoring Forces, Defining Acceleration Relation a = -\\omega^2 x, Phase Relationships, and Energetics",
    level: "SL",
    strategicImportance: "WAVE PHENOMENA ESSENTIAL",
    readingTimeMinutes: 10,
    summary:
      "Simple Harmonic Motion (SHM) is the fundamental periodic oscillatory motion that underpins mechanical vibrations and wave generation. An oscillator executes SHM if and only if its acceleration is directly proportional to its displacement from an equilibrium position and always directed toward that equilibrium position: a = -\\omega^2 x. The constant of proportionality \\omega = 2\\pi f = 2\\pi / T is the angular frequency. Kinematic variables follow sinusoidal waveforms with strict phase relationships: velocity leads displacement by \\pi/2 (90°), and acceleration leads displacement by \\pi (180°). Total mechanical energy E_T = 0.5 m \\omega^2 x_0^2 remains conserved as energy oscillates continuously between kinetic and potential forms.",
    speedReadBullets: [
      "Defining Condition for SHM: a = -\\omega^2 x. Acceleration is directly proportional to displacement and opposite in direction (directed towards equilibrium).",
      "Angular Frequency (\\omega): \\omega = 2\\pi f = \\frac{2\\pi}{T} (radians per second).",
      "Displacement & Velocity: x(t) = x_0 \\cos(\\omega t) (starting at max displacement) or x_0 \\sin(\\omega t) (starting at equilibrium). Velocity v = \\pm \\omega \\sqrt{x_0^2 - x^2}.",
      "Maxima Values: Maximum velocity v_{max} = \\omega x_0 (occurs at equilibrium x = 0); Maximum acceleration a_{max} = \\omega^2 x_0 (occurs at extremes x = \\pm x_0).",
      "Phase Shifts: Velocity leads displacement by \\pi/2 radians (90°); Acceleration leads displacement by \\pi radians (180°, perfectly antiphase).",
      "Energetics of SHM: Total energy is constant: E_T = E_k + E_p = \\frac{1}{2} m \\omega^2 x_0^2. At equilibrium: E_k is maximum, E_p = 0. At amplitudes: E_k = 0, E_p is maximum.",
      "Energy Graphs: As functions of displacement x, E_k(x) is an inverted parabola and E_p(x) is an upright parabola. As functions of time t, both oscillate at TWICE the fundamental frequency (2f).",
    ],
    primer5Min:
      "When asked to define SHM in Paper 2, recite the exact definition: 'Motion where acceleration is directly proportional to displacement from equilibrium and directed towards equilibrium'. Write down the formula a = -\\omega^2 x. Notice the negative sign: it ensures the restoring force always acts against displacement. For energy calculations, remember total energy is proportional to the SQUARE of the amplitude: E_T \\propto x_0^2. Doubling amplitude quadruples the energy stored in the oscillator.",
    subSections: [
      {
        id: "c1-s1",
        title: "The Defining Equation & Kinematics of SHM",
        marker: "Kinematic Foundations",
        content:
          "For any mechanical system governed by Hooke's Law F = -kx (such as a mass-spring system or small-angle pendulum), Newton's Second Law F = ma gives ma = -kx, which yields a = -\\left(\\frac{k}{m}\\right)x. Defining angular frequency as \\omega = \\sqrt{k/m}, we obtain the defining equation of SHM: a = -\\omega^2 x. Solving this second-order differential equation yields sinusoidal solutions: x(t) = x_0 \\cos(\\omega t). Differentiating with respect to time gives velocity: v(t) = -\\omega x_0 \\sin(\\omega t). Differentiating once more confirms acceleration: a(t) = -\\omega^2 x_0 \\cos(\\omega t) = -\\omega^2 x(t).",
        analyticalTakeaway:
          "On an acceleration-displacement graph, SHM produces a straight line passing through the origin with a negative gradient equal to -\\omega^2.",
        keyFormulaOrFramework: "a = -\\omega^2 x, \\quad v = \\pm \\omega \\sqrt{x_0^2 - x^2}, \\quad \\omega = 2\\pi f = \\frac{2\\pi}{T}",
        workedExample: {
          problem: "An object attached to a horizontal spring oscillates with amplitude x_0 = 0.080 m and period T = 1.20 s. Calculate: (a) its maximum speed, (b) its maximum acceleration, and (c) its speed when displacement x = 0.050 m.",
          stepByStep: [
            "1. Calculate angular frequency: \\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{1.20 s} = 5.236 rad/s.",
            "2. Maximum speed: v_{max} = \\omega x_0 = (5.236)(0.080) = 0.4189 m/s.",
            "3. Maximum acceleration: a_{max} = \\omega^2 x_0 = (5.236)^2 (0.080) = (27.415)(0.080) = 2.193 m/s^2.",
            "4. Speed at x = 0.050 m: v = \\omega \\sqrt{x_0^2 - x^2} = 5.236 \\sqrt{0.080^2 - 0.050^2} = 5.236 \\sqrt{0.0064 - 0.0025} = 5.236 \\sqrt{0.0039} = 5.236 (0.06245) = 0.327 m/s."
          ],
          finalAnswer: "(a) v_{max} = 0.42 m/s; (b) a_{max} = 2.2 m/s^2; (c) v = 0.33 m/s (all to 2 significant figures)."
        }
      },
      {
        id: "c1-s2",
        title: "Energetics & Conservation in Oscillators",
        marker: "Energy Transformations",
        content:
          "In an ideal frictionless SHM system, mechanical energy continuously shifts between kinetic store E_k = \\frac{1}{2}mv^2 and potential store E_p = \\frac{1}{2}kx^2 = \\frac{1}{2}m\\omega^2 x^2. Substituting velocity yields E_k(x) = \\frac{1}{2}m\\omega^2(x_0^2 - x^2). The sum of both stores is invariant: E_T = E_k + E_p = \\frac{1}{2}m\\omega^2 x_0^2. At x = 0 (equilibrium), potential energy is zero and kinetic energy is maximal. At x = \\pm x_0 (amplitudes), velocity is zero and potential energy is maximal. When displacement is x = x_0 / \\sqrt{2} \\approx 0.707 x_0, kinetic and potential energies are exactly equal.",
        analyticalTakeaway:
          "Because kinetic energy depends on v^2 \\propto \\sin^2(\\omega t), E_k and E_p complete two full energy cycles for every one complete oscillation of displacement. Energy frequency is 2f.",
        keyFormulaOrFramework: "E_T = \\frac{1}{2}m\\omega^2 x_0^2, \\quad E_k = \\frac{1}{2}m\\omega^2(x_0^2 - x^2), \\quad E_p = \\frac{1}{2}m\\omega^2 x^2",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-c1-1",
        question: "State the two essential characteristics of Simple Harmonic Motion, and write the mathematical relation defining them.",
        promptType: "explain",
        hints: ["What is the relationship between acceleration, displacement, and direction?"],
        modelAnswer: "1. The acceleration of the oscillating body is directly proportional to its displacement from an equilibrium position. 2. The acceleration is always directed towards that equilibrium position (opposite to the displacement vector). The mathematical expression is a = -\\omega^2 x, where \\omega is the constant angular frequency.",
        keyTermsToInclude: ["acceleration proportional to displacement", "directed towards equilibrium", "a = -\\omega^2 x"]
      },
      {
        id: "q-c1-2",
        question: "A simple pendulum oscillates with total energy E. If its amplitude of oscillation is doubled, determine the factor by which its total energy increases.",
        promptType: "calculation",
        hints: ["Recall how total energy depends on amplitude x_0."],
        modelAnswer: "Total mechanical energy of an SHM oscillator is given by E_T = \\frac{1}{2} m \\omega^2 x_0^2, meaning total energy is directly proportional to the square of the amplitude (E_T \\propto x_0^2). When amplitude is doubled (x_0' = 2x_0), the new energy becomes E_T' = \\frac{1}{2} m \\omega^2 (2x_0)^2 = 4 \\left(\\frac{1}{2} m \\omega^2 x_0^2\\right) = 4 E_T. The total energy increases by a factor of 4.",
        keyTermsToInclude: ["E_T \\propto x_0^2", "doubling amplitude quadruples energy", "factor of 4"]
      }
    ],
    analysis: {
      coreThesis: "Simple Harmonic Motion is the universal linear approximation for any stable physical equilibrium subjected to small displacements.",
      theoreticalFoundations: "Taylor expansion of potential energy minima (V(x) \\approx \\frac{1}{2} k x^2), linear differential equations.",
      strategicEvaluation: "Watch for phase questions in Paper 1: x(t), v(t), and a(t) are separated by quarter-period shifts (T/4 = \\pi/2 rad). On graphs, when x is at a maximum, v is zero, and a is at a negative maximum.",
      commonMisconceptions: [
        "Believing velocity is greatest at maximum displacement (velocity is zero at extremes, maximum at equilibrium).",
        "Thinking period depends on amplitude (for true SHM, oscillations are isochronous—period T is completely independent of amplitude).",
        "Confusing oscillation frequency f with angular frequency \\omega (\\omega = 2\\pi f)."
      ],
      realWorldConnections: "Earthquake-resistant tuned mass dampers in skyscrapers (e.g. Taipei 101), atomic force microscopy cantilever oscillations, and quartz crystal clock timing resonators.",
      keyDiagrams: ["diag-shm-phase-relationships", "diag-shm-energy-curves"]
    },
    cases: [
      {
        id: "case-c1",
        title: "Taipei 101 Tuned Mass Damper",
        domainOrContext: "Structural Dynamics & Seismic Mitigation",
        physicalMechanism: "A 660-tonne spherical steel pendulum suspended between the 87th and 92nd floors acts as an SHM counter-oscillator tuned to the building's fundamental resonant sway frequency (f \\approx 0.15 Hz). Hydraulic dampers dissipate oscillation energy, reducing building sway during typhoons and earthquakes by over 40%.",
        concepts: ["equilibrium", "conservation"],
        syllabusLink: "C.1 Simple Harmonic Motion a = -\\omega^2 x",
        quantitativeInsight: "Oscillating at \\omega = 2\\pi(0.15) \\approx 0.94 rad/s with sway amplitudes up to 1.5 m, the damper dissipates several megajoules of vibrational energy per cycle via laminar fluid viscous resistance."
      }
    ],
    conceptTracking: [
      { conceptId: "equilibrium", intensity: 5, manifestation: "Oscillatory restoring dynamics restoring mass towards stable potential energy minimum." },
      { conceptId: "conservation", intensity: 5, manifestation: "Continuous periodic interchange between kinetic and potential energy stores." }
    ],
    examPromptTakeaway: "Remember that SHM oscillations are isochronous: period T does not change when amplitude decreases.",
    examBlueprint: {
      paper1TrapPattern: "Options showing an acceleration-displacement graph where the line has positive gradient (it must have negative gradient -\\omega^2 passing through the origin).",
      paper2StructuredPrompt: "A 0.40 kg mass on a spring oscillates with SHM. A displacement-time graph shows amplitude 6.0 cm and period 0.80 s. Calculate the spring force constant k, the maximum kinetic energy of the mass, and sketch the variation of kinetic energy with displacement x.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Angular frequency \\omega = 2\\pi/T, spring constant k = m\\omega^2, max kinetic energy E_{k,max} = 0.5 k x_0^2.",
        showWorking: "\\omega = 2\\pi / 0.80 = 7.854 rad/s; k = m\\omega^2 = (0.40)(7.854)^2 = 24.67 N/m \\approx 25 N/m; E_{k,max} = 0.5 (24.67)(0.060)^2 = 0.5 (24.67)(0.0036) = 0.0444 J.",
        unitsAndSigFigs: "k = 25 N/m; E_{k,max} = 4.4 \\times 10^{-2} J (44 mJ, 2 significant figures). Sketch: Inverted parabola symmetric about x = 0 reaching peak 44 mJ at x = 0 and touching zero at x = \\pm 6.0 cm."
      },
      pitfallsToAvoid: [
        "Leaving displacement in centimeters instead of converting to meters (0.060 m).",
        "Sketching a cosine curve for E_k vs displacement instead of an inverted parabola."
      ]
    },
    diagramIds: ["diag-shm-phase-relationships", "diag-shm-energy-curves"],
    primaryFormulas: [
      "a = -\\omega^2 x",
      "v = \\pm \\omega\\sqrt{x_0^2 - x^2}",
      "v_{max} = \\omega x_0",
      "a_{max} = \\omega^2 x_0",
      "T = \\frac{2\\pi}{\\omega} = \\frac{1}{f}",
      "E_T = \\frac{1}{2}m\\omega^2 x_0^2"
    ]
  },
  {
    id: "top-c2",
    themeId: "theme-c",
    themeNumber: 3,
    topicCode: "C.2",
    displayCode: "C.2",
    syllabusRef: "IB Physics Guide C.2 / Tsokos Ch. 4 / Giancoli Ch. 11",
    title: "Wave Model & Propagation",
    subtitle: "Transverse vs. Longitudinal Waves, Wave Characteristics, Wave Equation, and Intensity Dispersion",
    level: "SL",
    strategicImportance: "WAVE PHENOMENA ESSENTIAL",
    readingTimeMinutes: 9,
    summary:
      "A mechanical or electromagnetic wave is a propagating disturbance that transfers energy and momentum through space without net transport of matter. In transverse waves, particle displacement is perpendicular to the direction of energy propagation (e.g., light, surface water waves, S-waves). In longitudinal waves, particle oscillations are parallel to energy propagation, creating alternating regions of compression and rarefaction (e.g., sound waves, P-waves). All waves obey the universal wave equation v = f\\lambda. Wave intensity I is power per unit area, proportional to the square of the amplitude (I \\propto A^2) and, for spherical point sources in 3D, diminishes via the inverse square law (I \\propto 1/r^2).",
    speedReadBullets: [
      "Wave Definition: A periodic oscillation that transfers energy and momentum without permanent displacement of the medium.",
      "Transverse Waves: Oscillations are perpendicular to energy propagation direction (crests and troughs). Can be polarized.",
      "Longitudinal Waves: Oscillations are parallel to energy propagation direction (compressions where particles are close, rarefactions where particles are spread apart). Cannot be polarized.",
      "Universal Wave Equation: v = f\\lambda (speed = frequency \\times wavelength). Frequency f is determined solely by the source; speed v is determined solely by properties of the transmitting medium.",
      "Wave Intensity: Intensity I = \\frac{P}{A} (Watts per square meter = W m^-2).",
      "Intensity-Amplitude Relation: Intensity is directly proportional to the square of amplitude: I \\propto A^2. Doubling amplitude increases intensity by a factor of 4.",
      "Inverse-Square Law for Spherical Waves: Radiating uniformly from a point source into 3D space: I = \\frac{P}{4\\pi r^2} \\implies I \\propto \\frac{1}{r^2}. Doubling distance decreases intensity by a factor of 4 and amplitude by a factor of 2.",
    ],
    primer5Min:
      "Be careful when reading wave graphs: A displacement-position (s-x) graph represents a snapshot in time—the distance between successive crests is the wavelength \\lambda. A displacement-time (s-t) graph represents the motion of a single particle at a fixed position—the time between successive peaks is the period T. Remember that when a wave enters a new medium, its frequency f NEVER changes (it is locked to the driving oscillator); only wave speed v and wavelength \\lambda change according to v = f\\lambda.",
    subSections: [
      {
        id: "c2-s1",
        title: "Transverse vs. Longitudinal Waves & Polarisation",
        marker: "Wave Topologies",
        content:
          "Waves are classified by the geometric orientation of particle displacement relative to the energy transfer vector \\vec{v}. In transverse waves, displacement is orthogonal: \\vec{s} \\perp \\vec{v}. Because transverse oscillations span a 2D plane perpendicular to propagation, they can be polarized (restricted to oscillate in a single plane using a polarizing filter). In longitudinal waves, displacement is collinear: \\vec{s} \\parallel \\vec{v}. Longitudinal waves propagate through compression (maximum density and pressure) and rarefaction (minimum density and pressure). Because their oscillations are already along the 1D propagation axis, longitudinal waves CANNOT be polarized.",
        analyticalTakeaway:
          "Polarization is the definitive experimental diagnostic test used to prove that a wave is transverse. Sound waves in air cannot be polarized because they are strictly longitudinal.",
        keyFormulaOrFramework: "v = f\\lambda, \\quad T = \\frac{1}{f}",
      },
      {
        id: "c2-s2",
        title: "Wave Intensity, Amplitude & Inverse-Square Dispersion",
        marker: "Energetics of Propagation",
        content:
          "Wave intensity I is defined as radiant power transmitted per unit area perpendicular to the direction of wave travel: I = \\frac{P}{A}. Because the energy of any harmonic oscillation is proportional to the square of its amplitude (E \\propto A^2), wave intensity is universally proportional to amplitude squared: I \\propto A^2. When an isotropic point source radiates total power P uniformly into three-dimensional space, the wavefront spreads out over a sphere of surface area A = 4\\pi r^2. Consequently, intensity follows the inverse-square law: I = \\frac{P}{4\\pi r^2}. Combining these dependencies reveals that wave amplitude decays inversely with distance: A \\propto 1/r.",
        analyticalTakeaway:
          "If distance from a point acoustic or light source triples (r \\to 3r), intensity drops by a factor of 3^2 = 9, and wave amplitude drops by a factor of 3.",
        keyFormulaOrFramework: "I = \\frac{P}{4\\pi r^2}, \\quad I \\propto A^2, \\quad A \\propto \\frac{1}{r}",
        workedExample: {
          problem: "A high-power acoustic siren emits sound uniformly in all directions with total power P = 50 W. Calculate the sound intensity and wave amplitude at a distance of 15.0 m, compared to a point 5.0 m from the siren.",
          stepByStep: [
            "1. Intensity at 5.0 m: I_1 = \\frac{P}{4\\pi r_1^2} = \\frac{50}{4\\pi (5.0)^2} = \\frac{50}{100\\pi} = 0.1592 W/m^2.",
            "2. Intensity at 15.0 m: I_2 = \\frac{P}{4\\pi r_2^2} = \\frac{50}{4\\pi (15.0)^2} = \\frac{50}{900\\pi} = 0.01768 W/m^2.",
            "3. Intensity ratio: \\frac{I_2}{I_1} = \\left(\\frac{r_1}{r_2}\\right)^2 = \\left(\\frac{5.0}{15.0}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}.",
            "4. Amplitude ratio: Since I \\propto A^2, \\frac{A_2}{A_1} = \\sqrt{\\frac{I_2}{I_1}} = \\frac{1}{3}."
          ],
          finalAnswer: "Intensity at 15 m = 1.8 \\times 10^-2 W/m^2 (reduced by factor of 9); Amplitude is reduced by a factor of 3."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-c2-1",
        question: "Explain why sound waves can travel through solids, liquids, and gases, but cannot travel through a vacuum, whereas light waves can travel through a vacuum.",
        promptType: "explain",
        hints: ["What constitutes the propagating medium for sound vs light?"],
        modelAnswer: "Sound is a mechanical wave that requires a material medium containing particles (atoms or molecules) to transmit energy via elastic particle collisions and pressure oscillations. In a vacuum, there are no particles, so mechanical sound propagation is impossible. Light, however, is an electromagnetic wave consisting of oscillating, mutually sustaining electric and magnetic fields that do not require any physical material medium and propagate freely through empty space at speed c.",
        keyTermsToInclude: ["mechanical wave requires particles", "elastic collisions between molecules", "vacuum lacks particles", "electromagnetic wave self-propagating fields"]
      },
      {
        id: "q-c2-2",
        question: "A laser beam with intensity I_0 passes through two polarizing sheets. The transmission axis of the second polarizer is oriented at 60.0° to the first. Calculate the transmitted intensity.",
        promptType: "calculation",
        hints: ["Apply Malus's Law I = I_0 \\cos^2\\theta."],
        modelAnswer: "Applying Malus's Law: I = I_0 \\cos^2(\\theta) = I_0 \\cos^2(60.0^{\\circ}). Since \\cos(60.0^{\\circ}) = 0.500, we have I = I_0 (0.500)^2 = 0.250 I_0 = \\frac{1}{4} I_0. The transmitted intensity is 25.0% of the polarized incident intensity.",
        keyTermsToInclude: ["Malus's Law I = I_0 \\cos^2\\theta", "\\cos(60^{\\circ}) = 0.5", "transmitted intensity = 0.25 I_0"]
      }
    ],
    analysis: {
      coreThesis: "Waves are the primary physical mechanism for non-material energy and information transfer across the cosmos.",
      theoreticalFoundations: "Classical wave equation \\frac{\\partial^2 y}{\\partial x^2} = \\frac{1}{v^2}\\frac{\\partial^2 y}{\\partial t^2}, Huygens-Fresnel principle.",
      strategicEvaluation: "In exam questions presenting wave graphs, immediately verify horizontal axis labels and units: if axis is distance x (m), extract wavelength \\lambda; if axis is time t (s), extract period T.",
      commonMisconceptions: [
        "Believing medium particles travel along with the wave (particles oscillate locally in place; only the disturbance and energy propagate forward).",
        "Assuming louder sound travels faster than quiet sound (sound speed depends exclusively on medium elasticity and density, not amplitude).",
        "Thinking transverse waves cannot travel in solids (transverse seismic S-waves propagate effectively through solid rock mantle)."
      ],
      realWorldConnections: "Seismological Earth interior imaging (P-wave vs S-wave shadow zones proving liquid outer core), fiber-optic telecommunications, and ultrasonic medical imaging.",
      keyDiagrams: ["diag-transverse-longitudinal-comparison", "diag-wave-graphs-snapshot-history"]
    },
    cases: [
      {
        id: "case-c2",
        title: "Seismic Discovery of Earth's Liquid Outer Core",
        domainOrContext: "Geophysical Planetary Seismology",
        physicalMechanism: "Following an earthquake, longitudinal primary (P) waves propagate through both solid mantle and liquid core. Transverse secondary (S) waves require shear modulus, which liquids lack, creating an extensive global S-wave shadow zone on the opposite side of the globe between 104° and 180°.",
        concepts: ["micro-macro", "invariance"],
        syllabusLink: "C.2 Transverse vs Longitudinal Waves",
        quantitativeInsight: "The complete absence of direct S-wave detection across an 8000-km-wide shadow swath on Earth's surface provided conclusive experimental proof in 1906 that Earth's outer core is molten liquid iron-nickel."
      }
    ],
    conceptTracking: [
      { conceptId: "invariance", intensity: 4, manifestation: "Wave frequency remains invariant across boundary transitions between differing media." },
      { conceptId: "conservation", intensity: 5, manifestation: "Energy flux conservation governing inverse-square intensity dispersion." }
    ],
    examPromptTakeaway: "Frequency is fixed by the source: when a wave changes medium, v and \\lambda change proportionally, but f remains constant.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking what happens to frequency when light enters water from air (frequency remains strictly constant; speed and wavelength decrease).",
      paper2StructuredPrompt: "A radio transmitter emits spherical electromagnetic waves of frequency 98.5 MHz with total average power 45 kW. Calculate the wavelength of the waves, the intensity at a distance of 8.0 km, and the electric field amplitude at that distance.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Universal wave equation \\lambda = c / f and spherical inverse square law I = P / (4\\pi r^2).",
        showWorking: "\\lambda = (3.00 \\times 10^8 m/s) / (9.85 \\times 10^7 Hz) = 3.0457 m \\approx 3.05 m; I = 45,000 W / [4\\pi (8000 m)^2] = 45,000 / [4\\pi (6.4 \\times 10^7)] = 45,000 / (8.0425 \\times 10^8) = 5.595 \\times 10^{-5} W/m^2.",
        unitsAndSigFigs: "Wavelength = 3.05 m; Intensity = 5.6 \\times 10^{-5} W/m^2 (56 \\mu W/m^2, 2 significant figures)."
      },
      pitfallsToAvoid: [
        "Using sound speed instead of light speed c = 3.00 \\times 10^8 m/s for radio waves.",
        "Forgetting to convert 8.0 km to 8000 meters before squaring."
      ]
    },
    diagramIds: ["diag-transverse-longitudinal-comparison", "diag-wave-graphs-snapshot-history"],
    primaryFormulas: [
      "v = f\\lambda",
      "T = \\frac{1}{f}",
      "I = \\frac{P}{A}",
      "I = \\frac{P}{4\\pi r^2}",
      "I \\propto A^2"
    ]
  },
  {
    id: "top-c3",
    themeId: "theme-c",
    themeNumber: 3,
    topicCode: "C.3",
    displayCode: "C.3",
    syllabusRef: "IB Physics Guide C.3 / Tsokos Ch. 4 / Giancoli Ch. 24",
    title: "Wave Phenomena: Refraction, Diffraction & Interference",
    subtitle: "Snell's Law, Total Internal Reflection, Single-Slit Diffraction, and Young's Double-Slit Experiment",
    level: "SL",
    strategicImportance: "WAVE PHENOMENA ESSENTIAL",
    readingTimeMinutes: 11,
    summary:
      "When waves encounter boundaries or obstacles, they undergo characteristic wave phenomena: reflection, refraction, diffraction, and interference. Refraction is the change in wave propagation direction caused by a change in wave speed across an interface, governed by Snell's law: n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2. When entering an optically less dense medium (n_2 < n_1) beyond the critical angle (\\sin\\theta_c = n_2 / n_1), total internal reflection occurs. Diffraction describes the spreading of waves through an aperture or around obstacles, maximizing when aperture width b is comparable to wavelength \\lambda (first diffraction minimum at \\theta = \\lambda / b). Wave interference arises from the Principle of Superposition: Young's double-slit experiment demonstrates alternating constructive (bright) and destructive (dark) fringes with regular angular separation s = \\lambda D / d.",
    speedReadBullets: [
      "Refraction & Snell's Law: \\frac{n_1}{n_2} = \\frac{\\sin\\theta_2}{\\sin\\theta_1} = \\frac{v_2}{v_1} = \\frac{\\lambda_2}{\\lambda_1}. Angles are measured relative to the NORMAL to the interface.",
      "Refractive Index (n): n = \\frac{c}{v} (ratio of speed of light in vacuum to speed in medium; always n \\ge 1).",
      "Critical Angle (\\theta_c) & TIR: Occurs ONLY when moving from denser to rarer medium (n_1 > n_2). At critical angle, refracted ray travels along boundary (\\theta_2 = 90°): \\sin\\theta_c = \\frac{n_2}{n_1}. If \\theta_1 > \\theta_c, 100% of energy reflects back (Total Internal Reflection).",
      "Diffraction Condition: Spreading through an aperture is significant only when wavelength \\lambda is comparable to or larger than aperture width b (\\lambda \\gtrsim b). First minimum angle: \\theta = \\frac{\\lambda}{b} (radians).",
      "Principle of Superposition: When two or more waves overlap, resultant displacement is the algebraic sum of individual displacements: y_{net} = y_1 + y_2.",
      "Coherence: Two wave sources are coherent if they maintain a constant phase difference and identical frequency over time.",
      "Path Difference Conditions: Constructive (in-phase): \\Delta r = n\\lambda (n = 0, 1, 2, \\dots); Destructive (antiphase): \\Delta r = (n + 0.5)\\lambda.",
      "Young's Double-Slit Fringe Spacing: s = \\frac{\\lambda D}{d}, where s is fringe separation, D is slit-to-screen distance, and d is slit separation.",
    ],
    primer5Min:
      "In optics ray diagrams, always construct a dotted NORMAL line perpendicular to the surface at the point of incidence before measuring angles! Remember: light bends TOWARDS the normal when slowing down (higher n) and AWAY from normal when speeding up (lower n). In Young's double slit experiments, memorize the fringe spacing formula: s = \\frac{\\lambda D}{d}. Notice that red light (longer \\lambda) produces wider fringe spacing than blue light, and bringing the slits closer together (smaller d) spreads fringes wider.",
    subSections: [
      {
        id: "c3-s1",
        title: "Snell's Law & Total Internal Reflection (TIR)",
        marker: "Boundary Refraction",
        content:
          "The absolute refractive index n of an optical medium is the ratio of vacuum light speed to phase speed in the medium: n = c / v. When light strikes a planar boundary at incident angle \\theta_1, the refracted ray bends in accordance with Snell's Law: n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2. Because wave frequency is invariant across interfaces, wavelength shortens inside optically denser media: \\lambda_2 = \\lambda_1 / n. When propagating from high index to low index (n_1 > n_2), the ray bends away from the normal. At the critical angle \\theta_c, the angle of refraction reaches 90°: \\sin\\theta_c = n_2 / n_1. For incident angles exceeding \\theta_c, no refraction can occur, and the boundary acts as a perfect 100% mirror via Total Internal Reflection.",
        analyticalTakeaway:
          "Total internal reflection transmits light pulses across transoceanic glass fiber-optic cables over hundreds of kilometers with negligible attenuation because reflection efficiency is precisely 100% (far exceeding metallic mirrors).",
        keyFormulaOrFramework: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2, \\quad \\sin\\theta_c = \\frac{n_2}{n_1}, \\quad n = \\frac{c}{v}",
        workedExample: {
          problem: "A ray of light traveling inside a diamond (n_1 = 2.42) strikes a diamond-water interface (n_2 = 1.33). Calculate: (a) the critical angle for total internal reflection, and (b) the angle of refraction if the angle of incidence is 25.0°.",
          stepByStep: [
            "1. Critical angle formula: \\sin\\theta_c = \\frac{n_2}{n_1} = \\frac{1.33}{2.42} = 0.549586.",
            "2. Solve for \\theta_c: \\theta_c = \\arcsin(0.549586) = 33.34^{\\circ}.",
            "3. Angle of refraction for \\theta_1 = 25.0^{\\circ}: Since 25.0^{\\circ} < \\theta_c (33.3^{\\circ}), refraction occurs.",
            "4. Apply Snell's Law: n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2 \\implies 2.42 \\sin(25.0^{\\circ}) = 1.33 \\sin\\theta_2.",
            "5. Compute: 2.42(0.4226) = 1.33 \\sin\\theta_2 \\implies 1.0227 = 1.33 \\sin\\theta_2 \\implies \\sin\\theta_2 = 1.0227 / 1.33 = 0.7689.",
            "6. Angle \\theta_2 = \\arcsin(0.7689) = 50.26^{\\circ}."
          ],
          finalAnswer: "(a) Critical angle \\theta_c = 33.3°; (b) Angle of refraction = 50.3°."
        }
      },
      {
        id: "c3-s2",
        title: "Single-Slit Diffraction & Huygens' Principle",
        marker: "Aperture Wave Spreading",
        content:
          "Diffraction is the bending and spreading of wavefronts as they pass through an aperture or around an obstacle, without any change in medium or wave speed. According to Huygens' principle, every point on a wavefront acts as a secondary source of spherical wavelets. For a single slit of width b illuminated by parallel monochromatic light of wavelength \\lambda, wavelets originating from the top half of the slit destructively interfere with corresponding wavelets from the bottom half at angle \\theta when the path difference equals \\lambda / 2. This creates the first intensity minimum at: \\theta = \\frac{\\lambda}{b} (in radians). The resulting diffraction pattern exhibits a broad central maximum of angular width 2\\lambda / b, flanked by subsidiary secondary maxima of rapidly diminishing intensity.",
        analyticalTakeaway:
          "Diffraction sets the fundamental physical limit on optical resolution (Rayleigh criterion): larger telescope apertures b produce narrower diffraction disks \\theta \\approx 1.22 \\lambda / b, resolving finer astronomical details.",
        keyFormulaOrFramework: "\\theta = \\frac{\\lambda}{b} \\quad (\\text{first minimum angle in radians})",
      },
      {
        id: "c3-s3",
        title: "Two-Source Interference & Young's Double-Slit Experiment",
        marker: "Wave Superposition Evidence",
        content:
          "When two coherent wave sources (with fixed phase relationship and identical wavelength) overlap, they create an interference pattern. Let two narrow slits be separated by distance d and placed distance D from a viewing screen (where D \\gg d). The path difference between rays arriving at point P at angle \\theta is \\Delta r = d\\sin\\theta \\approx d(y / D). Constructive interference yields bright fringes where path difference is an integer number of wavelengths: d\\sin\\theta = n\\lambda (n = 0, \\pm 1, \\pm 2, \\dots). Destructive interference yields dark fringes where path difference is a half-integer: d\\sin\\theta = (n + \\frac{1}{2})\\lambda. The linear separation between consecutive bright fringes on the screen is given by: s = \\frac{\\lambda D}{d}.",
        analyticalTakeaway:
          "Young's double-slit experiment historically provided the definitive experimental refutation of Newton's corpuscular theory of light, establishing the wave nature of electromagnetic radiation beyond doubt.",
        keyFormulaOrFramework: "s = \\frac{\\lambda D}{d}, \\quad \\text{Path Diff} = n\\lambda \\quad (\\text{constructive}), \\quad \\text{Path Diff} = (n + 0.5)\\lambda \\quad (\\text{destructive})",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-c3-1",
        question: "State what is meant by coherent light sources, and explain why two independent incandescent light bulbs cannot produce an observable double-slit interference pattern.",
        promptType: "explain",
        hints: ["What property must the phase difference have?", "How do incandescent bulbs emit photons?"],
        modelAnswer: "Coherent sources maintain a constant phase difference and identical frequency over time. Two independent incandescent light bulbs cannot produce an observable interference pattern because each bulb emits light through random, independent thermal de-excitations of billions of individual atoms. Each wave packet lasts on the order of 10^-9 to 10^-8 seconds, causing the relative phase difference between the two bulbs to fluctuate randomly millions of times per second. The resulting interference fringes shift so rapidly that only a uniform average intensity is detected.",
        keyTermsToInclude: ["constant phase difference", "identical frequency", "independent random emissions", "phase fluctuations wash out fringes"]
      },
      {
        id: "q-c3-2",
        question: "In a double-slit experiment using a Helium-Neon laser (\\lambda = 632.8 nm), the slit separation is 0.250 mm and the screen is 1.80 m away. Calculate the distance between the central bright fringe and the third-order bright fringe.",
        promptType: "calculation",
        hints: ["Fringe separation s = \\lambda D / d. Distance to third-order fringe is 3s."],
        modelAnswer: "Fringe separation s = \\frac{\\lambda D}{d} = \\frac{(6.328 \\times 10^{-7} m)(1.80 m)}{2.50 \\times 10^{-4} m} = \\frac{1.13904 \\times 10^{-6}}{2.50 \\times 10^{-4}} = 4.556 \\times 10^{-3} m = 4.56 mm. Distance from central zero-order maximum (n = 0) to third-order maximum (n = 3) is y_3 = 3s = 3(4.556 mm) = 13.67 mm = 1.37 \\times 10^{-2} m (13.7 mm).",
        keyTermsToInclude: ["s = \\lambda D / d = 4.56 mm", "y_3 = 3s = 13.7 mm", "convert mm to m correctly"]
      }
    ],
    analysis: {
      coreThesis: "Superposition and phase differences dictate all boundary transmission, diffraction spreading, and interference phenomena.",
      theoreticalFoundations: "Huygens-Fresnel wave construction, Maxwell's electromagnetic boundary conditions.",
      strategicEvaluation: "In double-slit problems, examiners frequently modulate variables: doubling slit separation d halves fringe width s; moving screen further away (larger D) increases fringe width s; switching from blue to red laser increases fringe width s.",
      commonMisconceptions: [
        "Confusing single-slit diffraction (\\theta = \\lambda / b) with double-slit interference (s = \\lambda D / d).",
        "Assuming light refracts because it 'wants' to take the shortest path (refraction is a wave-phase matching consequence of velocity differences across a boundary).",
        "Believing total internal reflection occurs when entering glass from air (TIR requires traveling from HIGHER n to LOWER n)."
      ],
      realWorldConnections: "Anti-reflective optical coatings on lenses (thin-film destructive interference), fiber-optic medical endoscopes and internet backbones, and radar antenna diffraction beam width.",
      keyDiagrams: ["diag-snell-tir-refraction", "diag-young-double-slit-interference"]
    },
    cases: [
      {
        id: "case-c3",
        title: "Subsea Transatlantic Fiber-Optic Telecommunications",
        domainOrContext: "Global Photonic Infrastructure",
        physicalMechanism: "Ultrapure silica glass cores (n_core = 1.450) surrounded by lower-index cladding (n_cladding = 1.435) confine infrared laser pulses (\\lambda = 1550 nm) via continuous total internal reflection at incident angles exceeding \\theta_c = \\arcsin(1.435/1.450) = 81.8°.",
        concepts: ["invariance", "equilibrium"],
        syllabusLink: "C.3 Total Internal Reflection & Snell's Law",
        quantitativeInsight: "Total internal reflection transmits over 250 Terabits per second across 6,600 km transatlantic cables with transmission attenuation as low as 0.16 dB/km."
      }
    ],
    conceptTracking: [
      { conceptId: "invariance", intensity: 4, manifestation: "Wave frequency constancy across boundary transitions between differing optical indices." },
      { conceptId: "duality", intensity: 5, manifestation: "Definitive wave behavior established through spatial interference fringe patterns." }
    ],
    examPromptTakeaway: "Measure all refraction angles to the NORMAL, never to the boundary surface itself.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the critical angle where options calculate \\arcsin(n_1 / n_2) > 1 (which is mathematical nonsense; it must always be smaller index over larger index).",
      paper2StructuredPrompt: "Monochromatic light of wavelength 589 nm in air enters a flint glass prism of refractive index n = 1.66. Calculate the speed and wavelength of the light in the glass, and determine the critical angle for a glass-air interface.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Refractive index definitions: v = c / n, \\lambda_m = \\lambda / n, and \\sin\\theta_c = 1 / n.",
        showWorking: "v = (3.00 \\times 10^8) / 1.66 = 1.807 \\times 10^8 m/s; \\lambda_m = 589 nm / 1.66 = 354.8 nm; \\sin\\theta_c = 1 / 1.66 = 0.6024 \\implies \\theta_c = \\arcsin(0.6024) = 37.04^{\\circ}.",
        unitsAndSigFigs: "Speed = 1.81 \\times 10^8 m/s; Wavelength = 355 nm; Critical angle = 37.0° (3 significant figures)."
      },
      pitfallsToAvoid: [
        "Dividing speed of light by frequency instead of refractive index.",
        "Forgetting that frequency remains 5.09 \\times 10^{14} Hz in both media."
      ]
    },
    diagramIds: ["diag-snell-tir-refraction", "diag-young-double-slit-interference"],
    primaryFormulas: [
      "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
      "n = \\frac{c}{v}",
      "\\sin\\theta_c = \\frac{n_2}{n_1}",
      "s = \\frac{\\lambda D}{d}",
      "\\theta = \\frac{\\lambda}{b}"
    ]
  },
  {
    id: "top-c4",
    themeId: "theme-c",
    themeNumber: 3,
    topicCode: "C.4",
    displayCode: "C.4",
    syllabusRef: "IB Physics Guide C.4 / Tsokos Ch. 4 / Giancoli Ch. 12",
    title: "Standing Waves & Resonance",
    subtitle: "Superposition of Counter-Propagating Waves, Nodes, Antinodes, Boundary Conditions, and Resonant Harmonics",
    level: "SL",
    strategicImportance: "WAVE PHENOMENA ESSENTIAL",
    readingTimeMinutes: 10,
    summary:
      "A standing (stationary) wave is formed by the superposition of two identical waves of the same frequency, wavelength, and amplitude traveling in opposite directions through the same medium. Unlike traveling waves, standing waves do not transmit net energy through space; energy remains localized between nodes. Nodes are points of permanent destructive interference (zero displacement amplitude); antinodes are points of maximum constructive interference (amplitude 2A). Boundary conditions govern harmonic frequencies: fixed string ends or closed pipe ends form displacement nodes, whereas free ends or open pipe ends form displacement antinodes. Acoustic resonance occurs when a driving frequency matches a system's natural frequency, producing large amplitude vibrations.",
    speedReadBullets: [
      "Formation Mechanism: Interference of two identical counter-propagating traveling waves of equal frequency and amplitude.",
      "Energy Transfer: Standing waves transfer ZERO net energy through the medium (energy is trapped between nodes).",
      "Nodes & Antinodes: Nodes (N) have zero amplitude; Antinodes (A) have maximum amplitude (2A). Distance between adjacent nodes = \\lambda / 2; distance between adjacent node and antinode = \\lambda / 4.",
      "Phase in Standing Waves: All particles between two adjacent nodes oscillate strictly IN PHASE with each other (reaching maxima simultaneously); particles separated by an odd number of nodes are 180° out of phase (antiphase).",
      "String Harmonics (Fixed at both ends): Length L = n \\frac{\\lambda_n}{2} \\implies \\lambda_n = \\frac{2L}{n}, \\quad f_n = n \\frac{v}{2L} = n f_1 (n = 1, 2, 3, \\dots). All integer harmonics exist.",
      "Open Pipe Harmonics (Open at both ends): Length L = n \\frac{\\lambda_n}{2} \\implies \\lambda_n = \\frac{2L}{n}, \\quad f_n = n f_1 (all harmonics exist).",
      "Closed Pipe Harmonics (One closed, one open): Length L = n \\frac{\\lambda_n}{4} \\implies \\lambda_n = \\frac{4L}{n}, \\quad f_n = n f_1 (n = 1, 3, 5, \\dots). ONLY ODD HARMONICS exist.",
      "Resonance: When periodic driving frequency f matches a natural frequency f_0 of a vibrating system, maximum energy transfer occurs, resulting in peak oscillation amplitude.",
    ],
    primer5Min:
      "When drawing pipe harmonics in exams, always label your ends first: an OPEN end must have an ANTINODE (maximum air displacement); a CLOSED end must have a NODE (air molecules are trapped against the solid wall, zero displacement). For a pipe closed at one end, the fundamental harmonic has one node at the closed end and one antinode at the open end, spanning L = \\lambda / 4 (so \\lambda_1 = 4L). The next possible standing wave adds one full node-antinode pair, yielding L = 3\\lambda / 4 (third harmonic, f_3 = 3f_1). Remember: closed pipes produce ONLY odd harmonics (1, 3, 5, 7...).",
    subSections: [
      {
        id: "c4-s1",
        title: "Standing Waves vs. Traveling Waves",
        marker: "Superposition Contrast",
        content:
          "The distinction between traveling and standing waves is fundamental in wave mechanics: 1. Energy Transmission: Traveling waves transfer kinetic and potential energy through space at wave speed v; standing waves store energy locally with zero net directional energy flux. 2. Amplitude Distribution: In traveling waves, all medium particles vibrate with identical amplitude A; in standing waves, amplitude varies continuously with position from zero at nodes to 2A at antinodes. 3. Phase Relationships: In traveling waves, adjacent particles have continuously shifting phase \\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x; in standing waves, all particles situated between two adjacent nodes oscillate in perfect unison (phase difference = 0).",
        analyticalTakeaway:
          "Particles in a standing wave all pass through equilibrium (zero displacement) at the exact same instant twice per cycle, converting all stored elastic potential energy into kinetic energy.",
        keyFormulaOrFramework: "y(x,t) = 2A \\sin(kx) \\cos(\\omega t), \\quad d_{N-N} = \\frac{\\lambda}{2}, \\quad d_{N-A} = \\frac{\\lambda}{4}",
      },
      {
        id: "c4-s2",
        title: "Harmonics in Strings & Air Columns",
        marker: "Boundary Value Quantization",
        content:
          "Standing wave frequencies are quantized by physical boundary constraints. On a taut string of length L clamped at both ends, displacement must be zero at x = 0 and x = L, requiring nodes at both boundaries. The allowed wavelengths are \\lambda_n = \\frac{2L}{n} (n = 1, 2, 3, \\dots), with frequencies f_n = n \\frac{v}{2L} = n f_1, where wave speed on the string is v = \\sqrt{T_s / \\mu} (T_s = tension, \\mu = mass per unit length). For an organ pipe open at both ends, antinodes occur at both boundaries, yielding the exact same harmonic progression: f_n = n f_1. For a pipe closed at one end and open at the other, boundary constraints enforce a node at the closed end and an antinode at the open end, allowing only odd quarter-wavelengths: L = (2n - 1)\\frac{\\lambda}{4}, meaning only odd harmonics are generated: f_1, 3f_1, 5f_1, \\dots",
        analyticalTakeaway:
          "The absence of even harmonics in closed pipes (such as clarinets) produces their distinctive rich, hollow acoustic timbre, distinct from open-ended flutes which produce both even and odd integer harmonics.",
        keyFormulaOrFramework: "\\text{Strings / Open Pipes: } \\lambda_n = \\frac{2L}{n}, \\quad \\text{Closed Pipes: } \\lambda_n = \\frac{4L}{n} \; (n \\text{ odd})",
        workedExample: {
          problem: "An organ pipe closed at one end has a length of 0.850 m. Speed of sound in air is 340 m/s. Calculate: (a) the fundamental frequency of the pipe, and (b) the frequency of the next highest harmonic.",
          stepByStep: [
            "1. Boundary condition for closed pipe: Node at closed end, antinode at open end.",
            "2. Fundamental mode (n = 1): Length L = \\frac{\\lambda_1}{4} \\implies \\lambda_1 = 4L = 4(0.850 m) = 3.40 m.",
            "3. Fundamental frequency: f_1 = \\frac{v}{\\lambda_1} = \\frac{340 m/s}{3.40 m} = 100 Hz.",
            "4. Next harmonic: Closed pipes cannot sustain even harmonics (n = 2 does not exist). The next mode is the third harmonic (n = 3):",
            "5. Frequency of next mode: f_3 = 3 f_1 = 3(100 Hz) = 300 Hz. (Check: L = 3\\lambda_3 / 4 \\implies \\lambda_3 = 4L/3 = 1.133 m; f_3 = 340 / 1.133 = 300 Hz)."
          ],
          finalAnswer: "(a) Fundamental frequency f_1 = 100 Hz; (b) Next highest harmonic f_3 = 300 Hz."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-c4-1",
        question: "Explain the difference in phase between two particles on a standing wave: (a) between the same two adjacent nodes, and (b) separated by exactly one node.",
        promptType: "explain",
        hints: ["How do particles move between nodes?", "What happens when you cross a node?"],
        modelAnswer: "(a) Any two particles located between the same two adjacent nodes are moving in the same direction and reach their maximum and zero displacements at the exact same time; therefore, their phase difference is 0 (they are in phase). (b) Two particles separated by a single node are moving in opposite directions (one moving upwards while the other moves downwards); therefore, their phase difference is \\pi radians or 180° (they are in antiphase).",
        keyTermsToInclude: ["between adjacent nodes: in phase (0 rad)", "separated by one node: antiphase (\\pi rad / 180°)", "move in opposite directions"]
      },
      {
        id: "q-c4-2",
        question: "A guitar string of length 0.64 m vibrates in its third harmonic mode at a frequency of 576 Hz. Calculate the speed of transverse waves on the string.",
        promptType: "calculation",
        hints: ["For third harmonic on a string, L = 3(\\lambda / 2). Find \\lambda, then use v = f\\lambda."],
        modelAnswer: "For a string fixed at both ends, third harmonic has n = 3: L = 3 \\frac{\\lambda_3}{2} \\implies \\lambda_3 = \\frac{2L}{3} = \\frac{2(0.64 m)}{3} = 0.4267 m. Wave speed on the string: v = f_3 \\lambda_3 = (576 Hz)(0.4267 m) = 245.76 m/s \\approx 246 m/s.",
        keyTermsToInclude: ["\\lambda_3 = 2L/3 = 0.427 m", "v = f\\lambda", "v = 246 m/s"]
      }
    ],
    analysis: {
      coreThesis: "Standing wave quantization and resonance define all musical acoustics, atomic quantum orbital boundaries, and microwave cavity designs.",
      theoreticalFoundations: "Fourier decomposition, boundary value eigenvalues, classical wave superposition.",
      strategicEvaluation: "In exam questions, check whether the prompt asks for 'harmonic number' (which counts frequencies f_n = n f_1) or 'overtone' (which counts modes above fundamental: first overtone is f_2 for open pipe, but f_3 for closed pipe).",
      commonMisconceptions: [
        "Believing nodes move along the medium (nodes are stationary zero-displacement points fixed in space).",
        "Assuming closed pipes can sustain second harmonic oscillations (closed pipes lack even harmonics).",
        "Confusing the speed of transverse waves on the string with the speed of sound waves radiated into the surrounding air."
      ],
      realWorldConnections: "Microwave oven resonant cavity standing wave hotspots, acoustic design of concert halls, and resonance disaster mitigation in suspension bridges (Tacoma Narrows).",
      keyDiagrams: ["diag-standing-wave-harmonics-string", "diag-organ-pipe-acoustics"]
    },
    cases: [
      {
        id: "case-c4",
        title: "Tacoma Narrows Bridge Aeroelastic Flutter Collapse",
        domainOrContext: "Structural Resonant Fluid-Structure Interaction",
        physicalMechanism: "In 1940, steady 42 mph winds formed alternating von Kármán vortices shed across the H-shaped girder deck. When vortex shedding frequency matched the bridge's natural torsional standing wave mode (f \\approx 0.2 Hz), resonant self-excited flutter amplified twisting sway until steel hanger cables snapped.",
        concepts: ["equilibrium", "conservation"],
        syllabusLink: "C.4 Resonance & Standing Waves",
        quantitativeInsight: "Oscillatory twisting reached \\pm 45° with an antinode amplitude exceeding 8.5 m at the center span before structural collapse, revolutionizing aerodynamic dampening in civil engineering."
      }
    ],
    conceptTracking: [
      { conceptId: "equilibrium", intensity: 4, manifestation: "Resonant amplification occurring when driving frequency matches natural equilibrium eigenfrequency." },
      { conceptId: "conservation", intensity: 5, manifestation: "Zero net spatial energy transport with localized kinetic-potential energy transformation." }
    ],
    examPromptTakeaway: "Distance between adjacent nodes is always \\lambda / 2; distance between node and adjacent antinode is \\lambda / 4.",
    examBlueprint: {
      paper1TrapPattern: "Options claiming particles on a standing wave have continuously shifting phases like a traveling wave (all particles between two nodes oscillate strictly in phase).",
      paper2StructuredPrompt: "A glass tube open at both ends has length 0.50 m. A tuning fork of frequency 680 Hz held above one end excites the fundamental standing wave. Taking sound speed in air as 340 m/s, draw the displacement standing wave pattern, calculate the fundamental wavelength, and explain how the resonant frequency changes if one end of the tube is closed.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Open pipe boundary condition: antinodes at both ends, length L = \\lambda / 2.",
        showWorking: "Wavelength: \\lambda = 2L = 2(0.50 m) = 1.0 m; Frequency f = v / \\lambda = 340 / 1.0 = 340 Hz (the 680 Hz fork excites the n = 2 second harmonic!). If one end is closed, the fundamental wavelength becomes \\lambda' = 4L = 2.0 m, which halves the fundamental frequency to f_1' = 340 / 2.0 = 170 Hz.",
        unitsAndSigFigs: "Wavelength = 1.0 m; Closing one end doubles the fundamental wavelength and halves the fundamental frequency from 340 Hz to 170 Hz."
      },
      pitfallsToAvoid: [
        "Drawing a node at an open pipe end.",
        "Assuming closed pipe fundamental frequency is higher than open pipe."
      ]
    },
    diagramIds: ["diag-standing-wave-harmonics-string", "diag-organ-pipe-acoustics"],
    primaryFormulas: [
      "\\lambda_n = \\frac{2L}{n} \\quad (\\text{strings, open pipes})",
      "\\lambda_n = \\frac{4L}{n} \\quad (\\text{closed pipes, } n \\text{ odd})",
      "f_n = n \\frac{v}{2L}",
      "d_{N-N} = \\frac{\\lambda}{2}",
      "d_{N-A} = \\frac{\\lambda}{4}"
    ]
  },
  {
    id: "top-c5",
    themeId: "theme-c",
    themeNumber: 3,
    topicCode: "C.5",
    displayCode: "C.5",
    syllabusRef: "IB Physics Guide C.5 / Tsokos Ch. 9 / Giancoli Ch. 12",
    title: "Doppler Effect (Sound & Light)",
    subtitle: "Moving Source vs. Moving Observer Kinematics, Frequency Shift Formulas, and Cosmological Redshift",
    level: "SL / HL",
    strategicImportance: "WAVE PHENOMENA ESSENTIAL",
    readingTimeMinutes: 9,
    summary:
      "The Doppler effect is the observed change in frequency of a wave received by an observer whenever there is relative motion between the wave source and the observer. When a sound source moves towards a stationary observer, wavefronts are compressed in the forward direction, reducing perceived wavelength and increasing perceived frequency: f' = f \\left(\\frac{v}{v - u_s}\\right). When the source moves away, wavefronts are stretched, reducing frequency: f' = f \\left(\\frac{v}{v + u_s}\\right). For a moving observer, wave speed relative to observer changes while spatial wavelength remains constant: f' = f \\left(\\frac{v \\pm u_o}{v}\\right). For electromagnetic waves where v = c, the fractional frequency shift is given by \\frac{\\Delta f}{f} \\approx \\frac{v}{c}, providing the observational basis for astronomical redshift, Hubble's law, and Doppler radar.",
    speedReadBullets: [
      "Definition: The apparent change in observed frequency resulting from relative velocity between wave source and observer.",
      "Moving Source (Sound): Spatial wavelength is physically altered. Wavefronts bunch up ahead (\\lambda' = \\frac{v - u_s}{f}) and spread out behind (\\lambda' = \\frac{v + u_s}{f}).",
      "Moving Source Formula: f' = f \\left( \\frac{v}{v \\pm u_s} \\right) (MINUS in denominator for approaching \\to higher f'; PLUS for receding \\to lower f').",
      "Moving Observer (Sound): Spatial wavelength is unchanged, but relative wave speed changes (v_{rel} = v \\pm u_o). Formula: f' = f \\left( \\frac{v \\pm u_o}{v} \\right) (PLUS for approaching; MINUS for receding).",
      "Doppler Shift for Light: In vacuum, light speed c is constant for all observers. For non-relativistic velocities (v \\ll c): \\frac{\\Delta f}{f} = \\frac{\\Delta \\lambda}{\\lambda} \\approx \\frac{v}{c}.",
      "Cosmological Redshift: Light from distant receding galaxies is shifted to longer wavelengths (redshift z = \\Delta \\lambda / \\lambda_0 > 0), demonstrating Hubble's expansion of space.",
    ],
    primer5Min:
      "To avoid sign confusion in Doppler formulas, apply physical intuition: Approaching ALWAYS increases frequency (pitch sounds higher, f' > f). Receding ALWAYS decreases frequency (pitch sounds lower, f' < f). For a moving source: to make f' larger than f, the denominator (v \\pm u_s) must become SMALLER, so use MINUS: f' = f \\frac{v}{v - u_s}. For an approaching observer: the numerator (v \\pm u_o) must become LARGER, so use PLUS: f' = f \\frac{v + u_o}{v}.",
    subSections: [
      {
        id: "c5-s1",
        title: "The Acoustic Doppler Effect: Source vs. Observer Motion",
        marker: "Kinematic Wavefront Shift",
        content:
          "Consider a sound source emitting waves of frequency f and period T = 1/f in air where sound speed is v. If the source moves forward at speed u_s, during one period T it advances distance u_s T before emitting the next wavefront crest. The crest-to-crest separation in front of the source is compressed to \\lambda' = v T - u_s T = (v - u_s)/f. A stationary observer receives waves at speed v with this shortened wavelength, recording a higher frequency: f' = \\frac{v}{\\lambda'} = f \\left(\\frac{v}{v - u_s}\\right). If the observer moves at speed u_o towards a stationary source, wavelength in air remains standard \\lambda = v / f, but wavefronts strike the observer at relative speed v + u_o, giving f' = \\frac{v + u_o}{\\lambda} = f \\left(\\frac{v + u_o}{v}\\right).",
        analyticalTakeaway:
          "Although an approaching source and approaching observer at identical speed u produce higher frequencies, the numerical frequency shifts are NOT identical because source motion physically alters wavelength \\lambda, whereas observer motion alters relative wave speed v.",
        keyFormulaOrFramework: "f' = f \\left(\\frac{v}{v \\pm u_s}\\right) \\quad (\\text{source}), \\quad f' = f \\left(\\frac{v \\pm u_o}{v}\\right) \\quad (\\text{observer})",
        workedExample: {
          problem: "An ambulance siren emits a steady 650 Hz tone while moving at 30.0 m/s towards a stationary pedestrian. Speed of sound in air is 340 m/s. Calculate: (a) the frequency heard by the pedestrian as the ambulance approaches, and (b) the frequency heard immediately after it passes by.",
          stepByStep: [
            "1. Approaching source: f' = f \\left( \\frac{v}{v - u_s} \\right).",
            "2. Compute approaching: f' = 650 \\left( \\frac{340}{340 - 30.0} \\right) = 650 \\left( \\frac{340}{310} \\right) = 650 (1.09677) = 712.9 Hz.",
            "3. Receding source: f'' = f \\left( \\frac{v}{v + u_s} \\right).",
            "4. Compute receding: f'' = 650 \\left( \\frac{340}{340 + 30.0} \\right) = 650 \\left( \\frac{340}{370} \\right) = 650 (0.91892) = 597.3 Hz."
          ],
          finalAnswer: "(a) Approaching frequency = 713 Hz; (b) Receding frequency = 597 Hz (both to 3 significant figures)."
        }
      },
      {
        id: "c5-s2",
        title: "Electromagnetic Doppler Shift & Cosmological Redshift",
        marker: "Astrophysical Applications",
        content:
          "Because light speed c is constant for all inertial observers (Einstein's postulate of special relativity), the asymmetry between source and observer motion disappears. For relative radial velocity v \\ll c, the relativistic Doppler formula approximates to: \\frac{\\Delta f}{f} = \\frac{\\Delta \\lambda}{\\lambda} \\approx \\frac{v}{c}. When a star or galaxy moves away from Earth (v > 0), its spectral absorption lines (such as Hydrogen Balmer lines) are shifted toward longer, redder wavelengths—a phenomenon called redshift (z = \\Delta \\lambda / \\lambda_0). Edwin Hubble's 1929 discovery that galactic redshift is directly proportional to distance (v = H_0 d) established that the fabric of space itself is expanding.",
        analyticalTakeaway:
          "A blue-shifted spectrum indicates relative motion towards the observer (such as the Andromeda galaxy, approaching our Milky Way at ~110 km/s).",
        keyFormulaOrFramework: "\\frac{\\Delta f}{f} = \\frac{\\Delta \\lambda}{\\lambda} \\approx \\frac{v}{c}, \\quad z = \\frac{\\lambda_{obs} - \\lambda_{rest}}{\\lambda_{rest}}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-c5-1",
        question: "Explain why the pitch of an approaching train whistle drops abruptly to a lower pitch at the exact instant the train engine passes by a stationary listener on the platform.",
        promptType: "explain",
        hints: ["What happens to the sign in the Doppler equation as the train passes?"],
        modelAnswer: "While approaching, the train pushes emitted wavefronts closer together, reducing wavelength in front to \\lambda' = (v - u_s)/f and presenting a constant elevated frequency f' = f \\frac{v}{v - u_s}. The instant the train passes the listener, relative velocity flips from positive (approaching) to negative (receding). Wavefronts are now stretched behind the train to \\lambda'' = (v + u_s)/f, causing the received frequency to drop discontinuously to a constant lower frequency f'' = f \\frac{v}{v + u_s}.",
        keyTermsToInclude: ["compressed wavefronts while approaching", "stretched wavefronts while receding", "sign flip from (v - u_s) to (v + u_s)", "sudden drop in received frequency"]
      },
      {
        id: "q-c5-2",
        question: "A spectral emission line of ionized calcium has a laboratory rest wavelength of 393.3 nm. When observing a distant galaxy, the line is detected at 405.1 nm. Calculate the recessional velocity of the galaxy.",
        promptType: "calculation",
        hints: ["Use \\frac{\\Delta \\lambda}{\\lambda} = \\frac{v}{c}."],
        modelAnswer: "Wavelength shift: \\Delta \\lambda = \\lambda_{obs} - \\lambda_{rest} = 405.1 nm - 393.3 nm = +11.8 nm. Using the Doppler relation: \\frac{\\Delta \\lambda}{\\lambda} = \\frac{v}{c} \\implies v = c \\left( \\frac{\\Delta \\lambda}{\\lambda_{rest}} \\right) = (3.00 \\times 10^8 m/s) \\left( \\frac{11.8 nm}{393.3 nm} \\right) = (3.00 \\times 10^8)(0.0300025) = 9.00 \\times 10^6 m/s = 9000 km/s.",
        keyTermsToInclude: ["\\Delta \\lambda = +11.8 nm", "v = c (\\Delta \\lambda / \\lambda)", "recessional speed = 9.0 \\times 10^6 m/s (9000 km/s)"]
      }
    ],
    analysis: {
      coreThesis: "Relative motion modifies wavefront spacing and arrival rates, providing a universal cosmological speedometer.",
      theoreticalFoundations: "Special relativity, kinematic wave compression geometry.",
      strategicEvaluation: "In calculations involving sound, speed of sound is typically 330–340 m/s; in calculations involving light or radio waves, use speed of light c = 3.00 \\times 10^8 m/s.",
      commonMisconceptions: [
        "Thinking the frequency of sound emitted BY the source changes (the source always emits its natural frequency f; only the observer PERCEIVES f').",
        "Believing Doppler effect changes the speed of sound in air (sound speed v remains constant relative to the air medium).",
        "Using light Doppler formulas for sound problems or vice versa."
      ],
      realWorldConnections: "Police radar speed guns (microwaves reflecting off moving car), Doppler echocardiography ultrasound measuring blood flow velocity, and exoplanet detection via stellar radial velocity wobble.",
      keyDiagrams: ["diag-doppler-sound-wavefronts", "diag-cosmological-redshift-spectrum"]
    },
    cases: [
      {
        id: "case-c5",
        title: "Exoplanet Detection via Radial Velocity Doppler Spectroscopy",
        domainOrContext: "Observational Exoplanetary Astrophysics",
        physicalMechanism: "An orbiting giant exoplanet exerts gravitational pull on its host star, causing the star to reflexively wobble in a tiny orbit around their common center of mass. High-resolution spectrographs (HARPS/ESPRESSO) detect periodic alternating Doppler redshifts and blueshifts in the star's absorption lines down to precision of \\pm 0.1 m/s.",
        concepts: ["invariance", "equilibrium"],
        syllabusLink: "C.5 Doppler Effect \\Delta \\lambda / \\lambda = v / c",
        quantitativeInsight: "Jupiter induces a 12.4 m/s wobble in the Sun, shifting visible absorption lines by a fraction \\Delta \\lambda / \\lambda \\approx 4 \\times 10^{-8} (less than 0.00002 nm), detectable only through ultra-stable laser frequency combs."
      }
    ],
    conceptTracking: [
      { conceptId: "invariance", intensity: 5, manifestation: "Speed of light c invariance underpinning relativistic electromagnetic Doppler shift." },
      { conceptId: "duality", intensity: 4, manifestation: "Wavefront frequency compression correlating with photon energy shift E = hf." }
    ],
    examPromptTakeaway: "Approaching sources always shift frequency up (+); receding sources always shift frequency down (-).",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the frequency heard by a passenger traveling inside the ambulance (they hear the normal emitted frequency f with zero Doppler shift!).",
      paper2StructuredPrompt: "A police radar gun emits microwave radiation of frequency 10.5 GHz towards an approaching car. The car reflects the microwaves back to the gun, where the reflected signal beats with the emitted signal to produce a beat frequency of 1.40 kHz. Calculate the speed of the approaching car.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Two-way Doppler radar shift: Total frequency shift is doubled (\\Delta f = 2 f v / c) because the car acts first as moving receiver and then as moving emitter.",
        showWorking: "Beat frequency \\Delta f = 1.40 \\times 10^3 Hz; emitted frequency f = 1.05 \\times 10^{10} Hz; Car speed v = \\frac{c \\Delta f}{2 f} = \\frac{(3.00 \\times 10^8)(1.40 \\times 10^3)}{2 (1.05 \\times 10^{10})} = \\frac{4.20 \\times 10^{11}}{2.10 \\times 10^{10}} = 20.0 m/s.",
        unitsAndSigFigs: "Car speed = 20.0 m/s (72 km/h, 3 significant figures)."
      },
      pitfallsToAvoid: [
        "Forgetting the factor of 2 in radar reflection problems.",
        "Using sound speed instead of light speed for radar microwaves."
      ]
    },
    diagramIds: ["diag-doppler-sound-wavefronts", "diag-cosmological-redshift-spectrum"],
    primaryFormulas: [
      "f' = f\\left(\\frac{v}{v \\pm u_s}\\right) \\quad (\\text{moving source})",
      "f' = f\\left(\\frac{v \\pm u_o}{v}\\right) \\quad (\\text{moving observer})",
      "\\frac{\\Delta f}{f} = \\frac{\\Delta \\lambda}{\\lambda} \\approx \\frac{v}{c} \\quad (\\text{light, } v \\ll c)",
      "z = \\frac{\\Delta \\lambda}{\\lambda_0}"
    ]
  }
];
