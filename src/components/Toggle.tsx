import { useId } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Switch with leading label/description and trailing toggle thumb. Matches
 * the sync_calendar "Optimize for Productivity" row, but rendered as a
 * neutral row — the UI audit recommends dropping the loud purple panel
 * around it.
 */
export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className,
}: Props) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center justify-between gap-4 py-3',
        disabled && 'opacity-50',
        className,
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-body-md font-semibold text-on-surface">
          {label}
        </span>
        {description ? (
          <span className="mt-1 block text-body-sm text-on-surface-variant">
            {description}
          </span>
        ) : null}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-outline-variant',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-6 w-6 rounded-full bg-surface-container-lowest shadow-card transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
    </label>
  );
}
