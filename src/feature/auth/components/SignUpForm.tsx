"use client";

import { signUpAction } from '../../../app/(auth)/actions';

export function SignUpForm() {

    return (
        <form action={signUpAction}>
            <input
                name="email"
                className="input-field"
                placeholder="이메일을 입력해주세요"
                required
            />
            <input
                name="password"
                type="password"
                className="input-field"
                placeholder="비밀번호를 입력해주세요"
                required
            />
            <button type="submit">
                회원가입
            </button>
        </form>
    );
}