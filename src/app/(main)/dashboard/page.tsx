// import { createClient } from '../../../../lib/supabase/server';
// import { redirect } from 'next/navigation';
// import { updateUsernameAction } from '../actions';
// import { AvatarSelector } from '../../../feature/profile/components/AvatarSelector';
// import { UsernameForm } from '../../../feature/profile/components/UsernameForm';
// import Link from 'next/link';

// export default async function DashboardPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect('/signin');
//   }

//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('username, avatar_url')
//     .eq('id', user.id)
//     .single();

//   return (
//     <>
//       {/* 헤더 */}
//       <div className="text-center mb-8">
//         <h1 className="page-title">⚙️ 프로필 설정</h1>
//         <div className="flex items-center justify-center gap-4">
//           <Link href="/reading-space">
//             <button className="btn-secondary">
//               ← 독서실로 돌아가기
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* 기본 정보 카드 */}
//         <div className="card">
//           <h2 className="section-title">📋 기본 정보</h2>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-300 mb-2">
//                 이메일
//               </label>
//               <div className="bg-slate-700/50 rounded-lg px-4 py-3 border border-slate-600">
//                 <span className="text-slate-200/50">{user.email}</span>
//               </div>
//             </div>

//             <UsernameForm currentUsername={profile?.username} />
//           </div>
//         </div>

//         {/* 아바타 선택 카드 */}
//         <div className="card">
//           <h2 className="section-title">🎭 아바타 선택</h2>
//           <p className="text-slate-400 text-sm mb-4">
//             좋아하는 작가를 선택해서 나만의 아바타로 설정해보세요
//           </p>

//           {/* 현재 선택된 아바타 미리보기 */}
//           {profile?.avatar_url && (
//             <div className="text-center mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
//               <p className="text-sm text-slate-400 mb-3">현재 아바타</p>
//               <img
//                 src={profile.avatar_url}
//                 alt="현재 아바타"
//                 className="w-20 h-20 rounded-full mx-auto border-4 border-amber-400"
//               />
//             </div>
//           )}
//           <AvatarSelector currentAvatar={profile?.avatar_url} />
//         </div>
//       </div>
//     </>
//   );
// }

import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { AttendanceCalendar } from '../../../feature/dashboard/components/AttendanceCalendar';
import Link from 'next/link';

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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">숨터</h1>
        <p className="text-slate-300">
          비밀스러운 온라인 독서 공간에 오신 것을 환영합니다
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 프로필 카드 */}
        <div className="lg:col-span-1">
          <div className="card text-center space-y-4">
            <div className="w-24 h-24 mx-auto">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="프로필"
                  className="w-full h-full rounded-full border-4 border-amber-400"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-4xl">
                  😊
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-200">
                {profile?.username || '사용자'}
              </h2>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>

            <div className="space-y-2">
              <Link href="/reading-space">
                <button className="btn-primary w-full">
                  📚 독서실 입장
                </button>
              </Link>
              <Link href="/profile">
                <button className="btn-secondary w-full">
                  📅 대시보드
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* 출석 달력 */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-200">📅 출석현황</h3>
            <AttendanceCalendar />
          </div>
        </div>
      </div>

      {/* 통계 카드들 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card text-center">
          <div className="text-3xl mb-2">📖</div>
          <h3 className="text-lg font-semibold text-slate-200 mb-1">이번 달 독서시간</h3>
          <p className="text-2xl font-bold text-amber-400">24시간 30분</p>
        </div>

        <div className="card text-center">
          <div className="text-3xl mb-2">🔥</div>
          <h3 className="text-lg font-semibold text-slate-200 mb-1">이번 달 출석</h3>
          <p className="text-2xl font-bold text-green-400">7일</p>
        </div>
      </div>
    </div>
  );
}