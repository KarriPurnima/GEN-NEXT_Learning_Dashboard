// src/lib/supabase-client.ts
// ============================================================
//  Supabase Browser Client
//  Used ONLY in Client Components ("use client" files)
//  Uses @supabase/ssr to sync session via cookies so
//  Next.js middleware can read auth state server-side
// ============================================================

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let clientInstance: SupabaseClient | null = null;

export function createBrowserSupabaseClient() {
  if (clientInstance) return clientInstance;

  clientInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return clientInstance;
}