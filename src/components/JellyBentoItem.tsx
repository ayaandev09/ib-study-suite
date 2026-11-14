"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const JELLY_OFFSETS = [
  { x: -36, y: -18 },
  { x: 0, y: -32 },
  { x: 36, y: -18 },
  { x: -40, y: 22 },
  { x: 0, y: 36 },
  { x: 40, y: 22 },
  { x: -28, y: 28 },
  { x: 28, y: 28 },
];

const JELLY_SPRING = {
  type: "spring" as const,
  stiffness: 175,
  damping: 19,
  mass: 0.85,
};

interface JellyBentoItemProps {
  index?: number;
  className?: string;
  children: React.ReactNode;
}

export const JellyBentoItem: React.FC<JellyBentoItemProps> = ({
  index = 0,
  className = "",
  children,
}) => {
  const activeAppIntro = useWorkspaceStore((s) => s.activeAppIntro);
  const isRevealed = !activeAppIntro;
  const offset = JELLY_OFFSETS[index % JELLY_OFFSETS.length];
  const delay = Math.min(0.24, 0.02 + index * 0.032);

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.94 }}
      animate={
        isRevealed
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: offset.x, y: offset.y, scale: 0.94 }
      }
      transition={{
        ...JELLY_SPRING,
        delay: isRevealed ? delay : 0,
      }}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
