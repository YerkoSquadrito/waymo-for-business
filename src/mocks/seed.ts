export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

export type CommuteSlot = {
  day: Weekday;
  label: string;
  subtitle: string;
  suggestedTime: string | null;
  context: string | null;
  contextIcon: string | null;
  status: 'suggested' | 'confirmed' | 'skip';
};

export type Destination = {
  id: string;
  name: string;
  address: string;
  city: string;
  saved?: boolean;
  icon?: string;
};

export type Ride = {
  id: string;
  origin: string;
  destination: string;
  scheduledFor: string; // ISO
  durationMin: number;
  cost: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  paidBy: 'employee' | 'employer';
};

export const SEED_SCHEDULE: ReadonlyArray<CommuteSlot> = [
  {
    day: 'mon',
    label: 'Monday',
    subtitle: 'Commute to HQ',
    suggestedTime: '9:15 AM',
    context: 'Perfect for deep work',
    contextIcon: 'laptop_mac',
    status: 'suggested',
  },
  {
    day: 'tue',
    label: 'Tuesday',
    subtitle: 'Working from home',
    suggestedTime: null,
    context: null,
    contextIcon: null,
    status: 'skip',
  },
  {
    day: 'wed',
    label: 'Wednesday',
    subtitle: 'Mid-week syncs',
    suggestedTime: '11:30 AM',
    context: '45 min quiet cabin for calls',
    contextIcon: 'videocam',
    status: 'suggested',
  },
  {
    day: 'thu',
    label: 'Thursday',
    subtitle: 'Commute to HQ',
    suggestedTime: '8:45 AM',
    context: 'Prioritize early start',
    contextIcon: 'schedule',
    status: 'suggested',
  },
  {
    day: 'fri',
    label: 'Friday',
    subtitle: 'Team lunch',
    suggestedTime: '11:00 AM',
    context: null,
    contextIcon: null,
    status: 'suggested',
  },
];

export const SEED_DESTINATIONS: ReadonlyArray<Destination> = [
  {
    id: 'home',
    name: 'Home',
    address: '116th St',
    city: 'Santa Monica, CA',
    icon: 'home',
    saved: true,
  },
  {
    id: 'hq',
    name: 'Work — Acme HQ',
    address: 'Wilshire Boulevard',
    city: 'Los Angeles, CA',
    icon: 'business',
    saved: true,
  },
  {
    id: 'recent-1',
    name: 'Wilshire Boulevard',
    address: '11950 Wilshire Blvd',
    city: 'Los Angeles, CA',
  },
  {
    id: 'recent-2',
    name: '116th St',
    address: '116th St',
    city: 'Santa Monica, CA',
  },
];

export const SEED_RIDES: ReadonlyArray<Ride> = [
  {
    id: 'ride-1',
    origin: 'Home',
    destination: 'Acme HQ',
    scheduledFor: '2026-05-15T09:15:00-07:00',
    durationMin: 22,
    cost: 18.4,
    status: 'completed',
    paidBy: 'employer',
  },
];
