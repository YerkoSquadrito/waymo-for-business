import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  leadingIcon?: ReactNode;
  hint?: string;
  error?: string;
};

/**
 * Filled text field. Matches the connect_corporate_account form pattern:
 * uppercase label, `surface-container` fill, leading icon slot, focus ring
 * in primary blue.
 */
export const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
  { label, leadingIcon, hint, error, className, id, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const describedById = hint || error ? `${inputId}-desc` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block uppercase tracking-[0.05em] text-label-bold text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={describedById}
          aria-invalid={error ? true : undefined}
          className={cn(
            'w-full rounded-xl border-none bg-surface-container py-4 pr-4 text-body-md text-on-surface placeholder:text-on-surface-variant/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary',
            leadingIcon ? 'pl-12' : 'pl-4',
            error && 'ring-2 ring-error',
            className,
          )}
          {...rest}
        />
      </div>
      {error ? (
        <p id={describedById} className="text-body-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={describedById} className="text-body-sm text-on-surface-variant">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
