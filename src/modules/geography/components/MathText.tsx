"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathTextProps {
  text: string;
  className?: string;
}

const katexInlineCache = new Map<string, string>();

export function sanitizeLaTeX(input: string): string {
  return input.replace(/\\\\([a-zA-Z])/g, "\\$1").trim();
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
    const fallback = `<span class="font-mono text-teal-300 font-semibold">${sanitized}</span>`;
    katexInlineCache.set(math, fallback);
    return fallback;
  }
}

function renderInlineItalic(segment: string, keyPrefix: number): React.ReactNode {
  if (!segment.includes("*")) return segment;
  const italicParts = segment.split(/(\*[^*]+\*)/g);
  return italicParts.map((sub, idx) => {
    if (idx % 2 === 1 && sub.startsWith("*") && sub.endsWith("*") && sub.length > 2) {
      return (
        <em key={`${keyPrefix}-${idx}`} className="italic text-white/90">
          {sub.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${idx}`}>{sub}</React.Fragment>;
  });
}

export const MathText: React.FC<MathTextProps> = React.memo(
  ({ text, className = "" }) => {
    const rendered = useMemo(() => {
      if (!text) return null;
      if (!text.includes("$")) return renderInlineItalic(text, 0);
      const parts = text.split(/(\$[^$]+\$)/g);
      return parts.map((part, index) => {
        if (
          index % 2 === 1 &&
          part.startsWith("$") &&
          part.endsWith("$") &&
          part.length > 2
        ) {
          const math = part.slice(1, -1);
          const html = renderKatexSafe(math);
          return (
            <span
              key={index}
              className="inline-katex text-teal-300 font-mono px-0.5 inline-block align-baseline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <span key={index}>{renderInlineItalic(part, index)}</span>;
      });
    }, [text]);

    return <span className={className}>{rendered}</span>;
  }
);

MathText.displayName = "MathText";
