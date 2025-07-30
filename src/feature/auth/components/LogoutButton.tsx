'use client';

import { logoutAction } from '../../../app/(auth)/actions';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        className="btn-secondary text-sm"
      >
        🚪 로그아웃
      </button>
    </form>
  );
}