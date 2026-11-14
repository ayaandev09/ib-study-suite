import { TopicData } from "./types";

export const THEME_D_TOPICS: TopicData[] = [
  {
    id: "top-d1",
    themeId: "theme-d",
    themeNumber: 4,
    topicCode: "D.1",
    displayCode: "D.1",
    syllabusRef: "IB Physics Guide D.1 / Tsokos Ch. 6 / Giancoli Ch. 5-6",
    title: "Gravitational Fields & Orbital Mechanics",
    subtitle: "Newton's Universal Gravitation, Field Strength g = GM/r^2, Orbital Velocity, and Kepler's Third Law",
    level: "SL",
    strategicImportance: "FIELDS & FORCES CORNERSTONE",
    readingTimeMinutes: 10,
    summary:
      "Gravitation is a universal attractive force that acts between all entities possessing mass. Newton's Law of Universal Gravitation states that any two point masses attract with a force directly proportional to the product of their masses and inversely proportional to the square of their center-to-center separation: F = G \\frac{M m}{r^2}. Gravitational field strength g is defined as the gravitational force exerted per unit test mass at a point in space (g = F / m = GM / r^2, directed radially inward). For satellite orbits, gravity provides the required centripetal force, dictating orbital speed v = \\sqrt{GM/r} and leading directly to Kepler's Third Law: T^2 = \\frac{4\\pi^2}{GM} r^3. Astronauts in orbit experience apparent weightlessness not because gravity is absent, but because they and their spacecraft are in perpetual free fall.",
    speedReadBullets: [
      "Newton's Law of Universal Gravitation: F = G \\frac{m_1 m_2}{r^2}, where G = 6.67 \\times 10^-11 N m^2 kg^-2 is the universal gravitational constant. Strictly attractive.",
      "Gravitational Field Strength (g): Force per unit small test mass: g = \\frac{F}{m} (SI unit: N kg^-1 or m s^-2). For a spherically symmetric mass M: g = G \\frac{M}{r^2}.",
      "Radial vs. Uniform Fields: Far from planets, field lines are radial (converging inwards toward center of mass); near Earth's surface (small \\Delta h \\ll R_E), field lines are parallel and equidistant, representing a uniform field (g \\approx 9.81 m s^-2).",
      "Orbital Motion Dynamics: Gravitational force provides the centripetal force: G \\frac{M m}{r^2} = \\frac{m v^2}{r} \\implies v_{orb} = \\sqrt{\\frac{GM}{r}}.",
      "Kepler's Third Law Derivation: Period T = \\frac{2\\pi r}{v} = \\frac{2\\pi r}{\\sqrt{GM/r}} \\implies T^2 = \\left( \\frac{4\\pi^2}{GM} \\right) r^3 (T^2 \\propto r^3).",
      "Geostationary Orbits: Orbits with period matching Earth's rotation (T = 24 hours = 86,400 s), positioned directly above the equator at altitude ~35,800 km, remaining stationary relative to surface observers.",
      "Apparent Weightlessness: In orbit, gravitational force is substantial (~90% of surface weight on the ISS); astronauts feel weightless because normal reaction force is zero (R = 0) in free fall.",
    ],
    primer5Min:
      "When solving orbital mechanics problems, always begin by equating the gravitational force to the centripetal force: F_g = F_c \\implies G \\frac{M m}{r^2} = \\frac{m v^2}{r} = m \\omega^2 r = m \\left(\\frac{4\\pi^2}{T^2}\\right) r. Notice that the mass of the satellite m cancels immediately! All objects in the same orbit have the exact same orbital speed, regardless of their mass. Be careful with orbital altitude h: radius r is distance from the planet's CENTER: r = R_{planet} + h.",
    subSections: [
      {
        id: "d1-s1",
        title: "Newton's Law of Universal Gravitation & Field Strength",
        marker: "Field Foundations",
        content:
          "Newton's law establishes that any two point masses m_1 and m_2 separated by distance r attract with force F = G \\frac{m_1 m_2}{r^2}. By Newton's Third Law, both masses experience forces of identical magnitude, irrespective of their relative masses. A gravitational field is a region of space where a mass experiences a force. Field strength \\vec{g} is the force per unit mass on a small test mass: \\vec{g} = \\frac{\\vec{F}}{m}. For a spherical body of mass M, spherical symmetry permits treating all mass as concentrated at the geometric center: g = G \\frac{M}{r^2}. Field lines point radially inward; the local density of field lines represents the magnitude of g.",
        analyticalTakeaway:
          "Inverse-square dependence: Doubling the distance from Earth's center reduces gravitational field strength to one-quarter (g / 4); tripling distance reduces it to one-ninth (g / 9).",
        keyFormulaOrFramework: "F = G \\frac{M m}{r^2}, \\quad g = \\frac{F}{m} = G \\frac{M}{r^2}",
      },
      {
        id: "d1-s2",
        title: "Orbital Mechanics & Kepler's Third Law",
        marker: "Celestial Dynamics",
        content:
          "A satellite in circular orbit around a central body of mass M is in permanent free fall. Gravitational attraction provides the required centripetal acceleration: G \\frac{M m}{r^2} = m \\frac{v^2}{r}. Solving for orbital speed yields v = \\sqrt{\\frac{GM}{r}}. Satellites in lower orbits travel substantially faster than satellites in higher orbits. The orbital period is the time taken to complete one full revolution: T = \\frac{2\\pi r}{v} = \\frac{2\\pi r}{\\sqrt{GM/r}}. Squaring both sides yields Kepler's Third Law: T^2 = \\left( \\frac{4\\pi^2}{GM} \\right) r^3. Plotting T^2 against r^3 yields a straight line through the origin whose gradient allows determining the mass M of the central body.",
        analyticalTakeaway:
          "Geostationary satellites must orbit precisely in Earth's equatorial plane in the direction of Earth's rotation with period T = 24.0 hours, placing them at orbital radius r \\approx 42,200 km (altitude h \\approx 35,800 km).",
        keyFormulaOrFramework: "v_{orb} = \\sqrt{\\frac{GM}{r}}, \\quad T^2 = \\left( \\frac{4\\pi^2}{GM} \\right) r^3",
        workedExample: {
          problem: "The International Space Station (ISS) orbits Earth at an altitude of 408 km above the surface. Given Earth's mass M = 5.97 \\times 10^24 kg and radius R = 6.37 \\times 10^6 m, calculate: (a) the orbital speed of the ISS, and (b) its orbital period in minutes.",
          stepByStep: [
            "1. Orbital radius: r = R + h = 6.37 \\times 10^6 m + 408 \\times 10^3 m = 6.778 \\times 10^6 m.",
            "2. Orbital speed: v = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{(6.67 \\times 10^{-11})(5.97 \\times 10^{24})}{6.778 \\times 10^6}} = \\sqrt{\\frac{3.98199 \\times 10^{14}}{6.778 \\times 10^6}} = \\sqrt{5.87488 \\times 10^7} = 7664.8 m/s.",
            "3. Orbital period: T = \\frac{2\\pi r}{v} = \\frac{2\\pi (6.778 \\times 10^6)}{7664.8} = \\frac{4.2587 \\times 10^7}{7664.8} = 5556 s.",
            "4. Convert to minutes: T = 5556 / 60 = 92.6 minutes."
          ],
          finalAnswer: "(a) Orbital speed = 7.66 \\times 10^3 m/s (7.66 km/s); (b) Period = 92.6 minutes (approx. 1.5 hours)."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-d1-1",
        question: "Explain why an astronaut aboard the International Space Station experiences weightlessness even though the gravitational field strength at that altitude is approximately 8.7 N/kg (~89% of surface value).",
        promptType: "explain",
        hints: ["What does a person actually feel when they feel 'weight'?", "What is the acceleration of the station vs the astronaut?"],
        modelAnswer: "Human sensation of weight arises not from gravitational force directly, but from the normal contact reaction force R exerted by the floor or scales pushing back up against the body. Both the astronaut and the space station are in the exact same circular orbit, undergoing identical centripetal acceleration equal to the local gravitational field strength (a = g). Because both are in perpetual free fall together towards the Earth, the floor accelerates away at the exact same rate as the astronaut's body. Consequently, normal contact force is zero (R = 0), producing the sensation and physical effects of apparent weightlessness.",
        keyTermsToInclude: ["normal contact reaction force is zero (R = 0)", "both astronaut and station in free fall", "centripetal acceleration equals g", "apparent weightlessness"]
      },
      {
        id: "q-d1-2",
        question: "A communications satellite is placed in a geostationary orbit around Earth. Given Earth's mass M = 5.97 \\times 10^24 kg, calculate the orbital radius of the satellite. (Period T = 86,400 s).",
        promptType: "calculation",
        hints: ["Rearrange Kepler's Third Law for r: r = [GM T^2 / (4\\pi^2)]^{1/3}."],
        modelAnswer: "From Kepler's Third Law: r^3 = \\frac{GM T^2}{4\\pi^2} = \\frac{(6.67 \\times 10^{-11} N m^2 kg^{-2})(5.97 \\times 10^{24} kg)(86400 s)^2}{4\\pi^2} = \\frac{(3.98199 \\times 10^{14})(7.46496 \\times 10^9)}{39.4784} = \\frac{2.97254 \\times 10^{24}}{39.4784} = 7.5295 \\times 10^{22} m^3. Taking the cube root: r = (7.5295 \\times 10^{22})^{1/3} = 4.2227 \\times 10^7 m = 4.22 \\times 10^4 km.",
        keyTermsToInclude: ["r^3 = GMT^2 / (4\\pi^2)", "r = 4.22 \\times 10^7 m (42,200 km)", "altitude ~ 35,800 km"]
      }
    ],
    analysis: {
      coreThesis: "Gravitation is the universal long-range geometric field that structures stars, galaxies, and planetary orbital dynamics.",
      theoreticalFoundations: "Newtonian inverse-square law, Gauss's law for gravity, equivalence principle.",
      strategicEvaluation: "In exam questions, check whether the prompt asks for 'orbital radius' (measured from Earth's center r) or 'altitude above surface' (h = r - R_E). Confusing these loses calculation marks.",
      commonMisconceptions: [
        "Believing gravity is zero in space (at ISS altitude 400 km, g is ~8.7 m/s^2, only 11% less than surface).",
        "Assuming a more massive satellite requires higher orbital speed (satellite mass cancels out completely; speed depends only on central mass M and radius r).",
        "Thinking geostationary satellites can be placed over London or New York (they can ONLY orbit directly above the Equator)."
      ],
      realWorldConnections: "GPS satellite constellation orbital synchronization, James Webb Space Telescope halo orbits at Sun-Earth L2 Lagrange point, and interplanetary gravitational slingshot maneuvers.",
      keyDiagrams: ["diag-gravitational-field-radial", "diag-orbital-mechanics-kepler"]
    },
    cases: [
      {
        id: "case-d1",
        title: "James Webb Space Telescope Sun-Earth L2 Quasi-Halo Orbit",
        domainOrContext: "Space Mission Orbital Mechanics",
        physicalMechanism: "JWST operates at the Second Lagrange Point (L2), 1.5 million km outward from Earth along the Sun-Earth axis, where the combined gravitational pull of the Sun and Earth provides precisely the centripetal acceleration needed for a 365-day orbital period matching Earth's year.",
        concepts: ["fields", "equilibrium"],
        syllabusLink: "D.1 Gravitational Fields & Centripetal Acceleration",
        quantitativeInsight: "At L2, solar irradiance and terrestrial heat are blocked by a tennis-court-sized 5-layer Kapton sunshield, maintaining scientific instruments at cryogenic temperatures below 40 K (-233 °C) without active refrigeration."
      }
    ],
    conceptTracking: [
      { conceptId: "fields", intensity: 5, manifestation: "Gravitational action-at-a-distance mediated by inverse-square vector field lines." },
      { conceptId: "equilibrium", intensity: 4, manifestation: "Stable centripetal orbital equilibrium balancing gravitational force against inertia." }
    ],
    examPromptTakeaway: "Equate G(M m)/r^2 = m v^2 / r to derive all circular orbital equations.",
    examBlueprint: {
      paper1TrapPattern: "Options claiming gravitational force is zero inside an orbiting satellite (the force is NOT zero; apparent weightlessness is caused by zero normal reaction force in free fall).",
      paper2StructuredPrompt: "A scientific satellite of mass 850 kg is in circular orbit around Mars at an altitude of 320 km. Mars has mass 6.42 \\times 10^23 kg and mean radius 3.39 \\times 10^6 m. Calculate the gravitational field strength at this altitude, the satellite's orbital speed, and the time taken to complete 10 orbits.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Orbital radius r = R_M + h, g = GM / r^2, and v = \\sqrt{GM/r}.",
        showWorking: "r = 3.39 \\times 10^6 + 3.20 \\times 10^5 = 3.71 \\times 10^6 m; g = (6.67 \\times 10^{-11})(6.42 \\times 10^{23}) / (3.71 \\times 10^6)^2 = 4.282 \\times 10^{13} / 1.3764 \\times 10^{13} = 3.111 N/kg; v = \\sqrt{GM/r} = \\sqrt{(4.282 \\times 10^{13}) / (3.71 \\times 10^6)} = \\sqrt{1.154 \\times 10^7} = 3397 m/s; Period T = 2\\pi r / v = 2\\pi (3.71 \\times 10^6) / 3397 = 6861 s. Time for 10 orbits = 10(6861) = 68,610 s = 19.1 hours.",
        unitsAndSigFigs: "Field strength = 3.11 N/kg; Orbital speed = 3.40 \\times 10^3 m/s; 10 orbits duration = 1.9 \\times 10^1 hours (6.9 \\times 10^4 s, 3 significant figures)."
      },
      pitfallsToAvoid: [
        "Using Earth's radius or mass instead of Mars values.",
        "Forgetting to add altitude to planet radius to find orbital radius r."
      ]
    },
    diagramIds: ["diag-gravitational-field-radial", "diag-orbital-mechanics-kepler"],
    primaryFormulas: [
      "F = G\\frac{m_1 m_2}{r^2}",
      "g = \\frac{F}{m} = G\\frac{M}{r^2}",
      "v_{orb} = \\sqrt{\\frac{GM}{r}}",
      "T^2 = \\left(\\frac{4\\pi^2}{GM}\\right)r^3",
      "T = \\frac{2\\pi r}{v}"
    ]
  },
  {
    id: "top-d2",
    themeId: "theme-d",
    themeNumber: 4,
    topicCode: "D.2",
    displayCode: "D.2",
    syllabusRef: "IB Physics Guide D.2 / Tsokos Ch. 5 / Giancoli Ch. 16, 20",
    title: "Electric & Magnetic Fields",
    subtitle: "Coulomb's Law, Electric Field Strength E, Uniform Fields E = V/d, and Magnetic Lorentz Forces F = qvB & F = BIL",
    level: "SL",
    strategicImportance: "FIELDS & FORCES CORNERSTONE",
    readingTimeMinutes: 11,
    summary:
      "Electric and magnetic fields mediate non-contact electromagnetic interactions. Coulomb's Law governs electrostatic forces between point charges: F = k \\frac{|q_1 q_2|}{r^2}, which can be attractive or repulsive. Electric field strength E is the force per unit positive test charge: \\vec{E} = \\vec{F} / q (SI unit: N C^-1 or V m^-1). Point charges create radial fields (E = kQ / r^2); parallel charged plates generate a uniform electric field (E = V / d). Magnetic fields (B, SI unit: Tesla) are produced exclusively by moving electric charges and currents. A magnetic field exerts a velocity-dependent cross-product Lorentz force on a moving charge: F_B = q v B \\sin\\theta, and on a current-carrying wire: F_B = B I L \\sin\\theta, whose direction is given by Fleming's Left-Hand Rule.",
    speedReadBullets: [
      "Coulomb's Law: F = k \\frac{|q_1 q_2|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1 q_2|}{r^2}, where k = 8.99 \\times 10^9 N m^2 C^-2 and \\varepsilon_0 = 8.85 \\times 10^-12 C^2 N^-1 m^-2.",
      "Electric Field Strength (E): Force per unit POSITIVE test charge: E = \\frac{F}{q} (N C^-1 or V m^-1). Directed away from positive charges, toward negative charges.",
      "Radial vs Uniform E-Fields: Radial (point charge Q): E = \\frac{kQ}{r^2}; Uniform (parallel plates separated by d with voltage V): E = \\frac{V}{d}.",
      "Magnetic Field (B): Vector field mapped by field lines exiting North poles and entering South poles (SI unit: Tesla = N A^-1 m^-1 = kg s^-2 A^-1).",
      "Right-Hand Grip Rule: Thumb points along conventional current I; curled fingers indicate circular magnetic field B direction around a straight conductor.",
      "Magnetic Force on Moving Charge: F_B = q v B \\sin\\theta. Force is ZERO if velocity is parallel to field (\\theta = 0° or 180°); MAXIMUM when perpendicular (\\theta = 90°: F_B = qvB).",
      "Magnetic Force on Current: F_B = B I L \\sin\\theta, where L is length of wire in field.",
      "Fleming's Left-Hand Rule: For motors and moving positive charges: ThuMb = Motion/Force; First finger = Field (N to S); seCond finger = Current (conventional positive charge flow).",
    ],
    primer5Min:
      "Master the differences between electric and magnetic forces! 1. Electric force F_e = qE acts on charges whether stationary OR moving, parallel or antiparallel to field lines. 2. Magnetic force F_B = qvB\\sin\\theta acts ONLY on moving charges (v > 0) with a velocity component perpendicular to B (\\sin\\theta \\ne 0). 3. Magnetic force is ALWAYS perpendicular to both velocity and magnetic field (\\vec{F}_B \\perp \\vec{v}); therefore, a magnetic field can NEVER do work on a free charge, and CANNOT change its speed or kinetic energy—it can ONLY change its direction of motion!",
    subSections: [
      {
        id: "d2-s1",
        title: "Coulomb's Law & Electric Field Topologies",
        marker: "Electrostatic Forces",
        content:
          "Coulomb's Law governs electrostatic interactions between stationary point charges: F = k \\frac{|q_1 q_2|}{r^2}, where Coulomb constant k = \\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9 N m^2 C^-2. Like charges repel; opposite charges attract. Electric field strength \\vec{E} is defined as the force experienced per unit positive test charge: \\vec{E} = \\frac{\\vec{F}}{q}. For a point charge Q, field strength is radial: E = k \\frac{Q}{r^2}. When equal and opposite charges are placed on two parallel plates separated by distance d with potential difference V, a uniform electric field is established between them: E = \\frac{V}{d}. Field lines never cross; their tangential direction indicates force on a positive charge, and their density represents field strength.",
        analyticalTakeaway:
          "Compare Coulomb's law with Newton's gravitational law: Both follow inverse-square 1/r^2 laws, but electrostatic forces are ~10^39 times stronger and can be both attractive and repulsive, whereas gravity is exclusively attractive.",
        keyFormulaOrFramework: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1 q_2|}{r^2}, \\quad E = \\frac{F}{q} = \\frac{kQ}{r^2}, \\quad E = \\frac{V}{d}",
      },
      {
        id: "d2-s2",
        title: "Magnetic Fields & Lorentz Force on Moving Charges",
        marker: "Magnetic Interactions",
        content:
          "Magnetic fields are created by moving charges and currents. Magnetic field strength (flux density) B is measured in Tesla (T). Unlike electric field lines, magnetic field lines always form closed loops with zero divergence (no magnetic monopoles exist). A charge q moving with velocity \\vec{v} through magnetic field \\vec{B} experiences a deflecting Lorentz force: F_B = q v B \\sin\\theta, where \\theta is the angle between \\vec{v} and \\vec{B}. When a wire carrying current I of length L is situated in field B, summing forces over all drifting conduction electrons yields: F_B = B I L \\sin\\theta. The direction of force is given by Fleming's Left-Hand Rule (remembering that electron flow is opposite to conventional current).",
        analyticalTakeaway:
          "Because magnetic force \\vec{F}_B is everywhere perpendicular to velocity \\vec{v}, the dot product \\vec{F}_B \\cdot \\vec{v} = 0. The instantaneous rate of work done by a purely magnetic field is identically zero: W = 0, \\Delta E_k = 0.",
        keyFormulaOrFramework: "F_B = q v B \\sin\\theta, \\quad F_B = B I L \\sin\\theta, \\quad 1 \\text{ Tesla} = 1 \\frac{\\text{N}}{\\text{A}\\cdot\\text{m}}",
        workedExample: {
          problem: "An alpha particle (q = +2e = +3.2 \\times 10^-19 C, mass m = 6.64 \\times 10^-27 kg) enters a uniform magnetic field B = 0.45 T at speed v = 2.5 \\times 10^6 m/s at an angle of 90° to the field lines. Calculate: (a) the magnitude of the magnetic force, and (b) the instantaneous acceleration of the particle.",
          stepByStep: [
            "1. Magnetic force formula: F = q v B \\sin\\theta.",
            "2. Compute force: F = (3.2 \\times 10^{-19} C)(2.5 \\times 10^6 m/s)(0.45 T)\\sin(90^{\\circ}) = 3.60 \\times 10^{-13} N.",
            "3. Acceleration via Newton's 2nd Law: a = \\frac{F}{m}.",
            "4. Compute acceleration: a = \\frac{3.60 \\times 10^{-13} N}{6.64 \\times 10^{-27} kg} = 5.4217 \\times 10^{13} m/s^2."
          ],
          finalAnswer: "(a) Magnetic deflecting force = 3.6 \\times 10^-13 N; (b) Acceleration = 5.4 \\times 10^13 m/s^2."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-d2-1",
        question: "State two differences and two similarities between electric fields and magnetic fields.",
        promptType: "explain",
        hints: ["Think about sources, forces on stationary charges, field line shapes, and work done."],
        modelAnswer: "Similarities: 1. Both are vector fields mediating non-contact action-at-a-distance forces on electric charges. 2. Both exert forces proportional to field strength (F_e \\propto E, F_B \\propto B). Differences: 1. Electric fields exert forces on stationary charges (F = qE); magnetic fields exert forces only on moving charges (F = qvB\\sin\\theta). 2. Electric fields can perform work on charges changing their kinetic energy; magnetic forces are always perpendicular to velocity and perform zero work (kinetic energy is constant). (Additional: Electric field lines begin on + and end on - charges; magnetic field lines form continuous closed loops).",
        keyTermsToInclude: ["electric force on stationary charges", "magnetic force requires moving charge", "magnetic force does zero work", "field lines: open vs closed loops"]
      },
      {
        id: "q-d2-2",
        question: "Two parallel metal plates separated by 15.0 mm have a potential difference of 450 V applied across them. Calculate: (a) the electric field strength between the plates, and (b) the electric force on an electron (q = -1.60 \\times 10^-19 C) placed between them.",
        promptType: "calculation",
        hints: ["Use uniform field relation E = V / d, then F = qE."],
        modelAnswer: "(a) Electric field strength in uniform field: E = \\frac{V}{d} = \\frac{450 V}{0.0150 m} = 30,000 V/m = 3.00 \\times 10^4 N/C (directed from positive to negative plate). (b) Electric force: F = q E = (1.60 \\times 10^{-19} C)(3.00 \\times 10^4 N/C) = 4.80 \\times 10^{-15} N (directed opposite to the electric field lines, towards the positive plate).",
        keyTermsToInclude: ["E = V / d = 3.0 \\times 10^4 V/m", "F = qE = 4.8 \\times 10^{-15} N", "directed towards positive plate"]
      }
    ],
    analysis: {
      coreThesis: "Electric and magnetic fields are unified facets of the relativistic electromagnetic field tensor governing charged matter dynamics.",
      theoreticalFoundations: "Maxwell's equations, Lorentz force law \\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}).",
      strategicEvaluation: "In magnetic force problems involving electrons or negative ions, always invert the direction given by Fleming's Left-Hand Rule because conventional current flows opposite to negative charge motion.",
      commonMisconceptions: [
        "Believing magnetic fields accelerate particles to higher speeds (magnetic fields only change velocity direction, never speed).",
        "Confusing magnetic field lines with electric field lines (magnetic lines do not originate on isolated charges).",
        "Forgetting to convert plate separation d from millimeters to meters before calculating E = V/d."
      ],
      realWorldConnections: "Loudspeaker voice coil actuators, Hall effect magnetic sensors in smartphones, and Maglev train electrodynamic suspension levitation.",
      keyDiagrams: ["diag-electric-field-dipole-plates", "diag-magnetic-field-wire-solenoid"]
    },
    cases: [
      {
        id: "case-d2",
        title: "SCMaglev Electrodynamic Suspension (EDS)",
        domainOrContext: "High-Speed Rail Transportation",
        physicalMechanism: "Superconducting niobium-titanium magnets chilled to 4 K generate intense 4.5 Tesla magnetic fields on train bogies. As the train travels at high speed, bogie magnets induce eddy currents in track coils, generating repulsive magnetic Lorentz forces (F = BIL) that levitate the 30-tonne train 10 cm above the guideway.",
        concepts: ["fields", "equilibrium"],
        syllabusLink: "D.2 Magnetic Fields & Lorentz Force F = BIL",
        quantitativeInsight: "Eliminating mechanical wheel-rail rolling friction allows the Japanese L0-Series SCMaglev to achieve world-record commercial passenger speeds of 603 km/h with zero track contact."
      }
    ],
    conceptTracking: [
      { conceptId: "fields", intensity: 5, manifestation: "Electric and magnetic vector fields exerting non-contact forces on charge and current." },
      { conceptId: "conservation", intensity: 4, manifestation: "Energy conservation in electrostatic potential acceleration W = qV = \\Delta E_k." }
    ],
    examPromptTakeaway: "Magnetic force is always perpendicular to velocity: F_B does zero work and cannot alter particle kinetic energy.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the kinetic energy of a proton after moving through a magnetic field (kinetic energy is UNCHANGED because magnetic force is perpendicular to velocity).",
      paper2StructuredPrompt: "A horizontal wire of length 0.20 m and mass 14 g carries a current of 3.5 A through a uniform horizontal magnetic field. The magnetic force balances the weight of the wire, holding it suspended in mid-air. Calculate the minimum magnetic flux density B required and state its direction relative to current.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Equilibrium condition: Upward magnetic force equals downward gravitational weight: F_B = mg \\implies B I L \\sin(90^{\\circ}) = mg.",
        showWorking: "B = \\frac{mg}{IL} = \\frac{(0.014 kg)(9.81 m/s^2)}{(3.5 A)(0.20 m)} = \\frac{0.13734 N}{0.70 A m} = 0.1962 T.",
        unitsAndSigFigs: "B = 0.20 T (2 significant figures). Direction: By Fleming's Left-Hand Rule, if current flows eastward, magnetic field must point northward to produce an upward magnetic force."
      },
      pitfallsToAvoid: [
        "Forgetting to convert 14 g to 0.014 kg.",
        "Omitting the magnetic field direction when explicitly asked."
      ]
    },
    diagramIds: ["diag-electric-field-dipole-plates", "diag-magnetic-field-wire-solenoid"],
    primaryFormulas: [
      "F = k\\frac{|q_1 q_2|}{r^2}",
      "E = \\frac{F}{q} = k\\frac{Q}{r^2}",
      "E = \\frac{V}{d}",
      "F_B = qvB\\sin\\theta",
      "F_B = BIL\\sin\\theta"
    ]
  },
  {
    id: "top-d3",
    themeId: "theme-d",
    themeNumber: 4,
    topicCode: "D.3",
    displayCode: "D.3",
    syllabusRef: "IB Physics Guide D.3 / Tsokos Ch. 5 / Giancoli Ch. 20",
    title: "Motion in Electromagnetic Fields",
    subtitle: "Parabolic Trajectories in Electric Fields, Circular Motion in Magnetic Fields r = mv/(qB), and Velocity Selectors",
    level: "SL",
    strategicImportance: "FIELDS & FORCES CORNERSTONE",
    readingTimeMinutes: 10,
    summary:
      "When charged particles traverse electric and magnetic fields, their trajectories are determined by the distinct mathematical symmetries of electrostatic and magnetic forces. In a uniform electric field, a charged particle experiences a constant unidirectional force F_e = qE, resulting in constant acceleration a_y = qE / m perpendicular to initial velocity, tracing a parabolic trajectory precisely analogous to 2D gravitational projectile motion. In contrast, in a uniform perpendicular magnetic field, the Lorentz force F_B = qvB is always perpendicular to velocity, acting as a pure centripetal force that bends the particle into uniform circular motion of radius r = \\frac{mv}{qB}. Combining crossed electric and magnetic fields creates a velocity selector, transmitting only particles whose speed satisfies v = E / B.",
    speedReadBullets: [
      "Electric Field Trajectory (E): Constant force F = qE along field lines. Traces a PARABOLIC path: constant horizontal velocity v_x = u; constant transverse acceleration a_y = \\frac{qE}{m}.",
      "Magnetic Field Trajectory (B): Perpendicular force F_B = qvB acts as centripetal force. Traces a CIRCULAR path with constant speed v.",
      "Radius of Circular Magnetic Orbit: Equating centripetal force to magnetic force: \\frac{m v^2}{r} = q v B \\implies r = \\frac{m v}{q B} = \\frac{p}{q B} (orbit radius is proportional to momentum p).",
      "Cyclotron Period & Frequency: Period T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{q B}. Notice that period T is completely INDEPENDENT of speed v and radius r!",
      "Crossed-Field Velocity Selector: Perpendicular E and B fields where electric force F_e = qE balances magnetic force F_B = qvB in opposite directions: qE = qvB \\implies v = \\frac{E}{B}.",
      "Mass Spectrometer Principle: Ions filtered to speed v = E/B enter magnetic field B_2, separating by charge-to-mass ratio into semicircle arcs of diameter 2r = 2 \\frac{m v}{q B_2}.",
    ],
    primer5Min:
      "Recognize the trajectory signature immediately: Electric field \\implies Parabola (like gravity); Magnetic field \\implies Circle (pure centripetal force). In magnetic circular motion, remember that orbital radius is r = \\frac{mv}{qB}. Higher momentum (faster or heavier particles) produces a wider circle (larger r); stronger magnetic field or larger charge produces a tighter circle (smaller r). In velocity selectors, only particles with speed v = \\frac{E}{B} pass through undeflected—particles with higher speeds deflect towards the magnetic force direction; particles with lower speeds deflect towards the electric force direction.",
    subSections: [
      {
        id: "d3-s1",
        title: "Charged Particle Trajectory in Uniform Electric Fields",
        marker: "Parabolic Trajectories",
        content:
          "Consider a particle of mass m and positive charge q entering a uniform electric field \\vec{E} between parallel plates of length L with initial horizontal velocity u_x = u. The electric field exerts a constant vertical force F_y = qE directed along field lines, with zero horizontal force (F_x = 0). The equations of motion are directly isomorphic to gravitational projectile trajectories: Horizontal: x(t) = u t \\implies t = x / u. Vertical acceleration: a_y = \\frac{qE}{m}. Vertical position: y(t) = \\frac{1}{2} a_y t^2 = \\frac{qE}{2m u^2} x^2. This is the equation of a parabola. The vertical deflection upon emerging from the plates (at x = L) is y_{exit} = \\frac{q E L^2}{2 m u^2}.",
        analyticalTakeaway:
          "The exit angle \\theta is given by \\tan\\theta = \\frac{v_y}{v_x} = \\frac{a_y t}{u} = \\frac{q E L}{m u^2}. Doubling initial velocity reduces vertical deflection by a factor of 4.",
        keyFormulaOrFramework: "y = \\left( \\frac{qE}{2mu^2} \\right) x^2, \\quad a_y = \\frac{qE}{m}, \\quad v_y = \\left( \\frac{qE}{m} \\right) \\frac{L}{u}",
      },
      {
        id: "d3-s2",
        title: "Circular Orbit in Uniform Magnetic Fields & Mass Spectrometry",
        marker: "Centripetal Confinement",
        content:
          "When a charged particle enters a uniform magnetic field with velocity perpendicular to \\vec{B} (\\theta = 90°), the magnetic force F_B = qvB is directed perpendicular to the instantaneous velocity vector at every point along the path. Because \\vec{F}_B has zero component along \\vec{v}, it performs no work and does not alter kinetic energy. The force acts as a centripetal force: \\frac{m v^2}{r} = q v B. Canceling one power of v gives the orbital radius: r = \\frac{m v}{q B}. The period of revolution is T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{q B}, and cyclotron frequency is f_c = \\frac{qB}{2\\pi m}. Combining a velocity selector (v = E/B_1) with a deflection magnetic chamber (r = mv / qB_2) yields a mass spectrometer, separating isotopes by mass: m = \\frac{q B_1 B_2 r}{E}.",
        analyticalTakeaway:
          "In a bubble chamber or cloud chamber photograph, positive and negative particles curve in opposite directions, and spiraling paths with shrinking radius r indicate energy loss to ionization collisions (decreasing momentum p = mv).",
        keyFormulaOrFramework: "r = \\frac{mv}{qB}, \\quad T = \\frac{2\\pi m}{qB}, \\quad v_{selector} = \\frac{E}{B}",
        workedExample: {
          problem: "A proton (m = 1.67 \\times 10^-27 kg, q = 1.60 \\times 10^-19 C) is accelerated from rest through a potential difference V = 2500 V and enters a uniform magnetic field B = 0.35 T perpendicular to its path. Calculate: (a) the speed of the proton, and (b) the radius of its circular trajectory.",
          stepByStep: [
            "1. Conservation of energy: Work done by electric field equals kinetic energy gained: q V = \\frac{1}{2} m v^2.",
            "2. Speed: v = \\sqrt{\\frac{2 q V}{m}} = \\sqrt{\\frac{2(1.60 \\times 10^{-19} C)(2500 V)}{1.67 \\times 10^{-27} kg}} = \\sqrt{\\frac{8.00 \\times 10^{-16}}{1.67 \\times 10^{-27}}} = \\sqrt{4.7904 \\times 10^{11}} = 6.9213 \\times 10^5 m/s.",
            "3. Radius of circular path in B-field: r = \\frac{m v}{q B}.",
            "4. Compute radius: r = \\frac{(1.67 \\times 10^{-27} kg)(6.9213 \\times 10^5 m/s)}{(1.60 \\times 10^{-19} C)(0.35 T)} = \\frac{1.15585 \\times 10^{-21}}{5.60 \\times 10^{-20}} = 0.02064 m = 2.06 cm."
          ],
          finalAnswer: "(a) Speed = 6.92 \\times 10^5 m/s (692 km/s); (b) Orbit radius = 0.021 m (2.1 cm, 2 significant figures)."
        }
      }
    ],
    checkUnderstanding: [
      {
        id: "q-d3-1",
        question: "Explain how crossed electric and magnetic fields can be used to select particles of a single specific speed from a beam of ions containing a distribution of speeds and charges.",
        promptType: "explain",
        hints: ["What direction must the electric and magnetic forces act?", "Equate the two forces."],
        modelAnswer: "In a velocity selector, uniform electric (E) and magnetic (B) fields are arranged mutually perpendicular to each other and perpendicular to the incoming ion beam. The electric field exerts a force F_e = qE, while the magnetic field exerts a force F_B = qvB in the opposite direction. For a particle to travel straight through an exit aperture without deflection, the two opposing forces must balance exactly: F_e = F_B \\implies qE = qvB. Canceling charge q reveals that balance occurs if and only if particle speed is v = \\frac{E}{B}. Particles traveling faster than E/B experience F_B > F_e and are deflected into the walls; particles traveling slower experience F_e > F_B and are deflected in the opposite direction.",
        keyTermsToInclude: ["perpendicular crossed fields", "opposing electric and magnetic forces", "qE = qvB", "v = E / B undeflected condition"]
      },
      {
        id: "q-d3-2",
        question: "An electron (m = 9.11 \\times 10^-31 kg, q = 1.60 \\times 10^-19 C) orbits in a perpendicular magnetic field B = 5.0 \\times 10^-3 T. Calculate the period of the orbit and explain why this period is independent of orbit radius.",
        promptType: "calculation",
        hints: ["Use T = 2\\pi m / (qB)."],
        modelAnswer: "Orbital period is given by T = \\frac{2\\pi m}{q B} = \\frac{2\\pi (9.11 \\times 10^{-31} kg)}{(1.60 \\times 10^{-19} C)(5.0 \\times 10^{-3} T)} = \\frac{5.724 \\times 10^{-30}}{8.00 \\times 10^{-22}} = 7.155 \\times 10^{-9} s = 7.2 ns. The period is independent of radius because as radius increases, path circumference increases proportionally (C = 2\\pi r), but the speed required for that orbit also increases proportionally (v \\propto r via r = mv/qB). The two effects cancel exactly, so faster electrons on larger circles complete one revolution in the exact same time as slower electrons on smaller circles.",
        keyTermsToInclude: ["T = 2\\pi m / (qB) = 7.2 ns", "circumference proportional to r", "speed proportional to r", "effects cancel out"]
      }
    ],
    analysis: {
      coreThesis: "Electric and magnetic field geometries permit precise kinematic manipulation and isotope mass separation of charged subatomic particles.",
      theoreticalFoundations: "Lorentz force dynamics, relativistic electrodynamics, cyclotron resonance.",
      strategicEvaluation: "In exam problems with accelerating potential V and magnetic deflection B, always use energy conservation qV = 0.5 m v^2 to find velocity v, then substitute into r = mv / (qB) to find r = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}}.",
      commonMisconceptions: [
        "Confusing the roles of E and B fields (E field accelerates particles and changes kinetic energy; B field bends paths at constant kinetic energy).",
        "Believing cyclotron frequency depends on particle speed (it is constant, enabling fixed-frequency radiofrequency acceleration).",
        "Drawing circular paths in electric fields (electric fields produce parabolas; magnetic fields produce circles)."
      ],
      realWorldConnections: "CERN Large Hadron Collider beam steering dipole magnets, cyclotron particle accelerators for medical radioisotope production, and mass spectrometry in carbon-14 dating.",
      keyDiagrams: ["diag-charged-particle-e-field-parabola", "diag-charged-particle-b-field-circle"]
    },
    cases: [
      {
        id: "case-d3",
        title: "CERN Large Hadron Collider Superconducting Dipole Beam Steering",
        domainOrContext: "High-Energy Particle Accelerator Physics",
        physicalMechanism: "1232 superconducting niobium-titanium dipole electromagnets operating at 1.9 K generate 8.33 Tesla magnetic fields along a 27-km circular ring, providing centripetal Lorentz force F = qvB to bend 7 TeV protons (traveling at 0.999999991 c) around the LHC ring.",
        concepts: ["fields", "conservation"],
        syllabusLink: "D.3 Magnetic Circular Motion r = mv / qB",
        quantitativeInsight: "At 7 TeV, relativistic momentum is p \\approx 3.73 \\times 10^{-15} kg m/s. Maintaining an orbital bending radius r = 2800 m requires B = p / (qr) = (3.73 \\times 10^{-15}) / [(1.60 \\times 10^{-19})(2800)] \\approx 8.33 Tesla."
      }
    ],
    conceptTracking: [
      { conceptId: "fields", intensity: 5, manifestation: "Precise steering and spatial deflection of relativistic charged particles via Lorentz force." },
      { conceptId: "conservation", intensity: 5, manifestation: "Kinetic energy invariance during purely magnetic centripetal deflection." }
    ],
    examPromptTakeaway: "E-field produces parabolic trajectories; B-field produces circular trajectories with radius r = mv / (qB).",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the work done on a charge moving through a magnetic field (work done is ALWAYS ZERO because force is perpendicular to displacement).",
      paper2StructuredPrompt: "In a mass spectrometer, singly ionized uranium isotopes U-235 (mass 3.90 \\times 10^-25 kg) and U-238 (mass 3.95 \\times 10^-25 kg) each carrying charge +1.60 \\times 10^-19 C enter a velocity selector with E = 1.20 \\times 10^5 V/m and B_1 = 0.200 T. The ions then enter a deflection chamber with magnetic field B_2 = 0.500 T. Calculate the speed of the ions leaving the selector, the orbit radius for each isotope, and the spatial separation between their detector impact points after completing a semicircle.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Velocity selector v = E / B_1, circular orbit radius r = mv / (qB_2), detector separation \\Delta x = 2r_2 - 2r_1 = 2\\Delta r.",
        showWorking: "Speed v = (1.20 \\times 10^5) / 0.200 = 6.00 \\times 10^5 m/s; r_{235} = (3.90 \\times 10^{-25})(6.00 \\times 10^5) / [(1.60 \\times 10^{-19})(0.500)] = 2.34 \\times 10^{-19} / 8.00 \\times 10^{-20} = 2.925 m; r_{238} = (3.95 \\times 10^{-25})(6.00 \\times 10^5) / (8.00 \\times 10^{-20}) = 2.9625 m; Semicircle diameter separation \\Delta x = 2(r_{238} - r_{235}) = 2(2.9625 - 2.925) = 2(0.0375 m) = 0.0750 m.",
        unitsAndSigFigs: "Speed = 6.00 \\times 10^5 m/s; r_{235} = 2.93 m; r_{238} = 2.96 m; Detector separation = 0.075 m (7.5 cm, 3 significant figures)."
      },
      pitfallsToAvoid: [
        "Calculating separation as \\Delta r instead of diameter separation 2\\Delta r after completing a semicircle.",
        "Using B_1 instead of B_2 in the deflection chamber calculation."
      ]
    },
    diagramIds: ["diag-charged-particle-e-field-parabola", "diag-charged-particle-b-field-circle"],
    primaryFormulas: [
      "r = \\frac{mv}{qB}",
      "T = \\frac{2\\pi m}{qB}",
      "v = \\frac{E}{B}",
      "y = \\frac{qE}{2mu^2}x^2",
      "qV = \\frac{1}{2}mv^2"
    ]
  },
  {
    id: "top-d4-hl",
    themeId: "theme-d",
    themeNumber: 4,
    topicCode: "D.4",
    displayCode: "D.4 HL",
    syllabusRef: "IB Physics Guide D.4 (HL Only) / Electromagnetic Induction",
    title: "Electromagnetic Induction (HL)",
    subtitle: "Magnetic Flux, Faraday's Law, Lenz's Law, Motional EMF & AC Generators",
    level: "HL",
    strategicImportance: "FIELDS & FORCES CORNERSTONE",
    readingTimeMinutes: 10,
    summary:
      "HL Extension governing how changing magnetic flux induces electromotive force (EMF). Magnetic flux is $\\Phi = BA\\cos\\theta$, flux linkage is $N\\Phi$, Faraday's Law gives $\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}$, and Lenz's Law states the induced current opposes the change in flux that produced it (conservation of energy).",
    speedReadBullets: [
      "Magnetic Flux & Linkage: $\\Phi = B A \\cos\\theta$ (Webers, Wb), where $\\theta$ is the angle between $\\vec{B}$ and the area normal; Flux Linkage $= N\\Phi$.",
      "Faraday's Law: Induced EMF magnitude equals the rate of change of magnetic flux linkage: $\\varepsilon = -N\\frac{\\Delta \\Phi}{\\Delta t}$.",
      "Lenz's Law: The negative sign indicates the induced current creates a magnetic field opposing the flux change (required by energy conservation).",
      "Motional EMF: Straight conductor of length $L$ moving at speed $v$ perpendicular to $B$ induces $\\varepsilon = B v L$.",
      "AC Generator: Rotating coil at angular speed $\\omega$ gives $\\Phi(t) = BA\\cos(\\omega t)$ and $\\varepsilon(t) = NBA\\omega\\sin(\\omega t)$.",
    ],
    primer5Min:
      "Always check what $\\theta$ is measured from! In $\\Phi = BA\\cos\\theta$, $\\theta$ is the angle between the magnetic field and the NORMAL to the loop. If the field is parallel to the plane of the loop, $\\theta = 90^\\circ$ and $\\Phi = 0$.",
    subSections: [
      {
        id: "d4-hl-s1",
        title: "Faraday's Law, Lenz's Law & Sinusoidal AC Generation",
        marker: "HL Core",
        content:
          "Any change in magnetic field $B$, loop area $A$, or orientation $\\theta$ changes flux $\\Phi = BA\\cos\\theta$ and induces EMF $\\varepsilon = -N\\frac{d\\Phi}{dt}$. In an AC generator, doubling the rotation frequency $\\omega$ both doubles the peak EMF ($\\varepsilon_0 = NBA\\omega$) AND doubles the output frequency.",
        analyticalTakeaway:
          "Lenz's law is a direct consequence of energy conservation: if induced current reinforced the motion, kinetic energy would be created from nothing.",
        keyFormulaOrFramework: "\\Phi = BA\\cos\\theta, \\quad \\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}, \\quad \\varepsilon = BvL",
      },
    ],
    checkUnderstanding: [
      {
        id: "q-d4-hl-1",
        question: "A 200-turn circular coil of area 0.040 m^2 sits perpendicular to a 0.50 T magnetic field that drops uniformly to zero in 0.10 s. Calculate the induced EMF.",
        promptType: "calculation",
        hints: ["EMF = N * delta(BA) / delta(t)"],
        modelAnswer:
          "$\\Delta\\Phi = 0 - (0.50)(0.040) = -0.020\\text{ Wb}$. Induced EMF $|\\varepsilon| = 200 \\times 0.020 / 0.10 = 40\\text{ V}$.",
        keyTermsToInclude: ["Flux linkage", "Faraday's law", "40 V"],
        formulaUsed: "\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}",
      },
    ],
    analysis: {
      coreThesis: "Time-varying magnetic flux links electricity and magnetism, powering global electrical generation.",
      theoreticalFoundations: "Faraday (1831), Lenz (1834) & Maxwell-Faraday equation.",
      strategicEvaluation: "Watch out for whether $N$ (number of turns) is given; never omit $N$ in flux linkage.",
      commonMisconceptions: ["Thinking strong constant magnetic flux induces an EMF (only a CHANGE in flux induces EMF)."],
      realWorldConnections: "Wind turbine alternators, regenerative braking in EVs, and induction cooktops.",
      keyDiagrams: [],
    },
    cases: [],
    conceptTracking: [
      { conceptId: "fields", intensity: 5, manifestation: "Changing magnetic flux generates electric fields and EMF." },
      { conceptId: "conservation", intensity: 5, manifestation: "Lenz's law enforces conservation of energy." },
    ],
    examPromptTakeaway: "When a magnet falls through a copper tube, eddy currents create an upward opposing magnetic force, slowing the fall.",
    examBlueprint: {
      paper1TrapPattern: "Forgetting that maximum EMF occurs when flux $\\Phi$ is ZERO (steepest rate of change $\\Delta\\Phi/\\Delta t$).",
      paper2StructuredPrompt: "Use Faraday's and Lenz's laws to explain why a magnet falls slower through a closed copper ring than an open plastic ring.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Changing flux induces EMF (Faraday); closed ring allows eddy current.",
        showWorking: "Induced current creates opposing B-field (Lenz), exerting upward resistive force.",
        unitsAndSigFigs: "Qualitative mechanism.",
      },
      pitfallsToAvoid: ["Saying plastic conducts eddy currents."],
    },
    diagramIds: [],
    primaryFormulas: [
      "\\Phi = B A \\cos\\theta",
      "\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}",
      "\\varepsilon = B v L",
    ],
  },
];
