// src/app/dashboard/courses/_components/CoursesGrid.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/lib/types";

interface CoursesGridProps {
  courses: Course[];
}

function getIcon(name: string): React.ElementType {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  return (typeof icon === "function" ? icon : LucideIcons.BookOpen) as React.ElementType;
}

const COLORS = [
  { icon: "text-violet-400", bar: "from-violet-600 to-violet-400", bg: "bg-violet-600/10", ring: "ring-violet-500/20", badge: "bg-violet-500/10 text-violet-300" },
  { icon: "text-cyan-400",   bar: "from-cyan-600 to-cyan-400",     bg: "bg-cyan-600/10",   ring: "ring-cyan-500/20",   badge: "bg-cyan-500/10 text-cyan-300" },
  { icon: "text-emerald-400",bar: "from-emerald-600 to-emerald-400",bg: "bg-emerald-600/10",ring: "ring-emerald-500/20",badge: "bg-emerald-500/10 text-emerald-300" },
  { icon: "text-amber-400",  bar: "from-amber-600 to-amber-400",   bg: "bg-amber-600/10",  ring: "ring-amber-500/20",  badge: "bg-amber-500/10 text-amber-300" },
  { icon: "text-rose-400",   bar: "from-rose-600 to-rose-400",     bg: "bg-rose-600/10",   ring: "ring-rose-500/20",   badge: "bg-rose-500/10 text-rose-300" },
];

function getDifficultyLabel(difficulty?: string) {
  if (!difficulty) return "Intermediate";
  return difficulty;
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => {
        const Icon  = getIcon(course.icon_name);
        const color = COLORS[index % COLORS.length];
        const isComplete = course.progress === 100;

        return (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 260, damping: 22 }}
            whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="
                group relative flex flex-col gap-4 rounded-2xl
                border border-neutral-800/60
                bg-neutral-900/60 backdrop-blur-md
                p-5 shadow-lg
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              "
            >
              {/* Completed badge */}
              {isComplete && (
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                  ✓ Complete
                </span>
              )}

              {/* Icon + title */}
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 rounded-xl ${color.bg} p-2.5 ring-1 ${color.ring}`}>
                  <Icon className={`h-5 w-5 ${color.icon}`} strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1 pr-10">
                  <h3 className="text-sm font-semibold leading-snug text-neutral-100 line-clamp-2">
                    {course.title}
                  </h3>
                  {course.category && (
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${color.badge}`}>
                      {course.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {course.description && (
                <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              )}

              {/* Progress */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">Progress</span>
                  <span className="text-xs font-semibold text-neutral-300">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className={`text-xs rounded-full px-2 py-0.5 bg-neutral-800 text-neutral-400`}>
                  {getDifficultyLabel(course.difficulty)}
                </span>
                <span className="text-xs font-semibold text-violet-400 group-hover:text-violet-300 transition-colors">
                  {isComplete ? "Review →" : "Continue →"}
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}