import {
  FlashcardItem,
  QuizQuestion,
  PreLessonCramItem,
  ChapterEntryTicketItem,
  EssayBlueprint,
  QuoteClozeItem,
} from "./types";

// ==================== 1. PRE-LESSON CRAM SHEETS ====================
// Designed for a student with 2 minutes before class to know the plot,
// answer the teacher's questions, and avoid standard misconceptions.

export const PRE_LESSON_CRAM_SHEETS: PreLessonCramItem[] = [
  {
    id: "cram-p1-c1",
    chapterCode: "I.1",
    title: "Opening: April 4th, Telescreens & The Diary",
    part: "Part 1",
    sixtySecondSummary:
      "Winston Smith enters Victory Mansions on a cold April day where clocks strike thirteen. He hides in the alcove away from the telescreen and commits the capital offense of thoughtcrime by opening a diary bought in a prole junk-shop and writing 'DOWN WITH BIG BROTHER'. He recalls the Two Minutes Hate, Emmanuel Goldstein's ritualized scapegoating, the alluring dark-haired girl (Julia) he suspects is an informant, and a fleeting exchange of glances with Inner Party official O'Brien.",
    teacherDiscussionQuestions: [
      "Why does Orwell open with 'the clocks were striking thirteen' rather than a standard hour?",
      "How does the Two Minutes Hate function as psychological conditioning rather than mere propaganda?",
      "What is the significance of Winston's diary being physical, cream-laid paper in a digitized surveillance society?",
    ],
    commonMisconceptions:
      "Students often assume Winston is brave or heroic. In reality, Orwell emphasizes Winston's physical frailty (varicose ulcer, coughing fits) and impulsive desperation; his rebellion begins not with a grand political scheme, but with visceral psychological disgust.",
    mustCiteQuotes: [
      {
        quote: "It was a bright cold day in April, and the clocks were striking thirteen.",
        analysis: "Subverts familiar pastoral expectations; 13 signifies military 24-hour time and superstition, establishing an unnatural, mechanized order.",
      },
      {
        quote: "WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS STRENGTH",
        analysis: "The tripartite slogan embodying Doublethink—holding contradictory axioms simultaneously to paralyze critical logic.",
      },
    ],
  },
  {
    id: "cram-p1-c4",
    chapterCode: "I.4",
    title: "Ministry of Truth (Minitrue) & Historical Falsification",
    part: "Part 1",
    sixtySecondSummary:
      "Winston works at the Records Department of Minitrue altering back issues of The Times via pneumatic speakwrites and memory holes. He invents 'Comrade Ogilvy'—an exemplary, non-existent Party martyr—to replace Comrade Withers, an unperson executed by the Party. History is not merely censored; it is continuously rewritten to preserve the Party's claim of infallibility.",
    teacherDiscussionQuestions: [
      "What is an 'unperson' and how does the destruction of records destroy existence itself?",
      "How does the creation of Comrade Ogilvy parody Soviet and totalitarian mythmaking?",
      "If all records agree with the Party, can truth still be said to exist objectively?",
    ],
    commonMisconceptions:
      "Students sometimes confuse Minitrue with mere news censorship. Minitrue does not just hide facts; it actively fabricates an alternate, constantly shifting reality to make past dissent literally unverifiable.",
    mustCiteQuotes: [
      {
        quote: "Who controls the past controls the future: who controls the present controls the past.",
        analysis: "The Party's core epistemological doctrine: by monopolizing present records, the Party manufactures whatever past justifies current policy.",
      },
      {
        quote: "Comrade Ogilvy, who had never existed in the present, now existed in the past...",
        analysis: "Exposes the grotesque ease with which totalitarian regimes create heroes and erase dissidents out of thin air.",
      },
    ],
  },
  {
    id: "cram-p1-c5",
    chapterCode: "I.5",
    title: "Syme & The Purpose of Newspeak",
    part: "Part 1",
    sixtySecondSummary:
      "In the canteen, Winston talks with lexicographer Syme, who enthusiastically explains the 11th Edition of the Newspeak Dictionary. Syme declares that the ultimate aim of Newspeak is to narrow the range of thought, making thoughtcrime literally impossible because words to express heresy will not exist. Winston foresees that Syme will inevitably be vaporized because he is too intelligent and sees too clearly.",
    teacherDiscussionQuestions: [
      "Why is cutting words from the dictionary considered a political triumph by the Party?",
      "Why does Winston realize Syme will be vaporized while Parsons will survive?",
      "What is 'duckspeak' and why is it the ideal mode of totalitarian speech?",
    ],
    commonMisconceptions:
      "Students often think Newspeak is slang or shorthand. It is an engineered linguistic straightjacket designed to eliminate semantic nuance, synonyms, and oppositional thinking.",
    mustCiteQuotes: [
      {
        quote: "Don't you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible...",
        analysis: "Demonstrates linguistic determinism (Sapir-Whorf hypothesis in extreme form): without words to conceive rebellion, rebellion cannot be formulated.",
      },
      {
        quote: "Orthodoxy means not thinking—not needing to think. Orthodoxy is unconsciousness.",
        analysis: "The ultimate psychological objective of the regime: voluntary abdication of cognitive autonomy.",
      },
    ],
  },
  {
    id: "cram-p1-c7",
    chapterCode: "I.7",
    title: "Hope in the Proles & The Photograph of Jones, Aaronson, and Rutherford",
    part: "Part 1",
    sixtySecondSummary:
      "Winston writes in his diary: 'If there is hope, it lies in the proles,' who make up 85% of Oceania's population and remain largely free from telescreens. However, they lack political consciousness. Winston recalls holding incontrovertible physical proof of Party lies—a photograph proving Jones, Aaronson, and Rutherford were in New York when the Party claimed they were in Eurasia. In panic, he dropped it into a memory hole.",
    teacherDiscussionQuestions: [
      "Why can't the proles rebel despite their overwhelming numbers?",
      "Why was the photograph of Jones, Aaronson, and Rutherford so psychologically devastating for Winston?",
      "What is the philosophical weight of Winston's axiom: 'Freedom is the freedom to say that two plus two make four'?",
    ],
    commonMisconceptions:
      "Students often think Orwell portrays the proles as an imminent revolutionary army. Actually, Orwell portrays them as an inert mass distracted by lotteries, football, and trivial melodrama ('like cattle turned loose'). Hope in them is theoretical, not practical.",
    mustCiteQuotes: [
      {
        quote: "Until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious.",
        analysis: "A debilitating totalitarian Catch-22: revolution requires critical consciousness, which oppression prevents from germinating.",
      },
      {
        quote: "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
        analysis: "Grounds human liberty in objective, empirical reality independent of state dogma; the central axiom targeted by O'Brien in Part 3.",
      },
    ],
  },
  {
    id: "cram-p2-c2",
    chapterCode: "II.2",
    title: "The Golden Country: Winston and Julia's First Encounter",
    part: "Part 2",
    sixtySecondSummary:
      "Following Julia's 'I love you' note, Winston meets her in the rustic countryside outside London. Free from telescreens and microphones, they strip away their Junior Anti-Sex League regalia and make passionate love in the sun. Winston considers their sexual union a deliberate, devastating political strike against the Party's monopolization of human energy.",
    teacherDiscussionQuestions: [
      "Why does the Party suppress sex and direct libido into political frenzy (Junior Anti-Sex League, Hate Week)?",
      "How does the pastoral setting of the Golden Country contrast with London's urban decay?",
      "Why does Winston consider their embrace 'a political act'?",
    ],
    commonMisconceptions:
      "Students often romanticize their love as an idealized Hollywood romance. Orwell explicitly grounds it in defiance and visceral animal instinct: Winston delights that Julia has had sex with dozens of Party members because corruption weakens the Party.",
    mustCiteQuotes: [
      {
        quote: "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a political act.",
        analysis: "Reframes intimacy and private erotic desire as existential anti-totalitarian rebellion.",
      },
    ],
  },
  {
    id: "cram-p2-c5",
    chapterCode: "II.5",
    title: "Syme's Vaporization & Winston vs. Julia's Differing Rebellions",
    part: "Part 2",
    sixtySecondSummary:
      "Syme ceases to exist: his name disappears from the Chess Committee registry. Meanwhile, Winston and Julia rent the room above Charrington's antique shop. Orwell highlights the crucial philosophical divergence between Winston and Julia: Winston cares about historical truth, the past, and collective memory; Julia is a pragmatist rebel who only cares about personal survival, pleasure, and dodging Party rules.",
    teacherDiscussionQuestions: [
      "How do Winston's and Julia's motivations for rebellion fundamentally differ?",
      "Why is Julia indifferent to whether Oceania was at war with Eurasia or Eastasia four years ago?",
      "What does the glass paperweight symbolize in this chapter?",
    ],
    commonMisconceptions:
      "Students frequently lump Winston and Julia together as ideological revolutionaries. Julia is fundamentally politically apathetic; she rebels from the waist downwards and falls asleep when Winston reads theory.",
    mustCiteQuotes: [
      {
        quote: "She was 'not interested in the next generation; she was only interested in us.'",
        analysis: "Contrasts Julia's immediate, sensual hedonism with Winston's tragic, historical consciousness.",
      },
      {
        quote: "The room was a world, a pocket of the past where extinct animals could walk.",
        analysis: "The illusion of domestic autonomy encapsulated by the room and the coral paperweight.",
      },
    ],
  },
  {
    id: "cram-p2-c8",
    chapterCode: "II.8",
    title: "O'Brien's Flat & The Initiation into the Brotherhood",
    part: "Part 2",
    sixtySecondSummary:
      "Winston and Julia visit O'Brien's luxurious Inner Party flat. O'Brien shocks Winston by turning off the telescreen (a privilege granted to the Inner Party for half an hour). They drink real wine and solemnly pledge their willingness to commit murder, sabotage, and acid attacks for Goldstein's Brotherhood. O'Brien promises Winston a copy of Goldstein's book and gives the rendezvous passphrase: 'We shall meet in the place where there is no darkness.'",
    teacherDiscussionQuestions: [
      "What does Winston and Julia's willingness to throw acid in children's faces reveal about the corrupting nature of total opposition to totalitarianism?",
      "What is the dramatic irony of O'Brien turning off the telescreen?",
      "What is the true ominous meaning of 'the place where there is no darkness'?",
    ],
    commonMisconceptions:
      "Students often believe O'Brien is genuine here. In hindsight, O'Brien is running a sting operation, baiting them to confess to crimes that the Party will later use to crush their moral superiority.",
    mustCiteQuotes: [
      {
        quote: "We are the dead. Our only true life is in the future. We shall take part in it as handfuls of dust...",
        analysis: "Winston's tragic acceptance of fatalism, manipulated by O'Brien to cement his psychological submission.",
      },
    ],
  },
  {
    id: "cram-p2-c10",
    chapterCode: "II.10",
    title: "The Climax of Part 2: 'You Are the Dead' & The Arrest",
    part: "Part 2",
    sixtySecondSummary:
      "In the upstairs sanctuary, Winston and Julia watch a red-armed prole washerwoman singing and marvel at her enduring humanity. They repeat 'We are the dead.' An iron voice behind the picture of St. Clement's Dane replies: 'You are the dead.' The picture falls, revealing a hidden telescreen. Armed Thought Police storm the room, beat Julia into unconsciousness, shatter the coral paperweight, and Mr. Charrington enters—revealed as an undercover Thought Police officer.",
    teacherDiscussionQuestions: [
      "How does the shattering of the glass paperweight mirror the destruction of Winston and Julia's sanctuary?",
      "How did Charrington plant clues about his true identity throughout Part 1 and Part 2?",
      "Why is the prole woman's singing juxtaposed against their immediate arrest?",
    ],
    commonMisconceptions:
      "Students often miss that Winston and Julia were never safe; Charrington had monitored them every single second from the beginning. Their 'rebellion' was a staged play orchestrated by the Thought Police.",
    mustCiteQuotes: [
      {
        quote: "'You are the dead,' said an iron voice behind them.",
        analysis: "The ultimate shattering of illusion; the Panopticon collapses their private bubble.",
      },
      {
        quote: "The paperweight was the room he was in, and the coral was Julia's life and his own... smashed into pieces on the hearth-rug.",
        analysis: "Symbolic obliteration of their fragile, preserved enclave of humanity and history.",
      },
    ],
  },
  {
    id: "cram-p3-c2",
    chapterCode: "III.2",
    title: "The Dial of Pain & Solipsism: '2 + 2 = 5'",
    part: "Part 3",
    sixtySecondSummary:
      "In the windowless cells of the Ministry of Love, O'Brien personally directs Winston's torture using an electrical dial that inflicts escalating agony. O'Brien explains that Winston is mentally deranged because he believes objective reality exists outside the Party's mind. When O'Brien holds up four fingers and asks how many he sees, Winston is tortured until he genuinely perceives five fingers.",
    teacherDiscussionQuestions: [
      "Why isn't physical compliance enough for the Party? Why must Winston genuinely believe 2 + 2 = 5?",
      "What is 'Collective Solipsism' as articulated by O'Brien?",
      "Why does the Party refuse to create martyrs?",
    ],
    commonMisconceptions:
      "Students often write that the Party tortures people to get information or force false confessions. O'Brien explicitly explains they don't care about confessions—they torture to fundamentally remake the heretic's soul before shooting them, leaving no trace of ideological resistance.",
    mustCiteQuotes: [
      {
        quote: "You believe that reality is something objective, external, existing in its own right... But I tell you, Winston, that reality is not external. Reality exists in the human mind, and nowhere else.",
        analysis: "O'Brien's philosophical core: Collective Solipsism, where the Party's collective consensus defines metaphysical reality.",
      },
      {
        quote: "We do not destroy the heretic because he resists us... We convert him, we capture his inner mind, we reshape him.",
        analysis: "Distinguishes Ingsoc from the Spanish Inquisition or Russian purges; destruction must be psychological and total.",
      },
    ],
  },
  {
    id: "cram-p3-c3",
    chapterCode: "III.3",
    title: "The Motivation of the Party: Pure Power",
    part: "Part 3",
    sixtySecondSummary:
      "O'Brien reveals the second stage: Understanding. He asks Winston why the Party clings to power. Winston guesses for the good of humanity, but O'Brien turns up the dial: the Party seeks power entirely for its own sake. Power is not a means to an end; it is the end. To test power, one must inflict pain and humiliation on another human being.",
    teacherDiscussionQuestions: [
      "How does Orwell dismantle the utopian justification for dictatorship through O'Brien?",
      "What is the metaphorical significance of 'a boot stamping on a human face—forever'?",
      "Why does O'Brien force Winston to look at his emaciated body in the mirror?",
    ],
    commonMisconceptions:
      "Students often assume the Party is communist or fascist in an ideological sense. Orwell clarifies through O'Brien that all previous ideologies were hypocritical; Ingsoc is pure, unadulterated oligarchical sadism and control.",
    mustCiteQuotes: [
      {
        quote: "The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power.",
        analysis: "The chilling revelation of totalitarianism stripped of all benevolent rationalizations.",
      },
      {
        quote: "If you want a picture of the future, imagine a boot stamping on a human face—forever.",
        analysis: "The definitive image of perpetual sadism and absolute institutional dominion.",
      },
    ],
  },
  {
    id: "cram-p3-c5",
    chapterCode: "III.5",
    title: "Room 101: The Starving Rats & The Betrayal of Julia",
    part: "Part 3",
    sixtySecondSummary:
      "Winston has accepted that 2 + 2 = 5 logically, but his heart still secretly loves Julia and hates Big Brother. O'Brien sends him to Room 101, which contains 'the worst thing in the world'—uniquely tailored to each prisoner. For Winston, it is rats. O'Brien straps a wire cage with ravenous sewer rats to Winston's face. In blind, primal terror, Winston breaks his final psychological barrier, shouting: 'Do it to Julia! Not me! Julia!'",
    teacherDiscussionQuestions: [
      "Why is Room 101 tailored individually rather than standardized?",
      "Why is transferring his agony to Julia the ultimate psychological victory for the Party?",
      "Can love or human dignity survive when confronted with primal evolutionary panic?",
    ],
    commonMisconceptions:
      "Students think Winston was just saying words to get the cage removed. The tragedy is that he meant it in his deepest core: he genuinely wanted Julia placed between him and the rats, severing his capacity for empathy.",
    mustCiteQuotes: [
      {
        quote: "Do it to Julia! Do it to Julia! Not me! Julia! I don’t care what you do to her. Tear her face off, strip her to the bones.",
        analysis: "The collapse of the human spirit; moral suicide under instinctual terror.",
      },
      {
        quote: "The thing that is in Room 101 is the worst thing in the world.",
        analysis: "Totalitarianism's ultimate weapon: weaponizing an individual's subconscious phobias against their moral conscience.",
      },
    ],
  },
  {
    id: "cram-p3-c6",
    chapterCode: "III.6",
    title: "The Chestnut Tree Café: Defeat & Loving Big Brother",
    part: "Part 3",
    sixtySecondSummary:
      "Winston spends his days at the Chestnut Tree Café drinking Victory Gin and playing chess. He encounters Julia; both admit they betrayed each other and feel only revulsion. Watching a telescreen bulletin announce a military victory over Eurasia in Africa, Winston feels tears of joy stream down his nose. The struggle is finished: he has won the victory over himself. He loves Big Brother.",
    teacherDiscussionQuestions: [
      "Why is Winston's fate far more horrifying than being executed in Part 1?",
      "What is the significance of the telescreen song 'Under the spreading chestnut tree / I sold you and you sold me'?",
      "Why is the Appendix on Newspeak written in standard English and in the past tense?",
    ],
    commonMisconceptions:
      "Students mistakenly think Winston dies in a shootout or escapes. He dies spiritually. However, note the Appendix! The Appendix is written from a future standpoint where Newspeak is defunct, implying the regime eventually collapsed.",
    mustCiteQuotes: [
      {
        quote: "He had won the victory over himself. He loved Big Brother.",
        analysis: "The novel's devastating final line: the absolute obliteration of the individual ego into the totalitarian hive.",
      },
    ],
  },
];

