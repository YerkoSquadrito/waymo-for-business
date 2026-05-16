import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'business';
type Size = 'lg' | 'md';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leading?: ReactNode;
  trailing?: ReactNode;
  fullWidth?: boolean;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-primary text-on-primary shadow-card hover:bg-primary-container active:bg-primary-container',
  secondary:
    'border-2 border-outline-variant text-on-surface-variant bg-transparent hover:bg-surface-container',
  business:
    'bg-business-action text-on-primary shadow-card hover:opacity-95 active:opacity-90',
};

const SIZE_CLASSES: Record<Size, string> = {
  lg: 'h-14 text-headline-lg-mobile font-semibold',
  md: 'h-11 text-body-md font-semibold',
};

/**
 * Canonical pill CTA. Standardized per the UI audit:
 *   - All variants are pill-shaped (`rounded-full`).
 *   - `size=lg` is the default and matches the real Waymo primary CTA
 *     (56px, weight 700).
 *   - Press treatment: `active:scale-[0.98]` consistent across variants.
 */
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'lg',
    leading,
    trailing,
    fullWidth = true,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 transition-all active:scale-[0.98]',
        fullWidth ? 'w-full' : 'w-auto',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {leading}
      <span>{children}</span>
      {trailing}
    </button>
  );
});
