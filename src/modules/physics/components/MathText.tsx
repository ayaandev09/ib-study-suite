"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { sanitizeLaTeX } from "./MathFormula";

interface MathTextProps {
  text: string;
  className?: string;
}

const katexInlineCache = new Map<string, string>();

export function formatUnit(unit: string): string {
  if (!unit) return "";
  let clean = unit
    .replace(/\\text\{\s*or\s*\}/g, " or ")
    .replace(/\\Omega/g, "Ω")
    .replace(/\\mu/g, "µ")
    .replace(/\\varepsilon/g, "ε")
    .replace(/\\times/g, "×")
    .replace(/\^\{?(-?\d+)\}?/g, (_, exp) => {
      const superMap: Record<string, string> = {
        "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹"
      };
      return exp.split("").map((c: string) => superMap[c] || c).join("");
    });
  return clean;
}

function renderKatexSafe(math: string): string {
  const cached = katexInlineCache.get(math);
  if (cached) return cached;

  const sanitized = sanitizeLaTeX(math);

  try {
    const html = katex.renderToString(sanitized, {
      displayMode: false,
      throwOnError: false,
      strict: false,
    });
    katexInlineCache.set(math, html);
    return html;
  } catch {
    const fallback = `<span class="font-mono text-cyan-300 font-semibold">${sanitized}</span>`;
    katexInlineCache.set(math, fallback);
    return fallback;
  }
}

/**
 * Parses a paragraph of text that may contain:
 * 1. $...$ delimited LaTeX formulas
 * 2. Inline LaTeX commands (e.g. \frac{...}{...}, \theta, \sqrt{...}, F_d \propto v^2, \vec{a})
 * 3. Degree notations like 45^{\circ}
 * 4. Exponent units like m/s^2
 * Renders mathematical tokens via KaTeX and normal text as readable spans.
 */
export const MathText: React.FC<MathTextProps> = React.memo(({ text, className = "" }) => {
  const renderedElements = useMemo(() => {
    if (!text) return null;

    // 1. First check if text contains explicit $...$ delimiters
    if (text.includes("$")) {
      const parts = text.split(/(\$[^$]+\$)/g);
      return parts.map((part, index) => {
        if (index % 2 === 1 && part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          const math = part.slice(1, -1);
          const html = renderKatexSafe(math);
          return (
            <span
              key={index}
              className="inline-katex text-cyan-300 font-mono px-0.5 inline-block align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <span key={index}>{part}</span>;
      });
    }

    // 2. Check if the text contains inline LaTeX backslash commands or degree marks
    const hasLatexCommands = /\\[a-zA-Z]+|\d+(?:\.\d+)?\^\{?\\circ\}?|[a-zA-Z]+\^[0-9\-]+/.test(text);
    if (!hasLatexCommands) {
      return text;
    }

    // Smart math regex:
    // a. Equations & expressions with backslash:
    //    (?:[a-zA-Z0-9_]+\s*(?:=|\\approx|\\propto|\\le|\\ge)\s*)?(?:[0-9a-zA-Z_]+)?(?:\\[a-zA-Z]+(?:\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\})*(?:[\^_]\{?[a-zA-Z0-9\\]+\}?)*)+
    // b. Numbers with degree: \d+(?:\.\d+)?\^\{?\\circ\}?
    // c. Simple inline units with exponents: \b[a-zA-Z]+(?:\/[a-zA-Z]+)?\^[0-9\-]+
    const mathRegex = /((?:[a-zA-Z0-9_]+\s*(?:=|\\approx|\\propto|\\le|\\ge)\s*)?(?:[0-9a-zA-Z_]+)?(?:\\[a-zA-Z]+(?:\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\})*(?:[\^_]\{?[a-zA-Z0-9\\]+\}?)*)+|\d+(?:\.\d+)?\^\{?\\circ\}?|\b[a-zA-Z]+(?:\/[a-zA-Z]+)?\^[0-9\-]+)/g;

    const parts = text.split(mathRegex);

    return parts.map((part, index) => {
      if (!part) return null;
      // Only odd indices are captured regex matches (the math tokens)
      const isMathToken = index % 2 === 1;
      if (isMathToken) {
        const html = renderKatexSafe(part);
        return (
          <span
            key={index}
            className="inline-katex text-cyan-300 font-mono px-0.5 inline-block align-baseline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={className}>{renderedElements}</span>;
});

MathText.displayName = "MathText";
