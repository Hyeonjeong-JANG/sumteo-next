import Image from 'next/image';

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-start justify-center gap-2">
            <Image src="/icons/lock-door-neon.png" alt="lock-door" width={30} height={30} />
            <h1 className="page-title">숨터</h1>
          </div>
          <p className="text-xl text-slate-300 mb-6">
            비밀스러운 온라인 독서 공간에 오신 것을 환영합니다
          </p>
        </div>
        {children}
        {modal}
      </div>
    </div>
  );
}   