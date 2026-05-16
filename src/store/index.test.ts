import { describe, expect, it, beforeEach } from 'vitest';
import { useStore } from './index';

describe('store', () => {
  beforeEach(() => {
    useStore.getState().reset();
    localStorage.clear();
  });

  it('starts unverified and disconnected', () => {
    const s = useStore.getState();
    expect(s.user).toBeNull();
    expect(s.calendar.connected).toBe(false);
  });

  it('marks the user verified on corporate email submit', () => {
    useStore.getState().verifyCorpEmail('me@acme.com');
    expect(useStore.getState().user).toEqual({
      email: 'me@acme.com',
      corpVerified: true,
    });
  });

  it('connects and disconnects a calendar provider', () => {
    useStore.getState().connectCalendar('google');
    expect(useStore.getState().calendar.connected).toBe(true);
    expect(useStore.getState().calendar.provider).toBe('google');
    useStore.getState().disconnectCalendar();
    expect(useStore.getState().calendar.connected).toBe(false);
    expect(useStore.getState().calendar.provider).toBeNull();
  });

  it('updates a commute slot time and flips status to confirmed', () => {
    useStore.getState().setSlotTime('mon', '9:30 AM');
    const mon = useStore.getState().schedule.find((s) => s.day === 'mon');
    expect(mon?.suggestedTime).toBe('9:30 AM');
    expect(mon?.status).toBe('confirmed');
  });

  it('clearing a slot time marks it skip', () => {
    useStore.getState().setSlotTime('mon', null);
    const mon = useStore.getState().schedule.find((s) => s.day === 'mon');
    expect(mon?.status).toBe('skip');
  });

  it('appends a new ride to the front of the rides list', () => {
    const initial = useStore.getState().rides.length;
    useStore.getState().appendRide({
      id: 'ride-new',
      origin: 'Home',
      destination: 'HQ',
      scheduledFor: '2026-05-17T09:00:00-07:00',
      durationMin: 20,
      cost: 17,
      status: 'scheduled',
      paidBy: 'employer',
    });
    const after = useStore.getState().rides;
    expect(after.length).toBe(initial + 1);
    expect(after[0]?.id).toBe('ride-new');
  });
});
