import { PageScaffold } from '@/components/PageScaffold';

export default function Vehicles() {
  return (
    <PageScaffold title="Vehicles">
      <Placeholder
        label="Vehicles"
        detail="Consumer-app shell tab. Out of scope for the Business prototype."
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
