import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';

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
    .select('username')
    .eq('id', user.id)
    .single();

  const updateProfile = async (formData: FormData) => {
    'use server';

    const supabase = await createClient();
    const newUsername = formData.get('username') as string;

    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      redirect('/profile');
    }
  };

  return (
    <div>
      <h1>프로필 설정</h1>
      <p>
        이메일: <strong>{user.email}</strong>
      </p>
      <form action={updateProfile}>
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
    </div>
  );
}