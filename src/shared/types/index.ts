import type { User as SupabaseUser } from '@supabase/supabase-js';

// supabase가 제공하는 유저 타입
export type User = SupabaseUser;

// 프로필 타입
export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
};

// 실시간 접속자 목록에서 사용할 타입
export type PresenceState = {
  user_id: string;
  is_reading: boolean;
  username: string;
};