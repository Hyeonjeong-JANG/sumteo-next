'use client';

import Link from 'next/link';
import { UserPresenceList } from './UserPresenceList';
import { User, Profile } from '../../../shared/types';
import { useSpace } from '../hooks/useSpace';
import toast from 'react-hot-toast';

// 페이지에서 로그인된 사용자의 ID를 props로 받음
export function ReadingSpace({
  user,
  profile
}: {
  user: User | null;
  profile: Profile | null
}) {
  const { presentUsers, isReading, toggleReadingStatus } = useSpace(
    user?.id,
    profile?.username
  );

  const handleReadingToggle = () => {
    toggleReadingStatus();
    if (!isReading) {
      toast.success('독서 세션이 시작되었습니다! 📚', {
        duration: 3000,
        style: {
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#86efac',
          border: '1px solid rgba(34, 197, 94, 0.3)',
        },
      });
    } else {
      toast.success('독서 세션이 완료되었습니다! 🎉', {
        duration: 3000,
        style: {
          background: 'rgba(251, 191, 36, 0.1)',
          color: '#fcd34d',
          border: '1px solid rgba(251, 191, 36, 0.3)',
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {user ? (
        <>
          {/* 내 독서 상태 카드 */}
          <div className="card-elevated hover-lift">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h2 className="section-title flex items-center gap-3 mb-2">
                  <span className="text-2xl">📖</span>
                  나의 독서 공간
                </h2>
                <p className="text-text-secondary">
                  집중된 시간 속에서 좋은 책과 함께하세요
                </p>
              </div>
              <Link href="/dashboard">
                <button className="btn-secondary group">
                  <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">📊</span>
                  대시보드로 가기
                </button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 독서 상태 제어 */}
              <div className="text-center space-y-6">
                <div className="relative">
                  <button
                    onClick={handleReadingToggle}
                    className={`relative w-32 h-32 mx-auto rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                      isReading 
                        ? 'bg-gradient-to-br from-error-500 to-error-600 shadow-lg hover:shadow-xl text-white animate-pulse-glow' 
                        : 'bg-gradient-to-br from-success-500 to-success-600 shadow-lg hover:shadow-xl text-white hover:shadow-glow'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">
                      {isReading ? '⏹️' : '▶️'}
                    </span>
                    <span className="text-sm">
                      {isReading ? '독서 종료' : '독서 시작'}
                    </span>
                    {isReading && (
                      <div className="absolute inset-0 rounded-full bg-error-400/20 animate-ping" />
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={`status-indicator mx-auto w-fit ${isReading ? 'status-reading' : 'status-idle'}`}>
                    <div className={`w-3 h-3 rounded-full ${isReading ? 'bg-success-400 animate-pulse' : 'bg-error-400'}`} />
                    <span className="font-semibold">
                      {isReading ? '독서 진행 중' : '휴식 중'}
                    </span>
                  </div>
                  
                  {isReading && (
                    <div className="text-text-tertiary text-sm animate-fade-in">
                      집중해서 독서하고 계시네요! 👏
                    </div>
                  )}
                </div>
              </div>

              {/* 독서 통계 */}
              <div className="space-y-4">
                <h3 className="subsection-title">오늘의 독서</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-brand-400/10 rounded-xl border border-brand-400/20">
                    <div className="text-2xl font-bold text-brand-400 mb-1">2h 30m</div>
                    <div className="text-xs text-text-tertiary">오늘 독서시간</div>
                  </div>
                  <div className="text-center p-4 bg-success-500/10 rounded-xl border border-success-500/20">
                    <div className="text-2xl font-bold text-success-400 mb-1">3</div>
                    <div className="text-xs text-text-tertiary">완료한 세션</div>
                  </div>
                </div>
                
                {/* 독서 목표 진행률 */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">오늘 목표 달성률</span>
                    <span className="text-brand-400 font-medium">83%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-400 to-brand-500 h-2 rounded-full w-[83%] shadow-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 현재 접속자 목록 카드 */}
          <div className="card hover-lift">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title flex items-center gap-3">
                <span className="text-2xl">👥</span>
                함께 읽는 사람들
                <span className="bg-brand-400/20 text-brand-300 px-2 py-1 rounded-full text-sm font-medium">
                  {presentUsers.length}명 접속
                </span>
              </h2>
            </div>
            <UserPresenceList users={presentUsers} />
          </div>
        </>
      ) : (
        /* 비로그인 사용자용 UI */
        <div className="card-elevated text-center hover-lift">
          <div className="space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-400 to-accent-400 rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">👀</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400/20 to-accent-400/20 rounded-3xl blur-xl scale-110 opacity-50" />
            </div>
            
            <div>
              <h2 className="section-title text-3xl mb-4">
                구경 모드로 접속 중
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed max-w-md mx-auto">
                다른 독서가들의 열정적인 독서 모습을 구경해보세요. 
                <br />함께 읽으면 더욱 재미있어요!
              </p>
            </div>

            {/* 현재 접속자 미리보기 */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="subsection-title text-xl mb-4 flex items-center justify-center gap-2">
                <span className="text-brand-400">🔥</span>
                지금 열심히 독서 중인 사람들
              </h3>
              <UserPresenceList users={presentUsers} />
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="space-y-4">
                <p className="text-text-tertiary mb-6">
                  로그인하고 독서 커뮤니티에 참여해보세요
                </p>
                <Link href="/signin">
                  <button className="btn-primary text-xl px-10 py-5 shadow-lg hover:shadow-glow group">
                    <span className="mr-3 group-hover:scale-110 transition-transform duration-300">🚪</span>
                    로그인하고 함께 책읽기
                  </button>
                </Link>
                <div className="mt-4">
                  <Link href="/signup" className="text-text-tertiary hover:text-brand-400 transition-colors text-sm">
                    아직 계정이 없으신가요? 회원가입하기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}