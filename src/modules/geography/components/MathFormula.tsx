"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { sanitizeLaTeX } from "./MathText";

interface MathFormulaProps {
  latex: string;
  className?: string;
}

const katexDisplayCache = new Map<string, string>();

export const MathFormula: React.FC<MathFormulaProps> = React.memo(
  ({ latex, className = "" }) => {
    const html = useMemo(() => {
      if (!latex) return "";
      const cached = katexDisplayCache.get(latex);
      if (cached) return cached;
      const sanitized = sanitizeLaTeX(latex);
      try {
        const rendered = katex.renderToString(sanitized, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
        katexDisplayCache.set(latex, rendered);
        return rendered;
      } catch {
        return `<span class="font-mono text-teal-300 font-semibold">${sanitized}</span>`;
      }
    }, [latex]);

    return (
      <div
        className={`katex-display-box overflow-x-auto text-teal-200 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
);

MathFormula.displayName = "MathFormula";
