export interface ExamPaperInfo {
  paper: string;
  weightingSL: string;
  duration: string;
  format: string;
  marks: number;
  calculator: string;
  dataBooklet: string;
  tactics: string[];
}

export const EXAM_PAPERS: ExamPaperInfo[] = [
  {
    paper: "Paper 1A (Multiple Choice · SL & HL)",
    weightingSL: "SL: 36% (with 1B) · HL: 36% (with 1B)",
    duration: "SL: 45m (30 MCQ) · HL: 60m (40 MCQ)",
    format: "30 (SL) or 40 (HL) Multiple Choice Questions covering Themes A–E (including HL A.4, A.5, B.4, C.5, D.4, E.2).",
    marks: 40,
    calculator: "NO calculator allowed.",
    dataBooklet: "Physics Data Booklet provided.",
    tactics: [
      "No penalty for guessing: never leave a single question blank.",
      "Dimensional analysis: eliminate options whose units or dimensions do not match the requested physical quantity.",
      "Order of magnitude estimation: round numbers to 1 significant figure for rapid mental arithmetic.",
      "Watch out for classic traps: g is 9.81 m/s^2 downwards at the top of a throw; magnetic fields do ZERO work on moving charges; internal energy of an ideal gas has ZERO potential energy.",
      "Target pace: 1.5 minutes per question. If stuck on a tricky calculation, flag it and move forward."
    ]
  },
  {
    paper: "Paper 1B (Data-Based & Experimental · SL & HL)",
    weightingSL: "Part of 36% (combined with 1A)",
    duration: "SL: 45m (25 marks) · HL: 60m (35 marks)",
    format: "Data-based questions on experimental techniques, uncertainty propagation, graphing, lines of best fit, and instrumentation.",
    marks: 35,
    calculator: "Graphic Display Calculator (GDC) ALLOWED and ESSENTIAL.",
    dataBooklet: "Physics Data Booklet provided.",
    tactics: [
      "Uncertainty propagation rules: Sums/differences \\implies add absolute uncertainties; Products/quotients \\implies add percentage uncertainties; Powers y = x^n \\implies multiply percentage uncertainty by n.",
      "Graphing rules: Error bars must be drawn accurately. Line of best fit must pass through all error bars. Maximum and minimum gradient lines must be drawn to determine gradient uncertainty: \\Delta m = (m_{max} - m_{min}) / 2.",
      "Significant figures: Raw experimental data determines significant figures. Final calculated values must match the precision of the least precise measurement.",
      "State clear sources of systematic error (zero error, calibration drift) vs random error (parallax, human reaction time, thermal fluctuations)."
    ]
  },
  {
    paper: "Paper 2 (Structured Theory · SL & HL)",
    weightingSL: "44% (SL & HL)",
    duration: "SL: 1h 30m (50 marks) · HL: 2h 30m (90 marks)",
    format: "Section A: Short-answer questions. Section B: Extended response multi-part problems covering SL Core + HL Extensions.",
    marks: 90,
    calculator: "Graphic Display Calculator (GDC) ALLOWED.",
    dataBooklet: "Physics Data Booklet provided.",
    tactics: [
      "Follow command terms strictly: 'State' = concise fact with no working; 'Describe' = what happens in sequence; 'Explain' = underlying physical cause and mechanism; 'Calculate' = working, equation, numerical value with correct SI units.",
      "Write the governing equation FIRST before substituting numerical values to secure partial method marks even if a calculator typing error occurs.",
      "Always quote final answers with correct SI units (e.g. N, J, W, Pa, T, Bq) and correct significant figures (usually 2 or 3 sig figs).",
      "For derivation questions, show every intermediate step clearly—never skip algebraic rearrangements."
    ]
  },
  {
    paper: "Internal Assessment (Scientific Investigation)",
    weightingSL: "20%",
    duration: "10 hours of laboratory / simulation work",
    format: "Individual scientific report (up to 3000 words) investigating a focused physics research question.",
    marks: 24,
    calculator: "All tools allowed.",
    dataBooklet: "Data Booklet allowed.",
    tactics: [
      "Clear, focused research question with explicitly identified independent, dependent, and controlled variables.",
      "Comprehensive uncertainty analysis with error bars, lines of best fit, and percentage uncertainty evaluation.",
      "Critical reflection on methodological limitations and specific, realistic improvements."
    ]
  }
];

export const COMMAND_TERMS = [
  { term: "State", meaning: "Give a specific name, value or other brief answer without explanation or calculation." },
  { term: "Describe", meaning: "Give a detailed account or picture of a situation, event, pattern or process." },
  { term: "Explain", meaning: "Give a detailed account including reasons, mechanisms or causes." },
  { term: "Calculate", meaning: "Obtain a numerical answer showing the relevant stages in the working." },
  { term: "Determine", meaning: "Obtain the only possible answer from data, calculation or graph." },
  { term: "Deduce", meaning: "Reach a conclusion from the information given using logical reasoning." },
  { term: "Derive", meaning: "Manipulate a mathematical relationship to give a new equation or relationship." },
  { term: "Evaluate", meaning: "Make an appraisal by weighing up the strengths and limitations." },
  { term: "Sketch", meaning: "Represent by means of a diagram or graph (labelled as appropriate), showing general shape." }
];

export const UNCERTAINTY_RULES = [
  {
    type: "Addition & Subtraction",
    rule: "y = a \\pm b \\implies \\Delta y = \\Delta a + \\Delta b",
    example: "L = (15.2 \\pm 0.1) \\text{ cm} + (4.6 \\pm 0.2) \\text{ cm} = (19.8 \\pm 0.3) \\text{ cm}"
  },
  {
    type: "Multiplication & Division",
    rule: "y = \\frac{a \\cdot b}{c} \\implies \\frac{\\Delta y}{y} = \\frac{\\Delta a}{a} + \\frac{\\Delta b}{b} + \\frac{\\Delta c}{c}",
    example: "Multiply percentage uncertainties: \%\\Delta y = \%\\Delta a + \%\\Delta b + \%\\Delta c"
  },
  {
    type: "Powers",
    rule: "y = a^n \\implies \\frac{\\Delta y}{y} = n \\frac{\\Delta a}{a}",
    example: "Kinetic energy E_k = 0.5 m v^2 \\implies \%\\Delta E_k = \%\\Delta m + 2(\%\\Delta v)"
  },
  {
    type: "Gradient Uncertainty",
    rule: "\\Delta m = \\frac{m_{max} - m_{min}}{2}",
    example: "Construct steepest and shallowest lines passing through all error bars."
  }
];
