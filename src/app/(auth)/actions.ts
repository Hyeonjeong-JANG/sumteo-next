'use server';

import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';

// 회원가입  
export async function signUpAction(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        throw new Error('이메일과 비밀번호를 모두 입력해주세요');
    }

    if (password.length < 6) {
        throw new Error('비밀번호는 6자 이상이어야 합니다');
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    redirect('/signin');
}

// 로그인
export async function signInAction(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        throw new Error('이메일과 비밀번호를 모두 입력해주세요');
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다');
    }

    redirect('/reading-space');
}

// 로그아웃
export async function logoutAction() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error('로그아웃에 실패했습니다');
    }

    redirect('/signin');
}