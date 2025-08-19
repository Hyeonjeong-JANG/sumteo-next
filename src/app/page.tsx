import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-2xl">
        {/* 헤더 */}
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent mb-4">
            숨터
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            당신만의 특별한 온라인 독서 공간에 오신 것을 환영합니다
          </p>
        </div>

        {/* 버튼들 */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <button className="bg-gradient-to-r from-amber-400 to-amber-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 w-full sm:w-auto text-lg">
                🚪 로그인하기
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-200 w-full sm:w-auto text-lg">
                ✨ 회원가입하기
              </button>
            </Link>
          </div>
          
          <div className="pt-4">
            <Link href="/reading-space">
              <button className="text-amber-400 hover:text-amber-300 underline">
                👀 먼저 둘러보기 (로그인 없이)
              </button>
            </Link>
          </div>
        </div>

        {/* 설명 */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg p-6 text-left space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">✨ 숨터에서 할 수 있는 것들</h2>
          <div className="grid gap-3 text-slate-300">
            <div className="flex items-center gap-3">
              <span className="text-amber-400">📖</span>
              <span>다른 사람들과 함께 독서하며 집중력 향상</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">📊</span>
              <span>독서 시간과 출석을 기록하고 관리</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">👥</span>
              <span>독서 커뮤니티에서 동기부여 받기</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-400">🎯</span>
              <span>개인별 독서 목표 설정 및 달성</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}