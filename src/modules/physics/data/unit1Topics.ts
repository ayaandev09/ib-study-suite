import { TopicData } from "./types";

export const THEME_A_TOPICS: TopicData[] = [
  {
    id: "top-a1",
    themeId: "theme-a",
    themeNumber: 1,
    topicCode: "A.1",
    displayCode: "A.1",
    syllabusRef: "IB Physics Guide A.1 / Tsokos Ch. 2 / Giancoli Ch. 2-3",
    title: "Kinematics & Projectile Motion",
    subtitle: "Motion in 1D and 2D, SUVAT Equations, Vector Decomposition, and Graphical Analysis",
    level: "SL",
    strategicImportance: "CORE MECHANICS FOUNDATION",
    readingTimeMinutes: 10,
    summary:
      "Kinematics describes the motion of bodies through space and time without reference to the forces causing that motion. It establishes the mathematical definitions of displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t). For constant acceleration, the five SUVAT equations permit analytical solutions in 1D and independent 2D trajectories (projectile motion under uniform gravity, neglecting air resistance). Velocity-time and displacement-time graphs provide essential geometric representations of motion via gradients and enclosed areas.",
    speedReadBullets: [
      "Vector vs. Scalar: Displacement ($s$), velocity ($v$), and acceleration ($a$) are vectors with magnitude and direction; distance and speed are scalars.",
      "Gradients & Areas: Displacement-time gradient = velocity ($\\frac{ds}{dt}$); Velocity-time gradient = acceleration ($\\frac{dv}{dt}$); Velocity-time area under curve = change in displacement ($\\Delta s$); Acceleration-time area = change in velocity ($\\Delta v$).",
      "SUVAT Equations (Constant $a$ ONLY): $v = u + at$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$, $s = \\frac{u + v}{2}t$, $s = vt - \\frac{1}{2}at^2$.",
      "Projectile Independence: Horizontal motion has zero acceleration ($a_x = 0$, $v_x = u\\cos\\theta = \\text{constant}$), while vertical motion experiences free-fall acceleration ($a_y = -g = -9.81\\text{ m s}^{-2}$).",
      "Time of Flight: Controlled solely by vertical dynamics: $t_{\\text{flight}} = \\frac{2u\\sin\\theta}{g}$ (for horizontal launch and landing).",
      "Terminal Velocity: In real fluids, drag force increases with speed until $F_{\\text{drag}} = mg$, resulting in net force $F_{\\text{net}} = 0$ and constant velocity.",
    ],
    primer5Min:
      "When tackling kinematics problems, always establish an explicit coordinate frame (+y upwards, +x forwards). Write down your 5 SUVAT variables: s, u, v, a, t. Identify which 3 are given and which one is needed. If acceleration is non-constant, you cannot use SUVAT—you must use graph calculus (tangent gradient or counting grid squares under the curve). In projectile problems, never mix horizontal and vertical components: time (t) is the sole scalar parameter bridging x and y axes.",
    subSections: [
      {
        id: "a1-s1",
        title: "Displacement, Velocity & Acceleration in 1D",
        marker: "Foundational Definitions",
        content:
          "Displacement ($s$) is the straight-line vector distance from a designated reference origin to the body's position (SI unit: $\\text{m}$). Velocity ($v$) is the rate of change of displacement with respect to time (SI unit: $\\text{m/s}$). Instantaneous velocity is the limit of average velocity as time intervals approach zero: $v = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t}$. Acceleration ($a$) is the rate of change of velocity (SI unit: $\\text{m/s}^2$): $a = \\frac{\\Delta v}{\\Delta t}$. A negative acceleration indicates either deceleration in the positive direction or acceleration in the negative direction.",
        analyticalTakeaway:
          "IB examiners test the distinction between deceleration (speed decreasing, $\\vec{a}$ opposite to $\\vec{v}$) and negative acceleration (vector points in the chosen negative coordinate direction).",
        keyFormulaOrFramework: "v = \\frac{ds}{dt}, \\quad a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}",
      },
      {
        id: "a1-s2",
        title: "The SUVAT Equations of Uniform Acceleration",
        marker: "Analytical Framework",
        content:
          "Under uniform (constant) acceleration, velocity changes linearly with time: $v(t) = u + at$. Integrating velocity over time gives displacement: $s = \\int (u + at)dt = ut + \\frac{1}{2}at^2$. Eliminating time yields the timeless energy-work relation: $v^2 = u^2 + 2as$. The average velocity formulation is $s = \\frac{u + v}{2}t$. These five kinematic relations are universally valid only when acceleration remains constant throughout the motion interval.",
        analyticalTakeaway:
          "Selecting the optimal SUVAT equation requires identifying the 'missing variable' not given or requested in the problem prompt.",
        keyFormulaOrFramework: "v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as",
        workedExample: {
          problem: "A high-speed train traveling at 40.0 m/s brakes with uniform deceleration of 2.50 m/s^2. Calculate the stopping distance and time taken to halt.",
          stepByStep: [
            "1. List knowns: $u = +40.0\\text{ m/s}$, $v = 0\\text{ m/s}$, $a = -2.50\\text{ m/s}^2$, find $s$ and $t$.",
            "2. Time taken: $v = u + at \\implies 0 = 40.0 + (-2.50)t \\implies t = 40.0 / 2.50 = 16.0\\text{ s}$.",
            "3. Stopping distance: $v^2 = u^2 + 2as \\implies 0 = 40.0^2 + 2(-2.50)s \\implies 0 = 1600 - 5.00s \\implies s = 320\\text{ m}$.",
            "4. Check via average velocity: $s = 0.5(u + v)t = 0.5(40.0 + 0)(16.0) = 320\\text{ m}$."
          ],
          finalAnswer: "Stopping distance = 320 m; Time = 16.0 s (both expressed to 3 significant figures)."
        }
      },
      {
        id: "a1-s3",
        title: "2D Projectile Motion & Vector Decomposition",
        marker: "Planar Trajectories",
        content:
          "In the absence of air resistance, horizontal and vertical motions are strictly independent. An initial launch velocity $u$ at angle $\\theta$ to the horizontal decomposes into orthogonal components: $u_x = u\\cos\\theta$ and $u_y = u\\sin\\theta$. Because horizontal gravity is zero ($a_x = 0$), horizontal velocity remains constant throughout flight: $v_x = u_x$. Vertically, the projectile undergoes free fall: $a_y = -g = -9.81\\text{ m/s}^2$. At peak altitude, vertical velocity momentarily equals zero: $v_y = 0$. Peak height is given by $h = \\frac{u^2\\sin^2\\theta}{2g}$, and horizontal range across level ground is $R = \\frac{u^2\\sin(2\\theta)}{g}$.",
        analyticalTakeaway:
          "Maximum range on level ground occurs at $\\theta = 45^{\\circ}$. Complementary launch angles (e.g., $30^{\\circ}$ and $60^{\\circ}$) achieve identical horizontal ranges but differing apogees and flight durations.",
        keyFormulaOrFramework: "x(t) = (u\\cos\\theta)t, \\quad y(t) = (u\\sin\\theta)t - \\frac{1}{2}gt^2",
      },
      {
        id: "a1-s4",
        title: "Fluid Resistance & Terminal Velocity",
        marker: "Non-Uniform Motion",
        content:
          "When a body moves through air or liquid, fluid drag opposes motion: $F_d \\propto v$ (laminar) or $F_d \\propto v^2$ (turbulent). The net downward equation of motion for a falling mass $m$ is $F_{\\text{net}} = mg - F_d = ma$. As velocity increases, drag increases, reducing net downward force and downward acceleration. When $F_d = mg$, acceleration drops to zero: $a = 0$. The body continues falling at a constant terminal velocity $v_t = \\sqrt{\\frac{2mg}{\\rho C_d A}}$.",
        analyticalTakeaway:
          "On a $v\\text{--}t$ graph of free fall with air resistance, the gradient begins at $g = 9.81\\text{ m/s}^2$ and asymptotically levels out horizontally at $v = v_t$.",
        keyFormulaOrFramework: "F_{\\text{net}} = mg - kv^2 = m \\frac{dv}{dt} \\implies v_t = \\sqrt{\\frac{mg}{k}}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-a1-1",
        question: "A ball is launched vertically upwards with speed u. At the highest point of its trajectory, what are its instantaneous velocity and acceleration?",
        promptType: "explain",
        hints: ["Think about what direction gravity acts at all points in time.", "Does gravity turn off at the top?"],
        modelAnswer: "Instantaneous velocity is 0 m/s (as the direction of motion reverses). Instantaneous acceleration remains 9.81 m/s^2 downwards, because gravity continues acting uninterrupted on the mass throughout its entire trajectory.",
        keyTermsToInclude: ["instantaneous velocity = 0", "acceleration = 9.81 m/s^2 downwards", "gravity acts continuously"]
      },
      {
        id: "q-a1-2",
        question: "Derive the maximum height h attained by a projectile launched at speed u at angle \\theta above the horizontal.",
        promptType: "derivation",
        hints: ["Use SUVAT on vertical component.", "What is v_y at peak height?"],
        modelAnswer: "In the vertical direction: u_y = u\\sin\\theta, v_y = 0 at peak height, a_y = -g. Applying v_y^2 = u_y^2 + 2a_y s_y gives 0 = (u\\sin\\theta)^2 - 2gh. Rearranging for h yields h = \\frac{u^2\\sin^2\\theta}{2g}.",
        keyTermsToInclude: ["v_y = 0", "u_y = u\\sin\\theta", "h = (u^2\\sin^2\\theta) / (2g)"]
      }
    ],
    analysis: {
      coreThesis: "Kinematics provides the universal geometric coordinates and differential calculus definitions of spatial translation.",
      theoreticalFoundations: "Galilean principle of velocity superposition, Newtonian Euclidean spacetime, and integral area-gradient relationships.",
      strategicEvaluation: "Common errors involve confusing average speed with instantaneous velocity, attempting SUVAT when air drag renders acceleration non-constant, and forgetting that vertical acceleration remains 9.81 m/s^2 at trajectory apex.",
      commonMisconceptions: [
        "Believing acceleration is zero at the apex of vertical throw (if a were 0, the ball would remain hovering at the peak).",
        "Assuming heavier objects fall faster in a vacuum (Galilean equivalence confirms all masses experience identical g).",
        "Mixing horizontal displacement into vertical SUVAT equations."
      ],
      realWorldConnections: "Ballistic missile targeting, Apollo lunar descent stages, sports biomechanics (javelin and high-jump optimization), and parachute terminal velocity aerodynamics.",
      keyDiagrams: ["diag-kinematics-graphs", "diag-projectile-trajectory"]
    },
    cases: [
      {
        id: "case-a1",
        title: "SpaceX Falcon 9 Stage 1 Boostback & Entry Burn",
        domainOrContext: "Aerospace Trajectory Optimization",
        physicalMechanism: "Stage 1 executes an exo-atmospheric flip and burns engines to cancel horizontal velocity v_x while descending in a parabolic ballistic arc, modulating drag grids to control terminal descent before touchdown.",
        concepts: ["conservation", "equilibrium"],
        syllabusLink: "A.1 Kinematics 2D Trajectories",
        quantitativeInsight: "Canceling a 1600 m/s horizontal velocity over 40 s requires an average reverse horizontal acceleration a_x = -40 m/s^2 (~4.1 g)."
      }
    ],
    conceptTracking: [
      { conceptId: "equilibrium", intensity: 4, manifestation: "Terminal velocity dynamic equilibrium where upward drag balances downward gravitational weight." },
      { conceptId: "invariance", intensity: 5, manifestation: "Uniform gravitational acceleration g is invariant for all freely falling masses in a local vacuum." }
    ],
    examPromptTakeaway: "Always separate vectors into orthogonal x-y components immediately upon reading the problem.",
    examBlueprint: {
      paper1TrapPattern: "Options claiming acceleration equals 0 at the highest point of a projectile throw, or misinterpreting the area under a v-t graph as speed instead of displacement.",
      paper2StructuredPrompt: "A rescue drone releases a supply capsule from an altitude of 120 m while flying horizontally at 35 m/s. Calculate the time to hit the ground, the horizontal impact distance, and the magnitude and direction of the impact velocity.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "State independent vertical free fall: s_y = 0.5 g t^2 and horizontal constant velocity: s_x = u_x t.",
        showWorking: "t = \\sqrt{2(120)/9.81} = 4.95 s; s_x = (35)(4.95) = 173 m; v_y = gt = 48.5 m/s; v = \\sqrt{35^2 + 48.5^2} = 59.8 m/s at \\arctan(48.5/35) = 54.2^{\\circ} below horizontal.",
        unitsAndSigFigs: "Explicitly state 3 significant figures: 4.95 s, 173 m, 59.8 m/s at 54^{\\circ} below horizontal."
      },
      pitfallsToAvoid: [
        "Forgetting to combine horizontal and vertical velocities via Pythagoras at landing.",
        "Using 10 m/s^2 instead of IB data booklet value g = 9.81 m/s^2."
      ]
    },
    diagramIds: ["diag-kinematics-graphs", "diag-projectile-trajectory"],
    primaryFormulas: [
      "v = u + at",
      "s = ut + \\frac{1}{2}at^2",
      "v^2 = u^2 + 2as",
      "s = \\frac{(u + v)t}{2}",
      "v_x = u\\cos\\theta, \\quad v_y = u\\sin\\theta - gt"
    ]
  },
  {
    id: "top-a2",
    themeId: "theme-a",
    themeNumber: 1,
    topicCode: "A.2",
    displayCode: "A.2",
    syllabusRef: "IB Physics Guide A.2 / Tsokos Ch. 2 / Giancoli Ch. 4",
    title: "Forces & Momentum",
    subtitle: "Newton's Laws of Motion, Friction, Translational Equilibrium, Linear Momentum, and Collisions",
    level: "SL",
    strategicImportance: "CORE MECHANICS FOUNDATION",
    readingTimeMinutes: 11,
    summary:
      "Forces cause accelerations by altering the momentum of physical systems. Newton's three laws establish that bodies maintain constant velocity unless subjected to a net external force (1st Law), that net force equals the rate of change of linear momentum F_{net} = \\Delta p / \\Delta t (2nd Law), and that interaction forces between two bodies are equal in magnitude, opposite in direction, and act on different objects (3rd Law). Static and dynamic friction constrain surface contact. Momentum is strictly conserved in all isolated collisions, with kinetic energy conserved only in perfectly elastic interactions.",
    speedReadBullets: [
      "Newton's 1st Law: If net force $\\Sigma F = 0$, the body remains at rest or moves with constant velocity in a straight line (translational equilibrium).",
      "Newton's 2nd Law: $F_{\\text{net}} = \\frac{\\Delta p}{\\Delta t}$. For constant mass, this reduces to $F_{\\text{net}} = ma$.",
      "Newton's 3rd Law: When body A exerts force on body B, body B exerts an equal, opposite, and simultaneous force on body A ($F_{A \\to B} = -F_{B \\to A}$). Both forces act on different bodies.",
      "Linear Momentum & Impulse: Momentum $p = mv$ (kg m/s). Impulse $J = F\\Delta t = \\Delta p = m(v - u)$. Impulse equals the area under a Force-time graph.",
      "Conservation of Momentum: In any closed, isolated system with no external forces, $\\Sigma p_{\\text{initial}} = \\Sigma p_{\\text{final}}$ ($m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$).",
      "Elastic vs. Inelastic: In elastic collisions, both momentum and kinetic energy are conserved; in inelastic collisions, momentum is conserved but KE is converted to thermal energy or deformation.",
      "Friction Models: Static friction adjusts to applied load: $F_s \\le \\mu_s R$ (max value $\\mu_s R$ at threshold of slipping); Dynamic (kinetic) friction is constant: $F_d = \\mu_d R$ (where $\\mu_d < \\mu_s$).",
    ],
    primer5Min:
      "Every forces question begins with a Free-Body Diagram (FBD). Isolate the single object, represent it as a point mass, and draw each force vector pointing outward from the center with correct relative lengths and clear labels (Weight $W = mg$, Normal reaction $R$, Friction $F_f$, Tension $T$). Decompose vectors parallel and perpendicular to the motion axis (e.g., along an inclined plane: $W_{\\parallel} = mg\\sin\\theta$, $W_{\\perp} = mg\\cos\\theta$). For collisions, always write the vector momentum conservation equation before calculating anything else.",
    subSections: [
      {
        id: "a2-s1",
        title: "Newton's Three Laws & Free-Body Diagrams",
        marker: "Dynamical Foundations",
        content:
          "Newton's First Law defines inertia and inertial reference frames: a mass persists in uniform straight-line motion unless compelled to change its state by net resultant force $\\Sigma \\vec{F} \\ne 0$. Newton's Second Law provides the fundamental equation of dynamics: $\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt}$. If mass is constant, this simplifies to $\\vec{F}_{\\text{net}} = m\\vec{a}$. Newton's Third Law reveals that forces are mutual pairwise interactions: $\\vec{F}_{AB} = -\\vec{F}_{BA}$. Free-body diagrams must only display forces acting ON the chosen body—never forces exerted BY the body on its surroundings.",
        analyticalTakeaway:
          "Common student mistake: Believing normal force $R$ and gravitational weight $W$ are a Newton's 3rd Law pair. They are not! $W$ is Earth pulling book; book pulling Earth is the 3rd law pair. $R$ is table pushing book; book pushing table is the other pair.",
        keyFormulaOrFramework: "\\Sigma \\vec{F} = m\\vec{a}, \\quad \\vec{F}_{AB} = -\\vec{F}_{BA}",
      },
      {
        id: "a2-s2",
        title: "Friction & Inclined Planes",
        marker: "Contact Mechanics",
        content:
          "Frictional resistance between two unlubricated solid surfaces arises from microscopic asperities interlocking and electrostatic adhesion. Static friction prevents relative motion: $F_f \\le \\mu_s R$, where $\\mu_s$ is the coefficient of static friction and $R$ is the normal contact force. Once sliding commences, dynamic friction takes over: $F_f = \\mu_d R$, where $\\mu_d < \\mu_s$. On an inclined plane inclined at angle $\\theta$, gravitational weight decomposes into $mg\\sin\\theta$ (accelerating mass down the slope) and $mg\\cos\\theta$ (balanced by normal reaction $R = mg\\cos\\theta$).",
        analyticalTakeaway:
          "The critical angle of slip $\\theta_c$ on an incline satisfies $\\tan\\theta_c = \\mu_s$. At this angle, downslope weight component $mg\\sin\\theta$ precisely matches maximum static friction $\\mu_s mg\\cos\\theta$.",
        keyFormulaOrFramework: "F_f \\le \\mu_s R, \\quad F_d = \\mu_d R, \\quad R = mg\\cos\\theta",
        workedExample: {
          problem: "A 5.0 kg wooden block rests on a 30.0^{\\circ} ramp with coefficient of static friction \\mu_s = 0.65 and dynamic friction \\mu_d = 0.40. Determine if the block slips, and calculate its acceleration down the ramp if it does.",
          stepByStep: [
            "1. Calculate normal force: $R = mg\\cos(30.0^{\\circ}) = (5.0)(9.81)(0.866) = 42.48\\text{ N}$.",
            "2. Maximum static friction: $F_{s,\\text{max}} = \\mu_s R = (0.65)(42.48) = 27.61\\text{ N}$.",
            "3. Downslope gravitational component: $F_{\\parallel} = mg\\sin(30.0^{\\circ}) = (5.0)(9.81)(0.500) = 24.53\\text{ N}$.",
            "4. Compare: Since $F_{\\parallel} (24.53\\text{ N}) < F_{s,\\text{max}} (27.61\\text{ N})$, the block does NOT slip. It remains in static equilibrium.",
            "5. The actual static friction force acting up the slope is exactly 24.53 N (not 27.61 N)."
          ],
          finalAnswer: "The block remains stationary (does not slip). Acceleration = 0 m/s^2; Static friction = 24.5 N."
        }
      },
      {
        id: "a2-s3",
        title: "Linear Momentum, Impulse & Collisions",
        marker: "Conservation Principles",
        content:
          "Linear momentum $\\vec{p} = m\\vec{v}$ is a vector quantity with SI units kg m/s or N s. Impulse $\\vec{J}$ is the time integral of net force: $\\vec{J} = \\int \\vec{F} dt = \\vec{F}_{\\text{avg}} \\Delta t = \\Delta \\vec{p}$. In a force-time graph, impulse is represented by the area under the curve. For any isolated collision ($\\Sigma \\vec{F}_{\\text{ext}} = 0$), total linear momentum is strictly conserved: $\\sum m_i \\vec{u}_i = \\sum m_i \\vec{v}_i$. If the collision is elastic, kinetic energy is also conserved: $\\frac{1}{2}m_1 u_1^2 + \\frac{1}{2}m_2 u_2^2 = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2$. In completely inelastic collisions, the bodies stick together with common velocity $v = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$.",
        analyticalTakeaway:
          "Airbag and crumple-zone safety systems operate by lengthening collision impact time $\\Delta t$, thereby dramatically decreasing average impact force $F = \\Delta p / \\Delta t$ experienced by vehicle occupants.",
        keyFormulaOrFramework: "J = F\\Delta t = \\Delta p, \\quad m_1 u_1 + m_2 u_2 = (m_1 + m_2)v",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-a2-1",
        question: "State Newton's Second Law in terms of momentum, and explain under what condition F = ma is valid.",
        promptType: "explain",
        hints: ["Recall the fundamental definition involving rate of change of momentum."],
        modelAnswer: "Newton's Second Law states that the net resultant force acting on a body is directly proportional to (and in the direction of) the rate of change of its linear momentum: F_{net} = \\frac{\\Delta p}{\\Delta t}. The special formulation F = ma is strictly valid only when the mass m of the system remains constant throughout the motion (dm/dt = 0).",
        keyTermsToInclude: ["rate of change of linear momentum", "F = \\Delta p / \\Delta t", "constant mass condition"]
      },
      {
        id: "q-a2-2",
        question: "A 0.15 kg baseball traveling horizontally at 38 m/s is struck by a bat and returns along the same line at 46 m/s. The contact duration is 1.2 ms. Calculate the average force exerted on the ball.",
        promptType: "calculation",
        hints: ["Take care of signs! Velocity reverses direction.", "Impulse = \\Delta p = m(v - u)."],
        modelAnswer: "Let incoming direction be positive (+38 m/s) and rebounding direction be negative (-46 m/s). Then \\Delta v = v - u = -46 - (+38) = -84 m/s. Impulse \\Delta p = m\\Delta v = (0.15 kg)(-84 m/s) = -12.6 N s. Average force F_{avg} = \\frac{\\Delta p}{\\Delta t} = \\frac{-12.6 N s}{0.0012 s} = -10,500 N = -10.5 kN (directed opposite to incoming pitch).",
        keyTermsToInclude: ["\\Delta v = -84 m/s", "impulse = 12.6 N s", "F = 1.05 \\times 10^4 N"]
      }
    ],
    analysis: {
      coreThesis: "Forces are interactions that transfer linear momentum across space and time subject to absolute conservation constraints.",
      theoreticalFoundations: "Newtonian mechanics, Noether's theorem relating spatial translation invariance to linear momentum conservation.",
      strategicEvaluation: "Exam questions often present inclined planes with friction or two-body connected pulley systems (Atwood machines). Success requires writing independent Newton 2nd Law equations for each mass and solving simultaneously.",
      commonMisconceptions: [
        "Confusing static friction with maximum static friction (static friction adjusts to match the applied force until \\mu_s R is breached).",
        "Assuming momentum is lost when a car hits a brick wall (momentum is transferred to the Earth, whose massive mass results in imperceptible acceleration).",
        "Believing kinetic energy is conserved in all explosions or collisions."
      ],
      realWorldConnections: "Automotive crumple zone design, rocket thrust generation via mass expulsion (Tsiolkovsky rocket equation), and particle collider momentum balance.",
      keyDiagrams: ["diag-free-body-incline", "diag-momentum-collision"]
    },
    cases: [
      {
        id: "case-a2",
        title: "Automotive Crash Absorption & Crumple Zones",
        domainOrContext: "Vehicle Structural Safety Engineering",
        physicalMechanism: "Engineered high-strength steel longitudinal rails buckle in controlled accordion patterns during a frontal collision, increasing deceleration distance from 0.1 m to 0.8 m and duration \\Delta t from 15 ms to 95 ms.",
        concepts: ["conservation", "equilibrium"],
        syllabusLink: "A.2 Forces & Impulse J = F\\Delta t",
        quantitativeInsight: "Increasing impact duration by a factor of 6.3 reduces average peak deceleration force on passenger chest cavity from 450 kN to ~70 kN, safely below human biological survivability thresholds."
      }
    ],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "Absolute conservation of total linear momentum in isolated systems." },
      { conceptId: "equilibrium", intensity: 4, manifestation: "Translational equilibrium condition where vector sum of all external forces is zero." }
    ],
    examPromptTakeaway: "Always check vector signs in collisions: velocities in opposing directions must have opposite algebraic signs.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the force on a body during collision where student ignores the reversal of velocity sign and subtracts instead of adding magnitudes.",
      paper2StructuredPrompt: "A 1200 kg car traveling at 18 m/s collides head-on with a stationary 2400 kg truck on a frictionless icy road. The two vehicles lock together upon impact. Calculate the combined post-collision speed, the loss in total kinetic energy, and state where the lost energy was dissipated.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Conservation of momentum for inelastic collision: m_1 u_1 + 0 = (m_1 + m_2)v.",
        showWorking: "v = (1200)(18) / (1200 + 2400) = 21600 / 3600 = 6.0 m/s. Initial KE = 0.5(1200)(18)^2 = 194.4 kJ. Final KE = 0.5(3600)(6.0)^2 = 64.8 kJ. Energy loss = 194.4 - 64.8 = 129.6 kJ.",
        unitsAndSigFigs: "Combined velocity = 6.0 m/s; KE loss = 130 kJ (2 significant figures). Energy dissipated as sound, thermal energy, and permanent plastic deformation of vehicle frames."
      },
      pitfallsToAvoid: [
        "Claiming kinetic energy is conserved in an inelastic collision.",
        "Rounding intermediate calculation steps causing rounding drift."
      ]
    },
    diagramIds: ["diag-free-body-incline", "diag-momentum-collision"],
    primaryFormulas: [
      "F_{net} = ma",
      "F_{net} = \\frac{\\Delta p}{\\Delta t}",
      "p = mv",
      "J = F\\Delta t = \\Delta p",
      "F_f \\le \\mu_s R, \\quad F_d = \\mu_d R",
      "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2"
    ]
  },
  {
    id: "top-a3",
    themeId: "theme-a",
    themeNumber: 1,
    topicCode: "A.3",
    displayCode: "A.3",
    syllabusRef: "IB Physics Guide A.3 / Tsokos Ch. 2 / Giancoli Ch. 6-7",
    title: "Work, Energy & Power",
    subtitle: "Work Done by Constant & Variable Forces, Kinetic & Potential Energy, Conservation Laws, and Efficiency",
    level: "SL",
    strategicImportance: "CORE MECHANICS FOUNDATION",
    readingTimeMinutes: 9,
    summary:
      "Work is the operational mechanism by which force transfers energy between physical stores. Work done by a constant force is the scalar product W = F s \\cos\\theta. When a variable force acts, work equals the area under a Force-displacement graph. Mechanical energy comprises translational kinetic energy (E_k = 0.5mv^2), gravitational potential energy (\\Delta E_p = mg\\Delta h in uniform fields), and elastic potential energy (E_p = 0.5k\\Delta x^2 for Hookean springs). Power is the rate of energy transfer P = \\Delta W / \\Delta t = Fv. Total energy in the universe is invariant; efficiency measures the proportion converted into useful output.",
    speedReadBullets: [
      "Work Done: W = F s \\cos\\theta (SI unit: Joule = N m = kg m^2 s^-2). Work is a scalar quantity. If force is perpendicular to displacement (\\theta = 90^{\\circ}), work done is zero (e.g., circular orbit gravity, normal force on horizontal floor).",
      "Force-Displacement Graphs: Work done equals the definite integral or area under the F-s graph. For Hookean spring (F = kx), area is triangular: W = 0.5 k x^2.",
      "Work-Energy Theorem: Net mechanical work done on a rigid body equals its change in kinetic energy: W_{net} = \\Delta E_k = 0.5 m v^2 - 0.5 m u^2.",
      "Gravitational Potential Energy: In a local uniform gravitational field, \\Delta E_p = mg\\Delta h.",
      "Elastic Potential Energy: E_p = \\frac{1}{2} k \\Delta x^2 = \\frac{1}{2} F \\Delta x (for springs obeying Hooke's Law F = k\\Delta x).",
      "Conservation of Mechanical Energy: In conservative fields (zero non-conservative friction/drag), total mechanical energy is constant: E_k + E_p = \\text{constant}.",
      "Power & Efficiency: Power P = \\frac{W}{t} = Fv (SI unit: Watt = J/s). Efficiency \\eta = \\frac{\\text{Useful Energy Output}}{\\text{Total Energy Input}} = \\frac{P_{out}}{P_{in}} \\times 100\%.",
    ],
    primer5Min:
      "Energy methods are often far simpler than Newton's 2nd Law because energy is a scalar quantity—no vector decomposition required! When analyzing roller coasters, pendulums, or falling masses, equate initial total mechanical energy to final total mechanical energy: E_{k,i} + E_{p,i} = E_{k,f} + E_{p,f} + W_{friction}. Note that power can be expressed as P = Fv when moving at constant speed v against resistive force F.",
    subSections: [
      {
        id: "a3-s1",
        title: "Work Done by Constant & Variable Forces",
        marker: "Energetic Foundations",
        content:
          "Mechanical work $W$ is defined as the product of the component of force in the direction of displacement and the magnitude of that displacement: $W = F s \\cos\\theta$. When a variable force acts (such as expanding gas or compressing a spring), work done corresponds to the area enclosed under the force-displacement curve: $W = \\int_{s_1}^{s_2} F(s) ds$. If the force-displacement curve is non-linear, area is determined by geometric decomposition or numerical grid-square counting.",
        analyticalTakeaway:
          "Centripetal forces in uniform circular motion do ZERO work because force vector $\\vec{F}_c$ is everywhere perpendicular to velocity $\\vec{v}$ ($\\cos 90^{\\circ} = 0$). The speed and kinetic energy of the orbiting body remain invariant.",
        keyFormulaOrFramework: "W = F s \\cos\\theta, \\quad W = \\int F ds = \\text{Area under } F-s \\text{ curve}",
      },
      {
        id: "a3-s2",
        title: "Forms of Mechanical Energy & Work-Energy Principle",
        marker: "Potential & Kinetic Stores",
        content:
          "Kinetic energy $E_k = \\frac{1}{2}mv^2$ represents the energy possessed by an object due to its motion. Gravitational potential energy $\\Delta E_p = mg\\Delta h$ represents energy stored through work done against a uniform gravitational field. Elastic potential energy $E_p = \\frac{1}{2}k\\Delta x^2$ is stored in deformed elastic media obeying Hooke's Law $F = k\\Delta x$. The Work-Energy Theorem states that the net work done by all forces equals the change in kinetic energy: $W_{\\text{net}} = \\Delta E_k$.",
        analyticalTakeaway:
          "Hookean spring graphs (Force vs. extension $x$) yield a straight line of gradient $k$. The triangular area beneath the line represents stored elastic potential energy $E_p = \\frac{1}{2} k x^2$.",
        keyFormulaOrFramework: "E_k = \\frac{1}{2}mv^2, \\quad \\Delta E_p = mg\\Delta h, \\quad E_{elastic} = \\frac{1}{2}k\\Delta x^2",
        workedExample: {
          problem: "A 0.20 kg ball is dropped from a height of 15.0 m above a vertical spring with force constant k = 800 N/m. Calculate the maximum compression of the spring upon impact (assume zero energy loss to air resistance).",
          stepByStep: [
            "1. Choose reference datum at the point of maximum spring compression x.",
            "2. Total vertical drop of the ball is $h + x = 15.0 + x$ meters.",
            "3. Initial state: Ball at rest at height $(15.0 + x)$, so $E_i = mg(h + x)$.",
            "4. Final state: Ball momentarily stationary at max compression $x$, so all energy is stored in spring: $E_f = 0.5 k x^2$.",
            "5. Equate: $mg(15.0 + x) = 0.5 k x^2 \\implies 0.5(800)x^2 - (0.20)(9.81)x - (0.20)(9.81)(15.0) = 0$.",
            "6. Simplify: $400 x^2 - 1.962 x - 29.43 = 0$.",
            "7. Solve quadratic: $x = \\frac{1.962 \\pm \\sqrt{1.962^2 - 4(400)(-29.43)}}{800} = \\frac{1.962 + \\sqrt{3.85 + 47088}}{800} = \\frac{1.962 + 217.0}{800} = 0.274\\text{ m}$."
          ],
          finalAnswer: "Maximum spring compression x = 0.27 m (or 27 cm, to 2 significant figures)."
        }
      },
      {
        id: "a3-s3",
        title: "Power & Mechanical Efficiency",
        marker: "Transfer Rates",
        content:
          "Power is the rate at which work is performed or energy is converted: $P = \\frac{\\Delta W}{\\Delta t}$. For a machine exerting force $F$ to maintain constant velocity $v$ against resistive forces, power is $P = F v$. In real mechanical systems, thermodynamic dissipation converts a fraction of input energy into disordered thermal vibrational energy. Efficiency $\\eta$ is the dimensionless ratio of useful output to total input: $\\eta = \\frac{E_{\\text{useful}}}{E_{\\text{total}}} = \\frac{P_{\\text{useful}}}{P_{\\text{total}}}$.",
        analyticalTakeaway:
          "To accelerate an automobile, engine power must supply both rate of increase of kinetic energy ($dE_k/dt = m v a$) and power dissipated by aerodynamic drag ($P_{\\text{drag}} = F_{\\text{drag}} v = k v^3$).",
        keyFormulaOrFramework: "P = \\frac{W}{t} = F v, \\quad \\eta = \\frac{\\text{Useful Work Output}}{\\text{Total Energy Input}}",
      }
    ],
    checkUnderstanding: [
      {
        id: "q-a3-1",
        question: "A satellite orbits Earth in a circular trajectory at constant speed. Explain why the gravitational force does zero work on the satellite.",
        promptType: "explain",
        hints: ["What is the angle between gravitational force and orbital velocity?"],
        modelAnswer: "Work done is given by W = F s \\cos\\theta. For a circular orbit, the gravitational force acts radially toward the center of the Earth, which is everywhere perpendicular (\\theta = 90^{\\circ}) to the tangential velocity and displacement vector of the satellite. Because \\cos(90^{\\circ}) = 0, work done is identically zero, and the orbital kinetic energy remains constant.",
        keyTermsToInclude: ["W = F s \\cos\\theta", "force perpendicular to displacement", "\\cos 90^{\\circ} = 0", "kinetic energy constant"]
      },
      {
        id: "q-a3-2",
        question: "An electric hoist powered by an 850 W motor lifts a 50 kg concrete block through a vertical height of 12 m in 8.5 seconds. Calculate the mechanical efficiency of the hoist.",
        promptType: "calculation",
        hints: ["Calculate useful work done lifting the block against gravity.", "Calculate electrical energy supplied by the motor."],
        modelAnswer: "Useful work done: W_{useful} = mg\\Delta h = (50 kg)(9.81 m/s^2)(12 m) = 5886 J. Total energy supplied: E_{in} = P \\times t = (850 W)(8.5 s) = 7225 J. Efficiency \\eta = \\frac{W_{useful}}{E_{in}} = \\frac{5886 J}{7225 J} = 0.8146 = 81.5\%.",
        keyTermsToInclude: ["W_{useful} = mg\\Delta h = 5890 J", "E_{in} = 7230 J", "efficiency = 81% or 82%"]
      }
    ],
    analysis: {
      coreThesis: "Energy is the conserved scalar currency of nature; work represents the transactional mechanism of energetic transformation.",
      theoreticalFoundations: "First Law of Thermodynamics, mechanical work-energy theorem, and conservative field vector potential gradients.",
      strategicEvaluation: "Whenever a question involves changes in height, speed, or spring extensions without asking for time explicitly, choose conservation of energy over kinematic SUVAT equations.",
      commonMisconceptions: [
        "Believing work is done whenever a person holds a heavy weight stationary (holding it consumes biological metabolic energy, but mechanical work is zero since s = 0).",
        "Confusing power with energy (power is the rate of energy transfer per unit time).",
        "Forgetting to square the velocity in kinetic energy equations (doubling speed quadruples stopping distance)."
      ],
      realWorldConnections: "Hydroelectric pumped-storage power stations (gravitational E_p to electrical energy), regenerative braking in electric vehicles, and pole vaulting elastic-to-gravitational energy transfers.",
      keyDiagrams: ["diag-energy-conservation-bars", "diag-spring-force-extension"]
    },
    cases: [
      {
        id: "case-a3",
        title: "Dinorwig Hydroelectric Pumped Storage Station",
        domainOrContext: "Grid-Scale Energy Storage",
        physicalMechanism: "During periods of low electricity demand, 7 million cubic meters of water are pumped up 500 m to Marchlyn Mawr reservoir (storing gravitational E_p). During peak demand, water rushes through Francis turbines back down, converting E_p \\to E_k \\to electrical energy in under 16 seconds.",
        concepts: ["conservation", "equilibrium"],
        syllabusLink: "A.3 Work, Energy & Power P = \\Delta E / \\Delta t",
        quantitativeInsight: "Total stored energy E_p = mgh = (7 \\times 10^9 kg)(9.81)(500 m) \\approx 3.43 \\times 10^{13} J (9.5 GWh), discharging at peak electrical power output of 1.72 GW with ~75% round-trip cycle efficiency."
      }
    ],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "Absolute conservation of total mechanical and thermodynamic energy." },
      { conceptId: "invariance", intensity: 4, manifestation: "Zero work performed along equipotential surfaces or perpendicular trajectories." }
    ],
    examPromptTakeaway: "Use E_k + E_p = constant whenever time is not explicitly required in the problem prompt.",
    examBlueprint: {
      paper1TrapPattern: "Questions asking for the work done carrying a box horizontally across a flat floor at constant speed (the upward normal force is perpendicular to horizontal displacement, so W = 0).",
      paper2StructuredPrompt: "A 75 kg skier starts from rest at the top of a 45 m high slope. At the bottom, their speed is measured to be 26 m/s. Calculate the mechanical work done against friction during the descent, and find the average resistive force if the slope length is 120 m.",
      commandTerm: "Calculate",
      idealSolutionBreakdown: {
        statePrinciples: "Work-energy conservation: Initial E_p = Final E_k + W_{friction}.",
        showWorking: "Initial E_p = mgh = (75)(9.81)(45) = 33,109 J. Final E_k = 0.5 m v^2 = 0.5(75)(26)^2 = 25,350 J. W_{friction} = 33,109 - 25,350 = 7,759 J. Average resistive force F_{avg} = W_{friction} / d = 7,759 / 120 = 64.7 N.",
        unitsAndSigFigs: "Work against friction = 7.8 kJ; Average resistive force = 65 N (2 significant figures)."
      },
      pitfallsToAvoid: [
        "Neglecting friction and assuming speed must equal \\sqrt{2gh}.",
        "Expressing final energy answers in raw non-rounded calculator strings."
      ]
    },
    diagramIds: ["diag-energy-conservation-bars", "diag-spring-force-extension"],
    primaryFormulas: [
      "W = F s \\cos\\theta",
      "E_k = \\frac{1}{2}mv^2",
      "\\Delta E_p = mg\\Delta h",
      "E_p = \\frac{1}{2}k\\Delta x^2",
      "P = \\frac{W}{t} = Fv",
      "\\eta = \\frac{E_{useful}}{E_{total}} = \\frac{P_{useful}}{P_{total}}"
    ]
  },
  {
    id: "top-a4-hl",
    themeId: "theme-a",
    themeNumber: 1,
    topicCode: "A.4",
    displayCode: "A.4 HL",
    syllabusRef: "IB Physics Guide A.4 (HL Only) / Rigid Body Mechanics",
    title: "Rigid Body Mechanics (HL)",
    subtitle: "Torque, Moment of Inertia, Angular Kinematics, Rotational Kinetic Energy & Angular Momentum",
    level: "HL",
    strategicImportance: "CORE MECHANICS FOUNDATION",
    readingTimeMinutes: 10,
    summary:
      "HL Extension generalizing Newtonian mechanics to rotating rigid bodies. Torque $\\tau = Fr\\sin\\theta$ causes angular acceleration $\\alpha$ according to $\\tau = I\\alpha$, where $I = \\sum mr^2$ is the moment of inertia. Rotational kinetic energy is $E_k = \\frac{1}{2}I\\omega^2$ and angular momentum $L = I\\omega$ is conserved when net external torque is zero.",
    speedReadBullets: [
      "Torque: $\\tau = F r \\sin\\theta$ (SI unit: N m). Static rotational equilibrium requires $\\sum \\tau = 0$.",
      "Moment of Inertia: $I = \\sum m_i r_i^2$ depends on both mass and its radial distribution from the rotation axis.",
      "Rotational Dynamics: $\\tau = I\\alpha$; angular impulse $\\Delta L = \\tau \\Delta t = I\\Delta\\omega$.",
      "Rotational Kinetic Energy: $E_{k,\\text{rot}} = \\frac{1}{2}I\\omega^2$; rolling without slipping satisfies $v = \\omega r$ and $E_{k,\\text{total}} = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$.",
      "Conservation of Angular Momentum: If $\\sum \\tau_{\\text{ext}} = 0$, then $I_1\\omega_1 = I_2\\omega_2$ (e.g. ice skater pulling arms in).",
    ],
    primer5Min:
      "Every linear equation has an exact rotational twin: $x \\to \\theta$, $v \\to \\omega$, $a \\to \\alpha$, $m \\to I$, $F \\to \\tau$, $p \\to L$. When a cylinder rolls down a ramp, gravitational potential energy splits between translational ($\\frac{1}{2}mv^2$) and rotational ($\\frac{1}{2}I\\omega^2$) kinetic energy!",
    subSections: [
      {
        id: "a4-hl-s1",
        title: "Torque, Moment of Inertia & Angular Momentum Conservation",
        marker: "HL Core",
        content:
          "Torque measures the turning effect of a force about a pivot: $\\tau = Fr\\sin\\theta$. The rotational analogue of mass is the moment of inertia $I = \\sum mr^2$, which governs angular acceleration via Newton's second law for rotation: $\\tau = I\\alpha$. When no external torque acts, total angular momentum $L = I\\omega$ remains constant, so reducing $I$ proportionally increases angular velocity $\\omega$ (while increasing rotational kinetic energy via internal muscular work).",
        analyticalTakeaway:
          "A solid sphere ($I = \\frac{2}{5}mr^2$) always beats a hollow cylinder ($I = mr^2$) down an incline because a smaller fraction of $mgh$ goes into rotation.",
        keyFormulaOrFramework: "\\tau = Fr\\sin\\theta = I\\alpha, \\quad E_k = \\frac{1}{2}I\\omega^2, \\quad L = I\\omega",
      },
    ],
    checkUnderstanding: [
      {
        id: "q-a4-hl-1",
        question: "A figure skater spinning at 2.0 rad/s pulls her arms inward, reducing her moment of inertia from 4.5 kg m^2 to 1.5 kg m^2. Find her new angular velocity.",
        promptType: "calculation",
        hints: ["Conservation of angular momentum: I1*w1 = I2*w2"],
        modelAnswer:
          "By conservation of angular momentum ($\\tau_{\\text{ext}} = 0$), $I_1\\omega_1 = I_2\\omega_2 \\implies 4.5 \\times 2.0 = 1.5 \\times \\omega_2 \\implies \\omega_2 = 6.0\\text{ rad/s}$.",
        keyTermsToInclude: ["Conservation of angular momentum", "Zero external torque", "6.0 rad/s"],
        formulaUsed: "I_1\\omega_1 = I_2\\omega_2",
      },
    ],
    analysis: {
      coreThesis: "Rotational inertia and angular momentum conservation unify rigid-body dynamics with orbital and atomic physics.",
      theoreticalFoundations: "Euler's rotational equations and Noether's theorem (rotational symmetry).",
      strategicEvaluation: "Remember to express $\\omega$ in rad/s (not rev/s or rpm) before computing $E_k$ or $L$.",
      commonMisconceptions: ["Assuming rotational kinetic energy is conserved when an ice skater pulls arms in (it increases due to internal work)."],
      realWorldConnections: "Flywheel energy storage, pulsar spin-up after core collapse, and spacecraft reaction wheels.",
      keyDiagrams: [],
    },
    cases: [],
    conceptTracking: [
      { conceptId: "conservation", intensity: 5, manifestation: "Conservation of angular momentum $L = I\\omega$ under zero net torque." },
    ],
    examPromptTakeaway: "Use $v = \\omega r$ and $a = \\alpha r$ for rolling without slipping.",
    examBlueprint: {
      paper1TrapPattern: "Forgetting to include $\\frac{1}{2}I\\omega^2$ when finding the speed of a rolling sphere at the bottom of a ramp.",
      paper2StructuredPrompt: "Derive the speed of a solid cylinder ($I = \\frac{1}{2}mr^2$) rolling without slipping from rest down a height $h$.",
      commandTerm: "Derive",
      idealSolutionBreakdown: {
        statePrinciples: "Energy conservation: $mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$ with $\\omega = v/r$.",
        showWorking: "$mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}(\\frac{1}{2}mr^2)(v/r)^2 = \\frac{3}{4}mv^2 \\implies v = \\sqrt{\\frac{4}{3}gh}$.",
        unitsAndSigFigs: "Symbolic expression in terms of $g$ and $h$.",
      },
      pitfallsToAvoid: ["Using $v = \\sqrt{2gh}$ for a rolling object."],
    },
    diagramIds: [],
    primaryFormulas: [
      "\\tau = F r \\sin\\theta",
      "I = \\sum m r^2",
      "\\tau = I\\alpha",
      "E_k = \\frac{1}{2}I\\omega^2",
      "L = I\\omega",
    ],
  },
  {
    id: "top-a5-hl",
    themeId: "theme-a",
    themeNumber: 1,
    topicCode: "A.5",
    displayCode: "A.5 HL",
    syllabusRef: "IB Physics Guide A.5 (HL Only) / Galilean & Special Relativity",
    title: "Galilean & Special Relativity (HL)",
    subtitle: "Lorentz Factor, Time Dilation, Length Contraction, Relativistic Velocity & Energy-Momentum",
    level: "HL",
    strategicImportance: "CORE MECHANICS FOUNDATION",
    readingTimeMinutes: 11,
    summary:
      "HL Extension contrasting Galilean transformations ($x' = x - vt$) with Einstein's two postulates of Special Relativity: physical laws are identical in all inertial frames, and the speed of light $c$ in vacuum is invariant. Introduces the Lorentz factor $\\gamma$, time dilation, length contraction, relativistic velocity addition, spacetime diagrams, and $E^2 = p^2c^2 + m_0^2c^4$.",
    speedReadBullets: [
      "Lorentz Factor: $\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1$.",
      "Time Dilation: $\\Delta t = \\gamma \\Delta t_0$ (moving clocks run slower; $\\Delta t_0$ is proper time measured at rest relative to events).",
      "Length Contraction: $L = \\frac{L_0}{\\gamma}$ (moving lengths contract along direction of motion; $L_0$ is proper length).",
      "Relativistic Velocity Addition: $u' = \\frac{u - v}{1 - uv/c^2}$ guarantees no object exceeds $c$.",
      "Relativistic Energy-Momentum: $E = \\gamma m_0 c^2$, $E^2 = (pc)^2 + (m_0 c^2)^2$ (for massless photons, $E = pc$).",
    ],
    primer5Min:
      "Always identify the PROPER time $\\Delta t_0$ (measured by a single clock present at both events) and PROPER length $L_0$ (measured in the object's rest frame). Moving observers always measure LONGER time ($\\gamma\\Delta t_0$) and SHORTER length ($L_0/\\gamma$).",
    subSections: [
      {
        id: "a5-hl-s1",
        title: "Time Dilation, Length Contraction & Relativistic Energy",
        marker: "HL Core",
        content:
          "Because the speed of light $c$ is invariant for all inertial observers, space and time intervals become frame-dependent via the Lorentz transformations: $x' = \\gamma(x - vt)$ and $t' = \\gamma(t - vx/c^2)$. Atmospheric muons created at 10 km altitude survive to sea level because in Earth's frame their half-life is dilated by $\\gamma$, while in the muon's frame the 10 km atmosphere is length-contracted by $1/\\gamma$.",
        analyticalTakeaway:
          "Both frames agree on the physical outcome (muons reach Earth) via complementary relativistic effects.",
        keyFormulaOrFramework: "\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}, \\quad \\Delta t = \\gamma\\Delta t_0, \\quad L = \\frac{L_0}{\\gamma}, \\quad E^2 = p^2c^2 + m_0^2c^4",
      },
    ],
    checkUnderstanding: [
      {
        id: "q-a5-hl-1",
        question: "A muon travels at $v = 0.98c$ relative to Earth. Calculate the Lorentz factor $\\gamma$ and the dilated lifetime if its proper half-life is $2.2\\,\\mu\\text{s}$.",
        promptType: "calculation",
        hints: ["gamma = 1 / sqrt(1 - 0.98^2)"],
        modelAnswer:
          "$\\gamma = 1 / \\sqrt{1 - 0.9604} = 1 / \\sqrt{0.0396} \\approx 5.03$. Dilated half-life $\\Delta t = 5.03 \\times 2.2\\,\\mu\\text{s} = 11.1\\,\\mu\\text{s}$.",
        keyTermsToInclude: ["Lorentz factor 5.03", "Proper time", "Time dilation"],
        formulaUsed: "\\Delta t = \\gamma\\Delta t_0",
      },
    ],
    analysis: {
      coreThesis: "Invariance of $c$ unifies space and time into 4D Minkowski spacetime and mass with energy.",
      theoreticalFoundations: "Einstein (1905) Special Relativity & Minkowski spacetime geometry.",
      strategicEvaluation: "Watch out for the sign in relativistic velocity addition when objects approach vs recede.",
      commonMisconceptions: ["Reversing proper length and contracted length."],
      realWorldConnections: "GPS satellites require relativistic time-dilation corrections to maintain meter-level accuracy.",
      keyDiagrams: [],
    },
    cases: [],
    conceptTracking: [
      { conceptId: "invariance", intensity: 5, manifestation: "Speed of light $c$ and spacetime interval $(\\Delta s)^2 = (c\\Delta t)^2 - \\Delta x^2$ are Lorentz invariant." },
    ],
    examPromptTakeaway: "Use MeV/c^2 for mass and MeV/c for momentum to simplify $E^2 = (pc)^2 + (m_0c^2)^2$ calculations.",
    examBlueprint: {
      paper1TrapPattern: "Confusing which observer measures proper time $\\Delta t_0$.",
      paper2StructuredPrompt: "Explain how atmospheric muon detection provides experimental evidence for special relativity from both Earth and muon frames.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Time dilation in Earth frame; length contraction in muon frame.",
        showWorking: "State $\\Delta t = \\gamma\\Delta t_0$ and $L = L_0/\\gamma$.",
        unitsAndSigFigs: "Consistent units and 2–3 sig figs.",
      },
      pitfallsToAvoid: ["Applying Galilean velocity addition $u + v$ at speeds near $c$."],
    },
    diagramIds: [],
    primaryFormulas: [
      "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}",
      "\\Delta t = \\gamma\\Delta t_0",
      "L = \\frac{L_0}{\\gamma}",
      "u' = \\frac{u - v}{1 - uv/c^2}",
      "E^2 = p^2c^2 + m_0^2c^4",
    ],
  },
];
