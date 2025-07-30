"use client";

import { signInAction } from '../../../app/(auth)/actions';

export function SignInForm() {
    return (
        <form action={signInAction} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    이메일
                </label>
                <input
                    name='email'
                    className="input-field"
                    placeholder="이메일을 입력해주세요"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    비밀번호
                </label>
                <input
                    name="password"
                    type="password"
                    className="input-field"
                    placeholder="비밀번호를 입력해주세요"
                    required
                />
            </div>

            <button
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                🚪 로그인
            </button>
        </form>
    );
}