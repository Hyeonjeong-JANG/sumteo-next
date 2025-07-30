import { SignInForm } from '../../../feature/auth/components/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <>
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
    </>
  );
}