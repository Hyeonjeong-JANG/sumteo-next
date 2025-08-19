import { SignInForm } from '../../../feature/auth/components/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <SignInForm />
        
        {/* 회원가입 링크 */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-primary-900 text-text-tertiary">또는</span>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-text-secondary mb-4">
              처음이신가요?
            </p>
            <Link href="/signup">
              <button className="btn-secondary w-full group">
                <span className="mr-2 group-hover:scale-110 transition-transform duration-300">✨</span>
                새로운 독서 여정 시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}