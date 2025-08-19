"use client";

import { signInAction } from '../../../app/(auth)/actions';
import { useState } from 'react';

export function SignInForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await signInAction(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card-elevated max-w-md mx-auto animate-scale-in">
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-gradient-brand mb-2">
                    다시 만나서 반갑습니다
                </h2>
                <p className="text-text-secondary">
                    독서 여정을 계속해보세요
                </p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-3">
                        이메일 주소
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`input-field w-full pl-12 pr-4 py-4 text-lg transition-all duration-300 ${
                                focusedField === 'email' 
                                    ? 'ring-2 ring-brand-400/50 border-brand-400/50 bg-white/10' 
                                    : ''
                            }`}
                            placeholder="your@email.com"
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-3">
                        비밀번호
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`input-field w-full pl-12 pr-4 py-4 text-lg transition-all duration-300 ${
                                focusedField === 'password' 
                                    ? 'ring-2 ring-brand-400/50 border-brand-400/50 bg-white/10' 
                                    : ''
                            }`}
                            placeholder="••••••••"
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full text-lg py-4 mt-8 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="loading-spinner w-5 h-5" />
                            <span>로그인 중...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3">
                            <span className="group-hover:scale-110 transition-transform duration-300">🚪</span>
                            <span>독서실로 입장하기</span>
                        </div>
                    )}
                </button>
            </form>

            {/* 추가 옵션 */}
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center space-y-4">
                    <button className="text-text-tertiary hover:text-brand-400 text-sm transition-colors duration-200">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>
            </div>
        </div>
    );
}