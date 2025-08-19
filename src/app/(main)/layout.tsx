import Image from 'next/image';

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="container-main">
      <div className="container-content">
        {/* 헤더 영역 */}
        <header className="page-header text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative group">
              <Image 
                src="/icons/book-neon.png" 
                alt="숨터 로고" 
                width={48} 
                height={48} 
                className="hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              />
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                숨터
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl lg:text-2xl text-slate-300 font-light leading-relaxed mb-4">
              당신만의 특별한 온라인 독서 공간
            </p>
            <p className="text-slate-400">
              조용하고 아늑한 분위기에서 책과 함께하는 시간을 만들어보세요
            </p>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="animate-slide-up">
          {children}
        </main>
        
        {/* 모달 */}
        {modal}
        
        {/* 배경 장식 요소 */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-400/3 to-pink-400/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </div>
  );
}   