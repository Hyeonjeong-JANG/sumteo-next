// src/app/(auth)/layout.tsx
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-main">
      <div className="container-content">
        <div className="max-w-md mx-auto">
          <div className="page-header">
            <Link href="/">
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-warm-accent to-accent-color bg-clip-text">
                  📚 숨터
                </span>
              </h1>
            </Link>
            <p className="text-secondary-text text-lg">
              비밀스러운 온라인 독서 공간
            </p>
          </div>

          <div className="card">
            {children}
          </div>

          <div className="text-center mt-8">
            <Link href="/reading-space" className="text-secondary-text hover:text-primary-text text-sm transition-colors">
              👀 로그인 없이 구경하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}