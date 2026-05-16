import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Left-side accent bar (Stitch uses this to denote a work-related trip). */
  accent?: boolean;
  /** Apply the glass treatment — only sensible over a map background. */
  glass?: boolean;
  padding?: 'sm' | 'md' | 'lg';
};

const PADDING_CLASSES: Record<NonNullable<Props['padding']>, string> = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-margin-lg',
};

export function Card({
  children,
  accent = false,
  glass = false,
  padding = 'md',
  className,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        'relative rounded-2xl shadow-card',
        glass ? 'glass-card' : 'bg-surface-container-lowest',
        accent && 'border-l-4 border-l-secondary',
        PADDING_CLASSES[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
