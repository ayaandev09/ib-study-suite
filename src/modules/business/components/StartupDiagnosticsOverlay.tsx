"use client";

import React from "react";

interface StartupDiagnosticsOverlayProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function StartupDiagnosticsOverlay({
  forceOpen = false,
  onClose,
}: StartupDiagnosticsOverlayProps) {
  return null;
}

export default StartupDiagnosticsOverlay;