// ==================== 2. ACTIVE RECALL FLASHCARD DECK ====================

export const FLASHCARDS_DECK: FlashcardItem[] = [
  {
    id: "fc-1",
    category: "Quote Recall",
    part: "Part 1",
    question: "Complete the slogan: 'War is Peace, Freedom is Slavery, ________.'",
    clue: "Think about what the Party denies its citizens.",
    answer: "Ignorance is Strength",
    examContext: "Central Party paradox demonstrating doublethink; introduced in Chapter I.1.",
    relatedThemes: ["doublethink", "newspeak", "totalitarianism"],
  },
  {
    id: "fc-2",
    category: "Quote Recall",
    part: "Part 1",
    question: "Who controls the past controls the future: ________.",
    clue: "The second half of the Party's temporal axiom.",
    answer: "...who controls the present controls the past.",
    examContext: "Found in I.3 and I.7; explains the epistemological function of the Ministry of Truth.",
    relatedThemes: ["totalitarianism", "surveillance"],
  },
  {
    id: "fc-3",
    category: "Quote Recall",
    part: "Part 1",
    question: "What mathematical statement does Winston equate with human freedom in his diary?",
    clue: "Simple arithmetic truth that O'Brien later breaks.",
    answer: "'Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.'",
    examContext: "Written in Chapter I.7; the philosophical crux dismantled by O'Brien in III.2.",
    relatedThemes: ["rebellion", "totalitarianism"],
  },
  {
    id: "fc-4",
    category: "Quote Recall",
    part: "Part 3",
    question: "What is O'Brien's definitive metaphor for the totalitarian future?",
    clue: "Involves footwear and facial anatomy.",
    answer: "'If you want a picture of the future, imagine a boot stamping on a human face—forever.'",
    examContext: "Spoken in Chapter III.3 during the Understanding phase of Winston's torture.",
    relatedThemes: ["totalitarianism", "torture"],
  },
  {
    id: "fc-5",
    category: "Quote Recall",
    part: "Part 3",
    question: "What are the chilling final eight words of the novel?",
    clue: "Describes Winston's ultimate emotional state toward the Party leader.",
    answer: "'He had won the victory over himself. He loved Big Brother.'",
    examContext: "The climax of psychological reintegration at the end of Chapter III.6.",
    relatedThemes: ["loyalty", "totalitarianism"],
  },
  {
    id: "fc-6",
    category: "Theme & Concept",
    part: "General",
    question: "What is 'Doublethink' in Newspeak and psychological terms?",
    clue: "Holding two conflicting views at once.",
    answer: "The power of holding two contradictory beliefs in one's mind simultaneously, and accepting both of them (e.g., knowing the past was altered while believing the altered version is true).",
    examContext: "Core examination concept; analyzed in Goldstein's Book (II.9) and practiced at Minitrue.",
    relatedThemes: ["doublethink", "totalitarianism"],
  },
  {
    id: "fc-7",
    category: "Theme & Concept",
    part: "General",
    question: "What is the primary ideological purpose of Newspeak according to Syme?",
    clue: "Think about what happens when you eliminate words for dissent.",
    answer: "To narrow the range of human thought so that unorthodox ideas (thoughtcrime) become literally unthinkable due to a lack of conceptual vocabulary.",
    examContext: "Crucial for essays on language as an instrument of social control; discussed in I.5 and Appendix.",
    relatedThemes: ["newspeak", "totalitarianism"],
  },
  {
    id: "fc-8",
    category: "Theme & Concept",
    part: "Part 3",
    question: "What is 'Collective Solipsism' as articulated by O'Brien in the Ministry of Love?",
    clue: "Where does reality exist if not in the external physical world?",
    answer: "The doctrine that physical reality does not exist externally; it exists only in human consciousness, and because the Party controls all minds and records, the Party controls reality itself.",
    examContext: "High-level philosophical concept required for top-tier essay grades on Part 3.",
    relatedThemes: ["totalitarianism", "torture"],
  },
  {
    id: "fc-9",
    category: "Theme & Concept",
    part: "Part 2",
    question: "According to Goldstein's Book, why does Oceania wage continuous, endless warfare?",
    clue: "It is not to conquer territory or defeat an enemy.",
    answer: "To consume the surplus output of industrial goods without raising the general standard of living, thereby preserving hierarchical social stratification and keeping the population in a state of crisis.",
    examContext: "Essential for political context questions on Goldstein's 'Theory and Practice of Oligarchical Collectivism' (II.9).",
    relatedThemes: ["totalitarianism", "class"],
  },
  {
    id: "fc-10",
    category: "Character & Motivation",
    part: "Part 2",
    question: "How does Julia's philosophy of rebellion fundamentally differ from Winston's?",
    clue: "Intellectual vs. practical/hedonistic.",
    answer: "Winston rebels ideologically for historical truth and future generations; Julia rebels personally and hedonistically 'from the waist downwards' for immediate pleasure and survival without caring about doctrine.",
    examContext: "Frequent comparison essay question between Winston and Julia.",
    relatedThemes: ["rebellion", "loyalty"],
  },
  {
    id: "fc-11",
    category: "Character & Motivation",
    part: "Part 3",
    question: "According to O'Brien, why does the Party seek absolute power?",
    clue: "He explicitly rejects the idea of doing it for the common good or wealth.",
    answer: "Solely for its own sake: 'Power is not a means, it is an end.' The essence of power is inflicting pain and asserting complete dominion over other human beings.",
    examContext: "Crucial rebuttal to the idea that Ingsoc is simply a misguided socialist welfare state.",
    relatedThemes: ["totalitarianism", "torture"],
  },
  {
    id: "fc-12",
    category: "Character & Motivation",
    part: "Part 1",
    question: "Why does Winston believe Syme will be vaporized while Parsons will survive?",
    clue: "Intellectual awareness vs. blind, mindless orthodoxy.",
    answer: "Syme understands the Party's mechanisms too clearly and speaks with intellectual precision; Parsons is completely mindless, sweaty, and devoted to unquestioning ritual orthodoxy.",
    examContext: "Highlights that in a totalitarian regime, excess intelligence is as dangerous as treason.",
    relatedThemes: ["totalitarianism", "newspeak"],
  },
  {
    id: "fc-13",
    category: "Symbolism",
    part: "Part 1",
    question: "What does the antique glass coral paperweight symbolize throughout the novel?",
    clue: "It is a heavy, curved piece of glass enclosing a tiny pink coral.",
    answer: "The fragile, uncorrupted past, beauty with no utilitarian purpose, and the private sanctuary Winston and Julia share (the room being the glass, their lives the coral).",
    examContext: "When the Thought Police raid the room in II.10, shattering it signifies the destruction of their private world.",
    relatedThemes: ["rebellion", "surveillance"],
  },
  {
    id: "fc-14",
    category: "Symbolism",
    part: "Part 1",
    question: "What does St. Clement's Dane rhyme ('Oranges and lemons...') symbolize?",
    clue: "An incomplete nursery rhyme passed along piece by piece.",
    answer: "Lost cultural memory and historical heritage, but also a deceptive trap: the final line ('Here comes a chopper to chop off your head') foreshadows Winston's arrest by Charrington.",
    examContext: "Tracing the rhyme across Part 1, Part 2, and the arrest in II.10 demonstrates Orwell's structured foreshadowing.",
    relatedThemes: ["surveillance", "rebellion"],
  },
  {
    id: "fc-15",
    category: "Symbolism",
    part: "Part 2",
    question: "What does the red-armed prole washerwoman singing outside the window symbolize?",
    clue: "She hangs diapers, sings Party trash songs, yet retains vitality.",
    answer: "The indestructible, generative vitality of humanity; she represents hope that human nature will outlast the synthetic tyranny of the Party through fertility and uncalculated life.",
    examContext: "Directly precedes the arrest in II.10; juxtaposed against Winston and Julia's sterility.",
    relatedThemes: ["class", "rebellion"],
  },
  {
    id: "fc-16",
    category: "Plot & Event",
    part: "Part 1",
    question: "What is an 'unperson' and who does Winston fabricate to replace one in Minitrue?",
    clue: "Withers is erased; who is born in his place?",
    answer: "An unperson is someone executed whose existence is wiped from all records. Winston invents 'Comrade Ogilvy'—a model Party soldier—to replace Comrade Withers.",
    examContext: "Demonstrates that the Party does not just kill people, it abolishes their ontological history.",
    relatedThemes: ["newspeak", "totalitarianism"],
  },
  {
    id: "fc-17",
    category: "Plot & Event",
    part: "Part 2",
    question: "What happens during Hate Week in Chapter II.9 regarding Oceania's war enemy?",
    clue: "A speaker switches mid-sentence.",
    answer: "Oceania abruptly switches enemies from Eurasia to Eastasia mid-speech. The speaker continues without pausing, and the crowd tears down their own posters claiming Eurasia had always been their ally.",
    examContext: "The ultimate real-time dramatization of doublethink and historical revisionism.",
    relatedThemes: ["doublethink", "totalitarianism"],
  },
  {
    id: "fc-18",
    category: "Plot & Event",
    part: "Part 3",
    question: "What are the three stages of Winston's reintegration inside the Ministry of Love?",
    clue: "All three start with the letter L, U, A.",
    answer: "1. Learning (physical torture & breaking the body); 2. Understanding (philosophical indoctrination of pure power); 3. Acceptance (Room 101, emotional surrender to Big Brother).",
    examContext: "Formulated by O'Brien in III.3; structures the pedagogical horror of Part 3.",
    relatedThemes: ["torture", "totalitarianism"],
  },
  {
    id: "fc-19",
    category: "Plot & Event",
    part: "Part 3",
    question: "What occurs in Room 101 that causes Winston to betray Julia?",
    clue: "His deepest, primal phobia in a wire cage.",
    answer: "O'Brien threatens him with starving sewer rats in a wire cage fitted to his face; Winston snaps and screams 'Do it to Julia!', sacrificing her to save himself.",
    examContext: "Marks the death of Winston's humanity and the final triumph of the Party over private loyalty.",
    relatedThemes: ["torture", "loyalty"],
  },
  {
    id: "fc-20",
    category: "Plot & Event",
    part: "General",
    question: "What is the critical historical clue in the Appendix ('The Principles of Newspeak')?",
    clue: "Look at the grammatical tense and language the narrator uses.",
    answer: "It is written in standard English, past tense, from an academic perspective in a future era where Newspeak is obsolete, implying the Party eventually collapsed.",
    examContext: "A-Level / AP Lit distinction point: Orwell leaves a subtle, structural glimmer of hope beyond Winston's personal defeat.",
    relatedThemes: ["newspeak", "totalitarianism"],
  },
];

