import {
  ConceptDefinition,
  GeoFormulaItem,
  GeoGlossaryTerm,
  GeoFlashcard,
  UnitId,
} from "./types";

export const GEO_CONCEPTS: ConceptDefinition[] = [
  {
    id: "place",
    name: "Place",
    shortName: "Place",
    color: "#14b8a6",
    badgeBg: "rgba(20, 184, 166, 0.16)",
    badgeBorder: "rgba(20, 184, 166, 0.42)",
    badgeText: "#5eead4",
    glowColor: "rgba(20, 184, 166, 0.3)",
    description:
      "Physical and human characteristics that make a location unique, including topography, climate, culture, lived experience, and sense of identity.",
    coreMechanism:
      "Places are dynamic rather than static—continually reshaped by migration flows, capital investment, urban regeneration, and environmental change.",
    examTips:
      "Ground every 10-mark or 12-mark essay in two contrasting named places (e.g., HIC vs LIC/MIC) with specific dates and metrics.",
  },
  {
    id: "power",
    name: "Power",
    shortName: "Power",
    color: "#38bdf8",
    badgeBg: "rgba(56, 189, 248, 0.16)",
    badgeBorder: "rgba(56, 189, 248, 0.42)",
    badgeText: "#7dd3fc",
    glowColor: "rgba(56, 189, 248, 0.3)",
    description:
      "The ability of states, TNCs, IGOs, NGOs, and local communities to influence spatial outcomes, resource allocation, and governance.",
    coreMechanism:
      "Asymmetric power determines who bears environmental risk (e.g., climate vulnerability, transboundary river dams) and who captures value in global networks.",
    examTips:
      "In Paper 3 (HL) and Paper 2, explicitly compare stakeholder power (state vs TNC vs civil society) in your evaluation.",
  },
  {
    id: "possibility",
    name: "Possibility",
    shortName: "Possibility",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.16)",
    badgeBorder: "rgba(16, 185, 129, 0.42)",
    badgeText: "#6ee7b7",
    glowColor: "rgba(16, 185, 129, 0.3)",
    description:
      "Alternative futures, sustainability pathways, technological innovation, and policy interventions that expand or constrain human-environment resilience.",
    coreMechanism:
      "Contrasts business-as-usual trajectories with circular economy models, adaptive coastal engineering, and multilateral climate governance.",
    examTips:
      "Always evaluate the feasibility, cost, and equity of future management strategies rather than listing them uncritically.",
  },
  {
    id: "process",
    name: "Process",
    shortName: "Process",
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.16)",
    badgeBorder: "rgba(245, 158, 11, 0.42)",
    badgeText: "#fcd34d",
    glowColor: "rgba(245, 158, 11, 0.3)",
    description:
      "Physical and human mechanisms operating over time and space—from fluvial erosion and thermohaline circulation to suburbanisation and time-space compression.",
    coreMechanism:
      "Processes interact across feedback loops (positive albedo feedback, urban heat island intensification, cumulative causation).",
    examTips:
      "Trace cause-and-effect chains step by step using precise terminology (e.g., infiltration -> baseflow -> lag time -> peak discharge).",
  },
  {
    id: "scale",
    name: "Scale",
    shortName: "Scale",
    color: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.16)",
    badgeBorder: "rgba(168, 85, 247, 0.42)",
    badgeText: "#d8b4fe",
    glowColor: "rgba(168, 85, 247, 0.3)",
    description:
      "Analytical framing across local, regional, national, and global levels, recognizing that patterns at one scale can mask disparities at another.",
    coreMechanism:
      "National GDP or fertility averages frequently conceal sharp sub-national urban-rural or core-periphery inequalities.",
    examTips:
      "Explicitly state how conclusions shift when moving from local to national to global scale—this is a top-band AO3/AO4 discriminator.",
  },
  {
    id: "spatial-interaction",
    name: "Spatial Interaction",
    shortName: "Spatial Flows",
    color: "#ec4899",
    badgeBg: "rgba(236, 72, 153, 0.16)",
    badgeBorder: "rgba(236, 72, 153, 0.42)",
    badgeText: "#f9a8d4",
    glowColor: "rgba(236, 72, 153, 0.3)",
    description:
      "Movement of people, goods, capital, data, water, and pollutants between places, governed by distance decay, connectivity, and chokepoints.",
    coreMechanism:
      "Flows create interdependence between core and periphery, linking local consumption choices to distant ecological footprints.",
    examTips:
      "Link flows (remittances, virtual water, supply chains) directly to both source and destination impacts.",
  },
];

