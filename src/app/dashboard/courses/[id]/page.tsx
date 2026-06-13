import { getCourseById, getCourses } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import DashboardShell from "../../_components/DashboardShell";
import CourseDetail from "./_components/CourseDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { data: courses } = await getCourses();
  return (courses ?? []).map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { data: course, error } = await getCourseById(id);

  if (error || !course) notFound();

  return (
    <DashboardShell>
      <CourseDetail course={course} />
    </DashboardShell>
  );
}