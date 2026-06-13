// src/app/dashboard/progress/_components/ProgressView.tsx
"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import type { Course } from "@/lib/types";

interface ProgressViewProps {
  courses: Course[];
}

function getIcon(name: string): React.ElementType {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  return (typeof icon === "function" ? icon : LucideIcons.BookOpen) as React.ElementType;
}

const COLORS = [
  { bar: "from-violet-600 to-violet-400", text: "text-violet-400", bg: "bg-violet-500/10" },
  { bar: "from-cyan-600 to-cyan-400",     text: "text-cyan-400",   bg: "bg-cyan-500/10" },
  { bar: "from-emerald-600 to-emerald-400",text: "text-emerald-400",bg: "bg-emerald-500/10" },
  { bar: "from-amber-600 to-amber-400",   text: "text-amber-400",  bg: "bg-amber-500/10" },
  { bar: "from-rose-600 to-rose-400",     text: "text-rose-400",   bg: "bg-rose-500/10" },
];

export default function ProgressView({ courses }: ProgressViewProps) {
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length)
    : 0;
  const completed  = courses.filter((c) => c.progress === 100).length;
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const notStarted = courses.filter((c) => c.progress === 0).length;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Avg Progress",  value: `${avgProgress}%`, color: "text-violet-400" },
          { label: "Completed",     value: completed,          color: "text-emerald-400" },
          { label: "In Progress",   value: inProgress,         color: "text-cyan-400" },
          { label: "Not Started",   value: notStarted,         color: "text-neutral-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-4 text-center backdrop-blur-md"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Per-course progress bars */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-5 backdrop-blur-md space-y-5">
        <h2 className="text-sm font-semibold text-neutral-300">Course Breakdown</h2>
        {courses.map((course, i) => {
          const Icon  = getIcon(course.icon_name);
          const color = COLORS[i % COLORS.length];
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.2, type: "spring", stiffness: 280, damping: 24 }}
            >
              <Link
                href={`/dashboard/courses/${course.id}`}
                className="group flex items-center gap-4 focus-visible:outline-none"
              >
                <span className={`flex-shrink-0 rounded-xl ${color.bg} p-2`}>
                  <Icon className={`h-4 w-4 ${color.text}`} strokeWidth={1.8} />
                </span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-200 group-hover:text-neutral-50 transition-colors truncate">
                      {course.title}
                    </p>
                    <span className={`ml-3 flex-shrink-0 text-xs font-semibold ${color.text}`}>
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ delay: i * 0.1 + 0.4, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Overall circular indicator */}
      <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-5 backdrop-blur-md">
        <h2 className="mb-4 text-sm font-semibold text-neutral-300">Overall Completion</h2>
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#262626" strokeWidth="12" />
              <motion.circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="url(#progressGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - avgProgress / 100) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-violet-400">{avgProgress}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-neutral-300 font-medium">
              {completed === courses.length ? "All courses complete! 🎉" : `${courses.length - completed} courses remaining`}
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You've completed {completed} of {courses.length} courses.<br />
              Keep going — you're doing great!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}