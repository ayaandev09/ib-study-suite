import { TopicData } from "./types";

export const THEME_E_TOPICS: TopicData[] = [
  {
    id: "top-e1",
    themeId: "theme-e",
    themeNumber: 5,
    topicCode: "E.1",
    displayCode: "E.1",
    syllabusRef: "IB Physics Guide E.1 / Tsokos Ch. 7 / Giancoli Ch. 30",
    title: "Structure of the Atom & The Nuclear Model",
    subtitle: "Rutherford Alpha Scattering Experiment, Nuclear Notation, Isotopes, and Nuclear Density",
    level: "SL",
    strategicImportance: "NUCLEAR & QUANTUM CORE",
    readingTimeMinutes: 10,
    summary:
      "The nuclear model of the atom was established by the landmark 1909 Geiger-Marsden-Rutherford alpha-particle scattering experiment. Firing 5.5 MeV alpha particles at thin gold foil revealed that while the vast majority passed through undeflected, approximately 1 in 8,000 rebounded at angles exceeding 90°. This decisively refuted Thomson's plum-pudding model, proving that all positive charge and over 99.9% of atomic mass is concentrated in a tiny, dense nucleus of diameter ~10^-14 m, surrounded by orbiting electrons at ~10^-10 m. Nuclei are characterized by atomic number Z and mass number A. The strong nuclear force binds nucleons against electrostatic Coulomb repulsion. Nuclear radius follows the empirical scaling law R = R_0 A^{1/3}, establishing that nuclear matter has constant density across all elements.",
    speedReadBullets: [
      "Geiger-Marsden-Rutherford Scattering: 1. Most alpha particles pass straight through with minimal deflection \\implies atom is mostly empty space. 2. A tiny fraction (~1 in 8000) are scattered through large angles (>90°) \\implies positive charge and mass are concentrated in an extremely dense, compact central nucleus.",
      "Nuclear Notation: ^A_Z X, where A is nucleon (mass) number (A = Z + N), Z is proton (atomic) number, and N is neutron number.",
      "Isotopes: Nuclides with identical atomic number Z (same element, identical chemical properties) but differing neutron number N (different mass, distinct nuclear stability).",
      "Fundamental Forces in the Nucleus: 1. Electrostatic Coulomb Repulsion (long-range, repulsive between protons). 2. Strong Nuclear Force (extremely strong, short-range ~1-3 fm, attractive between all nucleons; repulsive below 0.5 fm to prevent collapse).",
      "Nuclear Radius Formula: R = R_0 A^{1/3}, where R_0 \\approx 1.20 \\times 10^-15 m (1.2 fm).",
      "Constant Nuclear Density: Volume V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3 A \\propto A. Mass m \\approx A u \\propto A. Therefore, density \\rho = \\frac{m}{V} = \\text{constant} \\approx 2.3 \\times 10^{17} kg m^-3 for all atomic nuclei.",
    ],
    primer5Min:
      "When asked about the Rutherford experiment in Paper 2, state the observation, then the physical deduction: 1. Observation: Vast majority of alphas pass undeflected \\implies Deduction: Atom is mostly empty space. 2. Observation: Small fraction deflect by > 90° \\implies Deduction: Nucleus is positively charged and contains virtually all mass in an ultra-dense volume. For nuclear radius calculations, remember the cube-root formula: R = R_0 A^{1/3}. If mass number A increases by a factor of 8, nuclear radius doubles (8^{1/3} = 2).",
    subSections: [
      {
        id: "e1-s1",
        title: "The Rutherford Alpha Scattering Experiment",
        marker: "Experimental Discovery",
        content:
          "Prior to 1911, J.J. Thomson's 'plum pudding' model posited that electrons were embedded within a diffuse sphere of positive charge. Hans Geiger and Ernest Marsden directed a collimated beam of alpha particles (^4_2He^{2+}) at an ultrathin gold foil (~400 nm thick). Under the Thomson model, the electric field of diffuse charge was too weak to deflect fast alphas by more than a fraction of a degree. Experimentally, while most passed straight through, roughly 1 in 8000 suffered deflections exceeding 90°, and some bounced directly backwards (180°). Rutherford concluded that only a minute central core containing the entire positive charge (+Ze) could generate the immense Coulomb repulsion F = \\frac{k(2e)(Ze)}{r^2} required for backscattering.",
        analyticalTakeaway:
          "Distance of closest approach d for head-on backscattering (180°) occurs where initial alpha kinetic energy is completely converted to electrostatic potential energy: E_k = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(2e)(Ze)}{d} \\implies d = \\frac{2kZe^2}{E_k}. This provides an upper bound on nuclear radius.",
        keyFormulaOrFramework: "E_k = \\frac{k (2e)(Ze)}{d} \\implies d = \\frac{2kZe^2}{E_k}, \\quad R = R_0 A^{1/3}",
        workedExample: {
          problem: "An alpha particle with kinetic energy 5.50 MeV is fired head-on at a stationary gold nucleus (Z = 79). Calculate the distance of closest approach d. (e = 1.60 \\times 10^-19 C, k = 8.99 \\times 10^9 N m^2 C^-2).",
          stepByStep: [
            "1. Convert kinetic energy from MeV to Joules: E_k = (5.50 \\times 10^6 eV)(1.60 \\times 10^{-19} J/eV) = 8.80 \\times 10^{-13} J.",
            "2. At distance of closest approach d, velocity is momentarily zero, and all KE is converted into Coulomb potential energy: E_k = \\frac{k q_1 q_2}{d} = \\frac{k (2e)(Ze)}{d}.",
            "3. Rearrange for d: d = \\frac{2 k Z e^2}{E_k}.",
            "4. Compute: d = \\frac{2 (8.99 \\times 10^9)(79)(1.60 \\times 10^{-19})^2}{8.80 \\times 10^{-13}} = \\frac{(1.42042 \\times 10^{12})(2.56 \\times 10^{-38})}{8.80 \\times 10^{-13}} = \\frac{3.63628 \\times 10^{-26}}{8.80 \\times 10^{-13}} = 4.132 \\times 10^{-14} m.",
            "5. Convert to femtometers: d = 41.3 fm."
          ],
          finalAnswer: "Distance of closest approach d = 4.13 \\times 10^-14 m (41 fm, 3 significant figures)."
        }
      },
      {
        id: "e1-s2",
        title: "Nuclear Dimensions & Invariant Nuclear Density",
        marker: "Nuclear Scaling Laws",
        content:
          "High-energy electron scattering experiments demonstrate that the nuclear charge distribution has a remarkably sharp boundary. The radius R of a nucleus containing A nucleons obeys the cubic scaling law: R = R_0 A^{1/3}, where R_0 \\approx 1.20 \\times 10^{-15} m (1.20 fm). Assuming a spherical nucleus, volume is V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3 A. Total nuclear mass is approximately m \\approx A u, where u = 1.661 \\times 10^{-27} kg. Dividing mass by volume reveals that nuclear density is constant across the entire periodic table: \\rho_{nucleus} = \\frac{m}{V} = \\frac{A u}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3 u}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17} kg m^-3.",
        analyticalTakeaway:
          "Because nucleon number A cancels out of the density equation, a uranium nucleus (^238U) has the exact same density as a helium nucleus (^4He)—roughly 230 million metric tons per cubic centimeter, identical to neutron star matter.",
        keyFormulaOrFramework: "R = R_0 A^{1/3}, \\quad \\rho_{nuclear} = \\frac{3u}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17} \\text{ kg}\\cdot\\text{m}^{-3}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-e1-1",
        question: "State the two main experimental observations of the Geiger-Marsden alpha scattering experiment and state the corresponding deduction about atomic structure made from each.",
        promptType: "explain",
        hints: ["Observation 1: deflection of majority. Observation 2: large angle rebounds."],
        modelAnswer: "1. Observation: The vast majority of alpha particles passed straight through the gold foil with little or no deflection. Deduction: The atom consists mostly of empty space, with electrons occupying a large volume far from the center. 2. Observation: A tiny fraction (~1 in 8000) of alpha particles were deflected through large angles (>90°), with some backscattered. Deduction: All the positive charge and virtually all the mass of the atom is concentrated in an extremely small, dense central region called the nucleus.",
        keyTermsToInclude: ["majority undeflected \\implies mostly empty space", "large angle deflections \\implies dense positive nucleus", "concentrated mass and charge"]
      },
      {
        id: "q-e1-2",
        question: "Calculate the radius of an iron-56 (^56_26Fe) nucleus, taking R_0 = 1.20 \\times 10^-15 m.",
        promptType: "calculation",
        hints: ["Use R = R_0 A^{1/3} with A = 56."],
        modelAnswer: "Using the nuclear radius relation: R = R_0 A^{1/3} = (1.20 \\times 10^{-15} m)(56)^{1/3}. Evaluating the cube root: (56)^{1/3} = 3.82586. Therefore: R = (1.20 \\times 10^{-15} m)(3.82586) = 4.591 \\times 10^{-15} m = 4.59 fm.",
        keyTermsToInclude: ["R = R_0 A^{1/3}", "(56)^{1/3} = 3.83", "R = 4.59 \\times 10^{-15} m (4.59 fm)"]
      }
    ],
    analysis: {
      coreThesis: "Matter is structured as concentrated nuclear cores surrounded by quantum electron clouds, governed by the strong nuclear force.",
      theoreticalFoundations: "Rutherford Coulomb scattering cross-section, strong interaction Yukawa meson exchange, nuclear liquid drop model.",
      strategicEvaluation: "In distance of closest approach calculations, students often forget that alpha particle charge is +2e (not +1e) and gold charge is +79e.",
      commonMisconceptions: [
        "Believing the nucleus is held together by gravity (gravitational attraction between nucleons is ~10^36 times weaker than electrostatic repulsion; the strong force binds the nucleus).",
        "Assuming heavier nuclei are denser (nuclear density is constant for all elements).",
        "Confusing mass number A with atomic number Z."
      ],
      realWorldConnections: "Rutherford backscattering spectrometry (RBS) for thin-film materials analysis, neutron star structural astrophysics, and heavy ion collider physics.",
      keyDiagrams: ["diag-rutherford-scattering-hyperbolas", "diag-nuclear-structure-density"]
    },
    cases: [
      {
        id: "case-e1",
        title: "Rutherford Backscattering Spectrometry (RBS) in Semiconductor Fabrication",
        domainOrContext: "Nanoscale Materials Characterization",
        physicalMechanism: "Beams of 2 MeV helium ions (^4He^{2+}) strike silicon semiconductor wafers. The energy of backscattered ions depends on the mass of target impurity atoms via elastic kinematics (E_{final} = k_{kin} E_0), measuring atomic layer depth and dopant concentrations with sub-nanometer resolution.",
        concepts: ["fields", "micro-macro"],
        syllabusLink: "E.1 Rutherford Scattering Kinematics",
        quantitativeInsight: "Scattering kinematics distinguishes gold dopants from silicon lattice atoms with 99.9% isotopic purity, verifying atomic thin-film gate oxide coatings in modern microprocessors."
      }
    ],
    conceptTracking: [
      { conceptId: "fields", intensity: 5, manifestation: "Coulomb electrostatic field mediating hyperbolic deflection of alpha particles." },
      { conceptId: "invariance", intensity: 5, manifestation: "Invariant nuclear matter density \\rho \\approx 2.3 \\times 10^{17} kg m^-3 across all elements." }
    ],
    examPromptTakeaway: "Nuclear radius scales as A^{1/3}, which ensures nuclear density remains strictly constant.",
    examBlueprint: {
      paper1TrapPattern: "Options claiming nuclear density increases with mass number A (nuclear density is identical for all nuclides).",
      paper2StructuredPrompt: "Describe the Geiger-Marsden experiment, explain how the results contradicted the Thomson plum-pudding model, and calculate the ratio of the radius of a gold nucleus (A = 197) to an aluminum nucleus (A = 27).",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Nuclear radius formula R = R_0 A^{1/3}.",
        showWorking: "Ratio of radii: \\frac{R_{Au}}{R_{Al}} = \\frac{R_0 (197)^{1/3}}{R_0 (27)^{1/3}} = \\left( \\frac{197}{27} \\right)^{1/3} = (7.2963)^{1/3} = 1.9395 \\approx 1.94.",
        unitsAndSigFigs: "Ratio = 1.94 (dimensionless, 3 significant figures)."
      },
      pitfallsToAvoid: [
        "Calculating the ratio of masses instead of the ratio of cube roots.",
        "Attempting to convert radius ratio into density ratio."
      ]
    },
    diagramIds: ["diag-rutherford-scattering-hyperbolas", "diag-nuclear-structure-density"],
    primaryFormulas: [
      "R = R_0 A^{1/3}",
      "E_k = \\frac{k (2e)(Ze)}{d}",
      "\\rho_{nucleus} = \\frac{3u}{4\\pi R_0^3}",
      "A = Z + N"
    ]
  },
  {
    id: "top-e3",
    themeId: "theme-e",
    themeNumber: 5,
    topicCode: "E.3",
    displayCode: "E.3",
    syllabusRef: "IB Physics Guide E.3 / Tsokos Ch. 7 / Giancoli Ch. 30",
    title: "Radioactive Decay & Half-Life",
    subtitle: "Alpha, Beta, Gamma Emission, Decay Laws N = N_0 e^{-\\lambda t}, Activity A = \\lambda N, and Radiation Safety",
    level: "SL",
    strategicImportance: "NUCLEAR & QUANTUM CORE",
    readingTimeMinutes: 11,
    summary:
      "Radioactive decay is the spontaneous and random quantum process by which unstable parent radionuclides transition into more stable daughter configurations by emitting ionizing radiation. Alpha decay (\\alpha = ^4_2He) releases high-LET helium nuclei; beta-minus decay (\\beta^- = ^0_{-1}e + \\bar{\\nu}_e) converts a neutron into a proton via weak interaction with antineutrino emission; beta-plus decay (\\beta^+ = ^0_{+1}e + \\nu_e) converts a proton into a neutron with neutrino emission; gamma emission (\\gamma) de-excites nuclear states via high-energy photons. Because decay is purely statistical, the rate of decay (Activity A = -dN/dt = \\lambda N, measured in Becquerels) is proportional to the number of undecayed nuclei. This yields exponential decay: N(t) = N_0 e^{-\\lambda t} and A(t) = A_0 e^{-\\lambda t}, where half-life is T_{1/2} = \\frac{\\ln 2}{\\lambda}.",
    speedReadBullets: [
      "Spontaneous & Random Nature: Spontaneous: Unaffected by external temperature, pressure, or chemical environment. Random: Impossible to predict when a specific individual nucleus will decay; only the probability per unit time (\\lambda) is constant.",
      "Three Ionizing Radiation Types: 1. Alpha (\\alpha = ^4_2He): High mass, charge +2e, high ionizing power, stopped by paper or skin (~5 cm air range). 2. Beta (\\beta^- / \\beta^+): Low mass electrons/positrons, charge \\pm 1e, moderate ionization, stopped by ~few mm aluminum. 3. Gamma (\\gamma): Massless high-energy photons, zero charge, low ionization, high penetration (attenuated by thick lead/concrete).",
      "Neutrinos in Beta Decay: The continuous energy spectrum of beta emission historically proved the existence of the neutrino/antineutrino (carrying missing energy and momentum).",
      "Activity (A): Number of radioactive disintegrations per second: A = -\\frac{dN}{dt} = \\lambda N (SI unit: Becquerel, 1 Bq = 1 decay/s).",
      "Exponential Decay Law: N(t) = N_0 e^{-\\lambda t}, \\quad A(t) = A_0 e^{-\\lambda t}.",
      "Half-Life (T_{1/2}): Time required for half of the initial radioactive nuclei to decay: T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}.",
      "Background Radiation: Ambient ionizing radiation from cosmic rays, radon gas in rocks, medical X-rays, and biological isotopes (^40K). Corrected count rate = Measured count rate - Background count rate.",
    ],
    primer5Min:
      "In radioactive decay calculations, always correct for background radiation first! Subtract background count rate before halving or calculating ratios. Remember that Activity and number of nuclei follow identical exponential formulas: \\frac{A}{A_0} = \\frac{N}{N_0} = e^{-\\lambda t} = \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}. If given a graph of ln(A) against time t, the gradient is -\\lambda, and the y-intercept is ln(A_0). In decay equations, conserve both nucleon number A (top superscripts) and atomic number Z (bottom subscripts).",
    subSections: [
      {
        id: "e3-s1",
        title: "Alpha, Beta & Gamma Emission Mechanisms",
        marker: "Radiation Physics",
        content:
          "Unstable nuclides decay to achieve higher binding energy per nucleon. In alpha decay: ^A_Z X \\to ^{A-4}_{Z-2} Y + ^4_2\\alpha. Alpha particles are emitted with discrete monoenergetic kinetic energies (~5 MeV). In beta-minus (\\beta^-) decay: a neutron transforms into a proton via weak interaction: n \\to p + e^- + \\bar{\\nu}_e, so ^A_Z X \\to ^A_{Z+1} Y + ^0_{-1}e + \\bar{\\nu}_e. In beta-plus (\\beta^+) decay: a proton transforms into a neutron: p \\to n + e^+ + \\nu_e, so ^A_Z X \\to ^A_{Z-1} Y + ^0_{+1}e + \\nu_e. Because energy is shared three ways between daughter nucleus, beta particle, and neutrino, emitted beta particles possess a continuous kinetic energy spectrum up to a maximum endpoint E_{max}. In gamma decay: an excited daughter nucleus drops to its ground state by emitting a gamma photon: ^A_Z X^* \\to ^A_Z X + \\gamma.",
        analyticalTakeaway:
          "The discovery of the continuous beta energy spectrum led Wolfgang Pauli in 1930 to propose the neutrino: an uncharged, nearly massless spin-1/2 lepton that carries the remaining energy and momentum.",
        keyFormulaOrFramework: "n \\to p + e^- + \\bar{\\nu}_e, \\quad p \\to n + e^+ + \\nu_e, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda}",
      },
      {
        id: "e3-s2",
        title: "The Exponential Decay Law & Half-Life Mathematics",
        marker: "Statistical Kinetics",
        content:
          "The decay rate of a radioactive sample is proportional to the number N of undecayed parent nuclei remaining: \\frac{dN}{dt} = -\\lambda N, where decay constant \\lambda is the probability of decay per nucleus per unit time (s^-1). Integrating yields the exponential decay law: N(t) = N_0 e^{-\\lambda t}. Because activity A = \\lambda N, activity decays with the identical exponential profile: A(t) = A_0 e^{-\\lambda t}. Setting N = N_0 / 2 gives \\frac{1}{2} = e^{-\\lambda T_{1/2}} \\implies -\\ln 2 = -\\lambda T_{1/2} \\implies T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.69315}{\\lambda}. After n half-lives, the remaining fraction of undecayed nuclei is \\left(\\frac{1}{2}\\right)^n.",
        analyticalTakeaway:
          "Taking natural logarithms of the decay equation gives \\ln A = -\\lambda t + \\ln A_0. Plotting \\ln A versus time yields a straight line with gradient -\\lambda and vertical intercept \\ln A_0.",
        keyFormulaOrFramework: "N(t) = N_0 e^{-\\lambda t}, \\quad A(t) = A_0 e^{-\\lambda t}, \\quad A = \\lambda N, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda}",
        workedExample: {
          problem: "A sample of radioactive Iodine-131 (^131_53I) has an initial activity of 4.80 \\times 10^7 Bq and a half-life of 8.02 days. Calculate: (a) the decay constant \\lambda in s^-1, (b) the number of Iodine-131 atoms initially present, and (c) the activity remaining after 24.0 days.",
          stepByStep: [
            "1. Convert half-life to seconds: T_{1/2} = (8.02 days)(86400 s/day) = 6.92928 \\times 10^5 s.",
            "2. Decay constant: \\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.693147}{6.92928 \\times 10^5 s} = 1.0003 \\times 10^{-6} s^{-1} \\approx 1.00 \\times 10^{-6} s^{-1}.",
            "3. Initial number of nuclei: A_0 = \\lambda N_0 \\implies N_0 = \\frac{A_0}{\\lambda} = \\frac{4.80 \\times 10^7 Bq}{1.0003 \\times 10^{-6} s^{-1}} = 4.7985 \\times 10^{13} atoms.",
            "4. Activity after 24.0 days: Time t = 24.0 days corresponds to \\frac{24.0}{8.02} = 2.9925 half-lives.",
            "5. Compute remaining activity: A(t) = A_0 e^{-\\lambda t} = A_0 \\left(\\frac{1}{2}\\right)^{2.9925} = (4.80 \\times 10^7)(0.12565) = 6.031 \\times 10^6 Bq."
          ],
          finalAnswer: "(a) \\lambda = 1.00 \\times 10^-6 s^-1; (b) N_0 = 4.80 \\times 10^13 atoms; (c) Remaining activity = 6.03 \\times 10^6 Bq (6.03 MBq)."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-e3-1",
        question: "Explain what is meant by the statements that radioactive decay is: (a) a random process, and (b) a spontaneous process.",
        promptType: "explain",
        hints: ["Random relates to individual nucleus predictability. Spontaneous relates to external physical influences."],
        modelAnswer: "(a) Random means that it is physically impossible to predict which specific nucleus will decay next or precisely when a given nucleus will disintegrate; there is only a fixed statistical probability per unit time (decay constant \\lambda) for any nucleus to decay. (b) Spontaneous means that the decay process is purely nuclear and is completely independent of external environmental factors such as temperature, pressure, chemical bonding, or magnetic fields.",
        keyTermsToInclude: ["random: cannot predict which or when", "constant probability per unit time \\lambda", "spontaneous: independent of external conditions", "purely nuclear origin"]
      },
      {
        id: "q-e3-2",
        question: "A detector measures a background radiation count rate of 25 counts per minute. When placed near a radioactive rock, the initial measured count rate is 425 cpm. After 6.0 hours, the count rate drops to 75 cpm. Calculate the half-life of the source.",
        promptType: "calculation",
        hints: ["Subtract background count rate FIRST from both initial and final measurements!"],
        modelAnswer: "1. Correct for background: Initial source count rate C_0 = 425 - 25 = 400 cpm. Final source count rate C(t) = 75 - 25 = 50 cpm. 2. Ratio: \\frac{C(t)}{C_0} = \\frac{50}{400} = \\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3. 3. Since the activity has halved 3 times, exactly 3 half-lives have elapsed in 6.0 hours: 3 T_{1/2} = 6.0 hours \\implies T_{1/2} = 2.0 hours.",
        keyTermsToInclude: ["subtract background count rate", "corrected C_0 = 400 cpm, C_t = 50 cpm", "ratio = 1/8 = 3 half-lives", "half-life = 2.0 hours"]
      }
    ],
    analysis: {
      coreThesis: "Radioactivity is a quantum statistical decay governed by universal exponential decay laws.",
      theoreticalFoundations: "Fermi's Golden Rule, quantum tunneling through alpha Coulomb barrier, electroweak gauge theory.",
      strategicEvaluation: "In half-life calculations, always ensure units match: if half-life is in years or days, convert to seconds before multiplying by activity in Becquerels (1 Bq = 1 s^-1).",
      commonMisconceptions: [
        "Forgetting to subtract background radiation before applying decay ratios.",
        "Confusing decay constant \\lambda with wavelength \\lambda.",
        "Assuming a sample with a long half-life is more dangerous than one with a short half-life (short half-life means higher activity and faster radiation dosage delivery)."
      ],
      realWorldConnections: "Radiocarbon-14 archaeological dating, medical diagnostic PET scans using Fluorine-18 (half-life 110 mins), and smoke detector Americium-241 alpha ionization chambers.",
      keyDiagrams: ["diag-radioactive-decay-exponential-curve", "diag-beta-decay-energy-spectrum"]
    },
    cases: [
      {
        id: "case-e3",
        title: "Radiocarbon-14 Archaeological Dating of the Shroud of Turin",
        domainOrContext: "Nuclear Archaeological Geochronology",
        physicalMechanism: "Cosmic ray neutrons convert atmospheric nitrogen into radioactive carbon-14 (^14N + n \\to ^14C + p). Living organisms maintain constant ^14C/^12C equilibrium ratio via metabolism. Upon death, ^14C decays (half-life 5,730 years) via \\beta^- emission without replenishment.",
        concepts: ["micro-macro", "invariance"],
        syllabusLink: "E.3 Radioactive Decay Laws N = N_0 e^{-\\lambda t}",
        quantitativeInsight: "In 1988, accelerator mass spectrometry measured 92% of original ^14C activity remaining in flax fibers, establishing the Shroud's origin between 1260 and 1390 CE (within \\pm 65 years at 95% confidence)."
      }
    ],
    conceptTracking: [
      { conceptId: "invariance", intensity: 5, manifestation: "Decay constant \\lambda and half-life T_{1/2} are invariant quantum physical properties of each nuclide." },
      { conceptId: "micro-macro", intensity: 4, manifestation: "Macroscopic exponential decay emerging from microscopic quantum tunneling probabilities." }
    ],
    examPromptTakeaway: "Always subtract background radiation count rate before performing half-life calculations.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for half-life from raw count rate where student forgets to subtract background, yielding incorrect half-life.",
      paper2StructuredPrompt: "State the equation for the beta-minus decay of carbon-14 into nitrogen-14, explain why the emitted beta particles have a continuous spectrum of energies, and calculate the fraction of carbon-14 remaining in a fossil after 17,190 years (T_{1/2} = 5730 years).",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Decay equation: ^{14}_6 C \\to ^{14}_7 N + ^0_{-1} e + \\bar{\\nu}_e. Fraction remaining = (0.5)^n where n = t / T_{1/2}.",
        showWorking: "Number of half-lives: n = 17,190 / 5,730 = 3.0. Fraction remaining: (1/2)^3 = 1/8 = 0.125 = 12.5%.",
        unitsAndSigFigs: "Fraction remaining = 0.125 (or 12.5%, 3 significant figures). Continuous spectrum is explained by energy sharing between beta particle and electron antineutrino."
      },
      pitfallsToAvoid: [
        "Omitting the antineutrino symbol \\bar{\\nu}_e in beta-minus decay equation.",
        "Confusing electron neutrino with electron antineutrino."
      ]
    },
    diagramIds: ["diag-radioactive-decay-exponential-curve", "diag-beta-decay-energy-spectrum"],
    primaryFormulas: [
      "N(t) = N_0 e^{-\\lambda t}",
      "A(t) = A_0 e^{-\\lambda t}",
      "A = \\lambda N",
      "T_{1/2} = \\frac{\\ln 2}{\\lambda}",
      "\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}"
    ]
  },
  {
    id: "top-e4",
    themeId: "theme-e",
    themeNumber: 5,
    topicCode: "E.4",
    displayCode: "E.4",
    syllabusRef: "IB Physics Guide E.4 / Tsokos Ch. 7 / Giancoli Ch. 31",
    title: "Nuclear Fission & Binding Energy",
    subtitle: "Mass Defect, Einstein's E = mc^2, Curve of Binding Energy per Nucleon, Induced Fission, and Chain Reactions",
    level: "SL",
    strategicImportance: "NUCLEAR & QUANTUM CORE",
    readingTimeMinutes: 11,
    summary:
      "Nuclear energy release is governed by Einstein's mass-energy equivalence principle \\Delta E = \\Delta m c^2. When nucleons bind to form a nucleus, the total mass of the bound nucleus is strictly less than the sum of its individual constituent free protons and neutrons. This missing mass is the mass defect \\Delta m. The energy equivalent required to completely disassemble the nucleus into constituent nucleons is the nuclear binding energy BE = \\Delta m c^2. Plotting binding energy per nucleon (BE/A) against mass number A reveals a peak near Iron-56 (~8.8 MeV/nucleon). Induced nuclear fission of heavy nuclides (such as Uranium-235 absorbing a thermal neutron) splits the nucleus into lighter fragments with higher BE/A, releasing ~200 MeV per event and secondary neutrons that sustain controlled nuclear chain reactions.",
    speedReadBullets: [
      "Mass-Energy Equivalence: \\Delta E = \\Delta m c^2. Mass and energy are interchangeable scalar quantities.",
      "Unified Atomic Mass Unit (u): Defined as 1/12 of the mass of an unbound carbon-12 atom: 1 u = 1.661 \\times 10^-27 kg = 931.5 MeV/c^2.",
      "Mass Defect (\\Delta m): Difference between mass of separated nucleons and actual mass of bound nucleus: \\Delta m = [Z m_p + (A - Z) m_n] - m_{nucleus}.",
      "Binding Energy (BE): Energy released when free nucleons assemble into a nucleus, or energy required to disassemble it: BE = \\Delta m c^2.",
      "Binding Energy per Nucleon (BE/A): Quantitative measure of nuclear stability. Maximum stability occurs at Iron-56 (^56Fe, ~8.8 MeV/nucleon).",
      "Fission vs. Fusion on BE/A Curve: Fusion: Light nuclei (left of peak, A < 56) fuse into heavier nuclei, moving UP the curve and releasing energy. Fission: Heavy nuclei (right of peak, A > 56) split into medium nuclei, moving UP the curve and releasing energy.",
      "Induced Fission of U-235: ^235_92U + ^1_0n \\to ^236_92U^* \\to ^141_56Ba + ^92_36Kr + 3 ^1_0n + \\text{energy} (~200 MeV).",
      "Chain Reaction & Reactor Physics: Secondary neutrons sustain fission. Moderator (heavy water/graphite) slows fast fission neutrons (2 MeV) to thermal speeds (~0.025 eV). Control rods (boron/cadmium) absorb neutrons to maintain criticality k = 1.0.",
    ],
    primer5Min:
      "In binding energy calculations, convert mass defect \\Delta m in unified atomic mass units (u) directly to energy in MeV using the factor: 1 u = 931.5 MeV! Do NOT convert to kilograms and multiply by c^2 unless the answer is explicitly requested in Joules. When calculating energy released in a nuclear reaction: \\Delta E = [\\text{Total Mass of Reactants} - \\text{Total Mass of Products}] \\times 931.5 MeV. Equivalently: \\Delta E = \\text{Total Binding Energy of Products} - \\text{Total Binding Energy of Reactants}.",
    subSections: [
      {
        id: "e4-s1",
        title: "Mass Defect & Binding Energy per Nucleon",
        marker: "Nuclear Thermodynamics",
        content:
          "When Z protons and (A - Z) neutrons bind together under the strong nuclear force, the mass of the resulting nucleus is measurably smaller than the sum of the constituent masses: \\Delta m = [Z m_p + (A - Z)m_n] - m_{nucleus}. This difference is the mass defect. The energy released upon formation is the binding energy: BE = \\Delta m c^2. Dividing binding energy by the total number of nucleons gives binding energy per nucleon: \\frac{BE}{A}. A plot of BE/A versus mass number A rises steeply from Deuterium (^2H, 1.1 MeV/nucleon) through Helium-4 (^4He, 7.1 MeV/nucleon), reaches a maximum peak at Iron-56 (^56Fe, 8.79 MeV/nucleon), and gradually declines toward Uranium-238 (~7.6 MeV/nucleon) due to increasing electrostatic Coulomb repulsion among many protons.",
        analyticalTakeaway:
          "Iron-56 (^56Fe) and Nickel-62 are the most thermodynamically stable nuclei in the universe. Any nuclear reaction that moves nuclides closer to the Iron-56 peak converts mass into released kinetic energy.",
        keyFormulaOrFramework: "\\Delta m = [Z m_p + (A - Z)m_n] - m_{nucleus}, \\quad BE = \\Delta m c^2 = \\Delta m (931.5 \\text{ MeV})",
        workedExample: {
          problem: "Calculate the binding energy per nucleon of an alpha particle (^4_2He nucleus). Given: Mass of proton m_p = 1.007276 u, mass of neutron m_n = 1.008665 u, and mass of helium-4 nucleus m_{He} = 4.001506 u. (1 u = 931.5 MeV).",
          stepByStep: [
            "1. Alpha particle consists of 2 protons and 2 neutrons (Z = 2, N = 2, A = 4).",
            "2. Total mass of individual constituent nucleons: m_{constituents} = 2(1.007276 u) + 2(1.008665 u) = 2.014552 + 2.017330 = 4.031882 u.",
            "3. Mass defect: \\Delta m = m_{constituents} - m_{He} = 4.031882 u - 4.001506 u = 0.030376 u.",
            "4. Total binding energy: BE = \\Delta m \\times 931.5 MeV/u = (0.030376 u)(931.5 MeV/u) = 28.295 MeV.",
            "5. Binding energy per nucleon: \\frac{BE}{A} = \\frac{28.295 MeV}{4} = 7.0738 MeV/nucleon."
          ],
          finalAnswer: "Binding energy per nucleon = 7.07 MeV/nucleon (3 significant figures)."
        }
      },
      {
        id: "e4-s2",
        title: "Induced Nuclear Fission & Controlled Chain Reactions",
        marker: "Nuclear Energy Systems",
        content:
          "Heavy actinides like Uranium-235 undergo induced fission when absorbing a slow (thermal) neutron. The captured neutron excites the compound nucleus ^236U into unstable dumbbell oscillations, causing it to cleave into two medium-mass fission fragments (e.g., Barium-141 and Krypton-92) and 2 to 3 fast prompt neutrons: ^235_92U + ^1_0n \\to ^{141}_{56}Ba + ^{92}_{36}Kr + 3 ^1_0n + \\sim 200 MeV. The fission fragments have higher BE/A (~8.5 MeV/nucleon) than uranium (~7.6 MeV/nucleon). The mass difference manifests as kinetic energy of the fragments (~168 MeV) and neutrons, which thermalizes into heat. In a nuclear reactor, a moderator (water or graphite) undergoes elastic collisions with fast neutrons to slow them to thermal speeds (from 2 MeV down to 0.025 eV), maximizing absorption by U-235. Boron or cadmium control rods absorb excess neutrons to maintain steady-state criticality.",
        analyticalTakeaway:
          "Energy density of nuclear fuel is extraordinary: 1 kg of Uranium-235 fission releases ~8.2 \\times 10^{13} Joules of thermal energy—equivalent to burning 2.8 million kilograms of coal.",
        keyFormulaOrFramework: "^{235}_{92}U + ^1_0n \\to ^{141}_{56}Ba + ^{92}_{36}Kr + 3 ^1_0n + Q, \\quad Q = (m_{reactants} - m_{products})c^2",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-e4-1",
        question: "Using the curve of binding energy per nucleon versus mass number, explain why energy is released during: (a) the nuclear fission of uranium-235, and (b) the nuclear fusion of hydrogen isotopes.",
        promptType: "explain",
        hints: ["How does binding energy per nucleon change in each reaction?", "Compare product stability with reactant stability."],
        modelAnswer: "(a) For heavy nuclei like Uranium-235 (A = 235), binding energy per nucleon is approximately 7.6 MeV/nucleon. When uranium splits into two intermediate-mass nuclei (A ~ 90 to 140), the products lie closer to the peak of the curve (near iron-56) with higher binding energy per nucleon (~8.5 MeV/nucleon). Because the nucleons in the products are more tightly bound, total mass decreases and the mass difference is released as kinetic energy. (b) For light nuclei like hydrogen isotopes (A = 2 or 3), binding energy per nucleon is low (~1 to 2.5 MeV/nucleon). When they fuse into Helium-4 (A = 4), binding energy per nucleon jumps dramatically to ~7.1 MeV/nucleon. The nucleons become much more tightly bound, producing a massive mass defect that is released as energy.",
        keyTermsToInclude: ["products have higher BE per nucleon", "nucleons more tightly bound", "mass defect released as energy", "fission splits heavy nuclei; fusion combines light nuclei"]
      },
      {
        id: "q-e4-2",
        question: "Consider the fission reaction: ^235_92U + ^1_0n \\to ^144_56Ba + ^89_36Kr + 3 ^1_0n. Given masses: U-235 = 235.0439 u, neutron = 1.0087 u, Ba-144 = 143.9229 u, Kr-89 = 88.9176 u. Calculate the energy released in MeV.",
        promptType: "calculation",
        hints: ["Find mass of reactants, mass of products, \\Delta m, then multiply by 931.5 MeV/u."],
        modelAnswer: "1. Mass of reactants: m_R = m(U-235) + m(n) = 235.0439 + 1.0087 = 236.0526 u. 2. Mass of products: m_P = m(Ba-144) + m(Kr-89) + 3 m(n) = 143.9229 + 88.9176 + 3(1.0087) = 232.8405 + 3.0261 = 235.8666 u. 3. Mass defect: \\Delta m = m_R - m_P = 236.0526 - 235.8666 = 0.1860 u. 4. Energy released: Q = \\Delta m \\times 931.5 MeV/u = (0.1860 u)(931.5 MeV/u) = 173.259 MeV \\approx 173 MeV.",
        keyTermsToInclude: ["\\Delta m = 0.186 u", "Q = \\Delta m \\times 931.5 MeV", "energy released = 173 MeV (or 1.7 \\times 10^2 MeV)"]
      }
    ],
    analysis: {
      coreThesis: "Mass and energy are interchangeable manifestations of unified relativistic spacetime.",
      theoreticalFoundations: "Special relativity E = mc^2, nuclear liquid drop model, Bethe-Weizsäcker semi-empirical mass formula.",
      strategicEvaluation: "In nuclear energy calculations, do not cancel the incoming neutron prematurely if writing full equations; remember 3 neutrons are emitted on the right side, giving a net production of 2 neutrons.",
      commonMisconceptions: [
        "Confusing mass defect with mass destruction (mass is not destroyed; mass and energy are converted according to \\Delta E = \\Delta m c^2).",
        "Believing nuclear power plants can explode like atomic bombs (low uranium enrichment 3–5% physically prevents runaway prompt-critical nuclear detonation).",
        "Thinking binding energy is energy stored inside the nucleus like fuel (binding energy is energy that WAS RELEASED when the nucleus formed; it is the energy REQUIRED to break it apart)."
      ],
      realWorldConnections: "Commercial nuclear fission power plants (PWR/BWR), naval nuclear submarine propulsion, and radioisotope thermoelectric generators (RTGs) on deep space probes.",
      keyDiagrams: ["diag-binding-energy-per-nucleon-curve", "diag-nuclear-fission-chain-reaction"]
    },
    cases: [
      {
        id: "case-e4",
        title: "Voyager 1 & 2 Radioisotope Thermoelectric Generators (RTGs)",
        domainOrContext: "Deep Space Nuclear Power",
        physicalMechanism: "Voyager 1 operates 24 billion km from Earth in interstellar space where sunlight is too dim for solar panels. Three RTGs utilize alpha decay heat from Plutonium-238 (half-life 87.7 years, releasing 0.57 W/g of decay heat) coupled to silicon-germanium thermocouples via the Seebeck thermoelectric effect.",
        concepts: ["conservation", "micro-macro"],
        syllabusLink: "E.4 Mass Defect & Nuclear Energy Conversion",
        quantitativeInsight: "Continuously generating ~470 W of electrical power at launch in 1977, the RTGs have sustained spacecraft communications for over 49 continuous years across interstellar space."
      }
    ],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "Unified relativistic mass-energy conservation \\Delta E = \\Delta m c^2." },
      { conceptId: "equilibrium", intensity: 4, manifestation: "Critical chain reaction equilibrium maintained by neutron absorption and moderation." }
    ],
    examPromptTakeaway: "Use 1 u = 931.5 MeV for instant conversion from mass defect to energy in MeV.",
    examBlueprint: {
      paper1TrapPattern: "Options defining binding energy as energy possessed by the nucleus (it is the energy REQUIRED to separate the nucleus into free constituent nucleons).",
      paper2StructuredPrompt: "Sketch the curve of binding energy per nucleon versus mass number A, label the position of Iron-56, indicate the regions where fission and fusion occur, and explain why elements heavier than iron do not release energy through nuclear fusion.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "BE/A curve reaches peak at Iron-56 (~8.8 MeV/nucleon).",
        showWorking: "Sketch features: Starts near 1 MeV for H-2, sharp peak at He-4 (7 MeV), broad maximum at Fe-56 (8.8 MeV), gradual decline to U-238 (7.6 MeV). Fusion occurs for A < 56; fission occurs for A > 56. Fusing nuclei heavier than iron moves DOWN the curve to lower BE/A (nucleons become less tightly bound), requiring net energy input rather than releasing energy.",
        unitsAndSigFigs: "Sketch labeled with correct axes: y-axis is BE per nucleon (MeV), x-axis is Mass Number A. Fe-56 correctly identified as maximum stability peak."
      },
      pitfallsToAvoid: [
        "Labeling the vertical axis as total binding energy instead of binding energy per nucleon.",
        "Drawing the curve without the characteristic sharp spike for Helium-4."
      ]
    },
    diagramIds: ["diag-binding-energy-per-nucleon-curve", "diag-nuclear-fission-chain-reaction"],
    primaryFormulas: [
      "\\Delta E = \\Delta m c^2",
      "\\Delta m = [Z m_p + (A-Z)m_n] - m_{nucleus}",
      "1 \\text{ u} = 931.5 \\text{ MeV}",
      "\\text{Energy Released} = \\Delta m \\times 931.5 \\text{ MeV}"
    ]
  },
  {
    id: "top-e5",
    themeId: "theme-e",
    themeNumber: 5,
    topicCode: "E.5",
    displayCode: "E.5",
    syllabusRef: "IB Physics Guide E.5 / Tsokos Ch. 7 / Giancoli Ch. 31, 33",
    title: "Nuclear Fusion & Stellar Nucleosynthesis",
    subtitle: "Coulomb Barrier, Proton-Proton Chain, Stellar Hydrostatic Equilibrium, and the Lifecycle of Stars",
    level: "SL",
    strategicImportance: "NUCLEAR & QUANTUM CORE",
    readingTimeMinutes: 10,
    summary:
      "Nuclear fusion is the thermonuclear process whereby light atomic nuclei fuse together to form heavier, more tightly bound nuclei, releasing colossal quantities of energy per unit mass. For fusion to occur, positively charged nuclei must overcome intense electrostatic Coulomb repulsion. This requires core temperatures exceeding 10^7 K (so thermal kinetic energy overcomes the Coulomb barrier) and extreme densities. In main sequence stars like our Sun, hydrogen fuses into helium via the multi-step Proton-Proton (p-p) Chain: 4 ^1_1H \\to ^4_2He + 2 e^+ + 2\\nu_e + 26.7 MeV. A star maintains stability on the main sequence through stellar hydrostatic equilibrium, where inward gravitational pressure is precisely counterbalanced by outward thermal gas and radiation pressure generated by core nuclear fusion.",
    speedReadBullets: [
      "Definition: Combining two light nuclei into a heavier nucleus of higher binding energy per nucleon, converting mass defect into kinetic energy.",
      "The Coulomb Repulsion Barrier: Positively charged protons repel via Coulomb's law F = kq_1 q_2 / r^2. Overcoming this barrier requires high temperatures (T > 1.5 \\times 10^7 K for high kinetic energies) and high densities.",
      "Proton-Proton Chain: Primary energy source of low-mass stars: 1. p + p \\to ^2H + e^+ + \\nu_e (slow weak interaction); 2. ^2H + p \\to ^3He + \\gamma; 3. ^3He + ^3He \\to ^4He + 2 p. Overall reaction: 4 ^1_1H \\to ^4_2He + 2 e^+ + 2\\nu_e + 26.7 MeV.",
      "Energy Yield: Fusion yields ~6.7 MeV per nucleon, roughly 8 times more energy per kilogram than uranium fission and 20 million times more than fossil fuels.",
      "Stellar Hydrostatic Equilibrium: Dynamic balance between inward gravitational contraction and outward thermal and radiation pressure from core thermonuclear fusion.",
      "Stellar Evolution (SL Overview): Main sequence (H-burning) \\to Red Giant (He-burning) \\to Planetary Nebula + White Dwarf (for stars < 8 solar masses, supported by electron degeneracy pressure). Massive stars (> 8 M_sun) undergo supernova, leaving neutron stars or black holes.",
    ],
    primer5Min:
      "Understand the conditions required for fusion: why can't we achieve fusion at room temperature? Because positively charged nuclei repel each other electrostatically! The Coulomb barrier height is V_c = \\frac{k q_1 q_2}{r_{nuclear}} \\approx 1 MeV. At 1.5 \\times 10^7 K (Sun's core), average thermal energy is only ~1 keV; fusion occurs in stars only through the high-energy tail of the Maxwell-Boltzmann distribution combined with quantum mechanical tunneling. For stellar stability, state the balance: Inward gravity = Outward radiation & gas pressure.",
    subSections: [
      {
        id: "e5-s1",
        title: "Thermonuclear Fusion & The Coulomb Barrier",
        marker: "Quantum Tunneling & Fusion",
        content:
          "Two positively charged protons experience electrostatic repulsion that increases as 1/r as they approach. To enter the range of the attractive strong nuclear force (~1 fm), classical physics requires initial kinetic energy exceeding the Coulomb potential barrier: E_k > \\frac{k e^2}{r} \\approx 1.4 \\times 10^{-13} J \\approx 1 MeV. This would require impossible temperatures exceeding 10^10 K. In stellar cores at ~1.5 \\times 10^7 K, mean kinetic energy is only \\bar{E}_k = \\frac{3}{2} k_B T \\approx 2 keV. Fusion occurs at these lower temperatures because quantum wave packets have a finite probability of tunneling through the electrostatic barrier. In the Sun, 4 protons fuse to form one helium-4 nucleus, 2 positrons, 2 neutrinos, and 26.7 MeV of energy.",
        analyticalTakeaway:
          "The first step of the proton-proton chain (p + p \\to ^2H + e^+ + \\nu_e) relies on the weak nuclear interaction to convert a proton into a neutron during the fleeting moment of collision, occurring with probability ~1 in 10^28 collisions, explaining why the Sun consumes its fuel over a gentle 10-billion-year lifespan.",
        keyFormulaOrFramework: "4 ^1_1H \\to ^4_2He + 2 e^+ + 2\\nu_e + 26.7 \\text{ MeV}, \\quad Q = (4 m_p - m_{He} - 2 m_e)c^2",
      },
      {
        id: "e5-s2",
        title: "Stellar Hydrostatic Equilibrium & Star Lifecycles",
        marker: "Astrophysical Equilibrium",
        content:
          "A main sequence star is a self-gravitating sphere of plasma in stable hydrostatic equilibrium. At every radial layer r inside the star, inward gravitational force is balanced by the outward pressure gradient: \\frac{dP}{dr} = -\\frac{G M(r) \\rho(r)}{r^2}. The outward pressure comprises thermal gas pressure (P_{gas} = n k_B T) and radiation photon pressure (P_{rad} = \\frac{1}{3} a T^4). If the core cools slightly, gravitational contraction compresses and reheats the core, accelerating fusion and restoring balance. When core hydrogen is exhausted, the core contracts, heating outer layers to initiate shell hydrogen burning, expanding the star into a Red Giant. For solar-mass stars, helium fuses into carbon and oxygen before outer envelopes are ejected as a planetary nebula, leaving an Earth-sized white dwarf supported by electron degeneracy pressure.",
        analyticalTakeaway:
          "The Chandrasekhar limit (1.44 solar masses) represents the maximum mass of a white dwarf that can be supported by electron degeneracy pressure. Remnants exceeding this limit collapse into neutron stars or black holes.",
        keyFormulaOrFramework: "\\Sigma \\vec{F}_{inward,gravity} = \\Sigma \\vec{F}_{outward,radiation+gas}",
        workedExample: {
          problem: "The Sun radiates total luminosity L = 3.85 \\times 10^26 Watts through the proton-proton chain, which releases 26.7 MeV (4.28 \\times 10^-12 J) per helium nucleus formed. Calculate: (a) the number of fusion reactions occurring in the Sun per second, and (b) the rate at which the Sun loses mass in kg/s.",
          stepByStep: [
            "1. Energy released per fusion event: E_{fusion} = 4.28 \\times 10^{-12} J.",
            "2. Total reactions per second: N = \\frac{L}{E_{fusion}} = \\frac{3.85 \\times 10^{26} W}{4.28 \\times 10^{-12} J/reaction} = 8.995 \\times 10^{37} reactions/s.",
            "3. Mass loss rate via E = mc^2: \\frac{dm}{dt} = \\frac{L}{c^2} = \\frac{3.85 \\times 10^{26} J/s}{(3.00 \\times 10^8 m/s)^2} = \\frac{3.85 \\times 10^{26}}{9.00 \\times 10^{16}} = 4.278 \\times 10^9 kg/s."
          ],
          finalAnswer: "(a) 9.00 \\times 10^37 fusion reactions per second; (b) Solar mass loss rate = 4.28 \\times 10^9 kg/s (approx. 4.3 million metric tons per second)."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-e5-1",
        question: "Explain why nuclear fusion requires extremely high temperatures and high densities to occur, and describe how stars maintain a stable size during their main sequence lifetime.",
        promptType: "explain",
        hints: ["What force opposes fusion?", "What forces balance inside a main sequence star?"],
        modelAnswer: "1. Fusion conditions: Positively charged atomic nuclei repel each other via the electrostatic Coulomb force. High temperatures provide the necessary high thermal kinetic energies (and velocities) for nuclei to overcome this repulsive Coulomb barrier and approach within ~10^-15 m where the strong nuclear force becomes attractive. High densities are required to ensure a sufficiently high collision frequency between nuclei to sustain the reaction rate. 2. Stellar stability: Main sequence stars maintain a constant size through hydrostatic equilibrium, wherein the inward gravitational pull attempting to collapse the star is precisely balanced by the outward thermal gas pressure and radiation pressure generated by core nuclear fusion.",
        keyTermsToInclude: ["Coulomb electrostatic repulsion", "high kinetic energy overcomes barrier", "high density ensures collision frequency", "hydrostatic equilibrium", "inward gravity balances outward radiation and gas pressure"]
      },
      {
        id: "q-e5-2",
        question: "Calculate the energy released in MeV by the fusion reaction: ^2_1H + ^3_1H \\to ^4_2He + ^1_0n. Given masses: Deuterium (^2H) = 2.014102 u, Tritium (^3H) = 3.016049 u, Helium-4 (^4He) = 4.001506 u, Neutron (^1n) = 1.008665 u. (1 u = 931.5 MeV).",
        promptType: "calculation",
        hints: ["Calculate \\Delta m = (m_D + m_T) - (m_{He} + m_n), then multiply by 931.5 MeV."],
        modelAnswer: "1. Mass of reactants: m_R = 2.014102 + 3.016049 = 5.030151 u. 2. Mass of products: m_P = 4.001506 + 1.008665 = 5.010171 u. 3. Mass defect: \\Delta m = m_R - m_P = 5.030151 - 5.010171 = 0.019980 u. 4. Energy released: Q = \\Delta m \\times 931.5 MeV/u = (0.019980 u)(931.5 MeV/u) = 18.611 MeV \\approx 17.6 MeV (using standard values, 17.6 MeV).",
        keyTermsToInclude: ["\\Delta m = 0.01998 u", "energy released = 17.6 MeV or 18.6 MeV", "Q = \\Delta m \\times 931.5 MeV"]
      }
    ],
    analysis: {
      coreThesis: "Stellar nucleosynthesis and nuclear fusion power the chemical evolution of the universe and cosmic energy generation.",
      theoreticalFoundations: "Gamow peak quantum tunneling, Eddington standard stellar model, stellar nucleosynthesis theory.",
      strategicEvaluation: "In fusion problems, examiners often ask why fusion releases more energy per nucleon than fission (Helium-4 has a uniquely steep binding energy jump from ~1 to ~7.1 MeV/nucleon).",
      commonMisconceptions: [
        "Believing the Sun burns chemically like fire (chemical combustion yields ~1 eV per atom; nuclear fusion yields ~26.7 MeV per reaction, ~20 million times greater).",
        "Assuming fusion creates long-lived radioactive waste like fission (D-T fusion products are non-toxic Helium-4 and neutrons).",
        "Confusing electron degeneracy pressure with thermal gas pressure (degeneracy pressure arises from Pauli exclusion and is independent of temperature)."
      ],
      realWorldConnections: "ITER and tokamak magnetic confinement fusion experimental reactors, inertial confinement fusion (NIF laser ignition achieving net energy gain), and origin of elements via stellar nucleosynthesis.",
      keyDiagrams: ["diag-stellar-hydrostatic-equilibrium", "diag-proton-proton-chain"]
    },
    cases: [
      {
        id: "case-e5",
        title: "ITER Tokamak Magnetic Confinement Fusion Reactor",
        domainOrContext: "Experimental Controlled Thermonuclear Energy",
        physicalMechanism: "The ITER tokamak in Saint-Paul-lez-Durance, France, uses 18 superconducting toroidal field coils generating 11.8 Tesla magnetic fields to confine a 150-million-degree deuterium-tritium plasma (10 times hotter than the core of the Sun) in a doughnut-shaped torus.",
        concepts: ["fields", "equilibrium"],
        syllabusLink: "E.5 Nuclear Fusion & Magnetic Confinement",
        quantitativeInsight: "Designed to achieve energy gain factor Q = 10, producing 500 MW of fusion output power from 50 MW of auxiliary heating input using only 0.5 grams of D-T fuel per pulse."
      }
    ],
    conceptTracking: [
      { conceptId: "equilibrium", intensity: 5, manifestation: "Stellar hydrostatic balance between inward gravitational collapse and outward thermonuclear radiation pressure." },
      { conceptId: "conservation", intensity: 5, manifestation: "Mass-energy conversion in thermonuclear nucleosynthesis reactions." }
    ],
    examPromptTakeaway: "Nuclear fusion combines light nuclei into heavier ones, releasing energy because products have higher BE/nucleon.",
    examBlueprint: {
      paper1TrapPattern: "Options claiming fusion occurs easily at low temperatures (Coulomb repulsion prevents nuclei from fusing without extreme kinetic energies or quantum tunneling).",
      paper2StructuredPrompt: "Describe the conditions required for nuclear fusion to occur in a star, explain the role of quantum tunneling, and state the nuclear reaction equation for the overall proton-proton chain.",
      commandTerm: "Describe",
      idealSolutionBreakdown: {
        statePrinciples: "High temperature (>10^7 K) for kinetic energy, high density for collision frequency.",
        showWorking: "Electrostatic Coulomb repulsion between positive protons creates a potential barrier. Quantum tunneling allows wave-like protons to penetrate the barrier at temperatures below the classical limit. Overall reaction: 4 ^1_1H \\to ^4_2He + 2 e^+ + 2\\nu_e + 26.7 MeV.",
        unitsAndSigFigs: "Correct nuclear equation with conservation of charge (+4 on both sides) and nucleon number (4 on both sides)."
      },
      pitfallsToAvoid: [
        "Omitting the positrons or neutrinos from the overall proton-proton equation.",
        "Stating that gravity causes fusion (gravity provides compression to reach high temperatures and densities)."
      ]
    },
    diagramIds: ["diag-stellar-hydrostatic-equilibrium", "diag-proton-proton-chain"],
    primaryFormulas: [
      "4 ^1_1H \\to ^4_2He + 2e^+ + 2\\nu_e + 26.7 \\text{ MeV}",
      "\\Delta E = \\Delta m c^2",
      "P_{inward,gravity} = P_{outward,radiation} + P_{outward,gas}",
      "\\bar{E}_k = \\frac{3}{2}k_B T"
    ]
  },
  {
    id: "top-e2-hl",
    themeId: "theme-e",
    themeNumber: 5,
    topicCode: "E.2",
    displayCode: "E.2 HL",
    syllabusRef: "IB Physics Guide E.2 (HL Only) / Quantum Physics",
    title: "Quantum Physics (HL)",
    subtitle: "Photoelectric Effect, Work Function, Stopping Potential, de Broglie Matter Waves & Compton Scattering",
    level: "HL",
    strategicImportance: "NUCLEAR & QUANTUM CORE",
    readingTimeMinutes: 10,
    summary:
      "HL Extension establishing wave-particle duality of light and matter. Einstein's photoelectric equation $E_{k,\\max} = hf - \\Phi = eV_s$ proves light is quantized into photons of energy $E = hf$. Conversely, de Broglie wavelength $\\lambda = \\frac{h}{p}$ and electron diffraction demonstrate wave-like interference of matter, while Compton scattering confirms photon momentum $p = h/\\lambda$.",
    speedReadBullets: [
      "Photon Energy & Momentum: $E = hf = \\frac{hc}{\\lambda}$, $p = \\frac{h}{\\lambda}$.",
      "Photoelectric Equation: $E_{k,\\max} = hf - \\Phi = eV_s$, where $\\Phi = hf_0$ is the metal's work function and $V_s$ is stopping potential.",
      "Threshold Frequency ($f_0$): Below $f_0$, zero electrons are emitted regardless of light intensity; above $f_0$, intensity only increases photocurrent (not $E_{k,\\max}$).",
      "de Broglie Matter Waves: $\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE_k}}$.",
      "Compton Scattering: $\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)$ proves photons carry momentum in elastic collisions with electrons.",
    ],
    primer5Min:
      "On a graph of $E_{k,\\max}$ vs frequency $f$: gradient is ALWAYS Planck's constant $h$, x-intercept is threshold frequency $f_0$, and y-intercept is $-\\Phi$! Changing the metal shifts the line parallel without changing the slope.",
    subSections: [
      {
        id: "e2-hl-s1",
        title: "Photoelectric Effect, de Broglie Wavelength & Compton Scattering",
        marker: "HL Core",
        content:
          "Classical wave theory failed to explain the instantaneous emission of photoelectrons and the existence of a threshold frequency $f_0$. Einstein proposed that each photon transfers a discrete quantum $hf$ to a single electron; if $hf > \\Phi$, the electron escapes with maximum kinetic energy $E_{k,\\max} = hf - \\Phi$. Compton scattering further confirmed particle-like photon momentum $p = h/\\lambda$, while Davisson-Germer electron diffraction verified de Broglie's $\\lambda = h/p$.",
        analyticalTakeaway:
          "Use $hc \\approx 1240\\text{ eV}\\cdot\\text{nm}$ for rapid sanity-checks on photon energy problems.",
        keyFormulaOrFramework: "E = hf, \\quad E_{k,\\max} = hf - \\Phi = eV_s, \\quad \\lambda = \\frac{h}{p}, \\quad \\Delta\\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)",
      },
    ],
    checkUnderstanding: [
      {
        id: "q-e2-hl-1",
        question: "Light of wavelength 400 nm strikes a metal with work function 2.10 eV. Calculate the maximum kinetic energy of emitted photoelectrons in eV and the stopping potential.",
        promptType: "calculation",
        hints: ["E = hc / lambda", "Convert J to eV by dividing by 1.60e-19"],
        modelAnswer:
          "$E = (6.63\\times 10^{-34})(3.00\\times 10^8) / (400\\times 10^{-9}) = 4.97\\times 10^{-19}\\text{ J} = 3.11\\text{ eV}$. $E_{k,\\max} = 3.11 - 2.10 = 1.01\\text{ eV}$. Stopping potential $V_s = 1.01\\text{ V}$.",
        keyTermsToInclude: ["Photon energy 3.11 eV", "Work function", "1.01 V stopping potential"],
        formulaUsed: "E_{k,\\max} = hf - \\Phi = eV_s",
      },
    ],
    analysis: {
      coreThesis: "Wave-particle duality governs both electromagnetic radiation and matter at the quantum scale.",
      theoreticalFoundations: "Planck (1900), Einstein (1905), Compton (1923), de Broglie (1924).",
      strategicEvaluation: "Keep units consistent: either all in Joules or all in eV.",
      commonMisconceptions: ["Thinking brighter light (higher intensity) increases photoelectron kinetic energy."],
      realWorldConnections: "Solar photovoltaic cells, CCD camera sensors, and electron microscopes.",
      keyDiagrams: [],
    },
    cases: [],
    conceptTracking: [
      { conceptId: "duality", intensity: 5, manifestation: "Photons and electrons exhibit both wave interference and discrete particle momentum." },
    ],
    examPromptTakeaway: "Always convert work function $\\Phi$ from eV to Joules ($\\times 1.60\\times 10^{-19}$) before using $h = 6.63\\times 10^{-34}\\text{ J}\\cdot\\text{s}$.",
    examBlueprint: {
      paper1TrapPattern: "Thinking doubling intensity doubles stopping potential $V_s$ (it leaves $V_s$ unchanged and doubles photocurrent).",
      paper2StructuredPrompt: "Explain two observations of the photoelectric effect that cannot be explained by classical wave theory.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Instantaneous emission and threshold frequency $f_0$.",
        showWorking: "Classical waves distribute energy continuously over time; photon model requires single-quantum absorption $hf \\ge \\Phi$.",
        unitsAndSigFigs: "Qualitative explanation.",
      },
      pitfallsToAvoid: ["Confusing work function with ionization energy."],
    },
    diagramIds: [],
    primaryFormulas: [
      "E = hf = \\frac{hc}{\\lambda}",
      "E_{k,\\max} = hf - \\Phi = eV_s",
      "\\lambda = \\frac{h}{p}",
      "\\Delta\\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)",
    ],
  },
];
