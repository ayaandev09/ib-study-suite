import { TopicData } from "./types";

export const THEME_C_TOPICS: TopicData[] = [
  {
    id: "bio-c1-1",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Molecules",
    topicCode: "C1.1",
    displayCode: "C1.1",
    syllabusRef: "IB Biology May 2027 · C1.1 Enzymes and metabolism",
    title: "C1.1 Enzymes & Metabolism",
    subtitle: "Induced Fit, Activation Energy, Kinetics & Allosteric Inhibition [HL]",
    level: "SL / HL",
    strategicImportance: "ENZYME KINETICS & INHIBITION · HIGH-YIELD GRAPHS",
    readingTimeMinutes: 8,
    summary:
      "Enzymes are globular protein catalysts that lower activation energy ($E_a$) via induced-fit active sites. Reaction rates respond to temperature, pH, substrate concentration, and competitive/non-competitive/allosteric inhibitors.",
    speedReadBullets: [
      "Anabolism (condensation, endothermic) vs Catabolism (hydrolysis/oxidation, exothermic).",
      "Induced-fit model: substrate binding strains bonds and stabilizes the transition state, lowering $E_a$ without altering $\\Delta G$.",
      "[HL] Competitive inhibitors bind the active site (overcome by high $[S]$, $V_{\\max}$ unchanged); non-competitive/allosteric bind elsewhere ($V_{\\max}$ drops).",
      "[HL] Feedback inhibition (end-product binds allosteric site, e.g., isoleucine) & mechanism-based inhibition (penicillin).",
    ],
    primer5Min:
      "Metabolism is the web of all enzyme-catalyzed reactions in a cell. Enzymes accelerate reactions by factors of $10^6–10^{12}$ by orienting substrates and weakening transition-state bonds. At HL, you must distinguish competitive inhibitors (statins, malonate—can be outcompeted at high $[S]$) from non-competitive/allosteric inhibitors (cyanide, end-product feedback—cannot be overcome by adding substrate).",
    subSections: [
      {
        id: "c1-1-s1",
        title: "Metabolic Pathways, Induced Fit & Environmental Factors",
        marker: "C1.1.1 – C1.1.7",
        content:
          "Raising temperature increases kinetic energy and collision frequency up to the optimum, beyond which thermal vibration breaks H-bonds/ionic bonds (denaturation). Extreme pH alters R-group charges at the active site. Increasing $[S]$ plateaus at $V_{\\max}$ when all active sites are saturated.",
        analyticalTakeaway:
          "Never say enzymes are 'killed' at high temperature—enzymes are non-living proteins that *denature*.",
      },
      {
        id: "c1-1-s2",
        title: "Competitive, Non-Competitive & Feedback Inhibition",
        marker: "C1.1.8 – C1.1.12 · HL ONLY",
        isHLOnly: true,
        content:
          "Competitive inhibitors mimic the substrate and bind the active site (increasing apparent $K_m$, $V_{\\max}$ unchanged). Non-competitive/allosteric inhibitors bind an allosteric site, distorting active-site geometry ($V_{\\max}$ reduced). In **end-product inhibition**, the pathway's final product allosterically inhibits the first committed enzyme (e.g., isoleucine inhibits threonine deaminase).",
        analyticalTakeaway:
          "Penicillin irreversibly inhibits bacterial transpeptidase (cross-linking peptidoglycan cell walls) via mechanism-based covalent binding.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c1-1-1",
        question: "[HL] How can you distinguish competitive from non-competitive inhibition on a rate vs [S] graph?",
        promptType: "data-analysis",
        hints: ["Look at Vmax at very high substrate concentrations."],
        modelAnswer:
          "With a competitive inhibitor, increasing [S] eventually outcompetes the inhibitor, so the reaction reaches the same Vmax as the uninhibited enzyme (just at higher [S]). With a non-competitive inhibitor, Vmax remains permanently lower regardless of how high [S] becomes.",
        keyTermsToInclude: ["Vmax", "substrate concentration", "outcompete", "active site", "allosteric site"],
      },
    ],
    analysis: {
      coreThesis: "Conformational flexibility at active and allosteric sites enables both rapid catalysis and homeostatic pathway regulation.",
      theoreticalFoundations: "Transition-state stabilization & Michaelis–Menten saturation kinetics.",
      strategicEvaluation: "Intracellular enzymes work inside cells (hexokinase); extracellular enzymes are secreted (amylase, trypsin).",
      commonMisconceptions: ["Saying enzymes increase the total energy yield (ΔG) of a reaction (they only lower Ea)."],
      realWorldConnections: "Statins competitively inhibit HMG-CoA reductase to lower cholesterol synthesis.",
    },
    cases: [
      {
        id: "case-c1-1",
        title: "Isoleucine Feedback Inhibition of Threonine Deaminase",
        domainOrContext: "Metabolic Regulation",
        biologicalMechanism: "Excess isoleucine binds an allosteric site on the first enzyme of the 5-step pathway, halting synthesis.",
        concepts: ["molecular-specificity", "homeostatic-feedback"],
        syllabusLink: "C1.1 (HL)",
        quantitativeInsight: "Prevents wasteful ATP/NADPH consumption once amino acid pools are replete.",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "Induced-fit active site complementarity." },
    ],
    examPromptTakeaway: "Always state that enzymes *lower activation energy* and *do not alter ΔG or equilibrium*.",
    examBlueprint: {
      paper1TrapPattern: "Claiming competitive inhibitors lower Vmax.",
      paper2StructuredPrompt: "Explain how end-product inhibition regulates metabolic pathways. [3]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Negative feedback via allosteric non-competitive inhibition.",
        keyMarkSchemePoints: "1) Final product accumulates and binds to an allosteric site on the first enzyme in the pathway. 2) This induces a conformational change in the active site, preventing substrate binding. 3) As product is used up, it dissociates and the pathway resumes.",
        dataOrUnitsTip: "Cite threonine → isoleucine as a named example.",
      },
      pitfallsToAvoid: ["Saying the end-product binds to the *active* site."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-c1-2",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Molecules",
    topicCode: "C1.2",
    displayCode: "C1.2",
    syllabusRef: "IB Biology May 2027 · C1.2 Cell respiration",
    title: "C1.2 Cell Respiration",
    subtitle: "ATP Cycle, Glycolysis, Link/Krebs, Chemiosmosis [HL] & Anaerobic Pathways",
    level: "SL / HL",
    strategicImportance: "BIOENERGETICS CORE · HIGH-YIELD PAPER 2",
    readingTimeMinutes: 8,
    summary:
      "Cell respiration oxidizes organic substrates to generate ATP. Anaerobic pathways yield 2 ATP (regenerating NAD⁺), while aerobic respiration couples glycolysis, link reaction, Krebs cycle, and oxidative phosphorylation for ~30–32 ATP.",
    speedReadBullets: [
      "ATP ↔ ADP + Pi: immediate universal energy currency (phosphorylation activates substrates).",
      "Anaerobic respiration in cytosol: glycolysis (2 net ATP + 2 NADH) → lactate (animals) or ethanol + CO₂ (yeast/plants) to regenerate NAD⁺.",
      "[HL] Aerobic stages: Glycolysis (cytosol) → Link reaction (matrix: pyruvate → acetyl-CoA + CO₂ + NADH) → Krebs cycle (matrix: 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂ per turn).",
      "[HL] Oxidative phosphorylation (cristae): NADH/FADH₂ donate e⁻ to ETC → H⁺ pumped to intermembrane space → chemiosmosis via ATP synthase; O₂ is terminal e⁻ acceptor.",
    ],
    primer5Min:
      "Respiration is controlled redox chemistry. Rather than burning glucose in one explosive step, cells strip high-energy electrons onto NAD⁺ and FAD across glycolysis and the Krebs cycle. In the inner mitochondrial membrane (HL), the electron transport chain harvests electron energy to pump protons into the intermembrane space, turning ATP synthase like a molecular turbine as protons flow back into the matrix.",
    subSections: [
      {
        id: "c1-2-s1",
        title: "ATP Currency, Anaerobic Respiration & Respirometers",
        marker: "C1.2.1 – C1.2.6",
        content:
          "Without O₂, the mitochondrial ETC backs up, so NADH must be re-oxidized to NAD⁺ in the cytosol so glycolysis can continue producing 2 net ATP. Respirometers measure O₂ uptake using KOH/soda lime to absorb evolved CO₂.",
        analyticalTakeaway:
          "Compare lipid vs carbohydrate respiratory substrates: lipids yield more ATP per gram (more C–H bonds/NADH) and have a lower respiratory quotient ($RQ \\approx 0.7$ vs $1.0$).",
      },
      {
        id: "c1-2-s2",
        title: "Glycolysis, Krebs Cycle & Chemiosmosis",
        marker: "C1.2.7 – C1.2.13 · HL ONLY",
        isHLOnly: true,
        content:
          "Glycolysis phosphorylates glucose (2 ATP used) → fructose-1,6-bisphosphate → 2 triose phosphate → 2 pyruvate (4 ATP + 2 NADH made = 2 net ATP). In the matrix, pyruvate is decarboxylated and oxidized to acetyl-CoA (2C), which joins oxaloacetate (4C) → citrate (6C) in the Krebs cycle. NADH (Complex I) and FADH₂ (Complex II) feed the ETC, pumping H⁺ for chemiosmosis.",
        analyticalTakeaway:
          "Oxygen's *only* direct role is accepting electrons + protons at Complex IV to form H₂O; without it, all matrix dehydrogenases halt.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c1-2-1",
        question: "[HL] Explain why the Krebs cycle stops during anoxia even though it does not directly use oxygen.",
        promptType: "explain",
        hints: ["What happens to NADH and FADH₂ when the ETC has no terminal electron acceptor?"],
        modelAnswer:
          "Without O₂ as the terminal electron acceptor, electrons cannot leave the ETC, halting electron flow. NADH and FADH₂ cannot be oxidized back to NAD⁺ and FAD, so the dehydrogenase enzymes of the Krebs cycle and link reaction run out of oxidized coenzymes and stop.",
        keyTermsToInclude: ["terminal electron acceptor", "NAD+", "FAD", "ETC", "oxidized"],
      },
    ],
    analysis: {
      coreThesis: "Redox electron carriers bridge substrate oxidation to a chemiosmotic proton gradient.",
      theoreticalFoundations: "Peter Mitchell's chemiosmotic theory.",
      strategicEvaluation: "Substrate-level phosphorylation (glycolysis, Krebs) vs oxidative phosphorylation (ATP synthase).",
      commonMisconceptions: ["Saying glycolysis occurs in the mitochondria (it occurs in the cytosol)."],
      realWorldConnections: "DNP (2,4-dinitrophenol) uncouples the proton gradient, dissipating energy as lethal heat.",
    },
    cases: [
      {
        id: "case-c1-2",
        title: "Brown Adipose Tissue & UCP1 (Thermogenin) Uncoupling",
        domainOrContext: "Mammalian Thermogenesis",
        biologicalMechanism: "UCP1 channels allow H⁺ to bypass ATP synthase, releasing proton-motive energy directly as heat in neonates/hibernators.",
        concepts: ["energy-transduction", "compartmentalization"],
        syllabusLink: "C1.2 (HL)",
        quantitativeInsight: "Generates heat without ATP synthesis.",
      },
    ],
    conceptTracking: [
      { conceptId: "energy-transduction", intensity: 5, manifestation: "Glucose bond energy → NADH → H⁺ gradient → ATP." },
    ],
    examPromptTakeaway: "Always pair *location* (cytosol vs matrix vs cristae) with *inputs/outputs* for each respiration stage.",
    examBlueprint: {
      paper1TrapPattern: "Thinking CO₂ is produced during glycolysis or the ETC (CO₂ is only released in the Link Reaction, Krebs Cycle, and yeast ethanol fermentation).",
      paper2StructuredPrompt: "Explain the process of oxidative phosphorylation in mitochondria. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Chemiosmosis couples ETC redox energy to ATP synthesis.",
        keyMarkSchemePoints: "1) NADH and FADH₂ donate electrons to the ETC on cristae. 2) Energy released pumps H⁺ from matrix into intermembrane space, creating a proton gradient. 3) H⁺ diffuse back into matrix through ATP synthase, phosphorylating ADP + Pi → ATP. 4) O₂ acts as terminal electron acceptor, forming H₂O.",
        dataOrUnitsTip: "Mention *cristae* and *intermembrane space* explicitly.",
      },
      pitfallsToAvoid: ["Saying H⁺ are pumped *into* the matrix (they are pumped *out* of the matrix into the intermembrane space)."],
    },
    primaryFormulas: ["\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\longrightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{ATP}"],
  },
  {
    id: "bio-c1-3",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Molecules",
    topicCode: "C1.3",
    displayCode: "C1.3",
    syllabusRef: "IB Biology May 2027 · C1.3 Photosynthesis",
    title: "C1.3 Photosynthesis",
    subtitle: "Pigment Chromatography, Limiting Factors, Photosystems & Calvin Cycle [HL]",
    level: "SL / HL",
    strategicImportance: "LIGHT + CALVIN REACTIONS · ACTION SPECTRA",
    readingTimeMinutes: 8,
    summary:
      "Photosynthesis converts solar photons into chemical bonds. Light-dependent reactions on thylakoid membranes split water and generate ATP/NADPH; the Calvin cycle in the stroma fixes CO₂ via RuBisCO.",
    speedReadBullets: [
      "Chlorophyll a/b absorb red (~660 nm) and blue (~430 nm) light, reflecting green; carotenoids broaden absorption & photoprotect.",
      "Limiting factors: light intensity, CO₂ concentration, and temperature (Law of Limiting Factors).",
      "[HL] Light-dependent (thylakoids): PSII photolysis of H₂O → e⁻ → ETC pumps H⁺ into thylakoid lumen → ATP synthase + PSI reduces NADP⁺ → NADPH.",
      "[HL] Calvin cycle (stroma): RuBisCO fixes CO₂ + RuBP (5C) → 2 GP (3C) → reduced by ATP/NADPH to TP → RuBP regenerated.",
    ],
    primer5Min:
      "Photosynthesis runs the biosphere's carbon and oxygen cycles. Thin-layer chromatography separates leaf pigments by $R_f$ value, matching Engelmann's classic action spectrum. At HL, trace the Z-scheme: Photosystem II splits water (releasing O₂), pumps protons into the tiny thylakoid lumen to drive ATP synthase, and passes electrons to Photosystem I to make NADPH—fueling the Calvin cycle's RuBisCO.",
    subSections: [
      {
        id: "c1-3-s1",
        title: "Pigments, Absorption vs Action Spectra & Limiting Factors",
        marker: "C1.3.1 – C1.3.8",
        content:
          "An absorption spectrum plots light absorbed by each pigment vs wavelength; an action spectrum plots overall photosynthesis rate vs wavelength. Free-Air CO₂ Enrichment (FACE) experiments test how elevated atmospheric CO₂ affects crop photosynthesis and stomatal conductance.",
        analyticalTakeaway:
          "At low light, light intensity is limiting; once saturated, CO₂ or temperature (enzyme kinetics of RuBisCO) becomes limiting.",
        keyFormulaOrFramework: "R_f = \\frac{d_{\\text{pigment}}}{d_{\\text{solvent front}}}",
      },
      {
        id: "c1-3-s2",
        title: "Photosystems I/II, Photolysis & Calvin Cycle",
        marker: "C1.3.9 – C1.3.19 · HL ONLY",
        isHLOnly: true,
        content:
          "Photoactivation excites chlorophyll P680 in PSII; photolysis ($2\\text{H}_2\\text{O} \\rightarrow 4\\text{H}^+ + 4e^- + \\text{O}_2$) replaces lost electrons. Cyclic photophosphorylation (PSI only) generates extra ATP without NADPH. In the stroma, 6 turns of the Calvin cycle fix 6 CO₂ to net 2 TP (1 glucose equivalent) while regenerating 6 RuBP.",
        analyticalTakeaway:
          "In Calvin's lollipop experiment ($^{14}\\text{CO}_2$), turning off light causes GP to accumulate and RuBP to drop (no ATP/NADPH to reduce GP or regenerate RuBP).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c1-3-1",
        question: "[HL] Predict what happens to GP and RuBP levels immediately if light is switched off while CO₂ remains available.",
        promptType: "data-analysis",
        hints: ["Which Calvin steps need ATP and NADPH from the light-dependent reactions?"],
        modelAnswer:
          "GP (glycerate-3-phosphate) accumulates because CO₂ continues fixing onto RuBP, but GP cannot be reduced to TP without ATP and NADPH. RuBP drops sharply because it continues being consumed by RuBisCO but cannot be regenerated from TP without ATP.",
        keyTermsToInclude: ["GP increases", "RuBP decreases", "ATP", "NADPH", "RuBisCO"],
      },
    ],
    analysis: {
      coreThesis: "Thylakoid light reactions supply ATP and NADPH to drive stromal carbon fixation.",
      theoreticalFoundations: "Z-scheme redox coupling + Benson–Calvin carbon cycle.",
      strategicEvaluation: "RuBisCO is the most abundant protein on Earth due to its slow turnover and competing oxygenation (photorespiration).",
      commonMisconceptions: ["Thinking plants only photosynthesize and don't respire (they respire 24/7)."],
      realWorldConnections: "FACE experiments show diminishing CO₂ fertilization returns when soil nitrogen or water is limiting.",
    },
    cases: [
      {
        id: "case-c1-3",
        title: "Calvin's Lollipop Apparatus (¹⁴CO₂ Radiotracing)",
        domainOrContext: "Biochemical Pathway Elucidation",
        biologicalMechanism: "Rapid methanol killing at 5-second intervals mapped GP → TP → RuBP sequence.",
        concepts: ["energy-transduction", "information-flow"],
        syllabusLink: "C1.3 (HL)",
        quantitativeInsight: "GP appeared first within <5 s of ¹⁴CO₂ exposure.",
      },
    ],
    conceptTracking: [
      { conceptId: "energy-transduction", intensity: 5, manifestation: "Photon energy → e⁻ excitation → H⁺ gradient → ATP/NADPH → glucose." },
    ],
    examPromptTakeaway: "Specify *thylakoid membrane/lumen* for light reactions and *stroma* for the Calvin cycle.",
    examBlueprint: {
      paper1TrapPattern: "Saying O₂ comes from CO₂ (O₂ comes exclusively from photolysis of H₂O in PSII).",
      paper2StructuredPrompt: "Explain the light-dependent reactions of photosynthesis. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Photons excite chlorophyll electrons to drive chemiosmotic ATP and NADPH synthesis.",
        keyMarkSchemePoints: "1) Chlorophyll in PSII absorbs light, exciting e⁻ to ETC. 2) Photolysis of H₂O replaces e⁻ and releases O₂ + H⁺. 3) ETC pumps H⁺ into thylakoid lumen; H⁺ exits through ATP synthase → ATP. 4) PSI re-excites e⁻ to reduce NADP⁺ + H⁺ → NADPH.",
        dataOrUnitsTip: "Mention *thylakoid lumen* as the proton reservoir.",
      },
      pitfallsToAvoid: ["Confusing NAD⁺ (respiration) with NADP⁺ (photosynthesis — P for Photosynthesis!)."],
    },
    primaryFormulas: ["6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{light}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2"],
  },
  {
    id: "bio-c2-1",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Cells",
    topicCode: "C2.1",
    displayCode: "C2.1",
    syllabusRef: "IB Biology May 2027 · C2.1 Chemical signalling [HL]",
    title: "C2.1 Chemical Signalling",
    subtitle: "Receptor Specificity, GPCRs, Tyrosine Kinases & Intracellular Receptors [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · NEW 2025/2027 SIGNAL TRANSDUCTION TOPIC",
    readingTimeMinutes: 7,
    summary:
      "Cells communicate via ligands binding specific transmembrane or intracellular receptors, triggering second-messenger cascades (cAMP, Ca²⁺) or direct gene transcription.",
    speedReadBullets: [
      "Quorum sensing in bacteria (e.g., *Vibrio fischeri* bioluminescence) coordinates population-wide gene expression.",
      "Hydrophilic ligands (epinephrine, insulin, acetylcholine) bind transmembrane receptors; hydrophobic ligands (estradiol, testosterone, progesterone) cross the bilayer to bind intracellular receptors.",
      "G-protein coupled receptors (GPCRs) activate adenylyl cyclase → cAMP → Protein Kinase A amplification.",
      "Receptor tyrosine kinases (insulin receptor) dimerize & autophosphorylate; ligand-gated ion channels (AChR) open ion pores.",
    ],
    primer5Min:
      "How does a tiny pulse of epinephrine mobilize millions of glucose molecules in seconds? Topic C2.1 (HL Only) unpacks signal transduction. Hydrophilic ligands cannot cross the hydrophobic bilayer, so they dock onto surface receptors (ionotropic, GPCR, or tyrosine kinase) that amplify the signal via intracellular second messengers like cAMP. Conversely, steroid hormones diffuse straight into the cell to act as ligand-activated transcription factors.",
    subSections: [
      {
        id: "c2-1-s1",
        title: "Transmembrane Receptors & Second Messengers",
        marker: "C2.1.1 – C2.1.6 · HL ONLY",
        isHLOnly: true,
        content:
          "In GPCR signalling (e.g., epinephrine binding $\\beta$-adrenergic receptor), the $\\alpha$-subunit exchanges GDP for GTP and activates adenylyl cyclase, converting ATP to **cAMP**. cAMP activates protein kinase A (PKA), initiating a phosphorylation cascade that amplifies the signal exponentially. Insulin binds a **receptor tyrosine kinase**, triggering GLUT4 vesicle translocation.",
        analyticalTakeaway:
          "Kinase cascades provide both *signal amplification* and *integration* across pathways.",
      },
      {
        id: "c2-1-s2",
        title: "Intracellular Steroid Receptors & Quorum Sensing",
        marker: "C2.1.7 – C2.1.10 · HL ONLY",
        isHLOnly: true,
        content:
          "Steroid hormones (estradiol, progesterone, testosterone) diffuse through the plasma membrane and bind cytoplasmic/nuclear receptors. The hormone–receptor complex binds Hormone Response Elements (HREs) on DNA to regulate transcription. Bacteria secrete autoinducers for quorum sensing once cell density crosses a threshold.",
        analyticalTakeaway:
          "Steroid responses are slower (minutes–hours, transcription/translation) than ion-channel or GPCR responses (milliseconds–seconds).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c2-1-1",
        question: "[HL] Contrast the mechanism of action of epinephrine (hydrophilic) and estradiol (hydrophobic).",
        promptType: "explain",
        hints: ["Focus on membrane permeability, receptor location, and speed of response."],
        modelAnswer:
          "Epinephrine cannot cross the phospholipid bilayer, so it binds a cell-surface GPCR, activating adenylyl cyclase to produce cAMP and a rapid phosphorylation cascade. Estradiol is hydrophobic, diffuses across the membrane, and binds an intracellular receptor that enters the nucleus to alter gene transcription.",
        keyTermsToInclude: ["GPCR", "cAMP", "second messenger", "intracellular receptor", "transcription"],
      },
    ],
    analysis: {
      coreThesis: "Ligand solubility dictates receptor localization and downstream amplification vs transcriptional kinetics.",
      theoreticalFoundations: "Allosteric receptor activation + enzymatic phosphorylation cascades.",
      strategicEvaluation: "Negative feedback (phosphodiesterases degrading cAMP, phosphatases) terminates signalling.",
      commonMisconceptions: ["Thinking cAMP is the first messenger (the hormone/ligand is the first messenger; cAMP is the second messenger)."],
      realWorldConnections: "Cholera toxin locks G-protein α-subunits in the active GTP state, causing continuous cAMP production and watery diarrhea.",
    },
    cases: [
      {
        id: "case-c2-1",
        title: "Vibrio fischeri Bioluminescence via Quorum Sensing",
        domainOrContext: "Microbial Chemical Signalling",
        biologicalMechanism: "Autoinducer (AHL) accumulates at high cell density in squid light organs, activating *lux* operon transcription.",
        concepts: ["homeostatic-feedback", "ecological-interdependence"],
        syllabusLink: "C2.1 (HL)",
        quantitativeInsight: "Threshold AHL concentration triggers synchronized light emission.",
      },
    ],
    conceptTracking: [
      { conceptId: "homeostatic-feedback", intensity: 5, manifestation: "Hormonal and second-messenger cascades coordinate tissue responses." },
    ],
    examPromptTakeaway: "Clearly separate *transduction* (GPCR → G-protein → adenylyl cyclase → cAMP → kinase) from *steroid direct transcription*.",
    examBlueprint: {
      paper1TrapPattern: "Stating steroid hormones bind GPCRs on the cell surface.",
      paper2StructuredPrompt: "Outline how epinephrine triggers glycogen breakdown via a G-protein coupled receptor. [4]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Hydrophilic hormone uses transmembrane GPCR and cAMP second messenger.",
        keyMarkSchemePoints: "1) Epinephrine binds GPCR on hepatocyte membrane. 2) G-protein exchanges GDP for GTP and activates adenylyl cyclase. 3) Adenylyl cyclase converts ATP → cAMP. 4) cAMP activates protein kinase cascade activating glycogen phosphorylase.",
        dataOrUnitsTip: "Mention *signal amplification*.",
      },
      pitfallsToAvoid: ["Skipping the G-protein or adenylyl cyclase step."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-c2-2",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Cells",
    topicCode: "C2.2",
    displayCode: "C2.2",
    syllabusRef: "IB Biology May 2027 · C2.2 Neural signalling",
    title: "C2.2 Neural Signalling",
    subtitle: "Resting & Action Potentials, Saltatory Conduction & Synaptic Transmission",
    level: "SL / HL",
    strategicImportance: "NEUROBIOLOGY · ACTION POTENTIAL & SYNAPSE",
    readingTimeMinutes: 8,
    summary:
      "Neurons transmit rapid electrical action potentials via voltage-gated Na⁺/K⁺ channels and communicate chemically across synapses via Ca²⁺-triggered neurotransmitter exocytosis.",
    speedReadBullets: [
      "Resting potential (−70 mV): Na⁺/K⁺ ATPase (3 Na⁺ out, 2 K⁺ in) + leak K⁺ channels + negatively charged intracellular proteins.",
      "Action potential: threshold (−55 mV) opens voltage-gated Na⁺ channels (depolarization to +30 mV) → K⁺ channels open (repolarization/hyperpolarization).",
      "Saltatory conduction: Schwann cell myelin sheath insulates internodes so depolarization jumps between Nodes of Ranvier.",
      "Synapse: AP opens presynaptic voltage-gated Ca²⁺ channels → ACh exocytosis → binds ligand-gated Na⁺ channels on postsynaptic membrane; [HL] EPSP/IPSP summation.",
    ],
    primer5Min:
      "Neural signalling combines digital all-or-nothing electrical spikes along axons with analog chemical integration at synapses. Depolarization past −55 mV triggers a self-propagating wave of Na⁺ influx followed by K⁺ efflux, while the refractory period enforces one-way travel. At the synapse, Ca²⁺ influx docks synaptic vesicles, releasing acetylcholine (or GABA for inhibition) before acetylcholinesterase clears the cleft.",
    subSections: [
      {
        id: "c2-2-s1",
        title: "Resting Potential, Action Potential & Myelination",
        marker: "C2.2.1 – C2.2.6",
        content:
          "Action potentials are all-or-nothing: stimulus intensity is encoded by *frequency* of impulses, not amplitude. Myelination (Schwann cells in PNS, oligodendrocytes in CNS) reduces membrane capacitance and prevents ion leakage, boosting speed up to ~120 m s⁻¹ via saltatory conduction.",
        analyticalTakeaway:
          "Refractory period occurs because voltage-gated Na⁺ channels are inactivated immediately after opening, preventing backward propagation.",
      },
      {
        id: "c2-2-s2",
        title: "Cholinergic Synapses, EPSPs/IPSPs & Neonicotinoids",
        marker: "C2.2.7 – C2.2.13 · HL",
        content:
          "At cholinergic synapses, acetylcholinesterase (AChE) hydrolyzes ACh into choline + acetate for recycling. Neonicotinoid pesticides bind insect nAChRs irreversibly, causing paralysis. [HL] Postsynaptic neurons integrate **EPSPs** (Na⁺ influx) and **IPSPs** (Cl⁻ influx or K⁺ efflux) via spatial and temporal summation at the axon hillock.",
        analyticalTakeaway:
          "Distinguish *presynaptic* voltage-gated Ca²⁺ channels from *postsynaptic* ligand-gated (chemically gated) Na⁺/Cl⁻ channels.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c2-2-1",
        question: "Explain why action potentials only travel in one direction along an axon.",
        promptType: "explain",
        hints: ["What state are voltage-gated Na⁺ channels in immediately behind the wave?"],
        modelAnswer:
          "Immediately after depolarization, voltage-gated Na⁺ channels enter an inactivated state (refractory period) and K⁺ channels are open, hyperpolarizing the membrane behind the impulse so it cannot be re-excited backward.",
        keyTermsToInclude: ["refractory period", "inactivated", "voltage-gated Na+ channels", "hyperpolarized"],
      },
    ],
    analysis: {
      coreThesis: "Electrochemical ion gradients drive unidirectional action potentials and integrative synaptic transmission.",
      theoreticalFoundations: "Hodgkin–Huxley voltage-gated channel kinetics.",
      strategicEvaluation: "Synaptic summation allows single neurons to act as biological logic gates.",
      commonMisconceptions: ["Thinking electrons flow along neurons like copper wires (ions move *across* the membrane locally)."],
      realWorldConnections: "Demyelination in Multiple Sclerosis slows saltatory conduction; lidocaine blocks voltage-gated Na⁺ channels.",
    },
    cases: [
      {
        id: "case-c2-2",
        title: "Neonicotinoid Insecticides & Pollinator Decline",
        domainOrContext: "Neurotoxicology & Ecology",
        biologicalMechanism: "Bind insect nicotinic ACh receptors with high affinity and resist AChE breakdown, overstimulating synapses.",
        concepts: ["molecular-specificity", "ecological-interdependence"],
        syllabusLink: "C2.2",
        quantitativeInsight: "Sub-lethal doses impair honeybee navigation and colony survival.",
      },
    ],
    conceptTracking: [
      { conceptId: "homeostatic-feedback", intensity: 5, manifestation: "Rapid neural reflexes and sensory integration." },
    ],
    examPromptTakeaway: "Label oscilloscope traces accurately: −70 mV resting, −55 mV threshold, +30 mV peak, undershoot hyperpolarization.",
    examBlueprint: {
      paper1TrapPattern: "Confusing Ca²⁺ (presynaptic exocytosis) with Na⁺ (postsynaptic depolarization).",
      paper2StructuredPrompt: "Explain the sequence of events at a chemical synapse following arrival of an action potential. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Electrical impulse is converted to chemical neurotransmitter release and back to postsynaptic potential.",
        keyMarkSchemePoints: "1) Depolarization opens presynaptic voltage-gated Ca²⁺ channels; Ca²⁺ enters. 2) Synaptic vesicles fuse with presynaptic membrane, releasing neurotransmitter (ACh) by exocytosis. 3) Neurotransmitter diffuses across cleft and binds postsynaptic ligand-gated receptors. 4) Na⁺ channels open → EPSP depolarization. 5) Enzyme (AChE) breaks down neurotransmitter.",
        dataOrUnitsTip: "Specify *voltage-gated* vs *ligand-gated*.",
      },
      pitfallsToAvoid: ["Saying neurotransmitter enters the postsynaptic neuron (it binds surface receptors)."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-c3-1",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Organisms",
    topicCode: "C3.1",
    displayCode: "C3.1",
    syllabusRef: "IB Biology May 2027 · C3.1 Integration of body systems",
    title: "C3.1 Integration of Body Systems",
    subtitle: "CNS/PNS, Reflex Arcs, Endocrine Axes, Baroreceptors & Tropisms [HL]",
    level: "SL / HL",
    strategicImportance: "SYSTEMS INTEGRATION · NERVOUS + ENDOCRINE",
    readingTimeMinutes: 7,
    summary:
      "Multicellular organisms coordinate organs via fast neural pathways (brainstem, spinal reflex arcs, autonomic nerves) and slower hormonal axes (hypothalamus–pituitary), while plants integrate growth via auxin efflux.",
    speedReadBullets: [
      "Nervous (fast, electrical/synaptic, localized, short-lived) vs Endocrine (slower, blood-borne hormones, widespread, longer-lasting).",
      "Spinal reflex arc: sensory neuron → dorsal root → interneuron → motor neuron → effector (bypasses conscious brain for speed).",
      "Autonomic control: medulla oblongata + baroreceptors/chemoreceptors regulate heart rate (sympathetic noradrenaline vs parasympathetic ACh) and breathing rate (blood CO₂/pH).",
      "Plant integration: auxin (IAA) efflux via PIN3 proteins redistributes to shaded side → cell elongation (phototropism); [HL] ethylene positive feedback in fruit ripening.",
    ],
    primer5Min:
      "Systems integration keeps internal physiology responsive to external threats and exercise. When you sprint, rising blood CO₂ lowers plasma pH; chemoreceptors in the carotid/aortic bodies signal the medulla oblongata to accelerate ventilation and sympathetic cardiac output. Meanwhile, plants lack nerves but integrate light and gravity cues using directional auxin transport.",
    subSections: [
      {
        id: "c3-1-s1",
        title: "Neural Integration, Reflexes & Cardiorespiratory Control",
        marker: "C3.1.1 – C3.1.8",
        content:
          "Cerebral hemispheres govern conscious thought; cerebellum coordinates posture/balance; hypothalamus links nervous and endocrine systems via the pituitary gland. Melatonin from the pineal gland entrains circadian rhythms to light–dark cycles.",
        analyticalTakeaway:
          "Remember: breathing rate is driven primarily by rising **blood CO₂** (lowering pH detected by medulla chemoreceptors), not falling O₂.",
      },
      {
        id: "c3-1-s2",
        title: "Plant Tropisms, Auxin (IAA) & Phytohormones",
        marker: "C3.1.9 – C3.1.12",
        content:
          "Phototropins detect blue light and relocate PIN3 auxin efflux carriers to the shaded side of shoots. Higher auxin activates proton pumps, acidifying cell walls (expansins loosen cellulose) for asymmetric cell elongation toward light. [HL] Auxin + cytokinin ratios coordinate root vs shoot growth.",
        analyticalTakeaway:
          "Auxin *promotes* elongation in shoots but *inhibits* elongation in roots (explaining positive gravitropism in roots).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c3-1-1",
        question: "Explain how the body increases heart rate during vigorous exercise.",
        promptType: "explain",
        hints: ["Include chemoreceptors, medulla oblongata, and sympathetic cardiac nerve."],
        modelAnswer:
          "Vigorous respiration increases blood CO₂, lowering blood pH. Chemoreceptors in the carotid/aortic bodies and medulla detect this pH drop and stimulate the cardiovascular centre of the medulla oblongata, which sends impulses down the sympathetic cardiac nerve releasing noradrenaline onto the SA node to increase heart rate.",
        keyTermsToInclude: ["CO2", "pH", "chemoreceptors", "medulla oblongata", "sympathetic", "SA node"],
      },
    ],
    analysis: {
      coreThesis: "Dual neural-endocrine feedback loops harmonize organ systems with environmental and metabolic demands.",
      theoreticalFoundations: "Autonomic antagonism + acid-growth hypothesis in plants.",
      strategicEvaluation: "Epinephrine prepares 'fight-or-flight' across multiple organs simultaneously.",
      commonMisconceptions: ["Saying the brain consciously triggers the knee-jerk/withdrawal reflex (it is processed in the spinal cord)."],
      realWorldConnections: "Jet lag reflects mismatch between pineal melatonin secretion and local photoperiod.",
    },
    cases: [
      {
        id: "case-c3-1",
        title: "PIN3 Auxin Efflux & Phototropic Bending",
        domainOrContext: "Plant Developmental Biology",
        biologicalMechanism: "Lateral redistribution of auxin creates differential cell elongation across the coleoptile.",
        concepts: ["homeostatic-feedback"],
        syllabusLink: "C3.1",
        quantitativeInsight: "Shaded side cells elongate ~2–3× faster than illuminated side.",
      },
    ],
    conceptTracking: [
      { conceptId: "homeostatic-feedback", intensity: 5, manifestation: "Medullary and hormonal integration." },
    ],
    examPromptTakeaway: "Always distinguish *sensory → relay (interneuron) → motor* neuron order in reflex arcs.",
    examBlueprint: {
      paper1TrapPattern: "Saying O₂ drop is the primary trigger for increased breathing rate during exercise.",
      paper2StructuredPrompt: "Explain how auxin causes positive phototropism in plant shoots. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Light-induced lateral auxin redistribution causes asymmetric cell elongation.",
        keyMarkSchemePoints: "1) Photoreceptors detect unilateral light. 2) PIN3 efflux proteins transport auxin to the shaded side of the shoot. 3) Auxin activates H⁺ pumps, acidifying cell walls and activating expansins. 4) Cells on the shaded side elongate more, bending the shoot toward light.",
        dataOrUnitsTip: "Clarify that auxin causes *cell elongation*, not cell division.",
      },
      pitfallsToAvoid: ["Saying auxin 'moves away from light by diffusion alone' without mentioning active PIN efflux."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-c3-2",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Organisms",
    topicCode: "C3.2",
    displayCode: "C3.2",
    syllabusRef: "IB Biology May 2027 · C3.2 Defence against disease",
    title: "C3.2 Defence Against Disease",
    subtitle: "Innate Barriers, Clonal Selection, Antibodies, Vaccines & Antibiotic Resistance",
    level: "SL / HL",
    strategicImportance: "IMMUNOLOGY · HIGH-YIELD ANTIBODY & VACCINE QUESTIONS",
    readingTimeMinutes: 8,
    summary:
      "Innate immunity provides rapid non-specific protection (skin, mucous membranes, clotting, phagocytes), while adaptive immunity deploys B-lymphocytes (antibodies) and helper/cytotoxic T-cells with immunological memory.",
    speedReadBullets: [
      "Primary barriers: intact skin (sebum pH), mucous membranes (lysozyme, cilia), blood clotting cascade (platelets → thrombin → fibrinogen → fibrin).",
      "Innate phagocytes (macrophages/neutrophils) engulf pathogens and present antigens on MHC II to helper T-cells.",
      "Adaptive immunity: Helper T-cells activate specific B-cells → clonal expansion → plasma cells (antibodies) + memory cells.",
      "Vaccines induce active artificial immunity (memory cells) and herd immunity; antibiotics target prokaryotic processes (resistance evolves via selection).",
    ],
    primer5Min:
      "Your immune system solves a needle-in-a-haystack problem: how to neutralize millions of evolving pathogens without attacking self-tissues. First, physical barriers and phagocytes hold the line. Then macrophages present pathogen fragments to matching helper T-cells, triggering clonal selection of B-cells that mass-produce Y-shaped antibodies—establishing lifelong memory cells that power vaccination.",
    subSections: [
      {
        id: "c3-2-s1",
        title: "Barriers, Clotting Cascade & Phagocytosis",
        marker: "C3.2.1 – C3.2.5",
        content:
          "Damaged vessels expose collagen, activating platelets to release clotting factors that convert prothrombin → thrombin; thrombin converts soluble fibrinogen → insoluble fibrin mesh trapping RBCs. Macrophages ingest pathogens into phagosomes fused with lysosomes.",
        analyticalTakeaway:
          "Always trace the exact clotting cascade: *clotting factors → prothrombin to thrombin → fibrinogen to fibrin*.",
      },
      {
        id: "c3-2-s2",
        title: "Adaptive Immunity, HIV, Vaccines & Zoonoses",
        marker: "C3.2.6 – C3.2.15",
        content:
          "Antibodies neutralize toxins, agglutinate pathogens, and opsonize for phagocytosis. Memory B/T-cells make secondary responses faster and higher-titer. HIV destroys CD4+ helper T-cells, collapsing adaptive immunity (AIDS). Zoonotic pathogens (e.g., rabies, SARS-CoV-2) cross species barriers.",
        analyticalTakeaway:
          "Antibiotic resistance arises from *random pre-existing mutations* or plasmid transfer, NOT because antibiotics 'cause' mutations.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c3-2-1",
        question: "Explain why a secondary immune response to a pathogen is much faster and stronger than the primary response.",
        promptType: "explain",
        hints: ["Role of memory B and T cells produced during primary exposure/vaccination."],
        modelAnswer:
          "During the primary response, clonal selection produces long-lived memory B and T lymphocytes specific to that antigen. Upon re-exposure, these memory cells recognize the antigen immediately and divide rapidly into plasma cells, producing a much higher concentration of antibodies in far less time.",
        keyTermsToInclude: ["memory cells", "clonal selection", "plasma cells", "antibodies", "faster"],
      },
    ],
    analysis: {
      coreThesis: "Clonal selection of lymphocytes converts random receptor diversity into targeted, memorable immunity.",
      theoreticalFoundations: "Burnet's clonal selection theory.",
      strategicEvaluation: "Herd immunity threshold depends on $R_0$: higher $R_0$ requires higher vaccine coverage.",
      commonMisconceptions: ["Saying antibodies 'kill' bacteria directly (they agglutinate, neutralize, or opsonize for phagocytes/complement)."],
      realWorldConnections: "Monoclonal antibodies (hybridomas) used in pregnancy tests and targeted cancer immunotherapy.",
    },
    cases: [
      {
        id: "case-c3-2",
        title: "MRSA & Horizontal Plasmid Transfer",
        domainOrContext: "Evolutionary Medicine",
        biologicalMechanism: "Overuse of methicillin/β-lactams selects for *mecA*-carrying *S. aureus* clones.",
        concepts: ["evolutionary-adaptation", "molecular-specificity"],
        syllabusLink: "C3.2 / D4.1",
        quantitativeInsight: "Secondary antibody titer is typically 10–100× higher than primary response.",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "Antigen–antibody and TCR–MHC complementarity." },
    ],
    examPromptTakeaway: "Distinguish *antigen* (foreign surface molecule) from *antibody* (immunoglobulin secreted by plasma cells).",
    examBlueprint: {
      paper1TrapPattern: "Saying bacteria 'become immune' to antibiotics (bacteria become *resistant*; organisms become *immune*).",
      paper2StructuredPrompt: "Outline the roles of macrophages, helper T-cells, and B-cells in producing antibodies. [5]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Antigen presentation links innate phagocytosis to adaptive clonal selection.",
        keyMarkSchemePoints: "1) Macrophage engulfs pathogen and displays antigen on MHC II. 2) Specific helper T-cell binds antigen and activates. 3) Activated helper T-cell stimulates matching B-cell (clonal selection). 4) B-cell proliferates into plasma cells secreting specific antibodies and memory B-cells.",
        dataOrUnitsTip: "Mention *cloning / mitosis* explicitly.",
      },
      pitfallsToAvoid: ["Omitting helper T-cells as the bridge between macrophages and B-cells."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-c4-1",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Ecosystems",
    topicCode: "C4.1",
    displayCode: "C4.1",
    syllabusRef: "IB Biology May 2027 · C4.1 Populations and communities",
    title: "C4.1 Populations & Communities",
    subtitle: "Sampling (Quadrats/Lincoln Index), Carrying Capacity, Chi-Squared & Interactions",
    level: "SL / HL",
    strategicImportance: "ECOLOGY STATS · LINCOLN INDEX & CHI-SQUARED",
    readingTimeMinutes: 7,
    summary:
      "Populations are estimated via random quadrats or capture–mark–recapture (Lincoln index), grow logistically toward carrying capacity ($K$), and interact via competition, predation, mutualism, and allelopathy.",
    speedReadBullets: [
      "Sessile organisms: random quadrat sampling; motile animals: capture–mark–recapture $N = (n_1 \\times n_2)/m_2$.",
      "Sigmoid growth curve: exponential phase → transitional phase → plateau at carrying capacity ($K$) due to density-dependent limiting factors.",
      "Chi-squared test ($\\chi^2 = \\sum (O-E)^2/E$) tests association between two species across quadrats.",
      "Community interactions: herbivory, predation (Lotka–Volterra cycles), interspecific competition, mutualism (root nodules, mycorrhizae, coral), parasitism, allelopathy.",
    ],
    primer5Min:
      "How do ecologists count mobile animals and test if two plants prefer each other's company? Capture–mark–recapture estimates population size $N$ from marked recapture ratios, while contingency chi-squared tests determine whether two species co-occur more or less than chance predicts. Over time, environmental resistance bends exponential growth into an S-shaped logistic curve around carrying capacity $K$.",
    subSections: [
      {
        id: "c4-1-s1",
        title: "Population Estimation, Carrying Capacity & Chi-Squared",
        marker: "C4.1.1 – C4.1.8",
        content:
          "Lincoln index assumes closed populations, harmless/permanent marks, and equal catchability. Density-dependent factors (disease, competition, predation) intensify as population approaches $K$. In a $2\\times 2$ chi-squared test ($df = 1$, critical value $3.841$ at $p=0.05$), $\\chi^2 > 3.841$ rejects $H_0$ (no association).",
        analyticalTakeaway:
          "Always state $H_0$ ('There is no significant association between species A and B') before concluding.",
        keyFormulaOrFramework: "N = \\frac{n_1 \\times n_2}{m_2}, \\qquad \\chi^2 = \\sum \\frac{(O-E)^2}{E}",
      },
      {
        id: "c4-1-s2",
        title: "Interspecific Interactions, Invasive Species & Top-Down/Bottom-Up",
        marker: "C4.1.9 – C4.1.18",
        content:
          "Endemic species are native and restricted to one region; invasive species lack native predators/pathogens and outcompete endemics. Allelopathic plants (e.g. black walnut juglone) secrete biochemicals inhibiting competitors. Top-down control (predators) vs bottom-up control (nutrient/primary producer limits).",
        analyticalTakeaway:
          "Cite *Rhizobium* in legume root nodules (N₂ fixation ↔ sugars) and *orchid/mycorrhizae* as classic mutualisms.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c4-1-1",
        question: "In a capture–mark–recapture study, 40 beetles are marked and released. Later, 50 are caught, of which 10 are marked. Estimate N and state two assumptions.",
        promptType: "calculation",
        hints: ["Use N = (n₁ × n₂) / m₂."],
        modelAnswer:
          "N = (40 × 50) / 10 = 200 beetles. Assumptions: 1) No births, deaths, immigration, or emigration between samples. 2) Marks do not rub off or increase predation risk (and marked beetles mix randomly).",
        keyTermsToInclude: ["200", "closed population", "random mixing", "no increased predation"],
        formulaUsed: "N = \\frac{n_1 \\times n_2}{m_2}",
      },
    ],
    analysis: {
      coreThesis: "Density-dependent resistance and interspecific networks structure community abundance and spatial association.",
      theoreticalFoundations: "Logistic growth + contingency statistics.",
      strategicEvaluation: "Predator–prey oscillations lag because predator reproduction depends on prior prey biomass.",
      commonMisconceptions: ["Using quadrats for fast-moving animals (use Lincoln index/traps)."],
      realWorldConnections: "Reintroduction of wolves in Yellowstone triggered a trophic cascade restoring willow and beaver communities.",
    },
    cases: [
      {
        id: "case-c4-1",
        title: "Isle Royale Wolf–Moose Predator–Prey Cycles",
        domainOrContext: "Population Ecology",
        biologicalMechanism: "Top-down wolf predation and bottom-up winter/forage limits drive coupled multi-year oscillations.",
        concepts: ["ecological-interdependence"],
        syllabusLink: "C4.1",
        quantitativeInsight: "Predator peak consistently lags prey peak by 1–3 years.",
      },
    ],
    conceptTracking: [
      { conceptId: "ecological-interdependence", intensity: 5, manifestation: "Mutualism, competition, and trophic cascades." },
    ],
    examPromptTakeaway: "In Chi-squared questions, always state: $\\chi^2_{\\text{calc}}$ vs $\\chi^2_{\\text{crit}}$, $p < 0.05$, and whether $H_0$ is rejected.",
    examBlueprint: {
      paper1TrapPattern: "Using $df = n - 1$ instead of $(r-1)(c-1)$ for a $2\\times 2$ contingency table (for $2\\times 2$, $df = 1$).",
      paper2StructuredPrompt: "Explain why population growth slows and plateaus at carrying capacity K. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Environmental resistance / density-dependent limiting factors balance natality + immigration with mortality + emigration.",
        keyMarkSchemePoints: "1) Initially resources are abundant → exponential growth. 2) As density rises, intraspecific competition for food/space/light intensifies. 3) Waste accumulation and disease spread increase mortality / lower natality. 4) Population stabilizes at K where birth rate = death rate.",
        dataOrUnitsTip: "Sketch or reference the S-shaped sigmoid curve.",
      },
      pitfallsToAvoid: ["Saying the population dies out at K (it fluctuates around K)."],
    },
    primaryFormulas: ["N = \\frac{n_1 \\times n_2}{m_2}", "\\chi^2 = \\sum \\frac{(O-E)^2}{E}"],
  },
  {
    id: "bio-c4-2",
    themeId: "theme-c",
    themeNumber: 3,
    orgLevel: "Ecosystems",
    topicCode: "C4.2",
    displayCode: "C4.2",
    syllabusRef: "IB Biology May 2027 · C4.2 Transfers of energy and matter",
    title: "C4.2 Energy & Matter Transfers",
    subtitle: "Food Webs, ~10% Trophic Efficiency, Carbon Cycle & Keeling Curve",
    level: "SL / HL",
    strategicImportance: "ECOSYSTEM ENERGETICS & CARBON FLUXES",
    readingTimeMinutes: 7,
    summary:
      "Ecosystems are open to energy (sunlight → chemical → dissipated heat, ~10% trophic transfer) and closed to matter (carbon and nitrogen cycle through autotrophs, heterotrophs, saprotrophs, and fossil/ocean sinks).",
    speedReadBullets: [
      "Energy enters via photoautotrophs (or chemoautotrophs at hydrothermal vents) and is lost as heat at every trophic level.",
      "Only ~10% of energy transfers between trophic levels (unconsumed, indigestible/egested, cellular respiration heat) → limits food chain length to 4–5 levels.",
      "Gross vs Net Primary Productivity: $NPP = GPP - R$.",
      "Carbon cycle: photosynthesis (sink) vs respiration/combustion (sources); Keeling curve shows seasonal oscillation + steady anthropogenic rise.",
    ],
    primer5Min:
      "Why are there no super-predators 10 trophic levels above grass? Because thermodynamics taxes every meal: roughly 90% of chemical energy is lost as metabolic heat, feces, or uneaten parts, leaving ~10% for the next trophic level. Unlike energy, carbon atoms are endlessly recycled—and the Mauna Loa Keeling curve captures both the planetary 'breathing' of Northern Hemisphere forests each season and the relentless climb from fossil fuel combustion.",
    subSections: [
      {
        id: "c4-2-s1",
        title: "Trophic Pyramids, Productivity & Open vs Closed Systems",
        marker: "C4.2.1 – C4.2.9",
        content:
          "Pyramids of energy (measured in $\\text{kJ m}^{-2}\\text{ yr}^{-1}$) are *always* upright because energy is lost at each step. Secondary productivity is biomass gained by consumers after assimilation minus respiration.",
        analyticalTakeaway:
          "Always draw energy pyramid bars proportional to values and label units $\\text{kJ m}^{-2}\\text{ yr}^{-1}$.",
        keyFormulaOrFramework: "\\text{NPP} = \\text{GPP} - R",
      },
      {
        id: "c4-2-s2",
        title: "Carbon Cycle, Peat/Fossil Fuels & Keeling Curve",
        marker: "C4.2.10 – C4.2.15",
        content:
          "Saprotrophic bacteria and fungi decompose dead organic matter, returning $\\text{CO}_2$ to the atmosphere. In waterlogged anaerobic soils, decomposition stalls, forming peat and eventually coal. The Keeling curve fluctuates annually (summer net photosynthesis drawdown vs winter respiration) atop a steep upward trend.",
        analyticalTakeaway:
          "Distinguish *carbon sinks* (oceans, forests, peat, limestone) from *carbon fluxes* (photosynthesis, respiration, combustion).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-c4-2-1",
        question: "Explain why the Keeling curve exhibits a regular sawtooth annual oscillation.",
        promptType: "explain",
        hints: ["Most terrestrial landmass and deciduous forests are in the Northern Hemisphere."],
        modelAnswer:
          "Because most of Earth's landmass and deciduous forests lie in the Northern Hemisphere, during Northern spring/summer photosynthesis exceeds respiration, drawing down atmospheric CO₂. During autumn/winter, leaf-fall and reduced photosynthesis mean respiration exceeds uptake, causing CO₂ to peak.",
        keyTermsToInclude: ["Northern Hemisphere", "photosynthesis", "respiration", "seasonal"],
      },
    ],
    analysis: {
      coreThesis: "Unidirectional energy dissipation constrains trophic structure, while biogeochemical cycles conserve matter.",
      theoreticalFoundations: "Second law of thermodynamics + mass conservation.",
      strategicEvaluation: "Eating lower on the trophic pyramid supports far more human biomass per hectare.",
      commonMisconceptions: ["Saying energy is 'recycled' by decomposers (decomposers *dissipate* remaining chemical energy as heat while recycling *nutrients/matter*)."],
      realWorldConnections: "Mauna Loa Observatory atmospheric CO₂ (>420 ppm) vs pre-industrial ~280 ppm.",
    },
    cases: [
      {
        id: "case-c4-2",
        title: "Mauna Loa Keeling Curve (1958–Present)",
        domainOrContext: "Global Carbon Cycle",
        biologicalMechanism: "Seasonal terrestrial biosphere metabolism superimposed on anthropogenic fossil fuel emissions.",
        concepts: ["ecological-interdependence", "energy-transduction"],
        syllabusLink: "C4.2 / D4.3",
        quantitativeInsight: "Atmospheric CO₂ rose from ~315 ppm (1958) to >420 ppm.",
      },
    ],
    conceptTracking: [
      { conceptId: "energy-transduction", intensity: 5, manifestation: "~10% trophic transfer and respiratory heat loss." },
    ],
    examPromptTakeaway: "Never say decomposers recycle *energy*—they recycle *matter/minerals* and release *heat*.",
    examBlueprint: {
      paper1TrapPattern: "Drawing inverted pyramids of energy (impossible, unlike pyramids of biomass/numbers).",
      paper2StructuredPrompt: "Explain why food chains rarely exceed four or five trophic levels. [3]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Energy transfer between trophic levels is inefficient (~10%).",
        keyMarkSchemePoints: "1) Energy is lost at each level via cellular respiration as heat. 2) Not all biomass is consumed or digested (lost in feces/uneaten parts). 3) Too little energy remains at higher levels to support a viable predator population.",
        dataOrUnitsTip: "Quote ~10% transfer efficiency.",
      },
      pitfallsToAvoid: ["Saying energy is 'destroyed' (it is converted to heat and radiated away)."],
    },
    primaryFormulas: ["\\text{NPP} = \\text{GPP} - R"],
  },
];
