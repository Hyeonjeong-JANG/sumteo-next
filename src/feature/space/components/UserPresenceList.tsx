"use client";

type PresenceState = {
    user_id: string;
    is_reading: boolean;
    username: string;
};

interface UserPresenceListProps {
    users: PresenceState[];
}

export function UserPresenceList({ users }: UserPresenceListProps) {
    if (users.length === 0) {
      return <p>아직 아무도 없어요.</p>;
    }
  
    return (
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.username} - {user.is_reading ? '🟢 독서 중' : '🔴 딴짓 중'}
          </li>
        ))}
      </ul>
    );
  }