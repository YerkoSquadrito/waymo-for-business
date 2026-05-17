import { useNavigate, Navigate } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { Button } from '@/components/Button';
import { IconBadge } from '@/components/IconBadge';
import { Icon } from '@/components/Icon';
import { useStore } from '@/store';
import type { CommuteSlot } from '@/mocks/seed';

export default function Commute() {
  const navigate = useNavigate();
  const schedule = useStore((s) => s.schedule);
  const calendar = useStore((s) => s.calendar);

  if (!calendar.connected) {
    return <Navigate to="/app/business/calendar" replace />;
  }

  const confirmedCount = schedule.filter((s) => s.status === 'confirmed').length;
  const suggestedCount = schedule.filter((s) => s.status === 'suggested').length;

  return (
    <PageScaffold title="Waymo for Business">
      <section className="mt-2">
        <h2 className="text-headline-lg-mobile font-semibold text-on-background">
          Your weekly commute
        </h2>
        <p className="mt-1 text-body-md text-on-surface-variant">
          Suggested times based on your calendar.
        </p>
      </section>

      <Card className="mt-margin-lg flex items-center gap-4" padding="sm">
        <IconBadge icon="calendar_today" tone="primary-fixed" shape="circle" />
        <div className="min-w-0 flex-1">
          <p className="font-label-bold uppercase text-primary">
            Calendar synced
          </p>
          <p className="text-body-sm text-on-surface-variant">
            Updated just now from{' '}
            {calendar.provider === 'google'
              ? 'Google Workspace'
              : 'Microsoft Outlook'}
          </p>
        </div>
      </Card>

      <ul className="mt-margin-lg space-y-4">
        {schedule.map((slot) => (
          <li key={slot.day}>
            <DaySlot
              slot={slot}
              onPickTime={() =>
                navigate(`/app/business/confirm?day=${slot.day}`)
              }
            />
          </li>
        ))}
      </ul>

      <div className="mt-margin-lg space-y-3 pb-safe">
        <Button onClick={() => navigate('/app/business')}>
          {confirmedCount > 0
            ? `Save schedule (${confirmedCount} ride${confirmedCount === 1 ? '' : 's'})`
            : suggestedCount > 0
              ? `Review ${suggestedCount} suggestion${suggestedCount === 1 ? '' : 's'}`
              : 'Save schedule'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/app/business')}
        >
          Edit recurring locations
        </Button>
      </div>
    </PageScaffold>
  );
}

function DaySlot({
  slot,
  onPickTime,
}: {
  slot: CommuteSlot;
  onPickTime: () => void;
}) {
  if (slot.status === 'skip' || !slot.suggestedTime) {
    return (
      <Card padding="md">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-headline-lg-mobile font-semibold text-on-surface opacity-60">
              {slot.label}
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              {slot.subtitle}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-body-md text-on-surface-variant/60">
            No commute scheduled
          </p>
          <button
            type="button"
            onClick={onPickTime}
            className="-mx-3 -my-2 rounded-md px-3 py-2 font-label-bold uppercase text-primary transition-opacity active:opacity-60"
          >
            Add trip
          </button>
        </div>
      </Card>
    );
  }

  const isConfirmed = slot.status === 'confirmed';

  return (
    <Card padding="md" accent>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-headline-lg-mobile font-semibold text-on-surface">
            {slot.label}
          </h3>
          <p className="truncate text-body-sm text-on-surface-variant">
            {slot.subtitle}
          </p>
        </div>
        {isConfirmed ? (
          <Chip
            variant="status-info"
            leading={<Icon name="check" size={14} filled />}
          >
            CONFIRMED
          </Chip>
        ) : (
          <Chip
            variant="status-success"
            leading={<Icon name="auto_awesome" size={14} filled />}
          >
            SUGGESTED
          </Chip>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button size="md" fullWidth={false} onClick={onPickTime}>
          {slot.suggestedTime}
        </Button>
        {slot.context ? (
          <span className="text-body-sm font-semibold text-tertiary">
            {slot.context}
          </span>
        ) : null}
      </div>
      {slot.contextIcon && slot.context && !isConfirmed ? (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary-container/40 p-2 text-on-secondary-container">
          <Icon name={slot.contextIcon} size={18} />
          <p className="text-body-sm">{slot.context}</p>
        </div>
      ) : null}
    </Card>
  );
}
