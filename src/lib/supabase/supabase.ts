// lib/supabase.ts
// lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import type { Database } from '../../../types/supabase'; // your generated types — path may be '../../types/supabase' or adjust alias
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client (simple, no cookies)
export function createSupabaseBrowser() {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// Server client — returns a ready-to-use client (call it in Server Components / actions)
export async function createSupabaseServer() {
    const cookieStore = await cookies(); // Next.js 15+ makes this async-safe

    return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch {
                    // Safe to ignore in Server Components (middleware or proxy handles writes if needed)
                    // Prevents errors when Supabase tries to set cookies from RSC
                }
            },
        },
    });
}