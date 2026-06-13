// src/app/dashboard/_components/DashboardShell.tsx
// ─────────────────────────────────────────────────────────────
// Pure layout wrapper — no data fetching, no state.
// Composes the sidebar and the main scrollable content area.
// Can be a Server Component since it has no client interactivity.
// ─────────────────────────────────────────────────────────────

import type { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    /*
      Full-viewport flex container.
      On mobile: column (sidebar becomes bottom nav via Sidebar's own responsive logic).
      On desktop: row (sidebar left, main content right).
    */
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      {/* ── Left sidebar ─────────────────────────────────── */}
      <Sidebar />

      {/*
        ── Main scrollable area ────────────────────────────
        `flex-1` fills remaining width.
        `overflow-y-auto` keeps the sidebar fixed while content scrolls.
        Padding-bottom ensures content clears the mobile bottom nav (h-16).
      */}
      <main
        className="
          relative flex-1 overflow-y-auto
          px-4 pb-24 pt-6
          md:px-6 md:pb-8
          lg:px-10 lg:pt-8
        "
      >
        {/*
          Ambient gradient mesh — purely decorative, pointer-events-none
          so it never interferes with interaction.
          Uses `opacity` only, never `transform`, so it can't cause layout shifts.
        */}
        <div
          aria-hidden
          className="
            pointer-events-none fixed inset-0 z-0
            bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.12),transparent)]
          "
        />

        {/* Page content rendered above the gradient */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}