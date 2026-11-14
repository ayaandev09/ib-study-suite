import { TopicData } from "./types";

export const THEME_B_TOPICS: TopicData[] = [
  {
    id: "bio-b1-1",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Molecules",
    topicCode: "B1.1",
    displayCode: "B1.1",
    syllabusRef: "IB Biology May 2027 · B1.1 Carbohydrates and lipids",
    title: "B1.1 Carbohydrates & Lipids",
    subtitle: "Condensation/Hydrolysis, Polysaccharides, Triglycerides & Phospholipids",
    level: "SL / HL",
    strategicImportance: "MACROMOLECULAR BIOCHEMISTRY · HIGH-YIELD SL/HL",
    readingTimeMinutes: 7,
    summary:
      "Carbon's tetravalence builds diverse macromolecules via condensation (releasing H₂O) and hydrolysis. Starch, glycogen, and cellulose differ in α/β-glucose isomerism; lipids store dense energy and form membranes.",
    speedReadBullets: [
      "Condensation joins monomers (glycosidic or ester bonds) releasing H₂O; hydrolysis consumes H₂O to cleave polymers.",
      "Starch (amylose/amylopectin) & glycogen use α-glucose (energy storage); cellulose uses β-glucose (alternating 180° orientation → straight H-bonded microfibrils).",
      "Triglycerides = 1 glycerol + 3 fatty acids (saturated vs cis/trans unsaturated); 2× energy density per gram vs carbs.",
      "Phospholipids are amphipathic (hydrophilic phosphate head, hydrophobic fatty-acid tails), driving bilayer self-assembly.",
    ],
    primer5Min:
      "Carbon forms four covalent bonds, enabling chains, rings, and isomers. In carbohydrates, flipping a single –OH group between α-glucose and β-glucose transforms a helical, digestible energy store (starch) into a rigid, unbranched structural cable (cellulose). Meanwhile, hydrophobic triglycerides pack ~38 kJ g⁻¹ without osmotic water drag, and amphipathic phospholipids spontaneously form biological membranes.",
    subSections: [
      {
        id: "b1-1-s1",
        title: "Monosaccharides, Polysaccharides & Glycoproteins",
        marker: "B1.1.1 – B1.1.7",
        content:
          "$\\alpha$-glucose forms 1,4-glycosidic bonds (and 1,6-branches in amylopectin/glycogen) for compact, osmotically inactive energy storage. $\\beta$-glucose rotates $180^\\circ$ at every alternate monomer, forming straight cellulose chains cross-linked by H-bonds into high-tensile microfibrils. Glycoproteins on membranes mediate cell–cell recognition (e.g., ABO blood antigens).",
        analyticalTakeaway:
          "Contrast *glycogen* (highly branched 1,6 linkages for rapid glucose mobilization in animals) vs *cellulose* (unbranched β-1,4).",
      },
      {
        id: "b1-1-s2",
        title: "Triglycerides, Fatty Acids, Phospholipids & Steroids",
        marker: "B1.1.8 – B1.1.13",
        content:
          "Esterification links 3 fatty acids to glycerol. Saturated fatty acids pack tightly (solid fats); *cis*-unsaturated fatty acids have a $30^\\circ$ kink that lowers melting point and increases membrane fluidity. Steroids (cholesterol, estradiol, testosterone) share a 4-ring hydrophobic backbone.",
        analyticalTakeaway:
          "Lipids store twice as much energy per gram as glycogen and require no hydration shell, ideal for mobile animals.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b1-1-1",
        question: "Explain why glycogen is a more suitable short-term energy store in animals than free glucose.",
        promptType: "explain",
        hints: ["Think of osmotic pressure and branching."],
        modelAnswer:
          "Free glucose is soluble and would raise intracellular osmotic pressure, causing water influx and cell lysis. Glycogen is an insoluble, compact polymer with frequent α-1,6 branches that provide many terminal ends for rapid enzymatic hydrolysis into glucose.",
        keyTermsToInclude: ["insoluble", "osmotic", "α-1,6 branches", "hydrolysis"],
      },
    ],
    analysis: {
      coreThesis: "Subtle stereochemical differences (α vs β, cis vs trans) dictate whether a macromolecule stores energy, builds cell walls, or fluidizes membranes.",
      theoreticalFoundations: "Dehydration synthesis vs hydrolytic cleavage.",
      strategicEvaluation: "Glycogen vs triglycerides: glycogen yields rapid anaerobic ATP; triglycerides provide long-term high-density reserves.",
      commonMisconceptions: ["Thinking triglycerides are polymers (they are assembled from 4 subunits, not repeating monomers)."],
      realWorldConnections: "Industrial hydrogenation creates *trans* fats linked to LDL elevation and coronary heart disease.",
    },
    cases: [
      {
        id: "case-b1-1",
        title: "Migratory Bird Lipid Fueling",
        domainOrContext: "Comparative Bioenergetics",
        biologicalMechanism: "Bar-tailed godwits store >50% body mass as triglycerides before 11,000 km non-stop flights.",
        concepts: ["energy-transduction", "molecular-specificity"],
        syllabusLink: "B1.1",
        quantitativeInsight: "Lipids yield ~38 kJ g⁻¹ vs ~17 kJ g⁻¹ for carbohydrates.",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "α vs β glucose isomerism dictates starch vs cellulose function." },
    ],
    examPromptTakeaway: "Specify *glycosidic* bonds for carbohydrates and *ester* bonds for triglycerides/phospholipids.",
    examBlueprint: {
      paper1TrapPattern: "Confusing condensation (produces H₂O) with hydrolysis (uses H₂O).",
      paper2StructuredPrompt: "Compare the structure and function of cellulose and glycogen. [4]",
      commandTerm: "Compare and contrast",
      idealSolutionBreakdown: {
        statePrinciples: "Both are polymers of glucose linked by glycosidic bonds.",
        keyMarkSchemePoints: "1) Both made of glucose monomers. 2) Glycogen uses α-glucose with 1,4 and 1,6 branches; cellulose uses β-glucose with unbranched 1,4 chains. 3) Glycogen stores energy in animals; cellulose provides structural tensile strength in plant cell walls.",
        dataOrUnitsTip: "Mention alternating 180° inversion of β-glucose.",
      },
      pitfallsToAvoid: ["Saying cellulose is branched."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b1-2",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Molecules",
    topicCode: "B1.2",
    displayCode: "B1.2",
    syllabusRef: "IB Biology May 2027 · B1.2 Proteins",
    title: "B1.2 Proteins",
    subtitle: "Amino Acids, 4 Levels of Structure, Denaturation & Globular vs Fibrous",
    level: "SL / HL",
    strategicImportance: "PROTEIN FOLDING & STRUCTURE–FUNCTION · CORE SL/HL",
    readingTimeMinutes: 8,
    summary:
      "20 amino acids link via peptide bonds to fold into primary, secondary, tertiary, and quaternary structures stabilized by R-group interactions, yielding soluble globular enzymes/hormones or insoluble fibrous scaffolds.",
    speedReadBullets: [
      "Amino acid = central Cα, –NH₂, –COOH, –H, and variable R-group (polar, non-polar, acidic, basic).",
      "Condensation forms covalent peptide bonds; extreme pH or heat disrupts H-bonds/ionic bonds (denaturation).",
      "[HL] 4 structural levels: 1° (sequence), 2° (α-helix/β-sheet backbone H-bonds), 3° (R-group 3D fold), 4° (multi-subunit).",
      "[HL] Globular (insulin, hemoglobin, Rubisco) vs Fibrous (collagen triple helix, keratin).",
    ],
    primer5Min:
      "Proteins execute nearly every dynamic task in cells. The linear sequence of amino acids (primary structure) encodes all information needed for 3D folding. Backbone C=O···H–N hydrogen bonds form α-helices and β-pleated sheets (secondary structure), while R-group interactions—hydrophobic clustering in the core, hydrophilic R-groups on the surface, ionic bridges, and covalent disulfide bonds—lock in the functional tertiary shape.",
    subSections: [
      {
        id: "b1-2-s1",
        title: "Amino Acids, Peptide Bonds & Denaturation",
        marker: "B1.2.1 – B1.2.5",
        content:
          "Peptide bonds form between the carboxyl group of one amino acid and the amino group of the next. Essential amino acids must be obtained from the diet. Heat increases kinetic vibration and extreme pH alters R-group ionization, breaking weak H-bonds and ionic bonds without breaking peptide bonds.",
        analyticalTakeaway:
          "Denaturation is permanent or reversible loss of 3D conformation, destroying active-site complementarity.",
      },
      {
        id: "b1-2-s2",
        title: "Structural Hierarchy & Globular vs Fibrous Proteins",
        marker: "B1.2.6 – B1.2.12 · HL ONLY",
        isHLOnly: true,
        content:
          "Hydrophobic R-groups fold inward away from water; polar R-groups face outward, making globular proteins (e.g., insulin, hemoglobin with 2α + 2β subunits and prosthetic heme) water-soluble. Fibrous collagen forms a rope-like triple helix with repeating Gly-X-Y motifs for high tensile strength.",
        analyticalTakeaway:
          "In transmembrane proteins, hydrophobic α-helices span the lipid core while hydrophilic regions face the cytosol and extracellular fluid.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b1-2-1",
        question: "Explain how a single amino acid substitution (Glu → Val) in hemoglobin causes sickle-cell anemia.",
        promptType: "explain",
        hints: ["Glu is polar/charged; Val is non-polar/hydrophobic."],
        modelAnswer:
          "Replacing hydrophilic glutamate with hydrophobic valine at position 6 of the β-globin chain creates a hydrophobic patch on the exterior of deoxygenated hemoglobin, causing tetramers to polymerize into rigid fibers that distort red blood cells.",
        keyTermsToInclude: ["hydrophilic", "hydrophobic", "tertiary/quaternary", "polymerize"],
      },
    ],
    analysis: {
      coreThesis: "R-group chemistry drives spontaneous 3D folding, directly coupling amino acid sequence to biological function.",
      theoreticalFoundations: "Anfinsen's thermodynamic hypothesis: native state represents the lowest free-energy conformation.",
      strategicEvaluation: "Conjugated proteins (hemoglobin, glycoproteins) combine polypeptide chains with non-protein prosthetic groups.",
      commonMisconceptions: ["Thinking denaturation breaks covalent peptide bonds (it only disrupts 2°, 3°, 4° non-covalent/disulfide folding)."],
      realWorldConnections: "AlphaFold2 predicts 3D tertiary structures directly from primary amino acid sequences.",
    },
    cases: [
      {
        id: "case-b1-2",
        title: "Hemoglobin Quaternary Cooperativity & Prosthetic Heme",
        domainOrContext: "Structural Biochemistry",
        biologicalMechanism: "4 polypeptide subunits + 4 Fe²⁺-heme groups exhibit allosteric cooperative O₂ binding.",
        concepts: ["molecular-specificity"],
        syllabusLink: "B1.2 (HL) / B3.1",
        quantitativeInsight: "Bohr shift lowers hemoglobin O₂ affinity when pH drops from 7.4 to 7.2.",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "R-group interactions determine exact 3D binding geometry." },
    ],
    examPromptTakeaway: "For 2° structure cite *backbone* H-bonds; for 3° structure cite *R-group* interactions (H-bonds, ionic, hydrophobic, disulfide).",
    examBlueprint: {
      paper1TrapPattern: "Confusing secondary structure H-bonds (peptide backbone) with tertiary H-bonds (R-groups).",
      paper2StructuredPrompt: "Explain how R-group interactions stabilize the tertiary structure of globular proteins. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Tertiary structure is the 3D folding of a single polypeptide stabilized by R-group interactions.",
        keyMarkSchemePoints: "1) Hydrophobic R-groups cluster in the interior away from water; hydrophilic R-groups face outside. 2) Hydrogen bonds between polar R-groups. 3) Ionic bonds between oppositely charged R-groups. 4) Covalent disulfide bridges between cysteine residues.",
        dataOrUnitsTip: "Name cysteine explicitly for disulfide bridges.",
      },
      pitfallsToAvoid: ["Omitting hydrophobic interactions in the protein core."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b2-1",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Cells",
    topicCode: "B2.1",
    displayCode: "B2.1",
    syllabusRef: "IB Biology May 2027 · B2.1 Membranes and membrane transport",
    title: "B2.1 Membranes & Transport",
    subtitle: "Fluid Mosaic Model, Passive/Active Transport, Na⁺/K⁺ Pump & Adhesion",
    level: "SL / HL",
    strategicImportance: "CORE CELL PHYSIOLOGY · HIGH-YIELD DIAGRAMS",
    readingTimeMinutes: 8,
    summary:
      "The Singer–Nicolson fluid mosaic model describes a phospholipid bilayer with integral/peripheral proteins and cholesterol. Selective permeability governs diffusion, osmosis, facilitated transport, ATP-driven pumps, and vesicle trafficking.",
    speedReadBullets: [
      "Fluid mosaic model: phospholipids move laterally; integral proteins span bilayer; peripheral proteins attach to surface.",
      "Cholesterol buffers fluidity: restricts movement at high T, prevents tight packing at low T.",
      "Passive transport (down gradient, no ATP): simple diffusion, osmosis (aquaporins), facilitated diffusion (channels/carriers).",
      "Active transport (against gradient, ATP): Na⁺/K⁺ pump (3 Na⁺ out, 2 K⁺ in); [HL] Na⁺-glucose cotransporter & CAMs.",
    ],
    primer5Min:
      "Membranes separate life from chaos. Hydrophobic fatty-acid tails block polar ions and large solutes, forcing cells to use specific protein channels and carriers. Freeze-fracture electron microscopy falsified the old Davson–Danielli protein-sandwich model by revealing transmembrane proteins embedded directly inside the hydrophobic core.",
    subSections: [
      {
        id: "b2-1-s1",
        title: "Fluid Mosaic Architecture & Fluidity",
        marker: "B2.1.1 – B2.1.6",
        content:
          "Unsaturated fatty-acid tails with *cis* double bonds increase fluidity; saturated tails decrease it. Cholesterol intercalates between phospholipids in animal membranes to stabilize fluidity across temperatures. Glycoproteins and glycolipids form the extracellular glycocalyx for cell recognition.",
        analyticalTakeaway:
          "Draw the Singer–Nicolson bilayer clearly: hydrophilic heads out, two hydrophobic tails in, transmembrane channels spanning fully, cholesterol wedged between tails.",
      },
      {
        id: "b2-1-s2",
        title: "Transport Mechanisms & Gated Channels",
        marker: "B2.1.7 – B2.1.17",
        content:
          "Simple diffusion moves small non-polar molecules ($\\text{O}_2, \\text{CO}_2$). Facilitated diffusion uses channels (aquaporins for water, voltage-gated $\\text{Na}^+/\\text{K}^+$ channels in axons). Primary active transport (Na⁺/K⁺ ATPase) hydrolyzes ATP to pump $3\\text{ Na}^+$ out and $2\\text{ K}^+$ in, driving secondary active cotransport of glucose in gut/kidney epithelia.",
        analyticalTakeaway:
          "[HL] Cell adhesion molecules (CAMs) and tight/desmosome junctions anchor tissues and prevent paracellular leakage.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b2-1-1",
        question: "How did freeze-fracture electron microscopy falsify the Davson–Danielli membrane model?",
        promptType: "explain",
        hints: ["Where did Davson–Danielli place proteins vs where freeze-fracture found them?"],
        modelAnswer:
          "Davson–Danielli proposed continuous protein layers coating the outside of a lipid bilayer. Freeze-fracture split the bilayer down its hydrophobic core and revealed globular transmembrane proteins embedded inside the interior, supporting the Singer–Nicolson fluid mosaic model.",
        keyTermsToInclude: ["Davson–Danielli", "freeze-fracture", "transmembrane proteins", "Singer–Nicolson"],
      },
    ],
    analysis: {
      coreThesis: "Selective permeability arises from a hydrophobic lipid barrier punctuated by specific protein gates, pumps, and receptors.",
      theoreticalFoundations: "Electrochemical gradients couple ATP hydrolysis to solute accumulation.",
      strategicEvaluation: "Passive vs active transport is distinguished by direction relative to the gradient and ATP requirement.",
      commonMisconceptions: ["Thinking osmosis is active transport, or that channel proteins change shape for every ion like carriers do."],
      realWorldConnections: "Cystic fibrosis results from defective CFTR chloride channel proteins in airway epithelia.",
    },
    cases: [
      {
        id: "case-b2-1",
        title: "Sodium–Glucose Cotransporter (SGLT1) in Oral Rehydration",
        domainOrContext: "Epithelial Transport Physiology",
        biologicalMechanism: "Na⁺/K⁺ pump maintains low intracellular Na⁺, powering SGLT1 symport of Na⁺ and glucose across the apical brush border.",
        concepts: ["compartmentalization", "energy-transduction"],
        syllabusLink: "B2.1 (HL) / B3.2",
        quantitativeInsight: "Stoichiometry: 2 Na⁺ : 1 glucose per cycle.",
      },
    ],
    conceptTracking: [
      { conceptId: "compartmentalization", intensity: 5, manifestation: "Bilayer maintains distinct intracellular vs extracellular ion composition." },
    ],
    examPromptTakeaway: "Always state *3 Na⁺ out, 2 K⁺ in* and *conformational change via phosphorylation* for the Na⁺/K⁺ pump.",
    examBlueprint: {
      paper1TrapPattern: "Mixing up exocytosis (vesicle fuses outward) with endocytosis (membrane invaginates inward).",
      paper2StructuredPrompt: "Explain how membrane fluidity is maintained and how the Na⁺/K⁺ pump operates. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Phospholipid tail saturation and cholesterol regulate fluidity; Na⁺/K⁺ ATPase uses ATP for active transport.",
        keyMarkSchemePoints: "1) Unsaturated cis-tails create kinks increasing fluidity. 2) Cholesterol restricts movement at high T / prevents crystallization at low T. 3) 3 Na⁺ bind inside → ATP phosphorylates pump → conformational change releases 3 Na⁺ outside → 2 K⁺ bind → dephosphorylation releases 2 K⁺ inside.",
        dataOrUnitsTip: "Include exact 3:2 stoichiometry.",
      },
      pitfallsToAvoid: ["Saying cholesterol 'makes membranes rigid' without noting its dual temperature-buffering role."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b2-2",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Cells",
    topicCode: "B2.2",
    displayCode: "B2.2",
    syllabusRef: "IB Biology May 2027 · B2.2 Organelles and compartmentalization",
    title: "B2.2 Organelles & Compartments",
    subtitle: "Nucleus, Endomembrane System, Mitochondria & Chloroplast Adaptations",
    level: "SL / HL",
    strategicImportance: "ORGANELLE STRUCTURE–FUNCTION · HL ADAPTATIONS",
    readingTimeMinutes: 6,
    summary:
      "Internal membranes compartmentalize incompatible enzymes, maintain distinct pH optima, and maximize surface area via cristae, thylakoids, and ER cisternae.",
    speedReadBullets: [
      "Compartmentalization benefits: concentrates substrates/enzymes, isolates hydrolytic enzymes (lysosomes), maintains pH/ion gradients.",
      "Nuclear envelope has double membrane with nuclear pores for mRNA export and protein/nucleotide import.",
      "[HL] Rough ER → COPII vesicles → cis-Golgi → trans-Golgi → secretory vesicles (exocytosis) or lysosomes.",
      "[HL] Mitochondria (folded cristae, small intermembrane space for H⁺) & Chloroplasts (thylakoid stacks/grana, stroma).",
    ],
    primer5Min:
      "Eukaryotic cells act like biochemical cities with specialized factories. Lysosomes keep digestive hydrolases at pH 4.5–5.0 so they don't digest the neutral cytosol. In HL, trace how structure optimizes function: mitochondrial cristae maximize surface area for ETC complexes, while the tiny intermembrane space allows rapid buildup of a steep proton gradient.",
    subSections: [
      {
        id: "b2-2-s1",
        title: "Advantages of Compartmentalization & Nucleus",
        marker: "B2.2.1 – B2.2.3",
        content:
          "Separating transcription (nucleus) from translation (cytosol) enables eukaryotic pre-mRNA splicing and quality control before ribosomes translate mRNA. Free ribosomes synthesize cytosolic proteins; rER-bound ribosomes synthesize secretory, lysosomal, and membrane proteins.",
        analyticalTakeaway:
          "Link nuclear pore transport to post-transcriptional separation in eukaryotes vs coupled transcription-translation in prokaryotes.",
      },
      {
        id: "b2-2-s2",
        title: "Mitochondria, Chloroplasts, rER & Golgi Adaptations",
        marker: "B2.2.4 – B2.2.6 · HL ONLY",
        isHLOnly: true,
        content:
          "rER flattened cisternae maximize ribosome docking; Golgi stacks modify (glycosylate) and sort proteins into clathrin- or COP-coated vesicles. Mitochondria feature cristae (high SA for ATP synthase) and a small intermembrane space; chloroplasts feature thylakoids (small lumen for rapid H⁺ accumulation) and stroma rich in RuBisCO.",
        analyticalTakeaway:
          "Always tie *small internal volume* (thylakoid lumen / mitochondrial intermembrane space) to *rapid proton-gradient establishment*.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b2-2-1",
        question: "Explain two structural adaptations of a mitochondrion that maximize ATP synthesis.",
        promptType: "explain",
        hints: ["Focus on cristae surface area and intermembrane space volume."],
        modelAnswer:
          "1) Folded inner membrane (cristae) increases surface area to hold many electron transport chains and ATP synthase complexes. 2) The narrow intermembrane space has a small volume so pumping relatively few H⁺ ions rapidly builds a steep electrochemical proton gradient.",
        keyTermsToInclude: ["cristae", "surface area", "intermembrane space", "proton gradient"],
      },
    ],
    analysis: {
      coreThesis: "Membrane folding and micro-volume compartments accelerate chemiosmotic and secretory flux.",
      theoreticalFoundations: "Endomembrane trafficking + endosymbiotic bioenergetics.",
      strategicEvaluation: "Clathrin-coated vesicles mediate receptor-mediated endocytosis and Golgi-to-lysosome sorting.",
      commonMisconceptions: ["Thinking the Golgi apparatus synthesizes proteins (it modifies, packages, and sorts proteins made on rER)."],
      realWorldConnections: "Lysosomal storage diseases (e.g., Tay–Sachs) occur when a single compartmentalized hydrolase is defective.",
    },
    cases: [
      {
        id: "case-b2-2",
        title: "Pancreatic Acinar Cell Secretory Pathway",
        domainOrContext: "Cell Ultrastructure",
        biologicalMechanism: "Dense rER → Golgi → zymogen granules release digestive enzymes via regulated exocytosis.",
        concepts: ["compartmentalization"],
        syllabusLink: "B2.2 (HL)",
        quantitativeInsight: "Exocrine acinar cells dedicate >50% of cytoplasmic volume to rER and secretory vesicles.",
      },
    ],
    conceptTracking: [
      { conceptId: "compartmentalization", intensity: 5, manifestation: "Every organelle is a dedicated chemical microenvironment." },
    ],
    examPromptTakeaway: "In organelle-adaptation questions, pair *structure* (e.g. cristae folds) directly with *biochemical consequence* (more ETC/ATP synthase).",
    examBlueprint: {
      paper1TrapPattern: "Confusing smooth ER (lipid synthesis/detox) with rough ER (protein synthesis for secretion).",
      paper2StructuredPrompt: "Explain the advantages of compartmentalization in eukaryotic cells. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Membrane-bound organelles create isolated microenvironments.",
        keyMarkSchemePoints: "1) Enzymes and substrates are concentrated, increasing reaction rates. 2) Incompatible reactions (e.g. hydrolysis vs synthesis) are separated. 3) Optimal pH is maintained (e.g. acidic lysosomes). 4) Steep ion/H⁺ gradients can be maintained across membranes.",
        dataOrUnitsTip: "Give a named organelle example for each point.",
      },
      pitfallsToAvoid: ["Giving generic answers without naming specific organelles or pH/gradient effects."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b2-3",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Cells",
    topicCode: "B2.3",
    displayCode: "B2.3",
    syllabusRef: "IB Biology May 2027 · B2.3 Cell specialization",
    title: "B2.3 Cell Specialization",
    subtitle: "Stem Cell Niches, Differentiation, SA:V Ratio & Specialized Cell Types",
    level: "SL / HL",
    strategicImportance: "STEM CELLS & MORPHOGENESIS · CORE SL/HL",
    readingTimeMinutes: 6,
    summary:
      "Differential gene expression transforms unspecialized stem cells into specialized tissues (type I/II pneumocytes, striated muscle, gametes, RBCs) while surface-area-to-volume limits cell size.",
    speedReadBullets: [
      "Differentiation occurs via selective gene activation/repression (all somatic cells share the same genome).",
      "Stem cell potency: totipotent (zygote + placenta), pluripotent (embryonic ICM), multipotent (bone marrow HSCs).",
      "As cell radius $r$ increases, volume ($r^3$) outpaces surface area ($r^2$), lowering SA:V ratio and limiting diffusion.",
      "Specialized examples: type I vs II pneumocytes, cardiac vs striated muscle, sperm vs egg, xylem/phloem.",
    ],
    primer5Min:
      "Every cell in your body carries the same DNA, yet a neuron looks nothing like a red blood cell. Morphogen gradients trigger transcription factors that switch on tissue-specific genes while silencing others. Meanwhile, physical geometry constrains cell size: once a cell grows too large, its plasma membrane cannot import nutrients or export CO₂ fast enough to supply its metabolic volume—driving multicellularity and membrane folding.",
    subSections: [
      {
        id: "b2-3-s1",
        title: "Stem Cells, Potency & Niches",
        marker: "B2.3.1 – B2.3.4",
        content:
          "Stem cells can self-renew indefinitely and differentiate along multiple lineages. Adult stem cell niches (bone marrow, hair follicles, intestinal crypts) maintain tissue homeostasis. Therapeutic uses include Stargardt's macular dystrophy and leukemia bone marrow transplants.",
        analyticalTakeaway:
          "Contrast embryonic stem cells (pluripotent, high tumour/teratoma risk, ethical debate) with adult/iPSCs (multipotent or reprogrammed, patient-matched).",
      },
      {
        id: "b2-3-s2",
        title: "SA:V Constraints & Specialized Cell Adaptations",
        marker: "B2.3.5 – B2.3.10",
        content:
          "For a cube of side $L$, $\\text{SA}:\\text{V} = 6/L$, shrinking as $L$ increases. Cells overcome this via flattening (type I pneumocytes, biconcave RBCs), microvilli (proximal tubule/ileum), or elongation (axons). Type II pneumocytes secrete pulmonary surfactant to reduce alveolar surface tension.",
        analyticalTakeaway:
          "Compare sperm (flagellum, acrosome, midpiece mitochondria, haploid) vs egg (large nutrient-rich cytoplasm, zona pellucida, cortical granules).",
        keyFormulaOrFramework: "\\frac{\\text{SA}}{\\text{V}}_{\\text{sphere}} = \\frac{3}{r}",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b2-3-1",
        question: "Explain why a small spherical cell exchanges heat and nutrients more efficiently per unit volume than a large spherical cell.",
        promptType: "explain",
        hints: ["Compare r² (surface area) vs r³ (volume)."],
        modelAnswer:
          "Surface area scales with r² while volume scales with r³, so SA:V = 3/r decreases as radius increases. A smaller cell has a higher SA:V ratio, providing more membrane area per unit cytoplasmic volume and shorter diffusion distances.",
        keyTermsToInclude: ["SA:V ratio", "3/r", "diffusion distance", "metabolic rate"],
      },
    ],
    analysis: {
      coreThesis: "Differential gene expression generates specialized cellular geometry to beat physical SA:V diffusion limits.",
      theoreticalFoundations: "Fick's law of diffusion + morphogen-driven transcriptional cascades.",
      strategicEvaluation: "Induced pluripotent stem cells (iPSCs) bypass embryonic ethical concerns by reprogramming adult fibroblasts.",
      commonMisconceptions: ["Thinking differentiated cells lose the genes they don't use (they retain the full genome, except mature mammalian RBCs)."],
      realWorldConnections: "Premature infants lacking type II pneumocyte surfactant develop neonatal respiratory distress syndrome.",
    },
    cases: [
      {
        id: "case-b2-3",
        title: "Type I vs Type II Alveolar Pneumocytes",
        domainOrContext: "Respiratory Cell Specialization",
        biologicalMechanism: "Extremely thin type I cells minimize diffusion distance; cuboidal type II cells with lamellar bodies secrete surfactant.",
        concepts: ["compartmentalization", "molecular-specificity"],
        syllabusLink: "B2.3 / B3.1",
        quantitativeInsight: "Type I pneumocyte thickness ≈ 0.1–0.2 µm.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 4, manifestation: "Differential gene expression drives differentiation." },
    ],
    examPromptTakeaway: "Whenever SA:V appears, explicitly link *surface area = exchange rate* and *volume = metabolic demand*.",
    examBlueprint: {
      paper1TrapPattern: "Confusing pluripotent (cannot form placenta) with totipotent (zygote/early blastomere, can form whole organism + placenta).",
      paper2StructuredPrompt: "Distinguish between type I and type II pneumocytes and explain how SA:V limits cell size. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Cell shape optimizes exchange; larger cells have lower SA:V.",
        keyMarkSchemePoints: "1) Type I: squamous/flat for short gas diffusion distance. 2) Type II: cuboidal, secrete surfactant to prevent alveolar collapse. 3) As volume (r³) grows faster than SA (r²), diffusion cannot meet metabolic demand.",
        dataOrUnitsTip: "Write SA:V = 3/r or 6/L.",
      },
      pitfallsToAvoid: ["Saying type I cells secrete surfactant."],
    },
    primaryFormulas: ["\\frac{\\text{SA}}{\\text{V}} = \\frac{3}{r}"],
  },
  {
    id: "bio-b3-1",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Organisms",
    topicCode: "B3.1",
    displayCode: "B3.1",
    syllabusRef: "IB Biology May 2027 · B3.1 Gas exchange",
    title: "B3.1 Gas Exchange",
    subtitle: "Ventilation Mechanics, Alveoli, Leaf Stomata & Hemoglobin Dissociation [HL]",
    level: "SL / HL",
    strategicImportance: "PHYSIOLOGY & BOhr SHIFT · HIGH-YIELD GRAPHS",
    readingTimeMinutes: 7,
    summary:
      "Gas exchange surfaces require large surface area, thin barriers, moisture, and steep concentration gradients maintained by ventilation (mammalian diaphragm/intercostals) or stomatal transpiration.",
    speedReadBullets: [
      "Inhalation: diaphragm contracts (flattens), external intercostals pull ribs up/out → thoracic volume ↑, pressure ↓ → air enters.",
      "Exhalation (quiet): diaphragm relaxes, internal intercostals (forced) pull ribs down/in → volume ↓, pressure ↑.",
      "Plant leaves: spongy mesophyll air spaces + guard cells open/close stomata via K⁺-driven turgor changes.",
      "[HL] Hemoglobin O₂ dissociation curve (sigmoidal cooperativity), Bohr shift (high CO₂/low pH → right shift), fetal Hb (left shift).",
    ],
    primer5Min:
      "Diffusion is fast only over micrometres, so multicellular organisms evolved ventilated gas-exchange surfaces. In mammals, Boyle's law ($P \\propto 1/V$) drives air into ~300 million alveoli. At HL, hemoglobin's sigmoidal dissociation curve reflects cooperative O₂ binding, while metabolically active tissues release CO₂ that lowers blood pH (Bohr effect), shifting the curve right to unload more O₂ exactly where it is needed.",
    subSections: [
      {
        id: "b3-1-s1",
        title: "Mammalian Ventilation & Leaf Gas Exchange",
        marker: "B3.1.1 – B3.1.6",
        content:
          "Antagonistic muscle pairs (external vs internal intercostals; diaphragm vs abdominal muscles) alter thoracic volume. Spirometry measures tidal volume, vital capacity, and ventilation rate. In leaves, waxy cuticle prevents water loss while guard cells regulate stomatal aperture.",
        analyticalTakeaway:
          "Never say the lungs 'suck air in'—muscles increase thoracic volume, dropping alveolar pressure below atmospheric pressure.",
      },
      {
        id: "b3-1-s2",
        title: "Hemoglobin Cooperativity, Bohr Shift & Fetal Hb",
        marker: "B3.1.7 – B3.1.10 · HL ONLY",
        isHLOnly: true,
        content:
          "Binding of the first $\\text{O}_2$ to one heme triggers a conformational shift increasing affinity of the remaining 3 subunits (sigmoidal curve). Respiring tissues produce $\\text{CO}_2$, which forms $\\text{H}_2\\text{CO}_3 \\rightarrow \\text{H}^+ + \\text{HCO}_3^-$; $\\text{H}^+$ stabilizes deoxyhemoglobin (Bohr shift right), unloading $\\text{O}_2$. Fetal hemoglobin (2α + 2γ) has higher $\\text{O}_2$ affinity (left shift) to extract $\\text{O}_2$ across the placenta.",
        analyticalTakeaway:
          "Left shift = higher affinity (fetal Hb, myoglobin); Right shift = lower affinity / more O₂ unloaded (high CO₂, low pH, high temp).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b3-1-1",
        question: "[HL] Explain the physiological advantage of the Bohr shift during intense skeletal muscle exercise.",
        promptType: "explain",
        hints: ["Respiring muscle produces CO₂ and lactic acid → pH drops."],
        modelAnswer:
          "Active muscles respire rapidly, releasing CO₂ (which forms carbonic acid) and lactic acid, lowering blood pH. This shifts the hemoglobin dissociation curve to the right (Bohr effect), decreasing hemoglobin's O₂ affinity so more O₂ is unloaded to support aerobic respiration in the muscle.",
        keyTermsToInclude: ["CO2", "pH drops", "right shift", "reduced affinity", "unloading"],
      },
    ],
    analysis: {
      coreThesis: "Bulk flow (ventilation + circulation) maintains steep partial-pressure gradients across thin, moist exchange membranes.",
      theoreticalFoundations: "Boyle's law ($P_1V_1 = P_2V_2$) and allosteric protein cooperativity.",
      strategicEvaluation: "Myoglobin has a hyperbolic curve (no cooperativity, 1 heme) and acts as an emergency O₂ store in muscle.",
      commonMisconceptions: ["Thinking fetal hemoglobin *takes* O₂ directly from maternal blood cells without diffusion across the placental barrier."],
      realWorldConnections: "High-altitude acclimatization increases 2,3-BPG and erythropoietin (EPO) production.",
    },
    cases: [
      {
        id: "case-b3-1",
        title: "Fetal vs Maternal Hemoglobin Across the Placenta",
        domainOrContext: "Developmental Respiratory Physiology",
        biologicalMechanism: "Fetal HbF (α₂γ₂) binds O₂ more tightly than adult HbA (α₂β₂) at identical placental pO₂.",
        concepts: ["molecular-specificity", "homeostatic-feedback"],
        syllabusLink: "B3.1 (HL)",
        quantitativeInsight: "At $p\\text{O}_2 = 3.5\\text{ kPa}$, HbF is ~70% saturated vs ~50% for HbA.",
      },
    ],
    conceptTracking: [
      { conceptId: "molecular-specificity", intensity: 5, manifestation: "Allosteric conformational shift in Hb tetramer." },
    ],
    examPromptTakeaway: "Trace ventilation step-by-step: Muscle contraction → Thoracic volume ↑ → Alveolar pressure ↓ (< atm) → Air flows in.",
    examBlueprint: {
      paper1TrapPattern: "Saying external intercostals contract during *exhalation* (they relax during quiet exhalation).",
      paper2StructuredPrompt: "Explain the mechanism of inhalation in humans. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Air moves down a pressure gradient created by increasing thoracic volume.",
        keyMarkSchemePoints: "1) Diaphragm contracts and flattens. 2) External intercostal muscles contract, pulling ribcage up and out. 3) Thoracic cavity and lung volume increase. 4) Alveolar pressure drops below atmospheric pressure, so air enters.",
        dataOrUnitsTip: "Mention Boyle's law / pressure-volume inverse relationship.",
      },
      pitfallsToAvoid: ["Omitting the pressure drop below atmospheric pressure."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b3-2",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Organisms",
    topicCode: "B3.2",
    displayCode: "B3.2",
    syllabusRef: "IB Biology May 2027 · B3.2 Transport",
    title: "B3.2 Transport",
    subtitle: "Blood Vessels, Cardiac Cycle [HL], Xylem Transpiration & Phloem Translocation [HL]",
    level: "SL / HL",
    strategicImportance: "CIRCULATION & PLANT VASCULARITY · CORE + HL",
    readingTimeMinutes: 8,
    summary:
      "Closed double circulation matches vessel walls to pressure; the myogenic heart coordinates chambers via SA/AV nodes. In plants, xylem pulls water under negative tension while phloem actively translocates sucrose via pressure-flow.",
    speedReadBullets: [
      "Arteries (thick elastic/muscle walls, narrow lumen), capillaries (1-cell-thick endothelium, fenestrations), veins (valves, wide lumen).",
      "[HL] Double circulation (pulmonary + systemic) & cardiac cycle pressure graphs (atrial systole, ventricular systole, diastole).",
      "Xylem: dead lignified vessels transport water/minerals upward via transpiration-cohesion-tension.",
      "[HL] Phloem: living sieve tube elements + companion cells actively load sucrose (H⁺ cotransport), generating hydrostatic pressure flow.",
    ],
    primer5Min:
      "Animals pump blood under positive pressure; plants pull water under negative tension. Arteries recoil with elastin to smooth systolic surges, while capillaries slow flow for tissue-fluid exchange. In plants, leaf evaporation creates tension pulling H-bonded water up dead xylem, whereas living phloem actively loads sucrose at sources (leaves) so osmosis drives bulk flow to sinks (roots/fruits).",
    subSections: [
      {
        id: "b3-2-s1",
        title: "Capillary Exchange, Arteries/Veins & Coronary Disease",
        marker: "B3.2.1 – B3.2.6",
        content:
          "Arterial hydrostatic pressure forces plasma (minus large plasma proteins) out at the arteriolar end to form tissue fluid; oncotic pressure from retained albumin draws fluid back at the venular end (excess drains to lymphatics). Atherosclerosis plaques narrow coronary arteries, risking myocardial infarction.",
        analyticalTakeaway:
          "Always distinguish *elastic recoil* (passive, smooths pressure) from *smooth muscle contraction* (vasoconstriction/dilation).",
      },
      {
        id: "b3-2-s2",
        title: "Cardiac Cycle, Xylem & Phloem Translocation",
        marker: "B3.2.7 – B3.2.18 · HL",
        content:
          "The sinoatrial (SA) node initiates depolarization across atria; the AV node delays 0.1 s so ventricles fill before Purkinje fibers trigger ventricular systole from the apex upward. [HL] In phloem, companion cells use H⁺-ATPase and H⁺-sucrose symporters to load sucrose into sieve tubes, lowering $\\Psi_s$ and drawing water from xylem to push sap toward sinks.",
        analyticalTakeaway:
          "Aphid stylet + $^{14}\\text{CO}_2$ autoradiography provided direct experimental evidence for phloem translocation rates.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b3-2-1",
        question: "[HL] Explain how sucrose moves from source to sink in phloem sieve tubes.",
        promptType: "explain",
        hints: ["Include active loading at source, osmosis from xylem, and unloading at sink."],
        modelAnswer:
          "Companion cells actively pump H⁺ out using ATP, driving H⁺-sucrose cotransport into sieve tube elements. High sucrose lowers water potential (Ψ_s), drawing water from adjacent xylem by osmosis and raising hydrostatic pressure. At the sink, sucrose is unloaded (and respired or stored as starch), lowering pressure and driving bulk mass flow from source to sink.",
        keyTermsToInclude: ["companion cells", "active transport", "water potential", "osmosis", "hydrostatic pressure"],
      },
    ],
    analysis: {
      coreThesis: "Vascular transport couples structural specialization (lignin, elastin, valves, companion cells) to pressure gradients.",
      theoreticalFoundations: "Poiseuille's resistance + pressure-flow (Münch) hypothesis.",
      strategicEvaluation: "Xylem transport is passive (solar-driven evaporation); phloem transport requires metabolic ATP for loading.",
      commonMisconceptions: ["Thinking phloem sap only flows downward (it flows from any source to any sink, up or down)."],
      realWorldConnections: "Potometers measure transpiration rates across temperature, humidity, wind, and light.",
    },
    cases: [
      {
        id: "case-b3-2",
        title: "Wiggers Diagram: Cardiac Valve Sounds & Pressure Crossovers",
        domainOrContext: "Cardiovascular Physiology",
        biologicalMechanism: "First heart sound ('lub') = AV valves snap shut when ventricular pressure > atrial pressure; 'dub' = semilunar valves close.",
        concepts: ["homeostatic-feedback"],
        syllabusLink: "B3.2 (HL)",
        quantitativeInsight: "Left ventricular systole peaks at ~120 mmHg vs ~25 mmHg in right ventricle.",
      },
    ],
    conceptTracking: [
      { conceptId: "energy-transduction", intensity: 4, manifestation: "ATP powers phloem loading and cardiac muscle contraction." },
    ],
    examPromptTakeaway: "On cardiac cycle graphs, valves open/close *passive to pressure differences*—always cite which chamber pressure exceeds which.",
    examBlueprint: {
      paper1TrapPattern: "Thinking the semilunar valves close during ventricular *systole* (they open in systole, close at start of diastole).",
      paper2StructuredPrompt: "Explain how water is transported from roots to leaves in xylem vessels. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Transpiration-cohesion-tension mechanism.",
        keyMarkSchemePoints: "1) Evaporation from spongy mesophyll cell walls lowers water potential in leaf. 2) Adhesion to hydrophilic cellulose walls + cohesion (H-bonds) between water molecules pulls continuous water column up. 3) Negative pressure (tension) draws water in from root cortex.",
        dataOrUnitsTip: "Mention lignified walls preventing vessel collapse under negative pressure.",
      },
      pitfallsToAvoid: ["Saying water is 'pumped' up xylem by roots."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b3-3",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Organisms",
    topicCode: "B3.3",
    displayCode: "B3.3",
    syllabusRef: "IB Biology May 2027 · B3.3 Muscle and motility [HL]",
    title: "B3.3 Muscle & Motility",
    subtitle: "Sarcomere Ultrastructure, Sliding Filament Theory & Titin [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · SARCOMERE & ATP-CA²⁺ COUPLING",
    readingTimeMinutes: 7,
    summary:
      "Skeletal muscle fibers contract when motor-neuron action potentials trigger Ca²⁺ release from the sarcoplasmic reticulum, exposing myosin-binding sites on actin so ATP-driven cross-bridge cycling shortens the sarcomere.",
    speedReadBullets: [
      "Sarcomere spans Z-line to Z-line: thin actin filaments (with tropomyosin & troponin) + thick myosin filaments.",
      "During contraction: A-band (myosin length) stays constant; I-band and H-zone shorten.",
      "Ca²⁺ binds troponin → shifts tropomyosin → exposes actin binding sites → myosin cross-bridge + power stroke.",
      "ATP is required both to cock the myosin head AND to detach myosin from actin (absence = rigor mortis); titin acts as a molecular spring.",
    ],
    primer5Min:
      "Motility converts chemical ATP energy into mechanical work. In striated muscle (HL Only), repeating sarcomeres align actin and myosin in overlapping lattices. Calcium ions act as the molecular switch: without Ca²⁺, tropomyosin physically blocks actin's binding sites. When Ca²⁺ binds troponin, myosin heads walk along actin via ATP hydrolysis, while giant elastic **titin** filaments center myosin and prevent overstretching.",
    subSections: [
      {
        id: "b3-3-s1",
        title: "Sarcomere Bands, Titin & Antagonistic Muscles",
        marker: "B3.3.1 – B3.3.5 · HL ONLY",
        isHLOnly: true,
        content:
          "Muscles can only pull, never push, requiring antagonistic pairs across synovial joints (e.g., biceps/triceps, internal/external intercostals). In a sarcomere, the dark **A-band** equals myosin length (constant), while the light **I-band** (actin only) and **H-zone** (myosin only) narrow as Z-lines approach each other.",
        analyticalTakeaway:
          "Titin anchors myosin to the Z-line, providing passive elasticity and recoil.",
      },
      {
        id: "b3-3-s2",
        title: "Sliding Filament Cross-Bridge Cycle",
        marker: "B3.3.6 – B3.3.9 · HL ONLY",
        isHLOnly: true,
        content:
          "1) Action potential along T-tubules opens sarcoplasmic reticulum $\\text{Ca}^{2+}$ channels. 2) $\\text{Ca}^{2+}$ binds troponin, shifting tropomyosin. 3) Myosin-ADP-Pi head binds actin, releasing Pi/ADP during the power stroke. 4) Fresh ATP binds myosin to detach it, and ATP hydrolysis re-cocks the head.",
        analyticalTakeaway:
          "Memorize the dual role of ATP: *detachment* of myosin + *re-cocking* (hydrolysis) for the next stroke.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b3-3-1",
        question: "[HL] Which sarcomere bands shorten during contraction, and why does the A-band remain unchanged?",
        promptType: "explain",
        hints: ["Actin and myosin filaments themselves do not shorten—they slide past each other."],
        modelAnswer:
          "The I-band and H-zone shorten as thin actin filaments slide inward over thick myosin filaments, pulling Z-lines closer. The A-band represents the full length of the thick myosin filaments, which do not change length.",
        keyTermsToInclude: ["I-band", "H-zone", "A-band", "Z-lines", "slide"],
      },
    ],
    analysis: {
      coreThesis: "Calcium-gated exposure of actin allows cyclical ATP-driven myosin ratcheting.",
      theoreticalFoundations: "Huxley sliding filament model + conformational mechanochemistry.",
      strategicEvaluation: "Synovial joints combine cartilage (low friction), synovial fluid (lubrication), and ligaments (bone-to-bone stability).",
      commonMisconceptions: ["Saying ATP is used to *attach* myosin to actin (ATP binding *detaches* myosin)."],
      realWorldConnections: "Rigor mortis occurs post-mortem because ATP depletion locks myosin heads onto actin.",
    },
    cases: [
      {
        id: "case-b3-3",
        title: "Titin Mutations & Cardiomyopathy",
        domainOrContext: "Muscle Biomechanics",
        biologicalMechanism: "Truncating mutations in *TTN* (largest known human protein) impair passive sarcomeric tension in cardiac muscle.",
        concepts: ["molecular-specificity", "energy-transduction"],
        syllabusLink: "B3.3 (HL)",
        quantitativeInsight: "Titin spans >1 µm from Z-line to M-line (~34,000 amino acids).",
      },
    ],
    conceptTracking: [
      { conceptId: "energy-transduction", intensity: 5, manifestation: "ATP hydrolysis drives mechanical power stroke." },
    ],
    examPromptTakeaway: "Always name *troponin* (binds Ca²⁺) and *tropomyosin* (blocks/unblocks actin binding sites) in the exact sequence.",
    examBlueprint: {
      paper1TrapPattern: "Claiming the A-band shortens during contraction.",
      paper2StructuredPrompt: "Explain the roles of Ca²⁺ and ATP in skeletal muscle contraction. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Ca²⁺ regulates binding-site exposure; ATP powers cross-bridge detachment and cocking.",
        keyMarkSchemePoints: "1) Ca²⁺ released from sarcoplasmic reticulum binds troponin. 2) Tropomyosin shifts, exposing myosin-binding sites on actin. 3) Myosin forms cross-bridge and performs power stroke (releasing ADP+Pi). 4) ATP binds myosin to break cross-bridge. 5) ATP hydrolysis re-cocks myosin head.",
        dataOrUnitsTip: "Mention active pumping of Ca²⁺ back into SR for relaxation.",
      },
      pitfallsToAvoid: ["Saying Ca²⁺ binds directly to tropomyosin or actin."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b4-1",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Ecosystems",
    topicCode: "B4.1",
    displayCode: "B4.1",
    syllabusRef: "IB Biology May 2027 · B4.1 Adaptation to environment",
    title: "B4.1 Adaptation to Environment",
    subtitle: "Abiotic Limiting Factors, Tolerance Ranges, Coral Reefs & Biomes",
    level: "SL / HL",
    strategicImportance: "ECOLOGICAL BIOGEOGRAPHY · DATA ANALYSIS",
    readingTimeMinutes: 6,
    summary:
      "Species distributions reflect abiotic tolerance limits (temperature, water, light, pH, salinity) and biotic adaptations—exemplified by mangrove halophytes, marram grass xerophytes, and coral reef symbiosis.",
    speedReadBullets: [
      "Habitat = place where an organism lives; adaptations are heritable traits aiding survival/reproduction.",
      "Abiotic tolerance curves define optimum, zones of stress, and zones of intolerance (Shelford's law).",
      "Coral reefs require narrow abiotic ranges: 23–29 °C, shallow euphotic light, 32–42 ppt salinity, low turbidity, pH > 8.",
      "Climate variables (mean annual temperature & precipitation) predict terrestrial biome distribution (Whittaker climograph).",
    ],
    primer5Min:
      "Where can a species live? Every organism occupies an abiotic envelope defined by temperature, moisture, light, and chemistry. Plants adapt to arid dunes (marram grass: rolled leaves, sunken stomata, thick cuticle) or saline estuaries (red mangroves: salt-excluding roots, pneumatophores), while global temperature and rainfall patterns sort terrestrial ecosystems into predictable biomes.",
    subSections: [
      {
        id: "b4-1-s1",
        title: "Abiotic Limits, Shelford's Law & Plant Adaptations",
        marker: "B4.1.1 – B4.1.5",
        content:
          "Transects quantify how species abundance shifts along abiotic gradients (e.g., sand dune succession or rocky-shore zonation). Xerophytes minimize transpiration; hydrophytes (water lilies) have aerenchyma for buoyancy and O₂ diffusion; halophytes excrete or compartmentalize Na⁺/Cl⁻.",
        analyticalTakeaway:
          "Explain *why* each xerophytic trait reduces transpiration (e.g., rolled leaves trap humid air, reducing the water-vapour concentration gradient).",
      },
      {
        id: "b4-1-s2",
        title: "Coral Reefs & Terrestrial Biomes",
        marker: "B4.1.6 – B4.1.8",
        content:
          "Reef-building corals rely on mutualistic *Symbiodinium* (zooxanthellae) for up to 90% of their carbon, restricting reefs to warm, clear, shallow tropical waters. Terrestrial biomes (tropical rainforest, temperate forest, taiga, tundra, desert, savanna) map onto temperature–precipitation axes.",
        analyticalTakeaway:
          "Convergent evolution produces similar succulent/cacti morphologies in unrelated desert plants across continents.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b4-1-1",
        question: "Explain why reef-building corals are restricted to shallow, clear tropical waters.",
        promptType: "explain",
        hints: ["Think of zooxanthellae photosynthesis and calcium carbonate precipitation."],
        modelAnswer:
          "Corals depend on photosynthetic zooxanthellae inside their endoderm, requiring high light penetration (shallow, low turbidity water). They also require warm temperatures (23–29 °C) and alkaline pH for enzymes and aragonite (CaCO₃) skeleton deposition.",
        keyTermsToInclude: ["zooxanthellae", "photosynthesis", "light penetration", "temperature", "CaCO3"],
      },
    ],
    analysis: {
      coreThesis: "Abiotic tolerance boundaries and convergent structural adaptations govern global species and biome distributions.",
      theoreticalFoundations: "Shelford's law of tolerance & Whittaker biome classification.",
      strategicEvaluation: "Distinguish *acclimation* (plasticity within a lifetime) from *adaptation* (heritable across generations).",
      commonMisconceptions: ["Assuming desert biomes are defined solely by high heat (cold deserts exist; low precipitation is the defining factor)."],
      realWorldConnections: "Line transects and belt transects in IB Biology IA fieldwork.",
    },
    cases: [
      {
        id: "case-b4-1",
        title: "Ammophila arenaria (Marram Grass) on Coastal Dunes",
        domainOrContext: "Xerophytic Adaptation",
        biologicalMechanism: "Inrolled leaves, hinge cells, trichomes, and sunken stomata create a humid microclimate.",
        concepts: ["evolutionary-adaptation", "ecological-interdependence"],
        syllabusLink: "B4.1",
        quantitativeInsight: "Reduces stomatal conductance by >60% in high wind.",
      },
    ],
    conceptTracking: [
      { conceptId: "evolutionary-adaptation", intensity: 4, manifestation: "Convergent adaptations to arid and saline stress." },
    ],
    examPromptTakeaway: "Always connect an anatomical feature (e.g. sunken stomata) to the *physical diffusion gradient* it alters.",
    examBlueprint: {
      paper1TrapPattern: "Confusing belt transect (area/abundance) with line transect (presence/absence along a line).",
      paper2StructuredPrompt: "Explain how two named plant adaptations reduce water loss in arid environments. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Transpiration rate depends on the water-vapour concentration gradient and boundary layer.",
        keyMarkSchemePoints: "1) Thick waxy cuticle reduces cuticular evaporation. 2) Sunken stomata / rolled leaves / trichomes trap still, humid air, reducing the water-vapour gradient out of the leaf.",
        dataOrUnitsTip: "Name a specific xerophyte such as *Ammophila* or *Opuntia*.",
      },
      pitfallsToAvoid: ["Saying 'thick cuticle stops water entering'."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-b4-2",
    themeId: "theme-b",
    themeNumber: 2,
    orgLevel: "Ecosystems",
    topicCode: "B4.2",
    displayCode: "B4.2",
    syllabusRef: "IB Biology May 2027 · B4.2 Ecological niches",
    title: "B4.2 Ecological Niches",
    subtitle: "Fundamental vs Realized Niche, Competitive Exclusion & Nutrition Modes",
    level: "SL / HL",
    strategicImportance: "NICHE THEORY & NUTRITION · CORE SL/HL",
    readingTimeMinutes: 6,
    summary:
      "An ecological niche encompasses a species' abiotic tolerances and biotic role. Competitive exclusion prevents two species from occupying identical realized niches, driving resource partitioning.",
    speedReadBullets: [
      "Fundamental niche = full potential range without competitors/predators; Realized niche = actual range under biotic interactions.",
      "Gause's competitive exclusion principle: complete competitors cannot coexist indefinitely.",
      "Nutrition modes: obligate/facultative anaerobes vs aerobes; autotrophs (photo/chemo) vs heterotrophs (holozoic, saprotrophic, parasitic).",
      "Mixotrophs (e.g., *Euglena*) combine photosynthesis and heterotrophic phagocytosis depending on light/nutrient availability.",
    ],
    primer5Min:
      "A habitat is an organism's address; its niche is its profession. Classic intertidal barnacle experiments (Connell) showed *Chthamalus* can survive low-tide zones physiologically (fundamental niche) but is evicted by faster-growing *Balanus* (realized niche). Across kingdoms, organisms diversify their nutritional niches—from saprotrophic fungi secreting extracellular enzymes to mixotrophic protists.",
    subSections: [
      {
        id: "b4-2-s1",
        title: "Fundamental vs Realized Niche & Resource Partitioning",
        marker: "B4.2.1 – B4.2.5",
        content:
          "When two species compete for the same limiting resource, either one is excluded (Gause's *Paramecium* experiment) or natural selection favors **resource partitioning** (character displacement, e.g., warblers foraging at different canopy heights).",
        analyticalTakeaway:
          "Realized niche is always a subset of (or equal to) the fundamental niche.",
      },
      {
        id: "b4-2-s2",
        title: "Diversity of Nutrition & Dentition/Mouthparts",
        marker: "B4.2.6 – B4.2.10",
        content:
          "Saprotrophs digest dead organic matter externally; detritivores ingest it internally; holozoic consumers ingest and digest inside a gut. Hominid and mammal dentition (sharp carnassials vs flat grinding molars) reflects dietary niches.",
        analyticalTakeaway:
          "Contrast *holozoic* (internal digestion) with *saprotrophic* (external enzyme secretion + absorption).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-b4-2-1",
        question: "Distinguish between a fundamental niche and a realized niche using Connell's barnacle study.",
        promptType: "explain",
        hints: ["*Chthamalus* vs *Balanus* on the rocky shore."],
        modelAnswer:
          "The fundamental niche is the full range of conditions a species can theoretically occupy without biotic constraints (*Chthamalus* can survive both upper and lower intertidal zones when *Balanus* is removed). The realized niche is the narrower range actually occupied due to competition and predation (*Chthamalus* is restricted to the upper shore by *Balanus*).",
        keyTermsToInclude: ["fundamental niche", "realized niche", "competition", "Chthamalus", "Balanus"],
      },
    ],
    analysis: {
      coreThesis: "Interspecific competition compresses fundamental niches into realized niches, driving evolutionary specialization.",
      theoreticalFoundations: "Hutchinson's n-dimensional hypervolume niche & Gause's competitive exclusion.",
      strategicEvaluation: "Resource partitioning reduces niche overlap so similar species coexist stably.",
      commonMisconceptions: ["Confusing saprotrophs (fungi/bacteria absorbing externally digested monomers) with detritivores (earthworms ingesting detritus)."],
      realWorldConnections: "Invasive grey squirrels outcompeting native red squirrels in the UK via niche overlap.",
    },
    cases: [
      {
        id: "case-b4-2",
        title: "Connell's Intertidal Barnacle Removal Experiment",
        domainOrContext: "Community Ecology",
        biologicalMechanism: "Removing *Balanus* allowed *Chthamalus* to expand downward, proving competition—not desiccation—set its lower limit.",
        concepts: ["ecological-interdependence"],
        syllabusLink: "B4.2",
        quantitativeInsight: "Upper zone desiccation sets *Balanus*'s upper limit; competition sets *Chthamalus*'s lower limit.",
      },
    ],
    conceptTracking: [
      { conceptId: "ecological-interdependence", intensity: 5, manifestation: "Biotic interactions sculpt realized niches." },
    ],
    examPromptTakeaway: "Use the exact pair *fundamental vs realized niche* and cite *competitive exclusion* or *resource partitioning*.",
    examBlueprint: {
      paper1TrapPattern: "Saying a species' realized niche can be larger than its fundamental niche (impossible under normal competition).",
      paper2StructuredPrompt: "Distinguish between saprotrophic, detritivorous, and mixotrophic nutrition with examples. [4]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Organisms differ in whether they synthesize organic molecules and how they digest food.",
        keyMarkSchemePoints: "1) Saprotrophs (e.g. fungi): secrete enzymes onto dead matter and absorb products. 2) Detritivores (e.g. earthworms): ingest dead organic matter and digest internally. 3) Mixotrophs (e.g. *Euglena*): use both autotrophy (photosynthesis) and heterotrophy.",
        dataOrUnitsTip: "Give one named organism per mode.",
      },
      pitfallsToAvoid: ["Calling fungi 'autotrophs' or 'detritivores'."],
    },
    primaryFormulas: [],
  },
];
