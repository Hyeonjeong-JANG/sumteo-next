'use client';

import { authorAvatars } from '@/shared/lib/authors';
import Image from 'next/image';
import { updateAvatarAction } from '../../../app/(main)/actions';
import { useEffect, useMemo, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-slate-300 text-sm">
          좋아하는 작가를 선택해보세요
        </p>
        {isPending && (
          <div className="flex items-center gap-2 text-amber-400">
            <LoadingSpinner />
            <span className="text-sm">적용 중...</span>
          </div>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto pr-2 space-y-6">
        {/* 한 줄에 4명씩 배치 */}
        {Array.from({ length: Math.ceil(authorAvatars.slice(0, visibleCount).length / 4) }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4">
            {authorAvatars
              .slice(rowIndex * 4, (rowIndex + 1) * 4)
              .slice(0, Math.min(4, authorAvatars.slice(0, visibleCount).length - rowIndex * 4))
              .map((author) => (
                <button
                  key={author.id}
                  onClick={() => handleAvatarClick(author.imageUrl)}
                  disabled={isPending}
                  className={`group relative p-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    currentAvatar === author.imageUrl
                      ? 'bg-amber-400/20 ring-2 ring-amber-400 shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {/* 아바타 이미지 */}
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      currentAvatar === author.imageUrl 
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-800' 
                        : 'group-hover:ring-2 group-hover:ring-white/30'
                    }`}>
                      <Image
                        src={author.imageUrl}
                        alt={author.name}
                        width={64}
                        height={64}
                        className="w-full h-full rounded-full object-cover shadow-md"
                        loading="lazy"
                      />
                    </div>
                    {/* 선택 표시 */}
                    {currentAvatar === author.imageUrl && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-slate-800 text-xs font-bold">✓</span>
                      </div>
                    )}
                  </div>

                  {/* 작가 이름 - 가로로 표시 */}
                  <div className="text-center">
                    <p className={`text-sm font-medium transition-colors duration-200 ${
                      currentAvatar === author.imageUrl
                        ? 'text-amber-300'
                        : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {author.name}
                    </p>
                  </div>

                  {/* 호버 효과 */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
          </div>
        ))}

        {/* 무한 스크롤 트리거 */}
        {visibleCount < authorAvatars.length && (
          <div ref={ref} className="flex justify-center py-4">
            <div className="w-8 h-8 border-2 border-slate-600 border-t-amber-400 rounded-full animate-spin" />
          </div>
        )}
      </div>


    </div>
  );
}