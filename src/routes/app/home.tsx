import { Link, useNavigate } from 'react-router-dom';
import { PageScaffold } from '@/components/PageScaffold';
import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { Icon } from '@/components/Icon';
import { IconBadge } from '@/components/IconBadge';
import { ListRow } from '@/components/ListRow';
import { useStore } from '@/store';

export default function Home() {
  const navigate = useNavigate();
  const destinations = useStore((s) => s.destinations);
  const corpVerified = useStore((s) => s.user?.corpVerified ?? false);

  const saved = destinations.filter((d) => d.saved);
  const recents = destinations.filter((d) => !d.saved);

  return (
    <PageScaffold title="Waymo">
      <section className="mt-2">
        <p className="text-body-sm text-on-surface-variant">
          Estimated pickup
        </p>
        <h2 className="text-headline-lg-mobile font-semibold text-on-background">
          6 min away
        </h2>
      </section>

      <button
        type="button"
        onClick={() => navigate('/app/book?dest=hq')}
        className="mt-margin-lg flex w-full items-center gap-3 rounded-2xl bg-surface-container-lowest px-4 py-4 text-left shadow-card active:bg-surface-container-low"
        aria-label="Where to?"
      >
        <Icon name="search" className="text-on-surface-variant" />
        <span className="flex-1 text-body-md text-on-surface-variant">
          Where to?
        </span>
        <Icon name="schedule" className="text-on-surface-variant" />
      </button>

      <section className="mt-5 -mx-container-padding overflow-x-auto px-container-padding hide-scrollbar">
        <div className="flex gap-2">
          {saved.map((dest) => (
            <Link
              key={dest.id}
              to={`/app/book?dest=${dest.id}`}
              className="shrink-0"
            >
              <Chip leading={<Icon name={dest.icon ?? 'place'} size={16} />}>
                {dest.name}
              </Chip>
            </Link>
          ))}
          <button
            type="button"
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border-2 border-dashed border-outline-variant px-4 text-label-bold text-on-surface-variant transition-colors hover:bg-surface-container-low active:bg-surface-container"
          >
            <Icon name="add" size={16} /> Add place
          </button>
        </div>
      </section>

      {corpVerified ? (
        <Link to="/app/business" className="mt-margin-lg block">
          <Card padding="md" accent>
            <div className="flex items-center gap-3">
              <IconBadge icon="work" tone="secondary" filled />
              <div className="min-w-0 flex-1">
                <p className="text-label-bold uppercase text-secondary">
                  Business
                </p>
                <p className="text-body-md font-semibold text-on-surface">
                  Your commute is paid by Acme
                </p>
                <p className="text-body-sm text-on-surface-variant">
                  Open weekly schedule
                </p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
          </Card>
        </Link>
      ) : (
        <Link to="/app/business/connect" className="mt-margin-lg block">
          <Card padding="md">
            <div className="flex items-center gap-3">
              <IconBadge icon="work_outline" tone="primary-fixed" />
              <div className="min-w-0 flex-1">
                <p className="text-body-md font-semibold text-on-surface">
                  Connect your employer
                </p>
                <p className="text-body-sm text-on-surface-variant">
                  Let your company pay for your commute
                </p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
          </Card>
        </Link>
      )}

      <section className="mt-margin-lg">
        <p className="font-label-bold uppercase text-on-surface-variant">
          Recent
        </p>
        <ul className="mt-2 divide-y divide-surface-container">
          {recents.map((dest) => (
            <li key={dest.id}>
              <ListRow
                leading={<IconBadge icon="location_on" tone="neutral" size="sm" />}
                title={dest.name}
                subtitle={`${dest.address} · ${dest.city}`}
                onClick={() => navigate(`/app/book?dest=${dest.id}`)}
                trailing={
                  <button
                    type="button"
                    aria-label={`Save ${dest.name}`}
                    onClick={(e) => e.stopPropagation()}
                    className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low active:bg-surface-container"
                  >
                    <Icon name="star_outline" />
                  </button>
                }
              />
            </li>
          ))}
        </ul>
      </section>
    </PageScaffold>
  );
}
