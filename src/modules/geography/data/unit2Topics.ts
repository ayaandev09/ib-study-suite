import type { TopicData } from "./types";

export const UNIT_2_TOPICS: TopicData[] = [
  {
    id: "geo-2-1",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.1",
    displayCode: "2.1",
    syllabusRef: "Unit 2 · Option A (SL & HL)",
    title: "Freshwater — Drainage Basins & Management",
    subtitle: "Hydrological cycle, storm hydrographs, floodplain landforms, and integrated basin management.",
    level: "SL / HL",
    strategicImportance:
      "Core Paper 1 physical-human hydrology option: tests storm hydrograph interpretation, fluvial landforms, and transboundary water conflict/cooperation.",
    readingTimeMinutes: 14,
    summary:
      "Drainage basins operate as open systems driven by precipitation inputs, interception/infiltration pathways, and evapotranspiration/discharge outputs. Urbanization, deforestation, and dam construction alter lag times and sediment budgets, while growing demand intensifies transboundary basin competition.",
    speedReadBullets: [
      "Drainage basin is an open system: inputs (precipitation), stores (soil moisture, groundwater, channel), flows (infiltration, overland flow, baseflow), outputs (discharge, ET).",
      "Urban impermeable surfaces and steep slopes shorten lag time and raise peak discharge, creating flashy storm hydrographs.",
      "Meanders form via helicoidal flow (outer-bank erosion/river cliff, inner-bank deposition/point bar); deltas form where sediment supply outpaces marine erosion.",
      "Hard engineering (levees, channelization, dams) shifts flood risk downstream; soft engineering (wetland restoration, floodplain zoning) works with natural processes.",
      "Integrated Drainage Basin Management (IDBM) coordinates upstream-downstream stakeholders across political boundaries (e.g., Nile, Mekong, Rhine)."
    ],
    primer5Min:
      "A river basin's flood response depends on how fast rainfall reaches the channel. Natural vegetation slows throughfall and boosts infiltration, sustaining gentle baseflow. Concrete surfaces, compacted soils, and storm drains force rapid surface runoff, spiking peak discharge. Managing floods and water scarcity sustainably requires basin-wide coordination—balancing dam storage and floodplains with wetland restoration and international treaties.",
    subSections: [
      {
        id: "geo-2-1-s1",
        title: "Drainage Basin System & Storm Hydrographs",
        marker: "2.1.1",
        content:
          "Water moves through a drainage basin via interception, stemflow, infiltration, percolation, throughflow, groundwater baseflow, and overland flow. A storm hydrograph plots river discharge ($Q = A \\times v$, in cumecs $\\text{m}^3/\\text{s}$) against time following a rainfall event. Short lag times and steep rising limbs ('flashy' hydrographs) occur in small, circular, steep basins with impermeable clay/urban surfaces and antecedent saturated soils. Long lag times occur in permeable chalk/sandstone basins with dense forest cover.",
        analyticalTakeaway:
          "Explain hydrograph shape by naming the exact flow pathway (e.g., Hortonian overland flow vs. slow groundwater baseflow).",
        keyFormulaOrFramework: "$Q = A \\times v \\quad (\\text{m}^3\\text{s}^{-1})$"
      },
      {
        id: "geo-2-1-s2",
        title: "Fluvial Landforms & Flood Risk Modification",
        marker: "2.1.2",
        content:
          "Rivers reshape valleys through hydraulic action, abrasion, attrition, and solution. In middle-to-lower courses, helicoidal flow carves river cliffs on outer bends and deposits point bars on inner bends, forming meanders and oxbow lakes. Floodplains and natural levées build through overbank silt deposition. Human interventions—channel straightening, artificial concrete levées, and mega-dams—protect localized urban reaches but starve downstream deltas of sediment (causing coastal subsidence) and accelerate floodwaves downstream.",
        analyticalTakeaway:
          "Contrast structural hard engineering with floodplain zoning and wetland restoration across cost, ecosystem health, and downstream equity."
      },
      {
        id: "geo-2-1-s3",
        title: "Water Scarcity, Eutrophication & Basin Governance",
        marker: "2.1.3",
        content:
          "Physical scarcity (arid climate) differs from economic scarcity (lack of treatment/distribution infrastructure). Agricultural fertilizer runoff triggers eutrophication: nitrate/phosphate enrichment sparks algal blooms, bacterial decomposition depletes dissolved oxygen (hypoxia), and aquatic food webs collapse. Transboundary rivers (e.g., Nile Basin with GERD; Mekong) require treaties sharing real-time flow data and equitable allocation under Integrated Drainage Basin Management (IDBM).",
        analyticalTakeaway:
          "Link upstream dam/agricultural decisions directly to downstream ecological and geopolitical outcomes."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-2-1-c1",
        question:
          "A river channel has a cross-sectional area of $24\\text{ m}^2$ and mean velocity of $1.5\\text{ m/s}$. Calculate its discharge and state two urban factors that would increase peak discharge.",
        promptType: "calculation",
        hints: ["Use Q = A × v.", "Think about tarmac/roofs and storm drains."],
        modelAnswer:
          "Discharge $Q = 24 \\times 1.5 = 36\\text{ m}^3/\\text{s}$. Urbanization increases peak discharge via (1) impermeable concrete/asphalt reducing infiltration and forcing overland flow, and (2) dense storm-sewer networks routing water rapidly to the channel, shortening lag time.",
        keyTermsToInclude: ["Cumecs", "cross-sectional area", "impermeable surface", "lag time"],
        formulaUsed: "$Q = A \\times v$"
      }
    ],
    analysis: {
      coreThesis:
        "Drainage basins are dynamic open systems where land-use changes and engineering interventions redistribute flood risk, sediment, and water security across upstream–downstream communities.",
      theoreticalFoundations:
        "Open-system hydrological balance, Bradshaw Model, Hjulström curve, Integrated Water Resources Management (IWRM).",
      strategicEvaluation:
        "Soft engineering ('making room for the river') and basin-wide treaties outperform isolated hard engineering over multi-decade timescales.",
      commonMisconceptions: [
        "Saying 'water disappears into the ground' instead of specifying infiltration (into soil) and percolation (into bedrock).",
        "Assuming artificial levées eliminate flood risk rather than raising flood height when overtopped."
      ],
      realWorldConnections:
        "Netherlands 'Room for the River' programme; Grand Ethiopian Renaissance Dam (GERD) Nile diplomacy."
    },
    cases: [
      {
        id: "geo-2-1-case1",
        title: "Netherlands 'Room for the River' (Rhine–Meuse)",
        regionOrContext: "Western Europe · HIC",
        geographicMechanism:
          "Replaced rigid dyke heightening with lowered floodplains, bypass channels, and dyke setbacks to absorb peak Rhine discharge safely.",
        concepts: ["possibility", "process", "scale"],
        syllabusLink: "2.1 Freshwater · Soft Flood Management",
        quantitativeInsight: "30+ projects across Rhine branches designed to accommodate 16,000 m^3/s peak flow."
      },
      {
        id: "geo-2-1-case2",
        title: "Nile Basin & Grand Ethiopian Renaissance Dam (GERD)",
        regionOrContext: "Northeast Africa · Transboundary",
        geographicMechanism:
          "Ethiopia's 5+ GW hydropower dam clashes with Egypt's downstream irrigation dependence (~97% of freshwater from Nile), testing basin governance.",
        concepts: ["power", "spatial-interaction", "scale"],
        syllabusLink: "2.1 Freshwater · Transboundary Conflict",
        quantitativeInsight: "74 billion m^3 reservoir capacity; Blue Nile supplies ~85% of Nile floodwater."
      }
    ],
    conceptTracking: [
      { conceptId: "process", intensity: 5, manifestation: "Infiltration, overland flow, fluvial erosion/deposition, and eutrophication." },
      { conceptId: "power", intensity: 4, manifestation: "Upstream hydro-hegemony vs. downstream water security." },
      { conceptId: "possibility", intensity: 4, manifestation: "Room for the River wetland restoration and IDBM." }
    ],
    examPromptTakeaway:
      "Sketching a quick labelled storm hydrograph (rising limb, peak, lag time, baseflow) earns immediate analytical clarity.",
    examBlueprint: {
      paper1TrapPattern: "Confusing lag time (peak rainfall to peak discharge) with time of concentration.",
      paper2StructuredPrompt: "Evaluate the strategies used to manage river flooding in one named drainage basin.",
      commandTerm: "Evaluate",
      idealSolutionBreakdown: {
        statePrinciples: "Define flood management goals (reducing peak discharge or exposure).",
        showWorking: "Compare hard engineering (dams/levées) with soft engineering (zoning/wetlands).",
        caseAndScale: "Use Rhine 'Room for the River' to show why spatial flood accommodation outperforms dyke-only strategies."
      },
      pitfallsToAvoid: [
        "Describing hydrological processes without linking them to discharge/lag time.",
        "Forgetting downstream sediment starvation caused by dams."
      ]
    }
  },
  {
    id: "geo-2-2",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.2",
    displayCode: "2.2",
    syllabusRef: "Unit 2 · Option B (SL & HL)",
    title: "Oceans & Coastal Margins",
    subtitle: "Ocean circulation, ENSO, coastal landforms, coral reefs/mangroves, and ICZM.",
    level: "SL / HL",
    strategicImportance:
      "Bridges physical oceanography (thermohaline circulation, El Niño, wave refraction) with marine geopolitics (UNCLOS EEZs, Arctic shipping, ICZM).",
    readingTimeMinutes: 14,
    summary:
      "Oceans regulate planetary climate through surface gyres and deep thermohaline circulation, while periodic ENSO shifts disrupt fisheries and rainfall globally. Along coastal margins, waves, tides, and sea-level change sculpt cliffs, spits, and barrier islands, demanding Integrated Coastal Zone Management (ICZM) to balance erosion defense, tourism, and marine ecosystems.",
    speedReadBullets: [
      "Thermohaline circulation ('global conveyor belt') distributes equatorial heat poleward via cold, saline North Atlantic Deep Water sinking.",
      "El Niño weakens Pacific trade winds, halting Peruvian upwelling (collapsing anchoveta fisheries) and triggering drought in Australia/Indonesia.",
      "Constructive waves build beaches (strong swash); destructive waves erode cliffs (strong backwash); longshore drift transports sediment along coasts.",
      "Coral reefs (narrow temp/salinity/light band) and mangroves store 'blue carbon' and dissipate wave energy, yet suffer bleaching and shrimp-farm clearing.",
      "UNCLOS grants 12 nm territorial seas and 200 nm Exclusive Economic Zones (EEZs), driving geopolitical disputes in the Arctic and South China Sea."
    ],
    primer5Min:
      "Coastal and marine systems operate as coupled physical-human engines. Ocean currents redistribute heat and nutrients; when ENSO flips Pacific pressure gradients, weather extremes cascade globally. At the shore, wave refraction concentrates energy on headlands and deposits sediment in bays via longshore drift. Rising seas and coastal urbanization threaten coral reefs and mangroves—natural buffers that Integrated Coastal Zone Management (ICZM) seeks to protect alongside equitable ocean governance.",
    subSections: [
      {
        id: "geo-2-2-s1",
        title: "Ocean Circulation, Upwelling & ENSO",
        marker: "2.2.1",
        content:
          "Surface currents driven by prevailing winds and Coriolis deflection form subtropical gyres, while deep thermohaline circulation is powered by density gradients (cold, salty water sinking in the North Atlantic). Under normal Walker Circulation, Pacific trade winds push warm water west toward Indonesia, drawing cold, nutrient-rich water up off Peru (Humboldt Current upwelling). During El Niño, trade winds weaken or reverse: warm water pools eastward, suppressing Peruvian upwelling, collapsing fish stocks, and bringing floods to coastal Peru alongside severe droughts across eastern Australia and Southeast Asia.",
        analyticalTakeaway:
          "Distinguish normal/La Niña upwelling conditions from El Niño's eastward warm-pool shift and teleconnections."
      },
      {
        id: "geo-2-2-s2",
        title: "Coastal Landforms & Management (ICZM)",
        marker: "2.2.2",
        content:
          "Advancing vs. retreating coasts reflect rock lithology, wave energy, and relative sea-level change. Erosion creates headlands, wave-cut platforms, arches, and stacks; longshore drift builds spits, bars, and tombolos. Hard engineering (groynes, sea walls, rip-rap) interrupts sediment cells and accelerates downdrift erosion. Soft approaches (beach nourishment, dune stabilization, managed retreat) and Integrated Coastal Zone Management (ICZM) plan across whole sediment cells.",
        analyticalTakeaway:
          "Explain coastal management impacts using sediment-cell thinking: trapping sand at A starves beach B."
      },
      {
        id: "geo-2-2-s3",
        title: "Blue Carbon Ecosystems & Ocean Geopolitics",
        marker: "2.2.3",
        content:
          "Coral reefs (< 20–30 m clear warm water) and tropical mangroves sustain marine biodiversity and absorb storm surges, yet face ocean acidification (lowered aragonite saturation), thermal bleaching, and coastal reclamation. Geopolitically, the 1982 UN Convention on the Law of the Sea (UNCLOS) defines a 12-nautical-mile territorial sea and 200-nautical-mile Exclusive Economic Zone (EEZ), sparking contested sovereignty claims over fisheries, hydrocarbons, and sea lanes in the South China Sea and warming Arctic Ocean.",
        analyticalTakeaway:
          "Link UNCLOS EEZ boundaries directly to resource sovereignty (fisheries, seabed minerals, shipping routes)."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-2-2-c1",
        question:
          "Contrast the impacts of an El Niño event on coastal Peru versus eastern Australia.",
        promptType: "explain",
        hints: [
          "Trace the movement of the warm water pool and atmospheric convection.",
          "Include both marine fisheries and terrestrial rainfall impacts."
        ],
        modelAnswer:
          "In coastal Peru, weakened trade winds suppress cold nutrient upwelling, collapsing anchoveta fisheries while warm surface waters drive intense convection, heavy rainfall, and flooding. Conversely, eastern Australia experiences descending dry air, causing severe drought, crop failure, and elevated bushfire risk.",
        keyTermsToInclude: ["Trade winds", "upwelling", "Walker Circulation", "anchoveta", "drought"]
      }
    ],
    analysis: {
      coreThesis:
        "Marine circulation drives global climate teleconnections, while sustainable coastal stewardship requires managing entire sediment cells, blue-carbon habitats, and UNCLOS ocean commons.",
      theoreticalFoundations:
        "Walker Circulation & ENSO, Coastal Sediment Cells, UNCLOS (1982), Integrated Coastal Zone Management (ICZM).",
      strategicEvaluation:
        "Managed retreat and mangrove restoration increasingly outperform static concrete sea walls in cost-benefit analyses under accelerating sea-level rise.",
      commonMisconceptions: [
        "Thinking groynes 'create' sand rather than trapping longshore drift and starving downdrift beaches.",
        "Confusing ocean acidification (CO2 dissolving to form carbonic acid) with ocean warming."
      ],
      realWorldConnections:
        "Great Barrier Reef coral bleaching, Holderness Coast erosion (UK), South China Sea EEZ disputes."
    },
    cases: [
      {
        id: "geo-2-2-case1",
        title: "Holderness Coast — Sediment Cell & Terminal Groyne Syndrome",
        regionOrContext: "Yorkshire, UK · HIC",
        geographicMechanism:
          "Weak boulder clay cliffs erode ~1.8 m/yr; groynes at Hornsea/Mappleton protect towns but starve downdrift farms of beach protection.",
        concepts: ["process", "place", "scale"],
        syllabusLink: "2.2 Oceans & Coasts · Hard Engineering Trade-Offs",
        quantitativeInsight: "~1.8 m/yr average cliff retreat; fastest-eroding coastline in Europe."
      },
      {
        id: "geo-2-2-case2",
        title: "Great Barrier Reef — Bleaching & ICZM Zoning",
        regionOrContext: "Queensland, Australia · HIC",
        geographicMechanism:
          "Marine heatwaves expel symbiotic zooxanthellae, while Reef 2050 zoning restricts fishing and agricultural sediment runoff.",
        concepts: ["possibility", "power", "scale"],
        syllabusLink: "2.2 Oceans & Coasts · Coral Conservation",
        quantitativeInsight: "2,300 km reef system; multiple mass bleaching events since 2016."
      }
    ],
    conceptTracking: [
      { conceptId: "process", intensity: 5, manifestation: "Thermohaline sinking, ENSO shifts, and longshore sediment drift." },
      { conceptId: "power", intensity: 4, manifestation: "UNCLOS EEZ disputes and competing coastal tourism/conservation interests." }
    ],
    examPromptTakeaway:
      "Always name the exact coastal process (e.g., longshore drift, wave refraction) and stakeholder conflict when evaluating ICZM.",
    examBlueprint: {
      paper1TrapPattern: "Forgetting that a 200 nm EEZ grants sovereign resource rights, NOT full territorial sovereignty (ships still have freedom of navigation).",
      paper2StructuredPrompt: "Evaluate the effectiveness of coastal management strategies along one stretch of coastline.",
      commandTerm: "Evaluate",
      idealSolutionBreakdown: {
        statePrinciples: "Define sediment cells and hard vs. soft engineering.",
        showWorking: "Analyze spatial externalities (groynes protecting town A while eroding village B).",
        caseAndScale: "Apply Holderness Coast data (~1.8 m/yr erosion) to justify cost-benefit managed retreat in low-value rural reaches."
      },
      pitfallsToAvoid: [
        "Listing coastal landforms without explaining wave type or lithology.",
        "Omitting stakeholders (insurers, farmers, councils, conservationists)."
      ]
    }
  },
  {
    id: "geo-2-3",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.3",
    displayCode: "2.3",
    syllabusRef: "Unit 2 · Option C (SL & HL)",
    title: "Extreme Environments",
    subtitle: "Glacial & arid landscapes, climate-driven permafrost thaw, resource extraction, and sustainability.",
    level: "SL / HL",
    strategicImportance:
      "Explores physical processes in periglacial/glacial and hot arid biomes alongside indigenous livelihoods, hydrocarbon/mineral extraction, and desert/polar fragility.",
    readingTimeMinutes: 13,
    summary:
      "Extreme environments—polar/glacial regions and hot arid deserts—feature harsh climatic thresholds that constrain agriculture and settlement yet hold vast mineral, fossil-fuel, and solar reserves. Slow biological recovery makes these landscapes acutely vulnerable to permafrost thaw, salinization, and extractive development.",
    speedReadBullets: [
      "Glacial/periglacial environments exhibit freeze-thaw weathering, plucking, abrasion, and permafrost (ground frozen >= 2 consecutive years).",
      "Hot arid deserts (< 250 mm annual rainfall) form via subtropical high-pressure belts, rain shadows, continentality, and cold coastal currents.",
      "Arid landforms include wadis, alluvial fans, mesa/butte plateaus, and barchan dunes shaped by episodic flash floods and aeolian transport.",
      "Resource extraction (Arctic oil/gas, Atacama lithium) generates export revenue and geopolitical rivalry while threatening fragile tundra and aquifers.",
      "Indigenous communities (Inuit, San, Tuareg) face disrupted seasonal mobility from climate warming, border controls, and mining."
    ],
    primer5Min:
      "Cold and arid extremes occupy opposite ends of Earth's energy and moisture spectrum, yet share fragile carrying capacities. In glacial and periglacial zones, warming melts glaciers and thaws permafrost, buckling pipelines and roads via thermokarst subsidence. In deserts, sparse episodic rain creates flash-flood landforms while irrigation and mining risk salinization and fossil-aquifer depletion.",
    subSections: [
      {
        id: "geo-2-3-s1",
        title: "Glacial & Periglacial Processes & Landforms",
        marker: "2.3.1",
        content:
          "Glacial mass balance compares winter accumulation against summer ablation; negative balances drive rapid alpine and ice-sheet retreat. Erosional processes (plucking, abrasion, freeze-thaw) carve corries, arêtes, U-shaped troughs, and fjords; deposition yields moraines, drumlins, and outwash plains. In periglacial zones, seasonal thawing of the active layer above continuous permafrost causes solifluction, patterned ground, and thermokarst subsidence when infrastructure heats frozen ground.",
        analyticalTakeaway:
          "Link permafrost active-layer deepening directly to engineering challenges (e.g., elevated Trans-Alaska Pipeline thermosiphons)."
      },
      {
        id: "geo-2-3-s2",
        title: "Hot Arid Processes, Landforms & Salinization",
        marker: "2.3.2",
        content:
          "Hot deserts arise from descending Hadley Cell air (~30° N/S), rain shadows (Atacama), continentality (Gobi), and cold currents (Namib). Mechanical weathering (insolation/salt crystallization) and wind deflation/abrasion sculpt yardangs and barchan/star dunes, while rare convective storms carve steep-walled wadis and alluvial fans. Over-irrigation without drainage draws dissolved salts upward via capillary action, causing salinization and soil infertility.",
        analyticalTakeaway:
          "Remember that water (episodic flash floods) shapes many major desert landforms alongside wind."
      },
      {
        id: "geo-2-3-s3",
        title: "Resource Extraction, Tourism & Indigenous Futures",
        marker: "2.3.3",
        content:
          "Extreme environments hold strategic resources: Arctic hydrocarbons and rare earths, Sahara/Atacama solar irradiance, and Andean salar lithium brines. Extracting these requires specialized cold/arid engineering and creates tension with indigenous land rights (e.g., Sámi reindeer herding vs. Arctic wind/mining) and extreme-tourism waste/water footprints. Sustainable management pairs strict environmental impact caps with indigenous co-governance.",
        analyticalTakeaway:
          "Evaluate resource projects by weighing national strategic value against local ecological fragility and indigenous rights."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-2-3-c1",
        question:
          "Explain how irrigation in hot arid environments can lead to soil salinization.",
        promptType: "explain",
        hints: [
          "Consider high potential evapotranspiration rates.",
          "Trace upward capillary movement of water and dissolved salts."
        ],
        modelAnswer:
          "High temperatures and evaporation rates draw irrigation water upward through soil pores by capillary action. As pure water evaporates at the surface, dissolved mineral salts remain behind in the topsoil, forming toxic crusts that inhibit plant root water uptake.",
        keyTermsToInclude: ["Evapotranspiration", "capillary action", "salinization", "waterlogging"]
      }
    ],
    analysis: {
      coreThesis:
        "Extreme environments possess low ecological resilience; climate change and extractive industries amplify physical instability and threaten indigenous livelihoods.",
      theoreticalFoundations:
        "Glacial Mass Balance, Hadley Cell Aridity, Carrying Capacity & Ecological Fragility.",
      strategicEvaluation:
        "Long-term sustainability requires strict environmental regulation, closed-loop water use in mining/tourism, and legally binding indigenous consent.",
      commonMisconceptions: [
        "Assuming deserts are shaped solely by wind—flash floods create wadis, canyons, and alluvial fans.",
        "Confusing permafrost (thermal condition >= 2 years <= 0°C) with permanent snow cover."
      ],
      realWorldConnections:
        "Trans-Alaska Pipeline thermosiphons, Atacama lithium brine extraction, Svalbard tourism regulations."
    },
    cases: [
      {
        id: "geo-2-3-case1",
        title: "Atacama Desert — Lithium Brine & Water Stress",
        regionOrContext: "Northern Chile · Arid Highland",
        geographicMechanism:
          "Pumping lithium-rich groundwater from Salar de Atacama evaporates vast brine volumes, lowering water tables for indigenous Lickanantay communities and flamingos.",
        concepts: ["power", "place", "possibility"],
        syllabusLink: "2.3 Extreme Environments · Resource Extraction",
        quantitativeInsight: "~2 million litres of water evaporated per tonne of lithium carbonate via brine ponds."
      }
    ],
    conceptTracking: [
      { conceptId: "place", intensity: 5, manifestation: "Distinctive glacial/arid landforms and indigenous cultural adaptations." },
      { conceptId: "process", intensity: 4, manifestation: "Permafrost thermokarst, freeze-thaw, and capillary salinization." }
    ],
    examPromptTakeaway:
      "Always pair physical process terminology (abrasion, capillary action, active layer) with human sustainability constraints.",
    examBlueprint: {
      paper1TrapPattern: "Calling all desert regions 'sand seas'—only ~20% of arid areas are ergs (sand); most are rocky hamada or gravel reg.",
      paper2StructuredPrompt: "Examine the opportunities and challenges of mineral or energy resource extraction in one named extreme environment.",
      commandTerm: "Examine",
      idealSolutionBreakdown: {
        statePrinciples: "Identify physical barriers (remoteness, permafrost/aridity) and strategic resource value.",
        showWorking: "Contrast economic/energy-transition benefits against water depletion, spills, and indigenous displacement.",
        caseAndScale: "Use Atacama lithium brine extraction or Arctic oil/gas to illustrate multi-scale trade-offs."
      },
      pitfallsToAvoid: [
        "Ignoring indigenous populations as passive rather than active stakeholders.",
        "Omitting specific physical conditions (e.g., 250 mm threshold, permafrost definition)."
      ]
    }
  },
  {
    id: "geo-2-4",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.4",
    displayCode: "2.4",
    syllabusRef: "Unit 2 · Option D (SL & HL)",
    title: "Geophysical Hazards",
    subtitle: "Plate tectonics, earthquakes, volcanoes, mass movements, and disaster risk management.",
    level: "SL / HL",
    strategicImportance:
      "Examines tectonic processes alongside the Risk Equation, Parks Hazard Response Curve, and why equal-magnitude events cause vastly different death tolls.",
    readingTimeMinutes: 14,
    summary:
      "Geophysical hazards—earthquakes, volcanic eruptions, and mass movements—originate from lithospheric plate boundaries and slope instability. Whether a physical hazard becomes a human disaster depends on vulnerability, building codes, land-use zoning, and governance.",
    speedReadBullets: [
      "Plate margins: divergent (mid-ocean ridges, shield volcanoes), convergent/subduction (megathrust quakes, composite stratovolcanoes), transform (shallow destructive quakes).",
      "Hazard Risk = (Hazard × Vulnerability) / Capacity to Cope; poverty, informal housing, and corrupt building inspection magnify mortality.",
      "Secondary hazards (liquefaction, tsunamis, lahars, pyroclastic flows) frequently exceed primary shaking deaths.",
      "Pre-event mitigation (seismic retrofitting, tsunami seawalls, lahar zoning) saves far more lives than post-event rescue alone.",
      "The Hazard Management Cycle (Preparedness, Response, Recovery, Mitigation) and Park's Model track post-disaster quality-of-life trajectories."
    ],
    primer5Min:
      "Why did the 2010 Haiti M7.0 earthquake kill over 200,000 people while the 2010 Chile M8.8 earthquake killed ~525? The physical hazard alone never tells the story. Tectonic setting controls magnitude, focal depth, and magma viscosity (effusive basalt vs. explosive silica-rich andesite), but socio-economic resilience—enforced seismic codes, early-warning networks, and rapid emergency logistics—determines human survival and economic recovery.",
    subSections: [
      {
        id: "geo-2-4-s1",
        title: "Tectonic Settings & Mass Movement Mechanisms",
        marker: "2.4.1",
        content:
          "Subduction zones generate deep-to-shallow megathrust earthquakes (up to Mw 9.0+), tsunamis from seafloor displacement, and explosive stratovolcanoes fed by viscous, gas-rich silica magma (producing pyroclastic flows and lahars). Divergent and hotspot settings yield low-viscosity basaltic shield volcanoes with effusive lava flows. Mass movements (rockfalls, rotational slumps, mudflows) occur when shear stress exceeds shear strength due to slope undercutting, intense rainfall saturating pore spaces, or seismic shaking.",
        analyticalTakeaway:
          "Explain volcanic explosivity through magma silica content, viscosity, and trapped gas pressure."
      },
      {
        id: "geo-2-4-s2",
        title: "Differential Vulnerability & Risk Perception",
        marker: "2.4.2",
        content:
          "Vulnerability varies by wealth, housing quality, age, and access to information. Unreinforced masonry and soft-story buildings collapse under lateral seismic shear, whereas base-isolated skyscrapers sway safely. People continue living in hazard zones (e.g., Naples near Vesuvius, California faults) due to fertile volcanic soils, economic opportunity, optimism bias, and inability to afford relocation.",
        analyticalTakeaway:
          "Never explain disaster death tolls by magnitude alone; link them to focal depth, population density, and governance/building codes."
      },
      {
        id: "geo-2-4-s3",
        title: "Prediction, Preparedness & Park's Response Model",
        marker: "2.4.3",
        content:
          "Volcanoes offer reliable precursors (harmonic tremors, SO2 emissions, ground tilt deformation), enabling timely evacuation. Earthquakes cannot be deterministically predicted, making structural engineering, liquefaction zoning, and seconds-ahead P-wave early warning systems vital. Park's Hazard Response Curve tracks quality of life dropping during impact, stabilizing via relief, and either rebounding to previous standards or 'building back better'.",
        analyticalTakeaway:
          "Distinguish probabilistic seismic forecasting (long-term probabilities) from volcanic short-term monitoring."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-2-4-c1",
        question:
          "Explain why composite stratovolcanoes at subduction zones pose greater explosive risk than shield volcanoes at divergent margins.",
        promptType: "explain",
        hints: [
          "Compare magma silica content and viscosity.",
          "Explain how gas pressure builds before eruption."
        ],
        modelAnswer:
          "Subduction melts water-rich oceanic crust and continental sediments, producing high-silica rhyolitic/andesitic magma with high viscosity. Viscous magma traps dissolved volatiles until pressure exceeds rock strength, triggering violent explosive eruptions, tephra columns, and lethal pyroclastic flows—unlike low-viscosity basaltic shield eruptions where gases escape easily.",
        keyTermsToInclude: ["Subduction", "silica content", "viscosity", "pyroclastic flow", "volatiles"]
      }
    ],
    analysis: {
      coreThesis:
        "Tectonic and slope physics determine hazard character, while socioeconomic governance, building enforcement, and preparedness determine disaster mortality.",
      theoreticalFoundations:
        "Plate Tectonic Theory, Degg's Risk Model, Park's Hazard Response Curve, Shear Stress vs. Shear Strength.",
      strategicEvaluation:
        "Investment in enforced building codes and community drills yields the highest return per dollar in reducing geophysical mortality.",
      commonMisconceptions: [
        "Claiming earthquakes can be reliably predicted days in advance—only probabilistic forecasts and P-wave early warnings (seconds) exist.",
        "Confusing Richter/Moment Magnitude (energy released) with Mercalli Intensity (localized shaking/damage)."
      ],
      realWorldConnections:
        "Japan's J-Alert seismic system, 2010 Haiti vs. Chile earthquakes, 2023 Turkey–Syria soft-story building collapses."
    },
    cases: [
      {
        id: "geo-2-4-case1",
        title: "2010 Haiti vs. 2010 Chile Earthquakes",
        regionOrContext: "Caribbean (LIC) vs. Andean Margin (MIC/HIC)",
        geographicMechanism:
          "Chile's Mw 8.8 quake released ~500× more energy than Haiti's Mw 7.0, yet strict seismic building codes kept Chilean fatalities ~525 vs. >220,000 in Haiti.",
        concepts: ["power", "scale", "place"],
        syllabusLink: "2.4 Geophysical Hazards · Vulnerability Contrast",
        quantitativeInsight: "Mw 7.0 (>220,000 deaths, Haiti) vs. Mw 8.8 (~525 deaths, Chile)."
      }
    ],
    conceptTracking: [
      { conceptId: "process", intensity: 5, manifestation: "Subduction, magma viscosity, liquefaction, and slope shear failure." },
      { conceptId: "power", intensity: 4, manifestation: "Regulatory enforcement of seismic codes and emergency relief inequality." }
    ],
    examPromptTakeaway:
      "Comparing two contrasted hazard events (e.g., Haiti vs. Chile or Japan) is the sharpest way to prove vulnerability > magnitude.",
    examBlueprint: {
      paper1TrapPattern: "Confusing primary hazards (ground shaking, lava) with secondary hazards (tsunami, liquefaction, lahar).",
      paper2StructuredPrompt: "Discuss the view that socioeconomic vulnerability is more important than hazard magnitude in determining disaster impacts.",
      commandTerm: "Discuss",
      idealSolutionBreakdown: {
        statePrinciples: "Define hazard, vulnerability, and capacity to cope.",
        showWorking: "Show physical controls (depth, distance, substrate liquefaction) alongside building codes and healthcare.",
        caseAndScale: "Contrast Haiti (2010) and Chile (2010) to demonstrate how governance decouples magnitude from mortality."
      },
      pitfallsToAvoid: [
        "Forgetting mass movements (landslides) as a core geophysical hazard alongside earthquakes and volcanoes.",
        "Overlooking secondary hazards triggered days or weeks later (disease, aftershocks)."
      ]
    }
  },
  {
    id: "geo-2-5",
    unitId: "unit-2",
    unitNumber: 2,
    topicCode: "2.5",
    displayCode: "2.5",
    syllabusRef: "Unit 2 · Option G (SL & HL)",
    title: "Urban Environments",
    subtitle: "Urbanization, land-use models, urban microclimates, social stress, and sustainable resilient cities.",
    level: "SL / HL",
    strategicImportance:
      "Links urban morphology (CBD, gentrification, megacities) to urban heat islands, informal settlements, and circular/transit-oriented urban planning.",
    readingTimeMinutes: 15,
    summary:
      "Over 56% of humanity now lives in urban areas, with rapid megacity expansion concentrated in Asia and Africa alongside suburbanization and counter-urbanization in post-industrial cities. Managing rapid growth demands tackling housing inequality, urban heat islands, congestion, and carbon footprints through compact, transit-oriented, and resilient design.",
    speedReadBullets: [
      "Urbanization (share living in cities) grows fastest in LICs/MICs via rural-urban migration and natural urban increase; HICs see counter-urbanization and re-urbanization.",
      "Bid-rent curves allocate high-accessibility CBD land to commercial uses, while industrial/residential zones radiate outward or cluster along transit corridors.",
      "Urban Heat Island (UHI) raises city temperatures 2–5 °C above rural surroundings via low-albedo asphalt, canyon geometry, and anthropogenic heat.",
      "Informal settlements (favelas, slums) house >1 billion globally, exhibiting high social ingenuity alongside tenure insecurity and sanitation deficits.",
      "Eco-city and resilient planning integrate Bus Rapid Transit (BRT), green roofs, sponge-city permeable pavements, and mixed-income zoning."
    ],
    primer5Min:
      "Cities are humanity's most efficient engines of innovation and economic productivity, yet concentrate environmental and social stress. Bid-rent competition pushes lower-income households to peripheral or hazard-prone informal settlements, while concrete canyons trap solar heat and accelerate storm runoff. Sustainable urban futures depend on compact mixed-use density, electrified mass transit, green-blue infrastructure ('sponge cities'), and upgrading informal tenure rather than evicting residents.",
    subSections: [
      {
        id: "geo-2-5-s1",
        title: "Urbanization, Megacities & Land-Use Dynamics",
        marker: "2.5.1",
        content:
          "Megacities (>10 million inhabitants) such as Lagos, Jakarta, and Tokyo concentrate political, financial, and industrial functions. Within cities, Alonso's Bid-Rent Theory explains how competition for central accessibility concentrates high-rise offices and retail in the Central Business District (CBD). Over time, deindustrialization leaves brownfield inner-city zones prone to gentrification—raising property values and displacing lower-income tenants—while suburban sprawl consumes peri-urban farmland.",
        analyticalTakeaway:
          "Distinguish urbanization (percentage share rising) from urban growth (absolute population increase)."
      },
      {
        id: "geo-2-5-s2",
        title: "Urban Microclimates & Environmental Stress",
        marker: "2.5.2",
        content:
          "Urbanization alters local hydrology and climate. Dark asphalt and concrete lower surface albedo, store sensible heat, and block nocturnal long-wave cooling inside street canyons, generating an Urban Heat Island (UHI) up to 4–5 °C warmer at night. Combined with vehicle NOx/PM2.5 emissions and impermeable surfaces, cities face acute heatwave mortality and flash flooding. 'Sponge city' retrofits (bioswales, permeable pavements, urban tree canopies) simultaneously cool air and detain stormwater.",
        analyticalTakeaway:
          "Explain UHI using energy-balance mechanisms: low albedo, reduced evapotranspiration, canyon trapping, and waste heat."
      },
      {
        id: "geo-2-5-s3",
        title: "Informal Settlements & Sustainable Urban Systems",
        marker: "2.5.3",
        content:
          "Rapid in-migration outpacing formal housing supply creates informal settlements lacking secure land tenure, piped water, and formal sanitation. In-situ upgrading (providing titles, metered water, cable-car transit as in Medellín) outperforms slum clearance, which merely shifts informality to worse locations. Broader urban sustainability frameworks (e.g., Rogers' Circular City Metabolism, Curitiba's BRT) cut per-capita transport emissions and material waste.",
        analyticalTakeaway:
          "Evaluate urban interventions through both environmental metabolism (inputs/outputs) and social equity (displacement risk)."
      }
    ],
    checkUnderstanding: [
      {
        id: "geo-2-5-c1",
        question:
          "Explain three physical mechanisms that create an Urban Heat Island (UHI) in a high-density city centre.",
        promptType: "explain",
        hints: [
          "Think about surface albedo, vegetation/evapotranspiration, and building geometry.",
          "Include anthropogenic heat sources."
        ],
        modelAnswer:
          "First, dark asphalt and roofing have low albedo, absorbing more short-wave solar radiation during the day and releasing heat slowly at night. Second, scarce vegetation and impermeable surfaces sharply reduce evaporative cooling (latent heat flux). Third, tall street-canyon walls trap outgoing long-wave radiation and reduce wind ventilation, compounded by waste heat from HVAC units and traffic.",
        keyTermsToInclude: ["Albedo", "evapotranspiration", "street canyon", "anthropogenic heat", "long-wave radiation"]
      }
    ],
    analysis: {
      coreThesis:
        "Urban spatial structure reflects land-rent power and migration dynamics, while resilient planning uses compact transit, green-blue infrastructure, and tenure security to reconcile growth with livability.",
      theoreticalFoundations:
        "Bid-Rent Theory, Urban Heat Island Energy Balance, Linear vs. Circular Urban Metabolism, Sustainable Cities (SDG 11).",
      strategicEvaluation:
        "Compact, transit-oriented cities paired with in-situ informal upgrading deliver far lower per-capita emissions and higher social inclusion than car-dependent sprawl.",
      commonMisconceptions: [
        "Equating high population density automatically with unsustainability—dense transit-served cities have lower per-capita footprints than sprawling suburbs.",
        "Treating informal settlements solely as crime/poverty zones rather than vital hubs of urban labour and self-built housing."
      ],
      realWorldConnections:
        "Curitiba Bus Rapid Transit (BRT), Medellín Metrocable & social urbanism, Wuhan/Shenzhen Sponge City pilots."
    },
    cases: [
      {
        id: "geo-2-5-case1",
        title: "Curitiba — Transit-Oriented Eco-City Planning",
        regionOrContext: "Southern Brazil · MIC",
        geographicMechanism:
          "Structural transit corridors with high-capacity Bus Rapid Transit (BRT) and linear flood-park greenways guided dense growth without costly subways.",
        concepts: ["possibility", "place", "scale"],
        syllabusLink: "2.5 Urban Environments · Sustainable Transport",
        quantitativeInsight: "~70% of commuters use public transit; ~50 m^2 of green space per resident."
      },
      {
        id: "geo-2-5-case2",
        title: "Medellín — Metrocable & In-Situ Slum Upgrading",
        regionOrContext: "Colombia · MIC",
        geographicMechanism:
          "Steep hillside informal barrios connected to the metro network via aerial cable cars, paired with public libraries and lighting.",
        concepts: ["power", "place", "spatial-interaction"],
        syllabusLink: "2.5 Urban Environments · Inclusive Social Infrastructure",
        quantitativeInsight: "Commute times from hillside comunas to CBD fell from ~90 min to ~15 min."
      }
    ],
    conceptTracking: [
      { conceptId: "place", intensity: 5, manifestation: "Distinctive urban morphologies, CBDs, and informal barrios." },
      { conceptId: "possibility", intensity: 5, manifestation: "BRT corridors, sponge-city retrofits, and circular urban metabolism." }
    ],
    examPromptTakeaway:
      "Use 'urban metabolism' (inputs/outputs) and 'spatial equity' to elevate Paper 1 urban essays above generic pros/cons.",
    examBlueprint: {
      paper1TrapPattern: "Confusing counter-urbanization (moving out to rural villages) with suburbanization (moving to the urban fringe).",
      paper2StructuredPrompt: "Evaluate strategies used to manage environmental and social challenges in one named city.",
      commandTerm: "Evaluate",
      idealSolutionBreakdown: {
        statePrinciples: "Define urban sustainability (environmental metabolism + social inclusion).",
        showWorking: "Analyze transit, housing/tenure, and green-blue microclimate infrastructure.",
        caseAndScale: "Compare Curitiba's BRT/flood-park integration or Medellín's Metrocable against sprawl pressures."
      },
      pitfallsToAvoid: [
        "Describing traffic jams without linking to urban form and land-use zoning.",
        "Ignoring gentrification/displacement side effects of urban renewal."
      ]
    }
  }
];
