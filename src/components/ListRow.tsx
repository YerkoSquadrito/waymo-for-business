import type { ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';

type Props = {
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * 56px-min list row used for destinations, calendar suggestions, employee
 * lists, etc. Borderless by default — separated by whitespace per the
 * DESIGN.md guidance.
 */
export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className,
}: Props) {
  const isInteractive = typeof onClick === 'function';
  const Tag = isInteractive ? 'button' : 'div';
  return (
    <Tag
      type={isInteractive ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl bg-transparent px-2 py-3 text-left',
        isInteractive && 'hover:bg-surface-container-low active:bg-surface-container',
        className,
      )}
    >
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-md font-semibold text-on-surface">
          {title}
        </p>
        {subtitle ? (
          <p className="truncate text-body-sm text-on-surface-variant">
            {subtitle}
          </p>
        ) : null}
      </div>
      {trailing ? (
        <div className="shrink-0 text-on-surface-variant">{trailing}</div>
      ) : isInteractive ? (
        <Icon name="chevron_right" className="text-on-surface-variant" />
      ) : null}
    </Tag>
  );
}
