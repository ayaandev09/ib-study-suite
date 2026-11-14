"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

const katexCache = new Map<string, string>();

export function sanitizeLaTeX(raw: string): string {
  if (!raw) return "";
  return raw
    .trim()
    .replace(/^\$\$|\$\$$/g, "")
    .replace(/^\$|\$$/g, "");
}

export const MathFormula: React.FC<MathFormulaProps> = React.memo(
  ({ formula, displayMode = false, className = "" }) => {
    const html = useMemo(() => {
      const clean = sanitizeLaTeX(formula);
      const key = `${displayMode ? "D" : "I"}:${clean}`;
      const cached = katexCache.get(key);
      if (cached) return cached;
      try {
        const rendered = katex.renderToString(clean, {
          displayMode,
          throwOnError: false,
          strict: false,
        });
        katexCache.set(key, rendered);
        return rendered;
      } catch {
        return `<span class="font-mono text-green-300">${clean}</span>`;
      }
    }, [formula, displayMode]);

    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
);

MathFormula.displayName = "MathFormula";
