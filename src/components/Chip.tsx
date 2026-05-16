import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant =
  | 'filter'
  | 'status-success'
  | 'status-info'
  | 'status-warning'
  | 'status-error';

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: Variant;
  leading?: ReactNode;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  filter:
    'border border-outline-variant bg-transparent text-on-surface-variant',
  'status-success': 'bg-tertiary-container text-on-tertiary-container',
  'status-info': 'bg-secondary-container text-on-secondary-container',
  'status-warning': 'bg-primary-fixed text-on-primary-fixed',
  'status-error': 'bg-error-container text-on-error-container',
};

/**
 * Pill chip. Two flavors: `filter` (outline, neutral) and `status-*`
 * (tinted-container with on-container text).
 */
export function Chip({
  variant = 'filter',
  leading,
  children,
  className,
  ...rest
}: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-label-bold',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {leading}
      {children}
    </span>
  );
}
