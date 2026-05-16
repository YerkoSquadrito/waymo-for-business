import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>SUGGESTED</Chip>);
    expect(screen.getByText('SUGGESTED')).toBeInTheDocument();
  });

  it('uses filter variant by default', () => {
    render(<Chip>x</Chip>);
    expect(screen.getByText('x')).toHaveClass('border-outline-variant');
  });

  it('applies the status-success palette when requested', () => {
    render(<Chip variant="status-success">Arrived</Chip>);
    expect(screen.getByText('Arrived')).toHaveClass('bg-tertiary-container');
  });
});
