'use client';

import Link from 'next/link';
import { useSpacePresence } from '../hooks/useSpacePresence';
import { UserPresenceList } from './UserPresenceList';
import { User, Profile } from '../../../shared/types';
import { LogoutButton } from '@/feature/auth/components/LogoutButton';
import { useReadingSession } from '../../reading/hooks/useReadingSession';

// 페이지에서 로그인된 사용자의 ID를 props로 받음
export function Space({ 
    user, 
    profile 
}: { 
    user: User | null; 
    profile: Profile | null }) {
    const { presentUsers, isReading, toggleReadingStatus } = useSpacePresence(
      user?.id,
      profile?.username
    );
    
    // 독서 시간 기록 훅 추가
    const { isRecording, startSession, endSession } = useReadingSession();

    // 독서 상태 변경 시 시간 기록도 함께 처리
    const handleToggleReading = async () => {
      if (!isReading) {
        // 독서 시작
        const result = await startSession();
        if (result.success) {
          await toggleReadingStatus();
        } else {
          alert(result.message);
        }
      } else {
        // 독서 종료
        const result = await endSession();
        if (result.success) {
          await toggleReadingStatus();
        } else {
          alert(result.message);
        }
      }
    };
  
    return (
      <div className="max-w-4xl mx-auto">
        {/* 로그인 여부에 따라 다른 UI를 보여줌 */}
        {user ? (
          <div className="space-y-6">
            {/* 내 상태 카드 */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="section-title">📖 나의 독서 현황</h2>
                <Link href="/profile">
                  <button className="btn-secondary">
                    ⚙️ 프로필 설정
                  </button>
                </Link>
              </div>
              
              <div className="text-center space-y-4">
                <button 
                  onClick={handleToggleReading}
                  className={`btn-reading ${isReading ? 'ending' : ''}`}
                >
                  {isReading ? '📚 독서 종료' : '📖 독서 시작'}
                </button>
                
                <div className="flex justify-center">
                  <div className={`status-indicator ${isReading ? 'status-reading' : 'status-idle'}`}>
                    <span className="text-2xl">{isReading ? '🟢' : '🔴'}</span>
                    <span>
                      {isReading ? '독서 중' : '휴식 중'}
                    </span>
                  </div>
                </div>
                
                {isRecording && (
                  <div className="flex items-center justify-center gap-2 text-amber-400">
                    <span className="animate-pulse">⏱️</span>
                    <span className="font-medium">독서 시간을 기록하고 있습니다...</span>
                  </div>
                )}
              </div>
            </div>

            {/* 현재 접속자 목록 카드 */}
            <div className="card">
              <h2 className="section-title">👥 현재 접속자 목록</h2>
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
                    🚪 로그인하고 독서 참여하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}