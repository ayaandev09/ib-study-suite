import type { TopicData } from "./types";

export const UNIT_4_TOPICS: TopicData[] = [
  {
    id: "geo-4-1",
    unitId: "unit-4",
    unitNumber: 4,
    topicCode: "4.1",
    displayCode: "4.1",
    syllabusRef: "Unit 4 · Geographic Skills (SL & HL)",
    title: "GIS, Cartography & Quantitative Skills",
    subtitle: "Choropleth/isolines, Spearman's rank, Chi-squared, Lorenz curves, and GIS layer analysis.",
    level: "SL / HL",
    strategicImportance:
      "Essential across Papers 1, 2, 3 and the IA: sharpens map critique, statistical significance testing, and spatial GIS overlay reasoning.",
    readingTimeMinutes: 13,
    summary:
      "Geographers interrogate spatial patterns using cartographic visualizations, Geographic Information Systems (GIS), and inferential statistics. Selecting the right map or test—and recognizing distortion, Modifiable Areal Unit Problem (MAUP), and correlation-vs-causation traps—separates top-band IB analysis from surface description.",
    speedReadBullets: [
      "Choropleth maps shade administrative units by density/rate (never raw totals!), risking the Modifiable Areal Unit Problem (MAUP).",
      "Isoline maps (contours, isobars, isohyets) connect equal values across continuous surfaces; proportional symbols scale by area/volume.",
      "Spearman's Rank ($r_s$) tests monotonic correlation between two ranked datasets ($-1$ to $+1$); check critical values against $n$ degrees.",
      "Chi-squared ($\\chi^2$) tests whether observed categorical frequencies differ significantly from expected frequencies.",
      "GIS overlays vector (points, lines, polygons) and raster (satellite pixels, DEMs) layers for flood-risk, habitat, or urban-siting decisions."
    ],
    primer5Min:
      "Every map and statistic makes trade-offs. Choropleth maps conceal intra-unit extremes; Mercator projections preserve angles while inflating high-latitude area. In quantitative analysis, Spearman's Rank detects non-parametric correlation without assuming normality, while Chi-squared tests categorical differences. Layering raster DEMs with vector floodplains and census polygons in GIS enables multi-criteria spatial decision-making.",
    subSections: [
      {
        id: "geo-4-1-s1",
        title: "Cartographic Choice, Projections & MAUP",
        marker: "4.1.1",
        content:
          "Choosing an effective visualization requires matching data type to graphic form: use rates/densities (never raw population counts) on choropleth maps; use proportional circles or flow-line thickness for absolute magnitudes/trade; and use dot-density or isoline maps for continuous spatial gradients. Always critique choropleth maps for ecological fallacy and the Modifiable Areal Unit Problem (MAUP), where redrawing district boundaries alters apparent spatial patterns.",
        analyticalTakeaway:
          "Never use raw totals on a choropleth map—normalize by area or population first."
      },
      {
        id: "geo-4-1-s2",
        title: "Spearman's Rank, Chi-Squared & Lorenz Curves",
        marker: "4.1.2",
        content:
          "Spearman's Rank correlation ($r_s = 1 - \\frac{6\\sum d^2}{n(n^2-1)}$) quantifies rank-order association between two variables (e.g., distance downstream vs. pebble size) from $-1.0$ to $+1.0$; significance requires $|r_s|$ to exceed the critical value at $p = 0.05$ for sample size $n$. Chi-squared ($\\chi^2 = \\sum \\frac{(O-E)^2}{E}$) tests categorical associations (e.g., flood-zone vs. housing type). Lorenz curves and the Gini coefficient ($0$ to $1$) measure spatial or income inequality.",
        analyticalTakeaway:
          "Statistical correlation ($r_s$) never proves causation—always state the physical/human mechanism and test against $p = 0.05$ critical values.",
        keyFormulaOrFramework: "$r_s = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}$"
      },
      {
        id: "geo-4-1-s3",
        title: "GIS Vector/Raster Overlays & Remote Sensing",
        marker: "4.1.3",
        content:
          "Geographic Information Systems (GIS) combine vector geometry (points for clinics, lines for rivers/roads, polygons for wards) with raster grids (satellite NDVI vegetation indices, Digital Elevation Models). Weighted overlay and buffer analysis allow planners to site emergency shelters outside 100-year flood polygons while maximizing 15-minute walking access.",
        analyticalTakeaway:
          "Explain GIS value in terms of multi-layer spatial intersection, buffering, and real-time satellite monitoring."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-4-1-c1",
        question:
          "Explain why raw population counts should not be mapped using a choropleth map, and name an appropriate alternative.",
        promptType: "explain",
        hints: [
          "Think about differing administrative unit areas.",
          "Consider normalizing or switching to proportional symbols."
        ],
        modelAnswer:
          "Because administrative polygons vary hugely in area, shading by raw population visually exaggerates large sparsely populated units and distorts density. Instead, normalize data as population density (people/km^2) for a choropleth map, or use proportional circles/dot-density maps for absolute counts.",
        keyTermsToInclude: ["Choropleth", "normalization", "MAUP", "proportional symbol"]
      }
    ],
    analysis: {
      coreThesis:
        "Cartographic, statistical, and GIS literacy turns raw spatial data into defensible geographic evidence while exposing visual and statistical bias.",
      theoreticalFoundations:
        "GIS Vector/Raster Model, Modifiable Areal Unit Problem (MAUP), Non-parametric vs. Parametric Inference.",
      strategicEvaluation:
        "Best practice combines GIS visualization with statistical hypothesis testing and explicit critique of sampling/boundary bias.",
      commonMisconceptions: [
        "Treating Spearman's rₛ = 0.72 as automatically significant without checking sample size n against critical tables.",
        "Confusing raster pixel resolution with vector coordinate precision."
      ],
      realWorldConnections:
        "Satellite NDVI drought monitoring, emergency flood-routing GIS, Gini income mapping."
    },
    cases: [
      {
        id: "geo-4-1-case1",
        title: "NDVI Satellite GIS & Drought Early Warning",
        regionOrContext: "East Africa · Remote Sensing",
        geographicMechanism:
          "Multispectral satellite raster layers compute Normalized Difference Vegetation Index (NDVI) anomalies weeks before harvest failure.",
        concepts: ["scale", "possibility", "process"],
        syllabusLink: "4.1 GIS & Quantitative Skills · Remote Sensing",
        quantitativeInsight: "250 m–1 km daily MODIS/Sentinel spatial resolution."
      }
    ],
    conceptTracking: [
      { conceptId: "scale", intensity: 5, manifestation: "MAUP, pixel resolution, and multi-scale GIS aggregation." },
      { conceptId: "possibility", intensity: 4, manifestation: "Data-driven hazard zoning and humanitarian resource routing." }
    ],
    examPromptTakeaway:
      "When critiquing any stimulus map in Paper 1/2/3, mention scale, legend intervals, normalization, and missing intra-unit variation.",
    examBlueprint: {
      paper1TrapPattern: "Accepting a stimulus graph's correlation without noting small sample size or outliers.",
      paper2StructuredPrompt: "Explain how Geographic Information Systems (GIS) can be used to improve hazard preparedness.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Define GIS vector/raster layers and overlay analysis.",
        showWorking: "Combine DEM elevation, floodplain polygons, road networks, and vulnerable demographic layers.",
        caseAndScale: "Illustrate shelter siting and evacuation routing at municipal scale."
      },
      pitfallsToAvoid: [
        "Treating GIS as 'just a Google Map' rather than spatial database querying.",
        "Forgetting to state null/alternative hypotheses in statistical tests."
      ]
    }
  },
  {
    id: "geo-4-2",
    unitId: "unit-4",
    unitNumber: 4,
    topicCode: "4.2",
    displayCode: "4.2",
    syllabusRef: "Unit 4 · Internal Assessment (SL & HL)",
    title: "IA Fieldwork Methodology",
    subtitle: "Research questions, sampling designs, primary data collection, and rigorous evaluation.",
    level: "SL / HL",
    strategicImportance:
      "Worth 25% (SL) / 20% (HL) of final IB grade: clear spatial hypothesis formulation, justified sampling, integrated spatial presentation, and deep methodological evaluation.",
    readingTimeMinutes: 14,
    summary:
      "The IB Geography Internal Assessment (IA) requires a focused, localized fieldwork investigation linked directly to syllabus theory (often river profiles, urban microclimates/land use, or coastal sediment/management). Top-scoring reports formulate testable spatial hypotheses, justify sampling designs, present annotated maps and statistics, and critically evaluate anomalies and error sources.",
    speedReadBullets: [
      "Research Question must have a clear spatial focus, local scale, and explicit link to an IB syllabus topic/theory (e.g., Bradshaw Model, UHI, Bid-Rent).",
      "Sampling strategies: Random (unbiased, risk of missing pockets), Systematic (regular intervals along a transect), Stratified (proportional to sub-zones).",
      "Primary data mixes quantitative measurements (anemometer, thermometer, clinometer, pedestrian/traffic counts) with qualitative surveys/annotated photos.",
      "Analysis integrates GIS/annotated site maps, graphs with error bars/trendlines, and statistical tests ($r_s$, $\\chi^2$, Mann-Whitney U).",
      "Evaluation moves beyond 'more time/people' to diagnose systematic instrument bias, timing anomalies, and specific realistic improvements."
    ],
    primer5Min:
      "A strong IA begins with a tight geographic question grounded in theory—such as testing the Bradshaw Model along a local stream or Urban Heat Island gradients along an urban–rural transect. Sampling must fit the spatial question (transects call for systematic or stratified-systematic sampling). In analysis, link every graph and statistical test back to your hypotheses, and evaluate how weather timing, instrument calibration, or site access shaped your results.",
    subSections: [
      {
        id: "geo-4-2-s1",
        title: "Formulating Spatial Questions & Sampling Strategies",
        marker: "4.2.1",
        content:
          "An effective IA question is narrow, measurable in one field day, and anchored in geographic theory (e.g., 'To what extent does microclimate temperature and pedestrian density vary with distance from the CBD of [Town] according to UHI and Bid-Rent models?'). Choose sampling explicitly: systematic sampling along a transect captures continuous distance-decay gradients; stratified sampling ensures fair coverage of distinct land-use zones; random sampling avoids researcher selection bias in uniform areas.",
        analyticalTakeaway:
          "Justify why your chosen sampling strategy outperforms the alternatives for your specific spatial transect or zones."
      },
      {
        id: "geo-4-2-s2",
        title: "Primary Collection, Ethics & Spatial Presentation",
        marker: "4.2.2",
        content:
          "Collect primary data systematically using calibrated instruments (digital anemometers, infrared thermometers, clinometers, callipers for pebble roundness) alongside structured environmental quality indexes (EQI) or anonymized questionnaires. Ethics require informed consent, privacy, and zero environmental disturbance. Present spatial context via a nested locator map (national -> regional -> exact sample sites) and overlay results directly onto GIS/annotated maps.",
        analyticalTakeaway:
          "Annotate maps and graphs with findings rather than dumping raw unlabelled tables into the body text."
      },
      {
        id: "geo-4-2-s3",
        title: "Statistical Synthesis & Deep Evaluation",
        marker: "4.2.3",
        content:
          "State null ($H_0$) and alternative ($H_1$) hypotheses cleanly, compute tests (Spearman's Rank for transects, Chi-squared for counts), and explicitly explain anomalies using local site observations (e.g., concrete bridge culvert distorting downstream river velocity). Evaluation must dissect specific methodological flaws—non-simultaneous data logging under shifting cloud cover, subjective EQI scoring—and propose concrete redesigns (synchronized data loggers, blind multi-rater scoring).",
        analyticalTakeaway:
          "Never write vague evaluation like 'human error' or 'sample size was small'; specify the exact direction of bias and a targeted fix."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-4-2-c1",
        question:
          "A student investigates Urban Heat Island intensity along a 6 km transect from CBD to rural park using non-simultaneous handheld measurements over 3 hours. Identify the main methodological flaw and propose a realistic improvement.",
        promptType: "evaluation",
        hints: [
          "Think about diurnal temperature rise between 09:00 and 12:00.",
          "How could measurements be synchronized?"
        ],
        modelAnswer:
          "Diurnal solar warming over the 3-hour collection window confounds spatial variation with time-of-day warming, artificially inflating temperatures at sites visited closer to solar noon. Improvement: deploy synchronized stationary data loggers at all transect sites simultaneously, or divide teams to sample all sites within the same 15-minute window.",
        keyTermsToInclude: ["Diurnal variation", "confounding variable", "synchronized sampling", "bias"]
      }
    ],
    analysis: {
      coreThesis:
        "Rigorous IB fieldwork integrates theory-driven spatial hypotheses, justified sampling, spatialized GIS presentation, and sharp diagnostic evaluation.",
      theoreticalFoundations:
        "Scientific Method in Spatial Science, Random/Systematic/Stratified Sampling, Hypothesis Testing.",
      strategicEvaluation:
        "Clarity, tight geographic focus, and honest diagnosis of measurement bias consistently outweigh massive unanalyzed datasets.",
      commonMisconceptions: [
        "Listing generic 'more time / more money' improvements in the evaluation.",
        "Writing a descriptive conclusion that ignores anomalous sites or statistical significance."
      ],
      realWorldConnections:
        "Urban microclimate transect studies, downstream river Bradshaw audits, coastal beach-profile longshore drift surveys."
    },
    cases: [
      {
        id: "geo-4-2-case1",
        title: "Transect Fieldwork — Bradshaw River Model Audit",
        regionOrContext: "Local Drainage Basin · IA Model",
        geographicMechanism:
          "Systematic sampling at 8–10 sites downstream measures channel width, depth, wetted perimeter, velocity, and pebble roundness against theoretical increases.",
        concepts: ["process", "scale", "place"],
        syllabusLink: "4.2 IA Fieldwork · Sampling & Hypothesis Testing",
        quantitativeInsight: "Spearman's Rank (n >= 8) tests significance of downstream morphological trends at p = 0.05."
      }
    ],
    conceptTracking: [
      { conceptId: "scale", intensity: 5, manifestation: "Nested locator mapping from regional basin to micro-site transect." },
      { conceptId: "process", intensity: 4, manifestation: "Linking field anomalies to localized physical/human processes." }
    ],
    examPromptTakeaway:
      "Keep the IA tightly focused on one clear spatial relationship tested with 2–3 sub-hypotheses and strong maps.",
    examBlueprint: {
      paper1TrapPattern: "Forgetting to justify why systematic vs. stratified sampling was chosen over random sampling.",
      paper2StructuredPrompt: "Explain how fieldwork sampling methods reduce bias when investigating an urban or physical transect.",
      commandTerm: "Explain",
      idealSolutionBreakdown: {
        statePrinciples: "Define systematic, stratified, and random sampling.",
        showWorking: "Match transect gradients to systematic intervals and distinct land-use zones to stratified sub-sampling.",
        caseAndScale: "Show how synchronized timing removes diurnal confounding in an urban microclimate study."
      },
      pitfallsToAvoid: [
        "Exceeding the 2,500-word IA limit with unedited raw data tables.",
        "Omitting risk assessment and ethical considerations."
      ]
    }
  }
];
