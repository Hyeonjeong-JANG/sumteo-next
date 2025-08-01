'use client';

import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

export function UsernameForm({ currentUsername, handleSubmit, isPending }: { currentUsername?: string, handleSubmit: (formData: FormData) => void, isPending: boolean }) {

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center gap-2">
                <h2 className="section-title mb-0 pr-4 flex-shrink-0">닉네임</h2>
                <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={currentUsername || ''}
                    className="input-field w-full"
                    placeholder="새로운 닉네임을 입력하세요"
                />
                <button
                    type="submit"
                    className="btn-primary p-2 ml-2 whitespace-nowrap min-w-[90px] flex justify-center"
                    disabled={isPending}
                >
                    {isPending ? <LoadingSpinner /> : '저장'}
                </button>
            </div>

        </form>
    );
}