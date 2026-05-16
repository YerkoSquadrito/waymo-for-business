import { PageScaffold } from '@/components/PageScaffold';

export default function Commute() {
  return (
    <PageScaffold title="Your Weekly Commute">
      <Placeholder
        label="Commute"
        detail="Weekly day cards w/ suggested ride times — port from commute_scheduler/code.html in feat/commute-scheduler."
      />
    </PageScaffold>
  );
}

function Placeholder({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="mt-margin-lg rounded-2xl bg-surface-container-lowest p-margin-lg shadow-card">
      <p className="font-label-bold uppercase text-primary">{label}</p>
      <p className="mt-2 text-body-md text-on-surface-variant">{detail}</p>
    </div>
  );
}
