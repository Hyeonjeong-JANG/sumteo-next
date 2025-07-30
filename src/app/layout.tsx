import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "숨터 | 비밀스러운 온라인 독서 공간",
  description: "다른 사람들과 함께 독서하며 몰입의 시간을 가져보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={notoSansKr.className}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
