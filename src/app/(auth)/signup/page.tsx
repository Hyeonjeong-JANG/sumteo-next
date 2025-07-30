import { SignUpForm } from '../../../feature/auth/components/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">회원가입</h2>
        <p className="text-slate-400">숨터 멤버가 되어보세요</p>
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
    </>
  );
}