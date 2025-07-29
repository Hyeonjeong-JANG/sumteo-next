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
      alert('아바타가 변경되었습니다.');
    } catch (error) {
      alert('아바타 변경 중 오류가 발생했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h3>아바타 선택</h3>
      {isUpdating && <p>아바타를 변경 중입니다...</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {authorAvatars.map((author) => (
          <button
            key={author.id}
            onClick={() => handleAvatarClick(author.imageUrl)}
            disabled={isUpdating}
            style={{
              border: selectedAvatar === author.imageUrl ? '3px solid #007bff' : '1px solid #ccc',
              padding: '5px',
              borderRadius: '50%',
              background: 'none',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
              opacity: isUpdating ? 0.6 : 1
            }}
          >
            <Image
              src={author.imageUrl}
              alt={author.name}
              width={80}
              height={80}
              style={{ borderRadius: '50%' }}
            />
            <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '4px' }}>{author.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}