'use client';

import Link from 'next/link';
import { useSpacePresence } from '../hooks/useSpacePresence';
import { UserPresenceList } from './UserPresenceList';
import { User, Profile } from '../../../shared/types';
import { LogoutButton } from '@/feature/auth/components/LogoutButton';

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
  
    return (
        <div>
          {/* 👇 로그인 여부에 따라 다른 UI를 보여줌 */}
          {user ? (
            <div>
              <p>
                {profile?.username || user.email}님 환영합니다.
              </p>
              <LogoutButton />
              <hr style={{ margin: '20px 0' }} />
              <h2>현재 접속자 목록</h2>
              <UserPresenceList users={presentUsers} />
              <hr style={{ margin: '20px 0' }} />
              <button onClick={toggleReadingStatus}>
                {isReading ? '독서 종료' : '독서 시작'}
              </button>
              <p>나의 현재 상태: {isReading ? '🟢 독서 중' : '🔴 딴짓 중'}</p>
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