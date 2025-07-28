"use client";

import { useAuth } from "../hooks/useAuth";

export function SignUpForm(){
    const {signUp, loading, error} = useAuth();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(email, password);
        signUp(email, password);
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="이메일" required />
            <input type="password" name="password" placeholder="비밀번호" required />
            <button type="submit" disabled={loading}>
                {loading ? "회원가입 중..." : "회원가입"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
}