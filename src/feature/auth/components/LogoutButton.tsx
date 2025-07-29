'use client';

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/signin';
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="btn-secondary text-sm"
    >
      🚪 로그아웃
    </button>
  );
}