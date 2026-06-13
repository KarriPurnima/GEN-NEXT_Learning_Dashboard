// src/app/dashboard/courses/[id]/page.tsx
import { getCourseById, getCourses } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import DashboardShell from "../../_components/DashboardShell";
import CourseDetail from "./_components/CourseDetail";

interface PageProps {
  params: { id: string };
}

// Generate static params for all courses
export async function generateStaticParams() {
  const { data: courses } = await getCourses();
  return (courses ?? []).map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { data: course, error } = await getCourseById(params.id);

  if (error || !course) notFound();

  return (
    <DashboardShell>
      <CourseDetail course={course} />
    </DashboardShell>
  );
}