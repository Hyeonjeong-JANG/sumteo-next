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
        <div>
          {/* 로그인 여부에 따라 다른 UI를 보여줌 */}
          {user ? (
            <div>
              <p>
                {profile?.username || user.email}님 환영합니다.
              </p>
              <Link href="/profile">
                <button style={{ marginRight: '10px' }}>프로필 설정</button>
              </Link>
              <LogoutButton />
              <hr style={{ margin: '20px 0' }} />
              <h2>현재 접속자 목록</h2>
              <UserPresenceList users={presentUsers} />
              <hr style={{ margin: '20px 0' }} />
              <button onClick={handleToggleReading}>
                {isReading ? '독서 종료' : '독서 시작'}
              </button>
              <p>나의 현재 상태: {isReading ? '🟢 독서 중' : '🔴 딴짓 중'}</p>
              {isRecording && <p>⏱️ 독서 시간을 기록 중입니다...</p>}
            </div>
          ) : (
            <div>
              <h2>현재 접속자 목록</h2>
              <UserPresenceList users={presentUsers} />
              <hr style={{ margin: '20px 0' }} />
              <p>다른 사람들의 독서를 구경하고 있어요.</p>
              <Link href="/signin">
                <button>로그인하고 독서 참여하기</button>
              </Link>
            </div>
          )}
        </div>
      );
    }