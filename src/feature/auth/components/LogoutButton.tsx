'use client';

import { useAuth } from '../hooks/useAuth';

export function LogoutButton() {
  const { signOut, loading } = useAuth();

  return (
    <button onClick={signOut} disabled={loading}>
      {loading ? '...' : '로그아웃'}
    </button>
  );
}