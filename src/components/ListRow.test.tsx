import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ListRow } from './ListRow';

describe('ListRow', () => {
  it('renders title and subtitle', () => {
    render(<ListRow title="Wilshire Blvd" subtitle="116th St" />);
    expect(screen.getByText('Wilshire Blvd')).toBeInTheDocument();
    expect(screen.getByText('116th St')).toBeInTheDocument();
  });

  it('renders as a button when onClick is supplied and fires it', async () => {
    const onClick = vi.fn();
    render(<ListRow title="Tap me" onClick={onClick} />);
    const btn = screen.getByRole('button', { name: 'Tap me' });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as a div when no onClick is supplied', () => {
    render(<ListRow title="Static" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
