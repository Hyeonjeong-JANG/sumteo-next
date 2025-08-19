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
    <div className="space-y-8 animate-fade-in">
      {/* 헤더 섹션 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="section-title text-3xl lg:text-4xl font-bold mb-2">
            나의 독서 여정 📚
          </h1>
          <p className="text-text-secondary">
            오늘도 좋은 책과 함께 의미 있는 시간을 보내보세요
          </p>
        </div>
        <Link href="/reading-space">
          <button className="btn-primary w-full sm:w-auto text-lg px-8 py-4 shadow-lg hover:shadow-glow">
            <span className="mr-2">🚪</span>
            독서실 입장하기
          </button>
        </Link>
      </div>

      {/* 메인 대시보드 그리드 */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 왼쪽: 프로필 & 통계 카드 */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 프로필 카드 */}
          <div className="card-elevated text-center hover-lift">
            <div className="relative mb-6">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent-400 rounded-full blur-sm opacity-50 animate-pulse" />
                <Image
                  src={profile?.avatar_url || '/avatars/shakespeare-william.jpg'}
                  alt="프로필 아바타"
                  width={128}
                  height={128}
                  className="relative w-full h-full rounded-full border-4 border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <h2 className="text-2xl font-bold text-gradient-brand">
                {profile?.username || '독서가'}님
              </h2>
              <p className="text-text-secondary text-sm font-medium">
                {user.email}
              </p>
              <div className="inline-flex items-center gap-2 bg-brand-400/20 text-brand-300 px-3 py-1 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                활성 독서가
              </div>
            </div>

            <Link href="/profile" prefetch={false}>
              <button className="btn-secondary w-full group">
                <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">⚙️</span>
                프로필 설정
              </button>
            </Link>
          </div>

          {/* 이번 달 통계 카드 */}
          <div className="card hover-lift">
            <h3 className="subsection-title flex items-center gap-2 mb-4">
              <span className="text-xl">📊</span>
              이번 달 성과
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success-500/10 rounded-xl border border-success-500/20">
                <div className="text-2xl font-bold text-success-400 mb-1">
                  {monthlyReadTime}
                </div>
                <div className="text-xs text-text-tertiary">총 독서시간</div>
              </div>
              
              <div className="text-center p-4 bg-brand-400/10 rounded-xl border border-brand-400/20">
                <div className="text-2xl font-bold text-brand-400 mb-1">
                  {monthlyAttendance}
                </div>
                <div className="text-xs text-text-tertiary">출석 일수</div>
              </div>
            </div>

            {/* 진행률 바 */}
            <div className="mt-6 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">월간 목표 달성률</span>
                  <span className="text-brand-400 font-medium">68%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full w-[68%] shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 출석 달력 */}
        <div className="lg:col-span-8 animate-slide-up">
          <AttendanceCalendar />
        </div>
      </div>

      {/* 하단 추가 정보 카드들 */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        
        {/* 최근 활동 */}
        <div className="card hover-lift">
          <h3 className="subsection-title flex items-center gap-2 mb-4">
            <span className="text-xl">⏰</span>
            최근 활동
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">독서 세션 완료</div>
                <div className="text-xs text-text-tertiary">2시간 30분 전</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-2 h-2 bg-brand-400 rounded-full" />
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">프로필 업데이트</div>
                <div className="text-xs text-text-tertiary">1일 전</div>
              </div>
            </div>
          </div>
        </div>

        {/* 독서 목표 */}
        <div className="card hover-lift">
          <h3 className="subsection-title flex items-center gap-2 mb-4">
            <span className="text-xl">🎯</span>
            이번 주 목표
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">주간 독서시간</span>
                <span className="text-brand-400 font-medium">6h / 10h</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full w-[60%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">출석 일수</span>
                <span className="text-success-400 font-medium">4 / 5일</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full w-[80%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 커뮤니티 */}
        <div className="card hover-lift">
          <h3 className="subsection-title flex items-center gap-2 mb-4">
            <span className="text-xl">👥</span>
            독서 친구들
          </h3>
          <div className="space-y-3">
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-brand-400 mb-1">12</div>
              <div className="text-xs text-text-tertiary">함께 읽는 친구들</div>
            </div>
            <Link href="/reading-space">
              <button className="btn-ghost w-full text-sm">
                독서실에서 만나기 →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}