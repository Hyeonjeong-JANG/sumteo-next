'use server';

import { createClient } from '../../../../lib/supabase/server';
import { revalidatePath } from 'next/cache';

// 닉네임 업데이트
export async function updateUsernameAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const newUsername = formData.get('username') as string;
  const { error } = await supabase
    .from('profiles')
    .update({ username: newUsername })
    .eq('id', user.id);

  if (error) {
    console.error('닉네임 변경 실패:', error);
    return;
  }
  
  revalidatePath('/profile');
}

// 아바타 URL 업데이트
export async function updateAvatarAction(avatarUrl: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.id);

  if (error) {
    console.error('아바타 변경 실패:', error);
    return;
  }
  
  revalidatePath('/profile');
}