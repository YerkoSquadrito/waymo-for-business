import { Icon } from './Icon';
import { cn } from '@/lib/cn';

type Tone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'primary-fixed';

type Props = {
  icon: string;
  tone?: Tone;
  shape?: 'square' | 'circle';
  size?: 'sm' | 'md';
  filled?: boolean;
  className?: string;
};

const TONE_CLASSES: Record<Tone, string> = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  neutral: 'bg-surface-container text-on-surface-variant',
  'primary-fixed': 'bg-primary-fixed text-on-primary-fixed',
};

const SIZE_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
};

const ICON_SIZE: Record<NonNullable<Props['size']>, number> = {
  sm: 18,
  md: 22,
};

/**
 * Tinted square/circle wrapping a Material Symbol. Used as the leading
 * affordance on ListRow, card headers, and feature highlights. The Stitch
 * designs use this pattern inconsistently — the audit recommends extracting
 * it into a single component, which is what we do here.
 */
export function IconBadge({
  icon,
  tone = 'neutral',
  shape = 'square',
  size = 'md',
  filled = false,
  className,
}: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        shape === 'circle' ? 'rounded-full' : 'rounded-xl',
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        className,
      )}
    >
      <Icon name={icon} filled={filled} size={ICON_SIZE[size]} />
    </span>
  );
}
