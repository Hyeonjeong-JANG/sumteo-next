import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { AttendanceCalendar } from '../../../feature/dashboard/components/AttendanceCalendar';
import Link from 'next/link';
import Image from 'next/image';

export default async function DashboardPage() {
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

  // 임시 통계 데이터
  const monthlyReadTime = "24시간 30분";
  const monthlyAttendance = "7일";

  return (
    <div className="container-main">
      <div className="container-content max-w-6xl">
        {/* 헤더 */}
        <div className="page-header">
          <h1 className="page-title">📅 나의 독서 대시보드</h1>
        </div>
        {/* 메인 그리드 */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* --- 왼쪽 컬럼 --- */}
          <div className="lg:col-span-1 space-y-8">
            {/* 프로필 카드 */}
            <div className="card text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <Image
                  src={profile?.avatar_url || '/default-avatar.png'}
                  alt="프로필 아바타"
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full border-4 border-amber-400"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-200">
                  {profile?.username || '사용자'}
                </h2>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
              <div className="space-y-2 mt-6">
                <Link href="/reading-space">
                  <button className="btn-primary w-full">📚 독서실 입장</button>
                </Link>
                <Link href="/profile">
                  <button className="btn-secondary w-full">⚙️ 프로필 설정</button>
                </Link>
              </div>
            </div>
          </div>
          {/* --- 오른쪽 컬럼 --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* 출석 달력 카드 */}
            <AttendanceCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}