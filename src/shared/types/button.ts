export interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  disabled?: boolean;
}

export interface NavigationButtonProps extends BaseButtonProps {
  href: string;
}

export interface ActionButtonProps extends BaseButtonProps {
  onClick: () => void | Promise<void>;
  isLoading?: boolean;
}

export interface FormSubmitButtonProps extends BaseButtonProps {
  isPending?: boolean;
  type?: 'submit' | 'button';
}

export interface AuthButtonProps extends BaseButtonProps {
  action: () => void | Promise<void>;
  type?: 'submit' | 'button';
}

