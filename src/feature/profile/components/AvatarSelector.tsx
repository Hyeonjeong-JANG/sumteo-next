'use client';

import { authorAvatars } from '@/shared/lib/authors';
import Image from 'next/image';
import { updateAvatarAction } from '../../../app/(main)/actions';
import { useEffect, useMemo, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';

export function AvatarSelector({ currentAvatar, handleAvatarClick, isPending }: { currentAvatar?: string | null, handleAvatarClick: (imageUrl: string) => void, isPending: boolean }) {
  const [visibleCount, setVisibleCount] = useState(12);

  // 무한 스크롤 처리
  const { ref, inView } = useInView({
    threshold: 0, // 감지 영역이 0%만 보여도 실행
    triggerOnce: false, // 여러 번 감지 가능
  });

  // inView 상태가 true가 되면 다음 목록을 불러옴
  useEffect(() => {
    if (inView && visibleCount < authorAvatars.length) {
      setVisibleCount(prev => prev + 12);
    }
  }, [inView]);


  return (
    <div className="flex flex-col h-[400px]">
      {/* {isPending && (
        <div className="text-center mb-4 p-3 bg-amber-500/20 rounded-lg">
          <p className="text-amber-400">저장 중...</p>
        </div>
      )} */}
      <div className="flex justify-start items-center">
        <h2 className="section-title flex justify-between items-center">아바타 선택</h2>
        <div
          className={`flex items-center gap-2 text-amber-400 text-sm transition-opacity duration-300 ${isPending ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <span>저장 중...</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="avatar-grid">
          {authorAvatars.slice(0, visibleCount).map((author) => (
            <button
              key={author.id}
              onClick={() => handleAvatarClick(author.imageUrl)}
              disabled={isPending}
              className={`avatar-button ${currentAvatar === author.imageUrl ? 'selected' : ''}`}
            >
              <Image
                src={author.imageUrl}
                alt={author.name}
                width={64}
                height={64}
                className="avatar-image w-16 h-16 mx-auto"
                loading="lazy"
              />
              <p className="text-xs text-center font-medium text-slate-300">
                {author.name}
              </p>
            </button>
          ))}
        </div>
        {visibleCount < authorAvatars.length && (
          <div ref={ref} style={{ height: '50px' }} />
        )}
      </div>
    </div>
  );
}