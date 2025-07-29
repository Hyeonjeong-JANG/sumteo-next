import { SignUpForm } from '../../../feature/auth/components/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                📚 숨터
              </span>
            </h1>
            <p className="text-slate-300 text-lg">
              비밀스러운 온라인 독서 공간
            </p>
            <p className="text-slate-400 text-sm mt-2">
              함께 독서하며 성장하는 커뮤니티에 참여하세요
            </p>
          </div>

          <div className="card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">회원가입</h2>
              <p className="text-slate-400">새로운 독서 여행을 시작하세요</p>
            </div>
            
            <SignUpForm />
            
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                이미 계정이 있으신가요?{' '}
                <Link href="/signin" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/space" className="text-slate-400 hover:text-slate-300 text-sm transition-colors">
              👀 로그인 없이 구경하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}