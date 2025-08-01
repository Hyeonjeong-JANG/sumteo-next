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
            <DialogContent className="card w-full max-w-6xl max-h-[90vh] flex flex-col">
                <DialogTitle className="sr-only">프로필 설정</DialogTitle>
                <h1 className="page-title mt-4">프로필 설정</h1>
                <div className="grid md:grid-cols-1 gap-6 p-1">
                    <div className="card">
                        <div className="space-y-6">
                            <UsernameForm
                                currentUsername={profile?.username}
                                isPending={isUsernamePending}
                                handleSubmit={handleUsernameSubmit}
                            />
                            <AvatarSelector
                                currentAvatar={profile?.avatar_url}
                                isPending={isAvatarPending}
                                handleAvatarClick={handleAvatarClick}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <button onClick={() => setOpen(false)} className="btn-secondary w-full">닫기</button>
                </div>
            </DialogContent>
        </Dialog>
    );
}