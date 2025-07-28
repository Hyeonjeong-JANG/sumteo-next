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
            if(!response.ok){
                setError(data.error || "회원가입에 실패했습니다")
            }else{
                alert('회원가입 성공!\n 이메일에서 확인을 누르면 로그인 할 수 있습니다.\n로그인 페이지로 이동합니다.'); // TODO: 말이 이상함
                router.push('/signin');
            }
            setLoading(false);
    };

    // 로그인
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        const response = await fetch(
            "/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if(!response.ok){
                setError(data.error || "로그인에 실패했습니다");
            }else{
                alert('로그인 성공! 독서 공간으로 이동합니다');
                router.push('/space');
                router.refresh();
            }
            setLoading(false);
        };

        // 로그아웃
        const signOut = async () => {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/auth/logout', { method: 'POST' });
          
            if (!response.ok) {
              setError('로그아웃에 실패했습니다.');
            } else {
              router.push('/signin');
              router.refresh();
            }
            setLoading(false);
          };
        
    return {
        signUp,
        signIn,
        signOut,
        loading,
        error,
    }
}