// ==================== 3. PRACTICE EXAM SIMULATOR QUESTIONS ====================

export const PRACTICE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "quiz-1",
    part: "Part 1",
    question:
      "What is the irony in the names of the four Ministries governing Oceania (Minitrue, Minipax, Miniluv, Miniplenty)?",
    options: [
      "They are named in Latin to confuse the proles.",
      "Each Ministry carries out the exact inverted opposite of what its title proclaims.",
      "They were created by Emmanuel Goldstein during the revolution.",
      "They are run by foreign diplomats from Eastasia.",
    ],
    correctIndex: 1,
    explanation:
      "The names are deliberate exercises in doublethink: the Ministry of Truth fabricates lies, the Ministry of Peace prosecutes perpetual war, the Ministry of Love tortures citizens, and the Ministry of Plenty oversees economic shortages.",
    examTip:
      "Always connect the names of the Ministries to the Party's weaponization of language and cognitive dissonance.",
  },
  {
    id: "quiz-2",
    part: "Part 1",
    question:
      "What physical ailment does Winston suffer from that symbolizes his repressed vitality and decay?",
    options: [
      "A blind eye caused by a bomb fragment.",
      "A varicose ulcer above his right ankle that inflames when he is anxious.",
      "Tuberculosis contracted in the prole quarters.",
      "A crippled hand from working pneumatic tubes.",
    ],
    correctIndex: 1,
    explanation:
      "Winston's varicose ulcer flares up at moments of psychological tension and sexual frustration, representing the physical toll and psychosomatic sickness of living under constant surveillance.",
    examTip:
      "Contrast Winston's rotting physical state in Part 1 with his brief physical rejuvenation with Julia in Part 2, and his complete skeletal decay in Part 3.",
  },
  {
    id: "quiz-3",
    part: "Part 1",
    question:
      "Why does Syme state that the eleventh edition of the Newspeak Dictionary is 'definitive'?",
    options: [
      "It adds over ten thousand scientific definitions.",
      "It eliminates more words than any previous edition, cutting vocabulary down to the bone.",
      "It translates all Shakespearean plays into modern slogans.",
      "It introduces slang borrowed from the proles.",
    ],
    correctIndex: 1,
    explanation:
      "Newspeak is unique in that it shrinks every year instead of expanding. Its definitive nature lies in systematically abolishing synonyms, shades of meaning, and antonyms (e.g. replacing 'bad' with 'ungood').",
    examTip:
      "Use Syme's explanation to discuss linguistic determinism—the Party believes that if there is no word for 'freedom', the concept of freedom cannot exist.",
  },
  {
    id: "quiz-4",
    part: "Part 1",
    question:
      "What piece of physical evidence did Winston once hold that proved the Party falsified history regarding Jones, Aaronson, and Rutherford?",
    options: [
      "A handwritten letter signed by Big Brother.",
      "A torn page from the Times showing them attending a Party function in New York on a date they allegedly confessed to treason in Eurasia.",
      "A confession audio reel preserved from the 1960s purges.",
      "Their original birth certificates.",
    ],
    correctIndex: 1,
    explanation:
      "Ten years prior, Winston uncovered a ten-year-old newspaper photograph proving the three original revolutionary leaders were in New York at the exact moment they allegedly confessed to betraying military secrets on Eurasian soil. Terrified, he destroyed it in a memory hole.",
    examTip:
      "This photograph is Winston's 'holy grail' of objective truth; O'Brien explicitly forces him to deny its existence in Part 3.",
  },
  {
    id: "quiz-5",
    part: "Part 2",
    question:
      "When Winston and Julia meet in the Golden Country, what does Julia bring with her that represents prohibited indulgence?",
    options: [
      "Real coffee, white bread, and dark chocolate from the black market.",
      "A contraband copy of Goldstein's book.",
      "A loaded revolver stolen from the Thought Police.",
      "A French painting of St. Clement's church.",
    ],
    correctIndex: 0,
    explanation:
      "Julia secures real coffee, real sugar, and rich chocolate stolen from Inner Party quarters, contrasting with the rancid Victory Coffee and synthetic chocolate rations allocated to the Outer Party.",
    examTip:
      "Sensory details (taste, smell, color) symbolize human vitality in Orwell's bleak industrial dystopia.",
  },
  {
    id: "quiz-6",
    part: "Part 2",
    question:
      "How does Julia respond when Winston reads chapters from Emmanuel Goldstein's book in their rented room?",
    options: [
      "She argues passionately that Goldstein's economics are flawed.",
      "She takes detailed notes to distribute to the Brotherhood.",
      "She falls sound asleep beside him.",
      "She screams in panic and begs him to burn it.",
    ],
    correctIndex: 2,
    explanation:
      "Julia falls fast asleep while Winston reads Goldstein's treatise, emphasizing her complete indifference to abstract political theory. Her rebellion is visceral, personal, and corporeal, not ideological.",
    examTip:
      "This scene is the premier text evidence to highlight the contrast between Winston's intellectual angst and Julia's practical hedonism.",
  },
  {
    id: "quiz-7",
    part: "Part 2",
    question:
      "What occurs at the instant Winston and Julia say 'We are the dead' in Chapter II.10?",
    options: [
      "A bomb explodes in the alleyway.",
      "An iron voice behind the engraving of St. Clement's Dane repeats: 'You are the dead.'",
      "O'Brien walks through the door smiling.",
      "Charrington's shop catches fire.",
    ],
    correctIndex: 1,
    explanation:
      "A hidden telescreen concealed behind the antique picture of St. Clement's echoes their words in a metallic tone, exposing that their private haven was an observed panoptic cage all along.",
    examTip:
      "Notice how the voice takes their poetic fatalism and turns it into a literal, physical death sentence.",
  },
  {
    id: "quiz-8",
    part: "Part 3",
    question:
      "Who turns in Tom Parsons to the Thought Police for committing thoughtcrime in his sleep?",
    options: [
      "His wife, who smelled gin on his breath.",
      "His seven-year-old daughter, who listened through the keyhole.",
      "Winston, during a routine interrogation.",
      "Syme, before being vaporized.",
    ],
    correctIndex: 1,
    explanation:
      "Parsons's little daughter denounced him after hearing him mumble 'Down with Big Brother' in his sleep. Parsons is grotesquely proud of her vigilance ('It shows I brought her up in the right spirit!').",
    examTip:
      "Use this to illustrate the Party's destruction of the nuclear family by transforming children into systematic state spies (the Spies organization).",
  },
  {
    id: "quiz-9",
    part: "Part 3",
    question:
      "During Winston's torture, what does O'Brien assert about the existence of the Brotherhood?",
    options: [
      "It is a vast underground army with millions of members.",
      "It was completely crushed in 1965.",
      "Winston will never know whether it truly exists or is merely a Party invention.",
      "It is led personally by Big Brother under a pseudonym.",
    ],
    correctIndex: 2,
    explanation:
      "O'Brien tells Winston that whether the Brotherhood is real or an elaborate Party trap is something Winston will never learn: 'That, Winston, you will never know. If we choose to set you free when we have finished with you... that will remain a riddle.'",
    examTip:
      "Highlights the epistemological abyss in Oceania: the state controls uncertainty itself.",
  },
  {
    id: "quiz-10",
    part: "Part 3",
    question:
      "What is the ultimate purpose of Room 101 according to O'Brien?",
    options: [
      "To execute prisoners without leaving blood.",
      "To confront the prisoner with 'the worst thing in the world' tailored specifically to them, breaking their final moral loyalty.",
      "To test chemical mind-control drugs.",
      "To broadcast forced televised confessions across Oceania.",
    ],
    correctIndex: 1,
    explanation:
      "Room 101 contains whatever individual fear breaks a specific human being's psychological fortitude (rats for Winston, pain/burial for others), driving them to sacrifice the person they love most.",
    examTip:
      "Show how Room 101 represents the weaponization of personal psychology against the soul.",
  },
];

// ==================== 4. HIGH-YIELD ESSAY BLUEPRINTS ====================

