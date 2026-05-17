import { useNavigate } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IconBadge } from '@/components/IconBadge';
import { Icon } from '@/components/Icon';
import { Toggle } from '@/components/Toggle';
import { useStore } from '@/store';

export default function Calendar() {
  const navigate = useNavigate();
  const calendar = useStore((s) => s.calendar);
  const connect = useStore((s) => s.connectCalendar);
  const disconnect = useStore((s) => s.disconnectCalendar);

  const userEmail = useStore((s) => s.user?.email);

  return (
    <PageScaffold title="Calendar" hideBottomNav>
      <section className="mt-2 space-y-2">
        <p className="font-label-bold uppercase text-primary">Step 2 of 3</p>
        <h2 className="text-headline-lg-mobile font-semibold text-on-background">
          Sync your calendar
        </h2>
        <p className="text-body-md text-on-surface-variant">
          We&apos;ll suggest commute rides based on your meetings.{' '}
          {userEmail ? <>Linked to <span className="font-semibold">{userEmail}</span>.</> : null}
        </p>
      </section>

      <div className="mt-margin-lg space-y-3">
        <ProviderRow
          name="Google Workspace"
          icon="calendar_today"
          tone="primary-fixed"
          active={calendar.provider === 'google'}
          onConnect={() => connect('google')}
          onDisconnect={disconnect}
        />
        <ProviderRow
          name="Microsoft Outlook"
          icon="event"
          tone="secondary"
          active={calendar.provider === 'outlook'}
          onConnect={() => connect('outlook')}
          onDisconnect={disconnect}
        />
      </div>

      <Card className="mt-margin-lg" padding="md">
        <Toggle
          label="Optimize for productivity"
          description="Suggest rides that finish 15 min before your first meeting."
          checked={true}
          onChange={() => undefined}
        />
      </Card>

      <div className="mt-margin-lg space-y-3 pb-safe">
        <Button
          onClick={() => navigate('/app/business/commute')}
          disabled={!calendar.connected}
          trailing={<Icon name="arrow_forward" size={22} />}
        >
          Continue to commute
        </Button>
        <Button variant="secondary" onClick={() => navigate('/app/business')}>
          Skip for now
        </Button>
      </div>
    </PageScaffold>
  );
}

function ProviderRow({
  name,
  icon,
  tone,
  active,
  onConnect,
  onDisconnect,
}: {
  name: string;
  icon: string;
  tone: 'primary-fixed' | 'secondary';
  active: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border bg-surface-container-lowest p-4 shadow-card transition-colors ${
        active
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-surface-container'
      }`}
    >
      <IconBadge icon={icon} tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="text-body-md font-semibold text-on-surface">{name}</p>
        <p className="text-body-sm text-on-surface-variant">
          {active ? 'Connected · updated just now' : 'Not connected'}
        </p>
      </div>
      <Button
        size="md"
        variant={active ? 'secondary' : 'primary'}
        fullWidth={false}
        onClick={active ? onDisconnect : onConnect}
        className="shrink-0"
      >
        {active ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  );
}
