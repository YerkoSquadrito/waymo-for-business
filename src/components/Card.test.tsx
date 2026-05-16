import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>hello</Card>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders an accent bar when accent=true', () => {
    render(<Card accent>x</Card>);
    expect(screen.getByText('x')).toHaveClass('border-l-4');
  });

  it('applies glass class only when glass=true', () => {
    const { rerender } = render(<Card>x</Card>);
    expect(screen.getByText('x')).not.toHaveClass('glass-card');
    rerender(<Card glass>x</Card>);
    expect(screen.getByText('x')).toHaveClass('glass-card');
  });
});
