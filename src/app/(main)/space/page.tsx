import { LogoutButton } from '../../../feature/auth/components/LogoutButton';
import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SpacePage() {
  const supabase = await createClient();

  // 현재 로그인된 사용자 정보
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div>
      <h1>숨터에 오신 것을 환영합니다!</h1>
      <p>
        로그인된 사용자: <strong>{user.email}</strong>
      </p>
      <LogoutButton />

      {/* 여기에 나중에 2D 메타버스 공간이 들어옵니다. */}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          height: '60vh',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>메타버스 공간</p>
      </div>
    </div>
  );
}