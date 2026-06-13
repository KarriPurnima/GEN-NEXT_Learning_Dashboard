"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-white">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-white/50">Could not connect to the database.</p>
      <button
        onClick={reset}
        className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20"
      >
        Try again
      </button>
    </div>
  );
}