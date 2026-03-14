/**
 * Database types for Supabase
 *
 * This file should be regenerated when your database schema changes.
 * Run: npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts
 *
 * For now, this is a placeholder that allows the app to compile.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your table types here when you create them in Supabase
      // Example:
      // profiles: {
      //   Row: {
      //     id: string
      //     username: string | null
      //     full_name: string | null
      //     avatar_url: string | null
      //     updated_at: string | null
      //   }
      //   Insert: {
      //     id: string
      //     username?: string | null
      //     full_name?: string | null
      //     avatar_url?: string | null
      //     updated_at?: string | null
      //   }
      //   Update: {
      //     id?: string
      //     username?: string | null
      //     full_name?: string | null
      //     avatar_url?: string | null
      //     updated_at?: string | null
      //   }
      // }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
