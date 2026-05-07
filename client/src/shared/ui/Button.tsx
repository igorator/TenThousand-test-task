import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router';
import { Spinner } from '@/shared/components/Spinner';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  loadingText?: string;
  to?: string;
}

const DISABLED_CLASSES =
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: `bg-gradient-primary text-white hover:[background:white] hover:text-black ${DISABLED_CLASSES}`,
  secondary: `border border-border text-text-muted hover:bg-surface-raised ${DISABLED_CLASSES}`,
  ghost: `text-primary hover:text-primary-dark ${DISABLED_CLASSES}`,
};

export function Button({
  variant = 'primary',
  isLoading,
  loadingText,
  disabled,
  children,
  className = '',
  to,
  ...props
}: ButtonProps) {
  const classes = `flex justify-center items-center text-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${VARIANT_CLASSES[variant]} ${className}`;

  const content = isLoading ? (
    <span className="flex items-center gap-2">
      <Spinner size="sm" />
      {loadingText ?? children}
    </span>
  ) : (
    children
  );

  if (to !== undefined) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}
