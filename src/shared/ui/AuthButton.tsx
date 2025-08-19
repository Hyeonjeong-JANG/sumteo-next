import { Button } from "@/components/ui/button";
import { AuthButtonProps } from "../types/button";

export function AuthButton({ 
  action, 
  type = 'submit',
  variant = 'default',
  size = 'default',
  children,
  disabled = false,
  className = ''
}: AuthButtonProps) {
  return (
    <form action={action}>
      <Button 
        type={type} 
        variant={variant}
        size={size}
        disabled={disabled}
        className={className}
      >
        {children}
      </Button>
    </form>
  );
}