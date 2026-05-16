import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EndpointInfo = {
  label: string;
  detail?: ReactNode;
  time?: string;
};

type Props = {
  pickup: EndpointInfo;
  destination: EndpointInfo;
  className?: string;
};

/**
 * Pickup → destination vertical timeline with a dotted connector.
 * Extracted from the inlined pattern in schedule_confirmation/code.html.
 */
export function TripVisualizer({ pickup, destination, className }: Props) {
  return (
    <div className={cn('relative flex flex-col gap-6', className)}>
      <EndpointRow endpoint={pickup} tone="primary" />
      <div
        aria-hidden
        className="absolute left-[11px] top-6 h-[calc(100%-3rem)] w-px border-l-2 border-dotted border-outline-variant"
      />
      <EndpointRow endpoint={destination} tone="tertiary" />
    </div>
  );
}

function EndpointRow({
  endpoint,
  tone,
}: {
  endpoint: EndpointInfo;
  tone: 'primary' | 'tertiary';
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          'mt-1 h-6 w-6 shrink-0 rounded-full border-4',
          tone === 'primary'
            ? 'border-primary bg-surface-container-lowest'
            : 'border-tertiary bg-surface-container-lowest',
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-md font-semibold text-on-surface">
          {endpoint.label}
        </p>
        {endpoint.detail ? (
          <p className="truncate text-body-sm text-on-surface-variant">
            {endpoint.detail}
          </p>
        ) : null}
      </div>
      {endpoint.time ? (
        <p className="shrink-0 text-body-md font-semibold text-on-surface">
          {endpoint.time}
        </p>
      ) : null}
    </div>
  );
}
