// src/app/dashboard/courses/[id]/_components/CourseDetail.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, Circle, ArrowLeft, Clock, BarChart2, BookOpen } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase-client";
import type { Course } from "@/lib/types";

interface CourseDetailProps {
  course: Course;
}

function getIcon(name: string): React.ElementType {
  const icon = (LucideIcons as Record<string, unknown>)[name];
  return (typeof icon === "function" ? icon : LucideIcons.BookOpen) as React.ElementType;
}

// Mock lessons based on course progress
function generateLessons(total: number, progress: number) {
  const completed = Math.round((progress / 100) * total);
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}: ${LESSON_TITLES[i % LESSON_TITLES.length]}`,
    duration: `${Math.floor(Math.random() * 15) + 5} min`,
    completed: i < completed,
  }));
}

const LESSON_TITLES = [
  "Introduction & Overview",
  "Core Concepts",
  "Hands-on Practice",
  "Advanced Techniques",
  "Real-world Projects",
  "Best Practices",
  "Performance Optimization",
  "Testing & Debugging",
  "Deployment",
  "Final Review",
];

export default function CourseDetail({ course }: CourseDetailProps) {
  const router = useRouter();
  const Icon = getIcon(course.icon_name);
  const totalLessons = course.total_lessons ?? 10;
  const [lessons, setLessons] = useState(() => generateLessons(totalLessons, course.progress));
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  const completedCount = lessons.filter((l) => l.completed).length;
  const currentProgress = Math.round((completedCount / totalLessons) * 100);

  async function toggleLesson(lessonId: number) {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l))
    );
  }

  async function saveProgress() {
    setSaving(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase
        .from("courses")
        .update({ progress: currentProgress })
        .eq("id", course.id);

      if (error) throw error;
      setSavedMsg("Progress saved!");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err) {
      setSavedMsg("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </button>

      {/* Course header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-neutral-800/60 bg-neutral-900/60 p-6 backdrop-blur-md"
      >
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 rounded-xl bg-violet-600/15 p-3 ring-1 ring-violet-500/25">
            <Icon className="h-7 w-7 text-violet-400" strokeWidth={1.8} />
          </span>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-neutral-50">{course.title}</h1>
            {course.description && (
              <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{course.description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <BookOpen className="h-3.5 w-3.5" />
                {totalLessons} lessons
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Clock className="h-3.5 w-3.5" />
                ~{totalLessons * 10} min
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <BarChart2 className="h-3.5 w-3.5" />
                {course.difficulty ?? "Intermediate"}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-neutral-500">{completedCount} of {totalLessons} lessons complete</span>
            <span className="font-semibold text-violet-400">{currentProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
              animate={{ width: `${currentProgress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={saveProgress}
            disabled={saving}
            className="rounded-xl bg-violet-600/20 px-4 py-2 text-sm font-semibold text-violet-300 ring-1 ring-violet-500/30 transition-colors hover:bg-violet-600/30 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {saving ? "Saving..." : "Save Progress"}
          </button>
          {savedMsg && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs font-medium ${savedMsg.includes("Failed") ? "text-red-400" : "text-emerald-400"}`}
            >
              {savedMsg}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Lessons list */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 px-1">
          Lessons
        </h2>
        {lessons.map((lesson, i) => (
          <motion.button
            key={lesson.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => toggleLesson(lesson.id)}
            className={`
              w-full flex items-center gap-4 rounded-xl border p-4
              text-left transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              ${lesson.completed
                ? "border-violet-500/20 bg-violet-600/8 hover:bg-violet-600/12"
                : "border-neutral-800/60 bg-neutral-900/40 hover:bg-neutral-800/40"
              }
            `}
          >
            {lesson.completed
              ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-violet-400" />
              : <Circle className="h-5 w-5 flex-shrink-0 text-neutral-600" />
            }
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${lesson.completed ? "text-neutral-300 line-through decoration-neutral-600" : "text-neutral-200"}`}>
                {lesson.title}
              </p>
            </div>
            <span className="flex-shrink-0 text-xs text-neutral-600 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lesson.duration}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}