import type { TopicData } from "./types";

export const UNIT_1_TOPICS: TopicData[] = [
  {
    id: "geo-1-1",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.1",
    displayCode: "1.1",
    syllabusRef: "Unit 1 · Core (SL & HL)",
    title: "Changing Population",
    subtitle: "Population distribution, demographic transition, ageing, and forced/economic migration.",
    level: "SL / HL",
    strategicImportance:
      "Core Paper 2 Unit 1 foundation: links physical/human distribution factors to demographic momentum, dependency ratios, and policy responses.",
    readingTimeMinutes: 14,
    summary:
      "Global population growth is slowing overall, yet stark regional contrasts persist between youthful high-fertility regions in Sub-Saharan Africa and rapidly ageing societies in East Asia and Europe. Understanding population change requires analyzing natural increase, demographic transition stages, migration flows, and state population policies.",
    speedReadBullets: [
      "Population distribution is uneven: ~90% of humans live in the Northern Hemisphere, concentrated along coasts, river valleys, and temperate lowlands.",
      "Total Fertility Rate (TFR) replacement level is 2.1 children per woman; global TFR has fallen to ~2.3, driven by female education, urbanization, and contraception.",
      "Youthful populations create demographic dividends if jobs/education exist, whereas ageing populations raise old-age dependency ratios and pension pressures.",
      "Forced migration (refugees/IDPs) and voluntary labour migration reshape origin and destination demographics, remittances, and cultural landscapes.",
      "Pro-natalist (e.g., France, Singapore) and anti-natalist/empowerment policies demonstrate how governance alters demographic trajectories."
    ],
    primer5Min:
      "Population change is governed by the Demographic Balancing Equation: Natural Increase (CBR - CDR) plus Net Migration. Countries progress unevenly through the Demographic Transition Model (DTM): Stage 2 sees plunging mortality and rapid growth; Stage 3 sees falling fertility as female literacy and urban wages rise; Stages 4-5 exhibit low/negative growth and ageing pyramids. Meanwhile, internal rural-to-urban migration and international flows redistributing labour and remittances create complex opportunities and tensions at both origin and destination.",
    subSections: [
      {
        id: "geo-1-1-s1",
        title: "Population Distribution & Economic Development",
        marker: "1.1.1",
        content:
          "Global population density exhibits extreme spatial clustering at multiple scales. Physical factors—moderate climates, fertile alluvial soils, low-elevation coastal zones, and reliable freshwater—historically anchored dense settlements in South Asia, East Asia, and Western Europe. Human factors—agglomeration economies, trade hubs, colonial port infrastructure, and political stability—now reinforce mega-city corridors such as the Pearl River Delta and BosWash. Conversely, extreme aridity (Sahara), polar cold (Siberia), and high relief (Tibetan Plateau) sustain sparse densities (< 2 people/km^2).",
        analyticalTakeaway:
          "Always distinguish between population density (people per km^2) and distribution (spatial pattern), explaining both physical and human drivers.",
        keyFormulaOrFramework: "$D = \\frac{P}{A}$"
      },
      {
        id: "geo-1-1-s2",
        title: "Fertility, Mortality & The Demographic Dividend",
        marker: "1.1.2",
        content:
          "Crude Birth Rate (CBR), Total Fertility Rate (TFR), Infant Mortality Rate (IMR), and Life Expectancy capture population dynamics. As countries urbanize and expand female secondary education and access to family planning, TFR declines toward or below 2.1. During the transition, a temporary bulge in the working-age cohort (15–64) lowers the dependency ratio—creating a 'demographic dividend' if accompanied by industrial job creation and human capital investment (as in South Korea 1965–1995). In Stage 5 countries (Japan, Germany), shrinking cohorts raise the old-age dependency ratio and strain healthcare and pension budgets.",
        analyticalTakeaway:
          "A demographic dividend is not automatic; it requires matching employment, health, and education policies.",
        keyFormulaOrFramework: "$\\text{Dependency Ratio} = \\frac{P_{0-14} + P_{65+}}{P_{15-64}} \\times 100$"
      },
      {
        id: "geo-1-1-s3",
        title: "Migration, Remittances & Gender Equality Policies",
        marker: "1.1.3",
        content:
          "Migration operates along a spectrum from voluntary economic mobility (e.g., Gulf construction corridors, intra-EU labour) to forced displacement driven by conflict, persecution, and climate shocks (e.g., Syrian refugees, Sahelian IDPs). Origins benefit from remittances (often exceeding FDI/ODA in nations like Nepal or the Philippines) and reduced unemployment, but suffer 'brain drain'. Destinations gain labour and tax base while navigating integration and service pressures. State responses include pro-natalist subsidies (France's family allowances) and empowerment-based fertility reduction (Kerala's female literacy model) rather than coercive quotas.",
        analyticalTakeaway:
          "Evaluate migration and population policies across both origin/destination scales and short- vs. long-term timeframes."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-1-1-c1",
        question:
          "Calculate the dependency ratio for a region with 18 million aged 0–14, 62 million aged 15–64, and 20 million aged 65+, and explain one economic implication.",
        promptType: "calculation",
        hints: [
          "Sum dependent cohorts (0–14 and 65+) and divide by working-age population (15–64).",
          "Multiply by 100 to express dependents per 100 working-age individuals."
        ],
        modelAnswer:
          "Dependency ratio = ((18 + 20) / 62) × 100 = 61.3 dependents per 100 workers. Because the elderly share (20M) exceeds the youth share (18M), tax revenue per worker faces rising pension and geriatric healthcare burdens.",
        keyTermsToInclude: ["Dependency ratio", "working-age cohort", "old-age dependency", "fiscal burden"],
        formulaUsed: "$\\text{DR} = \\frac{P_{0-14} + P_{65+}}{P_{15-64}} \\times 100$"
      },
      {
        id: "geo-1-1-c2",
        question:
          "Explain why a country can experience continued population growth for decades even after its TFR drops to 2.1.",
        promptType: "explain",
        hints: [
          "Consider the age structure of the population pyramid.",
          "Think about the number of women entering reproductive age."
        ],
        modelAnswer:
          "Demographic momentum occurs when a previously high-fertility cohort creates a broad base of young women entering childbearing years. Even if each woman averages 2.1 children, the large absolute number of mothers causes births to exceed deaths until the age structure stabilizes.",
        keyTermsToInclude: ["Demographic momentum", "age structure", "replacement-level fertility", "cohort"]
      }
    ],
    analysis: {
      coreThesis:
        "Demographic trajectories reflect socio-economic transformation—especially female education, healthcare, and urbanization—while migration redistributes human capital across uneven economic landscapes.",
      theoreticalFoundations:
        "Demographic Transition Model (Warren Thompson), Lee's Push-Pull Migration Model, Boserup vs. Malthus resource-population debates.",
      strategicEvaluation:
        "Policies succeed when aligned with economic incentives and women's empowerment; coercive top-down quotas (e.g., historical One-Child Policy) distort sex ratios and accelerate ageing.",
      commonMisconceptions: [
        "Confusing natural increase (CBR - CDR) with total population growth (which includes net migration).",
        "Assuming Stage 4/5 ageing happens only in HICs—middle-income nations like China and Thailand are ageing faster than Europe did."
      ],
      realWorldConnections:
        "Sub-Saharan Africa's urbanization wave, Japan's robotics/immigration debate, and global remittance corridors."
    },
    cases: [
      {
        id: "geo-1-1-case1",
        title: "Japan's Super-Ageing Society",
        regionOrContext: "East Asia · HIC",
        geographicMechanism:
          "Ultra-low TFR (~1.2) and world-leading life expectancy (~84.5 years) shrink the workforce while pushing 65+ share above 29%.",
        concepts: ["place", "process", "power"],
        syllabusLink: "1.1 Changing Population · Ageing & Policy",
        quantitativeInsight: ">29% population aged 65+; working-age cohort projected to fall ~40% by 2060."
      },
      {
        id: "geo-1-1-case2",
        title: "Niger's Youthful Demographic Profile",
        regionOrContext: "Sahel, West Africa · LIC",
        geographicMechanism:
          "High TFR (~6.7) driven by early marriage, agrarian labour needs, and limited female secondary schooling produces a median age of ~15 years.",
        concepts: ["scale", "possibility", "process"],
        syllabusLink: "1.1 Changing Population · Fertility & Youthful Pyramids",
        quantitativeInsight: "Median age ~15.2 years; ~50% of population under age 15."
      }
    ],
    conceptTracking: [
      { conceptId: "process", intensity: 5, manifestation: "Demographic transition, demographic momentum, and push-pull migration." },
      { conceptId: "scale", intensity: 4, manifestation: "Global total slowing vs. national/sub-national divergence." },
      { conceptId: "power", intensity: 4, manifestation: "State migration laws and pro/anti-natalist incentives." }
    ],
    examPromptTakeaway:
      "For Paper 2 essays, pair contrasting country case studies (e.g., Niger vs. Japan) and evaluate both short-term and generational impacts.",
    examBlueprint: {
      paper1TrapPattern: "Forgetting to divide by 10 when converting CBR/CDR (per 1,000) into percentage Natural Increase Rate.",
      paper2StructuredPrompt: "Evaluate the effectiveness of policies designed to manage the consequences of an ageing population.",
      commandTerm: "Evaluate",
      idealSolutionBreakdown: {
        statePrinciples: "Define ageing population and old-age dependency ratio.",
        showWorking: "Contrast labour/pension reforms (raising retirement age, immigration) with pro-natalist incentives.",
        caseAndScale: "Cite Japan's automation/retirement shifts and France's family allowance subsidies, concluding on long-term fiscal sustainability."
      },
      pitfallsToAvoid: [
        "Describing population pyramids without linking shape to economic/social consequences.",
        "Treating all migrants as refugees without distinguishing economic vs. forced flows."
      ]
    }
  },
  {
    id: "geo-1-2",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.2",
    displayCode: "1.2",
    syllabusRef: "Unit 1 · Core (SL & HL)",
    title: "Global Climate — Vulnerability & Resilience",
    subtitle: "Energy balance, enhanced greenhouse effect, uneven vulnerability, and mitigation/adaptation.",
    level: "SL / HL",
    strategicImportance:
      "Connects atmospheric physics (albedo, radiative forcing, feedback loops) to climate justice, vulnerability disparities, and international governance.",
    readingTimeMinutes: 15,
    summary:
      "Earth's climate is regulated by the global energy balance between incoming short-wave solar radiation and outgoing long-wave terrestrial radiation. Anthropogenic greenhouse gas emissions amplify radiative forcing and trigger positive feedbacks, creating unequal spatial vulnerability across low-lying islands, arid basins, and Arctic communities.",
    speedReadBullets: [
      "Solar short-wave radiation (0.4–0.7 μm) warms Earth's surface; Earth emits long-wave infrared radiation trapped by GHGs (CO2, CH4, N2O, H2O).",
      "Positive feedback loops (ice-albedo melt, permafrost CH4 release) amplify warming; negative feedbacks (increased cloud albedo, silicate weathering) dampen it.",
      "Vulnerability = Exposure × Sensitivity / Adaptive Capacity; LICs and SIDS face highest risk despite lowest historical per-capita emissions.",
      "Mitigation cuts sources or enhances sinks (renewables, carbon pricing, afforestation); Adaptation adjusts human/natural systems (seawalls, drought-tolerant crops).",
      "Geoengineering (stratospheric aerosol injection, ocean fertilization) carries high transboundary governance and side-effect risks."
    ],
    primer5Min:
      "Incoming insolation exceeds outgoing radiation at low latitudes and trails at the poles, driving atmospheric and oceanic heat transport. Human fossil fuel combustion and land-use change raise atmospheric CO2 past 420 ppm, strengthening the natural greenhouse effect. Because adaptive capacity depends on wealth, infrastructure, and governance, climate impacts disproportionately harm Small Island Developing States (SIDS) and subsistence farmers, motivating multi-scale mitigation and adaptation strategies.",
    subSections: [
      {
        id: "geo-1-2-s1",
        title: "Atmospheric Energy Balance & Feedback Loops",
        marker: "1.2.1",
        content:
          "Earth receives incoming short-wave solar radiation (~340 W/m^2 global average), ~30% of which is reflected immediately by clouds, aerosols, and bright surfaces (planetary albedo ~0.30). The absorbed energy warms the surface and is re-emitted as long-wave infrared radiation. Greenhouse gases absorb and re-radiate this infrared energy downward. Positive feedback loops accelerate warming: melting Arctic sea ice replaces high-albedo ice (~0.85) with dark ocean (~0.06), increasing heat absorption, while thawing permafrost releases methane (GWP ~28× CO2 over 100 years).",
        analyticalTakeaway:
          "Always trace feedback loops step by step: initial forcing -> surface/atmospheric change -> amplified or dampened temperature response.",
        keyFormulaOrFramework: "$E_{\\text{absorbed}} = S_0 (1 - \\alpha) / 4$"
      },
      {
        id: "geo-1-2-s2",
        title: "Spatial Vulnerability & Climate Justice",
        marker: "1.2.2",
        content:
          "Climate risk is socially and spatially constructed. Low-lying deltaic nations (Bangladesh) and atoll states (Kiribati, Tuvalu) face existential sea-level rise (~3.7 mm/yr and accelerating) and salinization of freshwater lenses. Semi-arid Sahelian communities experience rainfall variability and desertification, whereas high-income coastal cities (Rotterdam, Singapore) can finance engineered flood barriers. Moreover, marginalized groups—urban informal settlers, women, and elderly residents—bear acute heatwave and flood mortality.",
        analyticalTakeaway:
          "Frame vulnerability using Exposure, Sensitivity, and Adaptive Capacity rather than physical hazard intensity alone."
      },
      {
        id: "geo-1-2-s3",
        title: "Mitigation, Adaptation & Governance",
        marker: "1.2.3",
        content:
          "Mitigation addresses root causes through decarbonization (solar/wind, grid storage), carbon pricing (EU ETS), and nature-based sinks (REDD+ forest conservation). Adaptation reduces harm through hard engineering (Thames Barrier, seawalls), soft/ecosystem measures (mangrove restoration), and institutional preparedness (early-warning systems, crop insurance). International agreements such as the 2015 Paris Agreement rely on Nationally Determined Contributions (NDCs), though enforcement remains voluntary and Loss & Damage finance contentious.",
        analyticalTakeaway:
          "Evaluate climate responses by comparing cost, equity, scalability, and co-benefits (e.g., mangroves provide both storm buffering and carbon sequestration)."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-1-2-c1",
        question:
          "Explain how the ice-albedo feedback mechanism amplifies warming in the Arctic compared to tropical latitudes.",
        promptType: "explain",
        hints: [
          "Compare albedo values of sea ice/snow versus open ocean.",
          "Explain what happens to absorbed short-wave radiation."
        ],
        modelAnswer:
          "Snow and sea ice have high albedo (0.6–0.85), reflecting most incoming solar radiation. As warming melts ice, dark ocean water (albedo ~0.06) is exposed, absorbing far more solar energy, raising regional sea temperatures, and accelerating further ice melt (Arctic amplification).",
        keyTermsToInclude: ["Albedo", "short-wave radiation", "positive feedback", "Arctic amplification"]
      }
    ],
    analysis: {
      coreThesis:
        "Anthropogenic radiative forcing alters Earth's energy budget, while uneven socioeconomic adaptive capacity turns physical climate hazards into unequal human crises.",
      theoreticalFoundations:
        "Planetary Energy Budget, IPCC Risk Framework (Hazard × Exposure × Vulnerability), Common but Differentiated Responsibilities (CBDR).",
      strategicEvaluation:
        "Effective climate strategy requires simultaneous rapid mitigation to prevent tipping points and targeted adaptation finance for vulnerable regions.",
      commonMisconceptions: [
        "Confusing stratospheric ozone depletion (UV/CFCs) with the enhanced greenhouse effect (infrared/CO2 & CH4).",
        "Treating mitigation and adaptation as mutually exclusive rather than complementary."
      ],
      realWorldConnections:
        "COP Loss and Damage Fund, Bangladesh coastal polders and cyclone shelters, EU Emissions Trading System."
    },
    cases: [
      {
        id: "geo-1-2-case1",
        title: "Kiribati — Atoll Sea-Level Vulnerability",
        regionOrContext: "Central Pacific · SIDS",
        geographicMechanism:
          "Average elevation < 2 m exposes freshwater lenses to saltwater intrusion and king-tide inundation, driving 'migration with dignity' planning.",
        concepts: ["place", "scale", "power"],
        syllabusLink: "1.2 Global Climate · Uneven Vulnerability",
        quantitativeInsight: "33 coral atolls; maximum elevation on Tarawa ~3 m above mean sea level."
      },
      {
        id: "geo-1-2-case2",
        title: "Bangladesh — Cyclone Early Warning & Mangroves",
        regionOrContext: "South Asia · Deltaic LIC/MIC",
        geographicMechanism:
          "Sundarbans mangrove buffers combined with community cyclone shelters and SMS warnings slashed storm mortality from >130,000 (1991) to <50 in comparable recent storms.",
        concepts: ["possibility", "process", "scale"],
        syllabusLink: "1.2 Global Climate · Adaptation & Resilience",
        quantitativeInsight: "4,000+ cyclone shelters built; storm surge death toll reduced by >95%."
      }
    ],
    conceptTracking: [
      { conceptId: "process", intensity: 5, manifestation: "Radiative forcing, carbon cycle fluxes, and positive feedback loops." },
      { conceptId: "power", intensity: 4, manifestation: "Asymmetry between historical emitters and vulnerable SIDS/LICs." },
      { conceptId: "possibility", intensity: 4, manifestation: "Low-carbon energy transition and ecosystem-based adaptation." }
    ],
    examPromptTakeaway:
      "Always link specific physical mechanisms (long-wave trapping, albedo) to socio-economic disparities in adaptive capacity.",
    examBlueprint: {
      paper1TrapPattern: "Writing 'traps heat' vaguely instead of 'absorbs and re-emits outgoing long-wave terrestrial radiation'.",
      paper2StructuredPrompt: "To what extent is mitigation more effective than adaptation in managing the impacts of global climate change?",
      commandTerm: "To what extent",
      idealSolutionBreakdown: {
        statePrinciples: "Define mitigation (source/sink) vs. adaptation (system adjustment).",
        showWorking: "Argue mitigation addresses root causes and tipping points, whereas adaptation is essential for locked-in warming.",
        caseAndScale: "Compare Paris NDC/renewable scaling with Bangladesh shelters and Kiribati coastal planning."
      },
      pitfallsToAvoid: [
        "Conflating weather events with long-term climate trends.",
        "Ignoring the time lag between emission cuts and climate stabilization."
      ]
    }
  },
  {
    id: "geo-1-3",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.3",
    displayCode: "1.3",
    syllabusRef: "Unit 1 · Core (SL & HL)",
    title: "Global Resource Consumption & Security",
    subtitle: "Water-Energy-Food nexus, ecological footprints, resource stewardship, and circular economy.",
    level: "SL / HL",
    strategicImportance:
      "Integrates rising middle-class consumption with resource nexus trade-offs, Malthus vs. Boserup perspectives, and circular economy models.",
    readingTimeMinutes: 14,
    summary:
      "Rapid growth in the global middle class (especially across Asia-Pacific) has accelerated demand for water, energy, and protein-rich food. Because these three systems are tightly coupled in the Water-Energy-Food (WEF) nexus, scarcity or policy shifts in one domain trigger cascading trade-offs in the others—requiring circular economy and stewardship transitions.",
    speedReadBullets: [
      "Ecological Footprint measures biologically productive land/sea area required to sustain consumption (global hectares, gha) vs. available biocapacity.",
      "The WEF Nexus highlights trade-offs: hydropower consumes water to generate electricity, while irrigation and desalination require heavy energy inputs.",
      "Pessimistic (Neo-Malthusian, Limits to Growth) views stress finite planetary boundaries; Optimistic (Boserup, Julian Simon) views stress technological substitution.",
      "Virtual water and embedded energy allow water-scarce nations to import agricultural commodities rather than exhausting domestic aquifers.",
      "Circular economy (Ellen MacArthur model) shifts from linear 'take-make-dispose' toward repair, remanufacturing, and closed-loop nutrient recovery."
    ],
    primer5Min:
      "Global resource security depends not merely on total supply, but on equitable access, affordability, and nexus efficiency. Middle-class nutrition transitions increase meat and dairy demand, multiplying land and water footprints per calorie. Meanwhile, clean energy transitions raise demand for critical minerals (lithium, cobalt, copper). Balancing human development with planetary boundaries requires moving from linear throughput to circular resource stewardship.",
    subSections: [
      {
        id: "geo-1-3-s1",
        title: "Consumption Trends & Ecological Footprints",
        marker: "1.3.1",
        content:
          "Per-capita resource consumption correlates strongly with income and urbanization. The Ecological Footprint (measured in global hectares, gha) compares human demand against Earth's regenerative biocapacity (~1.6 gha/person globally). High-income nations regularly exceed 5–8 gha/person, running ecological deficits via imported goods and carbon emissions. Meanwhile, billions in rising economies are transitioning toward higher-protein diets, private mobility, and cooling appliances, intensifying pressure on freshwater, arable land, and energy grids.",
        analyticalTakeaway:
          "Contrast total national consumption (driven by population size) with per-capita Ecological Footprint (driven by affluence and energy mix).",
        keyFormulaOrFramework: "$\\text{Ecological Balance} = \\text{Biocapacity} - \\text{Ecological Footprint}$"
      },
      {
        id: "geo-1-3-s2",
        title: "The Water–Energy–Food (WEF) Nexus",
        marker: "1.3.2",
        content:
          "Water, energy, and food systems are mutually interdependent. Agriculture accounts for ~70% of global freshwater withdrawals; energy is needed to pump groundwater, treat wastewater, and manufacture nitrogen fertilizers (Haber-Bosch process); and biofuels compete directly with food crops for arable land and irrigation water. Desalination (e.g., Saudi Arabia, UAE) solves coastal water scarcity at the cost of high fossil-fuel or solar electricity demand and hypersaline brine discharge.",
        analyticalTakeaway:
          "Whenever analyzing a resource policy (e.g., corn ethanol, mega-dams), map at least two cross-sector nexus trade-offs."
      },
      {
        id: "geo-1-3-s3",
        title: "Resource Stewardship & Circular Economy",
        marker: "1.3.3",
        content:
          "Debates over resource futures pit Neo-Malthusian limits (Meadows' Limits to Growth) against Boserupian innovation (necessity-driven intensification, precision drip irrigation, renewables). The Circular Economy operationalizes stewardship by designing out waste, keeping products in biological or technical loops, and regenerating natural capital. Practical examples include Singapore's NEWater closed-loop reclamation and Amsterdam's circular construction material passports.",
        analyticalTakeaway:
          "Evaluate circular economy initiatives on both material recovery rates and rebound effects (Jevons paradox)."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-1-3-c1",
        question:
          "Explain two trade-offs within the Water–Energy–Food nexus caused by expanding biofuel production.",
        promptType: "explain",
        hints: [
          "Consider land competition between food crops and energy crops.",
          "Consider irrigation and fertilizer energy/water requirements."
        ],
        modelAnswer:
          "First, cultivating maize or sugarcane for ethanol diverts fertile arable land and irrigation water away from staple food production, raising food prices. Second, intensive biofuel agriculture requires fossil-fuel-derived fertilizers and water pumping, partially offsetting net energy and carbon gains.",
        keyTermsToInclude: ["WEF nexus", "biofuels", "arable land", "virtual water", "trade-off"]
      }
    ],
    analysis: {
      coreThesis:
        "Resource security is constrained by coupled Water–Energy–Food trade-offs and unequal footprints, demanding circular systems and integrated nexus governance.",
      theoreticalFoundations:
        "Ecological Footprint (Wackernagel & Rees), Malthus vs. Boserup, Planetary Boundaries (Rockström), Circular Economy.",
      strategicEvaluation:
        "Technology expands effective supply (desalination, drip irrigation, solar), but efficiency gains must be paired with demand-side circularity to stay within planetary boundaries.",
      commonMisconceptions: [
        "Treating 'resource scarcity' as purely physical depletion rather than economic/political distribution failure.",
        "Assuming recycling alone equals a circular economy (circularity prioritizes reuse, repair, and redesign first)."
      ],
      realWorldConnections:
        "Singapore NEWater, US/Brazil ethanol mandates, critical mineral bottlenecks in EV battery supply chains."
    },
    cases: [
      {
        id: "geo-1-3-case1",
        title: "Singapore NEWater — Closed-Loop Water Security",
        regionOrContext: "Southeast Asia · City-State HIC",
        geographicMechanism:
          "Microfiltration, reverse osmosis, and UV disinfection reclaim treated wastewater to meet up to 40% of water demand, reducing import dependence.",
        concepts: ["possibility", "place", "scale"],
        syllabusLink: "1.3 Resource Security · Circular Economy & Water",
        quantitativeInsight: "Four National Taps; NEWater supplies ~40% of national demand (projected 55% by 2060)."
      },
      {
        id: "geo-1-3-case2",
        title: "Aral Sea & Cotton Irrigation Nexus Failure",
        regionOrContext: "Central Asia (Kazakhstan/Uzbekistan)",
        geographicMechanism:
          "Soviet-era diversion of Amu Darya and Syr Darya rivers for irrigated cotton collapsed ~90% of lake volume, destroying fisheries and salinizing soils.",
        concepts: ["process", "power", "spatial-interaction"],
        syllabusLink: "1.3 Resource Security · WEF Nexus Trade-Offs",
        quantitativeInsight: "Lake surface area shrank by ~90% between 1960 and 2010; salinity tripled."
      }
    ],
    conceptTracking: [
      { conceptId: "spatial-interaction", intensity: 5, manifestation: "Virtual water trade and global supply chains shifting environmental footprints." },
      { conceptId: "possibility", intensity: 4, manifestation: "Circular economy, reclaimed water, and precision agriculture." },
      { conceptId: "power", intensity: 4, manifestation: "Unequal per-capita footprints and upstream/downstream water control." }
    ],
    examPromptTakeaway:
      "Use the WEF nexus explicitly in essays to show systemic synthesis rather than treating water, energy, and food in isolation.",
    examBlueprint: {
      paper1TrapPattern: "Using 'Ecological Footprint' when the question specifically asks for 'Water Footprint' or 'Carbon Footprint'.",
      paper2StructuredPrompt: "Examine how the Water–Energy–Food nexus creates challenges for achieving resource security.",
      commandTerm: "Examine",
      idealSolutionBreakdown: {
        statePrinciples: "Define WEF nexus and resource security (availability, access, stability).",
        showWorking: "Detail two-way linkages (energy for water pumping/desalination; water for cooling/hydropower/crops).",
        caseAndScale: "Contrast Aral Sea irrigation failure with Singapore's integrated NEWater management."
      },
      pitfallsToAvoid: [
        "Ignoring socio-economic access when defining resource security.",
        "Forgetting to evaluate trade-offs of technological fixes like desalination."
      ]
    }
  }
];
