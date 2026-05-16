import { PageScaffold } from '@/components/PageScaffold';
import { Link } from 'react-router-dom';

export default function BusinessHub() {
  return (
    <PageScaffold title="Business">
      <section className="mt-margin-lg">
        <h2 className="text-headline-lg-mobile text-on-background">
          Corporate ride benefits
        </h2>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Connect your work account, then let your calendar suggest commute
          rides paid by your company.
        </p>
      </section>

      <nav className="mt-margin-lg flex flex-col gap-3">
        <HubLink to="/app/business/connect" label="Connect corporate account" />
        <HubLink to="/app/business/calendar" label="Sync calendar" />
        <HubLink to="/app/business/commute" label="Weekly commute" />
      </nav>
    </PageScaffold>
  );
}

function HubLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-2xl bg-surface-container-lowest px-5 py-4 shadow-card"
    >
      <span className="text-body-md font-semibold text-on-surface">{label}</span>
      <span className="material-symbols-outlined text-on-surface-variant" aria-hidden>
        chevron_right
      </span>
    </Link>
  );
}
