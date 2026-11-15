import { ThemeId } from "./types";

export interface GermanEntryTicketItem {
  id: string;
  topicId: string;
  themeId: ThemeId;
  code: string;
  displayCode: string;
  title: string;
  englishTitle: string;
  level: "SL / HL" | "HL Focus";
  sixtySecondSummary: string;
  culturalSpotlight: {
    title: string;
    region: string;
    description: string;
  };
  redemittel: {
    phrase: string;
    meaning: string;
    example: string;
  }[];
  keyGrammar: {
    title: string;
    formula: string;
    tip: string;
  };
  keyVocab: {
    german: string;
    english: string;
    context: string;
  }[];
  teacherDiscussionQuestions: string[];
  commonMisconceptions: string;
}

export const GERMAN_ENTRY_TICKETS: GermanEntryTicketItem[] = [
  // =========================================================================
  // THEMA 1: IDENTITÄTEN (IDENTITIES)
  // =========================================================================
  {
    id: "sub-1-1",
    topicId: "sub-1-1",
    themeId: "identitaeten",
    code: "1.1",
    displayCode: "T1.1",
    title: "Lebensstile, Ernährung & Wohlbefinden",
    englishTitle: "Lifestyles, Nutrition & Well-Being",
    level: "SL / HL",
    sixtySecondSummary:
      "Moderne Lebensweisen im DACH-Raum: Zunehmender Bio-Trend, pflanzenbasierte Ernährung und das Streben nach Work-Life-Balance stehen wachsendem Leistungsdruck und Schlafmangel bei Oberstufenschülern gegenüber. Die Debatte dreht sich um individuelle Verantwortung versus staatliche Eingriffe (z.B. Zuckersteuern).",
    culturalSpotlight: {
      title: "Bio-Boom & Reformhaus-Tradition",
      region: "Deutschland",
      description:
        "Deutschland ist der größte Bio-Markt Europas. Ketten wie Alnatura und Wochenmärkte prägen das Stadtbild, basierend auf der lebensreformerischen Tradition des 19. Jahrhunderts.",
    },
    redemittel: [
      {
        phrase: "Meines Erachtens (+ Verb auf Pos. 2)",
        meaning: "In my opinion / In my view",
        example: "Meines Erachtens ist eine ausgewogene Ernährung die Grundlage für schulischen Erfolg.",
      },
      {
        phrase: "Es lässt sich nicht leugnen, dass...",
        meaning: "It cannot be denied that...",
        example: "Es lässt sich nicht leugnen, dass der Leistungsdruck bei Jugendlichen zugenommen hat.",
      },
    ],
    keyGrammar: {
      title: "Kausale Nebensätze (weil / da)",
      formula: "..., weil / da + Subjekt + ... + Verb am Satzende.",
      tip: "Vergessen Sie nicht das Komma vor 'weil' und die Endstellung des konjugierten Verbs.",
    },
    keyVocab: [
      { german: "die Ausgewogenheit", english: "balance / equilibrium", context: "Eine gesunde Ausgewogenheit zwischen Schule und Freizeit ist unabdingbar." },
      { german: "das Wohlbefinden", english: "well-being", context: "Mentales Wohlbefinden wird im Schulalltag oft vernachlässigt." },
      { german: "der Leistungsdruck", english: "pressure to perform", context: "Jugendliche leiden zunehmend unter enormem Leistungsdruck." },
    ],
    teacherDiscussionQuestions: [
      "Ist der Bio- und Vegantrend ein elitärer Wohlstandsluxus oder eine ökologische Notwendigkeit?",
      "Inwiefern führt der Leistungsdruck im Gymnasium zu psychosozialen Belastungen?",
      "Sollte der Staat ungesunde Lebensmittel durch Werbeverbote und Steuern regulieren?",
    ],
    commonMisconceptions:
      "Falscher Freund: 'das Wohlbefinden' (nicht 'Wellbeing' eindeutschen). Grammatikfalle: 'weil' verlangt Verb am Ende, wohingegen 'denn' Position 0 einnimmt ('denn er ist krank' vs. 'weil er krank ist').",
  },
  {
    id: "sub-1-2",
    topicId: "sub-1-2",
    themeId: "identitaeten",
    code: "1.2",
    displayCode: "T1.2",
    title: "Gesundheit, Suchtverhalten & Prävention",
    englishTitle: "Health, Addiction & Preventive Care",
    level: "SL / HL",
    sixtySecondSummary:
      "Analyse physischer und psychischer Gesundheit bei Jugendlichen: Risiken durch traditionellen Alkoholkonsum ('Komasaufen'), Vaping und digitale Süchte (Smartphone- und Gaming-Abhängigkeit). Im Fokus stehen gesetzliche Präventionsprogramme und das Bismarcksche Solidaritätsprinzip.",
    culturalSpotlight: {
      title: "Gesetzliche Krankenversicherung & Kurkultur",
      region: "Deutschland",
      description:
        "Das 1883 von Otto von Bismarck eingeführte Solidaritätsprinzip garantiert universelle Krankenversicherung. Die ärztlich verordnete Erholungskur ist weltweit einzigartig.",
    },
    redemittel: [
      {
        phrase: "Ich bin der festen Überzeugung, dass...",
        meaning: "I am firmly convinced that...",
        example: "Ich bin der festen Überzeugung, dass Aufklärung wirksamer ist als strenge Verbote.",
      },
      {
        phrase: "Man muss in Betracht ziehen, dass...",
        meaning: "One must take into account that...",
        example: "Man muss in Betracht ziehen, dass soziale Medien das Suchtrisiko drastisch erhöhen.",
      },
    ],
    keyGrammar: {
      title: "Konditionalsätze mit Konjunktiv II (wenn-Sätze)",
      formula: "Wenn + Subjekt + ... + Verb (Konj. II), würde / könnte + Subjekt + ... + Infinitiv.",
      tip: "Nutzen Sie Konjunktiv II ('Wenn Jugendliche besser aufgeklärt würden, gäbe es weniger Abhängigkeit'), um Band 7-8 in Criterion A zu erzielen.",
    },
    keyVocab: [
      { german: "die Vorbeugung / Prävention", english: "prevention", context: "Frühzeitige Vorbeugung an Schulen kann riskantes Suchtverhalten verhindern." },
      { german: "die Abhängigkeit", english: "addiction / dependency", context: "Ständige Erreichbarkeit führt bei vielen zu digitaler Abhängigkeit." },
      { german: "die psychische Belastbarkeit", english: "mental resilience", context: "Achtsamkeitsübungen stärken die psychische Belastbarkeit junger Menschen." },
    ],
    teacherDiscussionQuestions: [
      "Welche Maßnahmen sind wirksamer gegen jugendlichen Alkoholkonsum: Aufklärung oder Verbote?",
      "Sollte Social-Media-Sucht offiziell als behandlungsbedürftige Krankheit anerkannt werden?",
      "Wie beeinflusst das duale Krankenversicherungssystem die Chancengleichheit in Deutschland?",
    ],
    commonMisconceptions:
      "Achtung bei 'abhängig sein von + Dativ' (nicht mit Akkusativ). Häufige Verwechslung: 'die Sucht' (addiction) versus 'die Suche' (search).",
  },
  {
    id: "sub-1-3",
    topicId: "sub-1-3",
    themeId: "identitaeten",
    code: "1.3",
    displayCode: "T1.3",
    title: "Subkulturen, Jugendidentität & Selbstausdruck",
    englishTitle: "Subcultures, Youth Identity & Self-Expression",
    level: "SL / HL",
    sixtySecondSummary:
      "Jugendliche Identitätsfindung im Spannungsfeld zwischen Konformismus und Rebellion: Kleidung, Tattoos, Piercings, Musikstile (Deutschrap, Techno, Indie) und digitale Selbstdarstellung auf TikTok und Instagram. Der Berliner Club- und Underground-Raum als Zufluchtsort für non-konformen Selbstausdruck.",
    culturalSpotlight: {
      title: "Berliner Clubkultur als UNESCO-Kulturerbe",
      region: "Deutschland",
      description:
        "Die Berliner Techno-Szene und ikonische Clubs wie das Berghain wurden 2024 zum immateriellen UNESCO-Kulturerbe ernannt, als Symbole für Freiheit nach dem Mauerfall.",
    },
    redemittel: [
      {
        phrase: "Aus meiner Perspektive lässt sich schlussfolgern, dass...",
        meaning: "From my perspective, one can conclude that...",
        example: "Aus meiner Perspektive lässt sich schlussfolgern, dass Subkulturen unverzichtbare Schutzräume bieten.",
      },
      {
        phrase: "Es steht außer Frage, dass...",
        meaning: "It is beyond question that...",
        example: "Es steht außer Frage, dass Kleidung als visuelles Statement fungiert.",
      },
    ],
    keyGrammar: {
      title: "Relativsätze im Dativ und Akkusativ",
      formula: "..., der / die / das / die (Akk/Dat) + Subjekt + ... + Verb am Ende.",
      tip: "Beispiel: 'Die Subkultur, der (Dat. fem.) viele Jugendliche angehören, stärkt das Selbstwertgefühl.'",
    },
    keyVocab: [
      { german: "die Zugehörigkeit", english: "belonging / affiliation", context: "Das Bedürfnis nach Zugehörigkeit prägt die Adoleszenz." },
      { german: "der Gruppenzwang", english: "peer pressure", context: "Viele Jugendliche passen sich aus Angst vor Gruppenzwang an." },
      { german: "der Selbstausdruck", english: "self-expression", context: "Kreativer Selbstausdruck ist ein grundlegendes Menschenrecht." },
    ],
    teacherDiscussionQuestions: [
      "Inwiefern fördern soziale Medien Konformismus anstelle von echtem individuellem Selbstausdruck?",
      "Warum gilt die Berliner Clubkultur als historisches Symbol für gesellschaftliche Freiheit?",
      "Wie balancieren Jugendliche den Wunsch nach Einzigartigkeit mit dem Bedürfnis nach Gruppenzugehörigkeit?",
    ],
    commonMisconceptions:
      "Verwechslung von 'die Identität' (Einzahl) und 'die Identitäten'. 'Sich anpassen an + Akkusativ' (nicht mit Dativ).",
  },
  {
    id: "sub-1-4",
    topicId: "sub-1-4",
    themeId: "identitaeten",
    code: "1.4",
    displayCode: "T1.4",
    title: "Sprache, Dialekte & Kulturelle Identität",
    englishTitle: "Language, Dialects & Cultural Identity",
    level: "SL / HL",
    sixtySecondSummary:
      "Die sprachliche Vielfalt im DACH-Raum: Schweizerdeutsch (Schwyzerdütsch) als Diglossie, österreichisches Deutsch (Austriazismen), regionale Dialekte (Bairisch, Plattdeutsch) und moderne Jugendsprache ('Kiezdeutsch'). Debatten über Gendersternchen und den Einfluss des Englischen (Denglisch).",
    culturalSpotlight: {
      title: "Schwyzerdütsch & die Schweizer Diglossie",
      region: "Schweiz",
      description:
        "In der Deutschschweiz herrscht mediale Diglossie: Schweizerdeutsch wird in allen sozialen Schichten im Alltag gesprochen, während Standarddeutsch als Schriftsprache dient.",
    },
    redemittel: [
      {
        phrase: "Einerseits ..., andererseits ... (+ Inversion)",
        meaning: "On the one hand ..., on the other hand ...",
        example: "Einerseits bereichern Anglizismen den Wortschatz, andererseits verdrängen sie traditionelle Begriffe.",
      },
      {
        phrase: "Im Vergleich zu (+ Dativ)...",
        meaning: "In comparison to...",
        example: "Im Vergleich zur Schweiz ist in Deutschland die Verwendung von Dialekten rückläufig.",
      },
    ],
    keyGrammar: {
      title: "Doppelkonnektoren (sowohl... als auch / weder... noch)",
      formula: "Sowohl + Nomen + als auch + Nomen / Weder ... noch ...",
      tip: "Nutzen Sie Doppelkonnektoren für nuancierte Vergleiche in Paper 1 und im mündlichen Examen.",
    },
    keyVocab: [
      { german: "die Mehrsprachigkeit", english: "multilingualism", context: "Die Schweiz ist ein Paradebeispiel für gelebte Mehrsprachigkeit." },
      { german: "die Mundart / der Dialekt", english: "dialect / vernacular", context: "Mundarten stiften regionale Identität und Heimatverbundenheit." },
      { german: "die Sprachveränderung", english: "language change / evolution", context: "Sprachveränderung ist ein natürlicher, kontinuierlicher Prozess." },
    ],
    teacherDiscussionQuestions: [
      "Bedroht die Verwendung von Anglizismen (Denglisch) den Erhalt der deutschen Sprache?",
      "Warum hat Schweizerdeutsch einen höheren gesellschaftlichen Status als regionale Dialekte in Deutschland?",
      "Sollten Schulen Kiezdeutsch als legitime Sprachvarietät akzeptieren?",
    ],
    commonMisconceptions:
      "Schweizerdeutsch ist kein Einzeldialekt, sondern ein Sammelbegriff für alemannische Mundarten ohne einheitliche Rechtschreibung. 'Gendern' polarisiert im DACH-Raum stark.",
  },
  {
    id: "sub-1-5",
    topicId: "sub-1-5",
    themeId: "identitaeten",
    code: "1.5",
    displayCode: "T1.5",
    title: "Werte, Glaube & Weltanschauung",
    englishTitle: "Values, Faith & Worldviews",
    level: "HL Focus",
    sixtySecondSummary:
      "Säkularisierung und Wertewandel in deutschsprachigen Gesellschaften: Sinkende Kirchenmitgliederzahlen, Kirchenaustritte und die verfassungsmäßige Kirchensteuer in Deutschland im Kontrast zu wachsendem religiösem Pluralismus (Islam, Buddhismus) und säkularem Humanismus.",
    culturalSpotlight: {
      title: "Kirchensteuer & Staatsleistungen",
      region: "Deutschland",
      description:
        "In Deutschland zieht der Staat für anerkannte Religionsgemeinschaften die Kirchensteuer (8-9% der Einkommensteuer) ein—ein historisches Relikt der Weimarer Reichsverfassung.",
    },
    redemittel: [
      {
        phrase: "Es liegt auf der Hand, dass...",
        meaning: "It is obvious / self-evident that...",
        example: "Es liegt auf der Hand, dass traditionelle Kirchen an gesellschaftlichem Einfluss verlieren.",
      },
      {
        phrase: "Trotz (+ Genitiv) der voranschreitenden Säkularisierung...",
        meaning: "Despite the advancing secularization...",
        example: "Trotz der Säkularisierung prägen christliche Feiertage weiterhin den Jahreskalender.",
      },
    ],
    keyGrammar: {
      title: "Präpositionen mit Genitiv (trotz, wegen, während, statt)",
      formula: "Präposition + Genitivendung (-es/-s bei mask./neutr., -er bei fem./plur.)",
      tip: "Nutzen Sie Genitivpräpositionen in formellen Aufsätzen, um gehobenen Sprachstil (C1) zu demonstrieren.",
    },
    keyVocab: [
      { german: "die Säkularisierung", english: "secularization", context: "Die Säkularisierung führt zu einem tiefgreifenden Wandel gesellschaftlicher Werte." },
      { german: "die Weltanschauung", english: "worldview / philosophy of life", context: "Jeder Bürger hat das Recht auf freie Wahl seiner Weltanschauung." },
      { german: "die Glaubensfreiheit", english: "freedom of religion", context: "Die Glaubensfreiheit ist im deutschen Grundgesetz fest verankert." },
    ],
    teacherDiscussionQuestions: [
      "Sollte die staatliche Einziehung der Kirchensteuer in Deutschland abgeschafft werden?",
      "Welche Werte verbinden moderne pluralistische Gesellschaften, wenn religiöse Bindungen nachlassen?",
      "Wie lässt sich das Spannungsverhältnis zwischen Religionsfreiheit und staatlicher Neutralität lösen?",
    ],
    commonMisconceptions:
      "Achtung: 'trotz' verlangt im Schriftdeutschen zwingend den Genitiv ('trotz des Regens', nicht Dativ 'trotz dem Regen').",
  },

  // =========================================================================
  // THEMA 2: ERFAHRUNGEN (EXPERIENCES)
  // =========================================================================
  {
    id: "sub-2-1",
    topicId: "sub-2-1",
    themeId: "erfahrungen",
    code: "2.1",
    displayCode: "T2.1",
    title: "Freizeit, Hobbys & Digitale Unterhaltung",
    englishTitle: "Leisure, Hobbies & Digital Entertainment",
    level: "SL / HL",
    sixtySecondSummary:
      "Freizeitgestaltung im digitalen Zeitalter: Der traditionelle deutsche 'Verein' (Sportvereine, Musikvereine, Freiwillige Feuerwehr) als soziales Rückgrat versus immersives Online-Gaming, Streaming-Dienste und Social Media. Das Phänomen FOMO (Fear of Missing Out) und digitaler Rückzug.",
    culturalSpotlight: {
      title: "Vereinskultur in Deutschland",
      region: "Deutschland",
      description:
        "Über 600.000 eingetragene Vereine (e.V.) existieren in Deutschland. Fast jeder zweite Deutsche ist Mitglied in mindestens einem Verein—ein Pfeiler des gesellschaftlichen Zusammenhalts.",
    },
    redemittel: [
      {
        phrase: "Ein wesentlicher Vorteil besteht darin, dass...",
        meaning: "A significant advantage consists in the fact that...",
        example: "Ein wesentlicher Vorteil besteht darin, dass Vereine soziale Bindungen stärken.",
      },
      {
        phrase: "Man darf jedoch nicht übersehen, dass...",
        meaning: "One must not overlook, however, that...",
        example: "Man darf jedoch nicht übersehen, dass exzessiver Bildschirmkonsum einsam macht.",
      },
    ],
    keyGrammar: {
      title: "Infinitivkonstruktionen mit 'um... zu' und 'ohne... zu'",
      formula: "um / ohne / anstatt + ... + zu + Infinitiv am Ende.",
      tip: "Nutzen Sie 'um... zu' nur, wenn das Subjekt im Haupt- und Nebensatz identisch ist.",
    },
    keyVocab: [
      { german: "das Vereinsleben", english: "club life / associative life", context: "Das Vereinsleben fördert bürgerschaftliches Engagement und Teamgeist." },
      { german: "die Freizeitgestaltung", english: "leisure activities / leisure planning", context: "Sinnvolle Freizeitgestaltung bildet einen Ausgleich zum Schulstress." },
      { german: "der Bildschirmkonsum", english: "screen time / screen consumption", context: "Pädagogen warnen vor unkontrolliertem Bildschirmkonsum bei Kindern." },
    ],
    teacherDiscussionQuestions: [
      "Verlieren Sportvereine ihre soziale Anziehungskraft durch E-Sports und Online-Gaming?",
      "Inwiefern ist das Vereinswesen ein unersetzliches Bindeglied der deutschen Zivilgesellschaft?",
      "Wie wirkt sich die ständige digitale Erreichbarkeit auf die Qualität von Freizeit aus?",
    ],
    commonMisconceptions:
      "Falscher Freund: 'der Verein' (nicht 'Club' im Diskotheken-Sinn, sondern gemeinnützige Vereinigung). 'Zu Hause sein' (Zustand) vs. 'nach Hause gehen' (Richtung).",
  },
  {
    id: "sub-2-2",
    topicId: "sub-2-2",
    themeId: "erfahrungen",
    code: "2.2",
    displayCode: "T2.2",
    title: "Reisen, Sanfter Tourismus & Mobilität",
    englishTitle: "Travel, Sustainable Tourism & Mobility",
    level: "SL / HL",
    sixtySecondSummary:
      "Die Deutschen als 'Reiseweltmeister': Flugreisen und Overtourism in den Alpen versus ökologischer 'sanfter Tourismus' (Bahnreisen, Wandern, Ferien auf dem Bauernhof). Debatten über CO2-Kompensation, Nachtzüge und das 49-Euro-Ticket (Deutschlandticket) als Mobilitätsrevolution.",
    culturalSpotlight: {
      title: "Das Deutschlandticket (49-Euro-Ticket)",
      region: "Deutschland",
      description:
        "Als Nachfolger des 9-Euro-Tickets revolutioniert das Deutschlandticket den Nah- und Regionalverkehr und fördert klimafreundliche Mobilität im Alltag und Urlaub.",
    },
    redemittel: [
      {
        phrase: "Dies führt unweigerlich zu (+ Dativ)...",
        meaning: "This inevitably leads to...",
        example: "Massentourismus führt unweigerlich zu schweren ökologischen Schäden im Alpenraum.",
      },
      {
        phrase: "Im Gegensatz zu traditionellen Pauschalreisen...",
        meaning: "In contrast to traditional package tours...",
        example: "Im Gegensatz zu Pauschalreisen setzt sanfter Tourismus auf Nachhaltigkeit.",
      },
    ],
    keyGrammar: {
      title: "Adjektivdeklination nach bestimmtem und unbestimmtem Artikel",
      formula: "der sanfte (Nom.) / den sanften (Akk.) / mit sanftem (Dat.)",
      tip: "Kriterium A erfordert absolute Sicherheit bei Adjektivendungen im Dativ und Akkusativ.",
    },
    keyVocab: [
      { german: "der sanfte Tourismus", english: "sustainable / green tourism", context: "Sanfter Tourismus schont empfindliche alpine Ökosysteme." },
      { german: "die CO2-Bilanz", english: "carbon footprint", context: "Bahnreisen verbessern die persönliche CO2-Bilanz erheblich." },
      { german: "die Wanderlust", english: "love of hiking / travel desire", context: "Die traditionelle deutsche Wanderlust erlebt eine Renaissance bei jungen Menschen." },
    ],
    teacherDiscussionQuestions: [
      "Sollte der Flugverkehr durch höhere Kerosinsteuern zugunsten von Nachtzügen eingeschränkt werden?",
      "Kann sanfter Tourismus den wirtschaftlichen Wohlstand von Bergregionen wie Tirol sichern?",
      "Inwiefern verändert das Deutschlandticket das Mobilitätsverhalten junger Generationen?",
    ],
    commonMisconceptions:
      "'Fahren' (mit Verkehrsmitteln/Bahn/Auto) vs. 'Reisen' (allgemeines Verreisen) vs. 'Fliegen'. 'Nach Deutschland fahren', aber 'in die Schweiz reisen'.",
  },
  {
    id: "sub-2-3",
    topicId: "sub-2-3",
    themeId: "erfahrungen",
    code: "2.3",
    displayCode: "T2.3",
    title: "Bräuche, Traditionen & Feste im DACH-Raum",
    englishTitle: "Customs, Traditions & Festivals in DACH",
    level: "SL / HL",
    sixtySecondSummary:
      "Kulturelle Feste und Bräuche als Identitätsstifter: Karneval / Fasching / Fastnacht im Rheinland und Süddeutschland, das Münchner Oktoberfest, alpenländische Almabtriebe und die Basler Fasnacht. Diskussion über Kommerzialisierung, kulturelle Aneignung und Erhalt lebendiger Traditionen.",
    culturalSpotlight: {
      title: "Rheinischer Karneval vs. Schwäbisch-Alemannische Fastnacht",
      region: "Deutschland",
      description:
        "Während der Kölner Karneval ein farbenfrohes Straßenfest mit 'Kamelle' und Prunksitzungen ist, pflegt die alemannische Fastnacht uralte heidnische Holzmasken-Bräuche zur Winteraustreibung.",
    },
    redemittel: [
      {
        phrase: "Es ist allgemein bekannt, dass...",
        meaning: "It is widely known that...",
        example: "Es ist allgemein bekannt, dass Bräuche das Gemeinschaftsgefühl stärken.",
      },
      {
        phrase: "Aufgrund (+ Genitiv) dieser langen Historie...",
        meaning: "Due to this long history...",
        example: "Aufgrund seiner langen Historie ist der Karneval tief im Brauchtum verwurzelt.",
      },
    ],
    keyGrammar: {
      title: "Passivformen (Vorgangspassiv mit 'werden')",
      formula: "Subjekt + werden (konjugiert) + ... + Partizip II (+ von / durch)",
      tip: "Verwenden Sie Passiv für sachliche Beschreibungen von Bräuchen: 'Zur Fastnacht werden geschnitzte Holzmasken getragen.'",
    },
    keyVocab: [
      { german: "das Brauchtum", english: "tradition / customs", context: "Lebendiges Brauchtum verbindet Generationen miteinander." },
      { german: "die Verkleidung / das Kostüm", english: "costume / disguise", context: "Fantasievolle Verkleidungen gehören untrennbar zum Kölner Karneval." },
      { german: "die Ausgelassenheit", english: "exuberance / merriment", context: "Die Tage vor Aschermittwoch sind von fröhlicher Ausgelassenheit geprägt." },
    ],
    teacherDiscussionQuestions: [
      "Haben traditionelle Feste heute noch eine echte gesellschaftliche Bedeutung oder sind sie reine Touristenattraktionen?",
      "Inwiefern spiegeln Karneval und Fastnacht historische Herrschaftskritik wider?",
      "Sollten diskriminierende Kostüme beim Karneval verboten oder reglementiert werden?",
    ],
    commonMisconceptions:
      "Karneval (Rheinland), Fasching (Bayern/Österreich) und Fastnacht (Südwesten/Schweiz) bezeichnen dasselbe Phänomen, haben aber grundverschiedene regionale Wurzeln und Rituale.",
  },
  {
    id: "sub-2-4",
    topicId: "sub-2-4",
    themeId: "erfahrungen",
    code: "2.4",
    displayCode: "T2.4",
    title: "Lebensgeschichten, Migration & Exil",
    englishTitle: "Life Stories, Migration & Exile",
    level: "SL / HL",
    sixtySecondSummary:
      "Deutschland, Österreich und die Schweiz als Einwanderungsländer: Historische Gastarbeitergeneration der 1960er Jahre, Spätaussiedler, Geflüchtete von 2015 und 2022. Autobiografische Erfahrungen, doppelte Staatsbürgerschaft, Integration, Diskriminierung und das Konzept der 'Heimat'.",
    culturalSpotlight: {
      title: "Das Anwerbeabkommen von 1961 (Gastarbeiter)",
      region: "Deutschland",
      description:
        "Das Wirtschaftswunder war ohne die Millionen 'Gastarbeiter' aus der Türkei, Italien und Griechenland undenkbar. Ihre Familien prägen heute Wirtschaft, Kultur und Küche.",
    },
    redemittel: [
      {
        phrase: "Besonders hervorzuheben ist, dass...",
        meaning: "It should be particularly emphasized that...",
        example: "Besonders hervorzuheben ist, dass Migranten entscheidend zum Wohlstand beitragen.",
      },
      {
        phrase: "Dies wirft die fundamentale Frage auf, ob...",
        meaning: "This raises the fundamental question whether...",
        example: "Dies wirft die fundamentale Frage auf, wie eine gelungene Integration definiert werden sollte.",
      },
    ],
    keyGrammar: {
      title: "Vergangenheitstempora (Perfekt vs. Präteritum)",
      formula: "Perfekt (mündlich/Brief) vs. Präteritum (schriftliche Biografie/Bericht)",
      tip: "Nutzen Sie Präteritum für narrative Lebensgeschichten in Paper 1 ('Er wanderte 1965 ein und baute sich eine Existenz auf').",
    },
    keyVocab: [
      { german: "der Migrationshintergrund", english: "migration background", context: "Über ein Viertel der Bevölkerung in Deutschland hat einen Migrationshintergrund." },
      { german: "die Einbürgerung", english: "naturalization / citizenship grant", context: "Die Reform des Staatsangehörigkeitsrechts erleichtert die Einbürgerung." },
      { german: "die Zerrissenheit", english: "inner conflict / feeling torn", context: "Viele Einwanderer der zweiten Generation spüren eine kulturelle Zerrissenheit." },
    ],
    teacherDiscussionQuestions: [
      "Wie hat sich das deutsche Selbstverständnis vom 'Nicht-Einwanderungsland' zur modernen Einwanderungsgesellschaft gewandelt?",
      "Was bedeutet der Begriff 'Heimat' für Menschen mit doppelter Staatsbürgerschaft?",
      "Welche Hürden müssen Migranten auf dem deutschen Arbeitsmarkt überwinden?",
    ],
    commonMisconceptions:
      "'Fliehen vor + Dativ' (vor dem Krieg fliehen) vs. 'flüchten in + Akkusativ'. Unterscheidung: 'Aussiedler' vs. 'Gastarbeiter' vs. 'Geflüchtete'.",
  },
  {
    id: "sub-2-5",
    topicId: "sub-2-5",
    themeId: "erfahrungen",
    code: "2.5",
    displayCode: "T2.5",
    title: "Riten des Übergangs: Jugendweihe, Matura & Zivildienst",
    englishTitle: "Rites of Passage: Jugendweihe, Matura & Civil Service",
    level: "HL Focus",
    sixtySecondSummary:
      "Übergangsrituale von der Kindheit ins Erwachsenenalter: Die Abitur- / Matura-Feiern ('Abischerz', 'Maturaball'), die ostdeutsche säkulare 'Jugendweihe', Konfirmation und Firmung. Die Debatte über die Wiedereinführung der Wehrpflicht oder eines verpflichtenden sozialen Dienstjahres.",
    culturalSpotlight: {
      title: "Die Jugendweihe in Ostdeutschland",
      region: "Deutschland",
      description:
        "Ursprünglich im 19. Jahrhundert als säkulare Alternative zur christlichen Konfirmation entstanden, war die Jugendweihe in der DDR staatlich forciert und ist bis heute in Ostdeutschland sehr populär.",
    },
    redemittel: [
      {
        phrase: "Man sollte keinesfalls außer Acht lassen, dass...",
        meaning: "One should under no circumstances disregard that...",
        example: "Man sollte keinesfalls außer Acht lassen, dass Übergangsriten jungen Menschen Orientierung geben.",
      },
      {
        phrase: "Befürworter argumentieren, dass ... Dagegen wenden Kritiker ein, dass...",
        meaning: "Proponents argue that ... In contrast, critics object that...",
        example: "Befürworter fordern ein soziales Pflichtjahr; Kritiker wenden ein, dass dies die Berufsfreiheit beschneidet.",
      },
    ],
    keyGrammar: {
      title: "Indirekte Rede mit Konjunktiv I",
      formula: "Er behauptet, dies sei (Konj. I) ein wichtiger Schritt...",
      tip: "Verwenden Sie Konjunktiv I bei der Wiedergabe von Expertenmeinungen in journalistischen Textsorten (Paper 1).",
    },
    keyVocab: [
      { german: "die Jugendweihe", english: "secular coming-of-age ceremony", context: "Bei der Jugendweihe werden 14-Jährige feierlich in den Kreis der Erwachsenen aufgenommen." },
      { german: "das Pflichtjahr", english: "mandatory service year", context: "Ein soziales Pflichtjahr könnte den Zusammenhalt zwischen Generationen stärken." },
      { german: "der Meilenstein", english: "milestone", context: "Das Bestehen des Abiturs ist ein lebensprägender Meilenstein." },
    ],
    teacherDiscussionQuestions: [
      "Sollte in Deutschland oder Österreich ein verpflichtendes soziales Dienstjahr für alle Jugendlichen eingeführt werden?",
      "Warum erfreut sich die säkulare Jugendweihe in den neuen Bundesländern ungebrochener Beliebtheit?",
      "Inwiefern markieren Schulabschlüsse wie das Abitur oder die Matura den echten Beginn des Erwachsenseins?",
    ],
    commonMisconceptions:
      "Abitur (Deutschland) = Matura (Österreich, Schweiz). 'Bestehen' verlangt Akkusativ ohne Präposition: 'das Abitur bestehen' (nicht 'in dem Abitur').",
  },

  // =========================================================================
  // THEMA 3: MENSCHLICHE ERFINDUNGSKRAFT (HUMAN INGENUITY)
  // =========================================================================
  {
    id: "sub-3-1",
    topicId: "sub-3-1",
    themeId: "genialitaet",
    code: "3.1",
    displayCode: "T3.1",
    title: "Künstliche Intelligenz, Algorithmen & Arbeitswelt",
    englishTitle: "Artificial Intelligence, Algorithms & The Future of Work",
    level: "SL / HL",
    sixtySecondSummary:
      "Der Einfluss generativer KI (ChatGPT, Automatisierung) auf Bildung und Beruf: Chancen für Produktivität versus Gefahren von Arbeitsplatzverlusten, Plagiaten an Schulen und dem Verlust kritischen Denkens. Die europäische KI-Verordnung (EU AI Act) als Vorreiter weltweiter Regulierung.",
    culturalSpotlight: {
      title: "Der EU AI Act & deutsche Innovationsdebatten",
      region: "Deutschland",
      description:
        "Die Europäische Union verabschiedete 2024 das weltweit erste umfassende Gesetz zur Regulierung von KI. Deutsche Unternehmen fordern Augenmaß, um im globalen Tech-Wettbewerb nicht abgehängt zu werden.",
    },
    redemittel: [
      {
        phrase: "Zweifelsohne birgt diese Technologie sowohl Risiken als auch Chancen...",
        meaning: "Undoubtedly, this technology harbors both risks and opportunities...",
        example: "Zweifelsohne birgt generative KI sowohl Risiken als auch ungeahnte Chancen.",
      },
      {
        phrase: "Es muss sichergestellt werden, dass...",
        meaning: "It must be ensured that...",
        example: "Es muss sichergestellt werden, dass der Mensch die Letztentscheidung behält.",
      },
    ],
    keyGrammar: {
      title: "Passiversatzformen (sich lassen + Infinitiv / sein + zu + Infinitiv)",
      formula: "Das Problem lässt sich lösen (= kann gelöst werden) / Es ist zu beachten (= muss beachtet werden)",
      tip: "Passiversatzformen demonstrieren fortgeschrittenen akademischen C1-Sprachgebrauch.",
    },
    keyVocab: [
      { german: "die künstliche Intelligenz (KI)", english: "artificial intelligence (AI)", context: "Künstliche Intelligenz revolutioniert Diagnoseverfahren in der Medizin." },
      { german: "die Automatisierung", english: "automation", context: "Die zunehmende Automatisierung bedroht traditionelle Büroberufe." },
      { german: "die Urheberschaft", english: "authorship / copyright", context: "Bei KI-generierten Texten ist die Frage der Urheberschaft ungeklärt." },
    ],
    teacherDiscussionQuestions: [
      "Sollte der Einsatz von KI-Tools bei Schulprüfungen verboten oder als Kernkompetenz integriert werden?",
      "Wer haftet für Fehlentscheidungen autonomer Algorithmen: Entwickler, Nutzer oder Staat?",
      "Bedroht künstliche Intelligenz kreative Berufe wie Journalismus, Kunst und Musik?",
    ],
    commonMisconceptions:
      "'Die KI' ist feminin (die Intelligenz). Falscher Freund: 'der Algorithmus' (Plural: die Algorithmen, nicht Algorithme).",
  },
  {
    id: "sub-3-2",
    topicId: "sub-3-2",
    themeId: "genialitaet",
    code: "3.2",
    displayCode: "T3.2",
    title: "Soziale Medien, Datenschutz & Überwachung",
    englishTitle: "Social Media, Data Privacy & Surveillance",
    level: "SL / HL",
    sixtySecondSummary:
      "Die besondere deutsche Sensibilität für Datenschutz (DSGVO): Historisch gewachsenes Misstrauen gegenüber staatlicher Überwachung (Gestapo, Stasi) trifft auf Tech-Konzerne, Vorratsdatenspeicherung und Gesichtserkennung im öffentlichen Raum. Das 'Recht auf informationelle Selbstbestimmung'.",
    culturalSpotlight: {
      title: "Das Stasi-Erbe & die DSGVO-Sensibilität",
      region: "Deutschland",
      description:
        "Aufgrund der totalitären Überwachung durch die DDR-Staatssicherheit gilt Datenschutz in Deutschland als Grundrecht mit Verfassungsrang ('gläserner Bürger').",
    },
    redemittel: [
      {
        phrase: "Aus historischer Sicht ist verständlich, warum...",
        meaning: "From a historical perspective, it is understandable why...",
        example: "Aus historischer Sicht ist verständlich, warum Deutsche beim Datenschutz besonders sensibel sind.",
      },
      {
        phrase: "Die Kehrseite der Medaille ist jedoch...",
        meaning: "The flip side of the coin, however, is...",
        example: "Die Kehrseite der Medaille ist, dass überbordender Datenschutz Innovationen bremsen kann.",
      },
    ],
    keyGrammar: {
      title: "Konzessive Nebensätze (obwohl / obgleich / wenn auch)",
      formula: "Obwohl + Subjekt + ... + Verb am Satzende, + Verb + Subjekt...",
      tip: "Achten Sie auf die Inversion im Hauptsatz nach dem konzessiven Nebensatz: 'Obwohl viele den Datenschutz loben, meckern sie über Bürokratie.'",
    },
    keyVocab: [
      { german: "der Datenschutz", english: "data privacy / data protection", context: "Der Schutz persönlicher Daten genießt in Deutschland höchsten Stellenwert." },
      { german: "der gläserne Bürger", english: "transparent citizen (surveilled)", context: "Kritiker warnen davor, dass Überwachungskameras den gläsernen Bürger schaffen." },
      { german: "die Selbstbestimmung", english: "self-determination", context: "Informationelle Selbstbestimmung bedeutet Kontrolle über die eigenen Daten." },
    ],
    teacherDiscussionQuestions: [
      "Ist übertriebener Datenschutz in Deutschland ein Hindernis für die Digitalisierung im Schul- und Gesundheitswesen?",
      "Warum wiegt der Schutz der Privatsphäre in Deutschland schwerer als in angelsächsischen Ländern?",
      "Sollte staatliche Gesichtserkennung an Bahnhöfen zur Terrorbekämpfung erlaubt sein?",
    ],
    commonMisconceptions:
      "'Daten' ist Plural ('Daten werden gespeichert', nicht 'Daten wird'). 'Datenschutz' nicht mit 'Datensicherheit' (Security) verwechseln.",
  },
  {
    id: "sub-3-3",
    topicId: "sub-3-3",
    themeId: "genialitaet",
    code: "3.3",
    displayCode: "T3.3",
    title: "Medizinischer Fortschritt, Bioethik & Genetik",
    englishTitle: "Medical Progress, Bioethics & Genetics",
    level: "SL / HL",
    sixtySecondSummary:
      "Ethische Grenzen des Machbaren: CRISPR-Cas9 (Genscheren), Präimplantationsdiagnostik (PID), Impfpflichtdebatten und Organspende-Modelle (Widerspruchslösung vs. Entscheidungslösung). Der Deutsche Ethikrat als interdisziplinäres Beratergremium für Politik und Gesellschaft.",
    culturalSpotlight: {
      title: "Der Deutsche Ethikrat & Stammzellen-Gesetzgebung",
      region: "Deutschland",
      description:
        "Wegen der nationalsozialistischen Medizinverbrechen (Eugenik) hat Deutschland eines der weltweit strengsten Embryonenschutzgesetze.",
    },
    redemittel: [
      {
        phrase: "Hierbei stellt sich die ethische Kernfrage...",
        meaning: "Here, the core ethical question arises...",
        example: "Hierbei stellt sich die ethische Kernfrage, wo die Grenze des wissenschaftlich Erlaubten liegt.",
      },
      {
        phrase: "Es gilt abzuwägen, inwiefern...",
        meaning: "It is necessary to weigh up to what extent...",
        example: "Es gilt abzuwägen, inwiefern Heilerfolge genetische Risiken rechtfertigen.",
      },
    ],
    keyGrammar: {
      title: "Modale Infinitive (haben + zu + Infinitiv / sein + zu + Infinitiv)",
      formula: "Die Forscher haben die ethischen Grenzen zu respektieren (= müssen respektieren).",
      tip: "Nutzen Sie modale Infinitive für gehobenen formalen Ausdruck bei Argumentationen.",
    },
    keyVocab: [
      { german: "die Bioethik", english: "bioethics", context: "Die Bioethik setzt der Gentechnik moralische Leitplanken." },
      { german: "der Eingriff", english: "intervention / surgical procedure", context: "Eingriffe in das menschliche Erbgut sind hochgradig umstritten." },
      { german: "die Organspende", english: "organ donation", context: "In Deutschland gilt bei der Organspende weiterhin die Entscheidungslösung." },
    ],
    teacherDiscussionQuestions: [
      "Sollte die genetische Veränderung von menschlichen Embryonen zur Heilung von Erbkrankheiten legalisiert werden?",
      "Befürworten Sie die Widerspruchslösung bei der Organspende, wie sie in Österreich praktiziert wird?",
      "Wie beeinflussen historische Traumata die deutsche Gesetzgebung in der Gentechnik?",
    ],
    commonMisconceptions:
      "'Ethisch' (moralisch) vs. 'ethnisch' (volksbezogen) – häufige Rechtschreib- und Verwechslungsfalle! 'Der Eingriff in + Akkusativ'.",
  },
  {
    id: "sub-3-4",
    topicId: "sub-3-4",
    themeId: "genialitaet",
    code: "3.4",
    displayCode: "T3.4",
    title: "Erneuerbare Energien & Deutsche Ingenieurskunst",
    englishTitle: "Renewable Energy & German Engineering",
    level: "SL / HL",
    sixtySecondSummary:
      "Die technologische Umsetzung der Energiewende: Photovoltaik, Windkraftanlagen an Nord- und Ostsee, Wasserstofftechnologie und Stromtrassen von Nord nach Süd. Das historische Gütesiegel 'Made in Germany', der deutsche Maschinenbau und Herausforderungen durch internationale Konkurrenz.",
    culturalSpotlight: {
      title: "Vom Schandfleck zum Gütesiegel: 'Made in Germany'",
      region: "Deutschland",
      description:
        "1887 von Großbritannien eingeführt, um vor billigen deutschen Plagiaten zu warnen, entwickelte sich 'Made in Germany' zum weltweiten Inbegriff für Zuverlässigkeit und Präzisionsingenieurwesen.",
    },
    redemittel: [
      {
        phrase: "Als Vorreiter auf diesem Gebiet gilt...",
        meaning: "Considered a pioneer in this field is...",
        example: "Als Vorreiter auf diesem Gebiet gilt der deutsche Mittelstand im Maschinenbau.",
      },
      {
        phrase: "Um diesem Problem Herr zu werden, bedarf es (+ Genitiv)...",
        meaning: "To overcome this problem, it requires...",
        example: "Um den Herausforderungen Herr zu werden, bedarf es massiver Investitionen in Netze.",
      },
    ],
    keyGrammar: {
      title: "Partizipialattribute (Erweitertes Partizip I und II)",
      formula: "Partizip I (-end) für aktiv/gleichzeitig: 'die expandierende Solarindustrie' / Partizip II für passiv: 'die subventionierten Windparks'",
      tip: "Partizipialattribute sind typisch für wissenschaftliche und journalistische deutsche Texte.",
    },
    keyVocab: [
      { german: "die Energiewende", english: "energy transition (to renewables)", context: "Die Energiewende erfordert einen grundlegenden Umbau der Energieinfrastruktur." },
      { german: "die Windkraftanlage", english: "wind turbine / wind power plant", context: "Moderne Windkraftanlagen erzeugen sauberen Strom für Tausende Haushalte." },
      { german: "die Ingenieurskunst", english: "engineering prowess / engineering art", context: "Deutsche Ingenieurskunst steht international für Präzision und Innovationsgeist." },
    ],
    teacherDiscussionQuestions: [
      "Kann Deutschland seinen Industriestandort allein mit erneuerbaren Energien wettbewerbsfähig halten?",
      "Inwiefern ist das Gütesiegel 'Made in Germany' durch Softwaremängel und Bürokratie gefährdet?",
      "Warum stößt der Ausbau von Windkraftanlagen bei Anwohnern auf das NIMBY-Phänomen ('Nicht vor meiner Haustür')?",
    ],
    commonMisconceptions:
      "'Die erneuerbaren Energien' steht meist im Plural. 'Bedarf es' verlangt den Genitiv ('bedarf es schneller Lösungen').",
  },
  {
    id: "sub-3-5",
    topicId: "sub-3-5",
    themeId: "genialitaet",
    code: "3.5",
    displayCode: "T3.5",
    title: "Kunst, Musik, Architektur & Bauhaus-Erbe",
    englishTitle: "Art, Music, Architecture & The Bauhaus Legacy",
    level: "HL Focus",
    sixtySecondSummary:
      "Deutschsprachige Kultur als Triebfeder moderner Ästhetik: 1919 in Weimar von Walter Gropius gegründetes Bauhaus ('Form follows function'), klassische Meister (Bach, Beethoven, Mozart) und zeitgenössische Avantgarde (Gerhard Richter, Elfriede Jelinek, Neue Leipziger Schule).",
    culturalSpotlight: {
      title: "Bauhaus Dessau & 'Form follows function'",
      region: "Deutschland",
      description:
        "Das Bauhaus revolutionierte Architektur und Produktdesign weltweit durch schlichte Geometrie, Funktionalität und die Demokratisierung schöner Alltagsgegenstände.",
    },
    redemittel: [
      {
        phrase: "Dieses Werk spiegelt in eindrucksvoller Weise wider, wie...",
        meaning: "This work reflects in an impressive way how...",
        example: "Das Bauhaus spiegelt wider, wie Design das gesellschaftliche Zusammenleben verbessern kann.",
      },
      {
        phrase: "Im Mittelpunkt des künstlerischen Schaffens steht...",
        meaning: "At the center of artistic creation stands...",
        example: "Im Mittelpunkt steht die Reduktion auf das Wesentliche.",
      },
    ],
    keyGrammar: {
      title: "Trennbare Verben im Haupt- und Nebensatz",
      formula: "Hauptsatz: 'Das Bauhaus prägt die Moderne nachhaltig.' / Nebensatz: '..., weil es die Moderne nachhaltig prägte.'",
      tip: "Im Nebensatz verschmelzen Vorsilbe und Verb am Satzende ('widerspiegelt', 'nachwirkt').",
    },
    keyVocab: [
      { german: "die Zweckmäßigkeit", english: "functionality / expediency", context: "Zweckmäßigkeit und Ästhetik bilden im Bauhaus-Design eine untrennbare Einheit." },
      { german: "das Gesamtkunstwerk", english: "total work of art", context: "Gropius verstand die Architektur als ein allumfassendes Gesamtkunstwerk." },
      { german: "die Nachwirkung", english: "aftereffect / lasting legacy", context: "Die Nachwirkungen der Weimarer Avantgarde sind bis heute spürbar." },
    ],
    teacherDiscussionQuestions: [
      "Inwiefern hat das Bauhaus-Prinzip 'Form folgt Funktion' unsere moderne städtische Umwelt bereichert oder verödet?",
      "Welche gesellschaftliche Rolle sollte staatlich subventionierte Kunst in Zeiten knapper Haushaltskassen spielen?",
      "Wie spiegelt sich die deutsche Geschichte in den Monumentalbauten Berlins wider?",
    ],
    commonMisconceptions:
      "'Das Erbe' (Heritage/Legacy) ist Neutrum; 'der Erbe' (Heir/Beneficiary) ist Maskulinum. Trennbares Verb 'widerspiegeln' (nicht mit 'wider' = gegen verwechseln).",
  },

  // =========================================================================
  // THEMA 4: SOZIALE ORGANISATION (SOCIAL ORGANIZATION)
  // =========================================================================
  {
    id: "sub-4-1",
    topicId: "sub-4-1",
    themeId: "organisation",
    code: "4.1",
    displayCode: "T4.1",
    title: "Das Schul- & Bildungssystem im DACH-Raum",
    englishTitle: "The Education System in DACH & Apprenticeships",
    level: "SL / HL",
    sixtySecondSummary:
      "Struktur und Kontroversen des deutschsprachigen Bildungswesens: Das dreigliedrige Schulsystem (Hauptschule, Realschule, Gymnasium), Bildungsföderalismus in Deutschland, PISA-Schock und das weltweit geschätzte 'Duale Ausbildungssystem' (Betrieb + Berufsschule).",
    culturalSpotlight: {
      title: "Das Duale Ausbildungssystem",
      region: "Deutschland",
      description:
        "Die Kombination aus praktischer Lehre im Betrieb und fachtheoretischem Unterricht in der Berufsschule gilt international als Erfolgsgarant für niedrige Jugendarbeitslosigkeit.",
    },
    redemittel: [
      {
        phrase: "Experten weisen nachdrücklich darauf hin, dass...",
        meaning: "Experts emphatically point out that...",
        example: "Experten weisen darauf hin, dass die frühe Aufteilung nach Klasse 4 soziale Ungleichheit zementiert.",
      },
      {
        phrase: "Ein gravierender Nachteil besteht in (+ Dativ)...",
        meaning: "A grave disadvantage consists in...",
        example: "Ein gravierender Nachteil besteht im zersplitterten Bildungsföderalismus.",
      },
    ],
    keyGrammar: {
      title: "Verben mit festen Präpositionen (hinweisen auf + Akk, abhängen von + Dat)",
      formula: "Verb + Präposition + passender Kasus",
      tip: "Verbinden Sie dies mit Pronominaladverbien: 'darauf hinweisen, dass...' / 'davon abhängen, ob...'",
    },
    keyVocab: [
      { german: "das duale Ausbildungssystem", english: "dual vocational training system", context: "Das duale Ausbildungssystem genießt weltweit hohes Ansehen." },
      { german: "die Chancengleichheit", english: "equality of opportunity", context: "Echte Chancengleichheit hängt in Deutschland immer noch stark vom Elternhaus ab." },
      { german: "der Föderalismus", english: "federalism", context: "Im Bildungsföderalismus kocht jedes der 16 Bundesländer sein eigenes Süppchen." },
    ],
    teacherDiscussionQuestions: [
      "Sollte das dreigliedrige Schulsystem zugunsten von Gemeinschaftsschulen (wie in Skandinavien) abgeschafft werden?",
      "Ist das Abitur durch die Angleichung der Bundesländer entwertet worden?",
      "Warum entscheiden sich trotz Fachkräftemangels immer mehr Jugendliche für ein Studium statt eine Ausbildung?",
    ],
    commonMisconceptions:
      "Abitur (D) vs. Matura (A/CH). 'Unterrichten' (Lehrer unterrichtet Schüler) vs. 'lernen' (Schüler lernt) vs. 'beibringen' (jmdm. etwas beibringen).",
  },
  {
    id: "sub-4-2",
    topicId: "sub-4-2",
    themeId: "organisation",
    code: "4.2",
    displayCode: "T4.2",
    title: "Die Arbeitswelt, Gewerkschaften & Work-Life-Balance",
    englishTitle: "The World of Work, Unions & Work-Life-Balance",
    level: "SL / HL",
    sixtySecondSummary:
      "Wandel der Erwerbsarbeit: Starker Tarifvertragsschutz, Mitbestimmung und Betriebsräte treffen auf Forderungen nach einer 4-Tage-Woche, Homeoffice und dem Fachkräftemangel. Generation Z hinterfragt traditionelle 'Leistung um jeden Preis'-Mentalitäten.",
    culturalSpotlight: {
      title: "Mitbestimmung & die Sozialpartnerschaft",
      region: "Deutschland",
      description:
        "Die gesetzliche Mitbestimmung garantiert Arbeitnehmern Sitze im Aufsichtsrat großer Konzerne. Die Sozialpartnerschaft zwischen Gewerkschaften und Arbeitgebern verhindert wilde Streiks.",
    },
    redemittel: [
      {
        phrase: "Es lässt sich die Beobachtung machen, dass...",
        meaning: "The observation can be made that...",
        example: "Es lässt sich die Beobachtung machen, dass Freizeit für junge Arbeitnehmer wertvoller ist als Überstunden.",
      },
      {
        phrase: "Dies steht im krassen Widerspruch zu (+ Dativ)...",
        meaning: "This stands in stark contradiction to...",
        example: "Dies steht im krassen Widerspruch zu den Forderungen der Arbeitgeberverbände.",
      },
    ],
    keyGrammar: {
      title: "Zustandspassiv (sein + Partizip II) vs. Vorgangspassiv (werden + Partizip II)",
      formula: "Vorgang: 'Der Vertrag wird unterzeichnet' / Zustand: 'Der Vertrag ist unterzeichnet.'",
      tip: "Nutzen Sie Zustandspassiv für abgeschlossene Verhandlungsergebnisse im Arbeitsrecht.",
    },
    keyVocab: [
      { german: "die Mitbestimmung", english: "co-determination (worker representation)", context: "Die Mitbestimmung im Betrieb gilt als Grundpfeiler des deutschen Arbeitsfriedens." },
      { german: "der Fachkräftemangel", english: "skilled labor shortage", context: "Der akute Fachkräftemangel zwingt Unternehmen zu attraktiveren Arbeitszeitmodellen." },
      { german: "die Vier-Tage-Woche", english: "four-day work week", context: "Pilotprojekte zur Vier-Tage-Woche zeigen steigende Mitarbeiterzufriedenheit." },
    ],
    teacherDiscussionQuestions: [
      "Ist die Vier-Tage-Woche bei vollem Lohnausgleich angesichts des Fachkräftemangels wirtschaftlich tragbar?",
      "Warum haben Gewerkschaften in Deutschland historisch eine so starke konsensuale Verhandlungsmacht?",
      "Verändert das Homeoffice die Grenze zwischen Berufs- und Privatleben zum Positiven oder Negativen?",
    ],
    commonMisconceptions:
      "'Die Arbeit' (Singular tantum – kein Plural 'die Arbeiten' im Sinne von Jobs; stattdessen 'Arbeitsplätze' oder 'Stellen'). 'Kündigen' (Arbeitnehmer kündigt Vertrag ODER Arbeitgeber kündigt Mitarbeiter).",
  },
  {
    id: "sub-4-3",
    topicId: "sub-4-3",
    themeId: "organisation",
    code: "4.3",
    displayCode: "T4.3",
    title: "Recht, Bürgerrechte & Gesetzgebung",
    englishTitle: "Law, Civil Rights & Governance",
    level: "SL / HL",
    sixtySecondSummary:
      "Die Verfassungsordnung im DACH-Raum: Artikel 1 des deutschen Grundgesetzes ('Die Würde des Menschen ist unantastbar') als Lehre aus der NS-Diktatur. Das Bundesverfassungsgericht in Karlsruhe als Hüter der Grundrechte im Vergleich zur direkten Demokratie der Schweiz (Volksinitiativen).",
    culturalSpotlight: {
      title: "Artikel 1 GG & das Bundesverfassungsgericht",
      region: "Deutschland",
      description:
        "Das 1949 erlassene Grundgesetz stellt die Menschenwürde über alle Staatsgewalt. Die Urteile des Bundesverfassungsgerichts in Karlsruhe genießen höchstes Bürgervertrauen.",
    },
    redemittel: [
      {
        phrase: "Aus juristischer Perspektive ist festzuhalten, dass...",
        meaning: "From a legal perspective, it should be noted that...",
        example: "Aus juristischer Perspektive ist festzuhalten, dass Grundrechte unantastbar sind.",
      },
      {
        phrase: "Dies bildet das Fundament für (+ Akkusativ)...",
        meaning: "This forms the foundation for...",
        example: "Dies bildet das Fundament für ein friedliches, demokratisches Miteinander.",
      },
    ],
    keyGrammar: {
      title: "Substantivierte Adjektive und Partizipien",
      formula: "das Gute / der Angestellte / etwas Wichtiges",
      tip: "Substantivierte Adjektive nach 'etwas', 'nichts', 'viel', 'wenig' werden großgeschrieben und enden meist auf -es.",
    },
    keyVocab: [
      { german: "die Menschenwürde", english: "human dignity", context: "Die Menschenwürde ist der unantastbare Kern des deutschen Grundgesetzes." },
      { german: "die Verfassung", english: "constitution", context: "Das Grundgesetz ist die bewährte Verfassung der Bundesrepublik Deutschland." },
      { german: "die Volksinitiative", english: "popular initiative (referendum)", context: "In der Schweiz ermöglichen Volksinitiativen direkte demokratische Mitbestimmung." },
    ],
    teacherDiscussionQuestions: [
      "Sollte Deutschland Elemente der direkten Demokratie nach Schweizer Vorbild einführen?",
      "Warum genießt das Bundesverfassungsgericht größeres Vertrauen als die Bundesregierung?",
      "Wo verläuft die Grenze zwischen Meinungsfreiheit und dem Schutz vor verfassungsfeindlicher Hetze?",
    ],
    commonMisconceptions:
      "'Das Recht' (Law/Justice/Right) vs. 'die Gerechtigkeit' (Justice/Fairness). 'Recht haben' (to be right) vs. 'Recht bekommen' (to be proven right legally).",
  },
  {
    id: "sub-4-4",
    topicId: "sub-4-4",
    themeId: "organisation",
    code: "4.4",
    displayCode: "T4.4",
    title: "Ehrenamt, Zivilgesellschaft & Bürgerengagement",
    englishTitle: "Volunteering, Civil Society & Civic Engagement",
    level: "SL / HL",
    sixtySecondSummary:
      "Unbezahltes Engagement als gesellschaftlicher Kitt: Rund 29 Millionen Deutsche engagieren sich ehrenamtlich bei der Freiwilligen Feuerwehr, im Technischen Hilfswerk (THW), in Sportvereinen oder bei Tafeln. Die Herausforderung: Nachwuchsmangel und Überlastung des Ehrenamts bei staatlichem Rückzug.",
    culturalSpotlight: {
      title: "Die Freiwillige Feuerwehr & das THW",
      region: "Deutschland",
      description:
        "Über 95% der Feuerwehrleute in Deutschland sind keine Berufsfeuerwehrleute, sondern freiwillige Bürger. Das Technische Hilfswerk (THW) ist weltweit eine einzigartige Zivilschutzorganisation.",
    },
    redemittel: [
      {
        phrase: "Ohne diesen unermüdlichen Einsatz wäre...",
        meaning: "Without this tireless commitment, ... would be...",
        example: "Ohne diesen unermüdlichen Einsatz wäre der Katastrophenschutz kaum aufrechtzuerhalten.",
      },
      {
        phrase: "Es bedarf einer stärkeren gesellschaftlichen Anerkennung für...",
        meaning: "There is a need for stronger societal recognition for...",
        example: "Es bedarf einer stärkeren gesellschaftlichen Anerkennung für ehrenamtliche Helfer.",
      },
    ],
    keyGrammar: {
      title: "Konjunktiv II der Höflichkeit und hypothetische Vergleiche",
      formula: "als ob / als wenn + ... + Verb im Konjunktiv II",
      tip: "Beispiel: 'Es scheint oft so, als ob der Staat sich auf dem Ehrenamt ausruhte.'",
    },
    keyVocab: [
      { german: "das Ehrenamt", english: "volunteer work / honorary post", context: "Ein Ehrenamt zu übernehmen bedeutet Verantwortung für die Gemeinschaft." },
      { german: "der gesellschaftliche Zusammenhalt", english: "social cohesion", context: "Bürgerschaftliches Engagement stärkt den gesellschaftlichen Zusammenhalt." },
      { german: "die Tafel", english: "food bank", context: "Immer mehr bedürftige Menschen sind auf die Unterstützung der Tafeln angewiesen." },
    ],
    teacherDiscussionQuestions: [
      "Nutzt der Staat das Ehrenamt aus, um bei sozialen Pflichtaufgaben (wie Pflege und Tafeln) Geld zu sparen?",
      "Wie kann das Ehrenamt für Jugendliche attraktiver gestaltet werden?",
      "Sollte ehrenamtliche Arbeit bei der Studienplatzvergabe und Bewerbungen offiziell boniert werden?",
    ],
    commonMisconceptions:
      "'Sich engagieren für + Akkusativ' (nicht mit Dativ). 'Ehrenamtlich' (unbezahlt) vs. 'freiwillig' (voluntary, kann aber vergütet sein).",
  },
  {
    id: "sub-4-5",
    topicId: "sub-4-5",
    themeId: "organisation",
    code: "4.5",
    displayCode: "T4.5",
    title: "Medienlandschaft, Pressefreiheit & Fake News",
    englishTitle: "Media Landscape, Press Freedom & Disinformation",
    level: "HL Focus",
    sixtySecondSummary:
      "Das duale Rundfunksystem im DACH-Raum: Der öffentlich-rechtliche Rundfunk (ARD, ZDF, ORF, SRF) finanziert durch Rundfunkbeitrag ('GEZ') versus private Medien, Boulevardblätter (Bild-Zeitung) und Online-Desinformation auf Telegram und TikTok. Die Rolle von 'Faktencheckern' zur Demokratiestärkung.",
    culturalSpotlight: {
      title: "Der Rundfunkbeitrag & öffentlich-rechtlicher Auftrag",
      region: "Deutschland",
      description:
        "Zur Sicherung staatsferner Berichterstattung nach dem Zweiten Weltkrieg wurde der öffentlich-rechtliche Rundfunk nach BBC-Vorbild geschaffen, finanziert durch den Rundfunkbeitrag jedes Haushalts.",
    },
    redemittel: [
      {
        phrase: "Kritisch anzumerken ist, dass...",
        meaning: "It should be critically noted that...",
        example: "Kritisch anzumerken ist, dass Desinformationen sich in sozialen Netzwerken rasend schnell verbreiten.",
      },
      {
        phrase: "Um verlässliche Informationen von Fake News zu unterscheiden, sollte man...",
        meaning: "In order to distinguish reliable information from fake news, one should...",
        example: "Um verlässliche Informationen zu filtern, sollte man stets mehrere Quellen prüfen.",
      },
    ],
    keyGrammar: {
      title: "Finalsätze mit 'damit' vs. 'um... zu'",
      formula: "damit + Subjekt 2 + ... + Verb am Ende (bei Subjektwechsel!)",
      tip: "Wenn die handelnde Person im Haupt- und Nebensatz verschieden ist, MUSS 'damit' stehen (nicht 'um... zu').",
    },
    keyVocab: [
      { german: "der öffentlich-rechtliche Rundfunk", english: "public broadcasting service", context: "Der öffentlich-rechtliche Rundfunk hat einen verfassungsrechtlichen Bildungsauftrag." },
      { german: "die Falschmeldung / Fake News", english: "fake news / false report", context: "Gezielte Falschmeldungen zielen darauf ab, Demokratien zu destabilisieren." },
      { german: "die Medienkompetenz", english: "media literacy", context: "Schulen müssen Medienkompetenz als zentrales Schulfach etablieren." },
    ],
    teacherDiscussionQuestions: [
      "Ist der Rundfunkbeitrag für ARD und ZDF in Zeiten von YouTube und Netflix noch zeitgemäß?",
      "Wie gefährden Echokammern und Filterblasen auf Social Media die politische Debattenkultur?",
      "Sollte der Staat schärfere Gesetze gegen Hassrede und Desinformation im Netz erlassen?",
    ],
    commonMisconceptions:
      "'Die Medien' ist Plural ('Medien beeinflussen', nicht 'Medien beeinflusst'). Verwechslung von 'nachrichten' (news) mit 'Nachricht' (message).",
  },

  // =========================================================================
  // THEMA 5: EIN PLANET FÜR ALLE (SHARING THE PLANET)
  // =========================================================================
  {
    id: "sub-5-1",
    topicId: "sub-5-1",
    themeId: "planet",
    code: "5.1",
    displayCode: "T5.1",
    title: "Klimawandel, Energiewende & Atomausstieg",
    englishTitle: "Climate Change, Energy Transition & Nuclear Phase-out",
    level: "SL / HL",
    sixtySecondSummary:
      "Deutschlands historischer Doppel-Ausstieg: Vollendeter Atomausstieg (April 2023) und geplanter Kohleausstieg bis 2030/2038. Klimaproteste ('Fridays for Future', 'Letzte Generation'), alpine Gletscherschmelze in Österreich und der Schweiz sowie Konflikte zwischen Klimaschutz und Industrieinteressen.",
    culturalSpotlight: {
      title: "Der deutsche Atomausstieg (April 2023)",
      region: "Deutschland",
      description:
        "Nach der Katastrophe von Fukushima 2011 beschlossen, schaltete Deutschland im April 2023 die letzten drei Atomkraftwerke ab—ein weltweites Alleinstellungsmerkmal unter Industrienationen.",
    },
    redemittel: [
      {
        phrase: "Die Dringlichkeit dieses Problems wird dadurch unterstrichen, dass...",
        meaning: "The urgency of this problem is underscored by the fact that...",
        example: "Die Dringlichkeit wird dadurch unterstrichen, dass alpine Gletscher unaufhaltsam schmelzen.",
      },
      {
        phrase: "Langfristig gesehen bleibt keine andere Wahl, als...",
        meaning: "In the long run, there is no other choice than to...",
        example: "Langfristig bleibt keine andere Wahl, als den CO2-Ausstoß drastisch zu reduzieren.",
      },
    ],
    keyGrammar: {
      title: "Temporalsätze mit 'nachdem' (Zeitenfolge!)",
      formula: "Nachdem + Plusquamperfekt, + Präteritum. (Vergangenheit) ODER Nachdem + Perfekt, + Präsens. (Zukunft)",
      tip: "Die Zeitenfolge bei 'nachdem' ist ein absoluter Band-8-Marker in Criterion A.",
    },
    keyVocab: [
      { german: "der Atomausstieg", english: "nuclear phase-out", context: "Der Atomausstieg war ein jahrzehntelanger gesellschaftlicher Streitpunkt." },
      { german: "die Gletscherschmelze", english: "glacial melting", context: "Die alpine Gletscherschmelze bedroht die Wasserversorgung in Österreich und der Schweiz." },
      { german: "die Treibhausgasemissionen", english: "greenhouse gas emissions", context: "Die Reduktion der Treibhausgasemissionen ist völkerrechtlich bindend." },
    ],
    teacherDiscussionQuestions: [
      "War der Ausstieg aus der Kernkraft vor dem Kohleausstieg ein klimapolitischer Fehler?",
      "Sind radikale Protestformen von Klimaaktivisten (wie Straßenblockaden) moralisch legitimiert?",
      "Wie können Alpenländer die verheerenden Folgen des Gletscherschwunds abmildern?",
    ],
    commonMisconceptions:
      "'Klima' (langfristig) vs. 'Wetter' (kurzfristig). Falsche Zeitenfolge bei 'nachdem' vermeiden ('Nachdem er ankam, aß er' ist falsch; richtig: 'Nachdem er angekommen war, aß er').",
  },
  {
    id: "sub-5-2",
    topicId: "sub-5-2",
    themeId: "planet",
    code: "5.2",
    displayCode: "T5.2",
    title: "Konsumgesellschaft, Müllvermeidung & Kreislaufwirtschaft",
    englishTitle: "Consumer Society, Waste Reduction & Circular Economy",
    level: "SL / HL",
    sixtySecondSummary:
      "Deutsche Mülltrennung und Recycling-Kultur: Das Pfandsystem (Einweg- vs. Mehrwegpfand), der 'Grüne Punkt', Unverpackt-Läden und das wachsende Bewusstsein für 'Fast Fashion' und Elektroschrott. Der Wandel von der Wegwerfgesellschaft zur Kreislaufwirtschaft (Circular Economy).",
    culturalSpotlight: {
      title: "Das deutsche Flaschenpfandsystem",
      region: "Deutschland",
      description:
        "Mit 25 Cent Pfand auf Plastik-Einwegflaschen und 8-15 Cent auf Mehrweg-Glasflaschen erreicht Deutschland eine der weltweit höchsten Rücklaufquoten von über 98%.",
    },
    redemittel: [
      {
        phrase: "Ein konkreter Lösungsansatz besteht in (+ Dativ)...",
        meaning: "A concrete solution approach consists in...",
        example: "Ein konkreter Lösungsansatz besteht in der Ausweitung von Mehrwegsystemen.",
      },
      {
        phrase: "Jeder Einzelne kann einen Beitrag leisten, indem er...",
        meaning: "Every individual can make a contribution by...",
        example: "Jeder Einzelne kann beitragen, indem er auf Einwegplastik verzichtet.",
      },
    ],
    keyGrammar: {
      title: "Modale Nebensätze mit 'indem' (Mittel und Zweck)",
      formula: "..., indem + Subjekt + ... + Verb am Ende.",
      tip: "Nutzen Sie 'indem' anstelle von englischen '-ing' Konstruktionen: 'indem man Müll trennt' (by separating waste).",
    },
    keyVocab: [
      { german: "die Mülltrennung", english: "waste separation / recycling sorting", context: "Die penible Mülltrennung gilt im Ausland als typisch deutsches Klischee." },
      { german: "das Pfandsystem", english: "bottle deposit refund system", context: "Das deutsche Pfandsystem hat das Littering im öffentlichen Raum drastisch reduziert." },
      { german: "die Kreislaufwirtschaft", english: "circular economy", context: "In einer echten Kreislaufwirtschaft werden Ressourcen endlos wiederverwertet." },
    ],
    teacherDiscussionQuestions: [
      "Ist Deutschlands Ruf als 'Recycling-Weltmeister' angesichts steigender Verpackungsmüllberge gerechtfertigt?",
      "Sollten Fast-Fashion-Konzerne gesetzlich verpflichtet werden, nicht verkaufte Kleidung zu recyceln statt zu verbrennen?",
      "Warum scheitern viele Unverpackt-Läden an den niedrigen Preisen von Discountern wie Aldi und Lidl?",
    ],
    commonMisconceptions:
      "'Der Müll' (kein Plural!). 'Vermeiden' (to avoid) vs. 'trennen' (to separate) vs. 'entsorgen' (to dispose of). 'Verzichten auf + Akkusativ'.",
  },
  {
    id: "sub-5-3",
    topicId: "sub-5-3",
    themeId: "planet",
    code: "5.3",
    displayCode: "T5.3",
    title: "Globalisierung, Fairer Handel & Lieferketten",
    englishTitle: "Globalization, Fair Trade & Supply Chains",
    level: "SL / HL",
    sixtySecondSummary:
      "Die Kehrseite weltweiter Verflechtungen: Deutschlands Exportabhängigkeit, Ausbeutung in Textilfabriken des globalen Südens und das deutsche Lieferkettensorgfaltspflichtengesetz (LkSG). Fairtrade-Produkte in Supermärkten und der Konflikt zwischen Konsumentengeiz ('Geiz ist geil') und globaler Verantwortung.",
    culturalSpotlight: {
      title: "Das deutsche Lieferkettengesetz (LkSG)",
      region: "Deutschland",
      description:
        "Seit 2023 verpflichtet das Lieferkettengesetz große deutsche Unternehmen, Menschenrechte und Umweltstandards entlang ihrer weltweiten Zuliefererketten nachweisbar zu garantieren.",
    },
    redemittel: [
      {
        phrase: "Es liegt in der Verantwortung (+ Genitiv)...",
        meaning: "It lies within the responsibility of...",
        example: "Es liegt in der Verantwortung der Konzerne, faire Löhne sicherzustellen.",
      },
      {
        phrase: "Man kann nicht die Augen davor verschließen, dass...",
        meaning: "One cannot close one's eyes to the fact that...",
        example: "Man kann nicht die Augen davor verschließen, dass billige Kleidung auf Kosten von Arbeitern geht.",
      },
    ],
    keyGrammar: {
      title: "Konsekutivsätze mit 'sodass' / 'so..., dass'",
      formula: "..., sodass + Subjekt + ... + Verb am Ende.",
      tip: "Drücken Sie Folgen aus: 'Die Standards wurden verschärft, sodass Kinderarbeit wirksam bekämpft werden kann.'",
    },
    keyVocab: [
      { german: "die Lieferkette", english: "supply chain", context: "Das Gesetz erzwingt lückenlose Transparenz entlang der gesamten Lieferkette." },
      { german: "der faire Handel (Fairtrade)", english: "fair trade", context: "Fairer Handel garantiert Kleinbauern im globalen Süden ein existenzsicherndes Einkommen." },
      { german: "die Ausbeutung", english: "exploitation", context: "Ausbeutung von Mensch und Natur darf kein Geschäftsmodell mehr sein." },
    ],
    teacherDiscussionQuestions: [
      "Können Konsumenten durch den Kauf von Fairtrade-Produkten die globale Ungleichheit spürbar reduzieren?",
      "Überfordert das deutsche Lieferkettengesetz mittelständische Betriebe mit bürokratischen Nachweispflichten?",
      "Inwiefern profitiert die deutsche Exportwirtschaft von offenen Grenzen und Freihandel?",
    ],
    commonMisconceptions:
      "'Verantwortung tragen für + Akkusativ'. 'Handel' (Trade) vs. 'Handlung' (Action / Plot).",
  },
  {
    id: "sub-5-4",
    topicId: "sub-5-4",
    themeId: "planet",
    code: "5.4",
    displayCode: "T5.4",
    title: "Menschenrechte, Gleichberechtigung & soziale Gerechtigkeit",
    englishTitle: "Human Rights, Gender Equality & Social Justice",
    level: "SL / HL",
    sixtySecondSummary:
      "Gleichstellung und gesellschaftliche Gerechtigkeit im DACH-Raum: Gender Pay Gap, Frauenquote in Vorständen, das 2024 beschlossene Selbstbestimmungsgesetz für trans- und nicht-binäre Menschen in Deutschland sowie die 'Ehe für alle'. Das Armutsrisiko bei Alleinerziehenden und Rentnern.",
    culturalSpotlight: {
      title: "Das Selbstbestimmungsgesetz & die Frauenquote",
      region: "Deutschland",
      description:
        "Das 2024 eingeführte Selbstbestimmungsgesetz ermöglicht die Änderung des Geschlechtseintrags durch einfache Erklärung beim Standesamt. Zuvor führte Deutschland verbindliche Frauenquoten für Börsenunternehmen ein.",
    },
    redemittel: [
      {
        phrase: "Trotz beachtlicher Fortschritte besteht nach wie vor Handlungsbedarf bei...",
        meaning: "Despite notable progress, there continues to be a need for action in...",
        example: "Trotz Fortschritten besteht Handlungsbedarf beim Schließen des Gender Pay Gaps.",
      },
      {
        phrase: "Gleicher Lohn für gleiche Arbeit sollte...",
        meaning: "Equal pay for equal work should...",
        example: "Gleicher Lohn für gleiche Arbeit sollte eine Selbstverständlichkeit sein.",
      },
    ],
    keyGrammar: {
      title: "Steigerung und Vergleiche (Komparativ und Superlativ mit 'als' und 'wie')",
      formula: "so + Adjektiv + wie (Gleichheit) / Komparativ + als (Ungleichheit)",
      tip: "Nutzen Sie 'als' bei Unterschieden: 'Frauen verdienen immer noch weniger als Männer' (nicht 'wie Männer').",
    },
    keyVocab: [
      { german: "die Gleichberechtigung", english: "equal rights / gender equality", context: "Gleichberechtigung ist im Grundgesetz verankert, in der Praxis aber unvollendet." },
      { german: "die Lohnlücke (Gender Pay Gap)", english: "gender pay gap", context: "Die Lohnlücke zwischen Männern und Frauen beträgt in Deutschland rund 18 Prozent." },
      { german: "das Selbstbestimmungsrecht", english: "right to self-determination", context: "Das Selbstbestimmungsrecht stärkt die Würde von Minderheiten." },
    ],
    teacherDiscussionQuestions: [
      "Sind verbindliche Frauenquoten in Führungspositionen ein faires Mittel gegen strukturelle Benachteiligung?",
      "Warum schließt sich die Gehaltsschere (Gender Pay Gap) in Deutschland so langsam?",
      "Wie balanciert das Selbstbestimmungsgesetz den Schutz von Minderheiten mit gesellschaftlicher Akzeptanz?",
    ],
    commonMisconceptions:
      "'Größer als' (Komparativ verlangt 'als', NIE 'wie'!). 'Die Gerechtigkeit' vs. 'die Gleichheit' (Equity vs. Equality).",
  },
  {
    id: "sub-5-5",
    topicId: "sub-5-5",
    themeId: "planet",
    code: "5.5",
    displayCode: "T5.5",
    title: "Stadtplanung, lebenswerte Städte & Verkehrswende",
    englishTitle: "Urban Planning, Liveable Cities & Green Mobility",
    level: "HL Focus",
    sixtySecondSummary:
      "Die Transformation urbaner Räume im DACH-Raum: Die '15-Minuten-Stadt', autofreie Innenstädte, Wiener Wohnbaumodell (Gemeindebau) als weltweites Vorbild für bezahlbaren Wohnraum. Ausbau von Fahrradstraßen, Superblocks und der Widerstand gegen steigende Mieten (Gentrifizierung).",
    culturalSpotlight: {
      title: "Das Wiener Modell des sozialen Wohnbaus",
      region: "Österreich",
      description:
        "Wien gilt als lebenswerteste Stadt der Welt: Über 60% der Wiener Bevölkerung leben in geförderten Gemeindebauten oder Genossenschaftswohnungen mit gedeckelten Mieten.",
    },
    redemittel: [
      {
        phrase: "Als wegweisendes Vorbild wird oft angeführt, dass...",
        meaning: "Often cited as a pioneering model is the fact that...",
        example: "Als wegweisendes Vorbild wird das Wiener Modell des sozialen Wohnbaus angeführt.",
      },
      {
        phrase: "Ziel muss es sein, die Lebensqualität dadurch zu steigern, dass...",
        meaning: "The goal must be to increase the quality of life by...",
        example: "Ziel muss es sein, Lebensqualität durch autofreie Zonen zu steigern.",
      },
    ],
    keyGrammar: {
      title: "Präpositionen mit Dativ und Akkusativ (Wechselpräpositionen)",
      formula: "Wo? (Ort/Stillstand) → Dativ / Wohin? (Richtung/Bewegung) → Akkusativ",
      tip: "In der Stadt (Dat.) wohnen vs. in die Stadt (Akk.) ziehen.",
    },
    keyVocab: [
      { german: "die Verkehrswende", english: "mobility transition (to green transport)", context: "Eine erfolgreiche Verkehrswende erfordert den massiven Ausbau von Radwegen und ÖPNV." },
      { german: "die Gentrifizierung", english: "gentrification", context: "Gentrifizierung verdrängt einkommensschwache Familien aus ihren angestammten Kiezen." },
      { german: "der soziale Wohnungsbau", english: "social housing / subsidized housing", context: "Sozialer Wohnungsbau garantiert bezahlbare Mieten in Metropolen." },
    ],
    teacherDiscussionQuestions: [
      "Sollten historische Innenstädte für private Pkw komplett gesperrt werden?",
      "Kann das Wiener Modell des kommunalen Wohnbaus die Wohnungskrise in Berlin, München und Zürich lösen?",
      "Inwiefern erhöht die '15-Minuten-Stadt' die Lebensqualität von Familien und Senioren?",
    ],
    commonMisconceptions:
      "Wechselpräpositionen: 'auf der Straße' (Dat. - Stillstand/Aufenthaltsort) vs. 'auf die Straße' (Akk. - Bewegung/Richtung). 'Mieten' (tenant rents) vs. 'vermieten' (landlord rents out).",
  },
];
