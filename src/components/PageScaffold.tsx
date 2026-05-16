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
 * Mobile shell. Composes TopAppBar + scrollable main + BottomNavBar with
 * the correct safe-area math so screens never have to re-implement layout.
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
    <div className="mx-auto flex min-h-dvh max-w-mobile flex-col bg-background">
      {hideTopBar ? null : (
        <TopAppBar title={title} leading={leading} trailing={trailing} />
      )}
      <main
        className={cn(
          'flex-1 px-container-padding',
          hideTopBar ? 'pt-0' : 'pt-20',
          hideBottomNav ? 'pb-margin-lg' : 'pb-32',
          className,
        )}
      >
        {children}
      </main>
      {hideBottomNav ? null : <BottomNavBar />}
    </div>
  );
}
