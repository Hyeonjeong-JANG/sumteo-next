// 로그아웃 처리 (공용)
import { createClient } from '../../../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return NextResponse.json({ error: '로그아웃 실패' }, { status: 500 });
  }

  return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
}