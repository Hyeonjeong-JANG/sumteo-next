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

  return (
    <div className="max-w-4xl mx-auto">
      {user ? (
        <div className="space-y-6">
          {/* 내 상태 카드 */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title">나의 독서 현황</h2>
              <Link href="/dashboard">
                <button className="btn-secondary">
                  대시보드
                </button>
              </Link>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={toggleReadingStatus}
                className={`btn-secondary ${isReading ? 'ending' : ''}`}
              >
                {isReading ? '독서 종료' : '독서 시작'}
              </button>

              <div className="flex justify-center">
                <div className={`flex items-center gap-3 status-indicator ${isReading ? 'status-reading' : 'status-idle'}`}>
                  <div className={`w-3 h-3 rounded-full ${isReading ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <span>
                    {isReading ? '독서 중' : '휴식 중'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 현재 접속자 목록 카드 */}
          <div className="card">
            <h2 className="section-title">현재 접속자 목록</h2>
            <UserPresenceList users={presentUsers} />
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="space-y-6">
            <div>
              <h2 className="section-title">👀 구경 모드</h2>
              <p className="text-slate-300 mb-6">
                다른 사람들의 독서를 구경하고 있어요
              </p>
            </div>
            <div className="user-list">
              <h3 className="text-lg font-semibold mb-4 text-amber-400">현재 접속자</h3>
              <UserPresenceList users={presentUsers} />
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link href="/signin">
                <button className="btn-primary text-lg px-8 py-4">
                  로그인하고 함께 책읽기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}