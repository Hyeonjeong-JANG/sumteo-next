// 독서 시작 / 종료 기록

import { createClient } from '../../../../lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 독서 세션 시작
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('reading_sessions')
    .insert({ user_id: user.id, start_time: new Date().toISOString() })
    .select('id') // 새로 생성된 세션의 id를 반환
    .single();

  if (error) {
    return NextResponse.json({ error: '세션 시작 실패' }, { status: 500 });
  }

  return NextResponse.json({ sessionId: data.id, message: '독서가 시작되었습니다.' });
}

// 독서 세션 종료
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sessionId } = await request.json();
  if (!sessionId) return NextResponse.json({ error: '세션 ID가 필요합니다.' }, { status: 400 });

  const { error } = await supabase
    .from('reading_sessions')
    .update({ end_time: new Date().toISOString() })
    .eq('id', sessionId)
    .eq('user_id', user.id); // 본인의 세션만 종료 가능

  if (error) {
    return NextResponse.json({ error: '세션 종료 실패' }, { status: 500 });
  }

  return NextResponse.json({ message: '독서가 완료되었습니다.' });
}