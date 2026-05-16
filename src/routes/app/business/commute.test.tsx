import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Commute from './commute';
import Confirm from './confirm';
import { useStore } from '@/store';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/app/business/commute" element={<Commute />} />
        <Route path="/app/business/confirm" element={<Confirm />} />
        <Route
          path="/app/business/calendar"
          element={<div data-testid="calendar-page" />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('commute scheduler', () => {
  beforeEach(() => {
    useStore.getState().reset();
    useStore.getState().verifyCorpEmail('me@acme.com');
    useStore.getState().connectCalendar('google');
  });
  afterEach(() => useStore.getState().reset());

  it('renders the weekly grid when the calendar is connected', () => {
    renderAt('/app/business/commute');
    expect(screen.getByText(/your weekly commute/i)).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Friday')).toBeInTheDocument();
  });

  it('redirects to /app/business/calendar when the calendar is not connected', () => {
    useStore.getState().disconnectCalendar();
    renderAt('/app/business/commute');
    expect(screen.getByTestId('calendar-page')).toBeInTheDocument();
  });

  it('navigating to confirm and tapping a time confirms the slot', async () => {
    renderAt('/app/business/confirm?day=mon');
    expect(screen.getByText(/commute to hq/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /confirm 9:15 am/i }));
    const mon = useStore.getState().schedule.find((s) => s.day === 'mon');
    expect(mon?.status).toBe('confirmed');
    expect(mon?.suggestedTime).toBe('9:15 AM');
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  it('confirming with an alternative time updates the slot to that time', async () => {
    renderAt('/app/business/confirm?day=wed');
    await userEvent.click(screen.getByRole('button', { name: '8:45 AM' }));
    const wed = useStore.getState().schedule.find((s) => s.day === 'wed');
    expect(wed?.suggestedTime).toBe('8:45 AM');
    expect(wed?.status).toBe('confirmed');
  });
});
