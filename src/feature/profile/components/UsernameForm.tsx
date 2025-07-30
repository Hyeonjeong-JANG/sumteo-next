'use client';

import toast from 'react-hot-toast';
import { updateUsernameAction } from '../../../app/(main)/actions';
import { useTransition } from 'react';

export function UsernameForm({ currentUsername }: { currentUsername?: string }) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await updateUsernameAction(formData);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                    닉네임
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={currentUsername || ''}
                    className="input-field"
                    placeholder="새로운 닉네임을 입력하세요"
                />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isPending}>
                {isPending ? '저장 중...' : '💾 닉네임 저장'}
            </button>
        </form>
    );
}