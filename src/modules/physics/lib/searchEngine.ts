import { TopicData, ALL_TOPICS, SYLLABUS_UNITS, PHYSICS_CONCEPTS } from "@/modules/physics/data";

export interface SearchResultItem {
  id: string;
  displayCode: string;
  themeTitle: string;
  title: string;
  subtitle: string;
  matchCategory: "Topic" | "Formula" | "Concept" | "Case" | "Misconception" | "General";
  snippet: string;
  matchedConcepts?: string[];
  score: number;
}

export type SearchFilterTab = "all" | "formulas" | "concepts" | "cases" | "topics";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchPhysicsCodex(
  query: string,
  filterTab: SearchFilterTab = "all"
): SearchResultItem[] {
  const rawQ = query.trim();
  if (!rawQ) return [];

  const q = normalizeText(rawQ);
  const tokens = q.split(" ").filter((t) => t.length > 0);

  // Pattern detection: Theme & Topic code notation (e.g. "a.1", "a1", "theme a", "b.2")
  const codeMatch = rawQ.match(/(?:theme\s*)?([a-e])[\s.:-]*([1-5])/i);
  let targetTheme: string | null = null;
  let targetNum: string | null = null;
  if (codeMatch) {
    targetTheme = codeMatch[1].toUpperCase();
    targetNum = codeMatch[2];
  }

  const results: SearchResultItem[] = [];

  for (const topic of ALL_TOPICS) {
    let score = 0;
    let matchCategory: SearchResultItem["matchCategory"] = "General";
    let snippet = topic.summary;
    const matchedConcepts: string[] = [];

    const normTitle = normalizeText(topic.title);
    const normSubtitle = normalizeText(topic.subtitle);
    const normCode = normalizeText(topic.displayCode);

    // Direct code match (e.g., "A.1" or "a1")
    if (targetTheme && targetNum && topic.displayCode.toUpperCase() === `${targetTheme}.${targetNum}`) {
      score += 120;
      matchCategory = "Topic";
    }

    if (normCode === q) {
      score += 100;
      matchCategory = "Topic";
    }

    // Title match
    if (normTitle.includes(q)) {
      score += 60;
      matchCategory = "Topic";
    } else if (tokens.every((t) => normTitle.includes(t))) {
      score += 40;
    }

    // Formula matches
    if (filterTab === "all" || filterTab === "formulas") {
      for (const formula of topic.primaryFormulas || []) {
        const normF = normalizeText(formula);
        if (normF.includes(q) || tokens.some((t) => normF.includes(t))) {
          score += 45;
          matchCategory = "Formula";
          snippet = `Formula: ${formula}`;
          break;
        }
      }
    }

    // Subsections & Derivations
    for (const sub of topic.subSections || []) {
      const normSub = normalizeText(sub.title + " " + sub.content);
      if (normSub.includes(q)) {
        score += 35;
        snippet = sub.content.slice(0, 160) + "...";
        break;
      }
    }

    // Case studies
    if (filterTab === "all" || filterTab === "cases") {
      for (const cs of topic.cases || []) {
        const normCs = normalizeText(cs.title + " " + cs.domainOrContext + " " + cs.physicalMechanism);
        if (normCs.includes(q)) {
          score += 30;
          matchCategory = "Case";
          snippet = `${cs.title}: ${cs.physicalMechanism.slice(0, 140)}...`;
          break;
        }
      }
    }

    // Common Misconceptions
    for (const mis of topic.analysis?.commonMisconceptions || []) {
      if (normalizeText(mis).includes(q)) {
        score += 25;
        matchCategory = "Misconception";
        snippet = `Misconception Alert: ${mis}`;
        break;
      }
    }

    // Cross-cutting Concepts
    if (filterTab === "all" || filterTab === "concepts") {
      for (const ct of topic.conceptTracking || []) {
        const def = PHYSICS_CONCEPTS.find((c) => c.id === ct.conceptId);
        if (def && normalizeText(def.name + " " + ct.manifestation).includes(q)) {
          score += 20;
          matchCategory = "Concept";
          matchedConcepts.push(def.name);
          snippet = `${def.name}: ${ct.manifestation.slice(0, 140)}...`;
          break;
        }
      }
    }

    // Apply Filter Tab Restrictions
    if (filterTab === "formulas" && matchCategory !== "Formula") continue;
    if (filterTab === "concepts" && matchCategory !== "Concept") continue;
    if (filterTab === "cases" && matchCategory !== "Case") continue;
    if (filterTab === "topics" && matchCategory !== "Topic") continue;

    if (score > 0) {
      const unit = SYLLABUS_UNITS.find((u) => u.id === topic.themeId);
      results.push({
        id: topic.id,
        displayCode: topic.displayCode,
        themeTitle: unit?.title || `Theme ${topic.displayCode.charAt(0)}`,
        title: topic.title,
        subtitle: topic.subtitle,
        matchCategory,
        snippet,
        matchedConcepts,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
