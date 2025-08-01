"use client";

import { PresenceState } from '../../../shared/types';

type UserPresenceListProps = {
  users: PresenceState[];
}

export function UserPresenceList({ users }: UserPresenceListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📚</div>
        <p className="text-slate-400 text-lg">아직 아무도 없는 조용한 독서실이에요</p>
        <p className="text-slate-500 text-sm mt-2">첫 번째로 독서를 시작해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div key={user.user_id} className="user-item">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${user.is_reading ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="font-medium text-slate-200">{user.username}</span>
          </div>
          {/* <div className={`status-indicator ${user.is_reading ? 'status-reading' : 'status-idle'}`}>
            <span className="text-lg">{user.is_reading ? '📚' : '☕'}</span>
            <span className="text-sm">
              {user.is_reading ? '독서 중' : '휴식 중'}
            </span>
          </div> */}
        </div>
      ))}

      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-slate-400 text-sm">
          총 <span className="text-amber-400 font-semibold">{users.length}명</span>이 함께하고 있어요
        </p>
      </div>
    </div>
  );
}