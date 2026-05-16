import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconBadge } from './IconBadge';

describe('IconBadge', () => {
  it('renders the icon name', () => {
    render(<IconBadge icon="calendar_today" />);
    expect(screen.getByText('calendar_today')).toBeInTheDocument();
  });

  it('applies the requested tone', () => {
    const { container } = render(<IconBadge icon="check" tone="tertiary" />);
    expect(container.firstChild).toHaveClass('bg-tertiary-container');
  });

  it('switches to a circle when shape=circle', () => {
    const { container } = render(<IconBadge icon="check" shape="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });
});
