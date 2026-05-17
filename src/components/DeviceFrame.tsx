import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Root viewport wrapper. Mobile (< md): transparent passthrough — content
 * fills the viewport edge-to-edge so the PWA feels native. Desktop (>= md):
 * centers the 420px column inside a phone-shaped bezel with a dim outer
 * background, so the same code reads as a mobile preview on a laptop.
 *
 * The desktop inner container owns the vertical scroll (`overflow-y-auto`),
 * which is what lets `TopAppBar` / `BottomNavBar` use `sticky` and pin to
 * the *inside* of the phone instead of escaping to the desktop viewport.
 */
export function DeviceFrame({ children, className }: Props) {
  return (
    <div className="bg-background md:flex md:min-h-dvh md:items-center md:justify-center md:bg-surface-dim md:p-6">
      <div
        className={cn(
          'relative mx-auto flex min-h-dvh w-full max-w-mobile flex-col bg-background',
          'md:mx-0 md:min-h-0 md:h-[min(900px,calc(100dvh-3rem))] md:overflow-y-auto md:rounded-[44px] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.30)] md:ring-1 md:ring-on-surface/10',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
