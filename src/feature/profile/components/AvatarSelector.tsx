'use client';

import { authorAvatars } from '@/shared/lib/authors';
import Image from 'next/image';
import { updateAvatarAction } from '@/app/(main)/profile/actions';

export function AvatarSelector({ currentAvatar }: { currentAvatar?: string | null }) {
  const handleAvatarClick = async (imageUrl: string) => {
    await updateAvatarAction(imageUrl);
    alert('아바타가 변경되었습니다.');
  };

  return (
    <div>
      <h3>아바타 선택</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {authorAvatars.map((author) => (
          <button
            key={author.id}
            onClick={() => handleAvatarClick(author.imageUrl)}
            style={{
              border: currentAvatar === author.imageUrl ? '2px solid blue' : '1px solid #ccc',
              padding: '5px',
              borderRadius: '50%',
              background: 'none',
              cursor: 'pointer'
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