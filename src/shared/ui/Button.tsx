import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../../components/ui/button';

interface LinkButtonProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Link와 Button을 결합한 컴포넌트
 * Next.js의 Link와 shadcn/ui Button의 장점을 모두 활용
 * 
 * @param href - 이동할 경로
 * @param variant - 버튼 스타일 variants (default, secondary, outline 등)
 * @param size - 버튼 크기 (default, sm, lg, icon)
 * @param children - 버튼 내용
 * @param className - 추가 CSS 클래스
 */
export function LinkButton({ 
  href, 
  variant = 'secondary', 
  size = 'sm', 
  children, 
  className 
}: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button 
        variant={variant} 
        size={size} 
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
}
