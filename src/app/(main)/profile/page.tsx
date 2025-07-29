import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { updateUsernameAction } from './actions';
import { AvatarSelector } from '../../../feature/profile/components/AvatarSelector';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single();

  return (
    <div>
      <h1>프로필 설정</h1>
      <p>
        이메일: <strong>{user.email}</strong>
      </p>
      <form action={updateUsernameAction}>
        <label htmlFor="username">닉네임</label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={profile?.username || ''} // DB에서 가져온 닉네임을 기본값으로 보여줌
          className="placeholder-gray-400"
        />
        <button type="submit">닉네임 저장</button>
      </form>

      <hr style={{ margin: '20px 0' }}/>
      <AvatarSelector currentAvatar={profile?.avatar_url} />
    </div>
  );
}