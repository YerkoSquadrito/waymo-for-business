import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Book from './book';
import { useStore } from '@/store';

function renderBook(path = '/app/book?dest=hq') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/app/book" element={<Book />} />
        <Route path="/app/home" element={<div data-testid="home-page" />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('/app/book', () => {
  beforeEach(() => useStore.getState().reset());
  afterEach(() => useStore.getState().reset());

  it('shows Apple Pay + USD price when the user is not corp-verified', () => {
    renderBook();
    expect(screen.getByText(/apple pay/i)).toBeInTheDocument();
    expect(screen.getByText(/USD 29.79/i)).toBeInTheDocument();
  });

  it('shows "Billed to Acme HQ" when the user is corp-verified', () => {
    useStore.getState().verifyCorpEmail('me@acme.com');
    renderBook();
    expect(screen.getByText(/billed to acme hq/i)).toBeInTheDocument();
    expect(screen.getByText(/covered/i)).toBeInTheDocument();
  });

  it('requesting a ride appends to the store and shows the confirmed sheet', async () => {
    const initial = useStore.getState().rides.length;
    renderBook();
    await userEvent.click(screen.getByRole('button', { name: /request ride/i }));
    expect(useStore.getState().rides.length).toBe(initial + 1);
    expect(screen.getByText(/waymo is on the way/i)).toBeInTheDocument();
  });

  it('corp-paid ride lands with paidBy: employer in the store', async () => {
    useStore.getState().verifyCorpEmail('me@acme.com');
    renderBook();
    await userEvent.click(screen.getByRole('button', { name: /request ride/i }));
    expect(useStore.getState().rides[0]?.paidBy).toBe('employer');
  });
});
