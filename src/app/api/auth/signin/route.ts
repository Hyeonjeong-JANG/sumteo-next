// 일반 이메일/비밀번호 로그인 처리// 일반 이메일/비밀번호 로그인 처리
import { createClient } from '../../../../../lib/supabase/server';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    console.log("로그인 API 호출됨");
    const supabase = await createClient();

    const {email, password}= await request.json();
    console.log(email, password);

    if(!email || !password){
        return NextResponse.json(
            {error:"이메일과 비밀번호를 모두 입력해주세요"},
            {status: 400}
        );
    }

    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error){
        return NextResponse.json(
            {error: "이메일 또는 비밀번호가 일치하지 않습니다"},
            {status: 401},
        );
    }

    return NextResponse.json({message: "로그인 성공"}, {status: 200});
}