export const GEO_UNITS: {
  id: UnitId;
  number: 1 | 2 | 3 | 4;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
}[] = [
  {
    id: "unit-1",
    number: 1,
    code: "UNIT 1",
    title: "Geographic Perspectives: Global Change",
    shortTitle: "Global Change",
    description: "Core SL & HL: Population transitions, global climate vulnerability & resource security.",
    color: "#14b8a6",
  },
  {
    id: "unit-2",
    number: 2,
    code: "UNIT 2",
    title: "Geographic Themes (Options)",
    shortTitle: "Options Themes",
    description: "Freshwater, Oceans & Coastal Margins, Extreme Environments, Hazards & Urban Systems.",
    color: "#0ea5e9",
  },
  {
    id: "unit-3",
    number: 3,
    code: "UNIT 3 (HL)",
    title: "Global Interactions & Power",
    shortTitle: "HL Interactions",
    description: "HL Extension: Power & networks, human development & diversity, global risks & resilience.",
    color: "#a855f7",
  },
  {
    id: "unit-4",
    number: 4,
    code: "UNIT 4",
    title: "GIS, Quantitative & Fieldwork (IA)",
    shortTitle: "Skills & IA",
    description: "Spatial statistics, Spearman's rank, Lorenz/Gini, GIS layers & IA fieldwork methods.",
    color: "#f59e0b",
  },
];

export const GEO_FORMULAS: GeoFormulaItem[] = [
  {
    id: "gf-1",
    name: "Natural Increase Rate (NIR)",
    formula: "\\text{NIR} = \\frac{\\text{CBR} - \\text{CDR}}{10}",
    variables: "CBR = Crude Birth Rate (per 1,000), CDR = Crude Death Rate (per 1,000)",
    units: "% per year",
    topicCode: "1.1",
    category: "Population",
    examTrap: "CBR and CDR are per 1,000, so divide by 10 to express NIR as a percentage (not per 1,000).",
  },
  {
    id: "gf-2",
    name: "Dependency Ratio",
    formula: "\\text{DR} = \\frac{\\text{Pop}_{0-14} + \\text{Pop}_{65+}}{\\text{Pop}_{15-64}} \\times 100",
    variables: "Youth (0–14) + Elderly (65+) divided by working-age population (15–64)",
    units: "dependents per 100 workers",
    topicCode: "1.1",
    category: "Population",
    examTrap: "Always distinguish between youth dependency (LICs) and old-age dependency (HICs) when evaluating economic burden.",
  },
  {
    id: "gf-3",
    name: "Spearman's Rank Correlation",
    formula: "r_s = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}",
    variables: "d = rank difference per pair, n = number of paired observations",
    units: "dimensionless (-1 to +1)",
    topicCode: "4.1",
    category: "Fieldwork & Stats",
    examTrap: "Compare $|r_s|$ against the critical value at $n$ and $p = 0.05$; correlation never proves causation.",
  },
  {
    id: "gf-4",
    name: "River Discharge",
    formula: "Q = A \\times v = w \\times d \\times v",
    variables: "A = cross-sectional area (w × d), v = mean velocity",
    units: "m^3 s^{-1} (cumecs)",
    topicCode: "2.1",
    category: "Hydrology",
    examTrap: "Convert depth from cm to m before multiplying by width and velocity to avoid 100× errors.",
  },
  {
    id: "gf-5",
    name: "Location Quotient (LQ)",
    formula: "\\text{LQ} = \\frac{E_{i,r} / E_r}{E_{i,n} / E_n}",
    variables: "$E_{i,r}$ = regional sector share, $E_{i,n}$ = national sector share",
    units: "ratio (LQ > 1 = regional specialization)",
    topicCode: "4.1",
    category: "Urban & Economic",
    examTrap: "LQ = 1 means the region matches the national share; LQ > 1.25 indicates a significant cluster.",
  },
  {
    id: "gf-6",
    name: "Population Doubling Time (Rule of 70)",
    formula: "t_{\\text{double}} \\approx \\frac{70}{r}",
    variables: "r = annual population growth rate in %",
    units: "years",
    topicCode: "1.1",
    category: "Population",
    examTrap: "Valid only if the annual growth rate r remains constant; do not use r as a decimal (use 2.0 for 2%).",
  },
];