export const ESSAY_BLUEPRINTS: EssayBlueprint[] = [
  {
    id: "essay-1",
    prompt:
      "Examine how Orwell uses the manipulation of language and history in '1984' to demonstrate that objective reality can be subordinated to totalitarian authority.",
    rubricFocus: "A-Level / AP Lit / IB Literature",
    thesisStatement:
      "In '1984', George Orwell demonstrates that by systematically eliminating linguistic nuance through Newspeak and destabilizing historical documentation through the Ministry of Truth, the Party abolishes the epistemic foundations of objective reality, ultimately establishing that truth is not an inherent metaphysical fact but a social construct dictated by whoever monopolizes the present.",
    coreArgumentSummary:
      "Language and historical memory are the twin scaffolding of autonomous human consciousness; by demolishing both, Ingsoc makes dissent cognitively impossible.",
    paragraphs: [
      {
        topicSentence:
          "The linguistic engineering of Newspeak represents an unprecedented attempt at cognitive delimitation by eradicating the semantic tools required for oppositional thought.",
        primaryEvidence:
          "Syme's assertion in I.5: 'Don't you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible, because there will be no words in which to express it.'",
        literaryAnalysis:
          "Orwell extrapolates the Sapir-Whorf linguistic determinism hypothesis to its tyrannical extreme. By collapsing antonyms into prefixes ('ungood', 'plusgood') and pruning vocabulary annually, the Party removes semantic shades of grey. Language ceases to be an organic instrument of expression and becomes a mechanistic algorithm for orthodoxy.",
        counterPerspective:
          "While Julia displays instinctive defiance without needing advanced vocabulary, Orwell illustrates that purely instinctive rebellion lacks historical continuity and is easily crushed without linguistic codification.",
      },
      {
        topicSentence:
          "The continuous revision of historical records at the Ministry of Truth severs humanity's connection to an objective past, rendering truth entirely fungible.",
        primaryEvidence:
          "Winston's work fabricating Comrade Ogilvy in I.4, the incineration of the photograph of Jones, Aaronson, and Rutherford in I.7, and the Party slogan: 'Who controls the past controls the future: who controls the present controls the past.'",
        literaryAnalysis:
          "Through Winston's role at Minitrue, Orwell exposes that totalitarianism does not merely rewrite history; it abolishes the very concept of an immutable past. The 'memory hole' serves as an ontological furnace where empirical evidence is vaporized, leaving citizens stranded in a perpetual present where Party declarations are infallible.",
        counterPerspective:
          "Winston clings to material artifacts—the cream-laid diary, the coral paperweight—as fragile anchors of an unmanipulated past, yet Orwell's tragic trajectory proves that physical relics cannot withstand systematic state destruction.",
      },
      {
        topicSentence:
          "In Part Three, O'Brien weaponizes 'Collective Solipsism' to demonstrate that reality does not exist outside the human mind, thereby proving that control of the mind constitutes control of the universe.",
        primaryEvidence:
          "O'Brien's interrogation of Winston in III.2: 'Reality exists in the human mind, and nowhere else... whatever the Party holds to be the truth, is truth.'",
        literaryAnalysis:
          "Orwell transitions from political satire to radical philosophical inquiry. When O'Brien forces Winston to genuinely perceive five fingers when four are held up (`2 + 2 = 5`), the novel asserts that when an individual's sensory perception is decoupled from empiricism through pain and terror, totalitarianism conquers metaphysics itself.",
        counterPerspective:
          "The post-script Appendix ('The Principles of Newspeak'), written in standard English past tense, provides a structural meta-narrative that subverts O'Brien's solipsism, implying that empirical history outlasted the Party's synthetic reality.",
      },
    ],
    concludingSynthesis:
      "Ultimately, Orwell warns that democratic societies risk epistemological surrender whenever language is degraded into political slogans and historical truth is subordinated to tribal consensus. '1984' remains a terrifying thesis on how language is the final frontier of human sovereignty.",
  },
  {
    id: "essay-2",
    prompt:
      "Compare and contrast the rebellions of Winston Smith and Julia. To what extent does Orwell suggest that either form of resistance can withstand totalitarian control?",
    rubricFocus: "A-Level / AP Lit / IB Literature",
    thesisStatement:
      "While Winston's resistance is cerebral, historical, and doomed by tragic fatalism, Julia's rebellion is corporeal, pragmatic, and grounded in hedonistic self-preservation; however, Orwell demonstrates that both intellectual dissent and physical defiance are equally vulnerable to a state that systematically weaponizes human biology and psychology against the soul.",
    coreArgumentSummary:
      "Neither Winston's ideological quest for truth nor Julia's sensory quest for pleasure can survive Room 101, proving that totalitarianism annihilates all facets of human identity.",
    paragraphs: [
      {
        topicSentence:
          "Winston's rebellion is fundamentally intellectual, historical, and driven by a desperate need for metaphysical continuity.",
        primaryEvidence:
          "Winston's secret diary entries ('DOWN WITH BIG BROTHER'), his fascination with the prole quarters and the coral paperweight, and his insistence that 'Freedom is the freedom to say that two plus two make four.'",
        literaryAnalysis:
          "Winston rebels as an archivist and philosopher. He is tormented by the erasure of memory and seeks a collective, teleological overthrow of Ingsoc, explicitly placing his hopes in the generational rise of the proles. His fatalism ('We are the dead') lends his rebellion a self-conscious tragic nobility, yet blinds him to O'Brien's trap.",
        counterPerspective:
          "Winston's rebellion is inherently passive and archival; he takes no actual revolutionary action until provoked by Julia and baited by O'Brien.",
      },
      {
        topicSentence:
          "In stark contrast, Julia's rebellion is visceral, immediate, and utterly disinterested in theoretical or historical doctrine.",
        primaryEvidence:
          "Julia's sash of the Junior Anti-Sex League worn as camouflage, her black-market procurement of coffee and chocolate, and her dismissal of Goldstein's treatise: 'She was not interested in the next generation; she was only interested in us.'",
        literaryAnalysis:
          "Julia embodies what Winston terms 'rebellion from the waist downwards.' She recognizes the Party's puritanism as a mechanism for rechanneling repressed libido into political hysteria (Two Minutes Hate), and therefore uses sex as direct counter-subversion. However, her rebellion is strictly individualistic; she cares nothing for overthrowing the system, only outmaneuvering its rules.",
        counterPerspective:
          "Though cynical, Julia's practical instincts are far sharper than Winston's; she immediately suspects the Party invented Goldstein's Brotherhood and rocket bombs to sustain domestic panic.",
      },
      {
        topicSentence:
          "Despite their differing approaches, Orwell shows that the Party possesses the absolute psychological machinery to dissolve both forms of resistance.",
        primaryEvidence:
          "Their mutual capture in II.10 behind the St. Clement's engraving, their confessions in Minitrue, and their definitive mutual betrayal in Room 101 ('Do it to Julia!').",
        literaryAnalysis:
          "Orwell refuses any romantic triumph. Winston's intellect is broken through dialectical electroshock, while Julia's bodily autonomy is shattered through physical terror. When they reunite in III.6, their physical repulsion confirms that the Party leaves no sanctuary—neither in the mind nor in the flesh.",
        counterPerspective:
          "Some critics argue that their mutual survival long enough to reach the Chestnut Tree Café proves human love cannot be erased instantly; yet Orwell depicts their final encounter as dead husk meeting dead husk.",
      },
    ],
    concludingSynthesis:
      "Orwell concludes that isolated rebellion—whether philosophical or sensual—is impotent against a modern surveillance apparatus. The tragedy of Winston and Julia is not that their rebellions were flawed, but that total surveillance renders individual resistance impossible once the state controls the means of observation.",
  },
  {
    id: "essay-3",
    prompt:
      "Analyze the role of the Proles in '1984'. Does Orwell present them as the true hope for the future, or as a hopelessly subjugated mass?",
    rubricFocus: "A-Level / AP Lit / IB Literature",
    thesisStatement:
      "Although Winston famously idealizes the proles as the sole reservoir of raw human vitality and future revolutionary potential, Orwell constructs a complex social portrait wherein their lack of political consciousness, diversion through state-sanctioned trivia, and brutal economic marginalization render them an enduring but fundamentally inert demographic.",
    coreArgumentSummary:
      "The proles possess the physical numbers and emotional humanity to destroy the Party, but Ingsoc's policy of calculated neglect keeps them perpetually dormant.",
    paragraphs: [
      {
        topicSentence:
          "Winston romanticizes the proles as the uncorrupted custodian of authentic human emotion and pre-revolutionary history.",
        primaryEvidence:
          "Winston's diary declaration: 'If there is hope, it lies in the proles,' and his admiration of the singing washerwoman in II.10: 'The proles were immortal, you could not doubt it when you looked at that valiant figure in the yard.'",
        literaryAnalysis:
          "To Winston, the proles have avoided the neuroses of Ingsoc. Because they are exempt from telescreens in their homes and allowed to love, mourn, and swear, they represent unmechanized humanity. The washerwoman's broad hips and unflagging song symbolize reproductive continuity and evolutionary survival.",
        counterPerspective:
          "Winston's perspective is steeped in middle-class romanticism; his attempt to interview the old prole in the pub (I.8) proves that their memories are fragmented into meaningless personal anecdotes rather than historical insight.",
      },
      {
        topicSentence:
          "The Party maintains control over the proles not through intensive surveillance, but through systematic intellectual infantilization and sensationalist bread and circuses.",
        primaryEvidence:
          "The Party slogan 'Proles and animals are free,' the operations of the Ministry of Truth's Fiction Department churning out pornography ('Pornosec'), cheap novels, and the state-rigged Lottery.",
        literaryAnalysis:
          "Orwell anticipates modern mass-media distraction. The Party realizes that a population consumed by trivial feuds, cheap beer, and illusory gambling requires no ideological policing. By denying them education while flooding them with base entertainment, Ingsoc ensures the proles never develop class consciousness.",
        counterPerspective:
          "Occasionally, brief riots erupt over shortages of saucepans, illustrating latent volatile energy; yet it instantly dissipates without leadership or doctrine.",
      },
      {
        topicSentence:
          "Ultimately, the novel presents a debilitating paradox: the proles cannot rebel until they become conscious, but cannot become conscious until they rebel.",
        primaryEvidence:
          "Winston's realization in I.7: 'Until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious.'",
        literaryAnalysis:
          "This Catch-22 exposes Orwell's sober critique of Marxist revolutionary inevitability. While the proles endure like biological matter, endurance is not synonymous with liberation. Without an intellectual vanguard—which the Party vaporizes before it can coalesce—the proles remain perpetual beasts of burden.",
        counterPerspective:
          "The washerwoman's vitality outlasts Winston and Julia, suggesting that while the intellectuals are extinguished, the species' core humanity survives in the prole womb.",
      },
    ],
    concludingSynthesis:
      "Orwell presents the proles not as an imminent revolutionary army, but as a biological promise. They are the soil from which future humanity might one day emerge, provided the synthetic night of totalitarianism eventually fractures from within.",
  },
];

// ==================== 5. QUOTE CLOZE DRILLS (FILL-IN-THE-BLANK) ====================

export const QUOTE_CLOZE_ITEMS: QuoteClozeItem[] = [
  {
    id: "cloze-1",
    chapterCode: "I.1",
    speaker: "Narrator",
    fullQuote:
      "It was a bright cold day in April, and the clocks were striking thirteen.",
    quoteWithBlank:
      "It was a bright cold day in April, and the clocks were striking ________.",
    correctWord: "thirteen",
    hint: "An unnatural hour that immediately tells the reader something is wrong with this world.",
    analyticalSignificance:
      "The iconic opening line; establishes 24-hour military time, subverting standard 12-hour pastoral British expectations.",
  },
  {
    id: "cloze-2",
    chapterCode: "I.1",
    speaker: "The Party Slogan",
    fullQuote: "WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS STRENGTH",
    quoteWithBlank:
      "WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS ________",
    correctWord: "STRENGTH",
    hint: "The third element of the Party's paradoxical trinity.",
    analyticalSignificance:
      "Demonstrates the core formula of doublethink: the state's power thrives when its populace lacks critical intelligence.",
  },
  {
    id: "cloze-3",
    chapterCode: "I.7",
    speaker: "Winston Smith (in his diary)",
    fullQuote:
      "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
    quoteWithBlank:
      "Freedom is the freedom to say that two plus two make ________. If that is granted, all else follows.",
    correctWord: "four",
    hint: "Basic mathematical reality.",
    analyticalSignificance:
      "Winston's fundamental defense of empirical, objective reality independent of state consensus.",
  },
  {
    id: "cloze-4",
    chapterCode: "I.7",
    speaker: "Winston Smith (in his diary)",
    fullQuote: "If there is hope, it lies in the proles.",
    quoteWithBlank: "If there is hope, it lies in the ________.",
    correctWord: "proles",
    hint: "The unmonitored 85% of Oceania's population.",
    analyticalSignificance:
      "Winston's political conviction that only the working masses possess the biological numbers to shatter the Party.",
  },
  {
    id: "cloze-5",
    chapterCode: "I.4",
    speaker: "Party Slogan",
    fullQuote:
      "Who controls the past controls the future: who controls the present controls the past.",
    quoteWithBlank:
      "Who controls the past controls the future: who controls the present controls the ________.",
    correctWord: "past",
    hint: "What Minitrue alters every single working hour.",
    analyticalSignificance:
      "The ultimate summary of the Party's epistemic monopoly over historical memory.",
  },
  {
    id: "cloze-6",
    chapterCode: "I.5",
    speaker: "Syme",
    fullQuote:
      "Orthodoxy means not thinking—not needing to think. Orthodoxy is unconsciousness.",
    quoteWithBlank:
      "Orthodoxy means not thinking—not needing to think. Orthodoxy is ________.",
    correctWord: "unconsciousness",
    hint: "The state of being totally unaware or asleep mentally.",
    analyticalSignificance:
      "Defines the psychological goal of totalitarian conditioning: voluntary suspension of cognitive autonomy.",
  },
  {
    id: "cloze-7",
    chapterCode: "II.2",
    speaker: "Narrator (Winston's perspective)",
    fullQuote:
      "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a political act.",
    quoteWithBlank:
      "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a ________ act.",
    correctWord: "political",
    hint: "Related to governance and subversion of state control.",
    analyticalSignificance:
      "Reframes erotic intimacy and private passion as direct anti-totalitarian rebellion.",
  },
  {
    id: "cloze-8",
    chapterCode: "II.10",
    speaker: "The Voice from the Telescreen",
    fullQuote: "'You are the dead,' said an iron voice behind them.",
    quoteWithBlank: "'You are the ________,' said an iron voice behind them.",
    correctWord: "dead",
    hint: "The phrase Winston and Julia repeated moments before their capture.",
    analyticalSignificance:
      "The sudden, brutal intrusion of the Panopticon into their private sanctuary.",
  },
  {
    id: "cloze-9",
    chapterCode: "III.3",
    speaker: "O'Brien",
    fullQuote:
      "If you want a picture of the future, imagine a boot stamping on a human face—forever.",
    quoteWithBlank:
      "If you want a picture of the future, imagine a boot stamping on a human face—________.",
    correctWord: "forever",
    hint: "An unending, eternal duration.",
    analyticalSignificance:
      "Orwell's definitive image of perpetual sadistic domination as an end in itself.",
  },
  {
    id: "cloze-10",
    chapterCode: "III.5",
    speaker: "Winston Smith",
    fullQuote:
      "Do it to Julia! Do it to Julia! Not me! Julia! I don’t care what you do to her.",
    quoteWithBlank:
      "Do it to ________! Do it to Julia! Not me! Julia! I don’t care what you do to her.",
    correctWord: "Julia",
    hint: "The woman he swore he would never betray in his heart.",
    analyticalSignificance:
      "The definitive moral defeat: Winston sacrifices his love to save his own flesh from the rats.",
  },
  {
    id: "cloze-11",
    chapterCode: "III.6",
    speaker: "Narrator",
    fullQuote: "He had won the victory over himself. He loved Big Brother.",
    quoteWithBlank:
      "He had won the victory over himself. He loved ________ ________.",
    correctWord: "Big Brother",
    hint: "The mythical, mustachioed leader of Oceania.",
    analyticalSignificance:
      "The novel's tragic resolution: the complete destruction of individual identity into state love.",
  },
];

