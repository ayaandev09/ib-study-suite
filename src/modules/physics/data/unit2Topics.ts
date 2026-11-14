import { TopicData } from "./types";

export const THEME_B_TOPICS: TopicData[] = [
  {
    id: "top-b1",
    themeId: "theme-b",
    themeNumber: 2,
    topicCode: "B.1",
    displayCode: "B.1",
    syllabusRef: "IB Physics Guide B.1 / Tsokos Ch. 3 / Giancoli Ch. 14",
    title: "Thermal Energy Transfers & Calorimetry",
    subtitle: "Internal Energy, Temperature Scales, Specific Heat Capacity, Latent Heat, and Conduction/Radiation",
    level: "SL",
    strategicImportance: "HIGH-YIELD THERMODYNAMICS",
    readingTimeMinutes: 10,
    summary:
      "Thermal physics examines the behavior of matter at atomic and molecular scales. Temperature is a measure of the average random translational kinetic energy of constituent particles, fundamentally defined on the Kelvin thermodynamic scale where 0 K represents absolute zero (-273.15 °C). Internal energy is the sum of total random kinetic energy and intermolecular potential energy of all particles. Heat transfer occurs via conduction, convection, and electromagnetic radiation. Thermal capacity, specific heat capacity (Q = mc\\Delta T), and specific latent heat (Q = mL) govern temperature changes and isobaric/isothermal phase transitions.",
    speedReadBullets: [
      "Temperature vs. Heat: Temperature is an intensive property proportional to average molecular kinetic energy; Heat (Q) is thermal energy transferred between systems due to a temperature difference.",
      "Internal Energy (U): U = \\Sigma E_k + \\Sigma E_p (sum of all random kinetic energies and intermolecular potential energies).",
      "Absolute Temperature: T (K) = \\theta (^{\\circ} C) + 273.15. At absolute zero (0 K), particle kinetic energy reaches its quantum mechanical minimum.",
      "Specific Heat Capacity: Energy required per unit mass to raise temperature by 1 K: c = \\frac{Q}{m\\Delta T} (SI unit: J kg^-1 K^-1).",
      "Phase Changes & Latent Heat: During phase change (melting, vaporizing), temperature remains strictly constant while absorbed energy breaks intermolecular bonds: Q = mL_f (fusion) or Q = mL_v (vaporization). Intermolecular potential energy increases while kinetic energy remains invariant.",
      "Heat Transfer Mechanisms: Conduction (lattice vibrations and free electron collisions in solids), Convection (density-driven fluid circulation currents), Radiation (electromagnetic infrared emission, requiring no material medium).",
    ],
    primer5Min:
      "When solving calorimetry mixing problems (e.g., dropping hot metal into water with calorimeter cup), write a strict conservation equation: Heat Lost by Hot System = Heat Gained by Cold System + Calorimeter. Watch out for phase changes: if ice melts, it requires latent heat Q = mL_f before the resulting liquid water warms up via Q = mc\\Delta T. Remember: on a temperature-time heating graph, flat plateaus represent phase changes (latent heat), while sloping lines represent heating within a single phase (specific heat capacity c = P / (m \\times \\text{gradient})).",
    subSections: [
      {
        id: "b1-s1",
        title: "Microscopic Nature of Temperature & Internal Energy",
        marker: "Thermodynamic Foundations",
        content:
          "Matter consists of atoms and molecules in incessant random motion. Internal energy U is the sum of all microscopic kinetic energies (translational, rotational, vibrational) and intermolecular potential energies resulting from electrostatic forces between atoms. Absolute temperature T in Kelvin is directly proportional to the mean translational kinetic energy per molecule: \\bar{E}_k = \\frac{3}{2} k_B T, where k_B = 1.38 \\times 10^{-23} J K^-1 is Boltzmann's constant. Thermal equilibrium occurs when two bodies in contact reach identical temperatures, with net thermal energy flux dropping to zero.",
        analyticalTakeaway:
          "An ideal gas has zero intermolecular potential energy (E_p = 0) because intermolecular forces are assumed zero. Therefore, the internal energy of an ideal gas depends solely on temperature: U = \\frac{3}{2} n R T.",
        keyFormulaOrFramework: "\\bar{E}_k = \\frac{3}{2} k_B T, \\quad T(K) = \\theta(^{\\circ} C) + 273",
      },
      {
        id: "b1-s2",
        title: "Specific Heat Capacity & Calorimetry",
        marker: "Calorimetric Measurements",
        content:
          "Specific heat capacity c is defined as the thermal energy required to increase the temperature of 1 kg of a substance by 1 Kelvin: c = \\frac{Q}{m \\Delta T}. Heat capacity C is the energy required to raise the temperature of the entire body by 1 K: C = mc = \\frac{Q}{\\Delta T}. In electrical method-of-mixtures experiments, thermal energy supplied electrically is Q = V I t. If heat losses to the ambient surroundings occur, the experimental value of c will be systematically overestimated.",
        analyticalTakeaway:
          "Water has an exceptionally high specific heat capacity (c_w \\approx 4186 J kg^-1 K^-1), allowing oceans and maritime climates to buffer seasonal temperature extremes through massive thermal inertia.",
        keyFormulaOrFramework: "Q = mc\\Delta T, \\quad Q = C\\Delta T, \\quad Q = V I t",
        workedExample: {
          problem: "A 0.45 kg copper calorimeter contains 0.30 kg of water at 18.0 °C. A 0.25 kg sample of unknown metal heated to 100.0 °C is dropped into the water. The final equilibrium temperature is 23.5 °C. Given c_{water} = 4186 J kg^-1 K^-1 and c_{copper} = 385 J kg^-1 K^-1, calculate the specific heat capacity of the unknown metal.",
          stepByStep: [
            "1. Heat gained by water: Q_w = m_w c_w \\Delta T = (0.30)(4186)(23.5 - 18.0) = (0.30)(4186)(5.5) = 6906.9 J.",
            "2. Heat gained by copper container: Q_c = m_c c_c \\Delta T = (0.45)(385)(5.5) = 952.88 J.",
            "3. Total heat gained: Q_{gained} = 6906.9 + 952.88 = 7859.78 J.",
            "4. Heat lost by metal: Q_{lost} = m_m c_m (100.0 - 23.5) = (0.25)(c_m)(76.5) = 19.125 c_m.",
            "5. Conserve energy: Q_{lost} = Q_{gained} \\implies 19.125 c_m = 7859.78 \\implies c_m = 7859.78 / 19.125 = 410.97 J kg^-1 K^-1."
          ],
          finalAnswer: "Specific heat capacity of metal = 410 J kg^-1 K^-1 (2 significant figures, consistent with brass/iron)."
        }
      },
      {
        id: "b1-s3",
        title: "Specific Latent Heat & Phase Transitions",
        marker: "Molecular Bond Breaking",
        content:
          "Specific latent heat L is the energy required to change the state of 1 kg of a substance at constant temperature: L = \\frac{Q}{m}. Latent heat of fusion L_f relates to solid-liquid transitions, while latent heat of vaporization L_v relates to liquid-gas transitions. L_v is substantially larger than L_f because vaporization requires performing extensive mechanical work against atmospheric pressure and completely overcoming intermolecular cohesive bonds to separate molecules to infinite distances.",
        analyticalTakeaway:
          "During boiling or melting, molecular kinetic energy remains constant (constant temperature); all supplied energy increases intermolecular electrostatic potential energy.",
        keyFormulaOrFramework: "Q = mL_f, \\quad Q = mL_v, \\quad L_v \\gg L_f",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-b1-1",
        question: "Explain, in terms of microscopic molecular behavior, why the temperature of a boiling liquid remains constant even though thermal energy is continuously supplied.",
        promptType: "explain",
        hints: ["What determines temperature?", "Where does the supplied energy go?"],
        modelAnswer: "Temperature is a measure of the average random kinetic energy of the molecules. During boiling, the supplied thermal energy does not increase the kinetic energy of the particles; instead, it does work against intermolecular attractive forces to separate molecules into the vapor phase, increasing their intermolecular potential energy. Because average molecular kinetic energy remains constant, temperature remains strictly constant.",
        keyTermsToInclude: ["temperature measures average kinetic energy", "supplied energy increases potential energy", "work done against intermolecular forces", "kinetic energy constant"]
      },
      {
        id: "q-b1-2",
        question: "Calculate the energy required to convert 0.050 kg of ice at -10.0 °C to steam at 100.0 °C. (c_{ice} = 2100, c_{water} = 4186 J kg^-1 K^-1, L_f = 3.34 \\times 10^5, L_v = 2.26 \\times 10^6 J kg^-1).",
        promptType: "calculation",
        hints: ["Break into 4 sequential steps: warming ice, melting ice, warming water, vaporizing water."],
        modelAnswer: "Step 1: Warm ice (-10 to 0 °C): Q_1 = mc\\Delta T = (0.050)(2100)(10) = 1050 J. Step 2: Melt ice at 0 °C: Q_2 = mL_f = (0.050)(3.34 \\times 10^5) = 16,700 J. Step 3: Warm water (0 to 100 °C): Q_3 = mc\\Delta T = (0.050)(4186)(100) = 20,930 J. Step 4: Vaporize water at 100 °C: Q_4 = mL_v = (0.050)(2.26 \\times 10^6) = 113,000 J. Total Q = 1050 + 16700 + 20930 + 113000 = 151,680 J = 1.5 \\times 10^5 J.",
        keyTermsToInclude: ["Q_total = 1.5 \\times 10^5 J", "four distinct thermodynamic steps", "latent heat dominates total energy"]
      }
    ],
    analysis: {
      coreThesis: "Macroscopic thermal phenomena are direct statistical consequences of microscopic energy partitioning.",
      theoreticalFoundations: "Maxwell-Boltzmann distribution, zeroth and first laws of thermodynamics.",
      strategicEvaluation: "In heating-rate problems, remember that electrical power P = VI equals rate of heat input dQ/dt. On a T-t graph, gradient = dT/dt = P / (mc), so steeper slopes indicate smaller heat capacities.",
      commonMisconceptions: [
        "Thinking heat and temperature are the same thing (heat is energy in transit; temperature is intensive kinetic state).",
        "Assuming steam burns are equivalent to boiling water burns (steam deposits additional 2.26 MJ/kg of latent heat upon condensing on skin).",
        "Using Celsius instead of Kelvin when calculating ratios of absolute temperatures."
      ],
      realWorldConnections: "Thermal protection heat-shields on spacecraft atmospheric reentry, nuclear reactor emergency core cooling systems, and phase-change materials for building thermal regulation.",
      keyDiagrams: ["diag-heating-curve-phase-change", "diag-calorimetry-schematic"]
    },
    cases: [
      {
        id: "case-b1",
        title: "Orion Crew Capsule Ablative Heat Shield",
        domainOrContext: "Spacecraft Reentry Aerothermodynamics",
        physicalMechanism: "During atmospheric reentry at 11 km/s, shock-layer temperatures reach 2800 °C. The Avcoat ablator absorbs heat through endothermic pyrolysis and vaporization (latent heat of sublimation), carrying thermal energy away in charred gas layers.",
        concepts: ["conservation", "micro-macro"],
        syllabusLink: "B.1 Specific Latent Heat Q = mL",
        quantitativeInsight: "The ablative material absorbs up to 15 MJ/kg of thermal energy through phase change and outgassing, maintaining cabin interior below a comfortable 25 °C."
      }
    ],
    conceptTracking: [
      { conceptId: "micro-macro", intensity: 5, manifestation: "Macroscopic temperature as statistical average of microscopic particle kinetic energy." },
      { conceptId: "conservation", intensity: 5, manifestation: "Thermal energy conservation in closed calorimetric systems." }
    ],
    examPromptTakeaway: "Always check for phase change plateaus on temperature-time curves before applying Q = mc\\Delta T.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for internal energy of an ideal gas where options include potential energy (ideal gases possess ZERO intermolecular potential energy).",
      paper2StructuredPrompt: "An electric kettle rated at 2.2 kW contains 1.2 kg of water at 20.0 °C. Calculate the time taken to bring the water to boiling point, and the additional time required to vaporize 0.15 kg of the water. State two assumptions made in your calculation.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Electrical power equals rate of thermal energy transfer: P t = Q = mc\\Delta T + mL_v.",
        showWorking: "Time to boil: Q_1 = (1.2)(4186)(80) = 401,856 J; t_1 = 401,856 / 2200 = 182.7 s \\approx 180 s. Time to boil off 0.15 kg: Q_2 = (0.15)(2.26 \\times 10^6) = 339,000 J; t_2 = 339,000 / 2200 = 154.1 s \\approx 150 s.",
        unitsAndSigFigs: "Boiling time = 180 s (3.0 mins); Vaporization time = 150 s (2.5 mins). Assumptions: Zero heat loss to ambient air or kettle casing, and constant electrical supply power."
      },
      pitfallsToAvoid: [
        "Neglecting the heat capacity of the kettle vessel if specified in the question.",
        "Confusing power (Watts) with energy (Joules)."
      ]
    },
    diagramIds: ["diag-heating-curve-phase-change", "diag-calorimetry-schematic"],
    primaryFormulas: [
      "Q = mc\\Delta T",
      "Q = mL",
      "\\bar{E}_k = \\frac{3}{2}k_B T",
      "T(K) = \\theta(^{\\circ} C) + 273.15",
      "P = \\frac{\\Delta Q}{\\Delta t} = VI"
    ]
  },
  {
    id: "top-b2",
    themeId: "theme-b",
    themeNumber: 2,
    topicCode: "B.2",
    displayCode: "B.2",
    syllabusRef: "IB Physics Guide B.2 / Tsokos Ch. 8 / Giancoli Ch. 14",
    title: "Greenhouse Effect & Earth's Energy Balance",
    subtitle: "Black-Body Radiation, Stefan-Boltzmann Law, Wien's Displacement Law, Albedo, and Climate Radiative Equilibrium",
    level: "SL",
    strategicImportance: "HIGH-YIELD CLIMATE PHYSICS",
    readingTimeMinutes: 10,
    summary:
      "The greenhouse effect governs Earth's planetary thermal equilibrium. All matter at non-zero absolute temperature emits continuous electromagnetic radiation. An idealized black body absorbs all incident radiation and re-emits with 100% emissivity (e = 1). The total radiant power emitted per unit area follows the Stefan-Boltzmann law (P/A = \\sigma T^4), while peak emission wavelength is inversely proportional to temperature via Wien's displacement law (\\lambda_{max} T = 2.9 \\times 10^-3 m K). Incoming solar irradiance (solar constant S \\approx 1360 W/m^2) is partially reflected by Earth's albedo (\\alpha \\approx 0.30). The surface re-emits longwave infrared radiation, which is absorbed by polyatomic greenhouse gas molecules (CO2, H2O, CH4) through molecular vibrational resonance and re-radiated omnidirectionally, warming the troposphere.",
    speedReadBullets: [
      "Black-Body Radiator: An idealized theoretical physical body that absorbs all incident electromagnetic radiation without reflection (absorptivity = 1, emissivity e = 1).",
      "Stefan-Boltzmann Law: Total radiated power P = e \\sigma A T^4, where \\sigma = 5.67 \\times 10^-8 W m^-2 K^-4 is the Stefan-Boltzmann constant, and T is absolute temperature in Kelvin.",
      "Wien's Displacement Law: \\lambda_{max} T = 2.9 \\times 10^-3 m K. Higher temperatures shift peak emission toward shorter wavelengths (Sun emits peak visible light ~500 nm; Earth at ~288 K emits peak infrared ~10 \\mu m).",
      "Solar Constant (S): Power incident per unit area perpendicular to rays at Earth's average orbital distance: S \\approx 1.36 \\times 10^3 W m^-2.",
      "Planetary Albedo (\\alpha): Ratio of total scattered/reflected power to total incident solar power: \\alpha = \\frac{\\text{reflected power}}{\\text{incident power}} (Earth global average \\alpha \\approx 0.30).",
      "Earth Surface Radiation Balance: Average incoming solar power per unit surface area is \\frac{S(1-\\alpha)}{4} \\approx 238 W m^-2 (due to spherical geometry A_{disk} = \\pi R^2 vs A_{sphere} = 4\\pi R^2).",
      "Greenhouse Gas Mechanism: Polyatomic molecules (H2O, CO2, CH4, N2O) have discrete vibrational energy states that resonate with infrared photon frequencies, absorbing upward terrestrial IR and re-radiating back toward Earth.",
    ],
    primer5Min:
      "When setting up Earth's energy balance model, always remember the factor of 4! The Earth intercepts sunlight over a circular cross-section \\pi R^2, but radiates outward over its entire spherical surface area 4\\pi R^2. Without the atmosphere, equating incoming solar radiation \\frac{S(1-\\alpha)}{4} to outgoing Stefan-Boltzmann emission \\sigma T^4 yields an uninhabitable surface temperature of ~255 K (-18 °C). The natural greenhouse effect raises mean surface temperature by +33 K to a hospitable ~288 K (+15 °C).",
    subSections: [
      {
        id: "b2-s1",
        title: "Black-Body Radiation & Emission Spectra",
        marker: "Thermal Emission Laws",
        content:
          "All bodies at absolute temperature T emit thermal electromagnetic radiation. A black body is an idealized radiator whose emission spectrum depends solely on temperature, independent of composition. Stefan-Boltzmann Law states that total radiant power emitted is proportional to the fourth power of absolute temperature: P = e \\sigma A T^4, where emissivity e = 1 for a perfect black body and 0 < e < 1 for gray bodies. Wien's displacement law governs spectral peak wavelength: \\lambda_{max} T = 2.90 \\times 10^{-3} m K. As temperature increases, the emission curve's peak shifts to higher frequencies and total area under the curve increases dramatically.",
        analyticalTakeaway:
          "Doubling the absolute temperature of a star increases its radiated power per unit area by a factor of 2^4 = 16, and halves the peak emission wavelength \\lambda_{max}.",
        keyFormulaOrFramework: "P = e \\sigma A T^4, \\quad \\lambda_{max} T = 2.90 \\times 10^{-3} m K",
      },
      {
        id: "b2-s2",
        title: "Planetary Albedo & The Solar Constant",
        marker: "Global Energy Budget",
        content:
          "The solar constant S is the radiant power from the Sun incident per unit area at the top of Earth's atmosphere perpendicular to the rays: S = \\frac{L_{sun}}{4\\pi d^2} \\approx 1361 W m^-2. Albedo \\alpha is the fraction of incident power reflected back into space: \\alpha = \\frac{P_{reflected}}{P_{incident}}. Ice and snow possess high albedos (\\alpha \\approx 0.85), whereas open ocean water possesses low albedo (\\alpha \\approx 0.06). Global mean albedo is \\alpha \\approx 0.30. Earth intercepts total solar power P_{in} = S (1 - \\alpha) \\pi R^2. Radiating as a sphere of area 4\\pi R^2, average absorbed solar flux is \\frac{S(1-\\alpha)}{4} \\approx 238 W m^-2.",
        analyticalTakeaway:
          "The ice-albedo positive feedback loop: Melting Arctic ice replaces reflective white ice (high albedo) with dark sea water (low albedo), increasing absorbed solar radiation and driving further warming.",
        keyFormulaOrFramework: "I_{avg} = \\frac{S(1 - \\alpha)}{4}, \\quad \\alpha = \\frac{\\text{Total Reflected Power}}{\\text{Total Incident Power}}",
        workedExample: {
          problem: "Assuming Earth behaves as a black body with zero atmosphere and global albedo \\alpha = 0.30, calculate its theoretical equilibrium surface temperature under solar constant S = 1360 W/m^2. (\\sigma = 5.67 \\times 10^-8 W m^-2 K^-4).",
          stepByStep: [
            "1. Radiative equilibrium requires Absorbed Solar Power = Emitted Blackbody Power.",
            "2. Absorbed solar power: P_{in} = S (1 - \\alpha) \\pi R^2.",
            "3. Emitted thermal power: P_{out} = \\sigma (4\\pi R^2) T^4.",
            "4. Equate and cancel \\pi R^2: S (1 - \\alpha) = 4 \\sigma T^4.",
            "5. Solve for T: T = \\left[ \\frac{S (1 - \\alpha)}{4 \\sigma} \\right]^{1/4} = \\left[ \\frac{1360 (0.70)}{4 (5.67 \\times 10^{-8})} \\right]^{1/4} = \\left[ \\frac{952}{2.268 \\times 10^{-7}} \\right]^{1/4} = [4.1975 \\times 10^9]^{1/4} = 254.6 K."
          ],
          finalAnswer: "Theoretical bare-rock equilibrium temperature = 255 K (-18 °C). The actual surface temperature of 288 K is maintained by the atmospheric greenhouse effect."
        }
      },
      {
        id: "b2-s3",
        title: "The Enhanced Greenhouse Effect & Molecular Resonance",
        marker: "Atmospheric Radiative Forcing",
        content:
          "The surface of the Earth, at approximately 288 K, emits longwave infrared radiation with peak wavelength \\lambda_{max} \\approx 10 \\mu m. Greenhouse gases (CO2, H2O, CH4, N2O, O3) are triatomic or polyatomic molecules whose vibrational and bending natural frequencies resonate with infrared photons. When an IR photon matches a molecular vibrational energy transition \\Delta E = hf, it is absorbed, inducing molecular dipole oscillations. The molecule de-excites by re-emitting an infrared photon in a random direction (half directed back down toward the Earth's surface). Industrial emissions enhance this absorption, causing a net radiative imbalance called climate forcing.",
        analyticalTakeaway:
          "Diatomic symmetric atmospheric gases (N2 and O2, comprising 99% of dry air) have zero electric dipole moment change during vibration, rendering them transparent to infrared radiation and incapable of greenhouse absorption.",
        keyFormulaOrFramework: "P_{surface} = P_{solar,absorbed} + P_{greenhouse,back-radiation}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-b2-1",
        question: "Explain why nitrogen (N2) and oxygen (O2) do not act as greenhouse gases, whereas carbon dioxide (CO2) and methane (CH4) do.",
        promptType: "explain",
        hints: ["Think about molecular symmetry and dipole moments during vibrational excitation."],
        modelAnswer: "Greenhouse gas absorption requires an oscillating electric dipole moment that can couple with the oscillating electric field of an infrared electromagnetic wave. Diatomic homonuclear molecules like N2 and O2 possess perfect symmetry with no charge displacement during vibration, so they have zero dipole moment and cannot absorb IR photons. Polyatomic molecules like CO2 and CH4 have bending and asymmetric stretching modes that create transient electric dipole moments, allowing resonant absorption of infrared radiation.",
        keyTermsToInclude: ["oscillating electric dipole moment", "homonuclear diatomic molecules symmetric", "polyatomic bending and stretching modes", "infrared absorption"]
      },
      {
        id: "q-b2-2",
        question: "The surface temperature of a star is 5800 K. Calculate its peak emission wavelength, and state the region of the electromagnetic spectrum where this peak occurs.",
        promptType: "calculation",
        hints: ["Use Wien's displacement law \\lambda_{max} T = 2.9 \\times 10^-3 m K."],
        modelAnswer: "Using Wien's displacement law: \\lambda_{max} = \\frac{2.90 \\times 10^{-3} m K}{5800 K} = 5.00 \\times 10^{-7} m = 500 nm. This peak wavelength lies in the visible region of the electromagnetic spectrum (specifically blue-green light).",
        keyTermsToInclude: ["\\lambda_{max} = 5.0 \\times 10^{-7} m = 500 nm", "visible light spectrum", "Wien's displacement law"]
      }
    ],
    analysis: {
      coreThesis: "Planetary climate is determined by radiative equilibrium between intercepted shortwave solar irradiance and re-radiated longwave terrestrial infrared.",
      theoreticalFoundations: "Planck's radiation law, Stefan-Boltzmann law, Wien's law, and molecular quantum vibrational transitions.",
      strategicEvaluation: "In exam questions involving planetary energy balance models, always pay close attention to whether the atmosphere is treated as a single absorbing layer or a multi-layer model with specified emissivity e.",
      commonMisconceptions: [
        "Confusing the ozone layer depletion (UV absorption in stratosphere) with the greenhouse effect (IR absorption in troposphere).",
        "Believing greenhouse gases reflect infrared radiation like a mirror (they absorb photons and re-emit them omnidirectionally).",
        "Forgetting the geometric factor of 4 when calculating average solar flux over the spherical Earth."
      ],
      realWorldConnections: "Earth radiation budget satellites (CERES), runaway greenhouse effect on Venus (460 °C surface temperature), and solar thermal concentration collectors.",
      keyDiagrams: ["diag-earth-energy-balance", "diag-blackbody-curves"]
    },
    cases: [
      {
        id: "case-b2",
        title: "Venusian Runaway Greenhouse Effect",
        domainOrContext: "Comparative Planetary Atmospheres",
        physicalMechanism: "Venus intercepts ~2600 W/m^2 solar flux. Despite a high cloud albedo (\\alpha \\approx 0.77), its dense 93-bar CO2 atmosphere traps nearly 99% of surface infrared emission, sustaining a furnace-like equilibrium temperature of 737 K (464 °C), hot enough to melt lead.",
        concepts: ["equilibrium", "micro-macro"],
        syllabusLink: "B.2 Greenhouse Effect & Blackbody Radiation",
        quantitativeInsight: "Atmospheric greenhouse warming on Venus exceeds +500 K, compared to Earth's +33 K, proving the critical sensitivity of planetary temperature to infrared optical depth."
      }
    ],
    conceptTracking: [
      { conceptId: "equilibrium", intensity: 5, manifestation: "Planetary radiative equilibrium where absorbed solar power equals emitted infrared power." },
      { conceptId: "micro-macro", intensity: 4, manifestation: "Molecular vibrational resonance states governing global macroscopic climate temperatures." }
    ],
    examPromptTakeaway: "Always state the Stefan-Boltzmann law with absolute temperature T in Kelvin raised to the fourth power.",
    examBlueprint: {
      paper1TrapPattern: "Options using temperatures in Celsius when calculating radiated power (e.g., doubling temperature from 20 °C to 40 °C does NOT increase radiation by 2^4 = 16 times).",
      paper2StructuredPrompt: "A proposed geoengineering solar radiation modification project plans to increase Earth's global albedo from 0.30 to 0.32 by injecting reflective aerosols into the stratosphere. Calculate the theoretical decrease in mean surface temperature, assuming emissivity e = 1.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Radiative equilibrium: T = [S(1-\\alpha) / (4\\sigma)]^{1/4}.",
        showWorking: "For \\alpha = 0.30: T_1 = 254.6 K. For \\alpha = 0.32: T_2 = [1360(0.68) / (4 \\times 5.67 \\times 10^{-8})]^{1/4} = [924.8 / (2.268 \\times 10^{-7})]^{1/4} = [4.0776 \\times 10^9]^{1/4} = 252.8 K. Temperature drop \\Delta T = 254.6 - 252.8 = 1.8 K.",
        unitsAndSigFigs: "Theoretical temperature decrease = 1.8 K (or 1.8 °C)."
      },
      pitfallsToAvoid: [
        "Attempting linear interpolation on T^4 dependencies.",
        "Confusing Kelvin temperature changes with Celsius scales (a change \\Delta T of 1.8 K is identical to 1.8 °C)."
      ]
    },
    diagramIds: ["diag-earth-energy-balance", "diag-blackbody-curves"],
    primaryFormulas: [
      "P = e\\sigma A T^4",
      "\\lambda_{max} T = 2.90 \\times 10^{-3} m K",
      "I = \\frac{P}{4\\pi r^2}",
      "\\alpha = \\frac{\\text{Reflected Power}}{\\text{Incident Power}}",
      "I_{absorbed} = \\frac{S(1-\\alpha)}{4}"
    ]
  },
  {
    id: "top-b3",
    themeId: "theme-b",
    themeNumber: 2,
    topicCode: "B.3",
    displayCode: "B.3",
    syllabusRef: "IB Physics Guide B.3 / Tsokos Ch. 3 / Giancoli Ch. 13",
    title: "Gas Laws & Kinetic Theory of Gases",
    subtitle: "Ideal Gas Equation, Kinetic Molecular Postulates, Pressure Derivation, and Temperature Equipartition",
    level: "SL",
    strategicImportance: "HIGH-YIELD THERMODYNAMICS",
    readingTimeMinutes: 10,
    summary:
      "The kinetic theory of gases bridges microscopic Newtonian particle collisions with macroscopic thermodynamic variables (pressure p, volume V, temperature T, and amount of substance n). An ideal gas is a theoretical construct obeying the equation of state pV = nRT = N k_B T under all conditions. Microscopic derivation reveals that gas pressure results from the rate of change of momentum when particles collide elastically with container walls: p = \\frac{1}{3}\\rho \\overline{c^2}. Temperature is proven to be directly proportional to the average random translational kinetic energy per molecule: \\bar{E}_k = \\frac{3}{2} k_B T = \\frac{3}{2} \\frac{R}{N_A} T. Real gases deviate from ideal behavior at high pressures and low temperatures.",
    speedReadBullets: [
      "Ideal Gas Equation of State: pV = nRT = N k_B T, where R = 8.31 J mol^-1 K^-1 (molar gas constant), k_B = 1.38 \\times 10^-23 J K^-1 (Boltzmann constant), and N = n N_A.",
      "Mole & Avogadro's Constant: 1 mole contains N_A = 6.02 \\times 10^23 elementary entities.",
      "Five Kinetic Theory Assumptions: 1. Identical point particles of negligible volume compared to container volume; 2. Completely elastic collisions (kinetic energy conserved); 3. Negligible intermolecular forces except during instantaneous collisions; 4. Incessant random motion in all directions; 5. Collision duration is negligible compared to time between collisions.",
      "Microscopic Origin of Pressure: Particles colliding elastically with a wall undergo momentum change \\Delta p = 2mv. Force exerted on the wall is F = \\Delta p / \\Delta t. Pressure is force per unit area: p = F / A = \\frac{1}{3} \\frac{N m \\overline{c^2}}{V} = \\frac{1}{3} \\rho \\overline{c^2}.",
      "Molecular Kinetic Energy: Average kinetic energy per molecule depends solely on absolute temperature: \\bar{E}_k = \\frac{1}{2} m \\overline{c^2} = \\frac{3}{2} k_B T.",
      "Real Gas Deviations: Real gases behave ideally only at LOW pressure and HIGH temperature. Deviations occur at high pressure (molecular volume becomes non-negligible) and low temperature (intermolecular attractions cause condensation).",
    ],
    primer5Min:
      "When comparing two states of a gas with fixed mass, use the combined gas law: \\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}. Always convert temperature to Kelvin immediately: T = \\theta + 273. Remember that on a p-V diagram: an isothermal curve (T = constant) is a rectangular hyperbola (pV = constant); an isobaric line (p = constant) is horizontal; an isochoric line (V = constant) is vertical.",
    subSections: [
      {
        id: "b3-s1",
        title: "The Empirical Gas Laws & Ideal Gas Equation",
        marker: "Macroscopic Thermodynamics",
        content:
          "Boyle's Law states that at constant temperature, pressure is inversely proportional to volume: p \\propto 1/V (pV = \\text{constant}). Charles's Law states that at constant pressure, volume is directly proportional to absolute temperature: V \\propto T. Gay-Lussac's (Pressure) Law states that at constant volume, pressure is directly proportional to absolute temperature: p \\propto T. Combining these empirical observations yields the ideal gas equation of state: pV = nRT, where n is number of moles and R is the ideal gas constant (8.31 J mol^-1 K^-1). In terms of total molecules N: pV = N k_B T.",
        analyticalTakeaway:
          "Graphing p versus 1/V yields a straight line through the origin whose gradient equals nRT. Extrapolating a p versus \\theta (°C) graph at constant volume back to zero pressure intersects the temperature axis precisely at -273.15 °C (absolute zero).",
        keyFormulaOrFramework: "pV = nRT = N k_B T, \\quad \\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}",
        workedExample: {
          problem: "A rigid diving cylinder of volume 12.0 liters contains compressed air at a pressure of 200 bar (2.00 \\times 10^7 Pa) at 20.0 °C. The diver breathes underwater where the temperature is 8.0 °C and the ambient pressure is 3.50 bar (3.50 \\times 10^5 Pa). Calculate the volume of air available to the diver at this depth.",
          stepByStep: [
            "1. Identify constants: Mass of air is constant, so \\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}.",
            "2. Convert temperatures to Kelvin: T_1 = 20.0 + 273.15 = 293.15 K; T_2 = 8.0 + 273.15 = 281.15 K.",
            "3. Convert volumes/pressures: V_1 = 12.0 L; p_1 = 2.00 \\times 10^7 Pa; p_2 = 3.50 \\times 10^5 Pa.",
            "4. Rearrange for V_2: V_2 = V_1 \\left( \\frac{p_1}{p_2} \\right) \\left( \\frac{T_2}{T_1} \\right).",
            "5. Compute: V_2 = 12.0 \\times \\left( \\frac{2.00 \\times 10^7}{3.50 \\times 10^5} \\right) \\times \\left( \\frac{281.15}{293.15} \\right) = 12.0 \\times 57.143 \\times 0.95907 = 657.6 L."
          ],
          finalAnswer: "Available breathing volume = 658 liters (3 significant figures)."
        }
      },
      {
        id: "b3-s2",
        title: "Kinetic Derivation of Pressure & Temperature",
        marker: "Microscopic Mechanics",
        content:
          "Consider N particles of mass m in a cubic container of side L and volume V = L^3. A particle moving with velocity component c_x toward a wall perpendicular to the x-axis collides elastically, rebounding with velocity -c_x. Momentum transferred to the wall per collision is \\Delta p_x = 2mc_x. The time between successive collisions with the same wall is \\Delta t = \\frac{2L}{c_x}. Average force exerted by one particle is F = \\frac{\\Delta p}{\\Delta t} = \\frac{2mc_x}{2L/c_x} = \\frac{m c_x^2}{L}. Summing over all N particles and assuming isotropic motion (\\overline{c_x^2} = \\frac{1}{3}\\overline{c^2}): total force is F = \\frac{N m \\overline{c^2}}{3L}. Pressure p = \\frac{F}{L^2} = \\frac{1}{3} \\frac{N m \\overline{c^2}}{V}. Equating with pV = N k_B T reveals \\bar{E}_k = \\frac{1}{2}m\\overline{c^2} = \\frac{3}{2}k_B T.",
        analyticalTakeaway:
          "Root-mean-square speed c_{rms} = \\sqrt{\\overline{c^2}} = \\sqrt{\\frac{3k_B T}{m}} = \\sqrt{\\frac{3RT}{M}}. Lighter gas molecules (e.g. Helium or Hydrogen) travel significantly faster than heavier molecules (e.g. Oxygen or Nitrogen) at the same temperature.",
        keyFormulaOrFramework: "p = \\frac{1}{3}\\rho \\overline{c^2}, \\quad \\bar{E}_k = \\frac{3}{2} k_B T, \\quad c_{rms} = \\sqrt{\\frac{3RT}{M}}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-b3-1",
        question: "Explain, from the perspective of kinetic molecular theory, why the pressure of a fixed mass of gas increases when its volume is decreased at constant temperature.",
        promptType: "explain",
        hints: ["What happens to the number of particles per unit volume?", "What happens to the frequency of collisions with the walls?"],
        modelAnswer: "Because temperature is constant, the average kinetic energy and root-mean-square speed of the gas molecules remain constant. When volume decreases, the number density of particles (molecules per unit volume) increases. As a consequence, molecules strike the container walls more frequently per unit area. Since the average momentum transfer per collision remains unchanged, the increased collision frequency results in a greater average force exerted per unit area, hence increasing pressure.",
        keyTermsToInclude: ["molecular speed remains constant", "number density increases", "frequency of collisions with walls increases", "pressure is force per unit area"]
      },
      {
        id: "q-b3-2",
        question: "Calculate the root-mean-square speed of a helium atom (molar mass M = 4.00 \\times 10^-3 kg/mol) at 300 K. (R = 8.31 J mol^-1 K^-1).",
        promptType: "calculation",
        hints: ["Use c_{rms} = \\sqrt{3RT/M}."],
        modelAnswer: "c_{rms} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3(8.31 J mol^{-1} K^{-1})(300 K)}{4.00 \\times 10^{-3} kg mol^{-1}}} = \\sqrt{\\frac{7479}{0.00400}} = \\sqrt{1.86975 \\times 10^6} = 1367 m/s \\approx 1.37 \\times 10^3 m/s.",
        keyTermsToInclude: ["c_{rms} = \\sqrt{3RT/M}", "c_{rms} = 1.37 \\times 10^3 m/s", "convert molar mass to kg/mol"]
      }
    ],
    analysis: {
      coreThesis: "Macroscopic pressure and temperature are macroscopic emergent properties of microscopic Newtonian collisions.",
      theoreticalFoundations: "Statistical mechanics, Maxwell-Boltzmann velocity distribution, equipartition theorem.",
      strategicEvaluation: "In exam questions, always specify units: pressure in Pascals (N/m^2), volume in cubic meters (m^3), and temperature in Kelvin (K). Converting liters to m^3 requires multiplying by 10^-3.",
      commonMisconceptions: [
        "Thinking all gas molecules travel at the exact same speed (they obey a broad Maxwell-Boltzmann speed distribution).",
        "Confusing molar gas constant R with Boltzmann constant k_B (R is per mole; k_B is per single molecule: R = N_A k_B).",
        "Applying ideal gas laws to saturated vapors or gases near their condensation points."
      ],
      realWorldConnections: "Atmospheric escape of light gases (Hydrogen and Helium from Earth's exosphere), scuba diving decompression tables, and internal combustion engine compression ratios.",
      keyDiagrams: ["diag-pv-isotherms", "diag-maxwell-boltzmann-distribution"]
    },
    cases: [
      {
        id: "case-b3",
        title: "Planetary Atmospheric Escape & Jeans Escape Mechanism",
        domainOrContext: "Planetary Astrophysics",
        physicalMechanism: "If the thermal root-mean-square speed c_{rms} of an atmospheric gas exceeds roughly 1/6 of a planet's gravitational escape velocity v_{esc} = \\sqrt{2GM/R}, the high-energy tail of the Maxwell-Boltzmann distribution escapes into space over geological timescales.",
        concepts: ["micro-macro", "invariance"],
        syllabusLink: "B.3 Kinetic Theory & c_{rms}",
        quantitativeInsight: "On Earth (v_{esc} = 11.2 km/s), thermal speed of hydrogen at 300 K is ~1.9 km/s (> v_{esc}/6), explaining why Earth's atmosphere lacks primordial free hydrogen, whereas heavy gases (O2, N2) remain trapped."
      }
    ],
    conceptTracking: [
      { conceptId: "micro-macro", intensity: 5, manifestation: "Rigorous mathematical derivation of macroscopic pressure from microscopic momentum transfers." },
      { conceptId: "equilibrium", intensity: 4, manifestation: "Thermal and mechanical equilibrium of ideal gas systems." }
    ],
    examPromptTakeaway: "Always check volume units: 1 liter = 1 dm^3 = 10^-3 m^3; 1 cm^3 = 10^-6 m^3.",
    examBlueprint: {
      paper1TrapPattern: "Options asking for the ratio of rms speeds of two gases at the same temperature where students invert the mass ratio or forget the square root (c_{rms} \\propto 1/\\sqrt{M}).",
      paper2StructuredPrompt: "A container of fixed volume 0.045 m^3 contains 2.5 moles of Argon gas at 320 K. Thermal energy is added until pressure reaches 2.4 \\times 10^5 Pa. Calculate the final temperature of the gas and the total internal energy change \\Delta U.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Ideal gas equation pV = nRT and internal energy U = 1.5 nRT.",
        showWorking: "Final temperature: T_2 = p_2 V / (nR) = (2.4 \\times 10^5)(0.045) / (2.5 \\times 8.31) = 10,800 / 20.775 = 519.8 K. Temperature change \\Delta T = 519.8 - 320 = 199.8 K. Internal energy change: \\Delta U = 1.5 n R \\Delta T = 1.5 (2.5)(8.31)(199.8) = 6226 J.",
        unitsAndSigFigs: "Final temperature = 520 K; Internal energy change = 6.2 kJ (2 significant figures)."
      },
      pitfallsToAvoid: [
        "Using 8.314 with incorrect sig figs when data booklet gives 8.31.",
        "Confusing total internal energy U with kinetic energy per single molecule."
      ]
    },
    diagramIds: ["diag-pv-isotherms", "diag-maxwell-boltzmann-distribution"],
    primaryFormulas: [
      "pV = nRT",
      "pV = N k_B T",
      "\\bar{E}_k = \\frac{3}{2}k_B T",
      "p = \\frac{1}{3}\\rho \\overline{c^2}",
      "c_{rms} = \\sqrt{\\frac{3RT}{M}}"
    ]
  },
  {
    id: "top-b5",
    themeId: "theme-b",
    themeNumber: 2,
    topicCode: "B.5",
    displayCode: "B.5",
    syllabusRef: "IB Physics Guide B.5 / Tsokos Ch. 5 / Giancoli Ch. 18-19",
    title: "Current & Electric Circuits",
    subtitle: "Electric Charge, Drift Speed, Ohm's Law, Resistivity, Potential Dividers, and Internal Resistance",
    level: "SL",
    strategicImportance: "HIGH-YIELD CIRCUIT DYNAMICS",
    readingTimeMinutes: 11,
    summary:
      "Electric current is the continuous rate of flow of electric charge: I = \\Delta q / \\Delta t (SI unit: Ampere = C/s). In metallic conductors, charge is carried by delocalized valence electrons drifting with average speed v: I = n A v q. Potential difference V = W / q represents work done per unit charge moving between two circuit nodes. Ohm's Law defines ohmic conductors where current is directly proportional to potential difference at constant temperature (V = IR). Electrical resistance depends on geometry and material resistivity (R = \\rho L / A). Practical circuits are analyzed using Kirchhoff's conservation laws (Current law: charge conservation; Loop law: energy conservation), potential divider networks, and non-ideal voltage sources with internal resistance (\\mathcal{E} = I(R + r)).",
    speedReadBullets: [
      "Electric Current & Drift Velocity: I = \\frac{\\Delta q}{\\Delta t} = n A v q, where n is charge carrier number density (m^-3), A is cross-sectional area (m^2), v is drift speed (typically ~10^-4 m/s), and q = e = 1.6 \\times 10^-19 C.",
      "Potential Difference (V) & EMF (\\mathcal{E}): V = \\frac{W}{q} (Joules per Coulomb = Volts). EMF is total electrical energy provided by the source per unit charge: \\mathcal{E} = \\frac{W_{total}}{q}.",
      "Ohm's Law: Current through a conductor is directly proportional to potential difference across it, provided temperature and physical conditions remain constant (V \\propto I).",
      "Resistivity (\\rho): R = \\frac{\\rho L}{A} (SI unit: \\Omega m). Resistance increases linearly with conductor length L and inversely with cross-sectional area A.",
      "Series vs Parallel Rules: Series: I is identical everywhere, R_{total} = R_1 + R_2 + \\dots; Parallel: V is identical across branches, \\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
      "Electrical Power: P = V I = I^2 R = \\frac{V^2}{R} (SI unit: Watt = J/s).",
      "Internal Resistance & Terminal PD: \\mathcal{E} = I(R + r) = V_{terminal} + Ir. Terminal voltage drops as current increases: V_{terminal} = \\mathcal{E} - Ir. On a V vs. I graph: y-intercept = \\mathcal{E}, and gradient = -r.",
      "Potential Divider: V_{out} = V_{in} \\left( \\frac{R_2}{R_1 + R_2} \\right). Enables variable output voltage for sensor circuits (thermistors, LDRs).",
    ],
    primer5Min:
      "Always distinguish between EMF (\\mathcal{E}) and Terminal Potential Difference (V). EMF is the energy supplied per coulomb by chemical reactions inside the battery; internal resistance (r) dissipates a fraction Ir ('lost volts') inside the battery itself, leaving terminal PD V = \\mathcal{E} - Ir available for the external circuit. For potential dividers, remember that the resistor with the LARGER resistance drops the LARGER share of the supply voltage.",
    subSections: [
      {
        id: "b5-s1",
        title: "Electric Current, Charge Carriers & Drift Velocity",
        marker: "Microscopic Conduction",
        content:
          "Electric current I is defined as the rate at which charge passes through a cross-section of a conductor: I = \\frac{\\Delta q}{\\Delta t}. In metals, charge carriers are free conduction electrons. An electric field applied across a wire accelerates electrons, which continuously collide with vibrating lattice ions, establishing a slow net drift velocity v. The total charge in length L is \\Delta q = n (A L) q. Because electrons traverse length L in time \\Delta t = L / v, current is given by I = \\frac{n A L q}{L / v} = n A v q. In typical household copper wires, drift velocity is remarkably slow (on the order of 0.1 mm/s), even though the electrical signal propagates at near the speed of light.",
        analyticalTakeaway:
          "If a wire narrows to half its diameter, cross-sectional area decreases by 4 (A \\propto d^2). To conserve current I, electron drift velocity v must increase by a factor of 4.",
        keyFormulaOrFramework: "I = \\frac{\\Delta q}{\\Delta t}, \\quad I = n A v q",
      },
      {
        id: "b5-s2",
        title: "Ohm's Law, Resistivity & Non-Ohmic Devices",
        marker: "Circuit Resistance",
        content:
          "Resistance R = V / I measures opposition to electric charge flow. For ohmic conductors, the I-V graph is a straight line through the origin of constant gradient 1/R. Conductor resistance depends on geometry: R = \\frac{\\rho L}{A}, where \\rho is material resistivity (\\Omega m). For non-ohmic components: a filament lamp exhibits an S-shaped I-V curve because heating increases lattice vibrations and collision rates, increasing resistance at higher currents; a semiconductor diode conducts only in forward bias past a threshold (~0.7 V); a thermistor has a negative temperature coefficient (NTC), decreasing resistance as temperature rises due to thermal liberation of charge carriers.",
        analyticalTakeaway:
          "The resistance of a component at any point on an I-V characteristic is NOT the tangent gradient; it is the ratio of V to I at that specific operating point (inverse of the secant gradient from the origin).",
        keyFormulaOrFramework: "R = \\frac{V}{I}, \\quad R = \\frac{\\rho L}{A}, \\quad P = VI = I^2 R = \\frac{V^2}{R}",
        workedExample: {
          problem: "A cylindrical copper cable of length 150 m has a diameter of 2.0 mm. Resistivity of copper is \\rho = 1.7 \\times 10^-8 \\Omega m. Calculate the resistance of the cable, and find the power dissipated when it carries a current of 12 A.",
          stepByStep: [
            "1. Cross-sectional area: Radius r = 1.0 mm = 1.0 \\times 10^-3 m. Area A = \\pi r^2 = \\pi (1.0 \\times 10^{-3})^2 = 3.1416 \\times 10^{-6} m^2.",
            "2. Resistance: R = \\frac{\\rho L}{A} = \\frac{(1.7 \\times 10^{-8})(150)}{3.1416 \\times 10^{-6}} = \\frac{2.55 \\times 10^{-6}}{3.1416 \\times 10^{-6}} = 0.8117 \\Omega.",
            "3. Power dissipated: P = I^2 R = (12.0)^2 (0.8117) = (144)(0.8117) = 116.88 W."
          ],
          finalAnswer: "Cable resistance = 0.81 \\Omega; Power dissipation = 120 W (2 significant figures)."
        }
      },
      {
        id: "b5-s3",
        title: "EMF, Internal Resistance & Potential Dividers",
        marker: "Power Distribution",
        content:
          "A practical cell is modeled as an ideal source of electromotive force \\mathcal{E} in series with an internal resistance r. Applying Kirchhoff's loop rule: \\mathcal{E} = I R_{ext} + I r = V_{terminal} + I r. Rearranging gives terminal potential difference as a linear function of current: V_{terminal} = -r I + \\mathcal{E}. When current is zero (open circuit), terminal PD equals EMF. When terminal PD is zero (short circuit), current reaches maximum I_{max} = \\mathcal{E} / r. A potential divider divides an input voltage using series resistors: V_{out} = V_{in} \\frac{R_2}{R_1 + R_2}.",
        analyticalTakeaway:
          "Maximum power transfer theorem: An electrical power source transfers maximum power to an external load when the load resistance equals the internal resistance: R_{load} = r.",
        keyFormulaOrFramework: "\\mathcal{E} = I(R + r), \\quad V = \\mathcal{E} - Ir, \\quad V_{out} = V_{in} \\frac{R_2}{R_1 + R_2}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-b5-1",
        question: "Describe how you would determine the electromotive force (EMF) and internal resistance of a battery experimentally from a graph of terminal potential difference versus current.",
        promptType: "explain",
        hints: ["Recall the equation V = \\mathcal{E} - Ir.", "What are the gradient and y-intercept?"],
        modelAnswer: "Connect the battery in series with a variable resistor, an ammeter, and a switch, with a voltmeter connected across the battery terminals. Record pairs of current I and terminal potential difference V across a range of load resistances. Plot V on the vertical axis against I on the horizontal axis. In accordance with V = -r I + \\mathcal{E}, the data will form a straight line with a negative gradient: the y-intercept equals the EMF (\\mathcal{E}), and the absolute value of the gradient equals the internal resistance (r).",
        keyTermsToInclude: ["plot V against I", "V = \\mathcal{E} - Ir", "y-intercept equals EMF", "gradient equals -r"]
      },
      {
        id: "q-b5-2",
        question: "A 9.0 V battery with internal resistance r = 1.5 \\Omega is connected to two parallel resistors of 10.0 \\Omega and 15.0 \\Omega. Calculate the terminal potential difference across the battery.",
        promptType: "calculation",
        hints: ["Find total equivalent external resistance first, then circuit current."],
        modelAnswer: "External parallel resistance: \\frac{1}{R_p} = \\frac{1}{10.0} + \\frac{1}{15.0} = \\frac{3 + 2}{30.0} = \\frac{5}{30.0} \\implies R_p = 6.0 \\Omega. Total circuit resistance: R_{total} = R_p + r = 6.0 + 1.5 = 7.5 \\Omega. Total current: I = \\frac{\\mathcal{E}}{R_{total}} = \\frac{9.0 V}{7.5 \\Omega} = 1.2 A. Terminal PD: V = \\mathcal{E} - Ir = 9.0 - (1.2)(1.5) = 9.0 - 1.8 = 7.2 V. (Check: V = I R_p = (1.2)(6.0) = 7.2 V).",
        keyTermsToInclude: ["R_p = 6.0 \\Omega", "total current I = 1.2 A", "terminal PD = 7.2 V"]
      }
    ],
    analysis: {
      coreThesis: "Electric circuits channel electromagnetic energy transfers constrained by charge conservation and potential energy loops.",
      theoreticalFoundations: "Drude model of electrical conduction, Maxwell's electrodynamics, Kirchhoff's circuit laws.",
      strategicEvaluation: "In circuit analysis, always check whether meters are ideal: an ideal voltmeter has infinite resistance (draws zero current); an ideal ammeter has zero resistance (drops zero voltage).",
      commonMisconceptions: [
        "Believing electrons travel from power station to home at the speed of light (electrons oscillate back and forth with drift speeds < 1 mm/s; the electric field travels at c).",
        "Assuming current is 'used up' by resistors (charge is strictly conserved; energy is converted, but every coulomb entering a resistor leaves it).",
        "Confusing terminal PD with battery EMF under load."
      ],
      realWorldConnections: "High-voltage alternating current (HVAC) power transmission grid optimization, electric vehicle lithium-ion battery management systems, and sensor interfacing.",
      keyDiagrams: ["diag-dc-circuit-potential-divider", "diag-internal-resistance-graph"]
    },
    cases: [
      {
        id: "case-b5",
        title: "High-Voltage National Grid Transmission Optimization",
        domainOrContext: "Electrical Power Grid Engineering",
        physicalMechanism: "Electrical energy generated at power stations is stepped up via transformers to 400 kV before long-distance transmission. Because power delivered is P = V I, raising voltage by a factor of 1000 decreases current I by a factor of 1000, reducing Joule heating transmission losses P_{loss} = I^2 R by a factor of one million (10^6).",
        concepts: ["conservation", "equilibrium"],
        syllabusLink: "B.5 Electrical Power P = I^2 R",
        quantitativeInsight: "Transmitting 500 MW at 400 kV rather than 11 kV reduces resistive dissipation from 85% of total generated power to under 1.5% across 200 km aluminum-steel cables."
      }
    ],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "Charge conservation (Kirchhoff's current law) and energy conservation (Kirchhoff's voltage law)." },
      { conceptId: "micro-macro", intensity: 4, manifestation: "Macroscopic Ohm's law emerging from microscopic electron drift through ionic lattice." }
    ],
    examPromptTakeaway: "Use V_{terminal} = \\mathcal{E} - Ir for real non-ideal batteries.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the reading on a voltmeter placed across a switch when open (the reading equals the full supply EMF, not zero!).",
      paper2StructuredPrompt: "A potential divider circuit consists of a 12.0 V supply of negligible internal resistance, a fixed 4.7 k\\Omega resistor, and a light-dependent resistor (LDR). In darkness, LDR resistance is 50 k\\Omega; in bright light, it is 800 \\Omega. Calculate the output voltage across the LDR in darkness and in bright light.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Potential divider formula: V_{out} = V_{in} [R_{LDR} / (R_{fixed} + R_{LDR})].",
        showWorking: "Darkness: V_{out} = 12.0 [50 / (4.7 + 50)] = 12.0 [50 / 54.7] = 10.97 V \\approx 11 V. Bright light: V_{out} = 12.0 [0.80 / (4.7 + 0.80)] = 12.0 [0.80 / 5.5] = 1.745 V \\approx 1.7 V.",
        unitsAndSigFigs: "Darkness output = 11 V; Bright light output = 1.7 V (2 significant figures)."
      },
      pitfallsToAvoid: [
        "Inverting the numerator in the potential divider formula.",
        "Mixing kilo-ohms and ohms in the same fraction without converting to base units."
      ]
    },
    diagramIds: ["diag-dc-circuit-potential-divider", "diag-internal-resistance-graph"],
    primaryFormulas: [
      "I = \\frac{\\Delta q}{\\Delta t}",
      "I = n A v q",
      "V = \\frac{W}{q}",
      "R = \\frac{V}{I}",
      "R = \\frac{\\rho L}{A}",
      "\\mathcal{E} = I(R + r)",
      "P = VI = I^2 R = \\frac{V^2}{R}",
      "V_{out} = V_{in}\\frac{R_2}{R_1 + R_2}"
    ]
  },
  {
    id: "top-b4-hl",
    themeId: "theme-b",
    themeNumber: 2,
    topicCode: "B.4",
    displayCode: "B.4 HL",
    syllabusRef: "IB Physics Guide B.4 (HL Only) / Thermodynamics",
    title: "Thermodynamics (HL)",
    subtitle: "First Law ($Q = \\Delta U + W$), PV Work, Iso-Processes, Carnot Efficiency & Entropy",
    level: "HL",
    strategicImportance: "HIGH-YIELD THERMODYNAMICS",
    readingTimeMinutes: 10,
    summary:
      "HL Extension covering the First and Second Laws of Thermodynamics. Energy conservation in a gas is expressed as $Q = \\Delta U + W$ (where $W = p\\Delta V$). Examines isobaric, isochoric, isothermal, and adiabatic ($pV^{5/3} = \\text{const}$) processes, Carnot heat-engine efficiency $\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}$, and entropy $\\Delta S = \\frac{\\Delta Q}{T}$.",
    speedReadBullets: [
      "First Law of Thermodynamics: $Q = \\Delta U + W$, where $Q$ is heat added to gas, $\\Delta U = \\frac{3}{2}nR\\Delta T$ is internal energy change, and $W = p\\Delta V$ is work done BY gas.",
      "Four Ideal Gas Processes: Isobaric ($\\Delta p = 0$); Isochoric/Isovolumetric ($\\Delta V = 0 \\implies W = 0$); Isothermal ($\\Delta T = 0 \\implies \\Delta U = 0$); Adiabatic ($Q = 0 \\implies pV^{5/3} = \\text{const}$).",
      "Cyclic Engine Work: Net work done per cycle equals the enclosed area of the $p\\text{--}V$ loop.",
      "Second Law & Entropy: Total entropy of an isolated system never decreases ($\\Delta S \\ge 0$, $\\Delta S = \\frac{\\Delta Q}{T}$, $S = k_B\\ln\\Omega$).",
      "Carnot Efficiency: Maximum theoretical efficiency $\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}$ (temperatures in Kelvin!).",
    ],
    primer5Min:
      "Sign convention check: $W > 0$ when the gas EXPANDS (does work on surroundings); $W < 0$ when compressed. For an adiabatic expansion ($Q=0$), the gas cools ($\\Delta U = -W < 0$) and its curve on a $p\\text{--}V$ diagram is steeper than an isotherm.",
    subSections: [
      {
        id: "b4-hl-s1",
        title: "First Law, p-V Cycles, Entropy & Carnot Limit",
        marker: "HL Core",
        content:
          "Applying $Q = \\Delta U + W$ to an ideal monatomic gas links macroscopic heat and work to microscopic kinetic energy $\\Delta U = \\frac{3}{2}nR\\Delta T$. No cyclic heat engine can convert 100% of absorbed heat into work (Kelvin-Planck statement of the Second Law); the theoretical upper bound between reservoirs $T_H$ and $T_C$ is the Carnot efficiency $\\eta = 1 - T_C/T_H$.",
        analyticalTakeaway:
          "Entropy $S = k_B\\ln\\Omega$ quantifies microscopic disorder/multiplicity; irreversible processes always increase total universe entropy.",
        keyFormulaOrFramework: "Q = \\Delta U + W, \\quad W = p\\Delta V, \\quad \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}, \\quad \\Delta S = \\frac{\\Delta Q}{T}",
      },
    ],
    checkUnderstanding: [
      {
        id: "q-b4-hl-1",
        question: "A Carnot engine operates between a hot reservoir at 600 K and a cold reservoir at 300 K. If it absorbs 800 J of heat, find the maximum work output.",
        promptType: "calculation",
        hints: ["eta = 1 - Tc / Th", "W = eta * Qh"],
        modelAnswer:
          "$\\eta = 1 - 300/600 = 0.50$ (50%). Maximum work $W = 0.50 \\times 800\\text{ J} = 400\\text{ J}$.",
        keyTermsToInclude: ["Carnot efficiency", "Kelvin temperature", "400 J"],
        formulaUsed: "\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}",
      },
    ],
    analysis: {
      coreThesis: "The First Law conserves energy while the Second Law dictates the irreversible direction of thermal processes.",
      theoreticalFoundations: "Carnot (1824), Clausius & Boltzmann statistical mechanics.",
      strategicEvaluation: "Always convert °C to Kelvin before calculating $\\eta_{\\text{Carnot}}$ or $\\Delta S$.",
      commonMisconceptions: ["Thinking isothermal means no heat is transferred ($Q = W \\ne 0$ since $\\Delta U = 0$)."],
      realWorldConnections: "Power plant steam turbines, internal combustion Otto cycles, and heat pumps.",
      keyDiagrams: [],
    },
    cases: [],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "First Law $Q = \\Delta U + W$ expresses energy conservation." },
      { conceptId: "micro-macro", intensity: 5, manifestation: "Boltzmann entropy $S = k_B\\ln\\Omega$ bridges microstates to macroscopic irreversibility." },
    ],
    examPromptTakeaway: "On a $p\\text{--}V$ diagram, clockwise cycles produce net positive work (heat engines); anticlockwise cycles consume net work (refrigerators).",
    examBlueprint: {
      paper1TrapPattern: "Using Celsius instead of Kelvin in $\\eta = 1 - T_C/T_H$.",
      paper2StructuredPrompt: "Explain why an adiabatic expansion causes the temperature of an ideal gas to decrease.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "First Law $Q = \\Delta U + W$ with $Q = 0$ (adiabatic).",
        showWorking: "$W > 0$ (gas expands), so $\\Delta U = -W < 0$. Since $U \\propto T$, temperature falls.",
        unitsAndSigFigs: "Qualitative mechanism.",
      },
      pitfallsToAvoid: ["Confusing adiabatic ($Q=0$) with isothermal ($\\Delta T=0$)."],
    },
    diagramIds: [],
    primaryFormulas: [
      "Q = \\Delta U + W",
      "W = p\\Delta V",
      "pV^{5/3} = \\text{constant}",
      "\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}",
      "\\Delta S = \\frac{\\Delta Q}{T}",
    ],
  },
];
