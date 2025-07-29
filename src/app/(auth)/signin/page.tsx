import { SignInForm } from '../../../feature/auth/components/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
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
              다른 사람들과 함께 독서하며 몰입의 시간을 가져보세요
            </p>
          </div>

          <div className="card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-white mb-2">로그인</h2>
              <p className="text-slate-400">독서실에 입장하세요</p>
            </div>
            
            <SignInForm />
            
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                아직 계정이 없으신가요?{' '}
                <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  회원가입하기
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