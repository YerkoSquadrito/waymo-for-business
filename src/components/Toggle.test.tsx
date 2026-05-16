import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('exposes role=switch with the correct aria-checked', () => {
    render(<Toggle label="Sync" checked={true} onChange={() => undefined} />);
    expect(screen.getByRole('switch', { name: 'Sync' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('fires onChange with the toggled value', async () => {
    const onChange = vi.fn();
    render(<Toggle label="Sync" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders the description when supplied', () => {
    render(
      <Toggle
        label="Sync"
        description="Pulls events every 5 min"
        checked={false}
        onChange={() => undefined}
      />,
    );
    expect(screen.getByText('Pulls events every 5 min')).toBeInTheDocument();
  });
});
