'use client';

import { authorAvatars } from '@/shared/lib/authors';
import Image from 'next/image';
import { updateAvatarAction } from '../../../app/(main)/actions';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

export function AvatarSelector({ currentAvatar }: { currentAvatar?: string | null }) {
  const [isPending, startTransition] = useTransition();

  const handleAvatarClick = async (imageUrl: string) => {
    startTransition(async () => {
      const result = await updateAvatarAction(imageUrl);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div>
      {isPending && (
        <div className="text-center mb-4 p-3 bg-amber-500/20 rounded-lg">
          <p className="text-amber-400">아바타를 변경하고 있습니다...</p>
        </div>
      )}

      <div className="avatar-grid">
        {authorAvatars.map((author) => (
          <button
            key={author.id}
            onClick={() => handleAvatarClick(author.imageUrl)}
            disabled={isPending}
            className={`avatar-button ${currentAvatar === author.imageUrl ? 'selected' : ''}`}
          >
            <Image
              src={author.imageUrl}
              alt={author.name}
              width={80}
              height={80}
              className="avatar-image w-20 h-20"
            />
            <p className="text-xs text-center font-medium text-slate-300">
              {author.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}