// src/app/dashboard/loading.tsx
// ─────────────────────────────────────────────────────────────
// Next.js automatically renders this file as the Suspense
// fallback for the entire /dashboard segment during any
// server-side data fetch. It mirrors the real layout exactly
// to guarantee zero cumulative layout shift (CLS = 0).
// ─────────────────────────────────────────────────────────────

import DashboardShell from "./_components/DashboardShell";
import BentoGrid from "./_components/bento/BentoGrid";
import SkeletonTile from "./_components/bento/SkeletonTile";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <BentoGrid>
        {/*
          Mirror the exact grid structure of the real page:
          - 1 hero  → md:col-span-2, taller
          - 1 activity → md:col-span-1, taller
          - 4 course cards → standard height
          All sizes match the real tiles so nothing shifts on hydration.
        */}
        <SkeletonTile className="md:col-span-2 h-48" />
        <SkeletonTile className="md:col-span-1 h-48" />
        <SkeletonTile className="h-40" />
        <SkeletonTile className="h-40" />
        <SkeletonTile className="h-40" />
        <SkeletonTile className="h-40" />
      </BentoGrid>
    </DashboardShell>
  );
}