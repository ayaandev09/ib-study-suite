"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathFormulaProps {
  math: string;
  block?: boolean;
  className?: string;
  label?: string;
}

/**
 * Robust LaTeX sanitizer that restores control characters that might have been
 * mangled by JavaScript string escaping (e.g. \f = form feed, \t = tab, \b = backspace).
 * Uses strict negative lookbehind to NEVER double-escape or mutilate valid LaTeX commands.
 */
export function sanitizeLaTeX(raw: string): string {
  if (!raw) return "";
  let clean = raw;

  // 1. Remove form-feed / carriage control / tofu mangling
  clean = clean.replace(/\\+backslash\\+text\{\s*f\s*\}\s*\\+frac/g, "\\frac");
  clean = clean.replace(/\\+text\{\s*f\s*\}\s*\\+frac/g, "\\frac");
  clean = clean.replace(/\\+f(?=\\+frac)/g, "");
  clean = clean.replace(/\\+f\\+frac/g, "\\frac");
  clean = clean.replace(/\^\\+circ(?=[^a-zA-Z\{]|$)/g, "^{\\circ}");
  clean = clean.replace(/[\x0c\u000c]rac/gi, "\\frac");
  clean = clean.replace(/[\x09\u0009]ext/gi, "\\text");
  clean = clean.replace(/[\x09\u0009]imes/gi, "\\times");
  clean = clean.replace(/[\x09\u0009]au/gi, "\\tau");
  clean = clean.replace(/[\x09\u0009]heta/gi, "\\theta");
  clean = clean.replace(/[\x08\u0008]eta/gi, "\\beta");
  clean = clean.replace(/[\x00-\x1f]/g, " ");
  clean = clean.replace(/⧈rac/g, "\\frac");
  clean = clean.replace(/⧈/g, "");

  // 2. Fix unescaped keywords and mathematical functions
  clean = clean.replace(/(?<!\\)\b(frac|sqrt|theta|lambda|Delta|times|approx|propto|mu|sigma|omega|epsilon|pi|tau|beta|rho|vec|implies|quad|cos|sin|tan|ln|log|exp|Sigma|Omega|alpha|gamma|phi|psi|eta|hbar|begin|end)\b/g, "\\$1");

  return clean.trim();
}

const katexHtmlCache = new Map<string, string>();

export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  block = false,
  className = "",
  label,
}) => {
  const renderedHtml = useMemo(() => {
    const cacheKey = `${block ? "B" : "I"}:${math}`;
    const cached = katexHtmlCache.get(cacheKey);
    if (cached) return cached;

    const sanitized = sanitizeLaTeX(math);

    try {
      const html = katex.renderToString(sanitized, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });

      katexHtmlCache.set(cacheKey, html);
      return html;
    } catch {
      const fallback = `<span class="font-mono text-cyan-300 font-bold">${sanitized}</span>`;
      katexHtmlCache.set(cacheKey, fallback);
      return fallback;
    }
  }, [math, block]);

  if (block) {
    return (
      <div className="relative group my-2">
        {label && (
          <span className="absolute top-1.5 right-3 text-[10px] font-mono uppercase tracking-wider text-cyan-400/70 pointer-events-none">
            {label}
          </span>
        )}
        <div
          className={`katex-formula-wrapper overflow-x-auto py-3 px-4 text-center text-cyan-300 font-mono rounded-2xl bg-slate-950/80 border border-cyan-500/25 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      </div>
    );
  }

  return (
    <span
      className={`inline-katex inline-flex items-center px-1.5 py-0.5 rounded-lg bg-cyan-950/40 text-cyan-300 font-mono text-[0.95em] border border-cyan-500/20 align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default MathFormula;
