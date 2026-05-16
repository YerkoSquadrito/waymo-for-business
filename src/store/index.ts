import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SEED_DESTINATIONS,
  SEED_RIDES,
  SEED_SCHEDULE,
  type CommuteSlot,
  type Destination,
  type Ride,
  type Weekday,
} from '@/mocks/seed';

type CalendarProvider = 'google' | 'outlook';

type State = {
  user: { email: string; corpVerified: boolean } | null;
  calendar: {
    connected: boolean;
    provider: CalendarProvider | null;
    syncedAt: string | null;
  };
  schedule: ReadonlyArray<CommuteSlot>;
  destinations: ReadonlyArray<Destination>;
  rides: ReadonlyArray<Ride>;

  verifyCorpEmail: (email: string) => void;
  connectCalendar: (provider: CalendarProvider) => void;
  disconnectCalendar: () => void;
  setSlotTime: (day: Weekday, time: string | null) => void;
  setSlotStatus: (day: Weekday, status: CommuteSlot['status']) => void;
  appendRide: (ride: Ride) => void;
  reset: () => void;
};

const INITIAL: Pick<
  State,
  'user' | 'calendar' | 'schedule' | 'destinations' | 'rides'
> = {
  user: null,
  calendar: { connected: false, provider: null, syncedAt: null },
  schedule: SEED_SCHEDULE,
  destinations: SEED_DESTINATIONS,
  rides: SEED_RIDES,
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      ...INITIAL,
      verifyCorpEmail: (email) =>
        set({ user: { email, corpVerified: true } }),
      connectCalendar: (provider) =>
        set({
          calendar: {
            connected: true,
            provider,
            syncedAt: new Date().toISOString(),
          },
        }),
      disconnectCalendar: () =>
        set({ calendar: { connected: false, provider: null, syncedAt: null } }),
      setSlotTime: (day, time) =>
        set((s) => ({
          schedule: s.schedule.map((slot) =>
            slot.day === day
              ? { ...slot, suggestedTime: time, status: time ? 'confirmed' : 'skip' }
              : slot,
          ),
        })),
      setSlotStatus: (day, status) =>
        set((s) => ({
          schedule: s.schedule.map((slot) =>
            slot.day === day ? { ...slot, status } : slot,
          ),
        })),
      appendRide: (ride) =>
        set((s) => ({ rides: [ride, ...s.rides] })),
      reset: () => set(INITIAL),
    }),
    {
      name: 'wfb-prototype-v1',
      version: 1,
    },
  ),
);
