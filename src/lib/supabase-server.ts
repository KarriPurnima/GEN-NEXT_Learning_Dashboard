// src/lib/supabase-server.ts
import { createClient } from "@supabase/supabase-js";
import type { Course, DBResult } from "@/lib/types";

export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
      "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local"
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getCourses(): Promise<DBResult<Course[]>> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select("id, title, progress, icon_name, created_at, description, total_lessons, completed_lessons, category, difficulty, instructor, thumbnail_url, status")
      .order("created_at", { ascending: true });

    console.log("[Supabase] getCourses data:", data);
    console.log("[Supabase] getCourses error:", error);

    if (error) {
      console.error("[Supabase] getCourses error:", error.message);
      return { data: null, error: error.message };
    }
    return { data: data as Course[], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    return { data: null, error: message };
  }
}

export async function getCourseById(id: string): Promise<DBResult<Course>> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }
    return { data: data as Course, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    return { data: null, error: message };
  }
}