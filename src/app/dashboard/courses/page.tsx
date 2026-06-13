// src/app/dashboard/courses/page.tsx
import { getCourses } from "@/lib/supabase-server";
import DashboardShell from "../_components/DashboardShell";
import CoursesGrid from "./_components/CoursesGrid";
import type { Course } from "@/lib/types";

export default async function CoursesPage() {
  const { data: courses, error } = await getCourses();

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-50">Your Courses</h1>
            <p className="mt-1 text-sm text-neutral-500">
              {courses ? `${courses.length} courses enrolled` : "Loading..."}
            </p>
          </div>
          {/* Stats bar */}
          {courses && (
            <div className="hidden sm:flex items-center gap-4">
              <div className="rounded-xl bg-neutral-900/60 px-4 py-2 ring-1 ring-neutral-800/60 text-center">
                <p className="text-xs text-neutral-500">Completed</p>
                <p className="text-lg font-bold text-violet-400">
                  {courses.filter((c: Course) => c.progress === 100).length}
                </p>
              </div>
              <div className="rounded-xl bg-neutral-900/60 px-4 py-2 ring-1 ring-neutral-800/60 text-center">
                <p className="text-xs text-neutral-500">In Progress</p>
                <p className="text-lg font-bold text-cyan-400">
                  {courses.filter((c: Course) => c.progress > 0 && c.progress < 100).length}
                </p>
              </div>
              <div className="rounded-xl bg-neutral-900/60 px-4 py-2 ring-1 ring-neutral-800/60 text-center">
                <p className="text-xs text-neutral-500">Avg Progress</p>
                <p className="text-lg font-bold text-emerald-400">
                  {courses.length > 0
                    ? Math.round(courses.reduce((a: number, c: Course) => a + c.progress, 0) / courses.length)
                    : 0}%
                </p>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Courses grid */}
        {courses && <CoursesGrid courses={courses} />}

        {/* Empty state */}
        {!error && courses?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-neutral-800/60">
              <span className="text-4xl">📚</span>
            </div>
            <p className="text-neutral-400 font-medium">No courses yet</p>
            <p className="text-sm text-neutral-600">Add some courses to your Supabase table to get started.</p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}