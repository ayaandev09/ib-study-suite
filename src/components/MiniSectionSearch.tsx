"use client";

import React, { useRef, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";

export interface MiniSearchCategory {
  id: string;
  label: string;
  count?: number;
}

export interface MiniSectionSearchProps {
  query: string;
  onQueryChange: (q: string) => void;
  placeholder?: string;
  totalCount: number;
  filteredCount: number;
  categories?: MiniSearchCategory[];
  activeCategory?: string;
  onCategoryChange?: (id: string) => void;
  accentColor?: string; // hex color e.g. #38bdf8
  className?: string;
}

export const MiniSectionSearch: React.FC<MiniSectionSearchProps> = ({
  query,
  onQueryChange,
  placeholder = "Search formulas or key terms...",
  totalCount,
  filteredCount,
  categories,
  activeCategory,
  onCategoryChange,
  accentColor = "#38bdf8",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global '/' shortcut to focus search when not in another input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white/[0.04] border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="relative flex-1 flex items-center">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-transparent font-sans text-xs sm:text-sm text-white placeholder:text-white/35 focus:outline-none focus:bg-white/[0.05] transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                onQueryChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 px-3 py-1 shrink-0 border-t sm:border-t-0 sm:border-l border-white/8 text-[11px] font-mono text-white/60">
          <span>
            Showing <strong className="text-white font-semibold">{filteredCount}</strong> of {totalCount}
          </span>
          <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-white/8 border border-white/10 text-[10px] text-white/40">
            /
          </kbd>
        </div>
      </div>

      {/* Category Pills (if provided) */}
      {categories && categories.length > 0 && onCategoryChange && (
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.09] border border-white/8"
                }`}
              >
                <span>{cat.label}</span>
                {cat.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1 rounded-full ${
                      isActive ? "bg-black/15 text-black" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
