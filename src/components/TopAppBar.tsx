import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';

type Props = {
  title?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

/**
 * 64px fixed top bar. Matches the Stitch pattern across all four reference
 * screens, with two corrections from the UI audit:
 *   - Title uses on-surface, not primary (real Waymo neutralizes the header).
 *   - The decorative notifications bell is removed by default; pass an
 *     explicit `trailing` slot if a screen genuinely needs an action there.
 */
export function TopAppBar({ title, leading, trailing, className }: Props) {
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-surface px-margin-sm',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {leading ?? <Icon name="menu" className="text-on-surface-variant" />}
        {title ? (
          <h1 className="text-headline-lg-mobile font-semibold text-on-surface">
            {title}
          </h1>
        ) : null}
      </div>
      <div className="flex items-center gap-2">{trailing}</div>
    </header>
  );
}
