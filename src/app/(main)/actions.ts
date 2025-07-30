'use server';

import { createClient } from '../../../lib/supabase/server';
import { revalidatePath } from 'next/cache';

// 닉네임 업데이트
export async function updateUsernameAction(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('로그인이 필요합니다.');

    const newUsername = formData.get('username') as string;
    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', user.id);

    if (error) throw error;

    revalidatePath('/profile');
    return { success: true, message: '닉네임이 변경되었습니다.' };
  } catch (e) {
    return { success: false, message: '닉네임 변경에 실패했습니다: ' + (e as Error).message };
  }
}

// 아바타 URL 업데이트
export async function updateAvatarAction(avatarUrl: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('로그인이 필요합니다.');

    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', user.id);

    if (error) throw error;

    revalidatePath('/profile');
    return { success: true, message: '아바타가 변경되었습니다.' };
  } catch (e) {
    return { success: false, message: '아바타 변경에 실패했습니다: ' + (e as Error).message };
  }
}

// 독서 세션 시작
export async function startReadingSessionAction() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다');
    }

    const { data, error } = await supabase
      .from('reading_sessions')
      .insert({ user_id: user.id, start_time: new Date().toISOString() })
      .select('id')
      .single();

    if (error) throw error;

    return { success: true, sessionId: data.id, message: '독서가 시작되었습니다' };
  } catch (e) {
    return { success: false, message: '세션 시작에 실패했습니다: ' + (e as Error).message };
  }
}

// 독서 세션 종료
export async function endReadingSessionAction(sessionId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인이 필요합니다');
    }

    const { error } = await supabase
      .from('reading_sessions')
      .update({ end_time: new Date().toISOString() })
      .eq('id', sessionId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { message: '독서가 완료되었습니다' };
  } catch (e) {
    return { success: false, message: '세션 종료에 실패했습니다: ' + (e as Error).message };
  }
}