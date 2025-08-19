import Link from "next/link";
import { Button } from "../../components/ui/button";
import { NavigationButtonProps } from "../types/button";

export function NavigationButton({ 
  href, 
  children, 
  variant = 'secondary' 
}: NavigationButtonProps) {
  return (
    <Link href={href}>
      <Button variant={variant}>{children}</Button>
    </Link>
  );
}