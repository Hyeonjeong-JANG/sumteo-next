import { SignUpForm } from '../../../feature/auth/components/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div>
      <SignUpForm />
      <p>
        이미 계정이 있으신가요? <Link href="/signin">로그인</Link>
      </p>
    </div>
  );
}