// ==================== 6. FIRST-TIME READER ORIENTATION GUIDE ====================

export interface FirstTimeReaderGuide {
  title: string;
  historicalContext: string;
  fourMinistriesRoadmap: { name: string; newspeak: string; realFunction: string }[];
  socialPyramid: { tier: string; percent: string; description: string }[];
  keyAdviceForFirstReading: string[];
}

export const FIRST_TIME_READER_GUIDE: FirstTimeReaderGuide = {
  title: "First-Time Reader's Survival & Orientation Compass",
  historicalContext:
    "Written in 1948 by Eric Arthur Blair (pen name George Orwell) on the remote Scottish island of Jura, '1984' inverts its year of composition (48 ➔ 84). Orwell drew directly from the austerity of post-WWII blitzed London (rationing, cold flats, Victory products), the rise of Stalin's Soviet show trials and purges in the 1930s, and Nazi propaganda methods, creating a cautionary warning about how easily democratic societies can surrender to tyranny under permanent crisis.",
  fourMinistriesRoadmap: [
    {
      name: "Ministry of Truth",
      newspeak: "Minitrue",
      realFunction: "Historical falsification, propaganda, state-controlled news, literature, and cinema.",
    },
    {
      name: "Ministry of Peace",
      newspeak: "Minipax",
      realFunction: "Conducting perpetual, unwinnable wars with Eurasia and Eastasia to burn industrial surplus.",
    },
    {
      name: "Ministry of Love",
      newspeak: "Miniluv",
      realFunction: "The dreaded interior security ministry; enforces law and order through torture, electroshock, and Room 101.",
    },
    {
      name: "Ministry of Plenty",
      newspeak: "Miniplenty",
      realFunction: "Manages the planned economy, engineering artificial shortages and announcing fictitious production booms.",
    },
  ],
  socialPyramid: [
    {
      tier: "Inner Party",
      percent: "Under 2%",
      description: "The oligarchic ruling class (like O'Brien). Enjoy luxuries, black-market wine, servants, and the privilege of switching off telescreens for brief intervals.",
    },
    {
      tier: "Outer Party",
      percent: "~13%",
      description: "The educated administrative and bureaucratic class (like Winston and Julia). Live under 24/7 panoptic surveillance, wear blue overalls, eat synthetic food, and are scrutinized for thoughtcrime.",
    },
    {
      tier: "The Proles",
      percent: "85%",
      description: "The unmonitored working-class majority. Kept uneducated and pacified with beer, gambling, football, and pornography. Dismissed by the Party as subhumans ('animals').",
    },
  ],
  keyAdviceForFirstReading: [
    "Notice the sensory decay: Orwell constantly emphasizes bad smells (boiled cabbage, bad gin, cold sweat) and grime to underline that totalitarianism destroys basic human pleasure.",
    "Pay attention to the clocks: The novel opens at 'thirteen', signaling that normal natural time has been replaced by state military time.",
    "Observe Winston's physical health: His varicose ulcer and coughing fits in Part 1 improve when he falls in love with Julia in Part 2, and are destroyed in Part 3—symbolizing his psychological arc.",
    "Don't skip the Appendix: 'The Principles of Newspeak' at the end of the book is written in the past tense in standard English, providing an essential historical hint about the Party's ultimate fate!",
  ],
};

// ==================== 6. COMPLETE CHAPTER SUMMARY & ENTRY TICKET CATALOG ====================
// Curated 60-second briefs, characters, settings, themes, must-cite quotes, teacher questions,
// and exam pitfalls for all 24 chapters and scholarly Appendix.

