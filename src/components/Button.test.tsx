import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    render(<Button>Confirm</Button>);
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies primary variant by default', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('applies the business variant when requested', () => {
    render(<Button variant="business">Switch profile</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-business-action');
  });

  it('defaults to type="button" to avoid accidental form submits', () => {
    render(<Button>Tap</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
