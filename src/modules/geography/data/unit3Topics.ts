import type { TopicData } from "./types";

export const UNIT_3_TOPICS: TopicData[] = [
  {
    id: "geo-3-1",
    unitId: "unit-3",
    unitNumber: 3,
    topicCode: "3.1",
    displayCode: "3.1",
    syllabusRef: "Unit 3 · HL Extension (HL ONLY)",
    title: "Power, Places & Networks",
    subtitle: "Global superpowers, KOF globalization index, TNCs, financial hubs, and time–space compression.",
    level: "HL ONLY",
    strategicImportance:
      "Paper 3 HL synthesis: connects global trade/FDI hubs, TNC supply chains, and geopolitical power asymmetries (core–periphery vs. multipolar networks).",
    readingTimeMinutes: 15,
    summary:
      "Globalization operates through uneven networks of capital, trade, data, and people anchored in global cities and industrial hubs. Transnational Corporations (TNCs), sovereign superpowers, and multilateral institutions shape where value accrues and who bears environmental or labour costs.",
    speedReadBullets: [
      "KOF Globalization Index measures economic, social, and political integration across nations on a 0–100 scale.",
      "Time–space compression (David Harvey) shrinks effective distance via fibre-optic cables, containerization, and air freight.",
      "Global Hubs (New York, London, Tokyo, Singapore) concentrate headquarters, finance, and R&D; 'switched-off' peripheries suffer marginalization.",
      "TNCs fragment production across Global Value Chains (GVCs), capturing high-margin IP/marketing in core hubs while outsourcing assembly.",
      "Power shifts from unipolar US hegemony toward multipolar networks involving China (Belt & Road Initiative), EU regulatory blocs, and regional alliances."
    ],
    primer5Min:
      "Globalization is neither uniform nor flat: it connects high-value nodes while bypassing entire rural and conflict-affected regions. Driven by container shipping, submarine fibre cables, and trade liberalization, TNCs orchestrate global value chains spanning continents. Power resides with actors who set standards, control financial clearinghouses, and command logistics corridors—creating intense competition between established Western hubs and rising Asian powers.",
    subSections: [
      {
        id: "geo-3-1-s1",
        title: "Measuring Globalization & Time–Space Compression",
        marker: "3.1.1",
        isHLOnly: true,
        content:
          "Globalization is quantified through composite metrics such as the KOF Globalization Index (economic flows/restrictions, social interpersonal/informational/cultural ties, political embassies/treaties) and the Kearney Global Cities Index. Technological revolutions—standardized TEU shipping containers, wide-body air freight, and submarine fibre-optic cables—drive time–space compression, making global supply chains faster and cheaper while magnifying vulnerability to chokepoints (Suez Canal, Strait of Malacca).",
        analyticalTakeaway:
          "Critique composite indices like KOF by noting small open entrepôts (Singapore, Switzerland) score higher than continental giants (USA, China) because trade is measured relative to GDP."
      },
      {
        id: "geo-3-1-s2",
        title: "Superpowers, Trade Blocs & Multilateral Power",
        marker: "3.1.2",
        isHLOnly: true,
        content:
          "Global power combines hard military/economic leverage with soft cultural and institutional influence. Multilateral bodies (WTO, IMF, World Bank, UN Security Council) reflect post-1945 power distributions, prompting rising economies to build parallel institutions (AIIB, BRICS+) and infrastructure corridors such as China's Belt and Road Initiative (BRI). Regional trade blocs (EU, USMCA, AfCFTA) deepen internal integration while erecting external rules of origin.",
        analyticalTakeaway:
          "Always contrast institutional/multilateral power with bilateral infrastructure diplomacy (e.g., BRI port investments)."
      },
      {
        id: "geo-3-1-s3",
        title: "TNCs, Global Value Chains & Switched-Off Places",
        marker: "3.1.3",
        isHLOnly: true,
        content:
          "Transnational Corporations (e.g., Apple, TSMC, Nestlé) organize production via outsourcing, offshoring, and Special Economic Zones (SEZs). Along the 'Smile Curve', highest value-added occurs at upstream R&D/design and downstream branding/IP, while midstream physical assembly earns thin margins. Regions lacking port access, stable governance, or digital infrastructure remain 'switched-off' from FDI inflows.",
        analyticalTakeaway:
          "Apply the 'Smile Curve' to explain why manufacturing exports alone do not guarantee high domestic income capture."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-3-1-c1",
        question:
          "Explain why a country with a large economy like the United States can rank lower on the KOF Economic Globalization Index than a small nation like Belgium or Singapore.",
        promptType: "explain",
        hints: [
          "Consider how trade and FDI flows are normalized (as % of GDP).",
          "Think about domestic market size versus entrepôt trade."
        ],
        modelAnswer:
          "KOF economic indicators normalize trade and FDI relative to total GDP. Large continental economies like the US generate vast domestic consumption and internal trade, yielding a lower trade-to-GDP ratio than small, open entrepôt hubs like Singapore or Belgium whose economies rely heavily on cross-border re-exports and financial flows.",
        keyTermsToInclude: ["KOF Index", "trade-to-GDP ratio", "entrepôt", "normalization"]
      }
    ],
    analysis: {
      coreThesis:
        "Global power and economic flows concentrate in connected urban nodes and TNC networks, creating structural core–periphery asymmetries.",
      theoreticalFoundations:
        "World-Systems Theory (Wallerstein Core/Semi-Periphery/Periphery), Time–Space Compression (Harvey), Castells' Network Society.",
      strategicEvaluation:
        "Globalization lifts millions out of extreme poverty in connected manufacturing hubs, yet widens spatial inequality and supply-chain fragility.",
      commonMisconceptions: [
        "Assuming globalization erases borders—sovereign states and trade blocs actively regulate tariffs, visas, and data.",
        "Confusing outsourcing (contracting a third party) with offshoring (relocating operations abroad)."
      ],
      realWorldConnections:
        "China Belt and Road Initiative (Gwadar, Mombasa–Nairobi railway), TSMC semiconductor chokepoint, Suez Canal disruptions."
    },
    cases: [
      {
        id: "geo-3-1-case1",
        title: "China's Belt and Road Initiative (BRI)",
        regionOrContext: "Eurasia & East Africa · Geopolitical Network",
        geographicMechanism:
          "State-backed loans construct ports, railways, and power grids across 140+ countries, expanding trade corridors while sparking debt-sustainability debates.",
        concepts: ["power", "spatial-interaction", "scale"],
        syllabusLink: "3.1 Power, Places & Networks · Infrastructure Diplomacy",
        quantitativeInsight: ">140 partner countries; >$1 trillion cumulative infrastructure commitments."
      }
    ],
    conceptTracking: [
      { conceptId: "power", intensity: 5, manifestation: "TNC value-chain control, WTO/IMF voting shares, and BRI leverage." },
      { conceptId: "spatial-interaction", intensity: 5, manifestation: "Fibre-optic data, shipping containers, and financial clearing flows." }
    ],
    examPromptTakeaway:
      "For Paper 3 essays, explicitly weave 2–3 key concepts (Power, Scale, Spatial Interaction) into the thesis and topic sentences.",
    examBlueprint: {
      paper1TrapPattern: "Conflating outsourcing with offshoring in TNC terminology.",
      paper2StructuredPrompt: "Evaluate the role of transnational corporations (TNCs) in shaping global economic disparities.",
      commandTerm: "Evaluate",
      idealSolutionBreakdown: {
        statePrinciples: "Define TNCs, Global Value Chains, and FDI.",
        showWorking: "Contrast job creation, technology transfer, and SEZ growth against profit repatriation, tax avoidance, and race-to-the-bottom wages.",
        caseAndScale: "Cite Apple/Foxconn Smile Curve dynamics vs. switched-off sub-Saharan interior regions."
      },
      pitfallsToAvoid: [
        "Ignoring state agency—governments actively court or regulate TNCs through SEZs and tariffs.",
        "Treating 'globalization' as purely economic without cultural/political dimensions."
      ]
    }
  },
  {
    id: "geo-3-2",
    unitId: "unit-3",
    unitNumber: 3,
    topicCode: "3.2",
    displayCode: "3.2",
    syllabusRef: "Unit 3 · HL Extension (HL ONLY)",
    title: "Human Development & Diversity",
    subtitle: "Development indices (HDI, GII, MPI), cultural diffusion vs. glocalization, and diaspora networks.",
    level: "HL ONLY",
    strategicImportance:
      "Assesses multidimensional development beyond GDP alongside cultural homogenization vs. hybridity, indigenous resilience, and diaspora remittances.",
    readingTimeMinutes: 14,
    summary:
      "Human development extends beyond income to encompass health, education, gender equity, and civic freedom. Simultaneously, global media, consumer brands, and migration foster both cultural homogenization ('McDonaldization') and creative 'glocalization', while diasporas link origin and host communities financially and culturally.",
    speedReadBullets: [
      "Composite indicators (HDI, Inequality-adjusted IHDI, Gender Inequality Index GII, Multidimensional Poverty Index MPI) expose deprivations hidden by GDP per capita.",
      "Microfinance and mobile money (e.g., M-Pesa in Kenya) expand financial inclusion for unbanked rural and female entrepreneurs.",
      "Cultural imperialism/homogenization spreads standardized global brands and English media; glocalization adapts global products to local tastes.",
      "Diaspora networks transfer remittances, skills ('brain gain'), and transnational political/cultural ties.",
      "Anti-globalization and cultural protectionism resist homogenization via language quotas, geographic indications, and indigenous autonomy."
    ],
    primer5Min:
      "A high GDP per capita can mask stark inequality, gender exclusion, or poor healthcare—making composite indices like HDI, GII, and MPI essential. Culturally, global connectivity neither simply erases local traditions nor leaves them untouched: multinational brands adapt menus and messaging ('glocalization'), while diasporas weave hybrid identities and send hundreds of billions in remittances back home.",
    subSections: [
      {
        id: "geo-3-2-s1",
        title: "Development Indicators & Empowerment",
        marker: "3.2.1",
        isHLOnly: true,
        content:
          "Single-variable income measures (GNI per capita) miss distribution and capability gaps. The Human Development Index (HDI) combines life expectancy, mean/expected years of schooling, and GNI per capita (PPP). The Inequality-adjusted HDI (IHDI) discounts for internal inequality, while the Gender Inequality Index (GII) captures maternal mortality, adolescent birth rates, parliamentary seats, and labour participation. Digital financial inclusion (Kenya's M-Pesa) and female education serve as high-leverage multipliers for empowerment.",
        analyticalTakeaway:
          "Compare GDP/GNI with HDI or GII to demonstrate why economic growth alone does not guarantee equitable human development."
      },
      {
        id: "geo-3-2-s2",
        title: "Cultural Diffusion, Homogenization & Glocalization",
        marker: "3.2.2",
        isHLOnly: true,
        content:
          "Global media conglomerates, social platforms, and retail chains accelerate cultural diffusion, raising concerns over homogenization ('Westernization' or 'McDonaldization') and language extinction. Yet local consumers actively reshape global imports through glocalization (e.g., McDonald's McAloo Tikki in India, K-Pop blending Western hip-hop with Korean aesthetics) and hybridity. States and communities also deploy cultural protectionism (France's French-music radio quotas, UNESCO Intangible Heritage).",
        analyticalTakeaway:
          "Avoid simplistic 'homogenization vs. preservation' binaries; analyze active hybridization and glocalization."
      },
      {
        id: "geo-3-2-s3",
        title: "Diasporas, Remittances & Indigenous Resilience",
        marker: "3.2.3",
        isHLOnly: true,
        content:
          "Diaspora communities sustain transnational households through financial remittances (> $650 billion/yr globally to LMICs, surpassing ODA) and social remittances (ideas, technical skills, civic norms). Meanwhile, indigenous peoples navigate tension between integration into global markets and safeguarding ancestral land, languages, and ecological knowledge.",
        analyticalTakeaway:
          "Distinguish financial remittances from social/knowledge remittances when evaluating diaspora impacts."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-3-2-c1",
        question:
          "Distinguish between cultural homogenization and glocalization using specific real-world examples.",
        promptType: "explain",
        hints: [
          "Define homogenization as convergence toward uniform global traits.",
          "Define glocalization as adapting global brands/media to local cultural norms."
        ],
        modelAnswer:
          "Cultural homogenization refers to global media, English language dominance, and standardized consumer brands displacing local diversity (e.g., identical global fast-fashion chains). Glocalization occurs when TNCs adapt global formats to local tastes and regulations—such as McDonald's excluding beef and offering vegetarian McSpicy Paneer burgers across India.",
        keyTermsToInclude: ["Cultural homogenization", "glocalization", "hybridity", "diffusion"]
      }
    ],
    analysis: {
      coreThesis:
        "True development requires multidimensional capability expansion (health, education, gender equity), while global cultural flows generate hybrid glocalization alongside contested homogenization.",
      theoreticalFoundations:
        "Amartya Sen's Capability Approach, GII/HDI/MPI frameworks, Robertson's Glocalization.",
      strategicEvaluation:
        "Investing in women's education, digital banking, and protected cultural pluralism produces durable human development gains.",
      commonMisconceptions: [
        "Confusing GII (higher score = worse inequality) with HDI (higher score = better development).",
        "Assuming remittances go only to luxury consumption—studies show high shares fund schooling, housing, and healthcare."
      ],
      realWorldConnections:
        "M-Pesa mobile banking in Kenya, global rise of K-Pop/Bollywood hybridity, French cultural quotas."
    },
    cases: [
      {
        id: "geo-3-2-case1",
        title: "Kenya's M-Pesa — Mobile Financial Inclusion",
        regionOrContext: "East Africa · LIC/LMIC",
        geographicMechanism:
          "SMS-based mobile money bypassed brick-and-mortar bank deserts, allowing rural women and micro-enterprises to save, insure, and receive urban remittances safely.",
        concepts: ["possibility", "power", "scale"],
        syllabusLink: "3.2 Human Development · Empowerment & Technology",
        quantitativeInsight: "Used by >30 million Kenyans; credited with lifting ~2% of Kenyan households out of extreme poverty."
      }
    ],
    conceptTracking: [
      { conceptId: "place", intensity: 5, manifestation: "Local cultural identity, indigenous landscapes, and glocal adaptation." },
      { conceptId: "power", intensity: 4, manifestation: "Gender inequality structures and global media ownership." }
    ],
    examPromptTakeaway:
      "Explain why IHDI or GII reveals disparities that national GNI per capita averages conceal.",
    examBlueprint: {
      paper1TrapPattern: "Reading GII backwards (0 = complete equality, 1 = extreme inequality).",
      paper2StructuredPrompt: "To what extent does globalization lead to cultural homogenization rather than cultural diversity?",
      commandTerm: "To what extent",
      idealSolutionBreakdown: {
        statePrinciples: "Define cultural homogenization, glocalization, and hybridity.",
        showWorking: "Present evidence of linguistic/brand standardization vs. local adaptation and reverse cultural flows.",
        caseAndScale: "Contrast global streaming/retail dominance with Indian glocalized menus and global K-Pop."
      },
      pitfallsToAvoid: [
        "Treating culture as static rather than continuously evolving.",
        "Ignoring state cultural policies (quotas, language laws)."
      ]
    }
  },
  {
    id: "geo-3-3",
    unitId: "unit-3",
    unitNumber: 3,
    topicCode: "3.3",
    displayCode: "3.3",
    syllabusRef: "Unit 3 · HL Extension (HL ONLY)",
    title: "Global Risks & Resilience",
    subtitle: "Transboundary pollution, cyber/supply-chain shocks, geopolitical nationalism, and local resilience.",
    level: "HL ONLY",
    strategicImportance:
      "Capstone HL synthesis: analyzes systemic global risks (e-waste, microplastics, cyberattacks, pandemics, reshoring) and builds multi-scale resilience strategies.",
    readingTimeMinutes: 14,
    summary:
      "Hyper-connected global networks transmit shocks at unprecedented speed: pandemics, cyberattacks, submarine-cable cuts, transboundary pollution, and trade wars cascade across borders. Building resilience requires redundant supply chains ('friend-shoring'), strict transboundary environmental treaties, and empowered local communities.",
    speedReadBullets: [
      "Transboundary pollution shifts externalities across borders: Basel Convention regulates hazardous e-waste exports, yet informal dumping persists (e.g., Agbogbloshie).",
      "Carbon leakage and 'polluting industry relocation' occur when firms move heavy manufacturing to countries with laxer environmental enforcement.",
      "Systemic network risks include just-in-time (JIT) supply-chain fragility, submarine-cable/cyber vulnerabilities, and antimicrobial/pandemic spread.",
      "Rising resource nationalism, tariffs, and 'reshoring/friend-shoring' challenge pure cost-minimizing globalization.",
      "Resilience frameworks emphasize redundancy, local food/energy diversification, and binding international agreements (Montreal Protocol model)."
    ],
    primer5Min:
      "The efficiency of hyper-connected 'just-in-time' globalization is also its primary fragility: a single port closure, pandemic, or cyberattack can stall factories worldwide. Meanwhile, wealthy economies routinely externalize e-waste, plastics, and embodied carbon onto lower-income nations. Building genuine global resilience demands shifting from brittle cost minimization toward redundant supply chains, circular local production, and enforceable transboundary environmental law.",
    subSections: [
      {
        id: "geo-3-3-s1",
        title: "Transboundary Pollution & Environmental Justice",
        marker: "3.3.1",
        isHLOnly: true,
        content:
          "Pollutants cross sovereign borders through winds, rivers, ocean currents, and trade. Electronic waste (e-waste) exported from HICs under 'reuse' loopholes often ends up in informal dismantling yards (e.g., Ghana, South Asia), leaching lead, dioxins, and heavy metals into soils and workers' bloodstreams despite the 1989 Basel Convention. Similarly, marine microplastics accumulate in subtropical ocean gyres, while HICs offshore high-carbon manufacturing ('carbon leakage').",
        analyticalTakeaway:
          "Always trace both physical transboundary transport (winds/currents) and trade-mediated pollution offshoring (e-waste/carbon)."
      },
      {
        id: "geo-3-3-s2",
        title: "Supply-Chain Shocks, Cyber Risks & Geopolitical Friction",
        marker: "3.3.2",
        isHLOnly: true,
        content:
          "Just-in-time (JIT) manufacturing minimizes warehouse inventories at the expense of shock buffers. When COVID-19 lockdowns, the 2021 Ever Given Suez blockage, or Red Sea shipping attacks occurred, semiconductor and medical supply chains stalled globally. Simultaneously, cyberattacks on energy grids, ports, and financial networks create non-territorial security threats. In response, states increasingly pursue reshoring, 'friend-shoring', and strategic stockpiling.",
        analyticalTakeaway:
          "Contrast efficiency (JIT cost minimization) with resilience (just-in-case redundancy and regional diversification)."
      },
      {
        id: "geo-3-3-s3",
        title: "Resilience Building & Localism",
        marker: "3.3.3",
        isHLOnly: true,
        content:
          "Multilateral treaties succeed when paired with clear phase-outs and technology-transfer funds—exemplified by the 1987 Montreal Protocol eliminating 98%+ of ozone-depleting CFCs. At local and national scales, resilience involves distributed renewable microgrids, urban agriculture, diverse supplier networks, and civil-society rapid response.",
        analyticalTakeaway:
          "Use the Montreal Protocol as a benchmark for effective global environmental governance and contrast its binding targets with weaker voluntary pledges."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-3-3-c1",
        question:
          "Explain why just-in-time (JIT) global supply chains increase systemic vulnerability to localized disruptions.",
        promptType: "explain",
        hints: [
          "Consider inventory buffers and single-source geographic concentration.",
          "Give a chokepoint example."
        ],
        modelAnswer:
          "JIT systems hold minimal buffer inventory and rely on hyper-specialized geographic hubs (e.g., advanced semiconductors in Taiwan) connected by maritime chokepoints (Suez, Malacca). A localized shock—such as a canal blockage, earthquake, or lockdown—immediately halts downstream assembly worldwide because no reserve stock exists.",
        keyTermsToInclude: ["Just-in-time (JIT)", "buffer stock", "chokepoint", "systemic risk", "reshoring"]
      }
    ],
    analysis: {
      coreThesis:
        "Hyper-connectivity amplifies systemic shocks and enables pollution offshoring, requiring enforceable global treaties alongside redundant, locally anchored resilience.",
      theoreticalFoundations:
        "Systemic Network Risk, Environmental Justice & Pollution Havens, Just-in-Time vs. Just-in-Case Resilience.",
      strategicEvaluation:
        "Pure efficiency maximizes short-term corporate margins; resilient 21st-century systems price in externalities and maintain strategic redundancy.",
      commonMisconceptions: [
        "Thinking the Basel Convention completely stopped e-waste exports—mislabelled 'second-hand electronics' bypass customs.",
        "Equating reshoring with total de-globalization rather than selective 'friend-shoring' of strategic tech."
      ],
      realWorldConnections:
        "Montreal Protocol ozone recovery, 2021 Suez Canal Ever Given blockage, EU Carbon Border Adjustment Mechanism (CBAM)."
    },
    cases: [
      {
        id: "geo-3-3-case1",
        title: "Montreal Protocol — Gold Standard of Global Resilience",
        regionOrContext: "Global Multilateral Treaty (1987)",
        geographicMechanism:
          "Legally binding phase-out schedules for CFCs paired with a Multilateral Fund helping LMICs adopt safe substitutes halted ozone depletion.",
        concepts: ["power", "possibility", "scale"],
        syllabusLink: "3.3 Global Risks & Resilience · Global Governance",
        quantitativeInsight: ">98% of ozone-depleting substances phased out; stratospheric ozone projected to recover by ~2066."
      }
    ],
    conceptTracking: [
      { conceptId: "spatial-interaction", intensity: 5, manifestation: "Cascading supply-chain shocks and transboundary pollutant flows." },
      { conceptId: "power", intensity: 4, manifestation: "Externalization of e-waste/carbon to LMICs and tariff/reshoring geopolitics." }
    ],
    examPromptTakeaway:
      "Always pair a global-scale risk (cyber, JIT chokepoint, e-waste) with a concrete local/national resilience response.",
    examBlueprint: {
      paper1TrapPattern: "Confusing the Basel Convention (hazardous waste) with the Montreal Protocol (ozone CFCs).",
      paper2StructuredPrompt: "Discuss the view that localism is more effective than global agreements in building resilience to global risks.",
      commandTerm: "Discuss",
      idealSolutionBreakdown: {
        statePrinciples: "Define resilience and distinguish local self-reliance from multilateral governance.",
        showWorking: "Show where localism excels (microgrids, urban food, supplier redundancy) and where global treaties are indispensable (CFCs, oceans, climate).",
        caseAndScale: "Contrast Montreal Protocol's global reach with local distributed energy/supply diversification."
      },
      pitfallsToAvoid: [
        "Ignoring economic costs of full reshoring/autarky.",
        "Failing to evaluate enforcement mechanisms of international treaties."
      ]
    }
  }
];