export const ALL_CHAPTER_ENTRY_TICKETS: ChapterEntryTicketItem[] = [
  // ---------- PART 1 ----------
  {
    id: "p1-c1",
    chapterCode: "I.1",
    title: "The Bright Cold Day in April & The Diary",
    subtitle: "Victory Mansions, the Two Minutes Hate, and 'DOWN WITH BIG BROTHER'",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Julia (dark-haired girl)", "O'Brien", "Emmanuel Goldstein (telescreen)"],
    setting: "Victory Mansions Flat 7 & Ministry of Truth (Minitrue)",
    keyThemes: ["surveillance", "totalitarianism", "doublethink"],
    sixtySecondSummary:
      "Winston Smith enters dilapidated Victory Mansions on a cold April day where clocks strike thirteen. Taking advantage of a shallow alcove outside telescreen line-of-sight, he opens an antique cream-laid diary bought illegally in a prole junk shop and writes 'DOWN WITH BIG BROTHER'. He recalls the Two Minutes Hate, Goldstein's demonization, his suspicion of the dark-haired girl as a Thought Police spy, and a fleeting glance of shared heresy with O'Brien.",
    mustCiteQuotes: [
      {
        quote: "It was a bright cold day in April, and the clocks were striking thirteen.",
        speaker: "Narrator",
        analysis: "Subverts familiar pastoral spring expectations; military 24-hour time establishes an unnatural, regimented order.",
      },
      {
        quote: "WAR IS PEACE / FREEDOM IS SLAVERY / IGNORANCE IS STRENGTH",
        speaker: "Party Slogan",
        analysis: "The tripartite slogan embodying Doublethink—holding contradictory axioms simultaneously to paralyze critical logic.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Orwell open with clocks striking thirteen rather than a standard hour?",
      "How does the Two Minutes Hate function as psychological conditioning rather than mere propaganda?",
      "What is the significance of Winston's diary being physical, cream-laid paper in a digitized surveillance society?",
    ],
    commonMisconceptions:
      "Students often assume Winston is brave or heroic. In reality, Orwell emphasizes Winston's physical frailty (varicose ulcer, coughing fits) and impulsive desperation; his rebellion begins with visceral psychological disgust rather than a grand political doctrine.",
  },
  {
    id: "p1-c2",
    chapterCode: "I.2",
    title: "Mrs. Parsons, The Junior Spies & O'Brien's Promise",
    subtitle: "Domestic decay, weaponized children, and the place with no darkness",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 6,
    characters: ["Winston Smith", "Mrs. Parsons", "Parsons Children", "Tom Parsons (mentioned)"],
    setting: "Victory Mansions Flat 2 (Dilapidated Parsons Residence)",
    keyThemes: ["loyalty", "surveillance", "totalitarianism"],
    sixtySecondSummary:
      "Winston visits his neighbor Mrs. Parsons to unblock her sink. Her children, dressed in Junior Spies uniforms, savagely play at hanging Eurasian prisoners and fire toy catapults at Winston while chanting 'Traitor!' and 'Thought-criminal!' Winston reflects on how the Party systematically turns offspring into domestic informants who betray their parents. Back in his flat, ink stains on his fingers remind him he is doomed, yet he recalls a dream in which O'Brien whispered: 'We shall meet in the place where there is no darkness.'",
    mustCiteQuotes: [
      {
        quote: "It was almost normal for people over thirty to be frightened of their own children.",
        speaker: "Narrator",
        analysis: "Illustrates the totalitarian destruction of nuclear family loyalty in favor of absolute loyalty to Big Brother.",
      },
      {
        quote: "We shall meet in the place where there is no darkness.",
        speaker: "O'Brien (in Winston's dream)",
        analysis: "Poignant motif that Winston mistakes for utopia or the Brotherhood, but which ironically foreshadows the blinding interrogation cells of the Ministry of Love.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does the Party exploit children to dismantle the traditional family structure?",
      "Why does Winston consider Tom and Mrs. Parsons doomed even though they are orthodox?",
      "What is the dramatic irony of Winston's interpretation of 'the place where there is no darkness'?",
    ],
    commonMisconceptions:
      "Students often treat the Parsons children as comic brats. Orwell modeled them on the Nazi Hitler Youth and Soviet Pioneers (e.g. Pavlik Morozov); they are genuine executioners in training.",
  },
  {
    id: "p1-c3",
    chapterCode: "I.3",
    title: "Dreams of the Golden Country, Mother & Ingsoc Origins",
    subtitle: "The vanished pastoral pasture, maternal sacrifice, and Physical Jerks",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Winston's Mother & Sister (in dream)", "Julia (in dream)", "Physical Jerks Instructor"],
    setting: "Winston's Dreamscape & Flat 7 Exercising Mat",
    keyThemes: ["doublethink", "totalitarianism", "rebellion"],
    sixtySecondSummary:
      "Winston wakes from a vivid dream of his mother and infant sister sinking beneath green water, sacrificing their lives so he might survive during the atomic purges of the 1950s. He dreams of the 'Golden Country'—a lush pasture where the dark-haired girl tears off her clothes in an act that annihilates the Party with a single gesture. Awakened by the telescreen for 'Physical Jerks', he contemplates Doublethink and how the Party erases all memory of past alliances between Oceania, Eurasia, and Eastasia.",
    mustCiteQuotes: [
      {
        quote: "Tragedy, he perceived, belonged to the ancient time, to a time when there was still privacy, love, and friendship...",
        speaker: "Narrator",
        analysis: "Establishes that deep human emotion requires private autonomy, which totalitarian regimes eradicate.",
      },
      {
        quote: "To know and not to know, to be conscious of complete truthfulness while telling carefully constructed lies...",
        speaker: "Narrator",
        analysis: "The definitive definition of Doublethink: holding contradictory beliefs simultaneously and believing both.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Winston connect private human tragedy with an extinct pre-Party past?",
      "What does Julia casting off her clothes symbolize in Winston's dream of the Golden Country?",
      "How does Doublethink differ from simple lying or political hypocrisy?",
    ],
    commonMisconceptions:
      "Students often confuse Doublethink with mere hypocrisy. Doublethink is cognitive gymnastics where the liar completely believes his own falsehoods even while holding the original truth in reserve.",
  },
  {
    id: "p1-c4",
    chapterCode: "I.4",
    title: "Ministry of Truth (Minitrue) & Historical Falsification",
    subtitle: "Pneumatic speakwrites, memory holes, and the creation of Comrade Ogilvy",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Comrade Ogilvy (invented)", "Comrade Withers (unperson)", "Tillotson"],
    setting: "Ministry of Truth (Records Department / Minitrue)",
    keyThemes: ["totalitarianism", "newspeak", "doublethink"],
    sixtySecondSummary:
      "Winston works at his cubicle in Minitrue altering back issues of The Times using pneumatic tubes, speakwrites, and memory holes. To cover up Big Brother's praise of a purged official (Comrade Withers), Winston invents 'Comrade Ogilvy'—an unblemished, ascetic Party martyr who died in battle. History is not merely censored; it is continuously re-manufactured so the Party's infallibility remains perpetually intact.",
    mustCiteQuotes: [
      {
        quote: "Who controls the past controls the future: who controls the present controls the past.",
        speaker: "Party Slogan",
        analysis: "Epistemological doctrine: present power gives monopoly over archives, rendering historical truth fully mutable.",
      },
      {
        quote: "Comrade Ogilvy, who had never existed in the present, now existed in the past...",
        speaker: "Narrator",
        analysis: "Exposes the grotesque ease with which totalitarian regimes create heroes and erase dissidents out of thin air.",
      },
    ],
    teacherDiscussionQuestions: [
      "What is an 'unperson' and how does destroying physical records destroy existence itself?",
      "How does the creation of Comrade Ogilvy parody Soviet and totalitarian mythmaking?",
      "If all historical records agree with the Party, can an objective truth be said to exist?",
    ],
    commonMisconceptions:
      "Students mistake Minitrue for a simple censorship bureau. Minitrue does not merely suppress facts; it continuously manufactures an exhaustive, synthetic reality to replace them.",
  },
  {
    id: "p1-c5",
    chapterCode: "I.5",
    title: "Syme & The Purpose of Newspeak",
    subtitle: "Linguistic determinism, cutting words, and Chestnut Tree outcasts",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Syme", "Tom Parsons"],
    setting: "Ministry of Truth Canteen",
    keyThemes: ["newspeak", "totalitarianism", "surveillance"],
    sixtySecondSummary:
      "In the noisy, foul-smelling canteen, Winston eats stew with philologist Syme, who works on the Eleventh Edition of the Newspeak Dictionary. Syme gleefully explains that the goal of Newspeak is to narrow the range of thought until thoughtcrime becomes literally impossible, because there will be no vocabulary to formulate heresy. Observing Syme's razor-sharp intellect, Winston knows with fatal certainty that Syme will be vaporized.",
    mustCiteQuotes: [
      {
        quote: "Don't you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible...",
        speaker: "Syme",
        analysis: "Radical linguistic determinism: eliminating vocabulary eliminates the mental capacity for oppositional thought.",
      },
      {
        quote: "Orthodoxy means not thinking—not needing to think. Orthodoxy is unconsciousness.",
        speaker: "Syme",
        analysis: "The Party's ultimate psychological goal: the total voluntary surrender of critical consciousness.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why is cutting words from the dictionary considered an achievement by the Party?",
      "Why does Winston realize Syme will be vaporized while the stupid Parsons will survive?",
      "What is 'duckspeak' and why does the Party consider it the ideal form of speech?",
    ],
    commonMisconceptions:
      "Students often assume Newspeak is slang or colloquial abbreviation. It is an engineered linguistic cage designed to eliminate semantic shades, synonyms, and rebellious concepts.",
  },
  {
    id: "p1-c6",
    chapterCode: "I.6",
    title: "Katharine, Prostitution & Party Chastity",
    subtitle: "The anti-sex campaign, marital duty, and suppressed erotic energy",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Katharine (estranged wife)", "Old Prole Prostitute"],
    setting: "Winston's Diary / London Memory",
    keyThemes: ["rebellion", "doublethink", "loyalty"],
    sixtySecondSummary:
      "Winston records in his diary an encounter with an aged, toothless prole prostitute in a dark basement. He reflects on his estranged marriage to Katharine, an orthodox fanatic who regarded marital sex as 'our duty to the Party' for reproduction. Winston understands that the Party suppresses erotic love because sexual satisfaction creates a private world outside the state's reach, while frustrated desire is easily channeled into war hysteria and Big Brother worship.",
    mustCiteQuotes: [
      {
        quote: "The sexual act, successfully performed, was rebellion. Desire was thoughtcrime.",
        speaker: "Narrator",
        analysis: "Connects private intimate pleasure with political insurrection; eros is inherently anti-totalitarian.",
      },
      {
        quote: "She had not a thought in her head that was not a slogan.",
        speaker: "Winston (regarding Katharine)",
        analysis: "Depicts the total colonization of individual human consciousness by Party dogma.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does the Party regard private sexual attraction as an existential political threat?",
      "How does Katharine embody the Party's ideal feminine orthodoxy?",
      "How is sexual frustration channeled into collective aggression like Hate Week?",
    ],
    commonMisconceptions:
      "Students often view the Party's anti-sex campaign as puritanical religious morality. Orwell reveals it is cold political engineering: sublimated libido fuels aggressive mass hysteria.",
  },
  {
    id: "p1-c7",
    chapterCode: "I.7",
    title: "Hope in the Proles & Jones, Aaronson, and Rutherford",
    subtitle: "The 85% majority, physical proof of party lies, and '2 + 2 = 4'",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Jones, Aaronson & Rutherford (photograph)", "Proles"],
    setting: "Winston's Desk & Prole Districts",
    keyThemes: ["class", "doublethink", "rebellion"],
    sixtySecondSummary:
      "Winston writes in his diary: 'If there is hope, it lies in the proles,' who make up 85% of Oceania's population and remain exempt from continuous telescreen monitoring. Yet they remain politically unconscious. Winston recalls holding incontrovertible physical proof of Party falsehoods—a ten-year-old newspaper photograph proving leaders Jones, Aaronson, and Rutherford were in New York when the Party claimed they were committing treason in Eurasia. He burned it in a memory hole in terror, but concludes: 'Freedom is the freedom to say that two plus two make four.'",
    mustCiteQuotes: [
      {
        quote: "Until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious.",
        speaker: "Winston",
        analysis: "A debilitating totalitarian Catch-22: resistance requires political consciousness, which systemic oppression prevents.",
      },
      {
        quote: "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
        speaker: "Winston",
        analysis: "Grounds human liberty in empirical, objective reality independent of state dogma; O'Brien's core target in Part 3.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why can't the proles rebel despite outnumbering Party members six to one?",
      "Why was the photograph of Jones, Aaronson, and Rutherford so devastating to Winston?",
      "What is the philosophical significance of 'two plus two make four'?",
    ],
    commonMisconceptions:
      "Students often imagine Orwell portrays the proles as an imminent revolutionary army. In truth, Orwell portrays them as an inert mass pacified by lotteries, football, and trivial beer-hall disputes.",
  },
  {
    id: "p1-c8",
    chapterCode: "I.8",
    title: "Mr. Charrington's Junk Shop & The Glass Paperweight",
    subtitle: "The coral crystal, St. Clement's bells, and Julia's shadow",
    part: "Part 1",
    partId: "part-1",
    readingTimeMinutes: 9,
    characters: ["Winston Smith", "Mr. Charrington", "Old Prole in Pub", "Julia (trailing Winston)"],
    setting: "Prole Quarter Slums & Mr. Charrington's Junk Shop",
    keyThemes: ["rebellion", "surveillance", "class"],
    sixtySecondSummary:
      "Winston walks through prole streets, fails to extract memories of pre-revolutionary life from an old man in a pub, and revisits Mr. Charrington's antique shop. He buys a heavy glass paperweight containing a piece of pink coral—a useless, beautiful artifact from the past. Charrington shows him an upstairs bedroom without a telescreen and teaches him the opening lines of the nursery rhyme 'Oranges and lemons'. Leaving the shop, Winston sees the dark-haired girl trailing him and contemplates bashing her skull with a cobblestone.",
    mustCiteQuotes: [
      {
        quote: "The paperweight was the room he was in, and the coral was Julia's life and his own, fixed in a sort of eternity at the heart of the crystal.",
        speaker: "Narrator",
        analysis: "Central motif: the paperweight represents Winston's illusion of private nostalgia, soon to be shattered on the hearthstone.",
      },
      {
        quote: "Here comes a candle to light you to bed, / Here comes a chopper to chop off your head!",
        speaker: "Mr. Charrington",
        analysis: "Sinister nursery rhyme that encapsulates the illusion of safety followed by brutal decapitation/arrest.",
      },
    ],
    teacherDiscussionQuestions: [
      "What does the glass coral paperweight symbolize in Winston's rebellion?",
      "Why can't the elderly prole answer Winston's questions about capitalism vs. socialism?",
      "Why does the rhyme 'Oranges and lemons' evoke nostalgia while hiding an ominous threat?",
    ],
    commonMisconceptions:
      "Students often fail to recognize that Mr. Charrington's charming nostalgia and upstairs room are deliberate honeypots orchestrated by the Thought Police from day one.",
  },

  // ---------- PART 2 ----------
  {
    id: "p2-c1",
    chapterCode: "II.1",
    title: "The Note: 'I LOVE YOU'",
    subtitle: "The corridor fall, the folded slip, and the canteen rendezvous",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Julia", "Wilsher"],
    setting: "Ministry of Truth Corridor & Canteen",
    keyThemes: ["rebellion", "surveillance", "loyalty"],
    sixtySecondSummary:
      "In the Minitrue corridor, the dark-haired girl trips with her arm in a sling. As Winston helps her to her feet, she slips a folded scrap of paper into his palm. Fearing it is an execution order from the Thought Police, Winston opens it in his cubicle to read three words: 'I love you.' Over the following week, under the continuous glare of telescreens, he struggles to make contact without arousing suspicion, finally arranging a rendezvous with her at a crowded canteen table.",
    mustCiteQuotes: [
      {
        quote: "At the sight of the words I love you the desire to stay alive had welled up inside him...",
        speaker: "Narrator",
        analysis: "Love immediately dispels Winston's nihilistic death wish and replaces it with biological willpower to survive.",
      },
      {
        quote: "To mark the paper was the decisive act.",
        speaker: "Narrator",
        analysis: "Parallels Winston's opening of the diary; reciprocal human connection is treated as an irreversible act of heresy.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does Orwell generate suspense before Winston reads the note?",
      "Why was the phrase 'I love you' shocking beyond measure in Oceania?",
      "How do telescreens force citizens to conduct human relationships in code and glances?",
    ],
    commonMisconceptions:
      "Students often forget Winston previously fantasized about raping and murdering Julia; the note instantly transforms his misogynistic paranoia into romantic obsession.",
  },
  {
    id: "p2-c2",
    chapterCode: "II.2",
    title: "The Golden Country: First Physical Encounter",
    subtitle: "The singing thrush, the bluebells, and embrace as a political act",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Julia", "Singing Thrush"],
    setting: "Countryside Hideout outside London (The Golden Country)",
    keyThemes: ["rebellion", "doublethink", "loyalty"],
    sixtySecondSummary:
      "Winston follows Julia's precise directions to a secluded woodland clearing outside London. Free from telescreens and hidden microphones, they talk, hear a thrush singing without motive, and share real chocolate Julia smuggled from the black market. Tearing off her Junior Anti-Sex League sash, Julia makes love to Winston in the sunlight. Winston realizes that their embrace is an insurrectionary blow struck against the Party.",
    mustCiteQuotes: [
      {
        quote: "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a political act.",
        speaker: "Narrator",
        analysis: "Reframes physical pleasure and private intimacy as the supreme anti-totalitarian revolt.",
      },
      {
        quote: "I hate purity, I hate goodness! I don't want any virtue to exist anywhere. I want everyone to be corrupt to the bones.",
        speaker: "Winston",
        analysis: "Winston's nihilistic realization: moral corruption is the only antidote to the Party's artificial purity.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Winston consider their physical union 'a political act'?",
      "How does the pastoral countryside contrast with London's urban decay?",
      "Why does Winston rejoice when Julia confesses she has had sex with dozens of Party members?",
    ],
    commonMisconceptions:
      "Students frequently romanticize this scene as traditional romance. Orwell explicitly grounds it in animal instinct and political defiance: Winston values Julia's corruption because it weakens the Party.",
  },
  {
    id: "p2-c3",
    chapterCode: "II.3",
    title: "The Belfry & Julia's Pragmatic Rebellion",
    subtitle: "Pornosec, black-market chocolate, and yelling with the crowd",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Julia"],
    setting: "Belfry of a Ruined Country Church",
    keyThemes: ["rebellion", "totalitarianism", "loyalty"],
    sixtySecondSummary:
      "Winston and Julia meet in the belfry of a bombed church. Julia describes her pragmatic philosophy: she has no interest in grand political resistance, historical truth, or future generations. Instead, she seeks private pleasure, works on the pornography machines in Pornosec, wears the Anti-Sex sash as camouflage, and advises Winston to 'always yell with the crowd.' Winston reflects on the gulf between his intellectual martyrdom and Julia's sensual pragmatism.",
    mustCiteQuotes: [
      {
        quote: "Life as she saw it was quite simple. You wanted a good time; 'they', meaning the Party, wanted to stop you having it; you broke the rules as best you could.",
        speaker: "Narrator (on Julia)",
        analysis: "Defines Julia's rebellion: individual, hedonistic, and devoid of ideological theory.",
      },
      {
        quote: "Always yell with the crowd, that's what I say. It's the only way to be safe.",
        speaker: "Julia",
        analysis: "The art of totalitarian camouflage: hyperbolic public orthodoxy masks private non-conformity.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does Julia's rebellion differ fundamentally from Winston's?",
      "Why does Julia believe the Party enforces sexual puritanism?",
      "Why does Julia work in Pornosec, and what is its role in Oceania?",
    ],
    commonMisconceptions:
      "Students often assume Julia shares Winston's obsession with truth and the past. In reality, Julia is bored by doctrine and falls asleep when Winston discusses the Brotherhood; she resists with her body, not her intellect.",
  },
  {
    id: "p2-c4",
    chapterCode: "II.4",
    title: "Charrington's Rented Room & The Rat in the Wainscot",
    subtitle: "Real coffee, feminine cosmetics, and the primal phobia revealed",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Julia", "Mr. Charrington"],
    setting: "Room above Mr. Charrington's Junk Shop",
    keyThemes: ["loyalty", "torture", "rebellion"],
    sixtySecondSummary:
      "Winston rents the upstairs room above Charrington's shop. Julia arrives with luxuries stolen from the Inner Party: real ground coffee, white sugar, and bread. She applies perfume and makeup, transforming into a vibrant woman. When a brown rat pokes its snout from the wainscot, Winston experiences uncontrollable, nauseating terror, confessing his lifelong phobia of rats. Julia covers the hole and comforts him, gazing into the coral paperweight.",
    mustCiteQuotes: [
      {
        quote: "'Of all horrors in the world—a rat!' Winston cried.",
        speaker: "Winston",
        analysis: "Crucial foreshadowing: plants Winston's ultimate psychological vulnerability, which O'Brien will exploit in Room 101.",
      },
      {
        quote: "In this room I'm going to be a woman, not a Party comrade.",
        speaker: "Julia",
        analysis: "Reclaims gender, beauty, and individuality against the unisex, desexualized overalls of Ingsoc.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why is renting Charrington's room Winston's definitive crossing of the Rubicon?",
      "How does Julia wearing makeup represent an act of political defiance?",
      "Why is the rat's appearance in the bedroom pivotal to the entire novel's trajectory?",
    ],
    commonMisconceptions:
      "Students sometimes overlook the rat as a minor domestic nuisance. Orwell explicitly plants it as Chekhov's gun—it is the exact weapon that breaks Winston's soul in Part 3.",
  },
  {
    id: "p2-c5",
    chapterCode: "II.5",
    title: "Syme's Vaporization & Hate Week Preparations",
    subtitle: "The erased lexicographer, military banners, and Julia's skepticism",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Julia", "Mr. Charrington", "Syme (vaporized)"],
    setting: "London Streets & Charrington's Room",
    keyThemes: ["newspeak", "totalitarianism", "surveillance"],
    sixtySecondSummary:
      "Syme vanishes without a trace; his name is expunged from the chess committee and he becomes an unperson just as Winston predicted. London is gripped by hysterical preparations for Hate Week, with colossal effigies of Eurasian soldiers hung from buildings. In the room, Winston and Julia debate the Party's origins; Julia shocks Winston by suggesting that the rocket bombs falling on London are launched by the Party itself to maintain terror.",
    mustCiteQuotes: [
      {
        quote: "Syme had ceased to exist: he had never existed.",
        speaker: "Narrator",
        analysis: "The definitive formula of vaporization: retroactive historical erasure.",
      },
      {
        quote: "It was a question of whether the rocket bombs were fired by the Party itself, just to keep people frightened.",
        speaker: "Julia",
        analysis: "Julia's instinctive cynicism pierces Party propaganda, exposing state-sponsored false-flag terror.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does Syme's vaporization validate Winston's understanding of the Party's psychology?",
      "Why does Julia suspect the Party fires rocket bombs at its own citizens?",
      "How does Hate Week demonstrate the total manipulation of public emotion?",
    ],
    commonMisconceptions:
      "Students often think Winston is the more perceptive rebel. Julia's intuition—that the war and rocket bombs are manufactured by Oceania itself—shows she is faster at spotting practical state fraud.",
  },
  {
    id: "p2-c6",
    chapterCode: "II.6",
    title: "O'Brien's Invitation in the Corridor",
    subtitle: "The slip of address, the mention of Syme, and the shadow of death",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 6,
    characters: ["Winston Smith", "O'Brien"],
    setting: "Ministry of Truth Corridor",
    keyThemes: ["surveillance", "loyalty", "doublethink"],
    sixtySecondSummary:
      "O'Brien approaches Winston in the Minitrue corridor, praising his Newspeak articles and subtly referencing the vaporized Syme. O'Brien offers to lend Winston the new Tenth Edition of the Newspeak Dictionary and writes his private home address on a slip of paper in full view of a telescreen. Winston memorizes it and drops the slip into a memory hole, realizing the long-awaited conspiracy with the Brotherhood has begun—yet sensing the damp chill of a grave.",
    mustCiteQuotes: [
      {
        quote: "The conspiracy that he had dreamed of did exist, and he had reached the outer edges of it.",
        speaker: "Narrator",
        analysis: "Winston's tragic misinterpretation: he believes he is joining an underground liberation movement, unaware it is a Thought Police sting.",
      },
      {
        quote: "He had the sensation of stepping into the dampness of a grave...",
        speaker: "Narrator",
        analysis: "Profound premonition: Winston instinctively knows this step seals his physical execution.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does O'Brien code his invitation so it sounds innocuous to the telescreen?",
      "Why does O'Brien mentioning Syme act as a secret password for Winston?",
      "Why does Winston feel like he is stepping into a grave even while feeling elated?",
    ],
    commonMisconceptions:
      "Students assume Winston is naive to walk into O'Brien's trap. Orwell portrays O'Brien as an omniscient, magnetic figure—Winston craves O'Brien's paternal validation even knowing it leads to death.",
  },
  {
    id: "p2-c7",
    chapterCode: "II.7",
    title: "The Stolen Chocolate, Mother & Betrayal Defined",
    subtitle: "Childhood hunger, the proles' humanity, and the impregnable heart",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Julia", "Winston's Mother & Sister (memory)"],
    setting: "Room above Charrington's Shop",
    keyThemes: ["loyalty", "class", "totalitarianism"],
    sixtySecondSummary:
      "Winston wakes in tears after remembering his childhood during the post-atomic famines. He recalls selfishly snatching a chocolate ration from his starving baby sister and running away, never seeing his mother or sister again. He realizes the proles have remained truly human because their personal loyalties and gestures endure. He and Julia agree that while the Party can force confessions through torture, 'they can't get inside you'—real betrayal is ceasing to love each other.",
    mustCiteQuotes: [
      {
        quote: "The proles are human beings. We are not human.",
        speaker: "Winston",
        analysis: "Outer Party members have had their instincts, empathy, and dignity stripped; the proles alone retain genuine emotion.",
      },
      {
        quote: "If they could make me stop loving you—that would be the real betrayal.",
        speaker: "Winston",
        analysis: "The novel's central emotional thesis: inner emotional loyalty is inviolable—the exact belief that Miniluv will destroy.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does the chocolate flashback encapsulate the moral devastation of totalitarian famine?",
      "Why does Winston view the proles as the only true human beings left in Oceania?",
      "What is Winston and Julia's distinction between confession and betrayal?",
    ],
    commonMisconceptions:
      "Students often forget Winston's assertion that 'they can't get inside you' is the thematic fulcrum of the book; Part 3 exists specifically to prove that the Party CAN get inside you.",
  },
  {
    id: "p2-c8",
    chapterCode: "II.8",
    title: "O'Brien's Flat & Brotherhood Initiation",
    subtitle: "Turning off the telescreen, real wine, and the terrible pledge",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 9,
    characters: ["Winston Smith", "Julia", "O'Brien", "Martin (servant)"],
    setting: "O'Brien's Luxurious Inner Party Apartment",
    keyThemes: ["rebellion", "totalitarianism", "doublethink"],
    sixtySecondSummary:
      "Winston and Julia visit O'Brien's plush Inner Party flat, where O'Brien stuns them by turning off his telescreen. They drink real wine and declare themselves enemies of the Party, promising to commit murder, sabotage, and throw sulfuric acid in children's faces if the Brotherhood demands it—refusing only to separate and stop loving each other. O'Brien confirms the existence of Emmanuel Goldstein and promises to deliver 'The Book' to Winston via a briefcase drop.",
    mustCiteQuotes: [
      {
        quote: "Yes, everything is turned off. We are alone.",
        speaker: "O'Brien",
        analysis: "Displays the unimaginable luxury of privacy reserved solely for the Inner Party elite.",
      },
      {
        quote: "'You are prepared to throw sulfuric acid in a child's face?' 'Yes.'",
        speaker: "O'Brien & Winston",
        analysis: "Chilling moral compromise: in fighting a monstrous regime, the rebels agree to adopt the regime's own depravity.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Winston agree to commit horrific atrocities for the Brotherhood?",
      "What single condition do Winston and Julia refuse to accept?",
      "How does O'Brien's apartment contrast with Victory Mansions?",
    ],
    commonMisconceptions:
      "Students often cheer for Winston during the initiation. Orwell intentionally includes Winston agreeing to throw acid at children to demonstrate that anti-totalitarian hatred can corrupt the rebel's morality.",
  },
  {
    id: "p2-c9",
    chapterCode: "II.9",
    title: "Hate Week Mid-Speech Shift & Goldstein's Book",
    subtitle: "The war that is continuous, the three classes, and the singing prole woman",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 10,
    characters: ["Winston Smith", "Julia", "Prole Washerwoman"],
    setting: "Room above Charrington's Shop",
    keyThemes: ["class", "totalitarianism", "doublethink"],
    sixtySecondSummary:
      "On the sixth day of Hate Week, the speaker is handed a slip mid-sentence: Oceania is at war with Eastasia, not Eurasia. The crowd immediately tears down Eurasian banners, blaming Goldstein. After days of rewriting records, Winston retreats to the room and reads 'The Theory and Practice of Oligarchical Collectivism' (The Book). It details how perpetual war burns surplus goods to maintain social hierarchy and how Ingsoc preserves power. Julia joins him and falls asleep as they admire a singing prole washerwoman.",
    mustCiteQuotes: [
      {
        quote: "Oceania was at war with Eastasia: Oceania had always been at war with Eastasia.",
        speaker: "Narrator",
        analysis: "The supreme manifestation of Doublethink and mutable reality executed on a mass scale.",
      },
      {
        quote: "War is a way of shattering to pieces, or pouring into the stratosphere... materials which might otherwise be used to make the masses too comfortable.",
        speaker: "Goldstein's Book",
        analysis: "The economic engine of totalitarianism: manufactured scarcity prevents egalitarian education and rebellion.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why is perpetual war necessary to sustain Oceania's social pyramid?",
      "Why does Winston say: 'I understand HOW: I do not understand WHY'?",
      "Why does the singing prole washerwoman represent the only enduring hope for humanity?",
    ],
    commonMisconceptions:
      "Students often skim the excerpts from Goldstein's Book. In reality, Orwell wrote these chapters to lay out his political philosophy; they contain the economic and sociological framework of the entire novel.",
  },
  {
    id: "p2-c10",
    chapterCode: "II.10",
    title: "The Iron Voice, Smashed Paperweight & The Arrest",
    subtitle: "The picture removed, Charrington unmasked, and the dead heretics",
    part: "Part 2",
    partId: "part-2",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "Julia", "Mr. Charrington (Thought Police)", "Black-uniformed Troopers"],
    setting: "Room above Mr. Charrington's Shop",
    keyThemes: ["surveillance", "loyalty", "torture"],
    sixtySecondSummary:
      "Looking down at the red-armed prole washerwoman, Winston murmurs: 'We are the dead.' Julia repeats: 'We are the dead.' Suddenly, a cold metallic voice behind the St. Clement's engraving replies: 'You are the dead.' The picture crashes to the floor, revealing a hidden telescreen. Black-uniformed Thought Police smash into the room, beat Julia, and shatter the glass coral paperweight against the hearthstone. Mr. Charrington enters, revealed as a thirty-five-year-old Thought Police operative.",
    mustCiteQuotes: [
      {
        quote: "'You are the dead,' said an iron voice behind them.",
        speaker: "Telescreen Voice (Charrington)",
        analysis: "The chilling climax of Part 2: the panoptic state shatters the domestic sanctuary in an instant.",
      },
      {
        quote: "The paperweight was the room he was in... The fragment of coral, a tiny crinkle of pink... rolled across the mat. How small, thought Winston, how small it always was!",
        speaker: "Narrator",
        analysis: "Symbolic destruction: Winston's illusion of safety is smashed, revealing how tiny and fragile his private rebellion truly was.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does the placement of the telescreen behind St. Clement's engraving symbolize the Party's weaponization of the past?",
      "What does the shattering of the glass paperweight signify?",
      "How does Mr. Charrington's sudden physical transformation reflect Party surveillance?",
    ],
    commonMisconceptions:
      "Students are often shocked by Charrington's betrayal. Orwell dropped continuous clues: Charrington's lack of a family, his low prices, his convenient lack of a telescreen, and his sinister nursery rhyme.",
  },

  // ---------- PART 3 ----------
  {
    id: "p3-c1",
    chapterCode: "III.1",
    title: "Ministry of Love (Miniluv) Holding Cell",
    subtitle: "The windowless fluorescent glare, Ampleforth, and Parsons betrayed by his daughter",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Ampleforth", "Tom Parsons", "Skull-faced man", "O'Brien"],
    setting: "Windowless White-Tiled Holding Cell, Ministry of Love",
    keyThemes: ["torture", "loyalty", "surveillance"],
    sixtySecondSummary:
      "Winston sits in a perpetually lit, white porcelain cell in Miniluv where day cannot be distinguished from night. He encounters fellow prisoners: poet Ampleforth, arrested for leaving the word 'God' in a Kipling poem, and Tom Parsons, arrested after his seven-year-old daughter denounced him for chanting 'Down with Big Brother' in his sleep. A starving prisoner begs guards to slit his throat rather than send him to 'Room 101'. Finally, O'Brien enters; Winston realizes O'Brien was his hunter all along.",
    mustCiteQuotes: [
      {
        quote: "'They got me a long time ago,' said O'Brien.",
        speaker: "O'Brien",
        analysis: "Ambiguous and chilling: reveals O'Brien was once an unorthodox heretic who was broken and assimilated by Miniluv.",
      },
      {
        quote: "'Thoughtcrime is a dreadful thing, old man,' said Parsons... 'Who denounced you?' 'It was my little daughter.'",
        speaker: "Parsons & Winston",
        analysis: "Grotesque perfection of Ingsoc: Parsons is proud of his child for sending him to the execution chamber.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Orwell contrast the reactions of intellectual Ampleforth and orthodox Parsons to arrest?",
      "What psychological horror is evoked by the prisoners' panic at the mention of 'Room 101'?",
      "What does O'Brien mean by 'They got me a long time ago'?",
    ],
    commonMisconceptions:
      "Students expect Winston to meet Julia in prison. Miniluv deliberately isolates prisoners so they cannot draw strength or solidarity from human relationships.",
  },
  {
    id: "p3-c2",
    chapterCode: "III.2",
    title: "O'Brien's Interrogation & The 4 Dialectical Fingers",
    subtitle: "The dial of electroshock pain, solipsism, and seeing five fingers",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 9,
    characters: ["Winston Smith", "O'Brien", "White-coated Technicians"],
    setting: "Miniluv Interrogation Room",
    keyThemes: ["doublethink", "torture", "totalitarianism"],
    sixtySecondSummary:
      "Strapped to an electroshock bed, Winston is tortured by O'Brien using a dial of adjustable pain. O'Brien explains that Winston is suffering from a defective memory and deranged individualism. Holding up four fingers, O'Brien demands that Winston see five fingers if the Party says so. Winston screams that he sees four, but under relentless agony and cognitive breakdown, he genuinely sees five. O'Brien reveals that Miniluv does not execute heretics until they have been spiritually cured.",
    mustCiteQuotes: [
      {
        quote: "We do not destroy the heretic because he resists us... We convert him, we capture his inner mind, we reshape him.",
        speaker: "O'Brien",
        analysis: "The distinct horror of Ingsoc: unlike the Inquisition or Nazis, the Party will not tolerate martyrs—it forces loving capitulation.",
      },
      {
        quote: "Whatever the Party holds to be truth, is truth. It is impossible to see reality except through the eyes of the Party.",
        speaker: "O'Brien",
        analysis: "Collective solipsism: reality is not external or empirical, but entirely defined by the consensus of the ruling class.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does O'Brien insist that Winston genuinely see five fingers instead of merely pretending?",
      "How does the Party prevent martyrs, and how does this contrast with historical regimes?",
      "What does O'Brien mean when he says reality exists only in the mind of the Party?",
    ],
    commonMisconceptions:
      "Students often believe O'Brien wants Winston to lie to save his life. O'Brien explicitly rejects lip service: Winston must rewire his sensory perception to experience 2 + 2 = 5 as absolute truth.",
  },
  {
    id: "p3-c3",
    chapterCode: "III.3",
    title: "The Philosophy of Pure Power & The Stamping Boot",
    subtitle: "Salinger cruelty, the immortal collective body, and the skeletal mirror",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 9,
    characters: ["Winston Smith", "O'Brien"],
    setting: "Miniluv Interrogation Room",
    keyThemes: ["totalitarianism", "torture", "doublethink"],
    sixtySecondSummary:
      "O'Brien explains the Party's ultimate motive: power entirely for its own sake. The Party is not interested in the good of others, wealth, or luxury—only pure, absolute power, which can only be asserted by inflicting pain and humiliation. To demonstrate what Winston has become, O'Brien forces him to look in a three-sided mirror: Winston is a rotting, toothless, skeletal wreck of sixty. Weeping, Winston clings to one remaining shred of dignity: he has not betrayed Julia.",
    mustCiteQuotes: [
      {
        quote: "The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power.",
        speaker: "O'Brien",
        analysis: "Strips away ideological pretexts: Ingsoc is pure sadism and dominion unmasked.",
      },
      {
        quote: "If you want a picture of the future, imagine a boot stamping on a human face—forever.",
        speaker: "O'Brien",
        analysis: "The most famous image in 20th-century political literature: eternal, unyielding oppression.",
      },
    ],
    teacherDiscussionQuestions: [
      "How does O'Brien's definition of power overturn previous philosophies of government?",
      "Why does O'Brien argue that power over matter is meaningless compared to power over human consciousness?",
      "Why does seeing his emaciated body in the mirror shatter Winston's spirit?",
    ],
    commonMisconceptions:
      "Students often assume the Party rules for material privilege. O'Brien explicitly denies this: wealth and comfort are trivial compared to the ecstasy of exercising absolute power through cruelty.",
  },
  {
    id: "p3-c4",
    chapterCode: "III.4",
    title: "Physical Rehabilitation & 'Julia! Julia!' in the Night",
    subtitle: "Clean clothes, crimestop on a slate, and the unbowed heart that triggers Room 101",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "O'Brien"],
    setting: "Hospitalized Cell, Ministry of Love",
    keyThemes: ["torture", "loyalty", "doublethink"],
    sixtySecondSummary:
      "Winston is treated humanely: his ulcers are healed, he is fed three hot meals a day, and given false teeth. He practices 'crimestop' and self-hypnosis, writing on a slate: 'FREEDOM IS SLAVERY' and 'TWO AND TWO MAKE FIVE.' He realizes he can outsmart the Party by obeying outwardly while dying with his hatred intact. But in a sudden nightmare, he screams aloud: 'Julia! Julia! My love! Julia!' O'Brien enters and announces that because Winston's heart is still heretical, he must take the final step in Room 101.",
    mustCiteQuotes: [
      {
        quote: "To die hating them, that was freedom.",
        speaker: "Winston",
        analysis: "Winston's final defiant stratagem: maintaining private hatred until the moment of the bullet.",
      },
      {
        quote: "You hate him. Good. Then the time has come for you to take the last step. You must love Big Brother.",
        speaker: "O'Brien",
        analysis: "Obedience is not enough; the Party demands genuine adoration before execution.",
      },
    ],
    teacherDiscussionQuestions: [
      "What are O'Brien's three stages of reintegration: Learning, Understanding, and Acceptance?",
      "Why is intellectual obedience insufficient for the Party?",
      "Why does crying out Julia's name trigger Winston's immediate transfer to Room 101?",
    ],
    commonMisconceptions:
      "Students mistakenly believe Winston was winning against O'Brien. The scream reveals that subconscious love cannot be suppressed by conscious logic—and O'Brien uses that exact leak to crush him.",
  },
  {
    id: "p3-c5",
    chapterCode: "III.5",
    title: "Room 101 & The Wire Cage of Rats",
    subtitle: "The worst thing in the world, the clicking mask, and 'Do it to Julia!'",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 7,
    characters: ["Winston Smith", "O'Brien", "Julia (invoked)"],
    setting: "Room 101, Subterranean Ministry of Love",
    keyThemes: ["torture", "loyalty", "totalitarianism"],
    sixtySecondSummary:
      "Deep underground in Room 101, O'Brien explains that the room contains 'the worst thing in the world'—which varies for every individual. For Winston, it is carnivorous rats. O'Brien brings forward an oblong wire cage fitted with a mask that clamps over Winston's face, containing two enormous, famished sewer rats. As O'Brien prepares to open the door separating the rats from his eyes and tongue, Winston descends into blind primal panic and shrieks the only words that can save him: 'Do it to Julia! Do it to Julia! Not me! Julia!'",
    mustCiteQuotes: [
      {
        quote: "The worst thing in the world varies from individual to individual.",
        speaker: "O'Brien",
        analysis: "Room 101 exploits the absolute personal limit where instinct overcomes all morality and love.",
      },
      {
        quote: "'Do it to Julia! Do it to Julia! Not me! Julia! I don't care what you do to her. Tear her face off, strip her to the bones. Not me! Julia! Not me!'",
        speaker: "Winston",
        analysis: "The definitive betrayal: Winston sacrifices the person he loves to save himself, severing his human soul forever.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why is Room 101 different for every prisoner?",
      "Why does sacrificing Julia represent the total death of Winston's humanity?",
      "Why couldn't Winston endure the rats through willpower alone?",
    ],
    commonMisconceptions:
      "Students often think Winston merely uttered words to escape pain. Orwell makes clear that Winston truly wanted Julia to be torn to pieces in his place—he surrendered the core of his moral being.",
  },
  {
    id: "p3-c6",
    chapterCode: "III.6",
    title: "Chestnut Tree Café, Victory Gin & 'He Loved Big Brother'",
    subtitle: "The ruined meeting in the park, the chess problem, and the final victory",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 8,
    characters: ["Winston Smith", "Julia (reunited)", "Big Brother (portrait)", "Waiters"],
    setting: "Chestnut Tree Café & London Park",
    keyThemes: ["doublethink", "totalitarianism", "loyalty"],
    sixtySecondSummary:
      "A broken, bloated Winston sits in the Chestnut Tree Café drinking clove-flavored Victory Gin and moving chess pieces. He recalls an awkward reunion with Julia in a cold park: both admitted they betrayed each other in Room 101, and their love and physical desire were dead. A trumpet fanfare on the telescreen announces a colossal victory in Africa. Tears of gin roll down Winston's nose as he gazes up at Big Brother's mustache: the struggle is finished. He has won the victory over himself: he loves Big Brother.",
    mustCiteQuotes: [
      {
        quote: "'I betrayed you,' she said baldly. 'I betrayed you,' he said.",
        speaker: "Julia & Winston",
        analysis: "The tragic epitaph of human intimacy: total spiritual death under totalitarian coercion.",
      },
      {
        quote: "He had won the victory over himself. He loved Big Brother.",
        speaker: "Narrator",
        analysis: "The harrowing concluding lines: not physical death, but total psychological assimilation and surrender.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why does Orwell end the narrative with Winston loving Big Brother rather than with his execution?",
      "What is the symbolic meaning of Winston's interaction with the chess puzzle?",
      "Why was Winston and Julia's reunion in the park devoid of emotion or resentment?",
    ],
    commonMisconceptions:
      "Students often believe Winston is executed at the end. He is alive, employed in a sinecure, drinking gin. The real tragedy is that his execution is unnecessary because his soul has already been annihilated.",
  },

  // ---------- SCHOLARLY APPENDIX ----------
  {
    id: "p3-c7",
    chapterCode: "App",
    title: "The Principles of Newspeak (Scholarly Appendix)",
    subtitle: "A, B, and C vocabularies, grammatical inversion, and the past-tense epitaph",
    part: "Part 3",
    partId: "part-3",
    readingTimeMinutes: 7,
    characters: ["Orwell / Future Academic Historian"],
    setting: "Post-Totalitarian Academic Future (Post-1984 / Post-2050)",
    keyThemes: ["newspeak", "totalitarianism", "doublethink"],
    sixtySecondSummary:
      "A dry, clinical scholarly treatise examining the linguistics of Newspeak (A-vocabulary for daily life, B-vocabulary for political compounds like goodthink, C-vocabulary for technical science). Crucially, the entire essay is written in standard grammatical English in the past tense ('Newspeak was the official language of Oceania...'). This linguistic fact reveals that the Party collapsed, its target completion date of 2050 was never reached, and objective historical scholarship outlived Ingsoc.",
    mustCiteQuotes: [
      {
        quote: "Newspeak was the official language of Oceania and had been devised to meet the ideological needs of Ingsoc...",
        speaker: "Scholarly Narrator",
        analysis: "The past-tense verb 'was' is the novel's subtle masterstroke: it proves Ingsoc fell into the dustbin of history.",
      },
      {
        quote: "In 1984, when Oldspeak was still in use, the final adoption of Newspeak had been fixed for so late a date as 2050.",
        speaker: "Scholarly Narrator",
        analysis: "Confirms the regime did not achieve its ultimate goal of permanent cognitive enslavement.",
      },
    ],
    teacherDiscussionQuestions: [
      "Why is the past-tense grammatical framing of the Appendix the most critical clue to Orwell's ultimate message?",
      "How do the A, B, and C vocabularies function differently to constrain consciousness?",
      "Why did the architects of Newspeak project 2050 as its completion date?",
    ],
    commonMisconceptions:
      "Students almost universally skip the Appendix, assuming it is dry linguistic filler. Literary scholars emphasize that the Appendix provides the novel's singular glimmer of hope: written in normal English after Ingsoc's fall, it proves truth survived.",
  },
];

