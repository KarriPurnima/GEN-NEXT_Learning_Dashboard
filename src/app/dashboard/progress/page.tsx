// src/app/dashboard/progress/page.tsx
import { getCourses } from "@/lib/supabase-server";
import DashboardShell from "../_components/DashboardShell";
import ProgressView from "./_components/ProgressView";

export default async function ProgressPage() {
  const { data: courses, error } = await getCourses();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-50">Your Progress</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Track your learning journey across all courses.
          </p>
        </div>

        {error && (
          <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        {courses && <ProgressView courses={courses} />}
      </div>
    </DashboardShell>
  );
}