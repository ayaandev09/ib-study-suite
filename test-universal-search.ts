import {
  searchUniversalSuite,
  synthesizeLocalAIAnswer,
} from "./src/lib/universalSearchEngine";

function runTests() {
  console.log("=== RUNNING UNIVERSAL SEARCH & LOCAL AI ENGINE TESTS ===");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. Business Management HL Unit 5.1 Query
  const q1 = "find me the notes for unit 5.1 for business management";
  const res1 = searchUniversalSuite(q1);
  assert(res1.aiAnswer !== null, "AI synthesizes answer for Unit 5.1 Business");
  assert(
    res1.aiAnswer?.subjectId === "business",
    `Subject should be business, got ${res1.aiAnswer?.subjectId}`
  );
  assert(
    res1.aiAnswer?.targetId === "u5-1",
    `TargetId should be u5-1, got ${res1.aiAnswer?.targetId}`
  );
  assert(
    res1.aiAnswer?.title.includes("Operations Management") === true,
    `Title should mention Operations Management, got ${res1.aiAnswer?.title}`
  );
  assert(
    res1.items.length > 0,
    `Search items should be returned, got count ${res1.items.length}`
  );

  // 2. IB Biology SL/HL Queries (May 2027 Syllabus)
  const q2a = "water potential equation in biology";
  const res2a = searchUniversalSuite(q2a);
  assert(res2a.aiAnswer !== null, "AI synthesizes answer for Biology water potential");
  assert(
    res2a.aiAnswer?.subjectId === "biology",
    `Subject should be biology, got ${res2a.aiAnswer?.subjectId}`
  );
  assert(
    res2a.aiAnswer?.targetId === "bio-d2-3",
    `TargetId should be bio-d2-3, got ${res2a.aiAnswer?.targetId}`
  );
  assert(
    res2a.aiAnswer?.keyFormula?.includes("Psi") === true,
    `Key formula should include water potential equation, got ${res2a.aiAnswer?.keyFormula}`
  );

  const q2b = "DNA replication enzymes HL";
  const res2b = searchUniversalSuite(q2b);
  assert(res2b.aiAnswer !== null, "AI synthesizes answer for Biology DNA replication HL");
  assert(
    res2b.aiAnswer?.subjectId === "biology",
    `DNA replication subject should be biology, got ${res2b.aiAnswer?.subjectId}`
  );
  assert(
    res2b.aiAnswer?.targetId === "bio-d1-1",
    `DNA replication targetId should be bio-d1-1, got ${res2b.aiAnswer?.targetId}`
  );

  const q2c = "photosynthesis light dependent reactions";
  const res2c = searchUniversalSuite(q2c);
  assert(res2c.aiAnswer !== null, "AI synthesizes answer for Biology photosynthesis");
  assert(
    res2c.aiAnswer?.targetId === "bio-c1-3",
    `Photosynthesis targetId should be bio-c1-3, got ${res2c.aiAnswer?.targetId}`
  );

  const q2d = "hardy weinberg equilibrium biology";
  const res2d = searchUniversalSuite(q2d);
  assert(res2d.aiAnswer !== null, "AI synthesizes answer for Hardy-Weinberg");
  assert(
    res2d.aiAnswer?.targetId === "bio-d4-1",
    `Hardy-Weinberg targetId should be bio-d4-1, got ${res2d.aiAnswer?.targetId}`
  );

  // 3. Physics Conservation of Momentum Query
  const q3 = "formulas for conservation of momentum";
  const res3 = searchUniversalSuite(q3);
  assert(res3.aiAnswer !== null, "AI synthesizes answer for momentum formula");
  assert(
    res3.aiAnswer?.subjectId === "physics",
    `Subject should be physics, got ${res3.aiAnswer?.subjectId}`
  );
  assert(
    Boolean(res3.aiAnswer?.keyFormula),
    `Key formula should be present for momentum, got ${res3.aiAnswer?.keyFormula}`
  );

  // 4. 1984 Coral Paperweight Query
  const q4 = "what does the coral paperweight symbolize in 1984";
  const res4 = searchUniversalSuite(q4);
  assert(res4.aiAnswer !== null, "AI synthesizes answer for 1984 paperweight");
  assert(
    res4.aiAnswer?.subjectId === "orwell",
    `Subject should be orwell, got ${res4.aiAnswer?.subjectId}`
  );
  assert(
    res4.aiAnswer?.targetId === "p2-c4" || res4.aiAnswer?.targetId === "p2-c10",
    `TargetId should be p2-c4 or p2-c10, got ${res4.aiAnswer?.targetId}`
  );

  // 5. Economics Price Elasticity Query
  const q5 = "price elasticity of demand formula in economics";
  const res5 = searchUniversalSuite(q5);
  assert(res5.aiAnswer !== null, "AI synthesizes answer for economics elasticity");
  assert(
    res5.aiAnswer?.subjectId === "economics",
    `Subject should be economics, got ${res5.aiAnswer?.subjectId}`
  );

  // 6. German Textsorten Blog Query
  const q6 = "textsorten format for blog in german";
  const res6 = searchUniversalSuite(q6);
  assert(res6.aiAnswer !== null, "AI synthesizes answer for German blog format");
  assert(
    res6.aiAnswer?.subjectId === "german",
    `Subject should be german, got ${res6.aiAnswer?.subjectId}`
  );
  assert(
    res6.aiAnswer?.viewMode === "textsorten",
    `German viewMode should be textsorten, got ${res6.aiAnswer?.viewMode}`
  );

  // 6b. German Literature Query
  const q6b = "dürrenmatt alte dame analyse";
  const res6b = searchUniversalSuite(q6b);
  assert(res6b.aiAnswer !== null, "AI synthesizes answer for German Dürrenmatt");
  assert(
    res6b.aiAnswer?.viewMode === "literatur",
    `German literature viewMode should be literatur, got ${res6b.aiAnswer?.viewMode}`
  );

  // 6c. Natural language query variations
  const resNL1 = searchUniversalSuite("unit 5.1 business");
  assert(resNL1.aiAnswer?.targetId === "u5-1", "NL variation 'unit 5.1 business' targets u5-1");

  const resNL2 = searchUniversalSuite("conservation of momentum");
  assert(resNL2.aiAnswer?.subjectId === "physics", "NL variation 'conservation of momentum' targets physics");

  const resNL3 = searchUniversalSuite("1984 coral paperweight");
  assert(
    resNL3.aiAnswer?.targetId === "p1-c8" ||
      resNL3.aiAnswer?.targetId === "p2-c4" ||
      resNL3.aiAnswer?.targetId === "p2-c10",
    `NL variation '1984 coral paperweight' targets p1-c8, p2-c4, or p2-c10, got ${resNL3.aiAnswer?.targetId}`
  );

  // 7. True Local AI Intent & Semantic Synthesis (previously unsupported queries!)
  const resChemi = searchUniversalSuite("explain chemiosmosis");
  assert(resChemi.aiAnswer !== null, "AI synthesizes answer for 'explain chemiosmosis'");
  assert(resChemi.aiAnswer?.subjectId === "biology", "Chemiosmosis maps to biology");
  assert(resChemi.aiAnswer?.intent === "explain", `Intent is explain, got ${resChemi.aiAnswer?.intent}`);

  const resCompare = searchUniversalSuite("compare mitosis and meiosis");
  assert(resCompare.aiAnswer !== null, "AI synthesizes answer for 'compare mitosis and meiosis'");
  assert(resCompare.aiAnswer?.intent === "compare", `Intent is compare, got ${resCompare.aiAnswer?.intent}`);
  assert(resCompare.aiAnswer?.subjectId === "biology", "Compare mitosis/meiosis maps to biology");
  assert(
    resCompare.aiAnswer?.title.includes("Mitosis vs. Meiosis") === true,
    `Compare mitosis/meiosis title should not self-compare, got ${resCompare.aiAnswer?.title}`
  );
  assert(
    !resChemi.aiAnswer?.title.includes("C1.2 C1.2"),
    `Biology title should not duplicate code prefix, got ${resChemi.aiAnswer?.title}`
  );

  const resLeserbrief = searchUniversalSuite("leserbrief format german");
  assert(
    resLeserbrief.aiAnswer?.subjectId === "german" && resLeserbrief.aiAnswer?.viewMode === "textsorten",
    `Leserbrief format maps to german textsorten, got ${resLeserbrief.aiAnswer?.subjectId}/${resLeserbrief.aiAnswer?.viewMode}`
  );

  const resMisconception = searchUniversalSuite("misconceptions about osmosis");
  assert(
    resMisconception.aiAnswer?.intent === "exam" && resMisconception.aiAnswer?.subjectId === "biology",
    `Misconceptions query triggers exam intent in biology, got ${resMisconception.aiAnswer?.intent}/${resMisconception.aiAnswer?.subjectId}`
  );

  const resSingleChar = searchUniversalSuite("a");
  assert(resSingleChar.aiAnswer === null, "Single-char query 'a' does not trigger hallucinated AI answer");

  const resWinston = searchUniversalSuite("why does winston buy the paperweight");
  assert(resWinston.aiAnswer !== null, "AI synthesizes answer for 'why does winston buy the paperweight'");
  assert(resWinston.aiAnswer?.subjectId === "orwell", "Winston paperweight maps to orwell");

  const resBreakEven = searchUniversalSuite("explain Break-Even analysis and margin of safety");
  assert(resBreakEven.aiAnswer !== null, "AI synthesizes answer for Break-Even analysis");
  assert(resBreakEven.aiAnswer?.subjectId === "business", `Break-Even maps to business, got ${resBreakEven.aiAnswer?.subjectId}`);

  const resPed = searchUniversalSuite("how to calculate price elasticity of demand");
  assert(resPed.aiAnswer !== null, "AI synthesizes answer for 'how to calculate price elasticity of demand'");
  assert(resPed.aiAnswer?.subjectId === "economics", "PED calculation maps to economics");

  const resKonj = searchUniversalSuite("what is Konjunktiv II in german");
  assert(resKonj.aiAnswer !== null, "AI synthesizes answer for 'what is Konjunktiv II in german'");
  assert(resKonj.aiAnswer?.subjectId === "german", "Konjunktiv II maps to german");
  assert(resKonj.aiAnswer?.viewMode === "grammatik", `Konjunktiv II viewMode is grammatik, got ${resKonj.aiAnswer?.viewMode}`);

  // 8. Typo tolerance & Direct synthesizeLocalAIAnswer export
  const resTypo = synthesizeLocalAIAnswer("chemiosmosiss");
  assert(resTypo !== null && resTypo.subjectId === "biology", "Fuzzy matching handles minor typo 'chemiosmosiss'");

  // 9. General Keyword Search across subjects
  const resBio = searchUniversalSuite("chemiosmosis");
  assert(
    resBio.items.some((i) => i.appId === "biology"),
    "Finds biology items for chemiosmosis"
  );

  const resBioCrispr = searchUniversalSuite("crispr");
  assert(
    resBioCrispr.items.some((i) => i.appId === "biology" && i.targetId === "bio-d1-3"),
    "Finds biology D1.3 for crispr"
  );

  const resEcon = searchUniversalSuite("opportunity cost");
  assert(
    resEcon.items.some((i) => i.appId === "economics"),
    "Finds economics items for opportunity cost"
  );

  const resPhysics = searchUniversalSuite("momentum");
  assert(
    resPhysics.items.some((i) => i.appId === "physics"),
    "Finds physics items for momentum"
  );

  const resGerman = searchUniversalSuite("textsorten");
  assert(
    resGerman.items.some((i) => i.appId === "german"),
    "Finds german items for textsorten"
  );

  const resGeo = searchUniversalSuite("wef nexus");
  assert(
    resGeo.items.some((i) => i.appId === "geography"),
    "Finds geography items for wef nexus"
  );

  // 10. Balanced Empty Preview & Edge Cases
  const resEmpty = searchUniversalSuite("");
  assert(resEmpty.aiAnswer === null, "Empty query produces null AI answer");
  assert(resEmpty.items.length === 21, `Empty query returns 21 balanced items, got ${resEmpty.items.length}`);
  const previewSubjects = new Set(resEmpty.items.map((i) => i.appId));
  assert(previewSubjects.size === 7, `Empty preview includes all 7 subjects, got ${previewSubjects.size}`);

  const resWhitespace = searchUniversalSuite("   ");
  assert(resWhitespace.aiAnswer === null, "Whitespace query produces null AI answer");

  const resGibberish = searchUniversalSuite("xyz987nonexistentrandomphrase");
  assert(resGibberish.aiAnswer === null, "Gibberish produces null AI answer");
  assert(resGibberish.items.length === 0, "Gibberish returns 0 matches");

  console.log(`\nTEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
