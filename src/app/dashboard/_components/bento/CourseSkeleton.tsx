// src/app/dashboard/_components/bento/CourseSkeleton.tsx
// Animated pulsing placeholder shown while courses load from Supabase

export default function CourseSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-5">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-neutral-700/10 to-transparent" />

      <div className="flex flex-col gap-4">
        {/* Icon + title row */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 flex-shrink-0 animate-pulse rounded-xl bg-neutral-800" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-neutral-800" />
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-neutral-800/60" />
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="mb-1.5 flex justify-between">
            <div className="h-2.5 w-12 animate-pulse rounded-full bg-neutral-800" />
            <div className="h-2.5 w-8 animate-pulse rounded-full bg-neutral-800" />
          </div>
          <div className="h-1.5 w-full animate-pulse rounded-full bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}