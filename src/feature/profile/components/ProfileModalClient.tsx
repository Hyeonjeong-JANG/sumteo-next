'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { UsernameForm } from '@/feature/profile/components/UsernameForm';
import { AvatarSelector } from '@/feature/profile/components/AvatarSelector';
import type { User, Profile } from '@/shared/types';

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

    useEffect(() => {
        if (!open) {
            router.back();
        }
    }, [open, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="card w-full max-w-4xl max-h-[90vh] flex flex-col">
                <DialogTitle className="sr-only">프로필 설정</DialogTitle>
                <h1 className="page-title mt-4">⚙️ 프로필 설정</h1>
                <div className="grid md:grid-cols-2 gap-6 overflow-y-auto p-1">
                    {/* 기본 정보 카드 */}
                    <div className="card">
                        <h2 className="section-title">기본 정보</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">이메일</label>
                                <div className="bg-slate-700/50 rounded-lg px-4 py-3 border border-slate-600">
                                    <span className="text-slate-200">{user.email}</span>
                                </div>
                            </div>
                            <UsernameForm currentUsername={profile?.username} />
                        </div>
                    </div>

                    {/* 아바타 선택 카드 */}
                    <div className="card">
                        <h2 className="section-title">아바타 선택</h2>
                        <AvatarSelector currentAvatar={profile?.avatar_url} />
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <button onClick={() => setOpen(false)} className="btn-secondary w-full">닫기</button>
                </div>
            </DialogContent>
        </Dialog>
    );
}