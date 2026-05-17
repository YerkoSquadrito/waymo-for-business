import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { TripVisualizer } from '@/components/TripVisualizer';
import { Icon } from '@/components/Icon';
import { IconBadge } from '@/components/IconBadge';
import { useStore } from '@/store';
import type { Weekday } from '@/mocks/seed';

const ALT_TIMES = ['8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM'];

function isWeekday(value: string | null): value is Weekday {
  return value === 'mon' || value === 'tue' || value === 'wed' || value === 'thu' || value === 'fri';
}

export default function Confirm() {
  const [params] = useSearchParams();
  const dayParam = params.get('day');
  const navigate = useNavigate();
  const slot = useStore((s) => {
    if (!isWeekday(dayParam)) return undefined;
    return s.schedule.find((entry) => entry.day === dayParam);
  });
  const setSlotTime = useStore((s) => s.setSlotTime);

  if (!isWeekday(dayParam) || !slot) {
    return <Navigate to="/app/business/commute" replace />;
  }

  const baseTime = slot.suggestedTime ?? '9:00 AM';
  const arrivalTime = addMinutes(baseTime, 22);

  const onConfirm = (time: string) => {
    setSlotTime(slot.day, time);
    navigate('/app/business/commute');
  };

  return (
    <PageScaffold
      title="Confirm schedule"
      leading={
        <button
          type="button"
          onClick={() => navigate('/app/business/commute')}
          aria-label="Back"
          className="text-on-surface-variant"
        >
          <Icon name="arrow_back" />
        </button>
      }
      hideBottomNav
    >
      <section className="mt-2">
        <p className="font-label-bold uppercase text-primary">{slot.label}</p>
        <h2 className="mt-1 text-headline-lg-mobile font-semibold text-on-background">
          {slot.subtitle}
        </h2>
      </section>

      <Card className="mt-margin-lg" padding="lg">
        <TripVisualizer
          pickup={{ label: 'Home', detail: '116th St', time: baseTime }}
          destination={{
            label: 'Acme HQ',
            detail: 'Wilshire Boulevard',
            time: arrivalTime,
          }}
        />
        <div className="mt-margin-lg flex items-center gap-2 rounded-xl bg-surface-container-low p-3 text-on-surface-variant">
          <IconBadge icon="auto_awesome" tone="primary-fixed" size="sm" filled />
          <p className="text-body-sm">
            Auto-billed to your company. No expense report required.
          </p>
        </div>
      </Card>

      <section className="mt-margin-lg">
        <p className="font-label-bold uppercase text-on-surface-variant">
          Alternative pickup times
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALT_TIMES.map((time) => {
            const active = time === baseTime;
            return (
              <Button
                key={time}
                size="md"
                variant={active ? 'primary' : 'secondary'}
                fullWidth={false}
                onClick={() => onConfirm(time)}
              >
                {time}
              </Button>
            );
          })}
        </div>
      </section>

      <div className="mt-margin-lg space-y-3 pb-safe">
        <Button onClick={() => onConfirm(baseTime)}>
          Confirm {baseTime}
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/app/business/commute')}
        >
          Back to schedule
        </Button>
      </div>
    </PageScaffold>
  );
}

function addMinutes(time: string, minutes: number): string {
  const match = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(time);
  if (!match) return time;
  const [, hhRaw, mmRaw, periodRaw] = match;
  if (!hhRaw || !mmRaw || !periodRaw) return time;
  let hh = Number.parseInt(hhRaw, 10);
  const mm = Number.parseInt(mmRaw, 10);
  const period = periodRaw.toUpperCase();
  if (period === 'PM' && hh < 12) hh += 12;
  if (period === 'AM' && hh === 12) hh = 0;
  const total = hh * 60 + mm + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const outH = Math.floor(wrapped / 60);
  const outM = wrapped % 60;
  const outPeriod = outH >= 12 ? 'PM' : 'AM';
  const displayH = ((outH + 11) % 12) + 1;
  return `${displayH}:${outM.toString().padStart(2, '0')} ${outPeriod}`;
}
