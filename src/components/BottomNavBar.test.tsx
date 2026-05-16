import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { BottomNavBar } from './BottomNavBar';

function renderAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <BottomNavBar />
    </MemoryRouter>,
  );
}

describe('BottomNavBar', () => {
  it('marks Home active on /app/home', () => {
    renderAt('/app/home');
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toHaveAttribute('aria-current', 'page');
  });

  it('keeps Business active on nested business routes', () => {
    renderAt('/app/business/connect');
    const business = screen.getByRole('link', { name: /business/i });
    expect(business).toHaveAttribute('aria-current', 'page');
  });

  it('marks Account active on /app/account', () => {
    renderAt('/app/account');
    const account = screen.getByRole('link', { name: /account/i });
    expect(account).toHaveAttribute('aria-current', 'page');
  });

  it('renders all four tabs', () => {
    renderAt('/app/home');
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
});