export const GEO_GLOSSARY: GeoGlossaryTerm[] = [
  { id: "gg-1", term: "Demographic Dividend", definition: "Accelerated economic growth triggered when fertility falls and the working-age share (15–64) expands relative to dependents, provided education and jobs exist.", topicRef: "1.1" },
  { id: "gg-2", term: "Albedo Feedback", definition: "Positive climate feedback where melting ice/snow lowers surface reflectivity, increasing solar absorption and accelerating warming.", topicRef: "1.2" },
  { id: "gg-3", term: "Water-Food-Energy Nexus", definition: "The tight interdependence where producing water, food, and energy requires trade-offs across the other two systems.", topicRef: "1.3" },
  { id: "gg-4", term: "Lag Time (Hydrograph)", definition: "The time interval between peak rainfall and peak river discharge; shortened by urbanization, steep slopes, and saturated soils.", topicRef: "2.1" },
  { id: "gg-5", term: "Thermohaline Circulation", definition: "Global ocean conveyor belt driven by temperature (thermo) and salinity (haline) density gradients.", topicRef: "2.2" },
  { id: "gg-6", term: "Permafrost", definition: "Ground remaining at or below 0 °C for at least two consecutive years; thawing releases methane (CH4) and destabilizes Arctic infrastructure.", topicRef: "2.3" },
  { id: "gg-7", term: "Park's Hazard Response Curve", definition: "Model tracking quality of life before, during, and after a hazard across relief, rehabilitation, and reconstruction phases.", topicRef: "2.4" },
  { id: "gg-8", term: "Urban Heat Island (UHI)", definition: "Microclimatic phenomenon where urban cores record 2–6 °C higher temperatures than surrounding rural land due to low albedo, waste heat, and reduced evapotranspiration.", topicRef: "2.5" },
  { id: "gg-9", term: "Time-Space Compression", definition: "Reduction in the relative distance between places caused by containerization, aviation, and fiber-optic networks.", topicRef: "3.1", isHLOnly: true },
  { id: "gg-10", term: "Glocalisation", definition: "Adaptation of global products, media, or corporate strategies to fit local cultural norms and tastes.", topicRef: "3.2", isHLOnly: true },
  { id: "gg-11", term: "Reshoring", definition: "Returning previously offshored manufacturing or supply-chain stages closer to domestic markets to reduce geopolitical and shock risk.", topicRef: "3.3", isHLOnly: true },
  { id: "gg-12", term: "Bradshaw Model", definition: "Conceptual model showing systematic downstream changes in river variables (discharge, width, depth, velocity increase; sediment size and gradient decrease).", topicRef: "4.2" },
];

export const GEO_FLASHCARDS: GeoFlashcard[] = [
  { id: "gfc-1", topicCode: "1.1", level: "SL / HL", front: "Why can a falling Total Fertility Rate still produce population growth for decades?", back: "Population momentum: a large young cohort remains in reproductive ages, keeping births higher than deaths until the age structure matures." },
  { id: "gfc-2", topicCode: "1.2", level: "SL / HL", front: "Distinguish between climate mitigation and climate adaptation with one example each.", back: "Mitigation reduces GHG emissions or enhances sinks (e.g., carbon pricing, solar transition). Adaptation adjusts human/natural systems to actual or expected climate impacts (e.g., Dutch Room for the River, drought-tolerant crops)." },
  { id: "gfc-3", topicCode: "1.3", level: "SL / HL", front: "Contrast Malthusian and Boserupian views on resource carrying capacity.", back: "Malthus argued population grows geometrically while food grows arithmetically, causing positive/preventive checks. Boserup argued population pressure stimulates agricultural innovation and intensification." },
  { id: "gfc-4", topicCode: "2.1", level: "SL / HL", front: "List three physical and three human factors that shorten hydrograph lag time.", back: "Physical: impermeable bedrock, steep basin slope, antecedent soil saturation. Human: urban tarmac/storm drains, deforestation, channel straightening." },
  { id: "gfc-5", topicCode: "2.2", level: "SL / HL", front: "How does El Niño (ENSO) alter Pacific upwelling and coastal fisheries?", back: "Weakened trade winds allow warm surface water to shift east toward Peru, suppressing cold nutrient-rich upwelling, collapsing anchoveta fisheries and triggering drought in Indonesia/Australia." },
  { id: "gfc-6", topicCode: "2.4", level: "SL / HL", front: "Why do earthquakes of equal magnitude cause vastly different death tolls across countries?", back: "Vulnerability depends on building codes (seismic damping), population density, secondary hazards (tsunamis, liquefaction), early warning, and governance/emergency response capacity." },
  { id: "gfc-7", topicCode: "2.5", level: "SL / HL", front: "Give two mechanisms that create an Urban Heat Island and two mitigation strategies.", back: "Causes: low-albedo asphalt/concrete absorbing insolation + anthropogenic waste heat from HVAC/traffic. Mitigation: green roofs/urban tree canopy + high-albedo cool pavements." },
  { id: "gfc-8", topicCode: "3.1", level: "HL ONLY", front: "How do TNCs use transfer pricing and global production networks to maximize profit?", back: "TNCs locate R&D/IP in low-tax jurisdictions, manufacture in low-wage SEZs, and price internal cross-border transactions to shift declared profits toward tax havens." },
  { id: "gfc-9", topicCode: "3.2", level: "HL ONLY", front: "What does the Gender Inequality Index (GII) measure that HDI misses?", back: "GII captures reproductive health (maternal mortality, adolescent birth rate), political empowerment (parliamentary seats), and female labour force participation." },
  { id: "gfc-10", topicCode: "3.3", level: "HL ONLY", front: "Why are maritime chokepoints (Suez Canal, Strait of Malacca) critical to global risk?", back: "Concentrated trade volume means localized conflict, blockages, or piracy immediately disrupts global just-in-time supply chains, inflating energy and food prices worldwide." },
];
