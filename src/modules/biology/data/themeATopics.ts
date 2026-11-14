import { TopicData } from "./types";

export const THEME_A_TOPICS: TopicData[] = [
  {
    id: "bio-a1-1",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Molecules",
    topicCode: "A1.1",
    displayCode: "A1.1",
    syllabusRef: "IB Biology May 2027 · A1.1 Water",
    title: "A1.1 Water",
    subtitle: "Polarity, Hydrogen Bonding, Physical Properties & Extraplanetary Origin",
    level: "SL / HL",
    strategicImportance: "MOLECULAR FOUNDATION · HIGH-YIELD PAPER 2",
    readingTimeMinutes: 7,
    summary:
      "Water's bent geometry and polar covalent O–H bonds drive intermolecular hydrogen bonding, producing cohesion, adhesion, high specific heat capacity, and universal solvent properties essential for life.",
    speedReadBullets: [
      "Polar covalent O–H bonds (oxygen δ−, hydrogen δ+) enable up to 4 hydrogen bonds per H₂O molecule.",
      "Cohesion (H₂O–H₂O) supports xylem tension; adhesion (H₂O–cellulose) resists gravity in capillary action.",
      "High specific heat capacity (4.18 J g⁻¹ K⁻¹) buffers aquatic habitats and endotherm body temperatures.",
      "[HL] Extraplanetary asteroid/comet delivery and Goldilocks-zone retention explain Earth's liquid oceans.",
    ],
    primer5Min:
      "Water is the medium of all cellular biochemistry. Because oxygen is strongly electronegative, shared electrons in O–H bonds spend more time near oxygen, creating a permanent dipole. These dipoles attract each other via hydrogen bonds—individually weak, but collectively responsible for water's extraordinarily high specific heat capacity, latent heat of vaporization, surface tension, and ability to dissolve hydrophilic ions and polar solutes while excluding hydrophobic lipids.",
    subSections: [
      {
        id: "a1-1-s1",
        title: "Polarity & Hydrogen Bonding Architecture",
        marker: "A1.1.1 – A1.1.2",
        content:
          "The oxygen atom in $H_2O$ carries two lone pairs and forms polar covalent bonds with two hydrogen atoms at a $104.5^\\circ$ bond angle. Partial negative charge ($\\delta^-$) on oxygen attracts partial positive charges ($\\delta^+$) on adjacent hydrogens, forming intermolecular hydrogen bonds.",
        analyticalTakeaway:
          "Always distinguish *intramolecular* polar covalent O–H bonds from *intermolecular* hydrogen bonds between water molecules.",
        keyFormulaOrFramework: "\\text{Polar Covalent (O–H)} \\longrightarrow \\text{Dipole } (\\delta^- / \\delta^+) \\longrightarrow \\text{H-bonds}",
      },
      {
        id: "a1-1-s2",
        title: "Cohesion, Adhesion & Thermal Buffering",
        marker: "A1.1.3 – A1.1.5",
        content:
          "Cohesion pulls water columns upward under tension during transpiration in xylem vessels, while adhesion to hydrophilic cell walls prevents column collapse. High specific heat capacity stabilizes aquatic ecosystems, and high latent heat of vaporization makes sweating an effective evaporative coolant.",
        analyticalTakeaway:
          "Contrast hydrophobic non-polar molecules (steroids, triglycerides) transported via lipoproteins with hydrophilic solutes (glucose, Na⁺, amino acids) dissolved directly in plasma.",
      },
      {
        id: "a1-1-s3",
        title: "Origin of Water on Earth & Habitability",
        marker: "A1.1.6 · HL ONLY",
        isHLOnly: true,
        content:
          "Early Earth was too hot to retain surface water during accretion. Evidence from deuterium-to-hydrogen ($^2\\text{H}/^1\\text{H}$) ratios in carbonaceous chondrite meteorites supports water delivery via asteroid impacts, retained as liquid due to Earth's mass (gravity) and orbital distance within the Goldilocks habitable zone.",
        analyticalTakeaway:
          "HL exams link astrobiology to D/H isotopic ratios and planetary escape velocity.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a1-1-1",
        question: "Compare how glucose and cholesterol are transported in blood plasma based on their interactions with water.",
        promptType: "explain",
        hints: ["Consider hydroxyl groups vs hydrocarbon rings.", "How are insoluble lipids packaged in plasma?"],
        modelAnswer:
          "Glucose is polar with multiple –OH groups that form hydrogen bonds with water, making it hydrophilic and freely soluble in blood plasma. Cholesterol is largely hydrophobic (non-polar hydrocarbon rings) and insoluble in water, so it must be packaged inside amphipathic lipoprotein complexes (LDL/HDL) with hydrophilic phospholipid heads facing outward.",
        keyTermsToInclude: ["polar", "hydrogen bonds", "hydrophilic", "hydrophobic", "lipoprotein"],
      },
    ],
    analysis: {
      coreThesis: "Hydrogen bonding converts a small triatomic molecule into a thermally stable, cohesive, and selectively dissolving life-support matrix.",
      theoreticalFoundations: "Electronegativity difference between O (3.44) and H (2.20) establishes permanent molecular polarity.",
      strategicEvaluation: "Thermal stability vs methane: despite nearly identical molar mass (18 vs 16 g mol⁻¹), water boils at 100 °C while methane boils at −161 °C.",
      commonMisconceptions: [
        "Confusing covalent O–H bonds inside a water molecule with hydrogen bonds *between* water molecules.",
        "Stating that water is less dense as ice is due to 'air bubbles' rather than an open hexagonal H-bonded crystal lattice.",
      ],
      realWorldConnections: "Transpiration-cohesion-tension in coastal redwoods (>100 m tall) and ocean thermal inertia moderating coastal climates.",
    },
    cases: [
      {
        id: "case-a1-1",
        title: "Xylem Cavitation & Transpiration Pull in Tall Trees",
        domainOrContext: "Plant Vascular Physiology",
        biologicalMechanism: "Continuous H-bonded water columns sustain negative hydrostatic pressure down to −2 MPa without snapping.",
        concepts: ["molecular-specificity", "energy-transduction"],
        syllabusLink: "A1.1 / B3.2",
        quantitativeInsight: "Specific heat capacity $c = 4.184\\text{ J g}^{-1}\\text{ K}^{-1}$",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "Dipole geometry dictates H-bonding and solvent selectivity." },
      { conceptId: "compartmentalization", intensity: 3, manifestation: "Hydrophobic effect drives phospholipid bilayer self-assembly." },
    ],
    examPromptTakeaway: "When asked to explain any physical property of water, anchor your answer in polarity + intermolecular hydrogen bonds.",
    examBlueprint: {
      paper1TrapPattern: "Paper 1A often tests which bond breaks during evaporation (H-bonds break, covalent O–H bonds remain intact).",
      paper2StructuredPrompt: "Explain how the properties of water allow it to act as a coolant and transport medium in mammals. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Water molecules are polar and form hydrogen bonds with each other and polar solutes.",
        keyMarkSchemePoints: "1) High latent heat of vaporization absorbs body heat when sweat evaporates. 2) High specific heat capacity absorbs metabolic heat with minimal ΔT. 3) Polar solvent dissolves glucose, amino acids, and ions in plasma.",
        dataOrUnitsTip: "Quote 4.18 J g⁻¹ K⁻¹ if referencing specific heat capacity.",
      },
      pitfallsToAvoid: ["Saying water 'breaks down' when it evaporates.", "Omitting the role of H-bonds in thermal properties."],
    },
    primaryFormulas: ["c = 4.184\\text{ J g}^{-1}\\text{ K}^{-1}"],
  },
  {
    id: "bio-a1-2",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Molecules",
    topicCode: "A1.2",
    displayCode: "A1.2",
    syllabusRef: "IB Biology May 2027 · A1.2 Nucleic acids",
    title: "A1.2 Nucleic Acids",
    subtitle: "Nucleotide Polymerization, Antiparallel DNA Double Helix & Nucleosomes",
    level: "SL / HL",
    strategicImportance: "GENETIC CODE ARCHITECTURE · CORE SL/HL",
    readingTimeMinutes: 8,
    summary:
      "DNA and RNA are polymers of nucleotides linked by 3'→5' phosphodiester bonds. Complementary base pairing (A=T/U, G≡C) preserves genetic information across generations.",
    speedReadBullets: [
      "Nucleotide = pentose sugar (deoxyribose/ribose) + 5' phosphate group + 1' nitrogenous base.",
      "Sugar-phosphate backbone forms via condensation (phosphodiester bonds); strands are antiparallel (5'→3' vs 3'→5').",
      "Purines (A, G: double ring) pair with pyrimidines (C, T, U: single ring) to keep helix diameter uniform (~2 nm).",
      "[HL] Hershey–Chase (³²P/³⁵S) proved DNA is the genetic material; Chargaff's rules (%A=%T, %G=%C) & nucleosome octamers.",
    ],
    primer5Min:
      "Nucleic acids store and transmit the digital code of life. Each nucleotide joins the 3' hydroxyl of the sugar to the 5' phosphate of the next nucleotide, creating a directional sugar-phosphate backbone. In DNA, two antiparallel strands twist into a double helix stabilized by hydrogen bonds between purine-pyrimidine pairs (2 H-bonds between A–T, 3 between G–C). In eukaryotes, DNA wraps ~1.65 turns around an octamer of histone proteins (plus H1 linker) to form nucleosomes.",
    subSections: [
      {
        id: "a1-2-s1",
        title: "Nucleotide Structure & DNA vs RNA",
        marker: "A1.2.1 – A1.2.4",
        content:
          "Condensation reactions link the 5' phosphate of one nucleotide to the 3' OH of the next, forming covalent phosphodiester bonds. DNA uses deoxyribose (lacks 2' –OH, increasing stability) and Thymine; RNA uses ribose and Uracil.",
        analyticalTakeaway:
          "Absence of the reactive 2' –OH makes DNA chemically more stable for long-term archival storage.",
      },
      {
        id: "a1-2-s2",
        title: "Complementary Base Pairing & Universal Genetic Code",
        marker: "A1.2.5 – A1.2.8",
        content:
          "Adenine pairs with Thymine/Uracil via 2 H-bonds; Guanine pairs with Cytosine via 3 H-bonds. Because every organism uses the same triplet codon table, genes can be transferred across species (conservation of genetic code).",
        analyticalTakeaway:
          "Higher GC content increases DNA melting temperature ($T_m$) due to 3 hydrogen bonds per pair plus stronger base-stacking.",
      },
      {
        id: "a1-2-s3",
        title: "Hershey–Chase, Chargaff's Ratios & Nucleosomes",
        marker: "A1.2.9 – A1.2.12 · HL ONLY",
        isHLOnly: true,
        content:
          "Hershey and Chase labelled T2 bacteriophage DNA with $^{32}\\text{P}$ and protein coats with $^{35}\\text{S}$; only $^{32}\\text{P}$ entered *E. coli* cells, falsifying the protein-gene hypothesis. Eukaryotic DNA wraps around 8 histone proteins (two each of H2A, H2B, H3, H4) forming nucleosomes that regulate transcription.",
        analyticalTakeaway:
          "Chargaff's data ($A=T$, $G=C$ in dsDNA, but not in ssRNA viruses) provides direct Paper 1B/2 deduction questions.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a1-2-1",
        question: "A double-stranded DNA sample contains 22% Cytosine. Calculate the percentage of Adenine.",
        promptType: "calculation",
        hints: ["Use Chargaff's rules: %C = %G and %A + %T + %G + %C = 100%."],
        modelAnswer: "If C = 22%, then G = 22% (G + C = 44%). Remaining A + T = 56%, so A = 56% / 2 = 28%.",
        keyTermsToInclude: ["Chargaff", "complementary base pairing", "28%"],
      },
    ],
    analysis: {
      coreThesis: "Covalent sugar-phosphate backbones provide structural permanence while hydrogen-bonded base pairs allow reversible strand separation.",
      theoreticalFoundations: "Watson–Crick–Franklin X-ray diffraction (Photo 51) revealed a 2.0 nm uniform helix diameter.",
      strategicEvaluation: "Purine–pyrimidine pairing explains why helix width stays constant.",
      commonMisconceptions: ["Thinking hydrogen bonds link nucleotides *along* the same strand (those are covalent phosphodiester bonds)."],
      realWorldConnections: "PCR primer design depends on GC content; histone tails are targets for epigenetic cancer drugs.",
    },
    cases: [
      {
        id: "case-a1-2",
        title: "Hershey–Chase Blender Experiment (1952)",
        domainOrContext: "Molecular Genetics History / NOS",
        biologicalMechanism: "Radioisotope tracing ($^{32}\\text{P}$ vs $^{35}\\text{S}$) distinguished DNA from protein as the hereditary molecule.",
        concepts: ["information-flow"],
        syllabusLink: "A1.2 (HL)",
        quantitativeInsight: "Pellet contained $>80\\%$ of $^{32}\\text{P}$ vs supernatant containing $^{35}\\text{S}$.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Base sequence encodes hereditary information; antiparallel strands enable replication." },
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "Purine-pyrimidine H-bond geometry enforces A=T and G≡C." },
    ],
    examPromptTakeaway: "Always specify 5'→3' directionality and distinguish covalent phosphodiester bonds from H-bonds between bases.",
    examBlueprint: {
      paper1TrapPattern: "Asking which bond is broken by DNA helicase (H-bonds, NOT phosphodiester bonds).",
      paper2StructuredPrompt: "Explain how the structure of DNA allows it to replicate accurately and be packaged in eukaryotes. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Antiparallel double helix with complementary base pairing (A–T, G–C).",
        keyMarkSchemePoints: "1) Weak H-bonds allow strands to separate. 2) Complementary base pairing dictates exact template synthesis. 3) [HL] DNA wraps around histone octamers into nucleosomes for supercoiling.",
        dataOrUnitsTip: "Mention 2 nm helix diameter or 146 bp per nucleosome core if relevant.",
      },
      pitfallsToAvoid: ["Saying A pairs with U in DNA.", "Forgetting that histones are positively charged (rich in lysine/arginine) to bind negatively charged DNA phosphates."],
    },
    primaryFormulas: ["\\%A = \\%T, \\quad \\%G = \\%C"],
  },
  {
    id: "bio-a2-1",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Cells",
    topicCode: "A2.1",
    displayCode: "A2.1",
    syllabusRef: "IB Biology May 2027 · A2.1 Origins of cells [HL]",
    title: "A2.1 Origins of Cells",
    subtitle: "Prebiotic Chemistry, Miller–Urey, RNA World & LUCA [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · NOS & EVOLUTIONARY BIOCHEMISTRY",
    readingTimeMinutes: 6,
    summary:
      "Life emerged from abiotic synthesis of carbon compounds, self-assembling lipid vesicles, and catalytic RNA (ribozymes) leading to the Last Universal Common Ancestor (LUCA).",
    speedReadBullets: [
      "Prebiotic Earth had a reducing atmosphere (CH₄, NH₃, H₂, H₂O), high UV radiation, and no free O₂.",
      "Miller–Urey spark-discharge experiment produced amino acids abiotically; Pasteur disproved spontaneous generation.",
      "RNA World hypothesis: RNA acted as both genetic information carrier and catalytic ribozyme before DNA/proteins.",
      "LUCA evidence: universal genetic code, L-amino acids, ATP, and conserved ribosomal RNA across all 3 domains.",
    ],
    primer5Min:
      "How did non-living chemistry transition into the first living cells? Topic A2.1 (HL Only) traces four milestones: (1) abiotic synthesis of monomers (Miller–Urey, hydrothermal vents), (2) polymerization on mineral surfaces, (3) amphipathic fatty-acid vesicles enclosing protocells, and (4) self-replicating ribozymes in an RNA World. Comparative genomics reveals that all extant life shares LUCA's core genetic machinery.",
    subSections: [
      {
        id: "a2-1-s1",
        title: "Prebiotic Earth & Miller–Urey Experiment",
        marker: "A2.1.1 – A2.1.3 · HL ONLY",
        isHLOnly: true,
        content:
          "Lack of oxygen and an ozone layer meant intense UV light and lightning drove organic synthesis. Miller and Urey simulated these conditions using $\\text{H}_2\\text{O}, \\text{CH}_4, \\text{NH}_3, \\text{H}_2$ and electric sparks, yielding amino acids and organic acids.",
        analyticalTakeaway:
          "Contrast Pasteur's falsification of spontaneous generation (today cells only arise from pre-existing cells) with abiogenesis on early Earth.",
      },
      {
        id: "a2-1-s2",
        title: "Protocells, RNA World & LUCA",
        marker: "A2.1.4 – A2.1.9 · HL ONLY",
        isHLOnly: true,
        content:
          "Ribozymes (e.g., peptidyl transferase in the ribosome) show RNA can catalyze reactions and store sequences. Hydrothermal vents (alkaline white smokers) provide proton gradients and mineral catalysts. Shared traits across Bacteria, Archaea, and Eukarya point to LUCA ~3.8–4.0 billion years ago.",
        analyticalTakeaway:
          "Always cite *ribozymes* as the bridge solving the 'chicken-and-egg' paradox of DNA needing protein enzymes and proteins needing DNA.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a2-1-1",
        question: "Explain why RNA is considered a stronger candidate than DNA for the first genetic polymer.",
        promptType: "explain",
        hints: ["Think of dual roles: information + catalysis."],
        modelAnswer:
          "RNA can both store genetic information in its nucleotide sequence and fold into 3D shapes to act as catalytic ribozymes (capable of self-replication and peptide bond formation), whereas DNA is strictly an informational polymer requiring protein enzymes to replicate.",
        keyTermsToInclude: ["ribozyme", "catalytic", "information storage", "RNA World"],
      },
    ],
    analysis: {
      coreThesis: "Abiogenesis required compartmentalization (vesicles) + self-replicating catalysis (RNA) + energy gradients (hydrothermal vents).",
      theoreticalFoundations: "Thermodynamic openness of early Earth allowed monomer condensation on clay/mineral templates.",
      strategicEvaluation: "Modern consensus favors hydrothermal vents + atmospheric synthesis combined.",
      commonMisconceptions: ["Confusing Pasteur's swan-neck experiment (disproving modern spontaneous generation) with disproving ancient abiogenesis."],
      realWorldConnections: "Astrobiology searches for alkaline hydrothermal plumes on Enceladus and Europa.",
    },
    cases: [
      {
        id: "case-a2-1",
        title: "Lost City Alkaline Hydrothermal Vents",
        domainOrContext: "Origin of Life / Bioenergetics",
        biologicalMechanism: "Natural H⁺ gradients across iron-sulfur mineral membranes mirror chemiosmotic ATP synthesis.",
        concepts: ["energy-transduction", "compartmentalization"],
        syllabusLink: "A2.1 (HL)",
        quantitativeInsight: "Vent fluids reach pH 9–11 vs acidic Hadean ocean (~pH 5.5), creating a ~4–5 pH unit gradient.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 4, manifestation: "RNA World links sequence replication to catalysis." },
      { conceptId: "compartmentalization", intensity: 4, manifestation: "Fatty acid bilayers enclose internal chemistry." },
    ],
    examPromptTakeaway: "Emphasize ribozymes, reducing prebiotic atmosphere (no O₂), and conserved traits pointing to LUCA.",
    examBlueprint: {
      paper1TrapPattern: "Listing O₂ as a gas in the Miller–Urey apparatus (O₂ was absent!).",
      paper2StructuredPrompt: "Outline the evidence supporting the RNA World hypothesis and LUCA. [4]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "RNA performs both informational and catalytic functions; all life shares conserved biochemistry.",
        keyMarkSchemePoints: "1) Ribozymes catalyze reactions (e.g. rRNA in ribosomes). 2) Universal genetic code & ATP across Bacteria, Archaea, Eukarya. 3) Conserved 16S/18S rRNA sequences.",
        dataOrUnitsTip: "Note ~3.8 billion years ago for earliest microfossil/isotopic evidence.",
      },
      pitfallsToAvoid: ["Claiming Miller–Urey produced living cells (it only produced simple monomers like amino acids)."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-a2-2",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Cells",
    topicCode: "A2.2",
    displayCode: "A2.2",
    syllabusRef: "IB Biology May 2027 · A2.2 Cell structure",
    title: "A2.2 Cell Structure",
    subtitle: "Microscopy, Prokaryote vs Eukaryote Ultrastructure & Endosymbiosis",
    level: "SL / HL",
    strategicImportance: "CORE CELL BIOLOGY · MAGNIFICATION CALCULATIONS",
    readingTimeMinutes: 8,
    summary:
      "Cell theory unifies living organisms; electron microscopy resolves 70S vs 80S ribosomes, endomembrane organelles, and supports the endosymbiotic origin of mitochondria and chloroplasts.",
    speedReadBullets: [
      "Magnification $M = I / A$; light microscopy (~200 nm resolution) vs TEM/SEM (~0.2 nm resolution).",
      "Prokaryotes: naked circular DNA in nucleoid, 70S ribosomes, peptidoglycan cell wall, no membrane-bound organelles.",
      "Eukaryotes: linear DNA with histones in double-membrane nucleus, 80S ribosomes, ER, Golgi, mitochondria.",
      "Endosymbiotic theory: mitochondria & chloroplasts have 70S ribosomes, circular DNA, double membranes, and binary fission.",
    ],
    primer5Min:
      "All cells share a plasma membrane, cytoplasm, DNA, and ribosomes, yet differ radically in internal compartmentalization. Prokaryotes rely on a single compartment with 70S ribosomes and naked circular DNA, while eukaryotes compartmentalize metabolism inside membrane-bound organelles. Electron microscopy (freeze-fracture, TEM, SEM) revealed ultrastructure and confirmed that mitochondria and chloroplasts evolved from engulfed aerobic bacteria and cyanobacteria.",
    subSections: [
      {
        id: "a2-2-s1",
        title: "Microscopy & Magnification Calculations",
        marker: "A2.2.1 – A2.2.3",
        content:
          "Electron microscopes use electron beams with much shorter wavelengths than visible light, boosting resolution ~1000×. Always convert image ($I$) and actual ($A$) sizes to the same units ($1\\text{ mm} = 1000\\text{ }\\mu\\text{m} = 10^6\\text{ nm}$) before applying $M = I / A$.",
        analyticalTakeaway:
          "Resolution (ability to distinguish two close points) is limited by wavelength, not lens power alone.",
        keyFormulaOrFramework: "M = \\frac{I}{A}",
      },
      {
        id: "a2-2-s2",
        title: "Prokaryote vs Eukaryote & Plant vs Animal vs Fungi",
        marker: "A2.2.4 – A2.2.9",
        content:
          "Prokaryotes divide by binary fission and possess 70S ribosomes. Animal cells lack cell walls and plastids (have centrioles); plant cells have cellulose walls, chloroplasts, and large central vacuoles; fungal cells have chitin walls and no chloroplasts.",
        analyticalTakeaway:
          "Memorize atypical cells (striated muscle fibers, giant algae *Acetabularia*, aseptate fungal hyphae, anucleate RBCs) as exceptions to strict uninucleate cell models.",
      },
      {
        id: "a2-2-s3",
        title: "Endosymbiotic Theory & Evolution of Multicellularity",
        marker: "A2.2.10 – A2.2.11 · HL ONLY",
        isHLOnly: true,
        content:
          "Ancestral anaerobic eukaryotes engulfed aerobic proteobacteria (becoming mitochondria) and photosynthetic cyanobacteria (becoming chloroplasts). Supporting evidence: double membranes (inner = bacterial, outer = host vesicle), circular naked DNA, 70S ribosomes, and antibiotic sensitivity.",
        analyticalTakeaway:
          "Link serial endosymbiosis to the order of evolution: mitochondria evolved *before* chloroplasts because all eukaryotes have mitochondria (or remnants) while only plants/algae have plastids.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a2-2-1",
        question: "A mitochondrion measures 18 mm in a TEM micrograph with a magnification of ×12,000. Calculate its actual length in µm.",
        promptType: "calculation",
        hints: ["Convert 18 mm to µm first (×1000).", "Use A = I / M."],
        modelAnswer: "I = 18 mm = 18,000 µm. A = 18,000 µm / 12,000 = 1.5 µm.",
        keyTermsToInclude: ["1.5 µm", "I / M"],
        formulaUsed: "M = \\frac{I}{A}",
      },
    ],
    analysis: {
      coreThesis: "Ultrastructural compartmentalization separates eukaryotic efficiency from prokaryotic simplicity, bridged by endosymbiosis.",
      theoreticalFoundations: "Surface-area-to-volume ratio limits cell size unless internal membranes fold or cells become multinucleate.",
      strategicEvaluation: "Cryo-EM now bridges atomic resolution with hydrated native states without harsh chemical fixation.",
      commonMisconceptions: ["Thinking prokaryotes have *no* ribosomes (they have 70S ribosomes)."],
      realWorldConnections: "Macrolide and tetracycline antibiotics target 70S bacterial ribosomes without harming host 80S ribosomes (though mitochondrial 70S ribosomes can experience side effects).",
    },
    cases: [
      {
        id: "case-a2-2",
        title: "Atypical Cell Structures: Striated Muscle & Acetabularia",
        domainOrContext: "Cell Theory & Exceptions",
        biologicalMechanism: "Multinucleate syncytia and giant single-celled algae challenge the 'one small uninucleate cell' stereotype.",
        concepts: ["compartmentalization"],
        syllabusLink: "A2.2",
        quantitativeInsight: "Acetabularia reaches 5–10 cm in length despite being a single cell with one nucleus.",
      },
    ],
    conceptTracking: [
      { conceptId: "compartmentalization", intensity: 5, manifestation: "Organelles isolate biochemical pathways; endosymbionts retain 70S machinery." },
    ],
    examPromptTakeaway: "In micrograph questions, identify organelles by membrane count (double = nucleus/mitochondrion/chloroplast) and cristae/thylakoids.",
    examBlueprint: {
      paper1TrapPattern: "Unit conversion errors between mm, µm, and nm in scale-bar questions.",
      paper2StructuredPrompt: "Outline three pieces of evidence that support the endosymbiotic origin of mitochondria. [3]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Mitochondria share structural and genetic features with free-living prokaryotes.",
        keyMarkSchemePoints: "1) Circular naked DNA. 2) 70S ribosomes (same size as bacteria). 3) Double membrane (inner bacterial, outer host phagocytic). 4) Divide by binary fission.",
        dataOrUnitsTip: "Always specify '70S' vs '80S' rather than just 'small vs large'.",
      },
      pitfallsToAvoid: ["Saying mitochondria have *cell walls* (they lost peptidoglycan walls)."],
    },
    primaryFormulas: ["M = \\frac{I}{A}"],
  },
  {
    id: "bio-a2-3",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Cells",
    topicCode: "A2.3",
    displayCode: "A2.3",
    syllabusRef: "IB Biology May 2027 · A2.3 Viruses [HL]",
    title: "A2.3 Viruses",
    subtitle: "Capsids, Envelopes, Lytic vs Lysogenic Cycles & Rapid Evolution [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · NEW 2025/2027 SYLLABUS TOPIC",
    readingTimeMinutes: 7,
    summary:
      "Viruses are non-cellular obligate intracellular parasites with DNA or RNA genomes inside protein capsids. They hijack host machinery via lytic or lysogenic cycles and evolve rapidly.",
    speedReadBullets: [
      "Structural diversity: DNA or RNA (ss/ds), protein capsid, optional lipid envelope with viral glycoproteins.",
      "Bacteriophage lambda: lytic cycle (immediate virion assembly + lysis) vs lysogenic cycle (prophage integration).",
      "HIV (retrovirus): uses reverse transcriptase (RNA → cDNA) and integrase to insert into host T-helper genome.",
      "Rapid evolution: high mutation rates (RNA polymerases lack proofreading) + antigenic drift/shift (e.g. Influenza).",
    ],
    primer5Min:
      "Are viruses alive? Because they lack metabolism, ribosomes, and independent reproduction, viruses sit at the boundary of life as obligate intracellular parasites. Topic A2.3 (HL Only) contrasts bacteriophage lambda's lytic/lysogenic switch with retroviral replication in HIV and coronavirus RNA replication, highlighting why viral RNA-dependent polymerases generate rapid variation.",
    subSections: [
      {
        id: "a2-3-s1",
        title: "Viral Architecture & Non-Living Classification",
        marker: "A2.3.1 – A2.3.3 · HL ONLY",
        isHLOnly: true,
        content:
          "All viruses contain genetic material (dsDNA, ssDNA, dsRNA, or ssRNA) enclosed in a protein capsid. Enveloped viruses (HIV, SARS-CoV-2, Influenza) steal a phospholipid bilayer studded with viral spike glycoproteins from host membranes.",
        analyticalTakeaway:
          "Shared genetic code allows host ribosomes to translate viral mRNA directly into viral proteins.",
      },
      {
        id: "a2-3-s2",
        title: "Lytic vs Lysogenic Cycles & Retroviruses",
        marker: "A2.3.4 – A2.3.6 · HL ONLY",
        isHLOnly: true,
        content:
          "In the lysogenic cycle, bacteriophage $\\lambda$ integrates as a dormant prophage into the bacterial chromosome, replicating silently until UV/stress triggers the lytic switch. HIV uses reverse transcriptase to synthesize dsDNA from ssRNA, then integrase inserts the provirus into host CD4+ T-cell DNA.",
        analyticalTakeaway:
          "Antiretroviral drugs target viral-specific enzymes (reverse transcriptase, integrase, protease) to spare host cells.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a2-3-1",
        question: "Explain why RNA viruses like Influenza and HIV evolve much faster than DNA viruses.",
        promptType: "explain",
        hints: ["Compare proofreading ability of RNA polymerase / reverse transcriptase vs DNA polymerase."],
        modelAnswer:
          "RNA-dependent RNA polymerases and reverse transcriptase lack 3'→5' exonuclease proofreading activity, resulting in high point-mutation rates during replication (antigenic drift). Segmented RNA viruses like Influenza also undergo reassortment (antigenic shift) when two strains co-infect one cell.",
        keyTermsToInclude: ["proofreading", "mutation rate", "reverse transcriptase", "antigenic drift"],
      },
    ],
    analysis: {
      coreThesis: "Viruses exploit the universality of the genetic code and host ATP/ribosomes while evolving at hyper-accelerated rates.",
      theoreticalFoundations: "Polyphyletic origins: viruses likely arose multiple times from escaped mobile genetic elements or regressive cellular parasites.",
      strategicEvaluation: "Enveloped viruses are vulnerable to soap/alcohol detergents that disrupt their lipid bilayer.",
      commonMisconceptions: ["Thinking antibiotics treat viral infections (antibiotics target bacterial 70S ribosomes or peptidoglycan walls)."],
      realWorldConnections: "mRNA vaccines deliver spike-protein mRNA in lipid nanoparticles so host cells display viral antigens safely.",
    },
    cases: [
      {
        id: "case-a2-3",
        title: "HIV-1 Reverse Transcription & CD4+ Tropism",
        domainOrContext: "Virology & Immunology",
        biologicalMechanism: "gp120 binds CD4 + CCR5 co-receptor; reverse transcriptase generates proviral DNA.",
        concepts: ["information-flow", "evolutionary-adaptation"],
        syllabusLink: "A2.3 (HL) / C3.2",
        quantitativeInsight: "HIV error rate ≈ $3 \\times 10^{-5}$ mutations per base per cycle (~1 mutation per 3 genomes).",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Reverse transcription reverses the central dogma (RNA → DNA)." },
      { conceptId: "evolutionary-adaptation", intensity: 5, manifestation: "Error-prone replication drives rapid immune escape." },
    ],
    examPromptTakeaway: "Compare phage λ (lytic/lysogenic), HIV (retrovirus + reverse transcriptase), and Coronavirus (positive-sense ssRNA).",
    examBlueprint: {
      paper1TrapPattern: "Claiming bacteriophages have lipid envelopes (most phages are naked protein capsids with tail fibers).",
      paper2StructuredPrompt: "Compare the replication cycles of bacteriophage lambda and HIV. [5]",
      commandTerm: "Compare and contrast",
      idealSolutionBreakdown: {
        statePrinciples: "Both are obligate intracellular parasites using host ribosomes/ATP, but differ in genome type and integration.",
        keyMarkSchemePoints: "1) Both can integrate genome into host DNA (prophage vs provirus). 2) Phage λ has dsDNA; HIV has ssRNA requiring reverse transcriptase. 3) Phage λ infects bacteria and lyses host; HIV infects animal CD4+ T-cells and buds via lipid envelope.",
        dataOrUnitsTip: "Use explicit comparative words ('Whereas...', 'Both...').",
      },
      pitfallsToAvoid: ["Forgetting to mention reverse transcriptase for HIV."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-a3-1",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Organisms",
    topicCode: "A3.1",
    displayCode: "A3.1",
    syllabusRef: "IB Biology May 2027 · A3.1 Diversity of organisms",
    title: "A3.1 Diversity of Organisms",
    subtitle: "Biological Species Concept, Binomial Nomenclature, Karyotypes & DNA Barcoding",
    level: "SL / HL",
    strategicImportance: "TAXONOMY & GENOMICS · PAPER 1B DATA",
    readingTimeMinutes: 7,
    summary:
      "Variation exists within and between species. Species are named via binomial nomenclature, distinguished by karyotypes and reproductive isolation, and rapidly identified via DNA barcoding.",
    speedReadBullets: [
      "Biological species concept: populations capable of interbreeding to produce fertile offspring (fails for asexuals/hybrids).",
      "Chromosome number is a shared species trait (e.g., humans 2n=46, chimps 2n=48 via chromosome 2 fusion).",
      "Genome size varies enormously and does not correlate linearly with organismal complexity (C-value paradox).",
      "[HL] Dichotomous keys, eDNA (environmental DNA), and DNA barcoding (e.g., COI gene) accelerate biodiversity surveys.",
    ],
    primer5Min:
      "How do biologists organize Earth's millions of species? Linnaeus's binomial system (*Genus species*) provides universal names, while modern genomics uses karyograms, whole-genome sequencing, and short standardized DNA barcodes (like mitochondrial *COI* in animals or *rbcL* in plants) to identify cryptic species and detect rare organisms from environmental DNA (eDNA) in water or soil.",
    subSections: [
      {
        id: "a3-1-s1",
        title: "Species Concepts, Binomial System & Karyograms",
        marker: "A3.1.1 – A3.1.6",
        content:
          "Karyograms arrange homologous chromosome pairs by size, centromere position, and banding pattern. Human chromosome 2 shows telomere-to-telomere fusion of two ancestral ape chromosomes, explaining $2n=46$ vs $2n=48$ in great apes.",
        analyticalTakeaway:
          "Limitations of the biological species concept: inapplicable to prokaryotes (asexual/horizontal gene transfer) and extinct fossil taxa.",
      },
      {
        id: "a3-1-s2",
        title: "Genome Size, DNA Barcoding & eDNA",
        marker: "A3.1.7 – A3.1.10 · HL ONLY",
        isHLOnly: true,
        content:
          "Genome size (base pairs) reflects non-coding repetitive DNA as well as genes (e.g., *Paris japonica* has 150 Gbp vs human 3.2 Gbp). DNA barcoding sequences conserved loci with species-specific variation (e.g., *COI*) to identify organisms from tissue fragments or eDNA.",
        analyticalTakeaway:
          "eDNA allows non-invasive monitoring of endangered aquatic amphibians or invasive species.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a3-1-1",
        question: "Why does the biological species concept fail when classifying bacteria?",
        promptType: "explain",
        hints: ["Think about how bacteria reproduce and exchange DNA."],
        modelAnswer:
          "Bacteria reproduce asexually by binary fission rather than sexual interbreeding, and they frequently exchange genes across distantly related lineages via horizontal gene transfer (plasmids/conjugation), making reproductive isolation inapplicable.",
        keyTermsToInclude: ["asexual", "binary fission", "horizontal gene transfer", "reproductive isolation"],
      },
    ],
    analysis: {
      coreThesis: "Taxonomic classification bridges observable morphology/karyotypes with standardized DNA barcoding.",
      theoreticalFoundations: "Allopolyploidy and chromosome fusion events create instant reproductive barriers.",
      strategicEvaluation: "DNA barcoding relies on low intraspecific variation and high interspecific divergence.",
      commonMisconceptions: ["Assuming larger genomes always mean more complex organisms."],
      realWorldConnections: "eDNA metabarcoding in river conservation and seafood mislabeling forensics.",
    },
    cases: [
      {
        id: "case-a3-1",
        title: "Human Chromosome 2 Fusion Event",
        domainOrContext: "Comparative Cytogenetics",
        biologicalMechanism: "End-to-end fusion of two ancestral ape chromosomes left vestigial telomeres at 2q13 and an inactive second centromere.",
        concepts: ["evolutionary-adaptation", "information-flow"],
        syllabusLink: "A3.1",
        quantitativeInsight: "Humans $2n = 46$ vs *Pan troglodytes* $2n = 48$.",
      },
    ],
    conceptTracking: [
      { conceptId: "evolutionary-adaptation", intensity: 4, manifestation: "Speciation and karyotype divergence." },
      { conceptId: "information-flow", intensity: 4, manifestation: "DNA barcoding reads species-specific sequences." },
    ],
    examPromptTakeaway: "Always italicize binomial names with capitalized Genus and lowercase species (*Homo sapiens*).",
    examBlueprint: {
      paper1TrapPattern: "Confusing haploid (n) gamete count with diploid (2n) somatic count on karyograms.",
      paper2StructuredPrompt: "Explain how DNA barcoding and eDNA are used to assess biodiversity. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Conserved marker genes (e.g., COI) are amplified from environmental samples and matched to reference databases.",
        keyMarkSchemePoints: "1) Shed DNA (skin, mucus, feces) collected from water/soil. 2) PCR amplifies barcode region. 3) Sequences compared to reference library to identify species without capturing organisms.",
        dataOrUnitsTip: "Mention PCR amplification step.",
      },
      pitfallsToAvoid: ["Saying genome size equals gene count."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-a3-2",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Organisms",
    topicCode: "A3.2",
    displayCode: "A3.2",
    syllabusRef: "IB Biology May 2027 · A3.2 Classification and cladistics [HL]",
    title: "A3.2 Classification & Cladistics",
    subtitle: "Clades, Cladograms, Molecular Clocks & Three Domains [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · PHYLOGENETICS & CLADOGRAM ANALYSIS",
    readingTimeMinutes: 7,
    summary:
      "Cladistics classifies organisms strictly by shared derived characteristics and common ancestry (monophyletic clades), using molecular clocks and rRNA sequences to resolve the Three Domains.",
    speedReadBullets: [
      "Clade = ancestor + all its descendants (monophyletic). Nodes represent hypothetical common ancestors.",
      "Molecular clocks estimate divergence times assuming roughly constant neutral mutation rates.",
      "Base/amino acid sequence comparisons falsified morphology-only trees (e.g. figwort family reclassification).",
      "Three Domains (Bacteria, Archaea, Eukarya) established by Carl Woese using 16S/18S rRNA.",
    ],
    primer5Min:
      "Traditional Linnaean taxonomy grouped organisms by superficial appearance, which can be misled by convergent evolution (analogous structures like bird and bat wings). Cladistics (HL Only) reconstructs evolutionary history using molecular sequence alignments and parsimony—choosing the tree requiring the fewest evolutionary changes—and led to reclassifying Archaea as a distinct domain closer to Eukarya than to Bacteria.",
    subSections: [
      {
        id: "a3-2-s1",
        title: "Clades, Parsimony & Molecular Clocks",
        marker: "A3.2.1 – A3.2.6 · HL ONLY",
        isHLOnly: true,
        content:
          "Cladograms branch at nodes representing speciation events. Root length or branch mutations can serve as a molecular clock calibrated against dated fossils. Parsimony selects the cladogram with the minimum number of character-state transitions.",
        analyticalTakeaway:
          "Distinguish *homologous* traits (shared ancestry, divergent evolution) from *analogous* traits (convergent evolution).",
      },
      {
        id: "a3-2-s2",
        title: "Reclassification & Three Domains of Life",
        marker: "A3.2.7 – A3.2.9 · HL ONLY",
        isHLOnly: true,
        content:
          "Woese's 16S rRNA analysis revealed that Archaea possess ether-linked membrane lipids, histones, and RNA polymerases resembling Eukarya rather than Bacteria, splitting prokaryotes into Bacteria and Archaea.",
        analyticalTakeaway:
          "Cite the Figwort family (*Scrophulariaceae*) as the classic IB example where chloroplast DNA sequencing forced taxonomic reclassification.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a3-2-1",
        question: "Why can molecular sequence data falsify a cladogram built solely on morphological traits?",
        promptType: "explain",
        hints: ["Think of convergent evolution vs neutral DNA mutations."],
        modelAnswer:
          "Convergent evolution produces analogous structures in unrelated lineages facing similar selection pressures, falsely grouping them together. DNA/amino acid sequences accumulate neutral mutations over time, revealing true evolutionary ancestry and exposing homoplasy.",
        keyTermsToInclude: ["convergent evolution", "analogous", "homologous", "DNA sequence"],
      },
    ],
    analysis: {
      coreThesis: "Cladistics replaces subjective morphological grouping with testable, sequence-based phylogenetic hypotheses.",
      theoreticalFoundations: "Principle of parsimony and neutral theory of molecular evolution.",
      strategicEvaluation: "Molecular clocks must be calibrated with fossils because mutation rates vary across taxa and genes.",
      commonMisconceptions: ["Thinking 'lower' branches on a cladogram are 'more primitive'—all extant tips have evolved for the same duration."],
      realWorldConnections: "Tracking SARS-CoV-2 variant phylogenies in real time via Nextstrain.",
    },
    cases: [
      {
        id: "case-a3-2",
        title: "Reclassification of the Figwort Family (Scrophulariaceae)",
        domainOrContext: "Plant Systematics / NOS Falsification",
        biologicalMechanism: "Chloroplast DNA sequencing showed the traditional family was polyphyletic, splitting it into five distinct clades.",
        concepts: ["evolutionary-adaptation", "information-flow"],
        syllabusLink: "A3.2 (HL)",
        quantitativeInsight: "Over 50% of genera were reassigned to Plantaginaceae and Orobanchaceae.",
      },
    ],
    conceptTracking: [
      { conceptId: "evolutionary-adaptation", intensity: 5, manifestation: "Divergent vs convergent evolution mapped on cladograms." },
    ],
    examPromptTakeaway: "On cladogram questions, two taxa are most closely related if they share the *most recent* common ancestor (node).",
    examBlueprint: {
      paper1TrapPattern: "Assuming two organisms placed next to each other visually on a cladogram are closest relatives (always trace back to the node!).",
      paper2StructuredPrompt: "Explain how rRNA sequencing led to the Three-Domain classification system. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "rRNA is universally present and evolves slowly, allowing deep evolutionary comparisons.",
        keyMarkSchemePoints: "1) Carl Woese compared 16S/18S rRNA sequences. 2) Found methanogens/extremophiles (Archaea) differed fundamentally from Bacteria. 3) Archaea share transcription/histone traits with Eukarya.",
        dataOrUnitsTip: "Name the three domains: Bacteria, Archaea, Eukarya.",
      },
      pitfallsToAvoid: ["Calling Archaea 'ancient bacteria'—they are a separate domain."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-a4-1",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Ecosystems",
    topicCode: "A4.1",
    displayCode: "A4.1",
    syllabusRef: "IB Biology May 2027 · A4.1 Evolution and speciation",
    title: "A4.1 Evolution & Speciation",
    subtitle: "Evidence for Evolution, Homologous Structures & Allopatric/Sympatric Speciation",
    level: "SL / HL",
    strategicImportance: "CORE EVOLUTION · PAPER 2 EXTENDED RESPONSE",
    readingTimeMinutes: 7,
    summary:
      "Evolution is the cumulative change in heritable characteristics of a population. Speciation occurs when reproductive isolation—geographical (allopatric) or behavioural/polyploid (sympatric)—splits a gene pool.",
    speedReadBullets: [
      "Evidence: fossil sequence, selective breeding, homologous structures (pentadactyl limb), DNA/protein homology.",
      "Convergent evolution produces analogous structures (e.g. streamlined shape in sharks & dolphins).",
      "Speciation requires reproductive isolation + differential selection or genetic drift.",
      "[HL] Allopatric (geographic barrier) vs Sympatric (behavioural, temporal, or polyploidy in plants).",
    ],
    primer5Min:
      "Darwinian evolution explains both unity (shared homologous structures like the vertebrate pentadactyl limb) and diversity (adaptive radiation into distinct ecological niches). When a population is split by a barrier—whether a mountain range (allopatric) or chromosomal polyploidy/courtship shift in the same habitat (sympatric)—independent mutations and selection pressures prevent interbreeding, creating two species.",
    subSections: [
      {
        id: "a4-1-s1",
        title: "Evidence for Evolution & Adaptive Radiation",
        marker: "A4.1.1 – A4.1.5",
        content:
          "Homologous structures share a common anatomical plan modified for different functions (divergent evolution), whereas analogous structures evolve independently in unrelated lineages (convergent evolution). Adaptive radiation rapidly diversifies a founder lineage into vacant niches (e.g., Galápagos finches, Hawaiian honeycreepers).",
        analyticalTakeaway:
          "Always contrast *pentadactyl limb* (homologous) with *insect wing vs bird wing* (analogous).",
      },
      {
        id: "a4-1-s2",
        title: "Allopatric & Sympatric Speciation + Hybridization",
        marker: "A4.1.6 – A4.1.9 · HL ONLY",
        isHLOnly: true,
        content:
          "Allopatric speciation relies on physical barriers halting gene flow. Sympatric speciation occurs without geographic separation via disruptive selection, temporal/behavioural isolation, or **polyploidy** (meiotic nondisjunction creating $4n$ plants reproductively isolated from $2n$ parents).",
        analyticalTakeaway:
          "Polyploidy (*Allium*, wheat) is an instant sympatric speciation mechanism common in plants.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a4-1-1",
        question: "Explain how polyploidy can cause sympatric speciation in plants.",
        promptType: "explain",
        hints: ["What happens when a 4n tetraploid crosses with a 2n diploid?"],
        modelAnswer:
          "Meiotic failure (nondisjunction) produces diploid (2n) gametes that fuse to form a tetraploid (4n) individual. If the 4n plant crosses with a 2n parent, the resulting triploid (3n) offspring are sterile because homologous chromosomes cannot pair evenly during meiosis, instantly isolating the 4n population reproductively within the same habitat.",
        keyTermsToInclude: ["nondisjunction", "tetraploid", "triploid", "sterile", "reproductive isolation"],
      },
    ],
    analysis: {
      coreThesis: "Halted gene flow plus divergent selection splits one gene pool into two reproductively isolated species.",
      theoreticalFoundations: "Mayr's biological species concept integrated with Dobzhansky–Muller genetic incompatibilities.",
      strategicEvaluation: "Hybrid zones (e.g., *chorthippus* grasshoppers) demonstrate speciation is a gradual continuum.",
      commonMisconceptions: ["Saying individuals evolve during their lifetime (populations evolve across generations)."],
      realWorldConnections: "Apple maggot fly (*Rhagoletis pomonella*) diverging sympatrically between hawthorn and domesticated apple hosts.",
    },
    cases: [
      {
        id: "case-a4-1",
        title: "Bonobos & Chimpanzees: Allopatric Speciation across the Congo River",
        domainOrContext: "Primate Speciation",
        biologicalMechanism: "Formation of the Congo River ~1.5–2 Myr ago isolated *Pan paniscus* (south) from *Pan troglodytes* (north).",
        concepts: ["evolutionary-adaptation"],
        syllabusLink: "A4.1",
        quantitativeInsight: "Divergence time ≈ 1.8 million years.",
      },
    ],
    conceptTracking: [
      { conceptId: "evolutionary-adaptation", intensity: 5, manifestation: "Reproductive isolation + selection drives speciation." },
    ],
    examPromptTakeaway: "Always state *what* isolates the populations (geographic, temporal, behavioural, or polyploid) before explaining divergent selection.",
    examBlueprint: {
      paper1TrapPattern: "Confusing convergent evolution (analogous) with divergent evolution (homologous).",
      paper2StructuredPrompt: "Distinguish between allopatric and sympatric speciation using named examples. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Both require reproductive isolation and divergence of allele frequencies.",
        keyMarkSchemePoints: "1) Allopatric: physical barrier (e.g. Congo River splitting bonobos/chimps). 2) Sympatric: same area, e.g. polyploidy in plants or temporal/behavioural isolation.",
        dataOrUnitsTip: "Mention halted gene flow explicitly.",
      },
      pitfallsToAvoid: ["Saying 'they couldn't mate so they mutated to become different species'."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-a4-2",
    themeId: "theme-a",
    themeNumber: 1,
    orgLevel: "Ecosystems",
    topicCode: "A4.2",
    displayCode: "A4.2",
    syllabusRef: "IB Biology May 2027 · A4.2 Conservation of biodiversity",
    title: "A4.2 Conservation of Biodiversity",
    subtitle: "Biodiversity Levels, Anthropogenic Extinction & In-Situ / Ex-Situ Conservation",
    level: "SL / HL",
    strategicImportance: "ECOLOGY & CONSERVATION · EDGE / IUCN",
    readingTimeMinutes: 6,
    summary:
      "Biodiversity spans ecosystem, species, and genetic diversity. Human land-use change, overexploitation, and invasive species drive the 6th mass extinction, countered by in-situ reserves and ex-situ seed/gene banks.",
    speedReadBullets: [
      "Three levels of biodiversity: ecosystem diversity, species diversity (richness + evenness), genetic diversity.",
      "Anthropogenic drivers (HIPPO): Habitat loss, Invasive species, Pollution, Population growth, Overexploitation.",
      "In-situ conservation: national parks, marine protected areas, wildlife corridors, rewilding.",
      "Ex-situ conservation: zoos/captive breeding, botanical gardens, seed banks (Svalbard), EDGE species prioritization.",
    ],
    primer5Min:
      "Earth is experiencing a human-driven biodiversity crisis where extinction rates exceed background levels by 100–1000×. Conservation biology combines *in-situ* protection (preserving intact habitats and corridors so natural selection continues) with *ex-situ* safeguards (captive breeding, cryopreservation, and seed banks) prioritized via the EDGE (Evolutionarily Distinct and Globally Endangered) framework.",
    subSections: [
      {
        id: "a4-2-s1",
        title: "Levels of Biodiversity & Extinction Drivers",
        marker: "A4.2.1 – A4.2.5",
        content:
          "Species diversity combines richness (number of species) and evenness (relative abundance), quantified by Simpson's Diversity Index. Habitat fragmentation isolates small populations, accelerating inbreeding depression and genetic drift.",
        analyticalTakeaway:
          "Cite specific extinct/endangered case studies (e.g., North Island giant moa, Caribbean monk seal, Javan rhinoceros).",
        keyFormulaOrFramework: "D = \\frac{N(N-1)}{\\sum n(n-1)}",
      },
      {
        id: "a4-2-s2",
        title: "In-Situ vs Ex-Situ Conservation & EDGE",
        marker: "A4.2.6 – A4.2.8",
        content:
          "*In-situ* conservation preserves ecological interactions and evolutionary potential within natural habitats. *Ex-situ* methods rescue critically small populations when habitat threats are unresolved. EDGE prioritizes species with few close relatives and high IUCN extinction risk.",
        analyticalTakeaway:
          "Always evaluate trade-offs: ex-situ risks loss of wild foraging/predator-avoidance behaviours and reduced genetic diversity.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-a4-2-1",
        question: "Why is in-situ conservation generally preferred over ex-situ conservation when habitat remains viable?",
        promptType: "explain",
        hints: ["Consider co-evolution, population size, and natural behaviours."],
        modelAnswer:
          "In-situ conservation maintains species within their natural food webs and selection pressures, preserves larger breeding populations with greater genetic diversity, and avoids domestication or loss of learned wild behaviours.",
        keyTermsToInclude: ["natural selection", "ecological interactions", "genetic diversity", "wild behaviours"],
      },
    ],
    analysis: {
      coreThesis: "Effective conservation integrates habitat connectivity (in-situ) with genetic insurance (ex-situ) guided by quantitative diversity metrics.",
      theoreticalFoundations: "Island biogeography theory informs reserve size and corridor design.",
      strategicEvaluation: "EDGE balances taxonomic uniqueness against immediate extinction probability.",
      commonMisconceptions: ["Equating species richness alone with biodiversity (evenness matters equally)."],
      realWorldConnections: "Svalbard Global Seed Vault & Yellowstone-to-Yukon wildlife corridors.",
    },
    cases: [
      {
        id: "case-a4-2",
        title: "Mixed Dipterocarp Forests vs Oil Palm Monoculture",
        domainOrContext: "Tropical Conservation",
        biologicalMechanism: "Conversion of complex multi-canopy forest to monoculture collapses Simpson's D and specialist niches.",
        concepts: ["ecological-interdependence"],
        syllabusLink: "A4.2",
        quantitativeInsight: "Simpson's D drops by >70% in monoculture plantations vs primary rainforest.",
      },
    ],
    conceptTracking: [
      { conceptId: "ecological-interdependence", intensity: 5, manifestation: "Habitat loss cascades across trophic networks." },
    ],
    examPromptTakeaway: "Use Simpson's D for quantitative biodiversity comparisons and contrast in-situ vs ex-situ explicitly.",
    examBlueprint: {
      paper1TrapPattern: "Assuming a high Simpson's reciprocal index D means *low* diversity (higher D = higher diversity).",
      paper2StructuredPrompt: "Outline the causes of the current biodiversity crisis and evaluate one ex-situ conservation strategy. [5]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Anthropogenic habitat destruction, invasive species, overharvesting, and climate change drive extinction.",
        keyMarkSchemePoints: "1) Causes: deforestation/agriculture, invasive predators, climate shifts. 2) Ex-situ (e.g. seed bank/captive breeding): protects from immediate extinction & preserves alleles, BUT costly, small gene pool, reintroduction challenges.",
        dataOrUnitsTip: "Mention IUCN Red List criteria if evaluating threat status.",
      },
      pitfallsToAvoid: ["Giving vague 'pollution' without naming a specific biological impact."],
    },
    primaryFormulas: ["D = \\frac{N(N-1)}{\\sum n(n-1)}"],
  },
];
