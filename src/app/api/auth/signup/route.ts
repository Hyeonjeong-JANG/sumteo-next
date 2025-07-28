// 일반 이메일/비밀번호 회원가입 처리
import { createClient } from '../../../../../lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    console.log("API 호출됨");
    const supabase = await createClient();
    const {email, password} = await request.json();

    if(!email || !password){
        return NextResponse.json(
            {error: "이메일과 비밀번호를 모두 입력해주세요"},
            {status: 400}
        )
    }

    if(password.length < 6){
        return NextResponse.json(
            {error: "비밀번호는 6자 이상이어야 합니다"},
            {status: 400}
        );
    }

    const {error} = await supabase.auth.signUp({
        email,
        password,
    });

    if(error){
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        );
    }

    return NextResponse.json(
        {message: "회원가입 성공"}, 
        {status: 200}
    );
}