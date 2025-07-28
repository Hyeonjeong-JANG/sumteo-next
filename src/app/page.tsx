import { redirect } from 'next/navigation';

export default function HomePage() {
  // 인덱스 페이지에 접속하면 바로 /space로 보냄
  redirect('/space');
}