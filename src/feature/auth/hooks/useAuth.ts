import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 회원가입
    const signUp = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        const response = await fetch(
            "/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if(response.ok){
                setError(data.error || "회원가입에 실패했습니다")
            }else{
                alert('회원가입 성공! 로그인 페이지로 이동합니다.');
                router.push('/login');
            }
            setLoading(false);
    };
        
    return {
        signUp,
        loading,
        error,
    }
}