'use client';

import { useSpacePresence } from '../hooks/useSpacePresence';
import { UserPresenceList } from './UserPresenceList';

// 페이지에서 로그인된 사용자의 ID를 props로 받음
export function Space({ userId }: { userId: string }) {
    const { presentUsers, isReading, toggleReadingStatus } = useSpacePresence(
      userId
    );
  
    return (
      <div>
        <h2>현재 접속자 목록</h2>
        <UserPresenceList users={presentUsers} />
  
        <hr style={{ margin: '20px 0' }} />
  
        <button onClick={toggleReadingStatus}>
          {isReading ? '독서 종료' : '독서 시작'}
        </button>
        <p>나의 현재 상태: {isReading ? '🟢 독서 중' : '🔴 딴짓 중'}</p>
      </div>
    );
  }