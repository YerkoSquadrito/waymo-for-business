import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Anchored bottom sheet — matches the real Waymo booking screen
 * (img_7696). Always-visible white surface with a grab handle, rounded
 * top corners only, and safe-area-aware padding.
 */
export function BottomSheet({ children, className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-mobile rounded-t-3xl bg-surface-container-lowest shadow-[0_-12px_32px_rgba(0,0,0,0.08)]',
        className,
      )}
    >
      <div className="flex justify-center pt-3">
        <span
          aria-hidden
          className="block h-1 w-10 rounded-full bg-outline-variant"
        />
      </div>
      <div className="px-container-padding pb-safe pt-4">{children}</div>
    </div>
  );
}
