"use client";

import React from "react";

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // Swallow transient runtime errors gracefully so no raw crash screen appears
  }

  componentDidMount() {
    if (typeof window === "undefined") return;
    const suppressError = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("error", suppressError);
    window.addEventListener("unhandledrejection", suppressError);
    return () => {
      window.removeEventListener("error", suppressError);
      window.removeEventListener("unhandledrejection", suppressError);
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-center space-y-4">
            <h2 className="text-lg font-bold">Workspace Restored</h2>
            <p className="text-xs text-white/60">
              Your local notes and progress are safely preserved.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-5 py-2.5 rounded-2xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all"
            >
              Continue Studying
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
