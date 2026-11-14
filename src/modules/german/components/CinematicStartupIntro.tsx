"use client";

import React from "react";
import { ModuleStartupIntro } from "@/components/ModuleStartupIntro";

interface CinematicStartupIntroProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen = true,
  onClose,
  onComplete,
}) => {
  return (
    <ModuleStartupIntro
      appId="german"
      isOpen={isOpen}
      onClose={onClose}
      onComplete={onComplete}
    />
  );
};

export default CinematicStartupIntro;
