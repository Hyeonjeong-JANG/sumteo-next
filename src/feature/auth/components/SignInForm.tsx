"use client";

import { useAuth } from "../hooks/useAuth";
import { useState } from 'react';

export function SignInForm() {
    const { signIn, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    이메일
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    비밀번호
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    required
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>로그인 중...</span>
                    </div>
                ) : (
                    '🚪 로그인'
                )}
            </button>
        </form>
    );
}