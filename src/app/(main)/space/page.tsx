import { LogoutButton } from '../../../feature/auth/components/LogoutButton';
import { Space } from '../../../feature/space/components/Space';
import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SpacePage() {
  const supabase = await createClient();

  // 현재 로그인된 사용자 정보
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div>
      <h1>숨터에 오신 것을 환영합니다!</h1>
      <p>
        로그인된 사용자: <strong>{user.email}</strong>
      </p>
      <LogoutButton />

      <Space userId={user.id} />
    </div>
  );
}