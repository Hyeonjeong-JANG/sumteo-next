'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect, useTransition } from 'react';
import { UsernameForm } from '@/feature/profile/components/UsernameForm';
import { AvatarSelector } from '@/feature/profile/components/AvatarSelector';
import type { User, Profile } from '@/shared/types';
import toast from 'react-hot-toast';
import { updateAvatarAction, updateUsernameAction } from '@/app/(main)/actions';

interface ProfileModalClientProps {
    user: User;
    profile: Profile | null;
}

export function ProfileModalClient({
    user,
    profile,
}: ProfileModalClientProps) {
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const [isUsernamePending, startUsernameTransition] = useTransition();
    const [isAvatarPending, startAvatarTransition] = useTransition();

    useEffect(() => {
        if (!open) {
            router.back();
        }
    }, [open, router]);

    // 닉네임 저장
    const handleUsernameSubmit = (formData: FormData) => {
        startUsernameTransition(async () => {
            const result = await updateUsernameAction(formData);
            if (result.success) toast.success(result.message);
            else toast.error(result.message);
        });
    };

    // 아바타 저장
    const handleAvatarClick = (imageUrl: string) => {
        startAvatarTransition(async () => {
            const result = await updateAvatarAction(imageUrl);
            if (result.success) toast.success(result.message);
            else toast.error(result.message);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="card-elevated w-full max-w-4xl max-h-[90vh] flex flex-col animate-scale-in">
                <DialogTitle className="sr-only">프로필 설정</DialogTitle>
                
                {/* 모달 헤더 */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">⚙️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gradient-accent mb-2">프로필 설정</h1>
                    <p className="text-text-secondary">나만의 독서 프로필을 만들어보세요</p>
                </div>

                {/* 모달 콘텐츠 */}
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-8">
                        <div className="card bg-white/5">
                            <h2 className="subsection-title flex items-center gap-2 mb-6">
                                <span className="text-xl">👤</span>
                                사용자 정보
                            </h2>
                            <UsernameForm
                                currentUsername={profile?.username}
                                isPending={isUsernamePending}
                                handleSubmit={handleUsernameSubmit}
                            />
                        </div>

                        <div className="card bg-white/5">
                            <h2 className="subsection-title flex items-center gap-2 mb-6">
                                <span className="text-xl">🎭</span>
                                아바타 선택
                            </h2>
                            <AvatarSelector
                                currentAvatar={profile?.avatar_url}
                                isPending={isAvatarPending}
                                handleAvatarClick={handleAvatarClick}
                            />
                        </div>
                    </div>
                </div>

                {/* 모달 푸터 */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setOpen(false)} 
                            className="btn-secondary flex-1 group"
                        >
                            <span className="mr-2 group-hover:rotate-12 transition-transform duration-300">✨</span>
                            설정 완료
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}