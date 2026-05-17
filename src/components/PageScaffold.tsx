import type { ReactNode } from 'react';
import { TopAppBar } from './TopAppBar';
import { BottomNavBar } from './BottomNavBar';
import { cn } from '@/lib/cn';

type Props = {
  title?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
  /** Hide the top app bar (e.g. full-bleed map screens like /app/book). */
  hideTopBar?: boolean;
  /** Hide the bottom nav (e.g. onboarding/confirmation modal-style screens). */
  hideBottomNav?: boolean;
  className?: string;
};

/**
 * Mobile shell. Composes TopAppBar + scrollable main + BottomNavBar.
 * Width-constraint and desktop chrome are handled by <DeviceFrame> at the
 * router root, so this component is purely about screen-level layout.
 * Screens that need full-bleed map UI can hide the top bar.
 */
export function PageScaffold({
  title,
  leading,
  trailing,
  children,
  hideTopBar = false,
  hideBottomNav = false,
  className,
}: Props) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col md:min-h-0">
      {hideTopBar ? null : (
        <TopAppBar title={title} leading={leading} trailing={trailing} />
      )}
      <main
        className={cn(
          'flex-1 px-container-padding',
          hideTopBar ? 'pt-2' : 'pt-4',
          hideBottomNav ? 'pb-margin-lg' : 'pb-6',
          className,
        )}
      >
        {children}
      </main>
      {hideBottomNav ? null : <BottomNavBar />}
    </div>
  );
}
