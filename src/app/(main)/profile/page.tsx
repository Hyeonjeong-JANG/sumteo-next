import { createClient } from '../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import { updateUsernameAction } from '../actions';
import { AvatarSelector } from '../../../feature/profile/components/AvatarSelector';
import { UsernameForm } from '../../../feature/profile/components/UsernameForm';
import Link from 'next/link';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .single();

  return (
    <>
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="page-title">⚙️ 프로필 설정</h1>
        <div className="flex items-center justify-center gap-4">
          <Link href="/reading-space">
            <button className="btn-secondary">
              ← 독서실로 돌아가기
            </button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 기본 정보 카드 */}
        <div className="card">
          <h2 className="section-title">📋 기본 정보</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                이메일
              </label>
              <div className="bg-slate-700/50 rounded-lg px-4 py-3 border border-slate-600">
                <span className="text-slate-200">{user.email}</span>
              </div>
            </div>

            <UsernameForm currentUsername={profile?.username} />
          </div>
        </div>

        {/* 아바타 선택 카드 */}
        <div className="card">
          <h2 className="section-title">🎭 아바타 선택</h2>
          <p className="text-slate-400 text-sm mb-4">
            좋아하는 작가를 선택해서 나만의 아바타로 설정해보세요
          </p>

          {/* 현재 선택된 아바타 미리보기 */}
          {profile?.avatar_url && (
            <div className="text-center mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <p className="text-sm text-slate-400 mb-3">현재 아바타</p>
              <img
                src={profile.avatar_url}
                alt="현재 아바타"
                className="w-20 h-20 rounded-full mx-auto border-4 border-amber-400"
              />
            </div>
          )}
          <AvatarSelector currentAvatar={profile?.avatar_url} />
        </div>
      </div>
    </>
  );
}