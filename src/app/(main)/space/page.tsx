import { LogoutButton } from '../../../feature/auth/components/LogoutButton';
import { Space } from '../../../feature/space/components/Space';
import { createClient } from '../../../../lib/supabase/server';
import { Profile } from '../../../shared/types';

export default async function SpacePage() {
  const supabase = await createClient();

  // 현재 로그인된 사용자 정보
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // user가 있을 때만 프로필 정보를 가져옴
  const { data: profile } = user
  ? await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()
    : { data: null };

  return (
    <div>
      <h1>숨터에 오신 것을 환영합니다!</h1>
      <p>
        로그인된 사용자: <strong>{profile?.username}</strong>
      </p>
      <LogoutButton />

      <Space user = {user} profile = {profile as Profile} />
    </div>
  );
}