import type { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser;

export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
};

export type PresenceState = {
  user_id: string;
  is_reading: boolean;
  username: string;
};