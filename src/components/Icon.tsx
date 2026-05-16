import { cn } from '@/lib/cn';

type Props = {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
};

/**
 * Material Symbols Outlined wrapper. Loaded from the Google Fonts CDN
 * in index.html — see the note in tasks/todo.md about subsetting later.
 */
export function Icon({ name, filled = false, className, size = 24 }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn('material-symbols-outlined select-none leading-none', className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
    >
      {name}
    </span>
  );
}
