import { getCourses } from "@/lib/supabase-server";
import DashboardShell from "./_components/DashboardShell";
import BentoGrid from "./_components/bento/BentoGrid";
import HeroTile from "./_components/bento/HeroTile";
import CourseCard from "./_components/bento/CourseCard";
import ActivityTile from "./_components/bento/ActivityTile";
import type { Course } from "@/lib/types";

export default async function DashboardPage() {
  const { data: courses, error } = await getCourses();

  return (
    <DashboardShell>
      {error && (
        <div
          role="alert"
          className="mx-6 mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <strong>Database error:</strong> {error}
        </div>
      )}
      <BentoGrid>
        <HeroTile userName="Purnima" streakDays={12} className="md:col-span-2" />
        <ActivityTile className="md:col-span-1" />
        {courses && courses.map((course: Course, index: number) => (
          <CourseCard key={course.id} course={course} animationIndex={index} />
        ))}
      </BentoGrid>
    </DashboardShell>
  );
}
