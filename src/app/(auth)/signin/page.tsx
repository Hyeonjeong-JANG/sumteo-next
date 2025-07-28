import { SignInForm } from '../../../feature/auth/components/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
      <p>
        계정이 없으신가요? <Link href="/signup">회원가입</Link>
      </p>
    </div>
  );
}