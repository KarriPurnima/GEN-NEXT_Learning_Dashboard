// src/app/dashboard/error.tsx
// ─────────────────────────────────────────────────────────────
// Must be a Client Component — Next.js requires error boundaries
// to be client-side so they can catch runtime errors from RSCs.
// This renders when getCourses() throws (e.g. Supabase is down).
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // Next.js injects this — retries the segment
}

export default function DashboardError({ error, reset }: ErrorProps) {
  // Log to your observability tool (e.g. Sentry) in production
  useEffect(() => {
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="
          relative max-w-md w-full rounded-2xl border border-red-900/40
          bg-neutral-900/80 p-8 text-center shadow-2xl
          backdrop-blur-md
        "
      >
        {/* Ambient red glow behind the icon */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-2xl
            bg-gradient-to-br from-red-600/10 via-transparent to-transparent
          "
        />

        <div className="mb-5 flex justify-center">
          <span className="rounded-xl bg-red-950/60 p-3">
            <AlertTriangle className="h-8 w-8 text-red-400" strokeWidth={1.5} />
          </span>
        </div>

        <h2 className="mb-2 text-xl font-semibold tracking-tight text-neutral-100">
          Couldn't load your dashboard
        </h2>

        <p className="mb-1 text-sm text-neutral-400">
          We ran into a problem fetching your data from the database.
        </p>

        {/* Show the raw message in dev; hide in prod */}
        {process.env.NODE_ENV === "development" && (
          <p className="mb-6 mt-3 rounded-lg bg-neutral-950/60 px-4 py-3 text-left font-mono text-xs text-red-400">
            {error.message}
          </p>
        )}

        <button
          onClick={reset}
          className="
            mt-4 inline-flex items-center gap-2 rounded-xl
            bg-neutral-800 px-5 py-2.5 text-sm font-medium
            text-neutral-200 ring-1 ring-neutral-700
            transition-all duration-150
            hover:bg-neutral-700 hover:ring-neutral-600
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-red-500
          "
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </motion.div>
    </div>
  );
}