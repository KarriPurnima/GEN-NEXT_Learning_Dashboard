// src/lib/types.ts

export interface Course {
  id: string;
  title: string;
  progress: number;      // 0–100
  icon_name: string;
  created_at: string;
  description?: string;
  total_lessons?: number;
  completed_lessons?: number;
  category?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export interface CourseCardProps {
  course: Course;
  index: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}

export interface DBResult<T> {
  data: T | null;
  error: string | null;
}