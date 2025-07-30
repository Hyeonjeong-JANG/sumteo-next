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
      .select('username, avatar_url')
      .eq('id', user.id)
      .single()
    : { data: null };

  return (
    <>
      {user && profile && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm border border-white/20">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="프로필"
                className="w-8 h-8 rounded-full border-2 border-amber-400"
              />
            )}
            <span className="text-amber-200 font-medium">
              {profile.username}님
            </span>
          </div>
          <LogoutButton />
        </div>
      )}
      <Space user={user} profile={profile as Profile} />
    </>
  );
}