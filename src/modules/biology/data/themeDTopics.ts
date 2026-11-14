import { TopicData } from "./types";

export const THEME_D_TOPICS: TopicData[] = [
  {
    id: "bio-d1-1",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Molecules",
    topicCode: "D1.1",
    displayCode: "D1.1",
    syllabusRef: "IB Biology May 2027 · D1.1 DNA replication",
    title: "D1.1 DNA Replication",
    subtitle: "Semi-Conservative Replication, Leading/Lagging Strands [HL] & PCR",
    level: "SL / HL",
    strategicImportance: "MOLECULAR REPLICATION · PCR & PROOFREADING",
    readingTimeMinutes: 8,
    summary:
      "DNA replicates semi-conservatively using helicase and DNA polymerase in the 5'→3' direction. HL details leading vs lagging Okazaki synthesis, RNA primase, DNA ligase, and 3'→5' exonuclease proofreading.",
    speedReadBullets: [
      "Semi-conservative: each daughter duplex retains one parental strand and one new strand (Meselson–Stahl).",
      "Helicase unwinds & unzips H-bonds; DNA polymerase adds dNTPs 5'→3' using parental strand as template.",
      "[HL] Leading strand (continuous) vs Lagging strand (discontinuous Okazaki fragments, RNA primase, DNA pol I replaces primers, DNA ligase seals nicks).",
      "PCR (Taq polymerase, primers, dNTPs) amplifies target DNA via denaturation (95 °C), annealing (~55 °C), extension (72 °C).",
    ],
    primer5Min:
      "Every cell division demands copying 3.2 billion base pairs with near-zero errors. Because DNA strands are antiparallel and DNA polymerase can only attach incoming dNTPs to a free 3'–OH group, one strand grows smoothly toward the replication fork while the lagging strand must be stitched backward in short Okazaki fragments. In the lab, PCR mimics this cycle thermally using heat-stable *Taq* polymerase.",
    subSections: [
      {
        id: "d1-1-s1",
        title: "Semi-Conservative Mechanism & PCR",
        marker: "D1.1.1 – D1.1.5",
        content:
          "Meselson and Stahl grew *E. coli* in $^{15}\\text{N}$ then transferred to $^{14}\\text{N}$; after 1 generation, one intermediate hybrid band falsified conservative replication. PCR uses *Thermus aquaticus* (*Taq*) DNA polymerase that survives 95 °C denaturation.",
        analyticalTakeaway:
          "Always specify the 3 PCR temperatures and their purpose: 95 °C (break H-bonds), 50–65 °C (primer annealing), 72 °C (*Taq* extension).",
      },
      {
        id: "d1-1-s2",
        title: "Fork Enzymology, Okazaki Fragments & Proofreading",
        marker: "D1.1.6 – D1.1.9 · HL ONLY",
        isHLOnly: true,
        content:
          "DNA gyrase (topoisomerase) relieves supercoiling ahead of helicase. RNA primase lays short RNA primers providing a 3'–OH. DNA polymerase III extends 5'→3' continuously on the leading strand and discontinuously on the lagging strand. DNA polymerase I removes RNA primers and fills DNA; DNA ligase forms phosphodiester bonds. 3'→5' exonuclease proofreading cuts error rates to $\\sim 10^{-9}$.",
        analyticalTakeaway:
          "Energy for polymerization comes from cleaving the two terminal phosphates (pyrophosphate, PPi) off each incoming nucleoside triphosphate (dNTP).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d1-1-1",
        question: "[HL] State the roles of DNA primase, DNA polymerase I, and DNA ligase on the lagging strand.",
        promptType: "mechanism",
        hints: ["Think: initiate → replace RNA → seal nick."],
        modelAnswer:
          "DNA primase synthesizes a short complementary RNA primer to provide a free 3'-OH for DNA polymerase III. DNA polymerase I removes the RNA primer and replaces it with DNA nucleotides. DNA ligase catalyzes the formation of a phosphodiester bond to seal the sugar-phosphate nick between Okazaki fragments.",
        keyTermsToInclude: ["RNA primer", "3'-OH", "DNA polymerase I", "DNA ligase", "phosphodiester"],
      },
    ],
    analysis: {
      coreThesis: "5'→3' enzymatic constraint on an antiparallel template forces asymmetric continuous/discontinuous replication.",
      theoreticalFoundations: "Meselson–Stahl density shift + Kornberg polymerase mechanism.",
      strategicEvaluation: "Gel electrophoresis separates PCR amplicons by size for paternity testing and forensics.",
      commonMisconceptions: ["Saying DNA helicase breaks phosphodiester bonds (it breaks *hydrogen bonds* between base pairs)."],
      realWorldConnections: "RT-qPCR diagnostics and forensic STR profiling.",
    },
    cases: [
      {
        id: "case-d1-1",
        title: "Meselson–Stahl ¹⁵N/¹⁴N Density Centrifugation (1958)",
        domainOrContext: "Classic Molecular Biology / NOS",
        biologicalMechanism: "Generation 1 yielded 100% hybrid ¹⁵N/¹⁴N DNA; Generation 2 yielded 50% hybrid + 50% light ¹⁴N/¹⁴N.",
        concepts: ["information-flow"],
        syllabusLink: "D1.1",
        quantitativeInsight: "Error rate after proofreading + mismatch repair $\\approx 10^{-9}$ per base pair.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Exact template-directed genome duplication." },
    ],
    examPromptTakeaway: "Specify *5'→3' direction of synthesis* and *free 3'–OH* in every replication answer.",
    examBlueprint: {
      paper1TrapPattern: "Saying DNA ligase joins complementary base pairs (it joins adjacent nucleotides on the *same* backbone strand).",
      paper2StructuredPrompt: "Explain how Meselson and Stahl's experiment supported semi-conservative replication. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Heavy (¹⁵N) and light (¹⁴N) DNA separate by density in CsCl centrifugation.",
        keyMarkSchemePoints: "1) Bacteria grown in ¹⁵N had all heavy DNA. 2) Transferred to ¹⁴N for 1 division → single intermediate band (rules out conservative). 3) After 2 divisions → 50% intermediate, 50% light (rules out dispersive, confirms semi-conservative).",
        dataOrUnitsTip: "Mention CsCl density-gradient centrifugation.",
      },
      pitfallsToAvoid: ["Forgetting Generation 2 is needed to rule out dispersive replication."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d1-2",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Molecules",
    topicCode: "D1.2",
    displayCode: "D1.2",
    syllabusRef: "IB Biology May 2027 · D1.2 Protein synthesis",
    title: "D1.2 Protein Synthesis",
    subtitle: "Transcription, Genetic Code, Translation & Pre-mRNA Splicing [HL]",
    level: "SL / HL",
    strategicImportance: "CENTRAL DOGMA · CODON TABLES & SPLICING",
    readingTimeMinutes: 8,
    summary:
      "RNA polymerase transcribes the DNA antisense strand 5'→3' into mRNA, which ribosomes translate codon-by-codon using tRNA anticodons. HL covers promoter/terminator regulation, alternative splicing, and polysomes.",
    speedReadBullets: [
      "Transcription: RNA polymerase binds promoter, unwinds DNA, synthesizes mRNA 5'→3' complementary to the 3'→5' antisense (template) strand.",
      "Genetic code is triplet, universal, and degenerate (multiple codons per amino acid).",
      "Translation: ribosome (small + large subunits, E/P/A sites) reads mRNA 5'→3'; tRNA activating enzymes load specific amino acids using ATP.",
      "[HL] Eukaryotic pre-mRNA splicing (spliceosomes remove introns, join exons; alternative splicing yields multiple protein isoforms) + 5' cap & poly-A tail.",
    ],
    primer5Min:
      "The Central Dogma flows from DNA → mRNA → Polypeptide. During transcription, RNA polymerase reads the antisense template strand without needing a primer. In eukaryotes (HL), introns are spliced out and exons can be shuffled by alternative splicing—explaining how ~20,000 human genes generate >100,000 distinct proteins.",
    subSections: [
      {
        id: "d1-2-s1",
        title: "Transcription & Degenerate Genetic Code",
        marker: "D1.2.1 – D1.2.7",
        content:
          "The DNA *sense* (coding) strand has the same sequence as mRNA (with T instead of U); the *antisense* (template) strand is read by RNA polymerase. Degeneracy buffers point mutations (silent mutations at the 3rd 'wobble' base).",
        analyticalTakeaway:
          "Always check whether a question gives you the *sense* or *antisense* DNA strand before transcribing to mRNA.",
      },
      {
        id: "d1-2-s2",
        title: "Translation, Polysomes & Post-Transcriptional Splicing",
        marker: "D1.2.8 – D1.2.16 · HL",
        content:
          "Initiation binds Met-tRNA (UAC) to AUG at the P site; elongation brings charged tRNAs to the A site, forming peptide bonds via rRNA peptidyl transferase (ribozyme), then translocating to E site. [HL] Multiple ribosomes form **polysomes** for rapid translation; eukaryotes process pre-mRNA with a 5' methylguanosine cap, 3' poly-A tail, and intron splicing.",
        analyticalTakeaway:
          "In prokaryotes (no nuclear envelope), ribosomes attach to mRNA *while it is still being transcribed*.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d1-2-1",
        question: "A template (antisense) DNA sequence is 3'-TAC GGA CTT-5'. Write the mRNA codons and explain degeneracy.",
        promptType: "mechanism",
        hints: ["Complement A→U, T→A, G→C, C→G in 5'→3' direction."],
        modelAnswer:
          "mRNA is 5'-AUG CCU GAA-3'. Degeneracy means multiple codons (e.g. CCU, CCC, CCA, CCG) code for the same amino acid (proline), so some base substitutions do not change the polypeptide.",
        keyTermsToInclude: ["5'-AUG CCU GAA-3'", "degenerate", "multiple codons", "same amino acid"],
      },
    ],
    analysis: {
      coreThesis: "Template-guided transcription and ribosome-mediated codon-anticodon pairing convert nucleotide sequences into folded proteins.",
      theoreticalFoundations: "Crick's Central Dogma + wobble base pairing.",
      strategicEvaluation: "Post-translational modification (e.g., insulin cleavage of C-peptide, disulfide formation) activates final proteins.",
      commonMisconceptions: ["Saying tRNA brings amino acids to the *nucleus* (translation occurs in the *cytosol* / on rER)."],
      realWorldConnections: "Alternative splicing defects cause spinal muscular atrophy (treated by nusinersen antisense therapy).",
    },
    cases: [
      {
        id: "case-d1-2",
        title: "Dscam Alternative Splicing in Drosophila Neurons",
        domainOrContext: "Post-Transcriptional Regulation",
        biologicalMechanism: "Mutually exclusive exon splicing generates >38,000 protein isoforms from a single gene.",
        concepts: ["information-flow", "molecular-specificity"],
        syllabusLink: "D1.2 (HL)",
        quantitativeInsight: "One gene → 38,016 potential receptor variants for neuronal self-avoidance.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "DNA → pre-mRNA → mature mRNA → polypeptide." },
    ],
    examPromptTakeaway: "Distinguish *transcription* (nucleus, RNA pol, mRNA) from *translation* (ribosome, tRNA, peptide bonds).",
    examBlueprint: {
      paper1TrapPattern: "Translating an mRNA sequence using the *anticodon* instead of the *codon* when reading a codon table.",
      paper2StructuredPrompt: "Outline the roles of tRNA, mRNA, and ribosomes in translation. [5]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Ribosomes decode mRNA codons sequentially using aminoacyl-tRNAs.",
        keyMarkSchemePoints: "1) mRNA carries triplet codons from DNA and binds small ribosomal subunit. 2) tRNA carries a specific amino acid and complementary 3-base anticodon. 3) Ribosome (A, P, E sites) aligns tRNAs and catalyzes peptide bond formation. 4) Shifts along mRNA 5'→3' until stop codon.",
        dataOrUnitsTip: "Mention *start codon AUG* and *stop codons*.",
      },
      pitfallsToAvoid: ["Saying tRNA 'produces' amino acids."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d1-3",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Molecules",
    topicCode: "D1.3",
    displayCode: "D1.3",
    syllabusRef: "IB Biology May 2027 · D1.3 Mutation and gene editing",
    title: "D1.3 Mutation & Gene Editing",
    subtitle: "Point & Frameshift Mutations, Mutagens, CRISPR-Cas9 [HL] & Gene Knockout",
    level: "SL / HL",
    strategicImportance: "MUTAGENESIS & CRISPR-CAS9 [HL] · NEW 2027 SPEC",
    readingTimeMinutes: 7,
    summary:
      "Mutations are random changes in DNA base sequences (substitution, insertion, deletion) that generate new alleles. HL explores CRISPR-Cas9 RNA-guided genome editing and conserved knockout libraries.",
    speedReadBullets: [
      "Point substitutions: silent (same aa), missense (different aa, e.g., HbS Glu→Val), nonsense (premature stop codon).",
      "Insertions/deletions not in multiples of 3 cause frameshift mutations, altering all downstream codons.",
      "Mutagens: ionizing radiation (X-rays, UV → thymine dimers), chemical mutagens (deaminating/alkylating agents, benzo[a]pyrene).",
      "[HL] CRISPR-Cas9: guide RNA (gRNA) directs Cas9 endonuclease to a target sequence adjacent to a PAM (5'-NGG-3') for precise double-strand cleavage.",
    ],
    primer5Min:
      "Mutations are a double-edged sword: somatic mutations can drive cancer, while germline mutations supply the raw genetic variation for natural selection. Today, biologists no longer wait for random mutagens—CRISPR-Cas9 (HL) repurposes a bacterial antiviral defence using a programmable 20-nt guide RNA to cut any DNA target for gene knockout or homology-directed repair.",
    subSections: [
      {
        id: "d1-3-s1",
        title: "Types of Mutation & Causes",
        marker: "D1.3.1 – D1.3.7",
        content:
          "Mutations arise randomly from replication errors or mutagens; they are *not* directed by need. Only germline mutations (in gametes/zygote) are heritable. Sickle-cell allele ($Hb^S$) is a single A→T substitution in *HBB* (GAG → GTG, Glu → Val).",
        analyticalTakeaway:
          "Contrast *somatic* mutations (affect individual, e.g. oncogenes) with *germline* mutations (inherited by offspring).",
      },
      {
        id: "d1-3-s2",
        title: "CRISPR-Cas9 Gene Editing & Conserved Sequences",
        marker: "D1.3.8 – D1.3.10 · HL ONLY",
        isHLOnly: true,
        content:
          "Cas9 complexes with synthetic **guide RNA (gRNA)** complementary to a 20-bp target next to a **PAM** sequence. Cas9 creates a double-strand break; non-homologous end joining (NHEJ) introduces indels (gene knockout), while supplying a repair template enables homology-directed insertion. Highly conserved housekeeping sequences reflect strong purifying selection.",
        analyticalTakeaway:
          "Ethical evaluation of CRISPR: somatic therapy (e.g., sickle-cell *ex vivo* editing) vs heritable germline editing.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d1-3-1",
        question: "Why is a single-base deletion near the start of a coding sequence usually far more damaging than a single-base substitution?",
        promptType: "explain",
        hints: ["Consider reading frame of triplet codons."],
        modelAnswer:
          "A single-base deletion shifts the triplet reading frame for every subsequent codon (frameshift mutation), altering all downstream amino acids and often creating a premature stop codon. A single-base substitution affects at most one codon (and may be silent due to degeneracy).",
        keyTermsToInclude: ["frameshift", "reading frame", "downstream codons", "premature stop"],
      },
    ],
    analysis: {
      coreThesis: "Random sequence alterations create genetic novelty; CRISPR-Cas9 converts bacterial immunity into programmable editing.",
      theoreticalFoundations: "Triplet reading-frame sensitivity + RNA-guided endonuclease cleavage.",
      strategicEvaluation: "Off-target Cas9 cleavage remains a key clinical safety hurdle.",
      commonMisconceptions: ["Thinking mutations are always harmful (many are neutral/silent, and a few are beneficial under new selection)."],
      realWorldConnections: "Casgevy (exagamglogene autotemcel): first FDA/EMA-approved CRISPR therapy for sickle-cell disease.",
    },
    cases: [
      {
        id: "case-d1-3",
        title: "CRISPR-Cas9 Reactivation of Fetal Hemoglobin for Sickle-Cell Disease",
        domainOrContext: "Translational Gene Therapy",
        biologicalMechanism: "Editing the *BCL11A* erythroid enhancer reactivates γ-globin (HbF) to compensate for mutated β-globin.",
        concepts: ["information-flow", "molecular-specificity"],
        syllabusLink: "D1.3 (HL)",
        quantitativeInsight: "Eliminates vaso-occlusive crises in >90% of treated trial patients.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Sequence alterations vs programmable CRISPR editing." },
    ],
    examPromptTakeaway: "For CRISPR-Cas9, always name *guide RNA (gRNA)*, *Cas9 endonuclease*, *PAM sequence*, and *double-strand break*.",
    examBlueprint: {
      paper1TrapPattern: "Claiming environmental stress *causes* specific adaptive mutations.",
      paper2StructuredPrompt: "Outline how CRISPR-Cas9 can be used to knock out a target gene. [4]",
      commandTerm: "Outline",
      idealSolutionBreakdown: {
        statePrinciples: "Programmable RNA-guided endonuclease induces targeted double-strand breaks.",
        keyMarkSchemePoints: "1) Design gRNA complementary to target gene sequence. 2) gRNA guides Cas9 protein to DNA adjacent to a PAM sequence. 3) Cas9 cuts both DNA strands. 4) Cell's error-prone repair (NHEJ) introduces insertions/deletions, causing a frameshift knockout.",
        dataOrUnitsTip: "Mention *PAM sequence*.",
      },
      pitfallsToAvoid: ["Saying Cas9 cuts RNA (it cuts dsDNA)."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d2-1",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Cells",
    topicCode: "D2.1",
    displayCode: "D2.1",
    syllabusRef: "IB Biology May 2027 · D2.1 Cell and nuclear division",
    title: "D2.1 Cell & Nuclear Division",
    subtitle: "Mitosis, Meiosis, Crossing Over, Cell Cycle Checkpoints & Cyclins [HL]",
    level: "SL / HL",
    strategicImportance: "MITOSIS, MEIOSIS & CANCER CYCLINS · CORE SL/HL",
    readingTimeMinutes: 8,
    summary:
      "Mitosis produces genetically identical diploid cells for growth and repair; meiosis halves chromosome number to haploid gametes while generating genetic variation via crossing over and independent assortment.",
    speedReadBullets: [
      "Mitosis (PMAT): sister chromatids separate in anaphase → 2 identical diploid (2n) daughter nuclei; cytokinesis differs in plants (cell plate) vs animals (cleavage furrow).",
      "Meiosis I (homologs separate; crossing over at chiasmata in prophase I + random orientation in metaphase I) → Meiosis II (sister chromatids separate).",
      "Nondisjunction in meiosis causes aneuploidy (e.g., Trisomy 21 / Down syndrome).",
      "[HL] Cell cycle checkpoints (G1, G2, M) regulated by cyclins + CDKs; proto-oncogenes vs tumour-suppressor genes (p53).",
    ],
    primer5Min:
      "Division links cellular continuity to evolutionary variety. Mitosis clones a cell faithfully after S-phase DNA replication, whereas Meiosis I shuffles maternal and paternal alleles through prophase I chiasmata and metaphase I independent assortment before halving ploidy. At HL, cyclins rise and fall to activate cyclin-dependent kinases (CDKs) past G1/S and G2/M checkpoints—and mutations in these brakes drive oncogenesis.",
    subSections: [
      {
        id: "d2-1-s1",
        title: "Mitosis, Cytokinesis & Meiosis Variation",
        marker: "D2.1.1 – D2.1.10",
        content:
          "Calculate mitotic index ($\\text{cells in mitosis} / \\text{total cells}$) to assess tissue proliferation or tumour aggressiveness. In meiosis, **crossing over** exchanges non-sister chromatid segments between homologous chromosomes, and **independent assortment** yields $2^n$ gamete combinations ($2^{23} > 8.3\\times 10^6$ in humans).",
        analyticalTakeaway:
          "Always state *homologous chromosomes separate in Anaphase I* and *sister chromatids separate in Anaphase II*.",
        keyFormulaOrFramework: "\\text{Mitotic Index} = \\frac{\\text{Cells in Mitosis}}{\\text{Total Cells Counted}}",
      },
      {
        id: "d2-1-s2",
        title: "Cyclins, CDKs, Checkpoints & Oncogenesis",
        marker: "D2.1.11 – D2.1.14 · HL ONLY",
        isHLOnly: true,
        content:
          "Cyclins (G1, S, G2/M) bind **CDKs** to phosphorylate target proteins driving cell-cycle transitions. Proto-oncogenes (e.g. *Ras*) promote division (gain-of-function → oncogene); tumour-suppressor genes (e.g. *p53*, *BRCA1*) halt division for DNA repair or apoptosis (loss-of-function → uncontrolled proliferation).",
        analyticalTakeaway:
          "Proto-oncogenes act dominantly (one mutated allele accelerates division); tumour suppressors usually act recessively (two-hit hypothesis).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d2-1-1",
        question: "Explain how meiosis generates genetic variation in gametes prior to fertilization.",
        promptType: "explain",
        hints: ["Two mechanisms in Meiosis I: Prophase I and Metaphase I."],
        modelAnswer:
          "1) In Prophase I, homologous chromosomes synapse into bivalents and exchange alleles between non-sister chromatids at chiasmata (crossing over), creating recombinant chromatids. 2) In Metaphase I, bivalents orient randomly at the equator (independent assortment), yielding 2^n maternal/paternal chromosome combinations.",
        keyTermsToInclude: ["crossing over", "Prophase I", "non-sister chromatids", "independent assortment", "Metaphase I"],
      },
    ],
    analysis: {
      coreThesis: "Mitotic fidelity preserves somatic identity; meiotic recombination fuels sexual diversity; cyclin-CDK checkpoints guard against cancer.",
      theoreticalFoundations: "Nurse/Hartwell/Hunt cyclin-CDK discovery.",
      strategicEvaluation: "Primary vs secondary tumours (metastasis via blood/lymph).",
      commonMisconceptions: ["Thinking DNA replicates between Meiosis I and Meiosis II (it only replicates once in S-phase before Meiosis I)."],
      realWorldConnections: "CDK4/6 inhibitors (palbociclib) arrest hormone-receptor-positive breast cancer cells in G1.",
    },
    cases: [
      {
        id: "case-d2-1",
        title: "Mitotic Index in Root Tip Meristem vs Tumour Biopsy",
        domainOrContext: "Cytology & Oncology",
        biologicalMechanism: "Elevated mitotic index indicates rapid proliferation in meristems or malignant neoplasms.",
        concepts: ["information-flow"],
        syllabusLink: "D2.1",
        quantitativeInsight: "Normal adult tissue MI $<1\\%$ vs aggressive tumour MI $>10\\%$.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Accurate chromosome segregation and recombination." },
    ],
    examPromptTakeaway: "In Prophase I crossing over, specify *non-sister chromatids of homologous chromosomes*.",
    examBlueprint: {
      paper1TrapPattern: "Confusing metaphase of mitosis (single chromosomes on equator) with metaphase I of meiosis (homologous pairs/bivalents on equator).",
      paper2StructuredPrompt: "Explain the roles of cyclins and tumour-suppressor genes in controlling the cell cycle. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Cyclin–CDK complexes drive checkpoints; tumour suppressors brake division if DNA is damaged.",
        keyMarkSchemePoints: "1) Cyclin concentrations rise and bind CDKs to activate them. 2) Active CDKs phosphorylate proteins triggering G1→S or G2→M transitions. 3) Tumour-suppressor proteins (e.g. p53) pause the cycle to repair DNA or trigger apoptosis; mutations in them allow uncontrolled mitosis.",
        dataOrUnitsTip: "Mention *phosphorylation* of target proteins by CDKs.",
      },
      pitfallsToAvoid: ["Saying cyclins stay at constant concentration (CDKs are constant; cyclins oscillate)."],
    },
    primaryFormulas: ["\\text{Mitotic Index} = \\frac{\\text{Cells in Mitosis}}{\\text{Total Cells}}"],
  },
  {
    id: "bio-d2-2",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Cells",
    topicCode: "D2.2",
    displayCode: "D2.2",
    syllabusRef: "IB Biology May 2027 · D2.2 Gene expression [HL]",
    title: "D2.2 Gene Expression",
    subtitle: "Transcription Factors, Epigenetics (Methylation/Acetylation) & Phenotypic Plasticity [HL ONLY]",
    level: "HL ONLY",
    strategicImportance: "HL ONLY · EPIGENETICS & OPERONS",
    readingTimeMinutes: 7,
    summary:
      "Gene expression is regulated at transcription (promoters, enhancers, transcription factors, *lac* operon), epigenetically (DNA methylation, histone acetylation), and post-transcriptionally (mRNA stability/miRNA).",
    speedReadBullets: [
      "Transcription factors bind promoters/enhancers to recruit or block RNA polymerase.",
      "Epigenetics: heritable changes in gene expression without altering DNA base sequence.",
      "Histone acetylation (HATs) loosens chromatin (euchromatin → transcription ↑); DNA methylation of CpG islands recruits repressors (transcription ↓).",
      "Monozygotic twin divergence & environmental phenotypic plasticity (e.g. Himalayan rabbit, *Daphnia* helmets) reflect epigenetic reprogramming.",
    ],
    primer5Min:
      "Why do identical twins diverge in disease risk as they age, and why does a liver cell ignore hemoglobin genes? Topic D2.2 (HL Only) reveals the epigenetic control layer sitting above DNA sequence. Adding acetyl groups to histone tails neutralizes their positive charge, loosening DNA into accessible euchromatin, while methylating cytosines locks genes into silent heterochromatin.",
    subSections: [
      {
        id: "d2-2-s1",
        title: "Transcriptional Control & Epigenetic Tags",
        marker: "D2.2.1 – D2.2.6 · HL ONLY",
        isHLOnly: true,
        content:
          "Proteins and non-coding RNAs regulate transcription. DNA methylation adds $-\\text{CH}_3$ to cytosine bases in promoters, blocking transcription factor binding. Histone acetyltransferases (HATs) add acetyl groups to positively charged lysine tails, weakening electrostatic attraction to negatively charged DNA phosphates.",
        analyticalTakeaway:
          "Remember the mnemonic: **A**cetylation = **A**ctive (euchromatin); **M**ethylation (of DNA) = **M**uted (silenced).",
      },
      {
        id: "d2-2-s2",
        title: "Environmental Triggers, Monozygotic Twins & Plasticity",
        marker: "D2.2.7 – D2.2.11 · HL ONLY",
        isHLOnly: true,
        content:
          "Hormones (e.g., estradiol), diet, toxins, and stress alter epigenetic marks across a lifetime, explaining why older monozygotic twins show distinct methylation profiles. Most epigenetic tags are erased during gametogenesis/early embryogenesis, though **imprinted genes** retain parent-of-origin marks.",
        analyticalTakeaway:
          "mRNA degradation rate (poly-A tail length) and siRNA/miRNA also tune protein output post-transcriptionally.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d2-2-1",
        question: "[HL] Explain at the molecular level how histone acetylation increases gene transcription.",
        promptType: "explain",
        hints: ["Consider the charges on histone lysine tails and DNA phosphate backbones."],
        modelAnswer:
          "Histone tails are rich in positively charged amino acids (lysine) that bind tightly to negatively charged DNA phosphate groups. Adding negatively/neutrally charged acetyl groups neutralizes the positive charge, loosening nucleosome packing into open euchromatin so transcription factors and RNA polymerase can access the promoter.",
        keyTermsToInclude: ["lysine", "positive charge", "DNA phosphate", "euchromatin", "RNA polymerase"],
      },
    ],
    analysis: {
      coreThesis: "Reversible chemical tags on DNA and histones translate environmental signals into stable cell-type-specific transcriptomes.",
      theoreticalFoundations: "Chromatin remodeling + Jacob–Monod regulation.",
      strategicEvaluation: "Epigenetic inheritance across cell divisions (mitosis) maintains tissue identity.",
      commonMisconceptions: ["Thinking epigenetic modifications mutate the DNA base sequence (the A, T, G, C sequence is unchanged)."],
      realWorldConnections: "Dutch Hunger Winter cohort showed persistent *IGF2* methylation differences decades after prenatal famine.",
    },
    cases: [
      {
        id: "case-d2-2",
        title: "Monozygotic Twin Epigenetic Drift (Fraga et al.)",
        domainOrContext: "Human Epigenomics",
        biologicalMechanism: "3-year-old twins have nearly identical methylation; 50-year-old twins living apart show wide divergence.",
        concepts: ["information-flow", "homeostatic-feedback"],
        syllabusLink: "D2.2 (HL)",
        quantitativeInsight: "Older twins differed >4× more in DNA methylation and histone acetylation than young twins.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Epigenetic gating of chromatin accessibility." },
    ],
    examPromptTakeaway: "Always state explicitly that epigenetics alters gene expression *without changing the DNA base sequence*.",
    examBlueprint: {
      paper1TrapPattern: "Confusing histone acetylation (increases transcription) with DNA methylation (decreases transcription).",
      paper2StructuredPrompt: "Explain how identical twins can develop different phenotypes as they age despite having identical DNA. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Environmental factors induce differential epigenetic modifications.",
        keyMarkSchemePoints: "1) Different diets, stress, or toxin exposures alter DNA methylation and histone acetylation. 2) DNA methylation silences promoters; histone acetylation opens chromatin for transcription. 3) Different proteins are expressed, producing phenotypic divergence without DNA mutation.",
        dataOrUnitsTip: "Mention *epigenome*.",
      },
      pitfallsToAvoid: ["Saying twins mutate differently as the sole reason."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d2-3",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Cells",
    topicCode: "D2.3",
    displayCode: "D2.3",
    syllabusRef: "IB Biology May 2027 · D2.3 Water potential",
    title: "D2.3 Water Potential",
    subtitle: "Osmosis, Solute & Pressure Potential (Ψ = Ψs + Ψp), Plasmolysis & Turgor",
    level: "SL / HL",
    strategicImportance: "QUANTITATIVE OSMOSIS · Ψ EQUATION",
    readingTimeMinutes: 6,
    summary:
      "Water moves passively down a water potential gradient from higher (less negative) $\\Psi$ to lower (more negative) $\\Psi$, governed by solute potential ($\\Psi_s \\le 0$) and wall pressure potential ($\\Psi_p$).",
    speedReadBullets: [
      "Pure water at atmospheric pressure has $\\Psi = 0\\text{ kPa}$ (maximum). Adding solutes always makes $\\Psi_s$ negative.",
      "Total water potential: $\\Psi = \\Psi_s + \\Psi_p$.",
      "Animal cells in hypotonic solution lyse (no cell wall, $\\Psi_p \\approx 0$); plant cells become turgid ($\\Psi_p > 0$ balances $\\Psi_s$ at equilibrium: $\\Psi_{\\text{cell}} = 0$).",
      "In hypertonic solution, plant protoplast shrinks away from the cell wall (**plasmolysis**, $\\Psi_p = 0$).",
    ],
    primer5Min:
      "Water potential ($\\Psi$) gives osmosis exact predictive math. Pure water sits at $\\Psi = 0$; dissolving solutes lowers free energy, making solute potential ($\\Psi_s$) negative. When a plant cell absorbs water, its rigid cellulose wall pushes back with positive pressure potential ($\\Psi_p$) until $\\Psi_s + \\Psi_p$ equals the outside solution—keeping herbaceous plants upright.",
    subSections: [
      {
        id: "d2-3-s1",
        title: "Solute Potential, Pressure Potential & Osmotic Direction",
        marker: "D2.3.1 – D2.3.5",
        content:
          "Water always moves from higher (less negative, e.g. $-100\\text{ kPa}$) to lower (more negative, e.g. $-450\\text{ kPa}$) water potential. At incipient plasmolysis, the protoplast just begins to pull away from the cell wall and $\\Psi_p = 0$, so $\\Psi_{\\text{cell}} = \\Psi_s$.",
        analyticalTakeaway:
          "In potato-core osmolarity labs, the isotonic sucrose concentration is the x-intercept where % mass change = 0%.",
        keyFormulaOrFramework: "\\Psi = \\Psi_s + \\Psi_p",
      },
      {
        id: "d2-3-s2",
        title: "Turgor, Plasmolysis & Medical Saline",
        marker: "D2.3.6 – D2.3.8 · HL",
        content:
          "IV drips and organ-transplant bathing solutions must be isotonic (~0.9% NaCl) to prevent RBC hemolysis or crenation. [HL] In plants, guard-cell K⁺ uptake lowers $\\Psi_s$, drawing water in to raise $\\Psi_p$ and bow open stomata.",
        analyticalTakeaway:
          "Contractile vacuoles in freshwater protists (*Paramecium*) actively expel osmotically entering water using ATP.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d2-3-1",
        question: "A flaccid plant cell with Ψ_s = −0.70 MPa and Ψ_p = 0 MPa is placed in pure water (Ψ = 0 MPa). What are Ψ_p and Ψ_cell at equilibrium?",
        promptType: "calculation",
        hints: ["At equilibrium, Ψ_cell = Ψ_outside = 0 MPa."],
        modelAnswer:
          "Water enters by osmosis until Ψ_cell = 0 MPa. Assuming negligible dilution of Ψ_s (−0.70 MPa), Ψ_p rises to +0.70 MPa so that Ψ = −0.70 + 0.70 = 0 MPa (fully turgid).",
        keyTermsToInclude: ["0 MPa", "+0.70 MPa", "turgid", "equilibrium"],
        formulaUsed: "\\Psi = \\Psi_s + \\Psi_p",
      },
    ],
    analysis: {
      coreThesis: "Osmotic water flux is governed by the sum of negative solute potential and positive wall pressure potential.",
      theoreticalFoundations: "Chemical potential of water across semipermeable membranes.",
      strategicEvaluation: "Negative tension in xylem ($\Psi_p < 0$) pulls water upward even when $\Psi_s$ is near zero.",
      commonMisconceptions: ["Thinking water moves from *lower* to *higher* water potential (it moves from *higher/less negative* to *lower/more negative*)."],
      realWorldConnections: "Wilting occurs when soil $\\Psi$ drops below root $\\Psi$ or transpiration exceeds uptake, dropping $\\Psi_p$ to zero.",
    },
    cases: [
      {
        id: "case-d2-3",
        title: "Potato Tissue Sucrose Osmometry",
        domainOrContext: "IB Practical Skills / IA",
        biologicalMechanism: "Mass gain in dilute sucrose, mass loss in concentrated sucrose; zero-change intercept gives tissue $\\Psi_s$.",
        concepts: ["compartmentalization", "homeostatic-feedback"],
        syllabusLink: "D2.3",
        quantitativeInsight: "Typical potato tuber isotonicity ≈ 0.25–0.35 mol dm⁻³ sucrose ($\\Psi \\approx -0.7\\text{ MPa}$).",
      },
    ],
    conceptTracking: [
      { conceptId: "compartmentalization", intensity: 5, manifestation: "Selectively permeable plasma membrane + tonoplast." },
    ],
    examPromptTakeaway: "Always write out $\\Psi = \\Psi_s + \\Psi_p$ and include the negative sign for $\\Psi_s$.",
    examBlueprint: {
      paper1TrapPattern: "Sign error: thinking −800 kPa is *higher* than −200 kPa (it is *lower* / more negative).",
      paper2StructuredPrompt: "Explain what happens to a plant cell and an animal cell when placed in pure water. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Pure water has Ψ = 0 kPa, higher than cell cytoplasm (negative Ψ).",
        keyMarkSchemePoints: "1) Water enters both cells by osmosis down the water potential gradient. 2) Animal cell lacks a cell wall, swells, and undergoes lysis (bursts). 3) Plant cell wall resists expansion, building positive pressure potential (Ψ_p) until Ψ_cell = 0, making the cell turgid without bursting.",
        dataOrUnitsTip: "Mention *turgor / pressure potential*.",
      },
      pitfallsToAvoid: ["Saying plant cells 'don't absorb water' in pure water (they absorb water until turgid equilibrium)."],
    },
    primaryFormulas: ["\\Psi = \\Psi_s + \\Psi_p"],
  },
  {
    id: "bio-d3-1",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Organisms",
    topicCode: "D3.1",
    displayCode: "D3.1",
    syllabusRef: "IB Biology May 2027 · D3.1 Reproduction",
    title: "D3.1 Reproduction",
    subtitle: "Sexual vs Asexual, Angiosperm Pollination, Menstrual Cycle & IVF [HL]",
    level: "SL / HL",
    strategicImportance: "REPRODUCTIVE ENDOCRINOLOGY & PLANT FERTILIZATION",
    readingTimeMinutes: 8,
    summary:
      "Sexual reproduction promotes genetic variation via meiosis and fertilization. Human reproduction is orchestrated by hypothalamic-pituitary-gonadal hormones (FSH, LH, estradiol, progesterone), while angiosperms use insect/wind pollination and seed dispersal.",
    speedReadBullets: [
      "Asexual (cloning, fast in stable niches) vs Sexual (meiosis + syngamy, genetic variation for changing environments).",
      "Menstrual cycle: FSH stimulates follicle → estradiol thickens endometrium & triggers LH surge (ovulation day 14) → corpus luteum secretes progesterone (maintains endometrium, inhibits FSH/LH).",
      "IVF: GnRH/FSH superovulation → egg retrieval + external fertilization → embryo transfer.",
      "Angiosperms: pollination (pollen transfer) ≠ fertilization (pollen tube delivers male gamete to ovule) ≠ seed dispersal (reduces parent-offspring competition); [HL] double fertilization & placental hCG.",
    ],
    primer5Min:
      "Reproduction bridges organismal physiology to population continuity. In humans, negative and positive feedback loops between pituitary gonadotropins (FSH, LH) and ovarian steroids (estradiol, progesterone) time ovulation to endometrial readiness. In flowering plants, co-evolution with animal pollinators ensures outcrossing, followed by seed dormancy and germination.",
    subSections: [
      {
        id: "d3-1-s1",
        title: "Human Reproductive Systems, Menstrual Cycle & IVF",
        marker: "D3.1.1 – D3.1.8",
        content:
          "Estradiol exerts negative feedback on FSH/LH early in the follicular phase, then switches to **positive feedback** at peak levels to trigger the **LH surge** and ovulation. Progesterone from the corpus luteum maintains the vascular endometrium; if no implantation occurs, the corpus luteum degenerates, progesterone drops, and menstruation begins.",
        analyticalTakeaway:
          "On menstrual cycle hormone graphs, identify the sharp **LH spike** at Day 14 first, preceded immediately by the **estradiol peak**.",
      },
      {
        id: "d3-1-s2",
        title: "Angiosperm Reproduction, Polyspermy Block & Placenta",
        marker: "D3.1.9 – D3.1.17 · HL",
        content:
          "Germination requires water (activates gibberellin → amylase mobilizes starch), oxygen (aerobic respiration), and suitable temperature. [HL] Fast/slow blocks to polyspermy (cortical reaction hardening zona pellucida); embryo secretes **hCG** to rescue the corpus luteum until the placenta takes over progesterone synthesis.",
        analyticalTakeaway:
          "Never confuse *pollination* (anther → stigma) with *fertilization* (fusion of male and female gamete nuclei).",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d3-1-1",
        question: "Outline the roles of estradiol and progesterone during the human menstrual cycle.",
        promptType: "explain",
        hints: ["Follicular phase vs luteal phase."],
        modelAnswer:
          "Estradiol (from developing follicle) repairs and thickens the endometrium and at high concentration triggers the pituitary LH surge causing ovulation. Progesterone (from corpus luteum) maintains the thickened, vascularized endometrium and inhibits FSH and LH via negative feedback to prevent new follicle maturation.",
        keyTermsToInclude: ["estradiol", "endometrium", "LH surge", "progesterone", "corpus luteum", "negative feedback"],
      },
    ],
    analysis: {
      coreThesis: "Endocrine feedback synchronizes gamete release with uterine receptivity, while plant reproduction decouples pollination from seed dispersal.",
      theoreticalFoundations: "HPG hormonal axis + double fertilization in angiosperms.",
      strategicEvaluation: "Mutualistic plant-pollinator co-evolution increases outcrossing efficiency.",
      commonMisconceptions: ["Thinking the ovary produces FSH/LH (the anterior pituitary produces FSH and LH; ovaries produce estradiol and progesterone)."],
      realWorldConnections: "Combined oral contraceptives use synthetic estrogen/progesterone to inhibit FSH/LH via negative feedback.",
    },
    cases: [
      {
        id: "case-d3-1",
        title: "hCG Rescue of the Corpus Luteum in Early Pregnancy",
        domainOrContext: "Reproductive Endocrinology",
        biologicalMechanism: "Blastocyst trophoblast secretes hCG, binding LH receptors on the corpus luteum to sustain progesterone.",
        concepts: ["homeostatic-feedback"],
        syllabusLink: "D3.1 (HL)",
        quantitativeInsight: "hCG peaks around weeks 8–10 of gestation before placental progesterone dominates.",
      },
    ],
    conceptTracking: [
      { conceptId: "homeostatic-feedback", intensity: 5, manifestation: "Positive LH surge + negative luteal feedback." },
    ],
    examPromptTakeaway: "Memorize the source and target of all 4 menstrual hormones: FSH, LH (anterior pituitary) vs Estradiol, Progesterone (ovary).",
    examBlueprint: {
      paper1TrapPattern: "Saying progesterone causes ovulation (LH surge causes ovulation).",
      paper2StructuredPrompt: "Explain how hormones regulate the human menstrual cycle from day 1 to day 28. [6]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Pituitary gonadotropins and ovarian steroids interact via negative and positive feedback.",
        keyMarkSchemePoints: "1) FSH stimulates follicle growth. 2) Follicle secretes estradiol → thickens endometrium. 3) High estradiol triggers positive feedback → LH surge → ovulation (~day 14). 4) Ruptured follicle becomes corpus luteum secreting progesterone. 5) Progesterone maintains endometrium & inhibits FSH/LH. 6) Corpus luteum degenerates → progesterone drops → menstruation.",
        dataOrUnitsTip: "Reference Day 14 for ovulation.",
      },
      pitfallsToAvoid: ["Mixing up which hormone comes from the pituitary vs follicle/corpus luteum."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d3-2",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Organisms",
    topicCode: "D3.2",
    displayCode: "D3.2",
    syllabusRef: "IB Biology May 2027 · D3.2 Inheritance",
    title: "D3.2 Inheritance",
    subtitle: "Mendelian Genetics, Codominance, Sex-Linkage, Polygenic Traits & Gene Linkage [HL]",
    level: "SL / HL",
    strategicImportance: "GENETICS PROBLEMS · PUNNETT, PEDIGREES & CHI-SQUARED",
    readingTimeMinutes: 8,
    summary:
      "Alleles segregate in gametes and combine at fertilization. Beyond complete dominance lie codominance (ABO), sex-linked traits (hemophilia), polygenic continuous variation, and HL autosomal gene linkage.",
    speedReadBullets: [
      "Monohybrid cross (Aa × Aa → 3:1 phenotype, 1:2:1 genotype); ABO blood group has 3 alleles ($I^A, I^B$ codominant; $i$ recessive).",
      "Sex-linked (X-linked recessive): males ($X^h Y$) express trait from one maternal allele; females ($X^H X^h$) are carriers.",
      "Pedigree charts: two unaffected parents with an affected child = recessive; two affected parents with an unaffected child = dominant.",
      "[HL] Dihybrid crosses (9:3:3:1) vs autosomal gene linkage (excess parental phenotypes, small % recombinants from crossing over) + $\\chi^2$ test.",
    ],
    primer5Min:
      "Genetics turns meiosis into predictive probability. In SL, master Punnett grids for autosomal, codominant (ABO), and X-linked recessive traits, plus pedigree deduction rules. In HL, when two genes sit on the same autosome (linked genes), they fail Mendel's independent assortment—producing far fewer recombinant offspring than the 1:1:1:1 test-cross ratio, tested statistically with chi-squared.",
    subSections: [
      {
        id: "d3-2-s1",
        title: "Monohybrid, Codominance, Sex-Linkage & Pedigrees",
        marker: "D3.2.1 – D3.2.10",
        content:
          "Continuous variation (height, skin colour) results from **polygenic inheritance** (additive effects of multiple genes) plus environmental influence, forming a normal distribution. Discontinuous variation (ABO blood type) is controlled by one or a few genes.",
        analyticalTakeaway:
          "Always write genotypes with superscripts for codominance ($I^A I^B$) and X-linkage ($X^H X^h$, $X^h Y$).",
      },
      {
        id: "d3-2-s2",
        title: "Dihybrid Crosses, Autosomal Linkage & Chi-Squared",
        marker: "D3.2.11 – D3.2.16 · HL ONLY",
        isHLOnly: true,
        content:
          "Unlinked heterozygotes ($AaBb \\times aabb$) yield a 1:1:1:1 ratio. If genes A and B are on the same chromosome, crossing over in Prophase I produces a minority of **recombinant** gametes. A chi-squared test ($df = 3$, critical value $7.815$ at $p=0.05$) tests whether deviations from 1:1:1:1 or 9:3:3:1 are statistically significant.",
        analyticalTakeaway:
          "Write linked genotypes clearly as $\\frac{AB}{ab}$ or $AB/ab$ to show cis/trans arrangement.",
        keyFormulaOrFramework: "\\chi^2 = \\sum \\frac{(O - E)^2}{E}",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d3-2-1",
        question: "A woman with blood group A (father was group O) marries a man with blood group B (mother was group O). What blood groups are possible in their children?",
        promptType: "calculation",
        hints: ["Determine genotypes: woman = I^A i, man = I^B i."],
        modelAnswer:
          "Woman is I^A i, man is I^B i. Punnett square yields I^A I^B (AB), I^A i (A), I^B i (B), and ii (O)—each with 25% probability, so all four ABO blood groups are possible.",
        keyTermsToInclude: ["I^A i", "I^B i", "AB", "A", "B", "O", "25%"],
      },
    ],
    analysis: {
      coreThesis: "Meiotic segregation and linkage geometry govern how alleles assort across generations.",
      theoreticalFoundations: "Mendel's laws + Morgan's chromosomal linkage.",
      strategicEvaluation: "Phenotypic plasticity: identical genotypes can produce different phenotypes under different environments.",
      commonMisconceptions: ["Putting alleles on the Y chromosome for X-linked traits like hemophilia or red-green colour blindness."],
      realWorldConnections: "Polygenic risk scores in modern genomic medicine.",
    },
    cases: [
      {
        id: "case-d3-2",
        title: "Thomas Hunt Morgan's Drosophila Linkage Crosses",
        domainOrContext: "Classical Genetics",
        biologicalMechanism: "Grey-body/normal-wing × black-body/vestigial-wing F1 test cross yielded ~83% parental and ~17% recombinant offspring.",
        concepts: ["information-flow"],
        syllabusLink: "D3.2 (HL)",
        quantitativeInsight: "17% recombinant frequency → genes located ~17 map units (cM) apart on chromosome 2.",
      },
    ],
    conceptTracking: [
      { conceptId: "information-flow", intensity: 5, manifestation: "Allelic transmission and linkage." },
    ],
    examPromptTakeaway: "For pedigrees, prove dominance/recessiveness by pointing to a specific parent-offspring trio (e.g. 'Both parents II-1 and II-2 are unaffected, yet child III-1 is affected').",
    examBlueprint: {
      paper1TrapPattern: "Assuming a 3:1 ratio means a cross is definitely Aa × Aa when sample size is tiny.",
      paper2StructuredPrompt: "[HL] Explain how linked genes can still produce recombinant phenotypes in a dihybrid test cross. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Linked genes lie on the same chromosome and are inherited together unless separated by crossing over.",
        keyMarkSchemePoints: "1) In Prophase I of meiosis, homologous chromosomes pair as bivalents. 2) Chiasmata form and non-sister chromatids exchange segments (crossing over). 3) This produces recombinant gametes (e.g. Ab and aB) in lower frequency than parental gametes (AB, ab).",
        dataOrUnitsTip: "State that recombinant frequency < 50%.",
      },
      pitfallsToAvoid: ["Saying independent assortment causes recombination of linked genes."],
    },
    primaryFormulas: ["\\chi^2 = \\sum \\frac{(O - E)^2}{E}"],
  },
  {
    id: "bio-d3-3",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Organisms",
    topicCode: "D3.3",
    displayCode: "D3.3",
    syllabusRef: "IB Biology May 2027 · D3.3 Homeostasis",
    title: "D3.3 Homeostasis",
    subtitle: "Negative Feedback, Blood Glucose, Thermoregulation & Osmoregulation [HL]",
    level: "SL / HL",
    strategicImportance: "ENDOCRINE & RENAL PHYSIOLOGY · CORE + HL",
    readingTimeMinutes: 8,
    summary:
      "Homeostasis maintains internal variables (blood glucose, core temperature, plasma osmolarity) within narrow limits via negative feedback loops involving pancreatic islets, hypothalamus, skin/brown fat, and the kidney nephron.",
    speedReadBullets: [
      "Negative feedback: deviation from set point triggers effectors that reverse the change.",
      "Blood glucose: β-cells → insulin (GLUT4 uptake + glycogenesis); α-cells → glucagon (glycogenolysis + gluconeogenesis); Type 1 vs Type 2 diabetes.",
      "Thermoregulation (hypothalamus): vasodilation, sweating vs vasoconstriction, shivering, thyroxin/uncoupled brown fat.",
      "[HL] Kidney nephron: ultrafiltration (Bowman's capsule), selective reabsorption (PCT), Loop of Henle countercurrent multiplier, ADH-regulated aquaporins in collecting duct.",
    ],
    primer5Min:
      "Homeostasis is dynamic stability. After a meal, rising blood glucose triggers pancreatic β-cells to secrete insulin, opening GLUT4 channels in muscle and adipose tissue and storing glycogen in the liver. At HL, the mammalian kidney fine-tunes blood water potential: the Loop of Henle builds a hypertonic medullary salt gradient so ADH can insert aquaporins into the collecting duct whenever you are dehydrated.",
    subSections: [
      {
        id: "d3-3-s1",
        title: "Blood Glucose & Thermoregulation",
        marker: "D3.3.1 – D3.3.6",
        content:
          "Type 1 diabetes is autoimmune destruction of pancreatic β-cells (insufficient insulin); Type 2 is insulin resistance of target receptors (linked to obesity/lifestyle). Peripheral thermoreceptors and hypothalamic sensors coordinate arteriolar vasodilation/constriction (never say capillaries move closer to skin—arterioles dilate/constrict).",
        analyticalTakeaway:
          "Always name *arterioles* (which have smooth muscle), not capillaries, in vasodilation/vasoconstriction.",
      },
      {
        id: "d3-3-s2",
        title: "Osmoregulation & Nephron Function",
        marker: "D3.3.7 – D3.3.11 · HL ONLY",
        isHLOnly: true,
        content:
          "High afferent/narrow efferent arteriole pressure drives **ultrafiltration** across fenestrated capillaries, basement membrane, and podocyte foot processes. The **PCT** reabsorbs 100% of glucose/amino acids via Na⁺ cotransport. The **Loop of Henle** pumps Na⁺/Cl⁻ out of the impermeable ascending limb, creating a hypertonic medulla. **ADH** (pituitary) triggers aquaporin insertion in collecting duct cells to concentrate urine.",
        analyticalTakeaway:
          "Ascending limb = impermeable to water, actively pumps NaCl out; Descending limb = permeable to water, water exits by osmosis.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d3-3-1",
        question: "[HL] Explain how ADH reduces urine volume during dehydration.",
        promptType: "explain",
        hints: ["Include osmoreceptors, collecting duct permeability, and medullary gradient."],
        modelAnswer:
          "Dehydration increases blood osmolarity, detected by hypothalamic osmoreceptors, which stimulate the posterior pituitary to release ADH. ADH binds collecting duct receptors, triggering exocytosis of aquaporin-2 water channels into the apical membrane. Water moves out by osmosis into the hypertonic medulla, producing small volumes of concentrated urine.",
        keyTermsToInclude: ["osmoreceptors", "ADH", "aquaporins", "collecting duct", "hypertonic medulla", "osmosis"],
      },
    ],
    analysis: {
      coreThesis: "Antagonistic hormones and countercurrent renal gradients defend cellular osmotic and thermal stability.",
      theoreticalFoundations: "Negative feedback control + countercurrent multiplication.",
      strategicEvaluation: "Diabetes insipidus (lack of ADH) vs Diabetes mellitus (insulin deficiency/resistance).",
      commonMisconceptions: ["Saying capillaries vasoconstrict (arterioles vasoconstrict; capillaries lack smooth muscle)."],
      realWorldConnections: "Hemodialysis uses countercurrent dialysate flow to clear urea while preserving plasma glucose and electrolytes.",
    },
    cases: [
      {
        id: "case-d3-3",
        title: "Desert Kangaroo Rat Loop of Henle Adaptation",
        domainOrContext: "Comparative Renal Physiology",
        biologicalMechanism: "Extra-long Loops of Henle generate extreme medullary hypertonicity, concentrating urine >14× plasma.",
        concepts: ["homeostatic-feedback", "evolutionary-adaptation"],
        syllabusLink: "D3.3 (HL) / B4.1",
        quantitativeInsight: "Urine osmolarity reaches >5000 mOsm L⁻¹ (vs ~1200 mOsm L⁻¹ max in humans).",
      },
    ],
    conceptTracking: [
      { conceptId: "homeostatic-feedback", intensity: 5, manifestation: "Insulin/glucagon, hypothalamus, and ADH loops." },
    ],
    examPromptTakeaway: "Spell *glucagon* (hormone), *glycogen* (polysaccharide), and *glycogenesis/glycogenolysis* with precision.",
    examBlueprint: {
      paper1TrapPattern: "Confusing glomerulus ultrafiltration with selective reabsorption in the PCT.",
      paper2StructuredPrompt: "Distinguish between Type 1 and Type 2 diabetes and explain how insulin lowers blood glucose. [5]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Insulin promotes cellular glucose uptake and storage as glycogen.",
        keyMarkSchemePoints: "1) Type 1: autoimmune loss of β-cells, no insulin produced. 2) Type 2: target cells become insulin-resistant. 3) Insulin binds target receptors → stimulates GLUT4 insertion for glucose uptake in muscle/adipose and activates glycogenesis in liver.",
        dataOrUnitsTip: "Mention *GLUT4* transporters.",
      },
      pitfallsToAvoid: ["Saying insulin converts glucose into glycogen directly (it stimulates liver/muscle enzymes to do so)."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d4-1",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Ecosystems",
    topicCode: "D4.1",
    displayCode: "D4.1",
    syllabusRef: "IB Biology May 2027 · D4.1 Natural selection",
    title: "D4.1 Natural Selection",
    subtitle: "Selection Pressures, Stabilizing/Directional/Disruptive, Sexual Selection & Hardy–Weinberg [HL]",
    level: "SL / HL",
    strategicImportance: "DARWINIAN MECHANISM & HARDY–WEINBERG [HL]",
    readingTimeMinutes: 7,
    summary:
      "Overproduction, heritable variation, and differential survival/reproduction shift allele frequencies across generations. HL applies the Hardy–Weinberg equilibrium ($p^2 + 2pq + q^2 = 1$) to detect evolutionary change.",
    speedReadBullets: [
      "Natural selection steps: heritable variation (mutation/meiosis) → overproduction & struggle → selection pressure → differential survival/reproduction → allele frequency shift.",
      "Selection modes: directional (antibiotic resistance, peppered moth), stabilizing (human birth weight), disruptive (beak size).",
      "Sexual selection (peacock tail) favors mating success even at a survival cost; artificial selection (selective breeding).",
      "[HL] Hardy–Weinberg equilibrium ($p+q=1$, $p^2+2pq+q^2=1$) requires 5 conditions: no mutation, random mating, no gene flow, infinite population (no drift), no selection.",
    ],
    primer5Min:
      "Natural selection is not random—mutation is random, while selection is non-random filtering by the environment. In HL, the Hardy–Weinberg equation serves as a null model: if observed genotype frequencies deviate from $p^2 : 2pq : q^2$, then evolution (selection, drift, migration, non-random mating, or mutation) is actively occurring in the gene pool.",
    subSections: [
      {
        id: "d4-1-s1",
        title: "Mechanism of Natural Selection & Selection Modes",
        marker: "D4.1.1 – D4.1.8",
        content:
          "Density-independent (abiotic climate) and density-dependent (predation, disease, competition) pressures shape fitness. *Biston betularia* (peppered moth) demonstrated directional selection as soot darkened bark, then reversed after clean-air laws.",
        analyticalTakeaway:
          "Always state *pre-existing heritable variation* first—organisms do not evolve traits 'in order to survive'.",
      },
      {
        id: "d4-1-s2",
        title: "Hardy–Weinberg Equilibrium & Gene Pool Shifts",
        marker: "D4.1.9 – D4.1.11 · HL ONLY",
        isHLOnly: true,
        content:
          "Given homozygous recessive phenotype frequency $q^2$, compute $q = \\sqrt{q^2}$, $p = 1 - q$, and heterozygote carrier frequency $2pq$. Any significant deviation from predicted frequencies indicates violation of Hardy–Weinberg assumptions (e.g., heterozygote advantage in sickle-cell trait under malaria).",
        analyticalTakeaway:
          "Never take the square root of the *dominant* phenotype frequency ($p^2 + 2pq$); always start from $q^2$.",
        keyFormulaOrFramework: "p + q = 1, \\qquad p^2 + 2pq + q^2 = 1",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d4-1-1",
        question: "[HL] In a population in Hardy–Weinberg equilibrium, 9% of individuals show a recessive trait. Calculate the frequency of heterozygote carriers.",
        promptType: "calculation",
        hints: ["q² = 0.09 → find q, then p, then 2pq."],
        modelAnswer: "q² = 0.09 → q = √0.09 = 0.3. p = 1 − 0.3 = 0.7. Heterozygotes = 2pq = 2(0.7)(0.3) = 0.42 (42%).",
        keyTermsToInclude: ["q = 0.3", "p = 0.7", "2pq = 0.42", "42%"],
        formulaUsed: "p^2 + 2pq + q^2 = 1",
      },
    ],
    analysis: {
      coreThesis: "Differential reproductive success converts heritable variation into adaptive allele-frequency shifts.",
      theoreticalFoundations: "Darwin–Wallace natural selection + Fisher/Wright/Haldane population genetics.",
      strategicEvaluation: "Balancing selection maintains deleterious alleles (e.g., $Hb^S$ heterozygotes resist *Plasmodium* malaria).",
      commonMisconceptions: ["Saying individuals 'adapt' genetically during their lifetime."],
      realWorldConnections: "Tracking insecticide resistance (*kdr* alleles) in *Anopheles* mosquitoes.",
    },
    cases: [
      {
        id: "case-d4-1",
        title: "Heterozygote Advantage: HbA/HbS & Malaria",
        domainOrContext: "Evolutionary Genetics",
        biologicalMechanism: "HbS homozygotes suffer sickle-cell disease, HbA homozygotes are vulnerable to severe malaria, while HbA/HbS heterozygotes have highest fitness in endemic regions.",
        concepts: ["evolutionary-adaptation"],
        syllabusLink: "D4.1",
        quantitativeInsight: "Maintains $Hb^S$ allele frequency at 10–20% in West/Central Africa.",
      },
    ],
    conceptTracking: [
      { conceptId: "evolutionary-adaptation", intensity: 5, manifestation: "Selection pressures filter pre-existing alleles." },
    ],
    examPromptTakeaway: "Use the 5-step natural selection checklist: Variation → Overproduction → Selection Pressure → Differential Reproduction → Allele Frequency ↑.",
    examBlueprint: {
      paper1TrapPattern: "Taking √(dominant phenotype) instead of √(recessive phenotype = q²) in Hardy–Weinberg.",
      paper2StructuredPrompt: "Explain how antibiotic resistance evolves in a bacterial population. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Natural selection acts on pre-existing random mutations.",
        keyMarkSchemePoints: "1) Random mutation (or plasmid transfer) produces a few bacteria with resistance allele before antibiotic exposure. 2) Antibiotic acts as a selection pressure, killing susceptible bacteria. 3) Resistant bacteria survive, reproduce by binary fission, and pass on the allele. 4) Frequency of resistance allele increases in the population.",
        dataOrUnitsTip: "Explicitly state mutations are *random / pre-existing*.",
      },
      pitfallsToAvoid: ["Saying 'the antibiotic caused the bacteria to mutate to survive'."],
    },
    primaryFormulas: ["p + q = 1", "p^2 + 2pq + q^2 = 1"],
  },
  {
    id: "bio-d4-2",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Ecosystems",
    topicCode: "D4.2",
    displayCode: "D4.2",
    syllabusRef: "IB Biology May 2027 · D4.2 Stability and change",
    title: "D4.2 Stability & Change",
    subtitle: "Ecosystem Resilience, Tipping Points, Keystone Species & Eutrophication",
    level: "SL / HL",
    strategicImportance: "ECOSYSTEM DYNAMICS & SUCCESSION",
    readingTimeMinutes: 6,
    summary:
      "Stable ecosystems resist disturbance through biodiversity and negative feedback, but crossing tipping points (deforestation, eutrophication) shifts them to degraded states. Primary and secondary succession rebuild communities over time.",
    speedReadBullets: [
      "Stability = resistance (withstanding disturbance) + resilience (speed of recovery).",
      "Keystone species (e.g., sea otters, wolves, fig trees) exert disproportionate control over community structure.",
      "Amazon rainforest tipping point: ~20–25% deforestation disrupts transpiration-driven regional rainfall, risking savannization.",
      "Eutrophication: N/P fertilizer runoff → algal bloom → light blocked → submerged plants die → saprotrophic bacteria respire O₂ → hypoxia/fish kills; bioaccumulation vs biomagnification.",
    ],
    primer5Min:
      "Ecosystems are dynamic equilibria sustained by nutrient cycling, energy supply, and species redundancy. When a keystone species is removed or nitrate runoff triggers eutrophication, positive feedback loops can push the system past a tipping point into an alternative stable state—such as a clear coral reef flipping to algae-dominated rubble, or a rainforest drying into savanna.",
    subSections: [
      {
        id: "d4-2-s1",
        title: "Resilience, Keystone Species & Tipping Points",
        marker: "D4.2.1 – D4.2.6",
        content:
          "High species richness and genetic diversity buffer ecosystems against shocks. Sustainable harvesting requires keeping extraction below maximum sustainable yield (MSY). Deforestation in the Amazon reduces evapotranspiration, triggering a drying positive feedback loop.",
        analyticalTakeaway:
          "Contrast *bioaccumulation* (toxin buildup in one organism over time) with *biomagnification* (concentration increasing across trophic levels, e.g. DDT/mercury).",
      },
      {
        id: "d4-2-s2",
        title: "Ecological Succession & Eutrophication",
        marker: "D4.2.7 – D4.2.11",
        content:
          "**Primary succession** begins on bare rock/lava with pioneer lichens/mosses building soil; **secondary succession** follows disturbance (fire, abandoned farmland) where soil and seed banks remain. Arrested succession (plagioclimax) is maintained by grazing or mowing.",
        analyticalTakeaway:
          "During eutrophication, **BOD (Biochemical Oxygen Demand)** spikes as aerobic saprotrophs decompose dead algae.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d4-2-1",
        question: "Outline the sequence of events by which agricultural fertilizer runoff causes aquatic dead zones (eutrophication).",
        promptType: "mechanism",
        hints: ["Nitrates/phosphates → algal bloom → shading → saprotrophic respiration → hypoxia."],
        modelAnswer:
          "Leached nitrates and phosphates trigger rapid algal blooms on the water surface. Dense algae block sunlight from submerged macrophytes, which die. Saprotrophic bacteria decompose the dead algae and plants, multiplying rapidly and consuming dissolved O₂ via aerobic respiration, causing hypoxia and fish kills.",
        keyTermsToInclude: ["nitrates/phosphates", "algal bloom", "light blocked", "saprotrophic bacteria", "aerobic respiration", "hypoxia"],
      },
    ],
    analysis: {
      coreThesis: "Biodiversity and closed-loop nutrient cycling stabilize ecosystems until anthropogenic forcing crosses irreversible tipping points.",
      theoreticalFoundations: "Alternative stable states + trophic biomagnification.",
      strategicEvaluation: "Restoring keystone predators can reverse trophic cascades.",
      commonMisconceptions: ["Saying algae 'use up all the oxygen by photosynthesis' during eutrophication (it is *bacterial decomposition* of dead algae that depletes O₂)."],
      realWorldConnections: "Gulf of Mexico seasonal hypoxic dead zone driven by Mississippi agricultural runoff.",
    },
    cases: [
      {
        id: "case-d4-2",
        title: "Sea Otters, Urchins & Kelp Forest Resilience",
        domainOrContext: "Keystone Species Ecology",
        biologicalMechanism: "Sea otters suppress herbivorous sea urchins; otter loss triggers urchin barrens and kelp collapse.",
        concepts: ["ecological-interdependence"],
        syllabusLink: "D4.2",
        quantitativeInsight: "Kelp forests store 10–20× more carbon per m² than urchin barrens.",
      },
    ],
    conceptTracking: [
      { conceptId: "ecological-interdependence", intensity: 5, manifestation: "Keystone control and eutrophication cascades." },
    ],
    examPromptTakeaway: "In eutrophication, always name *saprotrophic/aerobic bacteria* consuming *dissolved O₂* during decomposition.",
    examBlueprint: {
      paper1TrapPattern: "Confusing bioaccumulation (within one trophic level/lifetime) with biomagnification (up the food chain).",
      paper2StructuredPrompt: "Distinguish between primary and secondary succession. [3]",
      commandTerm: "Compare and contrast",
      idealSolutionBreakdown: {
        statePrinciples: "Both involve sequential community replacement toward a climax community.",
        keyMarkSchemePoints: "1) Primary starts on bare inorganic substrate with no soil (e.g. volcanic rock); secondary starts where soil already exists after disturbance (e.g. wildfire). 2) Primary requires pioneer species (lichens) to weather rock and form soil, so it is much slower than secondary.",
        dataOrUnitsTip: "Mention *humus / soil organic matter*.",
      },
      pitfallsToAvoid: ["Saying secondary succession has no pioneer species (it has fast-growing herbaceous pioneers)."],
    },
    primaryFormulas: [],
  },
  {
    id: "bio-d4-3",
    themeId: "theme-d",
    themeNumber: 4,
    orgLevel: "Ecosystems",
    topicCode: "D4.3",
    displayCode: "D4.3",
    syllabusRef: "IB Biology May 2027 · D4.3 Climate change",
    title: "D4.3 Climate Change",
    subtitle: "Greenhouse Effect, Positive Feedbacks, Phenology Shifts & Ocean Acidification",
    level: "SL / HL",
    strategicImportance: "CLIMATE BIOLOGY · PHENOLOGY & FEEDBACK LOOPS",
    readingTimeMinutes: 7,
    summary:
      "Anthropogenic CO₂ and CH₄ emissions amplify the greenhouse effect, triggering albedo and permafrost positive feedbacks, poleward range shifts, phenological trophic mismatches, and marine ocean acidification.",
    speedReadBullets: [
      "Greenhouse gases (CO₂, CH₄, H₂O, N₂O) absorb outgoing longwave infrared radiation re-emitted by Earth's surface.",
      "Positive feedbacks: ice-albedo loss (less reflection → more warming) & permafrost thaw (releases CH₄ + CO₂).",
      "Biological impacts: poleward/upslope range shifts, earlier flowering/migration (phenological mismatch, e.g., great tits & winter moth caterpillars).",
      "Ocean acidification: $\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-$ lowers pH and depletes $\\text{CO}_3^{2-}$, impairing coral/mollusc calcification.",
    ],
    primer5Min:
      "Climate change is a biological crisis as much as a physical one. As warming accelerates, species shift poleward or upslope—yet different trophic levels respond at different rates, breaking ancient synchronies (phenology). Meanwhile, the oceans absorb ~25–30% of anthropogenic CO₂, forming carbonic acid that strips carbonate ions ($\\text{CO}_3^{2-}$) needed by reef-building corals and pteropods.",
    subSections: [
      {
        id: "d4-3-s1",
        title: "Greenhouse Mechanism, Feedback Loops & Carbon Sequestration",
        marker: "D4.3.1 – D4.3.6",
        content:
          "Shortwave solar UV/visible light passes through the atmosphere and warms Earth; Earth emits longwave infrared radiation absorbed and re-radiated by greenhouse gases. Reforestation and peatland restoration (rewetting) act as natural carbon sequestration strategies.",
        analyticalTakeaway:
          "Distinguish *global warming* (rising mean surface temperature) from *ocean acidification* (driven by dissolved CO₂ chemistry, not heat).",
        keyFormulaOrFramework: "\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-",
      },
      {
        id: "d4-3-s2",
        title: "Range Shifts, Phenological Mismatch & Coral Bleaching",
        marker: "D4.3.7 – D4.3.11",
        content:
          "Warmer springs advance budburst and insect emergence, while migratory birds cued by **photoperiod** (day length) arrive too late for peak caterpillar biomass (phenological mismatch). Elevated sea temperatures cause corals to expel photosynthetic zooxanthellae (**coral bleaching**), starving the polyp.",
        analyticalTakeaway:
          "Explain *why* photoperiod-cued species cannot adjust as fast as temperature-cued species.",
      },
    ],
    checkUnderstanding: [
      {
        id: "cu-d4-3-1",
        question: "Explain how ocean acidification threatens marine calcifiers such as reef-building corals.",
        promptType: "explain",
        hints: ["Write the carbonic acid / carbonate equilibrium."],
        modelAnswer:
          "Atmospheric CO₂ dissolves in seawater to form carbonic acid (H₂CO₃), which dissociates into H⁺ and HCO₃⁻, lowering ocean pH. Excess H⁺ reacts with carbonate ions (CO₃²⁻) to form more HCO₃⁻, reducing the concentration of CO₃²⁻ available for corals to precipitate CaCO₃ skeletons.",
        keyTermsToInclude: ["carbonic acid", "H+", "pH drops", "carbonate ions (CO3^2-)", "CaCO3"],
        formulaUsed: "\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-",
      },
    ],
    analysis: {
      coreThesis: "Anthropogenic carbon fluxes simultaneously warm habitats, desynchronize trophic phenology, and acidify marine calcification.",
      theoreticalFoundations: "Radiative forcing + carbonate buffer chemistry + photoperiod vs thermal cues.",
      strategicEvaluation: "Mitigation (reducing emissions/rewilding) vs adaptation.",
      commonMisconceptions: ["Confusing the ozone hole (UV-B) with the greenhouse effect (longwave IR)."],
      realWorldConnections: "Dutch Great Tit (*Parus major*) vs Winter Moth (*Operophtera brumata*) phenological mismatch.",
    },
    cases: [
      {
        id: "case-d4-3",
        title: "Great Tit & Winter Moth Caterpillar Phenological Mismatch",
        domainOrContext: "Climate Change Ecology",
        biologicalMechanism: "Oak budburst and caterpillar peak shifted 2 weeks earlier with spring warming, while bird egg-laying lagged.",
        concepts: ["ecological-interdependence", "evolutionary-adaptation"],
        syllabusLink: "D4.3",
        quantitativeInsight: "Chick fledging mass and survival drop significantly when hatch date misses caterpillar peak.",
      },
    ],
    conceptTracking: [
      { conceptId: "ecological-interdependence", intensity: 5, manifestation: "Trophic desynchronization and coral bleaching." },
    ],
    examPromptTakeaway: "Keep *coral bleaching* (thermal expulsion of zooxanthellae) distinct from *ocean acidification* (CO₂ → H⁺ → reduced CO₃²⁻).",
    examBlueprint: {
      paper1TrapPattern: "Saying greenhouse gases absorb incoming *shortwave UV* from the sun (ozone absorbs UV; greenhouse gases absorb outgoing *longwave IR*).",
      paper2StructuredPrompt: "Explain two positive feedback loops that accelerate global warming. [4]",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Positive feedback amplifies an initial warming perturbation.",
        keyMarkSchemePoints: "1) Ice-albedo feedback: warming melts reflective snow/ice, exposing dark ocean/land that absorbs more solar radiation, causing further warming. 2) Permafrost thaw: warming melts permafrost, allowing microbes to decompose trapped organic matter and release CH₄ and CO₂, amplifying the greenhouse effect.",
        dataOrUnitsTip: "Note CH₄ has much higher warming potential per molecule than CO₂.",
      },
      pitfallsToAvoid: ["Saying 'global warming causes the ozone hole'."],
    },
    primaryFormulas: ["\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3 \\rightleftharpoons \\text{H}^+ + \\text{HCO}_3^-"],
  },
];
