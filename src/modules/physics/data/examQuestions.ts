import { FlashcardItem, QuizQuestion } from "./types";

export const FLASHCARDS: FlashcardItem[] = [
  {
    id: "fc-01",
    themeId: "theme-a",
    topicCode: "A.1",
    category: "definition",
    front: "What is the defining distinction between a vector and a scalar in kinematics?",
    back: "A scalar has magnitude only (e.g. speed, distance, time, energy); a vector has both magnitude AND direction (e.g. displacement, velocity, acceleration, force, momentum)."
  },
  {
    id: "fc-02",
    themeId: "theme-a",
    topicCode: "A.1",
    category: "formula-recall",
    front: "Under what specific condition are the SUVAT equations valid?",
    back: "The SUVAT equations are valid ONLY when acceleration 'a' is strictly constant (uniform) throughout the entire time interval.",
    formulaLatex: "v = u + at, \\quad s = ut + \\frac{1}{2}at^2"
  },
  {
    id: "fc-03",
    themeId: "theme-a",
    topicCode: "A.2",
    category: "concept",
    front: "State Newton's Second Law in terms of linear momentum.",
    back: "The net resultant force acting on a body is directly proportional to (and in the direction of) the rate of change of its linear momentum: F_{net} = \\Delta p / \\Delta t.",
    formulaLatex: "F_{net} = \\frac{\\Delta p}{\\Delta t} = ma \\quad (\\text{constant } m)"
  },
  {
    id: "fc-04",
    themeId: "theme-a",
    topicCode: "A.3",
    category: "concept",
    front: "Why does a centripetal force perform ZERO mechanical work on an orbiting body?",
    back: "Work is W = F s \\cos\\theta. In circular motion, centripetal force acts radially inward, which is everywhere perpendicular (\\theta = 90°) to the tangential displacement vector. Since \\cos(90°) = 0, work done is identically zero.",
    formulaLatex: "W = F s \\cos(90^{\\circ}) = 0"
  },
  {
    id: "fc-05",
    themeId: "theme-b",
    topicCode: "B.1",
    category: "concept",
    front: "Why does temperature remain constant during a substance's phase change?",
    back: "Temperature measures average molecular kinetic energy. During a phase change, supplied thermal energy does work breaking intermolecular bonds (increasing intermolecular potential energy), leaving kinetic energy unchanged.",
    formulaLatex: "Q = mL, \\quad \\Delta E_k = 0"
  },
  {
    id: "fc-06",
    themeId: "theme-b",
    topicCode: "B.2",
    category: "formula-recall",
    front: "State the Stefan-Boltzmann law and Wien's displacement law.",
    back: "Stefan-Boltzmann: P = e \\sigma A T^4 (total radiant power). Wien's Law: \\lambda_{max} T = 2.90 \\times 10^{-3} m K (peak emission wavelength is inversely proportional to Kelvin temperature).",
    formulaLatex: "P = e\\sigma A T^4, \\quad \\lambda_{max} T = 2.90 \\times 10^{-3} \\text{ m K}"
  },
  {
    id: "fc-07",
    themeId: "theme-b",
    topicCode: "B.5",
    category: "definition",
    front: "Distinguish between Electromotive Force (EMF) and Terminal Potential Difference.",
    back: "EMF (\\mathcal{E}) is total electrical energy supplied by the source per unit charge. Terminal PD (V) is the voltage available across the external circuit terminals, reduced by internal resistance: V = \\mathcal{E} - Ir.",
    formulaLatex: "\\mathcal{E} = V + Ir"
  },
  {
    id: "fc-08",
    themeId: "theme-c",
    topicCode: "C.1",
    category: "definition",
    front: "What is the defining condition of Simple Harmonic Motion (SHM)?",
    back: "Acceleration is directly proportional to displacement from an equilibrium position and is always directed towards that equilibrium position.",
    formulaLatex: "a = -\\omega^2 x"
  },
  {
    id: "fc-09",
    themeId: "theme-c",
    topicCode: "C.4",
    category: "concept",
    front: "State the phase relationship between particles on a standing wave.",
    back: "All particles between two adjacent nodes oscillate strictly IN PHASE with each other. Particles on opposite sides of a node oscillate in ANTIPHASE (180° or \\pi radians out of phase)."
  },
  {
    id: "fc-10",
    themeId: "theme-d",
    topicCode: "D.3",
    category: "concept",
    front: "Why does a charged particle follow a circular path in a uniform magnetic field?",
    back: "The magnetic Lorentz force F = qvB is always perpendicular to the velocity vector, acting as a pure centripetal force that bends the direction without altering speed, yielding radius r = mv / (qB).",
    formulaLatex: "r = \\frac{mv}{qB}"
  },
  {
    id: "fc-11",
    themeId: "theme-e",
    topicCode: "E.1",
    category: "concept",
    front: "What did large-angle alpha deflections in the Rutherford experiment prove?",
    back: "That the atom's positive charge and over 99.9% of its mass are concentrated in an extremely dense, compact central core called the nucleus, rather than spread out uniformly.",
    formulaLatex: "R = R_0 A^{1/3}"
  },
  {
    id: "fc-12",
    themeId: "theme-e",
    topicCode: "E.4",
    category: "concept",
    front: "Why do both nuclear fission and nuclear fusion release energy?",
    back: "Both reactions produce daughter nuclei that lie closer to the Iron-56 peak on the Binding Energy per Nucleon curve, having higher BE/A (more tightly bound). The resulting mass defect \\Delta m is released as energy (\\Delta E = \\Delta m c^2).",
    formulaLatex: "\\Delta E = \\Delta m c^2"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "qz-01",
    themeId: "theme-a",
    topicCode: "A.1",
    question: "A stone is thrown vertically upwards. At the highest point of its trajectory, what are its instantaneous speed and acceleration?",
    options: [
      "Speed is 0 m/s; acceleration is 0 m/s^2",
      "Speed is 0 m/s; acceleration is 9.81 m/s^2 downwards",
      "Speed is 9.81 m/s; acceleration is 0 m/s^2",
      "Speed is 0 m/s; acceleration is 9.81 m/s^2 upwards"
    ],
    correctIndex: 1,
    explanation: "At the peak, velocity momentarily reverses direction so v = 0. However, Earth's gravity continues acting uninterrupted, so downward acceleration remains exactly 9.81 m/s^2.",
    difficulty: "standard"
  },
  {
    id: "qz-02",
    themeId: "theme-a",
    topicCode: "A.2",
    question: "A 2.0 kg toy car moving at 4.0 m/s collides with and sticks to a stationary 6.0 kg toy car. What is the combined velocity after impact?",
    formulaLatex: "m_1 u_1 = (m_1 + m_2)v",
    options: ["1.0 m/s", "1.33 m/s", "2.0 m/s", "0.5 m/s"],
    correctIndex: 0,
    explanation: "Conserving momentum: m_1 u_1 = (m_1 + m_2)v \\implies (2.0)(4.0) = (2.0 + 6.0)v \\implies 8.0 = 8.0 v \\implies v = 1.0 m/s.",
    difficulty: "standard"
  },
  {
    id: "qz-03",
    themeId: "theme-b",
    topicCode: "B.2",
    question: "If the absolute surface temperature of a star doubles from 3000 K to 6000 K, by what factor does its total power radiated per unit area increase?",
    formulaLatex: "P/A = \\sigma T^4",
    options: ["Factor of 2", "Factor of 4", "Factor of 8", "Factor of 16"],
    correctIndex: 3,
    explanation: "Stefan-Boltzmann law states P/A \\propto T^4. Doubling temperature yields 2^4 = 16 times greater radiant power.",
    difficulty: "standard"
  },
  {
    id: "qz-04",
    themeId: "theme-b",
    topicCode: "B.5",
    question: "A battery of EMF 12.0 V and internal resistance 1.5 \\Omega is connected to a 4.5 \\Omega external load resistor. What is the terminal potential difference across the battery?",
    formulaLatex: "V = \\mathcal{E} - Ir = I R_{ext}",
    options: ["12.0 V", "9.0 V", "3.0 V", "10.5 V"],
    correctIndex: 1,
    explanation: "Total circuit resistance R_T = 4.5 + 1.5 = 6.0 \\Omega. Current I = 12.0 / 6.0 = 2.0 A. Terminal PD V = I R_ext = (2.0 A)(4.5 \\Omega) = 9.0 V (or V = 12.0 - 2.0 \\times 1.5 = 9.0 V).",
    difficulty: "exam-level"
  },
  {
    id: "qz-05",
    themeId: "theme-c",
    topicCode: "C.3",
    question: "In a Young's double-slit experiment, monochromatic light produces bright fringes with spacing s. If the distance between the slits is doubled while screen distance remains fixed, the new fringe spacing will be:",
    formulaLatex: "s = \\frac{\\lambda D}{d}",
    options: ["2s", "4s", "s / 2", "s / 4"],
    correctIndex: 2,
    explanation: "Fringe spacing s = \\lambda D / d is inversely proportional to slit separation d. Doubling d halves the fringe spacing to s / 2.",
    difficulty: "standard"
  },
  {
    id: "qz-06",
    themeId: "theme-d",
    topicCode: "D.3",
    question: "A proton enters a uniform magnetic field with velocity v perpendicular to the field lines. Which of the following statements is true regarding its motion?",
    options: [
      "Its speed and kinetic energy increase continuously.",
      "Its speed decreases while its direction remains straight.",
      "Its kinetic energy remains constant while its trajectory is circular.",
      "Its momentum remains constant in magnitude and direction."
    ],
    correctIndex: 2,
    explanation: "Magnetic Lorentz force is perpendicular to velocity, performing zero work (W = 0). Speed and kinetic energy remain constant, while the particle curves into a circular arc.",
    difficulty: "exam-level"
  },
  {
    id: "qz-07",
    themeId: "theme-e",
    topicCode: "E.3",
    question: "A radioactive isotope has a half-life of 6.0 hours. If a sample initially has an activity of 640 Bq, what is its activity after 24.0 hours?",
    formulaLatex: "A = A_0 (1/2)^n",
    options: ["160 Bq", "80 Bq", "40 Bq", "20 Bq"],
    correctIndex: 2,
    explanation: "24.0 hours corresponds to n = 24.0 / 6.0 = 4 half-lives. Activity remaining = 640 \\times (1/2)^4 = 640 / 16 = 40 Bq.",
    difficulty: "standard"
  },
  {
    id: "qz-08",
    themeId: "theme-e",
    topicCode: "E.4",
    question: "Which of the following elements has the highest binding energy per nucleon, representing the peak of nuclear stability?",
    options: ["Hydrogen-1 (^1H)", "Helium-4 (^4He)", "Iron-56 (^56Fe)", "Uranium-238 (^238U)"],
    correctIndex: 2,
    explanation: "Iron-56 (^56Fe) has the highest binding energy per nucleon (~8.79 MeV/nucleon), making it the most thermodynamically stable nucleus in the universe.",
    difficulty: "standard"
  }
];
