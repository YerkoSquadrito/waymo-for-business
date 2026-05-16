import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextField label="Work email" />);
    expect(screen.getByLabelText('Work email')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'a@b.com');
    expect(input).toHaveValue('a@b.com');
  });

  it('shows an error message and marks aria-invalid', () => {
    render(<TextField label="Email" error="Must be a company address" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Must be a company address')).toBeInTheDocument();
  });

  it('shows a hint when provided', () => {
    render(<TextField label="Email" hint="Use your work address" />);
    expect(screen.getByText('Use your work address')).toBeInTheDocument();
  });
});
