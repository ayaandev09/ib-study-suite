"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Keyboard,
  X,
  Search,
  Eye,
  Timer,
  Layers,
  Sparkles,
  Command,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Crown,
  Compass,
  Atom,
} from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  accentColor?: string;
  onOpenTour?: () => void;
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  appName = "Quantum & Cosmos // IB Physics SL / HL",
  accentColor = "#06b6d4",
  onOpenTour,
}: KeyboardShortcutsModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-cyan-400/40 bg-[#060402]/95 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(8,145,178,0.2)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Keyboard className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Keyboard Shortcuts Cheat Sheet
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {appName} · Power-User Speed Controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Global Spotlight Search</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
              ⌘ / Ctrl + K
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Toggle Right Inspector</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
              ⌘ / Ctrl + I
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Launch Timed Exam Sprint</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
              ⌘ / Ctrl + E
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Toggle Navigation Sidebar</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
              ⌘ / Ctrl + B
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Next Topic</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              → (Right Arrow)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Previous Topic</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              ← (Left Arrow)
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Flip Recall Card in Cram</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              Space
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <span className="text-slate-300">Close Any Modal / Sheet</span>
            <span className="font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              Esc
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">?</kbd> anytime to open this cheat sheet</span>
          <span className="text-cyan-400 font-mono font-semibold">Quantum &amp; Cosmos</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
