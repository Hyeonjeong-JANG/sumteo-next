'use client';

import { authorAvatars } from '@/shared/lib/authors';
import Image from 'next/image';
import { updateAvatarAction } from '@/app/(main)/profile/actions';
import { useState } from 'react';

export function AvatarSelector({ currentAvatar }: { currentAvatar?: string | null }) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAvatarClick = async (imageUrl: string) => {
    setIsUpdating(true);
    try {
      await updateAvatarAction(imageUrl);
      setSelectedAvatar(imageUrl);
      alert('🎉 아바타가 변경되었습니다!');
    } catch (error) {
      alert('❌ 아바타 변경 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      {isUpdating && (
        <div className="text-center mb-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">아바타를 변경하고 있습니다...</span>
          </div>
        </div>
      )}
      
      <div className="avatar-grid">
        {authorAvatars.map((author) => (
          <button
            key={author.id}
            onClick={() => handleAvatarClick(author.imageUrl)}
            disabled={isUpdating}
            className={`avatar-button ${selectedAvatar === author.imageUrl ? 'selected' : ''}`}
          >
            <Image
              src={author.imageUrl}
              alt={author.name}
              width={80}
              height={80}
              className="avatar-image"
            />
            <p className="text-xs text-center font-medium text-slate-300">
              {author.name}
            </p>
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-400">
          총 <span className="text-amber-400 font-semibold">{authorAvatars.length}명</span>의 작가 중에서 선택하세요
        </p>
      </div>
    </div>
  );
}