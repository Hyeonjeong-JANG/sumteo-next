// 독서 시작 / 종료 기록

import { createClient } from '../../../../lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 독서 세션 시작
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { start_time, end_time } = await request.json();

  const { error } = await supabase.from('reading_sessions').insert({
    user_id: user.id,
    start_time,
    end_time,
  });

  if (error) {
    console.error('Error inserting reading session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Session saved!' }, { status: 201 });
}