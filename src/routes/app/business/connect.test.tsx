import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import Connect from './connect';
import { useStore } from '@/store';

function renderConnect() {
  return render(
    <MemoryRouter initialEntries={['/app/business/connect']}>
      <Routes>
        <Route path="/app/business/connect" element={<Connect />} />
        <Route
          path="/app/business/calendar"
          element={<div data-testid="calendar-page">CALENDAR</div>}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('/app/business/connect', () => {
  afterEach(() => useStore.getState().reset());

  it('rejects a personal email', async () => {
    renderConnect();
    await userEvent.type(
      screen.getByLabelText(/work email address/i),
      'me@gmail.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /verify email/i }));
    expect(
      screen.getByText(/use your company email/i),
    ).toBeInTheDocument();
    expect(useStore.getState().user).toBeNull();
  });

  it('verifies a corporate email and navigates to /app/business/calendar', async () => {
    renderConnect();
    await userEvent.type(
      screen.getByLabelText(/work email address/i),
      'me@acme.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /verify email/i }));
    expect(useStore.getState().user).toEqual({
      email: 'me@acme.com',
      corpVerified: true,
    });
    expect(await screen.findByTestId('calendar-page')).toBeInTheDocument();
  });
});
