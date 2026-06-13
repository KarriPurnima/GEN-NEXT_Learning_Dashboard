// // src/app/dashboard/_components/bento/HeroTile.tsx
// "use client";

// import { Flame, Zap, BookOpenCheck } from "lucide-react";
// import BentoTile from "./BentoTile";

// interface HeroTileProps {
//   userName: string;
//   streakDays: number;
//   className?: string;
// }

// function getGreeting() {
//   const h = new Date().getHours();
//   if (h < 12) return "Good morning";
//   if (h < 17) return "Good afternoon";
//   return "Good evening";
// }

// export default function HeroTile({ userName, streakDays, className = "" }: HeroTileProps) {
//   return (
//     <BentoTile className={`min-h-[200px] p-6 ${className}`} glowColor="violet">
//       {/* Purple radial gradient behind content */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
//         style={{
//           background:
//             "radial-gradient(ellipse 70% 80% at 0% 100%, rgba(139,92,246,0.18) 0%, transparent 60%)",
//         }}
//       />

//       <div className="relative z-10 flex h-full flex-col justify-between gap-6">
//         {/* Greeting block */}
//         <div>
//           <p className="text-sm font-medium text-neutral-400">{getGreeting()}</p>
//           <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">
//             Welcome back, {userName} 👋
//           </h1>
//           <p className="mt-2 text-sm text-neutral-500">
//             You have 3 lessons queued for today.
//           </p>
//         </div>

//         {/* Bottom row: streak + quick-action */}
//         <div className="flex flex-wrap items-center gap-3">
//           {/* Streak pill */}
//           <div className="inline-flex items-center gap-2 rounded-xl bg-orange-950/50 px-4 py-2 ring-1 ring-orange-500/30">
//             <Flame className="h-4 w-4 text-orange-400" />
//             <span className="text-sm font-semibold text-orange-300">
//               {streakDays}-day streak
//             </span>
//             <Zap className="h-3.5 w-3.5 text-orange-400 opacity-70" />
//           </div>

//           {/* Continue learning CTA */}
//           <button className="inline-flex items-center gap-2 rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300 ring-1 ring-violet-500/30 transition-colors duration-150 hover:bg-violet-600/30 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
//             <BookOpenCheck className="h-4 w-4" />
//             Continue learning
//           </button>
//         </div>
//       </div>
//     </BentoTile>
//   );
// }

// src/app/dashboard/_components/bento/HeroTile.tsx
"use client";

import Link from "next/link";                                   // ← add this
import { Flame, Zap, BookOpenCheck } from "lucide-react";
import BentoTile from "./BentoTile";

interface HeroTileProps {
  userName: string;
  streakDays: number;
  className?: string;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HeroTile({ userName, streakDays, className = "" }: HeroTileProps) {
  return (
    <BentoTile className={`min-h-[200px] p-6 ${className}`} glowColor="violet">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 100%, rgba(139,92,246,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        {/* Greeting block */}
        <div>
          <p className="text-sm font-medium text-neutral-400">{getGreeting()}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">
            Welcome back, {userName} 👋
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            You have 3 lessons queued for today.
          </p>
        </div>

        {/* Bottom row: streak + quick-action */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Streak pill */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-orange-950/50 px-4 py-2 ring-1 ring-orange-500/30">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-300">
              {streakDays}-day streak
            </span>
            <Zap className="h-3.5 w-3.5 text-orange-400 opacity-70" />
          </div>

          {/* Continue learning CTA — now a Link ↓ */}
          <Link
            href="/dashboard/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300 ring-1 ring-violet-500/30 transition-colors duration-150 hover:bg-violet-600/30 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <BookOpenCheck className="h-4 w-4" />
            Continue learning
          </Link>
        </div>
      </div>
    </BentoTile>
  );
}