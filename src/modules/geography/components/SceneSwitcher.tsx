"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { GEO_UNITS } from "@/modules/geography/data";
import { useStudyStore } from "@/modules/geography/store/useStudyStore";
import { cn } from "@/modules/geography/lib/cn";

export function SceneSwitcher() {
  const {
    activeTopicId,
    setActiveTopic,
    completedTopics,
    levelFilter,
  } = useStudyStore();

  return (
    <div className="rounded-[22px] border border-teal-500/15 bg-[#041010]/70 p-3 space-y-3">
      {GEO_UNITS.map((unit) => {
        const visibleTopics = unit.topics.filter((t) => {
          if (levelFilter === "SL") return t.level === "SL / HL";
          if (levelFilter === "HL") return t.level === "HL ONLY";
          return true;
        });

        if (visibleTopics.length === 0) return null;

        return (
          <div key={unit.id} className="space-y-1.5">
            <div className="flex items-center justify-between px-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-teal-300/85">
                {unit.code} · {unit.shortTitle}
              </span>
              <span className="text-[10px] text-white/35">
                {visibleTopics.length} topics
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleTopics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                const isDone = !!completedTopics[topic.id];
                const isHL = topic.level === "HL ONLY";

                return (
                  <button
                    key={topic.id}
                    onClick={() =>
                      React.startTransition(() => setActiveTopic(topic.id))
                    }
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs transition-all",
                      isActive
                        ? "bg-teal-500/20 border-teal-400/45 text-white shadow-[0_0_12px_rgba(20,184,166,0.18)]"
                        : "bg-white/[0.03] border-white/10 text-white/65 hover:text-white hover:border-teal-400/25"
                    )}
                  >
                    <span className="font-mono font-bold text-[11px] text-teal-300">
                      {topic.topicCode}
                    </span>
                    <span className="truncate max-w-[160px]">{topic.title}</span>
                    {isHL && (
                      <span className="px-1 py-0.5 rounded text-[8px] font-mono font-bold bg-teal-500/25 text-teal-200 border border-teal-400/30">
                        HL
                      </span>
                    )}
                    {isDone && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
