import { Link } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { IconBadge } from '@/components/IconBadge';
import { Icon } from '@/components/Icon';
import { Chip } from '@/components/Chip';
import { useStore } from '@/store';

export default function BusinessHub() {
  const corpVerified = useStore((s) => s.user?.corpVerified ?? false);
  const calendarConnected = useStore((s) => s.calendar.connected);
  const calendarProvider = useStore((s) => s.calendar.provider);
  const userEmail = useStore((s) => s.user?.email);

  const steps = [
    {
      key: 'connect',
      to: '/app/business/connect',
      icon: 'badge',
      label: 'Connect corporate account',
      detail: corpVerified ? userEmail ?? 'Verified' : 'Verify your work email',
      done: corpVerified,
    },
    {
      key: 'calendar',
      to: '/app/business/calendar',
      icon: 'calendar_today',
      label: 'Sync calendar',
      detail: calendarConnected
        ? `Connected · ${calendarProvider === 'google' ? 'Google Workspace' : 'Outlook'}`
        : 'Pull meetings to plan rides',
      done: calendarConnected,
    },
    {
      key: 'commute',
      to: '/app/business/commute',
      icon: 'directions_car',
      label: 'Weekly commute',
      detail: calendarConnected
        ? 'Review and save your week'
        : 'Sync your calendar first',
      done: false,
    },
  ];

  return (
    <PageScaffold title="Business">
      <section className="mt-margin-lg">
        <h2 className="text-headline-lg-mobile font-semibold text-on-background">
          Corporate ride benefits
        </h2>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Connect your work account, then let your calendar plan commute rides
          billed to your company.
        </p>
      </section>

      <ol className="mt-margin-lg space-y-3">
        {steps.map((step) => (
          <li key={step.key}>
            <Link
              to={step.to}
              className="flex items-center gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-card active:bg-surface-container-low"
            >
              <IconBadge
                icon={step.done ? 'check' : step.icon}
                tone={step.done ? 'tertiary' : 'primary-fixed'}
                filled={step.done}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-md font-semibold text-on-surface">
                  {step.label}
                </p>
                <p className="truncate text-body-sm text-on-surface-variant">
                  {step.detail}
                </p>
              </div>
              {step.done ? (
                <Chip variant="status-success">DONE</Chip>
              ) : (
                <Icon name="chevron_right" className="text-on-surface-variant" />
              )}
            </Link>
          </li>
        ))}
      </ol>
    </PageScaffold>
  );
}
